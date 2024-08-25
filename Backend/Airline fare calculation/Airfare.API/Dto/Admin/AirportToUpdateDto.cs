using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.Admin
{
    public class AirportToUpdateDto
    {
        public string AirportName { get; set; }

        [MaxLength(3)]
        public string Abbreviation { get; set; }
    }
}
