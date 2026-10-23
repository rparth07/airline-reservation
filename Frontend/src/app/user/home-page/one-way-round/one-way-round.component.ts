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
  searching = false;
  searchError = '';
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

  async redirect(form: NgForm) {
    if (form.invalid || this.searching) return;
    const queryParams = this.isOneWay ? this.getOneWayQueryParamsData(form.value) : this.getRoundTripQueryParamsData(form.value);
    if (!this.searchService.validateQuery(queryParams)) { this.searchError='Check airports, passenger counts and travel dates.'; return; }
    this.searching=true;
    this.searchError='';
    try { await this.router.navigate(['user/flights/' + (this.isOneWay ? 'oneway' : 'round-trip')], {queryParams}); }
    catch { this.searchError='Search could not load. Please try again.'; }
    finally { this.searching=false; }
  }
}
