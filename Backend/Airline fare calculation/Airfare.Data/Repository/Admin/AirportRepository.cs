using Airfare.Data.AdminDataModel;
using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Airfare.Data.Repository.Admin
{
    public class AirportRepository : IDisposable, IAirportRepository
    {
        private readonly AirfareContext _context;
        private readonly IMapper _mapper;

        public AirportRepository(AirfareContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        public void AddAirport(Airport airportDeatilsForCreation)
        {
            var airportDetailsData = _mapper.Map<AirportDataModel>(airportDeatilsForCreation);

            _context.AirportData.Add(airportDetailsData);
      
        }



        public void AddAllAirports(IEnumerable<Airport> airports)
        {
            var airportsData = _mapper.Map<List<AirportDataModel>>(airports);

            _context.AirportData.AddRange(airportsData);
        }



        public Airport GetAirport(Guid airportId)
        {
            var airportData = _context.AirportData
                .Include("ArrivalFlights")
                .Include("DepartureFlights")
                .Include("ArrivalFlights.FlightOperator")
                .Include("DepartureFlights.FlightOperator")
                .FirstOrDefault(airport => airport.AirportId == airportId);

            return _mapper.Map<Airport>(airportData);
        }



        public List<Airport> GetAllAirports()
        {
            var airportsData = _context.AirportData
                    .Include("ArrivalFlights")
                    .Include("DepartureFlights")
                    .Include("ArrivalFlights.FlightOperator")
                    .Include("DepartureFlights.FlightOperator")
                    .ToList();

            return _mapper.Map<List<Airport>>(airportsData);
        }



        public Airport GetAirportFromName(string airportName)
        {
            var airportData = _context.AirportData
                .AsNoTracking()
                .FirstOrDefault(airport => airport.AirportName == airportName);

            return _mapper.Map<Airport>(airportData);
        }



        public Airport GetAirPortByAbbrivation(string abbreviation)
        {
            AirportDataModel airportData = _context.AirportData
                .Include("ArrivalFlights")
                .Include("ArrivalFlights.FlightOperator")
                .Include("ArrivalFlights.SourceAirportData")
                .Include("DepartureFlights")
                .Include("DepartureFlights.FlightOperator")
                .Include("DepartureFlights.DestinationAirportData")
                .FirstOrDefault(airport => airport.Abbreviation == abbreviation);

            return _mapper.Map<Airport>(airportData);

        }



        public string GetAirportName(Guid airportId)
        {
            return _context.AirportData.Where(_ => _.AirportId == airportId).FirstOrDefault().AirportName;
        }



        public Guid GetAirportId(string airportName)
        {
            return _context.AirportData
                .Where(airport => airport.AirportName == airportName)
                .Select(airport => airport.AirportId)
                .FirstOrDefault();
        }



        public void UpdateAirport(Airport airport)
        {
            var airportDataModel = _mapper.Map<AirportDataModel>(airport);
            AirportDataModel updatedAirport = _context.AirportData.Where(airport => airport.AirportId.Equals(airportDataModel.AirportId)).FirstOrDefault();

            updatedAirport.AirportName = airportDataModel.AirportName;
            updatedAirport.Abbreviation = airportDataModel.Abbreviation;


            _context.AirportData.Update(updatedAirport);

            Save();
        }



        public void DeleteAirport(Airport airPortFromRepo)
        {
            var airportData = _mapper.Map<AirportDataModel>(airPortFromRepo);
            var airportToDelete = _context.AirportData.Where(_ => _.AirportId == airportData.AirportId).FirstOrDefault();
            // Also Delete flight that are arriving at Airport and Departure from Airport
            _context.FlightDetails.RemoveRange(airportToDelete.ArrivalFlights);
            _context.FlightDetails.RemoveRange(airportToDelete.DepartureFlights);

            _context.AirportData.Remove(airportToDelete);
        }



        public bool Save()
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
