"use client";

/**
 * CARD 3 - "AI Integration." - three candidate graphics.
 *
 * ---------------------------------------------------------------------------
 * THE BRIEF, FROM THE OWNER, VERBATIM (2026-09-07):
 *
 *   "for the AI integration one show the robot grabbing the answer from the
 *    database and displaying it as an answer to the question that the user
 *    dropped in."
 *
 * That is a four-beat NARRATIVE and every beat has to be legible in the STILL
 * FRAME, because most viewers never see the flourish:
 *
 *   1  a user drops a question in
 *   2  the robot takes it and reaches into the database
 *   3  it grabs the answer out
 *   4  it presents that answer back, as the answer to THAT question
 *
 * The connective tissue is the picture. A robot, a cylinder and a bubble
 * sitting near each other is not this brief. Two things carry the
 * correspondence, and neither is a label, a legend or an arrow:
 *
 *   (a) OBJECT IDENTITY. The question and the answer are the SAME KIND OF
 *       OBJECT - a paper docket, same stock, same perforated tear edge, same
 *       corner radius. One is dull and DESCENDING into a slot on the left; the
 *       other is lit and ASCENDING out of the machine on the right. Same
 *       object, mirrored motion, opposite state.
 *   (b) THE WORDS. The question docket asks something and the answer docket
 *       answers exactly that. Read the two and the pairing is not in doubt.
 *
 * WHAT WAS REMOVED AND WHY. The previous version of this card put the question
 * and answer in two ROUNDED CHAT BUBBLES with a blinking caret - an outlined
 * one at the top left and a solid accent one right-aligned below it. Read in
 * the row at 1440x900, that is a screenshot of a messaging app, and this row
 * already contains a browser, a dashboard and a search page. It also floated
 * free of the scene: the robot stood 90px clear of a big empty glowing
 * rectangle, touching nothing, holding a blank white card, and the answer sat
 * at the top of the frame with no line of sight to either. Beats 2, 3 and 4
 * were not in the picture. Paper dockets, a slot and a machine are objects, not
 * interface.
 *
 * ---------------------------------------------------------------------------
 * THE CHARACTER IS NOT INVENTED, AND HE IS ALREADY A ROBOT.
 *
 * Elara ships on this homepage today (public/images/marcommand/elara-sheet.webp,
 * rendered by src/styles/marcommand-live.css:515 on the div at
 * src/components/home/marcommand-live.tsx:1368-1370): a pixel-art robot, amber
 * body, teal screen face, four frames from arms-down to full reach. He is used
 * AS-IS - same sheet, same image-rendering: pixelated, same knockout token.
 * Never smoothed, never redrawn, never recoloured.
 *
 * THE ORANGE CHARACTER IS THE CARD-3 AGENT. That is the owner's decision of
 * 2026-09-08, taken after a build replaced him with an abstract hull: "the
 * agent needs to be the orange dude we had before". He is in the shipping
 * scene, not only in these concepts - see `AutomationVisualScene` below and
 * `.ps-c3s-elara` in the stylesheet. Do not swap him for a mark again.
 *
 * A previous version of this block cited "(ADR-0015)" for the never-recoloured
 * rule. THAT CITATION WAS FALSE and is removed: DECISIONS/0015 is about
 * hero-paragraph placement and no ADR governs this character. The reason not to
 * recolour him is a pixel fact, not a decision record - the sheet bakes 30
 * colours and `filter`/`mix-blend-mode`/`opacity` hit all 30, so a hue-rotate
 * for the amber body equally shifts the teal face and the navy outline. Light
 * AROUND him is the technique that works, because `drop-shadow` composites
 * outside the glyph.
 *
 * Every composition here puts the machine on Elara's RIGHT, because the only
 * arm he can extend is the one on the viewer's right. That is a pixel fact
 * about the sheet, not a preference. It also fixes the reading order: the
 * question comes in from the left, the machine is on the right, and the answer
 * comes back up between them.
 */

import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

/* NO COMPONENT-LEVEL CSS IMPORT HERE, DELIBERATELY.
   `src/styles/globals.css:14` already `@import`s this card's stylesheet, and
   Team A owns that line (D28d). Importing it here as well made Next emit the
   sheet into TWO chunks - roughly 31KB duplicated, run through two separate
   PostCSS passes, with the cascade winner decided by which chunk loaded last.
   One import, one chunk, one pass. */

/* ------------------------------------------------------------------ */
/* COPY CANDIDATES                                                     */
/* ------------------------------------------------------------------ */

/**
 * The question the user dropped in. Three candidates; the owner picks.
 * Preview live with ?c3q=0|1|2.
 *
 * Each survives the test: it is an EXECUTIVE's question and not an analyst's
 * (no metric definitions, no segment names, no date range syntax); it is about
 * a number moving the wrong way; and it cannot be answered by anything that
 * cannot read this company's own books - which is the whole subject of the
 * card, because a general model has no way in.
 */
const C3_QUESTIONS = [
  "Why is our ROI down this month?",
  "Why did our margin slip this quarter?",
  "Why are we winning fewer jobs than last month?",
];

/**
 * The answer that came back out. Three candidates; the owner picks.
 * Preview live with ?c3a=0|1|2.
 *
 * Each answers the question DIRECTLY - that direct answering is half of the
 * question-to-answer correspondence the brief asks for - and each could only
 * come from reading this company's own records. None names a client, a date or
 * an outcome.
 *
 * `demo: true` means the line carries a placeholder figure, and the card then
 * shows the house disclaimer that already ships beside the placeholder money in
 * the MarCommand graphic (marcommand-live.tsx:1391, :1462).
 */
type C3Answer = { text: string; demo: boolean };

const C3_ANSWERS: C3Answer[] = [
  { text: "Ad spend rose while close rate held flat.", demo: false },
  { text: "The drop sits in two service lines; the rest held steady.", demo: false },
  { text: "Ad spend rose 18% while close rate held flat.", demo: true },
];

const DEMO_NOTE = "The figures shown are a demonstration.";

/* ------------------------------------------------------------------ */
/* HOOKS                                                               */
/* ------------------------------------------------------------------ */

/**
 * THE FLOURISH GATE - AND IT IS INVERTED ON PURPOSE.
 *
 * The old form hid the art at `opacity: 0` and relied on JavaScript to turn it
 * back on. A sibling card shipped a BLANK NAVY RECTANGLE in WebKit when a single
 * `/_next/static/` chunk 404'd, because there was nothing left to turn it on
 * again. This card has a four-beat sequence and a raster sprite, so it had four
 * more ways to ship nothing than anyone else did.
 *
 * So the polarity is reversed, which is card 4's own pattern
 * (`service-pillars.tsx:2459-2465` never sets its entrance up at all):
 *
 *   DEFAULT (no JS, dead JS, reduced motion, no observer) -> THE FINISHED PICTURE.
 *   JS alive and the card is below the fold             -> arm, then play once.
 *
 * `ps-c3-arm` is added ONLY when JavaScript is alive AND the card is currently
 * off screen. `ps-c3-go` releases it. Every gated rule in the stylesheet is
 * written as `.ps-c3-arm:not(.ps-c3-go)`, so the settled frame is what CSS says
 * by default and the pre-state is the exception. Nothing can strand it.
 *
 * A card that is ALREADY on screen at hydration is never armed at all. That
 * costs the flourish for a deep-link straight to the grid and buys the
 * elimination of any chance of a one-frame flash of the settled picture before
 * arming. The finished picture is always the safe outcome.
 */
function usePsC3Reveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Reduced motion: never arm. The default frame is already the finished one,
       so there is nothing to restore and nothing to delay. This is strictly
       safer than pinning a hidden element back to visible. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    /* Already visible at hydration: leave the finished picture alone. */
    if (onScreen()) return;

    el.classList.add("ps-c3-arm");

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      el.classList.add("ps-c3-go");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            release();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    /* TWO INDEPENDENT FALLBACKS, both gated on VISIBILITY rather than on time
       alone - a bare timer does not remove the failure, it schedules it, and a
       flourish played to an empty room is worse than no flourish.

       Once armed, an observer that never fires would leave the beats at
       `opacity: 0`, so the window in which that can happen is kept short: 2.5s
       plus a 250ms poll. A passive scroll listener covers the case where
       IntersectionObserver itself is the thing that is broken. */
    let poll = 0;
    const settle = () => {
      if (released) return;
      if (onScreen()) {
        release();
        observer.disconnect();
        return;
      }
      poll = window.setTimeout(settle, 250);
    };
    const failsafe = window.setTimeout(settle, 2500);

    const onScroll = () => {
      if (released) return;
      if (onScreen()) {
        release();
        observer.disconnect();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(poll);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return ref;
}

/**
 * Copy picker. Reads ?c3q= and ?c3a= so the owner can compare the three
 * question candidates and the three answer candidates in the live page without
 * a rebuild. Read after mount, never during render, so server and client agree
 * on the first paint. Zero props on the concept components is preserved.
 */
function useC3Copy() {
  const [q, setQ] = useState(0);
  const [a, setA] = useState(0);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const pick = (raw: string | null, max: number) => {
      const n = Number(raw);
      return raw !== null && Number.isInteger(n) && n >= 0 && n < max ? n : 0;
    };
    setQ(pick(p.get("c3q"), C3_QUESTIONS.length));
    setA(pick(p.get("c3a"), C3_ANSWERS.length));
  }, []);

  return { question: C3_QUESTIONS[q], answer: C3_ANSWERS[a] };
}

