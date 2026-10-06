# Shared visual system — adoption guide

Import components from `@/components/visual-system`. Place them inside `VisualSurface`. Its CSS module scopes all tokens and styles; no legacy Tailwind token, global CSS rule, font download, layout provider or dependency is replaced. Phase 1 installs foundations only. Individual page adoption starts in Phase 2.

## Extraction decisions

Reference: Augment main `2b0fd671369d05389b9c56189f4ceb920469aa84`.

| Reference pattern inspected | Tour adaptation | Excluded |
| --- | --- | --- |
| `tailwind.config.ts`, HeroSection | Bold fluid display hierarchy using existing Plus Jakarta Sans 800; Montserrat UI; existing Playfair remains available for editorial storytelling | No Anton download, stencil filter, copied slogans or changed global font semantics |
| EventsSection | Bordered discipline tiles, clear title/action, responsive grid, layered surface hierarchy | No Cycling/Marathon/Walkathon model, sample distances, hover-only map or fake routes |
| SponsorsSection | Clear tier/name/logo surface with caller-supplied verified content | No placeholder brands/logos, inferred partnership or automatic marquee |
| RouteScroll / shared map framing | RoutePanel separates title/status/content and retains caller-owned map/text alternatives | No new map library, live positions, scroll marker posing as race progress |
| globals.css / hero image layers | Navy/white contrast, reserved image geometry, solid caption area | No global duotone override or copied photography with unverified rights |

## Modes and tokens

| Mode | Typography / surface / motion | Intended use |
| --- | --- | --- |
| public | Uppercase Jakarta 800 display, 2.5–6rem fluid scale, spacious 1.5rem cards, 240ms interaction | Landing/public storytelling |
| participant | 2–3.5rem display, readable 1rem body, 1rem cards, 180ms interaction | Athletic but practical task surfaces |
| admin | 1.5–2rem titles, .625rem cards, compact spacing, no movement/shadow | Dense readable operations |

Palette: blue `#17458f`, magenta `#9f2b68`, yellow `#ffc62e`, white, navy `#0d1b3d`. Text: navy/slate on light; white/slate-300 on dark. Discipline fills retain `#4fc3f7` SWIM, `#f59e0b` BIKE and `#e85d3a` RUN with navy text. Magenta is a brand accent, not a replacement category value. Never redefine source discipline IDs or hex data during presentation adoption.

`VisualSurface mode="public|participant|admin" tone="light|dark"` sets intensity and colors. Participant/admin surfaces also honor existing `html[data-participant-theme='dark']`; no theme provider mutation. Explicit dark tone supports athletic/editorial panels. CSS custom properties `--td-*` are available only inside opted-in surfaces.

## Components and boundaries

| Export | Responsibility |
| --- | --- |
| SectionHeading | Eyebrow, fluid title, optional description; choose h1/h2/h3 to preserve document outline |
| VisualButton / VisualLink | Native action versus Next navigation; minimum 44px targets; secondary/quiet variants; button defaults to type=button |
| VisualCard / VisualGrid | Article surface and 1/2/3-column grid at base/768/1200px; long content wraps |
| ImagePanel | Caller-approved image, required alt/caption, fill + sizes, reserved 4:3 space, lazy by default |
| EventTile / DisciplineLabel | SWIM/BIKE/RUN labels and accent; visible content never depends on hover |
| RoutePanel | Frame for real course rendering or honest unavailable state; no geometry fetching or generation |
| StatusIndicator | Visible semantic text plus nonessential dot; optional polite announcement, no pulse or fabricated live meaning |
| ParticipantCard | Display only caller-authorized identity and status; no profile query or inferred public consent |
| SponsorSurface | Explicit verified name/tier/logo content; not a sponsor database or publication decision |

Example (illustrative composition, not an added app route):

```tsx
<VisualSurface mode="participant">
  <SectionHeading title="Your event" />
  <RoutePanel title="Course" status={<StatusIndicator>Not published</StatusIndicator>}>
    <p>Course information is awaiting organiser review.</p>
    <VisualLink href="/course-map">View course information</VisualLink>
  </RoutePanel>
</VisualSurface>
```

Keep hooks/data fetching, business decisions, lifecycle/permission gates and error handling in existing owners. Pass their actual state into these components. Do not render a success status merely because an action was clicked. For unavailable operations use a native disabled button with an adjacent explanation linked via aria-describedby; do not use a disabled-looking link. Do not pass interactive children into an interactive wrapper.

## Accessibility and motion

- Native buttons/links preserve keyboard/touch access; no essential hover-only content.
- Focus uses a 3px contrasting outline plus offset; forced-colors gets system borders/focus.
- Hover lift is decorative, only for fine hover environments without reduced motion; admin movement is zero. Reduced motion disables component transitions/transforms.
- Status and discipline labels convey meaning in text, not color alone. Announce changing status only when useful; static labels do not flood live regions.
- Required image alt: descriptive for meaningful photography, empty for intentionally decorative imagery. Caption/credit is readable on a solid surface.
- Keep tables in bounded scroll regions with labels when later adopted; do not shrink operational text to force a desktop table onto a phone.

## Brand normalization checklist

- Shared public wordmark/footer use `BrandName` → `SITE.name`; participant/admin mark alt text uses `SITE.name`.
- Root metadata already uses SITE.name. Current literal product UI strings, ticket and memory titles/downloads use Tour de Dar.
- Legacy “Tour de Rotary” source comments are historical, not visible product copy; no blanket replacement in protected files.
- Preserve repository name, `/assets/auth/tour-de-rotary-mark.png`, other asset paths, route URLs, IDs, environment names and payload keys.
- Preserve `SITE.organiser` (Rotaract 4 Compassion), Rotary attribution and beneficiary identity.
- Raster logos/bib artwork require visual/provenance review before any embedded lettering changes. Page-specific sweep and generated-card visual review remain Phase 4/5 tasks; do not declare all branding assets normalized.
