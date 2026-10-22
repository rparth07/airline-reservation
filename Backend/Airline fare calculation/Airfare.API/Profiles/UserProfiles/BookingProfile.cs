using Airfare.API.Dto.UserRequest;
using Airfare.Domain.UserRequest;
using AutoMapper;

namespace Airfare.API.Profiles.UserProfiles
{
  public class BookingProfile: Profile
  {
    public BookingProfile()
    {
      CreateMap<BookingDetailsDto, BookingDetails>().MaxDepth(16);
      CreateMap<BookingDetails, BookingDetailsDto>().MaxDepth(16);
    }
  }
}
