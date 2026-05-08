#!/usr/bin/env bash
set -euo pipefail
npm install
cp .env.example .env || true
cp apps/mobile/.env.example apps/mobile/.env || true
cp apps/web/.env.example apps/web/.env || true
echo "Setup complete"
