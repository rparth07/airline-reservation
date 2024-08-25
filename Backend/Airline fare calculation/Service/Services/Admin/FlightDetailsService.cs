using Airfare.Domain.Admin;
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



        public FlightDetails GetFlight(string flightNumber)
        {
            var flightDetails = _flightDetailsRepository.GetFlight(flightNumber);
            if (flightDetails == null)
            {
                throw new NotFoundException($"Can not find combination of {flightNumber} please check");
            }

            return flightDetails;
        }



        public IEnumerable<FlightDetails> GetAllFlights()
        {
            var flightDetailList = _flightDetailsRepository.GetAllFlights();
            if (flightDetailList.Count() == 0)
            {
                throw new NotFoundException($"Can not find Any Flights");
            }

            return flightDetailList;
        }



        public void UpdateFlight(FlightDetails flightFromRepo)
        {
            _flightDetailsRepository.UpdateFlight(flightFromRepo);

        }

        public void DeleteFlight(string flightNumber)
        {
            var flightToDelete = _flightDetailsRepository.DeleteFlight(flightNumber);
            FlightGraph flight = new FlightGraph(
                flightToDelete.SourceAirportData.Abbreviation,
                flightToDelete.DestinationAirportData.Abbreviation
                );
            _flightSearchRepository.RemoveFlightFromGraph(flight);
        }
    }
}
