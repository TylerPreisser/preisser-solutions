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
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 2 — AI Integration card face: the DOCKED ASSISTANT

   IDENTITY WARNING, unchanged by this rebuild: this component renders the
   **AI Integration** tile. `variant` does not match `type` — the AI pillar
   is `type: "ai"` with `variant: "automation"`, so its class is
   `.ps-bento-card--automation` (service-pillars.tsx:333-341). The card
   titled "Business Automation" is `SystemFixesVisual` /
   `.ps-bento-card--systems`. Key off the component, never the class name.

   REBUILT 2026-09-06. The thing this replaces was a node-and-edge
   architecture diagram (EMAIL -> EXTRACT -> AI READ, forking to SEND and
   HOLD). Each reason below was read off a render, not inferred:

   1. WRONG ABSTRACTION. Cards 4 and 5 — the two the owner approves of —
      each depict a surface the BUYER USES: a browser window and a phone,
      a Google results page. This depicted an internal topology the buyer
      will never see. It was the only diagram on a grid of pictures, and
      nobody buys a flowchart.
   2. HAIRLINES, NO MASS. 15 SVG nodes at stroke-width 1.1-2 with almost
      no filled area anywhere. WebsiteVisual contains ZERO structural
      strokes and is 100% filled mass. That contrast is the literal source
      of "unsatisfying": there was nothing to look at, only lines to trace.
   3. THE BRAND COLOUR WAS ABSENT and the loudest pixel on the page was a
      saturated amber HOLD branch — a hue that exists nowhere else on the
      site. SearchVisual makes #1590FF do every job.
   4. A PERPETUAL LOOP. `ps-dash-flow 1.4s linear infinite` was the only
      infinite animation in the whole grid. Cards 4/5 settle and stop.
   5. THE PAYOFF WAS A NEGATIVE — "AI PROPOSED · NOT SENT", a dimmed SEND
      branch, "HELD FOR YOU". The climax was that the thing did not happen.

   SUBJECT NOW: your assistant, docked into the screen you already use.
   Plane 1 is your own app — real window chrome, content as grey bars.
   Plane 2 is the assistant panel, tilted 5deg and occluding it, and the
   payoff is the solid brand-blue reply it wrote. One readable string
   ("Assistant"), which is the same budget WebsiteVisual runs on.

   Note the reply bubble carries no text. A bubble you can READ is a claim
   about what the model said; a filled blue mass with two placeholder bars
   is the capability drawn as artwork. Same discipline as SearchVisual's
   "no rank numbers" note at :991.
   ───────────────────────────────────────────────────────────── */
