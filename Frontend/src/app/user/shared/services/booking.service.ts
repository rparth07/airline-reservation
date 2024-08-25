import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ridership } from '../interfaces/ridership';
import { DomainConstants } from '../domain-constants';
import { BookingDetails } from '../interfaces/booking-details';

@Injectable()
export class BookingService {
  paxData!: Ridership;

  constructor(private http: HttpClient) {}

  set setPaxData(paxData: Ridership) {
    this.paxData = paxData;
  }

  get getPaxData() {
    if (this.paxData) return this.paxData;
    else throw Error('passenger data not found');
  }

  savePassengersDetails(bookingDetail: BookingDetails) {
    return this.http
      .post(DomainConstants.URL + 'Booking', bookingDetail)
      .subscribe((res) => {
        bookingDetail.bookingId = res as string;
      });
  }
}
