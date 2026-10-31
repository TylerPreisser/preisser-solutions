# ADR-0020: Each product is showcased as its public website, then the command center we built, on sample data only
Status: Accepted — 2026-10-31 (owner's brief to the team lead, conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: — (narrows ADR-0016 §3 and §7 for the /showcase surface only; ADR-0016 still governs case-study Proof Stages)

## Context
- The home "Real Projects" cards describe each client in a hover/tap panel with one outbound link
  (`src/components/home/case-studies.tsx`, ADR-0002). Nothing on the card shows the work itself.
- ADR-0016 lets a case study carry a Proof Stage of a recreated product screen on invented data, and
  forbids "screenshots of a real product screen" (§7) and scroll pinning or scrubbing (§3).
- Owner, 2026-10-31, verbatim: "with sample data, showcase each product. You'll have it where like
  maybe you hover over a computer, you hover over the duffer golf cart, and it pops up this beautiful
  liquid glass, poppy, animating, beautiful animation in and it shows their website. And then it slides
  over and shows their command center we built them. Or if you click on it and go to a different page,
  maybe that's what it does, right? And it has, you know, a portal where you can scroll through their
  website and it's part of the page while it describes things that are going on. And the different
  psychological nature of how the website works." Also: "Anything you write on my website ... they have
  to know it came from me and never know it came from you."
- Evidence on embedding: `duffergolf.net` answers `x-frame-options: DENY` and
  `frame-ancestors 'none'` (curl, 2026-10-31), so a live iframe of a client site cannot work in
  general. A captured render can.

## Decision
1. A product with BOTH a public website we built AND a command center we built may get a showcase:
   the home card opens it (a glass window on a fine pointer at 900px and up, a sheet on touch or
   narrower), and `/showcase/<slug>` walks through it. Duffer Golf and Hays Academy first.
2. The website half is a CAPTURE of the client's live public site, dated in the frame, with every
   testimonial (real customer or student names), dated promotions and footers left out. It is the
   client's public marketing page, not a product screen with customer data. This is the one exception
   to ADR-0016 §7, and it covers public marketing pages only.
3. The command-center half is a RECREATION on invented data under every ADR-0016 §5-6 rule: names
   from `src/data/demos/invented/<slug>.ts`, totals derived, one "Demonstration data" label, a
   narration, and the private deny list applied. Never a screenshot of a real command center, never a
   real figure from it.
4. On `/showcase/<slug>` at 1024px and up, the website frame is sticky and moves to the section the
   narration is discussing. The move is time-based (fires on chapter change), never scrubbed by scroll
   position. Under 1024px there is no sticky frame: each chapter carries its own frame. Reduced motion
   cuts every move. This is the one exception to ADR-0016 §3, scoped to `/showcase`.
5. NOT allowed: an iframe of a client site; a showcase for an anonymized client (ADR-0002 holds);
   a deny-listed name inside a stage, even when the client is named outside it (the Hays name is on
   the deny list as a ps-admin client, so the portal recreation shows the school's mark, not its name).

## Consequences
- The home page loads the showcase only on intent: a dynamic chunk plus a capture image, warmed on
  hover or tap. The home route's first-load JS grew 1.3 kB (72.2 -> 73.5 kB) for the handlers.
- `tests/demo-privacy.probe.mjs` now also scans `out/showcase/*.html` and fails closed when the route
  exists in source but not in the export.
- Review agents must NOT flag: a capture of a client's public home page inside `/showcase`; the sticky
  frame on `/showcase` at 1024px and up; a showcase card that opens a window instead of the in-card panel.

## Open / not yet decided
- Whether the owner keeps the popover-on-hover or wants hover to go straight to the page. He offered
  both ("Or if you click on it and go to a different page, maybe that's what it does").
- Which products come next (FarmBooks, NWKS Encounter, HG Oil have command centers; HG Oil's public
  site is not ours).
- Whether captures are refreshed on a schedule; today they are dated and manual.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner rejects the prototype on review, or asks for live iframes or real figures.
- A client site changes enough that its capture misstates it.

## Sources
- Owner brief, 2026-10-31, relayed verbatim by the team lead.
- `curl -sI https://duffergolf.net` 2026-10-31: `x-frame-options: DENY`, CSP `frame-ancestors 'none'`.
- `docs/showcase-design.md` (the design spec and its measured acceptance criteria).
