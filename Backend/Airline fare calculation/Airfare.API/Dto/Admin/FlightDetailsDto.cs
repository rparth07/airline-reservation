using Airfare.API.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.Admin
{
    [FlightDetailsDataValidation]
    public class FlightDetailsDto
    {
        [Required]
        public string FlightNumber { get; set; }

        [Required]
        public string FlightOperatorName { get; set; }

        [Required]
        public int TotalSeatEconomy { get; set; }

        [Required]
        public int TotalSeatBusiness { get; set; }

        [Required]
        public int SeatingFormatEconomy { get; set; }

        [Required]
        public int SeatingFormatBusiness { get; set; }

        [Required]
        public int OperatingDays { get; set; }

        [Required(ErrorMessage = "Departure Time Must Be Valid And WithIn Range From (00:00:00) => (23:59:59)")]
        public TimeSpan SourceDepartureTime { get; set; }

        [Required(ErrorMessage = "Arrival Time Must Be Valid And WithIn Range From (00:00:00) => (23:59:59)")]
        public TimeSpan DestinationArrivalTime { get; set; }

        [Required]
        public string SourceCity { get; set; }

        [Required]
        public string DestinationCity { get; set; }

        public Guid SourceAirportId { get; set; }

        [Required]
        public double Distance { get; set; }
        [Required]
        public double Charges { get; set; }

    }
}
