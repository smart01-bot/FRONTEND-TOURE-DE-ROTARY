# Tour de Dar — Repository Context

**Repository:** `smart01-bot/FRONTEND-TOURE-DE-ROTARY`  
**Active branch:** `development`

**Protected stable branch:** `main` at pre-Phase-1 state
**Phase 4 starting baseline:** `52f86d9de71a633519c13dcfb2cd5bc0d6dbc635`
**Reviewed:** 20 September 2026

This file describes the committed implementation. Source code remains authoritative for exact behaviour.

## Stack

- Next.js 14.2.18 with App Router
- React 18.3
- TypeScript 5.6
- Tailwind CSS 3.4
- Supabase Auth, PostgreSQL, SSR clients, and realtime feed subscriptions
- Lucide React icons
- Fonts: Playfair Display, Montserrat, and Plus Jakarta Sans

## Main route groups

| Route | Access | Current purpose |
| --- | --- | --- |
| `/` | Public | Event landing page |
| `/stories` | Public | Participant stories |
| `/race-info` | Public | Configurable race information with native expandable sections and explicit TBD states |
| `/course-map` | Public | SWIM, BIKE, RUN and EVENT map views with configurable verified geometry and honest unavailable states |
| `/fundraise/[slug]` | Public | Public fundraising campaign |
| `/login` | Guest | Participant sign-in |
| `/register` | Guest | Multi-step registration |
| `/reset-password` | Guest | Password recovery |
| `/dashboard` | Participant | Participant overview |
| `/ticket` | Participant | Digital ticket and bib presentation |
| `/training` | Participant | Training resources |
| `/feed` | Participant | Community feed |
| `/teams` | Participant | Capability-gated team experience; unavailable until backend approval |
| `/challenges` | Participant | Capability-gated challenge catalogue; currently no approved challenges |
| `/challenges/[slug]` | Participant | Typed challenge detail or honest unpublished state |
| `/fundraise` | Participant | Fundraising dashboard |
| `/profile` | Participant | Account and participant story |
| `/community-guidelines` | Public | Community conduct, privacy, photo-consent and reporting guidance |
| `/admin/overview` | HQ admin | Administrative overview |
| `/admin/athletes` | HQ admin | Athlete management |
| `/admin/athletes/[id]` | HQ admin | Athlete record |
| `/admin/bibs` | HQ admin | Bib assignment |

## Architecture map

- `src/app/` contains routes and layouts.
- `src/components/home/` contains public-homepage sections.
- `src/components/auth/` contains authentication and registration UI.
- `src/components/participant/` contains participant navigation.
- `src/components/feed/` contains post composition and cards.
- `src/components/community/` contains authenticated activity and capability-state presentation.
- `src/components/admin/` contains shared administration UI.
- `src/config/site.ts` holds general event metadata.
- `src/config/categories.ts` holds categories, disciplines, prices, and distances.
- `src/config/race-info.ts` holds race-information sections, sourced facts, pending operational fields, FAQs, and guide availability. It imports registration options and fees from the existing category configuration.
- `src/config/course-map.ts` is the only operational course-map data contract. It defines separate view metadata, route polylines, marker/location types, transition relationships, legend entries, required source/review metadata, and the currently empty verified datasets.
- `src/config/community.ts` contains community guidelines and typed frontend capability states. Its challenge catalogue is intentionally empty until organiser-approved definitions exist.
- `src/app/race-info/page.tsx` renders static public content using existing homepage components and design tokens. Native `details`/`summary` controls work without client-side data fetching. The route is explicitly public in middleware.
- `src/app/course-map/page.tsx` renders the public map page. `src/components/course-map/CourseMapExperience.tsx` owns its client-side switcher, connectivity state, optional user-location request, SVG geometry renderer, zoom/fit controls, mobile detail sheet, legend and accessible text alternative. The route is explicitly public in middleware.
- `src/context/UserContext.tsx` supplies authenticated-user context.
- `src/context/ParticipantThemeContext.tsx` supplies participant theme state.
- `src/hooks/` connects screens to participant, story, feed, fundraising, and admin data.
- `src/lib/supabase/` contains browser/server clients and feature data services.
- `middleware.ts` protects authenticated and administrative routes.

## Current connected flows

- Supabase authentication and password recovery
- Multi-step participant registration
- Participant record to dashboard, ticket, training, fundraising, story, profile, and feed
- Public fundraising campaigns and supporter activity
- Public participant stories
- Community text posts, reactions, realtime updates, comment reading/writing, and owner edit/delete
- Comment submission progress, validation, retry, permission feedback and count refresh
- Authenticated participants can see their own real post activity on their private profile
- Public community guidelines and truthful reporting-unavailable guidance
- Real homepage community previews with honest loading, empty, and error states
- Digital-ticket QR generation with readiness gates, save, share, and print actions
- HQ role checks, athlete records, payment confirmation, and bib assignment

## Current incomplete product areas

- Post reporting no longer claims local success. The UI states truthfully that no report was submitted; backend moderation persistence and enforcement remain outstanding.
- Training resources remain honestly disabled until verified content and course information are published.
- Digital-ticket identity links currently lead to the authenticated profile; public participant profiles remain blocked by missing profile/photo/activity/bib consent and public-identifier contracts.
- Profile-photo uploads and feed media attachments await an approved storage and RLS contract.
- Participant profiles do not yet function as public digital homes.
- Race-information frontend is implemented; official dates/venues, courses, waves, policies, logistics and guide publication remain unverified/TBD. Existing homepage/registration date and course copy have no recorded organiser provenance; do not treat them as operational confirmation.
- Teams and challenges have protected, typed, capability-gated frontend homes with honest unavailable states. Create/join/search/invitation/membership/roles/relay/statistics/activity and challenge enrolment/progress/completion/history/badges/sharing remain backend- or decision-blocked.
- The course-map frontend is implemented, but all route polylines and operational markers remain unpublished because no reviewed organiser geometry or logistics source exists. Do not convert legacy homepage, registration, README or ticket copy into map records.
- Naming and story prompt were settled in Phase 1: `Tour de Dar` and `Why are you doing this?`.

