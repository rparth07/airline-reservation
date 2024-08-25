import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { DomainConstants } from '../shared/domain-constants';
import { Ridership } from '../shared/interfaces/ridership';

import { SearchService } from '../shared/services/search.service';

import { Passenger } from './ridership-counter-card/passenger-type';

@Component({
  selector: 'app-ridership',
  templateUrl: './ridership.component.html',
  styleUrls: ['./ridership.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class RidershipComponent implements OnInit {
  @Input('addClass') classToAdd: string = '';

  passengers = 0;
  hidePassengerCounter: boolean = true;
  @Input() passengerCountByType: Ridership = { adult: 0, child: 0, infant: 0 };
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.passengers = this.getpassengerCount();
  }

  getpassengerCount(): number {
    return (
      this.passengerCountByType.adult +
      this.passengerCountByType.child +
      this.passengerCountByType.infant
    );
  }

  togglePassengerCounter() {
    this.hidePassengerCounter = !this.hidePassengerCounter;
  }
  setPassenger(count: number) {
    this.passengers = count;
  }
  hideCounterBox() {
    this.hidePassengerCounter = true;
  }

  setRiderCountByType(passenger: Ridership) {
    this.passengerCountByType = passenger;
  }
}
