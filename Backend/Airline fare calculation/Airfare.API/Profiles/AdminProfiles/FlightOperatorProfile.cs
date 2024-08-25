using Airfare.API.CSVParserModel;
using Airfare.API.Dto.Admin;
using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using AutoMapper;

namespace Airfare.API.Profiles.AdminProfiles
{
    public class FlightOperatorProfile : Profile
    {
        public FlightOperatorProfile()
        {
            CreateMap<FlightOperator, FlightOperatorDto>();

            CreateMap<FlightOperatorDto, FlightOperator>();

            CreateMap<FlightOperator, FlightOperatorToUpdateDto>();
            CreateMap<FlightOperatorToUpdateDto, FlightOperator>();


            CreateMap<FlightOperatorDto, FlightOperatorToUpdateDto>();
            CreateMap<FlightOperatorToUpdateDto, FlightOperatorDto>();

            CreateMap<ParsedFlightOperator, FlightOperator>();

        }
    }
}
