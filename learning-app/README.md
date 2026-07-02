# Candidate Preparation Tracker

This folder is a small learning project built to be read slowly in VS Code.

The app uses:

- Next.js for the frontend
- Python with FastAPI for the backend API
- PostgreSQL for the main app data
- Snowflake for one simple analytics example
- Azure notes for deployment thinking, without unsafe secrets or heavy setup

## Why This Project Exists

This is not a production app.

It is a teaching project with these goals:

- show a clean full-stack folder structure
- keep the code easy to follow
- demonstrate simple API calls between frontend and backend
- show where PostgreSQL and Snowflake fit in different roles
- make environment variables visible and understandable
- show how careful structure reduces mistakes

## Project Structure

- `frontend/`
  Next.js app
- `backend/`
  FastAPI app
- `database/postgres/init.sql`
  PostgreSQL table and seed data
- `database/snowflake/example_setup.sql`
  Small Snowflake example table and query
- `docs/reading-guide.md`
  Suggested order for exploring the codebase
- `docs/architecture.md`
  High-level picture of how the pieces connect
- `docs/azure-notes.md`
  Very simple Azure deployment notes

## Suggested Reading Order

1. `docs/reading-guide.md`
2. `frontend/app/page.js`
3. `frontend/app/tasks/page.js`
4. `frontend/lib/api.js`
5. `backend/app/main.py`
6. `backend/app/routes/tasks.py`
7. `backend/app/routes/analytics.py`
8. `backend/app/db/postgres.py`
9. `backend/app/db/snowflake.py`
10. `database/postgres/init.sql`

## Local Run Steps

## Fastest Way

If you want the least thinking and the fewest commands, run this:

```bash
cd learning-app
chmod +x scripts/start-local.sh scripts/stop-local.sh
./scripts/start-local.sh
```

Then open:

- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`

To stop the app later:

```bash
./scripts/stop-local.sh
```

What the start script does:

- starts PostgreSQL with Docker when Docker is available
- copies `.env` files if they are missing
- creates the Python virtual environment if needed
- installs backend and frontend dependencies
- starts the FastAPI backend
- starts the Next.js frontend

If Docker is not installed, the app still runs in demo-data mode so you can open and explore it.

## Manual Run Steps

### 1. Start PostgreSQL

```bash
cd learning-app
docker compose up -d postgres
```

The PostgreSQL starter SQL is mounted into the Docker container and runs automatically the first time the database volume is created.

If you already created the volume before this change and want to run the SQL again manually, use:

```bash
docker exec -i candidate_tracker_postgres psql -U learner -d candidate_tracker -f /docker-entrypoint-initdb.d/init.sql
```

### 2. Start the Python backend

```bash
cd learning-app/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 3. Start the Next.js frontend

```bash
cd learning-app/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open:

- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`

## Demo Mode

The backend defaults to `USE_DEMO_DATA=true`.

That means:

- you can run the app without Docker or PostgreSQL
- tasks are stored in a small local JSON file for learning
- the PostgreSQL files still stay in the project so you can study them

When you want real PostgreSQL mode later, change `USE_DEMO_DATA=false` in `backend/.env` and start PostgreSQL first.

## Notes About Snowflake

Snowflake is optional for local learning.

If you do not set Snowflake environment variables, the analytics endpoint still works and clearly tells you it is using demo fallback data.

That makes it easier to learn the codebase without getting blocked by cloud setup on day one.
