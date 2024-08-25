using Airfare.Data.UserDataModel;
using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.UserRequest
{
  public class BookingDetailsDto
  {

    [Required]
    public string PhoneNumber { get; set; }

    public ICollection<PassengerDto> PassengerDetails { get; set; } = new List<PassengerDto>();
  }
}
