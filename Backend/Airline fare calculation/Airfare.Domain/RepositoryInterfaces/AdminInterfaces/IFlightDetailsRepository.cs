using Airfare.Domain.AdminDomains;
using System.Collections.Generic;

namespace Airfare.Domain.RepositoryInterfaces.AdminInterfaces
{
    public interface IFlightDetailsRepository
    {
        void AddFlight(FlightDetails flightDetailsData);
        void AddAllFlights(IEnumerable<FlightDetails> flightDetailsData);
        FlightDetails GetFlight(string airportAbbrivation, string flightNumber);
        IEnumerable<FlightDetails> GetAllFlights(string airportAbbrivation);
        void UpdateFlight(FlightDetails flightFromRepo);
        void DeleteFlight(FlightDetails flightToDelete);
        int GetNumberOfRowsWithSameFlightNumber(string flightNumber);
        void Dispose();
    }
}