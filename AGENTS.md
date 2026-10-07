# Base44 Dev Environment

## Project

Vite + React + TypeScript + Tailwind frontend. No backend, no database, no external services.

## Setup

- `docker compose -f docker-compose.base44.yml up -d --build` brings up the dev server on host port 3000 (mapped to container port 8080).
- Dependencies install automatically on container startup via `npm install`.
- The Vite dev server runs with live reload; source is bind-mounted so edits appear immediately.

## Verification

- Curl `http://localhost:3000/` — should return the Vite HTML shell.
- The page renders a centered card with a counter component.
