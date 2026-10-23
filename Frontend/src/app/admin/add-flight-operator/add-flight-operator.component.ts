import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightOperator } from '../flight-operator/flight-operator';
import { FlightOperatorService } from '../shared/services/flight-operator.service';

@Component({
  selector: 'app-add-flight-operator',
  templateUrl: './add-flight-operator.component.html',
  styleUrls: ['./add-flight-operator.component.css'],
  providers: [FlightOperatorService],
})
export class AddFlightOperatorComponent implements OnInit {
  saving = false;
  error = '';

  @Input() operator!: FlightOperator | null;

  constructor(
    private flightOperatorService: FlightOperatorService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  addOperator(bookingForm: NgForm) {
    if (this.saving) return;
    this.error = '';
    if (!bookingForm.valid) return;
    this.saving = true;
      this.flightOperatorService.addFlightOperator(bookingForm.value).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } });
  }

  onUpdate(operatorUpdate: NgForm, oldOperator: FlightOperator) {
    if (this.saving) return;
    this.error = '';
    if (operatorUpdate.valid) {
      const newOperator = operatorUpdate.value;
      this.saving = true;
      this.flightOperatorService.patchFlightOperator(newOperator, oldOperator).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } });
    }
  }

  closeModal() {
    if (this.saving) return;
    this.activeModal.close();
  }
}
