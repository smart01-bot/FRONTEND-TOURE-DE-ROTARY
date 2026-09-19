# Tour de Dar — Project Bible

> This is the permanent product, design, phase, context, and workflow authority for the Tour de Dar frontend. Every project phase must read it completely before implementation.

**Product definition:** Tour de Dar is a temporary digital community built around a triathlon, bringing participants together before, during and after the event and turning a physical challenge into a shared experience and lasting memory.

**Core journey:** Discover → Join → Connect → Participate → Experience → Remember

**Working repository:** `smart01-bot/FRONTEND-TOURE-DE-ROTARY`

**Current estimate after Phase 1:** Approximately 45% of the complete frontend vision and approximately 75% of the pre-race MVP.

---

## 1. How to organise the work

### Chat strategy

Use **one main chat per phase**, not one chat per small task.

Stay in the same phase chat when:

- Fixing related pages or components
- Iterating on the same design
- Testing and repairing work from that phase
- Making several commits that share context
- Discussing requirements that affect the current phase

Start a new chat when:

- A phase is complete
- The next task concerns a substantially different product area
- The current chat has become confused or repeatedly references obsolete files
- A clean code audit is needed after many changes
- Work changes from implementation to a large independent activity such as security review or deployment

Do not create a new chat for every button, component, error or small visual correction. Reconstructing context repeatedly wastes time and usage.

### Start each phase with these inputs

1. The phase objective
2. The current repository and branch
3. This roadmap
4. The latest project-context document
5. The exact design references needed for that phase
6. Any known bugs or constraints

### End each phase with these outputs

1. All work committed to GitHub
2. Production build passing
3. Mobile, tablet and desktop review
4. Phase checklist marked complete or incomplete
5. Remaining defects listed
6. A short handoff brief for the next chat
7. Updated completion percentage

### Recommended request pattern

Give one outcome-based request containing related work:

> Complete Phase 1 homepage truth and navigation. Inspect the current repository, replace static activity with real or honest empty states, connect every CTA, preserve the current design system, test responsive layouts, run the production build, and commit the finished changes.

This is more efficient than sending separate messages for every file.

### Mandatory phase repository law

> **Every phase must begin by fetching the latest `main` branch from GitHub, and every phase must end by pushing its complete, verified work back to `main`. A phase is not complete until the push succeeds.**

This law is strict and applies to every phase without exception.

#### At the beginning of every phase

1. Fetch `smart01-bot/FRONTEND-TOURE-DE-ROTARY` from GitHub.
2. Use the latest `main` branch as the only code baseline.
3. Read this roadmap, current repository context and latest phase handoff.
4. Inspect the fetched code before proposing or applying changes.
5. Confirm the current HEAD commit.
6. Never begin from an old ZIP, an earlier chat workspace or an unverified local copy.

#### During every phase

1. Make all phase changes against the fetched source.
2. Preserve unrelated existing functionality.
3. Keep environment files and secrets out of Git.
4. Test related routes and shared systems after changes.
5. Keep incomplete experimental work separate from the final phase delivery.

#### At the end of every phase

1. Complete the phase checklist.
2. Run required type checking, linting and production build verification.
3. Resolve known phase-blocking errors.
4. Update the roadmap, repository context and phase handoff when applicable.
5. Review the exact files that will be committed.
6. Commit with a clear phase-specific message.
7. Push the verified commit to GitHub `main`.
8. Confirm that remote `main` contains the new commit.
9. Record the final commit SHA and link in the phase handoff.

#### Completion rule

A phase is **not complete** when:

- Code exists only in a temporary workspace
- Code exists only inside a ZIP
- Changes have not passed the required checks
- Documentation claims work is complete before the code is committed
- The final commit has not been pushed successfully
- Remote `main` has not been verified

Only code confirmed on GitHub `main` can become the baseline for the next phase.

#### Next-phase rule

The next phase must perform a fresh fetch from GitHub. It must not inherit an uncommitted workspace from the previous phase. This guarantees that every phase starts from the same durable source of truth that the user can see, clone and recover.

---

## 2. Context maintenance system

The goal is not to move the entire conversation into every new chat. The goal is to move the **current truth** of the project without carrying outdated designs, failed approaches or contradictory instructions.

Use a three-layer context system.

### Layer 1 — Permanent product context

This roadmap is the stable product document. It should contain:

