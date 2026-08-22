# AGENTS

## State of the repo
The repository contains only three empty placeholder files: `index.html`, `script.js`, `style.css`.
There is no package manifest, framework, backend, or database.

## Dev environment
`docker-compose.base44.yml` runs a single `web` service (node:22) that serves the repo root
as a static site with `live-server` on port 3000 (live reload on file save).

Verify: `curl -I http://localhost:3000/` returns 200.

No external secrets are required.
