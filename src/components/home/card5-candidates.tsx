"use client";

/* ═══════════════════════════════════════════════════════════════════════
   CARD 5 -- "AI and Search Engine Visibility." -- THREE CANDIDATE VISUALS
   REBUILD 2026-09-07 (round D). COLLAPSED TO ONE SURFACE, BY INSTRUCTION.
   ═══════════════════════════════════════════════════════════════════════

   WHAT CHANGED AND WHY, because the previous file argued the opposite.

   Round B kept the two acts the owner asked for but REFUSED their chrome:
   the search engine became "a trough plus a line of typed lowercase", the
   assistant became "two solid masses in a dialogue rhythm with nothing
   inside them", and the web became a skyline of slabs. The owner saw it
   live and rejected it: "absoolutely nothing like what I asked for ... it
   is HORRIBLE", and "do any of these look like the cleaness that the
   websites bento card has? NO".

   The error was a doctrine, not a detail. A general ban on "anything
   resembling a UI" is correct for card 3 ("AI Integration"), whose subject
   is not an interface. It is WRONG HERE. Card 5's subject is literally how
   a search engine and a language model read a website, so a search field,
   a results row and a chat exchange ARE the picture -- the same way a
   browser window is the correct picture for card 4, "Websites."

   So every beat below is drawn as the thing it is, at a size where a
   stranger names it in one second:
     #7  a rounded search field, magnifier, a real query typed in it
     #8  a ranked list of results with ours in the first position
     #9  a chat exchange -- filled ask bubble, tailed reply bubble
     #10 pages the assistant opens that give it nothing: crossed out
     #11 the one page it can read, and the answer it hands back

   ROUND D, AND IT REVERSES PART OF THE ABOVE. The owner saw round C live
   and cut the card in half: "on AI and search engine visibility. That bento
   card. Just have one don't do Google and chat gbt. Just have it." So the
   DEFAULT concept, A, is now the search surface alone -- beats #7 and #8,
   with beats #9 to #11 still standing in concepts B and C behind `?c5=`.
   The chat panel, its turns, its avatar, its composer and its send glyph
   are deleted from this file, not hidden, and section 4c of the stylesheet
   went with them. Two more instructions landed with it and both are
   answered below: the typed question is now a specific buyer's question
   ("who insures oil field crews"), and the rows under first position say
   "Other Business" instead of showing a redacted grey bar.

   AND THE THING THAT NEARLY SHIPPED THIS BROKEN: putting real type in the
   lower half of the card ran it into two fades that no probe reports. See
   the two long notes in `card5-candidates.css` -- one for
   `.ps-bento-card__text::before` on the phone card face, one for
   `.ps-dialog-visual::after` in the phone sheet. Both were found by reading
   pixels off per-row screenshots, not by `getComputedStyle`, which reports
   `opacity: 1` and the correct ink through both of them.

   THE ONE LINE THAT STAYS: no third-party brand marks. No wordmark, no
   logo, no product name. Recognisable BY FORM. A rounded input with a
   magnifier reads as search without saying whose search it is.

   AND THE MEASUREMENT LINE: no depicted ranking METRIC. Position one in a
   drawn list is the mechanism and is allowed. A rank-tracker readout, a
   visibility score, a before/after percentage would assert a measurement
   this product does not make, so none exists anywhere in this file. There
   are no numerals in the artwork at all.

   GEOMETRY, measured live on 127.0.0.1:3610 and agreeing with R7 to the
   tenth of a pixel:
     card face  `service-pillars.tsx:1916`
       320vw -> card 272x380, art 284x392 (aspect 0.72)
       939vw -> card 891x380, art 903x392 (aspect 2.34, spans two columns)
       1440vw -> card 400x380, art 412x392 (aspect 1.05)
     dialog     `service-pillars.tsx:2214`  W x280 to 768, W x400 from 769,
       capped 900x400. ZERO bleed.
   The art box is the card +6px on every edge and it CLIPS, never scales.
   One `viewBox` with preserveAspectRatio="slice" would throw away more than
   half of itself across 0.72 -> 2.34, so this is HTML and CSS mass that
   re-flows -- exactly how card 4 is built (`card-visuals.css:54-62`) -- and
   SVG is used only for the magnifier glyph.

   KEEP-CLEAR: the card's own expand button is 32px at top/right 16px
   (globals.css:2106-2118) and 44px at top/right 12px below 768px
   (`:5448-5459`). Measured from the ART box that is a 62x62 dead corner at
   top right. Nothing in any of the three concepts enters it; card 4 leaves
   the same corner empty and that is where the house habit comes from.

   MOTION: NONE OF MY OWN, AND THAT IS THE SPEC, NOT AN OMISSION.
   `M4-animation-style.md` characterised card 4 over 60 frames and the
   answer was restraint: EXACTLY ONE THING ANIMATES, AND IT IS THE CARD.
   Everything inside is fully drawn and correctly positioned at opacity 0
   and rides in as one rigid unit -- no internal stagger, no draw-on, no
   sweep, no scale -- then holds perfectly still. Verified here in the real
   page rather than taken on trust: before the grid's ScrollTrigger fires,
   `.ps-bento-card--search-ads` computes to `opacity: 0` and
   `matrix(1,0,0,1,0,28)`; at t+650ms it is `0.513` and `13.64px`; settled
   it is `1` and `none`; `animationName` is `none` at every sample, on this
   card and on card 4 alike. Card 4 is ahead of card 5 in that trace
   (0.78 vs 0.51 at the same instant), which is the 0.1s per-card stagger.

   So this artwork declares NO transition, NO animation and NO keyframes at
   all. The entrance it gets is the card's, identical to card 4's, and the
   still frame carries the whole idea -- which it has to, because below
   940px card 4's hover group does not exist and the 0.65s card entrance is
   the entire vocabulary a phone viewer ever sees.

   Two consequences worth stating plainly. First, there is nothing to pin
   for `prefers-reduced-motion`: card 4's entrance is never SET UP rather
   than being set up and then reversed, and this card now matches that. It
   does not hide, so it cannot fail to unhide. Second, an earlier round of
   this file DID stagger its parts, and a WebKit capture caught the failure
   mode that comes with it -- one 404'd chunk, no hydration, no observer,
   and a blank navy card. Removing the reveal removes the failure with it.

   COLOUR: R5 tokens (D25). Dark is the unprefixed base, light forks under
   [data-theme="light"]. Two things deliberately do NOT flip, for the same
   reason card 4's phone bezel stays dark in light mode: a depicted white
   page is white in both themes (role 9), and the grey rules printed on it
   are printed on white in both themes.

   COPY: two strings now, the typed query and the results' names. The query
   is capped at ~30 characters (measured) and lowercase, because that is how
   people type. No em dash anywhere.
   ═══════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";

/* ── COPY BLOCK C4 -- the typed query. Three candidates, owner picks. ──
   Measured ceiling ~30 characters at 17 widths; longer drafts clipped the
   caret at every width except the 640-939 banner. The same string is used
   as the chat question in concept B, so the person asking a search engine
   and the person asking an assistant are asking the same thing.

   THE BRIEF FOR THIS STRING, in the owner's words: "the search box say who
   insures oil field [crews] or something much more relatable to a
   business." Two halves, and the second half is him opening it up rather
   than replacing the first. What all three candidates hold in common is the
   part that is not negotiable: each is a QUESTION A BUYER TYPES, not a
   keyword string and not a slogan, and each names one unglamorous, specific
   trade. The specificity IS the point -- "who does insurance near me" would
   be the same sentence with the argument taken out of it.

   A is his own, kept verbatim except for the space he said and the previous
   round dropped: "oil field", not "oilfield". It is the pick. It is the
   only one of the three he has actually said out loud, it is the most
   concrete, and 27 characters clears the measured ceiling. B and C are held
   as live alternates and switch by editing one line. */
