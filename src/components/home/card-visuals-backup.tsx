"use client";

/**
 * card-visuals-backup.tsx
 *
 * NAME IS WRONG, FILE IS LIVE. Despite "backup", this module ships: it is
 * imported at service-pillars.tsx and five of its exports render the homepage
 * bento grid. Deleting it breaks the build. Not renamed here only because the
 * rename is a separate change from the one this file is carrying.
 *
 * Originally (2026-04-02) a backup of the 5 card visuals extracted from
 * service-pillars.tsx, "preserved here so they can be imported into a rebuilt
 * card grid structure without losing the animations". 2026-09-03 is that
 * rebuild: ADR-0006 folded websites/marketing into the pillar grid and
 * WebsiteVisual was adopted back off this shelf exactly as intended.
 *
 * Exports and where they land:
 *   WebsiteVisual      -> Website Redesign card       (readopted 2026-09-03)
 *   AutomationVisual   -> AI Integration card
 *   SystemFixesVisual  -> Business Automation card
 *   DashboardVisual    -> Business Software card
 *   RevenueVisual      -> NOTHING, on purpose. It draws an up-and-to-the-right
 *                         revenue chart; that is an outcome claim as artwork,
 *                         gated by docs/WRITER-AGENT-PROMPT.md:31, and ADR-0006
 *                         decision 4 bars reviving the positioning it was built
 *                         for. Kept, unused. Do not wire it up without an ADR.
 *   CustomBuildVisual  -> Custom Websites card        (new 2026-09-03)
 *   SearchVisual       -> Search and Ads card         (new 2026-09-03)
 *
 * CSS lives in: src/styles/card-visuals.css
 */

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   VISUAL 1 — Websites & Applications
   Browser chrome + real iPhone mockup, both vertically centered
   ───────────────────────────────────────────────────────────── */
export function WebsiteVisual() {
  return (
    <div className="ps-visual-website" aria-hidden="true">
      {/* LEFT: Browser window */}
      <div className="ps-wb-browser">
        <div className="ps-browser-chrome">
          <div className="ps-browser-dots">
            <span style={{ background: "#FF5F57" }} />
            <span style={{ background: "#FEBC2E" }} />
            <span style={{ background: "#28C840" }} />
          </div>
          <div className="ps-browser-url">
            <span className="ps-browser-url-lock">
              <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                <rect x="1" y="4" width="6" height="4" rx="1" fill="#94A3B8" />
                <path d="M2.5 4V2.5a1.5 1.5 0 013 0V4" stroke="#94A3B8" strokeWidth="1" fill="none" />
              </svg>
            </span>
            yourcompany.com
          </div>
        </div>
        <div className="ps-site-layout">
          <div className="ps-site-nav">
            <div className="ps-site-nav-logo" />
            <div className="ps-site-nav-dots">
              <span /><span /><span />
            </div>
          </div>
          <div className="ps-site-hero">
            <div className="ps-site-hero-heading" />
            <div className="ps-site-hero-sub" />
            <div className="ps-site-hero-sub ps-site-hero-sub--short" />
          </div>
          <div className="ps-site-cards">
            <div className="ps-site-card">
              <div className="ps-site-card-icon" />
              <div className="ps-site-card-line" />
              <div className="ps-site-card-line ps-site-card-line--short" />
            </div>
            <div className="ps-site-card">
              <div className="ps-site-card-icon" style={{ background: "rgba(99,91,255,0.5)" }} />
              <div className="ps-site-card-line" />
              <div className="ps-site-card-line ps-site-card-line--short" />
            </div>
            <div className="ps-site-card">
              <div className="ps-site-card-icon" style={{ background: "rgba(128,233,255,0.4)" }} />
              <div className="ps-site-card-line" />
              <div className="ps-site-card-line ps-site-card-line--short" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: iPhone 15 Pro mockup — clean rebuild, no artifacts */}
      <div className="ps-phone">
        <div className="ps-phone-body">
          {/* Dynamic island */}
          <div className="ps-phone-island" />
          {/* Screen content */}
          <div className="ps-phone-screen">
            {/* Header */}
            <div className="ps-phone-header">
              <div className="ps-phone-header-bar" />
              <div className="ps-phone-header-dot" />
            </div>
            {/* Content */}
            <div className="ps-phone-content">
              <div className="ps-phone-content-block ps-phone-block--blue" />
              <div className="ps-phone-content-block ps-phone-block--gray" />
              <div className="ps-phone-content-block ps-phone-block--blue" />
              <div className="ps-phone-list">
                <div className="ps-phone-list-item">
                  <div className="ps-phone-list-dot" style={{ background: "#1590FF" }} />
                  <div className="ps-phone-list-lines"><span /><span /></div>
                </div>
                <div className="ps-phone-list-item">
                  <div className="ps-phone-list-dot" style={{ background: "#8B5CF6" }} />
                  <div className="ps-phone-list-lines"><span /><span /></div>
                </div>
                <div className="ps-phone-list-item">
                  <div className="ps-phone-list-dot" style={{ background: "#00D4AA" }} />
                  <div className="ps-phone-list-lines"><span /><span /></div>
                </div>
              </div>
            </div>
            {/* Bottom tab bar */}
            <div className="ps-phone-tabs">
              <div className="ps-phone-tab ps-phone-tab--active" />
              <div className="ps-phone-tab" />
              <div className="ps-phone-tab" />
              <div className="ps-phone-tab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARED REVEAL GATE  (added 2026-09-06 with the card 1/2/3 rebuild)

   One-shot IntersectionObserver -> `.in-view`, lifted verbatim from
   SearchVisual (card-visuals-backup.tsx:1003-1030) so the three rebuilt
   cards use the SAME convention as the two reference cards instead of
   introducing a second one.

   What this REPLACES, and why it matters: the previous cards 1-3 each
   drove their reveal through a `useState` + `--play` modifier class (and
   card 1 additionally through a `key=` remount plus a rAF counter loop).
   That was a second convention living beside `.in-view` in one grid, and
   it carried 26 / 21 / 14 keyframe animations against the reference
   cards' ZERO. Motion quantity turned out to be inversely correlated with
   the owner's approval; the two cards he keeps satisfy through mass,
   depth and crop. So: one gate, CSS transitions only, no @keyframes.

   Reduced motion short-circuits to the FINISHED frame before the observer
   is ever constructed — same as SearchVisual, and the CSS at the foot of
   this file's stylesheet section pins transitions off as well.
   ───────────────────────────────────────────────────────────── */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    /* SAFETY NET (from the concurrent session's 2026-09-06 working tree, kept
       verbatim because it is correct). The content of these three cards bases
       at `opacity: 0` until `.in-view` arrives, so if the observer never fires
       the card renders as an empty shell: a navy rail, one label and a blank
       panel. A threshold of 0.25 on a card taller than the viewport, a
       detached or hidden ancestor, or any observer failure all reach that
       state. If the class has not arrived by 1200ms, show the content anyway.
       The observer still wins on the normal path, so the staged entrance is
       unchanged for every real visitor. */
    const failsafe = window.setTimeout(() => {
      el.classList.add("in-view");
      observer.disconnect();
    }, 1200);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return ref;
}

