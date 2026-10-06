# EVOLUTION-01 — Visual System Extraction & Infrastructure Protection

4 October 2026. Complete and published to development, within the explicitly documented verification limits. This is the first evolution phase, separate from historical Phases 0–7.

## Baseline and authority

- Tour development / local starting HEAD: `a2e569ffc252388f07f0c0ddd2d8927606c3e64b`; freshly fetched, explicitly checked out, clean before editing.
- Main read-only baseline: `83907b713a963ec520da6e90b887a252831ed85b`.
- Augment main reference: `2b0fd671369d05389b9c56189f4ceb920469aa84`; no modifications.
- Latest explicit user instruction and current development governance resolve older main-only instructions. All publication is development only.

## Completed scope and affected files

- Adopted full saved master brief at `docs/visual-evolution/MASTER-CONTEXT.md`, linked from AGENTS/docs index/Bible. Recorded exact approved visual scope and separated EVOLUTION progress from historical phases.
- Added actual journey/integration/permission inventory, protected hashes, source-backed defect register and full-event-management matrix covering approvals, content, sponsors, moderation, race operations, staff and audit. Role/capability names and account assignments were not invented.
- Added opt-in `src/components/visual-system/index.tsx` + CSS module: headings, buttons/links, cards/grid, images, event tiles, route/participant/sponsor surfaces, statuses, disciplines and accessible motion. Public/participant/admin modes use existing fonts and preserve legacy global tokens.
- Added `src/components/brand/BrandName.tsx`; four existing shared files changed only name/alt sourcing: HomeNav, HomeFooter, participant DesktopNav and admin AdminNav. Resulting text stays Tour de Dar. Technical asset names and Rotary/Rotaract attribution remain.
- Added `scripts/check-evolution-boundaries.mjs`, development-only review specimen, change/adoption/verification records and Phase 2 initiating message; updated relevant project registers. Complete file mapping is in CHANGE-REGISTER.
- A: new presentation foundations. B: shared brand presentation around existing behavior. No Class C product journey added. D: requirements only; no operation or permission enabled. Individual pages were not redesigned.

## Verification and gate

- `npm ci`, type-check and lint pass; only two inherited image warnings (profile/ticket).
- `npm run build`: passed on Next.js 14.2.35; 31/31 static-generation steps, original route inventory and middleware retained. The final gate was repeated after recording verification and before commit.
- Protected boundary check: 53 files byte-identical and 29 page routes retained. No auth, role, Supabase, API, lifecycle, data-type/config, provider or route contract changes.
- Compiled/rendered specimen passes all three modes and native disabled semantics. Public route checks return 200; anonymous dashboard/admin requests return 307 to login. Missing recovery confirmation returns inherited 404.
- Responsive source audit at phone/tablet/desktop rules and 12 text-pair contrast calculations pass (minimum 4.88:1). Browser installation failed; no screenshots, screen-reader, measured overflow, cross-browser/device or live-backend success claim. See VERIFICATION for exact scope/configuration.
- No deployment, live database action, role grant, new environment variable/dependency or tracked secret.

## Blockers retained

`/register` is account creation only; reset confirmation route absent; donor return parameters request a client paid update; public fundraising story/bib consent requires review; admin RLS/error/concurrency/audit guarantees and webhook routing remain unverified. These inherited functional issues were recorded, not repaired by visual work. Other timing/photos/teams/moderation/content/rights/security-upgrade blockers remain. Operational admin expansion is not complete.

## Next chat

EVOLUTION-02 — Landing Page Transformation. Use [the complete initiating message](../visual-evolution/EVOLUTION-02-INITIATING-MESSAGE.md). Fetch current development, verify this gate and receipt, read the current master/context records, then adopt the shared primitives within the landing scope. Browser visual QA is still needed. Preserve all functional contracts and newer work.

## Commit receipt

- Verified remote implementation commit: `2c3ef8941e8e568aee0c786542c447f973dde6c4`.
- [Implementation commit](https://github.com/smart01-bot/FRONTEND-TOURE-DE-ROTARY/commit/2c3ef8941e8e568aee0c786542c447f973dde6c4).
- Verified implementation tree: `fe47f9edb9eec483c5e43d680b992a500bbf0ccf`; exact match to the locally built/staged tree.
- Parent: `a2e569ffc252388f07f0c0ddd2d8927606c3e64b`.
- Non-forced update of development succeeded; fresh fetch confirmed SHA/tree. Local development aligned with a clean worktree.
- Main remained `83907b713a963ec520da6e90b887a252831ed85b`. Augment remained unchanged.
- This documentation-only follow-up records the already verified implementation receipt. Its own final branch-head SHA is supplied in the completion message (a commit cannot embed its own SHA). It changes only this handoff, STATUS, VERIFICATION and the Phase 2 initiating message and passes a repeated final production build gate.
