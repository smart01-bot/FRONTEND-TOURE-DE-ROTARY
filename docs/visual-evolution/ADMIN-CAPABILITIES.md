# Full event management — capability and permission matrix

EVOLUTION-01 planning, 4 October 2026. **No live privileges, roles, schemas or operations added.** Only `profiles.role = hq_admin` currently authorizes the server admin shell. Browser writes additionally require deployed RLS; their existence does not certify it. Proposed duties below are not new role strings, account assignments or approved API names.

| Area | Existing Tour capability / evidence | Target actors (proposal) | Protected resources, input and transition requirements | Required outcomes / failures / audit | Class and dependency |
| --- | --- | --- | --- | --- | --- |
| Participant approvals | `admin/athletes` search/filter, detail reads; payment confirm sets paid + confirmed via `lib/supabase/admin.ts` | Event administrator; delegated registrar | Registration ID, version, review decision and reason; agree pending → approved/rejected/corrections and resubmission semantics without changing existing status meanings | Authorized success; deny nonstaff/direct requests; stale record, invalid transition, repeat request and not-found errors; actor/reason/history | B preserve current presentation; D for review transitions/history and permitted edits |
| Bibs and check-in | Bib queue, manual assignment, sequential auto-assignment; no scanner/check-in | Registrar / check-in operator | Registration ID, unique bib, version; durable check-in event and validation source; scope reassignment powers | Duplicate bib/check-in, unpaid/not eligible, stale conflict, retry; atomic assignment + real actor audit | B current bib UI; D uniqueness guarantees, durable validation and concurrent operations |
| Event content | Source-controlled race-info/course-map/site config; no admin editor | Content editor; publisher distinct if backend supports it | Verified facts, source/review date, route geometry/version, logistics/FAQs; draft → reviewed → published → withdrawn | Invalid geometry, missing provenance, permission denied, stale version; publish history with before/after | D persistence, publication policy and server validation; config remains authority meanwhile |
| Sponsors | No verified sponsor dataset, storage contract or management route | Sponsor editor / publisher | Real organization, approved tier/placement, asset rights/credit, publication status, version | Missing rights, invalid asset, duplicate record, denied/unpublish; attributable changes | D records, storage policy, permissions; no sample sponsors |
| Moderation | Participant owner post edit/delete; reports honestly unavailable | Moderator within delegated scope | Report subject, reason, reporter privacy, review state, defined action and appeal/reversal rules | Denied/nonexistent subject, duplicate report/action, stale case; restricted action history | D reports/policies/enforcement; preserve owner paths and consent |
| Teams/challenges | Typed unavailable homes only | Event admin / moderator as agreed | Approved definitions, membership/progress source, visibility/consent, documented transitions | Invalid membership/completion, forbidden publication, retry; auditable edits | D backend contracts; no locally simulated enrollment/progress |
| Race operations/results/photos | Lifecycle config + unavailable results/photos; no operational control panel | Operations staff; designated publisher | Approved lifecycle transition, notice content, timing source, stable participant match, result state, DNF/DNS/DQ, photo consent/withdrawal | No publishing absent data/rights; deny direct calls, version conflict, idempotent publication; actor/time/reason/source | D operational service/publication policy; no GPS simulation or inferred finish |
| Finance review | HQ estimate = paid count × current category price; confirm-payment write; campaign/donation reads | Finance reviewer; sensitive approvals separately delegated | Provider-reconciled transaction ID, amount/currency, registration/campaign mapping, review reason | Unknown payment outcome stays unresolved; duplicate callback/review safe; mismatch/denial explicit; tamper-resistant audit | B current views; D reconciliation, refunds, overrides, settlement/export authority. Existing estimate is not an accounting ledger |
| Staff permissions | Single hq_admin shell guard; signup metadata requests participant | Owner/security administrator (identity unassigned) | Approved server capability mapping, staff identity, event scope, expiry/revocation, grant reason | Prevent self-elevation; deny privilege delegation outside grantor scope; revocation effective server-side; grant/revoke audit | D exact model and storage/API undecided; keep hq_admin boundary |
| Audit/reporting | No durable admin action history or export contract in repo | Restricted auditor/read-only operator | Actor, action, subject, time, reason, request ID, allowed before/after fields; scoped export request | Redact secrets and unnecessary participant data; deny unauthorized reads/exports; retention + immutable history | D event emission, retention, query authorization and approved export columns |

## Decisions and rollout boundary

- Approved: all areas above are the full-event-management objective.
- Retained now: existing `hq_admin` server guard, reads and current mutation contracts. No broadened access.
- Proposed: use capability-based delegation mapped to the backend team's actual authorization model; duty labels above are planning vocabulary only.
- Undecided: exact role names, grant authority, account assignments, event scoping, persistence/API schema, retention and approval separation. Resolve in a separate integration task with verified contracts, not by guessing role strings in UI.
- Every enabled operation needs verified authorized AND denied direct-request tests, scoped data policies, actual actor audit, retry/concurrency handling where applicable, and clear loading/error/empty/forbidden/success states.
- Roll out additively. Phase 4 may improve current screens and show explicit unavailable requirements, but must report visual completion separately from operational completion.
- No backend table/RPC/bucket/endpoint names are proposed as if approved. Coordinate requirements first; do not send messages to staff without authorization.


## EVOLUTION-02 landing content requirements

The landing now consumes current source-controlled content without introducing backend names.

| Surface | Current owner | Missing admin-managed capability / publication gate |
| --- | --- | --- |
| Hero event date/status | Reviewed `race-info` overview fact; `ACTIVE_LIFECYCLE` | Verified date/source/review and authorised publication. Browsing weekend views cannot change lifecycle. |
| Discipline/course panels | Existing categories and course-map records | Approved geometry, marker/source review, versioned publish/withdraw. Distances remain explicitly registration configuration. |
| Before / Race Day | Existing race-info registration/schedule facts | Confirmed logistics and running-order publication; null stays TBD. |
| After | Existing race-day capability/data config and protected memory routes | Real timing/photo contracts and independent consent; no completion inference. |
| Sponsors | Empty source-controlled presentation list in `SponsorsSection` | Real identity, approved tier, logo dimensions/path, rights/credit, source/review, draft/review/publish/withdraw, version conflict handling and audited editor/publisher authorization. `LandingSponsor` is a rendering shape only, not an API schema. |
| Impact | SITE charity identity; totals unavailable | Reconciled totals with period/currency/method/source/review; approved beneficiary outcomes and attribution. No numeric placeholders. |
| Stories/community | Existing consent-filtered story query and feed hook | Preserve current consent and RLS. Any editorial curation/moderation needs a verified separate contract; no synthetic featured participant. |
| Photography | Existing illustrative sport/cause images | Provenance/rights review and authentic Dar/event photography with participant consent and withdrawal. Filename-derived photographer attribution still needs rights verification before launch. |

No new permission string, table, bucket, endpoint, live staff grant or mutation is implied. Content editor/publisher/auditor are proposed duties, not enabled roles.
