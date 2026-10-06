# Tour de Dar — Visual Evolution Master Context

> Adopted into development by EVOLUTION-01 on 4 October 2026. The preparation statuses below are historical; [STATUS.md](STATUS.md) and the latest EVOLUTION handoff now govern implementation progress. The approved direction is retained in full.

**Document status:** Approved direction and cross-chat project memory. Implementation has not started under this new roadmap.
**Recorded:** 3 October 2026, Africa/Dar_es_Salaam.
**Canonical product name:** **Tour de Dar**.
**Workstream:** Five visual-evolution phases, each implemented in a separate chat.
**Phase identifiers:** `EVOLUTION-01` through `EVOLUTION-05`. These are separate from the historical frontend Phases 0–7.
**Additional approved objective:** Expand administration to **full event management**. The user explicitly selected participant approvals, event content, sponsors, moderation, race operations and controlled staff permissions.

## 1. Read this first in every phase chat

This is a controlled evolution of the existing Tour application. Tour provides the authoritative functionality, infrastructure, integration contracts and verified data. Augment provides selected visual and interaction inspiration.

The user has approved a major visual evolution within the named phase scopes. Older instructions to preserve the existing UI do not prohibit these specifically approved presentation changes. They continue to protect functionality, integration behavior and unrelated surfaces. Do not repeatedly ask for redesign approval already recorded here.

The user wants implementation in separate chats. This preparation session establishes the shared brief only. No visual phase, permission elevation, account assignment, repository rename, deployment or live database change has been performed by creating this document.

Each phase chat must read this whole document, refresh the repository, read its applicable instructions and latest evolution handoff, and continue from the actual current state. A chat must not assume that this document has been automatically loaded merely because it exists.

### Repository baseline verified in this preparation session

| Purpose | Repository / branch | Verified commit |
| --- | --- | --- |
| Authoritative implementation | `smart01-bot/FRONTEND-TOURE-DE-ROTARY`, `development` | `a2e569ffc252388f07f0c0ddd2d8927606c3e64b` |
| Stable historical baseline; do not modify | Same repository, `main` | `83907b713a963ec520da6e90b887a252831ed85b` |
| Visual reference | `rotaract4compassion/augmentfx`, `main` | `2b0fd671369d05389b9c56189f4ceb920469aa84` |

Tour `development` was 15 commits ahead of Tour `main` when compared. It contains the broader frontend implementation and is the starting branch for this program. These SHAs are historical receipts, not permission to reset future work back to them. Fetch fresh branch heads at the beginning of every phase and reconcile any newer commits before editing.

- Implementation: https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY/tree/development
- Reference: https://github.com/rotaract4compassion/augmentfx

No claim is made that every Tour feature is complete or production-ready. Teams, challenges, results, photography and other capabilities still include intentionally gated frontend states. Source inspection in this session did not run either app against a live backend.

## 2. Permanent decisions

1. **Tour is the functional authority.** Its broader product depth must survive the visual evolution.
2. **Augment is primarily the experience reference.** Do not merge its repository wholesale or replace Tour with it.
3. **The public product name is Tour de Dar.** Finish the remaining user-facing branding changes consistently.
4. **Work from and publish phase work to `development` only**, following the existing verified-build workflow and any explicit restrictions in the initiating phase message. Do not modify `main` or Augment.
5. **Implement one evolution phase per chat.** Record an exact handoff before the next phase begins.
6. **Preserve integration contracts.** Presentation may change substantially; backend-facing behavior must not change silently.
7. **Retain SWIM / BIKE / RUN.** Do not import Augment's Cycling / Marathon / Walkathon event model, distances or venues as authoritative Tour facts.
8. **Use real data or honest states.** Unknown information remains unknown. Unavailable capabilities remain gated.
9. **Expand admin capability to full event management.** Real powers require actual server authorization, data contracts and verification; attractive controls alone do not satisfy this objective.
10. **Preserve privacy and lifecycle restrictions in every visual mode.** Registration or bib assignment is never evidence of race completion.

### Naming boundary

