import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { CityConfig } from '../interfaces/city-search';
import { OneWayRoundSearchWidget } from '../interfaces/one-way-round-search-widget';
import { DateSelection } from '../interfaces/date-selection';
import { Ridership } from '../interfaces/ridership';
import { Cities } from '../interfaces/trip-cities';
import { DatePipe } from '@angular/common';
import { DomainConstants } from '../domain-constants';
import { MulticitySearchWidget } from '../interfaces/multicity-search-widget';
import { ItineraryDetail } from '../interfaces/itinerary-detail.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  city!: Cities[];
  changeTrip = new EventEmitter<boolean>();

  changeDate = new EventEmitter<Date>();
  changePassengerFromGroupData = new EventEmitter<FormGroup>();
  @Output() tripInputsFormEvent = new EventEmitter<FormGroup>();
  @Output() tripDirectionFormEvent = new EventEmitter<{
    tripDirection: FormGroup;
    index: number;
  }>();

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  setCityList(cities: Cities[]) {
    this.city = _.sortBy(cities, ['airportName']);
  }

  getCityList() {
    // console.log(this.city);

    return this.city;
  }

  interchange(cities: CityConfig) {
    let temp: string | null = cities.destinationCity;
    cities.destinationCity = cities.sourceCity;
    cities.sourceCity = temp;
  }

  getDateSelection(query: string): DateSelection {
    let dates: string[] = query.split('_');

    if (dates.length === 2) {
      return {
        departureDate: this.datePipe.transform(
          dates[0],
          DomainConstants.DateFormat
        )!,
        returnDate: this.datePipe.transform(
          dates[1],
          DomainConstants.DateFormat
        )!,
      };
    } else {
      return {
        departureDate: this.datePipe.transform(
          dates[0],
          DomainConstants.DateFormat
        )!,
      };
    }
  }

  getRidership(query: string): Ridership {
    return {
      adult: +query.split('_')[0].split('-')[1],
      child: +query.split('_')[1].split('-')[1],
      infant: +query.split('_')[2].split('-')[1],
    };
  }
  getItineraryList(itineraries: string[]) {
    let itineraryList: ItineraryDetail[] = [];
    for (let i of itineraries) {
      let itinerary = i.split('-');
      itineraryList.push({
        sourceCity: itinerary[0],
        destinationCity: itinerary[1],
        departureDate: new Date(itinerary[2]),
      });
    }
    return itineraryList;
  }

  getOneWayRoundDataFromQuery(query: Params) {
    let data: OneWayRoundSearchWidget;

    let itinerary: string[] = query['itinerary'].split('-');

    data = {
      citySearch: { sourceCity: itinerary[0], destinationCity: itinerary[1] },
      tripDate: this.getDateSelection(itinerary[2]),
      flightClass: query['cabinClass'],
      ridership: this.getRidership(query['paxType']),
      tripType: query['tripType'],
    };
    console.log('query=', query as OneWayRoundSearchWidget);

    return data;
  }

  getMulticityDataFromQuery(query: Params) {
    let data: MulticitySearchWidget;
    console.log('active multicity=', query);

    let itinerary: string[] = query['itinerary'].split('_');
    //itinerary: "AMD-DEL-04/04/2022_DEL-DUB-04/04/2022"
    data = {
      itineraryDetail: this.getItineraryList(itinerary),
      flightClass: query['cabinClass'],
      ridership: this.getRidership(query['paxType']),
      tripType: query['tripType'],
    };
    console.log('query=', query as MulticitySearchWidget);
    return data;
  }
}
