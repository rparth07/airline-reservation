using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.Data.Profiles.UserProfile
{
    public class FlightGraphProfile : Profile
    {
        public FlightGraphProfile()
        {
            CreateMap<FlightGraph, FlightGraphDataModel>().MaxDepth(16);
            CreateMap<FlightGraphDataModel, FlightGraph>().MaxDepth(16);

        }
    }
}
