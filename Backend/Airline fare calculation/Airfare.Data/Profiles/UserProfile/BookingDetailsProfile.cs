using Airfare.Data.UserDataModel;
using Airfare.Domain.UserRequest;
using AutoMapper;

namespace Airfare.Data.Profiles.UserProfile
{
  public class BookingDetailsProfile: Profile
  {

    public BookingDetailsProfile()
    {
      CreateMap<BookingDetails, BookingDataModel>().MaxDepth(16);
      CreateMap<BookingDataModel, BookingDetails>().MaxDepth(16);
    }
         
  }
}
