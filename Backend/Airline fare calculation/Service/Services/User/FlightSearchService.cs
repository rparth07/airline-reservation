using System.Globalization;
using Airfare.Domain;
using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Domain.UserRequest;
using Airfare.Domain.UserRequest.TripType;
using Airfare.Service.Filter;
using Airfare.Service.Services.User.UserInterfaces;

namespace Airfare.Service.Services.User
{
  public class FlightSearchService : IFlightSearchService
  {
    private readonly IFlightSearchRepository _flightSearchRepository;

    public FlightSearchService(IFlightSearchRepository flightSearchRepository)
    {
      _flightSearchRepository = flightSearchRepository;
    }

    public IEnumerable<IEnumerable<FlightDetails>> GetFlightDetailsForOneWay(string itinerary, string paxType, string flightClass)
    {

      ReservationDetails oneWayRequest = GetRequestObject(itinerary, paxType, flightClass);
      if (oneWayRequest == null)
      {
        return null;
      }


      List<List<string>> flights = GetFlightPath(oneWayRequest.SourceCity, oneWayRequest.DestinationCity, 3);

      List<List<FlightDetails>> flightDetails = GetFlightDetails(flights, oneWayRequest.DepartureDate);

      flightDetails.ForEach(flightDetail =>
      {
        for (int i = 0; i < flightDetail.Count; i++)
        {
          bool HasChanged = i != 0
              &&
              flightDetail[i - 1].FlightOperator.CompanyName != flightDetail[i].FlightOperator.CompanyName;

          flightDetail[i].CalculateCharge(HasChanged, oneWayRequest.Adults,
          oneWayRequest.Children,
          oneWayRequest.Infant, oneWayRequest.FlightClass);

        }
      });


      if (flightDetails.Count == 0)
      {
        return null;
      }

      return flightDetails;
    }

    public IEnumerable<IEnumerable<IEnumerable<FlightDetails>>> GetFlightDetailsForRoundTrip(string itinerary, string paxType, string flightClass)
    {
      var details = itinerary.Split("_");
      var returnDate = ParseTravelDate(details[1]);

      ReservationDetails roundRequest = GetRequestObject(details[0], paxType, flightClass);

      if (roundRequest == null)
      {
        return null;
      }

      List<List<List<FlightDetails>>> flightDetailsToReturn = new List<List<List<FlightDetails>>>();

      List<List<string>> flights = GetFlightPath(roundRequest.SourceCity, roundRequest.DestinationCity, 3);

      List<List<FlightDetails>> flightDetailsForDepature = GetFlightDetails(flights, roundRequest.DepartureDate);

      flightDetailsToReturn.Add(flightDetailsForDepature);

      flights.Clear();

      flights = GetFlightPath(roundRequest.DestinationCity, roundRequest.SourceCity, 3);

      List<List<FlightDetails>> flightDetailsForArrival = GetFlightDetails(flights, returnDate);

      flightDetailsToReturn.Add(flightDetailsForArrival);



      flightDetailsToReturn
          .ForEach(flightDetail =>
          flightDetail.ForEach(flight =>
          {
            for (int i = 0; i < flight.Count; i++)
            {
              bool HasChanged = i != 0
                        &&
                        flight[i - 1].FlightOperator.CompanyName != flight[i].FlightOperator.CompanyName;

              flight[i].CalculateCharge(HasChanged, roundRequest.Adults,
                    roundRequest.Children,
                    roundRequest.Infant, roundRequest.FlightClass);

            }
          }));


      return flightDetailsToReturn;
    }


    public IEnumerable<IEnumerable<IEnumerable<FlightDetails>>> GetFlightDetailsForMultiCity(string itinerary, string paxType, string flightClass)
    {
      var details = itinerary.Split('_');

      List<ReservationDetails> reservationDetails = new List<ReservationDetails>();
      ReservationDetails reservationDetail = new();
      foreach (var detailOfOneWayTour in details)
      {
        reservationDetail = GetRequestObject(detailOfOneWayTour, paxType, flightClass);
        if (reservationDetail == null)
        {
          return null;
        }
        reservationDetails.Add(reservationDetail);
      }
      int adult = reservationDetail.Adults;
      int children = reservationDetail.Children;
      int infant = reservationDetail.Infant;

      MultiCityRequest multiCityRequest = new MultiCityRequest(reservationDetails);

      List<List<List<FlightDetails>>> multiCityFlightDetails = new List<List<List<FlightDetails>>>();

      multiCityRequest.ReservationDetails
         .ForEach(multiCityRequest =>
         {

           List<List<string>> flights = GetFlightPath(multiCityRequest.SourceCity, multiCityRequest.DestinationCity, 3);
           List<List<FlightDetails>> flightsDetails = GetFlightDetails(flights, multiCityRequest.DepartureDate);
           multiCityFlightDetails.Add(flightsDetails);
         }
         );

      multiCityFlightDetails
          .ForEach(flightDetails =>
              flightDetails.ForEach(flight =>
              {
                for (int i = 0; i < flight.Count; i++)
                {
                  bool HasChanged = i != 0
                        &&
                        flight[i - 1].FlightOperator.CompanyName != flight[i].FlightOperator.CompanyName;

                  flight[i].CalculateCharge(HasChanged, adult, children, infant, reservationDetail.FlightClass);

                }
              }));

      foreach (var flightData in multiCityFlightDetails)
      {
        if (flightData.Count == 0)
          return null;
      }

      return multiCityFlightDetails;
    }


