using Airfare.Domain.AdminDomains;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IAirportService
    {
        Airport AddAirport(Airport airportDeatilsForCreation);
        void AddAllAirports(IEnumerable<Airport> airportsData);
        public Airport GetAirportByAbbrivation(string abbrivation);
        List<Airport> GetAllAirports();
        public void UpdateAirport(Airport airportId);
        void DeleteAirport(string abbreviation);
        Airport GetAirportFromName(string Name);


    }
}
