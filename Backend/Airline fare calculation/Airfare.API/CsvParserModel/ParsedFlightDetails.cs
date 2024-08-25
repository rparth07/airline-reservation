using Airfare.Domain.AdminDomains;
using CsvHelper.Configuration.Attributes;

namespace Airfare.API.CSVParserModel
{
    public class ParsedFlightDetails
    {
        [Index(0)]
        public string FlightNumber { get; set; }
        [Index(1)]
        public string FlightOperatorName { get; set; }
        [Index(2)]
        public int TotalSeatEconomy { get; set; }
        [Index(3)]
        public int TotalSeatBusiness { get; set; }
        [Index(4)]
        public SeatingFormat SeatingFormatEconomy { get; set; }
        [Index(5)]
        public SeatingFormat SeatingFormatBusiness { get; set; }
        [Index(6)]
        public OperatingDays OperatingDays { get; set; }
        [Index(7)]
        public string SourceCity { get; set; }
        [Index(8)]
        public string DestinationCity { get; set; }
        [Index(9)]
        public TimeSpan SourceDepartureTime { get; set; }
        [Index(10)]
        public TimeSpan DestinationArrivalTime { get; set; }
        [Index(11)]
        public double Distance { get; set; }

    }
}
