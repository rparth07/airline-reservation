import { ItineraryDetail } from './itinerary-detail.model';
import { Ridership } from './ridership';

export interface Multicity {
  tripDirection: ItineraryDetail;
  flightClass: string;
  returnDate: string;
  ridership: Ridership;
}
