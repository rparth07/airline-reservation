import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DomainConstants } from '../shared/domain-constants';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-trip-inputs',
  templateUrl: './trip-inputs.component.html',
  styleUrls: ['./trip-inputs.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class TripInputsComponent implements OnInit {
  returnDate!: string;
  selectedClass = DomainConstants.FlightClass.ECONOMY;
  classes = [
    DomainConstants.FlightClass.ECONOMY,
    DomainConstants.FlightClass.BUSINESS,
  ];

  @Input('tripType') isOneWay: boolean;
  @Input() isMultiCity: boolean = false;

  constructor(private searchService: SearchService) {
    this.isOneWay = true;
    searchService.changeDate.subscribe((date) => {
      this.returnDate = date;
    });
  }

  ngOnInit(): void {}
  enableReturnDateInputBox() {
    this.isOneWay = false;
    this.searchService.changeTrip.emit(this.isOneWay);
  }
}
