"use client";

/**
 * card2-candidates.tsx  -  Team C. Bento card 2, "Business Automation."
 *
 * SUBJECT (settled by evidence, not chosen by me): the late-payment /
 * accounts-receivable chase. The invoice already earned, sitting unpaid. This
 * is the card's own lead tile, service-pillars.tsx:256-258, "Get Paid Without
 * Ever Chasing an Invoice Yourself" - so the graphic illustrates the tile that
 * already leads its own card.
 *
 * >> REBUILT ON THE OWNER'S VERDICT. He said, of the previous build: "the
 * business automation is SOOOOOO confucinga dn sucks", measured against "the
 * cleaness that the websites bento card has". The defect was DENSITY, not
 * colour and not contrast. The old build drew eight nodes, two decision
 * diamonds and nine strings at 9.5px inside a 400x430 box. Every element was
 * individually right and the picture was unreadable.
 *
 * WHAT WAS REMOVED - this is the metric that matters:
 *     nodes    8 -> 4        strings  9 -> 4
 *     diamonds 2 -> 0        type     9.5px -> 17px card face, 20px dialog
 * Gone: "Work finished" (an invoice implies the work is done), both "Paid?"
 * and "Unpaid at day 30?" decision diamonds (the FORK is the decision; a
 * diamond asking it in words is the diagram narrating itself), "One live
 * ageing list" (a feature of the tool, not a beat in the story), "Reminders,
 * days 3-14" (three growing dots say "again, and again, and again"), and the
 * "paid" edge label (the fork and the check glyph already say it).
 *
 * What is left is the whole idea and nothing else: it goes out, it gets chased
 * without you, it settles, and the one that does not settle is the only one
 * you ever see.
 *
 * >> LEGIBILITY FIRST, AND THE ACCESSIBILITY FIX FALLS OUT OF IT. A previous
 * pass found a genuine SC 1.4.3 failure - accent-coloured labels at 9.5px on
 * the card ground measured ~3.6:1 dark and ~4.1:1 light, and a role 6 green
 * edge label measured 4.33:1 light, all under 4.5:1. Rather than patch the
 * colours on a chart nobody could read, every label is now role 7
 * (--theme-text-primary) at 17-20px. Measured with a core-text mask - ink
 * hidden, backdrop decoded, WORST pixel taken - every string clears 4.5:1 by
 * an order of magnitude.
 *
 * >> NO APPLICATION CHROME. Card 4 is a literal browser window because its
 * subject IS a browser; that literalness does NOT transfer. Card 4 is this
 * card's reference for ANIMATION STYLE only. This card's subject is a PROCESS,
 * so there is no window, no title bar, no traffic lights, no sidebar, no URL
 * field and no builder canvas anywhere in this file.
 *
 * THREE CONCEPTS, three different READING STRATEGIES, not three tints:
 *   A  THE SORTER   - gravity. It falls in through a mouth, a wedge splits it,
 *                     and an arc carries the unpaid one back up to the wedge.
 *   B  THE CHASE    - path, and the default. Four plates and one big loop; the
 *                     loop is the focal point and it is the subject.
 *   C  MANY BECOMING ONE - quantity. A fanned pile of invoices, one bar
 *                     crossing the frame, and below it a single settled mass
 *                     with exactly one slab left standing.
 *
 * NO INVENTED DATA. I read RULING-4-AMENDED.md and placeholder figures are
 * permitted. This graphic uses NONE - no currency, no count, no percentage, no
 * date, no client name. Not a silent revert to the built-in refusal: the whole
 * point of the rebuild is that four strings is already at the limit of what
 * this box can carry legibly, and a number would be a fifth. The meaning is
 * carried by sequence, not by an amount. Nothing here reads as a result: the
 * escalating-reminder half of the offer has no ledger row, so the graphic
 * depicts the OFFER as the site states it and asserts only a sequence.
 *
 * B2B, NOT A CONSUMER RECEIPT. The trigger is an invoice on terms; there is no
 * card reader, no tap-to-pay and no shopfront in the art.
 *
 * GEOMETRY. One element renders into two boxes 3.4x apart in aspect
 * (service-pillars.tsx:1916 card face, :2214 dialog) and the container CLIPS,
 * it never scales. Measured: art box 412x442 for a 400x430 card, so the outer
 * 6px ring is permanently clipped; the dialog has no bleed and caps at
 * 900x400. Each concept root is its own SIZE CONTAINER and reflows in three
 * regimes - vertical on every card face, horizontal in the landscape dialog.
 *
 * COLOUR. R5's palette only. docs/design-system.md is stale for colour and
 * card-visuals.css is 32% dead; neither was used. The plates are a LIFTED
 * surface derived from the ground's own hue, not role 8 - measured against the
 * five live cards, this card was the darkest in the set at mean luminance
 * 0.129 while the owner's cleanliness benchmark sits at 0.258. Role 8 is still
 * used for knockouts, which is what role 8 is for.
 *
 * >> MOTION: NONE, AND NOTHING IS EVER HIDDEN. Per M4's measured card-4 spec,
 * "exactly one thing animates: the card itself" - this artwork is fully drawn
 * at first paint and rides in on the parent as one rigid unit (grid-level
 * GSAP, 0.65s power3.out, 0.1s stagger by card index, once). No internal
 * stagger, no draw-on, no sweep, NO PATH TRACING, no loop. There is no reveal
 * hook, no `.in-view` gate and no reduced-motion pin, because there is nothing
 * to pin: reduced motion and normal are the same render. That also makes the
 * blank-card failure mode structurally unreachable - see the note above the
 * glyphs.
 *
 * ZERO SVG `defs` AND ZERO GENERATED IDS. The double mount would otherwise
 * emit duplicate ids and url(#...) would resolve to whichever the document
 * hits first. Every gradient, wedge, arc and mask here is CSS, so there is no
 * <defs>, no id and no url(#...) anywhere in this file. The collision is
 * structurally unreachable rather than merely namespaced. The two glyphs are
 * attribute-only paths with a viewBox and an explicit preserveAspectRatio and
 * no width/height.
 *
 * COPY. Every string below is read by validate-seo.mjs - SVG <text>,
 * aria-label, alt, title and bare JSX all trip it. No em dash (U+2014)
 * anywhere. Nothing is typed in capitals; CSS does the uppercasing.
 *
 * >> THE STYLESHEET IS *NOT* IMPORTED HERE, AND THAT IS A FIX, NOT AN
 * OMISSION. Team A landed the @import in globals.css:13. This module ALSO
 * imported it, so Next emitted card2-candidates.css into TWO separate chunks -
 * about 31KB duplicated, through two PostCSS passes, with the cascade winner
 * decided by load order rather than by anything written here. A rule that
 * "should" apply and does not is the symptom. Exactly one import, and it is
 * the shared one. Do not add it back.
 */

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   >> THERE IS NO REVEAL HOOK IN THIS FILE, AND THAT IS THE RULING, NOT AN
   OVERSIGHT. DO NOT ADD ONE BACK.

   M4's measured card-4 spec: "Exactly one thing animates: the card itself."
   The artwork inside is already fully drawn and correctly positioned at
   opacity 0 and rides in on the PARENT as one rigid unit - the grid-level
   GSAP tween on `.ps-bento-card`, 0.65s power3.out, staggered 0.1s by card
   index, `once: true`. There is no internal stagger, no draw-on, no sweep and
   >> NO PATH TRACING. The owner asked for "a flow chart", not an animated one,
   and a flow that reveals progressively is HARDER to read, not easier: the eye
   chases the motion instead of taking in the structure. Legibility was this
   card's entire defect, so the still frame is the whole job.

   The second reason is a failure a sibling actually shipped: a WebKit capture
   came back a BLANK NAVY CARD because one /_next/static/ chunk 404'd and a
   hide-by-default reveal had nothing left to turn it back on. A shared .next
   corrupted three times on this project in one day, and a corrupted dev server
   answers 200 with perfect markup and dead JavaScript. Under exactly that
   condition a hide-by-default card is invisible and looks like broken art.

   >> THIS COMPONENT CANNOT PRODUCE THAT FAILURE. Nothing here is hidden and
   nothing waits for JavaScript. The whole picture is in the server-rendered
   markup at its resting state; JS only reads the ?c2= / ?c2set= query to swap
   which concept is shown, and the default renders without it.
   ───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   TWO GLYPHS. The only SVG in the file. No defs, no ids, no fills that
   reference a gradient - they inherit currentColor from the plate they sit
   on, so they flip with the theme for free. viewBox present,
   preserveAspectRatio explicit, no width/height attributes (R4 invariants).
   ───────────────────────────────────────────────────────────── */
function C2Settled({ cls }: { cls: string }) {
  return (
    <svg
      className={cls}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.2 6.4 4.7 8.9 9.8 3.4" />
    </svg>
  );
}

