using CsvHelper.Configuration.Attributes;

namespace Airfare.API.CSVParserModel
{
    public class ParsedAirport
    {
        [Index(0)]
        public string AirportName { get; set; }

        [Index(1)]
        public string Abbreviation { get; set; }

    }
}
