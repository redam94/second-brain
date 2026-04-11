#!/bin/bash
# Sync vault content from the repo root into content/ for Quartz to build.
# This copies markdown files and folders while excluding build tooling and private content.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTENT_DIR="$REPO_ROOT/content"

# Folders to sync from the vault
VAULT_FOLDERS=("Research" "Clippings" "Questions-and-Answers")

# Clean existing synced content (but keep index.md)
for folder in "${VAULT_FOLDERS[@]}"; do
  rm -rf "$CONTENT_DIR/$folder"
done

# Copy vault folders into content/
for folder in "${VAULT_FOLDERS[@]}"; do
  if [ -d "$REPO_ROOT/$folder" ]; then
    cp -r "$REPO_ROOT/$folder" "$CONTENT_DIR/$folder"
    echo "Synced $folder"
  fi
done

# Copy the vault index as a reference (but don't overwrite the custom index.md)
if [ -f "$REPO_ROOT/_Vault_Index.md" ]; then
  cp "$REPO_ROOT/_Vault_Index.md" "$CONTENT_DIR/_Vault_Index.md"
  echo "Synced _Vault_Index.md"
fi

echo "Content sync complete."
