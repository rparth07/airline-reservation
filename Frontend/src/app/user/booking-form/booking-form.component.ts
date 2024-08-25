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
  ngbModalRef!: NgbModalRef;

  private bookingDetail: BookingDetails = {
    phoneNumber: '',
    passengerDetails: [],
  };

  @ViewChild('bookingModal', { static: true }) bookingModal!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.paxType = this.bookingService.getPaxData;
    this.ngbModalRef = this.modalService.open(this.bookingModal, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onSubmit(bookingForm: NgForm) {
    let formValue = bookingForm.value;
    this.bookingDetail.phoneNumber = formValue.phone_no;

    this.bookingDetail.passengerDetails = Object.values(
      _.omit(formValue, 'phone_no')
    );
    this.bookingService.savePassengersDetails(this.bookingDetail);
  }

  ngOnDestroy() {
    this.ngbModalRef.close();
  }
}
