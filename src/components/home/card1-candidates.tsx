"use client";

/* ============================================================================
   CARD 1 — "Business Software." — the executive dashboard.
   Styles: src/styles/card1-candidates.css

   THE BRIEF, VERBATIM, AND IT IS TWO SENTENCES FROM THE OWNER.
     2026-09-07: "creating the bsusiness software bento graphic. it should be
                  the worlds cleanest exectutive dashbaord that fits the theme
                  of the website."
     2026-09-09: "the business software bento shows invoices as a panel. I
                  also told u what to change it to."

   >> WHY THE INVOICE PANEL WAS WRONG, AND IT IS NOT "MERELY UNINSPIRED".
   The invoice story belongs to CARD 2, "Business Automation.", whose entire
   artwork is a branching invoice-to-payment flow the owner dictated word for
   word (Invoice sent -> Due date -> Paid? -> Settled / Reminded, rendered in
   `card2-candidates.tsx`).  The previous pass of this card carried an
   "INVOICES / 64 / sparkline" panel, so card 1 was duplicating its
   neighbour's subject from 400px away in the same row.  Verified in the
   render before it was removed, not inferred: the two cards sat side by side
   at 1440x900 with "INVOICES 64" and "Invoice sent" 300px apart.

   THERE IS THEREFORE NOTHING IN THE ARTWORK ABOUT INVOICES, RECEIPTS,
   AGEING, PAYMENT STATE, WHO OWES WHAT, OR REMINDERS, IN ANY FORM.  Stated
   precisely, because the loose version of this sentence is falsified by the
   paragraph you are reading: the words occur in THIS COMMENT and nowhere else
   in the module, and the check that matters is run against the RENDER — the
   art root's own `textContent` matched against
   /invoice|receipt|paid|overdue|due|remind|payment|\$/i in 54 card-face runs
   (3 engines x 9 viewports x 2 themes) and 48 dialog runs (3 engines x 8
   viewports x 2 themes, both the 900x400 landscape and the phone sheet),
   returning zero every time.  If a future pass needs a money read on this card, it collides
   with card 2 and needs the owner's ruling first.

   WHAT THE DASHBOARD SHOWS INSTEAD, AND WHERE THE CONTENT COMES FROM.  The
   owner's own reference for this card is the NWKS administration panel: "We
   built that whole administration panel ... some really cool custom stuff for
   them to get them off of spreadsheets, move them into a tier, into an entire
   system."  Its own service tiles in `service-pillars.tsx:207-243` name the
   same thing four different ways: "Your Whole Business on One Screen", "Know
   Exactly What's Going On in 3 Seconds", "Get Out of Spreadsheet Chaos",
   "Every Customer's Entire History in One Record".  So the reads are
   OPERATIONAL: the shape of the work over time and the work split by service
   line.  Not SaaS-marketing filler and not a money panel.  The first of those
   four tile titles, at `service-pillars.tsx:255`, is also where the card's one
   sentence comes from -- see `SAY` below.

   ============================================================================
   >> NO INVENTED DATA, AND THIS ART CARRIES NO NUMERALS AT ALL.

   The standing ruling forbids invented client names, fabricated amounts,
   made-up dates, fabricated percentages presented as results, and any number
   a viewer could mistake for a real Preisser Solutions or client figure.  It
   permits structural and categorical labels, "relative shape without an axis
   that asserts a value", and obviously generic placeholder glyphs.

   The previous pass leaned on an earlier, narrower override ("we are
   overriding the forbidding of fabricating numbers as some of these cards will
   need placeholder values") and shipped 142 / 8.4% / 96% / 64 / 18 as display
   figures.  Those are exactly the numbers the ruling names: a viewer has no
   way to know 142 jobs and 96% on time are not a client's results.  They are
   gone, and NOT replaced with rounder fakes.

   Every value in this card is now carried by SHAPE: a weekly series with no
   axis and no scale, and six service columns with no counts.  Every word in
   the shipped card is a CATEGORY -- "Jobs per week", "By service" -- plus one
   SENTENCE, the proposition below.  Nothing states how much of anything there
   is.
   >> THIS IS ALSO THE CLEANEST READING OF THE BRIEF, not merely the safest
   one: the rejected art's five numerals were most of its density.

   >> THE RULING WAS THEN EXTENDED TO GEOMETRY, AND THAT COST THE THIRD
   INSTRUMENT.  An earlier version of this pass still carried a proportion dial
   whose arc ran at exactly 78.00% of its own track.  Zero numerals was
   satisfied to the letter and the claim was still being made -- an arc against
   a COMPLETE track is a percentage, because the track is the axis, and a
   viewer reads "most of this business's jobs land on schedule" off it as
   surely as off the digits that used to sit in its centre.  There is no way to
   draw a proportion against a complete reference without asserting the
   proportion, so the dial is deleted rather than restyled.
   The trend and the columns survive the same test because neither has a
   reference that completes: no axis under the series, no total under the
   columns.  Shape and distribution are what the ruling explicitly permits.

   ============================================================================
   >> FORM IS NOT COPIED FROM ANY SIBLING, AND FOUR OF THEM HAVE CHROME.
   Card 2 is a node-and-connector flow, card 3 has a prompt field and a
   response panel, card 4 IS a browser window and a phone, card 5 is a search
   field over result rows.  This card is none of those: no window frame, no URL
   bar, no traffic lights, no device bezel, no sidebar, no prompt input, no
   full-width result rows with leading squares, and no rows of grey placeholder
   pills.  What IS taken from the set is craft, measured off the siblings'
   renders: the flat navy ground, opaque panels on a role-8 knockout lifted
   12.5% with white, 1px hairline borders, 10-12px radii, 9.5px uppercase
   letterspaced labels, exactly ONE accent hue, and exactly ONE bright surface
   carrying the mass the way card 4 does.

   RULING ACCEPTED DELIBERATELY: the graphic-designer kill test ("could this be
   mistaken for a screenshot of software?") is carved out here, because the
   subject IS literally business software and the owner has ruled four times
   that a dashboard is the correct image.  It is a dashboard and it looks like
   one.

   ============================================================================
   THE THREE CONCEPTS, and all three were built, rendered at 1440x900 and
   375x667 in both themes, and read from the PNGs before one was chosen.  The
   two rejected ones stay live behind `?c1=b` and `?c1=c` so the owner can see
   what was on the table; the default is A and only A is swept across the full
   engine/viewport matrix.

     A  "THE THREE-SECOND READ" -- SHIPPED.  One label strip on bare ground,
        one full-width trend panel, and one row of two tiles beneath it: a LIT
        column-chart tile and the card's proposition.  Three panels, two bands,
        zero numerals.  It is the only one of the three that clears the 44x44
        expand disc without spending 56px of vertical room on a top margin,
        the only one that still reads at the 287x202 art box of a 320-tall
        phone card, and the one whose value structure matches the set: one
        bright surface, everything else quiet.
     B  "THE OPERATIONS BOARD" -- rejected.  Three workflow lanes (Scheduled /
        In progress / Complete) holding record chips.  Closest to the
        spreadsheet-escape story and structurally the boldest, but the chips
        read as rows of grey placeholder pills at every size below the dialog,
        which is the exact vocabulary three earlier rounds of this project
        were rejected for.
     C  "THE QUADRANT BRIEF" -- rejected.  An even 2x2 of four instruments,
        no hierarchy.  Clean at 400x430 and cramped on a phone: the 2x2 has to
        start below the disc, which costs 56px of a 202px art box and leaves
        four ~70px tiles.  It also has no answer-first hierarchy, which is the
        one thing an executive dashboard is for.

   ============================================================================
   GEOMETRY, measured on this build rather than assumed.  Card 1's face is
   400x430 at 1280/1440/1920 (`service-pillars.tsx:183`, rendered box measured
   at 1440x900), 272x320 at 320vw, 327x320 at 375vw, 288-437x420 in the
   two-column band, 314.66x430 in the three-column band, and 591x320 at 639vw.
   The art box is the card plus 6px on all four edges with the outer 6px
   permanently clipped.  The expand disc is 44x44 inset 12px at every width
   <= 768 (a 56x56 corner to keep clear) and 32x32 inset 16px from 769 up.
   The dialog is W x 280 up to 768 and W x 400 from 769, capped 900x400, with
   its bottom 120px veiled.

   Four arrangements, one markup tree, and the CSS blocks are in this order:
   base = the portrait face; `@container bentocard (max-width: 320px)` = the
   tight face; `@container bentocard (min-width: 480px)` = the wide-short face;
   `.ps-dialog-visual-art` descendants = the dialog, because
   `container: bentocard / inline-size` is declared only on `.ps-bento-card`
   (globals.css:1762) and the portal dialog has no container ancestor, so a
   container query can never reach it.

   IDS.  THERE IS NOT ONE `defs`, ONE `url(#…)` OR ONE GENERATED ID IN THIS
   ARTWORK, and that is a deliberate outcome of the pass rather than luck: the
   only thing that needed one was the trend's area gradient, and the area is
   deleted (see the note on the trend below — it was rendering as a floating
   pale rectangle inside its panel, read from the render in both themes).  The
   whole double-mount id-collision class therefore cannot occur here.
   >> IF YOU ADD A `defs`, IT MUST GO THROUGH A `useMarkId()`-STYLE PREFIX
   (`card3-candidates.tsx:613`), because this art root mounts TWICE while a
   card is open — card face at `service-pillars.tsx:1916`, portal dialog at
   :2214 — and `url(#x)` binds the FIRST match in document order, so the
   dialog copy would silently take the card face's gradient.  And it must strip
   `[^a-zA-Z0-9]`, because React 19's raw `useId()` returns `«r0»`, whose
   guillemets are illegal unescaped inside `url(#...)` and render the filled
   shape BLACK.

   CLASSES.  `ps-c1x-` shared, `ps-c1a-/b-/c-` per concept.  Never `ps-c1-`,
   which the superseded arch art still owns in `card-visuals.css` and which is
   still live as `?c1=orig`.
   ============================================================================ */
