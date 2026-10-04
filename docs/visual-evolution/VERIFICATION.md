# EVOLUTION-01 verification — 4 October 2026

Baseline: fresh development `a2e569ffc252388f07f0c0ddd2d8927606c3e64b`; clean working tree before changes. Reference main `2b0fd671369d05389b9c56189f4ceb920469aa84`. No deployment or live database connection/mutation was performed.

## Commands and results

| Check | Evidence |
| --- | --- |
| Dependency install | `npm ci --no-audit --no-fund`: succeeded; lockfile unchanged |
| Baseline type-check/lint/build | Passed. Lint has two inherited no-img-element warnings at profile:113 and ticket:214 |
| Final type-check | `npm run type-check`: passed after implementation |
| Final lint | `npm run lint`: passed, same two inherited warnings, no new warning/error |
| Protected contracts | `node scripts/check-evolution-boundaries.mjs`: 53 exact-file checks and 29 route files retained |
| Production build | `npm run build`: passed on Next.js 14.2.35; 31/31 static-generation steps, original route inventory and middleware retained. The final gate was repeated after recording verification and before commit. |
| Patch and secret review | `git diff --check`; no tracked env files; no real credentials, participant records or privileged keys introduced |

Build and local HTTP checks use a loopback Supabase URL and a non-secret local validation key, supplied only as process environment. This checks compilation/prerendering and anonymous routing without contacting live Supabase. It does not certify production configuration, signed-in queries, payments, successful admin writes or deployed RLS. The lifecycle remains the default `pre_event`.

## Rendered HTTP and component checks

A temporary development-only route rendered the checked-in `VisualSystemReview.tsx`, then was removed before final build. It returned 200 with all three modes, SWIM/BIKE/RUN, native disabled buttons and explanation relationships. Next compiled the actual CSS module; its response included reduced-motion, forced-color and scoped token styles. No mock operation, participant or sponsor was connected to a product page.

| Path | Response |
| --- | --- |
| `/`, `/race-info`, `/course-map`, `/privacy`, `/register` | 200 |
| `/dashboard` | 307 → `/login?next=%2Fdashboard` |
| `/admin/overview` | 307 → `/login?next=%2Fadmin%2Foverview` |
| `/reset-password/confirm` | 404, confirming inherited EV-002 |

Server admin guard source still verifies `getUser` then exact `hq_admin`. No signed-in role or policy test was run. Public-story filter, registration validation, ticket readiness/QR data, API payloads, lifecycle invalid-value fallback, provider mount order and all unavailable-capability configuration were verified unchanged by file hashes plus source tracing.

## Responsive/accessibility source audit

- 360/390px: one-column grid, min-width:0, wrapping long content and actions, no fixed component widths, image aspect-ratio reservation. All existing shared shell dimensions/classes remain identical.
- 768px: two-column grid; 1280px: three columns. Heading sizes clamp per mode; admin hierarchy stays compact.
- Native button/link semantics; action button defaults to type=button; required text in status/discipline labels, optional status announcement, disabled reason via caller aria-describedby. No hover-only content.
- Three-pixel focus outline with contrasting offset; forced-colors system treatment. Reduced motion disables transitions/transforms; admin lift/duration/shadow are zero. No continuous animation.
- Image sizes/alt/caption are explicit. Body descriptions remain solid-surface text; no contrast assumptions over photography.
- Four existing shared components only changed name rendering/alt source, with the same resulting string, attributes, classes and links. Source comparison supports no intended before/after layout difference; it is not a screenshot comparison.

Calculated WCAG sRGB contrast ratios (normal text threshold 4.5:1): body 16.92; muted light 7.12; muted dark 11.39; primary button 9.19; dark action 10.77; SWIM 8.44; BIKE 7.88; RUN 4.88; info 8.45; success 6.81; warning 6.62; danger 7.60. These are token-pair calculations, not full-page accessibility certification.

## Limitations

Chromium is not installed. Playwright browser download failed with a truncated/invalid archive. No browser screenshot, measured layout/overflow, keyboard interaction, screen-reader, real-device, cross-browser or Core Web Vitals pass is claimed. The source audit and rendered HTML are the available Phase 1 evidence; browser/device QA remains required when pages adopt the system and before launch. Existing operational/security/content blockers are in INVENTORY and KNOWN-ISSUES; none is silently marked fixed.