/* ------------------------------------------------------------------ */
/* THE PAPER - beats 1 and 4, and the correspondence between them      */
/* ------------------------------------------------------------------ */

/**
 * A DOCKET. One object type, two states, and the pair is the whole brief.
 *
 * Both the question and the answer are the same piece of paper: same stock,
 * same 2px corner, same perforated tear edge along the top, same drop shadow.
 * That identity is what makes a viewer read the lit one as the reply to the
 * dull one without being told. The states differ only in light and direction:
 *
 *   QUESTION  dull face, no accent, tipped -2deg, DESCENDING, its bottom edge
 *             swallowed by the slot it is being posted into.
 *   ANSWER    lit face, a solid accent tab down its left edge, tipped +1.5deg,
 *             ASCENDING, its bottom edge washed out by the light coming up out
 *             of the machine it just left.
 *
 * WHY PAPER AND NOT A BUBBLE. A rounded chat bubble with a caret is interface,
 * and the version of this card that used two of them read as a screenshot of a
 * messaging app in a row that already has three pieces of software in it. A
 * perforated docket reads as a physical thing that can be posted into a slot
 * and pulled out of a drawer - which is the only reason beats 1 and 3 are
 * depictable at all.
 *
 * The tear edge is one `repeating-linear-gradient` on a 5px strip, not a row of
 * spans. It is the cheapest possible signal that this is paper.
 */
function Docket({
  kind,
  text,
  demo,
}: {
  kind: "q" | "a";
  text: string;
  demo?: boolean;
}) {
  return (
    <div className={"ps-c3-k-docket ps-c3-k-docket--" + kind}>
      <span className="ps-c3-k-tear" aria-hidden="true" />
      <span className="ps-c3-k-dtext">{text}</span>
      {demo ? <span className="ps-c3-k-demo">{DEMO_NOTE}</span> : null}
    </div>
  );
}

/**
 * Elara, exactly as he already ships.
 *
 * 96x116 is one of only two sizes that stay crisp under
 * `image-rendering: pixelated` (it is exactly half of the 192x232 source cell);
 * 48x58 is the other. Any third size makes him mushy.
 *
 * The knockout is applied per concept and uses `--theme-bg-primary` and nothing
 * else - opaque in both themes (#0A1628 dark, #FFFFFF light). NOT
 * `--theme-card-bg`, which is rgba(255,255,255,0.03) in dark and made the
 * original halo do literally nothing, the bug recorded at
 * marcommand-live.css:540-546.
 *
 * The frame swaps once, idle -> full reach, at the moment he arrives. THE
 * RESTING POSE IS THE FULL REACH, which is what makes the still frame carry
 * beat 2: his arm is inside the machine, not beside it.
 */
function Elara({ className }: { className?: string }) {
  return <div className={"ps-c3-k-elara" + (className ? " " + className : "")} />;
}

/** The ground the scene stands on: a lit plane falling away from the viewer,
 *  with the machine's contact shadow along its top edge, and the line where the
 *  two meet. Without it every scene ended in a hard horizontal cut, which the
 *  900x400 dialog render showed as a seam across the picture. */
function Floor() {
  return (
    <>
      <span className="ps-c3-k-ground" />
      <span className="ps-c3-k-floor" />
    </>
  );
}

/**
 * The scene veil. Dissolves the machine outward from the aperture so the
 * subject sits in the only fully lit part of the frame. It is also the answer
 * to the light-theme surface question: in light it runs to near-white at the
 * corners, which is what keeps this card in the same row as its three siblings
 * instead of reading as the one that failed to load.
 */
function SceneFade() {
  return <span className="ps-c3-k-scenefade" />;
}

/* ------------------------------------------------------------------ */
/* CONCEPT A - THE ERRAND   (DEFAULT)                                  */
/* ------------------------------------------------------------------ */

/**
 * CONCEPT A - THE ERRAND. Two apertures, one journey.
 *
 * Top left, cropped by the frame edge so it plainly comes from outside the
 * picture: a deposit console with a dark mouth in its top face, and the user's
 * question docket standing in that mouth, tipped, its bottom edge already
 * swallowed. That is beat 1, and it is literal - the thing is being dropped in.
 *
 * Bottom right: the database as a physical drum stack - a domed platter cap,
 * three courses with elliptical seams, a base, a contact shadow on the floor.
 * It has weight and it sits on something. A port is open in its near face at
 * exactly arm height and the robot's arm is INSIDE it, to the elbow, with the
 * white interior light spilling past him onto the floor. That is beats 2 and 3.
 *
 * Rising out of that port, overlapping the platter cap and casting its shadow
 * onto it, is the answer docket - the same paper as the question, now lit, with
 * a solid accent tab, standing in a soft column of the machine's own light.
 * That is beat 4.
 *
 * So the eye goes DOWN on the left and UP on the right, and the two ends of
 * that path are the same object in opposite states. The retrieval is in the
 * middle, with an arm in it.
 *
 * Why this depicts the subject: integration is having a way IN. A general model
 * stands outside a company's systems and can only guess; this one has a port,
 * an arm in it, and something in its hand that was not in the question.
 */
