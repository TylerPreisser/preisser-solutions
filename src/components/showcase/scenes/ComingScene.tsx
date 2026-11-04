/**
 * Round 2 stand-in for a walkthrough scene its builder has not landed yet
 * (ADR-0025). Neutral box, no data. Each builder swaps its entry in
 * FLUID_SCENES (scenes/index.ts) for the real component.
 */
export function ComingScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        color: "var(--pt-ink-soft, #475569)",
      }}
    >
      {/* No words: the privacy probe allowlists every word a stage prints. */}
      <div aria-hidden="true" style={{ border: "1px dashed currentColor", borderRadius: 14, width: "60%", height: "50%", opacity: 0.5 }} />
    </div>
  );
}
