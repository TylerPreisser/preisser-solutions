import type { ReactNode } from "react";

/**
 * The Proof Stage section (ADR-0016 §1), between "What we built" and the
 * specifications. NOT a Framer motion element: the sections around it render at
 * opacity 0 until hydration (CaseStudyPage.tsx:464-469), and a stage inside such
 * a wrapper would be invisible without JS. NOT overflow-hidden either
 * (CaseStudyPage.tsx:243, 520, 739, 959): the phone mat bleeds into the gutter.
 * The eyebrow and h2 reuse BuiltSection's markup so the section reads as native.
 * Copy is provisional; content review owns these two strings.
 */
export function DemoSection({ stageIds, children }: { stageIds: readonly string[]; children: ReactNode }) {
  return (
    <section
      className="demo-section"
      data-demo-section
      data-demo-expected={stageIds.join(" ")}
      aria-labelledby="demo-section-heading"
      style={{ background: "var(--theme-section-alt)", transition: "background 300ms ease" }}
    >
      <div className="ps-container">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{
            border: "1px solid var(--theme-card-border)",
            background: "var(--theme-card-bg)",
            color: "var(--theme-text-secondary)",
          }}
        >
          <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--color-primary)" }} />
          See it work
        </div>
        <h2
          id="demo-section-heading"
          className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl"
          style={{ color: "var(--theme-text-primary)" }}
        >
          Watch it work on demonstration data.
        </h2>
        <div className="demo-section__stages">{children}</div>
      </div>
    </section>
  );
}
