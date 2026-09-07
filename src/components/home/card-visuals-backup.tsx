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
   CARD 3 — AI Integration.  "THE GRAFT."

   A thick old rootstock rises out of the bottom of the frame and is cut off
   at a clean slant. Bound onto that slant with a spiral of amber waxed tape
   is a scion of paler wood, and along the meeting faces the cambium line
   glows a hot electric blue. Above the union the scion throws two shoots
   into the headroom. One tree-shaped silhouette; two pieces of wood.

   WHY THIS AND NOT THE WELD. Card 3 was drawn SIX times as a weld and
   rejected every time, three times by a critic reading pixels. The last three
   were rejected for the same reason in the same words — "a zip fastener and
   its slider", a rope, a ribbed tube. The cause turned out to be structural
   rather than tonal: a weld bead is a row of regular crescents along a line,
   and a row of regular crescents along a line IS a zipper. Changing the joint
   from a butt weld to a T-joint fillet, deleting the per-crescent outline and
   specular ridge, removing the plate grain and fixing the plane values all
   made it a better picture and none of them made it stop being a zipper.
   At 390 in light theme — the most-viewed case — it read as a ribbed grey
   hose with a light on the end.

   A graft does the same conceptual work and cannot collapse into a fastener,
   because its silhouette is a TREE, which is the most instantly recognisable
   shape available. That instant recognisability is the exact quality the weld
   failed at six times.

   WHY IT MEANS "AI INTEGRATION". The old plant keeps its roots and its whole
   history, and the new growth is genuinely fed by them. The seam is a callus,
   not a bracket. That is precisely the claim: AI built into the system a
   business already runs, drawing on what is already there, rather than a
   product bolted on beside it.

   THE STILL IS THE DELIVERABLE. Two woods of visibly different colour, a
   taped collar, and a lit join — all present with no motion at all, which is
   what a reduced-motion visitor and every screenshot get.

   THE NAMED RISK, from the concept brief, and how it is handled: "a thin
   scion silhouette makes it read as a stick taped to a log". So the scion is
   drawn with REAL GIRTH — 62px against the stock's 92px at the union, not a
   twig. Two members of comparable mass reads as a graft; a wire on a log
   reads as a repair.

   LIGHT MODE. The rootstock stays dark in BOTH themes. That is this card's
   permanent dark anchor, the same structure card 4 uses (predominantly light
   with one deliberate dark mass). Held fully dark in light theme a card
   punches a hole in a row of pale ones; held fully pale it has no anchor.

   GEOMETRY, measured: the visual fills 412x442 at desktop and 354x332 on a
   phone, cropped by `xMidYMid slice`. The union — the taped collar, where the
   eye stops — sits at y=252, which is the middle of the frame, clear of the
   frosted button over the TOP-RIGHT corner and above the bottom 150px where
   the title scrim sits. The trunk runs off the bottom edge on purpose.

   NO Math.random ANYWHERE. Server-rendered; every fissure, tape band and leaf
   below is an authored literal.
   ───────────────────────────────────────────────────────────── */

/* Bark fissures on the rootstock: x offset from the trunk centre, top y,
   bottom y, and width. Authored, never generated — see the hydration note. */
const C3_FISSURES = [
  { x: -34, y1: 292, y2: 438, w: 3.0 }, { x: -20, y1: 268, y2: 452, w: 2.2 },
  { x: -8, y1: 300, y2: 446, w: 2.6 }, { x: 6, y1: 276, y2: 458, w: 2.0 },
  { x: 19, y1: 296, y2: 442, w: 2.8 }, { x: 32, y1: 284, y2: 450, w: 2.2 },
  { x: -27, y1: 350, y2: 462, w: 1.8 }, { x: 13, y1: 340, y2: 466, w: 1.8 },
] as const;

/* The waxed-tape spiral across the union. Each band is a parallelogram
   following the slant of the cut. */
const C3_TAPE = [
  { y: 288, h: 11 }, { y: 302, h: 12 }, { y: 316, h: 12 },
  { y: 330, h: 11 }, { y: 343, h: 10 },
] as const;

/* Leaf blades on the two shoots: tip x/y, angle, length. Geometric, not
   botanical — clean blades read at 330px, a drawn leaf does not. */
/* Leaves as LENS blades — two arcs meeting at a point at each end — each hung
   off a short stem from a named anchor ON its shoot. `ax/ay` is where the stem
   leaves the branch, `a` the blade angle, `l` its length. Ellipses were tried
   first and read as floating lily pads: a leaf with no visible attachment is
   the single clearest clip-art tell there is. */
