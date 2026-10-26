import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { map, BehaviorSubject, combineLatest, shareReplay, catchError, of } from 'rxjs';
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
  error = '';
  private filterText = new BehaviorSubject('');
  onFilter(value: string) { this.filterText.next(value.toLowerCase().trim()); this.onPageChange(0); }
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
    this.operators$ = combineLatest([this.flightOperatorService.fetchFlightOperator().pipe(catchError(() => { this.error = 'Could not load inventory. Please reload or sign in again.'; return of([]); }), shareReplay(1)), this.filterText]).pipe(
      map(([records, term]) => records.filter(record => Object.values(record).some(value => String(value).toLowerCase().includes(term)))),
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
      this.flightOperatorService.addFlightOperatorViaCSV(formData).subscribe({ next: () => this.ngOnInit(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
    }
    event.target.value = '';
  }

  onDelete(operatorName: string) {
    if (!window.confirm("Delete " + operatorName + " and any associated demo inventory? This cannot be undone.")) return;
    this.flightOperatorService.deleteFlightOperator(operatorName).subscribe({ next: () => this.ngOnInit(), error: () => { this.error = 'The change could not be saved. Check your session and values, then try again.'; } });
  }

  openModal(operator?: FlightOperator) {
    const modalRef = this.modalService.open(AddFlightOperatorComponent, {
      size: 'lg', centered: true, windowClass: 'admin-editor-window',
      backdrop: 'static',
      keyboard: false,
    });

    if (operator) {
      this.updatableOperator = operator;
    } else {
      this.updatableOperator = null;
    }

    modalRef.componentInstance.operator = this.updatableOperator;
    modalRef.result.then(() => this.ngOnInit(), () => {});
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
