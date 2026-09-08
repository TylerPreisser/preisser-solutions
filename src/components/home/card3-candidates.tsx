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
 * AS-IS - same sheet, same 96x116 box, same image-rendering: pixelated, same
 * knockout token. Never smoothed, never redrawn, never recoloured (ADR-0015).
 *
 * Every composition here puts the machine on Elara's RIGHT, because the only
 * arm he can extend is the one on the viewer's right. That is a pixel fact
 * about the sheet, not a preference. It also fixes the reading order: the
 * question comes in from the left, the machine is on the right, and the answer
 * comes back up between them.
 */

import { useEffect, useRef, useState } from "react";

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
  return <AutomationVisualA />;
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
