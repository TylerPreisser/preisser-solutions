"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

interface ServicePillar {
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 1 — Websites & Applications
   Browser chrome + phone mockup side by side
   ───────────────────────────────────────────────────────────── */
function WebsiteVisual() {
  return (
    <div className="ps-visual-website" aria-hidden="true">
      {/* LEFT: Browser window (scaled down) */}
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

      {/* RIGHT: Phone mockup */}
      <div className="ps-wb-phone">
        {/* Phone frame */}
        <div className="ps-phone-frame">
          {/* Notch */}
          <div className="ps-phone-notch" />
          {/* Screen */}
          <div className="ps-phone-screen">
            {/* Dark header */}
            <div className="ps-phone-header">
              <div className="ps-phone-header-logo" />
              <div className="ps-phone-header-icon" />
            </div>
            {/* Content blocks */}
            <div className="ps-phone-content">
              <div className="ps-phone-hero-block">
                <div className="ps-phone-line ps-phone-line--title" />
                <div className="ps-phone-line ps-phone-line--sub" />
                <div className="ps-phone-cta-btn" />
              </div>
              <div className="ps-phone-cards">
                <div className="ps-phone-card">
                  <div className="ps-phone-card-dot" style={{ background: "rgba(13,149,232,0.8)" }} />
                  <div className="ps-phone-card-lines">
                    <div className="ps-phone-line ps-phone-line--sm" />
                    <div className="ps-phone-line ps-phone-line--xs" />
                  </div>
                </div>
                <div className="ps-phone-card">
                  <div className="ps-phone-card-dot" style={{ background: "rgba(139,92,246,0.8)" }} />
                  <div className="ps-phone-card-lines">
                    <div className="ps-phone-line ps-phone-line--sm" />
                    <div className="ps-phone-line ps-phone-line--xs" />
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom tab bar */}
            <div className="ps-phone-tabbar">
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
   VISUAL 2 — Automation Systems
   Left-to-right workflow nodes with animated dashed paths
   Pulse dot removed per spec.
   ───────────────────────────────────────────────────────────── */
function AutomationVisual() {
  const nodes = [
    { label: "Trigger", icon: "⚡", color: "#635BFF" },
    { label: "Process", icon: "⚙", color: "#8B5CF6" },
    { label: "AI",      icon: "◈", color: "#A855F7" },
    { label: "Output",  icon: "✓", color: "#C084FC" },
  ];

  return (
    <div className="ps-visual-automation" aria-hidden="true">
      <div className="ps-flow-container">
        {nodes.map((node, i) => (
          <div key={node.label} className="ps-flow-step">
            <div
              className="ps-flow-node"
              style={{
                borderColor: node.color + "60",
                boxShadow: `0 0 12px ${node.color}22`,
              }}
            >
              <div className="ps-flow-node-icon" style={{ color: node.color }}>
                {node.icon}
              </div>
              <div className="ps-flow-node-label">{node.label}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="ps-flow-connector">
                <svg
                  width="40"
                  height="16"
                  viewBox="0 0 40 16"
                  fill="none"
                  className="ps-flow-connector-svg"
                >
                  <line
                    x1="0"
                    y1="8"
                    x2="34"
                    y2="8"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className={`ps-dash-flow ps-dash-flow--${i}`}
                  />
                  <polyline
                    points="30,4 36,8 30,12"
                    stroke={node.color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 3 — System Fixes & Efficiency
   Chaos state (messy overlapping app boxes, red dotted connectors)
   transitions to ordered grid (solid green connectors) +
   completion checkmark.
   ───────────────────────────────────────────────────────────── */
function SystemFixesVisual() {
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

  const apps = [
    { label: "CRM",   color: "#0D95E8" },
    { label: "Email", color: "#8B5CF6" },
    { label: "Sched", color: "#00D4AA" },
    { label: "Acctg", color: "#F59E0B" },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-sf2-root"
      aria-hidden="true"
    >
      {/* Label: before / after */}
      <div className="ps-sf2-labels">
        <span className="ps-sf2-label ps-sf2-label--before">Before</span>
        <span className="ps-sf2-label ps-sf2-label--after">After</span>
      </div>

      {/* The two states share the same DOM — CSS transitions between them */}
      <div className="ps-sf2-stage">
        {/* Chaos connectors (red dashed, tangled) — hidden when in-view */}
        <svg className="ps-sf2-chaos-lines" viewBox="0 0 200 120" fill="none" aria-hidden="true">
          <line x1="50"  y1="30"  x2="150" y2="90"  stroke="#EF4444" strokeWidth="1.2" strokeDasharray="4 3" className="ps-sf2-chaos-line" />
          <line x1="150" y1="30"  x2="40"  y2="85"  stroke="#EF4444" strokeWidth="1.2" strokeDasharray="4 3" className="ps-sf2-chaos-line" />
          <line x1="50"  y1="30"  x2="150" y2="30"  stroke="#EF4444" strokeWidth="1"   strokeDasharray="4 3" className="ps-sf2-chaos-line" />
          <line x1="45"  y1="85"  x2="155" y2="90"  stroke="#EF4444" strokeWidth="1"   strokeDasharray="4 3" className="ps-sf2-chaos-line" />
        </svg>

        {/* Order connectors (green solid) — drawn when in-view */}
        <svg className="ps-sf2-order-lines" viewBox="0 0 200 120" fill="none" aria-hidden="true">
          {/* Horizontal */}
          <line x1="80"  y1="35"  x2="120" y2="35"  stroke="#10B981" strokeWidth="1.5" className="ps-sf2-order-line ps-sf2-order-line--0" />
          <line x1="80"  y1="85"  x2="120" y2="85"  stroke="#10B981" strokeWidth="1.5" className="ps-sf2-order-line ps-sf2-order-line--1" />
          {/* Vertical */}
          <line x1="50"  y1="55"  x2="50"  y2="65"  stroke="#10B981" strokeWidth="1.5" className="ps-sf2-order-line ps-sf2-order-line--2" />
          <line x1="150" y1="55"  x2="150" y2="65"  stroke="#10B981" strokeWidth="1.5" className="ps-sf2-order-line ps-sf2-order-line--3" />
        </svg>

        {/* App boxes — chaos positions → ordered 2x2 grid */}
        {apps.map((app, i) => (
          <div
            key={app.label}
            className={`ps-sf2-app ps-sf2-app--${i}`}
            style={{ "--app-color": app.color } as React.CSSProperties}
          >
            <div className="ps-sf2-app-dot" style={{ background: app.color }} />
            <span className="ps-sf2-app-label">{app.label}</span>
          </div>
        ))}

        {/* Completion checkmark — fades in last */}
        <div className="ps-sf2-check" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8.5" stroke="#10B981" strokeWidth="1" />
            <path
              className="ps-sf2-check-path"
              d="M5 9.5L7.5 12L13 6.5"
              stroke="#10B981"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ps-sf2-check-label">Systems connected</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="ps-sf2-bar-track">
        <div className="ps-sf2-bar-fill" />
        <span className="ps-sf2-bar-label">Efficiency</span>
        <span className="ps-sf2-bar-value">+92%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Cycling bento grid: 4 tiles rotate positions every 3s.
   Tile types: bar chart, line chart, donut chart, metric number.
   ───────────────────────────────────────────────────────────── */
function DashboardVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);

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

  // Cycle tiles every 3s once in view
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setCycle((c) => (c + 1) % 4);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // 4 tile order configurations (each config shifts what's in each quadrant)
  // positions: [topLeft, topRight, bottomLeft, bottomRight] as tile indices
  const orders: [number, number, number, number][] = [
    [0, 1, 2, 3],
    [3, 0, 1, 2],
    [2, 3, 0, 1],
    [1, 2, 3, 0],
  ];
  const currentOrder = orders[cycle];

  return (
    <div
      ref={containerRef}
      className="ps-dbc-root"
      aria-hidden="true"
    >
      {/* Top chrome bar */}
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

      {/* Bento 2x2 grid */}
      <div className="ps-dbc-grid">
        {currentOrder.map((tileIdx, position) => (
          <div
            key={`pos-${position}-tile-${tileIdx}-cycle-${cycle}`}
            className={`ps-dbc-tile ps-dbc-tile--${position} ps-dbc-tile-enter`}
          >
            {tileIdx === 0 && (
              /* Tile 0: Bar chart */
              <div className="ps-dbc-tile-inner">
                <div className="ps-dbc-tile-label">Q4 Revenue</div>
                <div className="ps-dbc-bars">
                  {([0.45, 0.72, 0.58, 0.9, 0.65] as number[]).map((h, i) => (
                    <div key={i} className="ps-dbc-bar-wrap">
                      <div
                        className="ps-dbc-bar"
                        style={{
                          "--bar-h": h,
                          "--bar-delay": `${i * 0.07}s`,
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tileIdx === 1 && (
              /* Tile 1: Line chart */
              <div className="ps-dbc-tile-inner">
                <div className="ps-dbc-tile-label">Growth Trend</div>
                <svg className="ps-dbc-line-svg" viewBox="0 0 100 55" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dbcLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0D95E8" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient id="dbcAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="2 2" />
                  <path
                    d="M0,48 C15,44 30,38 45,28 C60,18 75,10 100,4 L100,50 L0,50 Z"
                    fill="url(#dbcAreaGrad)"
                    opacity="0.8"
                  />
                  <path
                    className="ps-dbc-line-path"
                    d="M0,48 C15,44 30,38 45,28 C60,18 75,10 100,4"
                    stroke="url(#dbcLineGrad)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="4" r="2.5" fill="#8B5CF6" className="ps-dbc-tip-dot" />
                </svg>
              </div>
            )}
            {tileIdx === 2 && (
              /* Tile 2: Donut chart */
              <div className="ps-dbc-tile-inner ps-dbc-tile-inner--center">
                <div className="ps-dbc-tile-label">Retention</div>
                <div className="ps-dbc-donut-wrap">
                  <svg className="ps-dbc-donut-svg" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="24" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
                    <circle
                      className="ps-dbc-donut-ring"
                      cx="32"
                      cy="32"
                      r="24"
                      stroke="#0D95E8"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray="150.8"
                      transform="rotate(-90 32 32)"
                    />
                  </svg>
                  <div className="ps-dbc-donut-center">
                    <span className="ps-dbc-donut-pct">94%</span>
                  </div>
                </div>
              </div>
            )}
            {tileIdx === 3 && (
              /* Tile 3: Big metric */
              <div className="ps-dbc-tile-inner ps-dbc-tile-inner--metric">
                <div className="ps-dbc-tile-label">Monthly Revenue</div>
                <div className="ps-dbc-metric-num">$2.4M</div>
                <div className="ps-dbc-metric-badge">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 7V1M1 4l3-3 3 3" stroke="#10B981" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +18% vs last quarter
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 5 — Revenue Growth Engines
   Top: horizontal funnel with 3 stages + flowing dot particles.
   Bottom: upward trending line chart that draws itself + counter.
   ───────────────────────────────────────────────────────────── */
function RevenueVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function runRevenueCounter() {
      const counterEl = el!.querySelector<HTMLElement>(".ps-rv3-counter-num");
      if (!counterEl) return;
      const captured = counterEl;
      const target = 85000;
      const duration = 2400;
      const start = performance.now() + 600;
      function update(now: number) {
        if (now < start) { requestAnimationFrame(update); return; }
        const progress = Math.min((now - start) / duration, 1);
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const value = Math.floor(eased * target);
        captured.textContent = "$" + value.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else captured.textContent = "$85K+";
      }
      requestAnimationFrame(update);
    }

    if (prefersReduced) {
      el.classList.add("in-view");
      const counterEl = el.querySelector<HTMLElement>(".ps-rv3-counter-num");
      if (counterEl) counterEl.textContent = "$85K+";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            runRevenueCounter();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const funnelStages = [
    { label: "Visitors", width: "100%", color: "rgba(59,130,246,0.25)", border: "rgba(59,130,246,0.5)", dots: [0, 1, 2] },
    { label: "Leads",    width: "65%",  color: "rgba(99,180,246,0.28)", border: "rgba(99,180,246,0.55)", dots: [3, 4] },
    { label: "Customers",width: "36%",  color: "rgba(16,185,129,0.35)", border: "rgba(16,185,129,0.65)", dots: [5] },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-rv3-root"
      aria-hidden="true"
    >
      {/* TOP: Horizontal funnel */}
      <div className="ps-rv3-funnel">
        {funnelStages.map((stage, si) => (
          <div key={stage.label} className="ps-rv3-stage-wrap">
            <div className="ps-rv3-stage-label">{stage.label}</div>
            <div
              className={`ps-rv3-stage-bar ps-rv3-stage-bar--${si}`}
              style={{
                "--stage-width": stage.width,
                "--stage-bg": stage.color,
                "--stage-border": stage.border,
                "--stage-delay": `${si * 0.15}s`,
              } as React.CSSProperties}
            >
              {/* Flowing dots */}
              {stage.dots.map((dotIdx) => (
                <div
                  key={dotIdx}
                  className={`ps-rv3-dot ps-rv3-dot--${dotIdx}`}
                  style={{ "--dot-delay": `${dotIdx * 0.55}s` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Conversion arrow between funnel and chart */}
      <div className="ps-rv3-divider">
        <div className="ps-rv3-divider-line" />
      </div>

      {/* BOTTOM: Growth line chart + counter */}
      <div className="ps-rv3-chart">
        <svg
          className="ps-rv3-line-svg"
          viewBox="0 0 220 80"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rv3LineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="rv3AreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="75" x2="220" y2="75" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
          <line x1="0" y1="50" x2="220" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="0" y1="26" x2="220" y2="26" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="3 3" />
          <path
            className="ps-rv3-area"
            d="M0,72 C30,68 60,62 90,52 C120,42 155,24 200,8 L220,4 L220,75 L0,75 Z"
            fill="url(#rv3AreaGrad)"
          />
          <path
            className="ps-rv3-line"
            d="M0,72 C30,68 60,62 90,52 C120,42 155,24 200,8 L220,4"
            stroke="url(#rv3LineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle className="ps-rv3-tip-dot"  cx="220" cy="4" r="3"   fill="#10B981" />
          <circle className="ps-rv3-tip-ring" cx="220" cy="4" r="6.5" fill="#10B981" fillOpacity="0.2" />
        </svg>

        {/* Counter overlaid bottom-right */}
        <div className="ps-rv3-counter">
          <span className="ps-rv3-counter-label">Monthly Revenue</span>
          <span className="ps-rv3-counter-num">$0</span>
          <span className="ps-rv3-counter-sub">/ mo automated</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPAND ICON
   Small rounded square with outward arrow icon
   ───────────────────────────────────────────────────────────── */
function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M8.5 1.5H12.5V5.5M12.5 1.5L8 6M5.5 12.5H1.5V8.5M1.5 12.5L6 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLOSE ICON
   ───────────────────────────────────────────────────────────── */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1.5 1.5L12.5 12.5M12.5 1.5L1.5 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

const services: ServicePillar[] = [
  {
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, e-commerce — built from scratch, built to perform. Every pixel is intentional, every page is fast, and every experience is designed to convert visitors into customers.",
    href: "/contact",
    visual: <WebsiteVisual />,
    bullets: [
      "Custom responsive design for all devices",
      "SEO-optimized structure and performance",
      "CMS integration for easy content updates",
      "Ongoing maintenance and support",
    ],
  },
  {
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it. Stop paying people to do what software can do better and faster.",
    href: "/contact",
    visual: <AutomationVisual />,
    bullets: [
      "End-to-end workflow automation",
      "AI document and data processing",
      "CRM and email sequence automation",
      "Custom integrations between any tools",
    ],
  },
  {
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech. We audit your stack, eliminate waste, and rebuild the pieces that are holding your team back.",
    href: "/contact",
    visual: <SystemFixesVisual />,
    bullets: [
      "Full technology stack audit",
      "Tool consolidation and cost reduction",
      "Process redesign for maximum efficiency",
      "Team training and adoption support",
    ],
  },
  {
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight. Stop making decisions based on gut feel — know exactly what's working, what's not, and where the money is.",
    href: "/contact",
    visual: <DashboardVisual />,
    bullets: [
      "Real-time KPI and revenue dashboards",
      "Custom reporting for any data source",
      "Automated alerts and anomaly detection",
      "Executive-ready presentation views",
    ],
  },
  {
    title: "Revenue Growth Engines",
    description:
      "Automated lead generation, content engines, and conversion systems that drive revenue while you focus on running your business. Built to scale without adding headcount.",
    href: "/contact",
    visual: <RevenueVisual />,
    bullets: [
      "Automated lead generation pipelines",
      "Content and outreach at scale",
      "Landing pages and conversion optimization",
      "Follow-up sequences that close deals",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   BOTTOM-SHEET DIALOG
   Stripe-style: slides up from bottom, light overlay, staggered
   content reveal, scroll-lock with scrollbar compensation.
   ───────────────────────────────────────────────────────────── */
interface BottomSheetDialogProps {
  service: ServicePillar;
  onClose: () => void;
}

function BottomSheetDialog({ service, onClose }: BottomSheetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mount → next frame → add open class (drives CSS transitions)
  useEffect(() => {
    // Compensate for scrollbar width before locking scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Defer open to next paint so the initial transform is rendered first
    const raf = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate out, then call onClose after transition completes
  function handleClose() {
    setIsOpen(false);
    // Wait for panel slide-down (700ms) + overlay fade (400ms); use the longer one
    setTimeout(onClose, 720);
  }

  // Focus the panel on open for accessibility
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  return createPortal(
    <>
      {/* Overlay — light Stripe blue-white */}
      <div
        className={`ps-dialog-overlay${isOpen ? " ps-dialog-overlay--open" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`ps-dialog-panel${isOpen ? " ps-dialog-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        tabIndex={-1}
      >
        {/* Visual area — large animated preview */}
        <div className="ps-dialog-visual" aria-hidden="true">
          {service.visual}

          {/* Close button floats over the visual */}
          <button
            className="ps-dialog-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content area — staggered reveal */}
        <div className="ps-dialog-content">
          {/* Child 1 */}
          <h3 className="ps-dialog-title ps-dialog-reveal">{service.title}</h3>

          {/* Child 2 */}
          <p className="ps-dialog-desc ps-dialog-reveal">{service.description}</p>

          {/* Child 3 */}
          <ul className="ps-dialog-bullets ps-dialog-reveal" aria-label="What's included">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="ps-dialog-bullet">{bullet}</li>
            ))}
          </ul>

          {/* Child 4 */}
          <Link
            href={service.href}
            className="ps-dialog-cta ps-dialog-reveal"
            onClick={handleClose}
          >
            Get Started
            <svg
              className="ps-dialog-cta-arrow"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];

    if (prefersReduced) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!gridRef.current) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }, []);

  return (
    <section
      className="ps-services"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="ps-services-header">
        <div className="ps-eyebrow ps-eyebrow--light">Services</div>
        <h2
          id="services-heading"
          className="ps-section-heading ps-section-heading--light"
        >
          What We Build
        </h2>
      </div>

      <div className="ps-bento-grid" ref={gridRef}>
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`ps-bento-card ${i === 0 ? "ps-bento-card--large" : ""}`}
            onClick={() => handleExpand(i)}
            role="button"
            tabIndex={0}
            aria-label={`Expand: ${service.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleExpand(i);
              }
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            {/* Visual fills the entire card */}
            <div className="ps-bento-card-visual" aria-hidden="true">
              {service.visual}
            </div>

            {/* Gradient overlay at top for text readability */}
            <div className="ps-bento-card-overlay" />

            {/* Title row: title top-left, expand icon top-right */}
            <div className="ps-bento-card-header">
              <h3 className="ps-bento-card-title">{service.title}</h3>
              <span className="ps-card-icon-btn" aria-hidden="true">
                <ExpandIcon />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-sheet dialog portal */}
      {expandedIndex !== null && (
        <BottomSheetDialog
          service={services[expandedIndex]}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
