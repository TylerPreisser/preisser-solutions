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
   Before/After: tangled lines on left become clean on right
   ───────────────────────────────────────────────────────────── */
function SystemFixesVisual() {
  return (
    <div className="ps-visual-systems" aria-hidden="true">
      {/* BEFORE panel */}
      <div className="ps-sys-panel ps-sys-panel--before">
        <div className="ps-sys-panel-label">Before</div>
        <div className="ps-sys-nodes">
          <div className="ps-sys-node ps-sys-node--a" style={{ borderColor: "rgba(239,68,68,0.5)", color: "#EF4444" }}>
            <span className="ps-sys-node-dot" style={{ background: "#EF4444" }} />
            CRM
          </div>
          <div className="ps-sys-node ps-sys-node--b" style={{ borderColor: "rgba(249,115,22,0.5)", color: "#F97316" }}>
            <span className="ps-sys-node-dot" style={{ background: "#F97316" }} />
            Acctg
          </div>
          <div className="ps-sys-node ps-sys-node--c" style={{ borderColor: "rgba(234,179,8,0.5)", color: "#EAB308" }}>
            <span className="ps-sys-node-dot" style={{ background: "#EAB308" }} />
            Sched
          </div>
        </div>
        {/* Tangled SVG lines */}
        <svg
          className="ps-sys-tangle"
          viewBox="0 0 60 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <line x1="60" y1="13" x2="0" y2="67" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-tangle-line" />
          <line x1="60" y1="40" x2="0" y2="13" stroke="#F97316" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-tangle-line" />
          <line x1="60" y1="67" x2="0" y2="40" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-tangle-line" />
        </svg>
      </div>

      {/* Center divider arrow */}
      <div className="ps-sys-arrow">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" fill="rgba(0,212,170,0.1)" stroke="rgba(0,212,170,0.3)" strokeWidth="1" />
          <path d="M10 14h9M16 11l3 3-3 3" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* AFTER panel */}
      <div className="ps-sys-panel ps-sys-panel--after">
        <div className="ps-sys-panel-label ps-sys-panel-label--after">After</div>
        <div className="ps-sys-nodes">
          <div className="ps-sys-node" style={{ borderColor: "rgba(0,212,170,0.5)", color: "#00D4AA" }}>
            <span className="ps-sys-node-dot" style={{ background: "#00D4AA" }} />
            CRM
          </div>
          <div className="ps-sys-node" style={{ borderColor: "rgba(0,212,170,0.5)", color: "#00D4AA" }}>
            <span className="ps-sys-node-dot" style={{ background: "#00D4AA" }} />
            Acctg
          </div>
          <div className="ps-sys-node" style={{ borderColor: "rgba(0,212,170,0.5)", color: "#00D4AA" }}>
            <span className="ps-sys-node-dot" style={{ background: "#00D4AA" }} />
            Sched
          </div>
        </div>
        {/* Clean SVG lines converging to a hub */}
        <svg
          className="ps-sys-clean"
          viewBox="0 0 60 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="13" x2="60" y2="40" stroke="#00D4AA" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-clean-line" />
          <line x1="0" y1="40" x2="60" y2="40" stroke="#00D4AA" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-clean-line" />
          <line x1="0" y1="67" x2="60" y2="40" stroke="#00D4AA" strokeWidth="1" strokeDasharray="3 2" className="ps-sys-clean-line" />
          {/* Hub dot */}
          <circle cx="60" cy="40" r="4" fill="#00D4AA" fillOpacity="0.3" stroke="#00D4AA" strokeWidth="1" />
        </svg>
        <div className="ps-sys-efficiency">+34%</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL 4 — Dashboards & Business Intelligence
   Metric tiles at top + smooth SVG area chart below
   ───────────────────────────────────────────────────────────── */
function DashboardVisual() {
  return (
    <div className="ps-visual-dashboard" aria-hidden="true">
      {/* Metric tiles row */}
      <div className="ps-dash-tiles">
        <div className="ps-dash-tile">
          <span className="ps-dash-tile-num" style={{ color: "#F59E0B" }}>$2.4M</span>
          <span className="ps-dash-tile-label">Revenue</span>
        </div>
        <div className="ps-dash-tile">
          <span className="ps-dash-tile-num" style={{ color: "#34d399" }}>+18%</span>
          <span className="ps-dash-tile-label">Growth</span>
        </div>
        <div className="ps-dash-tile">
          <span className="ps-dash-tile-num" style={{ color: "#0D95E8" }}>94%</span>
          <span className="ps-dash-tile-label">Retention</span>
        </div>
      </div>

      {/* SVG area chart */}
      <div className="ps-dash-chart">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
          className="ps-dash-chart-svg"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0D95E8" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Secondary area — comparison line */}
          <path
            d="M0,68 C20,64 40,58 60,54 C80,50 100,48 120,44 C140,40 160,36 180,32 L200,28 L200,80 L0,80 Z"
            fill="url(#areaGrad2)"
          />
          <path
            d="M0,68 C20,64 40,58 60,54 C80,50 100,48 120,44 C140,40 160,36 180,32 L200,28"
            stroke="#0D95E8"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Primary area — main metric */}
          <path
            d="M0,72 C20,66 40,58 60,50 C80,42 100,34 120,24 C140,16 160,10 180,6 L200,4 L200,80 L0,80 Z"
            fill="url(#areaGrad)"
          />
          <path
            d="M0,72 C20,66 40,58 60,50 C80,42 100,34 120,24 C140,16 160,10 180,6 L200,4"
            stroke="#F59E0B"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            className="ps-dash-area-line"
          />

          {/* Pulsing data point at the latest value */}
          <circle cx="200" cy="4" r="3" fill="#F59E0B" className="ps-dash-dot-pulse" />
          <circle cx="200" cy="4" r="6" fill="#F59E0B" fillOpacity="0.2" className="ps-dash-dot-ring" />

          {/* X-axis grid lines */}
          <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="0" y1="54" x2="200" y2="54" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="28" x2="200" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
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
      <div className="ps-funnel">
        {/* Falling dots layer */}
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
