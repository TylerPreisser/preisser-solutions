"use client";

/**
 * card-visuals.tsx
 *
 * THIS MODULE SHIPS. It is imported at service-pillars.tsx and five of its
 * exports render the homepage bento grid; deleting it breaks the build. It is
 * also the shelf for two visuals with no current card (see RevenueVisual and
 * CustomBuildVisual below) — kept, unused, on purpose, not dead code.
 *
 * RENAMED 2026-09-09 from `card-visuals-backup.tsx`. The old name said
 * "backup" and the file was live, which is why its header carried a
 * "NAME IS WRONG, FILE IS LIVE" warning for months. The rename is that
 * warning being retired. It now pairs with its stylesheet, card-visuals.css.
 * Any citation elsewhere in the tree of the form `card-visuals-backup.tsx:NNN`
 * predates the rename; the DECISIONS/ ADRs deliberately still carry the old
 * name because they are dated historical records.
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
// Card 2's braided-river geometry. Generated at BUILD time by a seeded PRNG
// (proto-lead/gen.mjs) and shipped as static literals, so nothing in this
// module calls Math.random() during render — that would desync SSR hydration.
import {
  C2_VIEWBOX,
  C2_ENVELOPE,
  C2_BANK_SHADOW,
  C2_BANK_LIT,
  C2_BARS,
  C2_TERRACES,
  C2_SCOURS,
} from "./c2-braided-paths";

/* ─────────────────────────────────────────────────────────────
   VISUAL 1 — Websites & Applications
   Browser chrome + real iPhone mockup, both vertically centered
   ───────────────────────────────────────────────────────────── */
