import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DomainConstants } from '../../shared/domain-constants';
import { PassengerAgeRangeDetail } from '../../shared/interfaces/passenger';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class PassengerComponent implements OnInit {
  minAge = 0;
  maxAge = 0;

  @Input() passengerType!: string;
  @Input() passengerCount = 2;

  constructor() {}

  ngOnInit(): void {
    const passengerType =
      DomainConstants.PassengerAgeRange[
        this.passengerType.toUpperCase() as keyof PassengerAgeRangeDetail
      ];

    this.minAge = passengerType.min;
    this.maxAge = passengerType.max;
  }

  get passengerLoop() {
    return Array(this.passengerCount)
      .fill(0)
      .map((x, i) => i);
  }
}
