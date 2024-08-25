import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ridership } from '../../shared/interfaces/ridership';

@Component({
  selector: 'app-ridership-counter-card',
  templateUrl: './ridership-counter-card.component.html',
  styleUrls: ['./ridership-counter-card.component.css'],
})
export class RidershipCounterCardComponent implements OnInit {
  isValidPassenger: boolean = true;

  @Input() typeOfPassengers: Ridership = { adult: 1, child: 0, infant: 0 };

  @Output() ridershipCountChange = new EventEmitter<Ridership>();
  @Output() isPassengersValidated = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.ridershipCountChange.emit(this.typeOfPassengers);
    this.setPassengerValidation();
  }

  setPassengerValidation() {
    let minAdult: number = this.typeOfPassengers.infant;
    if (
      (this.typeOfPassengers.adult === 0 &&
        this.typeOfPassengers.child >= 0 &&
        this.typeOfPassengers.infant >= 0) ||
      minAdult > this.typeOfPassengers.adult
    ) {
      this.isValidPassenger = false;
    } else {
      this.isValidPassenger = true;
    }
  }

  setPassenger() {
    this.ridershipCountChange.emit(this.typeOfPassengers);
    this.isPassengersValidated.emit(this.isValidPassenger);
    this.valueChange.emit();
  }

  onIncrement(riderType: string) {
    this.typeOfPassengers[riderType as keyof Ridership]++;
  }

  onDecrement(riderType: string) {
    this.typeOfPassengers[riderType as keyof Ridership]--;
  }
}
