/**
 * ProductVisual — Procedural SVG visual identity per product.
 *
 * Each product gets a unique geometric composition derived from its slug.
 * Uses a simple hash of the slug characters to seed deterministic placement
 * of 3–4 engineering-schematic primitives (rings, arcs, lines, polygons).
 *
 * Labs products render with a dashed outline treatment and no fill.
 * All CSS animations are slow loops (6–12s). Respects prefers-reduced-motion.
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
  "Revenue & Marketing": {
    primary: "#80E9FF",
    secondary: "#0D95E8",
    glow: "rgba(128,233,255,0.18)",
  },
  "Operations & Back-Office": {
    primary: "#00D4AA",
    secondary: "#00A882",
    glow: "rgba(0,212,170,0.18)",
  },
  "Sales & Lead Capture": {
    primary: "#0D95E8",
    secondary: "#80E9FF",
    glow: "rgba(13,149,232,0.18)",
  },
  "Intelligence & Decision Support": {
    primary: "#6B7FFF",
    secondary: "#0D95E8",
    glow: "rgba(107,127,255,0.18)",
  },
  "Flagship Platforms": {
    primary: "#80E9FF",
    secondary: "#00D4AA",
    glow: "rgba(128,233,255,0.22)",
  },
  "Custom & Infrastructure": {
    primary: "#94A3B8",
    secondary: "#64748B",
    glow: "rgba(148,163,184,0.12)",
  },
  Labs: {
    primary: "#80E9FF",
    secondary: "#0D95E8",
    glow: "rgba(128,233,255,0.10)",
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

function seededFloat(slug: string, seed: number): number {
  let h = 0xcbf29ce4 ^ seed;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt((i + seed) % slug.length);
    h = (h * 0x01000193) >>> 0;
  }
  return (h >>> 0) / 0xffffffff;
}

// ─── Geometry generators ──────────────────────────────────────────────────
interface ShapeProps {
  slug: string;
  colors: { primary: string; secondary: string; glow: string };
  isLabs: boolean;
}

function generateShapes(slug: string, colors: { primary: string; secondary: string; glow: string }, isLabs: boolean) {
  const cx = 120;
  const cy = 110;

  // Outer rotating ring
  const outerR = 70 + slugHash(slug, 20, 1);
  // Mid ring
  const midR = 40 + slugHash(slug, 15, 2);
  // Inner circle
  const innerR = 14 + slugHash(slug, 10, 3);

  // Arc start/end for the accent arc
  const arcStartDeg = slugHash(slug, 360, 4);
  const arcSpanDeg = 80 + slugHash(slug, 120, 5);
  const arcEndDeg = arcStartDeg + arcSpanDeg;

  // 2–3 cross-hair lines at varying angles
  const lineAngles = [
    slugHash(slug, 180, 6),
    slugHash(slug, 180, 7) + 40,
    slugHash(slug, 180, 8) + 80,
  ];

  // Satellite dot positions
  const dot1Angle = (slugHash(slug, 360, 9) * Math.PI) / 180;
  const dot2Angle = (slugHash(slug, 360, 10) * Math.PI) / 180;
  const dotR = outerR + 8;

  const dot1x = cx + dotR * Math.cos(dot1Angle);
  const dot1y = cy + dotR * Math.sin(dot1Angle);
  const dot2x = cx + dotR * Math.cos(dot2Angle);
  const dot2y = cy + dotR * Math.sin(dot2Angle);

  // Arc path helper
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

  // Line path through center at angle
  function linePath(angleDeg: number, length: number): string {
    const a = (angleDeg * Math.PI) / 180;
    const dx = (length / 2) * Math.cos(a);
    const dy = (length / 2) * Math.sin(a);
    return `M ${(cx - dx).toFixed(2)} ${(cy - dy).toFixed(2)} L ${(cx + dx).toFixed(2)} ${(cy + dy).toFixed(2)}`;
  }

  // Tick marks around outer ring
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

  return {
    cx, cy,
    outerR, midR, innerR,
    arcPath: arcPath(outerR + 14, arcStartDeg, arcEndDeg),
    linePaths: lineAngles.map((a) => linePath(a, outerR * 2 + 20)),
    ticks,
    dot1x, dot1y, dot2x, dot2y,
    arcStartDeg, arcSpanDeg,
  };
}

export function ProductVisual({ slug, category, size = "card", className = "" }: Props) {
  const colors = CATEGORY_COLORS[category];
  const isLabs = category === "Labs";
  const shapes = generateShapes(slug, colors, isLabs);

  // Gradient IDs must be unique per product to avoid conflicts when multiple
  // cards render on the same page.
  const gradId = `pv-grad-${slug}`;
  const glowId = `pv-glow-${slug}`;
  const bgGradId = `pv-bg-${slug}`;

  const viewBox = size === "hero" ? "0 0 560 380" : "0 0 240 220";
  const scale = size === "hero" ? 560 / 240 : 1;
  const vw = size === "hero" ? 560 : 240;
  const vh = size === "hero" ? 380 : 220;
  const cx = vw / 2;
  const cy = vh / 2 - 5;

  // Re-derive shapes centered in actual canvas
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

  // Flagship: use all three brand colors in gradient
  const isFlagship = category === "Flagship Platforms";

  // CSS animation names are keyed by slug to avoid collisions
  const rotateAnim = `pv-rotate-${slug.replace(/-/g, "")}`;
  const pulseAnim = `pv-pulse-${slug.replace(/-/g, "")}`;

  const strokeOpacity = isLabs ? 0.5 : 0.9;
  const fillOpacity = isLabs ? 0 : 1;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: isLabs ? "transparent" : `linear-gradient(135deg, var(--theme-bg-secondary) 0%, var(--theme-bg-primary) 100%)` }}
    >
      {/* Glow blob behind the schematic */}
      {!isLabs && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 55%, ${colors.glow} 0%, transparent 65%)`,
          }}
        />
      )}

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-full"
        style={{ display: "block" }}
      >
        <defs>
          {/* Primary accent gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {isFlagship ? (
              <>
                <stop offset="0%" stopColor="#80E9FF" stopOpacity="1" />
                <stop offset="50%" stopColor="#0D95E8" stopOpacity="1" />
                <stop offset="100%" stopColor="#00D4AA" stopOpacity="1" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
                <stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
              </>
            )}
          </linearGradient>

          {/* Glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip to canvas */}
          <clipPath id={`clip-${slug}`}>
            <rect width={vw} height={vh} />
          </clipPath>
        </defs>

        <g clipPath={`url(#clip-${slug})`}>
          {/* Labs: dashed border treatment */}
          {isLabs && (
            <rect
              x="1"
              y="1"
              width={vw - 2}
              height={vh - 2}
              rx="12"
              fill="none"
              stroke={colors.primary}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              strokeOpacity="0.4"
            />
          )}

          {/* Crosshair lines — faint grid */}
          {lineAngles.map((angle, i) => (
            <path
              key={i}
              d={linePath(angle, Math.max(vw, vh) * 1.4)}
              stroke={colors.primary}
              strokeWidth="0.5"
              strokeOpacity="0.08"
            />
          ))}

          {/* Outer tick ring */}
          {!isLabs && ticks.map((t, i) => (
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

          {/* Outer circle (slow rotation via CSS) */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={isLabs ? "1" : "1.5"}
            strokeOpacity={isLabs ? "0.35" : "0.45"}
            strokeDasharray={isLabs ? "4 6" : "none"}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `pv-spin-${slug.replace(/-/g, "")} 16s linear infinite`,
            }}
          />

          {/* Accent arc (brighter, thicker) */}
          {!isLabs && (
            <path
              d={arcPath(outerR, arcStartDeg, arcEndDeg)}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: `pv-spin-${slug.replace(/-/g, "")} 16s linear infinite`,
              }}
            />
          )}

          {/* Mid ring */}
          <circle
            cx={cx}
            cy={cy}
            r={midR}
            fill="none"
            stroke={colors.secondary}
            strokeWidth={isLabs ? "1" : "1"}
            strokeOpacity={isLabs ? "0.25" : "0.35"}
            strokeDasharray="3 5"
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `pv-spin-rev-${slug.replace(/-/g, "")} 12s linear infinite`,
            }}
          />

          {/* Inner filled circle / pulse */}
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            fill={isLabs ? "none" : `url(#${gradId})`}
            fillOpacity={isLabs ? 0 : 0.15}
            stroke={`url(#${gradId})`}
            strokeWidth={isLabs ? "1" : "1.5"}
            strokeOpacity={isLabs ? "0.5" : "0.8"}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `pv-pulse-${slug.replace(/-/g, "")} 4s ease-in-out infinite`,
            }}
          />

          {/* Center dot */}
          {!isLabs && (
            <circle
              cx={cx}
              cy={cy}
              r="3"
              fill={colors.primary}
              fillOpacity="0.9"
              filter={`url(#${glowId})`}
            />
          )}

          {/* Satellite dots */}
          <circle
            cx={dot1x.toFixed(2)}
            cy={dot1y.toFixed(2)}
            r="3"
            fill={colors.primary}
            fillOpacity={isLabs ? "0.4" : "0.7"}
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
            strokeOpacity={isLabs ? "0.3" : "0.5"}
          />

          {/* Connector lines from center to satellites */}
          {!isLabs && (
            <>
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
            </>
          )}
        </g>

        {/* CSS keyframes injected inline — scoped to this SVG's element IDs */}
        <style>{`
          @keyframes pv-spin-${slug.replace(/-/g, "")} {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes pv-spin-rev-${slug.replace(/-/g, "")} {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes pv-pulse-${slug.replace(/-/g, "")} {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.12); opacity: 0.75; }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="pv-spin-${slug.replace(/-/g, "")}"],
            [style*="pv-spin-rev-${slug.replace(/-/g, "")}"],
            [style*="pv-pulse-${slug.replace(/-/g, "")}"] {
              animation: none !important;
            }
          }
        `}</style>
      </svg>
    </div>
  );
}
