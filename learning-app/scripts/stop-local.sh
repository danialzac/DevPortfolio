#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="$ROOT_DIR/.run"

stop_if_running() {
  local label="$1"
  local pid_file="$2"

  if [[ -f "$pid_file" ]]; then
    local pid
    pid="$(cat "$pid_file")"

    if kill -0 "$pid" >/dev/null 2>&1; then
      echo "Stopping $label..."
      kill "$pid"
    fi

    rm -f "$pid_file"
  fi
}

stop_if_running "backend" "$RUN_DIR/backend.pid"
stop_if_running "frontend" "$RUN_DIR/frontend.pid"

echo "Stopping PostgreSQL container..."
(cd "$ROOT_DIR" && docker compose stop postgres)

echo "Learning app stopped."

