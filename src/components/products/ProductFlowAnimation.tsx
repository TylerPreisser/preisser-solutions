import type { CSSProperties } from "react";
import type { ProductData } from "@/types/product";
import {
  type ProductFlowAnimation,
  productFlowAnimations,
} from "@/data/products/product-flow-animations";

interface ProductFlowAnimationProps {
  product: ProductData;
}

const CATEGORY_COLORS: Record<ProductData["category"], { primary: string; secondary: string; accent: string }> = {
  "Marketing & Growth": {
    primary: "#80E9FF",
    secondary: "#0D95E8",
    accent: "#00D4AA",
  },
  "Operations & Back-Office": {
    primary: "#00D4AA",
    secondary: "#0D95E8",
    accent: "#F59E0B",
  },
  "Sales & Customer Service": {
    primary: "#0D95E8",
    secondary: "#80E9FF",
    accent: "#00D4AA",
  },
  "Decision Intelligence": {
    primary: "#8B9CFF",
    secondary: "#0D95E8",
    accent: "#80E9FF",
  },
  "Custom Builds": {
    primary: "#CBD5E1",
    secondary: "#0D95E8",
    accent: "#00D4AA",
  },
};

function fallbackFlow(product: ProductData): ProductFlowAnimation {
  return {
    badge: "Agent workflow",
    centerLabel: product.name,
    centerSubcopy: "Reads, reasons, routes",
    proof: product.oneLine,
    inputs: product.inputs.slice(0, 4).map((input) => ({
      label: input.label,
      detail: input.format ?? "source data",
    })),
    steps: product.howItWorks.slice(0, 3).map((step) => ({
      label: step.step,
      detail: step.description,
    })),
    outputs: product.outputs.slice(0, 4).map((output) => ({
      label: output.label,
      detail: output.format ?? "agent output",
    })),
  };
}

