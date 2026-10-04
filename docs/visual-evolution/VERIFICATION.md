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

## Publication verification

Authenticated non-forced development update succeeded. A fresh fetch returned `2c3ef8941e8e568aee0c786542c447f973dde6c4` and tree `fe47f9edb9eec483c5e43d680b992a500bbf0ccf`, matching the built staged tree exactly; local development was clean. Main remained `83907b713a963ec520da6e90b887a252831ed85b`. A documentation-only receipt follows with the same runtime tree contents and its own final production-build gate.


# EVOLUTION-02 verification — 4 October 2026

Baseline: development `224bb26a8fee6eb1172eb6254211b5bd9aaac71a`, explicitly checked out and clean, with Phase 1 implementation ancestry verified. Main remained `83907b713a963ec520da6e90b887a252831ed85b`.

## Build and boundary gate

Type-check, lint and production build pass. Lint retains only the two inherited image warnings; final production generation reports 31/31. Protected-file check passes 53 unchanged files and 29 retained routes. Final build is repeated after final documentation/styling changes before every commit. No package/lockfile, environment, asset, database, backend or route-contract change.

## Browser and component evidence

Chromium 153.0.8010.0 was installed only in external QA scratch after normal Playwright downloads returned invalid archives. A standard multi-process launch succeeded. An earlier single-process harness stalled a lazy image; direct optimized-image HTTP requests returned 200, and the standard browser loaded every image. No product workaround/dependency was needed.

- Before/after screenshots at 390×844, 768×1024 and 1440×1000, plus final 360×800. At all four widths, document scrollWidth equals viewport width and no element extends horizontally. Long synthetic names/posts/stories also fit at 360px.
- Mouse preview/exit; native button keyboard Tab/focus/Enter; touch-emulated tap; Before/Race Day/After; focus outline 3px solid; reduced motion 0s / no transform: pass.
- Loading, denied/error, retry, empty and synthetic populated story/feed states: pass. No browser page exception. Story request retains public-consent filter; bib fixture not rendered.
- External component harness covers all five active/fallback lifecycle cases, unchanged CTA destinations/closed-registration behavior, weekend local-only state and sponsor empty/synthetic supplied-record surfaces.
- Public race/course/stories/archive/privacy/register HTTP 200; anonymous feed/memories/dashboard/admin HTTP 307 with existing encoded next destination. No live credentials or participant records used.
- All five image elements load. One priority hero; four lazy instances. QA scrolls/decodes the full page before screenshots; screenshot preparation is not evidence of natural loading thresholds. Recorded desktop optimized bodies: 80,740 + 60,808 + 20,320 + 18,944 + 20,950 = 201,762 bytes. The four unique unchanged source masters total 8,430,865 bytes. Cached loopback response timing is not production LCP or field performance.

## Accessibility and contrast

Automated WCAG A/AA checks on the landing are paired with manual review; the final scan receipt is recorded below after execution. The first scan found no violations and requested manual image-background contrast inspection. Discipline titles/actions now have solid navy backplates, giving white text a deterministic 16.92:1 ratio. Other retained system pairs: muted slate/white 7.12:1, white/blue 9.19:1, yellow/navy 10.77:1, discipline navy text minimum 4.88:1. Visible text and pressed state accompany color. No continuous animation, essential hover-only content or motion-only state.

Real screen-reader, physical-device, cross-browser, authenticated backend/RLS and field Core Web Vitals verification remain outstanding. Existing global/other-route defects are not certified by this landing-only pass. Full admin operational expansion remains blocked by documented contracts.
