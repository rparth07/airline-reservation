import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cities } from 'src/app/shared/interfaces/trip-cities';
import { map } from 'rxjs';
import { map as _map } from 'lodash';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchAirports() {
    return this.http
      .get<Cities[]>('http://localhost:5031/API/Admin/Airport')
      .pipe(
        map((responseData) => {
          const postArray: Cities[] = _map(responseData, this.mapAirport);
          return postArray;
        })
      );
  }

  mapAirport(value: Cities) {
    return {
      abbreviation: value.abbreviation,
      airportName: value.airportName,
    };
  }
}
