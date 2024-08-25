using Airfare.API.ActionConstraints;
using Airfare.API.CSVParserModel;
using Airfare.API.Dto.Admin;
using Airfare.API.Helper;
using Airfare.Domain.AdminDomains;
using Airfare.Service.Services.Admin.AdminInterfaces;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Airfare.API.Controllers
{
    [ApiController]
    [Route("API/Admin/Airport")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightDetailsService _flightDetailsService;
        private readonly IflightDetailsHelperService _flightDetailsHelperService;
        private readonly IMapper _mapper;

        public FlightController(IFlightDetailsService flightDetailsService, IMapper mapper, IflightDetailsHelperService flightDetailsHelperService)
        {
            _flightDetailsService = flightDetailsService ??
                throw new ArgumentNullException(nameof(flightDetailsService));
            _flightDetailsHelperService = flightDetailsHelperService ??
                throw new ArgumentNullException(nameof(flightDetailsHelperService));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost("Flight")]
        [RequestHeaderMatchesMediaType("Content-Type",
        "application/json")]
        [Consumes("application/json")]
        public IActionResult CreateFlight(FlightDetailsDto flightDetailsForCreation)
        {

            var flightDetails = _mapper.Map<FlightDetails>(flightDetailsForCreation);

            FlightDetails flightDetailToAdd = 
                _flightDetailsHelperService.MapFlightPropertyToFlightDetailsData(
                    flightDetails,
                    flightDetailsForCreation.SourceCity,
                    flightDetailsForCreation.DestinationCity,
                    flightDetailsForCreation.FlightOperatorName
                    );

            FlightDetailsDto flightToReturn = _mapper.Map<FlightDetailsDto>(_flightDetailsService.AddFlight(flightDetailToAdd));

            return CreatedAtRoute("GetFlight",
                new { airportAbbrivation = flightToReturn.SourceCity, flightNumber = flightToReturn.FlightNumber },
                flightToReturn);
        }



        [HttpPost("Flight"), DisableRequestSizeLimit]
        public IActionResult CreateFlight()
        {
            IFormFile? file = Request.Form.Files[0];

            List<ParsedFlightDetails> flightParser = new ParsedFlightDetails().ParseData(file);


            List<FlightDetails> flightDetailsToAdd = new List<FlightDetails>();

            flightParser.ForEach(parsedFlight => {

                FlightDetails flight = _mapper.Map<FlightDetails>(parsedFlight);
                
                flightDetailsToAdd.Add(
                    _flightDetailsHelperService.MapFlightPropertyToFlightDetailsData(
                        flight, 
                        parsedFlight.SourceCity,
                        parsedFlight.DestinationCity, 
                        parsedFlight.FlightOperatorName
                    ));
            });


            var flightDetailsDataList = _flightDetailsService.AddAllFlights(flightDetailsToAdd);

            var response = new ResponseObject("Success: Data Appended Successfully", Ok().StatusCode);
            return Ok(response);
        }


        [HttpGet("{airportAbbrivation}/Flight/{flightNumber}", Name = "GetFlight")]
        public IActionResult GetFlight(string airportAbbrivation, string flightNumber)
        {
            FlightDetails flightFromRepo = _flightDetailsService.GetFlight(airportAbbrivation, flightNumber);
            var flightToReturn = _mapper.Map<FlightDetailsDto>(flightFromRepo);
            return Ok(flightToReturn);
        }



        [HttpGet("{airportAbbrivation}/Flight")]
        public IActionResult GetAllFlights(string airportAbbrivation)
        {
            IEnumerable<FlightDetailsDto> flightFromRepo =
                _mapper.Map<IEnumerable<FlightDetailsDto>>(_flightDetailsService.GetAllFlights(airportAbbrivation));

            return Ok(flightFromRepo);
        }


        
        [HttpPatch("{airportAbbrivation}/Flight/{flightNumber}")]
        public IActionResult UpdateFlight(
            string airportAbbrivation,
            string flightNumber,
            JsonPatchDocument<FlightDetailsToUpdateDto> patchDocument
            )
        {
            var getFlightToUpdateFromRepo = _flightDetailsService.GetFlight(airportAbbrivation, flightNumber);


            var flightToPatch = _mapper.Map<FlightDetailsToUpdateDto>(getFlightToUpdateFromRepo);
            patchDocument.ApplyTo(flightToPatch, ModelState);

            if (!TryValidateModel(flightToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(flightToPatch, getFlightToUpdateFromRepo);
            _flightDetailsService.UpdateFlight(getFlightToUpdateFromRepo);

            var response = new ResponseObject($"Success: {getFlightToUpdateFromRepo.FlightNumber} updated Successfully", Ok().StatusCode);
            return Ok(response);

        }



        [HttpDelete("{airportAbbrivation}/Flight/{flightNumber}")]
        public IActionResult DeleteFlight(string airportAbbrivation, string flightNumber)
        {
            var flightToDelete = _flightDetailsService.GetFlight(airportAbbrivation, flightNumber);

            _flightDetailsService.DeleteFlight(flightToDelete);

            var response = new ResponseObject($"Success: {flightToDelete.FlightNumber} deleted Successfully", Ok().StatusCode);
            return Ok(response);
        }
    }
}
