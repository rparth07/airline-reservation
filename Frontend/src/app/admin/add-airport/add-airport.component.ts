import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Airport } from '../airport/airport';
import { AirportService } from '../airport/airport.service';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css'],
})
export class AddAirportComponent implements OnInit {
  @Input() airport!: Airport | null;
  constructor(
    private airportService: AirportService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.airport);
  }

  addAirport(form: NgForm) {
    if (form.valid) {
      this.airportService.addAirport(form.value);
    }
  }

  updateAirport(airportForm: NgForm, oldAirport: Airport) {
    if (airportForm.valid) {
      this.airportService.updateAirport(oldAirport, airportForm.value);
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
