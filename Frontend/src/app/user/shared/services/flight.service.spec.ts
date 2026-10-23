import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightService } from './flight.service';
describe('Search failure recovery', () => {
 it('keeps a recoverable state on failure and clears it on retry', () => {
  TestBed.configureTestingModule({imports:[HttpClientTestingModule]});
  const service=TestBed.inject(FlightService); const http=TestBed.inject(HttpTestingController);
  const query={tripType:'O',paxType:'A-1_C-0_I-0',cabinClass:'Economy',itinerary:'MAA-DEL-30/10/2026'};
  let response:any;
  service.fetchFlights(query).subscribe(value=>response=value);
  http.expectOne(request=>request.url.includes('SerachFlight')).flush('Unavailable',{status:503,statusText:'Unavailable'});
  expect(response).toEqual([]); expect(service.lastSearchFailed).toBeTrue();
  service.fetchFlights(query).subscribe();
  http.expectOne(request=>request.url.includes('SerachFlight')).flush([]);
  expect(service.lastSearchFailed).toBeFalse(); http.verify();
 });
});
