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
   VISUAL 2 — AI Integration card face: "The Gate"

   IDENTITY WARNING, read this before editing: this component renders the
   **AI Integration** tile. `variant` does not match `type` — the AI pillar
   is `type: "ai"` with `variant: "automation"`, so its class is
   `.ps-bento-card--automation` (service-pillars.tsx:333-341). The card
   called "Business Automation" is `SystemFixesVisual` /
   `.ps-bento-card--systems`. Key off the component, never the class name.

   Replaced the three cycling n8n flow diagrams on 2026-09-05. Reasons,
   each read off a render rather than inferred:

   1. LETTERBOXING. `FlowSvg` was `viewBox="0 0 412 200"` (2.06:1) with
      `preserveAspectRatio="xMidYMid meet"` inside a near-square stage, so
      the drawn band used only 39-50% of the card height and the rest was
      empty. Two probes called this card "full" -- a leaf bounding-box
      union said 96.9% because it measured the <svg> element (height:100%,
      overflow:visible) rather than the drawn content, and a pixel row-scan
      said 94.1% because the card's own gradient beat the ink threshold.
      The screenshot was right both times.
   2. LABEL/GRAPH DESYNC. The label transitioned in 300ms while the slide
      crossfaded in 600ms, so for ~300ms of every 4s cycle the label named
      one flow while the previous flow's graph was still painted.
   3. OFF-FAMILY DRIFT was NOT the problem here -- this card was already
      the family exemplar (a UI mockup of a named system). The redesign
      keeps that property and gives it a subject with a point of view.

   NOT a reason, and deliberately not fixed: the "artwork overlaps the
   title by -57px at 768 / -53px at 1440" finding. That is a measurement
   artefact. The deepest artwork leaf was `.ps-n8n-dot`, the PAGINATION
   INDICATOR, which sits bottom-centre BELOW "CLICK FOR MORE" and clear of
   the left-aligned title. `titleTop - artBottom` is a DIRECTIONAL metric
   and only means "collision" when the element is above the title. Pixel
   proof it was never real: the title measured 11.47 min / 0% of core
   glyph pixels failing at 1440 -- if artwork were behind those glyphs the
   sampled backgrounds would scatter and the minimum would collapse.
   Do not reserve clearance for it; doing so would crush the artwork to
   fix a collision that does not exist. Vertical budget below is derived
   from the MEASURED title block instead (62.8px <940, 58.9px >=940).

   Subject: one AI action held at an approval gate. The model read a
   document, checked its extraction back against the source, found one
   field it could not verify, and stopped -- with Send visibly locked.
   The market is full of glowing brains; nobody draws the leash.
   ───────────────────────────────────────────────────────────── */

/* Node icons recovered verbatim from HEAD (git show HEAD:...:155-170). The
   originals' node glyphs were dropped in the 2026-09-05 rebuild; the branch
   graph is unreadable as "a real tool" without them. */
const GATE_ICONS = {
  email: "M2 7l10 7 10-7M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2z",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8",
  brain: "M9.5 2A2.5 2.5 0 0112 4.5V7h-1a7 7 0 00-7 7v1a1 1 0 000 2h1v1a2 2 0 002 2h10a2 2 0 002-2v-1h1a1 1 0 000-2v-1a7 7 0 00-7-7h-1V4.5A2.5 2.5 0 0114.5 2",
  check: "M20 6L9 17l-5-5",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
} as const;

function GateNode({
  cls, icon, label, style,
}: { cls: string; icon: keyof typeof GATE_ICONS; label: string; style?: React.CSSProperties }) {
  return (
    <div className={`ps-gate-node ${cls}`} style={style}>
      <span className="ps-gate-node-disc">
        <svg className="ps-gate-node-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d={GATE_ICONS[icon]} stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="ps-gate-node-label">{label}</span>
    </div>
  );
}

/* Node anchors, in fractions of the graph box. ONE source of truth: the HTML
   nodes are positioned from these and the wire endpoints are computed from
   them, so the wires cannot drift away from the nodes at any aspect ratio. */
