using Airfare.Domain.AdminDomains;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IFlightDetailsService
    {
        FlightDetails AddFlight(FlightDetails flightDetailsData);
        IEnumerable<FlightDetails> AddAllFlights(IEnumerable<FlightDetails> flightDetailsData);
        public FlightDetails GetFlight(string airportAbbrivation, string flightNumber);
        public IEnumerable<FlightDetails> GetAllFlights(string airportAbbrivation);
        void UpdateFlight(FlightDetails flightFromRepo);
        void DeleteFlight(FlightDetails flightToDelete);
    }
}
