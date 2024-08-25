import { ItineraryDetail } from './itinerary-detail.model';
import { Ridership } from './ridership';

export interface MulticitySearchWidget {
  itineraryDetail: ItineraryDetail[];
  flightClass: string;
  ridership: Ridership;
  tripType: string;
}
