# Tour de Dar

> A responsive event, registration, participant, fundraising, community, and administration platform for the Tour de Rotary charity triathlon in Dar es Salaam, Tanzania.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.18-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-149ECA?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Database-3FCF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## Overview

Tour de Dar is a full-stack frontend application supporting the public event experience and the participant journey—from account creation and race registration to training, fundraising, community interaction, bib assignment, and race preparation.

The event is organised by **Rotaract 4 Compassion** and raises funds for the **Ocean Road Cancer Institute (ORCI)**. The platform is designed around the event message: **Swim. Bike. Run. For a reason.**

### Event information

| Item | Details |
| --- | --- |
| Date | 1 November 2026 |
| Location | Dar es Salaam, Tanzania |
| Finish venue | Coco Beach |
| Beneficiary | Ocean Road Cancer Institute |
| Organiser | Rotaract 4 Compassion |

## Key features

### Public experience

- Responsive event landing page
- Event countdown, impact messaging, disciplines, statistics, and community stories
- Public participant stories page
- Public race-information, course-map and community-guidelines pages
- Public fundraising campaign pages with donor support flow
- Search-engine and social-sharing metadata

### Authentication and registration

- Supabase email/password authentication
- Login, multi-step registration, and password-reset flows
- Sprint, Olympic, and Relay race categories
- Relay discipline selection
- Participant story collection
- Registration fee and processing-fee calculation
- Payment initiation through the configured backend API

### Participant portal

- Personalised race dashboard and countdown
- Digital ticket and bib information
- Training resources for swimming, cycling, and running
- Community feed with posts, reactions and comments
- Private participant activity history
- Capability-gated Teams and Challenges homes with honest unavailable states until their backend contracts are approved
- Race results, leaderboards, event-photo/Find Me and memory homes with honest pre-publication states
- Private downloadable/shareable digital-bib and participant-story cards from verified signed-in participant data
- Fundraising campaign progress and donation activity
- Editable participant profile and public/private race story
- Responsive desktop navigation and mobile bottom navigation
- Shared light/dark appearance system

### Administration

- Role-protected HQ administration area
- Registration and athlete overview
- Athlete details and payment confirmation
- Bib-number assignment and management
- Administrative statistics and status summaries

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 App Router |
| UI | React 18, Tailwind CSS, Lucide React |
| Language | TypeScript |
| Authentication | Supabase Auth with SSR support |
| Database | Supabase PostgreSQL |
| Session protection | Next.js middleware + verified Supabase users |
| Styling utilities | `clsx`, `tailwind-merge` |
| Fonts | Playfair Display, Montserrat, Plus Jakarta Sans |

## Application routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Event landing page |
| `/stories` | Public | Participant race stories |
| `/race-info` | Public | Configurable race information and explicit TBD states |
| `/course-map` | Public | Discipline-specific course-map experience |
| `/community-guidelines` | Public | Community conduct and reporting guidance |
| `/fundraise/[slug]` | Public | Individual fundraising campaign |
| `/login` | Guest | Participant sign-in |
| `/register` | Guest | Multi-step registration |
| `/reset-password` | Guest | Password recovery |
| `/dashboard` | Participant | Personal event dashboard |
| `/ticket` | Participant | Digital ticket and bib |
| `/training` | Participant | Training information |
| `/feed` | Participant | Community feed |
| `/teams` | Participant | Team capability and availability home |
| `/challenges` | Participant | Challenge catalogue and availability home |
| `/challenges/[slug]` | Participant | Typed challenge detail or unpublished state |
| `/results` | Participant | Personal result state and timing availability |
| `/results/leaderboards` | Participant | Performance and participation rankings |
| `/results/photos` | Participant | Event gallery and Find Me availability |
| `/results/memories` | Participant | Private participant memory cards |
| `/fundraise` | Participant | Fundraising dashboard |
| `/profile` | Participant | Profile and race story |
| `/admin/overview` | HQ admin | Administration summary |
| `/admin/athletes` | HQ admin | Athlete management |
| `/admin/athletes/[id]` | HQ admin | Athlete record |
| `/admin/bibs` | HQ admin | Bib assignment |

