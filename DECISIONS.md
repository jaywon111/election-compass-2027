# Decisions and deferrals

- New project created at `workspace/election-compass-2027`; existing repositories were not modified.
- Source PDFs were parsed locally and remain unchanged. Extracted seed data files are derived copies: 12 questions, 5 axes, 18 candidates.
- Built as Vite + React + strict TypeScript rather than Next.js 15 because no existing project exists and a no-secret static preview is the most reliable zero-cost deployable subset in this workspace. This is a documented deviation; Next server capabilities, Prisma, Auth.js, and database remain deferred.
- Candidate compatibility is calculated only when every axis position is available. Candidates with any pending position show “Insufficient public data”; no missing scores are inferred or imputed. Candidate seed is explicitly marked demo seed and not a certified ballot list.
- The authoritative question seed specifies weights normalized to 1 and compatibility `1 - weighted absolute distance / 4` on the −2 to +2 scale. UI rank controls are keyboard-operable buttons rather than drag-only controls; scorer follows the seed formula.
- Quiz handles answers client-side, ranks axes via keyboard-operable up/down controls and stores result locally. No login wall.
- OG image is static metadata for now; per-result dynamic OG and QR are deferred because no server runtime is present. Web Share is used when available, with clipboard fallback.
- Polling unit lookup cannot be reliable without an official complete PU dataset; Phase 2 provides state/LGA selection inputs and makes no invented PU/address. Voting plan card labels the unknown PU/address as not entered. Full 36 states/FCT plus 774 LGA dataset is deferred pending authoritative source data.
- Multilingual scaffolding is available via locale string dictionaries; translations other than English are explicitly placeholders and fall back to English.
- PWA install/offline shell included; dynamic data is not synced.
- Accessibility and low-bandwidth priorities: semantic controls, keyboard operation, no remote imagery/font requests, responsive layout, reduced motion support. Full screen-reader/manual and Lighthouse audit deferred.
- Phase 3+ features remain typed/documented deferrals in the requested build order. No candidate-position source link, date or editor metadata was supplied in structured seed, so no such provenance is fabricated.
- Vercel deployment was not completed: integration requested explicit confirmation before writing a deployment. Do not deploy until user approves exact project deployment.
