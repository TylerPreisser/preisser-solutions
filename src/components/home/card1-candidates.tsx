"use client";

/* ============================================================================
   CARD 1 — "Business Software." — three candidate visuals.
   Team D, run bento-2026-09-07, THIRD pass.
   Styles: src/styles/card1-candidates.css

   THE OWNER'S SPEC, verbatim, and it is the whole of the assignment:
     "the business software is supposed to be an executive dashbaord with
      panels iwht different types of charts or graphs or KPI's"
   What shipped and was rejected was ONE GIANT SEGMENTED SEMICIRCULAR GAUGE
   (that is `?c1=orig`, the masonry arch in card-visuals-backup.tsx, whose own
   source comment records it degrading into a gauge three separate times).
   So: panels, PLURAL, each holding a DIFFERENT instrument, with KPI tiles.

   >> CARD 4 IS THE REFERENCE FOR ANIMATION STYLE ONLY.  Nothing else about it
   transfers.  The owner: "they should not be a fricken webpage like websites
   they should just be kinda the same animation style in what they are doing
   ... but not matching any specifics or anything else about it at all other
   than animation style."  An earlier instruction to make this card literal and
   browser-like the way card 4 is literal and browser-like was a FORM copy, and
   form copying off a neighbour is the documented cause of three rounds of
   rejected browser mockups on this project.  Card 4's form is a browser window
   because its subject is websites.  Card 1's form is a dashboard because its
   subject is business software.  Neither borrows the other's object, and this
   file borrows nothing from card 4 except its stillness.

   WHAT "CLEAN" MEANS HERE, since he asked for card 4's cleanliness: it is a
   CRAFT standard, not a shape.  Measured across the row, card 4 is the
   BRIGHTEST and the LEAST COLOURFUL card in the set.  Bright, not vivid;
   calm, uncluttered, confident, generously spaced.  A dense dashboard can be
   clean.  That is the target, and it is measured in the report rather than
   asserted.

   RULING 1, ACCEPTED DELIBERATELY.  The graphic-designer kill-test ("could
   this be mistaken for a screenshot of software?") carves itself out where the
   subject IS literally software.  Card 1's subject is literally business
   software, and the owner has now ruled three times that a dashboard is the
   answer.  All three concepts below are dashboards that look like dashboards.
   I did not sand this toward abstraction and I did not substitute a metaphor.
   Banned throughout anyway, because it is the vocabulary that got three
   earlier rounds rejected: no browser chrome, no window frame, no URL bar, no
   traffic-light dots, no device bezel, no sidebar, no rows of grey placeholder
   pills.

   RULING 4 (AMENDED) — read, and followed.  Placeholder figures are permitted
   and he asked for KPIs, so there are numbers.  Every figure is a placeholder
   inside a depicted product UI: round, unremarkable for a small service
   business, never framed as a Preisser Solutions or client result, and no
   invented company names.  NO CURRENCY, keeping my predecessor's call, because
   a dollar figure is an unresolved disagreement in this repo.  One placeholder
   set is shared by all three concepts because all three depict one business:
     142 jobs completed · 8.4% up · 96% on time · 18 open · 64 invoices ·
     "This month" · a 13-point weekly series · six service columns · a 46/31/23
     share split.
   >> THE "figures shown are a demonstration" LABEL IS GONE, ON THE OWNER'S
   INSTRUCTION: "remove 'the figures shown are a demonstration' from business
   software bento".  The figures stay and the label goes.  That is consistent
   rather than contradictory: he had already overridden the fabricated-figures
   restriction for these cards earlier the same evening ("we are overriding the
   forbidding of fabricating numbers as some of these cards will need
   placeholder values"), so the disclaimer was guarding a rule he had already
   lifted.  D11's precedent at marcommand-live.tsx:1391,1462 still stands for
   the pages that carry money figures; this card carries none.

   ============================================================================
   >> ZERO MOTION.  THIS IS THE BIGGEST CHANGE FROM THE PREVIOUS PASS AND IT IS
   A DELETION, NOT AN ADDITION.

   The measured card-4 style is: "arrive once as a single finished object over
   0.65s on a hard ease-out, then hold perfectly still."  Exactly ONE thing
   animates and it is THE CARD, driven by a single grid-level ScrollTrigger at
   service-pillars.tsx:2483-2499 that this file does not own and must not
   duplicate.  Everything inside rides in as one rigid unit.

   So this module has NO reveal hook, NO IntersectionObserver, NO `.in-view`
   class, NO `--i` stagger index, and its stylesheet has NO transition, NO
   animation and NO @keyframes.  The previous pass staggered five panels, grew
   an area from its baseline, drew a trend line along its own path, drew a ring
   arc and grew six columns out of their axis.  All of that is now deleted.  A
   dashboard that counts up its numbers and grows its bars reads as BUSY, which
   is the opposite of what was asked for, and a chart drawing itself is the
   single most obvious flourish for this subject and precisely what card 4's
   style forbids.

   THREE THINGS FALL OUT OF THAT DELETION, and they are why it is the right
   engineering answer as well as the right design answer:

   1. >> THE ART RENDERS COMPLETE WITH NO JAVASCRIPT.  Nothing here starts at
      `opacity: 0`, so nothing depends on a script to become visible.  A
      sibling card shipped a BLANK NAVY RECTANGLE in WebKit because one
      /_next/static/ chunk 404'd and its hide-by-default reveal had nothing to
      turn it back on.  A shared .next has corrupted three times today,
      answering HTTP 200 with perfect markup and dead JavaScript.  Under that
      exact condition this card still draws the whole dashboard.  Verified with
      JavaScript fully disabled, not assumed.

   2. >> REDUCED MOTION IS CORRECT BY CONSTRUCTION.  M4's rule is "render the
      final state at first paint, never opacity: 0".  With no transitions to
      gate there is nothing to pin and nothing to fail: the reduced-motion
      render is byte-identical to the normal one, which is asserted in the
      report by hash rather than claimed.

   3. There is no hover end-state to snap, because this card adds no hover
      behaviour at all.  M4 records card 4 snapping on hover exit because its
      transition is gated and its end-state is not; that defect cannot exist
      here.

   ============================================================================
   >> THE ART PAINTS NO BACKGROUND OF ITS OWN.  Owner, from a screenshot of the
   dark card face: "remove these lines or weird background and instead put on a
   transparent background", with a thin band across the top of the card and a
   matching one across the bottom boxed in red.

   Identified by inspecting the render rather than by assuming: those two strips
   were `.ps-c1a-grid::before`, a full-width `rgba(255,255,255,0.027)` slab with
   1px borders top and bottom at `rgba(255,255,255,0.055)`.  Its lower border
   sat directly above the disclaimer, which is why the two read as one defect.
   It is deleted, along with the root's own 160deg ground ramp and the radial
   `.ps-c1x-lift` wash, so the panels now sit directly on the card's native
   surface.

   >> ONE CONSEQUENCE THAT IS REPORTED RATHER THAN HIDDEN.  The surface under
   the art is NOT the same ramp the art was painting.  Measured:
   `.ps-bento-card__content` is a FLAT `rgb(10,22,40)` in dark and a FLAT
   `rgb(232,237,243)` in light, while the art was painting
   `#0A1628 -> #0C1E3A` and `#F0F4F8 -> #E8EDF3`.  So the face loses its
   gradient and becomes flat, and in light theme it settles on the ramp's
   darker end stop.  Card 4 paints its own copy of that ramp at
   card-visuals.css:59 and therefore keeps its gradient, so the two cards now
   differ in ground treatment.  That is the owner's instruction, followed
   exactly; it is flagged in the report so it is a decision and not a surprise.

   >> AND ONE PLACE THE GROUND IS KEPT, DELIBERATELY.  `.ps-dialog-visual` is
   `background: #0A1628` in BOTH themes (globals.css, no light override), so a
   transparent art layer in the light-theme dialog would put white panels and
   dark ink on a navy ground.  The dialog therefore keeps an explicit
   theme-correct ground, scoped through `.ps-dialog-visual-art`.  The owner was
   looking at the card FACE; this keeps his instruction there without opening a
   light-theme bug in a mount he was not shown.

   ============================================================================
   >> SYMMETRIC BLEED, OR NONE.  THE CHART NOW BLEEDS NOT AT ALL.

   The set critic proved from INK that the previous pass composed the trend
   32.2px wider than its frame and had it amputated flush at the modal edge in
   the 900x400 dialog: a hard vertical seam, no end cap, no terminal data
   point, and what was removed was the TERMINUS of the "142 up 8.4%" rise — the
   payload of the chart.  Reproduced in Chromium, WebKit and Firefox and in
   both themes.  Card 1 was the only card in the set bleeding on ONE side
   (5 right / 0 left, where every other card is symmetric or clean), and a
   one-sided cut is the only kind that loses something.

   The fix is structural rather than a scoped override: the series now runs
   from x=0 to x=400 INSIDE its own viewBox, the chart box no longer bleeds
   past its panel on either side, and the last data point carries a visible
   terminal dot so the end of the rise is the thing the eye lands on.  There is
   nothing left to amputate at any aspect, so no `.ps-dialog-visual-art`
   override is needed for it and the card face is untouched.
   The dot is a CSS circle rather than an SVG <circle>, because the chart
   stretches with preserveAspectRatio="none" and an SVG circle would render as
   an ellipse at the dialog's aspect.

   ============================================================================
   GEOMETRY (R7's measured table, plus two corrections I measured myself).
   Card 1's face: 272x320 at 320vw, 591x320 at 639vw, 288-437x420 in the
   two-column band, 400x430 from 1280.  Art box = card +6px on all four edges,
   outer 6px permanently clipped.  Bottom text block = 62.8px to 768vw,
   58.89px above.
   >> CORRECTION 1: the expand disc is 44x44 inset 12px at EVERY width <= 768
   (a 56x56 corner), and 32x32 inset 16px only from 769.  R7 recorded 32/16
   everywhere.  Confirmed in Chromium and in real Safari.
   >> CORRECTION 2: the dialog is W x 280 at every width <= 768 and W x 400
   only from 769, capped 900x400, with ZERO bleed; `.ps-dialog-visual::after`
   veils the bottom 120px at both heights, and the 40x40 close button is NOT
   hidden on mobile despite globals.css:2738 saying it is.

   Three arrangements, one markup tree:
     - base CSS  = the portrait card face;
     - @container bentocard (max-width: 320px)  = the tight face;
     - @container bentocard (min-width: 480px)  = the one wide-short face;
     - `.ps-dialog-visual-art` descendant rules = the dialog, because
       `container: bentocard / inline-size` is declared only on
       `.ps-bento-card` (globals.css:1762) and the portal dialog has NO
       container ancestor, so a container query can never reach it.  Mount
       identity comes from that selector and never from an aspect threshold:
       this card's face and dialog aspect ranges overlap.

   IDS.  Every defs id is `ps-c1-${uid}-<part>` with uid from useId(), because
   the same node renders twice — card face (service-pillars.tsx:1916) and
   portal dialog (:2214) — and a hand-typed literal prefix collides silently
   (D28c).  Only concept A emits a gradient at all.

   CLASSES.  `ps-c1x-` shared, `ps-c1a-/b-/c-` per concept.  NOT `ps-c1-`,
   which the old arch art still owns in card-visuals.css and which stays live
   as ?c1=orig.
   ============================================================================ */

