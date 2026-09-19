# Tour de Dar — Repository Context

**Repository:** `smart01-bot/FRONTEND-TOURE-DE-ROTARY`  
**Active branch:** `development`

**Protected stable branch:** `main` at pre-Phase-1 state
**Phase 2 starting baseline:** `bed15e19d69c9b1a413fbdd9f55636e38108842e`
**Reviewed:** 19 September 2026

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
| `/fundraise/[slug]` | Public | Public fundraising campaign |
| `/login` | Guest | Participant sign-in |
| `/register` | Guest | Multi-step registration |
| `/reset-password` | Guest | Password recovery |
| `/dashboard` | Participant | Participant overview |
| `/ticket` | Participant | Digital ticket and bib presentation |
| `/training` | Participant | Training resources |
| `/feed` | Participant | Community feed |
| `/fundraise` | Participant | Fundraising dashboard |
| `/profile` | Participant | Account and participant story |
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
- `src/components/admin/` contains shared administration UI.
- `src/config/site.ts` holds general event metadata.
- `src/config/categories.ts` holds categories, disciplines, prices, and distances.
- `src/config/race-info.ts` holds race-information sections, sourced facts, pending operational fields, FAQs, and guide availability. It imports registration options and fees from the existing category configuration.
- `src/app/race-info/page.tsx` renders static public content using existing homepage components and design tokens. Native `details`/`summary` controls work without client-side data fetching. The route is explicitly public in middleware.
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
- Real homepage community previews with honest loading, empty, and error states
- Digital-ticket QR generation with readiness gates, save, share, and print actions
- HQ role checks, athlete records, payment confirmation, and bib assignment

## Current incomplete product areas

- Post reporting is currently a local acknowledgement; backend moderation persistence and enforcement remain outstanding.
- Training resources remain honestly disabled until verified content and course information are published.
- Digital-ticket identity links currently lead to the authenticated profile; public participant profiles remain future work.
- Profile-photo uploads and feed media attachments await an approved storage and RLS contract.
- Participant profiles do not yet function as public digital homes.
- Race-information frontend is implemented; official dates/venues, courses, waves, policies, logistics and guide publication remain unverified/TBD. Existing homepage/registration date and course copy have no recorded organiser provenance; do not treat them as operational confirmation.
- Teams, challenges, discipline maps, leaderboards, results, photo discovery, lifecycle modes, and archival experience are not implemented.
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

## Documentation update trigger

Update this file whenever a phase changes routes, providers, shared layouts, data integrations, dependencies, environment requirements, or the status of a major product area.

## Publishing race information

- Keep unknown facts `null`; the page renders `TBD`. Every non-null operational fact requires a source and review date in its typed record.
- Current registration options/fees are labelled as registration configuration, not official course approval. Update their canonical category config rather than copying numbers into the page.
- Replace `RACE_GUIDE.file: null` only with a real approved PDF path, its official source, and review date. Add the file to the asset register and verify the download.
- The homepage race CTA plus one section expansion reaches every topic in at most two taps (scrolling may be needed). Interactive maps remain Phase 3.
- No new Supabase entities, environment variables, dependencies, global styles or participant UI changes were introduced by Phase 2.
