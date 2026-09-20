# Phase 06 — Event Lifecycle and Archive Handoff

**Objective:** Make pre-event, race-day, memory and archive states explicit so navigation and actions remain coherent throughout and after an event.

**Status:** Frontend implementation complete within verified repository contracts. The approved active/default mode remains `pre_event`; operational switching requires organiser instruction.

**Starting development commit:** `d0b15d2b035aa72318b3d78b978734ada3ca45ca`

**Final phase content commit:** Pending commit creation after the mandatory final build.

**Active branch:** `development` only. `main` was not changed or merged.

## Completed scope

- Added central typed lifecycle configuration for `pre_event`, `race_day`, `memory` and `archive` plus a fail-closed invalid-configuration fallback.
- Added honest open/upcoming/closed registration handling and open/limited/read-only community permissions.
- Adapted homepage, race-information and authentication registration CTAs without restructuring their layouts.
- Adapted desktop/mobile participant navigation priorities and added a compact edition-state notice.
- Made community composition read-only in memory/archive modes while preserving existing readable posts and stories.
- Added public `/archive` with clear edition identity and truthful states for stories, results, photos and impact.
- Preserved Phase 1–5 timing, photography, public-profile, consent, team, challenge and moderation gates.

## Deferred scope and reason

- No automatic date transition: an approved operational schedule does not exist.
- No live alerts, timing, provisional results, photos, highlights or impact records: their verified data/backend contracts do not exist.
- No multi-edition catalogue: the repository contains no approved historical-edition records.
- No backend, database, storage, migration or RLS change was authorised or made.

## Verification

- Type-check: passed.
- Lint: passed with the same six pre-existing `@next/next/no-img-element` warnings and no new warning/error.
- Lifecycle state matrix: passed for `pre_event`, `race_day`, `memory`, `archive` and an invalid-value fail-closed fallback.
- Production state builds: passed for all four valid modes and the invalid fallback; all 28 static-generation steps completed in every build.
- Responsive source audit: passed at phone base (360–390px), `sm` tablet and `lg` desktop rules. The lifecycle notice wraps, archive cards move from one to two columns, and mobile navigation retains six equal-width destinations without page overflow. This is not a real-device screenshot pass.
- `git diff --check`: passed.
- Secret review: no environment value or participant data was added; only the optional lifecycle variable name is documented.
- Mandatory post-change production build: passed in the default `pre_event` mode after the final intended source and documentation change; all 28 static-generation steps completed.

## Exact recommended next task

Begin Phase 7 launch hardening from a fresh `development` fetch: approve final storytelling sources, complete accessibility and privacy UI, review performance/security dependencies, and run real browser/device QA. Separately, obtain organiser approval before changing the deployed lifecycle mode from `pre_event`.