import React, { useEffect, useRef, useState } from "react";

/* HOW MUCH OF THE ART ROOT MUST BE ON SCREEN BEFORE THE REVEAL IS RELEASED.
   Read by all three release paths in usePsC1xReveal -- the observer's
   threshold, the failsafe poll and the scroll listener -- so there is exactly
   one definition of "visible" in this file.  The rationale for the value, and
   for why the observer's original 0.25 is NOT the fix, is at the release test
   inside the hook.  A reveal gate tests a visible FRACTION; it never tests a
   boolean "is any part of it on screen". */
const C1X_REVEAL_MIN_VISIBLE = 0.5;

/* HOW LONG THE SUB-TILES WILL WAIT FOR THEIR OWN CARD BOX BEFORE GIVING UP AND
   LANDING ON THE FINISHED PICTURE ANYWAY.  This is a FAIL-VISIBLE NET, not the
   ordering mechanism -- the ordering mechanism is the `ps-interior-reveal`
   event, and a constant can never be one (a fixed delay re-creates the very
   bug this fixes at a different viewport height; see the gate below).  It only
   ever runs when the box's reveal contract produced NOTHING: no event, no
   `data-ps-reveal="done"`, and no settled inline style.  That is the case
   where `service-pillars`' effect never ran at all, which no failure path
   inside that file can signal, and the alternative is sub-tiles hidden
   forever -- exactly the blank-card outcome this file's polarity exists to
   prevent.

   THE VALUE IS AN UPPER BOUND ON A MEASURED QUANTITY, not a guess.  The box's
   own trigger (`start: "top 82%"`) is crossed BEFORE this art root reaches
   C1X_REVEAL_MIN_VISIBLE at every viewport measured (art-root top 679 at the
   release point against an entrance line of 738 at 1440x900, 402 against 466
   at 320x568 -- the numbers at the release test below).  From that trigger the
   box needs at most its stagger (0.2s at index 2) plus half of its 0.65s tween
   to fire the event: ~525ms.  1500ms is that with a 3x margin, so a healthy
   build never reaches this timer, and the harness asserts it did not. */
