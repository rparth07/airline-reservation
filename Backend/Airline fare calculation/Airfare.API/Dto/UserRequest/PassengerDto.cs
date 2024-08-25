using System.ComponentModel.DataAnnotations;

namespace Airfare.API.Dto.UserRequest
{
  public class PassengerDto
  {
    [Required]
    public string Name { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string Gender { get; set; }

  }
}
