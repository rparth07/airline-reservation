
using Airfare.API.Dto;
using Airfare.API.Dto.Admin;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.ValidationAttributes
{
    public class FlightOperatorDataValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult(
                    "Validation Error : Input Value Type is  Invalid , All Value Must Be Valid And In Given Contrsaint"
                    , new[] { nameof(FlightOperatorDto) });
            }
            var flightOperator = (FlightOperatorDto)validationContext.ObjectInstance;
            if (flightOperator.Tax <= 0.0 || flightOperator.BaseFare <= 0.0 || flightOperator.Convenience <= 0.0)
            {
                return new ValidationResult(
                    "Validation Error : Base Fare , Tax ,Convience  All required Values Must be non Zero"
                    , new[] { nameof(FlightOperatorDto) });
            }
            if (flightOperator.CompanyName.Length <= 1)
            {
                return new ValidationResult(
                    "Validation Error : ComapanyName Must Be Greter Than 1 Character "
                    , new[] { nameof(FlightOperatorDto) });
            }

            return ValidationResult.Success;
        }
    }
}
