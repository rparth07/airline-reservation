using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Domain.UserRequest;
using Airfare.Service.Filter;
using Airfare.Service.Services.User.UserInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Service.Services.User
{
  public class BookingDetailsService : IBookingDetailsService
  {
    private readonly IBookingDetailsRepository _bookingRepository;
    public BookingDetailsService(IBookingDetailsRepository bookingRepository)
    {
      _bookingRepository = bookingRepository;
    }
    public Guid AddBookingDetails(BookingDetails bookingDetails)
    {
      try
      {
        return _bookingRepository.SaveBookingDetails(bookingDetails);
      }
      catch (Exception ex)
      {
        throw new BadRequestException("Enter details are incorrect. Please try again!");
      }
    }
  }
}

