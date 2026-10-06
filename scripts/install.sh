#!/usr/bin/env bash
# Copy skills (or templates) from this repo into a project's .claude/skills/.
# Usage: install.sh <project-dir> <name> [<name> ...]
# Names are folder names under skills/ or templates/. Existing folders are skipped, never overwritten.
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <project-dir> <name> [<name> ...]" >&2
  exit 2
fi

repo="$(cd "$(dirname "$0")/.." && pwd)"
dest="$1/.claude/skills"
shift
mkdir -p "$dest"

for name in "$@"; do
  if [ -d "$repo/skills/$name" ]; then
    src="$repo/skills/$name"
  elif [ -d "$repo/templates/$name" ]; then
    src="$repo/templates/$name"
    echo "note: $name is a template; fill in its {{placeholders}} after copying" >&2
  else
    echo "skip: $name (not found in skills/ or templates/)" >&2
    continue
  fi
  if [ -e "$dest/$name" ]; then
    echo "skip: $name (already in $dest)" >&2
    continue
  fi
  cp -R "$src" "$dest/$name"
  echo "installed: $name"
done
