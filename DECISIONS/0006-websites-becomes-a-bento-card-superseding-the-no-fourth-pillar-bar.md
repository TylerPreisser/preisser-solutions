# ADR-0006: Websites becomes a bento card, superseding the no-fourth-pillar bar
Status: Accepted — 2026-09-03 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes ADR-0003 decision 3 (the bar on "adding a fourth pillar to `service-pillars.tsx`") and ADR-0003 decision 1's requirement that the offering ship as a separate secondary band. Also corrects ADR-0005's citation of `page.tsx:104-107`. The rest of ADR-0003 and ADR-0005 stands.

## Context
- ADR-0003 (Accepted earlier the same day) ruled websites/marketing would ship as a compact
  secondary band **below** the pillars, and explicitly barred "adding a fourth pillar to
  `service-pillars.tsx`". Its stated Revisit criterion was: *"The owner asks for websites to lead
  the positioning."*
- That is what then happened. The owner, 2026-09-03, after seeing the shipped band:
  > "there needs to bee website redesign bento cards below the other three."
  > "the websites and marketing section should be a bento card up there beuatiful like th eothers
  > (we used to have some others you can probably just go get so we do not need this websites and
  > marketing section."
- Recon established the history. Commit **`7a8393b`** collapsed the pillars from five cards to
  three; its message reads *"Service pillars collapse 5 to 3. 'Revenue Growth Engines' is deleted
  entirely; dashboards and business intelligence fold into Business Software."* `globals.css:1585`
  still confesses the grid "was written for a five-card grid."
- **Two of the removed visuals were never deleted.** `src/components/home/card-visuals-backup.tsx`
  is misnamed — it is **live**, imported at `service-pillars.tsx:9` — and it exports
  `WebsiteVisual()` (`:21`) and `RevenueVisual()` (`:713`), which nothing imports. Their CSS is
  still live in `card-visuals.css` via `globals.css:2`. The file's own header says the visuals were
  preserved so they could be "imported into a rebuilt card grid structure without losing the
  animations."
- The live bento is `BentoCard()` at `service-pillars.tsx:1230`, mounted once as `.ps-bento-grid`
  at `:1656`; plain CSS grid at `globals.css:1485`, 1 col → 2 @640 → 3 @940.

## Decision
1. Websites/marketing ships **as bento card(s) in the pillar grid**, not as a separate band. The
   standalone `websites-and-marketing.tsx` section and its stylesheet are removed once the cards
   carry the content.
2. The bar in ADR-0003 decision 3 is lifted. The pillar grid may hold more than three cards. The
   grid's CSS was written for five, so this is a restoration of its intended shape.
3. **Recover the pixels, rewrite the words.** `WebsiteVisual()` and `RevenueVisual()` are adopted
   from `card-visuals-backup.tsx` as-is. The *copy* from `git show 7a8393b^:src/…/service-pillars.tsx`
   is NOT reused: it was written for an abandoned positioning, and `docs/WRITER-AGENT-PROMPT.md:31`
   gates quantified claims. New copy is written against pages that exist.
4. Explicitly NOT allowed: reviving "Revenue Growth Engines" as a positioning line; reusing any
   quantified claim from the pre-`7a8393b` copy without re-verifying it; inventing a visual for a
   card that has none rather than designing one; leaving the hero `<h1>` or the JSON-LD slogan
   changed — **those still stay as they are.** This ADR moves cards, not the positioning sentence.
5. The one exception: if the recovered grid cannot hold the new card count without breaking the
   940px breakpoint contract, the grid may be re-derived — but `940px` remains the breakpoint.

## Consequences
- Implementers: `service-pillars.tsx` gains cards; `websites-and-marketing.*` is deleted; only two
  orphan visuals exist for more cards than that, so some cards need new visuals designed.
- Review agents must NOT flag the fourth-plus card as violating ADR-0003 — cite this ADR instead.
- Cost accepted: ADR-0003 was Accepted and superseded the same day. That is the mechanism working,
  not a failure — its Revisit criterion fired exactly as written.

## Open / not yet decided
- How many cards the grid ends at, and which of the six service destinations earn one.
- Whether `RevenueVisual()` is appropriate at all, given decision 4 bars the positioning it was
  built for. It may be a visual in search of a card.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- The owner asks for the pillars to return to three, or the grid measurably hurts comprehension.

## Sources
- Owner instruction, conversation, 2026-09-03 (quoted above).
- Commit `7a8393b` message; `globals.css:1485,1585`; `service-pillars.tsx:9,1230,1656`;
  `card-visuals-backup.tsx:21,713`.
- Recon report `~/.claude/agent-reports/bento-recon.md`, which also corrects ADR-0005: the homepage
  service-link array is at `page.tsx:158-165` with **6** links, not `:104-107` with 4.
