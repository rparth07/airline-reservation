import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MulticityResponse } from '../../shared/interfaces/response/multicity';
import { DateFormatService } from '../../shared/services/date-format.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  selectedTrip: number = 0;
  tripDate!: string[];
  tripWidth!: number;

  @Input() tripList!: MulticityResponse;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query: Params) => {
      this.tripDate = this.searchService
        .extractDateFromQueryParameters(query)
        .map((date) => DateFormatService.longDate(date));
    });

    if (this.tripList) {
      this.tripWidth = 100 / this.tripList.length;
    }
  }

  selectTrip(index: number) {
    this.selectedTrip = index;
  }
}