export function AutomationVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-asst-root" aria-hidden="true">
      <div className="ps-asst-stage">
        {/* PLANE 1 — the customer's own screen. Deliberately generic: a
            window, a rail, five content bars. It is the thing being
            integrated INTO, so it must not compete for attention, and it
            must not read as WebsiteVisual's browser (no traffic lights,
            no URL bar, no phone). It runs off the right card edge. */}
        <div className="ps-asst-app">
          {/* Dark chrome strip. Load-bearing, not decoration: the frosted
              .ps-bento-card__expand circle sits at top:16 right:16 z-index 3
              (globals.css:2075) OVER this artwork. Something with contrast
              has to be under it in whichever theme the icon is light. It
              flips with the theme for exactly that reason — see the note at
              card-visuals.css's light-mode block. */}
          <div className="ps-asst-app-chrome">
            <span className="ps-asst-app-dots"><i /><i /><i /></span>
            <span className="ps-asst-app-pill" />
          </div>
          <div className="ps-asst-app-body">
            <span className="ps-asst-app-rail" />
            <span className="ps-asst-app-list">
              {[0, 1, 2, 3, 4].map((r) => (
                <i className="ps-asst-app-item" key={`asst-item-${r}`}>
                  <b className="ps-asst-app-av" />
                  <b className="ps-asst-app-name" />
                  <b className="ps-asst-app-meta" />
                </i>
              ))}
            </span>
          </div>
        </div>

        {/* PLANE 2 — the assistant, docked over plane 1 at 5deg. This is
            the second plane the reference language requires: it OCCLUDES
            the first and carries the deep shadow, the way .ps-phone
            overlaps .ps-wb-browser at card-visuals.css:82-99. 5deg is the
            grid's only rotation angle; do not introduce a second one. */}
        <div className="ps-asst-panel">
          <div className="ps-asst-head">
            <svg className="ps-asst-spark" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5l1.5 4L13.5 7l-4 1.5L8 12.5 6.5 8.5 2.5 7l4-1.5z"
                fill="currentColor"
              />
            </svg>
            <span className="ps-asst-label">Assistant</span>
          </div>

          <div className="ps-asst-thread">
            <span className="ps-asst-bubble" style={{ "--sr-i": 0 } as React.CSSProperties} />
            <span
              className="ps-asst-bubble ps-asst-bubble--short"
              style={{ "--sr-i": 1 } as React.CSSProperties}
            />
            <span
              className="ps-asst-bubble ps-asst-bubble--wide"
              style={{ "--sr-i": 2 } as React.CSSProperties}
            />

            {/* PAYOFF. Solid brand blue, arrives last, scales 0.94 -> 1
                exactly once — the single permitted scale in the language
                (card-visuals.css:3088, .ps-sr-cite). */}
            <span className="ps-asst-reply">
              <i /><i />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 3 — Business Automation card face: the DOCUMENT THAT SENDS ITSELF

   REBUILT 2026-09-06. What this replaces was a timestamped invoice-run
   log. Reasons:

   1. 236 CHARACTERS OF READABLE PROSE — the worst violation in the grid,
      4x SearchVisual's 61. Six timestamped sentences plus AUTO/SENT/YOU/
      QUEUED/CLOSED/PAID and two dollar figures. A changelog, not a
      graphic. It could not be parsed at card scale and could not survive
      a 320px column.
   2. A LIVE BUG. `card-visuals.css:2166` hid `.ps-run-doc` below 1200px
      but left `.ps-run-stamp` visible, so at 1024x768 a green PAID badge
      was stamped onto empty space with nothing under it — reproduced in
      chromium, webkit AND firefox. The payoff object did not exist at the
      width where most tablets sit. Cards 4/5's payoff exists everywhere.
   3. FIVE HUE FAMILIES AND TWO GREENS, including a dark saturated green
      that appears nowhere else on the site. The language permits navy,
      white, three greys, #1590FF and at most three DESATURATED decorative
      accents — and no semantic colour at all.
   4. `rotate(-8deg) scale(1.3) -> scale(1)` on a bounce easing: a stamp
      SLAM, the most violent gesture in the grid, and a second rotation
      angle against WebsiteVisual's single 5deg.
   5. NO ARTWORK HOVER. Both reference cards answer the cursor.

   SUBJECT NOW: the document your business sends, produced and delivered
   without you touching it. Plane 1 is the document itself, cropped by the
   card's right and bottom edges. Plane 2 is the outgoing message, tilted
   5deg over it, and the payoff is its solid brand-blue Send control.

   CLAIMS DISCIPLINE (docs/WRITER-AGENT-PROMPT.md:31): every line item and
   every total is a GREY BAR. There is no currency figure, no quantity, no
   date and no company name anywhere in this card. Two readable strings,
   both chrome: "Invoice" (a document kicker) and "Send" (a button). A
   real number here would be a fabricated outcome drawn as artwork, which
   is the trap RevenueVisual is shelved for.
   ───────────────────────────────────────────────────────────── */