const C1X_BOX_WAIT_MAX = 1500;

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
   is at least C1X_REVEAL_MIN_VISIBLE visible, polled every 250ms, plus a
   passive scroll listener for the case where IntersectionObserver itself is
   what is broken.  Staying armed while off screen costs nothing, because
   nobody is looking at it.  All three paths test that same fraction; when
   the two loose ones tested "any 1px" instead they made the observer's
   threshold dead code -- see the release test below.
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
    /* THE TWO HALVES OF THE RELEASE CONDITION. Both latch; neither releases on
       its own; whichever lands second does the release, so there is no added
       latency in either order. See the gate below. */
    let boxRevealed = false;
    let visibleSeen = false;
    let boxWaitTimer = 0;
    /* `let` + null, not a `const` further down, for the reason
       `service-pillars.tsx` documents against its own tween holder: a function
       declared above a `const` and called before that `const` initialises is a
       TDZ ReferenceError, not `undefined`. `release()` is declared before the
       observer is built and tears it down. Nothing can call it that early
       today -- every caller is asynchronous -- but the cost of being sure is
       one `?.`. */
    let observer: IntersectionObserver | null = null;

    /* THE RELEASE TEST IS A VISIBLE FRACTION, NOT "IS ANY PART ON SCREEN",
       AND ALL THREE RELEASE PATHS TEST THE SAME NUMBER.

       What was here read `r.top < window.innerHeight && r.bottom > 0` -- true
       at ANY ONE PIXEL of intersection.  Both loose call sites below (the
       failsafe poll and the scroll listener) beat the IntersectionObserver
       every time, so the observer's threshold was unreachable dead code and
       the reveal played where nobody could see it.  Measured on the shipping
       default at 12px/frame: GO at 5% visible (1440x900), 6% (1280x800) and
       0% (393x852 and 390x844, where the art root's top is still exactly at
       `innerHeight`), metric opacity still 0, and on a phone the whole 1141ms
       ran between 0% and 38% visibility.

       WHY 0.5 AND NOT THE 0.25 THE OBSERVER ALREADY ASKED FOR.  0.25 is the
       obvious fix and it is also broken, for a different reason: the bento
       card's OWN box entrance fires at `start: "top 82%"`, and 25% of this
       art root is reached BEFORE that line at every viewport measured -- art
       root top 790 at 0.25 against an entrance line of 738 at 1440x900 -- so
       the sub-tile stagger would play inside a card still at `opacity: 0`.
       0.5 clears the entrance everywhere measured (679 vs 738 at the
       tightest, 402 vs 466 at 320x568) and still completes the 1140ms reveal
       with the card fully visible at a normal 400px/s read-scroll (84% at
       320x568).  The honest limit, recorded rather than chased: at 1200px/s
       no threshold saves it -- a 900px viewport is crossed in 750ms, less
       than the reveal's own 1140ms -- and the authored cadence is NOT
       shortened to serve a fling, during which nobody is reading the card.

       Fraction is measured VERTICALLY off the rect rather than taken from
       `entry.intersectionRatio`, because the two loose paths have no entry to
       read and every path must answer the same question the same way. */
    const visibleFraction = () => {
      const r = el.getBoundingClientRect();
      if (r.height <= 0) return 0;
      const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return Math.max(0, shown) / r.height;
    };

    const visibleEnough = () => visibleFraction() >= C1X_REVEAL_MIN_VISIBLE;

    /* ========================================================================
       THE ORDERING GATE.  THE ONE THING THIS ROUND CHANGED.

       THE DEFECT.  The sub-tiles used to release on visibility ALONE, and the
       card BOX arrives on a completely different geometric test -- a GSAP
       ScrollTrigger at `start: "top 82%"` on the card, against this file's
       50%-of-the-art-root.  Two independent geometries means the ORDER BETWEEN
       THEM IS A FUNCTION OF VIEWPORT HEIGHT, and nothing anywhere enforced it.
       Measured on 127.0.0.1:3117 before this change (V2-entrance-reverify, all
       three engines): the tiles fired 259-359ms before the box reached opacity
       0.95 at EVERY viewport, and at 393x852 and 820x1180 they fired 9-25ms
       before the box painted its FIRST non-zero frame -- box opacity 0.0000 at
       the instant the tiles started. Sub-tiles animating onto a card that has
       not appeared yet.

       WHAT WAS REJECTED, ON EVIDENCE, BEFORE THIS:
         - Lowering the threshold to 0.25. Already tried. It fires EARLIER, not
           later: 25% of the art root is reached at art-top 790 against the
           card's own entrance line of 738 at 1440x900. Wrong direction.
         - A fixed delay after visibility. A constant cannot express a
           relationship between two moving geometries; it re-creates the same
           inversion at a different viewport height. That is the whole defect,
           restated.

       THE FIX, AND ITS PRECEDENT IS ALREADY IN THIS TREE.  Card 5 gates its
       search loop on `service-pillars`' public reveal contract
       (`card5-candidates.tsx:642`): the bubbling `ps-interior-reveal`
       CustomEvent plus the `data-ps-reveal="done"` latch, fired from
       `markRevealed` inside the box tween's own `onUpdate` at
       `RV_GO_AT_PROGRESS` AND from all four of its failure paths. Card 1 now
       gates on the same event.

       AND IT IS AN ADDITIONAL CONDITION, NOT A REPLACEMENT.  Release requires
       BOTH:
         (a) the card box has revealed  -- ordering, from the event; and
         (b) a release path has observed the art root at least
             C1X_REVEAL_MIN_VISIBLE visible -- "the visitor can actually see
             it", which is the property the three paths below exist to
             establish and the reason a bare event is not enough.
       Both latch, and `maybeRelease()` is called from both sides, so whichever
       arrives second releases immediately. No polling delay in either order.

       WHY (b) IS A LATCH SET ONLY BY THE THREE PATHS, AND NOT A
       `visibleEnough()` CALL INSIDE THE EVENT HANDLER.  Those look equivalent
       and they are not. If the event handler tested visibility itself, then
       suppressing all three release paths would STILL release the reveal --
       the event would have quietly become a fourth, unkillable path, and the
       load-bearing property ("with IO, poll and scroll all suppressed it never
       releases") would be gone while every green test stayed green. Writing
       the flag from the paths and only READING it here keeps that property
       exactly: no path, no flag, no release, no matter what the box does.

       WHAT THIS GUARANTEES, STATED PRECISELY, BECAUSE "after the card arrives"
       is ambiguous and two different promises were being conflated: GO lands
       AFTER the frame on which the box tween crossed `RV_GO_AT_PROGRESS`, at
       which point the box's opacity is `1 - 0.5^4 = 0.9375` and rising --
       `power3.out` is a QUART, not a cubic. It is therefore NOT "after the box
       reaches 0.95"; 0.95 arrives at progress 0.5271, about 18ms later. The
       promise delivered is "after box opacity >= 0.9375", which is strictly
       after first paint and is what the box's own interior primitive already
       promises its own `.ps-rv-i` children. Deliberately the same instant as
       the rest of the system rather than a stricter one -- card 1's tiles now
       start when every other card's interior starts.
       ======================================================================== */
    const box = el.closest<HTMLElement>(".ps-bento-card");
    let boxMo: MutationObserver | null = null;

    /* FALLBACK SIGNAL, card 5's, for the case where the event contract is
       reverted but the tween still runs: inline `opacity: 1` with the inline
       transform cleared is what `clearProps: "transform"` leaves behind. */
    const boxSettled = () =>
      !!box && box.style.opacity === "1" && box.style.transform === "";

    function stopWatchingBox() {
      window.clearTimeout(boxWaitTimer);
      if (boxMo) {
        boxMo.disconnect();
        boxMo = null;
      }
      if (box) box.removeEventListener("ps-interior-reveal", onBoxRevealed);
    }

    function maybeRelease() {
      if (released) return;
      if (!boxRevealed || !visibleSeen) return;
      release();
    }

    /* Idempotent: four paths can call this and only the first one counts. */
    function onBoxRevealed() {
      if (boxRevealed) return;
      boxRevealed = true;
      stopWatchingBox();
      maybeRelease();
    }

    function onBoxStyle() {
      if (boxSettled()) onBoxRevealed();
    }

    /* Written ONLY from the three release paths. Never from the box event --
       see the paragraph above; that distinction is the safety property. */
    function noteVisible() {
      if (visibleSeen) return;
      visibleSeen = true;
      if (!boxRevealed) {
        /* Start the fail-visible net only now. Starting it at arm time would
           make it a timer racing the box on a card nobody has scrolled to. */
        boxWaitTimer = window.setTimeout(onBoxRevealed, C1X_BOX_WAIT_MAX);
      }
      maybeRelease();
    }

    function disarm() {
      if (disarmed) return;
      disarmed = true;
      window.clearTimeout(disarmTimer);
      stopWatchingBox();
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
      /* Teardown of every input moved HERE from the three call sites, because
         there are now four of them and a site that forgot one would leave a
         live observer on a released card. */
      observer?.disconnect();
      stopWatchingBox();
      el!.addEventListener("transitionend", onTransitionEnd);
      el!.classList.add("ps-c1x-go");
      /* Total reveal is 1140ms; the cap is the guarantee, transitionend is the
         optimisation. */
      disarmTimer = window.setTimeout(disarm, 1300);
    }

    /* Threshold is the same C1X_REVEAL_MIN_VISIBLE the poll and the scroll
       listener test, so no path can undercut another -- that mismatch is what
       this fix removes.  Observing the ART ROOT rather than the bento card:
       the art root is 332-442px tall at every width measured against a fold
       of 568px or more, so half of it is reachable even on the smallest phone
       where the whole card exceeds the viewport.

       `intersectionRatio` rather than `isIntersecting`: at a non-zero
       threshold the observer also fires on the way OUT, where `isIntersecting`
       is still true while the ratio has fallen back below the threshold. */
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= C1X_REVEAL_MIN_VISIBLE) noteVisible();
        });
      },
      { threshold: C1X_REVEAL_MIN_VISIBLE }
    );
    observer.observe(el);

    /* The poll now re-arms until RELEASE rather than until visibility, because
       visibility is no longer the whole condition: it must keep ticking while
       the gate waits on the box, or a build whose event contract vanished
       would have no second chance. Cleared in `release()`. */
    const settle = () => {
      if (released) return;
      if (visibleEnough()) noteVisible();
      if (released) return;
      poll = window.setTimeout(settle, 250);
    };
    poll = window.setTimeout(settle, 1200);

    const onScroll = () => {
      if (released) return;
      if (visibleEnough()) noteVisible();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* THE CONTRACT'S OWN ORDER: read the attribute first, THEN subscribe. A
       consumer that mounts late -- this art root also renders inside the
       portal dialog, and a re-mount after the grid has already revealed is
       ordinary -- would otherwise wait forever for an event that already
       fired. `service-pillars.tsx` states that requirement itself at the
       `markRevealed` it dispatches from.
       Child effects run BEFORE parent effects, so on a first mount this
       subscription is installed before the grid's effect has even built the
       tween; the attribute branch is for every other case. */
    if (!box) {
      /* No box means no box tween and therefore no ordering to enforce -- the
         dialog mount already returned above, so this is a shape this card is
         not rendered in today. Fail OPEN, never hidden. */
      boxRevealed = true;
    } else if (box.dataset.psReveal === "done" || boxSettled()) {
      onBoxRevealed();
    } else {
      box.addEventListener("ps-interior-reveal", onBoxRevealed);
      boxMo = new MutationObserver(onBoxStyle);
      boxMo.observe(box, { attributes: true, attributeFilter: ["style"] });
    }

    return () => {
      window.clearTimeout(poll);
      window.clearTimeout(disarmTimer);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("transitionend", onTransitionEnd);
      stopWatchingBox();
      observer?.disconnect();
      el.classList.remove("ps-c1x-armed", "ps-c1x-go", "ps-c1x-no-arc");
    };
  }, []);

  return ref;
}

