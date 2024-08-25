import { ConnectedFlight } from './connected-flights';

// export interface RoundTripResponse {
//   departureFlights: ConnectedFlight[];
//   returnFlights: ConnectedFlight[];
// }

export type RoundTripResponse = [ConnectedFlight[], ConnectedFlight[]];
