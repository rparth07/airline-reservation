import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  toggle: boolean = false;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.moveMainContent.emit('main-content-margin-left');
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.resizePlugins();
    });
    this.resizePlugins();
    this.adminService.sidebarToggle.subscribe(() => {
      this.toggleSidebar();
    });
  }

  resizePlugins() {
    const sidebar = document.querySelector('.sidebar-default')!;
    if (window.innerWidth < 1025) {
      if (sidebar !== null) {
        if (!sidebar.classList.contains('sidebar-mini')) {
          sidebar.classList.add('sidebar-mini', 'on-resize');
          this.adminService.moveMainContent.emit('main-content');
        }
      }
    } else {
      if (sidebar !== null) {
        if (
          sidebar.classList.contains('sidebar-mini') &&
          sidebar.classList.contains('on-resize')
        ) {
          sidebar.classList.remove('sidebar-mini', 'on-resize');
          this.adminService.moveMainContent.emit('main-content-margin-left');
        }
      }
    }
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar-default')!;
    if (sidebar.classList.contains('sidebar-mini')) {
      sidebar.classList.remove('sidebar-mini');
      this.adminService.moveMainContent.emit('main-content-margin-left');
    } else {
      sidebar.classList.add('sidebar-mini');
      this.adminService.moveMainContent.emit('main-content');
    }
  }
}
