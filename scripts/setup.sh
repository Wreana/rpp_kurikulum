#!/usr/bin/env bash
set -e

asdf install

if [ -f requirements.txt ]; then
  python3.9 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
fi

if [ -d frontend ]; then
  cd frontend && npm ci
fi
