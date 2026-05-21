import type { ProductStatus } from "@/types/product";

const PILL_CONFIG: Record<ProductStatus, { label: string; dot?: string }> = {
  production: { label: "LIVE" },
  deployable: { label: "READY", dot: "var(--ed-cyan)" },
  "proof-of-concept": { label: "LAB", dot: "var(--ed-mint)" },
  service: { label: "SVC" },
};

export function StatusPill({ status }: { status: ProductStatus }) {
  const config = PILL_CONFIG[status] ?? { label: status.toUpperCase() };

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5"
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "10px",
        letterSpacing: "0.14em",
        color: "var(--ed-ink)",
        borderColor: "var(--ed-hairline)",
        background: "var(--ed-surface)",
      }}
    >
      {config.dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
          style={{ background: config.dot }}
          aria-hidden="true"
        />
      )}
      {config.label}
    </span>
  );
}
