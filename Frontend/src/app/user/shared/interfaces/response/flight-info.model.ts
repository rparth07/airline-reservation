export interface FlightInfo {
  flightNumber: string;
  flightOperatorName: string;
  sourceCity: string;
  destinationCity: string;
  sourceDepartureTime: string;
  destinationArrivalTime: string;
  totalSeatEconomy: number;
  totalSeatBusiness: number;
  seatingFormatEconomy: number;
  seatingFormatBusiness: number;
  operatingDays: number;
  distance: number;
  charges: number;
}
