
using Airfare.API.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.Admin
{
    [AiportDataValidation]
    public class AirportDto
    {

        public AirportDto(string airportName, string abbreviation)
        {
            AirportName = airportName;
            Abbreviation = abbreviation;
            DepartureFlights = new List<FlightDetailsDto>();
            ArrivalFlights = new List<FlightDetailsDto>();
        }

        [Required]
        public string AirportName { get; set; }

        public List<FlightDetailsDto> DepartureFlights { get; private set; } = new List<FlightDetailsDto>();

        public List<FlightDetailsDto> ArrivalFlights { get; private set; } = new List<FlightDetailsDto>();

        [Required]
        public string Abbreviation { get; set; }

    }
}