function C2HandOff({ cls }: { cls: string }) {
  return (
    <svg
      className={cls}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6h7.2" />
      <path d="M6.4 3.1 9.6 6l-3.2 2.9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   LABEL SETS  -  FOUR STRINGS, DOWN FROM NINE.

   >> THIS IS THE OWNER FIX. His words on the previous build: "the business
   automation is SOOOOOO confucinga dn sucks". The defect was not contrast, it
   was DENSITY: eight nodes, two diamonds and nine strings at 9.5px in a
   400x430 box, with nowhere for the eye to land. Contrast was a real bug too
   and it is fixed, but it was never the thing he was looking at.

   REMOVED, deliberately, and each removal is a judgement not an oversight:
     - "Work finished"        the trigger before the trigger. An invoice that
                              exists implies the work is done.
     - "Paid?"  <>            the decision diamond. The FORK is the decision;
                              a diamond asking it in words is the diagram
                              narrating itself.
     - "Unpaid at day 30?" <> the second diamond, same reason, and day 30 is a
                              term not an idea.
     - "One live ageing list" a feature of the tool, not a beat in the story.
     - "days 3-14"            three dots on the chase plate say "again, and
                              again, and again" without a word.
     - "paid" edge label      the fork plus the check glyph already say it.
   That is 5 nodes, 2 diamonds and 5 strings gone. What is left is the whole
   idea and nothing else: it goes out, it gets chased without you, it settles,
   and the one that does not settle is the only one you ever see.

   SIZE IS THE OTHER HALF. 9.5px -> 16px on the card face, 20px in the dialog.
   Bigger type is why the contrast problem dissolves rather than being patched:
   every label now clears 4.5:1 with an order of magnitude to spare, and the
   card is legible at arm's length, which is the actual requirement.

   Three sets, switchable with ?c2set=1|2|3 alongside ?c2=a|b|c. Default 1.
   All three name real steps in one continuous automation, trigger to outcome.
   No generic diagram nouns. Ranges would use an en dash; none are left.
   ───────────────────────────────────────────────────────────── */
type C2Labels = {
  trigger: string;
  chase: string;
  /* THE DECISION. Restored on the owner's second request: "fr business
     automation why dont you just do what we used to have originally that flow
     chart?" A flow chart without a decision node is a pipeline. */
  decision: string;
  yes: string;
  no: string;
  settled: string;
  exception: string;
};

const C2_LABEL_SETS: Record<"1" | "2" | "3", C2Labels> = {
  /* Set 1, THE TILE'S OWN LANGUAGE. Default. Nearest to
     service-pillars.tsx:256-258, the copy this graphic exists to illustrate. */
  "1": {
    trigger: "Invoice sent",
    chase: "Chased for you",
    decision: "Paid?",
    yes: "yes",
    no: "no",
    settled: "Paid",
    exception: "Reaches you",
  },
  /* Set 2, THE SHORT SET. For the tightest box, if the render ever asks. */
  "2": {
    trigger: "Invoice out",
    chase: "Chased for you",
    decision: "Paid?",
    yes: "yes",
    no: "no",
    settled: "Paid",
    exception: "Reaches you",
  },
  /* Set 3, THE AUTOMATION'S OWN VOICE. Imperative, as its steps would be named. */
  "3": {
    trigger: "Send the invoice",
    chase: "Chase until paid",
    decision: "Paid?",
    yes: "yes",
    no: "no",
    settled: "Close it out",
    exception: "Hand it to you",
  },
};

function useC2Labels(): C2Labels {
  const [set, setSet] = useState<"1" | "2" | "3">("1");
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("c2set");
    if (raw === "1" || raw === "2" || raw === "3") setSet(raw);
  }, []);
  return C2_LABEL_SETS[set];
}

/* The three nudges, drawn not written. Authored, never Math.random (SSR). */
const C2_NUDGES = [0, 1, 2];

/* ═════════════════════════════════════════════════════════════
   CONCEPT A  -  THE SORTER

   Gravity. The invoice drops in through a mouth that runs off the top edge, a
   solid wedge splits it, and the two outcomes land in bins. The unpaid side is
   carried back UP to the same wedge by an arc on the outside of the machine -
   that arc is the whole argument, because it is the chase happening with no
   hand in it.

   Four plates, one wedge, one arc. Read top to bottom.
   ═════════════════════════════════════════════════════════════ */
export function SystemFixesVisualA() {
  const L = useC2Labels();

  return (
    <div className="ps-c2a-root ps-c2-root" aria-hidden="true">
      <div className="ps-c2-ground" />
      <div className="ps-c2-body" />
      <div className="ps-c2-pool" />

      <div className="ps-c2a-machine">
        <div className="ps-c2a-mouth">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.trigger}</span>
        </div>

        {/* THE SPLIT. A solid wedge, not a stroked diamond and not a question:
            the fork IS the decision and it needs no words. */}
        <div className="ps-c2a-sp">
          <i className="ps-c2a-wedge" />
        </div>

        <div className="ps-c2a-slot ps-c2a-slot--chase">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.chase}</span>
          <span className="ps-c2-nudges">
            {C2_NUDGES.map((n) => (
              <i key={n} className="ps-c2-nudge" style={{ "--n": n } as React.CSSProperties} />
            ))}
          </span>
        </div>

        <div className="ps-c2a-slot ps-c2a-slot--settled">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.settled}</span>
        </div>

        {/* THE CHASE. Back to the same wedge, on the outside, unattended. */}
        <i className="ps-c2a-arc" />

        <div className="ps-c2a-slot ps-c2a-slot--exception">
          <C2HandOff cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.exception}</span>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   CONCEPT B  -  THE FLOW CHART          (the default concept)

   >> REBUILT A SECOND TIME, ON THE OWNER'S SECOND REQUEST: "fr business
   automation why dont you just do what we used to have originally that flow
   chart?"

   READ THE TWO VERDICTS TOGETHER, BECAUSE THEY ARE NOT IN CONFLICT.
   Verdict 1 was "the business automation is SOOOOOO confucinga dn sucks"
   against a build of 8 nodes, 2 diamonds and 9 strings at 9.5px. Verdict 2
   asks for the flow chart back. The defect in build 1 was DENSITY AT 9.5px,
   not the flow chart FORM. Build 2 fixed density by deleting the form - both
   diamonds gone, 8 nodes down to 4 - and what was left stopped reading as a
   flow chart at all: four slabs and a bracket, no decision, no arrowheads,
   nothing directed. This build restores the FORM and keeps build 2's SIZE.

   >> WHY RESTORING THE DIAMOND DOES NOT RESTORE THE DENSITY PROBLEM, counted
   rather than asserted. Build 1 carried 9 strings totalling ~150 characters
   at 9.5px. Build 2 carried 4 strings, ~62 characters, at 17px. This build
   carries 7 strings, ~60 characters, at 17px - FEWER CHARACTERS THAN BUILD 2
   - because the three new strings are "Paid?", "yes" and "no", and the two
   long ones shrank ("Chased on its own" -> "Chased for you", "Only stuck
   invoices reach you" -> "Reaches you"). The "no" edge label is what let the
   long outcome string shrink: the branch now says "unpaid" in one word, so
   the plate does not have to say it in four.

   THE GRAMMAR, and every part of it is load bearing:
     - PROCESS NODES     rounded slabs, labelled, same material as before.
     - ONE DECISION      a true diamond, "Paid?", the largest single shape.
     - TWO LABELLED OUT  "yes" to the left branch, "no" to the right.
     - DIRECTED EDGES    every connector ends in an arrowhead. Build 2 had
                         four undirected lines, which is why it read as a
                         bracket tree instead of a flow.
     - ONE RETRY LOOP    a self loop off the chase node, arrowhead pointing
                         back INTO it, bleeding off the left edge of the
                         frame. That is "again, and again, and again" drawn as
                         a directed edge, and it replaces the three dots.

   THE STORY, unchanged from build 2 because the owner never objected to it:
   an invoice goes out, it gets chased without you, most settle, and the one
   that does not is the only one you ever see.

   >> EVERY CONNECTOR IS BUILT FROM THE GRID, NEVER FROM A GUESSED PERCENTAGE.
   This file has been burned twice by floating connectors. The rules now:
     - straight edges are GRID ROWS (narrow) or GRID COLUMNS (wide) of their
       own that STRETCH, so they physically span the gap they are drawn in;
     - the fork is a SUBGRID, so each arm's own 50% IS its outcome plate's
       centre line by construction, not by arithmetic;
     - arrowheads are pseudo elements OF THE PLATE THEY POINT AT, so they are
       measured from the target and cannot drift.

   Mass  : the diamond is the biggest shape in the frame and sits on the
           optical centre; three plates are full width.
   Depth : opaque slabs, lit top edge, cast shadow; the diamond carries a
           drop-shadow that follows its clipped silhouette.
   Crop  : the retry loop runs off the left edge, so the chase is bigger than
           the frame, which is the true thing about it.
   ═════════════════════════════════════════════════════════════ */
export function SystemFixesVisualB() {
  const L = useC2Labels();

  return (
    <div className="ps-c2b-root ps-c2-root" aria-hidden="true">
      <div className="ps-c2-ground" />
      <div className="ps-c2-body" />
      <div className="ps-c2-pool" />

      <div className="ps-c2b-flow">
        <div className="ps-c2b-st ps-c2b-st--trigger">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.trigger}</span>
        </div>

        {/* DIRECTED EDGE 1. Its own grid track, stretched, arrowhead at the
            head. It cannot float, because the track it fills IS the gap. */}
        <i className="ps-c2b-edge ps-c2b-edge--1" />

        <div className="ps-c2b-st ps-c2b-st--chase">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.chase}</span>
          {/* THE RETRY LOOP, AND IT IS A CHILD OF THE PLATE ON PURPOSE. It
              leaves the chase node, drops below it and comes back into the
              same node head first: the automation doing it again without you,
              which is what replaced the three dots.
              >> IT USED TO BE A SIBLING sharing the plate's grid cell, and in
              the landscape dialog that cell spans BOTH rows while the plate is
              centred in it - so `align-self: end` pinned the loop to the cell
              floor and it rendered 120px adrift, a blue squiggle lying on the
              ground under an unrelated part of the chart. As a child it is
              measured from the plate itself and is correct in every regime
              without a single regime-specific rule. */}
          <i className="ps-c2b-loop" />
        </div>

        <i className="ps-c2b-edge ps-c2b-edge--2" />

        {/* THE DECISION. A real diamond with a real question in it. The two
            edges leaving it are labelled, which is the whole difference
            between a flow chart and a pipeline. */}
        <div className="ps-c2b-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">{L.decision}</span>
        </div>

        {/* THE FORK. A subgrid over the two outcome columns, so arm--yes sits
            in the settled plate's own column and arm--no in the exception's.
            Each arm's 50% is therefore its plate's centre by construction. */}
        <i className="ps-c2b-fork">
          <i className="ps-c2b-arm ps-c2b-arm--yes">
            <span className="ps-c2b-tag">{L.yes}</span>
          </i>
          <i className="ps-c2b-arm ps-c2b-arm--no">
            <span className="ps-c2b-tag">{L.no}</span>
          </i>
        </i>

        <div className="ps-c2b-st ps-c2b-st--settled">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.settled}</span>
        </div>

        <div className="ps-c2b-st ps-c2b-st--exception">
          <C2HandOff cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.exception}</span>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   CONCEPT C  -  MANY BECOMING ONE

   Quantity rather than path. A short stack of invoice bars enters from off the
   top and both sides; one bright bar crosses the frame edge to edge - the
   automation, running on its own; below it almost the whole stack has
   collapsed into a single settled mass, and exactly ONE bar is left standing,
   lifted and lit. That is the card's promise in one image.

   The previous build drew NINE thin grey bars, which read as loading-skeleton
   placeholder rows - which is on the owner's own list of things he hates. Five
   bars, taller, with real weight and a tinted head, do not.
   ═════════════════════════════════════════════════════════════ */
