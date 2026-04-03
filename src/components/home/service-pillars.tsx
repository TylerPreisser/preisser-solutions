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

interface StatItem {
  number: string;
  label: string;
}

interface ServiceTile {
  title: string;
  description: string;
}

interface Differentiator {
  lead: string;
  body: string;
}

interface ServicePillar {
  type: string;
  title: string;
  description: string;
  href: string;
  visual: React.ReactNode;
  bullets: string[];
  stats: StatItem[];
  painPoints: string[];
  serviceTiles: ServiceTile[];
  differentiators: Differentiator[];
}

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
   ───────────────────────────────────────────────────────────── */

const services: ServicePillar[] = [
  {
    type: "websites",
    title: "Websites & Applications",
    description:
      "Professional sites, custom apps, client portals, and e-commerce systems — built from scratch, built to perform.",
    href: "/contact",
    visual: <WebsiteVisual />,
    bullets: [
      "Professional website development",
      "Custom web applications",
      "E-commerce and online sales systems",
      "Ongoing maintenance and performance support",
    ],
    stats: [
      { number: "81%", label: "of consumers research online before buying" },
      { number: "3 in 4", label: "Americans now search with AI weekly" },
      { number: "70%+", label: "of businesses see revenue increase after site launch" },
    ],
    painPoints: [
      "I don't even have a website",
      "My site looks like it was made in 2010",
      "Nobody finds me on Google",
      "I don't show up when people ask ChatGPT for recommendations",
      "People visit my site but never contact me",
      "I have 6 Google reviews from 3 years ago",
    ],
    serviceTiles: [
      {
        title: "Professional Website Builds",
        description:
          "Custom-coded, fast-loading, mobile-optimized websites. No templates, no page builders. Built to rank and convert.",
      },
      {
        title: "AI Search Optimization (GEO)",
        description:
          "Your site optimized for ChatGPT, Perplexity, Google AI Overviews. 900M people use ChatGPT weekly. If you're not in those answers, your competitor is.",
      },
      {
        title: "Google Business Profile & Review Systems",
        description:
          "Full profile optimization plus automated review request systems. Top-ranking local businesses average 47 reviews.",
      },
      {
        title: "SEO & Local Search",
        description:
          "Site structure, content, and technical performance built to rank for the searches that matter in your market.",
      },
      {
        title: "Custom Web Applications",
        description:
          "Client portals, booking systems, internal tools, intake forms, calculators. If you need more than a website, we build it.",
      },
      {
        title: "Form Routing & Smart Contact Systems",
        description:
          "Forms that categorize inquiries by type and auto-route to the right person. AI auto-responses for common questions.",
      },
      {
        title: "UI/UX Redesign",
        description:
          "Your current site works but looks outdated. We redesign for modern aesthetics and higher conversion without rebuilding from scratch.",
      },
      {
        title: "E-Commerce & Online Sales",
        description:
          "Product catalogs, payments, inventory sync, automated orders. A real store, not a template.",
      },
    ],
    differentiators: [
      {
        lead: "AI search is our edge.",
        body: "We build for ChatGPT, Perplexity, and AI Overviews — not just Google. Almost nobody locally does this yet.",
      },
      {
        lead: "You own everything.",
        body: "Your code. Your domain. Your data. No proprietary lock-in.",
      },
      {
        lead: "Sites that generate business.",
        body: "Not digital brochures. Lead machines with tracking, forms, and conversion optimization built in.",
      },
    ],
  },
  {
    type: "automation",
    title: "Automation Systems",
    description:
      "AI-powered engines that handle your repetitive work — invoicing, outreach, document processing, you name it.",
    href: "/contact",
    visual: <AutomationVisual />,
    bullets: [
      "Process automation",
      "AI document processing",
      "Custom AI assistants",
      "Intelligent alerts and monitoring",
    ],
    stats: [
      { number: "240%", label: "average ROI, typically paid back in 6-9 months" },
      { number: "70–90%", label: "time reduction in document processing with AI" },
      { number: "$46K/yr", label: "average savings from fewer errors and less manual work" },
    ],
    painPoints: [
      "My staff spends hours every week on data entry",
      "Invoices pile up and nobody processes them fast enough",
      "We forget to follow up with customers",
      "I can't afford another hire but we're drowning",
      "Scheduling and reminders are all manual",
      "Our process is different every time depending on who does it",
    ],
    serviceTiles: [
      {
        title: "AI Document Processing",
        description:
          "Upload an invoice, contract, or form. AI reads it, extracts the data, categorizes it, and routes it. Seconds, not hours.",
      },
      {
        title: "Automated Scheduling & Reminders",
        description:
          "Confirmations, reminders, follow-ups, reschedules via SMS and email. No-shows drop. Staff gets their time back.",
      },
      {
        title: "Customer Reactivation Engines",
        description:
          "AI outreach that re-engages dormant customers with personalized messages. Proven 60%+ reactivation rates.",
      },
      {
        title: "Lead Routing & Auto-Response",
        description:
          "New lead captured, auto-responded to in under 60 seconds, routed to the right person. No more missed inquiries.",
      },
      {
        title: "Employee Onboarding Automation",
        description:
          "Document collection, form signing, tax paperwork, equipment tracking — all automated.",
      },
      {
        title: "Inventory Monitoring & Reorder Alerts",
        description:
          "Real-time stock tracking with automated alerts or auto-reorder when inventory hits threshold.",
      },
      {
        title: "Custom AI Assistants",
        description:
          "A digital team member that knows your business. Handles inquiries and routine tasks 24/7.",
      },
      {
        title: "Process Standardization",
        description:
          "Your team does the same task five different ways. We build a workflow that enforces the right process every time.",
      },
    ],
    differentiators: [
      {
        lead: "Custom-built, not off-the-shelf.",
        body: "No generic Zapier chains. Every automation engineered for your specific workflow.",
      },
      {
        lead: "AI-first means smarter.",
        body: "Our automations read documents, understand context, and make intelligent decisions — not just follow rules.",
      },
      {
        lead: "Proven numbers.",
        body: "75% reduction in invoice handling. 60%+ customer reactivation. 95% reduction in inventory tracking time.",
      },
    ],
  },
  {
    type: "systems",
    title: "System Fixes & Efficiency",
    description:
      "Something's slow, broken, or redundant? We find it and fix it with better tech.",
    href: "/contact",
    visual: <SystemFixesVisual />,
    bullets: [
      "Workflow efficiency",
      "Platform integration",
      "System fixes and upgrades",
      "Modernization",
    ],
    stats: [
      { number: "22%", label: "average cost reduction within 3 years of streamlining tech" },
      { number: "90%", label: "of manual data entry errors eliminated through automation" },
      { number: "10–50%", label: "cost savings from consolidating redundant tools" },
    ],
    painPoints: [
      "We enter the same data in three different systems",
      "I'm paying for 8 tools and none of them talk to each other",
      "We have workarounds for everything",
      "We're still running on spreadsheets for critical stuff",
      "Our software is slow and everyone hates it",
      "Every time someone quits their knowledge walks out the door",
    ],
    serviceTiles: [
      {
        title: "Workflow Efficiency Overhaul",
        description:
          "We walk through how your team actually works. Find the bottlenecks and eliminate them with a working solution.",
      },
      {
        title: "Platform Integration",
        description:
          "CRM doesn't talk to accounting. Scheduling disconnected from customer database. We wire your tools together.",
      },
      {
        title: "Tool Stack Audit & Consolidation",
        description:
          "Paying for 8+ overlapping subscriptions? We audit, consolidate, migrate. Typical savings: $500–$1,500/month.",
      },
      {
        title: "System Diagnostics & Fixes",
        description:
          "Something's off. We diagnose root cause and fix it properly. Not a patch. A real fix.",
      },
      {
        title: "Spreadsheet to Real System Migration",
        description:
          "Still tracking in Excel? We move you to modern tools without losing data.",
      },
      {
        title: "Communication & Intake Routing",
        description:
          "Messages from everywhere, nothing centralized. We build unified intake that routes and tracks everything.",
      },
      {
        title: "Process Documentation & Systematization",
        description:
          "Best processes live in people's heads. We document them, then build systems around them.",
      },
    ],
    differentiators: [
      {
        lead: "Fixers, not consultants.",
        body: "No reports about your problems. We find what's broken and build the fix.",
      },
      {
        lead: "We know small business tech.",
        body: "QuickBooks. ServiceTitan. Square. Jobber. HubSpot. We've integrated them all.",
      },
      {
        lead: "Fixes that pay for themselves.",
        body: "Every improvement measured in time saved, errors eliminated, money recovered.",
      },
    ],
  },
  {
    type: "revenue",
    title: "Marketing & Growth Engines",
    description:
      "Automated content, email, SMS, and lead generation systems that keep marketing moving without constant babysitting.",
    href: "/contact",
    visual: <RevenueVisual />,
    bullets: [
      "Automated social media content",
      "Email and SMS outreach engines",
      "SEO and search optimization",
      "Lead generation and conversion systems",
    ],
    stats: [
      { number: "5x", label: "organic reach increase in 30 days with automated social (proven)" },
      { number: "60%+", label: "dormant customer reactivation with AI outreach (proven)" },
      { number: "88%", label: "of customers read Google reviews before choosing local business" },
    ],
    painPoints: [
      "I know I should post on social media but nobody has time",
      "I have a huge customer list and we never contact them",
      "I tried a marketing agency and it was a waste of money",
      "My competitors show up before me everywhere",
      "I get leads but nobody follows up fast enough",
      "I have no idea what's working and what's not",
    ],
    serviceTiles: [
      {
        title: "Automated Social Media Engine",
        description:
          "Generates, designs, and publishes content daily. Optional approval or fully autonomous. 5x reach increase in 30 days (proven).",
      },
      {
        title: "Email & SMS Customer Reactivation",
        description:
          "AI identifies dormant customers, crafts personalized messages, sends optimized outreach. 60%+ reactivation.",
      },
      {
        title: "SEO & AI Search Optimization",
        description:
          "Found on Google AND in AI search results. Show up everywhere people search.",
      },
      {
        title: "Automated Review Generation",
        description:
          "Post-service SMS review requests. Target: 50+ reviews in 90 days.",
      },
      {
        title: "Lead Capture & Nurture Funnels",
        description:
          "Landing pages, lead magnets, email capture, automated nurture, CRM integration.",
      },
      {
        title: "Speed-to-Lead Auto Response",
        description:
          "New inquiry, personalized response in under 60 seconds, captured in CRM, right person notified.",
      },
      {
        title: "Marketing Performance Dashboard",
        description:
          "See exactly which channels drive leads and revenue. Connected to ads, social, email, CRM.",
      },
    ],
    differentiators: [
      {
        lead: "Systems, not services.",
        body: "We build a marketing engine you own that runs automatically.",
      },
      {
        lead: "Proven, not projected.",
        body: "5x reach. 60%+ reactivation. 45% conversion increase. Real numbers from real clients.",
      },
      {
        lead: "Full funnel.",
        body: "Not just ads or social — the entire pipeline from discovery to conversion to re-engagement.",
      },
    ],
  },
  {
    type: "dashboards",
    title: "Dashboards & Business Intelligence",
    description:
      "See your business clearly. Real-time data, live reporting, actionable insight.",
    href: "/contact",
    visual: <DashboardVisual />,
    bullets: [
      "Custom dashboards",
      "Financial and operational reporting",
      "Data integration and cleanup",
      "Forecasting and trend analysis",
    ],
    stats: [
      { number: "73%", label: "of business data goes completely unused for decisions" },
      { number: "23x", label: "more likely to acquire customers with data-driven decisions" },
      { number: "65%", label: "of small businesses are profitable but can't tell you where" },
    ],
    painPoints: [
      "I don't know which services are actually profitable",
      "I run reports end of month and by then it's too late",
      "My team gives me different numbers depending on who I ask",
      "I have QuickBooks but I never really look at it",
      "I can't see trends — I'm too busy running the business",
      "I have no idea if my marketing is working",
    ],
    serviceTiles: [
      {
        title: "Owner Dashboard",
        description:
          "One screen. Revenue, expenses, KPIs, cash flow, and trends — updated automatically from your systems.",
      },
      {
        title: "Financial Health Dashboard",
        description:
          "Live connection to QuickBooks, bank, and invoicing. AR aging, cash position, revenue vs. forecast.",
      },
      {
        title: "Employee / Technician Productivity",
        description:
          "Revenue per tech, avg ticket, utilization, callbacks — pulled from your service platform automatically.",
      },
      {
        title: "Marketing ROI Tracker",
        description:
          "One view connecting Google Ads, website analytics, social, and Google Business Profile.",
      },
      {
        title: "Automated KPI & Trend Reporting",
        description:
          "Reports delivered to your inbox. Revenue trends, seasonal patterns, capacity forecasts. Zero effort.",
      },
      {
        title: "Data Cleanup & Consolidation",
        description:
          "Data scattered and inconsistent. We consolidate, clean, and connect into one source of truth.",
      },
    ],
    differentiators: [
      {
        lead: "Dashboards you want to look at.",
        body: "Clean, visual, built for business owners — not analysts.",
      },
      {
        lead: "Connected to your real systems.",
        body: "Live data from QuickBooks, ServiceTitan, Square, your CRM.",
      },
      {
        lead: "Decisions, not data dumps.",
        body: "Built around the questions you actually need answered.",
      },
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
  onClick: () => void;
}

function BentoCard({ service, onClick }: BentoCardProps) {
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
      className={`ps-bento-card ps-bento-card--${service.type}`}
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
          {/* Child 1 — Title */}
          <h3 className="ps-dialog-title ps-dialog-reveal">{service.title}</h3>

          {/* Child 2 — Stat Bar */}
          <div className="ps-dialog-stats ps-dialog-reveal" aria-label="Key statistics">
            {service.stats.map((stat) => (
              <div key={stat.label} className="ps-dialog-stat">
                <span className="ps-dialog-stat__number">{stat.number}</span>
                <span className="ps-dialog-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Child 3 — Pain Points */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <h4 className="ps-dialog-section-heading">Sound familiar?</h4>
            <div className="ps-dialog-pains">
              {service.painPoints.map((pain) => (
                <div key={pain} className="ps-dialog-pain">
                  &ldquo;{pain}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* Child 4 — Service Tiles */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <h4 className="ps-dialog-section-heading">What We Deliver</h4>
            <div className="ps-dialog-services">
              {service.serviceTiles.map((tile) => (
                <div key={tile.title} className="ps-dialog-service">
                  <p className="ps-dialog-service__title">{tile.title}</p>
                  <p className="ps-dialog-service__desc">{tile.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Child 5 — Differentiators */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <h4 className="ps-dialog-section-heading">What Makes Us Different</h4>
            <div className="ps-dialog-diffs">
              {service.differentiators.map((diff) => (
                <div key={diff.lead} className="ps-dialog-diff">
                  <span className="ps-dialog-diff__lead">{diff.lead}</span>
                  {" "}{diff.body}
                </div>
              ))}
            </div>
          </div>

          {/* Child 6 — CTA */}
          <div className="ps-dialog-cta ps-dialog-reveal">
            <a href="/contact" className="ps-dialog-cta-btn">
              This sound like you? Let&rsquo;s talk.
            </a>
          </div>
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
