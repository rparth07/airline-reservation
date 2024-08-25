using Airfare.API.Dto.Admin;
using Airfare.API.Helper;
using Airfare.Service.Services.User.UserInterfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Airfare.API.Controllers
{
    [ApiController]
    [Route("API/SerachFlight")]
    public class FlightSearchController : ControllerBase
    {
        private readonly IFlightSearchService _flightSearchService;

        private readonly IMapper _mapper;

        public FlightSearchController(IFlightSearchService flightSearchService, IMapper mapper)
        {
            _flightSearchService = flightSearchService ??
                throw new ArgumentNullException(nameof(flightSearchService));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }


        [HttpGet]
        public IActionResult GetFlight(string itinerary, string tripType, string paxType, string cabinClass)
        {
            switch (tripType)
            {
                case "O":
                    IEnumerable<IEnumerable<FlightDetailsDto>>? oneWayRequest = _mapper.Map<IEnumerable<IEnumerable<FlightDetailsDto>>>(
                        _flightSearchService.GetFlightDetailsForOneWay(itinerary, paxType, cabinClass));

                    return Ok(oneWayRequest);

                case "R":
                    IEnumerable<IEnumerable<IEnumerable<FlightDetailsDto>>>? roundTripRequest = _mapper.Map<IEnumerable<IEnumerable<IEnumerable<FlightDetailsDto>>>>(
                        _flightSearchService.GetFlightDetailsForRoundTrip(itinerary, paxType, cabinClass));

                    return Ok(roundTripRequest);

                case "M":
                    IEnumerable<IEnumerable<IEnumerable<FlightDetailsDto>>>? multiCityRequest = _mapper.Map<IEnumerable<IEnumerable<IEnumerable<FlightDetailsDto>>>>(
                        _flightSearchService.GetFlightDetailsForMultiCity(itinerary, paxType, cabinClass));

                    return Ok(multiCityRequest);

                default:
                    var response = new ResponseObject($"Error: Invalid TripType {tripType}", BadRequest().StatusCode);
                    return BadRequest(response);
            }
        }
    }
}
