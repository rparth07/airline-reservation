import { EventEmitter, Injectable, Output } from '@angular/core';
import { Summary } from './summary/summary.model';

@Injectable({
  providedIn: 'root',
})
export class FlightSelectionService {
  private summaryList: Summary[] = [];

  @Output() onSummaryListChange = new EventEmitter<Summary[]>();

  get selectedFlightSummary() {
    return this.summaryList;
  }

  set selectedFlightSummary(summaryList: Summary[]) {
    this.summaryList = [];
  }

  addFlightInfo(flightInfo: Summary, index: number) {
    this.summaryList[index] = flightInfo;
    this.onSummaryListChange.emit(this.summaryList);
  }
}
