using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Domain.UserRequest
{
  public class PassengerDetail
  {
    [Key]
    public Guid PassengerId { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string Gender { get; set; }
  }
}
