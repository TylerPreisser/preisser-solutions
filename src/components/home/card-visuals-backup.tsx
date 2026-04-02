"use client";

/**
 * card-visuals-backup.tsx
 *
 * Backup of the 5 service card visual components extracted from service-pillars.tsx.
 * These are preserved here so they can be imported into a rebuilt card grid structure
 * without losing the animations.
 *
 * CSS lives in: src/styles/card-visuals.css
 *
 * Extracted: 2026-04-02
 */

import { useEffect, useRef, useState } from "react";

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

      {/* RIGHT: iPhone mockup — narrow, tall, proper proportions */}
      <div className="ps-wb-phone">
        <div className="ps-iphone-frame">
          {/* Dynamic island */}
          <div className="ps-iphone-island" />
          {/* Screen */}
          <div className="ps-iphone-screen">
            {/* Status bar */}
            <div className="ps-iphone-status">
              <span className="ps-iphone-time">9:41</span>
              <div className="ps-iphone-status-icons">
                <div className="ps-iphone-signal" />
                <div className="ps-iphone-battery" />
              </div>
            </div>
            {/* App header */}
            <div className="ps-iphone-app-header">
              <div className="ps-iphone-app-logo" />
              <div className="ps-iphone-app-avatar" />
            </div>
            {/* Hero block */}
            <div className="ps-iphone-hero-block">
              <div className="ps-iphone-line ps-iphone-line--title" />
              <div className="ps-iphone-line ps-iphone-line--sub" />
              <div className="ps-iphone-cta" />
            </div>
            {/* Cards */}
            <div className="ps-iphone-cards">
              <div className="ps-iphone-card">
                <div className="ps-iphone-card-dot" style={{ background: "rgba(13,149,232,0.85)" }} />
                <div className="ps-iphone-card-body">
                  <div className="ps-iphone-line ps-iphone-line--sm" />
                  <div className="ps-iphone-line ps-iphone-line--xs" />
                </div>
              </div>
              <div className="ps-iphone-card">
                <div className="ps-iphone-card-dot" style={{ background: "rgba(139,92,246,0.85)" }} />
                <div className="ps-iphone-card-body">
                  <div className="ps-iphone-line ps-iphone-line--sm" />
                  <div className="ps-iphone-line ps-iphone-line--xs" />
                </div>
              </div>
              <div className="ps-iphone-card">
                <div className="ps-iphone-card-dot" style={{ background: "rgba(0,212,170,0.85)" }} />
                <div className="ps-iphone-card-body">
                  <div className="ps-iphone-line ps-iphone-line--sm" />
                  <div className="ps-iphone-line ps-iphone-line--xs" />
                </div>
              </div>
            </div>
            {/* Tab bar */}
            <div className="ps-iphone-tabbar">
              <div className="ps-iphone-tab ps-iphone-tab--active" />
              <div className="ps-iphone-tab" />
              <div className="ps-iphone-tab" />
              <div className="ps-iphone-tab" />
              <div className="ps-iphone-tab" />
            </div>
            {/* Home indicator */}
            <div className="ps-iphone-home-indicator" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 2 — Automation Systems
   Branching workflow: Trigger → [Process, Filter] → AI → [Output, Alert]
   SVG paths connect the nodes with animated dashes.
   ───────────────────────────────────────────────────────────── */
