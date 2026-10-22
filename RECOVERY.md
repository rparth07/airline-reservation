# Airline service recovery

The deployed application is the Angular frontend in `Frontend`, not `Frontend-js`.
Its production API is `https://rparth07-airline-reservation.somee.com/API/`.
`Frontend/src/environments/environment.prod.ts` defines this public URL.
The API source is `Backend/Airline fare calculation/Airfare.API`.

## Findings on 22 October 2026

- The API hostname and SQL hostname `projects.mssql.somee.com` return NXDOMAIN.
- Netlify's existing deployment is ready; the original blank page was caused by
  the airport resolver failing before the home route could render.
- The recovered development settings connect to LocalDB, database `AirfareData`.
  It contains 13 airports, zero flight operators, zero flights, and zero graph records.
- The production settings contain SQL credentials. They were not copied into this
  repository, logs, or frontend bundles. Host credentials must stay server-side.
- The recovered publish profile is a filesystem publish, not a hosting login.
- No database backup or CSV was found in the recovered project folder.

## Local verification

Supply `ConnectionString` through the backend process environment using the
recovered development settings, and set `AllowedOrigin=http://localhost:4201`.
Never paste the connection string into source control or shell command arguments.
Run the API with `ASPNETCORE_URLS=http://localhost:5035` and:

    dotnet run --no-launch-profile --project "Backend/Airline fare calculation/Airfare.API"

In `Frontend`, run:

    npm ci
    npx ng serve --port 4201
    npx ng test --watch=false --browsers=ChromeHeadless
    npm run build

Backend regression checks (synthetic schedules are isolated from the application):

    dotnet run --project "Backend/Airline fare calculation/Airfare.RegressionTests"

## Published frontend

Production frontend deployment `6ada3189f3985d659c1786ad` was published and browser
verified on 22 October 2026. The live page renders the service-unavailable message
and retry button instead of a blank page. This deployment does not host the .NET
backend. Ten frontend tests and six backend regression checks passed. Browser
checks with the real local API covered airports, all three empty search modes,
query-date preservation, direct booking entry, and admin login routing.

## Restore production

1. Recover the existing Somee application and SQL database, or provide an authorized
   replacement ASP.NET host and SQL Server database/backup. Netlify static hosting
   does not run this ASP.NET Core application.
2. Configure backend `ConnectionString` privately and `AllowedOrigin` with the exact
   Netlify origin. Multiple origins may be comma-separated, without trailing slashes.
3. Deploy the corrected backend and verify real airport, search, booking, and admin
   operations. Recover flight/operator data; the local database has none. Do not
   represent an empty database or synthetic regression schedules as live inventory.
4. If the backend URL changes, update the production environment's public `apiUrl`,
   rebuild Angular, and deploy `Frontend/dist/airline-reservation` to existing site
   `ac35063e-14ba-4d54-9d02-442b0731be52`.

The current fixes provide usable outage recovery and correct reproducible search,
connection, date, admin URL, and booking UX defects. They cannot restore missing
hosting accounts, DNS records, or original flight inventory by themselves.

Existing package compatibility, dependency vulnerability, nullability, and bundle
size warnings remain; builds succeed. Authenticated admin persistence and real
booking persistence still require the restored host/database and authorized login.
