using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using Airfare.Service.Filter;
using Airfare.Service.Services.Admin.AdminInterfaces;

namespace Airfare.Service.Services.Admin
{
    public class AirportService : IAirportService
    {
        private readonly IAirportRepository _airportRepository;

        public AirportService(IAirportRepository airfareRepository)
        {
            _airportRepository = airfareRepository;
        }

        public Airport AddAirport(Airport airportDeatils)
        {
            try
            {
                _airportRepository.AddAirport(airportDeatils);
                _airportRepository.Save();
            }
            catch (Exception)
            {
                throw new BadRequestException("One or More Airport Already exists, please try again with new airport");
            }
            return airportDeatils;
        }



        public void AddAllAirports(IEnumerable<Airport> parsedAirportsData)
        {
            try
            {
                _airportRepository.AddAllAirports(parsedAirportsData);
                _airportRepository.Save();
            }
            catch (Exception)
            {
                throw new BadRequestException("One or More Airport Already exists, please try again with new airport");
            }
        }

        public Airport GetAirportByAbbrivation(string abbreviation)
        {
            var airportToReturn = _airportRepository.GetAirPortByAbbrivation(abbreviation);
            if (airportToReturn == null)
            {
                throw new NotFoundException($"Airport with {abbreviation} not Found");
            }
            return airportToReturn;
        }

        public List<Airport> GetAllAirports()
        {
            return _airportRepository.GetAllAirports();
        }



        public void UpdateAirport(Airport airport)
        {
            _airportRepository.UpdateAirport(airport);
        }



        public void DeleteAirport(string abbreviation)
        {
            try
            {
                Airport airPortFromRepo = _airportRepository.GetAirPortByAbbrivation(abbreviation);
                _airportRepository.DeleteAirport(airPortFromRepo);
                _airportRepository.Save();
            }

            catch (Exception)
            {
                throw new NotFoundException($"Airport with {abbreviation} not Found");
            }
        }

        public Airport GetAirportFromName(string airportName)
        {
            return _airportRepository.GetAirportFromName(airportName);
        }

    }
}
