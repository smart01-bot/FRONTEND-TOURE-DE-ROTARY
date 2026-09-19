# Phase 00 — Foundation and Governance Handoff

**Status:** Complete

**Starting commit:** `324a013c268027a3ded4364cb909193f1fccedd4`

**Final phase content commit:** `cae22c56a36aef8331c56dde7e09c42fef5712c1`

**Handoff publication:** Included in the immediate documentation-only follow-up commit
**Next phase:** Phase 1 — Finish the Existing Foundation

## Objective

Create the permanent project governance and context structure required for reliable work across future chats and phases.

## Completed scope

- Added mandatory agent reading and phase laws.
- Established the Project Bible as product/workflow authority.
- Added current repository architecture context.
- Added decision, issue, design-reference, and asset registers.
- Added the handoff convention and this initial handoff.
- Formalised GitHub `main` as the only code baseline between phases.

## Current product baseline

The repository is a meaningful pre-race foundation with authentication, registration, a participant portal, fundraising, participant stories, an early community feed, HQ administration, and Supabase integration. It is not yet the complete temporary digital community described by the vision.

Working estimate before Phase 1:

- Existing-screen quality: approximately 70%
- Pre-race MVP completeness: approximately 65%
- Full-vision frontend completeness: approximately 40%

These are planning estimates, not test coverage or delivery metrics.

## Phase 1 objective

Finish the existing frontend foundation before adding major systems. The phase must address:

1. Honest homepage data and empty states
2. Working homepage navigation and CTAs
3. Consistent product naming and participant-story language
4. Feed comments and core content states
5. Real digital-bib QR/save/share/print states
6. Honest and functional training resources
7. Stronger participant identity foundations
8. Mobile, tablet, desktop, accessibility, type, lint, and production-build verification

## Required Phase 1 start procedure

1. Fetch fresh `main`.
2. Confirm its SHA.
3. Read `AGENTS.md`.
4. Read the complete Project Bible.
5. Read all current context registers.
6. Read this handoff.
7. Inspect the affected source files before planning implementation.

## Known constraints

- Never show fake live activity.
- Never invent missing race information.
- Preserve Supabase authentication, providers, role checks, and current working flows.
- Never commit `.env*` files or secret values.
- Phase 1 is not complete until its verified commit is visible on GitHub `main` and its handoff records the final SHA.
