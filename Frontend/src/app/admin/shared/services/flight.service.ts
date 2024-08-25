import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../../flights/flight';
import { DomainConstants } from '../../../user/shared/domain-constants';
import { compare } from 'fast-json-patch';
import { NgForm } from '@angular/forms';
import { map, shareReplay } from 'rxjs';
import { flip, tap } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  fetchFlights() {
    return this.http
      .get<Flight[]>(DomainConstants.URL + 'Admin/Airport/Flight/')
      .pipe(
        map((res) => {
          const flights: Flight[] = [];
          res.forEach((flight) => {
            flights.push({
              flightNumber: flight.flightNumber,
              flightOperatorName: flight.flightOperatorName,
              operatingDays: flight.operatingDays,
              sourceCity: flight.sourceCity,
              destinationCity: flight.destinationCity,
              sourceDepartureTime: flight.sourceDepartureTime,
              destinationArrivalTime: flight.destinationArrivalTime,
              distance: flight.distance,
              totalSeatBusiness: flight.totalSeatBusiness,
              seatingFormatBusiness: flight.seatingFormatBusiness,
              totalSeatEconomy: flight.totalSeatEconomy,
              seatingFormatEconomy: flight.seatingFormatEconomy,
            });
          });
          return flights;
        })
      );
  }

  addFlight(flight: Flight) {
    console.log(flight);

    return this.http
      .post(DomainConstants.URL + 'Admin/Airport/Flight', flight)
      .subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
  }

  addFlightsCSV(formData: FormData) {
    this.http
      .post(DomainConstants.URL + 'Admin/Airport/Flight/', formData)
      .subscribe(
        () => {},
        (err) => {
          console.log(err);
        }
      );
  }

  patchFlight(updatedFlight: Flight, oldFlight: Flight) {
    const patch = compare(oldFlight, updatedFlight);

    this.http
      .patch(
        'http://localhost:5031/API/Admin/Airport/Flight/' +
          oldFlight.flightNumber,

        patch
      )
      .subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
  }
  deleteFlight(flightNumber: string) {
    return this.http.delete(
      'http://localhost:5031/API/Admin/Airport/Flight/' + flightNumber
    );
  }
}
