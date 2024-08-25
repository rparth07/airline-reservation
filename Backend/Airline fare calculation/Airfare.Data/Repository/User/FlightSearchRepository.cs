using Airfare.Data;
using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Domain.UserRequest;
using Airfare.Domain.UserRequest.TripType;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Airfare.Data.Repository.User
{
    public class FlightSearchRepository : IDisposable, IFlightSearchRepository
    {
        private readonly AirfareContext _context;
        private readonly IMapper _mapper;
        public FlightSearchRepository(AirfareContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));

            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }




        public List<FlightDetails> GetFlightDetails(DateTime date, string sourceCity, string destinationCity)
        {
            AirportDataModel sourceAirport = _context.AirportData
                .Include("ArrivalFlights")
                .Include("ArrivalFlights.FlightOperator")
                .Include("ArrivalFlights.SourceAirportData")
                .Include("DepartureFlights")
                .Include("DepartureFlights.FlightOperator")
                .Include("DepartureFlights.DestinationAirportData")
                .FirstOrDefault(_ => _.Abbreviation == sourceCity);

            AirportDataModel destinationAirport = _context.AirportData
                .Include("ArrivalFlights")
                .Include("ArrivalFlights.FlightOperator")
                .Include("ArrivalFlights.SourceAirportData")
                .Include("DepartureFlights")
                .Include("DepartureFlights.FlightOperator")
                .Include("DepartureFlights.DestinationAirportData")
                .FirstOrDefault(_ => _.Abbreviation == destinationCity);


            var FlightDetailsToReturn = sourceAirport.DepartureFlights.Where(flight =>
                    flight.DestinationAirportData.AirportId == destinationAirport.AirportId &&
                    GetDaysFromEnum(flight.OperatingDays).Contains(date.DayOfWeek.ToString())
                ).ToList();

            return _mapper
                 .Map<List<FlightDetails>>(FlightDetailsToReturn);
        }



        private List<string> GetDaysFromEnum(OperatingDaysModel operatingDays)
        {
            if (operatingDays == OperatingDaysModel.Mon_Sun)
            {
                return new List<string> {
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                };
            }
            else if (operatingDays == OperatingDaysModel.Mon_Fri)
            {
                return new List<string> {
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                };
            }
            else
            {
                return new List<string> {
                     "Saturday",
                    "Sunday"
                };
            }
        }



        public void AddFlightToGraph(FlightGraph flightGraph)
        {
            var flightReturn = GetFlightGraph(flightGraph);
            if (flightReturn == null)
            {
                flightGraph.Weight = 1;
                _context.FlightGraph.Add(_mapper.Map<FlightGraphDataModel>(flightGraph));
            }
            else
            {
                flightReturn.Weight++;
            }

            Save();
        }

        public void RemoveFlightFromGraph(FlightGraph flightGraph)
        {
            var flightReturn = GetFlightGraph(flightGraph);
            if (flightReturn == null)
            {
                throw new ArgumentNullException(nameof(flightGraph));
            }
            else
            {
                flightReturn.Weight--;
                if (flightReturn.Weight == 0)
                    _context.FlightGraph.Remove(flightReturn);
            }
            Save();
        }

        public List<string> GetConnectedAirports(string sourceAirport)
        {
            List<string> destinationAirports = _context.FlightGraph
                .Where(_ => _.SourceAirport == sourceAirport && _.Weight != 0)
                .Select(_ => _.DestinationAirport)
                .ToList();
            return destinationAirports;
        }
        private FlightGraphDataModel GetFlightGraph(FlightGraph flightGraph)
        {
            return _context.FlightGraph
                .FirstOrDefault(flight =>
                flight.SourceAirport == flightGraph.SourceAirport &&
                flight.DestinationAirport == flightGraph.DestinationAirport);

        }
        private bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // dispose resources when needed
            }
        }


    }
}
