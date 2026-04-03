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
   Three n8n-style workflow diagrams that cycle every 4 seconds.
   Triggered on scroll into view (IntersectionObserver).

   Architecture: Entire diagram rendered as a single SVG so that
   node boxes, connection lines, and dots all share one coordinate
   system — eliminating the mixed HTML/SVG scaling mismatch.

   ViewBox: 412 × 200
   Node sizes (in SVG units):
     Regular: 52×52, half=26
     Large AI: 72×72, half=36
   Connection dots: r=3.5
   ───────────────────────────────────────────────────────────── */

/* ── SVG icon path data for each node type ─── */
const ICON_PATHS = {
  email:      "M2 7l10 7 10-7M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2z",
  file:       "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8",
  brain:      "M9.5 2A2.5 2.5 0 0112 4.5V7h-1a7 7 0 00-7 7v1a1 1 0 000 2h1v1a2 2 0 002 2h10a2 2 0 002-2v-1h1a1 1 0 000-2v-1a7 7 0 00-7-7h-1V4.5A2.5 2.5 0 0114.5 2",
  check:      "M20 6L9 17l-5-5",
  flag:       "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  user:       "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8zM19 8v6M22 11h-6",
  phone:      "M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z",
  monitor:    "M2 3h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2zM8 21h8M12 17v4",
  database:   "M12 2C7.03 2 3 3.34 3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5c0-1.66-4.03-3-9-3zM3 5c0 1.66 4.03 3 9 3s9-1.34 9-3M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3",
  calendar:   "M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2zM16 2v4M8 2v4M1 10h22",
  clock:      "M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2",
  pen:        "M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z",
  search:     "M11 3a8 8 0 100 16A8 8 0 0011 3zM21 21l-4.35-4.35M8 11h6M11 8v6",
  upload:     "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  bars:       "M18 20V10M12 20V4M6 20v-6",
} as const;

type IconKey = keyof typeof ICON_PATHS;

interface SvgNode {
  id: string;
  cx: number;
  cy: number;
  label: string;
  color: string;
  large?: boolean;
  iconKey: IconKey;
}

interface SvgConn {
  from: string;
  to: string;
  color: string;
}

interface SvgFlow {
  id: string;
  title: string;
  nodes: SvgNode[];
  connections: SvgConn[];
}

const REG_HALF = 26; // half of 52px regular node
const LG_HALF = 36;  // half of 72px large node

const N8N_FLOWS: SvgFlow[] = [
  {
    id: "invoice",
    title: "Invoice Processing",
    nodes: [
      { id: "email",   cx: 54,  cy: 100, label: "Email",    color: "#635BFF", iconKey: "email" },
      { id: "extract", cx: 160, cy: 100, label: "Extract",  color: "#8B5CF6", iconKey: "file" },
      { id: "ai",      cx: 265, cy: 100, label: "AI Process", color: "#A855F7", large: true, iconKey: "brain" },
      { id: "approve", cx: 358, cy: 58,  label: "Approve",  color: "#10B981", iconKey: "check" },
      { id: "flag",    cx: 358, cy: 142, label: "Flag",     color: "#F59E0B", iconKey: "flag" },
    ],
    connections: [
      { from: "email",   to: "extract", color: "#635BFF" },
      { from: "extract", to: "ai",      color: "#8B5CF6" },
      { from: "ai",      to: "approve", color: "#10B981" },
      { from: "ai",      to: "flag",    color: "#F59E0B" },
    ],
  },
  {
    id: "onboarding",
    title: "Customer Onboarding",
    nodes: [
      { id: "signup",  cx: 54,  cy: 100, label: "Signup",    color: "#0EA5E9", iconKey: "user" },
      { id: "welcome", cx: 160, cy: 100, label: "Welcome",   color: "#6366F1", iconKey: "phone" },
      { id: "account", cx: 265, cy: 100, label: "Create Acct", color: "#8B5CF6", large: true, iconKey: "monitor" },
      { id: "crm",     cx: 358, cy: 58,  label: "Add to CRM", color: "#10B981", iconKey: "database" },
      { id: "demo",    cx: 358, cy: 142, label: "Schedule",  color: "#F97316", iconKey: "calendar" },
    ],
    connections: [
      { from: "signup",  to: "welcome", color: "#0EA5E9" },
      { from: "welcome", to: "account", color: "#6366F1" },
      { from: "account", to: "crm",     color: "#10B981" },
      { from: "account", to: "demo",    color: "#F97316" },
    ],
  },
  {
    id: "content",
    title: "Content Pipeline",
    nodes: [
      { id: "schedule", cx: 54,  cy: 100, label: "Schedule", color: "#06B6D4", iconKey: "clock" },
      { id: "generate", cx: 160, cy: 100, label: "Generate", color: "#8B5CF6", iconKey: "pen" },
      { id: "review",   cx: 265, cy: 100, label: "AI Review", color: "#A855F7", large: true, iconKey: "search" },
      { id: "publish",  cx: 358, cy: 58,  label: "Publish",  color: "#10B981", iconKey: "upload" },
      { id: "analytics",cx: 358, cy: 142, label: "Analytics",color: "#F59E0B", iconKey: "bars" },
    ],
    connections: [
      { from: "schedule", to: "generate", color: "#06B6D4" },
      { from: "generate", to: "review",   color: "#8B5CF6" },
      { from: "review",   to: "publish",  color: "#10B981" },
      { from: "review",   to: "analytics",color: "#F59E0B" },
    ],
  },
];

