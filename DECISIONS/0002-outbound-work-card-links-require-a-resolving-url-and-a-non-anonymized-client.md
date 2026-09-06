# ADR-0002: An outbound work-card link requires a resolving URL and a client we do not anonymize
Status: Accepted — 2026-09-03 (conversation) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- The owner asked for every "Our Work" card to gain a tap-to-reveal description plus *"a link at the
  bottom of that card where I can tap it and go to the actual Farm Books showcase website"*, naming
  FarmBooks, Iron & Oak, Cassidy, HG Oil, Wife Supply Co, Sunrise, and "maybe Astrus"
  (conversation, 2026-09-03), and then instructed agents to execute without further approval
  (ADR-0001).
- Two constraints already stand in the code. `src/components/home/case-studies.tsx:29-32` states:
  *"The two anonymized clients stay anonymized."* Those two are the Alliant-ecosystem MGU (Astrus)
  and the Chicago-area bus operator (Sunrise Transportation) — both are displayed with anonymized
  titles by deliberate policy. Adding an outbound link to either card defeats that anonymization,
  because the destination names the client.
- Link-target reality, measured 2026-09-03: `https://farm-books.com` → 200 (Cloudflare);
  `https://theironandoakpodcast.com` → 200 (Cloudflare); `https://wifesupply.co` → **does not
  resolve** (`dig` returns no A and no NS record; `curl` reports "Could not resolve host"), although
  the domain registration is ACTIVE.
- Cassidy HVAC (reactivation engine), HG Oil Holdings (inventory system) and the Alliant MGU
  (submission processing) are internal business systems, not public showcase websites. There is no
  public URL for a visitor to be sent to.

## Decision
1. A work card gets a live outbound link only when BOTH hold: (a) the destination URL resolves and
   returns 2xx at build time, and (b) the card is not one of the anonymized clients.
2. Under that rule, the cards that get an outbound link now are **FarmBooks** (farm-books.com) and
   **The Iron and Oak Podcast** (theironandoakpodcast.com). Every other card gets the tap-to-reveal
   description with no outbound link.
3. Explicitly NOT allowed, and not to be "fixed" by a later agent: adding an outbound link to the
   Alliant MGU card or the Chicago bus operator card (breaks `case-studies.tsx:29-32`); adding a
   link to Wife Supply Co while wifesupply.co does not resolve (ships a dead link on the homepage);
   inventing a plausible-looking URL for a client system that has no public site.
4. The link is carried on a NEW field (`liveUrl`), never by overloading the existing `href`. `href`
   means "our internal case-study page" and several cards depend on that meaning.
5. The exception: the Wife Supply Co card gains its link automatically once wifesupply.co resolves
   and returns 2xx. That is a DNS/hosting fix tracked as separate work, not a website change.

## Consequences
- Implementers: `liveUrl` is populated on exactly two cards. The reveal interaction is built for all
  ten regardless, so the field can be filled in later with no component change.
- Review agents must NOT flag the eight cards without `liveUrl` as an incomplete implementation, and
  must NOT recommend adding links to the anonymized clients.
- Cost accepted: the owner asked for links on more cards than will get them. The gap is a property of
  the destinations, not of the implementation, and the mechanism is ready for each one.

## Open / not yet decided
- Whether the owner wants the anonymization policy in `case-studies.tsx:29-32` lifted for Astrus and
  Sunrise. That is his call about client confidentiality and is NOT settled here; this ADR only
  records that an agent will not lift it unilaterally.
- Who restores wifesupply.co, and whether the live site should be the local Express/lowdb app at
  `~/Projects/Coding Projects/Dev-Projects-legacy/wife-supply-co` or a rebuild.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding.

## Revisit criteria
- wifesupply.co starts resolving; the owner lifts the anonymization rule; or a client system gains a
  public marketing site worth linking to.

## Sources
- Owner instruction, conversation, 2026-09-03.
- `src/components/home/case-studies.tsx:29-32` — the standing anonymization rule.
- Live checks run 2026-09-03: curl status codes and `dig` output for the three domains above.
