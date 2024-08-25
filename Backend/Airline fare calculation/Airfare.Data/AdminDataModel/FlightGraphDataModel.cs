using System;
using System.ComponentModel.DataAnnotations;

namespace Airfare.Data.AdminDataModel
{
    public class FlightGraphDataModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string SourceAirport { get; set; }

        [Required]
        public string DestinationAirport { get; set; }

        [Required]
        public int Weight { get; set; }
    }
}
