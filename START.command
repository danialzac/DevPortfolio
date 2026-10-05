#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
#  ▶ START — double-click me. The project runs and your browser opens.
#  * Double-click je. Website keluar sendiri kat browser.
#
#  ! To STOP: in this window press Ctrl + C.  (Tekan Ctrl + C untuk berhenti.)
#  * Closing the window? The site keeps running quietly in the background.
#    Use 🚀 Projects in your Code folder → "stop" to switch it off.
# ═══════════════════════════════════════════════════════════════════════

# * Settings for this project (tetapan projek ni)
NAME='portfolio'
PORT='3001'
SUBDIR='.'
RUN='python3 -m http.server 3001 --bind 127.0.0.1'
PRE=''
NOTE=''

# * Step 1 — go to the project folder (pergi ke folder projek)
cd "$(dirname "$0")/$SUBDIR" || exit 1
clear
echo ""
echo "  ▶  Starting $NAME ..."
echo "  ─────────────────────────────────"

# * Step 2 — pick the right Node version. The .nvmrc file remembers which one.
#   Macam kunci kereta: projek ni hanya hidup dengan Node version yang betul.
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  nvm use >/dev/null 2>&1 || nvm install >/dev/null 2>&1
fi

# * Step 3 — download the project's building blocks (node_modules) if missing.
#   Kali pertama je lambat sikit. Lepas tu laju.
if [ -f package.json ] && { [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; }; then
  echo "  📦  First run — installing packages (1-2 min)..."
  npm install --no-fund --no-audit --loglevel=error || { echo "  ❌  Install failed. See the message above."; read -r; exit 1; }
  touch node_modules
fi

# ? Secrets file missing? The site may run but logins/payments won't work.
for ex in .env.local.example .env.example; do
  if [ -f "$ex" ] && [ ! -f .env.local ] && [ ! -f .env ]; then
    echo "  ⚠️   No .env.local yet. Copy $ex to .env.local and fill in your keys."
  fi
done

# * Step 4 — any extra prep this project needs (e.g. start the database)
[ -n "$PRE" ] && eval "$PRE"
[ -n "$NOTE" ] && echo "  💡  $NOTE"

# * Step 5 — run the server inside tmux (a "room" that keeps it alive).
#   tmux = bilik belakang. Server duduk situ walaupun window ditutup.
SESSION="$NAME-dev"
if command -v tmux >/dev/null; then
  if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    tmux new-session -d -s "$SESSION" -c "$PWD" \
      "export PATH='$PATH'; $RUN; echo; echo '  Server stopped. Press Enter to close.'; read"
  fi
  # Wait until the site answers (tunggu sampai website hidup), max ~60s
  for _ in $(seq 1 60); do nc -z 127.0.0.1 "$PORT" 2>/dev/null && break; sleep 1; done
  open "http://127.0.0.1:$PORT"
  echo "  ✅  Running at http://127.0.0.1:$PORT (only visible on this Mac)"
  echo "  ⏹   Ctrl + C to stop."
  echo ""
  tmux attach -t "$SESSION"
else
  ( for _ in $(seq 1 60); do nc -z 127.0.0.1 "$PORT" 2>/dev/null && break; sleep 1; done; open "http://127.0.0.1:$PORT" ) &
  eval "$RUN"
fi
