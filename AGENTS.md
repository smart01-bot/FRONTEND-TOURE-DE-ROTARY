# Tour de Dar — Mandatory Agent Instructions

These instructions apply to every human or coding agent working in this repository.

## Required reading order

Before planning, editing, generating code, or beginning any project phase:

1. Fetch the latest `main` branch from `smart01-bot/FRONTEND-TOURE-DE-ROTARY`.
2. Confirm the current remote `main` commit SHA.
3. Read this file completely.
4. Read `docs/TOUR-DE-DAR-PROJECT-BIBLE.md` completely.
5. Read `docs/REPOSITORY-CONTEXT.md` completely.
6. Read `docs/DECISIONS.md`, `docs/KNOWN-ISSUES.md`, `docs/DESIGN-REFERENCES.md`, and `docs/ASSET-REGISTER.md`.
7. Read the latest numbered file in `docs/handoffs/`.
8. Inspect the current code relevant to the requested phase.

No implementation may begin before this review is complete.

## Source-of-truth law

- GitHub `main` is the code source of truth.
- `docs/TOUR-DE-DAR-PROJECT-BIBLE.md` is the product, design, phase, and workflow source of truth.
- The latest phase handoff is the source of truth for current progress and the next task.
- `docs/REPOSITORY-CONTEXT.md` describes architecture and must match the committed code.
- Old chats, ZIP files, screenshots, and local workspaces are historical references only.

If sources conflict, stop and report the conflict before editing. Do not silently choose an outdated interpretation.

## Mandatory phase law

Every phase must:

1. Start from a fresh fetch of the latest GitHub `main`.
2. Use the verified remote commit as its only baseline.
3. Preserve unrelated working functionality.
4. Keep `.env*`, credentials, tokens, participant records, and private data out of Git.
5. Use real platform data or honest empty/unavailable states; never present invented activity as live.
6. Verify responsive behaviour and all states affected by the phase.
7. Run the available type-check and lint checks.
8. Run `npm run build` successfully after all intended changes and before creating any commit.
9. Update context documents affected by the work.
10. Create or update the numbered phase handoff.
11. Commit and push the complete verified result to `main`.
12. Confirm the new commit is visible on remote `main`.
13. Record the full final commit SHA in the handoff.

A phase is not complete if its work exists only locally, only in a ZIP, in an unpushed commit, or in documentation that does not match GitHub `main`.

## UI preservation law

> **The UI committed on GitHub `main` is the protected visual baseline. Follow it religiously. Build on it; never destroy, replace, or redesign it without the user's explicit approval for that exact visual change.**

- Preserve the existing layout, composition, spacing system, typography, colours, imagery, navigation patterns, component shapes, responsive behaviour, and overall visual identity.
- New features must reuse existing components, design tokens, and interaction patterns wherever possible.
- Add only the smallest UI needed to support the requested functionality.
- Do not perform unsolicited visual cleanup, modernisation, restyling, component replacement, page restructuring, or design-system changes.
- Functional work must not cause visual regressions on existing pages.
- Before editing an existing screen, inspect its current committed implementation and identify what must remain visually unchanged.
- After editing an existing screen, compare the affected view with the baseline at phone, tablet, and desktop sizes. Use before/after screenshots when preview tooling is available; otherwise perform and document a careful source-level responsive audit.
- If a requested feature appears to require a redesign or conflicts with the current UI, stop and ask the user before changing the visual structure.
- The agent must never interpret permission to add a feature as permission to redesign its page.
- Any user-approved redesign must state its exact scope and must not spread into unrelated pages.

## Mandatory pre-commit build gate

- `npm run build` must run after all intended changes and succeed before any commit is created.
- Running the build earlier does not satisfy this gate if files changed afterward; run it again.
- Do not commit or push when the final build fails.
- If external configuration prevents a truthful build, stop and report the blocker. Never record the work as complete or claim the build passed.
- Record the exact build result in the active phase handoff.

## Change rules

- Work on one named phase at a time unless the user explicitly changes scope.
- Preserve the protected UI baseline unless the user has explicitly approved a scoped redesign.
- Do not restore rejected designs or superseded functionality.
- Do not rename assets without updating every reference in the same commit.
- Every visible control must work, be honestly disabled with an explanation, or be removed.
- Unknown event facts must be marked `TBD`; never invent operational details.
- Keep documentation concise and current. Move durable lessons into the appropriate context file rather than copying whole chat histories.

## Required completion report

At the end of a phase, report:

- Phase and objective
- Completed scope
- Deferred scope and reason
- Verification performed and results
- Documentation updated
- Final commit SHA and GitHub link
- Exact recommended next phase/task
