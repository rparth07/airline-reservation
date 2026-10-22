using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.Data.Profiles.AdminProfile
{
    public class AiportProfile : Profile
    {
        public AiportProfile()
        {
            CreateMap<Airport, AirportDataModel>().MaxDepth(16);
            CreateMap<AirportDataModel, Airport>().MaxDepth(16);

        }
    }
}
