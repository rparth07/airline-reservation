import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomainConstants } from '../shared/domain-constants';
import { SearchService } from '../shared/services/search.service';
import { OneWayResponse } from '../shared/interfaces/response/one-way';
import { MulticityResponse } from '../shared/interfaces/response/multicity';
import { RoundTripResponse } from '../shared/interfaces/response/round-trip';
import { FlightSelectionService } from './flight-selection.service';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
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
    private flightSelectionService: FlightSelectionService
  ) {
    this.route.params.subscribe((params: Params) => {
      const currentRoute = params['tripType'];

      this.isRoundTrip = currentRoute === DomainConstants.TripType.ROUND_TRIP;
      this.isMulticityTrip =
        currentRoute === DomainConstants.TripType.MULTICITY;
      this.getDataFromSnapShot();
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.getDataFromSnapShot();
    });
  }

  ngOnInit(): void {
    this.searchService.setCityList(this.route.snapshot.data['airportNames']);
  }

  clearResultEvent(event: boolean) {
    this.clearResults = event;
  }

  getDataFromSnapShot() {
    this.flightSelectionService.selectedFlightSummary = [];

    if (this.isMulticityTrip) {
      this.multicityResponse = this.route.snapshot.data['flights'];
    } else if (this.isRoundTrip) {
      this.roundTripResponse = this.route.snapshot.data['flights'];
    } else {
      this.oneWayResponse = this.route.snapshot.data['flights'];
    }
  }
}
