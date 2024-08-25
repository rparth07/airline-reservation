using Airfare.Domain.UserRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Domain.RepositoryInterfaces.UserInterfaces
{
  public interface IBookingDetailsRepository
  {
    public Guid SaveBookingDetails(BookingDetails bookingDetails);
    void Dispose();
  }
}
