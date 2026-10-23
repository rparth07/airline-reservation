import { AppSetting } from '../../shared/app-setting';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered?: boolean;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AppSetting.URL + 'Auth/login',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => throwError(() => errorRes.status === 401
          ? 'Invalid email or password.' : 'Admin sign-in is unavailable. Please try again.')),
        tap((user) => {
          this.handleAuthentication(
            user.email,
            user.localId,
            user.idToken,
            +user.expiresIn
          );
        })
      );
  }

  autoLogin() {
    let admin;
    try {
      admin = JSON.parse(localStorage.getItem('adminData') || 'null');
    } catch {
      localStorage.removeItem('adminData');
      return;
    }
    if (!admin || !admin._token || !Number.isFinite(Date.parse(admin._tokenExpirationDuration))) {
      return;
    }

    const loadedAdmin = new User(
      admin.email,
      admin.id,
      admin._token,
      new Date(admin._tokenExpirationDuration)
    );

    if (loadedAdmin.token) {
      this.user.next(loadedAdmin);
    }
  }

  logout() {
    this.user.next(null);

    localStorage.removeItem('adminData');
    this.router.navigate(['/admin/login']);
  }
  private handleAuthentication(
    email: string,
    localId: string,
    tokenId: string,
    expiresIn: number
  ) {
    const expirationDuration = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, localId, tokenId, expirationDuration);
    localStorage.setItem('adminData', JSON.stringify(user));
    this.user.next(user);
  }
}
