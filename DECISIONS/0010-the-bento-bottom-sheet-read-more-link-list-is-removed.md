# ADR-0010: The bento bottom-sheet "Read more" link list is removed

Status: Accepted — 2026-09-05 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes nothing. ADR-0006 and ADR-0007 stand unchanged; see Context
for why this does not disturb either.

## Context
- Each of the five bento pillar cards opens a tap/click bottom sheet. Inside it, below the service
  tile carousel, sat a block: `<h4 class="ps-dialog-links-label">Read more</h4>` over a list of
  `/services/*` anchors, rendered from a `tileLinks()` helper in
  `src/components/home/service-pillars.tsx`.
- The owner, 2026-09-05, on seeing it:
  > "On each one of these Bento cards, get rid of the 'Read More' thing there. That's dumb."
- Two independent investigations established, and this agent re-verified before deleting:
  1. **All five pillars carried it**, not only the row-2 cards. An in-file comment claimed
     otherwise and was **false**. Measured by opening all five sheets in chromium at 1440x900:
     `.ps-dialog-links-label` = 1 on every card; anchors 1/1/1/4/2.
  2. It was `createPortal`'d and mounted only on click, so `ps-dialog-links`,
     `ps-dialog-links-label` and the string "Read more" appeared **zero times** in the served
     HTML. `curl … | grep -o 'Read more' | wc -l` returned **0** against the running build.
     No crawler ever saw those links.
  3. **Removing it orphans nothing.** Every destination keeps 4-40 inbound links from
     `/services`, `/site-map`, the homepage crawler `<details>` cluster and blog/compare body copy.
  4. The destination pages and their routes are **KEPT**. That was gated, investigated and settled
     as keep. Only the affordance goes.
- The CSS block header read "BOTTOM-SHEET SERVICE LINKS (ADR-0006)". That was the implementing
  agent tagging the ADR it worked under, not an ADR clause requiring the list. ADR-0006 settles
  that websites ships **as a bento card**; it says nothing about this link list, and the list is
  not in its "explicitly NOT allowed" set.
- ADR-0007 decision 3 requires that every href-bearing service tile keep a homepage path. That is
  satisfied by `PillarCrawlerContent` (`service-pillars.tsx:2150`), which is **server-rendered**
  and still emits `<a href={tile.href}>` for every such tile. The removed block was never the
  path ADR-0007 relied on, because it was never in the served HTML.

## Decision
1. The "Read more" label, its link list, and the `tileLinks()` helper that fed it are **deleted**
   from `src/components/home/service-pillars.tsx`.
2. The styling that served only it is deleted from `src/styles/card-visuals.css`:
   `.ps-dialog-links`, `.ps-dialog-links-label`, `.ps-dialog-links-list`, `.ps-dialog-link` and
   its `svg` / `:hover` / `:focus-visible` / `[data-theme="light"]` variants — 110 lines.
   Verified unreferenced across all of `src/` by grep before removal.
3. The bottom sheet keeps its title, its service-tile carousel, its CTA and its sticky close
   button. Only the link block is gone.
4. **Explicitly NOT allowed**: deleting the destination pages or their routes; removing the
   crawler-facing `<details>` links in `page.tsx`, which ADR-0005 decision 3 protects and which
   are a different surface; re-adding a "Read more" affordance to the sheet in any styling.

## Consequences
- The sheet ends on its CTA, which is the action the sheet exists to produce.
- `.ps-dialog-reveal:nth-child(n)` stagger indices shift down by one for the CTA, so it reveals
  one step sooner. Cosmetic, no defect.
- Review agents must NOT flag the absent link list as a missing affordance or as an SEO
  regression — it was never in the served HTML. Cite this ADR.
- Cost accepted: a reader deep in an opened sheet has one fewer route to a service page. The
  owner judged the affordance not worth its weight, and the CTA remains.

## Open / not yet decided
- Whether the service tiles inside the carousel should themselves become links. Not evaluated
  here; the owner's instruction was about the "Read more" block specifically.
- Whether `ServiceTile.href` still earns its place on tiles now that only the crawler content
  reads it. It is still read, so nothing was removed.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- The owner asks for in-sheet navigation to service pages, or the service pages measurably lose
  traffic that traced to this affordance (it had none — it was never crawlable).

## Sources
- Owner instruction, conversation, 2026-09-05 (quoted above).
- Sheet-mount gate, chromium 1440x900, all five cards: MOUNTED=Y VISIBLE=Y(810px), label=1 each.
- `grep -rn "ps-dialog-links\|ps-dialog-link\b\|tileLinks" src/` → only explanatory comments remain.
- `npx tsc --noEmit` → TSC_EXIT=0; `npm run lint` → LINT_EXIT=0, both unpiped.
