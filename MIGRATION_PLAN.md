# Airline demo migration: Render + Neon

## Rules
- Preserve all existing uncommitted work; baseline saved under ignored `.netlify/migration-baseline`.
- Use free resources only. Never put credentials into source, frontend bundles, logs, or reports.
- Airport identifiers may reference real locations; all schedules, fares, operators and people are synthetic demo data.
- Keep the old LocalDB and recovered settings untouched.

## Execution checklist
- [x] Record current Git status and baseline; inspect table relationships and deployment requirements.
- [x] Port EF Core database mapping and migrations to PostgreSQL and a supported .NET runtime.
- [x] Implement repeatable, relationally consistent demo seeding for all six application tables.
- [x] Protect admin mutations, add health checks and safe configuration.
- [x] Validate locally: builds, search modes, connecting flights, booking, admin and PostgreSQL persistence.
- [x] Provision Neon free project and test migration/seed against an isolated branch.
- [ ] Push validated code on a deployment branch and deploy Render free service in confirmed workspace.
- [ ] Rebuild/redeploy Netlify against Render, account for cold starts, and label the demo.
- [ ] Verify live browser flows and report resources, data counts, tests and limitations.

## Target architecture
Angular on existing Netlify site -> ASP.NET API on Render Free -> PostgreSQL on Neon Free.
Prefer Singapore for the API and database to serve users in India; verify availability before creation.
Neon direct connection for migrations; pooled connection for request traffic.
A committed migration and idempotent seeder define the database. No hand-written schema changes on production.

## Progress
- Neon project: delicate-smoke-85572270 (free, Singapore).
- Main branch: br-empty-butterfly-a1td49au; validation branch: br-small-waterfall-a1q55s2b.
- .NET 10.0.13 / Npgsql EF Core 10.0.3; historical SQL Server migrations retained but excluded from build.
- Backend build and 11 regression checks pass; frontend build and initial 10 checks pass.
- Credential transfer through tool arguments was rejected by automatic approval review.
  A private, ignored `.netlify/migration-secrets.json` template is ready for user entry.
- Docker engine is unavailable locally; PostgreSQL integration will use the isolated Neon branch.

- Added `scripts/verify-api.ps1` to test PostgreSQL readiness, all trip modes,
  connecting routes, authenticated admin create/update/delete, and demo booking.
  It has not yet run against Neon because the private connection fields are empty.
- Render Blueprint passes the current official JSON schema; backend publish succeeds.
- Local auth checks pass: valid login issues a token; invalid login and anonymous admin writes return 401.
- AutoMapper's existing recursion advisory remains in its old package; mapping depth and
  JSON depth are bounded as mitigation. No commercial-license dependency was introduced.

- Neon migration and seed completed. All API smoke checks passed, including authenticated admin writes and persistent booking. Browser booking confirmation verified. Frontend has 12 passing checks.
