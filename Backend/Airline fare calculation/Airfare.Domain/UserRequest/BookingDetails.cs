using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Airfare.Domain.UserRequest
{
  public class BookingDetails
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string PhoneNumber { get; set; }

    public ICollection<PassengerDetail> PassengerDetails { get; set; } = new List<PassengerDetail>();
  }
}
