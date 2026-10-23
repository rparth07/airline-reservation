import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap } from 'rxjs';
import { BehaviorSubject, combineLatest, shareReplay, catchError, of } from 'rxjs';
import { FlightService } from '../shared/services/flight.service';
import { AddFlightComponent } from '../add-flight/add-flight.component';

import { Flight } from './flight';
import { DomainConstants } from 'src/app/user/shared/domain-constants';
import { PaginationService } from '../shared/services/pagination.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  error = '';
  private filterText = new BehaviorSubject('');
  onFilter(value: string) { this.filterText.next(value.toLowerCase().trim()); this.onPageChange(0); }
  operatingDay = DomainConstants.OperatingDays;
  apiFlightData$!: Observable<Flight[]>;
  currentPageData$!: Observable<Flight[]>;
  updatableFlight!: Flight | null;
  pageSize = 5;
  selectedPageNumber = 0;

  totalPages: number[] = [];

  constructor(
    private flightService: FlightService,
    private modalService: NgbModal,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.apiFlightData$ = combineLatest([this.flightService.fetchFlights().pipe(catchError(() => { this.error = 'Could not load inventory. Please reload or sign in again.'; return of([]); }), shareReplay(1)), this.filterText]).pipe(
      map(([records, term]) => records.filter(record => Object.values(record).some(value => String(value).toLowerCase().includes(term)))),
      tap((flights) => {
        this.setTotalPage(flights);
      })
    );
    this.onPageChange(this.selectedPageNumber);
  }

  addCSVFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const flightsData = new FormData();
      flightsData.append('file', file);
      this.flightService.addFlightsCSV(flightsData).subscribe({ next: () => this.loadFlights(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
    }
    event.target.value = '';
  }

  onDeleteFlight(flightNumber: string) {
    if (!window.confirm("Delete " + flightNumber + " and any associated demo inventory? This cannot be undone.")) return;
    this.flightService.deleteFlight(flightNumber).subscribe({ next: () => this.loadFlights(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
  }

  onUpdateFlight(form: NgForm, currentFlight: Flight) {
    this.flightService.patchFlight(form.value, currentFlight).subscribe({ next: () => this.loadFlights(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
  }

  onPageChange(pageNumber: number) {
    this.selectedPageNumber = pageNumber;

    this.currentPageData$ = this.paginationService
      .getCurrentPageData(
        this.selectedPageNumber,
        this.pageSize,
        this.apiFlightData$
      )
      .pipe(
        map((flights) => {
          return flights.map(flight => ({ ...flight, operatingDaysLabel: DomainConstants.OperatingDays[flight.operatingDays as keyof typeof DomainConstants.OperatingDays] }));

        })
      );
  }

  setTotalPage(flights: Flight[]) {
    this.totalPages = Array(Math.ceil(flights.length / this.pageSize))
      .fill(0)
      .map((x, i) => i);
  }

  openModal(flight?: Flight) {
    const modalRef = this.modalService.open(AddFlightComponent, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
    this.updatableFlight = flight != null ? flight : null;
    modalRef.componentInstance.flight = this.updatableFlight;
    modalRef.result.then(() => this.loadFlights(), () => {});
  }
}
