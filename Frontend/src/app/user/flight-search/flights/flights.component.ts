import { Component, Input, OnInit } from '@angular/core';
import { ConnectedFlight } from '../../shared/interfaces/response/connected-flights';
import { FlightSelectionService } from '../flight-selection.service';
import { Summary } from '../summary/summary.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  selectedList = 0;
  selectedFlight!: Summary;

  @Input() flightInfoList!: ConnectedFlight[];
  @Input() selectedFlightIndex!: number;

  constructor(private flightSelectionService: FlightSelectionService) {}

  ngOnInit(): void {
    this.sortFlights();
  }

  sortFlights() {
    this.flightInfoList.sort((a, b) =>
      this.calculateChanges(a) < this.calculateChanges(b) ? -1 : 1
    );
  }

  calculateChanges(flightInfo: ConnectedFlight): number {
    let totalCharges = 0;
    for (let flight of flightInfo) {
      totalCharges += flight.charges;
    }
    return totalCharges;
  }

  setSelectedFlight(flightInfo: Summary) {
    this.selectedFlight = flightInfo;
    this.flightSelectionService.addFlightInfo(
      this.selectedFlight,
      this.selectedFlightIndex
    );
  }

  selectFlight(index: number) {
    this.selectedList = index;
  }
}
