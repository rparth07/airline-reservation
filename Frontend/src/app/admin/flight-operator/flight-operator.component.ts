import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FlightOperator } from './flight-operator';
import { FlightOperatorService } from '../shared/services/flight-operator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from '../shared/services/pagination.service';
import { AddFlightOperatorComponent } from '../add-flight-operator/add-flight-operator.component';

@Component({
  selector: 'app-flight-operator',
  templateUrl: './flight-operator.component.html',
  styleUrls: ['./flight-operator.component.css'],
  providers: [FlightOperatorService],
})
export class FlightOperatorComponent implements OnInit {
  operators$!: Observable<FlightOperator[]>;
  currentPageData$!: Observable<FlightOperator[]>;

  pageSize = 5;
  selectedPageNumber = 0;

  totalPages: number[] = [];
  updatableOperator!: FlightOperator | null;

  constructor(
    private flightOperatorService: FlightOperatorService,
    private modalService: NgbModal,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.operators$ = this.flightOperatorService.fetchFlightOperator().pipe(
      tap((operator) => {
        this.setTotalPage(operator);
      })
    );
    this.onPageChange(this.selectedPageNumber);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.flightOperatorService.addFlightOperatorViaCSV(formData);
    }
    event.target.value = '';
  }

  onDelete(operatorName: string) {
    this.flightOperatorService.deleteFlightOperator(operatorName);
  }

  openModal(operator?: FlightOperator) {
    const modalRef = this.modalService.open(AddFlightOperatorComponent, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });

    if (operator) {
      this.updatableOperator = operator;
    } else {
      this.updatableOperator = null;
    }

    modalRef.componentInstance.operator = this.updatableOperator;
  }

  onPageChange(pageNumber: number) {
    this.selectedPageNumber = pageNumber;

    this.currentPageData$ = this.paginationService.getCurrentPageData(
      this.selectedPageNumber,
      this.pageSize,
      this.operators$
    );
  }

  setTotalPage(operators: FlightOperator[]) {
    this.totalPages = Array(Math.ceil(operators.length / this.pageSize))
      .fill(0)
      .map((x, i) => i);
  }
}
