using Airfare.Data.AdminDataModel;
using Airfare.Domain.AdminDomains;
using AutoMapper;

namespace Airfare.Data.Profiles
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
