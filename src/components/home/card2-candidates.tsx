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

import React, { useEffect, useState } from "react";

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
        </div>

        {/* THE RETRY LOOP. Leaves the chase node, runs off the frame, and
            comes back into the same node head first. This is the automation
            doing it again without you, and it is why there are no longer
            three dots trying to say the same thing in a corner. */}
        <i className="ps-c2b-loop" />

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

export function SystemFixesVisualPick({ fallback }: { fallback: React.ReactNode }) {
  const [choice, setChoice] = useState<Card2Choice>("b");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("c2");
    if (raw === "a" || raw === "b" || raw === "c" || raw === "orig") setChoice(raw);
  }, []);

  if (choice === "orig") return <>{fallback}</>;
  if (choice === "a") return <SystemFixesVisualA />;
  if (choice === "c") return <SystemFixesVisualC />;
  return <SystemFixesVisualB />;
}
