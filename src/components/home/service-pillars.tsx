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
      "Our website exists, but it's never once brought in a customer.",
      "Our website hasn't generated a single lead in the time we've had it.",
      "We paid a developer two years ago and haven't been able to update it since.",
      "Our competitors' sites look like real companies. Ours looks like an afterthought.",
      "I know we need to show up in search results, but I have no idea where to start.",
      "We have an idea for a tool or app that would help our customers, but no way to build it.",
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
      "We have three people doing work that should take zero people.",
      "Every time someone quits, half our processes walk out the door with them.",
      "We're still copying data between systems by hand — in 2026.",
      "I know there's a faster way to do this, but nobody has time to figure it out.",
      "Our best employees are buried in busywork instead of the jobs I hired them for.",
      "We keep hiring to keep up with volume instead of fixing the process that causes it.",
    ],
    serviceTiles: [
      {
        title: "AI Document Processing",
        description:
          "Upload invoices, contracts, or forms. AI reads, extracts data, categorizes, and routes it to your systems. Seconds, not hours.",
      },
      {
        title: "Automated Scheduling & Reminders",
        description:
          "Confirmations, reminders, follow-ups, and reschedules via SMS and email. No-shows drop. Staff gets their time back.",
      },
      {
        title: "AI Customer Reactivation",
        description:
          "Dormant customer lists turned into revenue. AI crafts personalized outreach that reactivates 60%+ of inactive clients.",
      },
      {
        title: "Smart Lead Routing & Auto-Response",
        description:
          "New inquiry captured, auto-responded in under 60 seconds, categorized, and routed to the right person. Nothing falls through.",
      },
      {
        title: "Form Routing & Intake Automation",
        description:
          "Incoming form submissions categorized by type, auto-triaged, and routed with AI responses for common questions.",
      },
      {
        title: "Inventory Management Systems",
        description:
          "Live tracking, automated reorder alerts, inter-site transfers, and cost formulas. From spreadsheets to a real system.",
      },
      {
        title: "Employee Onboarding Automation",
        description:
          "Document collection, form signing, tax paperwork, equipment tracking — all automated before day one.",
      },
      {
        title: "Custom AI Assistants",
        description:
          "A digital team member that knows your business. Handles inquiries, pulls data, and manages routine tasks 24/7.",
      },
      {
        title: "After-Hours Call & Text Triage",
        description:
          "Every after-hours inquiry received, assessed by AI, auto-responded via SMS, logged, and routed by urgency.",
      },
      {
        title: "Process Standardization & Compliance",
        description:
          "Your team does the same task five different ways. We build AI-enforced workflows that ensure consistency and compliance every time.",
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
      "We use six different tools and none of them talk to each other.",
      "Half our processes are held together with workarounds nobody documented.",
      "We bought software that was supposed to fix everything. Now it's another problem.",
      "If one person is out sick, nobody knows how to run their system.",
      "We've outgrown our current setup but migrating feels impossible.",
      "Every month something breaks and we spend a week patching it instead of growing.",
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
          "CRM doesn't talk to accounting. Scheduling disconnected from customer database. We wire your tools together so data flows once.",
      },
      {
        title: "Tool Stack Audit & Consolidation",
        description:
          "Paying for 8+ overlapping subscriptions? We audit, consolidate, and migrate. Typical savings: $500-$1,500/month.",
      },
      {
        title: "System Diagnostics & Fixes",
        description:
          "Something's slow, clunky, or breaking at the worst time. We diagnose root cause and fix it properly.",
      },
      {
        title: "Spreadsheet to Real System Migration",
        description:
          "Still tracking in Excel? We move you to modern tools without losing data and set it up right from day one.",
      },
      {
        title: "AI-Powered Compliance & Documentation",
        description:
          "Processes that live in people's heads get documented, systematized, and enforced by AI — so knowledge never walks out the door.",
      },
      {
        title: "Data Pipeline & API Integration",
        description:
          "Custom connections between any systems via APIs, middleware, or automation layers. Your data flows where it needs to go.",
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
    title: "Revenue Growth Engines",
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
      "We do good work but rely almost entirely on word-of-mouth to get new customers.",
      "We've spent money on marketing before. I couldn't tell you what it actually did.",
      "Leads come in, but nobody follows up fast enough and they go cold.",
      "We have years of past customers we've never reached back out to.",
      "Our competitors are everywhere online. We're invisible.",
      "I know we're leaving money on the table. I just don't know where.",
    ],
    serviceTiles: [
      {
        title: "AI-Powered Customer Segmentation",
        description:
          "AI analyzes your customer data and segments by behavior, value, and likelihood to convert. Target the right people with the right message.",
      },
      {
        title: "Individualized AI Marketing",
        description:
          "Hyper-personalized outreach crafted by AI for each customer based on their history, preferences, and engagement patterns.",
      },
      {
        title: "AI-Powered Advertising Management",
        description:
          "Google Ads, Facebook Ads, managed and optimized by AI. Budget allocation, bid strategy, and creative testing on autopilot.",
      },
      {
        title: "Speed-to-Lead Auto Response",
        description:
          "New inquiry, personalized response in under 60 seconds, captured in CRM, right person notified. First response wins the customer.",
      },
      {
        title: "Digital Presence Overhaul",
        description:
          "Full audit and rebuild of your online footprint — website, Google Business Profile, social accounts, review systems, local SEO.",
      },
      {
        title: "SEO & AI Search Optimization",
        description:
          "Found on Google AND in AI search results. Content architecture for traditional SEO and AI citations.",
      },
      {
        title: "Automated Review Generation",
        description:
          "Post-service SMS review requests that make it effortless. Target: 50+ reviews in 90 days.",
      },
      {
        title: "Lead Capture & Nurture Funnels",
        description:
          "Landing pages, lead magnets, email capture, automated nurture sequences, CRM integration. Every lead followed up for 90 days.",
      },
      {
        title: "Marketing Performance Dashboard",
        description:
          "See exactly which channels drive leads and revenue. Connected to ads, social, email, and CRM.",
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
      "I make most decisions based on gut feeling because I don't have the numbers in front of me.",
      "By the time I get a report, the information is already two weeks old.",
      "Our data lives in five different places and nobody has a complete picture.",
      "I couldn't tell you our most profitable service line without digging through spreadsheets.",
      "My team spends hours building reports that I glance at for thirty seconds.",
      "I know the data exists somewhere in our systems — I just can't get to it.",
    ],
    serviceTiles: [
      {
        title: "Executive Dashboard",
        description:
          "One screen, three-second status of your entire business. Revenue, expenses, KPIs, cash flow — updated in real time.",
      },
      {
        title: "AI-Powered Business Insights",
        description:
          "Ask your dashboard questions in plain English. 'Why is revenue down this month?' 'Which service is most profitable?' AI answers from your real data.",
      },
      {
        title: "Financial Health Dashboard",
        description:
          "Live connection to QuickBooks, your bank, and invoicing. AR aging, cash position, revenue vs. forecast — always current.",
      },
      {
        title: "Employee & Technician Productivity",
        description:
          "Revenue per tech, avg ticket, utilization, callbacks — pulled from your service platform automatically.",
      },
      {
        title: "Marketing ROI Tracker",
        description:
          "One view connecting Google Ads, website analytics, social, and Google Business Profile. Know exactly what's working.",
      },
      {
        title: "Automated KPI & Trend Reporting",
        description:
          "Reports delivered to your inbox on whatever cadence you need. Zero effort from you.",
      },
      {
        title: "AI System Integration Dashboard",
        description:
          "All your tools, all your data, one unified view. AI monitors for anomalies and alerts you before problems escalate.",
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
   CAROUSEL GRADIENT PALETTE
   Each index maps to a unique gradient so the carousel is
   visually rich regardless of how many tiles a service has.
   ───────────────────────────────────────────────────────────── */

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0D95E8, #635BFF)",
  "linear-gradient(135deg, #635BFF, #a855f7)",
  "linear-gradient(135deg, #00D4AA, #0D95E8)",
  "linear-gradient(135deg, #F59E0B, #EF4444)",
  "linear-gradient(135deg, #0D95E8, #00D4AA)",
  "linear-gradient(135deg, #a855f7, #EF4444)",
  "linear-gradient(135deg, #EF4444, #F59E0B)",
  "linear-gradient(135deg, #00D4AA, #635BFF)",
];

/* ─────────────────────────────────────────────────────────────
   SERVICE CAROUSEL
   Horizontal scroll snap carousel with arrow navigation.
   ───────────────────────────────────────────────────────────── */

interface ServiceCarouselProps {
  tiles: ServiceTile[];
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCarousel({ tiles }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -296, behavior: "smooth" });
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: 296, behavior: "smooth" });
  }

  // Toggle tapped state on mobile tap; untap when tapping elsewhere
  const handleCardClick = useCallback((i: number) => {
    setTappedIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <div className="ps-carousel">
      <div className="ps-carousel-header">
        <h4>What We Deliver</h4>
        <div className="ps-carousel-nav">
          <button
            className="ps-carousel-btn"
            onClick={scrollLeft}
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="ps-carousel-btn"
            onClick={scrollRight}
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="ps-carousel-track" ref={trackRef}>
        {tiles.map((tile, i) => (
          <div
            key={tile.title}
            className={`ps-carousel-card${tappedIndex === i ? " tapped" : ""}`}
            onClick={() => handleCardClick(i)}
            role="button"
            tabIndex={0}
            aria-label={tile.title}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(i);
            }}
          >
            <div
              className="ps-carousel-card-visual"
              style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}
            />
            {/* Title always visible at bottom-left */}
            <div className="ps-carousel-card-label">
              <span className="ps-carousel-card-title-text">{tile.title}</span>
              <span className="ps-carousel-card-hint">Tap for details</span>
            </div>
            {/* Overlay with description — hover on desktop, tap on mobile */}
            <div className="ps-carousel-card-overlay">
              <p className="ps-carousel-card-overlay-title">{tile.title}</p>
              <p className="ps-carousel-card-overlay-desc">{tile.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
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

  // Set CSS vars for grow/shift amounts — equal on all sides so
  // the breathe animation expands uniformly from the card center.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const grow = 6; // px — same on all sides

    function updateGrow() {
      if (!card) return;
      card.style.setProperty("--card-shift-x", `${-grow}px`);
      card.style.setProperty("--card-shift-y", `${-grow}px`);
      card.style.setProperty("--card-grow-x", `${grow}px`);
      card.style.setProperty("--card-grow-y", `${grow}px`);
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
        "--card-grow-x": "6px",
        "--card-grow-y": "6px",
        "--card-shift-x": "-6px",
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

          {/* Child 3 — Service Tiles Carousel */}
          <div className="ps-dialog-section ps-dialog-reveal">
            <ServiceCarousel tiles={service.serviceTiles} />
          </div>

          {/* Child 4 — Pain Points (moved below What We Deliver) */}
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

          {/* CTA */}
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
