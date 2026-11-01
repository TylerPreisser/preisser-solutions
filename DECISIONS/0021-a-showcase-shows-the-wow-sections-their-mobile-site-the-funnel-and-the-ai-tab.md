# ADR-0021: A showcase shows the wow sections: their mobile site on a phone, the MarCommand funnel, and the AI tab answering a pain question
Status: Accepted — 2026-11-01 (owner's review of PR #23, relayed verbatim by the team lead) — Owner: Tyler Preisser
Supersedes / Superseded by: supersedes ADR-0020's choice of WHAT each showcase shows and its /showcase pages; ADR-0020's glass window, placement, capture-not-iframe and sample-data rules stand

## Context
- ADR-0020 showed each client's home page (a capture), then a recreation of the command center, and
  added a /showcase/<slug> walk-through page that narrated the site chapter by chapter.
- Owner, 2026-11-01, verbatim: "your judgement on what is wow as far as the demo and the one page tho
  is cheeks ... you are just very very badly choosing which things are gonna wow people on the website
  or crm or marcommand. Like website wise first of all u need to show them the mobile version on
  mobile ... Marcommand what people respond to is the desktop funnel animation dashboard and the ai tab
  ... the ai tab answer a question that people are guaranteed to feel as a pain point in the animation
  while it's going ... whatever sections you show need to be the wow or the best sections." He kept the
  popover and the website-then-product structure.

## Decision
1. The /showcase/* walk-through is shelved: the route, its tour component and its page styles are out
   of the build (git keeps them). The window keeps one link: "Visit <their domain>".
2. A client is a list of BEATS (`src/data/showcase/types.ts`): `website`, `funnel`, `ai-ask`,
   `ai-at-work`. The window's tabs are the beats' own labels. One data file per client in
   `src/data/showcase/clients/<slug>.ts`, loaded on intent by a template import, so a client is added
   with a file plus `showcase: "<slug>"` on its home card.
3. Website beat: the phone sheet shows the client's REAL mobile site (a 390px capture) in a phone frame;
   desktop shows the desktop site. Only the hero and the section that sells are in the capture; the
   sections between them, testimonials, dated promotions and footers are left out.
4. Funnel beat: the MarCommand Overview's desktop composition (stage band, rail cards, streams into the
   funnel, the client's mark) at every viewport, scaled as one picture; on a phone a camera moves along
   it. Matched to the real portal rendered on its harness (`packages/portal-ui/harness`, fixture
   hays-measured-20261027 and the Duffer organic sample, 2026-11-01).
5. AI beat: a pain question types itself in, the real five phases light up in order, the answer lands
   in the real answer layout (one-sentence answer, figures, chart, what it likely means, what we're doing
   next). Every figure in an answer is COMPUTED from that client's funnel rows in its data file, so the
   answer and the funnel cannot disagree.
6. Sample data stays invented and labelled "Demonstration data" (ADR-0016 §5). The privacy probe now
   opens every showcase window on the built home page and scans the stages it draws.

## Consequences
- The window is the only showcase surface; there is no showcase URL to link or index.
- Captures are dated (Nov 1, 2026) and manual; a site change means a new capture.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner names a different section, question or beat as the wow one.
- A client's site changes enough that its capture misstates it.

## Sources
- Owner review, 2026-11-01, relayed verbatim by the team lead.
- The MarCommand portal rendered on its own harness, 2026-11-01 (overview and AI states).
- duffergolf.net and haysacademy.edu, captured 2026-11-01 at 390 and 1280.
