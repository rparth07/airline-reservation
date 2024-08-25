import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DomainConstants } from '../../shared/domain-constants';
import { ItineraryDetail } from '../../shared/interfaces/itinerary-detail.model';
import { Cities } from '../../shared/interfaces/trip-cities';
import { DateFormatService } from '../../shared/services/date-format.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-trip-direction',
  templateUrl: './trip-direction.component.html',
  styleUrls: [
    './trip-direction.component.css',
    '../trip-inputs.component.css',
    '../../user.component.css',
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class TripCityComponent implements OnInit {
  currentDate!: string;
  departureDate!: string;
  isDuplicateCity: boolean = false;
  isDataAvailable: boolean = true;
  cities: Cities[] = [];

  @Input() groupName: string = 'tripDirection';
  @Input() citiesToInterchange!: ItineraryDetail;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.currentDate = DateFormatService.getFormattedDate(
      new Date(),
      DomainConstants.DateFormat
    );

    this.departureDate = this.currentDate;
    this.searchService.changeDate.emit(this.departureDate);

    this.cities = this.searchService.getCityList();

    if (!this.citiesToInterchange) {
      this.citiesToInterchange = {
        sourceCity: this.cities[0].abbreviation,
        destinationCity: this.cities[1].abbreviation,
        departureDate: new Date(this.departureDate),
      };
    }
  }

  onInterchange() {
    this.searchService.interchange(this.citiesToInterchange);
  }

  setCurrentDate() {
    this.searchService.changeDate.emit(this.departureDate);
  }

  isDuplicateCityEntered() {
    if (
      this.citiesToInterchange.sourceCity ===
        this.citiesToInterchange.destinationCity &&
      this.citiesToInterchange.sourceCity !== null
    ) {
      this.isDuplicateCity = true;
    } else {
      this.isDuplicateCity = false;
    }
    this.searchService.disableSearch.emit(this.isDuplicateCity);
  }
}
