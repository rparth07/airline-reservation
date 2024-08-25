import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MulticityResponse } from 'src/app/shared/interfaces/response/multicity';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  selectedTrip: number = 0;
  @Input() tripList!: MulticityResponse;

  tripWidth!: number;

  constructor() {}

  ngOnInit(): void {
    this.tripWidth = 100 / this.tripList.length;
    console.log('triplist =', this.tripList);
  }

  selectTrip(index: number) {
    this.selectedTrip = index;
  }
}
