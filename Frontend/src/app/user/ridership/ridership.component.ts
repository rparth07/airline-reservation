import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Ridership } from '../shared/interfaces/ridership';
@Component({
  selector: 'app-ridership',
  templateUrl: './ridership.component.html',
  styleUrls: ['./ridership.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class RidershipComponent implements OnInit {
  passengers = 0;
  hidePassengerCounter: boolean = true;

  @Input('addClass') classToAdd: string = '';
  @Input() passengerCountByType: Ridership = { adult: 1, child: 0, infant: 0 };

  @Output() clearResultEvent = new EventEmitter();
  @Output() valueChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.setPassenger();
  }

  setPassenger() {
    this.passengers = this.getpassengerCount();
  }

  getpassengerCount(): number {
    return (
      this.passengerCountByType.adult +
      this.passengerCountByType.child +
      this.passengerCountByType.infant
    );
  }

  onRidershipCountChange(ridership: Ridership) {
    this.setRiderCount(ridership);
    this.clearResult();
  }

  setRiderCount(passenger: Ridership) {
    this.passengerCountByType = passenger;
    this.setPassenger();
  }

  clearResult() {
    this.clearResultEvent.emit();
  }

  togglePassengerCounter(isPassengersValid: boolean) {
    this.hidePassengerCounter = isPassengersValid;
  }

  onValueChange() {
    this.valueChanged.emit();
  }
}
