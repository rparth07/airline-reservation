using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Domain.Admin
{
    public class FlightGraph
    {
        public FlightGraph(string sourceAirport, string destinationAirport)
        {
            SourceAirport = sourceAirport;
            DestinationAirport = destinationAirport;
        }

        public string SourceAirport { get; set; }
        public string DestinationAirport { get; set; }
        public int Weight { get; set; }

    }
}
