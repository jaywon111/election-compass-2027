# Free-tier limits and degradation

The first two phases use no paid service and no credentials. Static Vite output has no server function budget. The following intended stack quotas are planning dependencies, not services currently activated; verify provider plans before production.

- Vercel Hobby: static hosting is the target. No cron or server function is used in this build; retain the 10s function limit and two daily cron limit if introduced.
- Neon Postgres: no DB connection in Phase 1/2; local seed JSON is the source. If quota is hit, keep read-only static demo and defer persistence.
- R2, Resend, Pusher, Groq, Gemini, PostHog, Sentry: not called. Empty credentials select mocks. If quota is reached, remain in mock mode; never block quiz/result/share.
- Browser localStorage: finite device storage, user-controlled. On quota/privacy mode errors, keep the current result in memory and offer share link.
- OpenStreetMap: no tile embed in Phase 2. LGA seed catalog is not bundled yet; location input has placeholder/demo selection.
