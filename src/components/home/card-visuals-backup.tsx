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
      <div className="ps-auto-flow">
        <svg className="ps-auto-svg" viewBox="0 0 520 260" fill="none">
          <path
            d="M98 130 C126 130, 138 94, 174 86"
            stroke="#635BFF"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--0"
            fill="none"
          />
          <path
            d="M98 130 C126 130, 138 166, 174 174"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--1"
            fill="none"
          />
          <path
            d="M226 86 C254 86, 266 130, 296 130"
            stroke="#A855F7"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--2"
            fill="none"
          />
          <path
            d="M226 174 C254 174, 266 130, 296 130"
            stroke="#A855F7"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--0"
            fill="none"
          />
          <path
            d="M360 130 C392 130, 404 90, 438 82"
            stroke="#10B981"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--1"
            fill="none"
          />
          <path
            d="M360 130 C392 130, 404 170, 438 178"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeDasharray="9 7"
            className="ps-dash-flow ps-dash-flow--2"
            fill="none"
          />

          <circle cx="98" cy="130" r="4" fill="#7C6CFF" opacity="0.9" />
          <circle cx="360" cy="130" r="4" fill="#F59E0B" opacity="0.9" />
        </svg>

        <div className="ps-auto-node-wrap ps-auto-node-wrap--trigger">
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

        <div className="ps-auto-node-wrap ps-auto-node-wrap--process">
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
        </div>

        <div className="ps-auto-node-wrap ps-auto-node-wrap--filter">
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

        <div className="ps-auto-node-wrap ps-auto-node-wrap--engine">
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

        <div className="ps-auto-node-wrap ps-auto-node-wrap--output">
          <div
            className="ps-auto-node"
            style={{ borderColor: "#10B98160", boxShadow: "0 0 14px #10B98122" }}
          >
            <svg className="ps-auto-node-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div className="ps-auto-node-label" style={{ color: "#10B981" }}>Output</div>
          </div>
        </div>

        <div className="ps-auto-node-wrap ps-auto-node-wrap--alert">
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

  const problems = [
    { tag: "Lag", title: "Manual handoff", tone: "orange" },
    { tag: "Break", title: "Duplicate tools", tone: "red" },
    { tag: "Waste", title: "Approval bottleneck", tone: "amber" },
  ];

  const fixes = [
    { title: "Unified workflow", metric: "1 source of truth" },
    { title: "Automated routing", metric: "94% faster" },
    { title: "Clean reporting", metric: "Live visibility" },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-fix-root"
      aria-hidden="true"
    >
      <div className="ps-fix-board">
        <div className="ps-fix-column ps-fix-column--before">
          <div className="ps-fix-column-label">Before</div>
          <div className="ps-fix-problem-stack">
            {problems.map((problem, index) => (
              <div
                key={problem.title}
                className={`ps-fix-problem-card ps-fix-problem-card--${problem.tone}`}
                style={{ "--fix-delay": `${index * 0.12}s` } as React.CSSProperties}
              >
                <div className="ps-fix-problem-top">
                  <span className="ps-fix-problem-badge">{problem.tag}</span>
                  <span className="ps-fix-problem-dot" />
                </div>
                <div className="ps-fix-problem-title">{problem.title}</div>
                <div className="ps-fix-problem-lines">
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ps-fix-center">
          <div className="ps-fix-center-line" />
          <div className="ps-fix-center-line ps-fix-center-line--two" />
          <div className="ps-fix-center-arrow">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M7 14h14M16 9l5 5-5 5" stroke="#40D9AC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="ps-fix-column ps-fix-column--after">
          <div className="ps-fix-column-label">After</div>
          <div className="ps-fix-solution-stack">
            {fixes.map((fix, index) => (
              <div
                key={fix.title}
                className="ps-fix-solution-card"
                style={{ "--fix-delay": `${0.18 + index * 0.14}s` } as React.CSSProperties}
              >
                <div className="ps-fix-solution-top">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.4 6.3 4.8 8.6 9.6 3.8" stroke="#40D9AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="ps-fix-solution-metric">{fix.metric}</span>
                </div>
                <div className="ps-fix-solution-title">{fix.title}</div>
                <div className="ps-fix-solution-bars">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ps-fix-footer">
        <span className="ps-fix-footer-label">Efficiency gain</span>
        <div className="ps-fix-footer-track">
          <div className="ps-fix-footer-bar" />
        </div>
        <span className="ps-fix-footer-value">+92%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Four persistent dashboard modules rotate through fixed slots:
   featured -> bottom-left -> bottom-middle -> bottom-right -> featured.
   No remounting, no chrome, just sliding panel movement.
   ───────────────────────────────────────────────────────────── */

const HEATMAP_ROWS = 5;
const HEATMAP_COLS = 9;
const HEATMAP_LEVELS = [0, 1, 1, 2, 2, 2, 3, 3, 4];
const heatmapCells: number[][] = Array.from({ length: HEATMAP_ROWS }, (_, r) =>
  Array.from({ length: HEATMAP_COLS }, (_, c) =>
    HEATMAP_LEVELS[(r * HEATMAP_COLS + c * 3 + r * 2) % HEATMAP_LEVELS.length]
  )
);

export function DashboardVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tileOrder, setTileOrder] = useState([0, 1, 2, 3]);
  const slotNames = ["featured", "bottom-left", "bottom-middle", "bottom-right"] as const;

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

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setTileOrder(([featured, bottomLeft, bottomMiddle, bottomRight]) => [
        bottomRight,
        featured,
        bottomLeft,
        bottomMiddle,
      ]);
    }, 3200);

    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="ps-dbc-root" aria-hidden="true">
      <div className="ps-dbc-layout">
        <div className="ps-dbc-stage">
          {tileOrder.map((tileIdx, slotIndex) => {
            const slotName = slotNames[slotIndex];
            const isFeatured = slotName === "featured";

            return (
              <div
                key={tileIdx}
                className={`ps-dbc-tile-shell ps-dbc-slot--${slotName}`}
              >
                <DashTile tileIdx={tileIdx} featured={isFeatured} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DashTile({ tileIdx, featured }: { tileIdx: number; featured: boolean }) {
  if (tileIdx === 0) {
    return (
      <div className="ps-dbc-tile-inner">
        <div className="ps-dbc-tile-label">Revenue Mix</div>
        <div className="ps-dbc-bars">
          {([0.36, 0.64, 0.52, 0.82, 0.6, 0.72, 0.9] as number[]).map((h, i) => (
            <div key={i} className="ps-dbc-bar-wrap">
              <div
                className="ps-dbc-bar"
                style={{
                  "--bar-h": h,
                  "--bar-delay": `${i * 0.08}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tileIdx === 1) {
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
            opacity="0.85"
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
    return (
      <div className="ps-dbc-tile-inner ps-dbc-tile-inner--center">
        <div className="ps-dbc-tile-label">Retention</div>
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
            {featured ? <span className="ps-dbc-donut-sub">retained</span> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-dbc-tile-inner">
      <div className="ps-dbc-tile-label">Activity</div>
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