/* ---------------------------------------------------------------------------
   THE INSTRUMENTS.  Four are defined here and the SHIPPED concept A uses two
   of them -- the trend and the columns.  The dial and the rail are kept
   because concept C consumes both at `?c1=c`; deleting them would break a
   variant the owner still has a live link to.  NONE of the four prints a
   figure.  Columns and rails are CSS boxes rather than SVG, because these
   panels stretch across a 3.4x aspect swing and an SVG `rx` visibly ovalises
   when they do; only the trend and the dial are SVG, because only they need
   real curves.
   >> KNOWN AND DELIBERATELY LEFT: the dial at `?c1=c` still draws its arc at
   78% of its track, which is the geometry assertion the shipped concept just
   deleted.  Concept C does not ship and exists only as the rejected option the
   owner can look at, the same way card 2 keeps `?c2=b`.  If concept C is ever
   promoted, the arc has to go with it.
   --------------------------------------------------------------------------- */

/* 1. TREND — a 13-point weekly series, unlabelled and unscaled.  There is no
   axis, no tick and no value anywhere on it, so it states the SHAPE of the
   work and never a quantity.
   Every x sits inside 0..400 and every y inside 0..110, so the drawing cannot
   be clipped by its own viewBox at any aspect — the previous pass composed it
   32.2px wider than the dialog frame and had the terminus of the rise
   amputated flush at the modal edge.  The first point is one step off the
   baseline rather than on it, so the closed area has a 10px left edge instead
   of a 45px vertical wall; the last point is the peak and carries the terminal
   dot.  TREND_END_PCT hands that y to CSS as a percentage so the dot sits
   exactly on it however the box stretches. */
