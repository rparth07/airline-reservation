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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzoiepBqiJPxQEcS0Z0adAXd_Ve2_SvJk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email Not Found';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'invalid password';
                break;
            }
            return throwError(errorMessage);
          }
        }),
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
    const admin = JSON.parse(localStorage.getItem('adminData') || '{}');
    if (!admin) {
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
