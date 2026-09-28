# ADR-0016: Case studies carry a Proof Stage that shows the built system working on invented data, phone-first
Status: Accepted — 2026-09-28 (conversation, owner's "Show the Work" initiative) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- Every case study on `/case-studies/<slug>` renders prose plus a number row through
  `src/components/case-study/CaseStudyPage.tsx` (Hero, MetricsRow, Before, Built, Specs,
  Results, TechStack, Related, CTA). Nothing on any case-study page is a picture of the product.
  Live check 2026-09-28 of `/case-studies/farmbooks`: HTTP 200, zero demo markup.
- The owner's in-person demos convert; the prose pages do not. Owner, 2026-09-28: prospects who
  see a demo say "Oh yeah, we need that. Oh yeah, I want that, but how?" and the site has to
  answer that: "show the actual use case, business case, obviously with a bunch of fake data,
  not real, for each initiative that I built."
- The owner's benchmark is the farm-books.com root showcase: a recreation of the product with
  its own design tokens on invented data, not screenshots.
- Owner, later the same day: "the rest of the showcase pages would live on Preisser Solutions'
  website, not on the FarmBooks website." "If we're going to build a Preisser Solutions page for
  FarmBooks, it's going to have to have all that showcase stuff from the other page." "Really
  make sure you focus on hyper mobile optimization as well." "It animates and just really shows
  them and takes them through the journey of 'Here's what it took before, here's what we were
  able to achieve.'"
- The site rule "no dollar amounts in any string" (`src/types/case-study.ts:8`,
  `docs/WRITER-AGENT-PROMPT.md`) exists so that no client's finances or our pricing is disclosed.
  It would also gut the arithmetic at the centre of the FarmBooks read and the deposit-matching
  story. The MarCommand home stage already draws the line the site needs: demonstration dial
  readouts inside the stage, and no invented dollar figures presented as the business's results
  (`src/components/home/marcommand-live.tsx`, the deleted-outcomes comment block).

## Decision
1. A case study MAY carry a Proof Stage: an optional block rendered between "What we built" and
   the specifications. A stage is an ordered list of typed beats. `Screen` (the product screen
   recreated in its own skin, on invented data) and `Narration` (a visible "demonstration data"
   label plus a screen-reader paragraph) are required; `Before`, `Read` and `Caught` are
   optional; a second declared shape, `loop`, covers input-to-output flow stories. No author
   fills a slot by inventing a failure mode or a metric.
2. Phone-first. Every stage is designed at 390px first and verified on the repo's full phone
   matrix before its desktop layout is judged. The page never scrolls sideways; a wide product
   screen has a phone variant or an internal scroller.
3. Ships in its end state. No element of a stage rests at `opacity: 0`. Without JavaScript,
   under `prefers-reduced-motion`, and after a failed chunk, the complete final frame is visible.
   Motion is time-based and plays once on entry, with visible Next, Back and Replay controls that
   step the same timeline. No scroll scrubbing, no pinning.
4. Demonstration amounts. Invented currency amounts drawn from the stage's fixture MAY appear
   inside a labeled Proof Stage. No amount may appear in case-study copy, metadata, structured
   data, the hub card, the results row, or anywhere as a claimed outcome. This is the one
   exception to the no-dollar rule and it is scoped to the stage element.
5. Invented data only. Every person, business, town, domain and identifier in a stage comes from
   the public registry of invented names (`src/data/demos/_invented.ts`). Fixture totals are
   derived, never typed. The privacy guard is an allowlist checked against the BUILT pages; a
   real-name deny list lives outside this public repository and the local gate fails closed
   when it is missing. Any guard is shown failing once on a planted string before it is trusted.
6. Product skins are scoped. The stage wears the product's own skin inside a Preisser mat that
   follows `--theme-*` in both themes. Skin values live in scoped custom properties that never
   reuse the product's variable names. Product screens carry no `h1` or `h2`.
7. NOT allowed: screenshots of a real product screen; real client documents; a stage that
   links out to a URL that does not resolve (ADR-0002 still applies); a `demo` field that holds
   React components (the contract holds serializable data only; the route passes the scene as
   a slot so each scene ships only on its own route).

## Consequences
- `CaseStudyData` gains an optional `demo` array; the twenty-five files without it are
  unaffected. `CaseStudyPage` accepts a `demo` slot.
- Review agents must NOT flag: invented amounts inside a labeled stage; a recreated product
  screen on invented data; a stage that plays once and then rests; a per-route scene import.
- Accepted cost: each stage is 900 to 1,500 lines plus a fixture, and adds Playwright steps
  (Chromium, WebKit, Firefox) to `scripts/ci-steps.sh` and the fallback workflow together.

## Open / not yet decided
- Whether the hub card gets a "watch it work" affordance (Phase C; needs a boolean through
  `CaseStudySummary`).
- Which wave-2 clients are nameable in a stage (Duffer Golf needs naming approval).

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner asks for real screenshots or real figures on a case study.
- A measured layout-stability or performance regression on a case-study route traced to a stage.

## Sources
- Owner conversation 2026-09-28 (quotes above).
- Design brief and critique: `~/.claude/agent-reports/ps-showcase-initiative/INITIATIVE-BRIEF.md`,
  `critique-brief.md` (outside this repository).
- `src/types/case-study.ts:7-13`, `src/components/case-study/CaseStudyPage.tsx:1022-1035`,
  `src/components/home/marcommand-live.tsx` (demonstration readouts inside the stage).