export function AutomationVisualA() {
  const root = usePsC3Reveal<HTMLDivElement>();
  const { question, answer } = useC3Copy();

  return (
    <div className="ps-c3-a-root ps-c3-k-root" ref={root} aria-hidden="true">
      {/* THE DATABASE. Body carries the courses; ::before is the domed platter
          cap, ::after is the base ellipse. The two seam rings are spans because
          an ellipse needs its own border-radius. */}
      <span className="ps-c3-a-vault" />
      <span className="ps-c3-a-ring ps-c3-a-ring--1" />
      <span className="ps-c3-a-ring ps-c3-a-ring--2" />

      {/* THE OPEN PORT and the light coming out of it. */}
      <span className="ps-c3-a-port" />
      <span className="ps-c3-a-spill" />

      <Floor />
      <SceneFade />

      {/* The column of the machine's own light that the answer stands in. Sits
          above the veil so the veil cannot erase the one bright event. */}
      <span className="ps-c3-a-beam" />

      <Elara className="ps-c3-a-elara" />

      {/* THE DEPOSIT CONSOLE, cropped by the left edge. Painted AFTER the
          figure so its front face can occlude the question docket's foot. */}
      <span className="ps-c3-a-slot" />

      <div className="ps-c3-a-q">
        <Docket kind="q" text={question} />
      </div>
      <div className="ps-c3-a-a">
        <Docket kind="a" text={answer.text} demo={answer.demo} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONCEPT B - THE SAME MOUTH                                          */
/* ------------------------------------------------------------------ */

/**
 * CONCEPT B - THE SAME MOUTH. One aperture, two directions.
 *
 * The whole frame is the company's index: a wall of identical drawer fronts,
 * each with a bevelled top edge and a pull, running off every edge. One drawer
 * is out - proud of the wall, lit, with the recess it came from behind it - and
 * the robot is at it with his arm inside.
 *
 * The mechanism is different from A and that is the point of having it. There
 * is only ONE hole in this picture. The question docket is going into the top
 * of the open drawer, half swallowed; the answer docket is coming out of the
 * bottom of the same drawer, lit. In and out of the same mouth is the tightest
 * correspondence available, and it needs no second object to carry it.
 *
 * The entire wall is FOUR BACKGROUND LAYERS ON ONE ELEMENT. The version this
 * replaces was 26 spans, and it read as stripes.
 */
export function AutomationVisualB() {
  const root = usePsC3Reveal<HTMLDivElement>();
  const { question, answer } = useC3Copy();

  return (
    <div className="ps-c3-b-root ps-c3-k-root" ref={root} aria-hidden="true">
      <span className="ps-c3-b-wall" />
      <Floor />
      <span className="ps-c3-b-void" />
      <SceneFade />
      <Elara className="ps-c3-b-elara" />
      <span className="ps-c3-b-drawer" />

      <div className="ps-c3-b-q">
        <Docket kind="q" text={question} />
      </div>
      <div className="ps-c3-b-a">
        <Docket kind="a" text={answer.text} demo={answer.demo} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONCEPT C - THE RETURN LINE                                         */
/* ------------------------------------------------------------------ */

/**
 * CONCEPT C - THE RETURN LINE. A circuit rather than an errand.
 *
 * The floor of the frame is the company's systems seen edge on: a solid layered
 * mass, one course per system, running off both sides. A rail runs in from the
 * left carrying the question docket toward a dark intake cut into the mass; the
 * robot stands at the intake with his arm in it; and a second rail, above the
 * first, carries the answer docket back out to the left, lit.
 *
 * The mechanism is a LOOP, which is what separates it from A's single errand
 * and B's single hole: the question and the answer travel the same route in
 * opposite directions, on parallel rails, so the correspondence is the shape of
 * the path itself. It is also the concept that holds up best at the dialog's
 * 900x400, because a loop wants width.
 *
 * The load-bearing lesson from the earlier rebuilds of this scene: the sprite's
 * only pose is a reach, so if the subject of the picture is not at his hand,
 * the picture has no action in it.
 */
export function AutomationVisualC() {
  const root = usePsC3Reveal<HTMLDivElement>();
  const { question, answer } = useC3Copy();

  return (
    <div className="ps-c3-c-root ps-c3-k-root" ref={root} aria-hidden="true">
      <span className="ps-c3-c-strata" />
      <span className="ps-c3-c-cut" />
      <Floor />
      <SceneFade />
      <span className="ps-c3-c-railin" />
      <span className="ps-c3-c-railout" />
      <Elara className="ps-c3-c-elara" />

      <div className="ps-c3-c-q">
        <Docket kind="q" text={question} />
      </div>
      <div className="ps-c3-c-a">
        <Docket kind="a" text={answer.text} demo={answer.demo} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PICKER                                                              */
/* ------------------------------------------------------------------ */

/**
 * ?c3=a|b|c|orig. No parameter falls through to the designer's default, which
 * is **concept A**. `orig` returns the artwork that shipped before this run, so
 * the owner has a live A/B in the same page.
 *
 * A IS THE DEFAULT, AND IT IS A SET-LEVEL DECISION AS MUCH AS A PICTURE ONE.
 * Judged alone, B's full-bleed wall is the more atmospheric image. Judged in a
 * row of five it loses twice: the wall makes this much the darkest card in
 * light - a critic reading it in real Safari recorded a first impression of
 * "that card failed to load" - and its vertical ground duplicates card 5's bar
 * motif, and card 5 has no concept without bars, so this is the only place the
 * duplication can be removed. A confines its mass to one side, so the ground
 * stays near-white in light, and its lit port is a DEPICTED LIT SURFACE, which
 * is the same lever card 4 uses to read clean.
 *
 * B and C REMAIN SELECTABLE at `?c3=b` and `?c3=c`.
 */
export function AutomationVisualPick({
  fallback,
}: {
  fallback: React.ReactNode;
}) {
  const [pick, setPick] = useState<string>("");

  useEffect(() => {
    setPick(new URLSearchParams(window.location.search).get("c3") ?? "");
  }, []);

  if (pick === "orig") return <>{fallback}</>;
  if (pick === "b") return <AutomationVisualB />;
  if (pick === "c") return <AutomationVisualC />;
  /* Illustrator's proof sheet for the two marks. Not a concept and not
     shippable composition - it exists so the marks can be judged from PIXELS
     at their real size, inside the real card, on the real tokens, in both
     themes, and inside the double mount. Reading the SVG source tells you what
     was intended; only the render tells you what exists. */
  if (pick === "marks") return <C3MarksSheet />;
  /* Concepts A, B and C stay reachable at ?c3=a|b|c, and the artwork that
     shipped before this run at ?c3=orig, so the owner keeps a live A/B in the
     same page. The default is now the five-beat scene. */
  if (pick === "a") return <AutomationVisualA />;
  return <AutomationVisualScene />;
}

/* D28c note. These three concepts are built entirely from CSS boxes, gradients
   and the existing Elara raster. They contain no <svg>, no <defs> and no id of
   any kind, so the double mount (card face at service-pillars.tsx:1916 and the
   portal dialog at :2214) has nothing to collide on. There is therefore no
   `ps-c3-${uid}-<part>` id to emit, and `useId()` is not called. If a later
   revision adds an <svg>, every defs id it creates must be built that way, from
   React's useId() - duplicate ids do not throw, they resolve to the first match
   in document order, so the dialog copy would silently render with the card
   face's gradient and look NEARLY right. */


/* ==================================================================== */
/* THE MARKS  -  database, agent, bead                                  */
/*                                                                      */
/* Owned by the illustrator. These exports are FORM ONLY: no position,  */
/* no margin, no animation, no connecting lines. The scene owns          */
/* placement, the lines and every beat of the motion.                   */
/*                                                                      */
/* WHY SVG AND NOT MORE CSS BOXES. The concepts above are CSS boxes      */
/* because they are big soft masses filling the whole frame. A mark that */
/* has to stay legible at ~80px inside a 298.7px-wide card (940px        */
/* viewport - the NARROWEST the card ever gets, narrower than the same   */
/* card on a 430px phone) needs a silhouette, and a silhouette needs     */
/* paths.                                                               */
/*                                                                      */
/* ID DISCIPLINE - D28c. Every card visual MOUNTS TWICE: the card face   */
/* at service-pillars.tsx:1901 and the bottom-sheet dialog at :2298, so  */
/* while a card is open there are two copies of each of these SVGs in    */
/* the document at once. Duplicate ids do not throw - `url(#x)` binds to */
/* the FIRST match in document order, so the dialog copy would take the  */
/* card face's gradients and render NEARLY right, which is the worst     */
/* kind of wrong. Each mark therefore calls useId() ITSELF, so the two   */
/* mounts get different ids, and every id is written                     */
/* `ps-c3-${uid}-<part>`.                                               */
/*                                                                      */
/* THE .replace IS LOAD-BEARING. React 19's useId() returns ids of the   */
/* form `«r0»`. Guillemets are legal in an HTML id but NOT legal         */
/* unescaped inside `url(#...)`, so the reference silently fails to      */
/* resolve and the shape renders black. Strip to [A-Za-z0-9].            */
/*                                                                      */
/* COLOUR. Not one raw hex. Object tones are the `--c3-vault*` /         */
/* `--c3-port*` roles declared on `.ps-c3-k-root`                        */
/* (card3-candidates.css:363-386), already mapped per theme: mid-slate   */
/* lifted OFF a navy ground in dark, near-black ink CONCENTRATED on a    */
/* near-white ground in light. The one accent is --theme-accent-text     */
/* (globals.css:70 / :203). Never #0D95E8 - superseded and forbidden at  */
/* globals.css:53-55. --color-green is not used here at all.            */
/* ==================================================================== */

/** Strip React 19's `«»` out of useId() so the value is safe in `url(#…)`. */
function useMarkId() {
  return useId().replace(/[^a-zA-Z0-9]/g, "");
}

/** The four gradients every mark shares, emitted once per mount under that
 *  mount's own prefix. Kept in one place so the two marks agree about where
 *  the light is - upper left, the same direction the CSS vault above already
 *  uses. Two objects lit from two directions read as two drawings. */
function MarkDefs({ p }: { p: string }) {
  return (
    <>
      {/* Curved wall: a lit sliver at the left edge falling to the darkest
          tone at the right. */}
      <linearGradient id={p + "wall"} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--c3-vaultcap)" />
        <stop offset="3%" stopColor="var(--c3-vault2)" />
        <stop offset="32%" stopColor="var(--c3-vault)" />
        <stop offset="58%" stopColor="var(--c3-vault)" />
        <stop offset="88%" stopColor="var(--c3-vaultdk)" />
        <stop offset="100%" stopColor="var(--c3-vaultedge)" />
      </linearGradient>

      {/* A surface turned up into the light. */}
      <linearGradient id={p + "lit"} x1="0.08" y1="0" x2="0.92" y2="1">
        <stop offset="0%" stopColor="var(--c3-vaultcap)" />
        <stop offset="52%" stopColor="var(--c3-vault2)" />
        <stop offset="100%" stopColor="var(--c3-vault)" />
      </linearGradient>

      {/* A surface turned away, or one with something standing on it. */}
      <linearGradient id={p + "dim"} x1="0" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="var(--c3-portdark)" />
        <stop offset="100%" stopColor="var(--c3-vaultdk)" />
      </linearGradient>

      {/* Contact shadow. Radial to zero-alpha GROUND, never to `transparent`:
          transparent is rgba(0,0,0,0) and interpolates through black, which
          puts a grey bruise under every mark in light theme. */}
      <radialGradient id={p + "cast"} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="var(--c3-cast)" />
        <stop offset="55%" stopColor="var(--c3-cast)" />
        <stop offset="100%" stopColor="var(--c3-veil0)" />
      </radialGradient>

      {/* Light spilling out of an aperture onto the shell around it. Depicted
          light, not a filter: one gradient-filled rect costs nothing and,
          unlike feGaussianBlur, renders identically in every engine. */}
      <radialGradient id={p + "spill"} cx="0.34" cy="0.5" r="0.62">
        <stop offset="0%" stopColor="var(--theme-accent-text)" stopOpacity="0.6" />
        <stop offset="52%" stopColor="var(--theme-accent-text)" stopOpacity="0.18" />
        <stop offset="100%" stopColor="var(--theme-accent-text)" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

/**
 * THE DATABASE.
 *
 * Brief: "there's going to be a database icon in the top left that you design,
 * okay, labeled database."
 *
 * This is the one mark on the card that is allowed to be a CONVENTIONAL SIGN,
 * and that is a call rather than a lapse. The ban on stock imagery exists to
 * stop lazy METAPHORS for abstract ideas - a brain for intelligence, a gear for
 * process. A database is not an abstract idea; it is a named object sitting
 * under a label that reads "Database", and the disc stack is its sign the way a
 * magnifying glass is search's. Refusing it to look original would buy nothing
 * and cost legibility at 80px.
 *
 * The design work is therefore in HOW it is drawn:
 *
 *   - THREE UNEQUAL TIERS on a WIDER PLINTH, not an extruded cylinder with two
 *     lines ruled across it. 44 units, then 34, then a 16-unit base at a larger
 *     radius. The step is the silhouette.
 *   - PORTRAIT, 96 wide by 117 tall. The first build of this mark was 90 x 78
 *     and the render read as a paint tin, because a squat cylinder with a big
 *     open mouth is a tin. Height is what makes it a stack.
 *   - The lower tiers' caps are filled from --c3-portdark, so each seam is a
 *     CAST SHADOW from the tier standing on it rather than a ruled line.
 *   - A RECESSED DOCK PORT on the shoulder that faces the agent, so the lines
 *     the agent throws have somewhere to land. Without it they stop against a
 *     blank wall and read as decoration.
 *
 * No numbers, no rows, no field names, no chart. Nothing here is data.
 */
export function C3Database({ className }: { className?: string }) {
  const uid = useMarkId();
  const p = "ps-c3-" + uid + "-";

  return (
    <svg
      className={"ps-c3-m ps-c3-m-db" + (className ? " " + className : "")}
      viewBox="0 0 96 110"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <MarkDefs p={p} />
      </defs>

      {/* Contact shadow first, so the mass SITS on something. */}
      <ellipse cx="48" cy="100" rx="45" ry="8" fill={"url(#" + p + "cast)"} />

      {/* BOTTOM - the plinth, at a larger radius than the two above it. */}
      <path d="M9 78 L9 92 A39 10.5 0 0 0 87 92 L87 78 Z" fill={"url(#" + p + "wall)"} />
      <ellipse cx="48" cy="78" rx="39" ry="10.5" fill={"url(#" + p + "dim)"} />

      {/* MIDDLE. */}
      <path d="M14 52 L14 78 A34 9 0 0 0 82 78 L82 52 Z" fill={"url(#" + p + "wall)"} />
      <ellipse cx="48" cy="52" rx="34" ry="9" fill={"url(#" + p + "dim)"} />

      {/* TOP - the tallest tier, and the one carrying the port. */}
      <path d="M14 16 L14 52 A34 9 0 0 0 82 52 L82 16 Z" fill={"url(#" + p + "wall)"} />
      <ellipse cx="48" cy="16" rx="34" ry="9" fill={"url(#" + p + "lit)"} />
      <ellipse
        cx="48"
        cy="16"
        rx="34"
        ry="9"
        fill="none"
        stroke="var(--c3-vaultcap)"
        strokeWidth="1.7"
      />

      {/* THE SEAMS, and they are not optional.

          An earlier build drew each tier's cap ellipse and then the tier above
          with an IDENTICAL rx/ry bottom arc, so the arc covered the cap exactly
          and not one pixel of crescent survived. The render came back as a
          single smooth drum: a stack with no visible stack. Each seam is now a
          shadow line cast by the tier standing on it, with a lit rim under it
          where the disc below turns back into the light.

          Weights are set for FORTY PIXELS. A 3.5-unit stroke in a 110-unit box
          is 1.3 px at the smallest size the scene allocates; anything thinner
          disappears there, and this pair of lines is the whole reason the mark
          reads as three objects rather than one. */}
      <path d="M14 52 A34 9 0 0 0 82 52" fill="none" stroke="var(--c3-portdark)" strokeWidth="3.5" opacity="0.72" />
      <path d="M14 54.5 A34 9 0 0 0 82 54.5" fill="none" stroke="var(--c3-vaultcap)" strokeWidth="1.6" opacity="0.26" />
      <path d="M14 78 A34 9 0 0 0 82 78" fill="none" stroke="var(--c3-portdark)" strokeWidth="3.5" opacity="0.72" />
      {/* Held at 0.26, not 0.42: two bright rims plus two dark seams read as
          the HOOPS ON A BARREL once the mark is drawn at size. */}
      <path d="M9 80.5 A39 10.5 0 0 0 87 80.5" fill="none" stroke="var(--c3-vaultcap)" strokeWidth="1.6" opacity="0.26" />

      {/* THE DOCK PORT, on the shoulder that faces the agent, and the anchor
          the scene's `--out` / `--back` wires terminate on. Deliberately a
          HORIZONTAL recess: a clip-path wipe reveals along one axis, so a wire
          arriving along the horizontal wipes into this cleanly, where an
          oblique approach would not.

          ANCHOR: (72, 32.5) - the port rect's RIGHT EDGE at its own mid-line,
          read straight off the rect below: x 40 + width 32 = 72, y 27 + h 11/2
          = 32.5. Consumers want it as a fraction of the mark's WIDTH, because
          `.ps-c3-m` is `width: 100%; height: auto` and width is the only
          dimension the scene sets:

              x = 72 / 96   = 0.75000
              y = 32.5 / 96 = 0.33854      (NOT /110 - width, not height)

          This comment previously read "(87, 32.5)". 87 is the PLINTH's radius,
          15 units past the port's edge and 5 units outside the silhouette at
          that height - a wire terminating there floats clear of the mark. It
          was copied off the plinth path twelve lines above. Caught by the scene
          builder reading the comment against the rect, which is the only reason
          it is written derived-from-the-rect now: a bare number here is a
          number nobody can check. */}
      <rect x="40" y="27" width="32" height="11" rx="5.5" fill="var(--c3-portdark)" />
      <rect x="43" y="30" width="17" height="5" rx="2.5" fill="var(--theme-accent-text)" />
      <rect x="40" y="37.4" width="32" height="1.4" rx="0.7" fill="var(--c3-vaultcap)" opacity="0.55" />
    </svg>
  );
}

/**
 * THE AGENT  -  concept 1, "the column".
 *
 * Brief: "there's going to be the AI agent ... in the top right", and later
 * "from the agent, the robot agent, into the database".
 *
 * The owner said ROBOT and the owner is not overruled. What is refused is the
 * stock ROBOT FACE - two dot eyes, a mouth grille, an antenna, a boxy head
 * bolted to a boxy torso. That is on the ban list, and it is also, more to the
 * point, exactly what this card ships TODAY: a pixel-art robot standing beside
 * a data cylinder holding a torch. Redrawing that in vectors is the same
 * picture at a higher resolution.
 *
 * So: an autonomous machine with no face, from three decisions.
 *
 *   1  ONE CONTINUOUS MASS, with STRAIGHT PARALLEL SIDES. No head, no neck, no
 *      torso, no limbs, and nothing in the silhouette that can be parsed as a
 *      head sitting on a body - that parse is the specific thing that makes a
 *      shape read "cartoon robot". The straight sides are load-bearing: the
 *      first build of this mark was a smooth teardrop and the render read as an
 *      EGG, because a curve with no straight run and no hard edge has no
 *      architecture. A machined column cannot be mistaken for an organism.
 *   2  ONE APERTURE, DOING BOTH JOBS. A recessed slot across the shoulder, lit
 *      along its left half. The message-bead goes IN there and the lines to the
 *      database come OUT of there. One hole, one story. A separate intake and
 *      emitter needs a caption to explain, and a picture that needs a caption
 *      is a diagram.
 *   3  IT DOES NOT TOUCH THE GROUND. The base stops twelve units above its own
 *      contact shadow. No feet, no wheels, no plinth: the thing is
 *      self-directed, and a floating mass says so without a label.
 *
 * The aperture is deliberately ASYMMETRIC - the lit half sits on the left,
 * toward the database, and the slot is clipped so it cuts a notch clean through
 * the left outline. That gives the mark a FACING without giving it a face.
 *
 * The collar near the base is not decoration: it is the second horizontal, and
 * two horizontals on a vertical mass is what stops the eye reading the slot as
 * a lone stripe on a blank pill.
 */
export function C3AgentColumn({ className }: { className?: string }) {
  const uid = useMarkId();
  const p = "ps-c3-" + uid + "-";
  /* SQUARE, AND THAT IS THE SPEC'S NUMBER, NOT A PREFERENCE. The scene
     allocates the agent 42x42 / 48x48 / 54x54 / 66x66 - a square at every tier,
     including in the 900 px dialog. An earlier build of this mark was a tall
     0.79 column; dropped into a 42 px square it rendered 42x53 and overflowed
     its own box by eleven pixels. A squat hull also survives the small end
     better than a tall one: at a fixed WIDTH, squat spends more pixels per unit
     of silhouette.

     THE SILHOUETTE IS DIRECTIONAL, AND IT HAD TO BE FIXED TWICE. A symmetric
     dome with a shallow chamfer read as a COMPUTER MOUSE in the light-theme
     render. What it needed was a prow: the apex is now pulled LEFT of centre,
     at x40 in a body spanning 14 to 88, and the chamfer is a long 32 x 28 cut
     down the dark side rather than a corner nick. High on the left, falling
     away to the right, banked eleven degrees, floating twelve units clear of
     its own shadow - that is a mass with a heading, and a mouse has no heading. */
  const BODY =
    "M14 42 C14 22 24 10 40 10 L56 10 L88 38 L88 60 C86 80 74 86 50 86 C26 86 14 78 14 60 Z";

  return (
    <svg
      className={"ps-c3-m ps-c3-m-agent" + (className ? " " + className : "")}
      viewBox="0 0 104 104"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <MarkDefs p={p} />
        <clipPath id={p + "body"}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* The shadow it is NOT standing on. Outside the banked group, and level:
          the shadow belongs to the ground, not to the object. */}
      <ellipse cx="47" cy="98" rx="30" ry="5" fill={"url(#" + p + "cast)"} />

      {/* THE BANK. The whole mass is tipped eight degrees toward the database,
          about a pivot at its own base.

          This is the single change that turned the mark from an object into an
          agent. Upright and level, the render read as a cartridge - something
          parked. Banked, with no ground contact under it, it reads as a mass
          HOLDING A HEADING: attending to the thing it is aimed at. Eight
          degrees, not fifteen; past about ten it stops looking poised and
          starts looking knocked over. */}
      <g transform="rotate(-11 51 84)">
        <path d={BODY} fill={"url(#" + p + "wall)"} />

        <g clipPath={"url(#" + p + "body)"}>
          {/* THE SLOT, and it does both jobs: the bead goes IN here and C2's
              lines come OUT of here. One hole, one story - a separate intake
              and emitter needs a caption, and a picture that needs a caption is
              a diagram.

              Sized for FORTY-TWO PIXELS. The recess is 16 units in a 104-unit
              box (6.5 px at the smallest tier) and the lit bar is 9 (3.6 px).
              The previous weights were 14 and 7 in a 132-unit box - 4.5 px and
              2.2 px at the same tier - and the render showed the whole mark
              collapsing to a dark blob with a blue hairline.

              It overshoots the outline on the left so the clip cuts it flush
              with the profile: a notch through the body, not a decal painted on
              the front. The lit half sits on the LEFT, toward the database, so
              the mark has a FACING without having a face.

  THE LINE ANCHOR, AND THE NUMBER IS DERIVED, NOT EYEBALLED.

              The slot's centre exits the left outline at (14, 46). The bank is
              rotate(-11 51 84), so the anchor a wire must meet is:

                dx = -37, dy = -38, cos = 0.98163, sin = -0.19081
                x' = 51 - 36.320 - 7.251  =  7.43   ->  7.14 % of 104
                y' = 84 +  7.060 - 37.302 = 53.76   -> 51.69 % of 104

              ANY CHANGE TO THE BODY, THE SLOT'S y, OR THE BANK ANGLE INVALIDATES
              THOSE TWO PERCENTAGES. That is not a hypothetical: I handed the
              scene (11.5, 40.5) = 11.1 % / 38.9 %, computed against the earlier
              rotate(-8 52 86) body with the slot at y 40, and did not recompute
              after moving the slot to 38 and the bank to -11. It went into the
              scene's database-offset formula and put the wire 5.07 px off this
              port at tier S, rising to ~8.4 px in the dialog. Caught only by
              measuring the y-centroid of the DRAWN ACCENT PIXELS against the
              prediction - the DOM rect cannot see it, because the rect is right
              and the fraction inside it is wrong.

              The slot is HORIZONTAL on purpose: a clip-path wipe reveals along
              one axis, so a wire leaving along the horizontal wipes cleanly. */}
          <rect x="2" y="38" width="80" height="16" rx="8" fill="var(--c3-portdark)" />
          <rect x="2" y="38" width="80" height="16" rx="8" fill={"url(#" + p + "spill)"} />
          <rect x="8" y="41.5" width="38" height="9" rx="4.5" fill="var(--theme-accent-text)" />
          {/* Near lip, catching the light coming out of the slot. */}
          <rect x="2" y="53.4" width="80" height="2" rx="1" fill="var(--c3-vaultcap)" opacity="0.62" />
        </g>

        {/* Bevel along the lit edge, and the turn from flank into keel. Two
            strokes; they are what keep the mass from reading flat in the
            dialog, and they cost nothing at the small tiers where they simply
            stop resolving. */}
        {/* Bevel along the lit edge, over the prow only.

            A second stroke used to run along the lower flank, where the body
            turns into the keel. In the light-theme render at 42 px it read as a
            PARTING LINE and the whole mark read as a computer mouse. One
            highlight, on the leading edge, is the entire lighting model this
            mark needs. */}
        <path
          d="M15.6 42 C15.6 23 25 11.6 40 11.6 L56 11.6"
          fill="none"
          stroke="var(--c3-vaultcap)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.82"
        />
      </g>
    </svg>
  );
}

/**
 * THE BEAD - the message on its way in.
 *
 * Brief: the message "animates ... into like a blob or whatever" and goes into
 * the agent. The blob's own form was left open, so this is it.
 *
 * A single dense lozenge of accent light with a BLUNT LEADING EDGE and a tail
 * drawn out behind it, because that is the shape of something being PULLED IN
 * rather than something flying under its own power. A cluster of particles was
 * the obvious alternative and it fails at this size: below about 40px a cluster
 * is noise, and it has no front, so it cannot dock into the agent's slot.
 *
 * Drawn travelling LEFT TO RIGHT. The scene mirrors it with scaleX(-1) if the
 * composition runs the other way; nothing but the gradient has a direction.
 *
 * No glyph, no text, no figure. A message with words on it would be inventing
 * content.
 */
export function C3Bead({ className }: { className?: string }) {
  const uid = useMarkId();
  const p = "ps-c3-" + uid + "-";
  const SHAPE =
    "M54 17 C54 25.5 45.5 31.5 34 31.5 C21 31.5 8 25.5 1.5 17 C8 8.5 21 2.5 34 2.5 C45.5 2.5 54 8.5 54 17 Z";

  return (
    <svg
      className={"ps-c3-m ps-c3-m-bead" + (className ? " " + className : "")}
      viewBox="0 0 56 34"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={p + "core"} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--theme-accent-text)" stopOpacity="0" />
          <stop offset="34%" stopColor="var(--theme-accent-text)" stopOpacity="0.5" />
          <stop offset="72%" stopColor="var(--theme-accent-text)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--theme-accent-text)" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={p + "halo"} cx="0.62" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--theme-accent-text)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--theme-accent-text)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="35" cy="17" rx="21" ry="16" fill={"url(#" + p + "halo)"} />
      <path d={SHAPE} fill={"url(#" + p + "core)"} />
      {/* Specular on the leading shoulder: gives it a surface. */}
      <ellipse cx="41" cy="10.8" rx="6.4" ry="2.9" fill="var(--color-white, #fff)" opacity="0.3" />
    </svg>
  );
}

/**
 * PROOF SHEET  -  `?c3=marks`.
 *
 * The marks at the sizes the scene will actually use, in the real card, on the
 * real tokens, inside the real double mount. An iteration surface for the
 * illustrator, NOT the composition: placement here is the crudest thing that
 * puts the database left and the agent right so the marks can be read against
 * each other.
 *
 * `SceneFade` is deliberately absent. It is concept A's veil, tuned to dissolve
 * outward from concept A's aperture, and in light theme it washed the first
 * build of these marks to mid-grey - which read as a defect in the marks when
 * it was a defect in the harness.
 *
 * The label reads exactly "Database", as specified. It is the only text.
 */
function C3MarksSheet() {
  const root = usePsC3Reveal<HTMLDivElement>();

  /* THE SIZE LADDER. `?c3=marks&sz=1`.
     The scene spec allocates these marks 40x46 / 46x52 / 52x58 on the card face
     and 64x110 in the dialog, and the agent 42 / 48 / 54 / 66 SQUARE. Those are
     an order of magnitude smaller than the sizes the first proof sheet judged
     them at. A mark that is beautiful at 196px and mud at 40px has not been
     tested; this row is the test. Every width below is a number lifted from the
     spec's own tier table, not a round number I chose. */
  const [ladder, setLadder] = useState(false);
  const [rig, setRig] = useState(false);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("sz");
    setLadder(v === "1");
    setRig(v === "2");
  }, []);

  /* PORT-COLLINEARITY PROOF, `?c3=marks&sz=2`.
     C2's §17 lists "never rendered the real marks inside the composition" as
     its first un-assessed item, and its database vertical offset is derived
     from port fractions I supplied. This renders the REAL marks at C2's exact
     tier-S geometry with that offset applied, and draws the wire at the
     computed y. If both ports sit on the line, the offset is right; if either
     is off it, it is visible immediately. Diagnostic only. */
  if (rig) {
    return (
      <div className="ps-c3-m-sheet ps-c3-k-root" ref={root} aria-hidden="true">
        <div className="ps-c3-m-rig-db"><C3Database /></div>
        <div className="ps-c3-m-rig-agent"><C3AgentColumn /></div>
        <span className="ps-c3-m-rig-wire" />
      </div>
    );
  }

  if (ladder) {
    return (
      <div className="ps-c3-m-sheet ps-c3-k-root" ref={root} aria-hidden="true">
        <div className="ps-c3-m-ladder">
          {[40, 46, 52, 64].map((w) => (
            <div className="ps-c3-m-rung" key={"d" + w} style={{ width: w }}>
              <C3Database />
              <span className="ps-c3-m-label">Database</span>
            </div>
          ))}
          {[42, 48, 54, 66].map((w) => (
            <div className="ps-c3-m-rung" key={"a" + w} style={{ width: w }}>
              <C3AgentColumn />
            </div>
          ))}
          {[14, 16].map((w) => (
            <div className="ps-c3-m-rung" key={"b" + w} style={{ width: w }}>
              <C3Bead />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ps-c3-m-sheet ps-c3-k-root" ref={root} aria-hidden="true">
      <div className="ps-c3-m-slot ps-c3-m-slot--db">
        <C3Database />
        <span className="ps-c3-m-label">Database</span>
      </div>
      <div className="ps-c3-m-slot ps-c3-m-slot--agent">
        <C3AgentColumn />
      </div>
      <div className="ps-c3-m-slot ps-c3-m-slot--bead">
        <C3Bead />
      </div>
    </div>
  );
}

/* ==================================================================== */
/* THE SCENE  -  five beats, four transitions, and the loop's return.   */
/*                                                                      */
/* Spec: `.work-order/specs/ai-integration-scene.md`. The marks above    */
/* are the illustrator's; this owns placement, the lines, the beats and  */
/* every transition between them.                                       */
/*                                                                      */
/* THE ONE STRUCTURAL RULE. The JSX below, with NO JavaScript running    */
/* at all, is the finished resting frame: the question typed in the      */
/* input, the panel open with the answer, both bars at full width, both  */
/* marks lit, both wires drawn. `card3-candidates.css`'s base cascade    */
/* says so, and the driver's only job is to take that frame apart and    */
/* put it back together. Add `.ps-c3s-run`, animate, remove it.          */
/*                                                                      */
/* That polarity is not a preference. R8 measured five animation shapes  */
/* against this page's live cascade: an `opacity: 0` base plus a         */
/* keyframe with no fill-mode rests at opacity 0 PERMANENTLY under       */
/* `prefers-reduced-motion: reduce`, and neither the `globals.css:4639`  */
/* catch-all nor axe reports it. There is no such shape here, by         */
/* construction, and `reduce` gets the whole story in one readable       */
/* frame rather than a blank card.                                       */
/* ==================================================================== */

/**
 * A question and the answer that came back.
 *
 * EVERY STRING IN HERE IS THE OWNER'S, VERBATIM. `a` is split only so the two
 * figures can carry `font-weight: 700` as well as the accent colour - meaning
 * is never left to hue alone. `bars` re-presents those same two figures at true
 * proportion; it introduces no client, date, currency or additional number.
 *
 * NOTHING IS INVENTED HERE. Pairs 2-5 are a copy input the owner supplies; the
 * spec (S8.3) records them as not existing and instructs shipping the array at
 * length 1 until they do. The machinery below is byte-identical at any length -
 * four more entries is the whole change.
 */
type C3SPair = {
  q: string;
  /** The answer, split only so the figures can carry weight as well as accent. */
  a: Array<{ t: string; em?: boolean }>;
  /** The two rows' units. The bars render ONLY when these match - see below. */
  unit: [string, string];
  /** label, printed figure, and the magnitude the bar is drawn from. */
  rows: Array<{ lab: string; fig: string; v: number }>;
};

/**
 * THE FIVE ROTATION PAIRS (#18). Pair 1 is the owner's verbatim copy and never
 * changes. Pairs 2-5 are illustrative generic percentages: no company, no
 * client, no date, no dollar amount, and nothing added around them.
 *
 * Every row's label and figure is lifted from its own sentence. Nothing here is
 * a number the sentence does not already state.
 *
 * TWO DIFFERENT PAIRS ARE THE TWO WORST CASES, and sizing to either one alone
 * ships a defect:
 *   - ANSWER axis: pair 1, 86 characters, a 103.8px panel against 88.7px for
 *     the other four, leaving 9.2px of slack in the 113px stage at 272x320.
 *   - QUESTION axis: pair 2, 34 characters against pair 1's 31. Sizing the
 *     input to pair 1 overruns on rotation 2 ONLY - which is precisely the
 *     defect that survives a spot-check of the first frame.
 */
const C3S_PAIRS: C3SPair[] = [
  {
    q: "why is our ROI down this month?",
    a: [
      { t: "Our marketing ad spend increased by " },
      { t: "30%", em: true },
      { t: " this month and our sales only increased by " },
      { t: "1%", em: true },
      { t: "." },
    ],
    unit: ["%", "%"],
    rows: [
      { lab: "Ad spend", fig: "+30%", v: 30 },
      { lab: "Sales", fig: "+1%", v: 1 },
    ],
  },
  {
    /* THE MIXED-UNIT PAIR, and it is the reason `unit` exists at all. 9% against
       14 days are not commensurable: drawing them as proportional bars would
       assert a comparison the data does not support, which is the same failure
       as inventing a figure. The bars drop; the two labelled rows and their
       figures stay, at the same row count and the same panel height. */
    q: "why is cash tight if sales are up?",
    a: [
      { t: "Sales rose " },
      { t: "9%", em: true },
      { t: " this quarter but customers are paying invoices " },
      { t: "14 days", em: true },
      { t: " later." },
    ],
    unit: ["%", "days"],
    rows: [
      { lab: "Sales", fig: "+9%", v: 9 },
      { lab: "Invoices paid", fig: "+14 days", v: 14 },
    ],
  },
  {
    q: "why are our margins shrinking?",
    a: [
      { t: "Material costs rose " },
      { t: "11%", em: true },
      { t: " this quarter and our prices only rose " },
      { t: "2%", em: true },
      { t: "." },
    ],
    unit: ["%", "%"],
    rows: [
      { lab: "Material costs", fig: "+11%", v: 11 },
      { lab: "Prices", fig: "+2%", v: 2 },
    ],
  },
  {
    q: "why are we losing customers?",
    a: [
      { t: "Our support response time rose " },
      { t: "40%", em: true },
      { t: " and repeat orders fell " },
      { t: "12%", em: true },
      { t: "." },
    ],
    unit: ["%", "%"],
    rows: [
      { lab: "Response time", fig: "+40%", v: 40 },
      { lab: "Repeat orders", fig: "-12%", v: 12 },
    ],
  },
  {
    q: "why are jobs finishing late?",
    a: [
      { t: "Job volume rose " },
      { t: "22%", em: true },
      { t: " this quarter and our billable hours only rose " },
      { t: "4%", em: true },
      { t: "." },
    ],
    unit: ["%", "%"],
    rows: [
      { lab: "Job volume", fig: "+22%", v: 22 },
      { lab: "Billable hours", fig: "+4%", v: 4 },
    ],
  },
];

/** Bars are a true proportion only if the two values are commensurable. */
const c3sHasBars = (p: C3SPair) => p.unit[0] === p.unit[1];

/** A row is negative if the figure the card PRINTS says so. Derived from the
 *  copy rather than added to it: no pair gains a field, and the bar can never
 *  disagree with the number at the end of its own row. */
const c3sNeg = (r: { fig: string }) => r.fig.trim().startsWith("-");


/**
 * Beat 2's thought. Three candidates were measured in the real box; this is the
 * only one that is TWO lines at the tightest box (272px), which holds the panel's
 * height change between beat 2 and beat 4 to a single line-height - a 15.2px
 * morph instead of 30.4px. Less motion for the same information.
 */
/* NO EM DASH. `scripts/validate-seo.mjs` fails the build on U+2014 in rendered
   copy (ADR-0009 decision 5), and this string is rendered. The colon carries the
   same "here is what follows" beat. This is NOT the owner's verbatim copy - that
   is the question, the answer, `Calculating… running algorithms` and `Database`,
   none of which contain an em dash and none of which may be edited. */
const C3S_THOUGHT = "Reading all business data: this month vs last, and vs year to date.";

/** Verbatim. */
const C3S_CALC = "Calculating… running algorithms";

/**
 * THE TIMELINE, AND EVERY ROW OF IT IS A TRANSITION OR A HOLD - THERE ARE NO
 * CUTS.
 *
 * Five states plus the four transitions between them plus the loop's return to
 * rest. A version of this scene with five correct beats joined by hard cuts
 * satisfies every other requirement and fails the only one that is about
 * motion, so the `t*` rows are the deliverable as much as the `b*` rows are.
 *
 * The driver does nothing per frame: it sets one attribute and sleeps. CSS runs
 * every transition, because R7 measured compositing - not scripting - as this
 * page's dominant cost, and this is the page's SECOND infinite loop.
 *
 * Entry is separate (see `start`): the rest frame holds 1400ms, T0 rewinds it
 * over 460ms, and only then does this list begin. T6 loops back to index 0, not
 * to T0, because after T6 there is nothing left to rewind.
 *
 * Sum of the rows below is 16,600ms (was 15,440). The spec's prose says
 * 15,780ms; the per-row durations are what shipped, and b2/b4/b5 were re-cut to
 * hold the answer rather than the atmosphere - see b5.
 */
const C3S_TIMELINE: Array<{ beat: string; ms: number }> = [
  { beat: "b0", ms: 400 },   /* the full stop between pairs, ghost placeholder */
  { beat: "t1", ms: 1600 },  /* 1100 sweep + 500 hold - the question types      */
  { beat: "b1", ms: 620 },   /* the blob flies                                  */
  { beat: "t2", ms: 480 },   /* absorbed; last answer morphs into the thought   */
  { beat: "b2", ms: 2200 },  /* 240 text-in + 1960 hold - the thought           */
  { beat: "t3", ms: 520 },   /* the wire travels OUT, agent -> database         */
  { beat: "b3a", ms: 260 },  /* the database lights                             */
  { beat: "b3b", ms: 520 },  /* the wire travels BACK, database -> agent        */
  { beat: "b3c", ms: 260 },  /* the agent lights                                */
  { beat: "b3d", ms: 400 },  /* hold                                            */
  { beat: "t4", ms: 260 },   /* cross-fade to "Calculating..."                  */
  { beat: "b4", ms: 1200 },
  { beat: "t5", ms: 940 },   /* 420 morph + 520 bars - the answer arrives       */
  { beat: "b5", ms: 6300 },  /* THE PAYOFF, AND IT IS HELD, NOT VISITED.
                                 4200 put the answer band on screen for 51.5% of
                                 the cycle; the answer is the only beat anyone is
                                 here for, so it gets 6300 while the thought and
                                 the calculating line - which are atmosphere, and
                                 which were the voids between the answer and the
                                 next one - give back 640 and 300. Cycle 15,440
                                 -> 16,600ms.                                    */
  { beat: "t6", ms: 640 },   /* the return to rest; the question un-types       */
  /* AND THE ANSWER STAYS UP FROM HERE UNTIL T2. See card3-candidates.css, the
     note above the T0 rules: the panel used to shut across t6/b0/t1/b1 and the
     card was measurably empty for 25.3% of the cycle. The loop now rests on the
     completed answer between cycles, which is the frame `reduce` renders. */
];

const C3S_HOLD_REST = 1400;
const C3S_T0 = 460;
/** After the fifth pair, one extra rest so five pairs read as five and not as
 *  an infinite stream. */
const C3S_SEAM = 800;
/** Leaving the viewport snaps to the rest frame on a curve, then tears down. */
const C3S_SNAP = 200;

/**
 * THE DRIVER.
 *
 * One `setTimeout` chain, one attribute, zero per-frame JavaScript.
 *
 * It refuses to run in five situations and every one of them was a measured
 * requirement rather than a nicety:
 *
 *   1  `prefers-reduced-motion: reduce`. Checked BEFORE anything is written,
 *      and with a `change` listener, not a one-shot. R8 S1c records that the
 *      existing guard in this repo is a one-shot with no listener and that
 *      "this stops being benign the moment the reduce path has to STOP
 *      something". This one has to stop something.
 *   2  The card is under 20% visible. R7 measured this page already spending
 *      11.6% of idle main thread (15.2% on mobile at 4x CPU) on 19-20 infinite
 *      animations; a second loop running behind the fold is pure cost.
 *   3  The tab is hidden.
 *   4  A dialog is covering the card. The visual MOUNTS TWICE - card face at
 *      `service-pillars.tsx:1901` and the portal dialog at `:2298` - and with
 *      the dialog open both are live, so without this two loops run at once and
 *      one of them is behind an overlay.
 *   5  The mount is the short dialog. At 280px tall the usable band is 190px
 *      and the answer panel with its bars overflows the stage by a measured
 *      3.1px. A clear still beats a cramped clipped animation, and it removes
 *      the second concurrent loop exactly on the form factor where R7 measured
 *      the worst cost.
 *
 * On every one of those the result is the same single frame: the base cascade,
 * with `.ps-c3s-run` and `data-beat` REMOVED rather than parked. The teardown
 * is load-bearing - on card 1, leaving the classes on left the resting card
 * 863/813/808 px off pristine across three engines, because an element still
 * carrying an opacity rule composites its text with grayscale antialiasing
 * instead of subpixel. After a full teardown that diff was 0.
 */
function usePsC3Scene(
  pairCount: number,
  ask: () => void,
  commit: () => void,
  resync: () => void
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const inDialog = !!el.closest(".ps-dialog-visual-art");

    let timer = 0;
    let settle = 0;
    let step = -1;
    let live = false;
    let onScreen = false;
    let short = false;
    let seam = false;

    /* WCAG 2.2.2, and the sibling card does the same thing - card 2 pauses its
       carousel on `pointerenter` at card2-candidates.tsx:790. Held in a closure
       and NOT in React state: a state change re-runs this effect, and this
       effect's teardown removes `.ps-c3s-run` and the beat, so "pause" would
       have restarted the scene from the rest frame. No focusable control is
       added, deliberately - both mounts of this visual sit inside `aria-hidden`
       containers and a focusable element in an `aria-hidden` subtree is a real
       defect. */
    let paused = false;
    let pending: (() => void) | null = null;

    /* EVERY wait in this driver goes through here, so hover pauses the entry
       hold and the beat chain alike. A beat that comes due while paused parks
       its continuation instead of running it, so the scene freezes at a BEAT
       BOUNDARY - a settled frame by construction, because every transition has
       finished by the time its beat ends - and never mid-transition, which is
       the frame a `transition`-driven scene cannot be stopped in. */
    const at = (ms: number, fn: () => void) => {
      timer = window.setTimeout(() => {
        timer = 0;
        if (paused) {
          pending = fn;
          return;
        }
        fn();
      }, ms);
    };

    const clear = () => {
      window.clearTimeout(timer);
      window.clearTimeout(settle);
      timer = 0;
      settle = 0;
      pending = null;
    };

    const tick = () => {
      step += 1;
      if (step >= C3S_TIMELINE.length) step = 0;
      const s = C3S_TIMELINE[step];
      el.setAttribute("data-beat", s.beat);
      /* THE TWO COPY SWAPS, AND EACH IS PLACED WHERE ITS OWN TEXT IS NOT ON
         SCREEN. The question moves on at b0, where `.ps-c3s-qtext` is clipped to
         zero width; the answer follows at b2, where the answer slot has been
         `0fr` since T2 and stays that way until T5. Between those two points the
         card shows the PREVIOUS answer under the NEXT question - which is what
         fills the hole the loop used to have, and is also how a real assistant
         behaves: the last answer stays on screen while you type again. */
      if (s.beat === "b0") ask();
      else if (s.beat === "b2") commit();
      at(step === 0 && seam ? s.ms + C3S_SEAM : s.ms, tick);
      if (step === 0) seam = false;
    };

    /* Entry, and it deliberately does not start at beat 0. A viewer who glances
       once sees the ANSWER, not an empty box - and it makes the still frame,
       the reduce frame, the no-JS frame and the off-screen frame the same
       frame, which is what makes the guarantee above provable instead of
       hopeful. Re-entry uses the same path, so there is exactly one entry
       behaviour to reason about. */
    const start = () => {
      if (live) return;
      live = true;
      clear();
      el.classList.add("ps-c3s-run");
      el.setAttribute("data-beat", "rest");
      at(C3S_HOLD_REST, () => {
        el.setAttribute("data-beat", "t0");
        at(C3S_T0, () => {
          step = -1;
          tick();
        });
      });
    };

    const halt = () => {
      if (!live) return;
      live = false;
      clear();
      /* THE FRAME THIS SETTLES INTO MUST BE A COHERENT PAIR. Halting during the
         run-up would otherwise park the card with the NEXT question over the
         PREVIOUS answer, and the correspondence between those two is the whole
         claim the card makes. `resync` puts the question back on the answer
         that is showing. */
      resync();
      el.setAttribute("data-beat", "rest");
      settle = window.setTimeout(() => {
        el.classList.remove("ps-c3s-run");
        el.removeAttribute("data-beat");
      }, C3S_SNAP);
    };

    const covered = () =>
      !inDialog && !!document.querySelector(".ps-dialog-visual-art");

    const sync = () => {
      const ok =
        !mq.matches &&
        !short &&
        onScreen &&
        document.visibilityState === "visible" &&
        !covered();
      if (ok) start();
      else halt();
    };

    const sizeCheck = () => {
      const next = inDialog && el.clientHeight <= 320;
      if (next !== short) {
        short = next;
        sync();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    const ro = new ResizeObserver(sizeCheck);
    ro.observe(el);

    /* The dialog is `createPortal`'d onto the body, so its arrival and
       departure are a body child-list change and nothing else. */
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { childList: true });

    /* MOUSE ONLY, for card 2's reason (card2-candidates.tsx:790): `pointerenter`
       also fires for the first touch of a tap, and treating that as hover leaves
       a phone paused for ever because no `pointerleave` is ever coming. */
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") paused = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      paused = false;
      const resume = pending;
      pending = null;
      if (resume && live) resume();
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    document.addEventListener("visibilitychange", sync);
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else mq.addListener(sync);

    short = inDialog && el.clientHeight <= 320;

    return () => {
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", sync);
      if (mq.removeEventListener) mq.removeEventListener("change", sync);
      else mq.removeListener(sync);
      clear();
      el.classList.remove("ps-c3s-run");
      el.removeAttribute("data-beat");
    };
  }, [pairCount, ask, commit, resync]);

  return ref;
}

/** An upward arrow in a filled accent disc. No `<defs>`, no gradient, no id -
 *  see the note on `AutomationVisualScene`. */
function C3SSend() {
  return (
    <span className="ps-c3s-send">
      <svg viewBox="0 0 12 12" role="presentation" aria-hidden="true" focusable="false">
        <path
          d="M6 10.2 L6 2.6 M2.7 5.9 L6 2.4 L9.3 5.9"
          fill="none"
          stroke="var(--color-white, #ffffff)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * THE COMPOSITION.
 *
 * SVG DEFS IDS: this component emits NONE, which is the safest way to satisfy
 * the double-mount hazard rather than a way of dodging it. The announced prefix
 * is `ps-c3s-${useId()}-<part>` and it is available the moment anything here
 * needs a gradient; today the send glyph is a stroked path and the wires, the
 * pill, the panel and the bars are boxes, so there is nothing to collide on.
 * The two marks carry their own `ps-c3-<uid>-` ids and each calls `useId()`
 * itself, so the four extra copies this scene mounts (the lit layers) each get
 * a distinct prefix. That property is asserted, not assumed - see the report.
 */
export function AutomationVisualScene() {
  /* `pair` is the ANSWER on screen. `ahead` says the question has already moved
     on to the next pair while that answer is still up - the state the loop rests
     in between cycles, and the reason the card is never empty.

     THE INVARIANT: `ahead` is false at every point the card can be seen at rest.
     The driver clears it on `halt`, and it is only ever true between b0 and b2,
     which cannot happen without `.ps-c3s-run`. So the still frame, the no-JS
     frame, the server render and the reduce frame all show a question and ITS
     OWN answer - the correspondence the brief is built on. */
  const [pair, setPair] = useState(0);
  const [ahead, setAhead] = useState(false);
  const ask = useCallback(() => setAhead(true), []);
  const commit = useCallback(() => {
    setPair((p) => (p + 1) % C3S_PAIRS.length);
    setAhead(false);
  }, []);
  const resync = useCallback(() => setAhead(false), []);
  const root = usePsC3Scene(C3S_PAIRS.length, ask, commit, resync);
  const data = C3S_PAIRS[pair] ?? C3S_PAIRS[0];
  /* One render, two pairs: `commit` bumps `pair` and clears `ahead` in the same
     batch, so this index does not move on that render and the question does not
     flicker while the answer behind it is being replaced. */
  const qData = C3S_PAIRS[ahead ? (pair + 1) % C3S_PAIRS.length : pair] ?? data;
  const bars = c3sHasBars(data);
  const barMax = Math.max(...data.rows.map((r) => r.v));
  /* One negative row turns the whole track into a zero axis, because the two
     bars have to share one. All-positive pairs keep the full-width track they
     shipped with. */
  const signed = data.rows.some(c3sNeg);

  /* Measured ONCE PER LAYOUT, never per frame: the question span's width (which
     the caret rides), the wire's length (which the packet rides), and the
     blob's start point and delta. Writing them as custom properties keeps the
     CSS declarative and keeps JavaScript out of the animation itself.

     These persist through teardown on purpose. Nothing consumes them in the
     rest frame - the caret is `opacity: 0`, the packet is `opacity: 0` and the
     blob is `opacity: 0` - so they are pixel-neutral at rest and re-entry is
     instant. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const measure = () => {
      const wrap = el.querySelector(".ps-c3s-wrap");
      const qt = el.querySelector(".ps-c3s-qtext");
      const wire = el.querySelector(".ps-c3s-wire");
      const send = el.querySelector(".ps-c3s-send");
      const agent = el.querySelector(".ps-c3s-agent");
      if (!wrap || !qt || !wire || !send || !agent) return;

      const w = wrap.getBoundingClientRect();
      const s = send.getBoundingClientRect();
      const a = agent.getBoundingClientRect();

      el.style.setProperty("--c3s-qw", qt.getBoundingClientRect().width.toFixed(2) + "px");
      el.style.setProperty("--c3s-wire-len", wire.getBoundingClientRect().width.toFixed(2) + "px");
      el.style.setProperty("--c3s-steps", "steps(" + Math.max(1, qData.q.length) + ", end)");

      const sx = s.left + s.width / 2 - w.left;
      const sy = s.top + s.height / 2 - w.top;
      /* AIM AT HIS HAND. RE-DERIVED FOR ELARA, NOT ADAPTED FROM THE MARK.
         The old pair 0.1941 / 0.4931 described `C3AgentColumn`'s lit slot bar
         inside a 104-wide viewBox banked -11deg. The agent is now a 192x232
         pixel-art cell with no viewBox and no bank, so those numbers describe
         nothing here - and the file already records this exact error happening
         once undetectably (see `C3AgentColumn`: the wire went 5.07px off at
         tier S and the DOM rect could not see it, because the rect was right
         and the fraction inside it was wrong).

         Derived by reading the DRAWN ALPHA of frame 4 - the resting frame, so
         the docking point is correct in the still card, the `reduce` card, the
         no-JS card and the server render, all four of which show frame 4. On a
         canvas at native size, the teal hand at the end of the extended right
         arm is the pixels with green > red + 20 and green > 90 at x >= 150:
         115 of them, bbox x 154..173, y 132..148, centroid (161.887, 138.009).

           x = 161.887 / 192 = 0.8432      y = 138.009 / 232 = 0.5949

         NOTE THE SECOND TERM READS `a.height`. It used to read `a.width` for
         both axes and that was correct while the agent was a square; Elara is
         48x58, so the same fraction on the wrong axis lands (58-48)*0.5949 =
         5.94px HIGH of his hand - a miss no `getBoundingClientRect` assertion
         can see, because the rect would be right and the fraction inside it
         wrong. Verified on drawn pixels instead: rendered at deviceScaleFactor
         4 so the cell maps 1:1 to device pixels, the predicted point sits
         0.008px in x and 0.257px in y from the teal hand's measured centroid,
         worst case over ten viewports in both themes. 0.25px is one device
         pixel at that scale, i.e. the floor of the instrument. */
      const ax = a.left + a.width * 0.8432 - w.left;
      const ay = a.top + a.height * 0.5949 - w.top;
      el.style.setProperty("--c3s-blob-x", sx.toFixed(2) + "px");
      el.style.setProperty("--c3s-blob-y", sy.toFixed(2) + "px");
      el.style.setProperty("--c3s-blob-dx", (ax - sx).toFixed(2) + "px");
      el.style.setProperty("--c3s-blob-dy", (ay - sy).toFixed(2) + "px");
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [qData.q, root]);

  return (
    <div className="ps-c3s-root ps-c3-k-root" ref={root} aria-hidden="true">
      <div className="ps-c3s-wrap">
        <div className="ps-c3s-marks">
          <div className="ps-c3s-db">
            <span className="ps-c3s-mark">
              <C3Database />
              <span className="ps-c3s-lit">
                <C3Database />
              </span>
            </span>
            {/* The only text in the scene that is not the owner's copy, and it
                is the owner's copy: "labeled database". `--theme-text-secondary`
                and not `--theme-text-muted` - muted is 4.27:1 on the light
                ground and fails AA. */}
            <span className="ps-c3s-dblabel">Database</span>
          </div>

          {/* Three elements, and direction is carried by GROWTH and by a moving
              packet, never by a fade. */}
          <div className="ps-c3s-wire">
            <span className="ps-c3s-wire__out" />
            <span className="ps-c3s-wire__back" />
            <span className="ps-c3s-packet" />
          </div>

          {/* THE AGENT IS ELARA - the same sprite that ships lower on this
              page, at the same pixel scale discipline, unmirrored.

              UNMIRRORED IS A GEOMETRY DECISION, NOT A PREFERENCE. The only arm
              the sheet extends is on the viewer's RIGHT, and the send glyph is
              pinned to the right edge of the question pill while the agent is
              inset 64px from the card's right - so the message always arrives
              from his lower right (`--c3s-blob-dx` measured negative at all
              sixteen boxes, -66.09 to -82.20). Unmirrored, the incoming bead
              meets the hand that is reaching for it. Mirrored on this layout it
              would fly PAST his body to a hand on his far side.

              Two copies, exactly as the database has two: the base sprite and
              the lit sprite. The lit one is byte-identical and carries only
              accent drop-shadows, because 30 colours are baked into the sheet
              and a filter that tints the amber equally tints the teal face. */}
          <div className="ps-c3s-agent">
            <span className="ps-c3s-mark ps-c3s-mark--elara">
              <span className="ps-c3s-elara" />
              <span className="ps-c3s-lit">
                <span className="ps-c3s-elara" />
              </span>
            </span>
          </div>
        </div>

        <div className="ps-c3s-stage">
          {/* Not a spacer. This box IS the gap between the agent and the panel,
              which is what lets the leader line be drawn without anyone knowing
              the panel's height. */}
          <div className="ps-c3s-leader" />

          <div className="ps-c3s-panel">
            <div className="ps-c3s-slot ps-c3s-slot--thought">
              <p className="ps-c3s-thought">{C3S_THOUGHT}</p>
            </div>
            <div className="ps-c3s-slot ps-c3s-slot--calc">
              <p className="ps-c3s-calc">
                {C3S_CALC}
                <i className="ps-c3s-calc__caret" />
              </p>
            </div>
            <div className="ps-c3s-slot ps-c3s-slot--ans">
              <div className="ps-c3s-ans">
                <p className="ps-c3s-ans__line">
                  {data.a.map((seg, i) =>
                    seg.em ? <b key={i}>{seg.t}</b> : <span key={i}>{seg.t}</span>
                  )}
                </p>
                {/* Same grid, same two rows, same height, whether or not the
                    bars are drawn. When the units differ the middle column is
                    simply empty - the two labelled quantities and their figures
                    still stack on a common right-aligned axis, so the magnitude
                    reads without a chart that would be lying. */}
                <div className={"ps-c3s-bars" + (signed ? " ps-c3s-bars--signed" : "")}>
                  {data.rows.map((r, i) => (
                    <Fragment key={r.lab}>
                      <span className="ps-c3s-bars__lab">{r.lab}</span>
                      {bars ? (
                        <span className="ps-c3s-bars__track">
                          <i
                            className={
                              "ps-c3s-bars__fill ps-c3s-bars__fill--" +
                              (i === 0 ? "a" : "b") +
                              (c3sNeg(r) ? " ps-c3s-bars__fill--neg" : "")
                            }
                            /* Half the track each side of the axis when there is
                               an axis, so both bars stay true to the same max. */
                            style={{ width: (r.v / barMax) * (signed ? 50 : 100) + "%" }}
                          />
                        </span>
                      ) : (
                        <span className="ps-c3s-bars__nobar" />
                      )}
                      <span className="ps-c3s-bars__fig">{r.fig}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ps-c3s-stagefoot" />
        </div>

        <div className="ps-c3s-input">
          <div className="ps-c3s-pill">
            <span className="ps-c3s-ghost">Ask anything&#8230;</span>
            <span className="ps-c3s-qwrap">
              <span className="ps-c3s-qtext">{qData.q}</span>
              <span className="ps-c3s-caret" />
            </span>
            <C3SSend />
          </div>
        </div>

        {/* Two nested elements: the outer carries X on one curve, the inner Y on
            another. Two different curves on the two axes is a curved path, with
            no `offset-path` support question and no layout at any frame. */}
        <span className="ps-c3s-blob">
          <span className="ps-c3s-blob__in">
            <C3Bead />
          </span>
        </span>

        {/* THE IMPACT RING - "and then splashes into place". It needs NOTHING
            from JavaScript: the docking point is `(--c3s-blob-x +
            --c3s-blob-dx, --c3s-blob-y + --c3s-blob-dy)`, which `measure()`
            already writes for the bead, so the ring is a pure `calc()` over
            four properties that exist. It is deliberately absent from
            `measure()`'s five-`querySelector` guard: adding a sixth would
            create a new early return, and that fallback freezes the caret and
            flattens every question to 31 steps. */}
        <span className="ps-c3s-splash" aria-hidden="true" />
      </div>
    </div>
  );
}