const C3_LEAVES = [
  { ax: 142, ay: 72, a: -52, l: 26 }, { ax: 150, ay: 86, a: -24, l: 21 },
  { ax: 164, ay: 104, a: -6, l: 17 }, { ax: 224, ay: 80, a: 50, l: 26 },
  { ax: 214, ay: 94, a: 24, l: 21 }, { ax: 199, ay: 108, a: 6, l: 17 },
] as const;

/* A leaf blade: from the stem end, two symmetric quadratic arcs out to a tip
   and back, so BOTH ends come to a point. */
function c3Leaf(l: number) {
  const b = l * 0.34;
  return `M0 0 Q ${l * 0.42} ${-b} ${l} 0 Q ${l * 0.42} ${b} 0 0 Z`;
}

/* Card 3's OWN reveal hook. Deliberately NOT the shared `useRevealOnce`
   above, and this is a bug fix rather than a preference.

   THE BUG IN THE SHARED HOOK: its 1200ms failsafe fires whether or not the
   card is on screen. Card 3 sits well below the fold, so the entire reveal
   ran on a timer at page load and had already locked before anyone scrolled
   to it. The choreography was correct and permanently invisible. It also
   explains a defect a critic measured here and neither of us could account
   for — the card photographed as a flat empty rectangle at t=63 and t=186ms
   while its neighbours were painted: that was the tail of an animation that
   had already run off-screen.

   THE SHARED HOOK IS NOT MODIFIED. Cards 2 and 5 depend on it and other teams
   are in this file; changing it would alter their timing without their
   knowledge. Card 3 gets its own copy instead.

   Two differences from the shared one:
     · threshold 0.3 rather than 0.25, so the reveal starts when the card is
       meaningfully on screen rather than at its first pixel;
     · a safety net that is VIEWPORT-CONDITIONAL rather than a bare timeout.
       At 1200ms the shared hook's timer was not a safety net at all, it was
       the primary trigger. Simply lengthening it to 8000ms would only move
       the same bug later. See the comment on the net itself below. */
function usePsC3Reveal<T extends HTMLElement>() {
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
      { threshold: 0.3 }
    );

    observer.observe(el);

    /* THE SAFETY NET, and its shape matters more than its duration.
       A plain timeout — at 1200ms or at 8000ms — still fires whether or not
       the card is on screen, so it does not remove the bug, it only moves it
       later: a visitor who takes nine seconds to reach this section still
       finds the entrance already spent. So after the delay this does NOT
       reveal unconditionally; it reveals only if the element is ACTUALLY IN
       THE VIEWPORT, and otherwise re-checks every 400ms.
       The guarantee it exists for is preserved: if IntersectionObserver never
       fires for any reason, the artwork still cannot be stranded invisible,
       because the poll will catch the element the moment it is on screen. */
    let poll = 0;
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    };
    const settle = () => {
      if (onScreen()) {
        el.classList.add("in-view");
        observer.disconnect();
        window.clearInterval(poll);
      }
    };
    const failsafe = window.setTimeout(() => {
      settle();
      if (!el.classList.contains("in-view")) {
        poll = window.setInterval(settle, 400);
      }
    }, 8000);

    return () => {
      window.clearTimeout(failsafe);
      window.clearInterval(poll);
      observer.disconnect();
    };
  }, []);

  return ref;
}

