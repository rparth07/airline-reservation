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
  @Input() operator!: FlightOperator | null;

  constructor(
    private flightOperatorService: FlightOperatorService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  addOperator(bookingForm: NgForm) {
    console.log(bookingForm.value);
    if (bookingForm.valid)
      this.flightOperatorService.addFlightOperator(bookingForm.value);
  }

  onUpdate(operatorUpdate: NgForm, oldOperator: FlightOperator) {
    if (operatorUpdate.valid) {
      const newOperator = operatorUpdate.value;
      this.flightOperatorService.patchFlightOperator(newOperator, oldOperator);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
