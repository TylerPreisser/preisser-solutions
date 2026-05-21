/**
 * ProductVisual — Procedural SVG visual identity per product.
 *
 * Pure server component. No "use client", no hooks, no IntersectionObserver.
 * Animations are driven entirely by CSS @keyframes defined in globals.css
 * using shared class names (pv-ring-outer, pv-ring-mid, pv-pulse-inner).
 *
 * Framer Motion removed. IntersectionObserver removed.
 * Animations run on mobile via CSS — they are GPU-composited (transform only)
 * and cost nothing on the main thread. prefers-reduced-motion pauses them.
 */

import type { ProductCategory } from "@/types/product";

interface Props {
  slug: string;
  category: ProductCategory;
  /** "card" (default) or "hero" — hero renders at 100% width/height */
  size?: "card" | "hero";
  className?: string;
}

// ─── Category → color mapping ──────────────────────────────────────────────
const CATEGORY_COLORS: Record<ProductCategory, { primary: string; secondary: string; glow: string }> = {
  "Marketing & Growth": {
    primary: "#80E9FF",
    secondary: "#0D95E8",
    glow: "rgba(128,233,255,0.18)",
  },
  "Operations & Back-Office": {
    primary: "#00D4AA",
    secondary: "#00A882",
    glow: "rgba(0,212,170,0.18)",
  },
  "Sales & Customer Service": {
    primary: "#0D95E8",
    secondary: "#80E9FF",
    glow: "rgba(13,149,232,0.18)",
  },
  "Decision Intelligence": {
    primary: "#6B7FFF",
    secondary: "#0D95E8",
    glow: "rgba(107,127,255,0.18)",
  },
  "Custom Builds": {
    primary: "#94A3B8",
    secondary: "#64748B",
    glow: "rgba(148,163,184,0.12)",
  },
};

// ─── Slug → deterministic numbers ─────────────────────────────────────────
function slugHash(slug: string, mod: number, offset = 0): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return ((h + offset) % mod + mod) % mod;
}

// ─── Product icons ─────────────────────────────────────────────────────────
// Each icon is a simple line-art glyph rendered at the center of the SVG.
// cx/cy are passed in so the icon renders at the correct position for both
// card and hero sizes. Icons are 36×36 conceptually, centered on cx/cy.

