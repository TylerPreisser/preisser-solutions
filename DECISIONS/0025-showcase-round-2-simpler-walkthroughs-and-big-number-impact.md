# ADR-0025: Showcase round 2 — simpler product walkthroughs per client, and Impact as big before/after numbers
Status: Accepted — 2026-11-04 (owner's first impressions of the live showcase, dictated in the session that shipped ADR-0022) — Owner: Tyler Preisser
Supersedes / Superseded by: supersedes ADR-0022 §1 (tab sets), §3 (Impact told as text) and §4 (the COI tab includes the email chase); ADR-0022 §2 (live portal) and §5, and ADR-0023, stand

## Context
- ADR-0022 shipped 2026-11-04 (Pages 3fd5e3e3). Owner, 2026-11-04, after looking at it (excerpts):
  HG: "The follow-up doesn't need to be part of the COI tab ... the renewal could be a faster scan through, and it just shows
  a green checkmark ... correct effective dates. Correct coverage. It's good to go, and then shows it like filing it into the
  system ... the COI somehow like animating into a folder ... same thing on the finds the gap. I don't find that to be super
  clear." "that tab probably shouldn't be COI, it should probably be Vendor liability engine or vendor insurance engine or
  whatever would resonate with most people in that space."
  Impact: "super clear metrics, percentages, time savings. Boom, right at the top, big numbers ... no one's going to read
  through all that." "What the time used to be before, what the money used to be before ... cross them out, and then new big
  new numbers."
  Duffer: "biggest thing is their command center ... screenshots with stale data ... how the infrastructure works ... an
  animation of humans scanning a QR code at a golf store and how that boom instantly lands in our system ... this person from
  this place scanned this ... or it's a renewal, or it's like an engine that gets money back to the golf course." "impact ...
  show the impact as that video ... and then the impact page can literally just show the metric improvements."
  AI tabs: "people are going to want to see the top section where the little robot guy goes and gets everything, and then
  you can have like the answer animate in in a pretty way."
  MarCommand tabs: "show MAR Command making adjustments and adjusting knobs ... show a robot learning and making adjustments
  ... just like it does up on the top of ... the Preisser Solutions website itself."
  Hays: "The website needs to animate in the hair products when the little thing that you hover over pulls up."
  NWKS: "it doesn't need to just be a cabin plan ... It just needs to show the metrics ... one tab that shows the
  administration panel ... the executive dashboard ... animate through and show you the different views ... more just like
  a screen recording, us clicking through."
  FarmBooks: "operate like the HG COI thing ... an actual random bill coming in ... extracting it and ... delegating it out by
  farm field ... producing the executive dashboard summary ... a sales pitch software walkthrough."
  Bugs reported: Duffer site "not scrollable" in the window; on desktop the hover window is "not wanting to stay up when I
  move my mouse"; NWKS "trouble with it animating up correctly and actually working".

## Decision
1. Tabs. HG Oil = Website | Vendor Insurance | Impact. Duffer Golf = Website | Command Center | MarCommand | AI | Impact.
   Hays Academy = Website | MarCommand | AI. NWKS Encounter = Website | Admin | Impact. FarmBooks = Website | Bills | Impact.
2. HG Vendor Insurance: a certificate arrives, a fast scan ticks each check green (coverage type, effective dates, limits,
   holder), "good to go", and the certificate files itself into the vendor's folder. No email chase, no gap step.
3. Impact (every client that has it): big before -> now numbers at the top, the old number struck through, the new one large;
   text below is optional and short. Duffer's Impact leads with the QR-scan story (a golfer scans a display in a shop, the
   scan lands in the system with who/where/what, and money flows back to the course), then the numbers.
4. Product walkthroughs (Vendor Insurance, Bills, Admin, Command Center) are show-don't-tell: real screens on demonstration
   data, clicked through like a screen recording; captions optional.
5. AI tabs: the agent fetches its sources visibly at the top, then the answer animates in. MarCommand tabs: the engine is
   seen adjusting its knobs and learning, in the language of the home page hero.
6. A number on Impact still needs an outside source (ADR-0022 §3 stands on this point); the owner's own figure is a source.

## Consequences
- New scene kinds for Bills, Admin and Command Center; the COI scene is rebuilt shorter.
- Impact's layout changes for every client; slots without a sourced number stay hidden.

## Open / not yet decided
- The before/after numbers themselves (hours, people, money) for HG, Duffer, NWKS and FarmBooks: requested from the owner.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner names a different tab, walkthrough or number.

## Sources
- Owner message 2026-11-04 (dictated first impressions), session 27aef2f4.