function getEdge(node: SvgNode, side: "left" | "right") {
  const half = node.large ? LG_HALF : REG_HALF;
  return { x: side === "right" ? node.cx + half : node.cx - half, y: node.cy };
}

function FlowSvg({ flow }: { flow: SvgFlow }) {
  const nodeMap = new Map(flow.nodes.map((n) => [n.id, n]));

  return (
    <svg
      className="ps-n8n-svg"
      viewBox="0 0 412 200"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection lines drawn first so they appear behind nodes */}
      {flow.connections.map((conn) => {
        const src = nodeMap.get(conn.from);
        const dst = nodeMap.get(conn.to);
        if (!src || !dst) return null;

        const start = getEdge(src, "right");
        const end = getEdge(dst, "left");
        const dx = Math.abs(end.x - start.x);
        const cp = Math.min(dx * 0.42, 52);
        const d = `M${start.x},${start.y} C${start.x + cp},${start.y} ${end.x - cp},${end.y} ${end.x},${end.y}`;

        return (
          <g key={`conn-${conn.from}-${conn.to}`}>
            <path d={d} stroke={conn.color} strokeWidth="1.5" strokeOpacity="0.45" />
            <circle cx={start.x} cy={start.y} r="3.5" fill={conn.color} opacity="0.75" />
            <circle cx={end.x}   cy={end.y}   r="3.5" fill={conn.color} opacity="0.75" />
          </g>
        );
      })}

      {/* Nodes rendered on top of connections */}
      {flow.nodes.map((node) => {
        const half = node.large ? LG_HALF : REG_HALF;
        const size = half * 2;
        const x = node.cx - half;
        const y = node.cy - half;

        // Icon scale: map 0-24 to iconSize px, centered in node
        const iconSize = node.large ? 18 : 14;
        const iconX = node.cx - iconSize / 2;
        const iconY = node.cy - iconSize / 2 - 4; // shift up slightly to make room for label

        return (
          <g key={node.id}>
            {/* Node background rect */}
            <rect
              x={x}
              y={y}
              width={size}
              height={size}
              rx={node.large ? 14 : 12}
              fill="rgba(255,255,255,0.04)"
              stroke={node.color}
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            {/* Subtle glow for large node — extra rect with blur */}
            {node.large && (
              <rect
                x={x - 4}
                y={y - 4}
                width={size + 8}
                height={size + 8}
                rx={18}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                strokeOpacity="0.15"
              />
            )}
            {/* Icon — SVG path scaled via transform */}
            <g transform={`translate(${iconX}, ${iconY}) scale(${iconSize / 24})`}>
              <path
                d={ICON_PATHS[node.iconKey]}
                stroke={node.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
            </g>
            {/* Label text below icon */}
            <text
              x={node.cx}
              y={node.cy + half - 7}
              textAnchor="middle"
              fontSize={node.large ? 7 : 6.5}
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="0.04em"
              fill={node.color}
              opacity="0.85"
              style={{ textTransform: "uppercase" } as React.CSSProperties}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function AutomationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFlow, setActiveFlow] = useState(0);
  const [prevFlow, setPrevFlow] = useState<number | null>(null);
  const hasStarted = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      hasStarted.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            observer.unobserve(el);

            intervalRef.current = setInterval(() => {
              setActiveFlow((current) => {
                const next = (current + 1) % N8N_FLOWS.length;
                setPrevFlow(current);
                return next;
              });
            }, 4000);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ps-visual-automation"
      aria-hidden="true"
    >
      {/* Flow title */}
      <div className="ps-n8n-label">{N8N_FLOWS[activeFlow].title}</div>

      {/* Sliding stage */}
      <div className="ps-n8n-stage">
        {N8N_FLOWS.map((flow, index) => {
          const isActive = index === activeFlow;
          const isPrev = index === prevFlow;
          return (
            <div
              key={flow.id}
              className={`ps-n8n-slide${isActive ? " ps-n8n-slide--active" : ""}${isPrev ? " ps-n8n-slide--exit" : ""}`}
            >
              <FlowSvg flow={flow} />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="ps-n8n-dots">
        {N8N_FLOWS.map((flow, index) => (
          <div
            key={flow.id}
            className={`ps-n8n-dot${index === activeFlow ? " ps-n8n-dot--active" : ""}`}
          />
        ))}
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

const HEATMAP_ROWS = 5;
const HEATMAP_COLS = 9;
const HEATMAP_LEVELS = [0, 1, 1, 2, 2, 2, 3, 3, 4];
const heatmapCells: number[][] = Array.from({ length: HEATMAP_ROWS }, (_, r) =>
  Array.from({ length: HEATMAP_COLS }, (_, c) =>
    HEATMAP_LEVELS[(r * HEATMAP_COLS + c * 3 + r * 2) % HEATMAP_LEVELS.length]
  )
);

const dashboardBars = [0.38, 0.66, 0.53, 0.84, 0.61, 0.74, 0.92];
const dashboardMetrics = [
  { label: "Retention", value: 94, tone: "blue" },
  { label: "Close Rate", value: 72, tone: "cyan" },
  { label: "NPS", value: 88, tone: "violet" },
  { label: "Forecast", value: 81, tone: "green" },
] as const;

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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="ps-dbc-root"
      aria-hidden="true"
    >
      <div className="ps-dbc-layout">
        <DashboardScene key={playToken} animated={playToken > 0} />
      </div>
    </div>
  );
}

function DashboardScene({ animated }: { animated: boolean }) {
  return (
    <div className={`ps-dbc-stage${animated ? " ps-dbc-stage--play" : ""}`}>
      <section className="ps-dbc-panel ps-dbc-panel--revenue">
        <div className="ps-dbc-tile-label">Revenue Mix</div>
        <div className="ps-dbc-bars">
          {dashboardBars.map((height, index) => (
            <div key={index} className="ps-dbc-bar-wrap">
              <div
                className="ps-dbc-bar"
                style={{
                  "--bar-h": height,
                  "--bar-delay": `${index * 0.08}s`,
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="ps-dbc-panel ps-dbc-panel--activity">
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
      </section>

      <section className="ps-dbc-panel ps-dbc-panel--kpis">
        <div className="ps-dbc-tile-label">Key Metrics</div>
        <div className="ps-dbc-kpi-grid">
          {dashboardMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`ps-dbc-kpi-card ps-dbc-kpi-card--${metric.tone}`}
              style={{ "--metric-delay": `${0.18 + index * 0.1}s` } as React.CSSProperties}
            >
              <div className="ps-dbc-kpi-ring-wrap">
                <svg className="ps-dbc-kpi-ring-svg" viewBox="0 0 72 72" fill="none">
                  <circle
                    cx="36"
                    cy="36"
                    r="26"
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="6"
                  />
                  <circle
                    className="ps-dbc-kpi-ring"
                    cx="36"
                    cy="36"
                    r="26"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="163.36"
                    transform="rotate(-90 36 36)"
                    style={{
                      "--ring-offset": `${163.36 * (1 - metric.value / 100)}`,
                    } as React.CSSProperties}
                  />
                </svg>
                <div className="ps-dbc-kpi-value">{metric.value}%</div>
              </div>
              <div className="ps-dbc-kpi-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>
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
