import { ApiStatusService } from './shared/api-status.service';
import { NavigationError, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './admin/sign-in/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  navigationFailed = false;
  private failedUrl = '/user/home';
  constructor(private authService: AuthService, private router: Router, public apiStatus: ApiStatusService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.navigationFailed = false;
      if (event instanceof NavigationError) {
        this.failedUrl = event.url;
        this.navigationFailed = true;
      }
    });
  }
  get showApiError() {
    return !!this.apiStatus.message && this.router.url !== '/user/home';
  }
  retryNavigation() {
    this.router.navigateByUrl(this.failedUrl).catch(() => {});
  }
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
