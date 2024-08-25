using Airfare.Domain.AdminDomains;
using Airfare.Domain.UserRequest;
using Airfare.Domain.UserRequest.TripType;
using System;
using System.Collections.Generic;

namespace Airfare.Domain.RepositoryInterfaces.UserInterfaces
{
    public interface IFlightSearchRepository
    {
     
        public List<FlightDetails> GetFlightDetails(DateTime date, string sourceCity, string destinationCity);

        void AddFlightToGraph(FlightGraph flightGraph);
        void RemoveFlightFromGraph(FlightGraph flightGraph);
        List<string> GetConnectedAirports(string sourceAirport);
    }
}
