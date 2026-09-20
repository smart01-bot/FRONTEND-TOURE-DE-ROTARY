# Tour de Dar — Asset Register

The source of truth for exact asset files is `public/assets/` on the latest `development`. This register documents important usage conventions without duplicating binary files.

## Asset groups

| Group | Repository location | Intended use | Rules |
| --- | --- | --- | --- |
| Event branding | `public/assets/` | Logos, event marks, identity | Preserve aspect ratio and accessible naming |
| Homepage imagery | `public/assets/` | Hero, city, athlete, and impact storytelling | Prefer authentic Dar/event photography; optimise before adding |
| Authentication imagery | `public/assets/` | Login and registration visual panels | Maintain readable contrast behind overlays |
| Participant imagery | `public/assets/` | Dashboard, training, story, and fundraising presentation | Do not imply a real participant identity without consent |
| Future archival assets | `public/assets/` or a documented subfolder | Old Dar × Modern Dar storytelling | Record provenance and usage rights before launch |
| Future course assets | `public/assets/` or map-data configuration | Routes, legends, landmarks | Treat operational race information as configurable data |

## Asset law

- Do not rename, move, replace, or delete an asset without updating every code and documentation reference in the same commit.
- Use stable descriptive filenames rather than chat-generated temporary names.
- Do not commit source files containing secrets or private participant imagery.
- Record external provenance, photographer credit, usage permission, and required attribution for production assets.
- Optimise large raster images and provide meaningful alternative text where the image conveys content.
- Keep decorative imagery marked appropriately so assistive technology does not announce noise.

## Entry template for significant assets

| Field | Value |
| --- | --- |
| Stable ID | `ASSET-###` |
| File path | `public/assets/...` |
| Used by | Route/component |
| Purpose | Short description |
| Status | Exploratory / Approved / Superseded |
| Rights/credit | Owner, licence, photographer, or `TBD` |
| Replacement | New stable ID if superseded |

## Phase 2 race-guide asset

No new assets were added or renamed. The official race-guide PDF is **TBD**. `RACE_GUIDE.file` in `src/config/race-info.ts` remains `null`, and the download is visibly disabled with an explanation. When the organiser supplies a verified PDF, register its exact path, source, review date and rights before enabling the download. Do not generate a document of placeholders and present it as the official race guide.

## Phase 3 course-map assets

No new image, route or map-tile asset was added or renamed. Route lines and markers are configured data in `src/config/course-map.ts`, and their verified datasets remain empty. If the organiser supplies GPX, GeoJSON, KML, a PDF map or another route asset, record its exact path, source, review date, rights and relationship to the published coordinate data before use. No unverified screenshot or traced route may become operational map geometry.

## Phase 4 community assets

No asset was added, renamed or removed. Existing avatar URLs are presentation-only. Profile-photo and post-media uploads remain disabled until approved storage buckets, file restrictions, consent rules and RLS policies exist. Team marks and challenge badges must not be introduced as real participant achievements without approved source data and completion records.

## Phase 5 race-day assets

No asset was added, renamed or removed. Memory cards are rendered locally in the browser and are not committed images. Event photographs must not be added until provenance, photographer credit, usage permission, participant consent and removal rules are recorded. No placeholder image may be presented as real event photography.

## Phase 6 lifecycle assets

No asset was added, renamed or removed. Archive and lifecycle presentation reuse existing approved visual assets. Past-event photography must remain absent until its provenance, rights, credit and participant-consent rules are recorded.
