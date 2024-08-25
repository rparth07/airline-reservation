
using Airfare.API.Dto;
using Airfare.API.Dto.Admin;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.ValidationAttributes
{
    public class AiportDataValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return new ValidationResult(
                    "Validation Error : Input Value Type is  Invalid , All Value Must Be Valid And In Given constraints."
                    , new[] { nameof(AirportDto) });
            }

            var airport = (AirportDto)validationContext.ObjectInstance;
            if (airport.AirportName.Length < 2)
            {
                return new ValidationResult(
                    "Validation Error : Airport Name Must Be Greter Than 1 Character."
                   , new[] { nameof(AirportDto) });
            }
            if (airport.Abbreviation.Length != 3)
            {
                return new ValidationResult(
                    "Validation Error : Airport Abbreviation Must Be Equal To 3 Character."
                    , new[] { nameof(AirportDto) });
            }

            return ValidationResult.Success;
        }
    }
}