function ProductIcon({
  slug,
  cx,
  cy,
  color,
}: {
  slug: string;
  cx: number;
  cy: number;
  color: string;
}) {
  // Each icon is authored on a 24×24 grid, then translated to cx/cy via transform.
  // transform="translate(${cx - 12} ${cy - 12})" centers the 24-unit icon.
  const t = `translate(${cx - 12} ${cy - 12})`;

  switch (slug) {
    case "customer-reactivation-agent":
      // Refresh arrows + person silhouette
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M20 12a8 8 0 1 1-1.93-5.13" />
          <polyline points="21 3 21 9 15 9" />
          <circle cx="12" cy="13" r="2" />
          <path d="M8.5 19c.5-2 2-3 3.5-3s3 1 3.5 3" />
        </g>
      );

    case "social-marketing-agent":
      // Share network: three dots forming triangle with connecting lines
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <line x1="8.5" y1="11" x2="15.5" y2="6.5" />
          <line x1="8.5" y1="13" x2="15.5" y2="17.5" />
        </g>
      );

    case "customer-research-agent":
      // Magnifying glass with person inside
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <circle cx="10" cy="10" r="7" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <circle cx="10" cy="9" r="2" />
          <path d="M6.5 15c.5-2 2-2.5 3.5-2.5s3 .5 3.5 2.5" />
        </g>
      );

    case "outbound-sales-agent":
      // Paper plane
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </g>
      );

    case "marcommand-engine":
      // Radar: concentric arcs + crosshair
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M12 2 A10 10 0 0 1 22 12" />
          <path d="M12 6 A6 6 0 0 1 18 12" />
          <path d="M12 10 A2 2 0 0 1 14 12" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
        </g>
      );

    case "invoice-processing-agent":
      // Document with $ symbol
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <text x="12" y="16" textAnchor="middle" fontSize="7" stroke={color} strokeWidth="0.5" fill={color} opacity="0.9" fontFamily="system-ui, sans-serif" fontWeight="600">$</text>
        </g>
      );

    case "intelligent-inventory-monitoring":
      // Stacked boxes (isometric-style)
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <rect x="3" y="14" width="8" height="7" rx="1" />
          <rect x="13" y="14" width="8" height="7" rx="1" />
          <rect x="7" y="7" width="10" height="7" rx="1" />
          <rect x="9" y="2" width="6" height="5" rx="1" />
        </g>
      );

    case "ai-bookkeeper":
      // Calculator outline
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <rect x="7" y="5" width="10" height="4" rx="1" />
          <circle cx="8" cy="13" r="1" fill={color} stroke="none" />
          <circle cx="12" cy="13" r="1" fill={color} stroke="none" />
          <circle cx="16" cy="13" r="1" fill={color} stroke="none" />
          <circle cx="8" cy="17" r="1" fill={color} stroke="none" />
          <circle cx="12" cy="17" r="1" fill={color} stroke="none" />
          <circle cx="16" cy="17" r="1" fill={color} stroke="none" />
        </g>
      );

    case "compliance-agent":
      // Shield with checkmark
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M12 2L4 6v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6L12 2z" />
          <polyline points="9 12 11 14 15 10" />
        </g>
      );

    case "business-triage-agent":
      // Funnel
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </g>
      );

    case "industry-specific-agent":
      // Interlocking gears
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <circle cx="9" cy="12" r="4" />
          <circle cx="17" cy="8" r="3.5" />
          <line x1="9" y1="8" x2="9" y2="6" />
          <line x1="9" y1="16" x2="9" y2="18" />
          <line x1="5" y1="12" x2="3" y2="12" />
          <line x1="13" y1="12" x2="14.2" y2="12" />
          <line x1="17" y1="4.5" x2="17" y2="3" />
          <line x1="17" y1="11.5" x2="17" y2="13" />
          <line x1="13.5" y1="8" x2="12" y2="8" />
          <line x1="20.5" y1="8" x2="22" y2="8" />
        </g>
      );

    case "ai-digital-receptionist":
      // Headset
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
        </g>
      );

    case "business-forecast-agent":
      // Trending chart with arrow
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </g>
      );

    case "custom-agent-development":
      // Wrench
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </g>
      );

    case "local-ai-deployment-agent":
      // Server stack with dots
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <rect x="2" y="3" width="20" height="5" rx="1" />
          <rect x="2" y="10" width="20" height="5" rx="1" />
          <rect x="2" y="17" width="20" height="5" rx="1" />
          <circle cx="18" cy="5.5" r="1" fill={color} stroke="none" />
          <circle cx="18" cy="12.5" r="1" fill={color} stroke="none" />
          <circle cx="18" cy="19.5" r="1" fill={color} stroke="none" />
        </g>
      );

    case "agentic-coding-specialists":
      // Terminal prompt >_
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <polyline points="7 8 11 12 7 16" />
          <line x1="13" y1="16" x2="17" y2="16" />
        </g>
      );

    default:
      // Generic circuit node
      return (
        <g transform={t} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9">
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="2" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="22" y2="12" />
        </g>
      );
  }
}

