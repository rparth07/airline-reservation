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

describe('Full itinerary validation', () => {
 it('rejects out-of-order multicity dates and invalid combined passenger counts', () => {
  const service=new SearchService();
  const query={tripType:'M',paxType:'A-1_C-0_I-0',cabinClass:'Economy',itinerary:'MAA-DEL-02/11/2026_DEL-BOM-30/10/2026'};
  expect(service.validateQuery(query)).toBeFalse();
  query.itinerary='MAA-DEL-30/10/2026_DEL-BOM-02/11/2026';
  expect(service.validateQuery(query)).toBeTrue();
  query.paxType='A-9_C-1_I-0'; expect(service.validateQuery(query)).toBeFalse();
 });
});