Use the exact spelling **Tour de Dar** in product headings, navigation, metadata, accessibility labels, user-visible generated cards and other affected frontend copy. Review exported/downloaded content as well as visible pages.

Keep legitimate references to Rotary, Rotaract, organisers and the charitable cause. Changing the product name does not erase their identities. Distinguish historical references from current product branding.

Keep the existing GitHub repository name, route URLs, environment-variable names, asset filenames, identifiers, API fields and integration keys unless a separate compatibility change is justified and recorded. This is a product-brand change, not a blanket string replacement. Review any logo containing old wording; do not rename an asset without updating its references and provenance.

## 3. Source-of-truth hierarchy

When Tour and Augment disagree:

1. Tour functionality and business behavior win.
2. Tour verified information wins over Augment samples, assumptions and hard-coded content.
3. Tour existing integration contracts win.
4. Augment may influence the presentation of an existing Tour capability.
5. A useful Augment concept may be added when it does not disrupt existing systems.

For project continuity, use the user's latest explicit instructions, the latest committed Tour `development` implementation and its current handoff, this approved evolution brief, and the maintained repository documentation. Existing code establishes current behavior; it does not turn an unverified event fact or an existing bug into an approved requirement. Report discrepancies and classify necessary changes.

Do not treat old chats, screenshots, prototypes, ZIP files or an earlier SHA as a replacement for the latest repository. Do not treat documentation describing an intended feature as proof that its entire journey works.

## 4. Protected functional infrastructure

Preserve the behavior and established contracts of:

- Authentication, authorization, role handling and middleware.
- Supabase browser/server clients, queries, database types and policies.
- API endpoints, request payloads, response assumptions and integration adapters.
- Environment-variable names, server actions and established route URLs.
- Registration workflows and participant identity.
- Tickets, bibs, QR payloads and readiness gates.
- Feed, reactions, comments and stories persistence.
- Teams, challenges, results and race-day contracts.
- Fundraising records, payment behavior and administrative permissions.
- Lifecycle state logic, privacy workflows and consent boundaries.

Presentation components can be redesigned around these systems. Do not rewrite hooks or move business rules into visual components merely to imitate Augment. Avoid broad refactors that obscure whether contracts changed.

At Phase 1, identify integration-sensitive files, their consumers, and the relevant route/data/permission contracts. Establish a reviewable baseline and a change register. If a protected file needs a presentation-only edit, document why, compare its functional behavior, and verify that imports, calls, payloads, guards and data meanings remain intact. Necessary functional changes belong to a separately identified integration task.

## 5. Classify every change

| Class | Meaning | Examples | Required treatment |
| --- | --- | --- | --- |
| A | Presentation change | Typography, color, spacing, layout, imagery, animation, responsive behavior, navigation appearance | Verify accessibility, responsiveness and performance; preserve behavior. |
| B | Existing feature, new presentation | Feed cards, existing course data in a new frame, result typography, current participant identity | Retain Tour hooks, queries, data meanings, permissions and states. This should form most work. |
| C | Additive frontend feature | Before/Race Day/After views, verified sponsor browsing, visual route switching, interactive storytelling | Use existing authoritative data where available; document route or surface additions. |
| D | Backend-dependent capability | Live tracking, check-in validation, new CRM actions, timing, new payment operations, persistent staff permissions | Define the required capability and coordinate a real contract; remain gated until implemented and verified. |

Classify by actual behavior rather than appearance. A button that changes a role or publishes results is Class D even if its visual implementation is small. A map animation is not evidence of live tracking. A navigation link is not authorization.

## 6. Verified comparison findings to preserve

These source findings explain why Tour remains the base:

