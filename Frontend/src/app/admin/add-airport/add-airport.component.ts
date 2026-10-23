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
  saving = false;
  error = '';

  @Input() airport!: Airport | null;
  constructor(
    private airportService: AirportService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  addAirport(form: NgForm) {
    if (this.saving) return;
    this.error = '';
    if (form.valid) {
      this.saving = true;
      this.airportService.addAirport(form.value).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } });
    }
  }

  updateAirport(airportForm: NgForm, oldAirport: Airport) {
    if (this.saving) return;
    this.error = '';
    if (airportForm.valid) {
      this.saving = true;
      this.airportService.updateAirport(oldAirport, airportForm.value).subscribe({ next: () => { this.saving = false; this.activeModal.close(); }, error: () => { this.saving = false; this.error = 'Could not save. Check the entered values and your admin session, then try again.'; } });
    }
  }

  closeModal() {
    if (this.saving) return;
    this.activeModal.close();
  }
}
