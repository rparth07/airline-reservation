import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { find } from 'lodash';
import { DomainConstants } from 'src/app/shared/domain-constants';
import { Ridership } from 'src/app/shared/interfaces/ridership';
import { Passenger } from './passenger-type';

@Component({
  selector: 'app-ridership-counter-card',
  templateUrl: './ridership-counter-card.component.html',
  styleUrls: ['./ridership-counter-card.component.css'],
})
export class RidershipCounterCardComponent implements OnInit {
  @Output() setPassengers = new EventEmitter<number>();
  @Output() countOfRiderByType = new EventEmitter<Ridership>();
  totalCount = 0;
  @Input() typeOfPassengers: Ridership = { adult: 0, child: 0, infant: 0 };
  constructor() {}
  ngOnInit(): void {
    this.countOfRiderByType.emit(this.typeOfPassengers);
  }

  get key() {
    return Object.keys(this.typeOfPassengers);
  }

  onIncrement(riderType: string) {
    this.typeOfPassengers[riderType as keyof Ridership]++;
    this.totalCount++;
    this.setPassengers.emit(this.totalCount);
    this.countOfRiderByType.emit(this.typeOfPassengers);
  }

  onDecrement(riderType: string) {
    this.typeOfPassengers[riderType as keyof Ridership]--;

    if (this.totalCount > 0) {
      this.totalCount--;
      this.setPassengers.emit(this.totalCount);
      this.countOfRiderByType.emit(this.typeOfPassengers);
    }
  }
}