- Tour has connected source paths for community posts, reactions, comments and public stories with story-consent filtering. Augment lacks Tour's `/feed` and `/stories` routes; its `/move` page is a feed skeleton.
- Tour's ticket code generates QR images and provides Save, Share and Print actions. Augment's ticket still contains a QR placeholder; its newer dashboard shows a fixed participant, fixed bib and a QR icon.
- Tour retains results/memories, privacy, archive and lifecycle structures. Several underlying backend capabilities remain unavailable and must not be represented as operational.
- Tour's admin layout verifies the signed-in user and the `hq_admin` role on the server. Augment's replacement admin layout omits that role check; its HQ passcode page is explicitly a stub.
- Augment's live participant map uses sample participants with randomized movement. Its scanner produces simulated outcomes. Its CRM, sponsors, showcase and gala screens include sample records or inactive controls.
- Augment's payment webhook has signature verification stubbed out and uses a different registration/payment model. It is not a safe replacement for Tour payment integration.
- Augment's public event modes differ from Tour's canonical category/discipline model. Its sample routes are not verified Tour courses.
- Both inspected registration entry components currently render account creation through `DetailsStep`. The presence of category/payment step files and older documentation does not by itself prove a connected multi-step race-registration journey. Trace and baseline the actual journey before changing its presentation.

Do not turn these observations into permission for unrelated functional fixes. Record inherited defects separately, preserve existing access restrictions, and coordinate anything affecting backend integration.

Useful reference ideas include stronger display typography, athletic imagery, expressive event tiles, layered photography, route framing, sponsor hierarchy, clear status treatments and deliberate public/participant/admin intensity. None requires adopting sample data, weakened access checks or incompatible schema assumptions.

## 7. Visual identity and three UI modes

The final identity should communicate movement, Dar es Salaam, sport, community, Rotary impact, competition, memory and cause. The aim is a coherent Tour de Dar identity that can exceed both existing versions.

| Mode | Intensity | Surfaces | Direction |
| --- | --- | --- | --- |
| Public brand | Highest | Landing, race information, course map, stories, sponsors, public fundraising and event information | Cinematic photography, oversized type, immersive sections, strong discipline identity, expressive layouts and storytelling. |
| Participant | Medium-high | Dashboard, ticket, training, feed, teams, challenges, results, leaderboards, photos, memories, fundraising and profile | Athletic hierarchy, polished light/dark surfaces, practical navigation, readable data and controlled animation. |
| Admin / operations | Lowest decoration | Athlete/bib management, approvals, dashboards and future operations | High information density, clear statuses and actions, responsive tables, minimal motion and strong readability. |

Use one shared system with appropriate intensity rather than making every page a hero section. Ticket and profile remain calmer utility surfaces. Functionality and readability take priority over spectacle in participant and admin tasks.

Preserve the Tour brand's blue, magenta, yellow, white and deep-navy identity while refining tokens. Use authentic, licensed Dar/event imagery where available. Do not imply a real participant identity with generic photography. Motion must have keyboard, touch and reduced-motion equivalents; hover must never be the only way to reveal essential information.

## 8. EVOLUTION-01 — Visual System Extraction & Infrastructure Protection

**Objective:** Establish the shared visual language and compatibility baseline before redesigning individual pages.

### Required work

1. Fetch and confirm fresh Tour `development` and the reference revision. Read all applicable `AGENTS.md` files, current project/context/decision/issue/design/asset documents and the latest handoff.
2. Import this brief into the repository's durable documentation and add a clear entry point from `AGENTS.md` and the documentation index. Record the scoped redesign authorization so future chats do not misinterpret historical UI-preservation rules.
3. Inventory routes, functional capabilities, unavailable capabilities, active registration behavior, permissions and integration-sensitive files. Record inherited defects and actual baseline checks.
4. Separate presentation from function by clear component responsibilities. Preserve existing hooks, validation, business rules, queries and authorization. Do not use this as justification for a wholesale architectural rewrite.
5. Establish reusable display/UI typography, section headings, buttons, cards, event tiles, dark surfaces, image panels, sponsor surfaces, route panels, participant cards, status indicators, discipline colors, motion and transitions.
6. Plan and begin safe Tour de Dar brand normalization in shared presentation; keep a checklist for page-specific and generated-content remnants.
7. Produce the admin capability/permission matrix described below, grounded in the current `hq_admin` behavior. Identify which expansion items are already supported and which require backend contracts.

**Gate:** Existing functionality and restrictions behave as at baseline; shared foundations are available; every protected-surface change is explained; inherited failures are recorded honestly. Independent page redesigns belong to later phases.

