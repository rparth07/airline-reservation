import { Ridership } from './ridership';
import { TripData } from './trip-data';

export interface Multicity {
  multicityList: TripData[];
  tripDirection: TripData;
  flightClass: string;
  returnDate: string;
  ridership: Ridership;
}
