import { ItineraryDetail } from '../../shared/interfaces/itinerary-detail.model';

export class SearchWidgetService {
  private citySearchList: ItineraryDetail[] = [
    {
      sourceCity: 'Rajkot',
      destinationCity: 'Mumbai',
      departureDate: new Date(),
    },
    {
      sourceCity: 'Jammu',
      destinationCity: 'Jaipur',
      departureDate: new Date(),
    },
  ];

  getCitySearchList() {
    return this.citySearchList;
  }
}
