# Election Compass 2027

A non-partisan civic project, a mirror and not an endorsement. This repository currently implements the Phase 1 zero-key static foundation and Phase 2 quiz, result, share, and voting-plan shell.

## Run locally

1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Vite. No `.env` is required.
4. `npm run build` for a production static build.

## Seed data

The source PDFs provided with the request are not modified. `seed/questions.json` and `seed/candidates.json` are extracted copies used by the app. Review `DECISIONS.md` before treating candidates/positions as authoritative public information. Candidate data is explicitly demo seed.

## Environment

See `.env.example`. Empty values select mocks. Phase 1/2 does not call external APIs or require secrets.

## Deploy

Static build output is `dist/`. Vercel can host it with `npm run build` and output directory `dist`. Deployment requires project selection/authorization in the connected Vercel account. No deployment has been made yet.

## Architecture

```text
seed JSON -> typed client -> quiz answer state -> weighted axis profile -> completeness-guarded compatibility -> localStorage -> share
                              |
                              +-> providers interface (mocks by default; real adapters deferred)
```

## Adding a candidate

Add the record to `seed/candidates.json` following the existing shape. For each axis, use `status: "pending"`, `score: null`, `summary: null`, and empty `sources` when evidence is absent. Never guess a position. Rebuild to include the data.

## Scope

Features not implemented yet are documented in `DECISIONS.md`, `MOCKS.md`, and `FREE_TIER_LIMITS.md`.
