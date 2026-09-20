# Phase 04 — Community, Teams and Challenges Handoff

**Objective:** Expand the temporary Tour de Dar community through stronger interactions, connected participant identity, teams and challenges without inventing backend behaviour or exposing private participant information.

**Status:** Frontend implementation and documentation complete on `development` within verified contracts. Public profiles, media, persistent moderation, real teams and real challenge participation remain intentionally capability-gated.

**Starting development commit:** `52f86d9de71a633519c13dcfb2cd5bc0d6dbc635`

**Final phase content commit:** `PENDING_RECEIPT`

**Commit link:** `PENDING_RECEIPT`

**Active branch:** `development` only.

**Protected main:** No main change, merge or release was authorised or made.

## Completed scope

- Preserved the existing feed and profile layouts while adding small existing-style connections to Teams, Challenges, Guidelines and the digital bib.
- Completed comment feedback within the verified `post_comments` read/insert contract: loading, empty, retry, error, permission, character-limit, duplicate-submit prevention, submission progress and count refresh states.
- Removed the misleading local-only “Reported” acknowledgement. The feed now says explicitly that no report was submitted and links to public guidelines plus urgent-contact information.
- Added public `/community-guidelines` covering respect, privacy, photo consent, safety and spam without claiming backend moderation exists.
- Added real authenticated participant activity to `/profile`, queried from existing posts for the signed-in user only. No public activity query was introduced.
- Treated a missing `story_public` value as private and clarified that story consent covers the public story listing, not a broader public profile.
- Added protected `/teams` with typed create, join/invitation, search, identity/story, members/roles, statistics/activity and relay capability states. All unsupported actions are disabled with explanations.
- Added protected `/challenges` and `/challenges/[slug]` with a typed, configurable challenge catalogue and detail contract. The catalogue remains empty because no challenge is approved; joining, progress, history, completion, badges, counts and sharing remain disabled or unavailable.
- Added frontend-only community, public-profile, team, moderation and challenge types. They deliberately do not define Supabase tables, storage buckets, APIs or RLS behaviour.
- Added Phase 4 light/dark presentation using the existing participant tokens and patterns. No existing navigation item was replaced or added to the crowded mobile bottom navigation.

## Deferred backend- or decision-dependent scope

- Public participant homes: require a public identifier and separate consent for profile, photo, story, activity and bib visibility.
- Profile photos and photo posts: require approved storage buckets, file constraints, consent behaviour and RLS.
- Persistent reporting and moderation: require approved reasons, states, moderator roles, enforcement workflow and RLS/API behaviour.
- Comment edit/delete: current verified contract covers authenticated reading and insertion only.
- Team creation, joining, invitation codes/links, search, identity/story persistence, membership, captain/member roles, statistics, activity and relay-team relationships.
- Challenge publication, enrolment, progress mechanism, completion history/counts, badge issuance and shareable completion state.
- Decisions remain required for social-team versus relay-team membership, invitation rules and challenge progress verification.

## Supabase and privacy boundary

- Existing entities used: `profiles`, `registrations`, `posts`, `post_reactions`, and `post_comments`.
- No query, mutation or subscription was added for an invented Phase 4 entity.
- No migration, SQL, RPC, API route, bucket, policy or environment-variable name was added.
- No phone, email, payment value, registration identifier or private participant activity is exposed publicly.
- The saved local `.env.local` remained ignored and no value is recorded here or in Git.

## UI preservation and responsiveness

- `/feed` retains its heading, composer, post-card stack and desktop countdown. The new community links wrap below the heading.
- Comment/report surfaces are contained within the existing post card and reuse its radii, borders, colours and typography.
- `/profile` retains the established two-column composition. New cards and activity history follow the same spacing, border and shadow system.
- Teams and Challenges are single-column at phone widths; capability cards become two columns at `sm` and three at `xl`. All actionable or disabled controls are at least 44px high and long text can wrap.
- `/community-guidelines` uses the established public navigation/footer, navy hero and public card language.
- Dark appearance uses the existing participant override strategy and does not change global design tokens.
- The cloud browser could not reach the local preview. Responsive verification is therefore a compiled-route and source-level audit at 360–390px, 768px and 1280px, not a screenshot or real-device visual pass.

## Verification

- Starting baseline `npm run type-check`: passed.
- Starting baseline `npm run lint`: passed with the six existing `@next/next/no-img-element` warnings.
- Starting baseline `npm run build`: passed; all 20 static-generation steps completed.
- Interim Phase 4 `npm run type-check`: passed.
- Interim Phase 4 `npm run lint`: passed with the same six existing warnings and no new warning/error.
- Interim Phase 4 `npm run build`: passed; all 23 static-generation steps completed, including `/community-guidelines`, `/teams`, `/challenges` and `/challenges/[slug]`.
- Final `npm run type-check`: passed.
- Final `npm run lint`: passed with the same six existing `@next/next/no-img-element` warnings; no new warning or error.
- Mandatory post-change `npm run build`: passed, exit 0; all 23 static-generation steps completed and all new routes compiled.
- `git diff --check`: passed.
- Data-integrity scan: Phase 4 code references only existing `profiles`, `registrations`, `posts`, `post_reactions` and `post_comments` contracts; no invented table, storage call or RPC exists.

## Files and architecture

- New routes: `/community-guidelines`, `/teams`, `/challenges`, `/challenges/[slug]`.
- New frontend contracts/config: `src/types/community.ts`, `src/config/community.ts`.
- New components: `src/components/community/CapabilityGrid.tsx`, `src/components/community/ParticipantActivity.tsx`.
- Existing code changed: feed page/card/service, private profile, participant dark styling and middleware route classification.
- Documentation changed: Project Bible, repository context, decisions, known issues, design references, asset register, README and this handoff.

## Exact recommended next task

Approve and implement the Phase 4 backend contracts before enabling any currently gated control: define public-profile consent and public identifiers; team/membership/invitation/relay behaviour; challenge definitions, participation and verification; moderation workflow; media buckets; and least-privilege RLS. Then connect each typed frontend capability and perform a real authenticated multi-device browser pass. If backend work remains unavailable, begin Phase 5 from a fresh fetch of `development` while preserving every Phase 4 privacy and truth-state gate.

## Commit receipt

- Phase-content SHA: `PENDING_RECEIPT`.
- Verified phase-content tree: `PENDING_RECEIPT`.
- The final receipt update will record the immutable content commit. Its own documentation commit cannot contain its own final hash.