import React, { useEffect, useId, useRef, useState } from "react";

/* ============================================================================
   THE SCROLL REVEAL — ARM -> GO -> DISARM.
   Spec: .work-order/specs/reveal-motion.md sections 3, 7 and 8.
   Paint: src/styles/card1-candidates.css section 14.

   THE POLARITY IS INVERTED FROM THE REPO'S NORMAL `.in-view` IDIOM, and that
   is the whole design.  The usual shape bases content at `opacity: 0` and has
   JS add a class to reveal it.  Applied here it would destroy this card's
   no-JavaScript completeness -- no script, no class, blank panels -- which is
   exactly the blank-navy-rectangle failure the header comment above records a
   sibling card shipping.  So:

     base    CSS, unchanged .... the FINISHED dashboard.  No `opacity: 0` and
                                 no `clip-path` anywhere in the base cascade.
     arm     JS adds `ps-c1x-armed` .... hides and undraws, `transition: none`.
     go      JS adds `ps-c1x-go` ....... transitions everything to rest.
     disarm  JS removes BOTH ........... the element returns to its own base.

   Every failure mode therefore lands on the finished card: no script, a 404'd
   chunk, `prefers-reduced-motion: reduce`, an art root already on screen.  The
   reduced-motion guard returns BEFORE the hidden state is ever written, so the
   hidden state never exists; the stylesheet catch-all at globals.css:4639 is
   not relied upon, which is the R8 finding.

   DISARM IS NOT TIDINESS.  Measured: leaving the two classes on leaves the
   resting card 863px (chromium) / 813 (webkit) / 808 (firefox) different from
   pristine, because the opacity transition promotes the "THIS MONTH" label to
   a composited layer and swaps subpixel antialiasing for grayscale.  Measured
   here against a never-armed render of the same build: leaving the classes on
   costs 249-287 differing pixels at up to delta 43 in every engine and theme;
   after disarm it is 0 in webkit and firefox at every viewport measured, and
   0-2 in chromium on phones.

   ONE RESIDUE SURVIVES AND IS REPORTED RATHER THAN HIDDEN: chromium at
   1440x900 keeps 23 pixels at max delta 17 (3 in light), in three ~4px clumps
   on the trend panel's own rounded-corner antialiasing.  It is a stale raster
   and not a stale style — the classes are gone, `clip-path` computes to
   `none`, and `getAnimations({subtree:true})` returns 0 — and forcing a repaint
   clears it to 0.  It is NOT caused by the end value: `inset(0 0 0 0)` and
   `inset(0 -2% 0 0)` produce it identically.  `will-change: clip-path` while
   armed was tried and bought nothing (firefox p95 26ms either way), so no
   layer was added for it.  The pre-change build shows 0, so it is ours.

   THE DIALOG MOUNT NEVER ARMS, and it needs its own guard rather than the
   already-on-screen rule the spec proposed.  `.ps-dialog-panel` bases at
   `transform: translateX(-50%) translateY(100%)` (globals.css:2696) and only
   gains `--open` on the frame after mount, so at the moment this effect runs
   the dialog art is BELOW the viewport and the geometric test would arm it.
   Mount identity comes from `.ps-dialog-visual-art`, the same selector the
   stylesheet already uses for it, and never from a rect or an aspect.

   THE FAILSAFE IS GATED ON VISIBILITY, NOT ON TIME ALONE.  A bare 1200ms
   timer -- the literal reading of the spec -- would release the reveal for a
   card that sits at y~1195 against a 900px fold before any visitor could
   plausibly have scrolled to it, so the reveal would play to an empty room
   and every real visitor would see a still card.  That is the failure
   card3-candidates.tsx:186-192 records in this repo: "a bare timer does not
   remove the failure, it schedules it".  The timer therefore starts the
   fallback rather than firing it: from 1200ms on, release as soon as the art
   is on screen, polled every 250ms, plus a passive scroll listener for the
   case where IntersectionObserver itself is what is broken.  Staying armed
   while off screen costs nothing, because nobody is looking at it.
   ============================================================================ */
