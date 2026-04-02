# Architectural Decisions

> **Append-only log.** Every significant decision gets recorded here with rationale.
> Format: Date — Decision — Why — Alternatives Considered

---

## 2026-04-02 — Next.js 15 + App Router for framework

**Decision**: Use Next.js 15 with App Router and static export.

**Why**: Tyler already uses this stack for tylerpreisser.com (same mental model, same deploy target). Stripe itself uses Next.js. App Router gives us layouts, metadata API, and modern React patterns. Static export means zero server costs on Cloudflare Pages.

**Alternatives**: Astro (lighter but less animation ecosystem), pure HTML/CSS (no build step but harder to maintain), Remix (overkill — we don't need server features).

---

## 2026-04-02 — Tailwind v4 for styling

**Decision**: Use Tailwind v4 with PostCSS integration.

**Why**: Utility-first means rapid iteration. v4 has native CSS custom property support via `@theme` directive. Tyler already knows Tailwind from his personal site. Design tokens defined once in CSS, consumed everywhere.

**Alternatives**: CSS Modules (more boilerplate), Styled Components (runtime cost), vanilla CSS (slower iteration).

---

## 2026-04-02 — GSAP + Framer Motion split for animation

**Decision**: GSAP for scroll-triggered animations, Framer Motion for page transitions and micro-interactions.

**Why**: GSAP ScrollTrigger is the gold standard for scroll animations (SplitText, staggered reveals). Framer Motion integrates better with React for layout animations and AnimatePresence page transitions. Using both gives best-of-both without overlap.

**Alternatives**: GSAP only (harder page transitions in React), Framer Motion only (weaker scroll animation control), CSS-only (too limited for Stripe-level polish).

---

## 2026-04-02 — Content in data files, not JSX

**Decision**: All text content lives in `src/data/*.ts` files as typed objects. Components import data.

**Why**: Separation of concerns. Content editors don't need to understand React. Future CMS migration is trivial (swap data imports for API calls). Prevents accidental component breakage when editing copy.

**Alternatives**: Hardcode in JSX (faster initially, nightmare to maintain), MDX (good for blog, overkill for marketing pages), headless CMS (premature — add later if needed).

---

## 2026-04-02 — Self-updating documentation system

**Decision**: CLAUDE.md acts as master system prompt. Agents MUST read docs at session start and update them at session end. Living status.md, decisions.md, and current-plan.md.

**Why**: Prevents context loss between sessions. Every agent picks up exactly where the last one left off. Decisions are recorded with rationale so future agents don't re-argue settled questions. Status tracks blockers so nothing falls through cracks.

**Alternatives**: Rely on git history (too noisy, no intent), CLAUDE.md only (gets stale without update protocol), external project management (overhead, not in the IDE).

---

## 2026-04-02 — Balanced animation strategy

**Decision**: Animated hero + scroll reveals + page transitions. No custom cursor, particles, 3D, or parallax.

**Why**: Tyler wants Stripe precision + tylerpreisser.com personality, but content-first. "Balanced" means smooth and polished without spectacle. Professional automation consultancy needs to feel trustworthy, not flashy.

**Alternatives**: Stripe-heavy (too much animation overhead for a consultancy site), Minimal (wouldn't differentiate from generic templates).
