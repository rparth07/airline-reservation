
using Airfare.API.Dto;
using Airfare.API.Dto.Admin;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.ValidationAttributes
{
    public class FlightDetailsDataValidation : ValidationAttribute
    {

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)

        {
            if (value == null)
            {
                return new ValidationResult(
                    "Validation Error : Input Value Type is  Invalid , All Value Must Be Valid And In Given Contrsaint"
                   , new[] { nameof(FlightDetailsDto) });
            }
            var flight = (FlightDetailsDto)validationContext.ObjectInstance;

            if (flight.SeatingFormatBusiness < 0
                || flight.SeatingFormatBusiness > 2
                || flight.SeatingFormatEconomy < 0
                || flight.SeatingFormatEconomy > 2)
            {
                return new ValidationResult(
                    "Validation Error : SeatingFormat is Invalid "
                    , new[] { nameof(FlightDetailsDto) });
            }

            if (flight.TotalSeatBusiness < 0 || flight.TotalSeatEconomy < 0)
            {
                return new ValidationResult(
                    "Validation Error : Entered Total Seat Values Must Not be  Negative "
                    , new[] { nameof(FlightDetailsDto) });
            }

            if (flight.OperatingDays < 0 || flight.OperatingDays > 2)
            {
                return new ValidationResult(
                    "Validation Error : Invalid Operating Days Value"
                    , new[] { nameof(FlightDetailsDto) });
            }

            if (TimeSpan.Compare(flight.SourceDepartureTime, new TimeSpan(23, 59, 59)) == 1 || TimeSpan.Compare(flight.SourceDepartureTime, new TimeSpan(0, 0, 0)) == -1 ||
                 TimeSpan.Compare(flight.DestinationArrivalTime, new TimeSpan(23, 59, 59)) == 1 || TimeSpan.Compare(flight.DestinationArrivalTime, new TimeSpan(0, 0, 0)) == -1)
            {
                return new ValidationResult(
                    "Validation Error : Entered Time Formate is Invalid Or Not In Range"
                    , new[] { nameof(FlightDetailsDto) });
            }

            if (flight.Distance < 0)
            {
                return new ValidationResult(
                    "Validation Error : Distance Must Not be a Negative Value "
                    , new[] { nameof(FlightDetailsDto) });
            }

            return ValidationResult.Success;
        }
    }
}
