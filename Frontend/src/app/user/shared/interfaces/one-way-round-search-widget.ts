import { CityConfig } from './city-search';
import { DateSelection } from './date-selection';
import { Ridership } from './ridership';

export interface OneWayRoundSearchWidget {
  citySearch: CityConfig;
  tripDate: DateSelection;
  flightClass: string;
  ridership: Ridership;
  tripType: string;
}
