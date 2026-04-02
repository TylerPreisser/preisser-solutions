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
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 1 — Websites & Applications
   Mini browser chrome + simplified site layout
   ───────────────────────────────────────────────────────────── */
function WebsiteVisual() {
  return (
    <div className="ps-visual-website" aria-hidden="true">
      {/* Browser chrome bar */}
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

      {/* Simulated website layout */}
      <div className="ps-site-layout">
        {/* Dark nav */}
        <div className="ps-site-nav">
          <div className="ps-site-nav-logo" />
          <div className="ps-site-nav-dots">
            <span /><span /><span />
          </div>
        </div>

        {/* Hero */}
        <div className="ps-site-hero">
          <div className="ps-site-hero-heading" />
          <div className="ps-site-hero-sub" />
          <div className="ps-site-hero-sub ps-site-hero-sub--short" />
        </div>

        {/* 3-column card row */}
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
   Animated assembly: 5 tool icons scatter → assemble into
   organized grid, SVG connection lines draw in, progress bar
   fills, green ripple confirms "connected".
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

  const tools = [
    { label: "CRM",   color: "#0D95E8", scatterX: "-22px", scatterY: "-18px", scatterR: "-12deg" },
    { label: "Email", color: "#8B5CF6", scatterX: "20px",  scatterY: "-14px", scatterR: "10deg"  },
    { label: "Sched", color: "#00D4AA", scatterX: "-18px", scatterY: "16px",  scatterR: "-8deg"  },
    { label: "Acctg", color: "#F59E0B", scatterX: "24px",  scatterY: "20px",  scatterR: "14deg"  },
    { label: "Data",  color: "#EC4899", scatterX: "0px",   scatterY: "24px",  scatterR: "-6deg"  },
  ];

  return (
    <div
      ref={containerRef}
      className="ps-sf-root"
      aria-hidden="true"
    >
      {/* Tool icon grid — 2 top, 1 center, 2 bottom */}
      <div className="ps-sf-icons">
        {tools.map((tool, i) => (
          <div
            key={tool.label}
            className={`ps-sf-icon ps-sf-icon--${i}`}
            style={{
              "--scatter-x": tool.scatterX,
              "--scatter-y": tool.scatterY,
              "--scatter-r": tool.scatterR,
              "--icon-color": tool.color,
            } as React.CSSProperties}
          >
            <span className="ps-sf-icon-dot" style={{ background: tool.color }} />
            <span className="ps-sf-icon-label">{tool.label}</span>
          </div>
        ))}
      </div>

      {/* SVG connection lines between icons — drawn on .in-view */}
      <svg className="ps-sf-lines" viewBox="0 0 160 120" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="sfLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Lines connecting grid positions roughly: top-left, top-right, center, bottom-left, bottom-right */}
        <line className="ps-sf-line ps-sf-line--0" x1="32" y1="28" x2="80" y2="60" stroke="url(#sfLineGrad)" strokeWidth="1" />
        <line className="ps-sf-line ps-sf-line--1" x1="128" y1="28" x2="80" y2="60" stroke="url(#sfLineGrad)" strokeWidth="1" />
        <line className="ps-sf-line ps-sf-line--2" x1="32" y1="92" x2="80" y2="60" stroke="url(#sfLineGrad)" strokeWidth="1" />
        <line className="ps-sf-line ps-sf-line--3" x1="128" y1="92" x2="80" y2="60" stroke="url(#sfLineGrad)" strokeWidth="1" />
        {/* Hub circle */}
        <circle className="ps-sf-hub" cx="80" cy="60" r="6" fill="none" stroke="#00D4AA" strokeWidth="1.5" />
        <circle className="ps-sf-hub-inner" cx="80" cy="60" r="3" fill="#00D4AA" />
      </svg>

      {/* Progress bar — fills after icons assemble */}
      <div className="ps-sf-bar-track">
        <div className="ps-sf-bar-fill" />
        <span className="ps-sf-bar-label">Efficiency</span>
        <span className="ps-sf-bar-value">+92%</span>
      </div>

      {/* Center pulse ripple — fires after bar fills */}
      <div className="ps-sf-ripple" aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Mini dashboard mockup: glassmorphism frame, LIVE indicator,
   3 KPI tiles with counting numbers, SVG line chart that draws
   itself with gradient fill + glowing tip, 4 bar columns that
   grow from 0 with staggered overshoot.
   ───────────────────────────────────────────────────────────── */
function DashboardVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  const kpis = [
    { target: 2.4, prefix: "$", suffix: "M", label: "Revenue", color: "#F59E0B" },
    { target: 18,  prefix: "+", suffix: "%", label: "Growth",  color: "#34D399" },
    { target: 94,  prefix: "",  suffix: "%", label: "Retain",  color: "#0D95E8" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function runCounters() {
      kpis.forEach((kpi, i) => {
        const spanEl = el!.querySelector<HTMLElement>(`.ps-db2-kpi-num[data-idx="${i}"]`);
        if (!spanEl) return;
        const duration = 1600;
        const delay = i * 120;
        const start = performance.now() + delay;
        const captured = spanEl;
        function update(now: number) {
          if (now < start) { requestAnimationFrame(update); return; }
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = eased * kpi.target;
          captured.textContent = kpi.prefix + (kpi.target < 10 ? val.toFixed(1) : Math.floor(val).toString()) + kpi.suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }

    if (prefersReduced) {
      el.classList.add("in-view");
      kpis.forEach((kpi, i) => {
        const span = el.querySelector<HTMLElement>(`.ps-db2-kpi-num[data-idx="${i}"]`);
        if (span) span.textContent = kpi.prefix + kpi.target + kpi.suffix;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            runCounters();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="ps-db2-root"
      aria-hidden="true"
    >
      {/* Glassmorphism dashboard frame */}
      <div className="ps-db2-frame">
        {/* Frame chrome top bar */}
        <div className="ps-db2-chrome">
          <div className="ps-db2-chrome-dots">
            <span style={{ background: "#FF5F57" }} />
            <span style={{ background: "#FEBC2E" }} />
            <span style={{ background: "#28C840" }} />
          </div>
          <span className="ps-db2-chrome-title">Analytics</span>
          {/* LIVE indicator */}
          <div className="ps-db2-live">
            <span className="ps-db2-live-dot" />
            <span className="ps-db2-live-label">LIVE</span>
          </div>
        </div>

        {/* KPI tiles row */}
        <div className="ps-db2-kpis">
          {kpis.map((kpi, i) => (
            <div key={kpi.label} className="ps-db2-kpi-tile" style={{ "--kpi-delay": `${i * 0.1}s` } as React.CSSProperties}>
              <span
                className="ps-db2-kpi-num"
                data-idx={i}
                style={{ color: kpi.color }}
              >
                {kpi.prefix}0{kpi.suffix}
              </span>
              <span className="ps-db2-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* SVG line chart */}
        <div className="ps-db2-chart-wrap">
          <svg
            className="ps-db2-chart-svg"
            viewBox="0 0 200 70"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="db2LineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0D95E8" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="db2AreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line x1="0" y1="70" x2="200" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="46" x2="200" y2="46" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="23" x2="200" y2="23" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Area fill — fades in after line draws */}
            <path
              className="ps-db2-chart-area"
              d="M0,62 C30,56 60,48 90,38 C120,28 150,16 180,10 L200,6 L200,70 L0,70 Z"
              fill="url(#db2AreaGrad)"
            />
            {/* Main line — draws via stroke-dashoffset */}
            <path
              className="ps-db2-chart-line"
              d="M0,62 C30,56 60,48 90,38 C120,28 150,16 180,10 L200,6"
              stroke="url(#db2LineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Glowing tip dot */}
            <circle className="ps-db2-tip-dot" cx="200" cy="6" r="3" fill="#8B5CF6" />
            <circle className="ps-db2-tip-ring" cx="200" cy="6" r="6" fill="#8B5CF6" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Bar chart row */}
        <div className="ps-db2-bars">
          {[0.55, 0.75, 1.0, 0.65].map((h, i) => (
            <div key={i} className="ps-db2-bar-col">
              <div
                className="ps-db2-bar"
                style={{
                  "--bar-scale": h,
                  "--bar-delay": `${0.3 + i * 0.1}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 5 — Revenue Growth Engines
   Left: funnel (3 stages narrowing). Right: SVG growth curve
   that draws itself. Floating badges pop in with overshoot.
   Revenue counter ticks up at bottom-right.
   ───────────────────────────────────────────────────────────── */
function RevenueVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  const badges = [
    { label: "+$12K", delay: "1.0s", top: "52%", left: "52%" },
    { label: "+$28K", delay: "1.7s", top: "30%", left: "62%" },
    { label: "+$45K", delay: "2.3s", top: "12%", left: "72%" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function runRevenueCounter() {
      const counterEl = el!.querySelector<HTMLElement>(".ps-rev2-counter-num");
      if (!counterEl) return;
      const captured = counterEl;
      const target = 85000;
      const duration = 2200;
      const start = performance.now() + 500;
      function update(now: number) {
        if (now < start) { requestAnimationFrame(update); return; }
        const progress = Math.min((now - start) / duration, 1);
        // easeInOutCubic
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const value = Math.floor(eased * target);
        captured.textContent = "$" + value.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else captured.textContent = "$85,000+";
      }
      requestAnimationFrame(update);
    }

    if (prefersReduced) {
      el.classList.add("in-view");
      const counterEl = el.querySelector<HTMLElement>(".ps-rev2-counter-num");
      if (counterEl) counterEl.textContent = "$85,000+";
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

  return (
    <div
      ref={containerRef}
      className="ps-rev2-root"
      aria-hidden="true"
    >
      {/* LEFT: Funnel */}
      <div className="ps-rev2-funnel">
        <div className="ps-rev2-funnel-label">Awareness</div>
        <div
          className="ps-rev2-funnel-bar ps-rev2-funnel-bar--0"
          style={{ "--funnel-delay": "0s" } as React.CSSProperties}
        />
        <div className="ps-rev2-funnel-label">Engagement</div>
        <div
          className="ps-rev2-funnel-bar ps-rev2-funnel-bar--1"
          style={{ "--funnel-delay": "0.12s" } as React.CSSProperties}
        />
        <div className="ps-rev2-funnel-label">Conversion</div>
        <div
          className="ps-rev2-funnel-bar ps-rev2-funnel-bar--2"
          style={{ "--funnel-delay": "0.24s" } as React.CSSProperties}
        />
        {/* Upward particles near funnel bottom */}
        <div className="ps-rev2-particles" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`ps-rev2-particle ps-rev2-particle--${i}`} />
          ))}
        </div>
      </div>

      {/* RIGHT: Growth curve + badges + counter */}
      <div className="ps-rev2-chart">
        <svg
          className="ps-rev2-growth-svg"
          viewBox="0 0 140 110"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rev2LineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="rev2AreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid */}
          <line x1="0" y1="100" x2="140" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="0" y1="68"  x2="140" y2="68"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="36"  x2="140" y2="36"  stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Area fill */}
          <path
            className="ps-rev2-area"
            d="M10,90 C30,84 50,78 70,65 C90,52 110,30 130,12 L130,100 L10,100 Z"
            fill="url(#rev2AreaGrad)"
          />
          {/* Growth curve */}
          <path
            className="ps-rev2-line"
            d="M10,90 C30,84 50,78 70,65 C90,52 110,30 130,12"
            stroke="url(#rev2LineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Glowing endpoint */}
          <circle className="ps-rev2-tip-dot"  cx="130" cy="12" r="3.5" fill="#10B981" />
          <circle className="ps-rev2-tip-ring" cx="130" cy="12" r="7"   fill="#10B981" fillOpacity="0.2" />
        </svg>

        {/* Floating revenue badges */}
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="ps-rev2-badge"
            style={{
              "--badge-delay": badge.delay,
              top: badge.top,
              left: badge.left,
            } as React.CSSProperties}
          >
            {badge.label}
          </div>
        ))}

        {/* Revenue counter at bottom-right */}
        <div className="ps-rev2-counter">
          <span className="ps-rev2-counter-label">Revenue Added</span>
          <span className="ps-rev2-counter-num">$0</span>
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
      "Professional sites, custom apps, client portals, e-commerce — built from scratch, built to perform.",
    href: "/services",
    visual: <WebsiteVisual />,
  },
  {
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    href: "/services",
    visual: <AutomationVisual />,
  },
  {
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    href: "/services",
    visual: <SystemFixesVisual />,
  },
  {
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    href: "/services",
    visual: <DashboardVisual />,
  },
  {
    title: "Revenue Growth Engines",
    description:
      "Automated lead generation, content engines, and conversion systems that drive revenue while you focus on running your business.",
    href: "/services",
    visual: <RevenueVisual />,
  },
];

/* ─────────────────────────────────────────────────────────────
   EXPANDED CARD MODAL
   Rendered via portal at document.body
   ───────────────────────────────────────────────────────────── */
interface ExpandedModalProps {
  service: ServicePillar;
  onClose: () => void;
}

function ExpandedModal({ service, onClose }: ExpandedModalProps) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while open — compensate for scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="ps-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <div
        className="ps-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual fills the top portion of the modal */}
        <div className="ps-modal-visual">
          {service.visual}

          {/* Gradient overlay so title is readable */}
          <div className="ps-modal-visual-overlay" />

          {/* Title overlay */}
          <div className="ps-modal-title-row">
            <h3 className="ps-modal-title">{service.title}</h3>
            <button
              className="ps-card-icon-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Description content below the visual */}
        <div className="ps-modal-content">
          <p className="ps-modal-desc">{service.description}</p>
          <Link href={service.href} className="ps-modal-link" onClick={onClose}>
            Learn more
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
    </div>,
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

      {/* Modal portal */}
      {expandedIndex !== null && (
        <ExpandedModal
          service={services[expandedIndex]}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
