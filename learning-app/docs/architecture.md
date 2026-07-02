# Architecture Notes

## Simple Flow

1. The user opens the Next.js frontend.
2. The frontend calls the Python API with `fetch`.
3. The Python API reads and writes `prep_tasks` in PostgreSQL.
4. The analytics endpoint also shows a small Snowflake reporting example.

## Why Two Databases?

- PostgreSQL is used for the day-to-day app records.
- Snowflake is used only for simple reporting in this demo.

This separation teaches an important idea:

Operational data and analytics data often serve different purposes.

## Why The Frontend Does Not Talk To The Database Directly

The frontend talks to the backend API instead of talking directly to PostgreSQL or Snowflake because:

- database credentials should not live in browser code
- backend routes give one safe place for validation and query logic
- changing the database code later is easier when the frontend depends on an API contract

## Why The Project Is Split Into Folders

- `frontend/` keeps UI code together
- `backend/` keeps API and database access together
- `database/` keeps SQL examples easy to find
- `docs/` explains decisions without mixing prose into application code

