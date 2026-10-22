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
    else return null;
  }

  savePassengersDetails(bookingDetail: BookingDetails) {
    // Do not retry POST automatically: the server may have already saved it.
    return this.http.post<string>(DomainConstants.URL + 'Booking', bookingDetail);
  }
}