## 9. EVOLUTION-02 — Landing Page Transformation

**Objective:** Make the landing the strongest expression of the new Tour de Dar brand.

### Required work

- **Hero:** stronger photography, larger typography, depth, refined animation, discipline presence, clearer CTAs and event identity. Keep Tour lifecycle state and event configuration authoritative.
- **SWIM / BIKE / RUN:** immersive tiles with default visibility for all three. Hover, touch and keyboard interaction may expand one and alter supporting photography/background. Display route information and CTAs from Tour contracts. Keep all disciplines reachable on small screens and with reduced motion.
- **Course presentation:** use Tour's existing course data and map contracts for framing, transitions, visual overlays, switching and summaries. Empty verified geometry remains an unavailable state; no sample route becomes official.
- **Participant stories:** keep real story architecture, consent and queries; improve editorial type, identity, quotes, imagery and transitions.
- **Community:** preserve the feed; improve cards, activity previews, spacing and hierarchy. Movement indicators must not imply fabricated live activity.
- **Impact:** retain truth states and the real cause. Improve photography, type, dark surfaces and CTAs. Unknown totals remain unknown.
- **Sponsors:** support headline sponsors, major partners and supporting partners through responsive logo surfaces and optional strips/marquees. Use verified records/assets and permission; no sample sponsor or amount. If no approved source exists, use an honest unavailable state.
- **Event weekend:** add Before / Race Day / After as a view over existing event information. It is a browsing interface, not a lifecycle switch or invented schedule.

**Gate:** The landing is substantially more compelling; authentication, registration, lifecycle behavior, data/consent rules and integrations remain compatible. Sponsor or operational availability is represented truthfully.

## 10. EVOLUTION-03 — Public Race & Event Experience

**Objective:** Extend the system coherently across major public routes.

### Scope

- Race Information: clearer scanning, topic hierarchy, visuals and verified content presentation.
- Course Map: a flagship visual surface retaining Tour data, per-discipline views, text alternatives, optional location permission and offline/unavailable behavior.
- Stories: editorial cards, participant identity and consent-aware presentation.
- Sponsors: verified hierarchy and browsing. A new public route may be additive; existing routes must retain their meaning.
- Public fundraising: stronger participant identity and purpose while preserving campaign/donation contracts and private-data boundaries.
- Community guidelines, privacy-adjacent public navigation, lifecycle and archive surfaces: visual cohesion and readable information with existing restrictions.
- Useful frontend-only ideas may be added when classified and integrated with authoritative Tour data.

Connect the public content model to the admin requirements register: what editors will eventually manage, where that content comes from, how publication is approved, and which capability is currently absent. Do not invent a content-management API.

**Gate:** Public routes feel like one product. No route, fundraising behavior, consent boundary or verified event fact is lost in the redesign.

## 11. EVOLUTION-04 — Participant, Community, Race-Day & Admin Evolution

**Objective:** Apply the identity throughout the deeper product with substantially less structural experimentation.

### Participant and community work

- **Dashboard:** hierarchy, actual registration/race status, upcoming actions, identity, truthful progress, countdown and navigation. Keep participant/fundraising hooks and data sources.
- **Feed:** preserve composition, persistence, reactions, comments, edit/delete permissions, activity, loading/error/empty states and participant identity; improve their presentation.
- **Teams and challenges:** stronger identity, cards, progress, leader summaries and discipline colors only where actual authorized data exists. Keep enrollment and unavailable-capability gates.
- **Race day:** athletic dark surfaces, strong bib typography, large readable status, route information and clear operational availability. No simulated operations.
- **Results and leaderboards:** retain timing, publication, ranking and privacy contracts. Strong typography must preserve scanability. Do not display fabricated finish times or winners.
- **Ticket and profile:** calmer, polished utility surfaces. Preserve QR data/readiness, download/share/print, story editing, consent and identity semantics.
- **Training, photos, memories and fundraising:** preserve existing actions, unavailable states and data boundaries; apply the shared system.
- **Authentication presentation:** if touched for branding/cohesion, keep field validation, session behavior, redirects and account/registration flows intact.