const TREND_PTS: Array<[number, number]> = [
  [0, 99], [33, 79], [66, 85], [99, 62], [132, 68], [165, 46], [198, 52],
  [231, 32], [264, 40], [297, 22], [330, 28], [363, 14], [394, 7],
];
const TREND_LINE = TREND_PTS.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
/* The area closes by running FLAT from the terminus to x=400 and then down the
   right edge, so the fill reaches the panel's own border on both sides and at
   the floor while the LINE still stops 6 units short with its dot on it. That
   is what makes the fill seam-free: its rectangle edges coincide with the
   panel's edges instead of floating 12-14px inside them. */
const TREND_AREA = `${TREND_LINE} L 400 7 L 400 110 L 0 110 Z`;
const TREND_END_PCT = `${((7 / 110) * 100).toFixed(2)}%`;
/* x of the terminus as a percentage from the RIGHT, handed to CSS so the dot
   tracks the series at every aspect. */
const TREND_END_X_PCT = `${(((400 - 394) / 400) * 100).toFixed(2)}%`;

function Trend() {
  return (
    <div className="ps-c1x-trend">
      <svg
        className="ps-c1x-trend__svg"
        viewBox="0 0 400 110"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className="ps-c1x-grid">
          <line x1="0" y1="28" x2="400" y2="28" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="62" x2="400" y2="62" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="96" x2="400" y2="96" vectorEffect="non-scaling-stroke" />
        </g>
        {/* FLAT TINT, NOT A GRADIENT, and that is deliberate: a gradient needs
            a `defs` id, this art root mounts twice while a card is open, and
            `url(#x)` binds the first match in document order. A flat
            `fill-opacity` needs no id at all, so the whole collision class
            stays closed. It also carries the same ink from top to bottom
            instead of fading out of visibility at the floor. */}
        <path className="ps-c1x-trend__area" d={TREND_AREA} />
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
        style={{ "--end-y": TREND_END_PCT, "--end-x": TREND_END_X_PCT } as React.CSSProperties}
      />
    </div>
  );
}

