import { FlightSelectionService } from './flight-selection.service';
import { FlightsComponent } from './flights/flights.component';

describe('Multicity selection persistence', () => {
  it('keeps a non-default choice when switching legs and clears it for a new search', () => {
    const service = new FlightSelectionService();
    const list = new FlightsComponent(service);
    list.selectedFlightIndex = 0;
    list.selectFlight(2);
    list.selectedFlightIndex = 1; list.ngOnChanges();
    expect(list.selectedList).toBe(0);
    list.selectFlight(1);
    list.selectedFlightIndex = 0; list.ngOnChanges();
    expect(list.selectedList).toBe(2);
    service.selectedFlightSummary = [];
    list.ngOnChanges(); expect(list.selectedList).toBe(0);
  });
});
