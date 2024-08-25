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
    [Route("API/Admin/Operator")]
    public class OperatorController : ControllerBase
    {
        private readonly IOperatorService _operatorService;
        private readonly IMapper _mapper;

        public OperatorController(
            IOperatorService operatorService,
            IMapper mapper
            )
        {
            _operatorService = operatorService ??
                throw new ArgumentNullException(nameof(operatorService));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }



        [HttpPost]
        [RequestHeaderMatchesMediaType("Content-Type",
        "application/json")]
        [Consumes("application/json")]
        public IActionResult CreateOperator(FlightOperatorDto flightOperator)
        {
            var flightOperatorToReturn = _mapper.Map<FlightOperatorDto>(
                _operatorService.AddOperator(_mapper.Map<FlightOperator>(flightOperator))
            );

            return CreatedAtRoute("GetOperator",
                new { operatorName = flightOperatorToReturn.CompanyName },
                flightOperatorToReturn);
        }


        [HttpPost, DisableRequestSizeLimit]
        public IActionResult CreateOperator()
        {
            IFormFile postedFile = Request.Form.Files[0];

            List<ParsedFlightOperator>? parsedOperator = new ParsedFlightOperator().ParseData(postedFile);
            _operatorService.AddAllOperators(_mapper.Map<List<FlightOperator>>(parsedOperator));

            var response = new ResponseObject("Success: Data Appended Successfully", Ok().StatusCode);
            return Ok(response);
        }



        [HttpGet("{operatorName}", Name = "GetOperator")]
        public IActionResult GetOperator(string operatorName)
        {
            var operatorFromRepo = _operatorService.GetOperator(operatorName);
            return Ok(_mapper.Map<FlightOperatorDto>(operatorFromRepo));
        }



        [HttpGet]
        public IActionResult GetAllOperator()
        {
            IEnumerable<FlightOperatorDto> flightOperators = _mapper.Map<IEnumerable<FlightOperatorDto>>(
                _operatorService.GetAllOperators()
            );

            return Ok(flightOperators);
        }



        [HttpPatch("{operatorName}")]
        public IActionResult UpdateFlightOperator(string operatorName, JsonPatchDocument<FlightOperatorToUpdateDto> patchDocument)
        {
            if (operatorName == string.Empty)
            {
                var err = new ResponseObject("Error: Invalid Flight Operator", BadRequest().StatusCode);
                return BadRequest(err);
            }

            var flightOperatorFromRepo = _operatorService.GetOperator(operatorName);

            if (flightOperatorFromRepo == null)
            {
                var err = new ResponseObject($"Error: Flight Operator {operatorName}", NotFound().StatusCode);
                return NotFound(err);
            }


            var operatortToPatch = _mapper.Map<FlightOperatorToUpdateDto>(flightOperatorFromRepo);

            patchDocument.ApplyTo(operatortToPatch);

            if (!TryValidateModel(operatortToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(operatortToPatch, flightOperatorFromRepo);
            _operatorService.UpdateOperator(flightOperatorFromRepo);

            var response = new ResponseObject($"Success: Flight Operator {operatorName} updated successfully", Ok().StatusCode);
            return Ok(response);
        }



        [HttpDelete("{operatorName}")]
        public IActionResult DeleteOperator(string operatorName)
        {
            _operatorService.DeleteOperator(operatorName);

            var response = new ResponseObject($"Success: Flight Operator {operatorName} Deleted successfully", Ok().StatusCode);
            return Ok(response);
        }
    }
}

