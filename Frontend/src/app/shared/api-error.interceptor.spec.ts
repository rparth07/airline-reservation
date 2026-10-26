import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiErrorInterceptor } from './api-error.interceptor';
import { ApiStatusService } from './api-status.service';
import { AppSetting } from './app-setting';

describe('API failure handling', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let status: ApiStatusService;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
    ] });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
    status = TestBed.inject(ApiStatusService);
  });
  afterEach(() => backend.verify());
  it('times out reads instead of leaving navigation pending', fakeAsync(() => {
    let failed = false;
    http.get(AppSetting.URL + 'Admin/Airport').subscribe({ error: () => failed = true });
    const request = backend.expectOne(AppSetting.URL + 'Admin/Airport');
    tick(90001);
    expect(failed).toBeTrue();
    expect(request.cancelled).toBeTrue();
    expect(status.message).toContain('could not load');
  }));
  it('reports ambiguous writes without retrying them', () => {
    http.post(AppSetting.URL + 'Booking', {}).subscribe({ error: () => {} });
    backend.expectOne(AppSetting.URL + 'Booking').error(new ProgressEvent('error'));
    backend.expectNone(AppSetting.URL + 'Booking');
    expect(status.message).toContain('Check whether it was saved');
  });
  it('attaches an unexpired admin token only to admin requests', () => {
    localStorage.setItem('adminData', JSON.stringify({ _token: 'test-token', _tokenExpirationDuration: new Date(Date.now() + 60000).toISOString() }));
    http.get(AppSetting.URL + 'Admin/Operator').subscribe();
    const request = backend.expectOne(AppSetting.URL + 'Admin/Operator');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
    request.flush([]);
    localStorage.removeItem('adminData');
  });
  it('does not forward the admin token to an unrelated host', () => {
    localStorage.setItem('adminData', JSON.stringify({ _token: 'test-token', _tokenExpirationDuration: new Date(Date.now() + 60000).toISOString() }));
    http.get('https://example.com/unrelated').subscribe();
    const request = backend.expectOne('https://example.com/unrelated');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush({});
    localStorage.removeItem('adminData');
  });
  it('leaves unrelated authentication requests alone', () => {
    http.get('https://example.com/auth').subscribe({ error: () => {} });
    backend.expectOne('https://example.com/auth').error(new ProgressEvent('error'));
    expect(status.message).toBe('');
  });
  it('clears a recovered request warning without clearing another request failure', () => {
    const url = AppSetting.URL + 'Admin/Airport';
    http.get(url).subscribe({ error: () => {} });
    backend.expectOne(url).error(new ProgressEvent('error'));
    http.get(AppSetting.URL + 'Admin/Operator').subscribe();
    backend.expectOne(AppSetting.URL + 'Admin/Operator').flush([]);
    expect(status.message).toContain('could not load');
    http.get(url).subscribe(); backend.expectOne(url).flush([]);
    expect(status.message).toBe('');
    http.post(AppSetting.URL + 'Booking', {}).subscribe({error: () => {}});
    backend.expectOne(AppSetting.URL + 'Booking').error(new ProgressEvent('error'));
    http.get(url).subscribe(); backend.expectOne(url).flush([]);
    expect(status.message).toContain('Check whether it was saved');
  });

});
