# Tour de Dar — Decision Log

Only settled, project-wide choices belong here. Newer entries replace older entries when explicitly stated.

| Date | Status | Decision | Reason / impact |
| --- | --- | --- | --- |
| 2026-09-19 | Superseded | GitHub `main` is the code source of truth. | Superseded by the branch-separation decision below. |
| 2026-09-19 | Active | GitHub `development` is the active code and phase-work source of truth; `main` is the protected stable pre-Phase-1 baseline. | Every phase starts from and pushes to `development`. Nothing moves to `main` without explicit user authorisation for a release or merge. |
| 2026-09-19 | Active | The Project Bible is the product and workflow source of truth. | Future chats must read it before implementation. |
| 2026-09-19 | Active | Use one principal chat per phase. | Keeps relevant context together without rebuilding context for each small task. |
| 2026-09-19 | Active | Build mobile first, then verify tablet and desktop. | The core participant experience will mainly be used on phones. |
| 2026-09-19 | Active | Never present invented activity as live data. | Empty states are preferable to misleading registrations, posts, donations, or statistics. |
| 2026-09-19 | Active | The visual system uses blue, magenta (`#9F2B68`), yellow, white, and deep navy. | Maintains the approved event identity while allowing disciplined emphasis. |
| 2026-09-19 | Active | Preserve the clean modern UI while adding Old Dar × Modern Dar through storytelling layers. | Historical atmosphere must not harm usability. |
| 2026-09-19 | Active | The final public product name is `Tour de Dar`. | Matches the Project Bible, site configuration, metadata, and concise public identity; supersedes mixed `Tour de Rotary` UI copy. |
| 2026-09-19 | Active | The primary participant-story prompt is `Why are you doing this?`. | Uses one direct, human prompt across registration and profile editing; supersedes mixed `Why I race` / `Why I participate` prompts. |
| 2026-09-19 | Active | Unpublished training resources and event schedule details remain visibly unavailable or `TBD`. | Prevents dead controls and invented operational information. |
| 2026-09-19 | Active | Existing UI must be preserved on `development`, with `main` retained as the pre-Phase-1 visual reference. | Every agent must build additively and may not redesign, restyle, restructure, or replace the UI without explicit user approval for the exact visual scope. |
| 2026-09-19 | Active | A successful final `npm run build` is mandatory before every commit. | The build must run after all intended changes; work cannot be committed, pushed, or declared complete if it fails. |

| 2026-09-19 | Active | Race information lives at public `/race-info`, with content in `src/config/race-info.ts` and native expandable sections. | Keeps all topics within two taps from the homepage, reuses existing visual tokens, and requires no new backend. |
| 2026-09-19 | Active | Existing registration configuration is labelled as such; it does not verify official operational information. Unknown facts render `TBD`, and confirmed fact records require a source and review date. | Avoids inventing event details from unsourced legacy copy. Official guide remains disabled until a reviewed PDF exists. |

## Entry format

When adding a decision, include the date, status (`Active`, `Pending`, `Superseded`), exact decision, reason, affected areas, and the decision it replaces when applicable.