/* ═════════════════════════════════════════════════════════════
   BENTO CARDS 1-3 — v4: DRAW THE VISITOR'S ARTIFACT, NOT OUR APP

   Spec: ~/.claude/agent-reports/cards-v4-concept.md (sections 2-5).

   v3 drew our application — a `TODAY` dashboard, an `ACCOUNTS RECEIVABLE`
   ledger, a `HELD - NOT SENT` approval queue — shrunk to fit, with invented
   company names, dollar amounts, red status chips and fake primary buttons in
   the real CTA's blue. Cards 4 and 5 do the opposite: they draw an artifact the
   visitor ALREADY OWNS, at poster scale, with everything except one idea
   abstracted to bars. That difference is subject, not styling, which is why
   three rounds of restyling did not close it.

   THE CAP, and it is checkable by grepping this file:
     <= 4 content words, <= 2 furniture labels per card, and ZERO numbers,
     currency, percentages, dates, company names, person names, BUTTON LABELS,
     first-person sentences or status words.
   These three spend, in total: one placeholder domain (`yourcompany.com`, the
   identical string cards 4 and 5 already use - the repetition is the point),
   zero words, and one furniture label (`PDF`).

   No buttons. No red. No window title that is an app status - cards 4/5 title
   their windows with a URL or a search box, and that is the rule.

   All three share `.ps-v4-*` primitives whose values are COPIED from card 5's
   `.ps-sr-*` (card-visuals.css:2169+), not reinvented, so the row is one row.
   ───────────────────────────────────────────────────────────── */

/* The lock glyph is lifted verbatim from WebsiteVisual (:52-55) so card 1's
   URL pill and card 4's browser chrome are the same object. */
