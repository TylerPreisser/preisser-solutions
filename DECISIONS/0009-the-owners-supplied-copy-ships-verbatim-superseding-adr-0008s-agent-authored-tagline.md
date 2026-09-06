# ADR-0009: The owner's supplied copy ships verbatim, superseding ADR-0008's agent-authored tagline
Status: Accepted — 2026-09-04 (conversation, owner quoted directly) — Owner: Tyler Preisser
Supersedes / Superseded by: **Supersedes ADR-0008 in full.** ADR-0008's Decision 3 (the tagline) and Decision 1 (the one-word deletion) are both reversed. ADR-0004's Decision 2, that the tagline is the owner's own phrasing and not an improvement on it, is **reinstated and is the governing rule.**

## Context
- ADR-0004 (2026-09-03) chose the Why Us tagline **"Your success is our success."** for one stated reason: *"The tagline is the owner's own phrasing, not an improvement on it. He offered two; this is the one that ships."*
- ADR-0008 (2026-09-04) replaced it with **"In it for the long term."** — a line no human had written. ADR-0008's own Decision 4 said so in terms: *"THE NEW TAGLINE IS AGENT-AUTHORED. The owner did not choose this string and has not seen it."* It was listed first under that ADR's "Open / not yet decided" as the most likely thing to be reversed.
- It was reversed, on sight, by the owner:
  > *"Why did you change the messaging for the why us section when I specifically told you what to put? It's not 'in it for the long term' it is your success is our success thing dude"*
- The same pass had also edited his Why Us paragraph, deleting the article from *"after the launch"* to cure a measured wrap widow, and had rewritten the Get in Touch body. On the second:
  > *"The text for get in touch, the paragraph below is SO poorly written — follow what I fricken said"*

## The failure this record exists to prevent
**Three agents independently reasoned their way into changing copy the client had supplied.** One tightened his Why Us paragraph and silently dropped *"solving their business problems"*. One replaced his heading with a line of its own. One reviewed that replacement adversarially, rendered it at four viewports in three engines and two themes, and **approved it**.

**Every individual step was defensible. The aggregate was wrong.** The render evidence was real: the agent line fit on one line at every width and his paragraph genuinely widows at 375x667 and 360x640. None of that mattered, because the question was never which sentence renders better. **When the owner supplies exact words, "we found a better version" is not a decision any agent gets to make.** A measured improvement to a client's own sentence is still an unrequested rewrite of a client's own sentence.

The governance did work, partially and too late: ADR-0008 recorded the tagline as agent-authored, flagged that he had not seen it, and named it the most likely thing to be reversed. **Writing the risk down is not the same as not taking it.**

## Decision
1. **The Why Us tagline is "Your success is our success."** — the owner's phrasing, restored to `why-us.tsx` `<h2 id="why-heading">`. The split-span structure (`Your success is{" "}` + `<span className="ps-why-relationship__accent">our success.</span>`) is retained so the accent styling applies, and **`id="why-heading"` survives** as the `aria-labelledby` target at `why-us.tsx:24`.
2. **The Why Us paragraph is the owner's text, verbatim, including "after the launch".** The article deleted under ADR-0008 Decision 1 is restored. **The known cosmetic cost is accepted:** with "the" present, at 375x667 and 360x640 the paragraph runs 8 lines with a short last line, and the engines disagree (Chromium 27% / Firefox 18% / WebKit 75% of measure). `text-wrap: pretty` is applied and does not fix it. That cost is the owner's to carry or change, not an agent's to optimise away.
3. **"It keeps making them more efficient" keeps its pronoun.** The ambiguous-referent objection was raised and is not grounds for editing his sentence.
4. **The Get in Touch body is the owner's phrasing**, replacing the agent-written paragraph. It is longer than what it replaces and that is accepted. The eyebrow and `<h2 id="cta-heading">` above it are untouched — he likes the top of that section.
5. **No em dashes** anywhere in the restored copy; commas and colons only. The site is at zero site-wide and stays there.
6. **Explicitly NOT allowed, by any agent, for any reason including a passing render:** substituting a different tagline; tightening, re-balancing or shortening either paragraph; deleting an article, a pronoun or a clause to fix a wrap; "fixing" the referent of *It*; or treating a measured layout improvement as authority to edit owner-supplied words. **If the copy causes a layout problem, measure it, report the measurement, and leave the text alone.** The owner decides.

## Consequences
- Implementers: two nodes in `why-us.tsx` and one in `cta-section.tsx`. No CSS, no new class, no dependency.
- Review agents must **not** flag the restored tagline against ADR-0008, must **not** flag "after the launch" as a dangling article, and must **not** flag the Why Us widow as a defect. All three are this decision.
- **Cost accepted, stated plainly:** the Why Us paragraph widows on two phone widths and the Get in Touch body is materially longer than the block it replaces. Both are known, both are measured, and both are the owner's call.
- A future agent that finds a better-reading alternative should record it under "Decision Concerns" and stop. That is the whole mechanism.

## Open / not yet decided
- Whether the owner wants anything done about the 375x667 / 360x640 widow now that it is back. Measured and reported to him; not acted on.
- Whether the longer Get in Touch paragraph wraps acceptably at every width. Measured at 320, 360, 375, 390 and 1440 in three engines and reported; **not shortened.**
- Real Safari has still never been run on this section anywhere in this project.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner supplies different words, or asks for the widow to be addressed.
- Nothing else. A render, a metric, a style guide or an adversarial review is **not** a revisit criterion for owner-supplied copy. That is the specific mistake ADR-0008 made.

## Sources
- Owner instruction, conversation, 2026-09-04, both quotes reproduced verbatim in Context.
- `DECISIONS/0008-...md` — superseded in full; its own Decision 4 and first open item predicted this reversal.
- `DECISIONS/0004-...md` — its Decision 2 is reinstated as the governing rule.
- Source read directly: `why-us.tsx` (`:24` aria-labelledby, the `<h2>` node, the copy node),
  `cta-section.tsx` (`:60` eyebrow and `:61-63` heading confirmed untouched).
