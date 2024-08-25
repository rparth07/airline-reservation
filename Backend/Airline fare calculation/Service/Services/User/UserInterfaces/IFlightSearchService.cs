
using Airfare.Domain.AdminDomains;

namespace Airfare.Service.Services.User.UserInterfaces
{
    public interface IFlightSearchService
    {
        public IEnumerable<IEnumerable<FlightDetails>> GetFlightDetailsForOneWay(string itinerary, string paxType, string flightClass);

        public IEnumerable<IEnumerable<IEnumerable<FlightDetails>>> GetFlightDetailsForRoundTrip(string itinerary, string paxType, string flightClass);

        public IEnumerable<IEnumerable<IEnumerable<FlightDetails>>> GetFlightDetailsForMultiCity(string itinerary, string paxType, string flightClass);

    }
}
