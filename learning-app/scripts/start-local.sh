#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
LOG_DIR="$ROOT_DIR/.logs"
RUN_DIR="$ROOT_DIR/.run"

mkdir -p "$LOG_DIR" "$RUN_DIR"

copy_if_missing() {
  local source_file="$1"
  local target_file="$2"

  if [[ ! -f "$target_file" ]]; then
    cp "$source_file" "$target_file"
  fi
}

start_postgres() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker not found. The app will run in demo-data mode instead of PostgreSQL."
    return
  fi

  echo "Starting PostgreSQL container..."
  (cd "$ROOT_DIR" && docker compose up -d postgres)
}

wait_for_postgres() {
  if ! command -v docker >/dev/null 2>&1; then
    return
  fi

  echo "Waiting for PostgreSQL to become ready..."

  local attempts=0
  until docker exec candidate_tracker_postgres pg_isready -U learner -d candidate_tracker >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [[ "$attempts" -ge 30 ]]; then
      echo "PostgreSQL did not become ready in time."
      exit 1
    fi
    sleep 1
  done
}

setup_backend() {
  copy_if_missing "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"

  if [[ ! -d "$BACKEND_DIR/.venv" ]]; then
    echo "Creating Python virtual environment..."
    (cd "$BACKEND_DIR" && python3 -m venv .venv)
  fi

  echo "Installing Python dependencies if needed..."
  (
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    pip install -r requirements.txt
  )
}

setup_frontend() {
  copy_if_missing "$FRONTEND_DIR/.env.local.example" "$FRONTEND_DIR/.env.local"

  echo "Installing frontend dependencies if needed..."
  (cd "$FRONTEND_DIR" && npm install)
}

start_backend() {
  echo "Starting FastAPI backend..."
  (
    cd "$BACKEND_DIR"
    source .venv/bin/activate
    nohup uvicorn app.main:app --reload --port 8000 > "$LOG_DIR/backend.log" 2>&1 &
    echo $! > "$RUN_DIR/backend.pid"
  )
}

start_frontend() {
  echo "Starting Next.js frontend..."
  (
    cd "$FRONTEND_DIR"
    nohup npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
    echo $! > "$RUN_DIR/frontend.pid"
  )
}

print_summary() {
  cat <<EOF

Learning app is starting.

Open these:
- Frontend: http://localhost:3000
- Backend docs: http://localhost:8000/docs

Useful files:
- Backend log: $LOG_DIR/backend.log
- Frontend log: $LOG_DIR/frontend.log

To stop everything later:
./scripts/stop-local.sh
EOF
}

start_postgres
wait_for_postgres
setup_backend
setup_frontend
start_backend
start_frontend
print_summary
