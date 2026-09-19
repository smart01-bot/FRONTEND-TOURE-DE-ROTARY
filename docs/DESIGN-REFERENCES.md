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

## Adding a reference

Record:

1. Stable filename, repository path, or URL
2. Screen/component it controls
3. Approved qualities
4. Elements that must not be copied
5. Status: `Exploratory`, `Approved`, `Baseline`, or `Superseded`
6. The replacement reference when superseded

Unregistered chat screenshots and discarded mockups are not binding.
