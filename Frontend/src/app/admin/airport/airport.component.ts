import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap } from 'rxjs';
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
      this.airportService.addAirportCsvFile(formData);
    }
    event.target.value = '';
  }

  getAirports(): void {
    this.airports$ = this.airportService.fetchAirports().pipe(
      tap((airport) => {
        this.setTotalPage(airport);
      })
    );
    this.onPageChange(this.selectedPageNumber);
  }

  deleteAirport(airportAbbreviation: string) {
    this.airportService.deleteAirport(airportAbbreviation);
  }

  openUpdateAirportModal(airport?: Airport) {
    const modalRef = this.modalService.open(AddAirportComponent, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });

    if (airport) {
      this.updatableAirport = airport;
    } else {
      this.updatableAirport = null;
    }

    modalRef.componentInstance.airport = this.updatableAirport;
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