const C5R_QUERY_A = "who insures oil field crews";
const C5R_QUERY_B = "who hauls oversized loads";
const C5R_QUERY_C = "who services rooftop units";

const C5R_QUERY = C5R_QUERY_A;

/* THE VIEWER'S OWN NAME, and it is the one literal string in the artwork
   besides the typed question. "Your Business" is a placeholder standing in
   for whoever is reading the card, which is why it is allowed where an
   invented client name would not be: it asserts nothing about anybody. It
   is printed TWICE on purpose -- once as the first result a search engine
   returns and once inside the answer an assistant gives -- because the
   whole point of the card is that the two surfaces reach the same place. */
const C5R_BIZ = "Your Business";

/* AND EVERYBODY ELSE. The owner's words for this beat, verbatim: "the top
   one will pop up and say your business. That's it. And then the other two
   or three below it will say other business. Other business. Other
   business." So the rows under first position stopped being redacted grey
   bars and started saying what they are. Three of them, not two, and the
   count is measured rather than preferred -- see the stacked budget in
   `card5-candidates.css`. An invented competitor name would assert
   something about a real company; "Other Business" asserts nothing, exactly
   like "Your Business" above it. */
const C5R_OTHER = "Other Business";

export const C5R_QUERY_CANDIDATES = [
  C5R_QUERY_A,
  C5R_QUERY_B,
  C5R_QUERY_C,
] as const;

type Vars = React.CSSProperties & Record<string, string | number>;

