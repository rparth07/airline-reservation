using System;
using System.ComponentModel.DataAnnotations;

namespace Airfare.Data.AdminDataModel
{
    public class FlightOperatorDataModel
    {
        [Key]
        public Guid OperatorId { get; set; }

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
