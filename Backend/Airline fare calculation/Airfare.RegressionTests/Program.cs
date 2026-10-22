using Airfare.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Globalization;
using Airfare.Domain.Admin;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Domain.UserRequest;
using Airfare.Service.Services.User;

// Synthetic schedules exist only in these tests; production still uses SQL Server.
var repository = new Schedule();
var service = new FlightSearchService(repository);
CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("en-US");
void Check(bool condition, string name) { if (!condition) throw new Exception(name); Console.WriteLine("PASS " + name); }
var direct = service.GetFlightDetailsForOneWay("AAA-BBB-23/11/2026", "A-12_C-0_I-0", "Economy").ToList();
Check(repository.Dates.All(date => date.Month == 11 && date.Day == 23), "Dates use dd/MM/yyyy on an en-US host");
Check(direct.Single().Single().Charges == 120, "Multi-digit passenger counts retain all digits");
var connections = service.GetFlightDetailsForOneWay("AAA-CCC-23/11/2026", "A-1_C-0_I-0", "Economy").ToList();
Check(connections.Count == 1 && connections[0].Last().FlightNumber == "valid", "Reject impossible connection and accept exactly 45-minute layover");
var round = service.GetFlightDetailsForRoundTrip("AAA-BBB-23/11/2026_24/11/2026", "A-1_C-0_I-0", "Economy").ToList();
Check(round.Count == 2 && round.All(leg => leg.Any()), "Round-trip returns both directions");
var multi = service.GetFlightDetailsForMultiCity("AAA-BBB-23/11/2026_BBB-CCC-24/11/2026", "A-1_C-0_I-0", "Economy").ToList();
Check(multi.Count == 2 && multi.All(leg => leg.Any()), "Multicity returns every leg");
Check(service.GetFlightDetailsForOneWay("AAA-ZZZ-23/11/2026", "A-1_C-0_I-0", "Economy") == null, "No route returns no results");
var options = new DbContextOptionsBuilder<AirfareContext>().UseInMemoryDatabase("seed-regression")
  .ConfigureWarnings(w => w.Ignore(InMemoryEventId.TransactionIgnoredWarning)).Options;
using (var db = new AirfareContext(options)) {
  await DemoSeeder.SeedAsync(db);
  Check(db.AirportData.Count() == 13 && db.FlightOperator.Count() == 3 && db.FlightDetails.Count() == 32, "Seed reference data counts");
  Check(db.BookingDetails.Count() == 3 && db.Passengers.Count() == 6, "Seed synthetic bookings and passengers");
  Check(db.FlightGraph.Count() == 30 && db.FlightGraph.Sum(g => g.Weight) == 32, "Graph matches the flight inventory");
  await DemoSeeder.SeedAsync(db);
  Check(db.FlightDetails.Count() == 32 && db.Passengers.Count() == 6, "Seed is repeatable without duplicates");
}
using (var db = new AirfareContext(new DbContextOptionsBuilder<AirfareContext>().UseNpgsql("Host=localhost;Database=design").Options)) {
  var sql = db.Database.GenerateCreateScript();
  Check(sql.Contains("time without time zone") && sql.Contains("uuid") && !sql.Contains("nvarchar"), "Generated schema is PostgreSQL native");
}
Console.WriteLine("11 regression checks passed");

class Schedule : IFlightSearchRepository {
  public List<DateTime> Dates = new();
  public List<string> GetConnectedAirports(string source) => source switch { "AAA" => new() { "BBB" }, "BBB" => new() { "AAA", "CCC" }, _ => new() };
  public List<FlightDetails> GetFlightDetails(DateTime date, string source, string destination) {
    Dates.Add(date);
    if (source == "BBB" && destination == "CCC") return new() { Flight("impossible", 11, 0, 14, 0), Flight("valid", 12, 45, 14, 0) };
    return new() { Flight("direct", 10, 0, 12, 0) };
  }
  static FlightDetails Flight(string name, int dh, int dm, int ah, int am) => new() {
    FlightNumber = name, SourceDepartureTime = new TimeSpan(dh, dm, 0), DestinationArrivalTime = new TimeSpan(ah, am, 0),
    Distance = 10, FlightOperator = new FlightOperator { CompanyName = "Test", BaseFare = 1, Tax = 0, Convenience = 0 }
  };
  public void AddFlightToGraph(FlightGraph graph) => throw new NotSupportedException();
  public void RemoveFlightFromGraph(FlightGraph graph) => throw new NotSupportedException();
}
