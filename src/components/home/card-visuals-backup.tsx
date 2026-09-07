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
