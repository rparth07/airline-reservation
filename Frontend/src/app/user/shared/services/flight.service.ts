import { timeout, catchError, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { DomainConstants } from '../domain-constants';
import { MulticityResponse } from '../interfaces/response/multicity';
import { OneWayResponse } from '../interfaces/response/one-way';
import { RoundTripResponse } from '../interfaces/response/round-trip';

@Injectable({ providedIn: 'root' })
export class FlightService {
  lastSearchFailed = false;
  URL: string = DomainConstants.URL + 'SerachFlight?';
  constructor(private http: HttpClient) {}

  fetchFlights(queryParams: Params) {
    this.lastSearchFailed = false;
    let searchParams = new HttpParams();

    searchParams = searchParams.appendAll(queryParams);
    return this.http.get<
      OneWayResponse | RoundTripResponse | MulticityResponse
    >(this.URL + searchParams).pipe(timeout(90000), catchError(() => { this.lastSearchFailed = true; return of([]); }));
  }
}
