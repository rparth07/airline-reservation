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
            CreateMap<FlightOperator, FlightOperatorDto>().MaxDepth(16);

            CreateMap<FlightOperatorDto, FlightOperator>().MaxDepth(16);

            CreateMap<FlightOperator, FlightOperatorToUpdateDto>().MaxDepth(16);
            CreateMap<FlightOperatorToUpdateDto, FlightOperator>().MaxDepth(16);


            CreateMap<FlightOperatorDto, FlightOperatorToUpdateDto>().MaxDepth(16);
            CreateMap<FlightOperatorToUpdateDto, FlightOperatorDto>().MaxDepth(16);

            CreateMap<ParsedFlightOperator, FlightOperator>().MaxDepth(16);

        }
    }
}
