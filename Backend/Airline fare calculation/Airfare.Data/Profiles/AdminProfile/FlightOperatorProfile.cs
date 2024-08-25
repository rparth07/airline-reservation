using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.Data.Profiles.AdminProfile
{
    public class FlightOperatorProfile : Profile
    {
        public FlightOperatorProfile()
        {
            CreateMap<FlightOperatorDataModel, FlightOperator>();
            CreateMap<FlightOperator, FlightOperatorDataModel>();


        }
    }
}
