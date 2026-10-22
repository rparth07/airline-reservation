import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compare } from 'fast-json-patch';
import { DomainConstants } from '../../../user/shared/domain-constants';
import { Flight } from '../../flights/flight';
@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) {}
  private url = DomainConstants.URL + 'Admin/Airport/Flight';
  fetchFlights() { return this.http.get<Flight[]>(this.url); }
  addFlight(flight: Flight) { return this.http.post(this.url, flight); }
  addFlightsCSV(form: FormData) { return this.http.post(this.url, form); }
  patchFlight(updated: Flight, old: Flight) {
    return this.http.patch(this.url + '/' + encodeURIComponent(old.flightNumber), compare(old, updated));
  }
  deleteFlight(number: string) { return this.http.delete(this.url + '/' + encodeURIComponent(number)); }
}
