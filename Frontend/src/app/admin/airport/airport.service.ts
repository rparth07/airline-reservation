import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compare } from 'fast-json-patch';
import { DomainConstants } from 'src/app/user/shared/domain-constants';
import { Airport } from './airport';
@Injectable({ providedIn: 'root' })
export class AirportService {
  constructor(private http: HttpClient) {}
  private url = DomainConstants.URL + 'Admin/Airport';
  fetchAirports() { return this.http.get<Airport[]>(this.url); }
  addAirportCsvFile(form: FormData) { return this.http.post(this.url, form); }
  addAirport(airport: Airport) { return this.http.post<Airport>(this.url, airport); }
  updateAirport(oldAirport: Airport, newAirport: Airport) {
    return this.http.patch(this.url + '/' + encodeURIComponent(oldAirport.abbreviation), [{ op: 'replace', path: '/airportName', value: newAirport.airportName }]);
  }
  deleteAirport(abbreviation: string) { return this.http.delete(this.url + '/' + encodeURIComponent(abbreviation)); }
}
