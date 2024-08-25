import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AirportNameResolve } from './shared/Resolvers/airport-name.resolve';
import { FlightResolver } from './shared/Resolvers/flight.resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    resolve: {
      airportNames: AirportNameResolve,
    },
  },
  {
    path: 'flights/:tripType',
    component: FlightSearchComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      airportNames: AirportNameResolve,
      flights: FlightResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
