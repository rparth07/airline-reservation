using Airfare.Domain.Admin;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IFlightDetailsHelperService
    {
        FlightDetails MapFlightPropertyToFlightDetailsData(FlightDetails flightDetailsForCreation, string sourceCity, string destinationCity, string flightOperatorName);
    }
}
