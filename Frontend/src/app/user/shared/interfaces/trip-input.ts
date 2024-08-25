import { ItineraryDetail } from './itinerary-detail.model';
import { Ridership } from './ridership';

export interface TripInput {
  tripDirection: ItineraryDetail;
  flightClass: string;
  returnDate: string;
  ridership: Ridership;
}
