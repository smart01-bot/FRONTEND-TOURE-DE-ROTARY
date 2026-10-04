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