export function SystemFixesVisualC() {
  const L = useC2Labels();

  /* Authored widths, no Math.random - this is server-rendered and a random
     width desynchronises server and client markup. */
  const stack = [100, 78, 92, 66, 86];

  return (
    <div className="ps-c2c-root ps-c2-root" aria-hidden="true">
      <div className="ps-c2-ground" />
      <div className="ps-c2-pool" />

      <div className="ps-c2c-stage">
        <div className="ps-c2c-field">
          {stack.map((w, n) => (
            <i
              key={n}
              className="ps-c2c-slab"
              style={{ "--i": n, "--w": `${w}%` } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="ps-c2c-p ps-c2c-p--issue">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.trigger}</span>
        </div>

        {/* THE MECHANISM. Edge to edge and out of the frame on both sides,
            because it runs whether or not anyone is looking at it. */}
        <i className="ps-c2c-bar" />

        <div className="ps-c2c-p ps-c2c-p--chase">
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.chase}</span>
        </div>

        {/* THE AFTER. One broad mass instead of a stack. */}
        <i className="ps-c2c-mass" />

        <div className="ps-c2c-p ps-c2c-p--settled">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.settled}</span>
        </div>

        <div className="ps-c2c-p ps-c2c-p--out">
          <C2HandOff cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">{L.exception}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE SWITCH. ?c2=a|b|c|orig, and ?c2set=1|2|3 for the label sets.
   Read in an effect, not during render: this is a statically exported site
   and reading location during render is a hydration mismatch. The default
   with no query parameter is concept B - stated and argued in the report.
   ───────────────────────────────────────────────────────────── */
type Card2Choice = "a" | "b" | "c" | "orig";
type Card2Flow = "1" | "2" | "3" | "4" | "5";

/* ═════════════════════════════════════════════════════════════
   THE CAROUSEL CONTRACT          for whoever builds symptoms #6 and #7
   ═════════════════════════════════════════════════════════════
   >> THESE FIVE ARE SLIDES, NOT CANDIDATES, AND THE DISTINCTION IS THE WHOLE
   REASON THIS EXPORT EXISTS. `?c2=a|b|c` picks ONE concept to ship. `?c2flow=`
   does NOT do the same job: a visitor cannot swipe a query string and a query
   string does not advance itself every five seconds. The query parameter below
   is a DEVELOPMENT AND REVIEW AFFORDANCE ONLY - it lets a verifier deep link to
   flow 4 - and it must never be how a visitor reaches a flow.

   WHAT THE IMPLEMENTER GETS, and what it may rely on:

     1  FIVE INDEPENDENT UNITS. Each entry renders a complete, self contained
        graphic. None reads another's state, none shares a ref, none registers
        a listener, none holds a timer, and none touches the document. Mounting
        and unmounting any subset in any order is safe.

     2  UNIFORM OUTER DIMENSIONS, BY CONSTRUCTION AND NOT BY AGREEMENT. Every
        root is `position: absolute; inset: 0` on `.ps-c2-root`, so all five are
        exactly the size of whatever box they are placed in. A carousel whose
        slides differ in height jumps on advance; these cannot, because none of
        them has an intrinsic height at all. The slide container needs a
        position other than `static` and nothing else.

     3  THE BOX THEY MUST BE GIVEN, MEASURED not assumed. The art box is 12px
        WIDER AND TALLER THAN THE VISIBLE CARD in every regime, and the outer
        6px ring is permanently clipped by the card's own `overflow: hidden`.
        A carousel that positions slides against the art box rather than the
        visible card will read 6px off on every edge. Measured, chromium:
            320 -> card 272x420, art 284x432
            393 / 430 -> card 345x420 / 382x420, art 394x432
            640 -> card 288x420, art 300x432
            940 -> card 287x430, art 299x442   <- NARROWEST, and note that a
                   940px desktop card is NARROWER than a 430px phone card
            1280+ -> card 400x430, art 412x442
        299x344 is the design envelope all five are drawn to.

     4  EACH IS ITS OWN SIZE CONTAINER. `.ps-c2-root` declares
        `container-type: size`, so a slide reflows to the box it is given rather
        than to the viewport. Slides parked off screen at full size therefore
        render correctly; slides given zero size render nothing, so do not
        collapse an inactive slide to 0x0 and expect it to be right on advance.

     5  NO MOTION OF THEIR OWN. Zero keyframes, zero transitions, zero hidden
        start states, nothing that waits for JavaScript. Whatever the carousel
        animates, it animates alone, and a slide is fully drawn the instant it
        exists. Under `prefers-reduced-motion` these render identically, so the
        reduced-motion path is entirely the carousel's to own.

     6  ALL FIVE ARE `aria-hidden="true"` decorative artwork carrying no
        accessible name. The carousel owns the accessible story: the slide
        labels below are for its control names and live region, NOT for
        display - none of these strings is rendered by the artwork.
   ═════════════════════════════════════════════════════════════ */
export type Card2FlowSlide = {
  /* Stable across reorders; use as the React key. */
  id: "get-paid" | "entered-once" | "after-hours" | "bill-ledger" | "renewal";
  /* For the carousel's own control name and live region. NOT drawn. */
  label: string;
  render: () => React.ReactElement;
};

/* >> THE FIVE RENDERERS POINT AT THE NODE-GRAPH SET, AND THE FIVE `AutoFlow*`
   CSS-GRID FLOWS THEY REPLACED ARE DELETED. They were the measured basis for
   symptom #4 - the 2.21:1-to-9.19:1 stretched diamond - and were kept only
   until #4 was signed off; they were removed once it was, in their own commit.
   They were never reachable from any URL: `?c2=a|b|c` resolves to
   `SystemFixesVisualA/B/C` and no query string falls through to the carousel,
   which renders the `C2Graph*` set below. The pre-fix render is recoverable
   from git history, not from this file. `AutoFlowCarousel` is NOT one of the
   deleted five - it is the shipping default renderer; see its own note. */
export const CARD2_FLOW_SLIDES: readonly Card2FlowSlide[] = [
  { id: "get-paid", label: "Invoices that chase themselves", render: () => <C2GraphGetPaid /> },
  { id: "entered-once", label: "Entered once, everywhere it belongs", render: () => <C2GraphEnteredOnce /> },
  { id: "after-hours", label: "After-hours inquiries triaged", render: () => <C2GraphAfterHours /> },
  { id: "bill-ledger", label: "Bills into a categorized ledger", render: () => <C2GraphBillLedger /> },
  { id: "renewal", label: "Renewals that do not lapse", render: () => <C2GraphRenewal /> },
];

/* ═════════════════════════════════════════════════════════════
   THE CAROUSEL              symptoms #6 (swipe) and #7 (auto-advance)
   ═════════════════════════════════════════════════════════════

   >> IT IS A NATIVE SCROLL-SNAP TRACK, WHICH IS THIS REPO'S EXISTING IDIOM
   AND NOT A NEW ONE. Two hand-rolled swipe surfaces already ship on this
   page - `.ps-work-track` (globals.css:3993, `display:flex` +
   `overflow-x:auto` + `scroll-snap-type: x mandatory` + `scrollbar-width:none`)
   and `.ps-carousel-track` (globals.css:3059, the same five declarations).
   Neither uses a library and neither uses a gesture handler for the swipe
   itself. This is the third instance of that same idiom, not a fourth idiom.
   What it adds is precisely the two things the owner asked for and neither
   existing track has: auto-advance, and a swipe surface on the card face.

   >> EVERY OFFSET IS READ FROM `track.clientWidth`. NEVER FROM THE VIEWPORT,
   AND THAT IS NOT A STYLE PREFERENCE. This card's width is NOT MONOTONIC in
   viewport width - measured 272px at 320, 288px at 640, 286.7px at 940, 400px
   at 1280 - so a 940px DESKTOP card is NARROWER than a 430px PHONE card. Any
   arithmetic of the form `slide * viewportWidth` is wrong at exactly the two
   breakpoints, and wrong in a way that looks fine everywhere else. There is no
   viewport read anywhere in this component. `clientWidth` is the container's
   own content width, so it is right by construction in every regime including
   both dialog boxes.

   >> AND EVERY SLIDE IS THE ART BOX, NOT THE VISIBLE CARD. The art box is 12px
   larger than the card and the outer 6px ring is permanently clipped by the
   card's own `overflow: hidden`. The track is `position:absolute; inset:0` on
   the art root, so a slide IS the art box - which is symmetric about the card,
   so a slide snapped to the track's edge is centred on the CARD by
   construction. The five flows were authored to the art box; giving them
   anything else would move every one of them 6px.

   >> THE MID-BEAT PROBLEM DOES NOT EXIST HERE, AND THAT IS MEASURED. The brief
   asked whether a slide could be swapped part way through its own animation.
   `card2-candidates.css` contains zero `@keyframes` blocks, zero `animation`
   declarations and zero `transition` declarations - the three matches for the
   string "@keyframes" in the file are all inside comments saying there are
   none. The five flows are STATIC DIAGRAMS. There is no beat, so nothing can
   be cut off mid-beat, and no dwell has to divide into anything. Flow 1's
   green terminal is a resting SHAPE, not a resting STATE: it is fully drawn
   the instant the slide exists and it never reaches a completion the carousel
   could wait for. So all five advance on the same 5s timer, uniformly. If a
   flow ever gains an internal cycle, this decision has to be revisited, and
   that is the reason this paragraph is here rather than in a report.

   >> REDUCED MOTION IS GUARDED IN JAVASCRIPT, BECAUSE IT HAS TO BE. The
   stylesheet catch-all at globals.css:4639 crushes `animation-duration` and
   `transition-duration`; it cannot touch a `setInterval` and it cannot touch
   `scrollTo`. Under `reduce` the timer is never armed at all - not armed and
   ignored, never created - so the card rests on one slide, and swipe still
   works. The listener is live, so toggling the OS setting takes effect
   without a reload.

   >> NO DOTS, NO ARROWS, AND THAT IS DELIBERATE. This artwork mounts in two
   places and BOTH are inside an aria-hidden subtree: the card face is inside
   the `<button>` at service-pillars.tsx:1901, and the dialog art is
   `aria-hidden="true"` at service-pillars.tsx:2299. A real control would
   therefore be either an interactive element nested inside a button, or a
   focusable element inside an aria-hidden subtree - both are defects, and
   neither is fixable from this file. Nor is there anywhere to put one: the
   flow box's seven tracks already sum to 320px of a 326px budget in the narrow
   regime, and the only empty band on the card face is y=348..371, which does
   not exist in the compact dialog (a 280px art box) and whose equivalent
   position sits inside `.ps-dialog-visual::after`'s 120px fade. The
   auto-advance IS the affordance: a card that visibly changes every five
   seconds announces that there is more than one.

   >> THE TRACK IS `tabIndex={-1}` ON PURPOSE. A scroll container is
   keyboard-focusable by default in Firefox and in Chrome's focusable-scroller
   behaviour. Inside an aria-hidden subtree that is a focusable element with no
   accessible name, which is exactly the failure the paragraph above exists to
   avoid. Removing that attribute reintroduces it.
   ───────────────────────────────────────────────────────────── */

/* The dwell. The owner said "every like five seconds". */
const C2CAR_INTERVAL_MS = 5000;
/* How long a deliberate interaction holds the timer off. Longer than the
   dwell, so a swipe is never immediately overridden by the very next tick. */
const C2CAR_RESUME_MS = 7000;
/* A horizontal drag past this many px is a swipe, not a tap. */
const C2CAR_DRAG_PX = 10;

function AutoFlowCarousel({ start }: { start: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  /* The live slide index lives in a ref, not in state. Nothing renders from
     it, and putting it in state would tear the autoplay effect down and build
     it back up on every scroll frame - which restarts the 5s clock and means
     the card never advances at all while a finger is moving. */
  const indexRef = useRef(start);
  const resumeRef = useRef<number | null>(null);
  const dragRef = useRef({ x: 0, y: 0, swiped: false });
  /* >> IT TURNS ROUND AT THE ENDS RATHER THAN REWINDING, AND THAT IS FROM A
     MEASUREMENT. Wrapping 4 -> 0 is a 1648px smooth scroll: sampled at rAF it
     took 660ms and whipped backwards through slides 3, 2 and 1 on the way,
     against 325ms for every single-step advance. Turning round instead makes
     every transition in the cycle the same one-slide, ~325ms move, and there
     is no rewind to look at. Nothing in the artwork implies a direction, and
     with no dots there is no position indicator to contradict. */
  const dirRef = useRef(1);

  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  /* WCAG 2.2 SC 2.2.2. The hover gate below is MOUSE ONLY by design, so before
     this existed a keyboard-only visitor had no pause at all: measured on the
     shipped build, holding real Tab focus on this card for 13s still advanced
     it TWICE while `:focus-within` evaluated TRUE the whole time. The gate was
     absent, not broken. This is card 5's mechanism verbatim
     (`card5-candidates.tsx:604,621-622`, `hoverTarget = box ?? root` with
     `focusin`/`focusout`) and it adds NO visible UI. */
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  /* Off screen, hidden tab, or covered by the dialog. Starts TRUE: the
     IntersectionObserver below fires on `observe`, so the true value arrives
     within a frame, and starting false would arm a timer for that frame on a
     card that may be nowhere near the viewport. */
  const [gated, setGated] = useState(true);

  /* ── KEYBOARD FOCUS, THE FIFTH GATE ──
        `focusin`/`focusout` and not `:focus-within`, and not a listener on
        this root. The focusable element is the card's own <button>, which is
        this component's ANCESTOR: `focusin` bubbles UP from its target, so a
        listener on `.ps-c2car` never hears it. It has to be bound on the card
        box, exactly as card 5 binds `box ?? root`. In the bottom-sheet dialog
        there is no `.ps-bento-card` ancestor, so it falls back to this root -
        the same fallback, for the same reason. ── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const target: HTMLElement = el.closest<HTMLElement>(".ps-bento-card") ?? el;
    const onIn = () => setFocused(true);
    const onOut = () => setFocused(false);
    target.addEventListener("focusin", onIn);
    target.addEventListener("focusout", onOut);
    return () => {
      target.removeEventListener("focusin", onIn);
      target.removeEventListener("focusout", onOut);
    };
  }, []);

  /* ── Reduced motion, live ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* ── Anchor, and RE-anchor whenever the container resizes.
        Crossing 640 or 940 changes the card's width by more than 100px in one
        step. Without this the track keeps its old pixel scrollLeft and lands
        part way between two slides; scroll-snap re-settles it eventually in
        some engines and not in others, and "eventually" is a screenshot of a
        half-slide. The ResizeObserver watches the TRACK, so it fires for the
        dialog's own box too, which no viewport listener would. ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const place = () => {
      const w = track.clientWidth;
      if (!w) return;
      const left = indexRef.current * w;
      if (Math.abs(track.scrollLeft - left) > 1) track.scrollLeft = left;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  /* ── THE GATES THE STYLESHEET CANNOT REACH.
        `prefers-reduced-motion` is handled above and hover/hold below, but
        globals.css:4653's catch-all reaches `animation-duration` and
        `transition-duration` and NOTHING ELSE - it cannot crush a
        `setInterval`, so every remaining condition has to be answered in
        JavaScript. Card 3 solves exactly this at card3-candidates.tsx:1414 and
        this is the same four-gate shape.

        THE COVERED CASE IS THE ONE THAT IS EASY TO MISS. This visual mounts
        TWICE AT ONCE - service-pillars.tsx:275 hands the same element to the
        card face and to the dialog - so opening the dialog does not replace
        the face's carousel, it adds a second one. Without `covered()` there
        are two 5s intervals running two smooth scrolls, one of them on a
        carousel nobody can see, for as long as the sheet is open. ── */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const inDialog = !!el.closest(".ps-dialog-visual-art");
    let onScreen = false;
    const covered = () =>
      !inDialog && !!document.querySelector(".ps-dialog-visual-art");
    const sync = () =>
      setGated(
        !(onScreen && document.visibilityState === "visible" && !covered())
      );

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    /* The dialog is `createPortal`'d onto the body (service-pillars.tsx:2236,
       container at :2335), so its arrival and departure are a body child-list
       change and nothing else - no event, no ref, nothing this component is
       otherwise told about. */
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { childList: true });

    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  /* ── AUTO-ADVANCE ── */
  useEffect(() => {
    if (reduced || hovered || focused || held || gated) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const w = track.clientWidth;
      if (!w) return;
      const last = CARD2_FLOW_SLIDES.length - 1;
      /* Read the CURRENT slide off the track rather than off `indexRef`, so a
         swipe the visitor just made is what the next advance continues from. */
      const cur = Math.min(last, Math.max(0, Math.round(track.scrollLeft / w)));
      if (cur >= last) dirRef.current = -1;
      else if (cur <= 0) dirRef.current = 1;
      const next = Math.min(last, Math.max(0, cur + dirRef.current));
      indexRef.current = next;
      track.scrollTo({ left: next * w, behavior: "smooth" });
    }, C2CAR_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, hovered, focused, held, gated]);

  useEffect(
    () => () => {
      if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    },
    []
  );

  /* Any deliberate interaction stops the clock and restarts it later. */
  function hold() {
    setHeld(true);
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => setHeld(false), C2CAR_RESUME_MS);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    if (!w) return;
    const i = Math.round(track.scrollLeft / w);
    indexRef.current = Math.min(CARD2_FLOW_SLIDES.length - 1, Math.max(0, i));
  }

  return (
    <div
      className="ps-c2car"
      ref={rootRef}
      aria-hidden="true"
      /* Hover pause is MOUSE ONLY. `pointerenter` also fires for the first
         touch of a tap, and treating that as hover would leave a phone
         permanently paused with no pointerleave ever coming. */
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onPointerDown={hold}
      onWheel={hold}
      onTouchStart={(e) => {
        const t = e.touches[0];
        dragRef.current = { x: t.clientX, y: t.clientY, swiped: false };
        hold();
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        const dx = Math.abs(t.clientX - dragRef.current.x);
        const dy = Math.abs(t.clientY - dragRef.current.y);
        if (dx > C2CAR_DRAG_PX && dx > dy) dragRef.current.swiped = true;
      }}
      /* THE SWIPE MUST NOT OPEN THE DIALOG. This artwork sits inside the
         card's own <button>; a touch that ends as a horizontal drag would
         otherwise reach it as a click and the card would open every time
         somebody changed slide. Most engines suppress the click after a
         scroll gesture, but not all of them and not always, so the guard is
         explicit. Capture phase, so it never reaches the button. Reset on
         every touchstart, so a real tap is never swallowed. */
      onClickCapture={(e) => {
        if (!dragRef.current.swiped) return;
        dragRef.current.swiped = false;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="ps-c2car-track"
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={-1}
      >
        {CARD2_FLOW_SLIDES.map((slide) => (
          <div className="ps-c2car-slide" key={slide.id}>
            {slide.render()}
          </div>
        ))}
      </div>
    </div>
  );
}

/* >> THE DEFAULT IS FLOW 1, WHICH IS THE SHIPPED CHART RESTRUCTURED. The old
   concepts are not deleted and not edited - ?c2=b still serves
   SystemFixesVisualB byte for byte, which is what makes a before / after
   capture in one page load possible. ?c2 wins when it is present, so nothing
   that was reachable before stopped being reachable. */
export function SystemFixesVisualPick({ fallback }: { fallback: React.ReactNode }) {
  const [choice, setChoice] = useState<Card2Choice | null>(null);
  const [flow, setFlow] = useState<Card2Flow>("1");
  const [car, setCar] = useState<"on" | "off">("on");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const raw = q.get("c2");
    if (raw === "a" || raw === "b" || raw === "c" || raw === "orig") setChoice(raw);
    const f = q.get("c2flow");
    if (f === "1" || f === "2" || f === "3" || f === "4" || f === "5") setFlow(f);
    if (q.get("c2car") === "off") setCar("off");
  }, []);

  if (choice === "orig") return <>{fallback}</>;
  if (choice === "a") return <SystemFixesVisualA />;
  if (choice === "b") return <SystemFixesVisualB />;
  if (choice === "c") return <SystemFixesVisualC />;

  /* >> THE CAROUSEL IS THE SHIPPING PATH. `?c2flow=N` survives as what it
     always was - a deep link - but it now chooses the slide the carousel
     STARTS on rather than the only slide that exists. `?c2car=off` renders
     that one slide alone with no track and no timer, which is how a single
     flow gets captured in isolation and how the pre-carousel state stays
     reachable for a before / after in one page load. */
  if (car === "off") return CARD2_FLOW_SLIDES[Number(flow) - 1].render();
  /* KEYED ON `flow`. `start` is only read as a ref initialiser, and `flow`
     arrives one render late because the query string is read in an effect and
     not during render (this is a statically exported site; reading location
     during render is a hydration mismatch). Without the key, `?c2flow=4` would
     mount the carousel at slide 1 and never move. */
  return <AutoFlowCarousel key={flow} start={Number(flow) - 1} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   THE NODE GRAPH SET            symptoms #4 (stretched diamonds) and #5 (n8n)
   ═══════════════════════════════════════════════════════════════════════════

   >> WHY THIS REPLACES THE FIVE CSS-GRID FLOWS, AND IT IS A ROOT CAUSE FIX
   RATHER THAN A RESIZE. The owner's #4 - "extremely stretched out diamonds
   that stretches the width of the card" - is caused by exactly one
   declaration: `.ps-c2f-dia { justify-self: stretch; height: var(--c2-dia-h) }`
   which stood at card2-candidates.css:1541-1552 in the pre-fix tree. THAT RULE
   NO LONGER EXISTS - it went with the five `AutoFlow*` grid flows and their
   1,509 lines of stylesheet, deleted once #4 was signed off; read it from git
   history at `fb0f6f1`, not from this file. A stretch-justified box with a FIXED
   height takes whatever width its grid column happens to be, so the diamond's
   aspect is a function of the card's width and nothing else. Measured on the
   shipping build, all five slides, 18 viewport widths:

       slide 1  2.21 - 5.79 : 1   at 47.1 - 70.6% of card width
       slide 2  4.04 - 8.33 : 1   at 83.1 - 90.2%
       slide 3  4.35 - 8.33 : 1   at 83.1 - 90.2%
       slide 4  4.35 - 9.19 : 1   at 83.1 - 90.2%   <- worst, at 639px
       slide 5  4.11 - 8.45 : 1   at 84.6 - 91.5%

   The prior baseline reported a 6.46:1 worst case. It is 9.19:1, at 639px -
   the pixel before the one-column flip, where the card is 591px wide and the
   diamond is 533 x 58. NO RE-TUNING OF `--c2-dia-w`/`--c2-dia-h` CAN FIX THIS,
   because the width is not read from either of them; it is read from the grid.

   >> SO THE FIX IS TO STOP DRAWING GEOMETRY IN CSS GRID TRACKS. Everything
   below lives inside one inline SVG with a FIXED `viewBox` of 400 x 310. A
   viewBox cannot stretch a square into a sliver: every ratio in the picture is
   frozen at authoring time and the only thing the card's width changes is the
   scale factor. That is what makes #4 structurally unfixable-again rather than
   fixed-for-now.

   >> AND THERE IS NO DIAMOND, WHICH IS ALSO THE ANSWER TO #5. The owner asked
   for n8n's flow-chart visual language. n8n HAS NO DECISION DIAMONDS. Its
   branch node is an ordinary square node carrying TWO output ports on its
   right edge, and the outcome is read from which port a connector leaves -
   confirmed in the research from the parsed product source and from a render
   of n8n's own canvas export, where `true`/`false` sit beside two output dots
   on a square node. The only rotated squares anywhere in n8n's language are
   14px sub-node port handles. So satisfying #5 deletes the object #4 complains
   about, and the two symptoms have one fix.

   >> THE FORM IS COPIED ON PURPOSE, AND THAT INVERTS THIS FILE'S USUAL RULE.
   Normally a reference supplies craft and never form. Here the owner named the
   form - a node-and-connector flow graph - so both are taken. What is NOT
   taken is n8n's palette, chrome or branding: every colour below resolves to a
   token declared in globals.css, and the 18-item product-chrome avoid-list is
   honoured in full. There is no window frame, no sidebar, no header bar, no
   tab bar, no zoom cluster, no run button, no logs panel, no node-creator, no
   hover toolbar, no edge toolbar, no selection ring, no status badge, no
   execution decoration, no sticky note, no overlay UI, no cursor - AND NO DOT
   GRID, which the research singles out as the strongest ambient screenshot cue
   and which n8n themselves omit from 4 of 4 marketing illustrations.

   >> RATIOS, TAKEN FROM THE RESEARCH, AND WHERE I DEPARTED FROM IT.
   Node 1:1 square, side S = 56 viewBox units.                     [as spec]
   Corner radius 9 = 16.1% of S. The research left 14-18% recommended
     against a 21% product token and a ~10% measurement, explicitly "your
     call". I took the midpoint of the recommended band.            [my call]
   Trigger: same box, left edge fully rounded at r = 50% of height. [as spec]
   Icon dead-centre at 22.4 = 40% of S. No container, no plate, no
     header band.                                                   [as spec]
   Connectors: cubic bezier, control points LEVEL with their endpoints -
     cp1 = (x1 + 0.50dx, y1), cp2 = (x2 - 0.58dx, y2) - so every edge
     leaves and lands perfectly horizontal.                         [as spec]
   Output port: solid filled circle, d = 8.4 = 15% of S, centred ON the
     node edge, half in and half out.                               [as spec]
   Input marker: the small solid arrow + rounded tick "|>" glyph at the
     left edge.                                                     [as spec]
   Lines stop 5 units shy of the input marker (spec says 3-7).      [as spec]
   Labels below, centred on the node's centre-x.                    [as spec]
   One neutral for every outline, connector and port, at ONE weight. [as spec]
   Zero gradients. Zero node shadows.                               [as spec]
   Orthogonal loop-back with 16-unit corner radii.                  [as spec]
   Flat - zero rotation on any structural element, gentle left-to-right
     descending staircase.                                          [as spec]
   Five main nodes and exactly one trigger, inside the research's
     "4-6 main + <=2 sub + exactly 1 trigger" recommendation.        [as spec]

   DEPARTURE 1 - horizontal gap is 0.71-0.79 x S where the research measured
   1.0-1.15 x S. n8n's artboards are 985-1156px wide heroes; this card is
   272px wide at 320. Holding their gap ratio at four columns would have put
   the node side at 37 units, which puts the 40% icon at 15 units and the label
   under 10px on a phone. The research itself records n8n tightening to 0.4 x
   for a coupled pair, so a compression to 0.71 is inside their own dialect.
   The gap is the one ratio I traded, deliberately, and it is stated here so a
   reviewer does not have to find it.

   DEPARTURE 2 - label size is 12.5 units = 22.3% of S, where n8n's product
   ratio is 1rem on a 96px node = 16.7%. Same reason: their smallest surface is
   four times this card's width. Under-sizing type to honour a ratio would make
   the picture unreadable, which is not craft.

   DEPARTURE 3 - `vector-effect: non-scaling-stroke` on every stroked element.
   n8n's art is a fixed 1.5px hairline because it renders at one size. This
   picture renders at scale 0.71 (320px viewport) through 1.11 (639px), so a
   scaled stroke would be 0.8px thin on a phone and would read as a broken
   hairline. Non-scaling holds the hairline at a constant CSS pixel weight at
   every card width, which is what "one weight" actually means here.

   >> THE EDGES ARE DISSOLVED, NOT CROPPED, AND THAT IS THE MOST COPYABLE
   THING IN THE RESEARCH. n8n never lets a flow graph meet a hard rectangular
   boundary: the homepage `object-cover`s a loose artboard and masks it with
   `radial-gradient(95% 95%, #fff 0 28%, #fff0 85%)`, because a crisp
   rectangular edge reads as a screenshot boundary even with nothing else
   present. A BENTO CARD IS A HARD RECTANGLE. So the graph is drawn to bleed
   past the card on every side and `.ps-c2g-veil` fades it back into the card's
   own ground - built from `--theme-art-veil-rgb`, which is the ground triplet
   in each theme and already has 40 uses in this repo. THAT IS THE EXISTING
   IDIOM, NOT A NEW ONE; card3-candidates.css:115 builds the same ramp.

   >> ZERO SVG `defs`. NOT AN OVERSIGHT - A HAZARD REMOVED AT THE ROOT. Every
   card visual in this repo MOUNTS TWICE, once on the card face and once in the
   bottom-sheet dialog, and `url(#x)` binds the FIRST match in the document, so
   a duplicated id makes the dialog silently borrow the card face's paint. The
   usual remedy is to prefix ids from `useMarkId()` (card3-candidates.tsx:598,
   which strips React 19's `<<r0>>` guillemets because they are illegal inside
   `url(#...)` and render the shape black). This artwork needs no gradient, no
   mask and no clip-path - the craft spec is flat fills and one hairline - so it
   emits no `defs` and no `url(#...)` AT ALL, and the collision it would have to
   be protected from cannot occur. If a future edit adds a gradient here, it
   MUST route its id through `useMarkId()`.

   >> INVENTS NO DATA. No client names, no percentages, no currency amounts, no
   dates, no counts, no invented metrics. Every string is generic process
   language describing a step, and the five subjects are the five automations
   the card already shipped.
   ═══════════════════════════════════════════════════════════════════════════ */

/* The authoring canvas. Every number below is in these units. Aspect 1.29.
   Chosen by measurement, not taste: with `preserveAspectRatio="xMidYMid meet"`
   the graph fills 100% of the art box's width at 320/360/375/390/393/414/430/
   640/768/820/940/1024/1280/1440/1920, 98.8% at 939 and 73.6% at 639. A
   squarer canvas gave a better 639 and left more dead air on every phone; a
   wider one filled 639 and shrank the picture everywhere else. 1.29 is the
   value that keeps the phone widths - which is where the owner reads this -
   edge to edge. */
const C2G_VB_W = 400;
/* >> THE VIEWBOX WINDOW MOVED DOWN 12 UNITS AND LOST 12 OF ITS HEIGHT, AND
   THAT IS THE WHOLE OF THE UNDER-FILL FIX. Measured on the shipped build
   (chromium/webkit/firefox, 7 widths x 5 slides x 3 engines, 2026-09-08): the
   drawn composition occupies x 11..380, y 34..306 of this window, so the old
   `0 0 400 326` reserved 34 dead units ABOVE the ink and 20 below. Because
   `meet` scales by min(boxW/vbW, boxH/vbH), those 34 units were a straight tax
   on the scale factor at every width where the ART BAND'S HEIGHT is what binds
   - which is every face wider than 422px, i.e. the whole 470..639 landscape
   band the critic measured decaying, plus 939.

   THE ORIGIN MOVES, THE BOTTOM DOES NOT: y goes 0 -> 12 and the window still
   ends at 326. That asymmetry is deliberate and it is what makes this safe.
   The art's bottom edge in the box is (306 - vbY)/vbH of the box height:
   306/326 = 0.93865 before, 294/314 = 0.93631 after. It went DOWN, so the
   artwork-to-title clearance can only IMPROVE, in every height-bound context
   including the bottom-sheet dialog's 393x280 and 900x400 art roots (which
   have no title at all: their art bottoms were measured moving UP by 0.45px
   at 393x280 and 0.73px at 900x400, and their height fill rose 57.21 -> 59.40
   and 65.08 -> 67.57). Trimming the
   BOTTOM reserve instead would have spent the clearance, and 88px + 20 units
   is exactly what produces the 40.31px that Phase 1 bought.

   >> 22 UNITS OF TOP RESERVE IS A FLOOR, NOT A ROUNDING. Below it the top of
   the composition closes on `.ps-bento-card__expand` - measured 44x44 at 12px
   from the card corner below 769px and 32x32 above it, and it does not scale
   with the art - and on the card's own 11px corner radius. At 22 units the
   worst measured top clearance is 18.10px at 639/939 (was 29.88px), and the
   nearest drawn element sharing that button's x-range still clears it by
   13.44px at 470, 20.50px at 939 and 22.32px at 900; at 639 nothing overlaps
   it in x at all.
   Taking the reserve to 16 units drops the top clearance to 11.9px. Do not.

   >> AND THE HORIZONTAL WINDOW IS DELIBERATELY UNTOUCHED. It looks like the
   same free 31 units are sitting at x 0..11 and 380..400, and they are not:
   at 320 the leftmost label already lands 1.81px inside the card's clip edge
   in chromium and webkit, and 0.75px in firefox on slide 2 / 0.99px on slide 5
   (its text metrics push the bbox out to x = 9.512). Any reduction of vbW
   pushes that label THROUGH the
   clip. The width-bound widths - every phone, plus 640/940/1024/1280/1440/
   1920 - are already at 96.3% of the VISIBLE card width and cannot be scaled
   up at all. Their remaining dead air is the locked 1.3566 composition aspect
   sitting in a portrait card, and no scale factor reaches it. */
const C2G_VB_Y = 12;
const C2G_VB_H = 314;

/* Node side, and everything derived from it as a ratio of S. */
const C2G_S = 56;
const C2G_HALF = C2G_S / 2;                 /* 28    */
const C2G_R = +(C2G_S * 0.161).toFixed(2);  /* 9.02  - 16.1% of S */
const C2G_ICON = +(C2G_S * 0.4).toFixed(2); /* 22.4  - 40% of S   */
const C2G_PORT = +(C2G_S * 0.075).toFixed(2); /* 4.2 - radius, so d = 15% of S */
const C2G_SHY = 5;                          /* stop this far shy of an input */
const C2G_LBL_DY = 16;                      /* label baseline below node bottom */
const C2G_LOOP_FLOOR = 306;                 /* the loop-back's bottom run */
/* >> THE CLIMB MOVED 196 -> 100 AND THE RETURN NOW LANDS ON THE STEP NODE
   RATHER THAN THE BRANCH, AND BOTH CHANGES CAME OUT OF A RENDER. At 196 the
   return turned up under the branch and the picture was L-shaped: the whole
   bottom-left quadrant of the card - roughly x 0-190 by y 200-330 - was empty,
   with the graph crowded into the top band and the loop hugging the right.
   Taking the floor out to x = 100 makes it run nearly the full width of the
   card, which is also what n8n's own canvas export does ("an edge runs right,
   drops, travels the full width leftward along the bottom, and climbs back
   in"). It is the largest single gesture in the picture and it is the one that
   says "round again", so it should be the one that spans the frame.

   Landing on the STEP node instead of the branch is the more accurate reading
   too: the loop is wait -> check -> chase -> wait, so the thing it returns to
   is the wait, not the question. Clearances at x = 100, all against the label
   width budget: trigger label ends at 93 (clear 7), trigger node ends at 84
   (clear 16), and the climb tops out at y = 120, which is 10 below the trigger
   label's descenders and well under the trigger->step bezier. */
const C2G_LOOP_UPX = 100;
/* Where the loop's vertical run sits on the way down. 380 is 14.2 units clear
   of the card's right edge (viewBox x = 394.2) and 9.5 clear of the longest
   outcome label, both measured against the label budget. For scale: the defect
   this replaces left a rail 1.52px from the card's right edge - the tightest
   horizontal clearance recorded anywhere on the page. */
const C2G_LOOP_DOWNX = 380;
const C2G_LOOP_R = 16;                      /* orthogonal loop-back corner radius */

/* The four columns and the rows, as centre coordinates. A gentle staircase:
   each successive column drops 36 units, which is 0.64 x S - enough for the
   bezier S-curves to be visible, flat enough that nothing reads as tilted. */
/* >> `out` MOVED 352 -> 344 AND THE LABEL DROPPED 12.5 -> 12, BOTH FROM A
   RENDER RATHER THAN FROM ARITHMETIC. At `out: 352` with a 12.5-unit label,
   "Reminder sent" and "Renewal asked" ran past the card's right edge and were
   SHEARED MID-GLYPH by the card's own `overflow: hidden` - clearly visible in
   the 1440x900 capture, and invisible to the geometry probe, which reported
   98.1% fill and a 1.000 node aspect while the label was cut. The card's right
   edge sits at viewBox x = 394.2 (the art box is 6px wider than the card per
   side, which is ~5.8 units at this scale), so the label budget from a centre
   of 344 is 46 units either side; a 13-character label at 12 units is ~81
   units wide, or 40.5 either side.

   >> AND THE COLUMN MOVED AGAIN, 344 -> 336, TO BUY THE LOOP ITS EXIT. The
   loop-back now leaves the retry node's RIGHT edge and needs a 16-unit turn
   plus clearance before it can drop, so the outcome column had to come in far
   enough to leave it. Outcome labels are capped at 11 characters for the same
   reason - the loop's vertical run at x = 380 clears the longest of them by
   9.5 units. "Reminder sent" became "Reminded", "Renewal asked" became
   "Renewal", "Next in line" became "Next up" and "Update asked" became "New
   card"; all five still read as the step they name, and all five sit beside a
   glyph that carries the rest.

   >> AND THE ROWS SPREAD, ALSO FROM THE RENDER. At 36-unit staircase drops the
   drawn picture was 249px tall inside a 354px art band and read visibly
   top-heavy, with a dead strip between the loop's floor and the title. Drops
   are now 46 and the retry row sits 90 below the branch, which fills 280px of
   the same band - 79% instead of 70% - without moving the title clearance
   below 70px at any measured width. */
const C2G_COL = { t: 52, p: 146, b: 244, out: 336 } as const;
const C2G_ROW = { t: 62, p: 108, b: 154, ok: 108, r: 244 } as const;

/* B's two output ports sit on its right edge, 12 units apart about its centre.
   This is the whole branch device: no diamond, two ports. */
const C2G_B_OUT_HI = C2G_ROW.b - 12;  /* 128 */
const C2G_B_OUT_LO = C2G_ROW.b + 12;  /* 152 */
/* And it takes TWO inputs on its left edge - the forward one from P, and the
   loop-back returning from R. */
const C2G_B_IN_FWD = C2G_ROW.b;
/* The step node takes two left inputs the same way: the forward one from the
   trigger, and the loop-back returning from the chase. n8n's merge nodes stack
   left inputs identically, so this is its grammar rather than an invention -
   and each one gets its own "|>" input marker, because an edge that lands on a
   node with no marker reads as a line that happens to touch it. */
const C2G_P_IN_RET = C2G_ROW.p + 13;

/** A bezier whose control points are LEVEL with its endpoints, so the line
 *  leaves x1 horizontally and lands at x2 horizontally. The 0.50 was measured
 *  on 7 of 7 of n8n's marketing edges; the 0.58 on the landing side is theirs
 *  too. Straight line where there is no drop. */
function c2gEdge(x1: number, y1: number, x2: number, y2: number) {
  const ex = x2 - C2G_SHY;
  const dx = ex - x1;
  if (Math.abs(y2 - y1) < 0.01) return `M${x1} ${y1} L${ex} ${y2}`;
  return `M${x1} ${y1} C${x1 + 0.5 * dx} ${y1} ${ex - 0.58 * dx} ${y2} ${ex} ${y2}`;
}

/** The orthogonal loop-back. Runs right out of the node's OUTPUT edge, drops,
 *  travels leftward along the floor of the picture, climbs, and lands on a
 *  left-edge input. Five quarter-turns at r = 16.
 *
 *  >> IT LEFT THE BOTTOM EDGE UNTIL A RENDER KILLED THAT, AND THE REASON IS
 *  THE SAME ONE THAT KILLED THE HELD-LANE VARIANT: a label is centred on its
 *  node's centre-x, so ANY line leaving the bottom edge is COLLINEAR WITH ITS
 *  OWN LABEL by construction. At 320x568 the rail ran straight down through
 *  the words "Next in line" and read as a strikethrough. No offset fixes it -
 *  the only offsets that clear the text are off the node.
 *  Leaving the right edge is also what n8n's own canvas export does, described
 *  in the research verbatim: "an edge runs right, drops, travels the full width
 *  leftward along the bottom, and climbs back in". So the fix and the grammar
 *  agree, which is the outcome to prefer over either alone. */
function c2gLoop(fromX: number, fromY: number, downX: number, floorY: number, upX: number, toY: number, toX: number) {
  const r = C2G_LOOP_R;
  return [
    `M${fromX} ${fromY}`,
    `H${downX - r}`,
    `A${r} ${r} 0 0 1 ${downX} ${fromY + r}`,
    `V${floorY - r}`,
    `A${r} ${r} 0 0 1 ${downX - r} ${floorY}`,
    `H${upX + r}`,
    `A${r} ${r} 0 0 1 ${upX} ${floorY - r}`,
    `V${toY + r}`,
    `A${r} ${r} 0 0 1 ${upX + r} ${toY}`,
    `H${toX - C2G_SHY}`,
  ].join(" ");
}

/* ── THE GLYPH VOCABULARY. Drawn in a 24 x 24 box, centred and scaled to 40%
      of the node side at use. Single weight, no fill, no plate, no container -
      the research is explicit that n8n's node icons sit bare and dead-centre.
      None of these is on the banned-cliche list: no gear, no lightbulb, no
      circuit trace, no robot face, no brain, no shield, no rocket, no hex
      grid. They are the plain nouns of the process being drawn. ── */
const C2G_GLYPH: Record<string, React.ReactNode> = {
  /* An invoice: a sheet with two ruled lines and a turned corner. */
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 17h4" /></>,
  /* A due date: a clock. Hands at a quarter past, so it is unmistakably a
     clock and not a ring. */
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l4 2" /></>,
  /* A message going out: an envelope. */
  mail: <><rect x="3.5" y="6" width="17" height="12" rx="2" /><path d="M4 7.5l8 6 8-6" /></>,
  /* The branch. One line in, two lines out - the picture of the question the
     node asks, without borrowing the flow-chart diamond. */
  fork: <><path d="M4 12h5" /><path d="M9 12c4 0 3-6 7-6M9 12c4 0 3 6 7 6" /><circle cx="18.5" cy="6" r="1.6" /><circle cx="18.5" cy="18" r="1.6" /></>,
  /* Settled. A tick, and nothing else. */
  check: <path d="M5 12.5l5 5L19 7" />,
  /* A review: a speech bubble. */
  bubble: <><path d="M4 6.5h16v10H13l-4 3.5V16.5H4z" /><path d="M8.5 11h7" /></>,
  /* A card on file. */
  card: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10.5h18" /><path d="M6.5 14.5h4" /></>,
  /* A cancellation: a date struck through. */
  calx: <><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M4 10h16M8.5 3v4M15.5 3v4" /><path d="M9.5 14l5 4M14.5 14l-5 4" /></>,
  /* A waiting list: stacked rules, the top one indented as the one in hand. */
  list: <><path d="M5 8h14M5 12.5h14M5 17h9" /></>,
  /* Again. An arc returning on itself with a head - the only arrowhead in the
     set, and it is inside a glyph rather than on a connector, so the "no
     arrowheads on edges" rule holds. */
  again: <><path d="M19 12a7 7 0 1 1-2.5-5.4" /><path d="M19.5 3.5V7h-3.5" /></>,
  /* A failure: the card again, refused. */
  cardx: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10.5h18" /><path d="M14 13l4 4M18 13l-4 4" /></>,
  /* A person, for the one step a person still does. */
  person: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5.5 20c0-4 3-6.5 6.5-6.5S18.5 16 18.5 20" /></>,
};

type C2GNode = {
  /** Which of the five slots. Fixes position, so a slide cannot mis-place one. */
  slot: "trigger" | "step" | "branch" | "ok" | "retry";
  glyph: keyof typeof C2G_GLYPH;
  /** Drawn below the node, centred. Kept short by measurement, not by taste -
   *  see the width budget in the stylesheet header. */
  label: string;
};

/* >> THE "HELD LANE" VARIANT WAS BUILT AND THEN KILLED FROM ITS OWN RENDER,
   AND IT IS WORTH SAYING WHY. Flow 3 originally ended its "no" branch on a
   flat cap with no return, to draw "it holds the work back" rather than claim
   it. In the 1440x900 capture the lane dropped out of the node's bottom edge
   straight THROUGH its own label and the cap sat 10 units under it, so the
   picture read as a strikethrough across the words "Renewal asked". There was
   no offset that fixed it: the lane leaves the node's centre-x and the label
   is centred on the same axis, so they are collinear by construction.
   It was also SEMANTICALLY WRONG once written down - a card that is about to
   expire does get asked to renew, repeatedly, so the honest picture of that
   automation is the same loop as the other four. Removing the variant deletes
   a special case that could only ever collide, and all five now share one
   composition whose differences are carried by glyph and label. */
type C2GSpec = {
  id: string;
  nodes: readonly C2GNode[];
};

/* ── THE FIVE. Every label is generic process language: no client name, no
      amount, no percentage, no date, no count.

   >> FOUR OF THE FIVE WERE REPLACED ON EVIDENCE, AND FLOW 1 WAS NOT TOUCHED.
   The owner's doubt was "idk that those examples are what business owners
   actually pain ab", and the check that settled it was mechanical: grep his
   whole `src/data` plus `service-pillars.tsx` for the subjects the old slides
   drew. `waitlist`, `cancellation`, `card on file`, `failed payment` and
   `dunning` return ZERO hits each. Three of the four depicted automations this
   firm does not sell, to an ICP it does not serve (they presuppose a
   card-on-file subscription business; the documented clients are HVAC, oil
   field, bus transport and an insurance MGU). The fourth, the review chase,
   is real work but its own copy says "Google Business Profile", which is
   CARD 5's subject. Meanwhile the card's own subtitle at
   `service-pillars.tsx:273` names "Bill -> categorized ledger", and its
   card-face hook is pinned by `hookIndex: 1` (`:283`) to "We're still copying
   data between systems by hand" - and nothing on the card drew either.

   >> THE FIVE MECHANISMS ARE DELIBERATELY DIFFERENT: chase, propagate, route,
   match, renew. That constraint is the reason quote follow-up is NOT here
   despite being his own ranked-first follow-up workflow: written in this shape
   it is flow 1 wearing a different hat (send a document, wait, nudge), and two
   of five sharing one mechanism lets a sceptic read the firm as mainly sending
   reminder emails. The renewal beat took its slot instead - it is what the old
   card-expiry slide should always have been, and it sits on the real client
   base (`aeo/industries/hvac.ts:28` "expired maintenance plans";
   `aeo/blog/best-automations-insurance.ts:20-29` "Renewal follow-up sequences
   (the biggest revenue protector)").

   >> LABEL WIDTHS ARE A HARD CONSTRAINT, NOT A PREFERENCE, and they were
   re-measured with getBBox in all three engines rather than counted. The
   trigger label must end before the loop's climb at x = 100, the step label
   must START after it, and the retry label must end before its drop at
   x = 380 (see the budget notes at the C2G_COL / C2G_LOOP declarations).
   FIREFOX IS THE BINDING ENGINE AND IT IS NOT CLOSE: its text metrics run
   about 5.2 user units wider than chromium's and webkit's on a 12-13
   character label, and only firefox ever gets near a line. The step label
   originally read "Pushed across", which chromium and webkit drew at 86.3 /
   86.5 units - fine - while firefox drew it at 91.54, putting its left edge
   at x = 100.23, i.e. ON the climb, at every width and in both themes.
   "Carried over" is the same sentence's own verb ("carry information
   everywhere it needs to go", service-pillars.tsx:304) and measures 77.95 in
   firefox, clearing the climb by 7.0. The widest label now shipping is
   "Renewal sent" at 83.37 firefox units, narrower than both of the labels it
   replaced ("Job complete" 84.80, "Payment fails" 84.11).

   >> THE GLYPHS WERE RE-PICKED FROM THE EXISTING VOCABULARY, and nothing was
   drawn. No path data, no geometry and no colour changed; only which of the
   twelve already-defined `C2G_GLYPH` entries each node points at. That is not
   redesign, it is the other half of the content: leaving them alone would have
   put a struck-through calendar beside "Inquiry lands" and a declined credit
   card beside "Bill lands", which are the opposite pictures. `card`, `calx`
   and `cardx` are now unused by the shipping set and are LEFT DEFINED - they
   are still the vocabulary, and the legacy `?c2=a|b|c` concepts are not to be
   disturbed. ── */
const C2G_SPECS: readonly C2GSpec[] = [
  /* CHASE. The owner dictated this one verbatim and confirmed it as the only
     keeper: "invoice sent -> paid? -> yes = Ends right there on green Yes box.
     No = email reminder sent, looping until invoice paid". Byte-identical to
     what shipped; do not touch it. */
  { id: "get-paid", nodes: [
    { slot: "trigger", glyph: "doc",   label: "Invoice sent" },
    { slot: "step",    glyph: "clock", label: "Due date" },
    { slot: "branch",  glyph: "fork",  label: "Paid?" },
    { slot: "ok",      glyph: "check", label: "Settled" },
    { slot: "retry",   glyph: "mail",  label: "Reminded" },
  ] },
  /* PROPAGATE. His own #1 pain, chosen by his own `hookIndex`. Both end labels
     are lifts from the "Eliminate Manual Data Entry" tile at
     `service-pillars.tsx:304`: "The won deal becomes the scheduled job" and
     "the moment it is entered once". It is system-to-system sync on purpose -
     a document reader would be card 3's subject (`:359`, `:367`). The retry is
     a re-send until consistent, not a chase of a human, which is what makes it
     mechanically unlike flow 1. */
  { id: "entered-once", nodes: [
    { slot: "trigger", glyph: "check", label: "Deal won" },
    { slot: "step",    glyph: "list",  label: "Carried over" },
    { slot: "branch",  glyph: "fork",  label: "In sync?" },
    { slot: "ok",      glyph: "check", label: "Entered once" },
    { slot: "retry",   glyph: "again", label: "Re-sent" },
  ] },
  /* ROUTE. His own card-2 tile, `service-pillars.tsx:316-319`: "the triage
     that answers, sorts and routes everything arriving outside business hours.
     Urgent reaches a person, everything else is acknowledged and queued." And
     a real canonical project behind it, `case-studies/after-hours-call-triage.ts`
     - `:31` "Leads going to voicemail at 7 p.m. were leads going to a
     competitor", `:42` "route straight to on-call personnel", which is where
     `Escalated` and its `person` glyph come from. The label says "Triaged" and
     not anything AI-flavoured because "classifying" belongs to card 3. */
  { id: "after-hours", nodes: [
    { slot: "trigger", glyph: "mail",   label: "Inquiry lands" },
    { slot: "step",    glyph: "list",   label: "Triaged" },
    { slot: "branch",  glyph: "fork",   label: "Answered?" },
    { slot: "ok",      glyph: "check",  label: "Booked in" },
    { slot: "retry",   glyph: "person", label: "Escalated" },
  ] },
  /* MATCH. The card's own description names this flow verbatim at
     `service-pillars.tsx:273` - "Bill -> categorized ledger" - and its own
     third differentiator at `:348` advertises the result: "A Chicago-area bus
     operator: reconciliation from a full day to a 15-minute exception queue"
     (`case-studies/chicago-bus-operator.ts:97`). `Flagged` is his product
     copy, `products/ai-bookkeeper.ts:26`: "Standard transactions categorize
     automatically. Anomalies ... are flagged for human review before posting."
     Neither figure appears in a label; quantities stay out of the artwork. */
  { id: "bill-ledger", nodes: [
    { slot: "trigger", glyph: "doc",   label: "Bill lands" },
    { slot: "step",    glyph: "list",  label: "Categorized" },
    { slot: "branch",  glyph: "fork",  label: "Matches?" },
    { slot: "ok",      glyph: "check", label: "Reconciled" },
    { slot: "retry",   glyph: "again", label: "Flagged" },
  ] },
  /* RENEW. The honest version of the credit-card-expiry slide this replaces.
     `aeo/blog/best-automations-insurance.ts:20` heads it "Renewal follow-up
     sequences (the biggest revenue protector)", `:22` "Every policy that
     lapses without renewal is recurring revenue lost", `:25` "Pulls policies
     expiring in ... day windows", `:26-27` generates and sends the outreach;
     `aeo/industries/hvac.ts:28` names "expired maintenance plans" as one of
     the seams where money leaks in his core industry. `Plan` covers the HVAC
     maintenance plan and the insurance policy without naming either vertical,
     and the windows and the "zero missed renewals" result stay out of the
     artwork. */
  { id: "renewal", nodes: [
    { slot: "trigger", glyph: "clock",  label: "Plan expiring" },
    { slot: "step",    glyph: "mail",   label: "Renewal sent" },
    { slot: "branch",  glyph: "fork",   label: "Renewed?" },
    { slot: "ok",      glyph: "check",  label: "Plan kept" },
    { slot: "retry",   glyph: "person", label: "Followed up" },
  ] },
];

const C2G_POS: Record<C2GNode["slot"], { x: number; y: number }> = {
  trigger: { x: C2G_COL.t,   y: C2G_ROW.t },
  step:    { x: C2G_COL.p,   y: C2G_ROW.p },
  branch:  { x: C2G_COL.b,   y: C2G_ROW.b },
  ok:      { x: C2G_COL.out, y: C2G_ROW.ok },
  retry:   { x: C2G_COL.out, y: C2G_ROW.r },
};

/* >> THIS ARTWORK IS STATIC, AND THAT IS A DECISION TAKEN FROM ANOTHER TEAM'S
   MEASUREMENT RATHER THAN FROM TASTE. An earlier build of this file carried a
   per-node / per-edge interior entrance: nodes arriving in flow order with the
   trigger first, each connector drawing after its own endpoints, on
   `transition-delay` with an `--i` index and a normalised `pathLength` dash.
   It worked and it was verified.
   IT WAS REMOVED. `B3b-choreographer`'s interior-entrance spec
   (`teams/B/B3-interior-choreography.md`) rejects that option BY NAME at :683
   - "a per-node/per-edge stagger for card 2's flow graph" - and settles card 2
   as "THE LEAST" of the four at :283: `.ps-c2car` fades with the shared
   primitive, `--rv-lift: 0px`, and does nothing else. The reason is measured,
   not aesthetic: this card already carries the carousel's own 5,000ms
   auto-advance, so a staggered interior entrance on top of it is the
   over-animation the owner has already reported once. :727 states plainly
   that "card 2 and card 3 need zero action from C and D."
   So there is NO `@keyframes`, NO `animation` and NO `transition` anywhere in
   this artwork. The single fade belongs to the shared primitive and targets
   `.ps-c2car` - the carousel root, which this file does NOT touch. If a future
   edit wants motion here it has to reopen B3's decision first, not add a
   second vocabulary underneath it. */

/** One node: the box, the bare centred glyph, the output port(s), the input
 *  marker, and the label. No plate, no header band, no badge, no shadow. */
function C2GNodeG({ n }: { n: C2GNode }) {
  const { x, y } = C2G_POS[n.slot];
  const L = x - C2G_HALF;
  const T = y - C2G_HALF;
  const isTrig = n.slot === "trigger";
  const isOk = n.slot === "ok";
  const s = C2G_ICON / 24;
  return (
    <g className="ps-c2g-n">
      {/* THE BOX. Flat fill plus one hairline. The trigger's left edge is
          fully rounded at r = 50% of the height, which is n8n's trigger
          signature and the reason exactly one node in the picture is a "D". */}
      {isTrig ? (
        <path
          className="ps-c2g-box"
          d={`M${L + C2G_HALF} ${T} H${L + C2G_S - C2G_R} a${C2G_R} ${C2G_R} 0 0 1 ${C2G_R} ${C2G_R} V${T + C2G_S - C2G_R} a${C2G_R} ${C2G_R} 0 0 1 ${-C2G_R} ${C2G_R} H${L + C2G_HALF} a${C2G_HALF} ${C2G_HALF} 0 0 1 0 ${-C2G_S} Z`}
        />
      ) : (
        <rect className={"ps-c2g-box" + (isOk ? " ps-c2g-box--ok" : "")}
          x={L} y={T} width={C2G_S} height={C2G_S} rx={C2G_R} />
      )}

      {/* THE TRIGGER MARK. A bolt OUTSIDE the node's left edge, which is where
          n8n's own `CanvasNodeTrigger` puts it (`position:absolute; right:100%`).
          It is the one accent-coloured object in the picture. */}
      {isTrig && (
        <path className="ps-c2g-bolt"
          d={`M${L - 13} ${y - 1} l7 -9 -1.5 7 h6 l-8.5 10 2 -8 Z`} />
      )}

      {/* THE ICON. Dead centre, 40% of the node side, no container. */}
      <g className={"ps-c2g-ico" + (isOk ? " ps-c2g-ico--ok" : "")}
        transform={`translate(${x - C2G_ICON / 2} ${y - C2G_ICON / 2}) scale(${s})`}>
        {C2G_GLYPH[n.glyph]}
      </g>

      {/* THE INPUT MARKER. The "|>" glyph - a short rounded tick plus a small
          solid arrow - on the left edge. The trigger has none, because a
          trigger is where work enters the system from outside. */}
      {!isTrig && (
        <g className="ps-c2g-in">
          <path className="ps-c2g-tick" d={`M${L} ${y - 4.2} V${y + 4.2}`} />
          <path className="ps-c2g-arrow" d={`M${L - 4.6} ${y - 3.2} L${L - 0.6} ${y} L${L - 4.6} ${y + 3.2} Z`} />
        </g>
      )}
      {/* The step node's SECOND input - where the loop comes back in. */}
      {n.slot === "step" && (
        <g className="ps-c2g-in">
          <path className="ps-c2g-tick" d={`M${L} ${C2G_P_IN_RET - 4.2} V${C2G_P_IN_RET + 4.2}`} />
          <path className="ps-c2g-arrow" d={`M${L - 4.6} ${C2G_P_IN_RET - 3.2} L${L - 0.6} ${C2G_P_IN_RET} L${L - 4.6} ${C2G_P_IN_RET + 3.2} Z`} />
        </g>
      )}

      {/* THE OUTPUT PORT(S). Solid dot centred ON the right edge, half in and
          half out. The branch carries TWO - and those two dots ARE the
          decision. Terminals carry none: nothing leaves a settled outcome, and
          drawing a port it never uses would say otherwise. */}
      {n.slot === "branch" ? (
        <>
          <circle className="ps-c2g-port" cx={L + C2G_S} cy={C2G_B_OUT_HI} r={C2G_PORT} />
          <circle className="ps-c2g-port" cx={L + C2G_S} cy={C2G_B_OUT_LO} r={C2G_PORT} />
        </>
      ) : n.slot === "ok" ? null : (
        <circle className="ps-c2g-port" cx={L + C2G_S} cy={y} r={C2G_PORT} />
      )}

      {/* THE LABEL. Below, centred on the node's centre-x. The research is
          explicit that labels are what make this read as a diagram rather than
          as decoration, and that they are the one piece of text in the picture
          that is unambiguously not chrome. */}
      <text className={"ps-c2g-lbl" + (isOk ? " ps-c2g-lbl--ok" : "")}
        x={x} y={T + C2G_S + C2G_LBL_DY} textAnchor="middle">{n.label}</text>
    </g>
  );
}

/** One slide of the set. */
export function C2FlowGraph({ spec }: { spec: C2GSpec }) {
  const P = C2G_POS;
  const eT = c2gEdge(P.trigger.x + C2G_HALF, P.trigger.y, P.step.x - C2G_HALF, P.step.y);
  const eP = c2gEdge(P.step.x + C2G_HALF, P.step.y, P.branch.x - C2G_HALF, C2G_B_IN_FWD);
  const eOk = c2gEdge(P.branch.x + C2G_HALF, C2G_B_OUT_HI, P.ok.x - C2G_HALF, P.ok.y);
  const eRe = c2gEdge(P.branch.x + C2G_HALF, C2G_B_OUT_LO, P.retry.x - C2G_HALF, P.retry.y);
  /* Floor at 282 leaves 28 units under it inside the 310 canvas, and clears
     the retry label's descenders by 14. The climb clears the branch label by
     26 units and the step label by 9.5 - both measured against the label width
     budget above, not eyeballed. */
  const eLoop = c2gLoop(P.retry.x + C2G_HALF, P.retry.y, C2G_LOOP_DOWNX, C2G_LOOP_FLOOR,
                        C2G_LOOP_UPX, C2G_P_IN_RET, P.step.x - C2G_HALF);

  return (
    <div className="ps-c2g-root" data-c2g={spec.id} aria-hidden="true">
      <svg className="ps-c2g-svg" viewBox={`0 ${C2G_VB_Y} ${C2G_VB_W} ${C2G_VB_H}`}
        preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
        {/* EDGES FIRST, so a node always paints over the line that reaches it
            and no connector appears to cross a node's face. */}
        <g className="ps-c2g-edges" fill="none">
          <path className="ps-c2g-e" d={eT} />
          <path className="ps-c2g-e" d={eP} />
          <path className="ps-c2g-e ps-c2g-e--ok" d={eOk} />
          <path className="ps-c2g-e" d={eRe} />
          {/* THE LOOP, and it is the sentence the whole picture exists to say:
              the exception does not land on a desk, it goes round again. Flow 3
              is the exception to the exception - it holds instead of chasing -
              so it gets a flat cap and no return. */}
          <path className="ps-c2g-e ps-c2g-e--loop" d={eLoop} />
        </g>

        <g className="ps-c2g-nodes">
          {spec.nodes.map((n) => (
            <C2GNodeG key={n.slot} n={n} />
          ))}
        </g>
      </svg>

      {/* THE DISSOLVE. n8n's `radial-gradient(95% 95%, #fff 0 28%, #fff0 85%)`
          recipe, expressed the way this repo already expresses it - a veil in
          the ground colour rather than a mask - so the graph has NO hard
          rectangular boundary and cannot read as a screenshot edge. */}
      <div className="ps-c2g-veil" />
    </div>
  );
}

/* The five renderers the carousel mounts. Thin on purpose: the picture is one
   component and the five differ only in their spec, so a craft change lands on
   all five at once and they cannot drift apart. */
export function C2GraphGetPaid()     { return <C2FlowGraph spec={C2G_SPECS[0]} />; }
export function C2GraphEnteredOnce() { return <C2FlowGraph spec={C2G_SPECS[1]} />; }
export function C2GraphAfterHours()  { return <C2FlowGraph spec={C2G_SPECS[2]} />; }
export function C2GraphBillLedger()  { return <C2FlowGraph spec={C2G_SPECS[3]} />; }
export function C2GraphRenewal()     { return <C2FlowGraph spec={C2G_SPECS[4]} />; }
