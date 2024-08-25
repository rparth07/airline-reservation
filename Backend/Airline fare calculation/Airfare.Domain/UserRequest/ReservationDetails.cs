using System;

namespace Airfare.Domain.UserRequest
{
    public class ReservationDetails
    {
        public ReservationDetails()
        {

        }
        public ReservationDetails(string SourceAirport,
                                  string DestinationAirport,
                                  DateTime departureTime,
                                  FlightClass flightClass,
                                  int adult,
                                  int child,
                                  int infent)
        {
            SourceCity = SourceAirport;
            DestinationCity = DestinationAirport;
            DepartureDate = departureTime;
            FlightClass = flightClass;
            Adults = adult;
            Children = child;
            Infant = infent;

        }

        public string SourceCity { get; set; }
        public string DestinationCity { get; set; }
        public DateTime DepartureDate { get; set; }
        public FlightClass FlightClass { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int Infant { get; set; }
    }
}
