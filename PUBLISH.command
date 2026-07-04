#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
#  PUBLISH — double-click this file to put your latest changes online.
#  That's the whole job. It saves, uploads, and your site updates itself.
# ═══════════════════════════════════════════════════════════════════════

cd "$(dirname "$0")" || exit 1

echo ""
echo "  📦  Publishing your portfolio..."
echo "  ─────────────────────────────────"

# Is there anything new to publish?
if [ -z "$(git status --porcelain)" ]; then
  echo "  ✅  Nothing new — your live site is already up to date."
  echo ""
  echo "  🌐  https://danialzac.github.io/DevPortfolio/"
  echo ""
  read -n 1 -s -r -p "  Press any key to close this window."
  echo ""
  exit 0
fi

# Save everything
git add -A

# Commit with a friendly timestamp
git commit -m "Update portfolio — $(date '+%d %b %Y, %I:%M %p')

via: dani" >/dev/null

# Upload
echo "  ⬆️   Uploading to GitHub..."
if git push origin main >/dev/null 2>&1; then
  echo ""
  echo "  ✅  Done! Your site will update in about 1 minute."
  echo ""
  echo "  🌐  Live site:   https://danialzac.github.io/DevPortfolio/"
  echo "  🔎  Watch it build:  https://github.com/danialzac/DevPortfolio/actions"
else
  echo ""
  echo "  ⚠️   Upload failed. Check your internet connection and try"
  echo "      again. Nothing was lost — your changes are saved locally."
fi

echo ""
read -n 1 -s -r -p "  Press any key to close this window."
echo ""
