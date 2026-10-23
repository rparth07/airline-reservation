export interface Flight {
  flightNumber: string;
  flightOperatorName: string;
  operatingDays: number;
  operatingDaysLabel?: string;
  sourceCity: string;
  destinationCity: string;
  sourceDepartureTime: string;
  destinationArrivalTime: string;
  distance: number;
  totalSeatBusiness?: string;
  seatingFormatBusiness?: string;
  totalSeatEconomy?: string;
  seatingFormatEconomy?: string;
}
