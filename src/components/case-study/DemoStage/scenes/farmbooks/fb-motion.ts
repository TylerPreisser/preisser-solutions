// scenes/farmbooks/fb-motion.ts
// The only 5 constants from Farm Invoice Processing System/web/components/showcase/tokens.ts
// @8cbbbb4 that survive the transplant. Consumed only by WheatAgent.tsx — every other tokens.ts
// export was page-chrome or scroll-reveal plumbing the kit's DemoStage/useStageTimeline replace
// outright (ADR-0016 §3).
import type { Transition } from "framer-motion";

/** The logomark gold, exactly as the mark draws it. Same hex as --fb-gold in farmbooks.css. */
export const GOLD_MARK = "#C9A227";
/** Amber means one thing in this product: a human needs to look at this. Same hex as --fb-amber. */
export const AMBER_EYES = "#A85800";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.58, 1];
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 120, damping: 22 };
