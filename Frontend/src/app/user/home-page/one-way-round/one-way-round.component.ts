import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomainConstants } from '../../shared/domain-constants';
import { TripInput } from '../../shared/interfaces/trip-input';
import { DateFormatService } from '../../shared/services/date-format.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-one-way-round',
  templateUrl: './one-way-round.component.html',
  styleUrls: ['./one-way-round.component.css', '../home-page.component.css'],
})
export class OneWayRoundComponent implements OnInit {
  isSearchDisable: boolean = false;

  @Input('tripType') isOneWay: boolean = true;

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.disableSearch.subscribe((isSearchDisable: boolean) => {
      this.isSearchDisable = isSearchDisable;
    });
  }

  getOneWayQueryParamsData(formData: TripInput) {
    const departureDate = DateFormatService.getFormattedDate(
      formData.tripDirection.departureDate,
      DomainConstants.QueryParamsDateFormat
    );

    return {
      tripType: DomainConstants.QueryParamsTripType.ONE_WAY,
      paxType: this.searchService.getPaxType(formData.ridership),
      cabinClass: formData.flightClass,
      itinerary: `${formData.tripDirection.sourceCity}-${formData.tripDirection.destinationCity}-${departureDate}`,
    };
  }

  getRoundTripQueryParamsData(formData: TripInput) {
    const departureDate = DateFormatService.getFormattedDate(
      formData.tripDirection.departureDate,
      DomainConstants.QueryParamsDateFormat
    );
    const returnDate = DateFormatService.getFormattedDate(
      formData.returnDate,
      DomainConstants.QueryParamsDateFormat
    );
    return {
      tripType: DomainConstants.QueryParamsTripType.ROUND_TRIP,
      paxType: this.searchService.getPaxType(formData.ridership),
      cabinClass: formData.flightClass,
      itinerary: `${formData.tripDirection.sourceCity}-${formData.tripDirection.destinationCity}-${departureDate}_${returnDate}`,
    };
  }

  redirect(oneWayRoundSearchForm: NgForm) {
    let formData = oneWayRoundSearchForm.value;
    if (this.isOneWay) {
      this.router.navigate(['user/flights/oneway'], {
        queryParams: this.getOneWayQueryParamsData(formData),
      });
    } else {
      this.router.navigate(['user/flights/round-trip'], {
        queryParams: this.getRoundTripQueryParamsData(formData),
      });
    }
  }
}
