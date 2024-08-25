using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Airfare.Data.AdminDataModel
{
    public class FlightDetailsDataModel
    {
        [Key]
        public Guid FlightId { get; set; }

        [Required]
        public string FlightNumber { get; set; }

        [Required]
        public virtual FlightOperatorDataModel FlightOperator { get; set; }

        [Required]
        public int TotalSeatEconomy { get; set; }

        [Required]
        public int TotalSeatBusiness { get; set; }

        [Required]
        public SeatingFormatModel SeatingFormatEconomy { get; set; }

        [Required]
        public SeatingFormatModel SeatingFormatBusiness { get; set; }

        [Required]
        public OperatingDaysModel OperatingDays { get; set; }

        [Required]
        public TimeSpan SourceDepartureTime { get; set; }

        [Required]
        public TimeSpan DestinationArrivalTime { get; set; }

        [Required]
        [ForeignKey("SourceAirportId")]
        [InverseProperty("DepartureFlights")]
        public virtual AirportDataModel SourceAirportData { get; set; }

        [Required]
        [ForeignKey("DestinationAirportId")]
        [InverseProperty("ArrivalFlights")]
        public virtual AirportDataModel DestinationAirportData { get; set; }

        [Required]
        public double Distance { get; set; }

    }
}
