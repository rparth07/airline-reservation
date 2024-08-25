using Airfare.Domain.AdminDomains;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Service.Filter;
using Airfare.Service.Services.Admin.AdminInterfaces;


namespace Airfare.Service.Services.Admin
{
    public class FlightDetailsService : IFlightDetailsService
    {
        private readonly IFlightDetailsRepository _flightDetailsRepository;
        private readonly IFlightSearchRepository _flightSearchRepository;


        public FlightDetailsService(IFlightDetailsRepository flightDetailsRepository, IFlightSearchRepository flightGraphRepository)
        {
            _flightDetailsRepository = flightDetailsRepository;
            _flightSearchRepository = flightGraphRepository;
        }

        public FlightDetails AddFlight(FlightDetails flightDetails)
        {
            try
            {
                _flightDetailsRepository.AddFlight(flightDetails);
                FlightGraph flight = new FlightGraph(
                    flightDetails.SourceAirportData.Abbreviation,
                    flightDetails.DestinationAirportData.Abbreviation
                    );
                _flightSearchRepository.AddFlightToGraph(flight);
            }
            catch (Exception)
            {
                throw new BadRequestException(
                    "Something went wrong please check flight number, source airport, destination airport or flight operator"
                    );
            }

            return flightDetails;
        }



        public IEnumerable<FlightDetails> AddAllFlights(IEnumerable<FlightDetails> flights)
        {

            try
            {
                _flightDetailsRepository.AddAllFlights(flights);

                flights.ToList().ForEach(flight =>
                    _flightSearchRepository.AddFlightToGraph(
                        new FlightGraph(
                            flight.SourceAirportData.Abbreviation,
                            flight.DestinationAirportData.Abbreviation
                            )
                        )
                    );
            }
            catch (Exception e)
            {
                throw new BadRequestException(
                    "Something went wrong please check flight number, source airport, destination airport or flight operator"
                    );
            }

            return flights;
        }



        public FlightDetails GetFlight(string airportAbbrivation, string flightNumber)
        {
            var flightDetails = _flightDetailsRepository.GetFlight(airportAbbrivation, flightNumber);
            if (flightDetails == null)
            {
                throw new NotFoundException($"Can not find combination of {airportAbbrivation} and {flightNumber} please check");
            }

            return flightDetails;
        }



        public IEnumerable<FlightDetails> GetAllFlights(string airportAbbrivation)
        {
            var flightDetailList = _flightDetailsRepository.GetAllFlights(airportAbbrivation);
            if (flightDetailList.Count() == 0)
            {
                throw new NotFoundException($"Can not find Any Flights for {airportAbbrivation}");
            }

            return flightDetailList;
        }



        public void UpdateFlight(FlightDetails flightFromRepo)
        {
            _flightDetailsRepository.UpdateFlight(flightFromRepo);

        }

        public void DeleteFlight(FlightDetails flightToDelete)
        {
            _flightDetailsRepository.DeleteFlight(flightToDelete);
            FlightGraph flight = new FlightGraph(
                flightToDelete.SourceAirportData.Abbreviation,
                flightToDelete.DestinationAirportData.Abbreviation
                );
            _flightSearchRepository.RemoveFlightFromGraph(flight);
        }
    }
}
