# EVOLUTION-01 change register

Classification follows MASTER-CONTEXT section 5. Documentation/tooling below supports its named A/B/D scope; no Class C product feature or Class D operation is enabled.

| Files | Classification | Change and retained boundary |
| --- | --- | --- |
| `src/components/visual-system/index.tsx`, `visual-system.module.css` | A | Opt-in presentation primitives and three modes. No hooks, mutations, map engine, permission logic or page adoption |
| `src/components/brand/BrandName.tsx` | A | Canonical name from existing SITE.name; renders a fragment, no wrapper/layout shift |
| `src/components/home/HomeNav.tsx`, `HomeFooter.tsx` | B, presentation-only | Wordmark/footer delegate to BrandName with identical rendered string. Auth subscriptions, lifecycle CTA, signout, links, classes and organiser/beneficiary sources retained |
| `src/components/participant/DesktopNav.tsx`, `src/components/admin/AdminNav.tsx` | B, presentation-only protected-shell review | Only SITE import and logo alt literal → SITE.name. Asset path, dimensions, nav order, theme, state, callbacks, providers and guards unchanged. No admin privilege change |
| `AGENTS.md`, `docs/README.md`, `TOUR-DE-DAR-PROJECT-BIBLE.md`, `REPOSITORY-CONTEXT.md`, `DECISIONS.md`, `handoffs/README.md` | Supports A/B scope | Scope authorization, cross-chat entry points and current account-only registration correction; branch/build/infrastructure rules retained |
| `docs/DESIGN-REFERENCES.md`, `ASSET-REGISTER.md`, `KNOWN-ISSUES.md` | Supports A/B/D boundaries | Approved extraction reference, asset/brand limitations and inherited defects; no copied assets or functional fixes |
| `docs/visual-evolution/MASTER-CONTEXT.md`, `STATUS.md`, `CHANGE-REGISTER.md`, `INVENTORY.md`, `VISUAL-SYSTEM.md`, `VERIFICATION.md` | Supports A/B verification; D dependency inventory | Full brief adoption, actual journeys, data owners, component adoption guide, truthful evidence and progress |
| `docs/visual-evolution/ADMIN-CAPABILITIES.md` | D requirements only | Actor/resource/transition/failure/audit matrix. Exact server model and account grants remain undecided |
| `docs/visual-evolution/PROTECTED-BASELINE.json`, `scripts/check-evolution-boundaries.mjs` | Supports A/B boundary verification | 53 protected source/config files and 29 route files; deterministic review gate, not proof of live RLS |
| `docs/visual-evolution/VisualSystemReview.tsx` | A verification specimen | All primitives and modes, explicit no-event-data labels; not imported by product routes. Temporary local review route removed before final build |
| `docs/handoffs/EVOLUTION-01-VISUAL-SYSTEM-HANDOFF.md`, `docs/visual-evolution/EVOLUTION-02-INITIATING-MESSAGE.md` | Supports A/B delivery and D continuity | Cross-chat verification, scope, blockers and publication receipt |

Protected-shell comparison: each existing runtime diff is recorded above. No other existing source file changes. All 53 manifest files remain byte-identical to the fetched baseline, including auth/authorization, data/API services, lifecycle, category/course config and root/admin/participant/auth layouts. Existing route paths, technical identifiers, privacy rules and capability states remain intact. Every new visual component requires an explicit adopter; it does not replace a functional component by name.


# EVOLUTION-02 change register — 4 October 2026