- Product vision and definition
- Product principles
- Design direction
- Phase order
- Scope boundaries
- Definition of done
- Decisions that apply to the whole project

Update this file only when the overall product direction, phase structure or permanent design rules change.

### Layer 2 — Current repository context

Maintain a separate current repository-context file. It should describe what is true in the latest `main` branch:

- Framework and dependency versions
- Important folders and routes
- Authentication architecture
- Supabase clients and providers
- Shared theme and navigation systems
- Current completed screens
- Current database integration points
- Required environment-variable names, never their secret values
- Known technical constraints
- Build and deployment instructions
- Important failures that must not be reintroduced

This is an architectural map, not a copy of every source file. The repository remains the authority for exact code.

Update the repository-context file after:

- A phase is completed
- Routes or architecture change
- A shared provider or layout changes
- A dependency or environment requirement changes
- A major bug is fixed in a way future work must preserve

### Layer 3 — Phase handoff

Create a short handoff at the end of every substantial session or phase. It should contain only the information needed to continue from the latest commit:

- Phase and objective
- What was completed
- What remains
- Important decisions made
- Files or routes changed
- Latest commit SHA and link
- Build/test result
- Known bugs
- Exact recommended next task

The handoff should normally be one to three pages, not a transcript.

### Source-of-truth hierarchy

When sources disagree, use this order:

1. Latest committed code on GitHub `main`
2. Latest phase handoff
3. Current repository-context file
4. This roadmap
5. Old chats, screenshots and earlier ZIP files

Old chats are historical evidence, not the current implementation.

### What must move into a new phase chat

Provide:

1. This roadmap file
2. The current repository-context file
3. The latest phase handoff
4. The GitHub repository and branch
5. Only the visual references relevant to the next phase
6. Any new external brief or requirement

Do not upload the repository ZIP when GitHub access is working. Let the new chat inspect the latest branch directly.

### What should not be copied into every new chat

- Entire old conversations
- Old repository ZIP files
- Superseded mockups
- Rejected design directions
- Full terminal logs from already-fixed errors
- Secret environment values
- Duplicate screenshots with no new information

Instead, record the lesson from an old problem in the repository-context file. Example:

> `ParticipantThemeProvider` must remain mounted in the participant layout; removing it breaks all consumers of `useParticipantTheme`.

### Decision log

Every irreversible or project-wide decision should be recorded with:

- Date
- Decision
- Reason
- Affected areas
- Whether it replaces an earlier decision

Examples:

- Final public product name
- Primary blue shade
- Mobile navigation behaviour
- Final authentication layout
- Whether profiles are public
- Whether comments are included in Phase 1
- Mapping provider choice
- Event-lifecycle state model

This prevents a later chat from reopening settled decisions without a clear reason.

### Design-reference register

For each approved visual reference, record:

- Reference filename or URL
- Screen or component it applies to
- What is approved about it
- What must not be copied
- Whether it is final, exploratory or superseded

Never use “the last image” as a permanent design instruction. Give approved references stable names.

### Asset register

Keep a list of important assets and their exact repository paths:

- Logos
- Hero photography
- Auth photography
- Event icons
- Course maps
- Sponsor marks
- Fonts

Do not rename assets casually. A filename change must update every import/reference in the same commit.

### Known-issues register

Maintain a short list containing:

- Bug description
- Reproduction steps
- Affected route/device
- Severity
- Current status
- Fix commit when resolved

Remove resolved issues from the active list and preserve only important lessons in repository context.

### Context refresh procedure

At the start of a new phase:

1. Read the roadmap.
2. Read repository context.
3. Read the latest handoff.
4. Inspect the current GitHub branch.
5. Confirm that documented routes and files still match the repository.
6. State any disagreement before editing.
7. Continue from the latest commit rather than recreating completed work.

### Context compaction rule

When a chat becomes long, create a fresh handoff instead of relying on the chat history. The handoff must preserve:

- Current goal
- Current state
- Decisions
- Constraints
- Modified files
- Test status
- Commit state
- Next action

It should omit repetition, abandoned experiments and conversational detail.

### Context maintenance cadence

| Moment | Required update |
| --- | --- |
| After a small commit | Commit message and issue/task status only |
| After a substantial session | Phase handoff |
| After architecture changes | Repository-context file |
| After product/design decisions | Roadmap decision log |
| At phase completion | All three documents reviewed and updated |
| Before a new chat | Verify latest commit and prepare handoff |

