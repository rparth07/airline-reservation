import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from './airport';
import { compare } from 'fast-json-patch';
import { map } from 'rxjs';
import { DomainConstants } from 'src/app/user/shared/domain-constants';

@Injectable({ providedIn: 'root' })
export class AirportService {
  constructor(private http: HttpClient) {}

  addAirportCsvFile(form: FormData) {
    this.http.post(DomainConstants.URL + 'Admin/Airport', form).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
    });
  }

  fetchAirports() {
    return this.http.get<Airport[]>(DomainConstants.URL + 'Admin/Airport').pipe(
      map((response) => {
        const airports: Airport[] = [];
        for (var res of response) {
          const airport: Airport = {
            airportName: res.airportName,
            abbreviation: res.abbreviation,
          };
          airports.push(airport);
        }
        console.log(airports);
        return airports;
      })
    );
  }

  addAirport(airport: Airport) {
    this.http
      .post<Airport>(DomainConstants.URL + 'Admin/Airport', airport)
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
      });
  }

  updateAirport(oldAirport: Airport, newAirport: Airport) {
    const patch = compare(oldAirport, newAirport);
    console.log('patch=', patch);
    this.http
      .patch<Airport>(
        DomainConstants.URL + 'Admin/Airport/' + oldAirport.abbreviation,
        patch
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
      });
  }

  deleteAirport(airportAbbreviation: string) {
    this.http
      .delete<Airport>(
        DomainConstants.URL + 'Admin/Airport/' + airportAbbreviation
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
      });
  }
}
