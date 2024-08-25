import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomainConstants } from '../shared/domain-constants';
import { SearchService } from '../shared/services/search.service';
import { FlightService } from '../shared/services/flight.service';
import { OneWayResponse } from '../shared/interfaces/response/one-way';
import { MulticityResponse } from '../shared/interfaces/response/multicity';
import { RoundTripResponse } from '../shared/interfaces/response/round-trip';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit, OnChanges {
  isRoundTrip: boolean = false;
  isMulticityTrip: boolean = false;
  clearResults = false;
  isEmptyResponse: boolean = false;
  oneWayResponse!: OneWayResponse;
  roundTripResponse!: RoundTripResponse;
  multicityResponse!: MulticityResponse;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private flightService: FlightService
  ) {
    console.log('flight-search');
    // here we need form which is passed by search button
    this.route.params.subscribe((params: Params) => {
      const currentRoute = params['tripType'];
      this.isRoundTrip = currentRoute === DomainConstants.TripType.ROUND_TRIP;
      this.isMulticityTrip =
        currentRoute === DomainConstants.TripType.MULTI_CITY;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  clearResultEvent(event: boolean) {
    this.clearResults = event;
  }
  ngOnInit(): void {
    this.searchService.setCityList(this.route.snapshot.data['airportNames']);
    if (this.isMulticityTrip) {
      this.multicityResponse = this.route.snapshot.data['flights'];
      // if (this.multicityResponse.length == 0) {
      //   this.isEmptyResponse = true;
      // }
      console.log('multicity response=', this.multicityResponse);
    } else if (this.isRoundTrip) {
      this.roundTripResponse = this.route.snapshot.data['flights'];
      // if (this.roundTripResponse.length) {
      //   this.isEmptyResponse = true;
      // }
      console.log('round response=', this.roundTripResponse);
    } else {
      this.oneWayResponse = this.route.snapshot.data['flights'];
      // if (this.oneWayResponse.length == 0) {
      //   this.isEmptyResponse = true;
      // }
      console.log('here=', this.route.snapshot.data['flights']);
      console.log('oneway response=', this.oneWayResponse);
    }
  }
}
