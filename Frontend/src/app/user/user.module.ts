import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { PassengerDetailComponent } from './booking-form/passenger/passenger-detail/passenger-detail.component';
import { PassengerComponent } from './booking-form/passenger/passenger.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightComponent } from './flight-search/flights/flight/flight.component';
import { FlightsComponent } from './flight-search/flights/flights.component';
import { CitySearchInputComponent } from './flight-search/search-widget/city-search-input/city-search-input.component';
import { DateSelectionInputComponent } from './flight-search/search-widget/date-selection-input/date-selection-input.component';
import { SearchWidgetComponent } from './flight-search/search-widget/search-widget.component';
import { SummaryComponent } from './flight-search/summary/summary.component';
import { TripListComponent } from './flight-search/trip-list/trip-list.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MulticityComponent } from './home-page/multicity/multicity.component';
import { OneWayRoundComponent } from './home-page/one-way-round/one-way-round.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RidershipCounterCardComponent } from './ridership/ridership-counter-card/ridership-counter-card.component';
import { RidershipComponent } from './ridership/ridership.component';
import { DisableAutoComplete } from './shared/disable-auto-complete.directive';
import { AirportNameResolve } from './shared/Resolvers/airport-name.resolve';
import { FlightResolver } from './shared/Resolvers/flight.resolve';
import { BookingService } from './shared/services/booking.service';
import { SearchService } from './shared/services/search.service';
import { TripCityComponent } from './trip-inputs/trip-direction/trip-direction.component';
import { TripInputsComponent } from './trip-inputs/trip-inputs.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DecimalFormatterPipe } from '../shared/pipes/decimal-formatter.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FlightsComponent,
    FlightComponent,
    SummaryComponent,
    TripListComponent,
    SearchWidgetComponent,
    RidershipComponent,
    RidershipCounterCardComponent,
    CitySearchInputComponent,
    DateSelectionInputComponent,
    OneWayRoundComponent,
    HomePageComponent,
    TripInputsComponent,
    TripCityComponent,
    MulticityComponent,
    PageNotFoundComponent,
    FlightSearchComponent,
    BookingFormComponent,
    PassengerComponent,
    PassengerDetailComponent,
    DisableAutoComplete,
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgbModule,
    SharedModule,
  ],
  providers: [
    SearchService,
    BookingService,
    AirportNameResolve,
    FlightResolver,
  ],
  exports: [UserComponent],
  bootstrap: [UserComponent],
})
export class UserModule {}
