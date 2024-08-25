using Airfare.API.ActionConstraints;
using Airfare.API.CSVParserModel;
using Airfare.API.Dto.Admin;
using Airfare.API.Helper;
using Airfare.Domain.Admin;
using Airfare.Service.Services.Admin.AdminInterfaces;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Airfare.API.Controllers
{
  [ApiController]
  [Route("API/Admin/Airport")]
  public class AirportController : ControllerBase
  {
    private readonly IAirportService _airportService;
    private readonly IMapper _mapper;

    public AirportController(IAirportService airfareService, IMapper mapper)
    {
      _airportService = airfareService ??
          throw new ArgumentNullException(nameof(airfareService));
      _mapper = mapper ??
          throw new ArgumentNullException(nameof(mapper));

    }



    [HttpPost]
    [RequestHeaderMatchesMediaType("Content-Type",
    "application/json")]
    [Consumes("application/json")]
    public IActionResult CreateAirport(AirportDto airportDto)
    {
      AirportDto airportToReturn = _mapper.Map<AirportDto>(_airportService.AddAirport(_mapper.Map<Airport>(airportDto)));
      return CreatedAtRoute("GetAirport",
          new { abbreviation = airportToReturn.Abbreviation },
          airportToReturn);

    }



    [HttpPost, DisableRequestSizeLimit]
    public IActionResult CreateAirport()
    {
      IFormFile? file = Request.Form.Files[0];

      List<ParsedAirport> parsedAirportData = new ParsedAirport().ParseData(file);

      _airportService.AddAllAirports(_mapper.Map<IEnumerable<Airport>>(parsedAirportData));
      
      var response = new ResponseObject("Success: Data Appended Successfully", Ok().StatusCode);
      return Ok(response);
    }



    [HttpGet("{abbreviation}", Name = "GetAirport")]
    public IActionResult GetAirport(string abbreviation)
    {
      AirportDto airportFromRepo = _mapper.Map<AirportDto>(_airportService.GetAirportByAbbrivation(abbreviation));
      return Ok(airportFromRepo);
    }

    [HttpGet]
    public IActionResult GetAllAiports()
    {
      IEnumerable<AirportDto> airports = _mapper.Map<IEnumerable<AirportDto>>(_airportService.GetAllAirports());
      return Ok(airports);
    }



    [HttpPatch("{abbreviation}")]
    public IActionResult UpdateAirport(
        string abbreviation,
        JsonPatchDocument<AirportToUpdateDto> patchDocument
        )
    {
      var getAirPortToUpdateFromRepo = _airportService.GetAirportByAbbrivation(abbreviation);


      var flightToPatch = _mapper.Map<AirportToUpdateDto>(getAirPortToUpdateFromRepo);
      patchDocument.ApplyTo(flightToPatch, ModelState);

      if (!TryValidateModel(flightToPatch))
      {
        var valid = TryValidateModel(flightToPatch);
        return ValidationProblem(ModelState);
      }

      _mapper.Map(flightToPatch, getAirPortToUpdateFromRepo);
      _airportService.UpdateAirport(getAirPortToUpdateFromRepo);

      var response = new ResponseObject($"Success: {getAirPortToUpdateFromRepo.AirportName} updated Successfully", Ok().StatusCode);
      return Ok(response);

    }



    [HttpDelete("{abbreviation}")]
    public IActionResult DeleteAirport(string abbreviation)
    {
      _airportService.DeleteAirport(abbreviation);
      return NoContent();
    }

  }
}
