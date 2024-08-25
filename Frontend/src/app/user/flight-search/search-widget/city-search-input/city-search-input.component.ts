import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CityConfig } from 'src/app/user/shared/interfaces/city-search';
import { Cities } from 'src/app/user/shared/interfaces/trip-cities';
import { SearchService } from 'src/app/user/shared/services/search.service';

@Component({
  selector: 'app-city-search-input',
  templateUrl: './city-search-input.component.html',
  styleUrls: [
    './city-search-input.component.css',
    '../search-widget.component.css',
    '../../../user.component.css',
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class CitySearchInputComponent implements OnInit {
  cities!: Cities[];
  isDuplicateCity: boolean = false;

  @Input() labelHeadingColor: string = 'white';
  @Input() citiesToInterchange!: CityConfig;
  @Input() groupName!: string;

  @Output() valueChange = new EventEmitter();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.cities = this.searchService.getCityList();
  }

  onInterchange() {
    this.searchService.interchange(this.citiesToInterchange);
  }

  onValueChanged() {
    this.valueChange.emit();
  }

  isDuplicateCityEntered() {
    if (
      this.citiesToInterchange.sourceCity ==
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
