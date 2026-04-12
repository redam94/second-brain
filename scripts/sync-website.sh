#!/bin/bash
# Merge main into the website branch and run the content sync script.
# Usage: bash scripts/sync-website.sh
#        git sync-website   (if the alias is configured)

set -euo pipefail

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Ensure we start from a clean state
if ! git -C "$REPO_ROOT" diff --quiet || ! git -C "$REPO_ROOT" diff --cached --quiet; then
  echo "Error: working tree has uncommitted changes. Commit or stash them first."
  exit 1
fi

cleanup() {
  echo "Returning to $CURRENT_BRANCH..."
  git -C "$REPO_ROOT" checkout "$CURRENT_BRANCH"
}
trap cleanup EXIT

echo "Switching to website branch..."
git -C "$REPO_ROOT" checkout website

echo "Merging main into website..."
git -C "$REPO_ROOT" merge main --no-edit

echo "Running sync-content.sh..."
# Activate a Python virtual environment if one exists (sync-content.sh may call Python tools)
if [ -f "$REPO_ROOT/.venv/bin/activate" ]; then
  source "$REPO_ROOT/.venv/bin/activate"
elif [ -f "$REPO_ROOT/venv/bin/activate" ]; then
  source "$REPO_ROOT/venv/bin/activate"
fi

bash "$REPO_ROOT/scripts/sync-content.sh"

echo "Website sync complete."
