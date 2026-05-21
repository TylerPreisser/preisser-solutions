import Link from "next/link";
import type { AgentData } from "@/types/agent";

interface AgentCardProps {
  agent: AgentData;
  accentIndex?: number;
}

const ACCENT_STOPS: [string, string][] = [
  ["#0D95E8", "#0D95E8"],
  ["#80E9FF", "#80E9FF"],
  ["#00D4AA", "#00D4AA"],
  ["#0D95E8", "#80E9FF"],
];

const STATUS_LABELS: Record<string, string> = {
  "proof-of-concept": "Proof of concept",
  deployable: "Deployable",
};

export function AgentCard({ agent, accentIndex = 0 }: AgentCardProps) {
  const [accentColor] = ACCENT_STOPS[accentIndex % ACCENT_STOPS.length];
  const showStatusPill = agent.status !== "production";

  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="agent-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
      style={
        {
          background: "var(--theme-card-bg)",
          border: "1px solid var(--theme-card-border)",
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
      aria-label={`${agent.name} — ${agent.oneLine}`}
    >
      {/* Gradient accent orb — top-right, blurred */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, var(--accent-color) 0%, transparent 70%)`,
          opacity: 0.12,
        }}
      />

      {/* Category eyebrow + optional status pill */}
      <div className="relative flex items-start justify-between gap-3">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{ color: "var(--theme-text-muted)" }}
        >
          {agent.category}
        </span>
        {showStatusPill && (
          <span
            className="shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wide"
            style={{
              color: "var(--theme-text-muted)",
              borderColor: "var(--theme-card-border)",
              background: "var(--theme-bg-card)",
            }}
          >
            {STATUS_LABELS[agent.status] ?? agent.status}
          </span>
        )}
      </div>

      {/* Optional headline metric */}
      {agent.headlineMetric && (
        <div className="relative mt-5">
          <div
            className="bg-clip-text text-4xl font-semibold leading-none tracking-[-0.03em] text-transparent sm:text-5xl"
            style={{
              backgroundImage: "linear-gradient(135deg, #0D95E8 0%, #80E9FF 100%)",
            }}
          >
            {agent.headlineMetric.value}
          </div>
          <div
            className="mt-1.5 text-[11px] uppercase tracking-[0.13em]"
            style={{ color: "var(--theme-text-muted)" }}
          >
            {agent.headlineMetric.label}
          </div>
        </div>
      )}

      {/* Agent name */}
      <h3
        className={`relative text-xl font-semibold leading-snug ${agent.headlineMetric ? "mt-6" : "mt-8"}`}
        style={{ color: "var(--theme-text-primary)" }}
      >
        {agent.name}
      </h3>

      {/* One-line description — line-clamp 3 */}
      <p
        className="relative mt-3 flex-1 text-[15px] leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
        style={{ color: "var(--theme-text-secondary)" }}
      >
        {agent.oneLine}
      </p>

      {/* Card footer */}
      <div
        className="relative mt-7 flex items-center justify-between border-t pt-5"
        style={{ borderColor: "var(--theme-card-border)" }}
      >
        <span className="text-sm font-medium" style={{ color: "#0D95E8" }}>
          View agent
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0D95E8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
