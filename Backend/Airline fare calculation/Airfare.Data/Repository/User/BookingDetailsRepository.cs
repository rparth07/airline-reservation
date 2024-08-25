using Airfare.Data.UserDataModel;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Domain.UserRequest;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Data.Repository.User
{
  public class BookingDetailsRepository : IDisposable, IBookingDetailsRepository
  {
    private readonly AirfareContext _context;
    private readonly IMapper _mapper;
    public BookingDetailsRepository(AirfareContext context, IMapper mapper)
    {
      _context = context ?? throw new ArgumentNullException(nameof(context));

      _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    public Guid SaveBookingDetails(BookingDetails bookingDetails)
    {
      var bookingDetailsData = _mapper.Map<BookingDataModel>(bookingDetails);

      _context.BookingDetails.Add(bookingDetailsData);

      Save();

      return bookingDetailsData.Id;
    }
    private bool Save()
    {
      return (_context.SaveChanges() >= 0);
    }

    public void Dispose()
    {
      Dispose(true);
      GC.SuppressFinalize(this);
    }


    protected virtual void Dispose(bool disposing)
    {
      if (disposing)
      {
        // dispose resources when needed
      }
    }
  }
}