| Files | Class | Change and retained boundary |
| --- | --- | --- |
| `src/app/page.tsx` | A/C | Landing-only VisualSurface adoption and additive event/sponsor sections. Main landmark and existing section/navigation destinations retained. No route added. |
| `src/components/home/HeroSection.tsx`, `StatsStrip.tsx`, `ImpactSection.tsx` | A/B | Layered existing photography, display hierarchy, real configured counts, charity identity, lifecycle-owned CTAs. Hero date now consumes reviewed race-info fact (currently TBD); removes misleading countdown to unsourced date. No config changed. |
| `src/components/home/DisciplinesSection.tsx` | B/C | All three photo cards visible; pointer preview, keyboard focus/activation and touch selection. Canonical distances labelled configuration; course summaries consume existing reviewed records and preserve absent-geometry state. Links keep existing route meanings. |
| `src/components/home/WhyIRaceSection.tsx`, `CommunityPulse.tsx` | B | Editorial public-story and real-feed presentation. Same getFeaturedStory call/effect and useFeed hook/reload; consent/query helpers untouched. No added participant fields, photos, bibs or public-profile inference. Lifecycle wording retained. |
| `src/components/home/EventWeekend.tsx` | C | Local Before/Race Day/After selection; reads race-info/race-day and active lifecycle. No lifecycle mutation, schedule inference or operational action. |
| `src/components/home/SponsorsSection.tsx` | C/D boundary | Tiered responsive rendering for explicitly supplied approved records; production list empty. No logos, tiers or relationships inferred from organiser/beneficiary. No API or admin operation created. |
| `src/components/home/landing-media.ts`, `landing.module.css` | A | Existing image paths/illustrative captions, scoped responsive composition, dark/light focus, reduced motion and forced-color selection. No asset/dependency/global change. Nav/footer styles apply only under the landing wrapper; their source and behavior are unchanged. |
| Updated context/decision/design/asset/issue registers, STATUS/VERIFICATION/admin matrix, new handoff/next-phase message | A/B/C delivery; D requirements | Evidence, limitations, content-source requirements and cross-chat continuity. |

Protected review: all 53 exact-file hashes and all 29 route files remain unchanged/present. No auth, registration, provider, role, API, Supabase, type/config, payment, privacy or lifecycle-contract edit. Shared HomeNav/HomeFooter source remains byte-identical; only the home wrapper adopts scoped appearance. No new Class D operation enabled.


# EVOLUTION-03 — Public Race & Event Experience

| Files | Class | Scope and retained boundary |
| --- | --- | --- |
| `src/components/public/PublicPage.tsx`, `public.module.css` | A/C | Shared opt-in public frame, navigation/current-page state, canonical lifecycle identity, utility links, scoped responsive/focus/contrast/reduced-motion styling. HomeNav/HomeFooter auth behavior retained; no global or participant change. |
| `src/app/race-info/page.tsx` | A/B/C | Athletic header, compact/sticky topic index and native expandable topics. All 17 section IDs, facts, registration/guide gates and canonical categories/fees retained. |
| `src/app/course-map/page.tsx`, `src/components/course-map/CourseMapExperience.tsx`, `course-map.module.css` | A/B | Wider map frame, discipline hierarchy, mobile details, text jump link, roving tab focus and explicit disabled explanation. Protected-file edit reviewed below; data, projection, optional location and offline behavior retained. |
| `src/app/stories/page.tsx`, `src/components/stories/StoryCard.tsx` | A/B/C | Editorial identities/quotes, full-story native expansion, category/empty/error/retry presentation. Same hook/query and authorized identity fields; no photo/bib/profile publication. |
| `src/components/home/SponsorsSection.tsx` | C, one anchor | Adds `id=sponsors` so every public frame reaches the existing Phase 2 tiered sponsor surface. Production records stay empty; no separate route, duplicate data source or publishing operation. |
| `src/app/fundraise/[slug]/DonorClient.tsx`, `src/components/public/donor.module.css` | A/B/C | Campaign identity/purpose, responsive two-column donation surface, empty supporter presentation, explicit input labels/pressed/alert semantics and native modal focus/Escape. Existing server query, identity fields, total calculation, validation, insert, fee, payment payload, sessionStorage, return update and refresh retained. EV-003/004 remain separate reviews. |
| `src/app/{archive,privacy,community-guidelines}/page.tsx` | A/B | Shared frame and readable cards. Archive exposes existing lifecycle summary/restrictions. Existing policy text, mailto entry points, protected results/photos links and historical-content unavailability retained. |
| Context, decision, issue, design/asset registers, status, verification, admin requirements, handoff/indices and next-phase message | Supports A/B/C; D requirements only | Current source owners, verification, limitations and continuity. No new operation or contract enabled. |

## Protected map review (no manifest reset)

The original checker deliberately reports exactly `src/components/course-map/CourseMapExperience.tsx` changed: 52 other protected files are byte-identical and all 29 route files are retained. Do not describe the unchanged-manifest command as a clean pass. Its one flag is an approved A/B presentation edit, manually diff-reviewed and checked by exact-block comparison: parent component state/effects/filtering/handlers, canvas state/projection, SVG geometry rendering, location options and callbacks are unchanged. Added behavior is only roving tabIndex, focusable text-heading navigation and aria-describedby for unavailable controls. Synthetic component tests cover geometry/markers, zoom/fit and location success/denied. The production geometry/config arrays remain untouched and empty. The baseline and checker remain unchanged for future review.

