# Base44 Dev Environment

## Stack

Vite 5 + React 18 + TypeScript + Tailwind CSS. Single frontend service, no backend or database.

## Running the app

```sh
docker compose -f docker-compose.base44.yml up -d
```

The Vite dev server runs on port **8080** inside the container and is mapped to host port **3000**. Dependencies are installed via `npm install` on container startup (no lockfile exists yet).

## Vite host allowlist (sandbox-only)

Vite 5.4+ rejects requests with unrecognized `Host` headers (HTTP 403). The Base44 preview proxy sends a rotating `Host: <port>-<sandbox-id>.<sandbox-host-domain>`, so `vite.config.ts` conditionally adds `.${BASE44_SANDBOX_HOST_DOMAIN}` to `server.allowedHosts` **only** when `BASE44_PREVIEW_MODE === "1"`. When the flag is unset or any other value, the original config (no `allowedHosts`) is preserved.

`BASE44_SANDBOX_HOST_DOMAIN` is passed from the host into the container via the compose `environment:` block.

## Verifying the app works

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → 200
- `docker compose -f docker-compose.base44.yml ps` → status `healthy`
- `npx tsc -b` inside the container → exits 0 (type-check passes)
- The preview shows the counter app; the +/− buttons update the count.