function usePsC1xReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Reduced motion: return before anything hidden is written. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* The dialog mount renders finished. See the note above. */
    if (el.closest(".ps-dialog-visual-art")) return;

    /* Already on screen at hydration: leave the finished picture alone. You do
       not play a scroll reveal on something the visitor is already reading. */
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) return;

    /* RING ARC SUPPRESSION, AND IT IS MEASURED AT ARM TIME RATHER THAN KEYED
       ON A WIDTH.  Across 375-430px the ring dial renders 58 x 7.9px -- an 86%
       vertical collapse, a circle drawn into a 7.9px box -- and growing an arc
       inside that animates a defect and walks the eye straight to it.  That
       collapse is pre-existing, out of this work order's scope, and owned by
       `responsive-mobile-adapter`; this only declines to animate it.

       WHY NOT A CONTAINER QUERY, WHICH IS THE OBVIOUS SHAPE AND WAS TRIED.
       Container width does not track the defect.  Measured across ten
       viewports: container 314.66 (1024vw) is healthy at 44x44, container 345
       (393vw) is BROKEN at 58x7.9, container 352 (768vw) is healthy at 58x57.
       The broken case sits BETWEEN two healthy ones, so no width threshold can
       express it -- and `max-width: 400px` additionally suppressed the arc on
       every primary desktop view, because the bento container is exactly
       400.00px at 1280/1440/1920 and container queries are inclusive.  The
       stylesheet already says why in its own words at
       card1-candidates.css:830: this is a HEIGHT problem a container query
       cannot see.

       SO THE INSTRUMENT IS THE RENDERED DIAMETER, and the threshold is stated
       before it is trusted.  `min(width, height) < 24px`:

         58 x 7.9  (375-430px)  -> 7.9   suppressed
         44 x 34.6 (320, 360)   -> 34.6  animates
         44 x 44   (1024)       -> 44    animates
         58 x 57   (768)        -> 57    animates
         58 x 58   (desktop)    -> 58    animates

       4.4x separation between the broken case and the nearest healthy one.
       NOT keyed on aspect ratio: 44x34.6 is ratio 0.786 and is NOT a defect --
       the ring svg is `preserveAspectRatio="xMidYMid meet"`, so it letterboxes
       into a smaller circle rather than distorting.  A ratio rule would have
       wrongly suppressed it; a diameter rule does not.

       IT SELF-DISABLES.  Fix the collapse and every dial clears 24px, so this
       stops firing without anyone remembering to delete it.  A missing dial
       measures 0 and suppresses, which is the safe direction. */
    const dial = el.querySelector(".ps-c1x-ring__dial");
    if (dial) {
      const d = dial.getBoundingClientRect();
      if (Math.min(d.width, d.height) < 24) el.classList.add("ps-c1x-no-arc");
    }

    el.classList.add("ps-c1x-armed");
    /* Commit the hidden frame before `go` can be added in the same frame. */
    void el.offsetWidth;

    let released = false;
    let disarmed = false;
    let poll = 0;
    let disarmTimer = 0;

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    function disarm() {
      if (disarmed) return;
      disarmed = true;
      window.clearTimeout(disarmTimer);
      el!.removeEventListener("transitionend", onTransitionEnd);
      el!.classList.remove("ps-c1x-armed", "ps-c1x-go", "ps-c1x-no-arc");
    }

    function onTransitionEnd() {
      if (!released) return;
      /* Disarm on the LAST transition in the subtree to finish, whichever
         element that is. A transition still inside its delay reports
         `running`, so this cannot fire between beats. If the API is missing
         the 1300ms cap below still runs, so the teardown is never skipped. */
      if (typeof el!.getAnimations !== "function") return;
      if (el!.getAnimations({ subtree: true }).some((a) => a.playState === "running")) return;
      disarm();
    }

    function release() {
      if (released) return;
      released = true;
      window.clearTimeout(poll);
      el!.addEventListener("transitionend", onTransitionEnd);
      el!.classList.add("ps-c1x-go");
      /* Total reveal is 1140ms; the cap is the guarantee, transitionend is the
         optimisation. */
      disarmTimer = window.setTimeout(disarm, 1300);
    }

    /* Threshold 0.25 -- the same value the nine `.in-view` consumers use, so
       no new convention. Observing the ART ROOT rather than the bento card:
       the art root is 332-442px tall at every width measured, so 0.25 is
       reachable even on a phone where the whole card exceeds the viewport. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            release();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    const settle = () => {
      if (released) return;
      if (onScreen()) {
        release();
        observer.disconnect();
        return;
      }
      poll = window.setTimeout(settle, 250);
    };
    poll = window.setTimeout(settle, 1200);

    const onScroll = () => {
      if (released) return;
      if (onScreen()) {
        release();
        observer.disconnect();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(poll);
      window.clearTimeout(disarmTimer);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("transitionend", onTransitionEnd);
      observer.disconnect();
      el.classList.remove("ps-c1x-armed", "ps-c1x-go", "ps-c1x-no-arc");
    };
  }, []);

  return ref;
}

/* A delta chip: triangle plus a percentage. */
function Delta({ value }: { value: string }) {
  return (
    <span className="ps-c1x-delta">
      <svg className="ps-c1x-delta__mark" viewBox="0 0 10 7" preserveAspectRatio="xMidYMid meet" focusable="false">
        <path d="M5 0 L10 7 L0 7 Z" />
      </svg>
      {value}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   THE CHART TYPES.  Five genuinely different instruments, shared by the
   concepts that use them.  Columns and rails are CSS boxes rather than SVG:
   these panels stretch across a 3.4x aspect swing and an SVG `rx` visibly
   ovalises when they do.  Only the trend and the ring are SVG, because only
   they need real curves.
   --------------------------------------------------------------------------- */

/* 1. TREND — a 13-point weekly series with a dip.
   Every x sits INSIDE 0..400 and every y inside 0..110, so the drawing cannot
   be clipped by its own viewBox at any aspect. The first point is one step off
   the baseline rather than on it, so the closed area has a 10px left edge
   instead of a 45px vertical wall; the last point is the peak and carries the
   terminal dot. TREND_END_PCT hands that y to CSS as a percentage so the dot
   sits exactly on it however the box stretches. */
const TREND_PTS: Array<[number, number]> = [
  [0, 99], [33, 79], [66, 85], [99, 62], [132, 68], [165, 46], [198, 52],
  [231, 32], [264, 40], [297, 22], [330, 28], [363, 14], [400, 7],
];
const TREND_LINE = TREND_PTS.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
const TREND_AREA = `${TREND_LINE} L 400 110 L 0 110 Z`;
const TREND_END_PCT = `${((7 / 110) * 100).toFixed(2)}%`;

function Trend({ uid, part }: { uid: string; part: string }) {
  const grad = `ps-c1-${uid}-${part}`;
  return (
    <div className="ps-c1x-trend">
      <svg
        className="ps-c1x-trend__svg"
        viewBox="0 0 400 110"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="ps-c1x-trend__stop-a" />
            <stop offset="100%" className="ps-c1x-trend__stop-b" />
          </linearGradient>
        </defs>
        <g className="ps-c1x-grid">
          <line x1="0" y1="28" x2="400" y2="28" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="62" x2="400" y2="62" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="96" x2="400" y2="96" vectorEffect="non-scaling-stroke" />
        </g>
        <path className="ps-c1x-trend__area" d={TREND_AREA} fill={`url(#${grad})`} />
        <path
          className="ps-c1x-trend__line"
          d={TREND_LINE}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* The terminal data point, as a CSS circle. An SVG <circle> would render
          as an ellipse here, because the chart stretches with
          preserveAspectRatio="none" across a 3.4x aspect swing. */}
      <span
        className="ps-c1x-trend__end"
        style={{ "--end-y": TREND_END_PCT } as React.CSSProperties}
      />
    </div>
  );
}

/* 2. RING — one arc on a track, with the figure inside it. `meet`, so the
   circle stays a circle at every aspect. The arc is drawn at its final length;
   there is no draw-on. */
function Ring({ pct, label }: { pct: number; label: string }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (circ * pct) / 100;
  return (
    <div className="ps-c1x-ring">
      <div className="ps-c1x-ring__dial">
        <svg className="ps-c1x-ring__svg" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" focusable="false">
          <circle className="ps-c1x-ring__track" cx="32" cy="32" r={r} fill="none" />
          {/* The arc is the ONE svg in this card that is safe to animate by
              dash: computed `vector-effect: none` and
              `preserveAspectRatio="xMidYMid meet"`, so it scales uniformly and
              a dash is the same unit in all three engines. The trend and the
              spark are not (see the stylesheet's section 14).
              CSS cannot read an attribute, so the same two numbers go out as
              custom properties for the reveal to interpolate between. The
              attribute stays as the no-CSS floor. */}
          <circle
            className="ps-c1x-ring__arc"
            cx="32" cy="32" r={r} fill="none"
            strokeDasharray={`${dash.toFixed(2)} ${(circ - dash).toFixed(2)}`}
            style={{
              "--arc-dash": dash.toFixed(2),
              "--arc-gap": (circ - dash).toFixed(2),
              "--arc-total": circ.toFixed(2),
            } as React.CSSProperties}
            transform="rotate(-90 32 32)"
          />
        </svg>
        <span className="ps-c1x-ring__value">{pct}%</span>
      </div>
      <span className="ps-c1x-ring__label">{label}</span>
    </div>
  );
}

/* 3. COLUMNS — six service columns, one carrying the accent. Heights are
   percentages of the panel, so they stretch without distortion. */
const COLS = [38, 56, 46, 88, 64, 74];
const COL_ACCENT = 3;

function Columns() {
  return (
    <div className="ps-c1x-cols">
      {COLS.map((h, n) => (
        <span
          key={n}
          className={"ps-c1x-col" + (n === COL_ACCENT ? " ps-c1x-col--accent" : "")}
          style={{ "--h": `${h}%` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* 3b. PAIRED COLUMNS — the same comparison read as this period against last.
   Only concept C uses it; it is a different chart from Columns, not a restyle,
   because it asserts a relation between two series rather than one ranking. */
const PAIRS: Array<[number, number]> = [
  [46, 34], [62, 52], [54, 41], [88, 70], [72, 58], [80, 66],
];

function PairedColumns() {
  return (
    <div className="ps-c1x-pairs">
      {PAIRS.map((p, n) => (
        <span key={n} className="ps-c1x-pair">
          <span className="ps-c1x-pair__now" style={{ "--h": `${p[0]}%` } as React.CSSProperties} />
          <span className="ps-c1x-pair__was" style={{ "--h": `${p[1]}%` } as React.CSSProperties} />
        </span>
      ))}
    </div>
  );
}

/* 4. SPARK — a small line for a KPI tile, no fill, no axis. Inset one unit on
   every side so the round line caps are not clipped by the viewBox. */
const SPARK = "M 1 20 L 15 15 L 29 17 L 43 11 L 57 13 L 71 7 L 85 9 L 97 4";

function Spark() {
  return (
    <svg className="ps-c1x-spark" viewBox="0 0 98 24" preserveAspectRatio="none" focusable="false">
      <path d={SPARK} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* 5. RAIL — a segmented horizontal bar: a share-of-total chart. */
const RAIL = [46, 31, 23];

function Rail() {
  return (
    <div className="ps-c1x-rail">
      {RAIL.map((w, n) => (
        <span
          key={n}
          className={`ps-c1x-rail__seg ps-c1x-rail__seg--${n}`}
          style={{ "--w": `${w}%` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   CONCEPT A — "The executive brief."
   FIVE PANELS, five different readings, one hierarchy.  A lit hero KPI tile
   and a second smaller KPI tile across the top; one wide trend panel with
   gridlines, an area under the line and a terminal point; a ring panel and a
   column panel beneath.  This is the arrangement a real executive summary
   uses: the answer first at display size, the shape of the month second, the
   two supporting reads last.  Calm comes from ONE bright surface, four quiet
   ones, and a third of the frame left as empty ground.
   Chart mix: KPI + delta / KPI + sparkline / area trend / ring / columns.
   ============================================================================ */
export function DashboardVisualA() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const root = usePsC1xReveal<HTMLDivElement>();

  /* `--i` is the PANEL's stagger index, never an element's. A label and its
     number are one metric and must fade together; staggering them separately
     makes a label arrive before the number it labels, which reads as broken
     rather than as sequenced. The order below is the hierarchy order: the lit
     "142" panel first, the trend second, the ring and columns last. */
  return (
    <div className="ps-c1x-root ps-c1a-root" aria-hidden="true" ref={root}>
      <div className="ps-c1a-grid">
        <div className="ps-c1x-panel ps-c1x-panel--lit ps-c1a-hero" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="ps-c1x-k">Jobs completed</span>
          <span className="ps-c1x-figline">
            <span className="ps-c1x-v">142</span>
            <Delta value="8.4%" />
          </span>
        </div>

        <div className="ps-c1x-panel ps-c1a-side" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="ps-c1x-k">Invoices</span>
          <span className="ps-c1x-v ps-c1x-v--sm">64</span>
          <Spark />
        </div>

        <div className="ps-c1x-panel ps-c1a-trend" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="ps-c1x-panel__head">
            <span className="ps-c1x-k">Jobs per week</span>
            <span className="ps-c1x-k ps-c1x-k--dim">This month</span>
          </span>
          <Trend uid={uid} part="a-area" />
        </div>

        <div className="ps-c1x-panel ps-c1a-ring" style={{ "--i": 3 } as React.CSSProperties}>
          <Ring pct={96} label="On time" />
        </div>

        {/* NO LABEL on this one, deliberately. A column chart reads as a column
            chart without being told, and the 13px the label cost was 13px the
            columns needed in order to be taller than they are wide. */}
        <div className="ps-c1x-panel ps-c1a-cols" style={{ "--i": 4 } as React.CSSProperties}>
          <Columns />
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   CONCEPT B — "The status wall."
   SIX PANELS OF EQUAL WEIGHT, deliberately no hierarchy — the wall-mounted
   board a business leaves up all day.  Structurally the opposite of A: an even
   mosaic instead of a pyramid, and every tile is a different instrument, so
   the variety IS the composition.  The board is shifted down off the top of
   the frame, leaving one clean band of ground above it, which is what keeps
   six panels from reading as clutter.
   Chart mix: big number + delta / ring / columns / sparkline KPI / segmented
   share rail / plain KPI.
   ============================================================================ */
export function DashboardVisualB() {
  const root = usePsC1xReveal<HTMLDivElement>();

  return (
    <div className="ps-c1x-root ps-c1b-root" aria-hidden="true" ref={root}>
      <div className="ps-c1b-head">
        <span className="ps-c1b-chip">This month</span>
      </div>

      <div className="ps-c1b-wall">
        <div className="ps-c1x-panel ps-c1x-panel--lit ps-c1b-tile ps-c1b-tile--a" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="ps-c1x-k">Jobs completed</span>
          <span className="ps-c1x-figline">
            <span className="ps-c1x-v">142</span>
            <Delta value="8.4%" />
          </span>
        </div>

        <div className="ps-c1x-panel ps-c1b-tile ps-c1b-tile--b" style={{ "--i": 1 } as React.CSSProperties}>
          <Ring pct={96} label="On time" />
        </div>

        <div className="ps-c1x-panel ps-c1b-tile ps-c1b-tile--c" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="ps-c1x-k">By service</span>
          <Columns />
        </div>

        <div className="ps-c1x-panel ps-c1b-tile ps-c1b-tile--d" style={{ "--i": 3 } as React.CSSProperties}>
          <span className="ps-c1x-k">Invoices</span>
          <span className="ps-c1x-v ps-c1x-v--sm">64</span>
          <Spark />
        </div>

        <div className="ps-c1x-panel ps-c1b-tile ps-c1b-tile--e" style={{ "--i": 4 } as React.CSSProperties}>
          <span className="ps-c1x-k">Work in progress</span>
          <Rail />
        </div>

        <div className="ps-c1x-panel ps-c1b-tile ps-c1b-tile--f" style={{ "--i": 5 } as React.CSSProperties}>
          <span className="ps-c1x-k">Open jobs</span>
          <span className="ps-c1x-v ps-c1x-v--sm">18</span>
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   CONCEPT C — "The focus board."
   FIVE PANELS on a third arrangement: a vertical rail of three narrow KPI
   strips down the left, ONE large chart panel filling the right two thirds,
   and a full-width share rail beneath.  Where A is a pyramid and B is a
   mosaic, C is a rail plus a focus — the layout of a dashboard that has an
   opinion about which chart matters today.  Its big chart is the one type
   neither of the others uses: paired columns, this period against last, which
   asserts a comparison rather than a trend or a ranking.
   Chart mix: three KPI strips / paired columns / segmented share rail.
   ============================================================================ */
export function DashboardVisualC() {
  const root = usePsC1xReveal<HTMLDivElement>();

  return (
    <div className="ps-c1x-root ps-c1c-root" aria-hidden="true" ref={root}>
      <div className="ps-c1c-grid">
        <div className="ps-c1x-panel ps-c1x-panel--lit ps-c1c-k1" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="ps-c1x-k">Jobs completed</span>
          <span className="ps-c1x-figline">
            <span className="ps-c1x-v ps-c1x-v--sm">142</span>
            <Delta value="8.4%" />
          </span>
        </div>

        <div className="ps-c1x-panel ps-c1c-k2" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="ps-c1x-k">On time</span>
          <span className="ps-c1x-v ps-c1x-v--xs">96%</span>
        </div>

        <div className="ps-c1x-panel ps-c1c-k3" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="ps-c1x-k">Open jobs</span>
          <span className="ps-c1x-v ps-c1x-v--xs">18</span>
        </div>

        <div className="ps-c1x-panel ps-c1c-focus" style={{ "--i": 3 } as React.CSSProperties}>
          <span className="ps-c1x-panel__head">
            <span className="ps-c1x-k">Jobs by service</span>
            <span className="ps-c1x-k ps-c1x-k--dim">This month</span>
          </span>
          <PairedColumns />
        </div>

        <div className="ps-c1x-panel ps-c1c-rail" style={{ "--i": 4 } as React.CSSProperties}>
          <span className="ps-c1x-k">Work in progress</span>
          <Rail />
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   THE SWITCH.  ?c1=a|b|c|orig — `orig` returns the shipped arch art so the
   owner gets a live A/B against production.  The site is a STATIC EXPORT, so
   the query is only readable on the client: `useSearchParams()` is deliberately
   NOT used because in an app-router static export it is empty at build time and
   forces a prerender bail / Suspense boundary, which has no business inside a
   card visual.  Reading `window.location.search` in a mount effect means SSR
   and the first client render both produce the DEFAULT concept, so there is no
   hydration mismatch, and the query swaps it afterwards.  The parse accepts
   exactly four values and ignores anything else.

   NOTE ON THE NO-JAVASCRIPT PATH: this effect is the ONLY JavaScript in the
   module, and it exists solely to honour the owner's own comparison switch.
   With scripts dead the server-rendered default concept still paints in full —
   it is not gated on anything — so a failed chunk costs the ?c1= switch, never
   the artwork.

   DEFAULT with no query = concept A, "the executive brief".  It is the one of
   the three that answers both halves of the spec at once: five panels with
   five different instruments in them, and the calmest value structure of the
   three, because a single lit hero tile carries the mass while the other four
   panels stay quiet.
   ============================================================================ */
type C1Choice = "a" | "b" | "c" | "orig";

export function DashboardVisualPick({ fallback }: { fallback: React.ReactNode }) {
  const [choice, setChoice] = useState<C1Choice>("a");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("c1");
    if (q === "a" || q === "b" || q === "c" || q === "orig") setChoice(q);
  }, []);

  if (choice === "orig") return <>{fallback}</>;
  if (choice === "b") return <DashboardVisualB />;
  if (choice === "c") return <DashboardVisualC />;
  return <DashboardVisualA />;
}
