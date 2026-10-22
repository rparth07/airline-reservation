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

            CreateMap<FlightDetails, FlightDetailsDto>().MaxDepth(16)
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


            CreateMap<FlightDetailsDto, FlightDetails>().MaxDepth(16);


            CreateMap<ParsedFlightDetails, FlightDetails>().MaxDepth(16);


            CreateMap<FlightDetails, ParsedFlightDetails>().MaxDepth(16);


            CreateMap<FlightDetails, FlightDetailsToUpdateDto>().MaxDepth(16);
            CreateMap<FlightDetailsToUpdateDto, FlightDetails>().MaxDepth(16);

        }
    }
}
