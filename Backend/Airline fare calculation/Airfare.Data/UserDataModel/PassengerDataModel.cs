using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Airfare.Data.UserDataModel
{
  public  class PassengerDataModel
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string Gender { get; set; }

   
  }
}
