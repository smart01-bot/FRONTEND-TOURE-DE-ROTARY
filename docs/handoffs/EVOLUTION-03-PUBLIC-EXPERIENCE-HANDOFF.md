# EVOLUTION-03 — Public Race & Event Experience

4 October 2026. Scoped public implementation verified locally; publication receipt follows below. Separate from historical PHASE-03.

## Baseline and previous gate

Freshly fetched main/development and explicitly checked out development at `7620446a4b41ddc2ff9cbba329371c7ad5497d70`; clean tree. Phase 2 implementation `abb0ce39766350399fb800d21219298a4d3766c1` is its ancestor, followed only by the receipt. Baseline build and 53 protected-file / 29-route gate passed. Full current governance, master brief and handoff read. Main read-only at `83907b713a963ec520da6e90b887a252831ed85b`; Augment reference unchanged at `2b0fd671369d05389b9c56189f4ceb920469aa84`.

## Delivered

- Shared public frame, brand/lifecycle identity, active public navigation, privacy/community links and scoped public styles.
- Race information: stronger hierarchy, topic shortcuts, native sections and all existing facts/gates.
- Course map: wider discipline-first canvas, mobile details, text alternative jump, roving tab focus and explicit disabled explanations. Existing geometry engine and optional location/offline behavior retained.
- Stories: editorial identity/quotes, full-text expansion, filters and complete loading/error/retry/empty presentation. Same consent-filtered data and identity boundary.
- Sponsors: `/#sponsors` anchor connects the Phase 2 tiered surface to public navigation; no extra route or duplicate dataset. Approved records remain empty.
- Public fundraising: participant/cause emphasis, responsive donation form, labels/pressed/error semantics, supporter empty state and native thank-you dialog. Existing queries, payment calls, return behavior and fields retained.
- Archive, privacy and community guidelines: coherent readable cards; original policy, mailto, publication and protected-destination restrictions remain. Archive shows current lifecycle restrictions.

Runtime files: `src/components/public/{PublicPage.tsx,public.module.css,donor.module.css}`, seven public route presentation files (race-info/course-map/stories/archive/privacy/community-guidelines and fundraise/[slug]/DonorClient), `components/course-map/{CourseMapExperience.tsx,course-map.module.css}`, `components/stories/StoryCard.tsx`, and the one sponsor anchor. Exact A/B/C/D mapping: [CHANGE-REGISTER](../visual-evolution/CHANGE-REGISTER.md).

No route, asset, dependency, environment name, provider, API, Supabase helper/query/config, auth/role or lifecycle contract changed. Participant/admin runtime untouched. No Class D operation enabled.

## Verification

- Type-check/lint pass (only inherited profile/ticket image warnings); production build passes 31/31. Final build repeated after documentation before each commit.
- Boundary checker: **one expected reviewed flag**, CourseMapExperience; 52 other protected files identical and 29 routes retained. Manifest not reset. Exact-block comparison proves state/effects/handlers/projection/geometry unchanged; only framing and accessibility attributes added. See register.
- Chromium before/after phone/tablet/desktop screenshots for all seven surfaces; 360px/long-content checks show no horizontal overflow. Map keyboard/offline/no-auto-location and populated synthetic component tests pass.
- Stories loading/denied/retry/empty/filter/full-text and consent-query checks pass. Donor validation, cancelled state, denied insert, payment error/retry, exact payload/fee, synthetic redirect/return/dialog and long supporters pass.
- All lifecycle modes plus invalid fallback retain closed-registration restrictions. Public HTTP routes succeed; missing campaign is 404; protected routes keep login redirects.
- Seven final automated accessibility scans: zero violations. Focus/reduced motion checked. No real screen-reader or physical-device certification.
- Build JS tradeoff: static public pages +6 kB; map +6 kB; stories +7 kB; donor +19 kB for shared public navigation. No new imagery/map tile library/polling. Field performance not measured.

QA uses external synthetic fixtures and loopback responses only. No live login, payment, database, RLS/admin success, cross-browser or deployment verification. Evidence bundle contains logs, synthetic harnesses, screenshots and state receipts.

## Remaining dependencies

Official date/schedule/venues/geometry/guide, sponsor names/assets/rights, licensed Dar/history imagery, impact/timing/photo publication remain unavailable. [ADMIN-CAPABILITIES](../visual-evolution/ADMIN-CAPABILITIES.md) records editor/publisher/source/version/withdrawal/audit requirements without invented APIs.

Inherited EV-001–006 remain, especially return-query paid update (EV-003) and fundraising public story/bib consent (EV-004). Public fundraiser server error/not-found distinction is unchanged. No visual redesign certifies payment safety or consent. Existing moderation/privacy operations, admin RLS/concurrency/audit and security-major-migration blockers remain. Admin operational expansion is not complete.

## Next chat

EVOLUTION-04 — Participant, Community, Race-Day & Admin Evolution. Read [the initiating message](../visual-evolution/EVOLUTION-04-INITIATING-MESSAGE.md), fetch latest development, verify this implementation ancestry/receipt and preserve newer work. Do not redo landing/public pages or invent operational contracts.

## Commit receipt

Publication pending at staging time. After a non-forced development update, an immediate documentation-only follow-up records implementation SHA/tree and confirmed remote status with its own final build. Its final branch-head SHA is provided separately because a commit cannot embed its own SHA.
