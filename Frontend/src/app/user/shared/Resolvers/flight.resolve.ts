import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MulticityResponse } from '../interfaces/response/multicity';
import { OneWayResponse } from '../interfaces/response/one-way';
import { RoundTripResponse } from '../interfaces/response/round-trip';
import { FlightService } from '../services/flight.service';

@Injectable()
export class FlightResolver
  implements Resolve<OneWayResponse | RoundTripResponse | MulticityResponse>
{
  constructor(private flightService: FlightService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | OneWayResponse
    | RoundTripResponse
    | MulticityResponse
    | Observable<OneWayResponse | RoundTripResponse | MulticityResponse>
    | Promise<OneWayResponse | RoundTripResponse | MulticityResponse> {
    return this.flightService.fetchFlights(route.queryParams);
  }
}