    private void IsValidPassengerRequest(int infant, int adult, int children)
    {
      if (adult == 0 && infant >= 0 && children >= 0)
      {
        throw new BadRequestException("Travelers Should Obey Following Rules.\n " +
            "1.Number of Children Passenger Must Be Less Or Equal Adult Passenger.\n " +
            "2.For One Infant, There Should Be Minimum Two Adults.\n " +
            "3.No of Adults Can not be Zero.");
      }

      int minAdult = infant > (children / 2) ? infant : (int)Math.Ceiling((decimal)children / 2);

      if (minAdult > adult)
      {
        throw new BadRequestException("Travelers Should Obey Following Rules.\n " +
           "1.Number of Children Passenger Must Be Less Or Equal Adult Passenger.\n " +
           "2.For One Infant, There Should Be Minimum Two Adults.\n " +
           "3.No of Adults Can not be Zero.");
      }

    }

    private List<List<FlightDetails>> GetFlightDetails(List<List<string>> flights, DateTime date)
    {
      return flights.SelectMany(flight => GetConnectedFlights(flight, date, 0).ToList()).ToList();

    }

    private ReservationDetails GetRequestObject(string itinerary, string paxType, string flightClass)
    {
      var details = itinerary.Split('-');
      var persons = paxType.Split('_');
      var sourceAirport = details[0];
      var destinationAirport = details[1];

      ReservationDetails reservationDetailRequest = new ReservationDetails(
                                                       sourceAirport,
                                                       destinationAirport,
                                                       ParseTravelDate(details[2]),
                                                       (FlightClass)Enum.Parse(typeof(FlightClass), flightClass),
                                                       int.Parse(persons[0].Substring(2), CultureInfo.InvariantCulture),
                                                       int.Parse(persons[1].Substring(2), CultureInfo.InvariantCulture),
                                                       int.Parse(persons[2].Substring(2), CultureInfo.InvariantCulture));

      IsValidPassengerRequest(reservationDetailRequest.Infant, reservationDetailRequest.Adults, reservationDetailRequest.Children);
      return reservationDetailRequest;
    }

    private static DateTime ParseTravelDate(string value)
    {
      if (!DateTime.TryParseExact(value, "dd/MM/yyyy", CultureInfo.InvariantCulture,
          DateTimeStyles.None, out var date))
        throw new BadRequestException("Travel date must use dd/MM/yyyy.");
      return date;
    }

    private List<List<FlightDetails>> GetConnectedFlights(List<string> flights, DateTime earliest, int window)
    {
      var connectedFlights = new List<List<FlightDetails>>();
      if (window >= flights.Count - 1) return connectedFlights;
      var candidates = _flightSearchRepository.GetFlightDetails(
        earliest.Date, flights[window], flights[window + 1]);
      if (candidates == null) return connectedFlights;

      foreach (var candidate in candidates.OrderBy(flight => flight.SourceDepartureTime))
      {
        var departure = earliest.Date.Add(candidate.SourceDepartureTime);
        if (departure < earliest) continue;
        if (window == flights.Count - 2)
        {
          connectedFlights.Add(new List<FlightDetails> { candidate });
          continue;
        }
        var arrival = earliest.Date.Add(candidate.DestinationArrivalTime);
        if (arrival < departure) arrival = arrival.AddDays(1);
        foreach (var tail in GetConnectedFlights(flights, arrival.AddMinutes(45), window + 1))
        {
          var path = new List<FlightDetails> { candidate };
          path.AddRange(tail);
          connectedFlights.Add(path);
        }
      }
      return connectedFlights;
    }

    private List<List<string>> GetFlightPath(string sourceCity, string destinationCity, int depth = 3)
    {
      List<string> isVisited = new List<string>();
      List<List<string>> pathList = new List<List<string>>();

      ConnectedFlightPath(pathList, sourceCity, destinationCity, isVisited, new List<string>() { sourceCity }, depth);
      return pathList.OrderBy(path => path.Count).Take(32).ToList();
    }

    private void ConnectedFlightPath(
        List<List<string>> pathList,
        string sourceCity,
        string destinationCity,
        List<string> isVisited,
        List<string> localPathList,
        int depth)
    {
      if (depth < 0)
      {
        return;
      }

      if (sourceCity.Equals(destinationCity))
      {
        var tempList = new List<string>(localPathList);
        pathList.Add(tempList);
        return;
      }

      isVisited.Add(sourceCity);

      foreach (string city in _flightSearchRepository.GetConnectedAirports(sourceCity))
      {
        if (!isVisited.Contains(city))
        {
          localPathList.Add(city);
          int tempDepth = depth;

          ConnectedFlightPath(pathList, city, destinationCity, isVisited, localPathList, --tempDepth);
          localPathList.Remove(city);
        }
      }

      isVisited.Remove(sourceCity);
    }
  }
}
