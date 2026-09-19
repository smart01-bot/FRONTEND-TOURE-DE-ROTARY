# Tour de Dar — Repository Context

**Repository:** `smart01-bot/FRONTEND-TOURE-DE-ROTARY`  
**Branch:** `main`  
**Baseline reviewed:** Phase 1 implementation (see latest handoff)
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
- Teams, challenges, complete race information, discipline maps, leaderboards, results, photo discovery, lifecycle modes, and archival experience are not implemented.
- Product naming and the primary participant-story prompt require a final project-wide decision.

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

- Keep `UserProvider` mounted above every consumer of `useUser`; otherwise the application throws `useUser must be used within a UserProvider`.
- Keep the participant theme provider available to participant-theme consumers.
- Do not commit `.env.local` or expose Supabase/service credentials.
- Update asset references in the same commit as any asset rename.
- Keep generated `*.tsbuildinfo` out of Git.
- Ticket QR payloads contain only a site/profile URL and registration identifier; do not encode private participant fields.
- Preserve server-side authentication verification and HQ role checks while editing layouts.

## Documentation update trigger

Update this file whenever a phase changes routes, providers, shared layouts, data integrations, dependencies, environment requirements, or the status of a major product area.
