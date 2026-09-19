# Tour de Dar — Decision Log

Only settled, project-wide choices belong here. Newer entries replace older entries when explicitly stated.

| Date | Status | Decision | Reason / impact |
| --- | --- | --- | --- |
| 2026-09-19 | Active | GitHub `main` is the code source of truth. | Every phase starts from a fresh fetch and ends only after a verified push. |
| 2026-09-19 | Active | The Project Bible is the product and workflow source of truth. | Future chats must read it before implementation. |
| 2026-09-19 | Active | Use one principal chat per phase. | Keeps relevant context together without rebuilding context for each small task. |
| 2026-09-19 | Active | Build mobile first, then verify tablet and desktop. | The core participant experience will mainly be used on phones. |
| 2026-09-19 | Active | Never present invented activity as live data. | Empty states are preferable to misleading registrations, posts, donations, or statistics. |
| 2026-09-19 | Active | The visual system uses blue, magenta (`#9F2B68`), yellow, white, and deep navy. | Maintains the approved event identity while allowing disciplined emphasis. |
| 2026-09-19 | Active | Preserve the clean modern UI while adding Old Dar × Modern Dar through storytelling layers. | Historical atmosphere must not harm usability. |
| 2026-09-19 | Active | The final public product name is `Tour de Dar`. | Matches the Project Bible, site configuration, metadata, and concise public identity; supersedes mixed `Tour de Rotary` UI copy. |
| 2026-09-19 | Active | The primary participant-story prompt is `Why are you doing this?`. | Uses one direct, human prompt across registration and profile editing; supersedes mixed `Why I race` / `Why I participate` prompts. |
| 2026-09-19 | Active | Unpublished training resources and event schedule details remain visibly unavailable or `TBD`. | Prevents dead controls and invented operational information. |
| 2026-09-19 | Active | The UI committed on GitHub `main` is the protected visual baseline. | Every agent must build additively on the existing design and may not redesign, restyle, restructure, or replace it without explicit user approval for the exact visual scope. |
| 2026-09-19 | Active | A successful final `npm run build` is mandatory before every commit. | The build must run after all intended changes; work cannot be committed, pushed, or declared complete if it fails. |

## Entry format

When adding a decision, include the date, status (`Active`, `Pending`, `Superseded`), exact decision, reason, affected areas, and the decision it replaces when applicable.
