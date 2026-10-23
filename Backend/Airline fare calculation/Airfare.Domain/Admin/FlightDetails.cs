using System;

namespace Airfare.Domain.Admin
{
  public class FlightDetails
  {
    public Guid FlightId { get; set; }

    public string FlightNumber { get; set; }

    public FlightOperator FlightOperator { get; set; }

    public int TotalSeatEconomy { get; set; }

    public int TotalSeatBusiness { get; set; }

    public SeatingFormat SeatingFormatEconomy { get; set; }

    public SeatingFormat SeatingFormatBusiness { get; set; }

    public OperatingDays OperatingDays { get; set; }

    public TimeSpan SourceDepartureTime { get; set; }

    public TimeSpan DestinationArrivalTime { get; set; }

    public virtual Airport SourceAirportData { get; set; }

    public virtual Airport DestinationAirportData { get; set; }

    public double Distance { get; set; }

    public double Charges { get; set; }

    public void CalculateCharge(bool flightOperatorHasChanged, int adult, int children, int infant, FlightClass flightClass = FlightClass.Economy)
    {//Should not book separate seat, Taxes & fee should be 50% of base fare
     //if same flight operator for same two flight next to each other then no Convience if flight operator is changed then add Convience fees
      double baseFarePerPassenger = FlightOperator.BaseFare * Distance;
      double taxesAndFeePerPassenger = (FlightOperator.Tax * (baseFarePerPassenger)) / 100;
      double taxesPerInfant = (taxesAndFeePerPassenger / 2);

      if (flightClass == FlightClass.Business) { baseFarePerPassenger *= 1.8; taxesAndFeePerPassenger *= 1.8; taxesPerInfant *= 1.8; }
      Charges = (baseFarePerPassenger + taxesAndFeePerPassenger) * (adult + children) + taxesPerInfant * infant;

      if (flightOperatorHasChanged)
      {
        double convienceFee = FlightOperator.Convenience * (adult + children);
        Charges += convienceFee;
      }
    }
  }
}
