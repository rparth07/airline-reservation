import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AirportComponent } from './airport/airport.component';
import { FlightOperatorComponent } from './flight-operator/flight-operator.component';
import { AddFlightOperatorComponent } from './add-flight-operator/add-flight-operator.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { SharedModule } from '../shared/shared.module';
import { AddAirportComponent } from './add-airport/add-airport.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { FlightsComponent } from './flights/flights.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './sign-in/auth.guard';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SignInComponent,
    FlightOperatorComponent,
    AirportComponent,
    AddFlightOperatorComponent,
    AdminProfileComponent,
    AddAirportComponent,
    SidebarComponent,
    FlightsComponent,
    AddFlightComponent,
    AdminHomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
  ],
  exports: [AdminComponent],

  bootstrap: [AdminComponent],
})
export class AdminModule {}
