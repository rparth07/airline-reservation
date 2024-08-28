import { AppSetting } from "src/app/shared/app-setting";

export const DomainConstants = {
  TripType: {
    ONE_WAY: 'oneway',
    ROUND_TRIP: 'round-trip',
    MULTICITY: 'multicity',
  },
  QueryParamsTripType: {
    ONE_WAY: 'O',
    ROUND_TRIP: 'R',
    MULTICITY: 'M',
  },
  FlightClass: {
    ECONOMY: 'Economy',
    BUSINESS: 'Business',
  },
  DateFormat: 'YYYY-MM-DD',
  QueryParamsDateFormat: 'DD/MM/YYYY',
  RiderType: {
    ADULTS: 'adults',
    CHILD: 'child',
    INFANT: 'infant',
  },
  PassengerAgeRange: {
    ADULT: { min: 18, max: 70 },
    CHILD: { min: 3, max: 17 },
    INFANT: { min: 0, max: 2 },
  },
  OperatingDays: {
    0: 'MON-SUN',
    1: 'MON-FRI',
    2: 'SAT-SUN',
  },
  URL: AppSetting.URL,
};
