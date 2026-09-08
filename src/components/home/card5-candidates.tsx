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

import { useEffect, useState } from "react";

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
    <div className="ps-c5r-field">
      <Magnifier />
      <span className="ps-c5r-q">{C5R_QUERY}</span>
      <span className="ps-c5r-caret" />
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
}: {
  ours?: boolean;
  dead?: boolean;
  struck?: boolean;
  label?: string;
  w?: string;
}) {
  if (ours) {
    return (
      <div className="ps-c5r-row ps-c5r-row--ours">
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
      style={{ "--w": w } as Vars}
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
  return (
    <div className="ps-c5r-root ps-c5r-a" aria-hidden="true">
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
        <div className="ps-c5r-results">
          <ResultRow ours />
          <ResultRow label={C5R_OTHER} w="100%" />
          <ResultRow label={C5R_OTHER} w="92%" />
          <ResultRow label={C5R_OTHER} w="84%" />
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
