import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { DomainConstants } from 'src/app/shared/domain-constants';
import { CityConfig } from 'src/app/shared/interfaces/city-search';
import { ItineraryDetail } from 'src/app/shared/interfaces/itinerary-detail.model';
import { Cities } from 'src/app/shared/interfaces/trip-cities';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-trip-direction',
  templateUrl: './trip-direction.component.html',
  styleUrls: ['./trip-direction.component.css', '../trip-inputs.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class TripCityComponent implements OnInit {
  currentDate = new Date();
  dateFormat = DomainConstants.DateFormat;
  isDuplicateCity: boolean = false;

  @Input() isCancelVisible: boolean = true;
  @Input() isShown: boolean = false;
  @Input() index: number = 0;
  @Input() name: string = 'tripDirection';
  @Input() multicityControl!: ItineraryDetail;

  isDataAvailable: boolean = true;

  citiesToInterchange!: CityConfig;

  cities: Cities[] = [];

  constructor(
    private searchService: SearchService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.cities = this.searchService.getCityList();
    this.citiesToInterchange = {
      sourceCity: this.cities[0].abbreviation,
      destinationCity: this.cities[1].abbreviation,
    };
    if (this.multicityControl) {
      this.syncCities(this.multicityControl, this.citiesToInterchange);
      this.currentDate = this.multicityControl.departureDate;
    }
  }

  onInterchange() {
    this.searchService.interchange(this.citiesToInterchange);
  }

  setCurrentDate() {
    this.searchService.changeDate.emit(this.currentDate);
  }

  focusInputChanged() {
    // this.renderer2.selectRootElement('#destinationCity').focus();
    // document.getElementById('destinationCity')!.focus();
  }

  isDuplicateCityEntered() {
    if (
      this.citiesToInterchange.sourceCity ==
      this.citiesToInterchange.destinationCity
    ) {
      this.isDuplicateCity = true;
    } else {
      this.isDuplicateCity = false;
    }
  }

  valueChanged() {
    console.log(this.citiesToInterchange.sourceCity);

    if (this.multicityControl) {
      this.syncCities(this.citiesToInterchange, this.multicityControl);
      this.multicityControl.departureDate = this.currentDate;
    }
  }

  private syncCities(latestValues: CityConfig, updatableValues: CityConfig) {
    updatableValues.destinationCity = latestValues.destinationCity;
    updatableValues.sourceCity = latestValues.sourceCity;
  }
}
