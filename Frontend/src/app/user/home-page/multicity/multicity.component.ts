import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomainConstants } from '../../shared/domain-constants';
import { ItineraryDetail } from '../../shared/interfaces/itinerary-detail.model';
import { Multicity } from '../../shared/interfaces/multicity';
import { DateFormatService } from '../../shared/services/date-format.service';
import { SearchService } from '../../shared/services/search.service';
@Component({
  selector: 'app-multicity',
  templateUrl: './multicity.component.html',
  styleUrls: ['./multicity.component.css', '../home-page.component.css'],
})
export class MulticityComponent implements OnInit {
  searching = false;
  searchError = '';
  tripCount: number = 2;
  isSearchDisable: boolean = false;

  multicityList: ItineraryDetail[] = [
    {
      sourceCity: null,
      destinationCity: null,
      departureDate: new Date(),
    },
  ];

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.disableSearch.subscribe((isSearchDisable: boolean) => {
      this.isSearchDisable = isSearchDisable;
    });
  }

  addTrip() {
    if (this.tripCount < 5) {
      this.tripCount++;
      this.multicityList.push({
        sourceCity: null,
        destinationCity: null,
        departureDate: new Date(),
      });
    }
  }

  removeTrip(index: number) {
    if (this.tripCount > 2) {
      this.tripCount--;
      this.multicityList.splice(index, 1);
    }
  }

  getTripsData(tripDirection: ItineraryDetail) {
    let departureDate = DateFormatService.getFormattedDate(
      tripDirection.departureDate,
      DomainConstants.QueryParamsDateFormat
    );

    const tripsData = [
      `${tripDirection.sourceCity}-${tripDirection.destinationCity}-${departureDate}`,
    ];

    return this.searchService.populateMulticityTripsData(
      tripsData,
      this.multicityList
    );
  }

  getMulticityQueryParamsData(formData: Multicity) {
    return {
      tripType: DomainConstants.QueryParamsTripType.MULTICITY,
      paxType: this.searchService.getPaxType(formData.ridership),
      cabinClass: formData.flightClass,
      itinerary: this.getTripsData(formData.tripDirection),
    };
  }

  async redirect(form: NgForm) {
    if (form.invalid || this.searching) return;
    const queryParams=this.getMulticityQueryParamsData(form.value);
    if (!this.searchService.validateQuery(queryParams)) { this.searchError='Use different airports for each leg, travel dates in order, and valid passenger counts.'; return; }
    this.searching=true; this.searchError='';
    try { await this.router.navigate(['user/flights/multicity'], {queryParams}); }
    catch { this.searchError='Search could not load. Please try again.'; }
    finally { this.searching=false; }
  }
}
