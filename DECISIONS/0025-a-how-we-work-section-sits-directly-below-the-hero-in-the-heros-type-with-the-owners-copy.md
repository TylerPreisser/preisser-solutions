# ADR-0025: A "How We Work" section sits directly below the hero, in the hero's type on the opposite side, with the owner's copy verbatim
Status: Superseded by ADR-0026
Supersedes / Superseded by: —

## Context
- Before this, the first section after the hero was Services (`src/app/page.tsx`, `<ServicePillars />`). The hero says what the company sells ("Business Software. Business Automation. AI Integration.", `src/data/site-config.ts:109`) and nothing on the first two screens said how it works with a client.
- The owner asked for the section on 2026-11-21, after a conversation with a contact (Granola, 2026-11-21, "Efficiency improvement strategies") in which he described his model: learn the business first, build one system for it, and stay with it afterwards.
  > "I think right below hero it should say on opposite alignment the exact same formatted test as business software, business automation."
- He settled the three lines over several rounds, replacing agent drafts each time:
  > "what ab waremer like leraning and unerstanding and building relationship all at once is there a word for that. then u do build a custom solution, whats the end here"
  > "at the end stand behind it."
  > "Get to know your business"
- He asked for the explanations on hover: "when u hover over one of those three it could explain in a really high class and premium preisser solutions way". He rejected a first version that recoloured and dimmed the lines: "make ti just hover and not change the color and stuff".
- He rejected two rounds of explanation copy and dictated the direction of the third: line 1 "we sit down with you to learn how we can add value for your business and what your goals are"; line 2 "we build world class custom fortune 500 grade like some very very nbig adn fancy specs and words technially flexing that"; line 3 "we support and stand by every solution we build whether we find a bug or want to expand funcitonality". He approved the result: "thats perfect implement it into the website".

## Decision
1. **A section `#how-we-work` is the first section after the hero on the home page**, before Services.
2. **Its headline is the hero's wordmark device on the opposite side:** three right-aligned lines in the hero's family, weight, tracking and size ceiling, the last line in the primary blue. The lines are:
   - "Get to know your business."
   - "Build a custom solution."
   - "Stand behind it."
3. **Each line explains itself** when pointed at with a mouse, tapped, or activated from the keyboard. The explanation appears in a slot below the headline on the left, in place of the relationship sentence. **Nothing about the lines themselves changes on hover**: no dimming, no colour change, the blue stays on the last line.
4. **The copy ships verbatim.** The three explanations:
   - "We sit down with you to learn how we can add value for your business and what your goals are."
   - "World-class custom software at Fortune 500 grade, engineered for your business alone. It runs on a global edge network spanning 300+ cities, with AES-256 encryption, post-quantum secured connections and multi-factor sign-in, and the most advanced AI models wired directly into your data."
   - "We support and stand by every solution we build. If a bug turns up, we fix it. When you want it to do more, we expand it. As your business grows, your software grows with it."

   The relationship sentence at rest: "We believe in building long-term relationships with all of our clients, because we want your success to be our success." The label: "How We Work".
5. **Explicitly NOT allowed, by any agent:** rewording, tightening or reordering any of that copy; adding a hover effect to the lines; fixing a wrap by cutting a word. ADR-0009 is the governing precedent. If the copy causes a layout problem, the type size or the layout gives way, never the words.
6. The headline may be smaller than the hero's below about 1230px wide and on phones. "Get to know your business." is 26 characters against the hero's longest line at 20, and the line must stay on one line.

## Consequences
- Implementers: `src/components/home/how-we-work.tsx`, `src/styles/how-we-work.css`, mounted in `src/app/page.tsx`. The hero's scroll cue now lands on this section (it walks to the next rendered section, `hero.tsx` `scrollToNext`).
- Review agents must not flag: the specification claims in explanation 2 as marketing excess (the owner asked for them in terms and approved the sentence); the relationship sentence overlapping the Why Us section's message; the lines having no hover state; the headline being smaller than the hero's on narrow screens.
- Cost accepted: on a phone, tapping is the only way to read an explanation, and the hint line says so. The explanations are in the static HTML either way.

## Open / not yet decided
- Whether the Why Us section ("Your success is our success.", ADR-0009) stays now that this section carries the same promise higher up. Raised with the owner on 2026-11-21; not answered. It stays until he says otherwise.
- Explanation 2 makes specific claims (edge network, AES-256, post-quantum connections, multi-factor sign-in, AI wired into the data). They describe how the company builds on Cloudflare and its security baseline; they were not checked against every client build. The owner was told and approved the sentence as written.
- Which of the three layouts shown to the owner (explanation in a slot, unfolding under the line, a glass card that follows the pointer) is final. He approved the page showing all three with "thats perfect implement it"; the slot layout was built because it is the plain-hover one and behaves the same on a phone. Changing layout does not change this ADR's copy rules.

## Status note for review agents
While `Accepted`, this decision is BINDING: code that conforms to it is CONFORMANT, not defective —
do not flag it, do not "fix" it, do not recommend re-adding what it removed. Objections go under
"Decision Concerns" citing this ADR number — never as a bug or a blocking finding. Disagreement with
a settled decision is resolved by a NEW superseding ADR, never by editing this one.

## Revisit criteria
- The owner supplies different words, picks a different layout, or rules on the Why Us section.
- A client build is found that does not meet a claim in explanation 2.

## Sources
- Owner instructions, conversation, 2026-11-21, quoted verbatim in Context.
- Granola note "Efficiency improvement strategies", 2026-11-21 (the conversation the copy draws on).
- `DECISIONS/0009-...md` (owner copy ships verbatim), `DECISIONS/0011` to `0015` (hero wordmark and mark placement).
