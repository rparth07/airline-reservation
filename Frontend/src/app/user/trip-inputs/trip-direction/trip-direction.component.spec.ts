import { SearchService } from '../../shared/services/search.service';
import { TripCityComponent } from './trip-direction.component';
import { MulticityComponent } from '../../home-page/multicity/multicity.component';

describe('Home multicity date selection', () => {
  it('serializes the chosen date of an added flight rather than its initial date', () => {
    const service = new SearchService();
    service.setCityList([{airportName:'Ahmedabad',abbreviation:'AMD'},{airportName:'Bengaluru',abbreviation:'BLR'}] as any);
    const multi = new MulticityComponent({} as any, service);
    const leg = multi.multicityList[0];
    leg.sourceCity = 'MAA'; leg.destinationCity = 'DEL';
    const input = new TripCityComponent(service);
    input.citiesToInterchange = leg;
    input.ngOnInit(); input.departureDate = '2099-11-16'; input.setCurrentDate();
    const query = multi.getMulticityQueryParamsData({tripDirection:{sourceCity:'AMD',destinationCity:'BLR',departureDate:'2099-11-15'},flightClass:'Economy',ridership:{adult:1,child:0,infant:0}} as any);
    expect(query.itinerary).toBe('AMD-BLR-15/11/2099_MAA-DEL-16/11/2099');
  });
});
