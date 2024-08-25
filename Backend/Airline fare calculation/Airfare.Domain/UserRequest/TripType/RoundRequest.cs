using Airfare.Domain.Admin;
using System;

namespace Airfare.Domain.UserRequest.TripType
{
    public class RoundRequest : ReservationDetails
    {
        public RoundRequest()
        {

        }
        public DateTime ReturnDate { get; set; }

        public RoundRequest(
            string sourceAirPort,
            string destinationAirPort,
            DateTime departureDate,
            DateTime returnDate,
            FlightClass flightClass,
            int adults,
            int child,
            int infant)

            : base(
                sourceAirPort,
                destinationAirPort,
                departureDate,
                flightClass,
                adults,
                child,
                infant)
        {
            this.ReturnDate = returnDate;

        }


    }
}