/* 2. DIAL — one arc on a track, and its centre is EMPTY.  The percentage that
   used to sit inside it is deleted along with every other numeral (see the
   header): an arc against a full track is a proportion the eye reads directly,
   and the figure was the part that made a claim.
   `meet`, so the circle stays a circle at every aspect.  The arc is drawn at
   its final length; `pct` is a geometry input, never rendered as text. */
function Dial({ pct, label }: { pct: number; label: string }) {
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
              a dash is the same unit in all three engines. The trend is not
              (see the stylesheet's section 14).  CSS cannot read an attribute,
              so the same two numbers go out as custom properties for the
              reveal to interpolate between; the attribute stays as the
              no-JavaScript floor. */}
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
      </div>
      <span className="ps-c1x-ring__label">{label}</span>
    </div>
  );
}

/* 3. COLUMNS — six service lines, one carrying the accent.  Heights are
   percentages of the panel, so they stretch without distortion, and there is
   no axis and no count against any of them. */
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

/* 3b. THE PROPOSITION — the one piece of NATURAL LANGUAGE in this artwork, and
   it is the card's own claim rather than a caption on the picture beside it.

   >> WHY IT EXISTS.  Read in one frame with its siblings, card 1 was the only
   card in the set carrying no sentence and making no proposition: card 2 is
   labelled (`Invoice sent`, `Paid?`), card 3 asks *"why is our ROI down this
   month?"*, card 5 searches *"who insures oil field crews"*, and card 1 had
   four uppercase field labels.  Four field labels are what every SaaS
   dashboard has, so the genericness charge against this card was never the
   chart shapes — it was the absence of the client's voice.  Captured and
   looked at, not inferred: shots/base-set-dark.png.

   >> WHERE THE WORDS COME FROM, AND THEY ARE NOT MINE.  `service-pillars.tsx:255`
   — this pillar's own first service tile, `title: "Your Whole Business on One
   Screen"`.  Sentence-cased so it reads as the owner speaking rather than as a
   heading, and left otherwise alone.  Nothing here is invented copy.

   >> WHY IT IS NOT ONE OF THE NEIGHBOURS' SUBJECTS.  It names the platform and
   the single screen, which is this pillar's subject (`:233`, "the internal
   tools that replace the shared spreadsheet").  It says nothing about
   invoices, payment state or reminders (card 2), nothing about reading a
   document (card 3), and nothing about reviews or search (card 5).
   `PHASE1-BRIEFING-PACK.md` §39.55 binds those boundaries.

   >> AND IT CARRIES NO FIGURE.  "One screen" is a word, not a numeral; the
   card's zero-numerals property is unchanged and still measured from the
   render rather than from this comment. */
