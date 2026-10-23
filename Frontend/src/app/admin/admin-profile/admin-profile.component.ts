import { Component } from '@angular/core';
import { AuthService } from '../sign-in/auth.service';
@Component({selector:'app-admin-profile',templateUrl:'./admin-profile.component.html',styleUrls:['./admin-profile.component.css']})
export class AdminProfileComponent { constructor(public authService: AuthService) {} }
