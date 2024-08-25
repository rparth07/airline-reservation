using Airfare.Domain.Admin;
using Airfare.Service.Filter;
using Airfare.Service.Services.Admin.AdminInterfaces;

namespace Airfare.Service.Services.Admin
{
    public class FlightDetailsHelperService : IFlightDetailsHelperService
    {
        private readonly IAirportService _airportService;
        private readonly IOperatorService _operatorService;

        public FlightDetailsHelperService(IAirportService airportService, IOperatorService operatorService)
        {
            _airportService = airportService;
            _operatorService = operatorService;
        }


        public FlightDetails MapFlightPropertyToFlightDetailsData(FlightDetails flightDetails,
                string sourceCity,
                string destinationCity,
                string flightOperatorName)
        {

            flightDetails.SourceAirportData = _airportService.GetAirportFromName(sourceCity);
            flightDetails.DestinationAirportData = _airportService.GetAirportFromName(destinationCity);
            flightDetails.FlightOperator = _operatorService.GetOperatorFromName(flightOperatorName);

            if (flightDetails.SourceAirportData == null || 
                flightDetails.DestinationAirportData == null ||
                flightDetails.FlightOperator == null
                )
            {
                throw new BadRequestException(
                    "Something went wrong please check flight number, source airport, destination airport or flight operator"
                    );
            }

            return flightDetails;
        }
    }
}
