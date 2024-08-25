using Airfare.Domain.AdminDomains;
using System;
using System.Collections.Generic;

namespace Airfare.Domain.RepositoryInterfaces.AdminInterfaces
{
    public interface IAirportRepository
    {
        void AddAirport(Airport airportDeatilsForCreation);
        void AddAllAirports(IEnumerable<Airport> airportsData);
        Airport GetAirport(Guid airportId);
        List<Airport> GetAllAirports();
        Airport GetAirportFromName(string airportName);
        Airport GetAirPortByAbbrivation(string abbreviation);
        string GetAirportName(Guid airportId);
        Guid GetAirportId(string airportName);
        void UpdateAirport(Airport airport);
        void DeleteAirport(Airport airPortFromRepo);
        bool Save();
        void Dispose();
    }
}
