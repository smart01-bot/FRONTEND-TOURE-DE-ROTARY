# Tour de Dar — Repository Context

**Repository:** `smart01-bot/FRONTEND-TOURE-DE-ROTARY`  
**Branch:** `main`  
**Baseline reviewed:** `324a013c268027a3ded4364cb909193f1fccedd4`  
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
- Community text posts, reactions, realtime updates, and comment counts
- HQ role checks, athlete records, payment confirmation, and bib assignment

## Current incomplete product areas

- Homepage activity and statistics include static presentation that must be replaced with real data or honest empty states.
- Several homepage and training controls require working destinations or honest disabled states.
- Feed comments are counted but do not have a complete reading/writing interface.
- Digital-ticket QR presentation is not yet a complete save/share/identity flow.
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
- Preserve server-side authentication verification and HQ role checks while editing layouts.

## Documentation update trigger

Update this file whenever a phase changes routes, providers, shared layouts, data integrations, dependencies, environment requirements, or the status of a major product area.
