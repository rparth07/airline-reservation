using Airfare.API.CSVParserModel;
using Airfare.API.Dto.Admin;
using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.API.Profiles.AdminProfiles
{
    public class AiportProfile : Profile
    {
        public AiportProfile()
        {
            CreateMap<AirportToUpdateDto, AirportDto>();
            CreateMap<AirportToUpdateDto, Airport>();
            CreateMap<Airport, AirportToUpdateDto>();

            CreateMap<ParsedAirport, Airport>();

            CreateMap<Airport, AirportDto>()
                .ForMember(dest => dest.DepartureFlights,
                opt => opt.MapFrom(src => src.DepartureFlights));
            CreateMap<AirportDto, Airport>();

        }
    }
}
