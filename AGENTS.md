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
7. Run the available type-check, lint, and production-build checks.
8. Update context documents affected by the work.
9. Create or update the numbered phase handoff.
10. Commit and push the complete verified result to `main`.
11. Confirm the new commit is visible on remote `main`.
12. Record the full final commit SHA in the handoff.

A phase is not complete if its work exists only locally, only in a ZIP, in an unpushed commit, or in documentation that does not match GitHub `main`.

## Change rules

- Work on one named phase at a time unless the user explicitly changes scope.
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
