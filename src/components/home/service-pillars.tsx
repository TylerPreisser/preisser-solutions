"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  WebsiteVisual,
  AutomationVisual,
  SystemFixesVisual,
  DashboardVisual,
  RevenueVisual,
} from "@/components/home/card-visuals-backup";

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

interface ServicePillar {
  type: string;
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
}

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

const services: ServicePillar[] = [
  {
    type: "websites",
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
    type: "automation",
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
    type: "systems",
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
    type: "dashboards",
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
    type: "revenue",
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
   SVG ICONS
   ───────────────────────────────────────────────────────────── */

function ExpandIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 1.5H14.5V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 14.5H1.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   BENTO CARD
   Exact Stripe nesting: expand icon (top-right), title (bottom-left),
   gradient border, clip-path breathe inner, visual content.
   ───────────────────────────────────────────────────────────── */

interface BentoCardProps {
  service: ServicePillar;
  isLarge: boolean;
  onClick: () => void;
}

function BentoCard({ service, isLarge, onClick }: BentoCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  // Set CSS vars for grow/shift amounts based on card dimensions
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const expandAmount = 12;

    function updateGrow() {
      if (!card) return;
      const { offsetWidth: w, offsetHeight: h } = card;
      if (h === 0) return;
      const growY = expandAmount / 2;
      const growX = (w / h) * growY;
      card.style.setProperty("--card-shift-x", `${-growX}px`);
      card.style.setProperty("--card-shift-y", `${-growY}px`);
      card.style.setProperty("--card-grow-x", `${growX}px`);
      card.style.setProperty("--card-grow-y", `${growY}px`);
    }

    updateGrow();

    const ro = new ResizeObserver(updateGrow);
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty("--card-mouse-x", `${x}px`);
    card.style.setProperty("--card-mouse-y", `${y}px`);
  }

  return (
    <button
      ref={cardRef}
      className={`ps-bento-card ps-bento-card--${service.type}${isLarge ? " ps-bento-card--large" : ""}`}
      aria-labelledby={`bento-card-${service.type}-title`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      style={{
        "--card-mouse-x": "0px",
        "--card-mouse-y": "0px",
        "--card-grow-x": "8px",
        "--card-grow-y": "6px",
        "--card-shift-x": "-8px",
        "--card-shift-y": "-6px",
        "--card-radius": "12px",
        "--card-duration": "800ms",
        "--card-ease": "cubic-bezier(0.165, 0.84, 0.44, 1)",
      } as React.CSSProperties}
    >
      {/* Expand icon — top right, frosted glass circle */}
      <div className="ps-bento-card__expand" aria-hidden="true">
        <ExpandIcon />
      </div>

      {/* Title — bottom left, overlaid on the visual */}
      <div className="ps-bento-card__text">
        <h3
          className="ps-bento-card__title"
          id={`bento-card-${service.type}-title`}
        >
          {service.title}
        </h3>
      </div>

      {/* Gradient border that tracks mouse */}
      <div className="ps-bento-card__border" aria-hidden="true">
        <div className="ps-bento-card__border-color">
          <div className="ps-bento-card__border-color-gradient" />
        </div>
      </div>

      {/* Inner content with clip-path breathe on hover */}
      <div className="ps-bento-card__inner">
        <div className="ps-bento-card__content">
          <div className="ps-bento-card__content-inner">
            {service.visual}
          </div>
        </div>
      </div>
    </button>
  );
}

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
        el.style.transform = "";
      });
      return;
    }

    // Initial hidden state — GSAP will animate these in
    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
    });

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
          clearProps: "transform",
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
          <BentoCard
            key={service.type}
            service={service}
            isLarge={i === 0}
            onClick={() => handleExpand(i)}
          />
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
