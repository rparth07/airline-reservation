import { EventEmitter, Injectable, Output } from '@angular/core';
import { Summary } from './summary/summary.model';

@Injectable({
  providedIn: 'root',
})
export class FlightSelectionService {
  private summaryList: Summary[] = [];
  private selectedIndices = new Map<number, number>();

  selectedIndex(leg: number): number { return this.selectedIndices.get(leg) || 0; }
  rememberIndex(leg: number, index: number) { this.selectedIndices.set(leg, index); }

  @Output() onSummaryListChange = new EventEmitter<Summary[]>();

  get selectedFlightSummary() {
    return this.summaryList;
  }

  set selectedFlightSummary(summaryList: Summary[]) {
    this.summaryList = summaryList;
    if (!summaryList.length) this.selectedIndices.clear();
    this.onSummaryListChange.emit(this.summaryList);
  }

  addFlightInfo(flightInfo: Summary, index: number) {
    this.summaryList[index] = flightInfo;
    this.onSummaryListChange.emit(this.summaryList);
  }
}
