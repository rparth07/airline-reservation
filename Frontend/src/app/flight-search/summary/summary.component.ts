import { Component, OnInit } from '@angular/core';
import { Summary } from './summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  summaryList: Summary[] = [
    {
      operatorImagePath: '/assets/images/summary.png',
      itinerary: 'DEL-BLR',
      price: 6700,
    },
    {
      operatorImagePath: '/assets/images/summary.png',
      itinerary: 'BLR-MAA',
      price: 2400,
    },
    {
      operatorImagePath: '/assets/images/summary.png',
      itinerary: 'MAA-DEL',
      price: 5200,
    },
    {
      operatorImagePath: '/assets/images/summary.png',
      itinerary: 'DEL-BLR',
      price: 6000,
    },
    {
      operatorImagePath: '/assets/images/summary.png',
      itinerary: 'BLR-MAA',
      price: 2300,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
