# Phase 01 — Existing Foundation Handoff

**Status:** Complete with documented backend-dependent deferrals

**Starting commit:** `83907b713a963ec520da6e90b887a252831ed85b`

**Final phase content commit:** `5221cc867fbbbdf6a2a5995db3a0f048062c705b`

**Commit link:** https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY/commit/5221cc867fbbbdf6a2a5995db3a0f048062c705b

**Next phase:** Phase 2 — Race information system

## Objective

Finish the existing frontend foundation before adding major product systems: make activity honest, connect controls, complete core feed and ticket states, standardise language, and make unavailable functionality explicit.

## Completed scope

- Removed invented homepage posts, participant/team counts, impact totals, story fallback identities, and dashboard schedule entries.
- Connected homepage registration, race, community, story, and impact navigation.
- Added homepage and public-story loading, empty, error, and retry states.
- Standardised public naming to `Tour de Dar` and the primary story prompt to `Why are you doing this?`.
- Added feed comment reading/writing with authors and timestamps.
- Added post-owner edit/delete, feed retry, local reported state, and an honest disabled media control.
- Replaced the ticket QR placeholder with a real encoded QR and readiness states for registration, payment, confirmation, and bib assignment.
- Added ticket save, Web Share with clipboard fallback, print presentation, and participant-profile linking.
- Corrected training distances through participant category data; unpublished guides, transitions, and maps are honestly unavailable.
- Added existing-avatar presentation and an honest profile-photo upload unavailable state.
- Added non-interactive ESLint configuration and removed tracked `tsconfig.tsbuildinfo`.

## Deferred scope and reason

- Persistent moderation/report enforcement: requires an approved backend table/API and RLS policy.
- Feed media and profile-photo uploads: require approved Supabase Storage buckets and RLS policies.
- Public participant digital homes: scheduled for Phase 4; the current ticket links to the authenticated profile.
- Published guides, transition instructions, course maps, and final schedule: source event content is not available and was not invented.

## Verification

- `npm run type-check` — passed.
- `npm run lint` — passed with non-blocking `@next/next/no-img-element` advisories.
- `npm run build` — passed; all 18 routes compiled and generated successfully using non-secret build placeholders for required public environment-variable names.
- `git diff --check` — passed.
- Responsive source audit — passed for affected mobile-first bases, `sm`/`lg` transitions, flexible grids, wrapping actions, and overflow containment.
- Hosted-browser visual verification could not reach the local preview (`ERR_BLOCKED_BY_CLIENT`); no claim of a live multi-viewport browser pass is made.

## Backend contract to verify

`post_comments` must expose `id`, `post_id`, `user_id`, `content`, and `created_at`, with authenticated read/insert permissions. Existing post owner update/delete policies must enforce `auth.uid() = user_id`.

## Documentation updated

- `docs/TOUR-DE-DAR-PROJECT-BIBLE.md`
- `docs/REPOSITORY-CONTEXT.md`
- `docs/DECISIONS.md`
- `docs/KNOWN-ISSUES.md`
- This handoff

## Exact recommended next task

Begin Phase 2 from a fresh fetch of GitHub `main`: build the mobile-first race-information system using verified event content, mark unknown operational facts `TBD`, connect the homepage race CTA to the new information route, and preserve all Phase 1 truth-state and provider behaviour.