## Project structure

```text
.
├── public/
│   └── assets/                 # Event, authentication and landing imagery
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login, registration and password reset
│   │   ├── (participant)/      # Protected participant portal
│   │   ├── admin/              # Role-protected administration
│   │   ├── fundraise/[slug]/   # Public donor campaign
│   │   └── stories/            # Public participant stories
│   ├── components/             # Feature and shared UI components
│   ├── config/                 # Event, category and discipline configuration
│   ├── context/                # User and participant-theme providers
│   ├── hooks/                  # Participant, feed, fundraising and admin hooks
│   ├── lib/
│   │   └── supabase/           # Supabase clients and data services
│   └── types/                  # Shared TypeScript types
├── middleware.ts               # Authentication and route protection
├── tailwind.config.ts
└── next.config.mjs
```

## Getting started

### Prerequisites

- Node.js 18.17 or later
- npm 9 or later
- A Supabase project
- A compatible payment/backend API for live payment processing

### 1. Clone the repository

```bash
git clone https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY.git
cd FRONTEND-TOURE-DE-ROTARY
```

### 2. Install dependencies

```bash
npm install
```

For reproducible CI installations, use:

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical website URL and payment return base |
| `NEXT_PUBLIC_API_BASE_URL` | For payments | External backend/payment API base URL |

Environment files are intentionally ignored by Git. Never commit secrets or service-role keys.

### 4. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimised production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run Next.js ESLint checks |
| `npm run type-check` | Run TypeScript without emitting files |

## Supabase requirements

The application expects a Supabase project containing these core tables:

- `profiles`
- `registrations`
- `fundraising_campaigns`
- `donations`
- `posts`
- `post_reactions`
- `post_comments`

No approved repository contract currently exists for public participant profiles, reports/moderation, teams, memberships, invitations, challenges, progress or completion. The corresponding frontend states remain unavailable rather than guessing table or RLS behaviour.

Authentication users should have a corresponding `profiles` record. Administration access is restricted to authenticated users whose profile has:

```text
role = hq_admin
```

Configure Row Level Security policies carefully so participants can access only the records appropriate to them, while public fundraising and story pages expose only explicitly public information.

## Race configuration

Race categories, prices, disciplines, and distances are defined in `src/config/categories.ts`. General event metadata is defined in `src/config/site.ts`.

Update these files together with the corresponding Supabase configuration whenever event details change.

## Security

- Protected routes are enforced through `middleware.ts`.
- Server-side authentication uses `supabase.auth.getUser()` to verify tokens.
- The admin layout verifies the `hq_admin` role before rendering.
- `.env` and `.env.*` files are excluded through `.gitignore`.
- Sensitive server credentials must never use a `NEXT_PUBLIC_` prefix.
- Production deployments should enforce appropriate Supabase Row Level Security policies.

## Production deployment

1. Add the required environment variables to the hosting platform.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Configure allowed URLs and redirect URLs in Supabase Auth.
4. Configure the payment provider's callback and return URLs.
5. Run the production checks:

```bash
npm run type-check
npm run lint
npm run build
```

6. Deploy the generated Next.js application using a Node-compatible platform such as Vercel.

## Contributing

1. Create a branch from `main`.
2. Make a focused change.
3. Run type checking, linting, and the production build.
4. Commit with a clear message.
5. Open a pull request describing the change and how it was tested.

## License

This repository does not currently declare an open-source license. Unless a license is added, all rights remain with the project owner and organising team.

## Contact

For event or platform enquiries, contact **hello@tourdedar.co.tz**.

---

Built for Tour de Rotary Dar es Salaam by the project team supporting Rotaract 4 Compassion and Ocean Road Cancer Institute.
