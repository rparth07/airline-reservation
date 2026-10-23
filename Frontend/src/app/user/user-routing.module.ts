import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AirportNameResolve } from './shared/Resolvers/airport-name.resolve';
import { FlightResolver } from './shared/Resolvers/flight.resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'flights/booking',
    component: BookingFormComponent,
  },
  {
    path: 'flights/:tripType',
    component: FlightSearchComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      airportNames: AirportNameResolve,
      flights: FlightResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