export function AutomationVisual() {
  return (
    <div className="ps-visual-automation" aria-hidden="true">
      {/* SVG connector lines behind nodes */}
      <svg className="ps-auto-svg" viewBox="0 0 280 200" fill="none">
        {/* Trigger → Process (top branch) */}
        <path
          d="M58,60 C90,60 100,50 122,50"
          stroke="#635BFF"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--0"
          fill="none"
        />
        {/* Trigger → Filter (bottom branch) */}
        <path
          d="M58,60 C90,60 100,110 122,110"
          stroke="#8B5CF6"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--1"
          fill="none"
        />
        {/* Process → AI */}
        <path
          d="M178,50 C200,50 210,80 222,80"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--2"
          fill="none"
        />
        {/* Filter → AI */}
        <path
          d="M178,110 C200,110 210,80 222,80"
          stroke="#A855F7"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--0"
          fill="none"
        />
        {/* AI → Output (top) */}
        <path
          d="M278,80 C296,80 296,40 310,40"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--1"
          fill="none"
        />
        {/* AI → Alert (bottom) */}
        <path
          d="M278,80 C296,80 296,120 310,120"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          className="ps-dash-flow ps-dash-flow--2"
          fill="none"
        />
      </svg>

      {/* COLUMN 1: Trigger */}
      <div className="ps-auto-col ps-auto-col--1">
        <div
          className="ps-auto-node"
          style={{ borderColor: "#635BFF60", boxShadow: "0 0 14px #635BFF22" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#635BFF" }}>Trigger</div>
        </div>
      </div>

      {/* COLUMN 2: Process + Filter (branched) */}
      <div className="ps-auto-col ps-auto-col--2">
        <div
          className="ps-auto-node"
          style={{ borderColor: "#8B5CF660", boxShadow: "0 0 14px #8B5CF622" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#8B5CF6" }}>Process</div>
        </div>
        <div
          className="ps-auto-node"
          style={{ borderColor: "#6366F160", boxShadow: "0 0 14px #6366F122" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#6366F1" }}>Filter</div>
        </div>
      </div>

      {/* COLUMN 3: AI (merge) */}
      <div className="ps-auto-col ps-auto-col--3">
        <div
          className="ps-auto-node ps-auto-node--large"
          style={{ borderColor: "#A855F760", boxShadow: "0 0 18px #A855F733" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-5 0v-15A2.5 2.5 0 019.5 2z" />
            <path d="M14.5 2A2.5 2.5 0 0117 4.5v15a2.5 2.5 0 01-5 0v-15A2.5 2.5 0 0114.5 2z" />
            <line x1="4" y1="8.5" x2="9" y2="8.5" />
            <line x1="15" y1="8.5" x2="20" y2="8.5" />
            <line x1="4" y1="15.5" x2="9" y2="15.5" />
            <line x1="15" y1="15.5" x2="20" y2="15.5" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#A855F7" }}>AI Engine</div>
        </div>
      </div>

      {/* COLUMN 4: Output + Alert */}
      <div className="ps-auto-col ps-auto-col--4">
        <div
          className="ps-auto-node"
          style={{ borderColor: "#10B98160", boxShadow: "0 0 14px #10B98122" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#10B981" }}>Output</div>
        </div>
        <div
          className="ps-auto-node"
          style={{ borderColor: "#F59E0B60", boxShadow: "0 0 14px #F59E0B22" }}
        >
          <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <div className="ps-auto-node-label" style={{ color: "#F59E0B" }}>Alert</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 3 — System Fixes & Efficiency
   Real-time health monitor: 6 service rows animate from red/broken
   to green/healthy on scroll into view.
   ───────────────────────────────────────────────────────────── */
export function SystemFixesVisual() {
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

  const services = [
    { name: "CRM Sync",       before: "34%",   after: "99%",  barW: 34,  delay: 0 },
    { name: "Data Pipeline",  before: "12%",   after: "98%",  barW: 12,  delay: 1 },
    { name: "Email Server",   before: "61%",   after: "100%", barW: 61,  delay: 2 },
    { name: "API Gateway",    before: "0%",    after: "99%",  barW: 0,   delay: 3 },
    { name: "Backup System",  before: "45%",   after: "97%",  barW: 45,  delay: 4 },
    { name: "Analytics",      before: "28%",   after: "99%",  barW: 28,  delay: 5 },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-hm-root"
      aria-hidden="true"
    >
      {/* Header bar */}
      <div className="ps-hm-header">
        <span className="ps-hm-header-title">System Health Monitor</span>
        <div className="ps-hm-header-status">
          <div className="ps-hm-live-dot" />
          <span className="ps-hm-live-label">LIVE</span>
        </div>
      </div>

      {/* Service rows */}
      <div className="ps-hm-rows">
        {services.map((svc, i) => (
          <div
            key={svc.name}
            className="ps-hm-row"
            style={{ "--hm-delay": `${i * 0.12}s` } as React.CSSProperties}
          >
            {/* Status icon: X → checkmark */}
            <div className="ps-hm-status-icon">
              <svg className="ps-hm-icon-x" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg className="ps-hm-icon-check" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polyline points="2,5 4.5,7.5 8,3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Service name */}
            <span className="ps-hm-name">{svc.name}</span>

            {/* Status bar track */}
            <div className="ps-hm-bar-track">
              {/* Before bar (red, short) */}
              <div
                className="ps-hm-bar-before"
                style={{ width: `${svc.barW}%` }}
              />
              {/* After bar (green, full) — slides in on in-view */}
              <div
                className="ps-hm-bar-after"
                style={{ "--hm-bar-delay": `${i * 0.12 + 0.1}s` } as React.CSSProperties}
              />
            </div>

            {/* Percentage readout */}
            <span className="ps-hm-pct">
              <span className="ps-hm-pct-before">{svc.before}</span>
              <span className="ps-hm-pct-after">{svc.after}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Footer summary */}
      <div className="ps-hm-footer">
        <span className="ps-hm-footer-label">Overall Efficiency</span>
        <div className="ps-hm-footer-bar-track">
          <div className="ps-hm-footer-bar" />
        </div>
        <span className="ps-hm-footer-value">+92%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Conveyor-belt cycling: tiles push left as new one slides in
   from the right. Tiles: bar chart (wide), line chart, big donut,
   heatmap grid. Layout is asymmetric (one wide tile on top).
   ───────────────────────────────────────────────────────────── */

// Heatmap cell data — static, looks like a contribution graph
const HEATMAP_ROWS = 5;
const HEATMAP_COLS = 9;
const HEATMAP_LEVELS = [0, 1, 1, 2, 2, 2, 3, 3, 4]; // weighted toward mid/high
const heatmapCells: number[][] = Array.from({ length: HEATMAP_ROWS }, (_, r) =>
  Array.from({ length: HEATMAP_COLS }, (_, c) =>
    HEATMAP_LEVELS[(r * HEATMAP_COLS + c * 3 + r * 2) % HEATMAP_LEVELS.length]
  )
);

export function DashboardVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0); // which tile index is in the "wide" (top) slot

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

  // Advance the "featured" tile every 3.5s
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setActive((a) => (a + 1) % 4);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // The 3 bottom slots show the tiles NOT currently featured
  const bottomTiles = [0, 1, 2, 3].filter((t) => t !== active);

  return (
    <div
      ref={containerRef}
      className="ps-dbc-root"
      aria-hidden="true"
    >
      {/* Chrome bar */}
      <div className="ps-dbc-chrome">
        <div className="ps-dbc-chrome-dots">
          <span style={{ background: "#FF5F57" }} />
          <span style={{ background: "#FEBC2E" }} />
          <span style={{ background: "#28C840" }} />
        </div>
        <span className="ps-dbc-chrome-title">Analytics Dashboard</span>
        <div className="ps-dbc-live">
          <span className="ps-dbc-live-dot" />
          <span className="ps-dbc-live-label">LIVE</span>
        </div>
      </div>

      {/* Asymmetric layout: wide featured tile on top, 3 small below */}
      <div className="ps-dbc-layout">
        {/* FEATURED (wide top tile) */}
        <div className="ps-dbc-featured" key={`featured-${active}`}>
          <DashTile tileIdx={active} featured />
        </div>

        {/* BOTTOM ROW: 3 small tiles */}
        <div className="ps-dbc-bottom-row">
          {bottomTiles.map((tileIdx) => (
            <div key={`bottom-${tileIdx}-${active}`} className="ps-dbc-small-tile">
              <DashTile tileIdx={tileIdx} featured={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Sub-component: renders a single dashboard tile by index */
function DashTile({ tileIdx, featured }: { tileIdx: number; featured: boolean }) {
  if (tileIdx === 0) {
    /* Bar chart */
    return (
      <div className="ps-dbc-tile-inner">
        <div className="ps-dbc-tile-label">Q4 Revenue</div>
        <div className="ps-dbc-bars">
          {([0.42, 0.68, 0.55, 0.88, 0.61, 0.75, 0.95] as number[]).map((h, i) => (
            <div key={i} className="ps-dbc-bar-wrap">
              <div
                className="ps-dbc-bar"
                style={{
                  "--bar-h": h,
                  "--bar-delay": `${i * 0.06}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (tileIdx === 1) {
    /* Line chart */
    return (
      <div className="ps-dbc-tile-inner">
        <div className="ps-dbc-tile-label">Growth Trend</div>
        <svg className="ps-dbc-line-svg" viewBox="0 0 100 55" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dbcLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0D95E8" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="dbcAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
          <line x1="0" y1="28" x2="100" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="2 2" />
          <path
            d="M0,48 C15,44 30,38 45,28 C60,18 75,10 100,4 L100,50 L0,50 Z"
            fill="url(#dbcAreaGrad)"
            opacity="0.8"
          />
          <path
            className="ps-dbc-line-path"
            d="M0,48 C15,44 30,38 45,28 C60,18 75,10 100,4"
            stroke="url(#dbcLineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="4" r="2.5" fill="#8B5CF6" className="ps-dbc-tip-dot" />
        </svg>
      </div>
    );
  }
  if (tileIdx === 2) {
    /* Large donut */
    return (
      <div className="ps-dbc-tile-inner ps-dbc-tile-inner--center">
        <div className="ps-dbc-tile-label">Customer Retention</div>
        <div className={featured ? "ps-dbc-donut-wrap ps-dbc-donut-wrap--lg" : "ps-dbc-donut-wrap"}>
          <svg className="ps-dbc-donut-svg" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.07)" strokeWidth={featured ? 9 : 7} />
            <circle
              className="ps-dbc-donut-ring"
              cx="40"
              cy="40"
              r="30"
              stroke="#0D95E8"
              strokeWidth={featured ? 9 : 7}
              strokeLinecap="round"
              strokeDasharray="188.5"
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="ps-dbc-donut-center">
            <span className="ps-dbc-donut-pct">94%</span>
            {featured && <span className="ps-dbc-donut-sub">retained</span>}
          </div>
        </div>
      </div>
    );
  }
  /* Tile 3: Heatmap */
  return (
    <div className="ps-dbc-tile-inner">
      <div className="ps-dbc-tile-label">Activity Heatmap</div>
      <div className="ps-dbc-heatmap">
        {heatmapCells.map((row, r) => (
          <div key={r} className="ps-dbc-heatmap-row">
            {row.map((level, c) => (
              <div
                key={c}
                className={`ps-dbc-heatmap-cell ps-dbc-heatmap-cell--${level}`}
                style={{ "--hm-cell-delay": `${(r * HEATMAP_COLS + c) * 0.015}s` } as React.CSSProperties}
              />
            ))}
          </div>
        ))}
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

  const inputs = [
    { label: "Content", delay: 0 },
    { label: "Ads",     delay: 1 },
    { label: "SEO",     delay: 2 },
    { label: "Email",   delay: 3 },
  ];

  const outputs = [
    { label: "Leads",   delay: 0 },
    { label: "Revenue", delay: 1 },
    { label: "$$$",     delay: 2 },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-ge-root"
      aria-hidden="true"
    >
      {/* TOP: Engine visualization */}
      <div className="ps-ge-engine-row">
        {/* Left: inputs flowing in */}
        <div className="ps-ge-inputs">
          {inputs.map((inp) => (
            <div
              key={inp.label}
              className="ps-ge-input-item"
              style={{ "--ge-delay": `${inp.delay * 0.15}s` } as React.CSSProperties}
            >
              <div className="ps-ge-input-dot" />
              <span className="ps-ge-input-label">{inp.label}</span>
              <div className="ps-ge-input-arrow" />
            </div>
          ))}
        </div>

        {/* Center: engine core */}
        <div className="ps-ge-core">
          {/* Outer rotating ring */}
          <div className="ps-ge-ring ps-ge-ring--outer" />
          {/* Inner rotating ring (opposite direction) */}
          <div className="ps-ge-ring ps-ge-ring--inner" />
          {/* Pulsing core dot */}
          <div className="ps-ge-core-dot">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2.5L9.5 6.5H13.5L10.5 9L11.5 13L8 10.5L4.5 13L5.5 9L2.5 6.5H6.5L8 2.5Z" fill="#0D95E8" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Right: outputs flowing out */}
        <div className="ps-ge-outputs">
          {outputs.map((out) => (
            <div
              key={out.label}
              className="ps-ge-output-item"
              style={{ "--ge-delay": `${out.delay * 0.18 + 0.3}s` } as React.CSSProperties}
            >
              <div className="ps-ge-output-arrow" />
              <span className="ps-ge-output-label">{out.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM: Growth line chart */}
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
