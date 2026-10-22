using Airfare.API.Dto.UserRequest;
using Airfare.Domain.UserRequest.TripType;
using AutoMapper;

namespace Airfare.API.Profiles.UserProfiles
{
    public class FlightDetailsSearchProfile : Profile
    {
        public FlightDetailsSearchProfile()
        {
            CreateMap<ReservationDetailsDto, OneWayRequest>().MaxDepth(16);
            CreateMap<ReservationDetailsDto, RoundRequest>().MaxDepth(16);

        }
    }
}
