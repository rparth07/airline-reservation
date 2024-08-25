namespace Airfare.API.Models
{
    public class FlightDetailsForCreation
    {
        public FlightDetailsForCreation(
            string flightNumber, 
            string flightOperatorName, 
            int totalSeatEconomy, 
            int totalSeatBusiness, 
            int seatingFormatForEconomy, 
            int seatingFormatForBusiness, 
            int operatingDays,
            //DateTime departureDate,
            //DateTime arrivalTime,
            string sourceCity, 
            string destinationCity)
        {
            FlightNumber = flightNumber;
            FlightOperatorName = flightOperatorName;
            TotalSeatEconomy = totalSeatEconomy;
            TotalSeatBusiness = totalSeatBusiness;
            SeatingFormatForEconomy = seatingFormatForEconomy;
            SeatingFormatForBusiness = seatingFormatForBusiness;
            OperatingDays = operatingDays;
            //SourceDepartureTime = departureDate;
            //DestinationArrivalTime = arrivalTime;
            SourceCity = sourceCity;
            DestinationCity = destinationCity;
        }

        public string FlightNumber { get; set; }
        public string FlightOperatorName { get; set; }
        public FlightOperator? FlightOperator { get; set; }
        public int TotalSeatEconomy { get; set; }
        public int TotalSeatBusiness { get; set; }
        public int SeatingFormatForEconomy { get; set; }
        public int SeatingFormatForBusiness { get; set; }
        public int OperatingDays { get; set; } 
        //public DateTime SourceDepartureTime { get; set; }
        //public DateTime DestinationArrivalTime { get; set; }
        public string SourceCity { get; set; }
        public string DestinationCity { get; set; }
        public Guid SourceAirportId  { get; set; }
        public Guid DestinationAirportId { get; set; }
    }
}
