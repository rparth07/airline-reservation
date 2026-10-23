import { Subject } from 'rxjs';
import { AddAirportComponent } from './add-airport.component';

describe('Admin dialog save lifecycle', () => {
  it('keeps failed input available and closes only after a successful response', () => {
    const response=new Subject<any>();
    const service:any={addAirport:jasmine.createSpy().and.returnValue(response)};
    const modal:any={close:jasmine.createSpy()};
    const component=new AddAirportComponent(service,modal);
    const form:any={valid:true,value:{airportName:'Demo Airport',abbreviation:'ZZZ'}};
    component.addAirport(form);
    component.addAirport(form);
    expect(service.addAirport).toHaveBeenCalledTimes(1);
    expect(modal.close).not.toHaveBeenCalled();
    response.error(new Error('Rejected'));
    expect(component.saving).toBeFalse();
    expect(component.error).toContain('Could not save');
    expect(modal.close).not.toHaveBeenCalled();
    const success=new Subject<any>(); service.addAirport.and.returnValue(success);
    component.addAirport(form); success.next({});
    expect(modal.close).toHaveBeenCalledTimes(1);
  });
});
