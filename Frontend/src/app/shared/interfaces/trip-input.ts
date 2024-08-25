import { Ridership } from './ridership';
import { TripData } from './trip-data';

export interface TripInput {
  tripDirection: TripData;
  flightClass: string;
  returnDate: string;
  ridership: Ridership;
}
