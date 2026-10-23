import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { SearchWidgetComponent } from './search-widget.component';
import { CitySearchInputComponent } from './city-search-input/city-search-input.component';
import { DateSelectionInputComponent } from './date-selection-input/date-selection-input.component';
import { RidershipComponent } from '../../ridership/ridership.component';
import { RidershipCounterCardComponent } from '../../ridership/ridership-counter-card/ridership-counter-card.component';
import { SearchService } from '../../shared/services/search.service';

describe('Result-page search form regression', () => {
  let fixture: ComponentFixture<SearchWidgetComponent>;
  let route: any;
  let router: any;
  let data: BehaviorSubject<any>;
  beforeEach(async () => {
    data = new BehaviorSubject({});
    route = { data, params: of({tripType:'oneway'}), snapshot: { params:{tripType:'oneway'}, queryParams: {tripType:'O',paxType:'A-1_C-0_I-0',cabinClass:'Economy',itinerary:'AMD-BLR-30/10/2026'} } };
    router = { navigate: jasmine.createSpy().and.returnValue(Promise.resolve(true)) };
    await TestBed.configureTestingModule({
      imports:[CommonModule, FormsModule, NgSelectModule, NgbModule],
      declarations:[SearchWidgetComponent, CitySearchInputComponent, DateSelectionInputComponent, RidershipComponent, RidershipCounterCardComponent],
      providers:[{provide:ActivatedRoute,useValue:route},{provide:Router,useValue:router}]
    }).compileComponents();
    TestBed.inject(SearchService).setCityList([{airportName:'Ahmedabad',abbreviation:'AMD'},{airportName:'Bengaluru',abbreviation:'BLR'},{airportName:'Chennai',abbreviation:'MAA'},{airportName:'Delhi',abbreviation:'DEL'}] as any);
    fixture = TestBed.createComponent(SearchWidgetComponent);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
  });
  it('registers city and date groups and submits a changed search after no results', async () => {
    const c=fixture.componentInstance;
    expect(c.ngForm.value.citySearch.sourceCity).toBe('AMD');
    expect(c.ngForm.value.tripDate.departureDate).toBe('2026-10-30');
    c.oneWayRoundFormData.citySearch={sourceCity:'MAA',destinationCity:'DEL'};
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    fixture.nativeElement.querySelector('button[type=submit]').click(); await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledWith(['user/flights/oneway'],{queryParams:{tripType:'O',paxType:'A-1_C-0_I-0',cabinClass:'Economy',itinerary:'MAA-DEL-30/10/2026'}});
  });
  it('rehydrates all fields when back/forward or a second search changes the query', async () => {
    route.snapshot.queryParams={tripType:'O',paxType:'A-2_C-1_I-0',cabinClass:'Business',itinerary:'DEL-MAA-02/11/2026'};
    data.next({}); fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.componentInstance.ngForm.value.citySearch.sourceCity).toBe('DEL');
    expect(fixture.componentInstance.ngForm.value.tripDate.departureDate).toBe('2026-11-02');
    expect(fixture.componentInstance.selectedFlightClass).toBe('Business');
    expect(fixture.componentInstance.ngForm.value.ridership.adult).toBe(2);
  });
  it('blocks same-airport and over-limit passengers before navigating', () => {
    const c=fixture.componentInstance;
    c.oneWayRoundFormData.citySearch.destinationCity='AMD';
    expect(c.validSearch).toBeFalse();
    c.oneWayRoundFormData.citySearch.destinationCity='DEL'; c.oneWayRoundFormData.ridership.adult=9; c.oneWayRoundFormData.ridership.child=1;
    expect(c.validSearch).toBeFalse();
  });
  it('preserves a valid return date while departure changes', () => {
    const c=new DateSelectionInputComponent();
    c.tripDate={departureDate:'2026-10-30',returnDate:'2026-11-02'};
    c.departureChanged(); expect(c.tripDate.returnDate).toBe('2026-11-02');
    c.tripDate.departureDate='2026-11-05'; c.departureChanged(); expect(c.tripDate.returnDate).toBe('2026-11-05');
  });
});
