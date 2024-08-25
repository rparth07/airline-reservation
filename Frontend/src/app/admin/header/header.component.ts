import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../sign-in/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  isAdminVisible = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      if (window.screen.width < 1200) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }

  openAdminProfileOption() {
    this.isAdminVisible = !this.isAdminVisible;
  }

  toggleSidebar() {
    this.adminService.sidebarToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
