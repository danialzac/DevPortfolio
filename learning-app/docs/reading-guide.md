# Reading Guide

This guide is for learning the codebase without rushing.

## 1. Start With The Shape Of The Project

Open the top-level folders first:

- `frontend`
- `backend`
- `database`
- `docs`
- `infra`

Ask:

- Which layer owns the user interface?
- Which layer owns the business logic?
- Which layer owns SQL and schema setup?
- Which files look like configuration instead of application logic?

## 2. Read Frontend Before Backend

Suggested order:

1. `frontend/app/page.js`
2. `frontend/app/tasks/page.js`
3. `frontend/components/TaskForm.js`
4. `frontend/components/TaskList.js`
5. `frontend/lib/api.js`

Why:

- You first see what the user experiences.
- Then you see where browser-side state lives.
- Then you see where the API requests are defined.

## 3. Read Backend Routes Next

Suggested order:

1. `backend/app/main.py`
2. `backend/app/routes/tasks.py`
3. `backend/app/routes/analytics.py`
4. `backend/app/models.py`
5. `backend/app/db/postgres.py`
6. `backend/app/db/snowflake.py`

Ask:

- Which route reads data?
- Which route writes data?
- Where does the SQL live?
- How does the backend decide whether Snowflake is ready?

## 4. Read The SQL Last

Look at:

- `database/postgres/init.sql`
- `database/snowflake/example_setup.sql`

At this stage, connect the SQL back to the Python code that uses it.

## 5. Healthy Reading Habits

- Trace one feature end to end instead of skimming every file at once.
- Notice names carefully. Good names remove confusion.
- Separate facts from guesses when reading unfamiliar code.
- If a file feels hard to follow, ask what job that file is trying to own.

