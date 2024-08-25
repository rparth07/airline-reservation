using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.Data.Profiles.AdminProfile
{
    public class AiportProfile : Profile
    {
        public AiportProfile()
        {
            CreateMap<Airport, AirportDataModel>();
            CreateMap<AirportDataModel, Airport>();

        }
    }
}
