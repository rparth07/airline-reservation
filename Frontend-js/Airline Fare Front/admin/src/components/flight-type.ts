export type Flight = {
  type: "flight";
  flightNumber: string;
  flightOperator: string;
  operatingDays: string;
  sourceCity: string;
  destinationCity: string;
  startTime: string;
  endTime: string;
  distance: number;
};
