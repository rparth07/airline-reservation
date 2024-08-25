import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainConstants } from '../domain-constants';
import { Cities } from '../interfaces/trip-cities';
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchAirports() {
    return this.http.get<Cities[]>(DomainConstants.URL + 'Admin/Airport');
  }
}
