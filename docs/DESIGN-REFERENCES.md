# Tour de Dar — Design Reference Register

This register prevents phrases such as “the last design” from becoming permanent instructions. A reference is authoritative only after it is named here and marked approved.

## Permanent direction

- Feeling on arrival: “Something is happening in Dar.”
- Progression: “People are already part of it” → “I want to join” → “I’m part of this” → “I remember Tour de Dar.”
- Clean modern interface with an atmospheric Old Dar × Modern Dar storytelling layer.
- Human, city, movement, community, and memory over generic sports imagery.
- Blue and magenta carry most brand weight; white and yellow provide space and emphasis.
- Editorial serif for emotional storytelling; clean sans-serif for interface content; strong numerals for race data.
- Mobile-first layouts with comfortable touch targets, no horizontal overflow, and navigation that never covers content.

## Registered references

| ID | Reference | Applies to | Status | Approved qualities | Restrictions |
| --- | --- | --- | --- | --- | --- |
| DR-001 | Current committed public homepage | Public experience | Baseline | City photography, editorial typography, energetic colour, event atmosphere | Static activity and dead CTAs are not approved behaviours |
| DR-002 | Current committed authentication experience | Login/registration | Baseline | Split visual composition, prominent branding, clear form area | Preserve accessibility and small-phone usability |
| DR-003 | Current committed participant portal | Participant routes | Baseline | Shared navigation, responsive cards, light/dark system | Do not break providers or let fixed navigation cover content |
| DR-004 | Old Dar × Modern Dar product brief | Future storytelling | Approved direction | Archival imagery transitioning into present-day city and athletes | Do not make the UI look antique or reduce legibility |

## Phase 2 preservation record

- `/race-info` reuses `HomeNav`, `HomeFooter`, existing serif/sans/numeric fonts, navy/sand/bronze/coral tokens, card radii and shadows.
- The homepage change is only the existing race CTA destination: `#race` → `/race-info`; its markup, classes, spacing and imagery are otherwise identical.
- No global styles, design tokens, assets or participant pages changed. New sections use native expandable controls, wrapping content and single-column phone layouts; cards become three columns at `sm`.
- Phone/tablet/desktop source comparison completed. Browser screenshot comparison remains unavailable because Chromium installation timed out; do not interpret this as a visual browser pass.

## Phase 3 preservation record

- `/course-map` reuses `HomeNav`, `HomeFooter`, the existing navy/sand/bronze and discipline colours, serif/sans/numeric fonts, card radii, shadows, buttons and focus treatment.
- `/race-info` retains all 17 sections and their markup; its only Phase 3 addition is one existing-style header link to the map. No homepage, global style, design token, existing asset or participant screen changed.
- The four-view control uses 48px-high mobile targets. The base layout is single-column with the details surface following the canvas as a mobile sheet; it becomes a contained two-column composition at `lg`. Controls wrap, legend columns respond and the page uses width containment at 360–390px.
- Source comparison and rendered-route checks completed for the phone/tablet/desktop rules. Browser screenshot comparison remains unavailable because the installed browser package has no Chromium binary; do not interpret this as a visual browser pass.

## Phase 4 preservation record

- `/feed` keeps its existing heading, composer, post cards, two-column desktop structure and countdown card. The only navigation addition is a wrapping row of existing-style links to Teams, Challenges and Guidelines.
- Comment/report additions stay inside the existing post card and reuse its colours, borders, radii, spacing and typography. The former local report acknowledgement was replaced with a truthful inline unavailable state.
- `/profile` retains its established two-column composition and cards. Digital-bib, community-space and real personal-activity connections are additive and use the same component language.
- `/teams` and `/challenges` reuse the participant portal shell, existing navy/blue light-first cards, dark-mode approach, type system, shadows and responsive grid patterns. `/community-guidelines` reuses the public navigation/footer and public race-information card language.
- Phone bases are single-column with wrapping links and minimum 44px actions; capability grids become two columns at `sm` and three at `xl`. No participant navigation item, global token, asset or existing page structure was replaced.
- The live cloud browser could not reach the local preview in this environment. Phase 4 therefore has successful compiled-route and source-level phone/tablet/desktop audits, not a screenshot or real-device visual pass.

## Adding a reference

## Phase 6 preservation record

- Lifecycle additions reuse existing public and participant card, notice, colour, type, radius, border and shadow patterns. No page composition, global token or asset was replaced.
- The participant shell gains one compact wrapping status strip. Desktop navigation keeps the same sidebar structure; mobile keeps six equal-width destinations and changes only their lifecycle priority.
- Registration and community closed states occupy the existing action surfaces and explain why an action is unavailable. `/archive` reuses the public navigation/footer and established two-column card breakpoint.
- Phone bases remain wrapping/single-column, archive cards become two columns at `sm`, and existing desktop shells remain unchanged.

## Phase 5 preservation record

- Phase 5 uses the participant portal shell, existing navy/blue/magenta/yellow palette, serif/sans/numeric typography, rounded cards, borders and shadows.
- Existing participant navigation was not restructured. Results are reached through an additive profile action and a compact horizontally scrollable local navigation.
- Result, leaderboard and photo layouts use single-column phone bases, two-column tablet capability grids and four/five-column desktop summaries without horizontal page overflow.
- Memory-card previews use the existing event palette. Their exported images contain only the signed-in participant's name, category, bib or saved story.
- No existing page layout, global token or asset was replaced.

Record:

1. Stable filename, repository path, or URL
2. Screen/component it controls
3. Approved qualities
4. Elements that must not be copied
5. Status: `Exploratory`, `Approved`, `Baseline`, or `Superseded`
6. The replacement reference when superseded

Unregistered chat screenshots and discarded mockups are not binding.