### Admin work

Retain existing administration and introduce clearer operational cards, statuses, actions, filters and responsive tables. Preserve server guards and existing authorized data behavior.

Implement the approved full-event-management frontend against verified available contracts. Connect newly enabled operations only when the separate backend/integration work is ready and authorized. A useful shell may be prepared for a missing capability, with a clear gated state and requirements record. Do not claim that the privilege expansion is complete while its actions are still shells.

**Gate:** Every existing participant and admin capability is retained; the backend team can continue using existing contracts. Report visual completion and operational admin completion separately.

## 12. EVOLUTION-05 — Integration Hardening & Visual Cohesion

**Objective:** Verify the complete visual evolution against current integration contracts and user journeys.

### Required verification

- Authentication, account creation and the actual registration journey.
- Authorization, admin roles, redirects and Supabase access.
- Lifecycle restrictions, closed actions and invalid-configuration behavior.
- API request/response compatibility and data/identifier meanings.
- Participant identity, tickets/QR, community, stories and consent.
- Race information, course data, results, photography and memory eligibility.
- Fundraising and existing administrative operations.
- Loading, empty, error, unavailable, permission-denied and successful states.
- Desktop, tablet, mobile, responsive navigation, long content and no horizontal overflow.
- Keyboard interaction, screen-reader behavior, reduced motion and color contrast.
- Image loading, layout stability, motion cost and heavy map loading only when appropriate.
- Tour de Dar naming consistency and coherent design tokens throughout.
- New admin capabilities: permitted and denied actions, server enforcement, audit behavior, role changes and data publication boundaries.

Run required type-check, lint and production build checks on the final intended changes. Provide browser/device and measured performance evidence when available. If unavailable, state the limitation explicitly; source inspection alone is not a browser or screen-reader pass.

**Gate:** Verified compatibility and a coherent visual system, with actual evidence. Record unresolved backend/operational blockers and inherited defects. Frontend completion does not imply production launch or completed admin expansion.

## 13. Admin expansion — full event management

### Approved direction and current baseline

The user explicitly wants privileges and operational capability beyond the current admin area. They selected **full event management** as the priority.

Inspected Tour source uses `profiles.role = hq_admin` in its server admin layout. Current helpers read registrations/athlete details, compute overview statistics, confirm payment/registration status and assign bibs. These are source-level capabilities; this document does not certify deployed RLS or live operational correctness.

The expansion must make administration meaningfully more capable, not merely rename `hq_admin`, add a larger menu or copy Augment mock screens.

### Capability requirements matrix

| Area | Target expanded capability | Implementation boundary |
| --- | --- | --- |
| Participants and registrations | Search/filter, review, approve/reject/request correction where supported, inspect history and perform permitted edits | Preserve IDs, statuses and existing workflow. New transitions/reasons require an agreed server contract. |
| Bibs and check-in | Preserve bib assignment; support controlled changes, lookup, genuine check-in validation and duplicate handling | Real validation and durable check-in are backend-dependent; no simulated scanner. |
| Event content | Manage verified race information, route publication, logistics, FAQs and approved event-weekend content | Existing facts/config stay authoritative until an agreed content workflow exists. Require source and publication status. |
| Sponsors and partners | Manage real records, tiers, logos, placements and publication | Needs verified records, asset rights, storage rules and permissions; never seed fictitious sponsors into production UI. |
| Community and moderation | Review reports, apply defined moderation actions, manage permitted teams/challenges content | Requires approved moderation states, policies, roles and persistence; preserve participant consent. |
| Race operations and results | Manage approved lifecycle transitions, operational notices, timing/result publication and photo availability | No fabricated alerts, locations, timing or winners. Lifecycle control remains unchanged until an explicitly approved integration extends it. |
| Fundraising and payment review | Inspect reconciled records, review exceptions and perform already-authorized actions | Preserve current payment contracts. Refunds, overrides and settlement changes are separate backend capabilities with audit requirements. |
| Staff and permissions | Invite/manage event staff, delegate capabilities, revoke access and distinguish sensitive powers | Server-enforced permissions and an approved role model; no UI-only elevation or self-promotion. |
| Audit and reporting | Attribute sensitive actions, show appropriate change history and provide authorized exports | Define actor, action, subject, timestamp, reason and relevant before/after information; protect private data in logs/exports. |

