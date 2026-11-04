# ADR-0023: The showcase window opens centred and large, so the live site renders its desktop layout
Status: Accepted — 2026-11-04 (lead decision implementing the owner's 2026-11-03 direction in ADR-0022) — Owner: Tyler Preisser
Supersedes / Superseded by: supersedes ADR-0020's placement clause (the window opens beside the card) and ADR-0022's line keeping that placement; ADR-0020's glass window stands

## Context
- ADR-0022 makes the Website tab the client's live site in a frame the visitor scrolls and clicks. Owner, 2026-11-03:
  "when I hover over one of the cards, the deal should pop up pretty, but then I should be able to scroll through the
  website and do what I want."
- Beside the card, the window's frame is capped near 690 px wide, so every client site renders its TABLET layout, not the
  desktop site a visitor on a desktop expects (design spec §1.1, measured 2026-11-03 at 1440x900 and 1280x800).

## Decision
1. On a fine pointer at 900 px and wider, the window opens centred over a scrim: width `min(innerWidth - 96, 1248)`,
   height `min(innerHeight - 64, 940)`. The live site renders at least 1024 CSS px wide and is scaled to fit below that.
2. Hover still opens it (after 280 ms of resting with real pointer movement and no recent wheel), it stays open while the
   pointer is anywhere inside it, including inside the client's site, and closes 400 ms after the pointer leaves. Opened by
   click or key, it closes only by the close button, Escape or the scrim. Page scroll is locked while it is open.
3. The site counts as live only when the client page says so (a `ps-portal-ready` message from an allowed origin); until
   then, and if it never does, the window shows the dated still with an "Open site" link.
4. Phones and touch keep the bottom sheet.

## Consequences
- The window covers the "Real Projects" row while open; the visitor returns to the cards by leaving or closing it.
- Every client site carries a one-line ready message when framed; a site without it shows its still.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner prefers the window beside the card, accepting the tablet layout.
- Visitors open the window by accident while scrolling the page (hover intent measured live).

## Sources
- Owner direction 2026-11-03 (ADR-0022 Context).
- Design spec `design-spec.md` §1.1, §2.1-2.2, §3.5 (renders and probes, 2026-11-03/04).
