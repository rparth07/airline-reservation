using Airfare.Domain.UserRequest;

namespace Airfare.Service.Services.User.UserInterfaces
{
  public interface IBookingDetailsService
  {
    public Guid AddBookingDetails(BookingDetails bookingDetails);
  }
}
