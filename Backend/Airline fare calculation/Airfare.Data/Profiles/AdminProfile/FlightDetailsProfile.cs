using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.Data.Profiles.AdminProfile
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
