# Tour de Dar — Asset Register

The source of truth for exact asset files is `public/assets/` on the latest `main`. This register documents important usage conventions without duplicating binary files.

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
