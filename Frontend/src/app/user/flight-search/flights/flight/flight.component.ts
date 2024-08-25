import {
  Component,
  EventEmitter,
  Input,
  
  OnInit,
  Output,
  
} from '@angular/core';
import { ConnectedFlight } from 'src/app/user/shared/interfaces/response/connected-flights';
import { FlightInfo } from 'src/app/user/shared/interfaces/response/flight-info.model';
import { DateFormatService } from 'src/app/user/shared/services/date-format.service';
import { Summary } from '../../summary/summary.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  destinationCity!: string;
  sourceFlightInfo!: FlightInfo;
  destinationFlightInfo!: FlightInfo;
  totalDuration: string = '0 h 0 m';
  noOfStops: string = 'non-stop';

  @Input() flightInfo!: ConnectedFlight;
  @Input() isActive: boolean = false;
  @Input() isFirstFlight!: boolean;
  @Input() totalCharges: number = 0;

  @Output() onFlightSelect = new EventEmitter<Summary>();

  ngOnInit(): void {
    for (let flight of this.flightInfo) {
      this.formatFlightData(flight);
    }

    this.noOfStops = this.setNoOfStopsString(this.flightInfo.length);
    this.sourceFlightInfo = this.flightInfo[0];
    this.destinationFlightInfo = this.flightInfo[this.flightInfo.length - 1];
    this.totalDuration = DateFormatService.calculateDuration(
      this.sourceFlightInfo.sourceDepartureTime,
      this.destinationFlightInfo.destinationArrivalTime
    );

    if (this.isFirstFlight) {
      this.addSelectedFlightToSummaryList();
    }
  }

  setNoOfStopsString(noOfConnectedFlights: number): string {
    return noOfConnectedFlights === 1
      ? 'non-stop'
      : `${noOfConnectedFlights} stop`;
  }

  formatFlightData(flight: FlightInfo) {
    flight.destinationArrivalTime = DateFormatService.padZeroToTime(
      flight.destinationArrivalTime
    );
    flight.sourceDepartureTime = DateFormatService.padZeroToTime(
      flight.sourceDepartureTime
    );
  }

  addSelectedFlightToSummaryList() {
    const selectedFlight: Summary = {
      operatorImagePath: '/assets/images/summary.png',
      itinerary:
        this.sourceFlightInfo.sourceCity +
        '-' +
        this.destinationFlightInfo.destinationCity,
      price: this.totalCharges,
    };
    this.onFlightSelect.emit(selectedFlight);
  }
}