export function AutomationVisual() {
  const containerRef = usePsC3Reveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-c3-root" aria-hidden="true">
      <svg
        className="ps-c3-svg"
        viewBox="0 0 412 442"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Every id ps-c3- prefixed: five inline SVGs share this page and a
              defs collision is SILENT — the wrong gradient is picked up with
              no error and no console message. */}
          <linearGradient id="ps-c3-stock" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" className="ps-c3-s-st0" />
            <stop offset="38%" className="ps-c3-s-st1" />
            <stop offset="100%" className="ps-c3-s-st2" />
          </linearGradient>
          <linearGradient id="ps-c3-scion" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0%" className="ps-c3-s-sc0" />
            <stop offset="38%" className="ps-c3-s-sc1" />
            <stop offset="100%" className="ps-c3-s-sc2" />
          </linearGradient>
          <linearGradient id="ps-c3-tape" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" className="ps-c3-s-tp0" />
            <stop offset="34%" className="ps-c3-s-tp1" />
            <stop offset="100%" className="ps-c3-s-tp2" />
          </linearGradient>
          {/* the cut face of the rootstock — pale heartwood, the one warm
              light in the lower half */}
          <linearGradient id="ps-c3-cut" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="ps-c3-s-cut0" />
            <stop offset="100%" className="ps-c3-s-cut1" />
          </linearGradient>

          <linearGradient id="ps-c3-cambium" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1590FF" stopOpacity="0" />
            <stop offset="18%" stopColor="#80E9FF" stopOpacity="0.95" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="84%" stopColor="#1590FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1590FF" stopOpacity="0" />
          </linearGradient>

          <filter id="ps-c3-glow" x="-120%" y="-400%" width="340%" height="900%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="ps-c3-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          <clipPath id="ps-c3-clip-stock">
            <path d="M124 470 L130 274 L226 250 L236 470 Z" />
          </clipPath>
        </defs>

        {/* ── THE ROOTSTOCK. Runs off the bottom edge; cut at a slant just
              below centre. Stays dark in BOTH themes — the card's anchor. ── */}
        <path
          className="ps-c3-stock"
          d="M124 470 L130 274 L226 250 L236 470 Z"
          fill="url(#ps-c3-stock)"
        />
        <g clipPath="url(#ps-c3-clip-stock)">
          {C3_FISSURES.map((f) => (
            <path
              key={f.x}
              className="ps-c3-fissure"
              d={`M${176 + f.x} ${f.y1} C${176 + f.x - 3} ${f.y1 + 46} ${176 + f.x + 3} ${f.y1 + 92} ${176 + f.x} ${f.y2}`}
              style={{ strokeWidth: f.w }}
            />
          ))}
        </g>

        {/* The slant cut face — pale heartwood. This is what makes the stock
            read as CUT rather than merely ending. */}
        <path className="ps-c3-cut" d="M130 274 L226 250 L222 238 L126 262 Z" fill="url(#ps-c3-cut)" />

        {/* ── THE SCION. Real girth on purpose: 62px against the stock's 92px.
              A twig here reads as a stick taped to a log, not as a graft. ── */}
        <path
          className="ps-c3-scion"
          d="M152 259 L212 245 L202 116 L158 122 Z"
          fill="url(#ps-c3-scion)"
        />

        {/* ── THE CAMBIUM LINE. The join itself, lit. This is the payoff and
              the only pure brand-blue in the composition. ── */}
        <g className="ps-c3-join">
          <path
            className="ps-c3-cambium-glow"
            d="M150 261 L213 247"
            filter="url(#ps-c3-glow)"
          />
          <path className="ps-c3-cambium" d="M150 261 L213 247" />
        </g>

        {/* ── THE WAXED TAPE, spiralling across the union. Amber: the warm
              channel that stops the card reading cold, and the thing that
              says a PERSON did this deliberately. ── */}
        <g className="ps-c3-tapes">
          {C3_TAPE.map((t, i) => (
            <g key={t.y} className="ps-c3-tapegrp" style={{ "--i": i } as React.CSSProperties}>
              {/* Each band BOWS across the trunk instead of running straight.
                  A straight band reads as a crate slat; a bowed one reads as
                  something wound around a cylinder. */}
              <path
                className="ps-c3-tape"
                d={`M${120 + i * 1.1} ${t.y} Q 176 ${t.y - 18} ${234 - i * 0.9} ${t.y - 26} L ${234 - i * 0.9} ${t.y - 26 + t.h} Q 176 ${t.y - 18 + t.h} ${120 + i * 1.1} ${t.y + t.h} Z`}
                fill="url(#ps-c3-tape)"
              />
              <path
                className="ps-c3-tape-hi"
                d={`M${120 + i * 1.1} ${t.y} Q 176 ${t.y - 18} ${234 - i * 0.9} ${t.y - 26}`}
              />
            </g>
          ))}
        </g>

        {/* ── THE SHOOTS. Proof the graft TOOK — new growth fed by old roots.
              Two branches, geometric leaf blades. ── */}
        <g className="ps-c3-shoots">
          <path className="ps-c3-shoot" d="M176 124 C170 100 156 84 140 68" />
          <path className="ps-c3-shoot" d="M186 122 C196 100 210 88 226 76" />
          {C3_LEAVES.map((lf, i) => (
            /* TWO NESTED GROUPS, DELIBERATELY. A CSS `transform` on an SVG
               element REPLACES its `transform` attribute rather than composing
               with it — putting the reveal's scale() on the same <g> that
               carries translate/rotate silently threw every leaf to the SVG
               origin and out of frame. The outer <g> owns placement as an
               attribute; the inner one owns the animated scale in CSS. */
            <g
              key={`${lf.ax}-${lf.ay}`}
              transform={`translate(${lf.ax} ${lf.ay}) rotate(${lf.a})`}
            >
              <g className="ps-c3-leafgrp" style={{ "--i": i } as React.CSSProperties}>
                {/* the stem. Without it the blade floats free of the branch. */}
                <path className="ps-c3-stem" d={`M0 0 L ${lf.l * 0.3} 0`} />
                <path
                  className="ps-c3-leaf"
                  d={c3Leaf(lf.l)}
                  transform={`translate(${lf.l * 0.3} 0)`}
                />
              </g>
            </g>
          ))}
        </g>
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
