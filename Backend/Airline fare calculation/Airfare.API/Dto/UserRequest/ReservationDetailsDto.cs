using Airfare.Domain;
using Airfare.Domain.Admin;

namespace Airfare.API.Dto.UserRequest
{
    public class ReservationDetailsDto
    {
        public ReservationDetailsDto()
        {

        }
        public ReservationDetailsDto(Airport SourceAirportData,
                                  Airport DestinationAirportData,
                                  DateTime departureTime,
                                  FlightClass flightClass,
                                  int adult,
                                  int child,
                                  int infent)
        {
            SourceCity = SourceAirportData;
            DestinationCity = DestinationAirportData;
            DepartureDate = departureTime;
            FlightClass = flightClass;
            Adults = adult;
            Childern = child;
            Infant = infent;

        }

        public Airport SourceCity { get; set; }
        public Airport DestinationCity { get; set; }
        public DateTime DepartureDate { get; set; }
        public FlightClass FlightClass { get; set; }
        public int Adults { get; set; }
        public int Childern { get; set; }
        public int Infant { get; set; }
    }
}
