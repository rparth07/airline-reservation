import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightComponent } from './flight-search/flights/flight/flight.component';
import { FlightsComponent } from './flight-search/flights/flights.component';
import { DateSelectionInputComponent } from './flight-search/search-widget/date-selection-input/date-selection-input.component';

import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MulticityComponent } from './home-page/multicity/multicity.component';
import { OneWayRoundComponent } from './home-page/one-way-round/one-way-round.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RidershipCounterCardComponent } from './ridership/ridership-counter-card/ridership-counter-card.component';
import { RidershipComponent } from './ridership/ridership.component';
import { SearchService } from './shared/services/search.service';
import { TripCityComponent } from './trip-inputs/trip-direction/trip-direction.component';
import { TripInputsComponent } from './trip-inputs/trip-inputs.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { CitySearchInputComponent } from './flight-search/search-widget/city-search-input/city-search-input.component';
import { SearchWidgetComponent } from './flight-search/search-widget/search-widget.component';
import { SearchWidgetService } from './flight-search/search-widget/search-widget.service';
import { SummaryComponent } from './flight-search/summary/summary.component';
import { TripListComponent } from './flight-search/trip-list/trip-list.component';
import { CloseOnOutsideClick } from './shared/directive/close-on-outside-click.directive';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AirportNameResolve } from './shared/Resolvers/airport-name.resolve';
import { FlightResolver } from './shared/Resolvers/flight.resolve';
import { DecimalFormatterPipe } from './shared/pipes/decimal-formatter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    FlightsComponent,
    FlightComponent,

    SummaryComponent,
    TripListComponent,
    SearchWidgetComponent,
    RidershipComponent,
    RidershipCounterCardComponent,
    SearchWidgetComponent,
    CitySearchInputComponent,
    DateSelectionInputComponent,
    OneWayRoundComponent,
    HomePageComponent,
    OneWayRoundComponent,
    HeaderComponent,
    TripInputsComponent,
    TripCityComponent,
    MulticityComponent,
    PageNotFoundComponent,
    FlightSearchComponent,
    CloseOnOutsideClick,
    DecimalFormatterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgbModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [
    SearchService,
    SearchWidgetService,
    DatePipe,
    AirportNameResolve,
    FlightResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
