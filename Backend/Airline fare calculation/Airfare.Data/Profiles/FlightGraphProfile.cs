using Airfare.Data.AdminDataModel;
using Airfare.Domain.AdminDomains;
using AutoMapper;

namespace Airfare.Data.Profiles
{
    public class FlightGraphProfile : Profile
    {
        public FlightGraphProfile()
        {
            CreateMap<FlightGraph, FlightGraphDataModel>();
            CreateMap<FlightGraphDataModel, FlightGraph>();

        }
    }
}
