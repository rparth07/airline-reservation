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
            CreateMap<AirportToUpdateDto, AirportDto>().MaxDepth(16);
            CreateMap<AirportToUpdateDto, Airport>().MaxDepth(16);
            CreateMap<Airport, AirportToUpdateDto>().MaxDepth(16);

            CreateMap<ParsedAirport, Airport>().MaxDepth(16);

            CreateMap<Airport, AirportDto>().MaxDepth(16)
                .ForMember(dest => dest.DepartureFlights,
                opt => opt.MapFrom(src => src.DepartureFlights));
            CreateMap<AirportDto, Airport>().MaxDepth(16);

        }
    }
}
