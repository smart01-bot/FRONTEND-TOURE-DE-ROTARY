# Tour de Dar — Known Issues

This register tracks current confirmed frontend problems and major limitations. Validate each item against the latest `development` before acting.

| ID | Severity | Area | Issue | Status | Target |
| --- | --- | --- | --- | --- | --- |
| TD-001 | High | Homepage | Community activity includes static sample content, conflicting with the no-fake-activity rule. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-002 | High | Homepage | Participant/statistical presentation is static rather than platform-derived or honestly empty. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-003 | High | Navigation | Some homepage CTAs and text links do not complete a valid navigation/action flow. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-004 | High | Feed | Comment counts exist, but complete read/write comment UI is missing. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-005 | High | Digital bib | QR, save, share, print, and profile-linking flows are incomplete. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-006 | Medium | Training | Some resource/map controls do not open real content or explain unavailability. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-007 | Medium | Product copy | `Tour de Dar` / `Tour de Rotary` and story terminology are inconsistent. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-008 | Medium | Participant identity | Private profile now connects story, real personal post activity, team/challenge availability and digital bib. Public profiles and uploads remain blocked by separate consent, public-identifier, storage and RLS contracts. | Partially resolved by Phase 4 frontend | Backend contract / Phase 7 privacy |
| TD-009 | High | Product scope | Lifecycle and archive presentation now exist. Teams/challenges and Phase 5 race-day areas retain typed protected frontend homes, but their live backend capabilities remain unavailable. | Lifecycle portion resolved by Phase 6; backend capabilities remain blocked | Backend contract |
| TD-010 | Medium | Repository | `tsconfig.tsbuildinfo` is currently tracked although it is generated build state. | Resolved `5221cc867fbbbdf6a2a5995db3a0f048062c705b` | Phase 1 |
| TD-011 | Medium | Moderation | The feed truthfully says no report was submitted and links to guidelines/urgent contact. Persistent report intake, review states and enforcement remain unavailable. | Frontend state resolved; persistence blocked by backend contract | Backend contract |
| TD-012 | Medium | Media | Profile-photo upload and feed media attachment require approved Supabase Storage buckets and policies. | Blocked by backend contract | Phase 4 |
| TD-013 | High | Race content | `/race-info` has all required topic homes, but official dates, venues, waves, course instructions, requirements, safety/medical details, logistics and guide are not verified. Expand any affected section to see `TBD`. | Awaiting organiser sources | Content publication / Phase 3 |
| TD-014 | Medium | Event consistency | Homepage/registration already display a date and course descriptions without recorded official provenance; `/race-info` deliberately keeps their operational confirmation TBD. Verify the originals before changing protected existing copy. | Awaiting organiser verification | Content publication |
| TD-015 | High | Visual QA | EVOLUTION-02 landing now has Chromium screenshot, layout, keyboard, touch-emulation and reduced-motion checks. Other surfaces, real devices, screen readers and cross-browser QA remain unverified. | Partially verified; launch blocker retained | Browser/device QA |
| TD-016 | High | Course map | `/course-map` has complete configurable SWIM, BIKE, RUN and EVENT homes, but organiser-confirmed route lines, start/finish/T1/T2 coordinates, aid/hydration/safety/medical points and logistics locations are unavailable. Each view therefore displays its explicit unavailable state. | Awaiting organiser geometry and location sources | Content publication |
| TD-017 | High | Phase 4 backend | No approved public-profile, teams, invitations, memberships, challenges, progress, completion, report/moderation or media-storage contract exists in the repository. | Frontend capability gates added; backend work not authorised | Backend decision and implementation |
| TD-018 | Critical | Dependency security | Next.js was patched from `14.2.18` to the latest compatible `14.2.35`, but `npm audit --omit=dev` still reports one critical Next.js and one transitive high PostCSS finding. The offered fix is breaking Next.js 16. | Partially mitigated; launch blocker | Verified framework major migration |
| TD-019 | High | Results | Result, split, transition and ranking experiences are frontend-ready but no approved timing source, schema, participant match or publication rules exist. | Capability-gated by Phase 5 | Timing/backend contract |
| TD-020 | High | Photography | Gallery, Find Me, credits, downloads and sharing are frontend-ready but no approved storage, albums, bib associations or photo-consent contract exists. | Capability-gated by Phase 5 | Photography/backend contract |
| TD-021 | Medium | Lifecycle operations | The approved active lifecycle remains `pre_event`; no organiser-approved transition schedule or automatic date rule exists. | Safely configurable; operational switch pending organiser instruction | Event operations |
| TD-022 | High | Privacy operations | No backend request tracker, deletion API, preference centre, research-consent service or response-SLA contract exists. `/privacy` provides truthful email entry points only. | Frontend boundary complete; backend blocked | Organiser/backend process |
| TD-023 | High | Storytelling | No historical imagery/captions have recorded provenance, rights, attribution and factual approval; event history and past-edition highlights are unavailable. | Honest archive state added; content blocked | Organiser content approval |
| TD-024 | Medium | Performance | EVOLUTION-02 removes the four-image timer and adopts responsive next/image, one priority hero, lazy support and reserved geometry. Large source masters remain unchanged; field Core Web Vitals still need production measurement. | Landing delivery improved; field verification pending | Performance / launch QA |
| TD-025 | Critical | Route security | Root-level middleware was not bundled beside `src/app`, so participant routes lacked the intended request-boundary redirect. | Resolved `7e8bab93d14a96f31c5a8b8c3f0e0f4b9478433b` by moving it to `src/middleware.ts` | Phase 7 |

## Issue lifecycle

- Add reproduction information before implementing a defect fix.
- Change status to `In progress`, `Blocked`, `Resolved`, or `Deferred` as appropriate.
- For resolved issues, record the full fix commit SHA.
- Remove routine resolved items after the relevant handoff preserves the result; retain only prevention-critical lessons in `REPOSITORY-CONTEXT.md`.

## EVOLUTION-01 inherited findings

See [INVENTORY](visual-evolution/INVENTORY.md#inherited-defects-and-unverified-boundaries) for source evidence and reproduction: EV-001 account-only register entry; EV-002 missing reset confirmation route; EV-003 return-query-triggered client paid update; EV-004 public fundraising story/bib consent review; EV-005 unverified admin RLS/error/concurrency/audit guarantees; EV-006 webhook deployment routing unresolved. These were recorded, not functionally changed by visual work. Old TD-007 resolution covers text changes only; raster branding/export visual review remains pending. The historical dependency vulnerability counts are not a fresh audit.

EVOLUTION-02 resolves TD-014 on the landing only: confirmed date reads the reviewed race-info fact, course summaries avoid unsourced venue copy, and distances are labelled configuration. Other legacy consumers and inherited EV-001–006 remain unchanged. No sponsor dataset or admin publishing service exists.


## EVOLUTION-03 status

TD-015: Chromium screenshot/overflow, keyboard, offline, synthetic data-state and automated accessibility evidence now covers all seven scoped public surfaces; zero final automated WCAG A/AA violations on their checked states. Real screen-reader, physical-device, cross-browser and live-backend verification remain pending. Initial legacy caption-contrast violations on map/archive/privacy were resolved in scoped CSS.

EV-001–006, official operational content/geometry, sponsor publication, imagery rights, timing/photos, moderation, privacy operations and framework security migration remain open. Fundraising still inherits the unverified return-query paid update and public story/bib consent boundary; visual completion does not make it production-safe. SSR campaign error versus not-found behavior is unchanged and remains a functional review concern. No real payment or authorization policy was tested.
