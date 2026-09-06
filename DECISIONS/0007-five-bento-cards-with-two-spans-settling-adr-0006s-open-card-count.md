# ADR-0007: The pillar bento grid holds FIVE cards, and exactly two grid-column spans close the hole that creates
Status: Accepted — 2026-09-04 (conversation, relayed through the TEAM ALPHA brief) — Owner: Tyler Preisser
Supersedes / Superseded by: — (Supersedes nothing. This SETTLES the first bullet under ADR-0006's "Open / not yet decided" — *"How many cards the grid ends at, and which of the six service destinations earn one."* ADR-0006 is Accepted and immutable and is NOT edited by this record; its decisions 1-5 all stand unchanged.)

## Context
- **ADR-0006** (Accepted 2026-09-03) lifted ADR-0003's bar on a fourth pillar and moved
  websites/marketing into the bento grid as cards. It shipped **six** cards —
  `software`, `automation`, `ai`, `redesign`, `custom-sites`, `search-ads`
  (`src/components/home/service-pillars.tsx:80-592`, read 2026-09-04).
- ADR-0006 deliberately did **not** fix the card count. Its own "Open / not yet decided"
  section reads: *"How many cards the grid ends at, and which of the six service
  destinations earn one."* This ADR answers that, which is why it is a settlement and not
  a supersession.
- Six cards divide evenly at 1, 2 and 3 columns, so the six-card build needed no span. The
  code comment recording that is at `src/styles/globals.css:1489-1499`:
  > "Six cards divide evenly at every breakpoint … so NO card needs a grid-column span and
  > none is left in a row with a hole."
  That comment is **true of six and false of five.** It is a code comment, not an ADR, and
  is rewritten by the same change this record covers.
- The failure this decision solves is a real duplication, not a hypothetical. `redesign`
  ("Website Redesign.") and `custom-sites` ("Custom Websites.") are two cards for one
  offering. Their copy overlaps at the sentence level — both descriptions open on
  "built/rebuilt from scratch" in the same stack (`:373-374`, `:445-446`), both carry
  "no templates, no page builders" (`:450` vs. the description at `:446`), and their
  pain-point lists ask the same question twice. A visitor scanning row 2 reads the same
  card twice with a different heading.
- What the owner asked for, as relayed: the two website cards become one card titled
  "Websites.", and the dedicated `<Capabilities>` section is removed. **Provenance stated
  plainly:** I do not hold the owner's verbatim sentence for this instruction. It reached
  me through the TEAM ALPHA brief and the A1 structure blueprint
  (`~/.claude/agent-reports/A1-structure-blueprint.md`), not from the conversation
  transcript. ADR-0006's owner quotes are verbatim; this one is not, and a reader should
  weigh it accordingly.

## Decision
1. **The pillar bento grid holds five cards**, in this source order:
   Business Software · Business Automation · AI Integration · **Websites.** · Search and Ads.
2. **`redesign` and `custom-sites` are merged into one card**, `type: "web"`, titled
   `"Websites."`. `redesign` is the survivor (first in DOM order, so mobile `order` and the
   row-2 height rule need the fewest edits; `WebsiteVisual` is the more universal artwork
   for a card covering both new builds and rebuilds). `custom-sites` is deleted.
3. **Every `serviceTile` from both cards is carried over verbatim — all eleven.** This is a
   hard constraint, not a preference. `/services/custom-websites`,
   `/services/conversion-optimization` and `/services/ai-search-optimization` reach the
   homepage **only** through the `custom-sites` tiles, via the real `<a>` in
   `PillarCrawlerContent` (`service-pillars.tsx:1891-1897`). Dropping any href-bearing tile
   silently removes that page's only homepage link. `tileLinks()` (`:1524-1531`) dedupes by
   href, so "Read more" still renders 5 unique links, not 11.
4. **Two `grid-column` spans are re-added, one per multi-column breakpoint**, and this
   reverses the "no card needs a span" claim at `globals.css:1489-1499` knowingly:
   - `<640px`: five stacked cards, `order` 1-5. No span. No hole.
   - `640-939px`: `.ps-bento-card--search-ads { grid-column: 1 / -1 }` →
     `[software|automation] [ai|web] [search-ads ————]`
   - `>=940px`: `.ps-bento-card--web { grid-column: span 2 }` →
     `[software|automation|ai] [web ————|search-ads]`
   Both spans land on the **final** row, so the grid closes on a wide card instead of on an
   empty cell at every multi-column width. Row 1 stays three equal pillars, which is the
   positioning ADR-0006 decision 4 protects.
5. **`940px` remains the breakpoint.** ADR-0006 decision 5 permits the grid to be
   re-derived for a new card count but holds the breakpoint fixed; this re-derivation
   stays inside that permission.
6. **The variant class is renamed `redesign` → `web`.** `globals.css:1456-1460` instructs
   that the row-2 variant names be kept accurate; a card titled "Websites." styled by
   `.ps-bento-card--redesign` would break that instruction. `websites` was unavailable —
   it is already taken as a layout variant by Business Software (`service-pillars.tsx:84`).
7. **Explicitly NOT allowed:**
   - Removing `PillarCrawlerContent` (`service-pillars.tsx:1857-1925`) or any part of it.
     It is visually hidden by design and is the homepage's **only** source of static `<a>`
     tags for the `/services/*` pages, because every visible card is a `<button>`
     (`:1581-1585`, rationale `:1490-1521`). It looks like duplicated markup and is not.
   - Dropping any tile that carries an `href` in order to shorten the merged card.
   - Reinstating a sixth card to avoid the spans. The spans are the decision, not a patch
     around it.
   - Re-adding a standalone websites band. ADR-0006 decision 1 still governs.
8. **The one exception:** if a render check finds the 5-card grid leaves a visible hole or
   the wide card reads as broken at any width in the CLAUDE.md viewport matrix, the span
   placement may be re-derived — by a new ADR, not by editing this one.

## Consequences
- **For implementers:** `service-pillars.tsx` loses one pillar object; `pillar.title` on the
  survivor becomes `"Websites."`. `globals.css`'s mobile `order` block drops to orders 1-5
  and two new span rules are added after the row-2 height rule.
- **Structured data changes value in two places, and this is expected.** `pillar.title`
  feeds JSON-LD at `service-pillars.tsx:1829` (OfferCatalog `name`) and `:1837`
  (`serviceType` on every nested Offer). The merge sets both to `"Websites."` on 11 Offers
  and drops the OfferCatalog count from 7 (1 outer + 6) to 6 (1 outer + 5). `numberOfItems`
  (`:1826`) recomputes from the data automatically. These are **value** changes to existing
  valid structures — no schema shape change, no `@id` collision, no removed type. A reviewer
  diffing the JSON-LD should read this paragraph and not file it.
- **The homepage `<h2>` count drops.** Reviewers should expect it and not treat it as a
  heading-hierarchy regression.
- **For review agents:** do not flag the five-card grid, the two spans, the `--web` variant
  name, or the eleven-tile merged card as defects. They are this decision.
- **Cost accepted:** the "no card needs a span" simplification recorded on 2026-09-03
  lasted one day. That is the mechanism working — the comment was a true statement about a
  six-card grid, and the grid is no longer six cards. It is rewritten, not deleted, so the
  next reader sees why the span came back.
- **Cost accepted:** two cards' worth of distinct copy compress into one description. No new
  claim is introduced — the merged description recombines sentences that already shipped —
  but nuance is lost, and a reader who wanted "redesign" specifically now finds it as a tile
  inside the card rather than as a card face.

## Open / not yet decided
- Whether the five non-href tiles on the merged card should be trimmed. All eleven are
  carried today. Trimming is a **copy** decision and is safe **only** while every
  href-bearing tile survives (decision 3).
- Whether `"Search and Ads."` becomes `"Search, AI, and Ads."`. That title change was
  planned alongside this merge and is **NOT implemented in this change** — it is held
  pending a render check on whether four extra characters wrap on a card title sitting over
  artwork. Recorded here so the next reader knows the omission is deliberate.
- Whether `.ps-bento-card`'s `padding: 0` (`globals.css:1428`) + `overflow: hidden`
  (`:1447`) amputating card artwork should be fixed. Known, out of scope, unfixed.
- Whether `RevenueVisual()` ever earns a card. ADR-0006 left this open and this record does
  not close it. `CustomBuildVisual()` now joins it as a shelved-but-not-deleted visual in
  `card-visuals-backup.tsx`, whose stated purpose (`:4-28`) is exactly that shelf.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. While `Proposed`,
it is not yet binding. Disagreement with a settled decision is resolved by a NEW superseding ADR,
never by editing this one.

## Revisit criteria
- The owner asks for the two website offerings to read as separate cards again.
- A render check across the CLAUDE.md viewport matrix shows the 5-card grid leaving a visible
  empty cell, or the spanned card reading as an error rather than as a deliberate shape.
- The grid gains or loses a card for any other reason — the span placement is derived from
  the count of five and does not survive a sixth.

## Sources
- ADR-0006 `DECISIONS/0006-websites-becomes-a-bento-card-superseding-the-no-fourth-pillar-bar.md`,
  read in full 2026-09-04 — specifically its "Open / not yet decided" first bullet, which this
  record answers, and decisions 4 and 5, which it stays inside.
- `~/.claude/agent-reports/A1-structure-blueprint.md` (A1 structure blueprint v3) §0, §2 D3/D4,
  §5 C/D, §7 — the analysis this decision rests on.
- TEAM ALPHA implementation brief, 2026-09-04 — the relay of the owner's instruction. **Not a
  verbatim owner quote**; see the last bullet of Context.
- Source read directly while writing this record: `service-pillars.tsx:80-592`, `:1490-1531`,
  `:1817-1843`, `:1857-1925`; `globals.css:1-9`, `:1422-1531`.
