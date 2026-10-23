using Airfare.API.Dto.UserRequest;
using Airfare.Domain.UserRequest;
using AutoMapper;

namespace Airfare.API.Profiles.UserProfiles
{
  public class PassengerProfile : Profile
  {
    public PassengerProfile()
    {
      CreateMap<PassengerDto, PassengerDetail>().MaxDepth(16);
      CreateMap<PassengerDetail, PassengerDto>().MaxDepth(16);

    }
  }
}
