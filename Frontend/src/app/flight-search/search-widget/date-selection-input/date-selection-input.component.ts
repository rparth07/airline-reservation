import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { DomainConstants } from 'src/app/shared/domain-constants';
import { DateSelection } from 'src/app/shared/interfaces/date-selection';
import { SearchService } from 'src/app/shared/services/search.service';
import { ItineraryDetail } from '../../../shared/interfaces/itinerary-detail.model';

@Component({
  selector: 'app-date-selection-input',
  templateUrl: './date-selection-input.component.html',
  styleUrls: [
    './date-selection-input.component.css',
    '../search-widget.component.css',
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class DateSelectionInputComponent implements OnInit {
  @Input('tripType') tripType!: string;
  @Output() returnDateFormGroup = new EventEmitter<FormGroup>();
  @Input() multicityControl!: ItineraryDetail;
  @Input() name!: string;

  // departureDate!: string;
  // returnDate!: string;
  @Input() tripDate!: DateSelection;
  isReturnDateDisable = true;
  isMultiCity = false;

  constructor(private datePipe: DatePipe) {}

  ngOnChanges(): void {
    this.isReturnDateDisable =
      this.tripType !== DomainConstants.TripType.ROUND_TRIP;
    this.isMultiCity = this.tripType === DomainConstants.TripType.MULTI_CITY;

    this.syncDate();
  }

  syncDate() {
    if (this.multicityControl) {
      this.multicityControl.departureDate = new Date(
        this.tripDate.departureDate
      );
    }
  }
  ngOnInit(): void {
    this.tripDate.departureDate = this.datePipe.transform(
      new Date(),
      DomainConstants.DateFormat
    )!;
    this.tripDate.returnDate = this.tripDate.departureDate;
  }
}
