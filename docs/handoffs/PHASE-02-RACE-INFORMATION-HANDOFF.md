# Phase 02 — Race Information System Handoff

**Objective:** Give athletes a public, mobile-first home for race information while preserving the existing UI.

**Status:** Frontend implemented; official content publication and browser visual QA remain outstanding. Delivery is complete only when the commit receipt below is populated and remote `development` is verified.

**Starting development commit:** `bed15e19d69c9b1a413fbdd9f55636e38108842e`

**Final phase content commit:** Pending delivery receipt.

**Active branch:** `development` only.

**Protected main baseline:** `83907b713a963ec520da6e90b887a252831ed85b` — no main changes authorised or made.

## Completed scope

- Added public `/race-info` using the existing `HomeNav`, `HomeFooter`, design tokens, typography, cards and spacing patterns.
- Added 17 compact expandable topic homes covering overview; categories/distances; starts/waves; registration; swim, bike and run courses; both transitions; athlete/equipment requirements; safety; medical support; transport/parking; schedule; FAQs; and race-guide download.
- Centralised content in `src/config/race-info.ts`. Reused canonical registration categories, distances, fees and processing rate without duplicating numbers.
- Distinguished current registration configuration from official course confirmation. Unknown facts are null and render `TBD`; confirmed fact records require a source and review date.
- Added an honestly disabled guide download with a visible reason and a typed configuration for a future verified PDF.
- Connected the existing homepage race CTA to `/race-info`. Every topic is reachable with that tap plus one native section expansion. No additional nested accordion is needed for FAQs.
- Explicitly marked the route public in middleware; preserved authentication and protected routes.

## UI preservation

- The only change to the homepage is `href="#race"` becoming `href="/race-info"`. An exact source comparison verified every other byte of that component is unchanged.
- No global CSS, theme tokens, existing header/footer, root layout, participant page, image, font or dependency changes.
- Native `details`/`summary` works without JavaScript and provides keyboard expansion. New content uses semantic definition lists, inherited focus rings, a labelled unavailable download and wrapping values.
- Source audit at phone (360–390px), tablet (768px) and desktop (1280px+) constraints: base single-column layout, `sm` grids, wrapping values, card width containment and scroll offset for the existing sticky header. All existing breakpoint classes remain unchanged.
- Browser screenshots/interactive device tests could not run: Playwright is available but Chromium is not installed, and its download repeatedly timed out. This is a source-level responsive audit, not a browser visual pass.

## Deferred scope

- Official event date/venues, wave times, routes, cut-offs, transition rules, eligibility/equipment requirements, safety/medical details, transport, schedule and policies: no reviewed organiser source exists in the baseline, so these remain `TBD`.
- Existing homepage/registration date and course copy remain unchanged under the UI-preservation constraint. Their official provenance must be resolved before promoting them into confirmed operational information (TD-014).
- Official guide PDF: unpublished; no substitute guide was invented.
- Interactive maps and route geometry remain Phase 3. No map provider or route has been assumed.
- Existing Phase 1 backend/media/moderation deferrals remain unchanged.

## Verification

- `npm run type-check`: passed.
- `npm run lint`: passed with the six existing `@next/next/no-img-element` warnings; no new warnings.
- Local HTTP/rendered HTML checks: `/`, `/race-info` and `/register` returned HTTP 200 without a login. Verified homepage destination, all 17 topics/summary controls, unique IDs, registration/ticket links, configured distance values, `TBD` states and the disabled guide explanation.
- Existing UI source comparison and responsive/accessibility audit: passed within the limits above.
- `git diff --check`: required to pass before commit.
- Final production build gate: `npm run build` must exit 0 after this document and every other intended change; neither commit nor push is permitted otherwise. The delivery receipt records the completed gate.
- Local configuration is ignored by Git. No environment values, credentials, private records or backend responses belong in this handoff or commit.

## Files and architecture

- New: `src/app/race-info/page.tsx`, `src/config/race-info.ts`, this handoff.
- Existing code: homepage hero destination and middleware public-route list only.
- Documentation: Project Bible, repository context, decisions, known issues, design references, asset register and handoff index.
- No new environment-variable names, backend entities, packages or assets.
- Loading/network-error states are not introduced for race content: it is synchronously server-rendered configuration. Unknown/unavailable content is explicit. Existing shared auth behaviour remains unchanged.

## Exact recommended next task

Start Phase 3 — Course and Dar Map Experience from a fresh fetch of `development`. First obtain verified course geometry, transition locations, safety/medical/aid points and logistics from the organiser. Until supplied, build honest unavailable map states. Complete browser/device comparison when a browser-enabled environment is available. Preserve this phase's UI and source/provenance requirements; never push phase work to `main`.

## Commit receipt

Pending successful final build and verified delivery. A follow-up documentation commit records the full phase-content SHA, avoiding a self-referential commit hash. The receipt commit itself is identified by Git history and the final delivery report.
