# UI and flow audit — 23 October 2026

This is a targeted regression audit of the existing airline demo, preserving its blue-and-white identity. It is not a claim that every possible input or assistive technology was exhaustively tested.

## Verified defects and fixes

| Flow | Defect | Fix |
| --- | --- | --- |
| Search again after no results | City/date controls registered under unnamed groups; submit threw reading sourceCity | Named groups and actual template-level regression |
| Search/back/forward | Query changes did not rehydrate the editable form | Rebuild the form from resolved route state |
| Same-query retry | Router ignored the retry after a failed request | Same-URL navigation reload and always rerun search resolver |
| Network failure | Search could cancel navigation or look like an empty database | Recoverable form, distinct unavailable message, retry state |
| Changing fields | Stale results/selection could be booked | Hide stale results and prompt a new search |
| Multicity/results reuse | Reused components kept previous city, times, price or selected leg | Refresh input-derived presentation and reset leg selection |
| Dates | Home return date used itself as minimum; departure edits erased valid returns | Minimum follows departure; preserve valid later returns |
| Passenger controls | Each category allowed nine independently | Nine total, at least one adult, infants no more than adults |
| Multicity | A later valid row could hide another invalid row | Validate every leg and chronological dates before submission |
| Time display | Overnight durations could be negative | 24-hour parsing and overnight rollover |
| Business search | Cabin selection did not affect fares | Explicit synthetic business premium, documented below |
| Admin dialog saves | Save buttons closed before API completion | Busy guard; close only on success; retain errors and inputs |
| Flight editing | Table converted operatingDays into display text and partial patches removed readonly fields | Separate display label and explicit editable-field patches |
| Admin search | Search boxes were disconnected and submitted browser forms | Client-side filtered, cached inventory without page reload |
| Admin pagination | Removing the last item could show a blank out-of-range page | Clamp page slices to the last valid page |
| Admin profile | Fictitious contact information and nonfunctional password form | Actual signed-in email; honest owner-managed credentials |
| Keyboard | Click-only trip, airport swap and flight selections | Focus, roles, labels and keyboard activation |
| Mobile | Homepage airports/dates clipped; admin navigation hidden; tables overflowed | Stacked fields, visible admin links, scrolling tables and usable summary |
| Booking | Duplicate IDs and mislabeled fields; limited phone/name validation | Unique passenger labels, integer ages, ten-digit demo phone, no blank names |

## Data and performance

344 persisted daily demo flight services cover all 156 ordered pairs of the 13 seeded airports. Original flights and bookings remain. The added DX schedules have deterministic IDs, approximate great-circle distances and illustrative durations. They run every weekday and have economy/business seats. Business demo base fare and taxes use a 1.8 multiplier; this is not an airline quote.

Search loads reference inventory once per request and considers up to 32 shortest airport paths, retaining direct and connecting options without unbounded database round trips. It does not fabricate results in the client.

## Validation evidence

- Backend: 14 regression checks including repeated seeding, graph weights, all-pair coverage, daily schedules, dates, connections and cabin pricing.
- API: 170 searches covering every distinct airport pair, leap day, all weekdays and both cabins; one-way, round-trip, multicity and connections smoke checks.
- Frontend: template-level repeat-search, route reuse, passenger/date validation, admin save lifecycle, overnight times and network recovery regressions.
- Browser: reproduced original TypeError; corrected search from empty results; mobile homepage-to-results; admin login, inventory filtering and failed-save input retention.
- Desktop and 390px mobile layout inspection; keyboard-enabled controls inspected. No formal WCAG certification is claimed.

## Limits

This demo stores passenger details and confirmation references, not airline tickets, payments or seat reservations. Invalid/same-airport routes remain invalid; coverage applies to the 13 seeded airports. Free-host cold starts remain. Existing AutoMapper advisory (depth mitigation applied), nullability and Angular bundle-size warnings are tracked in MIGRATION_PLAN.md.

## Published verification

Published source commit: 4c26dbf on codex/neon-render-migration.
Render deployment: dep-dbdiji1srm7s73bsitq0 (live).
Netlify deployment: 6adb2a622c21d68506c60a13 (ready), uploaded from the refreshed canonical ZIP.
Public API: all 170 coverage searches passed, followed by airport/operator/flight CRUD with cleanup, admin auth and anonymous-write rejection, and synthetic booking persistence.
Public browser: homepage search, updated airport search, no-results-to-valid-destination recovery, mixed adult/child/infant business round-trip booking, and multicity selection passed with no application console errors in the checked flows.
Neon inventory check: 13 airports, 3 operators, 344 flights, 156 graph routes; graph weights sum to 344.
Frontend suite: 20 checks; backend suite: 14 checks. Production build passes with the existing bundle-size warning.
