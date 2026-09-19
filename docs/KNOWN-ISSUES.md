# Tour de Dar — Known Issues

This register tracks current confirmed frontend problems and major limitations. Validate each item against the latest `main` before acting.

| ID | Severity | Area | Issue | Status | Target |
| --- | --- | --- | --- | --- | --- |
| TD-001 | High | Homepage | Community activity includes static sample content, conflicting with the no-fake-activity rule. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-002 | High | Homepage | Participant/statistical presentation is static rather than platform-derived or honestly empty. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-003 | High | Navigation | Some homepage CTAs and text links do not complete a valid navigation/action flow. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-004 | High | Feed | Comment counts exist, but complete read/write comment UI is missing. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-005 | High | Digital bib | QR, save, share, print, and profile-linking flows are incomplete. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-006 | Medium | Training | Some resource/map controls do not open real content or explain unavailability. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-007 | Medium | Product copy | `Tour de Dar` / `Tour de Rotary` and story terminology are inconsistent. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-008 | Medium | Participant identity | Profile photo, public profile, and connected identity presentation are incomplete. | Partially resolved; public profiles and upload storage remain Phase 4 | Phase 4 |
| TD-009 | High | Product scope | Teams, challenges, maps, results, photos, lifecycle modes, and archives are absent. | Planned | Phases 2–6 |
| TD-010 | Medium | Repository | `tsconfig.tsbuildinfo` is currently tracked although it is generated build state. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-011 | Medium | Moderation | Reported-post UI is local-only until a moderation table/API and enforcement workflow are available. | Blocked by backend contract | Phase 4 |
| TD-012 | Medium | Media | Profile-photo upload and feed media attachment require approved Supabase Storage buckets and policies. | Blocked by backend contract | Phase 4 |

## Issue lifecycle

- Add reproduction information before implementing a defect fix.
- Change status to `In progress`, `Blocked`, `Resolved`, or `Deferred` as appropriate.
- For resolved issues, record the full fix commit SHA.
- Remove routine resolved items after the relevant handoff preserves the result; retain only prevention-critical lessons in `REPOSITORY-CONTEXT.md`.
