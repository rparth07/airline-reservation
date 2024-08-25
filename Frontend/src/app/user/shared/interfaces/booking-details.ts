import { Passenger } from './passenger';

export interface BookingDetails {
  bookingId?: string;
  phoneNumber: string;
  passengerDetails: Passenger[];
}
