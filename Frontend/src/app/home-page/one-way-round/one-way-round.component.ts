import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SearchService } from 'src/app/shared/services/search.service';
import { TripInput } from 'src/app/shared/interfaces/trip-input';
import { DomainConstants } from 'src/app/shared/domain-constants';

@Component({
  selector: 'app-one-way-round',
  templateUrl: './one-way-round.component.html',
  styleUrls: ['./one-way-round.component.css', '../home-page.component.css'],
})
export class OneWayRoundComponent implements OnInit {
  @Input('tripType') isOneWay: boolean = true;
  constructor(
    private router: Router,
    private searchService: SearchService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  getOneWayQueryParamsData(formData: TripInput) {
    const departureDate = this.datePipe.transform(
      formData.tripDirection.departureDate,
      DomainConstants.QueryParamsDateFormat
    );
    //change triptype
    return {
      tripType: 'O',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: `${formData.tripDirection.sourceCity}-${formData.tripDirection.destinationCity}-${departureDate}`,
    };
  }

  getRoundTripQueryParamsData(formData: TripInput) {
    const departureDate = this.datePipe.transform(
      formData.tripDirection.departureDate,
      DomainConstants.QueryParamsDateFormat
    );
    const returnDate = this.datePipe.transform(
      formData.returnDate,
      DomainConstants.QueryParamsDateFormat
    );
    return {
      tripType: 'R',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: `${formData.tripDirection.sourceCity}-${formData.tripDirection.destinationCity}-${departureDate}_${returnDate}`,
    };
  }

  redirect(oneWayRoundSearchForm: NgForm) {
    let formData = oneWayRoundSearchForm.value;
    if (this.isOneWay) {
      this.router.navigate(['flights/oneway'], {
        queryParams: this.getOneWayQueryParamsData(formData),
      });
    } else {
      this.router.navigate(['flights/round-trip'], {
        queryParams: this.getRoundTripQueryParamsData(formData),
      });
    }
  }
}
