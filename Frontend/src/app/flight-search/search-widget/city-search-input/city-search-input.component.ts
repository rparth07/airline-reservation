import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlContainer, FormArray, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { CityConfig } from 'src/app/shared/interfaces/city-search';
import { DomainConstants } from 'src/app/shared/domain-constants';
import { SearchService } from 'src/app/shared/services/search.service';
import { Cities } from 'src/app/shared/interfaces/trip-cities';
import { ItineraryDetail } from '../../../shared/interfaces/itinerary-detail.model';

@Component({
  selector: 'app-city-search-input',
  templateUrl: './city-search-input.component.html',
  styleUrls: [
    './city-search-input.component.css',
    '../search-widget.component.css',
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class CitySearchInputComponent implements OnInit, OnChanges {
  cities!: Cities[];
  @Input() citiesToInterchange!: CityConfig;

  @Input() multicityControl!: ItineraryDetail;

  @Input() name!: string;
  isDataAvailable: boolean = true;

  currentDate = new Date();
  dateFormat = DomainConstants.DateFormat;

  multicityList: FormArray = new FormArray([]);

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.cities = this.searchService.getCityList();

    if (this.multicityControl) {
      this.syncCities(this.citiesToInterchange, this.multicityControl);
    }
  }

  ngOnChanges() {}

  cityChanged() {
    if (this.multicityControl) {
      this.syncCities(this.citiesToInterchange, this.multicityControl);
    }
  }

  onInterchange() {
    this.searchService.interchange(this.citiesToInterchange);
  }

  private syncCities(latestValues: CityConfig, updatableValues: CityConfig) {
    updatableValues.sourceCity = latestValues.sourceCity;
    updatableValues.destinationCity = latestValues.destinationCity;
  }
}
