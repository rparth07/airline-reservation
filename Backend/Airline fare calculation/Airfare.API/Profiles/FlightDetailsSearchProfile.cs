﻿using Airfare.API.Dto.UserRequest;
using Airfare.Domain.UserRequest.TripType;
using AutoMapper;

namespace Airfare.API.Profiles
{
    public class FlightDetailsSearchProfile : Profile
    {
        public FlightDetailsSearchProfile()
        {
            CreateMap<ReservationDetailsDto, OneWayRequest>();
            CreateMap<ReservationDetailsDto, RoundRequest>();

        }
    }
}
