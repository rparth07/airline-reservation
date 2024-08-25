import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportComponent } from './airport/airport.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddFlightOperatorComponent } from './add-flight-operator/add-flight-operator.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { AdminComponent } from './admin.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightOperatorComponent } from './flight-operator/flight-operator.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddAirportComponent } from './add-airport/add-airport.component';

const routes: Routes = [
  { path: '', redirectTo: 'flight-operator', pathMatch: 'full' },
  {
    path: 'flight-operator',
    component: FlightOperatorComponent,
  },
  {
    path: 'flight-operator/create',
    component: AddFlightOperatorComponent,
  },
  {
    path: 'admin-profile',
    component: AdminProfileComponent,
  },
  {
    path: '',
    component: AdminHomeComponent,
  },
  {
    path: 'flights',
    component: FlightsComponent,
  },
  {
    path: 'flights/add-flights',
    component: AddFlightComponent,
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'airport',
    component: AirportComponent,
  },
  {
    path: 'airport/create',
    component: AddAirportComponent,
  },
  {
    path: 'flights',
    component: FlightsComponent,
  },
  {
    path: 'flights/add-flights',
    component: AddFlightComponent,
  },
  {
    path: 'admin/flight-operator',
    component: FlightOperatorComponent,
    children: [{ path: 'create', component: AddFlightOperatorComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