/* ═══════════════════════════════════════════════════════════════════════
   THE SEARCH LOOP -- symptom #10, built to `E1-search-loop-spec.md`.
   ═══════════════════════════════════════════════════════════════════════

   THIS REVERSES THE "MOTION: NONE OF MY OWN" NOTE ABOVE, AND ONLY THAT
   NOTE. The owner asked for it in his own words: "I would like for the ai
   and search engine visibilty it to loop different searches ... it
   animates in/types in the first thing and then it shows a little loading
   animation and then the results pop in with your buisnes at the top ...
   but then it backspaces what is in the search box and searches something
   new and then loads in again". Everything the old note got RIGHT is kept:
   the still frame is still the whole picture (§ the base cascade below),
   the card still holds absolutely still under `prefers-reduced-motion`,
   and no second decorative gesture was added anywhere.

   FIVE BEATS, IN THIS ORDER, EVERY CYCLE. Durations are E1's, measured
   against the 258.66 x 266.00 stage at 940px -- the binding worst case,
   where this card drops 891.00 -> 286.66px in one pixel of viewport.

     backspace 22ms/char  ->  240ms empty gap  ->  type 40ms/char (+80ms
     after each space)  ->  320ms submitted pause  ->  520ms loading  ->
     resolve 260ms/row on a 70ms stagger, OURS FIRST  ->  2200ms dwell

   Set 1, whose three strings were already in this file: mean cycle
   5,629ms, full three-query rotation 16,886ms.

   THE TWO MEASUREMENTS THAT SHAPED THE IMPLEMENTATION, both E1's:

   1. THERE IS NO VERTICAL SLOT. `scrollHeight === height` at all eight
      widths and the rest rows are ALREADY compressed below their declared
      size (`--c5r-rest-h: 44px` renders at 31px at 768). So the loading
      indicator gets no row of its own: it is a 2px hairline INSIDE the
      field, and the rows load in their own existing boxes. Nothing in
      this loop touches `height`, `margin` or `padding`.

   2. THE QUERY IS GATED BY RENDERED INK, NOT BY CHARACTER COUNT. The
      ceiling is 149.42px at the 320 box; two different 26-character
      strings sit on opposite sides of it. The "~30 characters" note in
      the copy block above is WRONG and E1 disproved it. Do not add or
      edit a query string without measuring it with `measureText` against
      `.ps-c5r-q`'s resolved font. Set 1 measures 133.03 / 132.72 /
      133.23px -- inside 0.51px of each other, which is why the field's
      ink block looks like the same person asking three questions.

   THE RESULTS DO NOT BLANK BETWEEN QUERIES, AND THAT IS LOAD-BEARING.
   They hold at FULL STRENGTH through backspace, the gap, typing and the
   submitted pause, and become blank plates for the 520ms loading beat
   only. That is what puts 82.4% of every cycle on a complete, legible,
   full-strength ranked list. E1 measured the alternative: clearing them
   between queries takes the not-legible share from 17.6% to 60.9% and
   turns the card into a mostly-empty box. It also re-opens the contrast
   defect that `--c5r-foot: 140px` exists to fix, because an alpha dim
   over the phone scrim once composited these rows to 3.10:1. Anyone
   "tidying up" the stale hold is breaking the argument, not the look.

   THE TRIGGER IS AN EVENT, NEVER A CONSTANT, AND NEVER PAGE LOAD.
   `interiorSettled` is `(indexInRow * 100ms) + 650ms + 450ms` -- 1,100ms
   in the one- and two-column regimes but 1,200ms at >=940px, where this
   card shares row 2 with `Websites.` and inherits a 100ms box delay. A
   hard-coded 1,100ms would start typing 100ms BEFORE the results settle
   on every desktop width. So this hooks the box tween's completion
   directly (see `boxSettled` below) and adds 450ms, which is right in all
   three regimes with no table lookup. Page load is not an option at all:
   at 393x852 this card's box does not reveal within 2.6s (its own
   ScrollTrigger has not crossed `top 82%`, which is designed), so a
   load-keyed loop would be mid-cycle or finished before a phone visitor
   ever saw the card.

   AND IT CANNOT STRAND ANYTHING INVISIBLE. The base cascade IS the
   finished resting frame -- query typed, caret parked, every row
   resolved, `Your Business` first -- exactly what shipped before this
   change. Every animated rule is a descendant of `.ps-c5r-run`, which
   only JS adds, and the effect returns before allocating anything at all
   under `reduce`. So reduce, no JS, a 404'd chunk, a server render, an
   unopened dialog and an unfired ScrollTrigger all land on the same
   legible frame. This is also the fix for the blank-navy-card WebKit
   failure the note above records at this file's own :105-108.
   ═══════════════════════════════════════════════════════════════════════ */

/* SET 1. E1's recommendation, and all three strings were already here. */
const C5R_LOOP_QUERIES = [C5R_QUERY_A, C5R_QUERY_B, C5R_QUERY_C] as const;

/* Every value is a literal in milliseconds because there is no duration
   token in this design system and inventing one is out of bounds. The
   easing lives in the stylesheet and uses the three tokens that exist. */
const C5R_T = {
  /* box-tween completion -> interior settled. B3's number: 70ms step +
     380ms fade. Measured from THIS CARD's ScrollTrigger, not from load. */
  settle: 450,
  /* Longer than the in-loop dwell on purpose: a visitor who has just
     arrived reads the finished picture before anything moves. */
  firstDwell: 2600,
  back: 22,
  gap: 240,
  type: 40,
  space: 80,
  submit: 320,
  loading: 520,
  rowDur: 260,
  rowStep: 70,
  dwell: 2200,
} as const;

/* One string, used by the mount guard and by the live listener, so the two
   cannot drift apart. */
const C5R_REDUCE_MQ = "(prefers-reduced-motion: reduce)";

/* THE MACHINE. One pending step at a time, which is what makes
   pause-and-resume-in-place exact rather than approximate: freezing is
   "cancel the one timer and keep what was left of it", and resuming is
   "re-arm it with the remainder". No wall-clock arithmetic survives a
   pause, so a backgrounded tab cannot desynchronise the loop from its own
   animations -- the animations are paused by the same class change.

   Text is written with `textContent` on a ref'd node rather than through
   React state. Two reasons, both deliberate: a 27-character query at
   40ms/char would otherwise be 27 re-renders of the whole card visual,
   and -- the load-bearing one -- the rendered JSX stays the FINISHED
   frame, so the server render, the reduce path and the no-JS path are all
   the same legible picture with no divergence to maintain. */