export function SystemFixesVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-doc-root" aria-hidden="true">
      <div className="ps-doc-stage">
        {/* PLANE 1 — the document. Bleeds off the right edge and past the
            bottom of the stage; the crop is designed, not an overflow
            accident. WebsiteVisual does the same thing with its third
            content card and the phone (card-visuals.css:57-63). */}
        <article className="ps-doc-sheet">
          {/* The dark band is both the document's letterhead AND the
              contrast bed for .ps-bento-card__expand. Flips with theme. */}
          <div className="ps-doc-head">
            <span className="ps-doc-mark" />
            <span className="ps-doc-kicker">Invoice</span>
          </div>

          <div className="ps-doc-body">
            <span className="ps-doc-title" />
            <span className="ps-doc-sub" />

            <div className="ps-doc-rows">
              {[0, 1, 2, 3, 4].map((row) => (
                <span
                  className="ps-doc-row"
                  key={`doc-row-${row}`}
                  style={{ "--sr-i": row } as React.CSSProperties}
                >
                  <i className="ps-doc-row-name" />
                  <i className="ps-doc-row-val" />
                </span>
              ))}
            </div>

            <span className="ps-doc-total" style={{ "--sr-i": 5 } as React.CSSProperties}>
              <i className="ps-doc-total-name" />
              <i className="ps-doc-total-val" />
            </span>
          </div>
        </article>

        {/* PLANE 2 — it leaves by itself. Occludes the sheet's lower-left,
            carries the 0 20px 50px rgba(0,0,0,0.6) shadow, tilted 5deg. */}
        <div className="ps-doc-mail">
          <span className="ps-doc-mail-icon">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4.6h12v7.2H2z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M2.4 5L8 9.1 13.6 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="ps-doc-mail-lines">
            <i /><i />
          </span>
          {/* PAYOFF. Solid brand blue, last in, 0.94 -> 1. */}
          <span className="ps-doc-send">Send</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Business Software card face: YOUR OWN BACK-OFFICE APP

   REBUILT 2026-09-06. What this replaces was a member-records panel.
   Reasons, all measured on a render:

   1. 18 READABLE STRINGS where the language allows <=5 — MEMBERS, MEMBER
      RECORDS, 1,248, SIGN-UPS, six avatar initials, five ACTIVE pills,
      PENDING, New member, SAVE. The card had to be READ, so it could not
      be RECOGNISED. Cards 4/5 are recognised in ~200ms without reading.
   2. SEMANTIC COLOUR, which the language forbids: green ACTIVE x5, amber
      PENDING, six pastel avatar chips, 28 distinct colour tokens. In the
      reference cards accents are decorative, identically sized, and never
      encode state.
   3. A WHITE SLAB IN DARK MODE. The panel was `rgb(248,250,252)` and did
      not change with theme, so on a #0A1628 page it glared. The fix had
      been applied to the wrong axis — the panel was made BRIGHTER to
      separate from a light card.
   4. FRAME 1 WAS AN EMPTY WHITE BOX. At t=0 the panel was blank but for
      "MEMBER RECORDS 0". Nothing in the reference language ever presents
      an empty container: card 4 is complete at t=0, card 5 draws all its
      chrome at t=0 and reveals only content.
   5. IT AMPUTATED UNDER PRESSURE — 2 of 6 rows gone at 393px. Card 5
      keeps 7 of 7 elements at 393px. That is the bar.
   6. 26 keyframe animations, including a 0 -> 1,084 -> 1,248 rAF counter
      on `cubic-bezier(0.34,1.56,0.64,1)` — an overshoot easing that
      appears nowhere in cards 4/5.

   SUBJECT NOW: the software itself. A desktop app window with a navy rail,
   one chart widget and a list, cropped by the right card edge, and the
   record you opened floating over it at 5deg.

   THE CHART IS THE ONE THING RECOVERED FROM THE PRE-8c7c955 VERSION. That
   card had a large saturated filled bar mass, which is exactly the weight
   the whole current set lacks and exactly what WebsiteVisual has. It is
   NOT abstract data-viz here — the reason the old chart card was replaced
   was that it stood alone on a grid of UI mockups; inside an app window it
   is a widget, which is what a buyer recognises.

   CLAIMS DISCIPLINE: the bars are deliberately NON-MONOTONIC and carry no
   axis, no labels and no values. A rising chart is an outcome claim drawn
   as artwork — the thing docs/WRITER-AGENT-PROMPT.md:31 gates and the
   reason RevenueVisual is shelved under ADR-0006 decision 4. Two readable
   strings, both chrome: "Dashboard" (a nav tab) and "Save" (a button).
   ───────────────────────────────────────────────────────────── */

