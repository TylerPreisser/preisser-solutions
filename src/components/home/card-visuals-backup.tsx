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
   CARD 3 — AI Integration.  "The page fills the form in by itself."

   Pain, in the owner's own words, service-pillars.tsx:352 (`painPoints[0]`,
   and already the selected `hookIndex: 0` at :349):
     "Someone here retypes the same information off a PDF every single day."

   Subject: a PDF the visitor RECEIVED. Not our assistant, not our chat, not
   our approval queue. The AI is depicted by BEHAVIOUR - the page is read into
   the record, in order, once - never by iconography. No sparkle, no bubble,
   no first-person voice.

   The capture marks are a soft FILL, never an outline. A rectangle outline on
   a document is the universal sign for `flagged`, which is exactly how v3's
   red-bordered block read. A tint behind the bar is the universal sign for
   `highlighted while reading`. Same geometry, opposite meaning.
   ───────────────────────────────────────────────────────────── */

/* Body-bar widths on the received page. Rows 1,2,4,5 are the four that get
   captured, so the marks are not a contiguous block - a reader should see the
   page being read selectively, not a highlighter dragged down it. */
const V4_PAGE_ROWS = [
  { w: "88%", mark: 0 },
  { w: "72%", mark: 1 },
  { w: "54%", mark: -1 },
  { w: "80%", mark: 2 },
  { w: "66%", mark: 3 },
  { w: "44%", mark: -1 },
  { w: "82%", mark: -1 },
  { w: "60%", mark: -1 },
  { w: "76%", mark: -1 },
  { w: "84%", mark: -1 },
  { w: "58%", mark: -1 },
  { w: "70%", mark: -1 },
  { w: "48%", mark: -1 },
  { w: "78%", mark: -1 },
] as const;

export function AutomationVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-v4-root ps-v4-root--read" aria-hidden="true">
      <div className="ps-v4-read">
        {/* LEFT ~54% - the page. Its bottom edge runs off the composition;
            the crop passes through BARS ONLY, never through a glyph. That is
            the rule card 4 obeys and the rule v3's ghost documents broke on
            three separate edges. */}
        <div className="ps-v4-sheets">
          <div className="ps-v4-sheet ps-v4-sheet--back" />
          <div className="ps-v4-sheet">
            <span className="ps-v4-pdf">PDF</span>
            <i className="ps-v4-pbar ps-v4-pbar--head" />
            <i className="ps-v4-pbar ps-v4-pbar--sub" />
            {/* A marked row is a bar INSIDE its highlight, never a bar with a
                highlight positioned near it — sized independently the two drift
                apart the moment the sheet changes width. */}
            {V4_PAGE_ROWS.map((r, i) => (
              <span className="ps-v4-prow" key={i}>
                {r.mark >= 0 ? (
                  <span className="ps-v4-hl" style={{ width: r.w, "--i": r.mark } as React.CSSProperties}>
                    <i className="ps-v4-pbar" />
                  </span>
                ) : (
                  <i className="ps-v4-pbar" style={{ width: r.w }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT ~46% - the record. Asymmetric against the page on purpose so
            this card does not read as card 2 drawn twice. */}
        <div className="ps-v4-panel ps-v4-panel--record">
          <div className="ps-v4-chrome">
            <span className="ps-v4-dots"><i /><i /><i /></span>
            <span className="ps-v4-pill" />
          </div>
          <div className="ps-v4-rows">
            {[0, 1, 2, 3].map((i) => (
              <span className="ps-v4-row" key={i}>
                <i className="ps-v4-label" />
                <i className="ps-v4-slot ps-v4-slot--read"
                   style={{ "--i": i } as React.CSSProperties} />
              </span>
            ))}
          </div>
        </div>
      </div>
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

export function SystemFixesVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

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
