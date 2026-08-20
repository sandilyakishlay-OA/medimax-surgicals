#!/usr/bin/env bash
# One-command deploy to GitHub Pages.
# Requires: a git remote named "origin" pointing at your GitHub repo.
set -euo pipefail
cd "$(dirname "$0")"

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "No git remote 'origin' found."
  echo "Run: git init && git remote add origin <your-repo-url>"
  exit 1
fi

npm install
npm run build
npx --yes gh-pages -d dist -m "Deploy Medimax site $(date +%Y-%m-%d)"

echo "Deployed. Enable GitHub Pages (branch: gh-pages) in your repo settings if this is the first deploy."
