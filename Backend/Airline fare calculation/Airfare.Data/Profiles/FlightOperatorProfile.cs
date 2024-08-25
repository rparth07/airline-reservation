using Airfare.Data.AdminDataModel;
using Airfare.Domain.AdminDomains;
using AutoMapper;

namespace Airfare.Data.Profiles
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
