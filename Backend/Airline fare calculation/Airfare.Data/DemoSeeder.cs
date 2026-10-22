using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Airfare.Data.AdminDataModel;
using Airfare.Data.UserDataModel;
using Microsoft.EntityFrameworkCore;

namespace Airfare.Data;

public static class DemoSeeder
{
    private static Guid Id(string key) => new Guid(SHA256.HashData(Encoding.UTF8.GetBytes("airline-demo-v1:" + key)).AsSpan(0, 16));

    public static async Task SeedAsync(AirfareContext db)
    {
        // Seed a new database once; never overwrite subsequent admin edits or bookings.
        if (await db.AirportData.AnyAsync()) return;
        await using var transaction = await db.Database.BeginTransactionAsync();
        var cities = new[] { ("MAA", "Chennai"), ("DEL", "Delhi"), ("BOM", "Mumbai"),
            ("AMD", "Ahmedabad"), ("BLR", "Bengaluru"), ("HYD", "Hyderabad"),
            ("CCU", "Kolkata"), ("PNQ", "Pune"), ("GOI", "Goa"), ("JAI", "Jaipur"),
            ("COK", "Kochi"), ("LKO", "Lucknow"), ("GAU", "Guwahati") };
        var airports = cities.ToDictionary(c => c.Item1, c => new AirportDataModel {
            AirportId = Id(c.Item1), Abbreviation = c.Item1, AirportName = c.Item2 });
        db.AirportData.AddRange(airports.Values);
        var operators = new[] {
            new FlightOperatorDataModel { OperatorId = Id("operator-1"), CompanyName = "Demo Bharat Air", BaseFare = 3.4, Tax = 12, Convenience = 250 },
            new FlightOperatorDataModel { OperatorId = Id("operator-2"), CompanyName = "Demo Coast Wings", BaseFare = 3.0, Tax = 10, Convenience = 200 },
            new FlightOperatorDataModel { OperatorId = Id("operator-3"), CompanyName = "Demo Deccan Express", BaseFare = 2.8, Tax = 8, Convenience = 180 }
        };
        db.FlightOperator.AddRange(operators);
        var routes = new[] {
            ("MAA", "DEL", 1760, "06:00", "08:50"), ("DEL", "MAA", 1760, "17:00", "19:50"),
            ("MAA", "DEL", 1760, "13:00", "15:50"), ("DEL", "MAA", 1760, "09:30", "12:20"),
            ("MAA", "BOM", 1030, "07:00", "09:00"), ("BOM", "MAA", 1030, "18:00", "20:00"),
            ("MAA", "BLR", 285, "08:00", "09:00"), ("BLR", "MAA", 285, "18:00", "19:00"),
            ("MAA", "HYD", 515, "09:00", "10:20"), ("HYD", "MAA", 515, "18:00", "19:20"),
            ("DEL", "BOM", 1140, "10:00", "12:10"), ("BOM", "DEL", 1140, "13:00", "15:10"),
            ("DEL", "CCU", 1300, "10:00", "12:20"), ("CCU", "DEL", 1300, "13:30", "15:50"),
            ("DEL", "GAU", 1460, "10:30", "13:00"), ("GAU", "DEL", 1460, "13:30", "16:00"),
            ("DEL", "JAI", 235, "10:00", "11:00"), ("JAI", "DEL", 235, "14:00", "15:00"),
            ("DEL", "LKO", 420, "10:00", "11:15"), ("LKO", "DEL", 420, "14:00", "15:15"),
            ("BOM", "AMD", 440, "10:00", "11:15"), ("AMD", "BOM", 440, "15:30", "16:45"),
            ("BOM", "PNQ", 125, "10:30", "11:20"), ("PNQ", "BOM", 125, "15:00", "15:50"),
            ("BOM", "GOI", 425, "10:00", "11:15"), ("GOI", "BOM", 425, "15:00", "16:15"),
            ("BLR", "COK", 365, "10:00", "11:10"), ("COK", "BLR", 365, "15:00", "16:10"),
            ("HYD", "CCU", 1180, "11:30", "13:40"), ("CCU", "HYD", 1180, "14:30", "16:40"),
            ("CCU", "GAU", 500, "14:00", "15:20"), ("GAU", "CCU", 500, "10:00", "11:20")
        };
        var flights = routes.Select((r, index) => new FlightDetailsDataModel {
            FlightId = Id("flight-" + index), FlightNumber = "DM" + (100 + index),
            FlightOperator = operators[index % operators.Length],
            SourceAirportData = airports[r.Item1], DestinationAirportData = airports[r.Item2],
            SourceDepartureTime = TimeSpan.Parse(r.Item4), DestinationArrivalTime = TimeSpan.Parse(r.Item5),
            Distance = r.Item3, TotalSeatEconomy = 162, TotalSeatBusiness = 12,
            SeatingFormatEconomy = SeatingFormatModel._3x3, SeatingFormatBusiness = SeatingFormatModel._2x2,
            OperatingDays = OperatingDaysModel.Mon_Sun
        }).ToList();
        db.FlightDetails.AddRange(flights);
        db.FlightGraph.AddRange(routes.GroupBy(r => (r.Item1, r.Item2)).Select(g => new FlightGraphDataModel {
            Id = Id("graph-" + g.Key), SourceAirport = g.Key.Item1, DestinationAirport = g.Key.Item2, Weight = g.Count() }));
        for (var i = 1; i <= 3; i++) {
            db.BookingDetails.Add(new BookingDataModel {
                Id = Id("booking-" + i), PhoneNumber = "000000000" + i,
                PassengerDetails = new List<PassengerDataModel> {
                    new() { Id = Id("adult-" + i), Name = "Demo Adult " + i, Age = 25 + i, Gender = "Male" },
                    new() { Id = Id("child-" + i), Name = "Demo Child " + i, Age = 6 + i, Gender = "Female" }
                }
            });
        }
        await db.SaveChangesAsync();
        await transaction.CommitAsync();
    }
}
