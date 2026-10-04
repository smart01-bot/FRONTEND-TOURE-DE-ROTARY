# EVOLUTION-02 — Landing Page Transformation

4 October 2026. Landing implementation verified locally; publication receipt follows after the non-forced development update. This is EVOLUTION-02, separate from historical Phases 0–7.

## Baseline and previous gate

- Fetched `development` and `main`; explicitly checked out development. Local HEAD and remote development both `224bb26a8fee6eb1172eb6254211b5bd9aaac71a`; clean tree before edits.
- This is Phase 1's documentation receipt, immediately following verified implementation `2c3ef8941e8e568aee0c786542c447f973dde6c4`. No newer/unrelated change was discarded.
- Main read-only: `83907b713a963ec520da6e90b887a252831ed85b`. Augment reference: `2b0fd671369d05389b9c56189f4ceb920469aa84`; unmodified.
- Read the saved full master brief, current repository version and required current documentation. Older main-only instructions are superseded by the user's explicit development-only phase requirement and current governance.
- Phase 1 gate rechecked: shared primitives exist, 53 protected files byte-identical, 29 route files retained; type-check, lint and production build pass. Historical browser limitations were re-evaluated and a Chromium runtime became available for this phase.

## Completed scope / affected files

Runtime changes are confined to `src/app/page.tsx` and `src/components/home/`:

- **A/B:** HeroSection, StatsStrip, ImpactSection: athletic hierarchy, layered existing imagery, configured format counts, charity/organiser identity, clear lifecycle-controlled CTAs. The hero consumes the reviewed confirmed-date fact (TBD now) instead of counting down to an unsourced date. Legacy date/config and CountdownTimer source remain untouched.
- **B/C:** DisciplinesSection: all three SWIM/BIKE/RUN images visible; mouse preview, touch selection and keyboard focus/activation. Existing configured distances are explicitly labelled. Course summaries read Tour layers/routes/markers and keep honest absence of geometry; map and race-info routes retain their meanings.
- **B:** WhyIRaceSection and CommunityPulse: editorial stories and real community previews, loading/error/empty/populated states, existing reload and query behavior. No participant image, bib, profile or expanded consent disclosure.
- **C:** EventWeekend: Before / Race Day / After browsing from existing race and capability configuration. Local state only; registration remains governed by ACTIVE_LIFECYCLE.
- **C/D boundary:** SponsorsSection: headline/major/supporting hierarchy and responsive approved-record/logo rendering. Production records remain empty; no mock sponsor, logo or relationship.
- **A:** landing.module.css and landing-media.ts: scoped layout, focus, forced-color/reduced-motion behavior and existing image paths. One priority image, lazy supporting images, responsive next/image sizing, reserved geometry; automatic background rotation removed.
- Documentation: context, decisions, design/assets/issues, docs/handoff indices, STATUS, CHANGE-REGISTER, ADMIN-CAPABILITIES, VERIFICATION, this handoff and EVOLUTION-03-INITIATING-MESSAGE.

Full A/B/C/D file mapping: [CHANGE-REGISTER](../visual-evolution/CHANGE-REGISTER.md). No Class D operation enabled. No asset, package, environment name, route, data helper, authentication/provider, authorization, API or lifecycle contract was changed. Shared HomeNav/HomeFooter source is untouched; their new appearance is scoped to the landing wrapper only.

## Verification evidence

- `npm run type-check`: pass.
- `npm run lint`: pass; only the two inherited profile/ticket no-img-element warnings.
- `npm run build`: successful production build on Next.js 14.2.35, 31/31 static-generation steps, middleware and route inventory retained. Repeated after final intended changes before publication.
- `node scripts/check-evolution-boundaries.mjs`: 53 protected files unchanged; 29 page routes retained. `git diff --check`: pass; no tracked environment/secrets.
- Real Chromium 153 browser: before/after screenshots at phone 390, tablet 768 and desktop 1440; additional 360px review. All final widths equal document scrollWidth; no overflowing elements in the measured layouts.
- Mouse hover/exit, keyboard focus/Enter/Tab, touch emulation and Before/Race Day/After interaction pass. Three-pixel focus visible; reduced motion computes `transition-duration: 0s` and `transform: none`.
- Synthetic browser responses cover loading, permission-denied/error, retry, empty, public story and long names/posts/stories. Consent request still includes `story_public=eq.true`; fetched bib fixture is never rendered. Zero browser page exceptions. These fixtures are external QA only, never product records.
- Isolated component checks exercise hero/impact actions for pre-event, race-day, memory, archive and invalid fallback; no closed mode links to registration. Weekend browsing does not mutate lifecycle. Sponsor empty and supplied-record layouts checked with a synthetic QA-only record.
- `/race-info`, `/course-map`, `/stories`, `/archive`, `/privacy`, `/register`: HTTP 200. Anonymous `/feed`, `/results/memories`, `/dashboard`, `/admin/overview`: HTTP 307 to their original login-next paths.
- Automated accessibility scan and manual contrast review are detailed in [VERIFICATION](../visual-evolution/VERIFICATION.md). No screen-reader or universal accessibility certification.
- All five displayed image instances load. Recorded desktop optimized bodies total about 202 KB during the full-page review, versus about 8.4 MB for the four unique source masters. Local cached timings are not field Core Web Vitals or mobile-network evidence. No autoplay video, polling animation or timer-driven image rotation.

## Remaining blockers / limits

Official date/schedule/venues/geometry, sponsor records/logos/rights, verified impact totals and authentic approved Dar/event imagery remain unavailable. Reused Pexels filenames suggest credits, but exact licence/provenance requires organiser review. No historical material or fake activity added. Missing admin content/sponsor publishing workflows are documented with actor, rights, version, publication and audit requirements; no API names guessed.

Existing EV-001–006 remain: account-only registration entry, missing recovery-confirm route, donor return paid-update review, fundraising consent review, unverified admin RLS/error/concurrency/audit and webhook routing. Other timing/photos/teams/moderation/privacy/security-upgrade blockers remain. This is visual completion, not launch or operational admin completion.

Browser testing used isolated loopback Supabase responses. No live login, payment, database mutation, RLS verification, signed-in admin success, screen reader, physical device or cross-browser test. Deployment and production performance remain unverified.

## Next chat

EVOLUTION-03 — Public Race & Event Experience. Use the [complete initiating message](../visual-evolution/EVOLUTION-03-INITIATING-MESSAGE.md). Fetch fresh development, verify this receipt/ancestry and preserve newer work. Extend the system across public routes without recreating the landing or changing functional contracts.

## Commit receipt

Publication is pending at the time this implementation handoff is staged. After the verified tree is published, an immediate documentation-only follow-up records the implementation SHA/tree and confirmed remote result. Its own final branch SHA is provided in the completion message (a commit cannot embed its own SHA).
