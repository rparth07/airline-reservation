import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../shared/services/booking.service';
import { SearchService } from '../../shared/services/search.service';
import { FlightSelectionService } from '../flight-selection.service';
import { Summary } from './summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  summaryList: Summary[] = [];

  constructor(
    private flightSelectionService: FlightSelectionService,
    private searchService: SearchService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.flightSelectionService.onSummaryListChange.subscribe((summaryList) => {
      this.summaryList = summaryList;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const paxTypeString = this.route.snapshot.queryParamMap.get('paxType');
    if (paxTypeString) {
      const paxType = this.searchService.getRidership(paxTypeString);
      this.bookingService.setPaxData = paxType;
      this.router.navigate(['user/flights/booking']);
    }
  }
}