export function WebsiteVisual() {
  return (
    <div className="ps-visual-website" aria-hidden="true">
      {/* LEFT: Browser window.

          `ps-rv-i` + `--i: 0` opt this element into the shared bento
          interior reveal (card-visuals.css, the `ps-rv-*` block at the
          foot of that sheet; spec teams/B/B3-interior-choreography.md
          section 3.3). Card 4 is the only card with a genuine ordering --
          the site loads in the browser, THEN the phone arrives in front
          of it -- so it is the only card that gets one. The step is
          `--rv-step: 300ms` on `.ps-visual-website`, not the 70ms
          default, because these two boxes OVERLAP at every width; see
          that CSS comment for the measurement. */}
      <div
        className="ps-wb-browser ps-rv-i"
        style={{ "--i": 0 } as React.CSSProperties}
      >
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

      {/* RIGHT: iPhone 15 Pro mockup — clean rebuild, no artifacts.

          `--i: 1` so it arrives 300ms after the browser. The entrance
          lifts this element with the `translate` property, NOT
          `transform`, precisely because this element already owns
          `transform: rotate(5deg)` (card-visuals.css:87) and a hover
          `rotate(5deg) translateY(-6px)` (:92) -- a transform-based
          entrance would have deleted the tilt and fought the hover. */}
      <div
        className="ps-phone ps-rv-i"
        style={{ "--i": 1 } as React.CSSProperties}
      >
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
   SearchVisual (card-visuals.tsx:1003-1030) so the three rebuilt
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

   A grafted stem drawn as a FLAT GRAPHIC, not as a photograph. An old
   rootstock rises from the bottom edge and is cut on a long diagonal; a
   paler scion is set on that cut and carries on upward; the contact line
   between them is lit; three binding straps hold the union; new leaves come
   off the scion's own sides.

   WHY IT IS FLAT, AND THIS IS THE WHOLE POINT OF THIS VERSION.
   This card was drawn SEVEN times as a dimensional object and misread every
   single time — rocket, lighthouse, zipper, zipper, ribbed hose, chimney,
   vase. Every one of those is a misread of a ROUND THING FAKED IN SVG. The
   two cards on this page that succeeded both chose natively flat subjects (a
   river seen from the air; a field of marks around a disc), where flatness is
   the correct treatment rather than a compromise.
   So this version stops simulating round wood. No cylinder gradients, no
   specular ridges, no fake bark relief. Flat silhouettes, one accent, and the
   shapes doing the work — the way a woodcut or a botanical plate does it.
   There is no dimensional object here to misread.

   WHY IT MEANS "AI INTEGRATION". The old plant keeps its roots and its whole
   history and the new growth is genuinely fed by them; the join is a callus,
   not a bracket. AI built INTO the system a business already runs, rather
   than bolted on beside it.

   THE STILL IS THE DELIVERABLE. Two woods of different colour and width, a
   lit contact line and a bound union — all readable with no motion at all.

   VALUE IS GUARANTEED, NOT ASSUMED. A previous version's rootstock vanished
   at 768 and 390 — near-black on near-black in dark theme and near-white on
   near-white in light. Flat fills make that measurable and fixable: the stock
   holds a deliberate step against the card ground in BOTH themes, and it is
   verified by sampling pixels rather than by looking.

   NO Math.random ANYWHERE. Server-rendered; every strap and leaf is a literal.
   ───────────────────────────────────────────────────────────── */

/* Binding straps across the union. Flat bars, no highlight — the tape is the
   least meaningful thing on the card and an earlier version let it become the
   loudest object on it. */
const C3_STRAPS = [
  { y: 288, h: 7 }, { y: 305, h: 7 },
] as const;

/* Leaves, as flat blades on their own short stems, coming off the SCION's
   sides. `ax/ay` is where the stem leaves the stem, `a` the blade angle,
   `l` its length. */
const C3_LEAVES = [
  { ax: 181, ay: 158, a: -142, l: 42 }, { ax: 158, ay: 120, a: -163, l: 31 },
  { ax: 213, ay: 152, a: -101, l: 27 }, { ax: 211, ay: 96, a: -68, l: 36 },
  { ax: 251, ay: 158, a: 38, l: 45 }, { ax: 273, ay: 118, a: 16, l: 33 },
] as const;

/* A leaf blade: two symmetric arcs meeting at a point at each end. */
function c3Leaf(l: number) {
  const b = l * 0.3;
  return `M0 0 Q ${l * 0.44} ${-b} ${l} 0 Q ${l * 0.44} ${b} 0 0 Z`;
}

/* Card 3's OWN reveal hook. Deliberately NOT the shared `useRevealOnce`.

   THE BUG IN THE SHARED HOOK: its 1200ms failsafe fires whether or not the
   card is on screen. This card sits below the fold, so the whole reveal ran
   on a timer at page load and had already locked before anyone scrolled to
   it — correct choreography, permanently invisible.

   THE SHARED HOOK IS NOT MODIFIED; cards 2 and 5 depend on it. Card 3 keeps
   its own copy, with a viewport-CONDITIONAL net: simply lengthening a bare
   timeout would move the same bug later rather than remove it. */
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
    /* After the delay this reveals ONLY IF the element is actually on screen,
       and otherwise re-checks. It still cannot strand the artwork invisible if
       the observer never fires, and it cannot spend the entrance unwatched. */
    const failsafe = window.setTimeout(() => {
      settle();
      if (!el.classList.contains("in-view")) poll = window.setInterval(settle, 400);
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
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Every id ps-c3- prefixed — five inline SVGs share this page and a
              defs collision is SILENT. */}

          {/* ONE LIGHT, in USER SPACE, spanning the whole drawing. Each set
              below samples this same coordinate space, so a strap near the top
              and a strap near the bottom take different values from the SAME
              lamp. With the default objectBoundingBox units each shape would
              instead get its own identical copy and the set would read as
              stamped repeats — the mechanical cause of "barrel hoops" and
              "flat mint lozenges". DO NOT drop userSpaceOnUse from these. */}
          <linearGradient id="ps-c3-stockgrad" gradientUnits="userSpaceOnUse" x1="120" y1="250" x2="300" y2="470">
            <stop offset="0%" className="ps-c3-s-stk0" />
            <stop offset="100%" className="ps-c3-s-stk1" />
          </linearGradient>
          <linearGradient id="ps-c3-sciongrad" gradientUnits="userSpaceOnUse" x1="160" y1="70" x2="270" y2="300">
            <stop offset="0%" className="ps-c3-s-scn0" />
            <stop offset="100%" className="ps-c3-s-scn1" />
          </linearGradient>
          <linearGradient id="ps-c3-strapgrad" gradientUnits="userSpaceOnUse" x1="130" y1="255" x2="290" y2="360">
            <stop offset="0%" className="ps-c3-s-stp0" />
            <stop offset="100%" className="ps-c3-s-stp1" />
          </linearGradient>
          <linearGradient id="ps-c3-leafgrad" gradientUnits="userSpaceOnUse" x1="130" y1="70" x2="300" y2="240">
            <stop offset="0%" className="ps-c3-s-lf0" />
            <stop offset="100%" className="ps-c3-s-lf1" />
          </linearGradient>

          <filter id="ps-c3-glow" x="-140%" y="-600%" width="380%" height="1300%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* ── THE ROOTSTOCK. One flat silhouette, running off the bottom edge
              and cut on a long diagonal. No gradient: this is the version that
              stopped pretending to be round. ── */}
        <path
          className="ps-c3-stock"
          d="M138 470 L146 296 L268 262 L276 470 Z"
        />

        {/* ── THE SCION. Narrower and paler, set on the diagonal and carrying
              on upward. Different WIDTH and different VALUE — that is what
              makes two members read as two. ── */}
        <path
          className="ps-c3-scion"
          d="M186 292 L246 272 L238 198 L196 202 Z"
        />

        {/* ── THE CONTACT LINE. The idea of the card, and the brightest thing
              on it. Everything else is subordinate to this. ── */}
        <g className="ps-c3-join">
          <path className="ps-c3-cambium-glow" d="M144 300 L270 264" filter="url(#ps-c3-glow)" />
          <path className="ps-c3-cambium" d="M144 300 L270 264" />
        </g>

        {/* ── THE BINDING. Flat bars, quiet on purpose. ── */}
        <g className="ps-c3-straps">
          {C3_STRAPS.map((t, i) => (
            <path
              key={t.y}
              className="ps-c3-strap"
              style={{ "--i": i } as React.CSSProperties}
              d={`M${140 + i * 1.6} ${t.y} L${272 - i * 1.4} ${t.y - 30} L${272 - i * 1.4} ${t.y - 30 + t.h} L${140 + i * 1.6} ${t.y + t.h} Z`}
            />
          ))}
        </g>

        {/* ── THE FORK. Three stems out of the scion's head. A branching top
              is the one silhouette that cannot be read as an obelisk, and
              nineteen versions of a straight tapering top were read as one
              eight times running. ── */}
        <g className="ps-c3-fork">
          <path className="ps-c3-stem-main" d="M204 206 C192 176 168 142 142 98" />
          <path className="ps-c3-stem-main" d="M215 204 C215 170 212 130 210 68" />
          <path className="ps-c3-stem-main" d="M228 202 C242 176 266 140 290 94" />
        </g>

        {/* ── NEW GROWTH, at NODES on those stems. Proof the graft took. ── */}
        <g className="ps-c3-leaves">
          {C3_LEAVES.map((lf, i) => (
            /* TWO NESTED GROUPS: a CSS `transform` on an SVG element REPLACES
               its `transform` attribute rather than composing with it, so
               placement and the animated scale cannot live on the same node —
               they silently collapse to the SVG origin if they do. */
            <g key={`${lf.ax}-${lf.ay}`} transform={`translate(${lf.ax} ${lf.ay}) rotate(${lf.a})`}>
              <g className="ps-c3-leafgrp" style={{ "--i": i } as React.CSSProperties}>
                <path className="ps-c3-stem" d={`M0 0 L ${lf.l * 0.26} 0`} />
                <path className="ps-c3-leaf" d={c3Leaf(lf.l)} transform={`translate(${lf.l * 0.26} 0)`} />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 2 — Business Automation.  "Braided river."

   Pain, service-pillars.tsx:240 (`painPoints[1]`, selected `hookIndex: 1`):
     "We're still copying data between systems by hand."

   THE IMAGE. An aerial river delta. Twenty-odd threads of water enter at the
   left, wander, split and rejoin, and consolidate rightward into ONE broad
   channel that leaves the frame carrying everything. The land between is
   navy, terraced with silt and scarred by channels the river has abandoned.

   THE IDEA. Twenty messy manual paths, each one somebody's undocumented
   habit, resolve into a single channel that carries all of it.

   WHY IT IS BUILT THIS WAY — the failure that produced this rebuild.
   Three previous attempts drew the UI of an automation tool: browser chrome,
   step rows on a spine, status chips, grey placeholder bars. The owner's
   verdict was that they imaged a webpage rather than the title. So this card
   contains no rectangle, no right angle, no straight line, no text and no
   numeral. It is a landscape.

   AND THE FAILURE INSIDE THE REBUILD, which matters more. The first pass drew
   ~20 independent ribbons that CROSSED OVER one another. That reads as cable,
   not water, because crossing is what cable does and merging is what water
   does. A braided river seen from the air is ONE connected wet region with
   elongated bars standing in it. So the geometry here is a single wet
   envelope — wide and ragged upstream, one clean channel downstream — with
   lens-shaped bars punched out of it. Dense bars upstream read as many
   threads; their absence downstream reads as one channel. The convergence is
   a property of the geometry rather than something choreographed, and nothing
   can ever cross, because nothing is a separate ribbon.

   SSR. Every path is a STATIC literal in `./c2-braided-paths`, generated at
   build time by a seeded PRNG. Nothing here calls Math.random() during
   render, which would desync server and client in this app.

   MOTION. Zero @keyframes, by contract — the two cards the owner keeps have
   none. One transform transition on a wash mask fills the river once, left to
   right, and stops. It never loops.
   ───────────────────────────────────────────────────────────── */

/* CARD-SCOPED REVEAL GATE.  Deliberately NOT `useRevealOnce`.

   The shared hook's 1200ms failsafe fires whether or not the card is on
   screen, so on a page where this section sits below the fold the whole
   reveal completes before anyone scrolls to it — correct choreography,
   never seen. That is a nuisance for a card whose motion is decoration; it
   is fatal for THIS one, whose entire idea is a wash filling left to right,
   many threads becoming one. A visitor arriving after the failsafe sees only
   the settled still — which is exactly the frame reviewers kept reading as
   "a lake".

   So: same contract, same `.in-view` class, threshold raised to 0.3, and the
   safety net moved out to 8s — long enough that it is a genuine last resort
   rather than a timer that beats the scroll. `useRevealOnce` is untouched:
   cards 1, 3 and 5 depend on it and three teams are in this file. */
function usePsC2Reveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion short-circuits to the finished frame before the observer
    // is ever built, so the art is never left invisible.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

    /* THE FAILSAFE MUST BE GATED ON VISIBILITY, NOT ONLY ON TIME.
       A bare timer — at 1200ms or at 8000ms — does not remove the failure, it
       schedules it. A visitor reading the hero, on a slow connection, or on a
       phone where this section sits further down, arrives after it has fired
       and meets the settled still. That is the entire defect, just later.

       So: after the delay, reveal ONLY if the card is actually on screen, and
       otherwise keep looking every 400ms. It still cannot leave the artwork
       permanently invisible if the observer never works — which is the only
       thing a failsafe owes us — but it also cannot spend the entrance on an
       empty room. This card's entrance IS its argument: a wash filling left to
       right, many threads becoming one. Burning it unwatched loses the idea. */
    let poll = 0;
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    const settle = () => {
      if (el.classList.contains("in-view")) return;
      if (onScreen()) {
        el.classList.add("in-view");
        observer.disconnect();
        return;
      }
      poll = window.setTimeout(settle, 400);
    };
    const failsafe = window.setTimeout(settle, 8000);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(poll);
      observer.disconnect();
    };
  }, []);

  return ref;
}

export function SystemFixesVisual() {
  const containerRef = usePsC2Reveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-c2-root" aria-hidden="true">
      <svg
        className="ps-c2-svg"
        viewBox={C2_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          {/* Every id is namespaced `ps-c2-*`: five inline SVGs land on this
              page and id collisions across them are SILENT. */}
          <linearGradient id="ps-c2-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="ps-c2-land-a" />
            <stop offset="1" className="ps-c2-land-b" />
          </linearGradient>

          {/* The water gains colour downstream, so the single channel is the
              most saturated thing in the frame. That is the whole argument. */}
          <linearGradient id="ps-c2-water" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" className="ps-c2-water-a" />
            <stop offset="1" className="ps-c2-water-b" />
          </linearGradient>

          <linearGradient id="ps-c2-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="ps-c2-bar-a" />
            <stop offset="1" className="ps-c2-bar-b" />
          </linearGradient>

          {/* THE WASH. A hard-edged mask rect translated ONCE across the
              frame. Transition on transform — no keyframes, no loop. */}
          <mask id="ps-c2-wash" maskUnits="userSpaceOnUse" x="-40" y="-40" width="560" height="540">
            <rect
              className="ps-c2-wash-rect"
              x="-520" y="-60" width="520" height="580"
              fill="#fff"
            />
          </mask>
        </defs>

        {/* THE LAND — carries all the texture. Rivers do not emit light, so
            the terrain holds the tonal variation and the water stays flat. */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#ps-c2-land)" />

        <g className="ps-c2-terraces">
          {C2_TERRACES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* Abandoned channels. Each carries its OWN stroke width — they were
            all exactly 1.1px, and at that width a round cap is visually
            identical to a blunt one, so every line simply stopped. */}
        <g className="ps-c2-scours">
          {C2_SCOURS.map(([d, w], i) => (
            <path key={i} d={d} strokeWidth={w} />
          ))}
        </g>

        {/* THE CARVE. Shadow below the wet edge and a lit lip above it, so the
            water reads as cut INTO the terrain instead of painted on top. */}
        <path className="ps-c2-bank-shadow" d={C2_BANK_SHADOW} />
        <path className="ps-c2-bank-lit" d={C2_BANK_LIT} />

        {/* THE WATER, revealed once by the wash. */}
        <g mask="url(#ps-c2-wash)">
          <path className="ps-c2-water" d={C2_ENVELOPE} fill="url(#ps-c2-water)" />

          {/* THE BARS — land standing in the water. Each casts into the
              river first, or in light mode they sit at the land's value and
              the braid dissolves into a pale wash. */}
          <g className="ps-c2-bar-shadow">
            {C2_BARS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          <g className="ps-c2-bars" fill="url(#ps-c2-bar)">
            {C2_BARS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </g>
      </svg>

      {/* FOOT VEIL. The artwork is full-bleed, so the card's own title and cue
          sit ON it. Measured worst-pixel: that darkened the cue's background
          from rgb(233,236,240) on a contained card to rgb(218,227,237) here,
          taking it from 4.74:1 to 4.33:1 — under the 4.5 floor. This ramps the
          foot of the artwork back toward the card's ground colour.

          It lives in CSS, anchored to the ELEMENT's bottom, not in the SVG:
          `xMidYMid slice` crops the viewBox vertically at wide breakpoints
          (at 600px the scaled height is 539 into a 432 box), so a veil placed
          in viewBox coordinates would be cropped away exactly where it is
          needed. Card-scoped by design — `.ps-bento-card__text`'s own scrim is
          shared by all five cards and three teams are editing it. */}
      <i className="ps-c2-veil" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 1 — Business Software.  "THE KEYSTONE."

   Pain, service-pillars.tsx:148 (`painPoints[1]`, selected `hookIndex: 1`):
     "Our data lives in five different places and nobody has a complete picture."

   Subject: a wall with an arched opening cut through it. Eleven voussoirs of
   UNEQUAL width ring the opening; one lit keystone sits at the crown; a dark
   passage runs through. An arch is many separate parts that cannot stand
   alone, and the keystone is the piece that locks them into one structure that
   carries load. That is what an operations platform does to a business.

   WHY NOT A UI. Three previous versions drew a browser — chrome, a URL bar,
   tabs, rows of grey placeholder pills — and read as the LOADING STATE of card
   4 below them. This is deliberately a different family of image.

   ── THREE MISREADS THIS GEOMETRY EXISTS TO DEFEAT, all found by rendering ──
   1. A toothed disc reads as a GEAR. Four renders died on it. No wheel.
   2. An arc of EQUAL segments with one highlighted reads as a PROGRESS RING.
      Defeated by unequal voussoir widths plus the coursing behind the ring.
   3. THE ONE THAT NEARLY SHIPPED: dark voussoirs on a pale wall read as a
      HALF-DONUT CHART pasted onto brick. The fix is material, not shape — the
      voussoirs are cut from the SAME STONE as the wall, a little lighter
      because their faces catch the light. An arch is MADE OF the wall it sits
      in. If it ever reads as a chart again, that relationship has drifted.

   ── THE THEME RULE ──
   THE VOID CARRIES THE DARK MASS; THE STONE CARRIES THE THEME.
   The passage is dark in both themes because a void is dark. Everything else
   is stone and follows the theme. An earlier build made the ring near-black in
   light mode and it became roughly twice the visual weight of any other card
   in the row — the inverse of the white-slab failure it was fixing.

   ── WHY NOT `useRevealOnce` ──
   That shared hook (tsx:159) carries a 1200ms failsafe which fires whether or
   not the card is on screen, so the whole choreography completed before a
   visitor ever scrolled to it — measured at 0.21/0.69/0.88/0.96/0.99 mid-fade
   with the section still below the fold. The hook is CORRECT for cards 2 and 3
   and is not modified. This card uses its own observer with a much longer
   safety net so the reveal is actually seen. Nothing is ever left invisible:
   reduced-motion short-circuits, and `@media (scripting: none)` covers no-JS.

   Geometry is fully AUTHORED — no Math.random. This is server-rendered and a
   random value at render time desynchronises server and client markup.
   ───────────────────────────────────────────────────────────── */

/* Ten voussoirs plus the keystone. Widths deliberately unequal so no two
   blocks match. Centre (200,226), inner r=128, outer r=196, 1deg joint.
   `i` is distance from the keystone and drives the reveal stagger. */
const PS_C1_VOUSSOIRS = [
  { d: "M72,224.88L4.01,224.29A196,196 0 0,1 10.58,175.65L76.3,193.12A128,128 0 0,0 72,224.88Z", i: 5 },
  { d: "M76.89,190.97L11.48,172.35A196,196 0 0,1 38.03,115.64L94.22,153.93A128,128 0 0,0 76.89,190.97Z", i: 4 },
  { d: "M95.49,152.09L39.98,112.83A196,196 0 0,1 67.58,81.49L113.52,131.63A128,128 0 0,0 95.49,152.09Z", i: 3 },
  { d: "M115.18,130.13L70.13,79.2A196,196 0 0,1 117.29,48.31L145.98,109.96A128,128 0 0,0 115.18,130.13Z", i: 2 },
  { d: "M148.02,109.03L120.4,46.89A196,196 0 0,1 164.28,33.28L176.67,100.14A128,128 0 0,0 148.02,109.03Z", i: 1 },
  { d: "M223.33,100.14L235.72,33.28A196,196 0 0,1 279.6,46.89L251.98,109.03A128,128 0 0,0 223.33,100.14Z", i: 1 },
  { d: "M254.02,109.96L282.71,48.31A196,196 0 0,1 329.87,79.2L284.82,130.13A128,128 0 0,0 254.02,109.96Z", i: 2 },
  { d: "M286.48,131.63L332.42,81.49A196,196 0 0,1 360.02,112.83L304.51,152.09A128,128 0 0,0 286.48,131.63Z", i: 3 },
  { d: "M305.78,153.93L361.97,115.64A196,196 0 0,1 388.52,172.35L323.11,190.97A128,128 0 0,0 305.78,153.93Z", i: 4 },
  { d: "M323.7,193.12L389.42,175.65A196,196 0 0,1 395.99,224.29L328,224.88A128,128 0 0,0 323.7,193.12Z", i: 5 },
] as const;

const PS_C1_KEYSTONE =
  "M178.87,99.76L167.65,32.69A196,196 0 0,1 232.35,32.69L221.13,99.76A128,128 0 0,0 178.87,99.76Z";

/* The passage. Ends at y=400 (the viewBox floor) so it is never clipped. */
const PS_C1_OPENING = "M72,400L72,226A128,128 0 0,1 328,226L328,400Z";

/* usePsC1Reveal — card-scoped. See the note above on why the shared hook's
   1200ms failsafe is wrong for this card. Deliberately NOT exported and NOT a
   modification of `useRevealOnce`, which cards 2 and 3 still depend on. */
function usePsC1Reveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

    /* Safety net so the card can never sit permanently blank if the observer
       fails. Long — 8s, not 1.2s — because a short one fires before the
       visitor arrives and spends the whole reveal off-screen, which is the
       exact bug this hook exists to avoid. */
    const failsafe = window.setTimeout(() => {
      el.classList.add("in-view");
      observer.disconnect();
    }, 8000);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return ref;
}

/* SECOND GEOMETRY — the wide/short crop.
   At <=700px the plinth lands on the semicircular arch's springing and what
   remains is a perfect half-disc of near-uniform trapezoids on a baseline,
   which reads as a DIAL whichever part is darker: the driver is geometry plus
   repetition, not value. This elliptical arch raises the springing ABOVE the
   plinth so the opening's straight LEGS are visible, and a portal with legs
   cannot be a half-disc.
   The ellipse necessarily makes the blocks more unequal than the circular set.
   DO NOT NORMALISE THEM BACK. Near-uniform segments are the other half of the
   dial grammar; the unequal widths are load-bearing, not a rendering accident. */
const PS_C1_WIDE_VOUSSOIRS = [
  { d: "M20.01,134.18L-54.99,133.8A255,125 0 0,1 -46.5,103L26,113.24A180,85 0 0,0 20.01,134.18Z", i: 5 },
  { d: "M26.92,111.66L-45.2,100.68A255,125 0 0,1 -10.86,64.7L51.16,87.2A180,85 0 0,0 26.92,111.66Z", i: 4 },
  { d: "M53.13,85.86L-8.07,62.73A255,125 0 0,1 27.56,42.91L78.28,72.38A180,85 0 0,0 53.13,85.86Z", i: 3 },
  { d: "M80.85,71.29L31.2,41.31A255,125 0 0,1 92.19,21.72L123.9,57.97A180,85 0 0,0 80.85,71.29Z", i: 2 },
  { d: "M127.04,57.3L96.64,20.73A255,125 0 0,1 153.31,12.11L167.04,51.44A180,85 0 0,0 127.04,57.3Z", i: 1 },
  { d: "M232.96,51.44L246.69,12.11A255,125 0 0,1 303.36,20.73L272.96,57.3A180,85 0 0,0 232.96,51.44Z", i: 1 },
  { d: "M276.1,57.97L307.81,21.72A255,125 0 0,1 368.8,41.31L319.15,71.29A180,85 0 0,0 276.1,57.97Z", i: 2 },
  { d: "M321.72,72.38L372.44,42.91A255,125 0 0,1 408.07,62.73L346.87,85.86A180,85 0 0,0 321.72,72.38Z", i: 3 },
  { d: "M348.84,87.2L410.86,64.7A255,125 0 0,1 445.2,100.68L373.08,111.66A180,85 0 0,0 348.84,87.2Z", i: 4 },
  { d: "M374,113.24L446.5,103A255,125 0 0,1 454.99,133.8L379.99,134.18A180,85 0 0,0 374,113.24Z", i: 5 },
] as const;
const PS_C1_WIDE_KEYSTONE =
  "M170.45,51.15L158.13,11.7A255,125 0 0,1 241.87,11.7L229.55,51.15A180,85 0 0,0 170.45,51.15Z";
const PS_C1_WIDE_OPENING = "M20,400L20,135A180,85 0 0,1 380,135L380,400Z";

export function DashboardVisual() {
  const containerRef = usePsC1Reveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-c1-root" aria-hidden="true">
      {/* The wall is a CSS layer, not an SVG rect: it is always full-bleed at
          every aspect, and its coursing is abstract stratification rather than
          literal brickwork. The SVG can then use `meet`, so the arch — and
          above all the keystone — is NEVER cropped at any breakpoint. An
          earlier `slice` build sliced the keystone off at 600px, cutting the
          one element the whole concept depends on. */}
      <div className="ps-c1-wall" />

      <svg
        className="ps-c1-svg"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMin slice"
        focusable="false"
      >
        <defs>
          {/* Every id namespaced: five inline SVGs share this page and a
              duplicate defs id resolves to the wrong gradient silently. */}
          {/* userSpaceOnUse, NOT the default objectBoundingBox. With bounding-box
              units every voussoir gets its own identical copy of the gradient,
              so eleven blocks render as eleven IDENTICAL segments — which is
              the visual grammar of a progress ring, and this card has degraded
              into a gauge three separate times. Spanning the gradient across
              the whole arch in user space instead means one light direction
              falls over the entire ring: the left blocks sit in shade, the
              right blocks catch the light. That reads as one lit object rather
              than a repeated UI element, and it is the cheapest structural
              defence against the gauge misread. */}
          <linearGradient
            id="ps-c1-stone"
            gradientUnits="userSpaceOnUse"
            x1="20" y1="40" x2="380" y2="250"
          >
            <stop offset="0%" className="ps-c1-stone-a" />
            <stop offset="55%" className="ps-c1-stone-mid" />
            <stop offset="100%" className="ps-c1-stone-b" />
          </linearGradient>
          {/* VERTICAL, and this is the difference between a passage and a slab.
              A flat mid-tone fill bounded by an equally crisp edge on every
              side reads as a solid object standing IN FRONT of the wall — and
              with the plinth beneath it, as a headstone. Grading the value
              down the opening (darkest at the crown where no light reaches,
              lifting toward the floor) reads as depth, so the eye travels
              THROUGH rather than stopping on a surface. userSpaceOnUse so the
              ramp is measured in the arch's own coordinates, not the path's
              bounding box. */}
          <linearGradient
            id="ps-c1-beyond"
            gradientUnits="userSpaceOnUse"
            x1="200" y1="98" x2="200" y2="400"
          >
            <stop offset="0%" className="ps-c1-beyond-a" />
            <stop offset="100%" className="ps-c1-beyond-b" />
          </linearGradient>
          <linearGradient id="ps-c1-key" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#4FA8FF" />
            <stop offset="60%" stopColor="#1590FF" />
            <stop offset="100%" stopColor="#0B5FB8" />
          </linearGradient>
          <filter id="ps-c1-keyglow" x="-160%" y="-160%" width="420%" height="420%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Two arches, one per breakpoint. The hidden variant is display:none
            so it neither paints nor animates. */}
        <g className="ps-c1-arch ps-c1-arch--tall">
        {/* The void: daylight beyond in light, an unlit passage in dark. */}
        <path d={PS_C1_OPENING} fill="url(#ps-c1-beyond)" />

        {/* The ring, cut from the same stone as the wall. */}
        <g className="ps-c1-ring">
          {PS_C1_VOUSSOIRS.map((b, n) => (
            <path
              key={n}
              className="ps-c1-vou"
              style={{ "--i": b.i } as React.CSSProperties}
              d={b.d}
              fill="url(#ps-c1-stone)"
            />
          ))}
        </g>

        {/* The keystone drops in last and locks the arch. */}
        <g className="ps-c1-key">
          <path d={PS_C1_KEYSTONE} fill="#1590FF" filter="url(#ps-c1-keyglow)" opacity="0.3" />
          <path d={PS_C1_KEYSTONE} fill="url(#ps-c1-key)" />
        </g>
        </g>

        <g className="ps-c1-arch ps-c1-arch--wide">
          <path d={PS_C1_WIDE_OPENING} fill="url(#ps-c1-beyond)" />
          {PS_C1_WIDE_VOUSSOIRS.map((b, n) => (
            <path
              key={n}
              className="ps-c1-vou"
              style={{ "--i": b.i } as React.CSSProperties}
              d={b.d}
              fill="url(#ps-c1-stone)"
            />
          ))}
          <g className="ps-c1-key">
            <path d={PS_C1_WIDE_KEYSTONE} fill="#1590FF" filter="url(#ps-c1-keyglow)" opacity="0.3" />
            <path d={PS_C1_WIDE_KEYSTONE} fill="url(#ps-c1-key)" />
          </g>
        </g>
      </svg>

      {/* The plinth the wall stands on. Architectural, not a mask: a solid base
          course with a crisp top edge, so the arch's legs terminate ON
          something. It replaces a grey-to-white gradient wash that dissolved
          the legs into nothing and read as an unfinished mask at 600px. It is
          also what keeps the title legible over the artwork — see the measured
          contrast note in card-visuals.css. */}
      <div className="ps-c1-plinth" />
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
     WebsiteVisual already uses (card-visuals.tsx:33).
   - There is NO rank-rise animation and NO position numbers. A #3
     row climbing to #1 is an outcome claim drawn as artwork, which
     is the same trap RevenueVisual falls into. The only motion is
     the citation chip arriving, which illustrates the capability
     ("get cited") without asserting a result.
   ───────────────────────────────────────────────────────────── */
/* ═════════════════════════════════════════════════════════════
   CARD 5 — "AI AND SEARCH ENGINE VISIBILITY."
   FILINGS HALO.

   WHAT THIS DRAWS, and why it is not the thing that was rejected
   three times: a dense field of iron filings, every one of them turned
   to point at a single lit mark at the centre. EVERYTHING IS POINTING
   AT YOU. That is what being found looks like.

   THE CENTRE IS OCCUPIED, AND THAT REVERSES THE ORIGINAL BRIEF.
   This card was first built with the focal point drawn as *nothing* —
   an empty void the field organised itself around. It was elegant and
   it failed, for a reason worth keeping on the record. The business
   review, judging from renders: "the argument that the void means 'the
   thing everyone points at' is a paragraph of explanation, and a
   homepage visitor gets two seconds, not a paragraph. ABSENCE READS AS
   ABSENCE. A firm charging real money to get you found should not
   illustrate that service with a hole." In the five-card row it was the
   only card showing nothing, and read as the box that ran out of ideas.

   So the void got an occupant: one bright mark the whole field bends
   toward, standing for the client's business. Same field, same craft,
   legible claim. Do not empty it again.

   Also gone: a soft radial bloom that sat on the centre in v1. It made
   the pole the brightest thing on the card by accident rather than by
   decision. The solid mark now does that job deliberately.

   The previous occupant of this component was a SERP mockup — search
   box, "AI Overview" block, result rows, an Ad chip, map pins. Its CSS
   (`.ps-sr-*`, card-visuals.css:1844+) is deliberately LEFT IN PLACE
   and simply no longer rendered; three teams are editing that
   stylesheet concurrently and a single cleanup sweep happens at the
   end, owned by the coordinator. Do not strip it here.
   ───────────────────────────────────────────────────────────── */

/* Deterministic PRNG (mulberry32). This MUST NOT be Math.random().
   The component is server-rendered by Next.js, and a field generated
   with different numbers on the server than in the browser is a React
   hydration mismatch — which produces no error in dev and a differently
   drawn graphic on every request in production. Seeded once at module
   scope so both sides emit byte-identical markup. */
function psC5Rng(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Drawn at 360x240 (1.50), which is the measured desktop safe-paint
   aspect (376x259 = 1.45). preserveAspectRatio keeps it centred and
   uncropped as the card swings 1.12 -> 2.99 across breakpoints, so the
   composition never bleeds to an edge — the edges move. */
const PS_C5_W = 360;
const PS_C5_H = 320;

type PsC5Dash = {
  x: number;
  y: number;
  w: number;
  h: number;
  r0: number;
  r1: number;
  o: number;
  t: number;
  i: number;
};

const PS_C5_DASHES: PsC5Dash[] = (() => {
  const rand = psC5Rng(20260907);
  const out: PsC5Dash[] = [];
  /* DELIBERATELY LARGER THAN THE 360x240 viewBox (half-extents 180x120).
     The field is generated well beyond the frame so dashes run OFF all
     four sides. A field that stops inside the frame with a tidy margin
     reads as a decal or a logo; card 4 fills its box and lets its phone
     overhang the edge. Combined with preserveAspectRatio="slice" below,
     the picture always covers the card edge-to-edge. */
  const RX = 215;
  const RY = 190;
  const RINGS = 13;
  /* The void. Small and precise — "a small clean void the arcs bend
     around". v2 had this at 0.21 and the empty middle read as a hole in
     the picture rather than as a point everything is organised about. */
  const INNER = 0.085;

  for (let ring = 0; ring < RINGS; ring++) {
    const f = INNER + (1 - INNER) * (ring / (RINGS - 1));
    /* Density rises with radius so the field reads as an even mass
       rather than a bullseye. v1 used 220 dashes over this area and
       looked timid and washy; this is ~460. */
    const count = Math.round(10 + 44 * f);
    for (let k = 0; k < count; k++) {
      /* HEAVY jitter, on purpose. With tight jitter the rings stayed
         visible as concentric ridges and the whole thing read as a
         FINGERPRINT — whorled ridges around a centre. Scattering the
         radius hard breaks the ridge regularity so it reads as a
         settled field of loose filings instead of a printed whorl. */
      const step = (Math.PI * 2) / count;
      const a = k * step + (rand() - 0.5) * step * 1.25;
      const jr = 1 + (rand() - 0.5) * 0.26;
      const x = Math.cos(a) * RX * f * jr;
      const y = Math.sin(a) * RY * f * jr;
      const r2 = x * x + y * y;
      if (r2 < 1) continue;

      /* RADIAL CONVERGENCE on one marked point.

         Two earlier geometries were built and both were rejected from
         renders, for reasons worth keeping:

         - A true magnetic DIPOLE (Bx = 3xy/r^2, By = 3y^2/r^2 - 1).
           Physically correct and beautiful, but a dipole has TWO lobes,
           so the picture had two focal points. This card is about ONE
           thing.
         - A tangential VORTEX (tangent leaned 22 degrees inward). Read
           as a whirlpool by one reviewer and a fingerprint by two others
           — and, fatally, concentric rotation means things are pulled IN
           AND SWALLOWED. That is the opposite of the metaphor. Rotation
           reads as a drain; convergence reads as being found.

         So the dashes now lie ALONG the radius, leaned only 12 degrees
         so the field breathes rather than snapping into a rigid
         starburst. Everything in the picture points at one place, and
         that place is occupied and lit. "Everything turned toward you"
         is the sentence the card has to say. */
      const r1 = (Math.atan2(y, x) * 180) / Math.PI + 12;

      /* Softer falloff than v1, which faded the outer sixth of the
         field to literally zero and threw away the frame. The field
         now thins toward the edge but never disappears mid-picture. */
      let o = 1 - 0.22 * f;
      if (f > 0.88) o *= Math.max(0.48, 1 - (f - 0.88) / 0.24);

      /* LENGTH TAPERS WITH RADIUS, and the direction of the taper is the
         whole argument of the picture.

         Uniform-length dashes read as a BURST radiating outward — a
         starburst, a dandelion clock, fireworks — because nothing tells
         the eye which way the flow goes. That is the opposite claim from
         the one this card makes.

         So: LONG and FAINT at the rim, SHORT and DENSE toward the centre.
         That is what a converging flow looks like — marks compressing as
         they arrive, the way motion trails shorten when something slows
         into a stop. The still image now states "everything is pointing
         at you" on its own, without the animation. That matters: a
         screenshot, a slow connection and `prefers-reduced-motion` all
         get the still and nothing else.

         The random component stays, because identical marks in even arcs
         are exactly what a printed fingerprint ridge looks like. */
      const w = +((2.6 + 6.0 * f) * (0.82 + rand() * 0.42)).toFixed(2);
      const h = +(1.7 + rand() * 0.9).toFixed(2);

      /* Colour tier: blue lives near the pole ONLY, outer field stays
         navy. Mass first, chroma second — card 4 is well under 5%
         strongly-coloured and all of it is point chroma. */
      const t = f < 0.34 ? 3 : f < 0.52 ? 2 : f < 0.74 ? 1 : 0;

      /* Stagger band, centre outward. Kept to 5 bands so the whole
         reveal resolves by ~1180ms rather than running for 40s, which
         is what a per-element index would do with 460 dashes. */
      const i = Math.min(4, Math.floor((ring * 5) / RINGS));

      out.push({
        x: +(PS_C5_W / 2 + x).toFixed(2),
        y: +(PS_C5_H / 2 + y).toFixed(2),
        w,
        h,
        r0: +(r1 + (rand() * 2 - 1) * 75).toFixed(1),
        r1: +r1.toFixed(1),
        o: +o.toFixed(3),
        t,
        i,
      });
    }
  }
  return out;
})();

/* CARD-SCOPED REVEAL. Deliberately NOT the shared `useRevealOnce`.

   THE BUG IN THE SHARED HOOK, reproduced on this card before it was
   fixed (`c5-tools/revealtiming.js`): its failsafe is an unconditional
   `setTimeout(..., 1200)`, so `.in-view` lands whether or not the card
   is on screen. Card 5 sits in the BOTTOM row. Measured at 1440x900:

     t=400ms   onScreen=false  inView=false  cardTop=1641  dashOpacity=0
     t=1600ms  onScreen=false  inView=TRUE   cardTop=1641  dashOpacity=0
     t=3600ms  onScreen=false  inView=TRUE   cardTop=1641  dashOpacity=0.981
     after scrolling to it:    inView=true                 dashOpacity=0.981

   The choreography ran to completion 1641px below the fold. Every real
   visitor arrived at the settled still, so the reveal had never actually
   been seen. That matters more here than on the other cards, because the
   sequence IS the idea: the field organises, and then the subject
   arrives — the disc lands last, on purpose.

   A viewport sweep cannot catch this. `in-view` is true and nothing is
   permanently invisible; it fires, just in the wrong place.

   THE FIX: the safety net may never pre-fire below the fold. It waits
   8s, then reveals ONLY if the element is actually on screen, and
   otherwise re-checks. So the art can still never be left permanently
   invisible if the observer fails, but it also cannot burn its entrance
   while nobody is looking.

   `useRevealOnce` is NOT modified — cards 2 and 3 depend on it. */
function usePsC5Reveal<T extends HTMLElement>() {
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

    let done = false;
    let timer = 0;

    const show = () => {
      if (done) return;
      done = true;
      el.classList.add("in-view");
      observer.disconnect();
      window.clearTimeout(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    /* Safety net. Long, and gated on actually being visible. */
    const tick = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (r.top < vh && r.bottom > 0) show();
      else timer = window.setTimeout(tick, 400);
    };
    timer = window.setTimeout(tick, 8000);

    return () => {
      done = true;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return ref;
}

export function SearchVisual() {
  const containerRef = usePsC5Reveal<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-c5-root" aria-hidden="true">
      <svg
        className="ps-c5-svg"
        viewBox={`0 0 ${PS_C5_W} ${PS_C5_H}`}
        /* slice, not meet: COVER the box and crop, so the field always
           reaches every edge as the card swings 1.12 -> 2.99. `meet`
           letterboxes and leaves the tidy margin that makes artwork
           read as a decal. */
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* No <defs>: the foot veil that used to live here was an
            SVG-space gradient, and preserveAspectRatio="slice" CROPS IT
            AWAY at wide breakpoints — at 768 the card is 720x380, slice
            scales by 2.0, and only the middle 190 of the 320-unit viewBox
            is visible, so the veil's bottom never painted. It is now a
            CSS ::after anchored to the element's bottom edge in fixed px.
            If anything is added back here, namespace ids `ps-c5-*`. */}
        <g className="ps-c5-field">
          {PS_C5_DASHES.map((d, n) => (
            <rect
              key={`ps-c5-d-${n}`}
              className={`ps-c5-dash ps-c5-dash--t${d.t}`}
              x={d.x - d.w / 2}
              y={d.y - d.h / 2}
              width={d.w}
              height={d.h}
              rx={d.h / 2}
              style={
                {
                  "--c5-r0": `${d.r0}deg`,
                  "--c5-r1": `${d.r1}deg`,
                  "--c5-o": d.o,
                  "--c5-i": d.i,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {/* THE OCCUPANT — variant B.
            The executive review rejected the empty void: "absence reads
            as absence", and on a homepage the viewer has two seconds,
            not a paragraph. This is the client's business: the one lit
            thing the whole field is organised around. It lands LAST in
            the reveal, after the filings have aligned, so the picture
            reads as "everything turned toward you" rather than "here is
            a dot with decoration". */}
        <circle
          className="ps-c5-halo"
          cx={PS_C5_W / 2}
          cy={PS_C5_H / 2}
          r={15}
        />
        <circle
          className="ps-c5-core"
          cx={PS_C5_W / 2}
          cy={PS_C5_H / 2}
          r={7.5}
        />
      </svg>
    </div>
  );
}
