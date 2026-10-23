# Demo dataset

Airport IATA codes and city references: https://ourairports.com/data/ (public domain).
Codes: MAA DEL BOM AMD BLR HYD CCU PNQ GOI JAI COK LKO GAU.
Only geographic identifiers are real. Operators, flight numbers, daily schedules,
distances, fares, bookings and passengers are generated for this demonstration;
they do not represent bookable airline inventory or actual people.
All routes use Indian local time, so no cross-time-zone conversion is implied.

The idempotent DemoSeeder populates 13 airports, 3 fictional operators, 344 daily
flight services, 156 directed graph routes, 3 bookings and 6 passengers. Seeded IDs
are deterministic. Existing data is never overwritten on startup.

Suggested searches: Chennai -> Delhi (direct); Chennai -> Guwahati (connections);
Chennai -> Delhi -> Mumbai (multicity); Chennai <-> Delhi (round-trip).
Every flight repeats daily; choose current or future travel dates.

This app records demo passenger bookings; it does not issue tickets, take payment,
or reserve seats with an airline. Use fabricated contact and passenger details.

Expanded DX schedules connect every distinct pair of these 13 airports twice daily, on all weekdays. Approximate great-circle distances and illustrative durations are generated locally. Business demo base fare and taxes are 1.8 times economy. No external flight inventory or real passenger records are used.