function V4Lock() {
  return (
    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden="true">
      <rect x="1" y="4" width="6" height="4" rx="1" fill="#94A3B8" />
      <path d="M2.5 4V2.5a1.5 1.5 0 013 0V4" stroke="#94A3B8" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 3 — AI Integration.  "THE SEAM."

   A T-JOINT FILLET WELD, SEEN OBLIQUELY. One steel plate lies flat and
   another stands up out of it at a right angle; the weld runs along the
   inside corner where they meet, molten at the arc and a finished stack of
   ripples behind it. Two plates at ninety degrees, one bead joining them.

   WHY THE JOINT CHANGED, AND IT IS THE WHOLE FIX. This card was drawn three
   times as a BUTT weld seen face-on — two plates edge to edge with the bead
   running straight down the middle of the frame. Photographed, every version
   read as a lit skyscraper, a rocket launch or a zipper, and no amount of
   colour tuning moved it. The reason is geometric, and it is worth writing
   down so nobody re-derives it:

     · A bead viewed straight down its own length is a ribbed vertical line,
       and a ribbed vertical line is a zipper. That is not a tuning problem.
     · A butt weld joins two COPLANAR plates, so there is no second surface
       to show. Tilting the camera cannot rescue it — there is nothing to
       reveal, because both halves lie in the same plane.

   A T-joint fixes both at once. The plates are at ninety degrees, so you see
   TWO SURFACES at two angles catching the light differently, and the bead
   runs diagonally across the frame instead of straight down it. The diagonal
   breaks the column silhouette that caused the rocket read.

   THE STILL IS THE DELIVERABLE. Ahead of the arc, toward the top right, the
   corner is still OPEN — the two faces meet with nothing joining them.
   Behind it the bead is laid. The picture therefore says two-becoming-one
   with no motion at all, which is what a reduced-motion visitor and every
   screenshot get.

   LIGHT MODE IS NOT DARK MODE WITH A PALER CARD. In dark the plates are navy
   steel on a navy ground. In light THE PLATES LIGHTEN to daylight steel while
   the corner shadow, the bead and the oxide stay dark and hot, so the card
   reads as a light surface with a dark glowing seam through it — the shape
   card 4 uses (predominantly light, one deliberate dark band). Held fully
   dark in light theme this card punched a black hole in a row of four pale
   ones.

   FULL BLEED, NO FRAME. The artwork is the card's own surface and runs to all
   four edges. An inset rectangle read as a video thumbnail dropped into the
   layout — the only artwork in the row with a hard edge.

   GEOMETRY, measured not assumed: the visual fills 412x442 at desktop and
   354x332 on a phone. The arc sits near the middle of the frame, clear of the
   frosted button that floats over the TOP-RIGHT corner and clear of the title
   scrim across the bottom. Both plates run off the edges so the assembly
   reads as a crop of something bigger, not an object floating in space.

   NO Math.random ANYWHERE. This is server-rendered; a procedurally scattered
   bead would desynchronise server and client markup and throw a hydration
   mismatch. Every ripple below is an authored literal.
   ───────────────────────────────────────────────────────────── */

/* The fillet ripples, in BEAD-LOCAL coordinates: `d` is the distance back
   along the corner from the arc, `r` the crescent rise. The rise is
   deliberately uneven — a constant rise is what made the previous pass read
   as a machine-stamped zipper. */
const C3_RIPPLES = [
  { d: 6, r: 9.5 }, { d: 19, r: 11.0 }, { d: 32, r: 9.8 }, { d: 44, r: 11.6 },
  { d: 57, r: 10.2 }, { d: 69, r: 12.0 }, { d: 82, r: 9.6 }, { d: 94, r: 11.2 },
  { d: 107, r: 10.6 }, { d: 119, r: 11.8 }, { d: 132, r: 9.9 }, { d: 144, r: 11.4 },
  { d: 157, r: 10.4 }, { d: 169, r: 12.2 }, { d: 182, r: 10.0 }, { d: 194, r: 11.5 },
  { d: 207, r: 9.7 }, { d: 219, r: 11.9 }, { d: 232, r: 10.7 }, { d: 244, r: 11.9 }, { d: 256, r: 9.8 }, { d: 268, r: 11.3 }, { d: 280, r: 10.5 }, { d: 292, r: 12.1 }, { d: 304, r: 9.9 }, { d: 316, r: 11.6 }, { d: 328, r: 10.7 },
] as const;


export function AutomationVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-c3-root" aria-hidden="true">
      <svg
        className="ps-c3-svg"
        viewBox="0 0 412 442"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Every id is ps-c3- prefixed. Five inline SVGs share this page and
              a defs collision is SILENT — the wrong gradient is picked up with
              no error and no console message. */}
          <linearGradient id="ps-c3-face-v" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" className="ps-c3-s-va" />
            <stop offset="100%" className="ps-c3-s-vb" />
          </linearGradient>
          <linearGradient id="ps-c3-face-b" x1="0.1" y1="0" x2="0.6" y2="1">
            <stop offset="0%" className="ps-c3-s-ba" />
            <stop offset="100%" className="ps-c3-s-bb" />
          </linearGradient>

          <linearGradient id="ps-c3-bead" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="ps-c3-s-b0" />
            <stop offset="45%" className="ps-c3-s-b1" />
            <stop offset="100%" className="ps-c3-s-b2" />
          </linearGradient>
          <linearGradient id="ps-c3-rip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="ps-c3-s-r0" />
            <stop offset="50%" className="ps-c3-s-r1" />
            <stop offset="100%" className="ps-c3-s-r2" />
          </linearGradient>

          {/* Heat-affected zone: straw nearest the weld, then violet, then
              indigo, then nothing. It sits in the PARENT METAL either side of
              the bead, which is where heat actually goes. An earlier pass ran
              it down the bead itself and that inverted the physics. */}
          <linearGradient id="ps-c3-haz-up" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E8A63C" stopOpacity="0.55" />
            <stop offset="24%" stopColor="#C77BC4" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#5560C6" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2A3E63" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ps-c3-haz-dn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8A63C" stopOpacity="0.55" />
            <stop offset="24%" stopColor="#C77BC4" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#5560C6" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2A3E63" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="ps-c3-pool">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="26%" stopColor="#E6F8FF" />
            <stop offset="52%" stopColor="#80E9FF" />
            <stop offset="78%" stopColor="#1590FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1590FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ps-c3-glare">
            <stop offset="0%" stopColor="#1590FF" stopOpacity="0.5" />
            <stop offset="52%" stopColor="#1590FF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#1590FF" stopOpacity="0" />
          </radialGradient>



          <filter id="ps-c3-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="ps-c3-bloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="15" />
          </filter>

          {/* Clip each plate to its own face so grain cannot leak across the
              corner onto the other plate. */}
          <clipPath id="ps-c3-clip-v">
            <path d="M-40 238 L472 28 L458 -166 L-56 66 Z" />
          </clipPath>
          <clipPath id="ps-c3-clip-b">
            <path d="M-40 238 L472 28 L496 268 L-16 498 Z" />
          </clipPath>
        </defs>

        {/* ── THE STANDING PLATE. Runs off the top and both sides. ── */}
        <path d="M-40 238 L472 28 L458 -166 L-56 66 Z" fill="url(#ps-c3-face-v)" />

        {/* ── THE FLAT PLATE. Runs off the bottom and both sides. Darker,
              because it lies away from the light. ── */}
        <path d="M-40 238 L472 28 L496 268 L-16 498 Z" fill="url(#ps-c3-face-b)" />

        {/* ── Everything below lives in BEAD-LOCAL space: origin on the corner,
              +x running up the corner toward the top right. One rotate, applied
              as an ATTRIBUTE so it uses user space — a CSS rotate would need
              transform-box: fill-box or it spins about the SVG origin. ── */}
        <g transform="translate(40 205.2) rotate(-22.3)">
          {/* the inside corner: a dark contact shadow running the whole length,
              which is what seats the two plates against each other */}
          <rect x="-160" y="-3" width="620" height="6" className="ps-c3-corner" />

          {/* HEAT, in the parent metal either side, only where the arc has
              already passed. */}
          <g className="ps-c3-haz" filter="url(#ps-c3-soft)">
            <rect x="-160" y="-64" width="346" height="58" fill="url(#ps-c3-haz-up)" />
            <rect x="-160" y="6" width="346" height="58" fill="url(#ps-c3-haz-dn)" />
          </g>

          {/* AHEAD OF THE ARC the corner is still OPEN — no bead, just the two
              faces meeting. This is the half of the picture that says the
              plates are still two things. */}
          <path d="M186 -2.5 L440 -2.5" className="ps-c3-open" />
          <path d="M186 3.5 L440 3.5" className="ps-c3-open" />

          {/* BEHIND IT, the laid bead. */}
          <path className="ps-c3-bead" d="M-160 -19 L182 -19 L182 19 L-160 19 Z" fill="url(#ps-c3-bead)" />
          <path d="M-160 -19.5 L180 -19.5" className="ps-c3-toe" />
          <path d="M-160 19.5 L180 19.5" className="ps-c3-toe" />

          {/* Ripples: ONE faint stroke each. No dark outline, no specular
              ridge. The outline+highlight pairing is precisely what made an
              earlier pass read as a zip fastener — the crescents became teeth
              because each was individually delineated. Here they are tonal
              variation ON a continuous fillet, not separate objects. */}
          <g className="ps-c3-ripples">
            {C3_RIPPLES.map((rp, i) => {
              const x = 174 - rp.d;
              return (
                <path
                  key={rp.d}
                  className="ps-c3-ripple"
                  style={{ "--i": i } as React.CSSProperties}
                  d={`M ${x} -17 Q ${x - rp.r * 0.55} 0 ${x} 17`}
                />
              );
            })}
          </g>

          {/* THE ARC, on the corner — middle of the frame, clear of the
              frosted button in the top-right. */}
          <g className="ps-c3-arc">
            <circle className="ps-c3-glare" cx="180" cy="0" r="118" fill="url(#ps-c3-glare)" filter="url(#ps-c3-bloom)" />
            <ellipse className="ps-c3-pool" cx="180" cy="0" rx="30" ry="22" fill="url(#ps-c3-pool)" />
            <ellipse className="ps-c3-core" cx="179" cy="0" rx="9.5" ry="6.5" fill="#FFFFFF" />
          </g>
        </g>


        {/* The lit top edge of the standing plate, drawn last so it reads as
            the brightest thing after the arc. */}
        <path d="M-56 66 L458 -166" className="ps-c3-edge" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 2 — Business Automation.  "The same form, twice, by hand."

   Pain, service-pillars.tsx:240 (`painPoints[1]`, selected `hookIndex: 1`):
     "We're still copying data between systems by hand."

   WHY THIS IS A REWRITE AND NOT A TWEAK. The previous composition put two
   equal panels side by side in a 34px gap and let the MOTION carry the whole
   message: the left filled in five beats, the right in one. Photographed at
   rest — which is what a reduced-motion visitor, a scrolled-past-and-back
   visitor and every screenshot sees — it was two identical filled slabs and a
   1.5px hairline. The meaning was 100% temporal, and a card whose meaning
   evaporates when the transition ends has no meaning. Card 5 can be read from
   a still. So must this one.

   THE STILL, and it is the deliverable:
     · The SAME form drawn twice, offset down-and-right like a misregistered
       photocopy. Both sheets are the same size BY CONSTRUCTION (each is
       inset from the opposite two edges of one box by the same offset), and
       both carry the identical row rhythm and identical label widths, so the
       back sheet's exposed rows sit a visible half-step above the front
       sheet's. That misregistration is what says DUPLICATE. Two panels in a
       gap say "two documents"; a duplicate-icon silhouette says "one thing,
       entered twice", which is the pain.
     · The back sheet is the record that already exists. The front sheet is
       the copy a person is making of it — its later rows are still empty and
       a TEXT CARET sits in the first one. The caret is the smallest element
       on the card and the one that converts "two documents" into "somebody is
       retyping this right now".
     · Two favicon hues. LOAD-BEARING, NOT DECORATIVE — the only thing
       carrying "different SYSTEMS" on a card with no sentences. An
       implementer who harmonises these to one brand blue turns the card into
       "one form, twice", which is nonsense. DO NOT HARMONISE.

   THE RESOLUTION IS ADDITIVE, NEVER SUBTRACTIVE. Nothing that carries the
   pain is animated away — the offset never closes, the duplicate never
   merges. What arrives is the JOIN: a full-height rail down the seam where
   the copy meets the record, and the empty rows filling behind it in one
   beat. The rail is the payoff so it is drawn as the payoff — it is card 5's
   own 2px `AI OVERVIEW` left rail, at sheet height, not the 34px hairline it
   replaced.

   WORD BUDGET. 0 content words, 0 furniture labels, 1 placeholder domain —
   `yourcompany.com`, the identical string cards 1, 4 and 5 carry. The old
   composition spent zero, and paid for it: with no chrome title at all the
   panels read as slabs rather than as windows, and card 2 was the only one of
   the five with no family signal.
   ───────────────────────────────────────────────────────────── */

/* Label-bar widths. IDENTICAL in both sheets - that identity is the entire
   argument. If the two forms differ, "copied by hand" evaporates. */
const V4_FORM_ROWS = ["64%", "48%", "72%", "40%", "56%", "68%"] as const;

/* Rows 0..2 were typed by hand (they arrive one beat at a time, because a
   person is doing it). Rows 3.. arrive together on the rail, because that is
   not a person. The caret sits on row V4_TYPED — the first one still empty. */
const V4_TYPED = 3;

export function SystemFixesVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  const sheet = (side: "src" | "copy") => (
    <div className={`ps-v4-sheetx ps-v4-sheetx--${side}`}>
      <div className="ps-v4-chrome">
        <i className={`ps-v4-fav ps-v4-fav--${side === "src" ? "a" : "b"}`} />
        {side === "copy" ? (
          /* The window title is a URL, exactly like cards 1 and 4. Never an
             app status. */
          <span className="ps-v4-chromeurl">
            <V4Lock />
            <span className="ps-v4-host">yourcompany.com</span>
          </span>
        ) : (
          <span className="ps-v4-pill" />
        )}
      </div>
      <div className="ps-v4-rows">
        {V4_FORM_ROWS.map((w, i) => (
          <span className="ps-v4-row" key={i}>
            <i className="ps-v4-label" style={{ width: w }} />
            <span className="ps-v4-slotbox">
              {side === "src" ? (
                /* The record that already exists. Painted at t=0, not gated —
                   the source is not something that has to arrive. */
                <i className="ps-v4-slot ps-v4-slot--src" />
              ) : (
                <>
                  <i
                    className={`ps-v4-slot ps-v4-slot--${i < V4_TYPED ? "typed" : "joined"}`}
                    style={{ "--i": i } as React.CSSProperties}
                  />
                  {/* The caret. Outside the slot on purpose: it has to be
                      visible while the slot is still EMPTY, and the slot's
                      opacity is the thing being animated. */}
                  {i === V4_TYPED ? <i className="ps-v4-caret" /> : null}
                </>
              )}
            </span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="ps-v4-root ps-v4-root--dup" aria-hidden="true">
      <div className="ps-v4-dup">
        {sheet("src")}
        {sheet("copy")}
        {/* The seam. Full sheet height, on the edge where the copy overlaps
            the record, drawn top to bottom. It is the payoff, so it is the
            largest single mark on the card - not a hairline in a gap. */}
        <i className="ps-v4-rail" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 1 — Business Software.  "Five places, one picture."

   Pain, service-pillars.tsx:148 (`painPoints[1]`, selected `hookIndex: 1`):
     "Our data lives in five different places and nobody has a complete picture."

   Subject: the visitor's OWN browser, with five tabs open - the thing they are
   looking at right now to answer one question, and the reason they cannot.
   Same material as card 4: chrome, dots, a lock, and `yourcompany.com`.

   NAMED RISK, carried over from the spec: five columns of grey bars sit near
   this site's own idiom for UNLOADED CONTENT - the exact trap v3's seven
   equal-height sparkline bars fell into. Two things keep it out: the bars live
   inside a table WITH A HEADER ROW, and half of them are visibly EMPTY at
   rest, which is a state a placeholder never has. If review still reads it as
   "failed to load", raise the column-1 fill contrast. Do not add words.

   FIVE NEVER BECOMES FOUR. The meaning depends on the count, so the count may
   not be reduced at any width (card-visuals.css: "the composition must not
   change by breakpoint"). The compact ramp drops a table ROW, never a column.
   ───────────────────────────────────────────────────────────── */

/* The five tabs. Colour is an INDEX, never the content - the same level cards
   4 and 5 use chroma at. Tab 1 is the active one. */
const V4_TABS = ["var(--color-primary-strong)", "#8B5CF6", "#00D4AA", "#94A3B8", "#CBD5E1"] as const;
const V4_TABLE_ROWS = [0, 1, 2, 3, 4, 5] as const;

export function DashboardVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-v4-root ps-v4-root--tabs" aria-hidden="true">
      <div className="ps-v4-panel ps-v4-panel--browser">
        {/* Five tabs. No tab text - the five colours are the whole claim. */}
        <div className="ps-v4-tabs">
          {V4_TABS.map((hue, i) => (
            <span className={`ps-v4-tab${i === 0 ? " ps-v4-tab--on" : ""}`} key={i}>
              <i className="ps-v4-fav" style={{ background: hue }} />
              <i className="ps-v4-tabbar" />
            </span>
          ))}
        </div>

        {/* The window's title is a URL, exactly like card 4's. Never a status. */}
        <div className="ps-v4-url">
          <V4Lock />
          <span className="ps-v4-host">yourcompany.com</span>
        </div>

        <div className="ps-v4-table">
          <div className="ps-v4-thead">
            {V4_TABS.map((_, c) => <i key={c} />)}
          </div>
          {/* `.ps-v4-tbody` distributes the rows over whatever height the
              stretched panel has. Without it the table sat in the top third
              and left ~260px of blank white below — a browser window with
              nothing in it, which is not the subject. */}
          <div className="ps-v4-tbody">
          {V4_TABLE_ROWS.map((r) => (
            <div className="ps-v4-tr" key={r}>
              {/* Column 1 is the one place that already has the answer. */}
              <i className="ps-v4-td ps-v4-td--seed"
                 style={{ "--i": r, "--hue": V4_TABS[0] } as React.CSSProperties} />
              {/* Columns 2-5 arrive DOWN AND RIGHT out of their tab, one
                  column per beat, so the five tabs visibly become the five
                  columns of one row. The tab's hue appears only as a 3px left
                  edge - as an index, never as the content. */}
              {V4_TABS.slice(1).map((hue, c) => (
                <i className="ps-v4-td ps-v4-td--join" key={c}
                   style={{ "--i": c, "--hue": hue } as React.CSSProperties} />
              ))}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 5 — Revenue Growth Engines
   Growth engine metaphor:
   - Left: input labels slide in (Content, Ads, SEO, Email)
   - Center: pulsing engine core with rotating ring
   - Right: output labels slide out larger & green (Leads, Revenue, $$$)
   - Bottom: upward trending line chart draws on scroll
   ───────────────────────────────────────────────────────────── */
export function RevenueVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="ps-ge-root"
      aria-hidden="true"
    >
      {/* Growth line chart */}
      <div className="ps-ge-chart">
        <svg
          className="ps-ge-line-svg"
          viewBox="0 0 220 65"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="geLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="geAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="60" x2="220" y2="60" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
          <line x1="0" y1="40" x2="220" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
          <path
            className="ps-ge-area"
            d="M0,58 C30,55 60,50 90,42 C120,34 155,18 200,6 L220,3 L220,60 L0,60 Z"
            fill="url(#geAreaGrad)"
          />
          <path
            className="ps-ge-line"
            d="M0,58 C30,55 60,50 90,42 C120,34 155,18 200,6 L220,3"
            stroke="url(#geLineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle className="ps-ge-tip-dot"  cx="220" cy="3" r="3"   fill="#10B981" />
          <circle className="ps-ge-tip-ring" cx="220" cy="3" r="6.5" fill="#10B981" fillOpacity="0.2" />
        </svg>
        <div className="ps-ge-chart-labels">
          <span className="ps-ge-chart-label">Jan</span>
          <span className="ps-ge-chart-label">Apr</span>
          <span className="ps-ge-chart-label">Jul</span>
          <span className="ps-ge-chart-label">Now</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 6 — Custom Websites  (added 2026-09-03, ADR-0006)

   Split panel: a code editor on the left resolving into a rendered
   page on the right. This is the literal positioning of
   /services/custom-websites — "custom-coded from scratch, no
   templates, no page builders" — drawn rather than claimed.

   Deliberately NOT another browser-and-phone mockup: WebsiteVisual
   already owns that language on the Website Redesign card, and two
   cards in the same row must not read as the same picture.

   Code is rendered as coloured token BARS, never as readable text.
   Fake source that a visitor can squint at is a liability; an
   abstraction is honest and scales down to a 340px card.

   Motion: opacity + transform only, driven by an .in-view class set
   by IntersectionObserver. prefers-reduced-motion short-circuits to
   the final state in the effect AND in card-visuals.css.
   ───────────────────────────────────────────────────────────── */

/** One token bar: `k` picks the syntax colour, `w` is its width in px. */
interface CbToken {
  k: "kw" | "fn" | "str" | "attr" | "punc";
  w: number;
}

const CB_CODE: { indent: number; tokens: CbToken[] }[] = [
  { indent: 0, tokens: [{ k: "kw", w: 26 }, { k: "fn", w: 44 }, { k: "punc", w: 10 }] },
  { indent: 1, tokens: [{ k: "punc", w: 8 }, { k: "fn", w: 34 }, { k: "attr", w: 26 }] },
  { indent: 2, tokens: [{ k: "attr", w: 22 }, { k: "str", w: 40 }] },
  { indent: 2, tokens: [{ k: "attr", w: 30 }, { k: "str", w: 28 }] },
  { indent: 1, tokens: [{ k: "punc", w: 8 }, { k: "fn", w: 40 }] },
  { indent: 2, tokens: [{ k: "kw", w: 20 }, { k: "str", w: 46 }] },
  { indent: 1, tokens: [{ k: "punc", w: 14 }] },
  { indent: 0, tokens: [{ k: "punc", w: 8 }] },
];

export function CustomBuildVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="ps-cb-root" aria-hidden="true">
      {/* LEFT — editor */}
      <div className="ps-cb-editor">
        <div className="ps-cb-tabs">
          <span className="ps-cb-tab ps-cb-tab--active">page.tsx</span>
          <span className="ps-cb-tab">layout.tsx</span>
        </div>
        <div className="ps-cb-code">
          {CB_CODE.map((line, i) => (
            <div
              className="ps-cb-line"
              key={`cb-line-${i}`}
              style={{ "--cb-i": i } as React.CSSProperties}
            >
              <span className="ps-cb-gutter" />
              <span
                className="ps-cb-tokens"
                style={{ paddingLeft: `${line.indent * 9}px` }}
              >
                {line.tokens.map((tok, j) => (
                  <span
                    key={`cb-tok-${i}-${j}`}
                    className={`ps-cb-tok ps-cb-tok--${tok.k}`}
                    style={{ width: `${tok.w}px` }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — the rendered result */}
      <div className="ps-cb-preview">
        <div className="ps-cb-bar">
          <span /><span /><span />
        </div>
        <div className="ps-cb-page">
          <div className="ps-cb-nav">
            <span className="ps-cb-nav-logo" />
            <span className="ps-cb-nav-dots"><i /><i /><i /></span>
          </div>
          <div className="ps-cb-block ps-cb-block--h1" style={{ "--cb-i": 0 } as React.CSSProperties} />
          <div className="ps-cb-block ps-cb-block--p" style={{ "--cb-i": 1 } as React.CSSProperties} />
          <div className="ps-cb-block ps-cb-block--p ps-cb-block--short" style={{ "--cb-i": 2 } as React.CSSProperties} />
          <div className="ps-cb-cta" style={{ "--cb-i": 3 } as React.CSSProperties} />
          <div className="ps-cb-cards">
            <div style={{ "--cb-i": 4 } as React.CSSProperties}><span /><span /></div>
            <div style={{ "--cb-i": 5 } as React.CSSProperties}><span /><span /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 7 — Search and Ads  (added 2026-09-03, ADR-0006)

   A results surface: query field, an AI-answer block that cites a
   placeholder domain, and a local-pack list. It draws the three
   destinations this card carries — local SEO, AI search
   optimization, paid ads — in the order a buyer meets them.

   CLAIMS DISCIPLINE (docs/WRITER-AGENT-PROMPT.md:29,31):
   - The query is the literal placeholder "[your service] near me".
     A real-looking query would name a vertical, and :29 bars
     industry claims without a canonical project behind them.
   - The cited domain is "yourcompany.com" — the same placeholder
     WebsiteVisual already uses (card-visuals-backup.tsx:33).
   - There is NO rank-rise animation and NO position numbers. A #3
     row climbing to #1 is an outcome claim drawn as artwork, which
     is the same trap RevenueVisual falls into. The only motion is
     the citation chip arriving, which illustrates the capability
     ("get cited") without asserting a result.
   ───────────────────────────────────────────────────────────── */
export function SearchVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="ps-sr-root" aria-hidden="true">
      <div className="ps-sr-panel">
        {/* Chrome bar. Two jobs, both load-bearing:
            1. .ps-bento-card__expand is a frosted WHITE circle at top:16
               right:16 (globals.css:1703) sitting at z-index 3, i.e. ON TOP
               of this visual. On a 390px card this panel reaches that corner,
               and a white icon on a white panel is an invisible affordance.
               A dark strip along the top puts contrast back under it — the
               same thing .ps-browser-chrome does for WebsiteVisual.
            2. It makes the panel read as a surface with depth rather than a
               white slab, which is what it looked like without one. */}
        <div className="ps-sr-chrome">
          <span className="ps-sr-chrome-dots"><i /><i /><i /></span>
          <span className="ps-sr-chrome-pill" />
        </div>

        {/* Query field */}
        <div className="ps-sr-field">
          <svg className="ps-sr-glass" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="ps-sr-query">[your service] near me</span>
        </div>

        {/* AI answer block */}
        <div className="ps-sr-ai">
          <div className="ps-sr-ai-head">
            <svg className="ps-sr-spark" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l1.5 4L13.5 7l-4 1.5L8 12.5 6.5 8.5 2.5 7l4-1.5z"
                fill="currentColor"
              />
            </svg>
            <span className="ps-sr-ai-label">AI Overview</span>
          </div>
          <span className="ps-sr-ai-line" style={{ "--sr-i": 0 } as React.CSSProperties} />
          <span className="ps-sr-ai-line" style={{ "--sr-i": 1 } as React.CSSProperties} />
          <span className="ps-sr-ai-line ps-sr-ai-line--short" style={{ "--sr-i": 2 } as React.CSSProperties} />
          <span className="ps-sr-cite">yourcompany.com</span>
        </div>

        {/* Results list. The first row is a paid placement and the two
            below it are the organic local pack — which is the actual shape
            of the page this card is about, and the only way the card's own
            title ("Search and Ads.") is honest: without the Ad row the
            picture depicts two of its three destinations and silently drops
            /services/paid-ads. Still no rank numbers and no rank-rise
            animation — see the claims note above this component. */}
        <div className="ps-sr-pack">
          <span className="ps-sr-pack-label">Results</span>
          <div className="ps-sr-row ps-sr-row--ad" style={{ "--sr-i": 0 } as React.CSSProperties}>
            <span className="ps-sr-ad-badge">Ad</span>
            <span className="ps-sr-row-lines">
              <i className="ps-sr-row-name" />
              <i className="ps-sr-row-meta" />
            </span>
          </div>
          {[1, 2].map((row) => (
            <div
              className={`ps-sr-row${row === 1 ? " ps-sr-row--lead" : ""}`}
              key={`sr-row-${row}`}
              style={{ "--sr-i": row } as React.CSSProperties}
            >
              <span className="ps-sr-pin">
                <svg viewBox="0 0 12 14" fill="none">
                  <path
                    d="M6 .8a4.6 4.6 0 00-4.6 4.6C1.4 8.8 6 13.2 6 13.2s4.6-4.4 4.6-7.8A4.6 4.6 0 006 .8z"
                    fill="currentColor"
                  />
                  <circle cx="6" cy="5.3" r="1.7" fill="#0A1628" />
                </svg>
              </span>
              <span className="ps-sr-row-lines">
                <i className="ps-sr-row-name" />
                <i className="ps-sr-row-meta" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