# EVOLUTION-04 — Participant, community, race-day and admin

| Files / consumers | Class | Change and retained boundary |
| --- | --- | --- |
| `components/participant/{PortalSurface.tsx,portal.module.css}`, participant layout | A/B | Shared system adoption with participant/admin intensity, light/dark contrast, responsive navigation, readable type, utility mode and print treatment. Existing providers, lifecycle notice, children and destinations retained. CSS is opt-in; public/auth routes unchanged. |
| `components/participant/DesktopNav.tsx`, `components/admin/AdminNav.tsx` | A/B/C | Canonical text wordmarks, active navigation, existing appearance/sign-out behavior. Admin adds only `/admin/manage`; no access logic or role strings added. Unverified sidebar date replaced by discipline identity. |
| Participant `dashboard/page.tsx`, `components/participant/dashboard.module.css` | A/B/C | Athletic identity, actual registration/payment/bib statuses, reviewed date/TBD, useful links and real campaign values. Same useParticipant/useFundraising sources. Removes fixed completion counts, zero-filled clock and assumed campaign goal; absent records are unavailable, not confirmed/pending. No race-readiness inference beyond existing ticket gates. |
| Participant `feed/page.tsx`, `training/page.tsx`, `fundraise/page.tsx` | A/B | Shared headers and retained composition/resources/campaign actions. Feed/training use reviewed event date instead of unsourced countdown. Feed hooks, lifecycle guard, callbacks, payloads and composer/post handlers unchanged. Training resources remain gated. |
| Participant `teams/page.tsx`, `challenges/page.tsx`, `results/page.tsx` | A/B | Shared headings, more readable availability messages and unchanged typed capabilities. No enrollment, progress, result or fabricated operational data. Challenge detail, leaderboard/photos/profile adopt shared portal CSS without source/contract changes. |
| Participant `ticket/page.tsx` | A/B | Calm presentation, actual status text, reviewed date/venue/TBD. Removes decorative raster bib containing unrelated number 1025. Existing event mark retained. Exact QR payload/readiness and Save/Share/Print functions unchanged. |
| `components/race-day/{RaceDayHeader.tsx,RaceDayNav.tsx,MemoryCardStudio.tsx}` | A/B/C | Dark athletic header, active destination aria-current, shared CSS. Memory canvas removes unverified date caption only; eligibility, private fields, rendering and Save/Share/fallback behavior retained. |
| `components/admin/ui.tsx`, admin `overview/page.tsx`, `athletes/page.tsx`, `bibs/page.tsx` | A/B | Compact cards, readable statuses, loading label, wrapping names and mobile bib queue. Revenue renamed fee estimate; same calculation. Queue copy correctly says paid, not confirmed. Search/filter and mutation handlers unchanged. Athlete detail styled by shared CSS, source unchanged. |
| `app/admin/manage/page.tsx`, `components/admin/{ManagementWorkspace.tsx,management.module.css}` | C/D gated | New protected management workspace, eight disabled operations with reasons, anchor index, real lifecycle label and links to existing tools. No API, persistence, role grant or operation enabled. Inherits unchanged admin server guard. |
| Documentation, handoff and next-phase message | A/B/C evidence; D requirements | Capability acceptance conditions, receipts, current limitations and continuity. |

## Protected review

Original manifest remains unchanged. Checker reports five protected file differences: the inherited Phase 3 CourseMapExperience, plus participant layout, RaceDayHeader, RaceDayNav and MemoryCardStudio. It also flags the explicitly additive `/admin/manage` page (30 route files, formerly 29). These are expected review flags, not a clean hash pass.

The participant layout adds only PortalSurface inside the retained ParticipantThemeProvider. Header/nav changes are presentation/current-link semantics. MemoryCardStudio differs only in one canvas caption. Source assertions verify unchanged hooks, Supabase services, config/types, context/providers, middleware, auth components, admin layout, feed compose/post handlers, profile mutations, ticket QR/readiness/actions and admin mutation functions. No API, dependency, environment name, asset file or policy changed; no baseline reset.
