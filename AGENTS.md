# Base44 Dev Environment

## Stack
- Vite 5.4 + React 18 + TypeScript + Tailwind
- Dev server runs on port 8080 inside the container, mapped to host port 3000

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
Dependencies install automatically on container startup via `npm install`.

## Sandbox-specific notes
- Vite 5.4 does **not** read the `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` env var (that's Vite 6.1+).
  Instead, `vite.config.ts` conditionally sets `server.allowedHosts` to `.${BASE44_SANDBOX_HOST_DOMAIN}`
  when `BASE44_PREVIEW_MODE === "1"`. This allows the preview proxy's Host header through Vite's
  host-checking security fix. When the flag is unset, no allowlist is added (original behavior).
- `BASE44_SANDBOX_HOST_DOMAIN` is passed from the host into the container via compose `environment:`.
- After changing compose `environment:` entries, use `docker compose up -d` (not just `restart`)
  so the container is recreated with the new env.

## Verifying
- `curl http://localhost:3000/` should return 200 with the app HTML.
- The visible `<h1>` and `<title>` should match the app's main title.
