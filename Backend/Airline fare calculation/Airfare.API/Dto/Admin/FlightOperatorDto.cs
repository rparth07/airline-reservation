using Airfare.API.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.Admin
{
    [FlightOperatorDataValidation]
    public class FlightOperatorDto
    {
        [Required]
        public string CompanyName { get; set; }

        [Required]
        public double BaseFare { get; set; }

        [Required]
        public double Tax { get; set; }

        [Required]
        public double Convience { get; set; }
    }
}