function useSearchLoop(rootRef: React.RefObject<HTMLDivElement | null>) {
  /* THE PREFERENCE IS A QUERY, NOT A SNAPSHOT OF ONE. It used to be read
     exactly once, at mount, so a visitor who turned reduced motion ON
     mid-visit kept a typing loop running for the rest of the visit -- and
     no CSS media query can stop a `setTimeout`. The same one-shot bug was
     fixed on the hero mark in this diff (`hero-mark-light.ts:1300-1305`,
     parked live on a `change` listener); the house idiom for the React
     side of it is `card2-candidates.tsx:717-724`. Flipping this state
     re-runs the effect below, and the effect's own cleanup is what lands
     the card back on its legible resting frame: it clears every timer,
     drops `.ps-c5r-run`/`.ps-c5r-hold`, deletes `data-c5r-beat` and puts
     the resting query text back. */
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(C5R_REDUCE_MQ);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    /* REDUCE: return before allocating ANYTHING. No observer, no
       listener, no timer, no class. The resting frame is the answer.

       BOTH HALVES ARE LOAD-BEARING. `reduced` is the live value and is
       what makes a mid-visit toggle stop the loop. The direct read is
       what keeps the "allocate nothing" promise at FIRST mount: the state
       above starts `false` (it has to -- the server has no matchMedia),
       so a reduce visitor would otherwise build an observer and four
       listeners for the one commit before the sync effect lands. */
    if (reduced || window.matchMedia(C5R_REDUCE_MQ).matches) return;

    const q = root.querySelector<HTMLElement>(".ps-c5r-q");
    const results = root.querySelector<HTMLElement>(".ps-c5r-results");
    if (!q || !results) return;

    const rows = Array.from(
      results.querySelectorAll<HTMLElement>(".ps-c5r-row")
    );
    if (rows.length === 0) return;

    let disposed = false;
    let armed = false;

    /* EVERY timer id in one collection, all cleared in the return. One
       in-flight timer surviving unmount re-enters a dead component and
       mutates a detached node. */
    const timers = new Set<number>();
    /* Pause is a SET of reasons, not a boolean. Hover, focus-within,
       out-of-view and a hidden tab can overlap, and leaving one must not
       resume the loop while another still holds it. */
    const holds = new Set<string>();

    let pend: { fn: () => void; ms: number; at: number; id: number } | null =
      null;

    const armPend = () => {
      if (disposed || !pend || pend.id) return;
      const step = pend;
      step.at = performance.now();
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (disposed || pend !== step) return;
        pend = null;
        step.fn();
      }, step.ms);
      step.id = id;
      timers.add(id);
    };

    const after = (ms: number, fn: () => void) => {
      pend = { fn, ms, at: 0, id: 0 };
      if (holds.size === 0) armPend();
    };

    const freeze = () => {
      if (!pend || !pend.id) return;
      window.clearTimeout(pend.id);
      timers.delete(pend.id);
      pend.ms = Math.max(0, pend.ms - (performance.now() - pend.at));
      pend.id = 0;
    };

    const setHold = (reason: string, on: boolean) => {
      const before = holds.size > 0;
      if (on) holds.add(reason);
      else holds.delete(reason);
      const now = holds.size > 0;
      if (now === before) return;
      /* The class pauses the CSS animations in the same tick the timer
         freezes, so the hairline and the row stagger stop where the
         beat stopped. */
      root.classList.toggle("ps-c5r-hold", now);
      if (now) freeze();
      else armPend();
    };

    const beat = (name: string) => {
      root.dataset.c5rBeat = name;
    };

    /* `resolve` is the one beat whose length is width-dependent, and it
       follows the ROW COUNT rather than a media query: 470ms at >=940px
       where four rows show, 400ms at <=768px where the fourth is
       `display: none`. Counted off the live computed style so the dialog
       mount's own row-count rule is honoured too. */
    const visibleRows = () =>
      rows.filter((r) => window.getComputedStyle(r).display !== "none").length;

    let qi = 0;

    const erase = () => {
      const t = q.textContent ?? "";
      if (t.length === 0) {
        beat("empty");
        after(C5R_T.gap, startType);
        return;
      }
      q.textContent = t.slice(0, -1);
      after(C5R_T.back, erase);
    };

    const startCycle = () => {
      beat("erasing");
      erase();
    };

    const typeNext = (i: number) => {
      const target = C5R_LOOP_QUERIES[qi];
      if (i >= target.length) {
        beat("submitted");
        after(C5R_T.submit, load);
        return;
      }
      q.textContent = target.slice(0, i + 1);
      /* +80ms after a space. A fixed cadence reads as a machine; the
         word gap is what makes it read as a person, and it is
         deterministic so a reviewer can measure it. */
      after(C5R_T.type + (target[i] === " " ? C5R_T.space : 0), () =>
        typeNext(i + 1)
      );
    };

    const startType = () => {
      qi = (qi + 1) % C5R_LOOP_QUERIES.length;
      beat("typing");
      typeNext(0);
    };

    const load = () => {
      beat("loading");
      after(C5R_T.loading, resolveRows);
    };

    const resolveRows = () => {
      beat("resolving");
      const n = Math.max(1, visibleRows());
      after(C5R_T.rowDur + (n - 1) * C5R_T.rowStep, dwell);
    };

    const dwell = () => {
      beat("dwell");
      after(C5R_T.dwell, startCycle);
    };

    const start = () => {
      if (armed || disposed) return;
      armed = true;
      root.classList.add("ps-c5r-run");
      beat("dwell");
      after(C5R_T.firstDwell, startCycle);
    };

    /* ── THE TRIGGER: AN EVENT, AND NEVER A CONSTANT ──────────────────
       PRIMARY -- service-pillars' public reveal contract, which was
       written for this card by name (`service-pillars.tsx:2566-2592`):

         `data-ps-reveal="done"` latched on the card element, plus a
         bubbling `ps-interior-reveal` CustomEvent, fired from the box
         tween's `onComplete` (`:2740-2747`) AND from all four of its
         failure paths -- the reduced-motion branch, the chunk-reject
         `.catch`, the hanging-import failsafe and the unmount cleanup.

       Its own instruction is "read the attribute first, then subscribe",
       because a consumer that mounts late would miss a bare event, and
       that is what happens below. Firing from the failure paths as well
       is what stops a GSAP failure -- or a cleanup that kills the tween
       before `onComplete` can run -- from stranding this loop unstarted.

       FALLBACK -- the tween's own DOM signature, watched with one
       MutationObserver on the box's `style` attribute: inline
       `opacity: 1` WITH the inline transform cleared, which is what
       `clearProps: "transform"` (`:2764`) leaves behind, and also what
       `showUnanimated()` writes. This exists because the contract above
       is one uncommitted edit old; if it is reverted, the loop still
       arms off the real tween rather than silently never starting.
       Whichever fires first wins and the other is torn down.

       Why NOT the computed opacity, by either route: child effects run
       BEFORE parent effects, so at first mount this box has no inline
       opacity at all and computes to 1. Reading the computed value would
       arm instantly and key the loop to page load -- the one thing
       forbidden here, because at 393x852 this card's box does not reveal
       within 2.6s at all.

       And if the box never settles by either route, nothing arms and the
       card holds the finished still frame. Fail-visible, like every
       other path in this file. */
    const box = root.closest<HTMLElement>(".ps-bento-card");

    const boxSettled = () =>
      !!box && box.style.opacity === "1" && box.style.transform === "";

    let mo: MutationObserver | null = null;

    const stopWatchingBox = () => {
      if (mo) {
        mo.disconnect();
        mo = null;
      }
      if (box) box.removeEventListener("ps-interior-reveal", onRevealed);
    };

    /* Idempotent: five paths can call this and only the first one counts. */
    function onRevealed() {
      if (disposed || armed || pend) return;
      stopWatchingBox();
      after(C5R_T.settle, start);
    }

    const onBoxStyle = () => {
      if (disposed || armed || !boxSettled()) return;
      onRevealed();
    };

    /* Out of view: pause, and resume IN PLACE. Every frame of this loop
       is legible, so resuming mid-cycle can never show a broken state,
       and a reset would re-trigger typing on every scroll wobble. */
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        if (!e) return;
        setHold("offscreen", !e.isIntersecting);
        /* THE DIALOG MOUNT. This card is mounted twice -- card face and
           bottom-sheet dialog -- and the dialog copy has no
           `.ps-bento-card` box to hook, so it arms on its own first real
           visibility instead. That is exactly the condition wanted: the
           dialog instance must not run while the sheet is closed, or two
           loops run for one visitor and the hidden one is motion nobody
           asked for. */
        if (e.isIntersecting && !box) onRevealed();
      },
      { threshold: 0.25 }
    );

    /* Hover is when a visitor is READING, and it is also when the expand
       button is being aimed at; yanking the query out from under someone
       mid-read is the worst thing this loop can do. `focusin`/`focusout`
       bubble from the card's own focusable child, which is `:focus-within`
       by another name and gives keyboard users the mechanism that hover
       cannot give a touch visitor. */
    /* ── COVERED BY THE BOTTOM SHEET: THE FIFTH PAUSE SOURCE ─────────
       The IO comment above says two loops must never run for one visitor,
       and it only ever covered HALF of that. It stops the DIALOG copy
       running while the sheet is CLOSED. Nothing stopped the CARD FACE
       running while the sheet is OPEN, so from the moment a visitor taps
       this card there were two unheld loops typing different queries at
       each other -- measured on this build at every viewport from 320 to
       1440, in all three engines, ~112 extra `setTimeout` arms per 9s
       (P2-performance §4c-2, P2-browser-tester F-1).

       WHY `body.dataset.psDialog` AND NOT CARD 3'S `.ps-dialog-visual-art`
       (`card3-candidates.tsx:1471`). Both work; this one is the contract
       written FOR THIS CARD BY NAME (`service-pillars.tsx:1959-1987`,
       "Requested by E2-search-loop-build for card 5's search loop") and
       until now it had zero consumers. It states its own value ("open"),
       its own absence rule (the attribute is REMOVED, never set to
       "closed", so `=== "open"` is the whole test), its own lifetime --
       the sheet's full portal life INCLUDING the close animation, so the
       face resumes only once the sheet is really gone -- and its own
       change mechanism, an attribute MutationObserver. A class on an
       interior wrapper carries none of that and is a styling hook that
       may be renamed by anyone restyling the sheet. It is also cheaper:
       one dataset read against a `document.querySelector` per callback,
       and one narrow `attributeFilter` observer against card 3's
       `childList` observer on <body>, which wakes for every portal.

       This is a HOLD, not a stop: it joins the same reason set as hover,
       focus, offscreen and hidden, so closing the sheet resumes the face
       loop IN PLACE with the pending step's remainder intact -- no reset,
       no re-typed query, exactly as the other four already behave. */
    const inDialog = !box;
    const sheetOpen = () => document.body.dataset.psDialog === "open";
    const syncCovered = () => {
      /* The dialog copy is the one the visitor is looking at; it must
         never hold itself for being in the very sheet that is open. */
      if (inDialog) return;
      setHold("covered", sheetOpen());
    };
    const sheetMo = new MutationObserver(syncCovered);

    const hoverTarget: HTMLElement = box ?? root;
    const onEnter = () => setHold("hover", true);
    const onLeave = () => setHold("hover", false);
    const onFocusIn = () => setHold("focus", true);
    const onFocusOut = () => setHold("focus", false);
    /* setTimeout is throttled but NOT stopped in a background tab, so
       without this the loop desynchronises from its own animations and
       comes back mid-garbage. */
    const onVis = () =>
      setHold("hidden", document.visibilityState === "hidden");

    holds.add("offscreen");
    root.classList.add("ps-c5r-hold");

    io.observe(root);
    hoverTarget.addEventListener("mouseenter", onEnter);
    hoverTarget.addEventListener("mouseleave", onLeave);
    hoverTarget.addEventListener("focusin", onFocusIn);
    hoverTarget.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVis);
    onVis();
    /* Attribute first, then subscribe -- the same order as the reveal
       contract above, and for the same reason: this mount may be created
       while a sheet is already open. */
    syncCovered();
    if (!inDialog) {
      sheetMo.observe(document.body, {
        attributes: true,
        attributeFilter: ["data-ps-dialog"],
      });
    }

    if (box) {
      /* Attribute first, then subscribe -- the contract's own order, and
         the reason is a consumer that mounts after the event fired. */
      if (box.dataset.psReveal === "done" || boxSettled()) {
        onRevealed();
      } else {
        box.addEventListener("ps-interior-reveal", onRevealed);
        mo = new MutationObserver(onBoxStyle);
        mo.observe(box, { attributes: true, attributeFilter: ["style"] });
      }
    }

    /* THE CLEANUP IS RETURNED FROM THE EFFECT BODY'S OWN CLOSURE. Not
       from inside a `.then()`, not from a callback, not conditionally --
       `service-pillars.tsx:2615` does the first of those and leaks five
       ScrollTriggers for it. Idempotent, so React's StrictMode double
       invoke is safe, and it restores the resting frame rather than
       leaving a half-typed query behind. */
    return () => {
      disposed = true;
      for (const id of timers) window.clearTimeout(id);
      timers.clear();
      pend = null;
      holds.clear();
      io.disconnect();
      sheetMo.disconnect();
      stopWatchingBox();
      hoverTarget.removeEventListener("mouseenter", onEnter);
      hoverTarget.removeEventListener("mouseleave", onLeave);
      hoverTarget.removeEventListener("focusin", onFocusIn);
      hoverTarget.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVis);
      root.classList.remove("ps-c5r-run", "ps-c5r-hold");
      delete root.dataset.c5rBeat;
      q.textContent = C5R_QUERY;
    };
  }, [rootRef, reduced]);
}

