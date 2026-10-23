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
  saving = false;
  error = '';

  isInUpdateMode: boolean = false;
  @Input() flight!: Flight;
  constructor(
    private flightService: FlightService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  addUpdate(bookingForm: NgForm) {
    if (this.saving) return;
    this.error = '';
    if (bookingForm.valid) { this.saving = true; this.flightService.addFlight(bookingForm.value).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } }); }
  }

  onUpdate(operatorUpdate: NgForm, oldFlight: Flight) {
    if (this.saving) return;
    this.error = '';
    if (operatorUpdate.valid) {
      const newFlight = operatorUpdate.value;
      this.saving = true;
      this.flightService.patchFlight(newFlight, oldFlight).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } });
    }
  }

  closeModal() {
    if (this.saving) return;
    this.activeModal.close();
  }
}
