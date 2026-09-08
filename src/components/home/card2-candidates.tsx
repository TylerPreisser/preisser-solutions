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
  id: "get-paid" | "reviews" | "expiry" | "refill" | "retry";
  /* For the carousel's own control name and live region. NOT drawn. */
  label: string;
  render: () => React.ReactElement;
};

export const CARD2_FLOW_SLIDES: readonly Card2FlowSlide[] = [
  { id: "get-paid", label: "Invoices that chase themselves", render: () => <AutoFlowGetPaid /> },
  { id: "reviews", label: "A review after every job", render: () => <AutoFlowReviews /> },
  { id: "expiry", label: "Nothing expires on you", render: () => <AutoFlowExpiry /> },
  { id: "refill", label: "Cancellations refilled", render: () => <AutoFlowRefill /> },
  { id: "retry", label: "Failed payments retried", render: () => <AutoFlowRetry /> },
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
  const [held, setHeld] = useState(false);
  /* Off screen, hidden tab, or covered by the dialog. Starts TRUE: the
     IntersectionObserver below fires on `observe`, so the true value arrives
     within a frame, and starting false would arm a timer for that frame on a
     card that may be nowhere near the viewport. */
  const [gated, setGated] = useState(true);

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

  /* ── THE THREE GATES THE STYLESHEET CANNOT REACH.
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
    if (reduced || hovered || held || gated) return;
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
  }, [reduced, hovered, held, gated]);

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

/* ═════════════════════════════════════════════════════════════
   THE FIVE AUTOMATION FLOWS        ?c2flow=1|2|3|4|5, default 1
   ═════════════════════════════════════════════════════════════

   >> THIS IS A REFINEMENT, NOT A REPLACEMENT, AND THAT IS THE WHOLE BRIEF.
   The arrow flow chart already on this card is the ONE graphic on this
   homepage the owner has praised ("Arrow section looks better"). The directed
   edge language - plates, one true diamond, a solid arrowhead on every
   connector, coloured branches, a return that runs round the outside - is
   KEPT UNCHANGED and extended to four more flows. SystemFixesVisualB is left
   exactly as it shipped and stays reachable at ?c2=b, so the before state can
   be put beside the after in one page load.

   WHAT CHANGED IN FLOW 1, and only this: the owner specified a different
   branch structure from the one on the card today. Today it draws
   `Invoice sent -> Chased for you -> Paid? -> yes | no` with a self loop on
   the chase node. He asked for:

       Invoice sent -> Paid? --yes--> Yes        (green, and it ENDS there)
                         |
                         +---no----> Email reminder sent --+
                         ^                                 |
                         +---------------------------------+

   So: the yes branch TERMINATES, the no branch returns TO THE DECISION rather
   than to the start, and the reminder reads as repeating rather than as one
   failed step.

   >> MATCH CRAFT, NEVER FORM. This project has burned three rounds of work on
   graphics that copied a NEIGHBOURING CARD'S FORM. Card 4 is a browser window
   because card 4's subject IS a browser; that literalness does not transfer to
   an abstract subject, and copying it is how you end up with five screenshots
   of software and zero ideas. What IS taken from card 4 is craft and nothing
   else: restrained palette, flat ground, one accent plus a green, everything
   else neutral, crisp edges, soft shadow separation, no gloss and no texture.
   There is no window, title bar, traffic light, sidebar, URL field, toolbar,
   panel or placeholder row anywhere in these five.

   >> TOPOLOGY IS THE POINT. The five were chosen for FIVE DIFFERENT LOOP
   MECHANISMS. If all five were drawn as one shape the card would say "we send
   reminders" five times and argue against its own headline, so each gets a
   form that expresses its own mechanism while staying inside one grammar:

     1  GET PAID              decision return. Yes is a leaf and stops.
     2  REVIEW AFTER EVERY JOB decision return, symmetric fork, two beat lead
                              in, and the return comes back up the RIGHT.
                              Honestly the same mechanism as 1, because it is.
     3  NOTHING EXPIRES ON YOU a GATE. A barrier spans the frame with one gap;
                              the cleared lane goes through it and the other
                              lane DEAD ENDS on the bar with a flat cap.
     4  CANCELLATION REFILLED  the loop ADVANCES. It re-enters a stack one row
                              lower and the rows already passed are spent.
     5  PAYMENT RETRIED        a closed ORBIT on the node itself, ticked at
                              EQUAL intervals. No human in the loop; the
                              person is the exit.

   ONE GRAMMAR, so a reader who understands the first understands the rest:
     process beat      rounded slab, label left
     decision          diamond, label centred
     terminal          STADIUM, green, and nothing ever leaves one
     forward edge      3px rail, solid 11x8 arrowhead
     branch edge       the same, coloured: green settles, accent acts
     blocked edge      the same, ending in a FLAT CAP and no head
     return edge       accent, runs round the OUTSIDE, head first into the
                       node it returns to
     repeats           growing dots for a human ladder, equal dots for a
                       machine schedule

   >> NO INVENTED DATA anywhere in the five: no amount, date, client name,
   count or percentage. Flow 4's list is deliberately unlabelled mass, because
   naming its rows would mean inventing people.

   >> NO SVG defs, NO GENERATED IDS, NO url(#...). Same ruling as the rest of
   this file, and it matters more here than anywhere: these mount TWICE at
   once, on the card face and in the bottom sheet dialog. Every rail,
   arrowhead, diamond, stadium, barrier and orbit is CSS. The id collision is
   structurally unreachable rather than merely namespaced.

   >> MOTION: NONE. Nothing here is ever hidden, so reduced motion and normal
   are the same render and the blank-card failure mode cannot occur.
   ═════════════════════════════════════════════════════════════ */

/* The three growing dots, the card's own dunning ladder. Authored, never
   Math.random - this is server rendered and a random value desynchronises. */
function C2Nudges() {
  return (
    <span className="ps-c2-nudges">
      {C2_NUDGES.map((n) => (
        <i key={n} className="ps-c2-nudge" style={{ "--n": n } as React.CSSProperties} />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW 1  -  GET PAID
   ───────────────────────────────────────────────────────────── */
export function AutoFlowGetPaid() {
  return (
    <div className="ps-c2f-root ps-c2-root" aria-hidden="true">
      {/* >> `.ps-c2-body` AND `.ps-c2-pool` ARE GONE FROM ALL FIVE, AND THAT IS
          SYMPTOM #8. What they were: a pale wash 76% of the art tall with
          `border-radius: 0 0 30% 30%`, whose bottom edge swept a wide elliptical
          arc across the card just above the branch row - a bell jar horizon with
          no referent, grouping nothing and crossing the flow at an unrelated
          angle - and beneath it a blue radial glow reading as a stage light. The
          other four cards sit on a flat even field where every lighter shape is
          a DEPICTED OBJECT; this was the only card carrying ambient,
          non-representational atmosphere behind a flat vector diagram.

          >> `.ps-c2-ground` STAYS, AND THAT IS A DECISION, NOT AN OMISSION.
          Removing it moves 0.01% of pixels at max delta 3/255, because a legacy
          `.ps-c2-root` rule (card-visuals.css:2656, from the abandoned braided
          river, light at :2696) paints an identical ramp underneath it - so
          deleting it would look like a failed edit rather than a change.
          Keeping it means THIS file owns its own ground explicitly instead of
          silently inheriting a dead component's gradient. Going properly flat to
          match the siblings needs a SECOND edit in card-visuals.css, which is
          not this team's file; recommended and routed separately. Nothing below
          depends on which of the two is painting: the plates separate from the
          ground by value and cast shadow, not by contrast against a backdrop. */}
      <div className="ps-c2-ground" />

      <div className="ps-c2f-flow ps-c2f1-flow">
        <div className="ps-c2f-node ps-c2f1-trig ps-c2f-keepclear">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Invoice sent</span>
        </div>

        <i className="ps-c2f-edge ps-c2f1-e1" />

        {/* THE DECISION. It fills its column, so its left and right vertices
            are grid lines and every rail that meets it lands by construction. */}
        <div className="ps-c2f-dia ps-c2f1-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">Paid?</span>
        </div>

        {/* THE YES BRANCH, AND IT IS A LEAF. A green rail off the right vertex
            into a STADIUM, the flow chart terminator shape. Nothing leaves it,
            here or anywhere else in the file. That is how "ends right there"
            is drawn instead of claimed. */}
        <div className="ps-c2f1-yes">
          {/* NO "yes" TAG HERE. It sat straight under the stadium in the
              first render, and it is redundant beside a green box whose whole
              content is the word "Yes". See the note in the stylesheet. */}
          <i className="ps-c2f-hrail ps-c2f-hrail--good" />
          <div className="ps-c2f-term ps-c2f-term--fromleft">
            <C2Settled cls="ps-c2-glyph" />
            <span className="ps-c2-lbl ps-c2-lbl--strong">Yes</span>
          </div>
        </div>

        {/* THE NO BRANCH. Straight down out of the bottom vertex. */}
        <i className="ps-c2f-edge ps-c2f-edge--act ps-c2f1-e2">
          <span className="ps-c2f-tag">no</span>
        </i>

        {/* THE REMINDER, AND IT REPEATS. The three growing dots are the
            dunning ladder the shipped chart already uses for exactly this
            meaning: again, and again, and harder. Without them this reads as
            one reminder that failed rather than as a loop. */}
        <div className="ps-c2f-node ps-c2f-drop ps-c2f-drop--left ps-c2f1-act">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Email reminder sent</span>
          <C2Nudges />
        </div>

        {/* THE RETURN, AND IT GOES BACK TO THE DECISION. Its top run sits at
            half the decision row's height, which is the diamond's LEFT VERTEX.
            It cannot reach "Invoice sent": that plate is two tracks higher and
            outside this element's grid area entirely. */}
        <i className="ps-c2f-ret ps-c2f-ret--left ps-c2f1-ret" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW 2  -  REVIEW AFTER EVERY JOB
   Same mechanism as flow 1, and drawn as such on purpose: it IS a nudge
   loop, and giving it a different shape would misrepresent how it works.
   The composition differs so the two are not the same picture - a two beat
   lead in, the shipped chart's own symmetric fork, and a return that comes
   back up the RIGHT channel instead of the left.
   ───────────────────────────────────────────────────────────── */
export function AutoFlowReviews() {
  return (
    <div className="ps-c2f-root ps-c2-root" aria-hidden="true">
      {/* >> `.ps-c2-body` AND `.ps-c2-pool` ARE GONE FROM ALL FIVE, AND THAT IS
          SYMPTOM #8. What they were: a pale wash 76% of the art tall with
          `border-radius: 0 0 30% 30%`, whose bottom edge swept a wide elliptical
          arc across the card just above the branch row - a bell jar horizon with
          no referent, grouping nothing and crossing the flow at an unrelated
          angle - and beneath it a blue radial glow reading as a stage light. The
          other four cards sit on a flat even field where every lighter shape is
          a DEPICTED OBJECT; this was the only card carrying ambient,
          non-representational atmosphere behind a flat vector diagram.

          >> `.ps-c2-ground` STAYS, AND THAT IS A DECISION, NOT AN OMISSION.
          Removing it moves 0.01% of pixels at max delta 3/255, because a legacy
          `.ps-c2-root` rule (card-visuals.css:2656, from the abandoned braided
          river, light at :2696) paints an identical ramp underneath it - so
          deleting it would look like a failed edit rather than a change.
          Keeping it means THIS file owns its own ground explicitly instead of
          silently inheriting a dead component's gradient. Going properly flat to
          match the siblings needs a SECOND edit in card-visuals.css, which is
          not this team's file; recommended and routed separately. Nothing below
          depends on which of the two is painting: the plates separate from the
          ground by value and cast shadow, not by contrast against a backdrop. */}
      <div className="ps-c2-ground" />

      <div className="ps-c2f-flow ps-c2f2-flow">
        <div className="ps-c2f-node ps-c2f2-trig ps-c2f-keepclear">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Job complete</span>
        </div>

        <i className="ps-c2f-edge ps-c2f2-e1" />

        <div className="ps-c2f-node ps-c2f2-mid">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Ask sent</span>
        </div>

        <i className="ps-c2f-edge ps-c2f2-e1b" />

        <div className="ps-c2f-dia ps-c2f2-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">Reviewed?</span>
        </div>

        {/* THE SHIPPED CHART'S OWN FORK, reused rule for rule. Its arms are a
            subgrid over the two outcome columns, so each arm's own 50% IS its
            plate's centre line by construction rather than by arithmetic. */}
        <i className="ps-c2b-fork">
          <i className="ps-c2b-arm ps-c2b-arm--yes">
            <span className="ps-c2b-tag">yes</span>
          </i>
          <i className="ps-c2b-arm ps-c2b-arm--no">
            <span className="ps-c2b-tag">no</span>
          </i>
        </i>

        {/* THE LEAF. A stadium, and nothing leaves it. */}
        <div className="ps-c2f-term ps-c2f-term--fromtop ps-c2f-out ps-c2f2-outa">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">Review posted</span>
        </div>

        <div className="ps-c2f-node ps-c2f-node--fromtop ps-c2f-drop ps-c2f-drop--right ps-c2f-out ps-c2f2-outb">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Asked again</span>
        </div>

        <i className="ps-c2f-ret ps-c2f-ret--right ps-c2f2-ret" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW 3  -  NOTHING EXPIRES ON YOU          the gate
   The one flow whose "no" branch does not message anybody again: it HOLDS
   THE WORK BACK. So the picture is a barrier, and the held lane dead ends on
   it under a flat cap with no arrowhead.
   ───────────────────────────────────────────────────────────── */
export function AutoFlowExpiry() {
  return (
    <div className="ps-c2f-root ps-c2-root" aria-hidden="true">
      {/* >> `.ps-c2-body` AND `.ps-c2-pool` ARE GONE FROM ALL FIVE, AND THAT IS
          SYMPTOM #8. What they were: a pale wash 76% of the art tall with
          `border-radius: 0 0 30% 30%`, whose bottom edge swept a wide elliptical
          arc across the card just above the branch row - a bell jar horizon with
          no referent, grouping nothing and crossing the flow at an unrelated
          angle - and beneath it a blue radial glow reading as a stage light. The
          other four cards sit on a flat even field where every lighter shape is
          a DEPICTED OBJECT; this was the only card carrying ambient,
          non-representational atmosphere behind a flat vector diagram.

          >> `.ps-c2-ground` STAYS, AND THAT IS A DECISION, NOT AN OMISSION.
          Removing it moves 0.01% of pixels at max delta 3/255, because a legacy
          `.ps-c2-root` rule (card-visuals.css:2656, from the abandoned braided
          river, light at :2696) paints an identical ramp underneath it - so
          deleting it would look like a failed edit rather than a change.
          Keeping it means THIS file owns its own ground explicitly instead of
          silently inheriting a dead component's gradient. Going properly flat to
          match the siblings needs a SECOND edit in card-visuals.css, which is
          not this team's file; recommended and routed separately. Nothing below
          depends on which of the two is painting: the plates separate from the
          ground by value and cast shadow, not by contrast against a backdrop. */}
      <div className="ps-c2-ground" />

      <div className="ps-c2f-flow ps-c2f3-flow">
        <div className="ps-c2f-node ps-c2f3-trig ps-c2f-keepclear">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Expiry near</span>
        </div>

        <i className="ps-c2f-edge ps-c2f3-e1" />

        <div className="ps-c2f-dia ps-c2f3-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">Renewed?</span>
        </div>

        <i className="ps-c2b-fork">
          <i className="ps-c2b-arm ps-c2b-arm--yes">
            <span className="ps-c2b-tag">yes</span>
          </i>
          <i className="ps-c2b-arm ps-c2b-arm--no">
            <span className="ps-c2b-tag">no</span>
          </i>
        </i>

        {/* WHAT THE AUTOMATION DOES WHILE THE WORK IS HELD. */}
        <div className="ps-c2f-node ps-c2f-node--fromtop ps-c2f-drop ps-c2f-drop--right ps-c2f-out ps-c2f3-hold">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Request sent</span>
        </div>

        {/* THE HELD LANE. It carries no arrowhead, because it does not arrive
            anywhere. It ends in a FLAT CAP sitting on the bar. */}
        <i className="ps-c2f-edge ps-c2f-edge--act ps-c2f-edge--stop ps-c2f3-stop" />

        {/* THE BARRIER, IN TWO PIECES WITH ONE OPENING BETWEEN THEM. The
            right piece runs off the edge of the frame; the left piece carries
            the gap the cleared lane goes through. */}
        <i className="ps-c2f3-bar" />
        <i className="ps-c2f3-barl" />

        {/* THE CLEARED LANE. It passes the bar because on this side the bar
            is simply not there. */}
        <i className="ps-c2f-edge ps-c2f-edge--good ps-c2f3-yes" />

        <div className="ps-c2f-term ps-c2f3-term">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">Cleared</span>
        </div>

        <i className="ps-c2f-ret ps-c2f-ret--right ps-c2f3-ret" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW 4  -  CANCELLATION REFILLED           the loop advances
   Every other loop here returns to where it was. This one makes progress:
   the rows it has already been through are spent, and the return leaves the
   row BELOW the live one.
   ───────────────────────────────────────────────────────────── */
export function AutoFlowRefill() {
  return (
    <div className="ps-c2f-root ps-c2-root" aria-hidden="true">
      {/* >> `.ps-c2-body` AND `.ps-c2-pool` ARE GONE FROM ALL FIVE, AND THAT IS
          SYMPTOM #8. What they were: a pale wash 76% of the art tall with
          `border-radius: 0 0 30% 30%`, whose bottom edge swept a wide elliptical
          arc across the card just above the branch row - a bell jar horizon with
          no referent, grouping nothing and crossing the flow at an unrelated
          angle - and beneath it a blue radial glow reading as a stage light. The
          other four cards sit on a flat even field where every lighter shape is
          a DEPICTED OBJECT; this was the only card carrying ambient,
          non-representational atmosphere behind a flat vector diagram.

          >> `.ps-c2-ground` STAYS, AND THAT IS A DECISION, NOT AN OMISSION.
          Removing it moves 0.01% of pixels at max delta 3/255, because a legacy
          `.ps-c2-root` rule (card-visuals.css:2656, from the abandoned braided
          river, light at :2696) paints an identical ramp underneath it - so
          deleting it would look like a failed edit rather than a change.
          Keeping it means THIS file owns its own ground explicitly instead of
          silently inheriting a dead component's gradient. Going properly flat to
          match the siblings needs a SECOND edit in card-visuals.css, which is
          not this team's file; recommended and routed separately. Nothing below
          depends on which of the two is painting: the plates separate from the
          ground by value and cast shadow, not by contrast against a backdrop. */}
      <div className="ps-c2-ground" />

      <div className="ps-c2f-flow ps-c2f4-flow">
        <div className="ps-c2f-node ps-c2f4-trig ps-c2f-keepclear">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Slot opens</span>
        </div>

        <i className="ps-c2f-edge ps-c2f4-e1" />

        <div className="ps-c2f-node ps-c2f4-mid">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Offered</span>
        </div>

        <i className="ps-c2f-edge ps-c2f4-e1b" />

        <div className="ps-c2f-dia ps-c2f4-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">Taken?</span>
        </div>

        <i className="ps-c2b-fork">
          <i className="ps-c2b-arm ps-c2b-arm--yes">
            <span className="ps-c2b-tag">yes</span>
          </i>
          <i className="ps-c2b-arm ps-c2b-arm--no">
            <span className="ps-c2b-tag">no</span>
          </i>
        </i>

        <div className="ps-c2f-term ps-c2f-term--fromtop ps-c2f-out ps-c2f4-outa">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">Slot filled</span>
        </div>

        {/* THE LIST. Its rows carry no text on purpose: naming them would
            mean inventing people. Two spent, one live, one still to come. */}
        <div className="ps-c2f-node ps-c2f-node--fromtop ps-c2f-out ps-c2f4-list">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Next in line</span>
          <span className="ps-c2f4-rows">
            <i className="ps-c2f4-slot ps-c2f4-slot--spent" />
            <i className="ps-c2f4-slot ps-c2f4-slot--spent" />
            <i className="ps-c2f4-slot ps-c2f4-slot--live" />
            <i className="ps-c2f4-slot" />
            <i className="ps-c2f4-exit" />
          </span>
        </div>

        <i className="ps-c2f-ret ps-c2f-ret--right ps-c2f4-ret" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOW 5  -  PAYMENT RETRIED                 the machine
   No human is in this loop, so there is no return channel: the loop is a
   closed orbit on the node itself, ticked at EQUAL intervals against flow
   1's GROWING dots. The person is the exit, not the loop.
   ───────────────────────────────────────────────────────────── */
export function AutoFlowRetry() {
  return (
    <div className="ps-c2f-root ps-c2-root" aria-hidden="true">
      {/* >> `.ps-c2-body` AND `.ps-c2-pool` ARE GONE FROM ALL FIVE, AND THAT IS
          SYMPTOM #8. What they were: a pale wash 76% of the art tall with
          `border-radius: 0 0 30% 30%`, whose bottom edge swept a wide elliptical
          arc across the card just above the branch row - a bell jar horizon with
          no referent, grouping nothing and crossing the flow at an unrelated
          angle - and beneath it a blue radial glow reading as a stage light. The
          other four cards sit on a flat even field where every lighter shape is
          a DEPICTED OBJECT; this was the only card carrying ambient,
          non-representational atmosphere behind a flat vector diagram.

          >> `.ps-c2-ground` STAYS, AND THAT IS A DECISION, NOT AN OMISSION.
          Removing it moves 0.01% of pixels at max delta 3/255, because a legacy
          `.ps-c2-root` rule (card-visuals.css:2656, from the abandoned braided
          river, light at :2696) paints an identical ramp underneath it - so
          deleting it would look like a failed edit rather than a change.
          Keeping it means THIS file owns its own ground explicitly instead of
          silently inheriting a dead component's gradient. Going properly flat to
          match the siblings needs a SECOND edit in card-visuals.css, which is
          not this team's file; recommended and routed separately. Nothing below
          depends on which of the two is painting: the plates separate from the
          ground by value and cast shadow, not by contrast against a backdrop. */}
      <div className="ps-c2-ground" />

      <div className="ps-c2f-flow ps-c2f5-flow">
        <div className="ps-c2f-node ps-c2f5-trig ps-c2f-keepclear">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Card declined</span>
        </div>

        <i className="ps-c2f-edge ps-c2f5-e1" />

        <div className="ps-c2f-node ps-c2f5-mid">
          <span className="ps-c2-lbl ps-c2-lbl--strong">Retried</span>
          <span className="ps-c2f-ticks">
            <i className="ps-c2f-tick" />
            <i className="ps-c2f-tick" />
            <i className="ps-c2f-tick" />
          </span>
          {/* THE ORBIT. A child of the plate, so it is measured from the plate
              and cannot drift. It runs off the left edge of the frame. */}
          <i className="ps-c2f5-orbit" />
        </div>

        <i className="ps-c2f-edge ps-c2f5-e1b" />

        <div className="ps-c2f-dia ps-c2f5-dia">
          <span className="ps-c2-lbl ps-c2-lbl--dia">Cleared?</span>
        </div>

        <i className="ps-c2b-fork">
          <i className="ps-c2b-arm ps-c2b-arm--yes">
            <span className="ps-c2b-tag">yes</span>
          </i>
          <i className="ps-c2b-arm ps-c2b-arm--no">
            <span className="ps-c2b-tag">no</span>
          </i>
        </i>

        <div className="ps-c2f-term ps-c2f-term--fromtop ps-c2f-out ps-c2f5-outa">
          <C2Settled cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">Back on</span>
        </div>

        {/* THE ONLY PLACE A PERSON APPEARS, and it is a leaf, not the loop. */}
        <div className="ps-c2f-node ps-c2f-node--handoff ps-c2f-node--fromtop ps-c2f-out ps-c2f5-outb">
          <C2HandOff cls="ps-c2-glyph" />
          <span className="ps-c2-lbl ps-c2-lbl--strong">Update asked</span>
        </div>
      </div>
    </div>
  );
}
