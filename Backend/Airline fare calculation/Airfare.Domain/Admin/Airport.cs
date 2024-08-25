using System;
using System.Collections.Generic;

namespace Airfare.Domain.Admin
{
    public class Airport
    {
        public Guid AirportId { get; set; }

        public string AirportName { get; set; }

        public string Abbreviation { get; set; }

        // Flight that are going from Airport
        public ICollection<FlightDetails> DepartureFlights { get; set; } = new List<FlightDetails>();

        // Flight that are coming on Airport
        public ICollection<FlightDetails> ArrivalFlights { get; set; } = new List<FlightDetails>();
    }
}
