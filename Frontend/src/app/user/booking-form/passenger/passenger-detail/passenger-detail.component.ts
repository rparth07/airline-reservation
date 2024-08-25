import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-passenger-detail',
  templateUrl: './passenger-detail.component.html',
  styleUrls: [
    './passenger-detail.component.css',
    '../../booking-form.component.css',
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class PassengerDetailComponent implements OnInit {
  gender = ['Male', 'Female'];
  selectedGender?: string;
  
  @Input() minAge: number = 18;
  @Input() maxAge: number = 70;
  @Input() passengerGroupName = 'passenger';

  constructor() {}

  ngOnInit(): void {}
}
