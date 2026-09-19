# Tour de Dar — Known Issues

This register tracks current confirmed frontend problems and major limitations. Validate each item against the latest `main` before acting.

| ID | Severity | Area | Issue | Status | Target |
| --- | --- | --- | --- | --- | --- |
| TD-001 | High | Homepage | Community activity includes static sample content, conflicting with the no-fake-activity rule. | Open | Phase 1 |
| TD-002 | High | Homepage | Participant/statistical presentation is static rather than platform-derived or honestly empty. | Open | Phase 1 |
| TD-003 | High | Navigation | Some homepage CTAs and text links do not complete a valid navigation/action flow. | Open | Phase 1 |
| TD-004 | High | Feed | Comment counts exist, but complete read/write comment UI is missing. | Open | Phase 1 |
| TD-005 | High | Digital bib | QR, save, share, print, and profile-linking flows are incomplete. | Open | Phase 1 |
| TD-006 | Medium | Training | Some resource/map controls do not open real content or explain unavailability. | Open | Phase 1 |
| TD-007 | Medium | Product copy | `Tour de Dar` / `Tour de Rotary` and story terminology are inconsistent. | Open | Phase 1 |
| TD-008 | Medium | Participant identity | Profile photo, public profile, and connected identity presentation are incomplete. | Open | Phase 1/4 |
| TD-009 | High | Product scope | Teams, challenges, maps, results, photos, lifecycle modes, and archives are absent. | Planned | Phases 2–6 |
| TD-010 | Medium | Repository | `tsconfig.tsbuildinfo` is currently tracked although it is generated build state. | Review | Phase 1 |

## Issue lifecycle

- Add reproduction information before implementing a defect fix.
- Change status to `In progress`, `Blocked`, `Resolved`, or `Deferred` as appropriate.
- For resolved issues, record the full fix commit SHA.
- Remove routine resolved items after the relevant handoff preserves the result; retain only prevention-critical lessons in `REPOSITORY-CONTEXT.md`.
