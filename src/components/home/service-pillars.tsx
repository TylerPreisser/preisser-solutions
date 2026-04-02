"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

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
   ───────────────────────────────────────────────────────────── */
function AutomationVisual() {
  const nodes = [
    { label: "Trigger", icon: "⚡", color: "#635BFF" },
    { label: "Process", icon: "⚙", color: "#8B5CF6" },
    { label: "AI", icon: "◈", color: "#A855F7" },
    { label: "Output", icon: "✓", color: "#C084FC" },
  ];

  return (
    <div className="ps-visual-automation" aria-hidden="true">
      <div className="ps-flow-container">
        {nodes.map((node, i) => (
          <div key={node.label} className="ps-flow-step">
            {/* Node */}
            <div className="ps-flow-node" style={{ borderColor: node.color + "60", boxShadow: `0 0 12px ${node.color}22` }}>
              <div className="ps-flow-node-icon" style={{ color: node.color }}>
                {node.icon}
              </div>
              <div className="ps-flow-node-label">{node.label}</div>
            </div>
            {/* Connector arrow — not after last node */}
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

      {/* Animated pulse dot that travels across the entire flow */}
      <div className="ps-flow-pulse-track">
        <div className="ps-flow-pulse-dot" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 3 — System Fixes & Efficiency
   Disconnected apps on left → unified dashboard on right
   with animated data flow lines
   ───────────────────────────────────────────────────────────── */
function SystemFixesVisual() {
  const sources = [
    { label: "CRM", color: "#0D95E8" },
    { label: "Acctg", color: "#00D4AA" },
    { label: "Sched", color: "#34d399" },
  ];

  return (
    <div className="ps-visual-systems" aria-hidden="true">
      {/* Source apps — left */}
      <div className="ps-sys-sources">
        {sources.map((src, i) => (
          <div
            key={src.label}
            className={`ps-sys-source ps-sys-source--${i}`}
            style={{ borderColor: src.color + "50", boxShadow: `0 0 8px ${src.color}20` }}
          >
            <div className="ps-sys-source-dot" style={{ background: src.color }} />
            <span className="ps-sys-source-label">{src.label}</span>
          </div>
        ))}
      </div>

      {/* Animated connection lines — SVG */}
      <div className="ps-sys-connections">
        <svg width="100%" height="100%" viewBox="0 0 80 120" preserveAspectRatio="none">
          {/* Lines from each source to the center of the dashboard */}
          {[0, 1, 2].map((i) => {
            const y1 = 20 + i * 40; // source midpoints at y=20, 60, 100
            const colors = ["#0D95E8", "#00D4AA", "#34d399"];
            return (
              <line
                key={i}
                x1="0"
                y1={y1}
                x2="80"
                y2="60"
                stroke={colors[i]}
                strokeWidth="1.5"
                strokeDasharray="5 4"
                className={`ps-sys-line ps-sys-line--${i}`}
              />
            );
          })}
        </svg>
      </div>

      {/* Unified dashboard — right */}
      <div className="ps-sys-dashboard">
        <div className="ps-sys-dashboard-header">
          <div className="ps-sys-dashboard-dot ps-sys-dashboard-dot--green" />
          <span>Unified</span>
        </div>
        <div className="ps-sys-dashboard-bars">
          <div className="ps-sys-bar ps-sys-bar--1" />
          <div className="ps-sys-bar ps-sys-bar--2" />
          <div className="ps-sys-bar ps-sys-bar--3" />
          <div className="ps-sys-bar ps-sys-bar--4" />
        </div>
        <div className="ps-sys-metric">
          <span className="ps-sys-metric-value" style={{ color: "#00D4AA" }}>+34%</span>
          <span className="ps-sys-metric-label">efficiency</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Bar chart + animated SVG line graph + metric chips
   ───────────────────────────────────────────────────────────── */
function DashboardVisual() {
  // Bar heights as percentages
  const bars = [45, 70, 55, 85, 60, 90];

  return (
    <div className="ps-visual-dashboard" aria-hidden="true">
      {/* Header row with metric chips */}
      <div className="ps-dash-header">
        <div className="ps-dash-metric">
          <span className="ps-dash-metric-num" style={{ color: "#F59E0B" }}>$2.4M</span>
          <span className="ps-dash-metric-label">Revenue</span>
        </div>
        <div className="ps-dash-metric">
          <span className="ps-dash-metric-num" style={{ color: "#34d399" }}>↑ 18%</span>
          <span className="ps-dash-metric-label">Growth</span>
        </div>
        <div className="ps-dash-metric">
          <span className="ps-dash-metric-num" style={{ color: "#0D95E8" }}>94%</span>
          <span className="ps-dash-metric-label">Retention</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="ps-dash-bars">
        {bars.map((h, i) => (
          <div key={i} className="ps-dash-bar-wrap">
            <div
              className={`ps-dash-bar ps-dash-bar--${i}`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="ps-dash-baseline" />

      {/* Animated SVG line graph */}
      <div className="ps-dash-line-graph">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
          className="ps-dash-line-svg"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Fill area under the line */}
          <path
            d="M0,40 L30,32 L60,26 L90,20 L120,14 L150,10 L180,6 L200,4 L200,50 L0,50 Z"
            fill="url(#lineGrad)"
          />
          {/* The line itself — animated draw */}
          <path
            d="M0,40 L30,32 L60,26 L90,20 L120,14 L150,10 L180,6 L200,4"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ps-line-draw"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 5 — Revenue Growth Engines
   Funnel with falling dots and stage labels
   ───────────────────────────────────────────────────────────── */
function RevenueVisual() {
  return (
    <div className="ps-visual-revenue" aria-hidden="true">
      {/* Funnel shape built from divs */}
      <div className="ps-funnel">
        {/* Falling dots layer — rendered above funnel via z-index */}
        <div className="ps-funnel-drops">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`ps-drop ps-drop--${i}`} />
          ))}
        </div>

        <div className="ps-funnel-stage ps-funnel-stage--top">
          <div className="ps-funnel-label">Leads</div>
          <div className="ps-funnel-bar" style={{ width: "100%", background: "rgba(34,197,94,0.15)", borderColor: "rgba(34,197,94,0.3)" }} />
        </div>
        <div className="ps-funnel-stage ps-funnel-stage--mid">
          <div className="ps-funnel-label">Engaged</div>
          <div className="ps-funnel-bar" style={{ width: "68%", background: "rgba(34,197,94,0.22)", borderColor: "rgba(34,197,94,0.4)" }} />
        </div>
        <div className="ps-funnel-stage ps-funnel-stage--bottom">
          <div className="ps-funnel-label">Converted</div>
          <div className="ps-funnel-bar" style={{ width: "36%", background: "rgba(34,197,94,0.35)", borderColor: "rgba(34,197,94,0.6)" }} />
        </div>

        {/* Revenue output */}
        <div className="ps-funnel-output">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "inline" }}>
            <circle cx="8" cy="8" r="7" fill="rgba(34,197,94,0.2)" stroke="#22C55E" strokeWidth="1" />
            <path d="M5 8l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ps-funnel-output-text">Revenue</span>
          <span className="ps-funnel-output-num">+247%</span>
        </div>
      </div>
    </div>
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
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);

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
          <Link
            key={service.title}
            href={service.href}
            className={`ps-bento-card ${i === 0 ? "ps-bento-card--large" : ""}`}
          >
            <div className="ps-bento-card-visual" aria-hidden="true">
              {service.visual}
            </div>
            <div className="ps-bento-card-content">
              <h3 className="ps-bento-card-title">{service.title}</h3>
              <p className="ps-bento-card-desc">{service.description}</p>
              <span className="ps-bento-card-link">
                Learn more
                <svg
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