const SAY = "Your whole business on one screen.";

function Say() {
  return <p className="ps-c1x-say">{SAY}</p>;
}

/* 4. RAIL — one bar divided three ways: a share-of-total with no total. */
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

/* 5. STACK — concept B's lane of record chips.  Heights vary so the lane reads
   as a column of individual records of different sizes rather than as a row of
   identical pills; that is also the reason concept B was rejected, because
   below the dialog it stops working (see the header). */
function Stack({ chips, accent }: { chips: number[]; accent?: boolean }) {
  return (
    <div className={"ps-c1x-stack" + (accent ? " ps-c1x-stack--accent" : "")}>
      {chips.map((h, n) => (
        <span key={n} className="ps-c1x-chip" style={{ "--h": `${h}%` } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ============================================================================
   CONCEPT A — "THE THREE-SECOND READ".  SHIPPED.
   One label strip on bare ground, one full-width trend panel, one row of two
   tiles.  The label strip is what buys the trend panel its full width: it
   stops short of the expand disc, so nothing else has to.
   `--i` is the PANEL's stagger index and never an element's — a label and the
   picture it labels are one metric and must arrive together.  Order is the
   hierarchy order: the question first, the shape of the work second, the two
   supporting reads last.
   ============================================================================ */
export function DashboardVisualA() {
  const root = usePsC1xReveal<HTMLDivElement>();

  return (
    <div className="ps-c1x-root ps-c1a-root" aria-hidden="true" ref={root}>
      <div className="ps-c1a-grid">
        {/* ONE LABEL, NOT TWO, AND THE SECOND ONE IS NOT COMING BACK.  The strip
            used to carry a dimmed `This quarter` beside this label.  It computed
            to `display: none` at every container width under 400px — which is
            every phone face, every tablet face and the 287px three-column
            desktop face — so the artwork's word list was three words on most of
            the viewports anyone actually sees and four on the rest, while the
            dimmed colour measured 2.48:1 (light) and 3.90:1 (dark) against a
            4.5:1 requirement at 9.5px wherever it WAS visible.  A label that is
            both conditional and unreadable is not a period qualifier, so the
            period is gone and this is a three-label composition on purpose. */}
        <div className="ps-c1a-head" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="ps-c1x-k">Jobs per week</span>
        </div>

        <div className="ps-c1x-panel ps-c1a-trend" style={{ "--i": 1 } as React.CSSProperties}>
          <Trend />
        </div>

        <div className="ps-c1x-panel ps-c1x-panel--lit ps-c1a-cols" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="ps-c1x-k">By service</span>
          <Columns />
        </div>

        {/* THE DIAL USED TO BE HERE AND IT WAS DELETED FOR ASSERTING A NUMBER
            IT HAD NO RIGHT TO.  Every numeral in this artwork was removed under
            the no-invented-data ruling, but the dial's arc still ran
            `stroke-dasharray: 127.42px, 35.94px` — 78.00% of its own track —
            and an arc measured against a FULL track is a percentage whether or
            not the digits are printed.  The track is the axis.  Geometry is not
            an exemption from a ruling about fabricated results, so the read
            that claimed "78% of this business's jobs land on schedule" is gone
            rather than restyled.  There is no way to draw a proportion against
            a complete reference and not assert the proportion; the honest move
            was to stop drawing one.

            THE TREND AND THE COLUMNS SURVIVE THE SAME TEST for a reason worth
            writing down: neither has a reference that completes.  The series
            has no axis and no scale, so it states a SHAPE (work rising week
            over week) and no quantity; the six columns have no counts and no
            total, so they state a DISTRIBUTION (one service line leads) and no
            quantity.  The ruling permits exactly that and forbids exactly what
            the arc was doing.

            Deleting it also breaks up rising-line + grey-columns + donut, which
            is the single most template-like trio in B2B marketing and half of
            why this card read as any SaaS dashboard. */}
        <div className="ps-c1x-panel ps-c1a-say" style={{ "--i": 3 } as React.CSSProperties}>
          <Say />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CONCEPT B — "THE OPERATIONS BOARD".  REJECTED, kept live at `?c1=b`.
   Three workflow lanes holding record chips, the middle lane lit.  The idea is
   the right one — consolidated records sitting in a workflow state, which is
   the spreadsheet-escape story — and the execution fails: read from the render
   at 375x667 the chips are wider than they are tall and read as rows of grey
   placeholder pills.
   ============================================================================ */
const B_LANES: Array<{ label: string; chips: number[]; lit?: boolean; accent?: boolean }> = [
  { label: "Scheduled", chips: [21, 15, 18] },
  { label: "In progress", chips: [18, 24, 16, 13], lit: true, accent: true },
  { label: "Complete", chips: [16, 13, 19] },
];

export function DashboardVisualB() {
  const root = usePsC1xReveal<HTMLDivElement>();

  return (
    <div className="ps-c1x-root ps-c1b-root" aria-hidden="true" ref={root}>
      <div className="ps-c1b-board">
        {B_LANES.map((lane, n) => (
          <div
            key={lane.label}
            className={"ps-c1x-panel ps-c1b-lane" + (lane.lit ? " ps-c1x-panel--lit" : "")}
            style={{ "--i": n } as React.CSSProperties}
          >
            <span className="ps-c1x-k">{lane.label}</span>
            <Stack chips={lane.chips} accent={lane.accent} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   CONCEPT C — "THE QUADRANT BRIEF".  REJECTED, kept live at `?c1=c`.
   Four instruments on an even 2x2, deliberately no hierarchy.  It is clean at
   400x430 and cramped on a phone: with a tile in the top-right corner the
   whole grid has to start below the 44x44 expand disc, which costs 56px out of
   a 202px art box.
   ============================================================================ */
export function DashboardVisualC() {
  const root = usePsC1xReveal<HTMLDivElement>();

  return (
    <div className="ps-c1x-root ps-c1c-root" aria-hidden="true" ref={root}>
      <div className="ps-c1c-grid">
        <div className="ps-c1x-panel ps-c1x-panel--lit ps-c1c-t1" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="ps-c1x-k">Jobs per week</span>
          <Trend />
        </div>

        <div className="ps-c1x-panel ps-c1c-t2" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="ps-c1x-k">By service</span>
          <Columns />
        </div>

        <div className="ps-c1x-panel ps-c1c-t3" style={{ "--i": 2 } as React.CSSProperties}>
          <Dial pct={78} label="On time" />
        </div>

        <div className="ps-c1x-panel ps-c1c-t4" style={{ "--i": 3 } as React.CSSProperties}>
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

   NOTE ON THE NO-JAVASCRIPT PATH: this effect and the reveal hook are the only
   JavaScript in the module, and neither one is what makes the art visible.
   With scripts dead the server-rendered default concept still paints in full —
   nothing in the base cascade is hidden — so a failed chunk costs the `?c1=`
   switch and the reveal, never the artwork.

   DEFAULT with no query = concept A, "the three-second read".
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
