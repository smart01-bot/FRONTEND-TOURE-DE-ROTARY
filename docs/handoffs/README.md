# Phase Handoffs

Handoffs preserve the latest actionable project state without copying full conversations.

## Naming

Use zero-padded, immutable phase files:

```text
PHASE-00-FOUNDATION-HANDOFF.md
PHASE-01-FOUNDATION-COMPLETION-HANDOFF.md
PHASE-02-RACE-INFORMATION-HANDOFF.md
```

The highest numbered applicable handoff is the one future work must read. Correct factual errors in place only before a phase begins; after later work depends on it, add a new handoff that explicitly supersedes it.

## Required contents

- Phase and objective
- Starting commit
- Final commit
- Completed scope
- Deferred or blocked scope
- Decisions made
- Important files/routes changed
- Verification results
- Known issues
- Exact recommended next action

No phase is marked complete until its final commit is confirmed on GitHub `main`.
