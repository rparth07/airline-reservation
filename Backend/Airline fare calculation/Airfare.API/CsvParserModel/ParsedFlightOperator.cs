using CsvHelper.Configuration.Attributes;

namespace Airfare.API.CSVParserModel
{
    public class ParsedFlightOperator
    {
        [Index(0)]
        public string CompanyName { get; set; }

        [Index(1)]
        public double BaseFare { get; set; }

        [Index(2)]
        public double Tax { get; set; }

        [Index(3)]
        public double Convience { get; set; }

    }
}
