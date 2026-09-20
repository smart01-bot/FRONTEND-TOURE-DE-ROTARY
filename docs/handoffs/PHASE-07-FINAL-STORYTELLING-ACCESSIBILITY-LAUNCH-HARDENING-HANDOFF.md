# Phase 07 — Final Storytelling, Accessibility and Launch Hardening Handoff

**Objective:** Complete safe frontend storytelling, accessibility, privacy, performance, security and launch hardening without redesigning the existing interface or fabricating content.

**Status:** Frontend phase complete within verified repository contracts. Production launch remains blocked; see `docs/PHASE-07-FRONTEND-COMPLETION-ASSESSMENT.md`.

**Starting development commit:** `313cb684a479cc501c8bbbdbdc416e30591dff08`

**Final phase content commit:** Pending final verified commit.

**Active branch:** `development` only. `main` was not changed or merged.

## Completed scope

- Added public `/privacy` covering operational data, public-story boundaries, separate photo/research consent, communication preferences and honest email-based access/deletion entry points.
- Added privacy navigation from the public footer and participant profile.
- Restored browser zoom; added global skip navigation, reduced-motion behavior, form label/error relationships, async announcements and keyboard-safe appearance menus.
- Increased shared navigation targets and retained existing focus styling.
- Preserved the existing accessible map text alternative and capability/lifecycle states.
- Added honest Old Dar × Modern Dar source/rights unavailability to the archive; no history, images or impact claims were fabricated.
- Removed invented dashboard training progress and changed unverified start time/location to `TBD` without restructuring the page.
- Added metadata base/social image, robots and sitemap contracts.
- Added safe response headers and removed the unused wildcard remote image-optimizer rule.
- Restored the intended authentication boundary by moving inactive root middleware to `src/middleware.ts`, where Next.js bundles it beside `src/app`.
- Updated Next.js and its lint config from `14.2.18` to compatible `14.2.35`, plus direct PostCSS to `8.5.6`.
- Kept `NEXT_PUBLIC_EVENT_LIFECYCLE` defaulting to `pre_event`; no backend, schema, storage, migration or RLS change was made.

## Verification

- Type-check: passed.
- Lint: passed with two remaining `@next/next/no-img-element` warnings for a dynamic participant avatar and browser-generated QR data URL; no lint error.
- Production build: passed on Next.js `14.2.35` in the required default `pre_event` mode; all 31 static-generation steps completed and `/privacy`, `/robots.txt` and `/sitemap.xml` were generated.
- `npm audit --omit=dev`: one critical Next.js and one transitive high PostCSS finding remain; the offered fix is a breaking Next.js 16 upgrade.
- Secret review: `.env` and `.env.*` remain ignored; no tracked environment file, credential or participant record found.
- Route/access review: the initial smoke test exposed inactive root middleware; after relocation, `/privacy` remains public and unauthenticated participant/admin requests redirect to `/login?next=…`. Public indexing excludes private routes.
- Browser/device review: no installed local browser or real device was available. No screenshot, screen-reader or cross-browser pass is claimed.

## Deferred scope and reason

- Historical/event storytelling assets and claims: no approved source, rights or factual review.
- Automated privacy/consent/preference workflows: no approved backend contract.
- Fully clean dependency audit: requires a separately verified breaking framework migration.
- Real-device, browser, screen-reader and measured Core Web Vitals pass: tooling/deployment unavailable.
- Backend-dependent Phase 4–5 capabilities and organiser operational content remain gated.

## Exact recommended next task

Run a launch-readiness remediation project before release: first complete and verify the framework major upgrade, then perform production-like browser/device/accessibility/performance QA, while organisers supply approved race, course, history and privacy-process inputs. Do not merge `development` into `main` until the blocker register is cleared or explicitly accepted by the authorised release owner.
