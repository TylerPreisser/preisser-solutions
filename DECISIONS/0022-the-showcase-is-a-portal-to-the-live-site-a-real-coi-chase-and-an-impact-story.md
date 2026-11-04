# ADR-0022: The showcase is a portal to the live site, a real COI chase, and an impact story
Status: Accepted — 2026-11-03 (owner's direction, dictated) — Owner: Tyler Preisser
Supersedes / Superseded by: supersedes ADR-0021 §3 (website beat = a capture) and its "Close"/scene tabs, and ADR-0020's capture-not-iframe rule for the website beat; ADR-0020's glass window and placement, and ADR-0021 §4-6 (funnel, AI ask, sample data) stand

## Context
- The home "Real Projects. Real Results." cards open a showcase window per client (ADR-0020/0021). The
  website beat played a dated capture as an animation; HG Oil's product beats were drawn scenes ("COI",
  "Close") over a drawn pumpjack; NWKS showed "Beds"; FarmBooks showed a bill scene.
- Owner, 2026-11-03, dictated (excerpts): "no one's believing because we don't have a realistic looking
  form ... you're showing an animated ACORD 25 instead of a real ACORD 25 and showing it scanning it and
  then showing all the things it extracts and then showing it hunting those people down. You have to show
  like, hey, we need your insurance email going out. They email back, the AI responds, they email back ...
  then they shoot this out." "The animation for the background of HG Oil Holdings, that oil well is hyper
  unrealistic." "No one even knows what the close tab means ... instead of having an animation video, just
  let people scroll. Let it be a portal to the website and let people scroll through and click what they
  want." "When I hover over one of the cards, the deal should pop up pretty, but then I should be able to
  scroll through the website and do what I want." "On the close, just show a big statement: what did we
  automate? How much work did we automate? ... which used to take however many people and however many
  hours. COIs, what does it do? How long did it used to take? Tell that story. Tell it as text if you need
  to." Duffer: MarCommand and "the Command Center functionality with the displays and with the dealers".
  Hays: "website, MarCommand, AI". NWKS: "website you can click around on, and then not beds, but text
  telling a story. What did we do? What did we achieve? How much time did we save?" FarmBooks: "same thing."

## Decision
1. Tabs: HG Oil = Website | COI | Impact. Duffer Golf = Website | MarCommand | AI | Impact. Hays Academy =
   Website | MarCommand | AI. NWKS Encounter = Website | Impact. FarmBooks = Website | Impact. "Funnel" is
   renamed "MarCommand". The "Close", "Beds" and FarmBooks bill scenes leave the showcase.
2. Website beat: the client's LIVE site in an iframe, loaded on intent, that the visitor scrolls and clicks.
   Nothing on it auto-advances. The capture stays only as the loading and fallback picture. Each client site
   allows framing by preissersolutions.com alone (CSP frame-ancestors) and skips its analytics and ad pixels
   when framed, so portal visits never count as their traffic.
3. Impact beat (new kind `impact`): text tells the story. What the system does as a few verb lines, what it
   replaced (people, hours, how often), and what it takes now. Every number has an outside source (the
   owner's or client's own words, a measured live result, or a number already published here); a number
   with no source is not shown.
4. HG Oil's COI beat shows a realistic ACORD 25 on invented names, the fields it reads, then the email chase
   in a real mail layout, in the engine's own template wording: the ask goes out, the vendor replies, the AI
   answers, the certificate comes back, it is read and filed.
5. The drawn pumpjack backdrop and mark go.

## Consequences
- The window now depends on five client sites' headers; a site that refuses framing shows its capture.
- A client site change shows up in the window immediately; captures only need refreshing for the fallback.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement
with a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner names a different tab, story or number.
- A client asks that their site not be framed, or framed visits show up in their analytics.

## Sources
- Owner direction, 2026-11-03, dictated in the session that built this change.
- Client site headers measured with curl, 2026-11-03 (duffergolf.net DENY, haysacademy.edu and farm-books.com SAMEORIGIN).
