export interface Passenger {
  name: string;
  age: number;
  gender: string;
}
type AgeRange = { min: number; max: number };
export interface PassengerAgeRangeDetail {
  ADULT: AgeRange;
  CHILD: AgeRange;
  INFANT: AgeRange;
}
