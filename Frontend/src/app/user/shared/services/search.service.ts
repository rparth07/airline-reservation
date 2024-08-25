import { EventEmitter, Injectable, Output } from '@angular/core';
import { Params } from '@angular/router';
import * as _ from 'lodash';
import { CityConfig } from '../interfaces/city-search';
import { OneWayRoundSearchWidget } from '../interfaces/one-way-round-search-widget';
import { DateSelection } from '../interfaces/date-selection';
import { Ridership } from '../interfaces/ridership';
import { Cities } from '../interfaces/trip-cities';
import { DomainConstants } from '../domain-constants';
import { MulticitySearchWidget } from '../interfaces/multicity-search-widget';
import { ItineraryDetail } from '../interfaces/itinerary-detail.model';
import { DateFormatService } from './date-format.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  city!: Cities[];

  changeTrip = new EventEmitter<boolean>();
  changeDate = new EventEmitter<string>();

  @Output() disableSearch = new EventEmitter<boolean>();

  constructor() {}

  setCityList(cities: Cities[]) {
    this.city = _.sortBy(cities, ['airportName']);
  }

  getCityList() {
    return this.city;
  }

  interchange(cities: CityConfig) {
    let temp: string | null = cities.destinationCity;
    cities.destinationCity = cities.sourceCity;
    cities.sourceCity = temp;
  }

  private getDateSelection(query: string): DateSelection {
    let dates: string[] = query.split('_');

    if (dates.length === 2) {
      return {
        departureDate: DateFormatService.getFormattedDate(
          dates[0],
          DomainConstants.DateFormat
        )!,
        returnDate: DateFormatService.getFormattedDate(
          dates[1],
          DomainConstants.DateFormat
        )!,
      };
    } else {
      return {
        departureDate: DateFormatService.getFormattedDate(
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

  private getItineraryList(itineraries: string[]) {
    let itineraryList: ItineraryDetail[] = [];
    for (let i of itineraries) {
      let itinerary = i.split('-');
      itineraryList.push({
        sourceCity: itinerary[0],
        destinationCity: itinerary[1],
        departureDate: DateFormatService.convertDateStringToLocalDateFormat(
          itinerary[2]
        ),
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

    return data;
  }

  getMulticityDataFromQuery(query: Params) {
    let data: MulticitySearchWidget;
    console.log('active multicity=', query);

    let itinerary: string[] = query['itinerary'].split('_');
    data = {
      itineraryDetail: this.getItineraryList(itinerary),
      flightClass: query['cabinClass'],
      ridership: this.getRidership(query['paxType']),
      tripType: query['tripType'],
    };
    return data;
  }

  extractDateFromQueryParameters(query: Params) {
    let itineraryList: string[] = query['itinerary'].split('_');
    let dateList = itineraryList.map((itinerary) => {
      let splittedItinerary = itinerary.split('-');
      return DateFormatService.convertDateStringToLocalDateFormat(
        splittedItinerary[2]
      );
    });
    return dateList;
  }

  getPaxType(ridership: Ridership): string {
    return `A-${ridership.adult == null ? 0 : ridership.adult}_C-${
      ridership.child == null ? 0 : ridership.child
    }_I-${ridership.infant == null ? 0 : ridership.infant}`;
  }

  populateMulticityTripsData(
    tripsData: string[],
    multicityList: ItineraryDetail[]
  ) {
    for (let trip of multicityList) {
      let departureDate = DateFormatService.getFormattedDate(
        trip.departureDate,
        DomainConstants.QueryParamsDateFormat
      );

      tripsData.push(
        `${trip.sourceCity}-${trip.destinationCity}-${departureDate}`
      );
    }
    return tripsData.join('_');
  }
}
