# ADR-0017: The NWKS stage is an interactive recreation of the admin panel, broken out by tab, on invented data
Status: Accepted — 2026-09-28 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- `src/data/case-studies/nwks-encounter.ts:13-18` rules: the ministry is nameable, the people
  are not; never a count read from the live database; never link or screenshot the admin panel,
  because it is the ministry's own login and the site's Contacts publish real numbers.
- `nwks-encounter.ts:42-49` rejects the org-engine handoff's "50/50 placed" proving run as
  unverifiable and records that the audit tab was removed at the owner's request.
- Owner, 2026-09-28: "There were hundreds of thousands of mobile processes in the Northwest
  Kansas Men's Encounter, and I think you could honestly break them out by tab... even have a
  fake version of the admin panel in there where people can click on the tabs and stuff, and it
  does it all for them." And: "takes them through the journey of 'Here's what it took before,
  here's what we were able to achieve.'"
- A concept strip (2026-09-28, thirteen Chromium frames) showed the Teams board recreated from
  the admin's own stylesheets inside a Preisser mat, with an invented roster and no counts in
  the page's own voice.

## Decision
1. The NWKS case study's Proof Stage (ADR-0016) is a recreation of the admin panel with
   clickable tabs. Each tab is one business case the panel solves (candidates: Dashboard,
   Attendees, Org sheet, Cabins, Email, Lookout) and plays its own before-and-after journey: a
   "before" card in the ministry's old materials, then the tab's screen filling in. A "Take the
   tour" control auto-plays the tabs in sequence with captions; any tab can also be tapped.
2. The recreation is labeled "Recreation · demonstration data" in the window chrome and in a
   caption, and is drawn from the admin's own stylesheets, re-scoped inside the stage, so that
   it looks like their product and never shares a CSS variable with the site.
3. The roster, the towns, the dates and every person are invented and registered in the
   invented-name registry. No count read from the live database appears anywhere; the product
   UI may show counts OF THE INVENTED ROSTER because the real board draws them.
4. Rules of the placement engine are stated qualitatively in the page's voice ("a returning
   server stays where he served"). No figure from the org-engine handoff is published. No audit
   screen is drawn; a check is told as the system checking its own sheet.
5. NOT allowed: a screenshot of the real panel; a real name from any NWKS document; a link to
   the admin domain; a tab that claims a feature the production checkout does not ship
   (verify against `nwks-deploy-main`, the production checkout, never the stale site repo).
6. Phone-first (ADR-0016 §2): the tabbed panel is designed at 390px first; the board becomes a
   lane switcher over one lane on a phone, which is a stage device, not a claim about the
   product's own phone layout.

## Consequences
- The `nwks-encounter.ts` "never screenshot the admin panel" rule stands; a labeled recreation
  on invented data is not a screenshot and review agents must NOT flag it as one.
- Implementers read the admin's stylesheets and components from the production checkout and
  the synthetic seed for shapes, never for data.
- Accepted cost: the largest stage on the site (several tabs, each with a journey).

## Open / not yet decided
- The final tab list and their order (depends on which features verify as shipped).
- Whether the women's program skin is ever shown; one program per stage for now.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The ministry asks that the panel not be depicted.
- A shipped tab is removed from production.

## Sources
- Owner conversation 2026-09-28 (quotes above).
- `src/data/case-studies/nwks-encounter.ts:13-18, 42-49`.
- Concept strip and notes: `~/.claude/agent-reports/ps-showcase-initiative/` (outside this repository).
