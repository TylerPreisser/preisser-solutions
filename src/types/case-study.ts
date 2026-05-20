// Case Study data contract.
//
// Every case study page on /case-studies/[slug] reads a CaseStudyData object
// and renders it through src/components/case-study/CaseStudyPage.tsx. The hub
// at /case-studies reads the same objects to build its grid.
//
// Privacy + voice rules (enforced by content, not by type):
// - No dollar amounts in any string
// - No emoji, no exclamation marks, no marketing clichés
// - "Tyler" is not the subject of body copy — Preisser Solutions / we
// - Astrus → "an MGU within the Alliant Insurance ecosystem"
// - Sunrise → "a Chicago-area bus transportation operator"
// See docs/CANONICAL-PROJECTS.md and docs/WRITER-AGENT-PROMPT.md.

export interface HeadlineResult {
  /** The big number, e.g. "60%+", "5x", "75%". Kept short. */
  value: string;
  /** One-line context for the number, e.g. "Reactivated in 6 weeks". */
  label: string;
}

export interface ExpandedResult {
  /** The big number (matches headline form). */
  value: string;
  /** Short label, sentence fragment. */
  label: string;
  /** Single sentence of additional context. */
  context: string;
}

export interface SpecSubsection {
  title: string;
  items: string[];
}

export interface CaseStudyData {
  // ── Routing / SEO ──────────────────────────────────────────
  slug: string;
  metaTitle: string;          // ≤ 60 chars
  metaDescription: string;    // ≤ 155 chars
  datePublished?: string;     // ISO date
  dateModified?: string;      // ISO date

  // ── Identity ───────────────────────────────────────────────
  category: string;           // chip text, e.g. "AI Automation • Revenue Recovery"
  clientName: string;         // internal/non-public name (for ordering, never rendered as headline)
  clientNameDisplay: string;  // exact public string ("Cassidy HVAC", "an MGU within the Alliant Insurance ecosystem")
  industry: string;           // schema `about`, e.g. "HVAC services", "Commercial trucking"

  // ── Hero ───────────────────────────────────────────────────
  h1: string;
  subheadline: string;        // 1 sentence, ≤ ~30 words
  oneLine: string;            // "60%+ reactivation in 6 weeks" — used on hub cards
  headlineResults: HeadlineResult[]; // 3–4 items for the at-a-glance row

  // ── Body sections ──────────────────────────────────────────
  before: {
    heading: string;
    body: string[];           // each entry = one paragraph
  };

  built: {
    heading: string;
    body: string[];           // each entry = one paragraph
  };

  specifications: {
    heading: string;
    bullets: string[];        // top-level capability bullets (1 line each)
    subsections?: SpecSubsection[];
  };

  results: ExpandedResult[];  // 3–5 items, expanded form of headlineResults

  techStack: string[];        // chip labels (Next.js, GSAP, Salesforce, etc.)

  // ── Closing ────────────────────────────────────────────────
  relatedSlugs: string[];     // 2–3 slugs (just the case-study slug, not the full path)
  cta: {
    heading: string;
    subcopy: string;
    buttonLabel: string;
    buttonHref: string;
  };

  // Optional: a flag/note rendered as a small disclosure (e.g. Wife Supply Co status flag).
  statusNote?: string;
}
