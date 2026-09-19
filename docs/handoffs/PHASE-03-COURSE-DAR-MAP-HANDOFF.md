# Phase 03 — Course and Dar Map Experience Handoff

**Objective:** Represent SWIM, BIKE, RUN and EVENT separately, connect the triathlon sequence through its transitions, and provide a truthful mobile-first home for future organiser-verified course and logistics data.

**Status:** Frontend implementation and documentation complete on `development`; organiser course geometry and operational locations remain intentionally unavailable.

**Starting development commit:** `addadbf5f47925c8bfae22c46907857616a5f8ad`

**Final phase content commit:** `780ba492c43996afe2434375e38cd496f404e278`

**Commit link:** https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY/commit/780ba492c43996afe2434375e38cd496f404e278

**Active branch:** `development` only.

**Protected main baseline:** `83907b713a963ec520da6e90b887a252831ed85b` — no main changes authorised or made.

## Completed scope

- Added public `/course-map` using existing public navigation, footer, typography, colours, spacing, cards, shadows and button treatments.
- Added separate large-touch SWIM, BIKE, RUN and EVENT views plus the conceptual SWIM → T1 → BIKE → T2 → RUN sequence. Transition locations remain `TBD`.
- Added a typed central contract in `src/config/course-map.ts` for route polylines, start/finish/transitions, safety, aid, hydration, medical, parking, transport, spectators, check-in and landmarks.
- Required every future operational route or marker record to include an organiser source and review date. Verified route and marker arrays are currently empty; no legacy site copy was promoted into map data.
- Added a dependency-free SVG renderer ready for verified coordinate sequences and markers, with zoom, fit-route reset, and an optional user-location action. Location permission is never requested automatically and the action is disabled while no verified map exists.
- Added a map legend, mobile route-detail sheet, route/location counts, source status and text alternative to the visual map.
- Added initial loading, browser-connectivity/offline notice and per-view unavailable states. Disabled controls expose why they cannot yet operate.
- Added one existing-style `/race-info` header link to `/course-map` and a reciprocal return link. All 17 established race-information sections remain present and structurally unchanged.
- Registered `/course-map` as public in middleware.

## UI preservation and responsiveness

- No homepage, global CSS, Tailwind token, existing shared component, participant page, authentication page, asset or dependency changed.
- Phone base: four equal map tabs with 48px touch height, wrapping race sequence and actions, contained map canvas, two-column marker key and a detail surface that follows the map as a bottom sheet.
- Tablet: retained single-column reading order with expanded canvas height and three-column marker legend.
- Desktop: map canvas and details become a bounded two-column composition; legend and text alternative share the following row.
- Width and class audit covered 360px, 390px, 768px and 1280px constraints: no fixed page width, controls wrap, grid children use `min-w-0`, SVG scales to its container and long explanatory text can wrap.
- Browser screenshots and interaction automation could not run because the browser package is installed without its Chromium binary. This remains a source/rendered-output responsive audit, not a browser visual pass.

## Deferred organiser-dependent scope

- SWIM, BIKE and RUN coordinate sequences, laps and turn points.
- Start, finish, T1 and T2 locations and layouts.
- Safety, aid, hydration, medical and repair locations.
- Parking, transport, spectator, registration/check-in and landmark locations.
- Course-specific operational directions and a map-tile/provider decision if a production street basemap is required.
- Existing unsourced Coco Beach/Msasani/site copy was deliberately not used as operational evidence.

## Verification

- `npm run type-check`: passed.
- `npm run lint`: passed with the six existing `@next/next/no-img-element` warnings; no new warning or error.
- Initial `npm run build`: passed, exit 0; all 20 static-generation steps completed, including `/course-map`.
- Production HTTP checks: `/`, `/race-info` and `/course-map` returned HTTP 200. The rendered map route contains four tab controls and the loading state; `/race-info` retains 17 sections and contains one map entry point.
- Data-integrity scan: no legacy Coco Beach/Msasani value or coordinate pair was added to the Phase 3 map configuration or route components.
- Responsive/accessibility source audit: passed within the browser limitation above. Controls use semantic buttons/tabs, unavailable actions are disabled with reasons, connectivity/location feedback uses status text, the SVG has an accessible label and published map records have a text alternative.
- `git diff --check`: passed before the content commit.
- Final mandatory `npm run build`: passed, exit 0, after all Phase 3 code and documentation changes and before the content commit; all 20 static-generation steps completed, including `/course-map`.
- Local `.env.local` remained ignored. No environment value, token, user record or private backend response belongs in this handoff or commit.

## Files and architecture

- New: `src/app/course-map/page.tsx`, `src/components/course-map/CourseMapExperience.tsx`, `src/config/course-map.ts`, and this handoff.
- Existing code: `/race-info` map entry point and middleware public-route list only.
- Documentation: Project Bible, repository context, decisions, known issues, design references and asset register.
- No new environment-variable name, backend entity, package, global style or asset.

## Exact recommended next task

Obtain organiser-approved route geometry and the operational location schedule, then publish it through `src/config/course-map.ts` with source and review metadata. Validate each discipline and EVENT view against the organiser material and complete a real-browser/mobile visual pass. If organiser data is still unavailable, begin Phase 4 — Community, Teams and Challenges — from a fresh fetch of `development` without fabricating map content.

## Commit receipt

- Phase-content SHA: `780ba492c43996afe2434375e38cd496f404e278`.
- Verified phase-content tree: `03aad385c89448baae1712df39d947b912fa98a1`; this is the tree produced by the successful mandatory build.
- This receipt update records the full content commit. Its own documentation commit is available from this file's history and the final delivery report; a commit cannot contain its own final hash.
