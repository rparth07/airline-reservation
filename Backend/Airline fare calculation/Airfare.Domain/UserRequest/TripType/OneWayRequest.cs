using Airfare.Domain.Admin;
using System;

namespace Airfare.Domain.UserRequest.TripType
{
    public class OneWayRequest : ReservationDetails
    {

        public OneWayRequest()
        {

        }
        public OneWayRequest(
            string sourceAirPort,
            string destinationAirPort,
            DateTime departureDate,
            FlightClass flightClass,
            int adults,
            int child,
            int infant)

            : base(sourceAirPort,
                  destinationAirPort,
                  departureDate,
                  flightClass,
                  adults,
                  child,
                  infant)
        {

        }
    }
}
