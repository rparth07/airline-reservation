import { Router } from '@angular/router';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Ridership } from '../shared/interfaces/ridership';
import * as _ from 'lodash';
import { BookingDetails } from '../shared/interfaces/booking-details';
import { BookingService } from '../shared/services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, OnDestroy {
  paxType!: Ridership;
  saving = false;
  bookingError = '';
  bookingId = '';
  ngbModalRef!: NgbModalRef;

  private bookingDetail: BookingDetails = {
    phoneNumber: '',
    passengerDetails: [],
  };

  @ViewChild('bookingModal', { static: true }) bookingModal!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const passengers = this.bookingService.getPaxData;
    if (!passengers) {
      this.router.navigate(['/user/home']);
      return;
    }
    this.paxType = passengers;
    this.ngbModalRef = this.modalService.open(this.bookingModal, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onSubmit(bookingForm: NgForm) {
    if (bookingForm.invalid || this.saving || this.bookingId) return;
    this.saving = true;
    this.bookingError = '';
    let formValue = bookingForm.value;
    this.bookingDetail.phoneNumber = formValue.phone_no;

    this.bookingDetail.passengerDetails = Object.values(
      _.omit(formValue, 'phone_no')
    );
    this.bookingService.savePassengersDetails(this.bookingDetail).subscribe({
      next: id => { this.bookingId = id; this.saving = false; },
      error: () => {
        this.saving = false;
        this.bookingError = 'We could not confirm this booking. If the request reached the server it may have been saved. Please check with support before submitting again.';
      },
    });
  }

  ngOnDestroy() {
    this.ngbModalRef?.close();
  }
}
