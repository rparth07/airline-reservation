import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainConstants } from '../domain-constants';
import { FlightOperator } from '../../flight-operator/flight-operator';
import { compare } from 'fast-json-patch';
@Injectable()
export class FlightOperatorService {
  constructor(private http: HttpClient) {}

  fetchFlightOperator() {
    return this.http.get<FlightOperator[]>(
      DomainConstants.URL + 'Admin/Operator'
    );
  }

  addFlightOperator(flightOperator: FlightOperator) {
    console.log(flightOperator);

    this.http
      .post<FlightOperator>(
        DomainConstants.URL + 'Admin/Operator',
        flightOperator
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => {
          console.log(err);
        },
      });
  }

  addFlightOperatorViaCSV(formData: FormData) {
    this.http.post(DomainConstants.URL + 'Admin/Operator', formData).subscribe({
      next: (val) => console.log(val),
      error: (err) => console.log(err),
    });
  }

  deleteFlightOperator(operatorName: string) {
    this.http
      .delete(DomainConstants.URL + 'Admin/Operator/' + operatorName)
      .subscribe({
        next: (val) => console.log(val),
        error: (err) => console.log(err),
      });
  }

  patchFlightOperator(
    newOperator: FlightOperator,
    oldOperator: FlightOperator
  ) {
    // const { companyName, ...patchedOperatorFlight } = operatorFlight;
    const patchedOperatorFlight = compare(oldOperator, newOperator);
    this.http
      .patch(
        DomainConstants.URL + 'Admin/Operator/' + oldOperator.companyName,
        patchedOperatorFlight
      )
      .subscribe({
        next: (val) => console.log(val),
        error: (err) => console.log(err),
      });
  }
}
