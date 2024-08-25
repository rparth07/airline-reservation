using Airfare.Domain.Admin;
using System.Collections.Generic;

namespace Airfare.Domain.RepositoryInterfaces.AdminInterfaces
{
    public interface IFlightDetailsRepository
    {
        void AddFlight(FlightDetails flightDetailsData);
        void AddAllFlights(IEnumerable<FlightDetails> flightDetailsData);
        FlightDetails GetFlight(string flightNumber);
        IEnumerable<FlightDetails> GetAllFlights();
        void UpdateFlight(FlightDetails flightFromRepo);
        FlightDetails DeleteFlight(string flightNumber);
        int GetNumberOfRowsWithSameFlightNumber(string flightNumber);
        void Dispose();
    }
}
