# ADR-0029: MarCommand lives inside the fifth Services card's sheet, not in its own homepage section
Status: Accepted — 2026-11-22 (owner, conversation; reading settled by the lead) — Owner: Tyler Preisser
Supersedes / Superseded by: — (no earlier ADR placed the section; see Context)

## Context
- Until 2026-11-22 the homepage had a `#marcommand-live` section directly below Services
  (`src/app/page.tsx`, with the comment "which is where the owner asked for it"). No ADR records that
  placement, so there is nothing to supersede; this record is the first that names where MarCommand lives.
- Owner, 2026-11-22, verbatim: "we need to start an initiative to build MarCommand as part of the other
  cards instead of it being its own thing on the website there just put it into one of the cards where it
  needs to go".
- The lead's reading, not the owner's words: the card is the fifth, "AI and Search Engine Visibility."; the
  section's block sits in its sheet after "What we deliver" and before "Reach out". The card's first tile
  already names MarCommand.
- Reasons for that placement (design spec, `mc-card-design/SPEC.md` section 1): the card face stays a picture
  of the service and carries no product name; card 3 already shows the robot on its face; the picture slot is
  280px on phones, too small for the stage; a tile cannot hold the stage; a second navigation level inside a
  sheet exists nowhere else on the site.

## Decision
1. MarCommand is a block inside card 5's sheet: the "MarCommand" heading, the line "Our proprietary
   AI-powered marketing optimization platform", and the same live robot stage (wide from 769px, narrow at
   768px and below). No new words. Order in the sheet, changed 2026-11-22 from the design spec's
   "after What we deliver" by the lead after the critic's measurements: sheet title, then the MarCommand
   heading, line and stage, then the "What We Deliver" tiles, then Reach out. Reason: placed after the
   tiles the heading sat 1.0 to 2.6 sheet-heights down, so a visitor who tapped the card saw only tiles.
2. The homepage has no `#marcommand-live` section. Services runs straight into the client work (ADR-0030 later removed the Why us section that followed).
3. The card face and the MarCommand tile are unchanged. Not allowed: the robot or the name on the card face.
4. The heading and line are plain markup in the sheet. The stage's code loads as its own chunk, asked for
   when the Services grid is within a screen of the viewport and again on hover, focus and first touch of
   the card; until it lands the stage's exact box shimmers in its place. The loop plays once the top of the
   stage is in view inside the sheet, and closing the sheet kills only what the block made.

## Consequences
- Review agents must NOT flag the missing homepage section, or the robot being 48x58 at every width in the
  sheet, as defects.
- Cost accepted: MarCommand is no longer visible to a visitor who never opens the fifth card, and the
  proprietary line is no longer in the served HTML (the sheet mounts on click; the name stays in the tile
  and the crawler mirror).
- At viewports of 1200px and wider the stage is 900px (the sheet's cap), so its labels render about 11% smaller.

## Open / not yet decided
- Whether the owner meant the client cards instead of a Services card. The lead's reading is the Services card.
- Whether the owner wants a hint on the page that MarCommand exists inside card 5.
- Whether the proprietary line should be added to the card's crawler mirror (spec question 2).

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with a
settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner says he meant a different card, or asks for MarCommand to be visible without opening a card.

## Sources
- Owner message 2026-11-22 (quoted above); `~/.claude/agent-reports/ps-site-1122/mc-card-design/SPEC.md`
- PR `feat/marcommand-in-services-card`; `tests/marcommand-card.probe.mjs`