### Context safety

- Never store `.env` values, tokens, passwords or private keys in context files.
- Record environment-variable names only.
- Do not paste user records or private participant data into context.
- Use anonymised examples.
- Keep the repository and documentation aligned; do not document uncommitted work as completed.

---

## 3. Non-negotiable product principles

### Human first

The participant—not the event organiser—is the centre of the experience.

### Dar first

Dar es Salaam must feel like part of the product identity, not merely a location label.

### Mobile first

Every core flow must work exceptionally well on a phone before desktop polish is considered complete.

### Temporary by design

The platform should change across pre-event, race-day, memory and archive states.

### Memory over permanence

The product is not trying to retain users forever. It is trying to make participation worth remembering.

### No fake activity

Never show invented registrations, posts, teams, donations, challenge completions or statistics as though they are live.

When no data exists, use:

- Honest empty states
- Invitations to participate
- Clearly labelled demonstrations during development only
- Skeletons while loading

### Connected experience

Registration, profiles, teams, posts, challenges, courses, results, photos and stories must feel like parts of one event system.

### Simple registration

Triathlon complexity must not make registration confusing.

### Visual storytelling

People, places, movement and memories should carry the experience.

---

## 4. Design direction

### Brand palette

- Primary blue
- Magenta: `#9F2B68`
- Yellow
- White
- Deep navy for editorial and dark surfaces

Use colour to communicate identity and discipline, not to decorate every surface.

### Typography

- Editorial serif for emotional headlines and storytelling
- Clean sans-serif for interface text
- Strong numeric font for countdowns, bibs, statistics and results

### Photography

Prioritise:

- Dar es Salaam
- Ocean and coastline
- Swimming, cycling and running
- Participants and community
- Movement
- Historical Dar paired with modern Dar

Avoid generic sports photography when authentic Dar imagery is available.

### Old Dar × Modern Dar

The interface stays clean and modern. The historical layer appears through:

- Archival photography
- Historical maps
- Harbour and street imagery
- Subtle film grain
- Editorial captions
- Before/now transitions

Historical styling must never reduce readability or usability.

### Responsive rules

- Design at approximately 360–390px first
- No horizontal overflow
- Minimum comfortable touch targets
- Fixed navigation must never cover content
- Maps, tables and leaderboards need mobile-specific presentations
- Test long names, long stories and missing data
- Test both authenticated and unauthenticated states

### Interaction rules

Every visible button must:

- Perform an action
- Navigate somewhere valid
- Be disabled with a clear explanation
- Or be removed until it is ready

Never leave decorative controls that look functional.

---

## 5. Phase 1 — Finish the existing foundation

### Objective

Turn the existing frontend into an honest, fully connected and polished pre-race foundation before introducing major new systems.

### 1.1 Homepage truth and navigation

- Replace static community posts with real feed data or an honest empty state
- Replace static participant statistics with real data or remove them temporarily
- Connect the registration CTA to `/register`
- Connect the race-information CTA to the correct destination
- Connect community links to `/feed`
- Connect story links to `/stories`
- Connect impact CTAs
- Audit every homepage control
- Add proper loading, empty and error states

### 1.2 Naming and language

- Decide the final public product name: Tour de Dar or Tour de Rotary Dar es Salaam
- Apply the decision consistently across metadata, navigation and content
- Standardise the primary prompt to “Why are you doing this?” or “Why I Participate”
- Keep discipline-specific language only where it is meaningful

### 1.3 Community feed completion

- Add comments drawer/page
- Allow participants to post comments
- Display comment author and timestamp
- Add post loading, error and retry states
- Add edit/delete for the post owner if in scope
- Add initial report action and reported-state UI
- Prepare media attachment UI without pretending uploads work

### 1.4 Digital bib completion

- Generate a real QR code
- Add Save/Download action
- Add Share action using the Web Share API with fallback
- Add print-friendly presentation
- Link the bib to the participant profile
- Add states for bib not assigned, registration pending and payment pending

### 1.5 Training resources

- Connect every resource button to actual content
- Remove or disable unavailable resources honestly
- Correct category-specific distances
- Add transition guidance entry points

### 1.6 Participant identity

- Add profile-photo UI
- Add public/private profile setting if public profiles are approved
- Make story, bib and activity feel connected to the participant

### 1.7 Quality assurance

