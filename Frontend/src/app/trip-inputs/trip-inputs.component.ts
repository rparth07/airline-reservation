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
  // tripInputs: FormGroup = new FormGroup({});

  @Input('tripType') isOneWay: boolean;
  @Input() isMultiCity: boolean = false;
  dateFormat = DomainConstants.DateFormat;
  returnDate!: Date;

  selectedClass = DomainConstants.FlightClass.ECONOMY;

  classes = [
    DomainConstants.FlightClass.ECONOMY,
    DomainConstants.FlightClass.BUSINESS,
  ];

  constructor(private searchService: SearchService) {
    this.isOneWay = true;
    searchService.changeDate.subscribe((date) => {
      this.returnDate = date;
    });

    // searchService.changePassengerFromGroupData.subscribe(
    //   (passengerFormGroup: FormGroup) => {
    //     this.tripInputs.patchValue({ ridership: passengerFormGroup.value });
    //   }
    // );
  }

  ngOnInit(): void {
    this.returnDate = new Date();

    // this.tripInputs = new FormGroup({
    //   tripDirection: new FormGroup({
    //     sourceCity: new FormControl(),
    //     destinationCity: new FormControl(),
    //     departureDate: new FormControl(),
    //   }),
    //   returnDate: new FormControl(),
    //   flightClass: new FormControl(),
    //   ridership: new FormGroup({
    //     adult: new FormControl(null, Validators.required),
    //     infant: new FormControl(null, Validators.required),
    //     child: new FormControl(null, Validators.required),
    //   }),
    // });
    // this.tripInputs.valueChanges.subscribe((data) => {
    //   this.searchService.tripInputsFormEvent.emit(this.tripInputs);
    // });
  }
  enableReturnDateInputBox() {
    this.isOneWay = false;
    this.searchService.changeTrip.emit(this.isOneWay);
  }
}