export function ProductVisual({ slug, category, size = "card", className = "" }: Props) {
  const colors = CATEGORY_COLORS[category];

  const gradId = `pv-grad-${slug}`;
  const glowId = `pv-glow-${slug}`;

  const viewBox = size === "hero" ? "0 0 560 380" : "0 0 240 220";
  const vw = size === "hero" ? 560 : 240;
  const vh = size === "hero" ? 380 : 220;
  const cx = vw / 2;
  const cy = vh / 2 - 5;

  const outerR = 70 + slugHash(slug, 20, 1);
  const midR = 40 + slugHash(slug, 15, 2);
  const innerR = 14 + slugHash(slug, 10, 3);
  const arcStartDeg = slugHash(slug, 360, 4);
  const arcSpanDeg = 80 + slugHash(slug, 120, 5);
  const arcEndDeg = arcStartDeg + arcSpanDeg;
  const lineAngles = [
    slugHash(slug, 180, 6),
    slugHash(slug, 180, 7) + 40,
    slugHash(slug, 180, 8) + 80,
  ];
  const dot1Angle = (slugHash(slug, 360, 9) * Math.PI) / 180;
  const dot2Angle = (slugHash(slug, 360, 10) * Math.PI) / 180;
  const dotR = outerR + 8;
  const dot1x = cx + dotR * Math.cos(dot1Angle);
  const dot1y = cy + dotR * Math.sin(dot1Angle);
  const dot2x = cx + dotR * Math.cos(dot2Angle);
  const dot2y = cy + dotR * Math.sin(dot2Angle);

  function arcPath(r: number, startDeg: number, endDeg: number): string {
    const s = ((startDeg - 90) * Math.PI) / 180;
    const e = ((endDeg - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  function linePath(angleDeg: number, length: number): string {
    const a = (angleDeg * Math.PI) / 180;
    const dx = (length / 2) * Math.cos(a);
    const dy = (length / 2) * Math.sin(a);
    return `M ${(cx - dx).toFixed(2)} ${(cy - dy).toFixed(2)} L ${(cx + dx).toFixed(2)} ${(cy + dy).toFixed(2)}`;
  }

  const ticks: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const tickCount = 12;
  for (let i = 0; i < tickCount; i++) {
    const a = ((i / tickCount) * 360 * Math.PI) / 180;
    const r1 = outerR - 6;
    const r2 = outerR + 2;
    ticks.push({
      x1: cx + r1 * Math.cos(a),
      y1: cy + r1 * Math.sin(a),
      x2: cx + r2 * Math.cos(a),
      y2: cy + r2 * Math.sin(a),
    });
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, var(--theme-bg-secondary) 0%, var(--theme-bg-primary) 100%)` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 55%, ${colors.glow} 0%, transparent 65%)`,
        }}
      />

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-full"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
          </linearGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id={`clip-${slug}`}>
            <rect width={vw} height={vh} />
          </clipPath>
        </defs>

        <g clipPath={`url(#clip-${slug})`}>
          {lineAngles.map((angle, i) => (
            <path
              key={i}
              d={linePath(angle, Math.max(vw, vh) * 1.4)}
              stroke={colors.primary}
              strokeWidth="0.5"
              strokeOpacity="0.08"
            />
          ))}

          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1.toFixed(2)}
              y1={t.y1.toFixed(2)}
              x2={t.x2.toFixed(2)}
              y2={t.y2.toFixed(2)}
              stroke={colors.primary}
              strokeWidth="1"
              strokeOpacity="0.3"
            />
          ))}

          {/* Outer ring + arc — CSS class drives rotation animation */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            strokeOpacity="0.45"
            className="pv-ring-outer"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          <path
            d={arcPath(outerR, arcStartDeg, arcEndDeg)}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            className="pv-ring-outer"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Mid ring — counter-rotation */}
          <circle
            cx={cx}
            cy={cy}
            r={midR}
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="3 5"
            className="pv-ring-mid"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Inner circle — pulse */}
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            fill={`url(#${gradId})`}
            fillOpacity="0.15"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            strokeOpacity="0.8"
            className="pv-pulse-inner"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Descriptive product icon at center */}
          <ProductIcon slug={slug} cx={cx} cy={cy} color={colors.primary} />

          <circle
            cx={dot1x.toFixed(2)}
            cy={dot1y.toFixed(2)}
            r="3"
            fill={colors.primary}
            fillOpacity="0.7"
            stroke={colors.primary}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx={dot2x.toFixed(2)}
            cy={dot2y.toFixed(2)}
            r="2"
            fill="none"
            stroke={colors.secondary}
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          <line
            x1={cx}
            y1={cy}
            x2={dot1x.toFixed(2)}
            y2={dot1y.toFixed(2)}
            stroke={colors.primary}
            strokeWidth="0.75"
            strokeOpacity="0.2"
            strokeDasharray="2 3"
          />
          <line
            x1={cx}
            y1={cy}
            x2={dot2x.toFixed(2)}
            y2={dot2y.toFixed(2)}
            stroke={colors.secondary}
            strokeWidth="0.75"
            strokeOpacity="0.15"
            strokeDasharray="2 3"
          />
        </g>
      </svg>
    </div>
  );
}
