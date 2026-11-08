# Launch checklist and draft copy

## Production checklist

- Verify official candidate list, every position, source URL, source date, and editor attribution.
- Replace demo seed labels only after editorial verification.
- Validate official polling-place dataset, all states, FCT and LGAs.
- Implement secure server/database and privacy review before accounts or citizen submissions.
- Add locale-reviewed Hausa, Yoruba, Igbo and Nigerian Pidgin translations.
- Run Lighthouse mobile, axe/WCAG, keyboard/screen-reader checks, Playwright E2E, dependency audit, CSP and rate-limit review.
- Confirm Vercel deployment project/authorization and preview with zero secrets.

## X launch thread draft

1/ Election choices should be about what matters to you. Election Compass 2027 is a non-partisan tool to explore your priorities across five policy areas.
2/ Answer 12 scenario-based questions, rank the issues that matter most, and see how the available public data aligns. Missing evidence stays missing.
3/ This is a mirror, not an endorsement. It does not tell you who to vote for. Check sources, compare positions, and share your own result.
4/ Try it: [preview URL to be added after an authorized deployment]

## 30-day content calendar

Day 1: explain neutrality and methodology. Day 2: how the five axes work. Day 3: show where source links appear. Day 4: demo quiz completion. Day 5: explain pending data. Day 6: how to rank priorities. Day 7: invite feedback. Day 8: economy axis explainer. Day 9: security axis explainer. Day 10: power and restructuring axis. Day 11: education axis. Day 12: governance axis. Day 13: accessibility notes. Day 14: privacy and local storage. Day 15: reading a result. Day 16: correcting a data error. Day 17: how to verify a claim. Day 18: LGA/polling lookup status. Day 19: diaspora voter guide placeholder. Day 20: how to share responsibly. Day 21: myth vs evidence. Day 22: explain data completeness. Day 23: volunteer translation call. Day 24: civic literacy prompt. Day 25: explain methodology change log. Day 26: user feedback roundup. Day 27: high-bandwidth vs low-bandwidth design. Day 28: what is not built yet. Day 29: editorial sourcing checklist. Day 30: progress report and next milestone.

## Monitoring dashboard spec

Track aggregate page loads, quiz start/completion/drop-off by question, result share action, locale selected, application errors and asset load time. Do not collect answer-level political preference data by default. Dashboard should flag error rate, build failures, offline-capability failures, and locale fallback rates.
