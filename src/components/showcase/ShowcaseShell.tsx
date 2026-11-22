"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./showcase.css";

/**
 * The window's empty shell: the sheet or the glass window with the client's name, the close button and the
 * Website tab's strip and loading bar, and nothing else. It is part of the home page's own code, so a tap
 * is answered in the next frame even when the window's code and the client's data have not arrived yet
 * (a fast thumb, a slow phone connection). The real window takes over when both are here and the shell
 * has finished rising (ShowcaseLayer `handoff`), drawn in the same place with the same classes.
 *
 * showcase.css is imported here, with the home page, for that reason: the shell must be styled before
 * anything lazy arrives (+4.2 kB gzipped CSS on the home page, measured 2026-11-22).
 */

export function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isSheetLayout() {
  return typeof window !== "undefined" && (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.innerWidth < 900);
}

/** How long the window takes to come in (showcase.css: the sheet rises 460 ms, the window grows 420 ms). */
export const ENTRANCE_MS = { sheet: 460, pop: 420 } as const;

type Phase = "measure" | "from" | "open" | "leave";

export function ShowcaseShell({ name, domain, anchor, onClose }: { name: string; domain: string; anchor: HTMLElement; onClose: () => void }) {
  const [sheet] = useState(isSheetLayout);
  const [reduced] = useState(prefersReduced);
  const [phase, setPhase] = useState<Phase>(sheet ? "open" : "measure");
  const [from, setFrom] = useState<string | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // The window grows out of the card, as ShowcaseLayer does.
  useLayoutEffect(() => {
    if (sheet) return;
    const box = boxRef.current;
    if (!box) return;
    const w = box.getBoundingClientRect();
    const c = anchor.getBoundingClientRect();
    const dx = c.left + c.width / 2 - (w.left + w.width / 2);
    const dy = c.top + c.height / 2 - (w.top + w.height / 2);
    setFrom(`translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${(c.width / w.width).toFixed(3)})`);
    setPhase("from");
  }, [anchor, sheet]);
  useEffect(() => {
    if (phase !== "from") return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase("open"));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [phase]);

  useEffect(() => {
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth > 0;
    html.classList.add("sc-lock");
    if (gutter) html.classList.add("sc-lock--gutter");
    if (sheet) html.classList.add("sc-sheet-open");
    return () => html.classList.remove("sc-lock", "sc-lock--gutter", "sc-sheet-open");
  }, [sheet]);

  const closing = useRef(false);
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    setPhase("leave");
    window.setTimeout(onClose, reduced ? 120 : sheet ? 230 : 200);
  };
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (phase !== "measure") closeBtn.current?.focus({ preventScroll: true });
  }, [phase]);

  const head = (
    <div className="sc-head">
      <button type="button" className="sc-close" ref={closeBtn} onClick={close} aria-label={`Close ${name}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <p className="sc-head__name">{name}</p>
      {/* Holds the tab row's place, so nothing moves when the real tabs arrive. */}
      <div className="sc-tabs sc-tabs--placeholder" aria-hidden="true">
        <span className="sc-tabs__tab">Website</span>
      </div>
    </div>
  );
  const panel = (
    <div className="sc-panel">
      <div className="sc-beat" data-on="">
        <div className="sc-web" data-state="loading">
          <div className="sc-web__strip">
            <span className="sc-web__url">
              <svg className="sc-web__lock" width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path d="M2 5V3.6a3 3 0 0 1 6 0V5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <rect x="0.5" y="5" width="9" height="6.5" rx="1.6" fill="currentColor" />
              </svg>
              <span className="sc-web__domain">{domain}</span>
              <span className="sc-web__chip" data-state="loading" aria-live="polite">
                <i aria-hidden="true" />
                Loading<span className="sc-web__chip-more"> the live site…</span>
              </span>
            </span>
          </div>
          <div className="sc-web__view">
            <div className="sc-web__bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const scrim = (
    <div className={`sc-scrim ${sheet ? "sc-scrim--sheet" : "sc-scrim--pop"}`} data-phase={phase} aria-hidden="true" onPointerDown={close} />
  );
  const dialog = { role: "dialog" as const, "aria-modal": true, "aria-label": name };

  if (sheet) {
    return createPortal(
      <div className="sc-root" data-shell="">
        {scrim}
        <div ref={boxRef} className="sc-sheet" data-phase={phase} data-rise={phase === "open" ? "" : undefined} {...dialog}>
          <div className="sc-sheet__grip" aria-hidden="true" />
          {head}
          {panel}
        </div>
      </div>,
      document.body,
    );
  }
  return createPortal(
    <div className="sc-root" data-shell="">
      {scrim}
      <div ref={boxRef} className="sc-pop sc-glass" data-phase={phase} data-mode="pinned" style={{ transform: phase === "from" ? from : undefined }} {...dialog}>
        <span className="sc-sheen" aria-hidden="true" />
        {head}
        {panel}
      </div>
    </div>,
    document.body,
  );
}
