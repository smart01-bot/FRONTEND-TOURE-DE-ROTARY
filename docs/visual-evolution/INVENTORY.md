# EVOLUTION-01 — Journey and integration baseline

Inspected 4 October 2026. Tour development and local HEAD: `a2e569ffc252388f07f0c0ddd2d8927606c3e64b`; clean checkout before editing. Main: `83907b713a963ec520da6e90b887a252831ed85b`, read-only. Augment main: `2b0fd671369d05389b9c56189f4ceb920469aa84`, read-only. No previous EVOLUTION phase exists; historical Phase 7 is the latest implementation handoff. The user's explicit development instruction resolves older main-only instructions.

“Connected” below means a traced source path, not certification of live backend operation. No live login, participant record, payment, role grant or database mutation was used in this audit.

## Actual journeys

| Journey / route | Source path and retained contract | Current boundary |
| --- | --- | --- |
| Discover `/` | `components/home/*`, `SITE`, `ACTIVE_LIFECYCLE`; community and featured-story hooks | Real queries with loading/error/empty states; legacy event date/venue are not verified facts |
| Join `/register` | Lifecycle gate → `RegistrationFlow` → `DetailsStep` → `signUp` | **Account creation only**: name/email/phone/password; auth metadata role `participant`; verification-email instruction. Category/discipline/story/payment step files are not wired into this entry journey |
| Sign in `/login` | `LoginForm`, `supabase/auth.ts`, `UserContext`, middleware | Existing credentials, redirects, subscriptions retained; not live-tested |
| Recover `/reset-password` | `sendPasswordReset` → `/reset-password/confirm` | Confirmation route absent: inherited incomplete recovery journey |
| Dashboard / training | `useParticipant` → latest registration and profile | Registered data remains real; no new registration record is created by account signup. Resources remain unavailable where unpublished |
| Ticket `/ticket` | `useParticipant`, QR generation, paid + confirmed + bib readiness; profile URL with registration ID | Save QR, share and print are present; QR download is not a whole-card export; no check-in validation or finish inference |
| Feed `/feed` | `useFeed` → posts, reactions, comments, realtime; composer and owner operations | Read/write source paths exist; lifecycle limits composition. Persistent reports/media are unavailable. RLS must enforce direct access |
| Profile `/profile` | Profile update, story update + `story_public`, private activity and bib link | Missing story consent is private; no public profile/photo/activity consent inferred |
| Stories `/stories` | `getPublicStories`: `story_public = true`, nonempty story, profile-name join | Preserve filtering, identity and no additional disclosures |
| Fundraising `/fundraise`, `/fundraise/[slug]` | Campaign/donation helpers; donor route is public, participant dashboard protected | Existing payment adapter preserved. Return-query-based paid update and public story/bib disclosure need separate security/consent review |
| Race info / course map | `race-info.ts`, `course-map.ts`; four views SWIM / BIKE / RUN / EVENT | Unknown operational facts TBD; geometry/markers empty; optional location only with verified map data |
| Teams / challenges / challenge detail | Protected routes, `community.ts`, typed capability states | No approved membership/invitation/progress/report/media backend; no fake enrollment or achievements |
| Results / leaderboards / photos / memories | Protected result routes, `race-day.ts`, private `MemoryCardStudio` | Timing/rankings/photo associations unavailable; only private bib/story memory exports supported |
| Privacy / guidelines / archive | Public routes with source/status explanations; lifecycle configuration | Email request entry points only; no deletion tracker, fabricated edition or historical material |
| Admin `/admin` and children | Middleware → server `admin/layout.tsx`: verified `getUser` + `profiles.role === hq_admin` | Overview, search/filter/detail, payment confirmation and bib assignment exist. No broader role system or audit service |

All route files are enumerated in `PROTECTED-BASELINE.json`; current navigation paths remain unchanged. No API route handlers exist in this frontend. Middleware also lists legacy public prefixes without corresponding pages; that allowlist does not prove a implemented route.

## Integration-sensitive ownership map

