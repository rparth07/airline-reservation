import { Subject, of, throwError } from 'rxjs';
import { HomePageComponent } from './home-page.component';

describe('Home startup and recovery', () => {
  let component: HomePageComponent;
  let storage: any;
  let search: any;
  beforeEach(() => {
    storage = { fetchAirports: jasmine.createSpy() };
    search = { changeTrip: new Subject<boolean>(), setCityList: jasmine.createSpy() };
    component = new HomePageComponent(search, storage);
  });
  afterEach(() => component.ngOnDestroy());
  it('renders an unavailable state and recovers with actual airports on retry', () => {
    storage.fetchAirports.and.returnValue(throwError(() => new Error('offline')));
    component.ngOnInit();
    expect(component.airportError).toBeTrue();
    expect(component.loading).toBeFalse();
    expect(component.airportsReady).toBeFalse();
    expect(search.setCityList).not.toHaveBeenCalled();
    const airports = [{ airportName: 'Test airport', abbreviation: 'TST' }];
    storage.fetchAirports.and.returnValue(of(airports));
    component.loadAirports();
    expect(component.airportError).toBeFalse();
    expect(component.airportsReady).toBeTrue();
    expect(search.setCityList).toHaveBeenCalledWith(airports);
  });
  it('prevents overlapping retries and cancels on destruction', () => {
    const pending = new Subject<any>();
    storage.fetchAirports.and.returnValue(pending);
    component.loadAirports();
    component.loadAirports();
    expect(storage.fetchAirports).toHaveBeenCalledTimes(1);
    component.ngOnDestroy();
    pending.next([]);
    expect(search.setCityList).not.toHaveBeenCalled();
  });
});
