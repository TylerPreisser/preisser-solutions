"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * A tab's "before" card, folded to a strip on a phone (final-NW B3). Drawn
 * in full, the old-materials picture was 196-247px tall, so every tour stop
 * on a phone opened on the before card and the product's steps played behind
 * the sticky control bar (320x568: 0-115px of product in a 354px band).
 *
 * Below 1024px WITH JS it is one tappable line, "Before" and a short title;
 * the tap opens the kit's caption and the drawn picture (nwks-admin.css,
 * "Before strip"). Without JS, and on the desk, the toggle is not shown and
 * the picture is drawn as it always was. It folds again when its tab is left
 * or a tour starts, so a tour never opens on an unfolded picture.
 */
export function BeforeStrip({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    const panel = el?.closest<HTMLElement>('[role="tabpanel"]');
    const tour = el?.closest(".demo-tabs")?.querySelector(".demo-tabs__tour");
    if (!panel) return;
    const fold = () => {
      if (panel.hidden || tour?.getAttribute("aria-pressed") === "true") setOpen(false);
    };
    const mo = new MutationObserver(fold);
    mo.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    if (tour) mo.observe(tour, { attributes: true, attributeFilter: ["aria-pressed"] });
    return () => mo.disconnect();
  }, []);
  return (
    <div ref={ref} className="nwks-before" data-open={open ? "" : undefined}>
      <button
        type="button"
        className="nwks-before-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nwks-before-text">
          <span className="nwks-before-eyebrow">Before</span>
          <span className="nwks-before-title">{title}</span>
        </span>
        <span className="nwks-before-act" aria-hidden="true">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      <div id={id} className="nwks-before-body">
        {children}
      </div>
    </div>
  );
}