### Proposed permission model to resolve in Phase 1

The capability scope is approved; exact role names, account assignments and storage/API schema are not yet decided. The following is a planning proposal, not an instruction to create roles or grant access:

- Owner / super-admin: staff permissions and sensitive configuration, with narrowly defined exceptional powers.
- Event administrator: broad day-to-day event management within delegated scope.
- Registrar / check-in operator: relevant registration, bib and check-in tasks.
- Content / sponsor editor: approved public content and partner management.
- Moderator: defined community-review actions.
- Finance reviewer: appropriate payment/fundraising review and reporting.
- Read-only operator / auditor: permitted observation and audit access without mutation powers.

Prefer a capability matrix that can map onto the backend team's actual design. Preserve the current `hq_admin` boundary until a documented compatible transition is implemented. Do not silently introduce new role strings or infer who should receive them.

### Admin completion requirements

1. Document each capability, authorized actors, protected resources, data fields, transitions and failure states.
2. Enforce permissions on the server and through appropriate data-access policies; UI visibility is only a convenience.
3. Verify both successful authorized requests and denied direct requests from unauthorized users.
4. Record sensitive changes with the real actor and appropriate audit history.
5. Handle duplicate/retried operational requests without unintended duplicate effects where applicable.
6. Preserve existing capabilities and active integration work through an additive rollout.
7. Never embed privileged service credentials in client code.
8. Enable an operation only after its real contract and integration are tested.

Role grants, live data changes and privileged-account assignments require the relevant explicit task scope and verified target identities. The current task records the expansion requirement; it does not grant privileges to an account.

### How admin work fits the five phases

- **EVOLUTION-01:** audit current powers; prepare capability/permission matrix, compatibility boundaries and backend requirements.
- **EVOLUTION-02:** expose only verified public sponsor/event information; define any missing admin-managed source.
- **EVOLUTION-03:** align public content and publishing requirements with the proposed admin work.
- **EVOLUTION-04:** implement the admin presentation and connect real available capabilities; gate missing ones.
- **EVOLUTION-05:** verify access boundaries, audit behavior, compatibility and real operational journeys; list any incomplete admin capabilities explicitly.

## 14. Backend coordination rule

Frontend and backend work can proceed simultaneously. Presentation work does not authorize silent contract changes.

For each new backend-dependent capability:

1. Check whether Tour already implements it. If so, retain its implementation and redesign the presentation.
2. If it is frontend-only, classify and add it using authoritative data.
3. Otherwise write a capability requirement and proposed contract, including actors, inputs, outputs, states and permission behavior.
4. Record the backend dependency and coordinate it through a separate integration task. No message to another person is sent without authorization.
5. Keep the UI gated until the contract exists and the integration is verified.

Do not guess table names, buckets, RPC names, endpoints, permission strings or provider payloads. Do not copy Augment's operational data model into Tour. Do not make a visual phase dependent on replacing the existing backend.

## 15. Cross-chat continuity protocol

### At the start of every phase

1. Read this master brief completely and select exactly one `EVOLUTION-XX` phase.
2. Fetch the latest Tour `development`; record expected versus actual remote SHA and local working-tree state. Preserve unrelated changes.
3. Read every applicable `AGENTS.md`, the current Project Bible, repository context, decisions, known issues, design references, asset register and the latest evolution handoff.
4. Verify the previous evolution gate from actual code, checks and remote receipt. Historical Phases 1–7 are not evidence that a new evolution phase is done.
5. Inspect the affected code and trace existing functionality before proposing changes.
6. State the implementation plan, classification, affected files and validation. Proceed within approved scope without reopening settled redesign decisions.

### Phase documentation

Phase 1 should place the durable project version of this brief at `docs/visual-evolution/MASTER-CONTEXT.md`, linked from `AGENTS.md` and the docs index. Maintain concise `STATUS.md`, `CHANGE-REGISTER.md` and `ADMIN-CAPABILITIES.md` records there or use equivalent established repository documents without needless duplication.