/* ── PARTS ────────────────────────────────────────────────────────────
   Every part is drawn as the object it is. There are NO `<defs>` anywhere
   in this file and no `url(#…)` reference, so D28c's namespacing rule is
   satisfied by there being nothing that can collide across the card-face
   and dialog double mount. The only SVG is a two-shape magnifier that
   inherits `currentColor`. */

/* The magnifier. Circle plus handle, stroked, no fill, no ids. This one
   glyph is what turns a rounded rectangle into a search field. */
function Magnifier() {
  return (
    <svg
      className="ps-c5r-mag"
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <circle cx="6.8" cy="6.8" r="4.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10.4 10.4 L14 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* THE SEARCH FIELD, symptom #7. A rounded input, a magnifier, a specific
   question typed into it, and a caret still sitting after the last letter
   because the person is mid-thought. No logo and no product name: the FORM
   is the recognition. */
function SearchField() {
  return (
    /* `ps-rv-i` + `--i: 0` opt this element into B5's shared interior
       reveal (`card-visuals.css:3480-3545`). Opt-in is per ELEMENT, so
       these two markers are the whole of card 5's interior entrance:
       FIELD FIRST, results 70ms behind it at the primitive's default
       step. That order is the card's own logic -- you search, then you
       rank -- and the pair is disjoint at every width, so the default
       overlapping stagger needs no per-card knob. Opacity only: the lift
       is zeroed on the root, per this card's spec.
       B5 could not add these because this file is mine, and until they
       existed card 5 shipped with NO interior entrance. */
    <div className="ps-c5r-field ps-rv-i" style={{ "--i": 0 } as Vars}>
      <Magnifier />
      <span className="ps-c5r-q">{C5R_QUERY}</span>
      <span className="ps-c5r-caret" />
      {/* THE LOADING BEAT, AND IT HAS NO ROW OF ITS OWN ON PURPOSE. A 2px
          hairline absolutely positioned inside the field's own bottom
          edge, so it costs zero vertical pixels -- which is mandatory,
          because `scrollHeight === height` at all eight widths and the
          rest rows are already compressing 44px -> 31px. Rendered at
          every mount and invisible at rest (`scaleX(0)`, opacity 0), so
          the loop never adds or removes a node mid-cycle and the static
          frame is unchanged. It is the only new element in this card. */}
      <span className="ps-c5r-load" />
    </div>
  );
}

/* A RESULT ROW. `struck` is the third state, and it exists because the
   second one was not legible where this card needed it. `dead` (concept C)
   swaps the title for a cross, so the row's brightest mark is an 18px glyph
   at 0.62 alpha; dropped into the FOOT of the wide slot that read as almost
   nothing, because the ground gradient's lower end (#0c1e3a) and the unlit
   wash's lower end (#101e34) have the same relative luminance to three
   decimal places -- an unlit row is genuinely close to invisible down
   there, which is also why these rows carry a top hairline. `struck` keeps
   the title bar, so the row weighs exactly what the rows above it weigh,
   and draws a rule straight through it. A result that came back and got
   crossed off is a clearer statement of "this one gave the reader nothing"
   than an empty space with a small x in it, and it costs no extra node:
   the rule is the title's own pseudo-element.
   Drawn in the layout a result actually has, because that
   layout IS the recognition: a small site mark beside a short domain line,
   then a link-coloured title, then the snippet. Round 1 of this rebuild put
   the mark on the left of a centred block of rules and the render read as a
   generic content card; moving the mark up beside the domain and dropping
   the title under it turned the same five shapes into a search result.
   `ours` is the lit one. The rest are the same object with the light off:
   no colour, no snippet, and stepped back down the page. */
function ResultRow({
  ours = false,
  dead = false,
  struck = false,
  label,
  w,
  n,
}: {
  ours?: boolean;
  dead?: boolean;
  struck?: boolean;
  label?: string;
  w?: string;
  /* Position in the stack, and the ONLY thing it drives is the resolve
     stagger's `animation-delay` (`--n * 70ms`). `ours` is 0, so the
     viewer's own result is the first one to arrive -- a fourth statement
     of first position, in time, still with no numeral anywhere. */
  n?: number;
}) {
  if (ours) {
    return (
      <div
        className="ps-c5r-row ps-c5r-row--ours"
        style={n === undefined ? undefined : ({ "--n": n } as Vars)}
      >
        <span className="ps-c5r-rowhead">
          <span className="ps-c5r-mark" />
          <span className="ps-c5r-domain" />
        </span>
        {/* The title is now the NAME, in the link colour a result title is
            always in. First position is stated three ways and none of them
            is a numeral: it is the topmost row, it is the only lit row, and
            it is the tallest. A "1" or a rank readout would assert a
            measurement this product does not make. */}
        <span className="ps-c5r-biz">{C5R_BIZ}</span>
        <span className="ps-c5r-line ps-c5r-line--a" />
        <span className="ps-c5r-line ps-c5r-line--b" />
      </div>
    );
  }
  /* A NAMED rest row. The site mark and the name sit on ONE line, and the
     redacted domain bar that used to sit beside the mark is gone, because
     the name has taken its place -- a row cannot carry a name AND a
     stand-in for a name. The snippet bar under it is declared here and
     hidden in the stacked regime (see `.ps-c5r-row--named .ps-c5r-title`),
     so a tall row in the wide slot has something in its lower half instead
     of a dead band. */
  return (
    <div
      className={`ps-c5r-row ps-c5r-row--rest${label ? " ps-c5r-row--named" : ""}${
        dead ? " ps-c5r-row--dead" : ""
      }${struck ? " ps-c5r-row--struck" : ""}`}
      style={
        n === undefined
          ? ({ "--w": w } as Vars)
          : ({ "--w": w, "--n": n } as Vars)
      }
    >
      <span className="ps-c5r-rowhead">
        <span className="ps-c5r-mark" />
        {label ? (
          <span className="ps-c5r-other">{label}</span>
        ) : (
          <span className="ps-c5r-domain" />
        )}
      </span>
      {dead ? <span className="ps-c5r-x" /> : <span className="ps-c5r-title" />}
    </div>
  );
}

/* THE ASK, symptom #9. A filled bubble on the right with a tail: the
   universal form of "a person said this". `mute` swaps the typed question
   for two lines of it, and concept C uses that -- C already shows the same
   sentence typed into a search field a few pixels above, and the render
   with the string printed twice in one 412px frame read as a mistake. A
   bubble is recognised by its shape, not by its contents. */
function AskBubble({ mute = false }: { mute?: boolean }) {
  return (
    <div className="ps-c5r-bubble ps-c5r-bubble--ask">
      {mute ? (
        <>
          <span className="ps-c5r-said ps-c5r-said--a" />
          <span className="ps-c5r-said ps-c5r-said--b" />
        </>
      ) : (
        <span className="ps-c5r-q">{C5R_QUERY}</span>
      )}
    </div>
  );
}

/* A PAGE THE ASSISTANT OPENS. `dead` is symptom #10 -- it has a header and
   a body and nothing legible in it, and it is crossed out. `live` is
   symptom #11 -- the same object, lit, with everything the reader came for
   sitting in plain rows it can lift straight out. */
function PageTile({ dead = false }: { dead?: boolean }) {
  return (
    <div
      className={`ps-c5r-tile ${dead ? "ps-c5r-tile--dead" : "ps-c5r-tile--live"}`}
    >
      <span className="ps-c5r-tile-head" />
      {dead ? (
        <span className="ps-c5r-x" />
      ) : (
        <span className="ps-c5r-tile-body">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      )}
    </div>
  );
}

/* THE ANSWER COMING BACK, symptom #11. A tailed reply panel whose payload
   is the result: the same site mark, the same domain line and the same
   link-coloured title that concept A shows in first position, because it is
   the same page. Then two lines of the answer written from it. The owner's
   words for this beat are "goes back and gives the user our site as a #1
   search result" -- so the reply CONTAINS the result. No score, no rank
   readout, no numeral: the product does not measure that and the drawing
   does not claim it. `compact` drops the two answer lines for concept C,
   where the reply is the second of two acts and has half the room. */
function ReplyBubble({ compact = false }: { compact?: boolean }) {
  return (
    <div className="ps-c5r-bubble ps-c5r-bubble--reply">
      <span className="ps-c5r-rowhead">
        <span className="ps-c5r-mark" />
        <span className="ps-c5r-domain" />
      </span>
      <span className="ps-c5r-title" />
      {compact ? null : (
        <>
          <span className="ps-c5r-line ps-c5r-line--a" />
          <span className="ps-c5r-line ps-c5r-line--b" />
        </>
      )}
    </div>
  );
}

/* ═══ CONCEPT A -- ONE SEARCH, AND WHO IS FIRST ════════════════════
   COLLAPSED FROM TWO SURFACES TO ONE, BY INSTRUCTION. The round before this
   one drew the owner's earlier picture literally: a search engine on the
   left and an assistant conversation on the right, the same question typed
   into both. He looked at it and reversed himself -- "on AI and search
   engine visibility. That bento card. Just have one don't do Google and
   chat gbt. Just have it." So the conversation half is gone: no chat
   panel, no turns, no avatar, no composer, no send glyph. The parts it
   owned are deleted rather than hidden, and the CSS that sized them went
   with them.

   WHICH HALF SURVIVED, AND WHY IT WAS THE SEARCH ONE. Neither half ever
   carried a wordmark -- a regex over the rendered DOM for google, chatgpt,
   openai, gemini, perplexity and bing returned zero matches before this
   change and returns zero after it, and the ban at the top of this file is
   why. So "don't do Google and chat gbt" is about depicted FORM, and the
   two forms were: a magnifier field over a ranked list, and alternating
   bubbles over a composer. The card's remaining beats -- "the top one will
   pop up and say your business ... the other two or three below it will say
   other business" -- are a RANKED LIST. A conversation has no first
   position to be in. The ranked list is the only half those words can be
   drawn in, so the ranked list is the half that stayed.

   WHAT IS ON SCREEN NOW: the question, and the page it came back on. One
   lit result carrying the viewer's own name, and three unlit ones under it
   carrying somebody else's. First position is stated three ways and none of
   them is a numeral -- topmost, only lit, tallest. No score, no rank
   readout, no percentage, because the product does not measure that.

   "pops up" is in his words and it is NOT motion here. The finished state
   is drawn at rest: the results have already arrived. Nothing in this file
   animates, so the still frame is the whole picture -- which it has to be,
   since below 940px card 4's hover group does not exist and one 0.65s card
   entrance is all a phone viewer ever sees.
   ═════════════════════════════════════════════════════════════════════════ */
export function SearchVisualA() {
  /* The loop reads and writes through this root and nothing outside it, so
     the card face and the dialog sheet each drive their own copy with
     their own observer, listeners and timers. */
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSearchLoop(rootRef);

  return (
    /* `--rv-lift: 0px` — B5's second and only other knob, and it is set
       here on this card's authority as its owner rather than to fix a
       clipping defect (B3 checked, and 6px would not clip). This card's
       interior is a positioned stage with `scrollHeight === height` at
       every measured width and rest rows already compressing 44px ->
       31px, so it takes the quietest entrance of the four: opacity only,
       no offset, the interior arriving as one rigid unit. */
    <div
      className="ps-c5r-root ps-c5r-a"
      ref={rootRef}
      style={{ "--rv-lift": "0px" } as Vars}
      aria-hidden="true"
    >
      <div className="ps-c5r-stage">
        <SearchField />
        {/* THREE unlit rows, not two. Both counts are inside what the owner
            asked for ("the other two or three below it"), and three is what
            the measured box holds: at the 284x392 art face the stacked
            budget comes to 245 of 266 usable pixels with three, and the
            short 280-tall phone dialog -- the one box that cannot take a
            third -- drops the last one in CSS rather than in markup, so the
            reading order stays one thing everywhere. Stepping the plate
            widths 100 / 92 / 84 is the page falling away behind first
            position; it is not decoration, it is what makes first position
            mean anything. */}
        <div className="ps-c5r-results ps-rv-i" style={{ "--i": 1 } as Vars}>
          <ResultRow ours n={0} />
          <ResultRow label={C5R_OTHER} w="100%" n={1} />
          <ResultRow label={C5R_OTHER} w="92%" n={2} />
          <ResultRow label={C5R_OTHER} w="84%" n={3} />
        </div>
      </div>
    </div>
  );
}

/* ═══ CONCEPT B -- THE CONVERSATION, AND WHAT IT RUNS INTO ══════════════
   Symptoms #9, #10 and #11. Somebody asks an assistant the same question,
   in a chat. The assistant goes out to the web: four pages, three of which
   are crossed out because they hand it nothing it can use, and one that is
   lit and legible. Then the reply comes back, and the reply IS our result.
   Three objects and a row of four small ones.
   ═══════════════════════════════════════════════════════════════════════ */
export function SearchVisualB() {
  return (
    <div className="ps-c5r-root ps-c5r-b" aria-hidden="true">
      <div className="ps-c5r-stage">
        <AskBubble />
        <div className="ps-c5r-scan">
          <PageTile dead />
          <PageTile dead />
          <PageTile />
          <PageTile dead />
        </div>
        <ReplyBubble />
      </div>
    </div>
  );
}

/* ═══ CONCEPT C -- THE ONES IT CANNOT READ, AND THE ONE IT CAN ══════════
   ONE ACT, and a different idea from A rather than a recolour of it.
   A is about RANK: ours came first. C is about LEGIBILITY: the same
   question, the same list, and most of what came back hands a reader
   nothing it can use. Two results are crossed out where their content
   should be. Ours is the one that is readable, and that is why it is on
   top. Symptoms #7, #10 and #11 in a single still frame.

   The two-act version that stood here -- search act above, chat act below
   -- is gone deliberately. The animation spec settles it: the card arrives
   as one finished object and then holds absolutely still, so a sequence
   that needs time to be understood cannot be understood at all, and below
   940px the still frame is the only thing a viewer ever gets. It also put
   a second chat exchange on a grid where card 3 already has one.

   THREE PICTURES, NOT THREE COLOURWAYS: A is a ranking, B is a crawl that
   keeps hitting walls, C is a page of results most of which cannot be
   read. Only B uses chat bubbles.
   ═══════════════════════════════════════════════════════════════════════ */
export function SearchVisualC() {
  return (
    <div className="ps-c5r-root ps-c5r-c" aria-hidden="true">
      <div className="ps-c5r-stage">
        <SearchField />
        <div className="ps-c5r-results">
          <ResultRow ours />
          <ResultRow dead w="88%" />
          <ResultRow dead w="76%" />
        </div>
      </div>
    </div>
  );
}

/* ═══ THE SWITCH ═══════════════════════════════════════════════════════
   `?c5=a|b|c|orig`. `orig` returns the fallback -- the artwork that shipped
   before this rebuild -- so the owner gets a live A/B rather than four
   screenshots. Read in an effect, never during render: this is a static
   export, so there is no request-time query string and `useSearchParams()`
   would force a prerender bail inside a card visual.
   ═══════════════════════════════════════════════════════════════════════ */
const C5R_DEFAULT = "a";

export function SearchVisualPick({ fallback }: { fallback: React.ReactNode }) {
  const [pick, setPick] = useState<string>(C5R_DEFAULT);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = new URLSearchParams(window.location.search).get("c5");
    if (!v) return;
    const k = v.toLowerCase();
    if (k === "a" || k === "b" || k === "c" || k === "orig") setPick(k);
  }, []);

  if (pick === "orig") return <>{fallback}</>;
  if (pick === "b") return <SearchVisualB />;
  if (pick === "c") return <SearchVisualC />;
  return <SearchVisualA />;
}
