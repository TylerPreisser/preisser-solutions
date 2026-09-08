"use client";

/* ═══════════════════════════════════════════════════════════════════════
   CARD 5 -- "AI and Search Engine Visibility." -- THREE CANDIDATE VISUALS
   REBUILD 2026-09-07 (round C). LITERAL, BY INSTRUCTION.
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

   COPY: one string, the typed query, capped at ~30 characters (measured).
   Lowercase, because that is how people type. No em dash anywhere.
   ═══════════════════════════════════════════════════════════════════════ */

import { useEffect, useState } from "react";

/* ── COPY BLOCK C4 -- the typed query. Three candidates, owner picks. ──
   Measured ceiling ~30 characters at 17 widths; longer drafts clipped the
   caret at every width except the 640-939 banner. The same string is used
   as the chat question in concepts B and C, so the person asking a search
   engine and the person asking an assistant are asking the same thing --
   which is the whole point of the card. */
const C5R_QUERY_A = "who insures oilfield crews";
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
  compact = false,
  w,
}: {
  ours?: boolean;
  dead?: boolean;
  struck?: boolean;
  compact?: boolean;
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
  return (
    <div
      className={`ps-c5r-row ps-c5r-row--rest${dead ? " ps-c5r-row--dead" : ""}${
        struck ? " ps-c5r-row--struck" : ""
      }${compact ? " ps-c5r-row--compact" : ""}`}
      style={{ "--w": w } as Vars}
    >
      <span className="ps-c5r-rowhead">
        <span className="ps-c5r-mark" />
        <span className="ps-c5r-domain" />
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

/* THE SEND AFFORDANCE. One stroked chevron, no fill, no ids -- what turns a
   rounded row into somewhere you type and send. */
function SendGlyph() {
  return (
    <svg
      className="ps-c5r-send"
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        d="M3.4 8h8.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.4 4.6 11.8 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══ PANEL ONE -- THE SEARCH, AND WHO IS FIRST ═══════════════
   A field with the question typed in it, and the list it returned. The top
   row is lit, tallest, and carries the name. The two rows under it are the
   rest of the page falling away -- they are not decoration, they are what
   makes first position mean anything. No frame around any of it: a panel
   border would turn two recognisable objects into two little windows, and
   a window is card 4's picture, not this one.
   ════════════════════════════════════════════════════════════════════ */
function SerpPanel() {
  return (
    <div className="ps-c5r-panel ps-c5r-panel--serp">
      <SearchField />
      <div className="ps-c5r-results">
        <ResultRow ours />
        <ResultRow w="88%" compact />
        <ResultRow w="76%" compact />
      </div>
    </div>
  );
}

/* ═══ PANEL TWO -- THE SAME QUESTION ASKED OF AN ASSISTANT ══════════
   A conversation, and it has to read as one from the FORM, because it must
   not carry anybody's wordmark. Three things do that and all three are
   generic: two ALTERNATING turns (the person's is filled and hugs the right
   edge, the assistant's is unfilled and starts at the left), a small round
   avatar beside the assistant's turn only, and an input row waiting at the
   foot. No logo, no product name, no branded chrome anywhere.

   The recommendation sits INSIDE the answer, not on top of it: the
   assistant writes two lines and then cites a result, and that cited result
   is the SAME OBJECT as first position in panel one -- same coloured site
   mark, same name, same type. That repetition is the card's whole argument.
   ════════════════════════════════════════════════════════════════════ */
function ChatPanel() {
  return (
    <div className="ps-c5r-panel ps-c5r-panel--chat">
      <div className="ps-c5r-turn ps-c5r-turn--user">
        <span className="ps-c5r-q">{C5R_QUERY}</span>
      </div>
      <div className="ps-c5r-turn ps-c5r-turn--bot">
        <span className="ps-c5r-avatar" />
        <span className="ps-c5r-answer">
          <span className="ps-c5r-line ps-c5r-line--a" />
          <span className="ps-c5r-line ps-c5r-line--b" />
          <span className="ps-c5r-cite">
            <span className="ps-c5r-mark" />
            <span className="ps-c5r-biz">{C5R_BIZ}</span>
          </span>
        </span>
      </div>
      <div className="ps-c5r-input">
        <span className="ps-c5r-inputline" />
        <SendGlyph />
      </div>
    </div>
  );
}

/* ═══ CONCEPT A -- TWO SURFACES, ONE OUTCOME ════════════════════════════
   THE OWNER'S OWN PICTURE, verbatim: "it needs to show one side of the good
   search and then the first thing that pops up there and the top result
   should show Your Business. Then some way to show when a person is having
   a conversation with a chat gpt interface and the top result pops up and
   says Your Business".

   So: two surfaces side by side, and the SAME question typed into both.
   On the left a search engine returns a ranked list and the first row is
   the viewer's business. On the right an assistant answers in a
   conversation and the thing it cites is the same business. The card is
   called "AI AND Search Engine Visibility" and the AND is the picture --
   neither half means much without the other beside it.

   The name is printed in both panels deliberately. It is the same object in
   two places, drawn the same way both times (coloured site mark, the name
   in the link colour), because that repetition is the argument.

   "pops up" is in his words and it is NOT motion here. The finished state
   is drawn at rest: the result has already arrived. Nothing in this file
   animates, so the still frame is the whole picture -- which it has to be,
   since below 940px card 4's hover group does not exist and one 0.65s card
   entrance is all a phone viewer ever sees.
   ═══════════════════════════════════════════════════════════════════════ */
export function SearchVisualA() {
  return (
    <div className="ps-c5r-root ps-c5r-a" aria-hidden="true">
      <div className="ps-c5r-stage">
        <SerpPanel />
        <ChatPanel />
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
