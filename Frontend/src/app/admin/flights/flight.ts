export interface Flight {
  flightNumber: string;
  flightOperatorName: string;
  operatingDays: string;
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
