#!/usr/bin/env bash
# Usage: tools/make-thumbs.sh <gallery-name> <image>...
# Resizes images to 480px-wide JPG thumbnails into src/assets/gallery/<gallery-name>/,
# which the web page picks up automatically (see src/lib/gallery.ts).
set -euo pipefail
name="$1"; shift
dest="$(dirname "$0")/../src/assets/gallery/$name"
mkdir -p "$dest"
for f in "$@"; do
  out="$dest/$(basename "${f%.*}" | cut -c1-40).jpg"
  magick "$f" -auto-orient -resize 480x -strip -quality 78 "$out"
  echo "$out"
done
