
using Airfare.API.ActionConstraints;
using Airfare.API.Dto.UserRequest;
using Airfare.Domain.UserRequest;
using Airfare.Service.Services.User.UserInterfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Airfare.API.Controllers
{
  [ApiController]
  [Route("API/Booking")]
  public class BookingController : ControllerBase
  {
    private readonly IBookingDetailsService _bookingDetailsService;
    private readonly IMapper _mapper;

    public BookingController(IBookingDetailsService bookingDetailsService, IMapper mapper)
    {
      _bookingDetailsService = bookingDetailsService ??
          throw new ArgumentNullException(nameof(bookingDetailsService));
      _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }


    [HttpPost]
    [RequestHeaderMatchesMediaType("Content-Type",
       "application/json")]
    [Consumes("application/json")]
    public IActionResult SaveBookingDetails(BookingDetailsDto bookingDto)
    {
      return Ok(_bookingDetailsService.AddBookingDetails(_mapper.Map<BookingDetails>(bookingDto)));

    }
  }
}
