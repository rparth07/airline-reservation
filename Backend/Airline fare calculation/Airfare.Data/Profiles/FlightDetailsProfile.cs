using Airfare.Data.AdminDataModel;
using Airfare.Domain.AdminDomains;
using AutoMapper;

namespace Airfare.Data.Profiles
{
    public class FlightDetailsProfile : Profile
    {
        public FlightDetailsProfile()
        {
            CreateMap<FlightDetailsDataModel, FlightDetails>();
            CreateMap<FlightDetails, FlightDetailsDataModel>();

        }
    }
}
