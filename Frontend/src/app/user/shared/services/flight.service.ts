import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { DomainConstants } from '../domain-constants';
import { MulticityResponse } from '../interfaces/response/multicity';
import { OneWayResponse } from '../interfaces/response/one-way';
import { RoundTripResponse } from '../interfaces/response/round-trip';

@Injectable({ providedIn: 'root' })
export class FlightService {
  URL: string = DomainConstants.URL + 'SerachFlight?';
  constructor(private http: HttpClient) {}

  fetchFlights(queryParams: Params) {
    let searchParams = new HttpParams();

    searchParams = searchParams.appendAll(queryParams);
    return this.http.get<
      OneWayResponse | RoundTripResponse | MulticityResponse
    >(this.URL + searchParams);
  }
}
