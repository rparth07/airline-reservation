using Airfare.Domain.Admin;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IFlightDetailsService
    {
        FlightDetails AddFlight(FlightDetails flightDetailsData);
        IEnumerable<FlightDetails> AddAllFlights(IEnumerable<FlightDetails> flightDetailsData);
        public FlightDetails GetFlight(string flightNumber);
        public IEnumerable<FlightDetails> GetAllFlights();
        void UpdateFlight(FlightDetails flightFromRepo);
        void DeleteFlight(string flightNumber);
    }
}
