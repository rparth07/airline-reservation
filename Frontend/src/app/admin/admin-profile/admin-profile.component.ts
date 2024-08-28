import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(content: any) {
    this.modalService.open(content, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onChangePassword(changePasswordForm: NgForm) {
  }
}