Use handoff names that cannot collide with the earlier program, for example:

- `EVOLUTION-01-VISUAL-SYSTEM-HANDOFF.md`
- `EVOLUTION-02-LANDING-HANDOFF.md`
- `EVOLUTION-03-PUBLIC-EXPERIENCE-HANDOFF.md`
- `EVOLUTION-04-PARTICIPANT-ADMIN-HANDOFF.md`
- `EVOLUTION-05-HARDENING-HANDOFF.md`

The latest repository handoff becomes the progress authority once implementation begins. This saved brief remains the approved direction; update its existing shared file identity if its decisions change rather than creating conflicting copies.

### At the end of every phase

- Record completed scope, affected files, A/B/C/D classification and retained functional contracts.
- Record unavailable capabilities, inherited defects, new backend requirements and decisions still needed.
- Include real verification commands/results and before/after visual evidence for affected screen sizes when tooling permits.
- Run final type-check/lint and mandatory `npm run build` after the final intended implementation changes and before the implementation commit.
- Commit and push complete verified phase work only to `development` under the repository workflow unless the user explicitly restricts that phase to local work. Never force-update over unrelated work.
- Confirm the remote SHA/tree and record an accurate receipt. If publication or checks fail, mark the phase incomplete rather than claiming completion.
- Update current context and write an exact initiating message for the next phase.
- Keep handoffs concise; do not repeat the full brief or entire conversation.

### Reusable phase-start message

```text
Initiate Tour de Dar EVOLUTION-[01–05] — [phase title].

Read TOUR-DE-DAR-VISUAL-EVOLUTION-MASTER-CONTEXT.md completely.
Fetch smart01-bot/FRONTEND-TOURE-DE-ROTARY, branch development.
Read all applicable AGENTS.md files, current project documents and the latest
EVOLUTION handoff. Confirm expected versus actual remote SHA and preserve
unrelated work. If the brief is now maintained under docs/visual-evolution/,
read that current repository version too and reconcile later decisions.

Tour is the functional and integration authority. Use
rotaract4compassion/augmentfx only as selected visual/interaction inspiration.
The product name is Tour de Dar. Preserve SWIM / BIKE / RUN and Tour's verified
data, privacy, lifecycle and backend contracts. Keep unavailable capabilities
gated. Full event management is the approved admin-expansion objective;
new permissions require real server enforcement and verified contracts.

Report the phase implementation plan, then proceed with this phase only.
Complete appropriate verification, type-check, lint, final production build,
documentation and the evolution handoff. Commit and push verified changes
only to development and confirm the remote receipt. Do not modify main,
Augment, deploy or alter live databases. Record any blocked capability honestly.
Provide the next phase's initiating message.
```

## 16. Current status and success criteria

| Item | Status at creation |
| --- | --- |
| Authoritative repository and baseline | Verified in the preparation session |
| New product name | Tour de Dar approved; remaining frontend sweep pending |
| Five-phase roadmap | Approved direction, recorded here |
| Admin priority | Full event management explicitly selected |
| Exact expanded permission model | Proposed; resolve with current backend contracts |
| EVOLUTION-01 | Not started |
| EVOLUTION-02 | Not started |
| EVOLUTION-03 | Not started |
| EVOLUTION-04 | Not started |
| EVOLUTION-05 | Not started |
| Repository adoption of this brief | Pending EVOLUTION-01 |
| Live privilege grants or operational changes | None performed by this preparation task |

The project succeeds when visitors see a substantial, coherent redesign; participants and administrators retain every existing capability; backend developers find the fundamental contracts stable; verified information and consent remain authoritative; and no simulated Augment feature is mistaken for a working operation.

Admin expansion has its own substantive success test: the agreed new capabilities actually work for authorized staff, reject unauthorized actions and produce appropriate audit records. A visual shell is a valid intermediate deliverable, not completion of this requirement.

The final product is **Tour de Dar evolved**: Tour's product depth and infrastructure with a stronger, distinctly Tour de Dar visual and interaction system.