function compact(value: string, max = 24) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}...`;
}

function FlowCardText({
  x,
  label,
  detail,
  align = "start",
}: {
  x: number;
  label: string;
  detail: string;
  align?: "start" | "end";
}) {
  return (
    <>
      <text x={x} y="34" textAnchor={align} className="ps-product-flow__kicker">
        {compact(label, 25)}
      </text>
      <text x={x} y="64" textAnchor={align} className="ps-product-flow__label">
        {compact(detail, 27)}
      </text>
    </>
  );
}

export function ProductFlowAnimation({ product }: ProductFlowAnimationProps) {
  const flow = productFlowAnimations[product.slug] ?? fallbackFlow(product);
  const color = CATEGORY_COLORS[product.category];
  const svgId = product.slug.replace(/[^a-z0-9]+/g, "-");
  const inputY = [76, 194, 312, 430];
  const outputY = [76, 194, 312, 430];
  const safeInputs = flow.inputs.slice(0, 4);
  const safeOutputs = flow.outputs.slice(0, 4);
  const safeSteps = flow.steps.slice(0, 3);

  return (
    <figure
      className="ps-product-flow"
      style={
        {
          "--flow-primary": color.primary,
          "--flow-secondary": color.secondary,
          "--flow-accent": color.accent,
        } as CSSProperties
      }
    >
      <svg
        className="ps-product-flow__svg"
        viewBox="0 0 1080 590"
        role="img"
        aria-labelledby={`${svgId}-flow-title ${svgId}-flow-desc`}
      >
        <title id={`${svgId}-flow-title`}>{product.name} workflow animation</title>
        <desc id={`${svgId}-flow-desc`}>
          Animated workflow showing inputs flowing into {flow.centerLabel} and
          becoming concrete outputs.
        </desc>
        <defs>
          <linearGradient id={`${svgId}-bg`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="52%" stopColor="#0F1D30" />
            <stop offset="100%" stopColor="#07111F" />
          </linearGradient>
          <linearGradient id={`${svgId}-line`} x1="0" x2="1">
            <stop offset="0%" stopColor={color.secondary} />
            <stop offset="50%" stopColor={color.primary} />
            <stop offset="100%" stopColor={color.accent} />
          </linearGradient>
          <filter id={`${svgId}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.05 0 0 0 0 0.58 0 0 0 0 0.91 0 0 0 0.7 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${svgId}-shadow`} x="-10%" y="-20%" width="125%" height="150%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.25" />
          </filter>
          <marker
            id={`${svgId}-arrow`}
            markerWidth="10"
            markerHeight="10"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={color.primary} opacity="0.92" />
          </marker>
        </defs>

        <rect width="1080" height="590" rx="18" fill={`url(#${svgId}-bg)`} />
        <path
          className="ps-product-flow__grid"
          d="M56 82H1024M56 160H1024M56 238H1024M56 316H1024M56 394H1024M56 472H1024M168 52V532M298 52V532M428 52V532M558 52V532M688 52V532M818 52V532M948 52V532"
        />

        <text x="56" y="44" className="ps-product-flow__badge">
          {flow.badge}
        </text>
        <text x="1024" y="44" textAnchor="end" className="ps-product-flow__proof">
          {compact(flow.proof, 72)}
        </text>

        {safeInputs.map((_, index) => {
          const y = inputY[index] + 42;
          const pathId = `${svgId}-input-${index}`;
          return (
            <path
              key={pathId}
              id={pathId}
              className="ps-product-flow__line"
              d={`M292 ${y} C400 ${y} 408 ${260 + index * 18} 482 ${286 + index * 6}`}
              markerEnd={`url(#${svgId}-arrow)`}
            />
          );
        })}

        {safeOutputs.map((_, index) => {
          const y = outputY[index] + 42;
          const pathId = `${svgId}-output-${index}`;
          return (
            <path
              key={pathId}
              id={pathId}
              className="ps-product-flow__line ps-product-flow__line--out"
              d={`M598 ${286 + index * 6} C684 ${260 + index * 18} 692 ${y} 788 ${y}`}
              markerEnd={`url(#${svgId}-arrow)`}
            />
          );
        })}

        {safeInputs.map((input, index) => (
          <g
            key={input.label}
            className={`ps-product-flow__card ps-product-flow__card--input ps-product-flow__float-${index + 1}`}
            transform={`translate(56 ${inputY[index]})`}
          >
            <rect width="236" height="84" rx="8" filter={`url(#${svgId}-shadow)`} />
            <FlowCardText x={18} label={input.label} detail={input.detail} />
          </g>
        ))}

        <g className="ps-product-flow__core" transform="translate(540 298)">
          <circle r="112" className="ps-product-flow__halo" />
          <circle r="84" className="ps-product-flow__ring" />
          <circle r="61" className="ps-product-flow__body" filter={`url(#${svgId}-glow)`} />
          <path
            className="ps-product-flow__mark"
            d="M-29 -20h58M-29 0h42M-29 20h54M-6 -46l19 19-19 19M12 26l19 19-19 19"
          />
          <text x="0" y="-8" textAnchor="middle" className="ps-product-flow__core-title">
            {compact(flow.centerLabel, 20)}
          </text>
          <text x="0" y="22" textAnchor="middle" className="ps-product-flow__core-subtitle">
            {compact(flow.centerSubcopy, 24)}
          </text>
        </g>

        <g className="ps-product-flow__steps" transform="translate(362 500)">
          {safeSteps.map((step, index) => (
            <g key={step.label} transform={`translate(${index * 120} 0)`}>
              <rect width="106" height="54" rx="8" />
              <text x="14" y="23" className="ps-product-flow__step-label">
                {compact(step.label, 12)}
              </text>
              <text x="14" y="41" className="ps-product-flow__step-detail">
                {compact(step.detail, 14)}
              </text>
            </g>
          ))}
        </g>

        {safeOutputs.map((output, index) => (
          <g
            key={output.label}
            className={`ps-product-flow__card ps-product-flow__card--output ps-product-flow__output-${index + 1}`}
            transform={`translate(788 ${outputY[index]})`}
          >
            <rect width="236" height="84" rx="8" filter={`url(#${svgId}-shadow)`} />
            <FlowCardText x={18} label={output.label} detail={output.detail} />
          </g>
        ))}

        {safeInputs.map((_, index) => (
          <circle key={`in-dot-${index}`} r="5" className="ps-product-flow__dot">
            <animateMotion dur="6.2s" begin={`${index * 0.55}s`} repeatCount="indefinite">
              <mpath href={`#${svgId}-input-${index}`} />
            </animateMotion>
          </circle>
        ))}

        {safeOutputs.map((_, index) => (
          <circle key={`out-dot-${index}`} r="5" className="ps-product-flow__dot ps-product-flow__dot--out">
            <animateMotion dur="6.2s" begin={`${2.2 + index * 0.55}s`} repeatCount="indefinite">
              <mpath href={`#${svgId}-output-${index}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </figure>
  );
}
