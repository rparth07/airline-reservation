import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compare } from 'fast-json-patch';
import { DomainConstants } from '../domain-constants';
import { FlightOperator } from '../../flight-operator/flight-operator';
@Injectable()
export class FlightOperatorService {
  constructor(private http: HttpClient) {}
  private url = DomainConstants.URL + 'Admin/Operator';
  fetchFlightOperator() { return this.http.get<FlightOperator[]>(this.url); }
  addFlightOperator(operator: FlightOperator) { return this.http.post(this.url, operator); }
  addFlightOperatorViaCSV(form: FormData) { return this.http.post(this.url, form); }
  deleteFlightOperator(name: string) { return this.http.delete(this.url + '/' + encodeURIComponent(name)); }
  patchFlightOperator(updated: FlightOperator, old: FlightOperator) {
    return this.http.patch(this.url + '/' + encodeURIComponent(old.companyName), ['baseFare', 'tax', 'convenience'].map(key => ({ op: 'replace', path: '/' + key, value: +(updated as any)[key] })));
  }
}
