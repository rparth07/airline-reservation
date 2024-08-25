using Airfare.Data;
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
  public class FlightDetailsRepository : IDisposable, IFlightDetailsRepository
  {
    private readonly AirfareContext _context;
    private readonly IMapper _mapper;

    public FlightDetailsRepository(AirfareContext context, IMapper mapper)
    {
      _context = context ?? throw new ArgumentNullException(nameof(context));
      _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }


    public void AddFlight(FlightDetails flightDetails)
    {
      var flightDetailsData = _mapper.Map<FlightDetailsDataModel>(flightDetails);

      flightDetailsData.FlightOperator = _context.FlightOperator
                  .Where(_ => _.OperatorId == flightDetailsData.FlightOperator.OperatorId)
                  .FirstOrDefault();

      flightDetailsData.SourceAirportData = _context.AirportData
                  .Where(_ => _.AirportId == flightDetailsData.SourceAirportData.AirportId)
                  .FirstOrDefault();

      flightDetailsData.DestinationAirportData = _context.AirportData
                  .Where(_ => _.AirportId == flightDetailsData.DestinationAirportData.AirportId)
                  .FirstOrDefault();

      _context.FlightDetails.Add(flightDetailsData);
      Save();
    }



    public void AddAllFlights(IEnumerable<FlightDetails> flightDetails)
    {
      var allFlightsData = _mapper.Map<IEnumerable<FlightDetailsDataModel>>(flightDetails);

      allFlightsData
          .ToList()
          .ForEach(_ => _.FlightOperator = _context.FlightOperator
                  .Where(__ => __.OperatorId == _.FlightOperator.OperatorId)
                  .FirstOrDefault());

      allFlightsData
          .ToList()
          .ForEach(_ => _.SourceAirportData = _context.AirportData
                  .Where(__ => __.AirportId == _.SourceAirportData.AirportId)
                  .FirstOrDefault());

      allFlightsData
          .ToList()
          .ForEach(_ => _.DestinationAirportData = _context.AirportData
                  .Where(__ => __.AirportId == _.DestinationAirportData.AirportId)
                  .FirstOrDefault());

      _context.FlightDetails.AddRange(allFlightsData);
      Save();
    }



    public FlightDetails GetFlight(string flightNumber)
    {
      var flightDetailsData = _context.FlightDetails
                  .Include("FlightOperator")
                  .Include("SourceAirportData")
                  .Include("DestinationAirportData")
                  .FirstOrDefault(flight => flight.FlightNumber == flightNumber);

      return _mapper.Map<FlightDetails>(flightDetailsData);
    }



    public IEnumerable<FlightDetails> GetAllFlights()
    {
      var allFlightsData = _context.FlightDetails
              .Include("FlightOperator")
              .Include("SourceAirportData")
              .Include("DestinationAirportData");

      return _mapper.Map<List<FlightDetails>>(allFlightsData);
    }



    public void UpdateFlight(FlightDetails flightFromRepo)
    {
      var flightDataModel = _mapper.Map<FlightDetailsDataModel>(flightFromRepo);

      FlightDetailsDataModel updatedFlight = _context.FlightDetails.Where(f => f.FlightId == flightDataModel.FlightId).FirstOrDefault();

      updatedFlight.DestinationArrivalTime = flightDataModel.DestinationArrivalTime;
      updatedFlight.Distance = flightDataModel.Distance;
      updatedFlight.OperatingDays = flightDataModel.OperatingDays;
      updatedFlight.SeatingFormatBusiness = flightDataModel.SeatingFormatBusiness;
      updatedFlight.SeatingFormatEconomy = flightDataModel.SeatingFormatEconomy;
      updatedFlight.SourceDepartureTime = flightDataModel.SourceDepartureTime;

      _context.FlightDetails.Update(updatedFlight);
      Save();
    }



    public FlightDetails DeleteFlight(string flightNumber)
    {

      var flightToDelete = _context.FlightDetails.Include("FlightOperator")
              .Include("SourceAirportData")
              .Include("DestinationAirportData").Where(_ => _.FlightNumber == flightNumber).FirstOrDefault();
      _context.FlightDetails.Remove(flightToDelete);


      var returnFlightData = _mapper.Map<FlightDetails>(flightToDelete);
      Save();
      return returnFlightData;

    }



    public int GetNumberOfRowsWithSameFlightNumber(string flightNumber)
    {
      return _context.FlightDetails.Count(flight => flight.FlightNumber == flightNumber);
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
