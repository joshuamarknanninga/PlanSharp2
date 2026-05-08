#!/usr/bin/env bash
set -euo pipefail
npm install
cp .env.example .env || true
cp apps/mobile/.env.example apps/mobile/.env || true
echo "Setup complete"
