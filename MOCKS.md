# Zero-key mode and provider mocks

No secret is required to start this project. The Phase 1/2 preview is a Vite + React client app; the provider boundary is typed under `src/lib/providers.ts` and selects mock providers until real adapters are implemented.

- AI: mock returns a labelled deterministic summary; no AI outputs are used by the quiz. Retrieval-dependent claims are deferred.
- Email/auth: mock sign-in is not implemented in the core loop; no account is required. Auth.js adapter is deferred.
- Storage: mock upload persists in browser memory only; R2 adapter is typed as a future seam.
- Realtime: mock is local/no-op; Pusher adapter is a typed seam.
- Analytics: mock logs only the active mode, no user activity is sent. PostHog adapter is a typed seam.
- Maps: OpenStreetMap link and local state/LGA selectors only, no map API key.
- Quiz/save: localStorage, no remote persistence or login.

Every visible seed candidate dataset is explicitly labelled demo seed data. Do not interpret it as verified current ballot/candidate certification.
