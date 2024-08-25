import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DomainConstants } from 'src/app/user/shared/domain-constants';
import { DateSelection } from 'src/app/user/shared/interfaces/date-selection';
import { DateFormatService } from 'src/app/user/shared/services/date-format.service';
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
  currentDate!: string;
  isReturnDateDisable = true;
  isMultiCity = false;

  @Input('tripType') tripType!: string;
  @Input() multicityControl!: ItineraryDetail;
  @Input() groupName!: string;
  @Input() labelHeadingColor: string = 'white';
  @Input() tripDate!: DateSelection;

  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.tripDate.departureDate = DateFormatService.getFormattedDate(
      this.multicityControl ? this.multicityControl.departureDate : new Date(),
      DomainConstants.DateFormat
    )!;

    this.isReturnDateDisable =
      this.tripType !== DomainConstants.TripType.ROUND_TRIP;
    this.isMultiCity = this.tripType === DomainConstants.TripType.MULTICITY;

    // display date correctly
    this.currentDate = DateFormatService.getFormattedDate(
      new Date(),
      DomainConstants.DateFormat
    )!;
    this.tripDate.departureDate = this.currentDate;
    this.tripDate.returnDate = this.currentDate;
  }

  syncDate() {
    if (this.multicityControl) {
      this.multicityControl.departureDate = new Date(
        this.tripDate.departureDate
      );
    }
  }

  onValueChanged() {
    this.valueChange.emit();
  }
}
