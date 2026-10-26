import { of, Subject, throwError } from 'rxjs';
import { BookingFormComponent } from './booking-form.component';

describe('Booking confirmation', () => {
  let service: any;
  let modal: any;
  let router: any;
  let component: BookingFormComponent;
  const form: any = { invalid: false, value: { phone_no: '0000000000' } };
  beforeEach(() => {
    service = { getPaxData: { adult: 1, child: 0, infant: 0 }, savePassengersDetails: jasmine.createSpy() };
    modal = { open: jasmine.createSpy().and.returnValue({ close: jasmine.createSpy() }) };
    router = { navigate: jasmine.createSpy() };
    component = new BookingFormComponent(service, router);
  });
  it('redirects a direct booking URL without passenger state', () => {
    service.getPaxData = null;
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/user/home']);
    expect(modal.open).not.toHaveBeenCalled();
  });
  it('blocks duplicate submissions while a booking is pending', () => {
    service.savePassengersDetails.and.returnValue(new Subject());
    component.onSubmit(form);
    component.onSubmit(form);
    expect(service.savePassengersDetails).toHaveBeenCalledTimes(1);
  });
  it('only reports confirmation after the backend returns a reference', () => {
    service.savePassengersDetails.and.returnValue(of('test-reference'));
    component.onSubmit(form);
    expect(component.bookingId).toBe('test-reference');
    expect(component.saving).toBeFalse();
  });
  it('preserves the form and shows an ambiguous-failure warning', () => {
    service.savePassengersDetails.and.returnValue(throwError(() => new Error('offline')));
    component.onSubmit(form);
    expect(component.bookingId).toBe('');
    expect(component.bookingError).toContain('may have been saved');
    expect(component.saving).toBeFalse();
  });
});
