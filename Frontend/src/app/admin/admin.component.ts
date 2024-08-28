import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Observable, Subscription, fromEvent, take } from 'rxjs';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  toggle: string = '';
  isSidebarHidden!: boolean;
  isHeaderHidden!: boolean;
  constructor(private adminService: AdminService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.router.events.subscribe((response) => {
      this.isSidebarHidden = true;
      this.isHeaderHidden = true;
      if (response instanceof NavigationEnd) {
        if (response.urlAfterRedirects.includes('login')) {
          this.isSidebarHidden = false;
          this.isHeaderHidden = false;
        } else if (response.urlAfterRedirects.includes('home')) {
          this.isSidebarHidden = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.adminService.moveMainContent.subscribe((className: string) => {
      this.toggleSidebar(className);
    });
  }

  ngAfterViewInit() {
    // Some update logic
    this.cdRef.detectChanges();  // Manually trigger change detection
  }

  toggleSidebar(className: string) {
    const main = document.getElementsByTagName('main')![0];
    if (main !== null) {
      if (this.toggle) {
        main.classList.replace(this.toggle, className);
      } else {
        main.classList.add(className);
      }
    }
    this.toggle = className;
  }
}