| Protected files | Consumers | Contract / permission boundary |
| --- | --- | --- |
| `src/middleware.ts`, `app/admin/layout.tsx` | Auth, participant and admin routes | `getUser`, login redirects, public donor exception, `hq_admin` server guard |
| `lib/supabase/client.ts`, `server.ts`, `context/*`, root and participant layouts | All hooks and shells | Cookie/session handling, singleton clients, provider mount order and participant appearance |
| `lib/supabase/auth.ts`, `components/auth/*`, auth layout | Signup/login/reset | Validation, credential payloads, metadata, response handling and redirect contracts |
| `lib/supabase/participant.ts`, `hooks/useParticipant.ts`, `types/index.ts` | Dashboard, training, ticket, profile | User-ID scope, latest registration, category/status/payment/bib meaning |
| `lib/supabase/feed.ts`, `hooks/useFeed.ts`, `types/feed.ts` | Feed, public preview, private activity | IDs, owner filters, reaction/comment shapes, subscription behavior; server RLS required |
| `lib/supabase/stories.ts`, `hooks/useStories.ts` | Public stories, landing, profile | Separate public-story consent and story updates |
| `lib/supabase/fundraising.ts`, `hooks/useFundraising.ts`, `lib/api.ts` | Participant/donor fundraising, unused PayStep | Existing amount/customer/metadata and return/cancel/callback payloads; no replacement provider model |
| `lib/supabase/admin.ts`, `hooks/useAdmin.ts` | HQ overview, athletes, bib queue | Registration IDs, current statuses, `payment_status/status/updated_at`, bib writes; RLS not stored here |
| `config/categories.ts`, `site.ts`, `race-info.ts`, `course-map.ts` | Public and participant screens | Canonical categories/discipline identity, prices and typed source metadata; legacy facts stay unverified |
| `config/lifecycle.ts`, `components/lifecycle/*` | CTAs, navigation, register, feed, archive | Four modes, default pre_event, invalid values fail closed; dates do not switch modes |
| `config/community.ts`, `race-day.ts`, `types/community.ts`, `race-day.ts` | Teams/challenges/results/photos | Frontend types are not approved database entities or permission grants |
| `components/course-map/*`, `components/race-day/*` | Map and memory experiences | Text alternatives, optional geolocation, private generated content; never fabricate operations |

`node scripts/check-evolution-boundaries.mjs` checks exact protected-file hashes and route paths. It is a change detector, not a substitute for authorization/RLS tests. A later approved presentation change inside a protected file requires a documented diff review and targeted verification before intentionally updating that hash; never refresh the manifest merely to silence a failure.

## Inherited defects and unverified boundaries

| ID | Reproduction / evidence | Severity / follow-up |
| --- | --- | --- |
| EV-001 | Open `/register`; only DetailsStep mounts. No callers connect CategoryStep/DisciplineStep/StoryStep/PayStep into that flow | High: active account creation is not race registration; backend/integration decision needed |
| EV-002 | `sendPasswordReset` uses `/reset-password/confirm`; no page exists there | High: finish password-recovery contract in separate functional task |
| EV-003 | DonorClient return effect invokes `markDonationPaid` from `donated/donation/ref`; helper performs client update without provider verification and discards error | Critical review: exploitability depends on deployed RLS; no exploitation attempted; real reconciliation/server enforcement needed |
| EV-004 | Public fundraising server page selects `story,bib_number,category` without checking `story_public` or a distinct fundraising consent field | High: public campaign consent/disclosure policy must be agreed and enforced separately |
| EV-005 | Admin helper writes from browser; deployed policies absent. Hooks discard read errors; confirm/bulk-bib paths discard write errors. Bib allocation is sequential client logic | High: RLS, error handling, unique bib/concurrency, atomicity and audit verification pending |
| EV-006 | `lib/api.ts` callback points to `/api/payments/webhook`, while frontend has no API handler | High: deployment/backend routing contract must be verified, not invented in visual work |

Existing TD-013–024 limitations remain: unsourced operational content, absent backend capabilities, privacy processes, asset rights, image weight and the historically recorded dependency-security upgrade. The historical vulnerability counts were not re-audited as current counts in this phase. `docs/KNOWN-ISSUES.md` remains the wider register.
