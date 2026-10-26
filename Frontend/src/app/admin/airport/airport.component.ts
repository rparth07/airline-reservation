import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap } from 'rxjs';
import { BehaviorSubject, combineLatest, shareReplay, catchError, of } from 'rxjs';
import { AddAirportComponent } from '../add-airport/add-airport.component';
import { PaginationService } from '../shared/services/pagination.service';
import { Airport } from './airport';
import { AirportService } from './airport.service';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
})
export class AirportComponent implements OnInit {
  error = '';
  private filterText = new BehaviorSubject('');
  onFilter(value: string) { this.filterText.next(value.toLowerCase().trim()); this.onPageChange(0); }
  airports$!: Observable<Airport[]>;
  currentPageData$!: Observable<Airport[]>;

  pageSize = 5;
  selectedPageNumber = 0;

  totalPages: number[] = [];
  updatableAirport!: Airport | null;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private airportService: AirportService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getAirports();
  }

  addCsv(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.airportService.addAirportCsvFile(formData).subscribe({ next: () => this.getAirports(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
    }
    event.target.value = '';
  }

  getAirports(): void {
    this.airports$ = combineLatest([this.airportService.fetchAirports().pipe(catchError(() => { this.error = 'Could not load inventory. Please reload or sign in again.'; return of([]); }), shareReplay(1)), this.filterText]).pipe(
      map(([records, term]) => records.filter(record => Object.values(record).some(value => String(value).toLowerCase().includes(term)))),
      tap((airport) => {
        this.setTotalPage(airport);
      })
    );
    this.onPageChange(this.selectedPageNumber);
  }

  deleteAirport(airportAbbreviation: string) {
    if (!window.confirm("Delete " + airportAbbreviation + " and any associated demo inventory? This cannot be undone.")) return;
    this.airportService.deleteAirport(airportAbbreviation).subscribe({ next: () => this.getAirports(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
  }

  openUpdateAirportModal(airport?: Airport) {
    const modalRef = this.modalService.open(AddAirportComponent, {
      size: 'lg', centered: true, windowClass: 'admin-editor-window',
      backdrop: 'static',
      keyboard: false,
    });

    if (airport) {
      this.updatableAirport = airport;
    } else {
      this.updatableAirport = null;
    }

    modalRef.componentInstance.airport = this.updatableAirport;
    modalRef.result.then(() => this.getAirports(), () => {});
  }

  onPageChange(pageNumber: number) {
    this.selectedPageNumber = pageNumber;

    this.currentPageData$ = this.paginationService.getCurrentPageData(
      this.selectedPageNumber,
      this.pageSize,
      this.airports$
    );
  }

  setTotalPage(airports: Airport[]) {
    this.totalPages = Array(Math.ceil(airports.length / this.pageSize))
      .fill(0)
      .map((x, i) => i);
  }
}
