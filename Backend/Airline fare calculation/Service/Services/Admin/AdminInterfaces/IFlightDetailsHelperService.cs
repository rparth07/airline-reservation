using Airfare.Domain.AdminDomains;

namespace Airfare.Service.Services.Admin.AdminInterfaces
{
    public interface IflightDetailsHelperService
    {
        FlightDetails MapFlightPropertyToFlightDetailsData(FlightDetails flightDetailsForCreation, string sourceCity, string destinationCity, string flightOperatorName);
    }
}