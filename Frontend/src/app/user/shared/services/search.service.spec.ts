import { SearchService } from './search.service';

describe('Search query dates', () => {
  it('parses day-first itinerary and return dates without changing the requested travel days', () => {
    const result = new SearchService().getOneWayRoundDataFromQuery({
      itinerary: 'MAA-DEL-23/11/2026_24/11/2026', cabinClass: 'Economy', paxType: 'A-1_C-0_I-0', tripType: 'R'
    });
    expect(result.tripDate.departureDate).toBe('2026-11-23');
    expect(result.tripDate.returnDate).toBe('2026-11-24');
  });
});
