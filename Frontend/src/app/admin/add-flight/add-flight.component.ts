import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Flight } from '../flights/flight';
import { FlightService } from '../shared/services/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
})
export class AddFlightComponent implements OnInit {
  isInUpdateMode: boolean = false;
  @Input() flight!: Flight;
  constructor(
    private flightService: FlightService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  addUpdate(bookingForm: NgForm) {
    if (bookingForm.valid) this.flightService.addFlight(bookingForm.value);
  }

  onUpdate(operatorUpdate: NgForm, oldFlight: Flight) {
    if (operatorUpdate.valid) {
      const newFlight = operatorUpdate.value;
      this.flightService.patchFlight(newFlight, oldFlight);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
