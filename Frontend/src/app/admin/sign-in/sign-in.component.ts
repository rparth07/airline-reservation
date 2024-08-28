import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  error!: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }
  onSubmit(form: NgForm) {
    // const admin = JSON.parse(localStorage.getItem('adminData') || '{}');
    // if (admin) {
    //   this.router.navigate(['/admin']);
    // }

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authenticationObservable: Observable<AuthResponseData>;
    authenticationObservable = this.authService.login(email, password);
    authenticationObservable.subscribe(
      (userData) => {
        this.router.navigate(['../admin']);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
    form.reset();
  }
}