- Test all routes at phone, tablet and desktop sizes
- Test light and dark modes
- Test loading, empty, error and success states
- Run type checking, linting and production build
- Check keyboard navigation and visible focus states
- Check colour contrast and meaningful alt text

### Phase 1 definition of done

- No fake live activity
- No dead buttons
- No placeholder QR code
- Comments work from the frontend
- Existing routes have proper states
- Core screens work on mobile
- Production build passes
- All changes are committed

---

## 6. Phase 2 — Race information system

### Objective

Create a mobile-first source of truth for everything an athlete needs before and during race day.

### Required frontend

- Race-information landing page
- Event overview
- Categories and distances
- Start times and waves
- Registration information
- Swim course information
- Bike course information
- Run course information
- Swim-to-bike transition
- Bike-to-run transition
- Athlete requirements
- Equipment requirements
- Safety information
- Medical information
- Transport and parking
- Race-day schedule
- Frequently asked questions
- Downloadable race guide entry point

### Information architecture

Use short mobile sections, sticky local navigation or accordions. Avoid one extremely long wall of text.

### Phase 2 definition of done

- Every race-information category has a clear home
- All information is reachable within two taps from the homepage
- Content is configurable rather than embedded across unrelated components
- Mobile reading experience is excellent
- Unknown information is clearly marked instead of invented

---

## 7. Phase 3 — Course and Dar map experience

### Objective

Represent the triathlon as three connected disciplines and make the city part of the experience.

### Required frontend

- Main map page
- SWIM / BIKE / RUN / EVENT switcher
- Route polylines
- Start, finish and transition markers
- Safety points
- Aid and hydration points
- Medical points
- Parking and transport markers
- Spectator areas
- Registration/check-in locations
- Landmark information
- Map legend
- Route detail drawer or sheet
- Loading, unavailable and offline states

### Mobile requirements

- Large touch controls
- Bottom sheet instead of crowded side panels
- Clear active discipline
- Fit-route action
- Location permission must be optional

### Phase 3 definition of done

- Each discipline can be understood independently
- Transitions connect the race sequence
- Event logistics can be found without reading a long document
- Map remains usable on a small phone

---

## 8. Phase 4 — Community, teams and challenges

### Objective

Deliver the temporary digital community promised by the product vision.

### Community expansion

- Photo posts
- Complete comments
- Public participant profiles
- Profile activity
- Reporting and moderation states
- Community guidelines

### Teams

- Create team
- Join team
- Invite link/code
- Team search
- Team identity and story
- Member list
- Team statistics
- Team feed
- Captain/member roles
- Relay-team support

### Challenges

- Challenge list
- Challenge details
- Join challenge
- Progress/completion mechanism
- Start and end dates
- Completion count
- Participant challenge history
- Completion badge
- Shareable completion card

### Phase 4 definition of done

- Participants can discover and join people, teams and activities
- Team and challenge activity appears naturally across the product
- Moderation controls exist before high-volume usage
- No community feature relies on fake activity

---

## 9. Phase 5 — Race day, results and memory

### Objective

Keep the platform valuable during and after the physical event.

### Results

- Overall result
- Swim split
- Bike split
- Run split
- Transition times where available
- Search and filters
- Participant result page
- Performance leaderboards
- Community and participation leaderboards

### Photos / Find Me

- Event gallery
- Albums and categories
- Bib-number search
- Participant-photo association
- Photo detail view
- Download and share
- Photographer credit
- Privacy and consent states

### Shareable memories

- “I did Tour de Dar” card
- Result card
- Bib card
- Story card
- Team card
- Challenge-completion card

### Phase 5 definition of done

- A participant can find their result and photos
- A participant can save and share a memory
- The platform remains useful after race day
- Privacy and consent are respected

---

## 10. Phase 6 — Event lifecycle and archive

### Objective

Make the temporary nature of the community an explicit product capability.

### Event states

#### Pre-event / Live mode

- Registration
- Community posting
- Teams
- Challenges
- Training
- Race information

#### Race-day mode

- Immediate logistics
- Schedule
- Map
- Alerts
- Bib/check-in
- Live or provisional information where available

#### Memory mode

- Posting limited or closed
- Stories remain available
- Results
- Photos
- Profiles
- Highlights
- Sharing

#### Archive mode

- Read-only historical edition
- Past results
- Past stories
- Past photos
- Past impact

### Phase 6 definition of done

- Navigation and CTAs adapt to event state
- Closed actions explain why they are closed
- Past editions remain coherent and accessible
- The application never looks broken simply because an event has ended

