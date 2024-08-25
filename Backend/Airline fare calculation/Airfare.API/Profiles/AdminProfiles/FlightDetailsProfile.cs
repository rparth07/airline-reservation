using Airfare.API.CSVParserModel;
using Airfare.API.Dto.Admin;
using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.API.Profiles.AdminProfiles
{
    public class FlightDetailsProfile : Profile
    {
        public FlightDetailsProfile()
        {

            CreateMap<FlightDetails, FlightDetailsDto>()
                    .ForMember(
                        dest => dest.FlightOperatorName,
                        opt => opt.MapFrom(src => src.FlightOperator.CompanyName))
                    .ForMember(
                        dest => dest.SourceAirportId,
                        opt => opt.MapFrom(src => src.SourceAirportData.AirportId))
                    .ForMember(
                        dest => dest.SourceCity,
                        opt => opt.MapFrom(src => src.SourceAirportData.AirportName))
                    .ForMember(
                        dest => dest.DestinationCity,
                        opt => opt.MapFrom(src => src.DestinationAirportData.AirportName));


            CreateMap<FlightDetailsDto, FlightDetails>();


            CreateMap<ParsedFlightDetails, FlightDetails>();


            CreateMap<FlightDetails, ParsedFlightDetails>();


            CreateMap<FlightDetails, FlightDetailsToUpdateDto>();
            CreateMap<FlightDetailsToUpdateDto, FlightDetails>();

        }
    }
}
