"use client";
import { useState } from "react";
import { ProductScreen } from "../../ProductScreen";
import { StepNote } from "./StepNote";
import { lookout } from "@/data/demos/nwks-encounter";

/**
 * Lookout AI tab (spec-NW.md §2.6): a hairline thread, a live trace that
 * clears, and ambiguous candidates offered as chips, never auto-selected.
 * No "before" card: `nwks-encounter.ts` documents no pre-existing pain point
 * for this feature (spec-NW.md's unresolved question 1, resolved: omit it).
 * Source: admin/src/pages/{Ask,ask/LookoutThread}.tsx @6802623 (SOURCE.md).
 * No screenshot exists for this tab; anatomy is source-only (spec-NW.md §2.6).
 */
function Body() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="nwks-body">
      <div className="nwks-thread">
        <div className="nwks-turn" data-stage-step="1" data-fx="rise">
          <p className="nwks-turn-q">{lookout.resolvedQuestion}</p>
          <StepNote tab="lookout" k={1} />
          <p className="nwks-trace" data-stage-step="2" data-fx="ghost">
            Checking the roster…
          </p>
          <StepNote tab="lookout" k={2} />
          <p className="nwks-turn-a" data-stage-step="3">
            {lookout.resolvedAnswer}
          </p>
          <StepNote tab="lookout" k={3} />
        </div>
        <div className="nwks-turn" data-stage-step="4" data-fx="rise">
          <p className="nwks-turn-q">{lookout.ambiguousQuestion}</p>
          <p className="nwks-turn-a">More than one man on the roster answers to that first name.</p>
          <div className="nwks-candidates">
            {lookout.ambiguousCandidates.map((c) => (
              <button
                key={c.name}
                type="button"
                className="nwks-candidate-chip"
                aria-pressed={picked === c.name}
                onClick={() => setPicked(c.name)}
              >
                {c.name} · {c.town}
              </button>
            ))}
          </div>
          <StepNote tab="lookout" k={4} />
          {picked ? <p className="nwks-turn-a">{picked}&apos;s launch point is on his own record above.</p> : null}
        </div>
      </div>
    </div>
  );
}

export function LookoutScreen() {
  return <ProductScreen chrome="NWKS Admin · Lookout AI" tag="Recreation" desk={<Body />} />;
}
