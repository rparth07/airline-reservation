import { Component, Input, OnInit } from '@angular/core';
import { ConnectedFlight } from 'src/app/shared/interfaces/response/connected-flights';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  @Input() flightInfo!: ConnectedFlight;
  @Input() isActive: boolean = false;
  charges!: number;
  destinationCity!: string;
  constructor() {}

  ngOnInit(): void {
    console.log('flightinfo=', this.flightInfo);
    for (let flight of this.flightInfo) {
      this.charges += flight.charges;
    }
    this.destinationCity =
      this.flightInfo[this.flightInfo.length - 1].destinationCity;
  }
}
