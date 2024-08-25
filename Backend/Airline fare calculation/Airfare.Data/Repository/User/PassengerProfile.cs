using Airfare.Data.UserDataModel;
using Airfare.Domain.UserRequest;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Airfare.Data.Repository.User
{
  public class PassengerProfile : Profile
  {
    public PassengerProfile()
    {
      CreateMap<PassengerDetail, PassengerDataModel>();
      CreateMap<PassengerDataModel, PassengerDetail>();

    }
  }
}
