import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  @Output() sidebarToggle = new EventEmitter();
  @Output() moveMainContent = new EventEmitter<string>();
  constructor() {}
}