const GATE_POS = {
  email:   { x: 0.08, y: 0.64, r: 13 },
  extract: { x: 0.30, y: 0.575, r: 13 },
  ai:      { x: 0.55, y: 0.50, r: 19 },
  send:    { x: 0.86, y: 0.18, r: 13 },
  hold:    { x: 0.86, y: 0.82, r: 13 },
} as const;

/* Wire paths in PIXELS of the measured graph box. Because the <svg> carries a
   viewBox whose aspect EQUALS the element's aspect, the default
   `preserveAspectRatio` ("xMidYMid meet") maps 1:1 — no letterboxing is
   possible, and no `preserveAspectRatio="none"` is needed. Letterboxing can
   only occur when the two aspects differ, and here they are equal by
   construction. That removes the bug class rather than patching it. */
const pct = (v: number) => `${(v * 100).toFixed(2)}%`;

function gateWires(w: number, h: number) {
  const P = (k: keyof typeof GATE_POS) => ({ x: GATE_POS[k].x * w, y: GATE_POS[k].y * h, r: GATE_POS[k].r });
  const e = P("email"), a = P("ai"), sd = P("send"), hd = P("hold");
  const trunk = `M${(e.x + e.r).toFixed(1)} ${e.y.toFixed(1)} L${(a.x - a.r).toFixed(1)} ${a.y.toFixed(1)}`;
  // Horizontal-tangent cubics: the n8n wire shape.
  const fork = (t: { x: number; y: number; r: number }) => {
    const x0 = a.x + a.r, y0 = a.y, x1 = t.x - t.r, y1 = t.y;
    const c = (x1 - x0) * 0.5;
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} C${(x0 + c).toFixed(1)} ${y0.toFixed(1)} ${(x1 - c).toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  return { trunk, send: fork(sd), hold: fork(hd) };
}

export function AutomationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  // Same value on the server and on the first client render, so hydration
  // matches; a ResizeObserver refines it to real pixels after mount.
  const [box, setBox] = useState({ w: 320, h: 200 });

  useEffect(() => {
    const el = graphRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setBox((p) => (Math.abs(p.w - r.width) < 0.5 && Math.abs(p.h - r.height) < 0.5
          ? p : { w: r.width, h: r.height }));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPlayed(true);
      return;
    }

    // Unchanged house pattern: one-shot IO at threshold 0.25. rootMargin pulls
    // the start until the card is genuinely in frame rather than 107px showing.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlayed(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wires = gateWires(box.w, box.h);

  return (
    <div ref={containerRef} className="ps-visual-automation" aria-hidden="true">
      <div className={`ps-gate-panel${played ? " ps-gate-panel--play" : ""}`}>
        {/* Chrome strip. FLIPS WITH THE THEME on purpose — see the note at
            card-visuals.css:2633. A bar left dark in light mode hides the
            frosted .ps-bento-card__expand icon completely (measured). */}
        <div className="ps-gate-chrome">
          <span className="ps-gate-chrome-dots"><i /><i /><i /></span>
          <span className="ps-gate-chrome-name">ai-review-queue</span>
        </div>

        <div className="ps-gate-graph" ref={graphRef}>
          {/* WIRES ONLY. Nodes are HTML in percentage coordinates.
              NO `preserveAspectRatio="none"`: the viewBox is measured in real
              pixels, so its aspect EQUALS the element's aspect and the default
              "xMidYMid meet" maps 1:1. Letterboxing is only possible when the
              two aspects differ, so this removes the bug class by construction
              — and unlike `none`, nothing is non-uniformly scaled at all. */}
          <svg className="ps-gate-wires" viewBox={`0 0 ${box.w} ${box.h}`}
               fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="ps-gate-trunk" gradientUnits="userSpaceOnUse"
                              x1={GATE_POS.email.x * box.w} y1={GATE_POS.email.y * box.h}
                              x2={GATE_POS.ai.x * box.w} y2={GATE_POS.ai.y * box.h}>
                <stop offset="0%" stopColor="#635BFF" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            {/* One continuous trunk; the Extract node sits ON it, so dropping
                Extract at <=639 leaves an unbroken wire. */}
            <path className="ps-gate-wire ps-gate-wire--a" d={wires.trunk} />
            {/* THE FORK. Send is thin, dashed and dimmed; Hold is solid, heavy
                and fully saturated. The picture says "it chose to hold" through
                line weight alone — no rank claim, no outcome claim. */}
            <path className="ps-gate-wire ps-gate-wire--send" d={wires.send} />
            <path className="ps-gate-wire ps-gate-wire--hold" d={wires.hold} />
            {/* The flowing wire, recovered from the originals: the card's ONE
                resting loop. A travelling dash laid over the solid amber wire,
                so the wire still reads solid and saturated at rest. One
                property, one element, one compositor layer. */}
            <path className="ps-gate-wire ps-gate-wire--flow" d={wires.hold} />
          </svg>

          {/* The packet rides the trunk via `offset-path`, so it follows the
              wire exactly instead of approximating it with left/top — and it
              animates `offset-distance`, not layout. */}
          <span className="ps-gate-packet"
                style={{ offsetPath: `path("${wires.trunk}")` } as React.CSSProperties} />

          <GateNode cls="ps-gate-node--email" icon="email" label="Email"
                    style={{ left: pct(GATE_POS.email.x), top: pct(GATE_POS.email.y) }} />
          <GateNode cls="ps-gate-node--extract" icon="file" label="Extract"
                    style={{ left: pct(GATE_POS.extract.x), top: pct(GATE_POS.extract.y) }} />
          <div className="ps-gate-node ps-gate-node--ai"
               style={{ left: pct(GATE_POS.ai.x), top: pct(GATE_POS.ai.y) }}>
            <span className="ps-gate-node-glow" />
            <span className="ps-gate-node-ring" />
            <span className="ps-gate-node-disc">
              <svg className="ps-gate-node-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={GATE_ICONS.brain} stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="ps-gate-node-label">AI read</span>
          </div>
          <GateNode cls="ps-gate-node--send" icon="check" label="Send"
                    style={{ left: pct(GATE_POS.send.x), top: pct(GATE_POS.send.y) }} />
          <GateNode cls="ps-gate-node--hold" icon="flag" label="Hold"
                    style={{ left: pct(GATE_POS.hold.x), top: pct(GATE_POS.hold.y) }} />
        </div>

        <div className="ps-gate-foot">
          <span className="ps-gate-caption">AI proposed · not sent</span>
          <span className="ps-gate-chip">Held for you</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 3 — Business Automation card face:
   "The Invoice That Chases Itself"

   IDENTITY WARNING: this renders the **Business Automation** tile —
   `type: "automation"`, `variant: "systems"`, class
   `.ps-bento-card--systems` (service-pillars.tsx:219-229). The AI card is
   `AutomationVisual` above. The names are crossed; trust the component.

   Replaced the BEFORE/AFTER diptych on 2026-09-05. It was the only tile on
   the grid that was not a UI mockup of a named system:

   1. NO ARTIFACT FRAME. Its micro-labels were `BEFORE` and `AFTER` —
      rhetorical positions, not systems. Every sibling names a real thing:
      `MEMBER RECORDS`, `AI REVIEW QUEUE`, `RESULTS`, a browser chrome.
   2. MARKETER'S COPY, NOT MACHINE STATE. `Manual handoff`,
      `Duplicate tools`, `Approval bottleneck`, `1 source of truth`,
      `Live visibility` are phrases a person wrote about the client's pain.
      `LAG` / `BREAK` / `WASTE` are adjectives about the buyer, not states
      of a running system.
   3. NO TIME AXIS. A static diptych delivers its whole idea in frame one
      and gives the eye nothing to follow.

   It was NOT under-dense — it was the densest tile on the grid, filling
   70-80% of its height. "Add more" would have been the wrong reading.

   Replacement: one invoice's whole life as a run log — rendered at 07:00,
   emailed itself, approved by a one-word reply at 09:12, chase-ups already
   queued, closed when the deposit matched.

   SIBLING, NOT TWIN, to the AI card: same panel, same micro-label, same
   pill vocabulary, same dashed-means-unsettled rule. Different axis and
   different ending — AI Integration runs left-to-right and BRANCHES (a
   decision that could go either way, and it stops); this runs top-to-bottom
   and CLOSES (a sequence that completes).
   ───────────────────────────────────────────────────────────── */

/* The invoice's own line items — the content the document was missing. Widths
   only; no invented copy, and nothing here is an outcome claim. */
const DOC_ITEMS = [
  { d: 64, a: 30 },
  { d: 78, a: 24 },
  { d: 52, a: 34 },
  { d: 71, a: 27 },
  { d: 46, a: 32 },
  { d: 68, a: 22 },
] as const;

const RUN_STEPS = [
  { time: "07:00", label: "Invoice 4417 rendered", pill: "Auto", tone: "muted" },
  { time: "07:00", label: "Emailed to accounts@", pill: "Sent", tone: "sent" },
  // The one human beat in a column of machine steps — and it is a REPLY,
  // not a login. Only highlighted row, only outlined pill, only cyan dot.
  { time: "09:12", label: "Reply: “approved”", pill: "You", tone: "you" },
  { time: "Mar 8", label: "Reminder scheduled", pill: "Queued", tone: "queued" },
  { time: "Mar 9", label: "Second notice", pill: "Queued", tone: "queued" },
] as const;

export function SystemFixesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPlayed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlayed(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="ps-fix-root" aria-hidden="true">
      <div className={`ps-run-panel${played ? " ps-run-panel--play" : ""}`}>
        {/* Chrome strip — flips with the theme (card-visuals.css:2633). */}
        <div className="ps-run-chrome">
          <span className="ps-run-chrome-dots"><i /><i /><i /></span>
          <span className="ps-run-chrome-name">invoice-4417</span>
        </div>

        {/* The label moved INSIDE the panel head. It used to sit outside at
            the very top edge of the card, detached from the artwork. */}
        <div className="ps-run-head">
          <span className="ps-run-label">Invoice Run · Mar 1</span>
          <span className="ps-run-ref">#4417</span>
        </div>

        <div className="ps-run-body">
          <div className="ps-run-list">
            {/* The spine. 2px, blue->green: the rail itself encodes
                start->closed as colour, which is legible at REST and needs
                no motion to read. It terminates at the last dot rather than
                running on into empty space. */}
            <span className="ps-run-rail" />
            {RUN_STEPS.map((step, index) => (
              <div
                key={step.time + step.label}
                className={`ps-run-row ps-run-row--${step.tone}`}
                style={{ "--row-i": index } as React.CSSProperties}
              >
                <span className="ps-run-time">{step.time}</span>
                <span className="ps-run-dot" />
                <span className="ps-run-text">{step.label}</span>
                <span className={`ps-run-pill ps-run-pill--${step.tone}`}>{step.pill}</span>
              </div>
            ))}
          </div>

          {/* Second object: the invoice itself, so the panel has an overlap
              and an off-axis element instead of being one flat rectangle. */}
          <div className="ps-run-doc">
            <span className="ps-run-doc-head">
              <i className="ps-run-doc-mark" />
              <i className="ps-run-doc-title" />
            </span>
            {/* LINE ITEMS, not flat rules. Seven flush-top lines left a
                measured 108.2px dead gap in a 204.5px document — half the
                object empty, the emptiest rectangle on the grid. Each item is
                `flex: 1` inside a flex column, exactly like `.ps-run-row`, so
                they distribute across whatever height the document has instead
                of stacking at the top. That fills the box at every width
                without reintroducing the dead air the card started with. */}
            <span className="ps-run-doc-items">
              {DOC_ITEMS.map((it, i) => (
                <span className="ps-run-doc-item" key={i}>
                  <i className="ps-run-doc-desc" style={{ width: `${it.d}%` }} />
                  <i className="ps-run-doc-amt" style={{ width: `${it.a}%` }} />
                </span>
              ))}
            </span>
            <i className="ps-run-doc-rule" />
            <span className="ps-run-doc-total">
              <i className="ps-run-doc-total-label" />
              $4,120.00
            </span>
          </div>
        </div>

        {/* THE PAYOFF — a child of the PANEL, not of the document. The document
            is dropped below 940px; the stamp must not go with it. It is the
            only rotated object on the card and it lands last at EVERY width.
            CSS re-seats it over the document at >=940 and over the panel head
            below that, where it also stays clear of the dark title scrim. */}
        <span className="ps-run-stamp">Paid</span>

        <div className="ps-run-close">
          <svg className="ps-run-close-glyph" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.1" stroke="currentColor" strokeWidth="1.2" />
            <path className="ps-run-close-tick" d="M3.6 6.2 5.3 7.9 8.5 4.4"
                  stroke="currentColor" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ps-run-close-text">Deposit $4,120.00 matched to 4417</span>
          <span className="ps-run-pill ps-run-pill--closed">Closed</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Fixed dashboard layout:
   - wide revenue mix chart on top
   - activity panel bottom-left
   - KPI ring grid bottom-right
   Animates on scroll into view or direct user interaction only.
   ───────────────────────────────────────────────────────────── */

/* Card face content — the RECORDS LIST the team logs into.

   Replaced the 3-panel bar-chart + heatmap + KPI-ring dashboard on
   2026-09-05. Reasons, all read off screenshots, not inferred:

   1. ELEMENT COUNT. The old scene drew ~64 leaves (7 bars + 45 heatmap
      cells + 3 rings + 3 values + 3 KPI labels + 3 panel labels) inside a
      tile that is 244px wide at 320. The 45-cell heatmap resolved to
      ~4px dots that carried no meaning at any width.
   2. TEXT CLIPPING, the client's own complaint ("etentio", "ose Ra"),
      was live again: "Retenti/on" wrapped mid-word at 320 and 768, and at
      390 dark "Retention" rendered clipped as "Retentior" with the
      heatmap overflowing its panel across the word ACTIVITY. The
      clearance probe read +19.7px at 320 and +65.6px at 390 the whole
      time -- the numbers were green because the clipping happened INSIDE
      `.ps-dbc-kpi-card`'s own `overflow:hidden`, not against the title.
      Do not trust that probe alone here; look at the render.
   3. OFF-FAMILY. The other four tiles are all UI mockups (rounded panels,
      uppercase micro-labels, tinted pills, grey placeholder content
      lines). This was the only abstract data-viz on the grid.
   4. OFF-MESSAGE. Retention / Close Rate / NPS is marketing-analytics
      vocabulary that belongs to the SEO+Ads pillar. This pillar is
      "custom stuff to get them off of spreadsheets, move them into an
      entire system" -- records, rosters, exports, assignments, logins.

   The replacement is one window with a header and four record rows: 15
   drawn leaves. Rows are droppable at narrow widths, which a 3-panel
   grid with two-line labels never was. The only per-row text is a
   2-character initial and a nowrap status pill, so the mid-word wrap
   class of defect is structurally impossible now.

   Still decorative: the root keeps aria-hidden and the button's
   aria-label carries the accessible name. No information lives only
   here. */
const dbcRecords = [
  { initials: "AM", name: 78, status: "Active", tone: "on", hue: "#0C6FC9" },
  { initials: "RK", name: 62, status: "Active", tone: "on", hue: "#7C3AED" },
  { initials: "TD", name: 71, status: "Pending", tone: "off", hue: "#B45309" },
  { initials: "JW", name: 55, status: "Active", tone: "on", hue: "#0E7490" },
  { initials: "LP", name: 68, status: "Active", tone: "on", hue: "#07795F" },
  { initials: "SG", name: 49, status: "Active", tone: "on", hue: "#635BFF" },
] as const;

// Reinstated from the original card 1: varying-height saturated bars. The
// one mechanism of the old dashboard that unambiguously worked.
const dbcSpark = [30, 42, 52, 64, 78, 92] as const;

export function DashboardVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playToken, setPlayToken] = useState(0);
  const hasPlayedInView = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setPlayToken(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedInView.current) {
            hasPlayedInView.current = true;
            setPlayToken(1);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="ps-dbc-root" aria-hidden="true">
      <div className="ps-dbc-layout">
        <DashboardScene key={playToken} animated={playToken > 0} />
      </div>
    </div>
  );
}

const DBC_COUNT_TARGET = 1248;
const DBC_COUNT_MS = 900;
const DBC_COUNT_DELAY = 380;

function DashboardScene({ animated }: { animated: boolean }) {
  const countRef = useRef<HTMLDivElement>(null);

  // THE PAYOFF: the count travels instead of appearing. One rAF loop, ~900ms,
  // once per page view, writing textContent on a single node. Never starts
  // under reduced motion (the element already carries the final string from
  // the DOM), and is cancelled on cleanup.
  useEffect(() => {
    const node = countRef.current;
    if (!node || !animated) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let start = 0;
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DBC_COUNT_MS);
      const v = Math.round(easeOutQuint(t) * DBC_COUNT_TARGET);
      node.textContent = v.toLocaleString("en-US");
      if (t < 1) raf = requestAnimationFrame(step);
    };

    node.textContent = "0";
    const timer = window.setTimeout(() => { raf = requestAnimationFrame(step); }, DBC_COUNT_DELAY);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      node.textContent = DBC_COUNT_TARGET.toLocaleString("en-US");
    };
  }, [animated]);

  return (
    <div className={`ps-dbc-stage${animated ? " ps-dbc-stage--play" : ""}`}>
      <div className="ps-dbc-win">
        {/* Chrome strip — flips with the theme (card-visuals.css:2633). */}
        <div className="ps-dbc-chrome">
          <span className="ps-dbc-chrome-dots"><i /><i /><i /></span>
          <span className="ps-dbc-chrome-name">members</span>
        </div>

        <div className="ps-dbc-app">
          <div className="ps-dbc-app-head">
            <div className="ps-dbc-app-eyebrow">Member Records</div>
            <div className="ps-dbc-app-count" ref={countRef}>1,248</div>
          </div>

          <div className="ps-dbc-spark">
            <span className="ps-dbc-spark-label">Sign-ups</span>
            <span className="ps-dbc-spark-plot">
              {dbcSpark.map((h, i) => (
                <i
                  key={i}
                  className={`ps-dbc-spark-col${i >= 3 ? " ps-dbc-spark-col--hot" : ""}`}
                  style={{ "--sh": `${h}%`, "--si": i } as React.CSSProperties}
                />
              ))}
            </span>
          </div>

          <div className="ps-dbc-app-list">
            {dbcRecords.map((record, index) => (
              <div
                key={record.initials}
                className={`ps-dbc-app-row${index === 0 ? " ps-dbc-app-row--current" : ""}`}
                style={{ "--row-i": index } as React.CSSProperties}
              >
                <div className="ps-dbc-app-avatar" style={{ "--av": record.hue } as React.CSSProperties}>{record.initials}</div>
                <div className="ps-dbc-app-name" style={{ "--name-w": `${record.name}%` } as React.CSSProperties} />
                <div className={`ps-dbc-app-pill ps-dbc-app-pill--${record.tone}`}>{record.status}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* The phone. Direct borrow of card 4's C1/C2/C6 — it overlaps the
          window's bottom-right corner, sits off-axis at rotate(5deg) and
          bleeds off the right edge, so the two tiles read as siblings. */}
      <div className="ps-dbc-phone">
        <span className="ps-dbc-phone-notch" />
        <span className="ps-dbc-phone-title">New member</span>
        <i className="ps-dbc-phone-field" />
        <i className="ps-dbc-phone-field" />
        <span className="ps-dbc-phone-save">Save</span>
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
