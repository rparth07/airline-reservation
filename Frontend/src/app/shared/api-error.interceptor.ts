import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { catchError, throwError, timeout, tap } from 'rxjs';
import { AppSetting } from './app-setting';
import { ApiStatusService } from './api-status.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private status: ApiStatusService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!request.url.startsWith(AppSetting.URL)) return next.handle(request);
    // Bound reads only. Never automatically retry a potentially committed write.
    if (request.url.startsWith(AppSetting.URL + 'Admin/')) {
      try {
        const admin = JSON.parse(localStorage.getItem('adminData') || 'null');
        if (admin?._token && Date.parse(admin._tokenExpirationDuration) > Date.now()) {
          request = request.clone({ setHeaders: { Authorization: 'Bearer ' + admin._token } });
        }
      } catch { /* Invalid local session: server rejects protected operations. */ }
    }
    const response = next.handle(request);
    const bounded = request.method === 'GET' ? response.pipe(timeout(90000)) : response;
    const requestKey = request.method + ' ' + request.urlWithParams;
    return bounded.pipe(tap(event => {
      if (event instanceof HttpResponse && this.status.failedRequest === requestKey) {
        this.status.message = '';
        this.status.failedRequest = null;
      }
    }), catchError(error => {
      this.status.failedRequest = requestKey;
      this.status.message = request.method === 'GET'
        ? 'The reservation service could not load data. Please try again or reload this page.'
        : 'The reservation service could not confirm this change. Check whether it was saved before trying again.';
      return throwError(() => error);
    }));
  }
}