## Expected Supabase entities

The current frontend expects or references:

- `profiles`
- `registrations`
- `fundraising_campaigns`
- `donations`
- `posts`
- `post_reactions`
- `post_comments`

The frontend assumes `post_comments` contains `id`, `post_id`, `user_id`, `content`, and `created_at` and that authenticated participants have the required RLS permissions.

No repository contract exists for public-profile consent/slugs, reports, moderation actions, teams, memberships, invitations, challenges, progress or completion. `src/types/community.ts` defines frontend domain shapes only; it does not declare Supabase tables or policies.

Administration access expects the profile role `hq_admin`. Row Level Security and backend migrations are shared/backend responsibilities and must be verified separately.

## Environment-variable names

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`

Never record their values in Git. `.env` and `.env.*` must remain ignored.

## Verification commands

```bash
npm ci
npm run type-check
npm run lint
npm run build
```

If a command is unavailable or blocked by missing external configuration, record the exact limitation in the current handoff. Do not claim it passed.

## Preservation warnings

- The UI on active GitHub `development` must be preserved during feature work; GitHub `main` remains the protected pre-Phase-1 visual reference. Future work must extend the existing design without unsolicited redesign, restyling, restructuring, or visual-system replacement.
- Preserve existing layouts, spacing, typography, colours, imagery, navigation patterns, component shapes, and responsive behaviour unless the user explicitly approves a precisely scoped visual change.
- Inspect affected screens before editing and compare them with the baseline afterward at phone, tablet, and desktop sizes.
- Feature requests grant permission to add the feature, not permission to redesign the page containing it.
- Keep `UserProvider` mounted above every consumer of `useUser`; otherwise the application throws `useUser must be used within a UserProvider`.
- Keep the participant theme provider available to participant-theme consumers.
- Do not commit `.env.local` or expose Supabase/service credentials.
- Update asset references in the same commit as any asset rename.
- Keep generated `*.tsbuildinfo` out of Git.
- Ticket QR payloads contain only a site/profile URL and registration identifier; do not encode private participant fields.
- Preserve server-side authentication verification and HQ role checks while editing layouts.
- Run `npm run build` after the final intended change and require it to pass before committing. If any file changes afterward, rerun the build.
- Populate `COURSE_ROUTES` and `COURSE_MAP_MARKERS` only from reviewed organiser sources. Every record must retain its source and review date; coordinates, venues and operational points must never be estimated.
- `/course-map` must not request location permission on load. The user-location action stays optional and is disabled while no verified map data exists.
- Treat `story_public = null` as private in the profile UI. Existing story consent does not authorise a public participant home, photo, activity, team, challenge or bib disclosure.
- Do not connect public profiles, reports, uploads, teams or challenges by guessing table, bucket, RPC, API or RLS names. Their current unavailable states are intentional.

## Documentation update trigger

Update this file whenever a phase changes routes, providers, shared layouts, data integrations, dependencies, environment requirements, or the status of a major product area.

## Publishing race information

- Keep unknown facts `null`; the page renders `TBD`. Every non-null operational fact requires a source and review date in its typed record.
- Current registration options/fees are labelled as registration configuration, not official course approval. Update their canonical category config rather than copying numbers into the page.
- Replace `RACE_GUIDE.file: null` only with a real approved PDF path, its official source, and review date. Add the file to the asset register and verify the download.
- The homepage race CTA plus one section expansion reaches every topic in at most two taps (scrolling may be needed). Interactive maps remain Phase 3.
- No new Supabase entities, environment variables, dependencies, global styles or participant UI changes were introduced by Phase 2.

## Publishing course-map data

- Keep unverified route and marker arrays empty in `src/config/course-map.ts`; the page renders a per-view unavailable explanation.
- A route needs a stable ID, applicable view(s), description, coordinate sequence, official source and review date.
- A location needs a stable ID, marker kind, applicable view(s), description, coordinate, official source and review date.
- Supported marker kinds cover start, finish, transitions, safety, aid, hydration, medical, parking, transport, spectators, check-in and landmarks.
- The current renderer is dependency-free and bundles any future verified data with the page. No map-tile provider or organiser geometry has been assumed.
- No new Supabase entities, environment variables, packages, global styles or assets were introduced by Phase 3.

## Connecting Phase 4 backend capabilities

- Keep `/teams`, `/challenges` and `/challenges/[slug]` protected. Their current routes render typed unavailable states without querying invented entities.
- Approved challenge definitions may be added to `CHALLENGES` only with verified title, description, start/end dates, target, unit and progress mechanism. An empty catalogue is the correct current state.
- Public participant profiles require a public identifier plus separate consent decisions for profile, photo, story, activity and bib presentation. `story_public` alone is insufficient.
- Persistent reports require approved reasons, statuses, moderator roles, enforcement behaviour and RLS. Until then, the feed must say that no report was submitted.
- Profile photos and post media remain disabled until approved storage buckets, file constraints and RLS exist.
- No database migration, storage change, dependency, environment-variable name or asset was introduced by Phase 4.
