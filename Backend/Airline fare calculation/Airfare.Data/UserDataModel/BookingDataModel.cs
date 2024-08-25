using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Airfare.Data.UserDataModel
{
  public  class BookingDataModel
  {
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string PhoneNumber { get; set; }

    [ForeignKey("BookingId")]
    public ICollection<PassengerDataModel> PassengerDetails { get; set; } = new List<PassengerDataModel>();
  }
}
