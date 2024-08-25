using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Airfare.Data.AdminDataModel
{
    public class AirportDataModel
    {
        [Key]
        public Guid AirportId { get; set; }

        [Required]
        public string AirportName { get; set; }

        [Required]
        public string Abbreviation { get; set; }

        // Flight that are going from Airport
        public ICollection<FlightDetailsDataModel> DepartureFlights { get; set; } = new List<FlightDetailsDataModel>();

        // Flight that are coming on Airport
        public ICollection<FlightDetailsDataModel> ArrivalFlights { get; set; } = new List<FlightDetailsDataModel>();
    }
}