---

## 11. Phase 7 — Final storytelling, accessibility and launch hardening

### Objective

Make the product unmistakably Tour de Dar and safe to launch publicly.

### Storytelling

- Old Dar × Modern Dar visual narrative
- Authentic participant and city photography
- Event-history presentation
- Impact stories
- Past-edition highlights

### Accessibility

- Keyboard navigation
- Focus management
- Colour contrast
- Screen-reader labels
- Reduced-motion support
- Form error announcements
- Map alternatives

### Performance

- Image optimisation
- Bundle review
- Loading strategy
- Font optimisation
- Core Web Vitals review

### Security and privacy UI

- Privacy notice
- Public-profile consent
- Story/photo consent
- Research-consent separation
- Communication preferences
- Account deletion/request flow
- Data access request entry point

### Launch hardening

- Cross-browser test
- Device test
- Broken-link audit
- Production environment review
- Analytics and error monitoring
- Final content review
- Final build and deployment check

---

## 12. Scope boundaries

### Frontend responsibility

- Screens and components
- Responsive behaviour
- Navigation and route structure
- Forms and validation
- Loading, empty, error and success states
- Accessibility
- Data presentation
- Frontend API/Supabase integration
- Share/download experiences
- Event-state presentation

### Backend or shared responsibility

- Database schemas and migrations
- Row Level Security policies
- Payment-provider implementation and webhooks
- Photo recognition/search processing
- Result timing ingestion
- Real-time event data ingestion
- Moderation enforcement
- Research-data processing
- Notification delivery

Frontend work must still define clear integration contracts and honest unavailable states for backend-dependent features.

---

## 13. Definition of done for every feature

A feature is not complete merely because its main screen renders.

Every feature must include:

- Main user flow
- Mobile layout
- Tablet and desktop behaviour
- Loading state
- Empty state
- Error state
- Success/confirmation state
- Permission or unauthenticated state where relevant
- Long-content handling
- Keyboard access
- Accessible labels
- Working navigation
- Real data or an honest unavailable state
- Type checking
- Production build verification

---

## 14. Usage-efficient working method

To make the most of limited coding sessions:

1. Batch related tasks by phase.
2. Ask for outcomes, not individual keystrokes.
3. Let the agent inspect once, implement several related fixes, test and commit.
4. Keep GitHub as the source of truth.
5. Avoid repeatedly uploading the entire repository when GitHub access works.
6. Attach only new external assets or documents.
7. Request one consolidated review after a batch of work.
8. Avoid regenerating unchanged designs.
9. Use ordinary chat for short planning questions and Work/Codex sessions for repository actions.
10. End every substantial session with a commit and handoff summary.
11. Keep this roadmap updated instead of re-explaining the product.
12. Do not spend a coding session debating minor styling before the feature architecture is agreed.

---

## 15. New-chat handoff template

Copy this into a new phase chat:

```text
PROJECT: Tour de Dar frontend
REPOSITORY: smart01-bot/FRONTEND-TOURE-DE-ROTARY
BRANCH: main
CURRENT PHASE: [phase name]

PRODUCT DEFINITION:
Tour de Dar is a temporary digital community built around a triathlon, bringing participants together before, during and after the event and turning a physical challenge into a shared experience and lasting memory.

DESIGN PRINCIPLES:
Human first, Dar first, mobile first, temporary by design, no fake activity, visual storytelling, connected experience.

CURRENT OBJECTIVE:
[exact outcome]

FILES / ROUTES LIKELY AFFECTED:
[list if known]

KNOWN CONSTRAINTS:
- Preserve current authentication and Supabase behaviour.
- Never commit environment files.
- Make the smallest coherent change.
- Test mobile, tablet and desktop.
- Run type-check/build before pushing.

DELIVERY:
Inspect the current repository, implement the complete requested batch, verify it, commit it to GitHub, and provide the commit link plus any remaining issues.
```

---

## 16. Priority summary

1. Finish and verify the existing frontend foundation.
2. Build complete race information.
3. Build discipline-specific maps and transitions.
4. Build teams and challenges around the community system.
5. Build results, photos and shareable memories.
6. Implement event lifecycle and archive modes.
7. Complete Dar storytelling, accessibility and launch hardening.

The project should progress in this order because each phase establishes the data, navigation and design foundations required by the phases that follow.