/* Bar heights as a fraction of the plot box. Shuffled on purpose: no
   trend, no story, no claim. Read the claims note above before "fixing"
   these into an ascending series. */
const APP_BARS = [0.54, 0.78, 0.43, 0.9, 0.61, 0.83, 0.5] as const;

export function DashboardVisual() {
  const containerRef = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={containerRef} className="ps-app-root" aria-hidden="true">
      <div className="ps-app-stage">
        {/* PLANE 1 — the app window. Wider than the stage on purpose: it
            is cropped by the card's right edge, which is the reference
            language's "bleed" and the opposite of the timid inset panel
            this replaces. */}
        <div className="ps-app-window">
          {/* Chrome strip: contrast bed for .ps-bento-card__expand, and it
              is what makes the window read as a surface with depth rather
              than a slab. Flips with the theme. */}
          <div className="ps-app-chrome">
            <span className="ps-app-dots"><i /><i /><i /></span>
            <span className="ps-app-chrome-pill" />
          </div>

          <div className="ps-app-body">
            {/* The navy rail is the large dark mass the language requires.
                It stays navy in BOTH themes, exactly like .ps-site-nav
                (card-visuals.css:2331) — a chrome rail is dark in a lit
                room too. What flips is the ROOT backdrop and the chrome
                strip, which is where the old card got it wrong. */}
            <div className="ps-app-rail">
              <span className="ps-app-rail-mark" />
              <span className="ps-app-rail-item ps-app-rail-item--on" />
              <span className="ps-app-rail-item" />
              <span className="ps-app-rail-item" />
              <span className="ps-app-rail-item" />
            </div>

            <div className="ps-app-main">
              <div className="ps-app-toolbar">
                <span className="ps-app-tab">Dashboard</span>
                <span className="ps-app-toolbar-pill" />
              </div>

              {/* One animated unit, not seven. Bars are drawn at full
                  height inside it — a scaleY(0)->1 grow per bar is the
                  "data is loading" gesture the reference cards never
                  make, and it costs six animated elements. */}
              <div className="ps-app-chart" style={{ "--sr-i": 0 } as React.CSSProperties}>
                {APP_BARS.map((h, i) => (
                  <span
                    className="ps-app-bar"
                    key={`app-bar-${i}`}
                    style={{ "--bar-h": h } as React.CSSProperties}
                  />
                ))}
              </div>

              <div className="ps-app-rows">
                {[0, 1, 2].map((row) => (
                  <span
                    className="ps-app-row"
                    key={`app-row-${row}`}
                    style={{ "--sr-i": row + 1 } as React.CSSProperties}
                  >
                    <i className="ps-app-row-av" />
                    <i className="ps-app-row-name" />
                    <i className="ps-app-row-meta" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PLANE 2 — the record you opened. Occludes the window, 5deg,
            deep shadow. This is what the old card's "New member / SAVE"
            chip was reaching for and missed: that one sat in the GUTTER
            BESIDE the panel instead of over it, so in dark mode it was a
            detached white blob with no surface behind it. */}
        <div className="ps-app-sheet">
          <span className="ps-app-sheet-bar" />
          <span className="ps-app-sheet-bar ps-app-sheet-bar--short" />
          {/* PAYOFF. Solid brand blue, last in, 0.94 -> 1. */}
          <span className="ps-app-save">Save</span>
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
