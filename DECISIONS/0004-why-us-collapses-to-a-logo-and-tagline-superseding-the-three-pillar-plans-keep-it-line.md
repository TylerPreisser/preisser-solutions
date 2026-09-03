# ADR-0004: Why Us collapses to a logo and a tagline, superseding the three-pillar plan's "keep it" line
Status: Accepted — 2026-09-03 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: Supersedes `docs/plans/2026-08-02-three-pillar-reposition.md` §7 row 6 ("WhyUs | keep; it already works") and its §8 protection of card 2. The rest of that plan stands untouched.

## Context
- `src/components/home/why-us.tsx` (314 lines) is an interactive three-item carousel with a separate
  desktop rendering, a mobile carousel, a swipe hint and an "Item N of 3" live region. Its items are
  "Custom. Built for Your Business." (`:23`), "AI, Harnessed and Under Control." (`:35`) and
  "We Stay With It." (`:47`).
- `docs/plans/2026-08-02-three-pillar-reposition.md` is still `Status: **in build**` (`:38`). Its §7
  row 6 rules WhyUs **"keep; it already works"**, and §8 explicitly protects card 2, "AI, Harnessed
  and Under Control."
- On 2026-09-03 the owner reversed that: *"For the [Why Us] section, I think I'd rather just have the
  one with the Preisser logo and just put 'Our success is yours' or 'Your success is our success.'
  Something along the lines of 'We aim to build long-lasting relationships with our clients,
  providing solutions that are built custom for their business and their needs.' That's the type of
  messaging. Get rid of the other 'Why Us' pages."* He then instructed agents to execute the whole
  overhaul without returning for approvals (ADR-0001).
- Blast radius was measured, not assumed: there are **zero** inbound `#why-us` links anywhere in
  `src/`, `public/` or `scripts/`, and there is no `/why-us` route. `npm run validate:seo` asserts
  `<h1>` presence only and nothing about homepage body copy, so the copy change cannot fail the gate.

## Decision
1. The Why Us section becomes ONE static block: the Preisser mark
   (`public/images/ps-logo.webp`), the tagline **"Your success is our success."**, and one short
   passage about building long-lasting client relationships with custom-built solutions. The
   carousel, its three items, its per-item state and its swipe affordance are removed.
2. The tagline is the owner's own phrasing, not an improvement on it. He offered two; this is the one
   that ships.
3. The section keeps its `id="why-us"` and a single accessible name, so any future anchor still
   lands.
4. Explicitly NOT allowed, and not to be "restored" by a later agent or review pass: re-adding the
   three-item carousel, re-adding card 2 "AI, Harnessed and Under Control." on the strength of §8,
   or citing §7 row 6 as grounds for a defect. Those lines are superseded by this ADR.
5. "Get rid of the other Why Us pages" is scoped to the sibling carousel panels. **No route is
   deleted.** `/why-automation` is indexed and untouched — it was never part of this section.

## Consequences
- Implementers: `why-us.tsx` loses its client-side state. If nothing interactive remains, the
  `"use client"` directive goes too and it ships as a server component; `page.tsx` mounts it through
  `dynamic(..., { ssr: true })`, which still works for a server component.
- Review agents must NOT flag the removal against the three-pillar plan, and must NOT recommend
  reinstating the carousel. Objections belong under "Decision Concerns" citing ADR-0004.
- The carousel's CSS in `globals.css` is left in place by this change and becomes dead. It is
  inventoried for a separate cleanup pass rather than deleted mid-overhaul, because several agents
  were editing that file concurrently. Note the duplicated `!important` breakpoint block at
  `globals.css:6758` shadowing `:3332` in this area.
- Cost accepted: three specific proof points are traded for one relationship message. The owner
  judged the messaging, and reversal is a git revert.

## Open / not yet decided
- Whether the three removed claims should resurface anywhere else on the site. The owner did not say,
  and this ADR does not relocate them.
- The fate of the now-dead Why Us CSS, and of the stale `docs/design-system.md` §8 homepage section
  table, which recon found contradicts the code on container width, section padding, heading scale
  and background alternation.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner asks for the proof points back, or measured engagement shows the single block converts
  worse than the carousel did.

## Sources
- Owner instruction, conversation, 2026-09-03 (quoted above).
- `docs/plans/2026-08-02-three-pillar-reposition.md` §7 row 6 and §8, `Status: in build` at `:38`.
- `src/components/home/why-us.tsx:23,35,47,100,106-109,221`.
- Inbound-link and `validate:seo` checks run 2026-09-03.
