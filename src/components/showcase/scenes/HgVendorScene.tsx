"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ACORD_ALT, CHECKS, CUES, FILED, FILES, STEPS, T, VENDOR, VENDOR_FILE, VENDOR_TOTAL_MS, type CheckKey } from "@/data/showcase/scenes/hg-vendor";
import { ACORD_IMAGE, ACORD_REGIONS } from "@/data/showcase/scenes/hg-vendor-regions";
import "./hg-vendor.css";

/**
 * HG Oil, "Vendor Insurance" (ADR-0025 §2, design-spec-r2 §2): a certificate
 * arrives, four checks tick green, "Good to go", and it files itself into the
 * vendor's folder. Four steps, 13 s.
 *
 * The certificate is ONE <img> drawn at its display size (the real ACORD 25,
 * rendered once by scripts/render-acord.mjs): no live HTML form, no CSS zoom,
 * no transform, filter or will-change on it at rest, so every engine draws the
 * same pixels and no large layer is promoted. What moves is small: a 2 px scan
 * line, the region outlines (opacity only), the row icons, the verdict and the
 * thumbnail that flies to the folder (<= 120 x 155).
 *
 * The scene re-renders only when the clock crosses a cue (data CUES); the
 * motion between cues is CSS. Pausing pauses the CSS too. Reduced motion: no
 * scan, spin, flight or fade; it opens on "Good to go" and cuts to "Filed" at
 * its cue. Before it plays (no JS, the privacy probe) it shows "Good to go".
 * Every view is in the DOM (the one not on screen is `hidden`), so the probe
 * reads every word.
 */

/** The fluid-scene props (scenes/index.ts FLUID_SCENES), declared here so this scene does not depend on the retired COI scene. */
export interface VendorSceneProps {
  variant: "desk" | "phone";
  /** The beat's tab is on screen: the story restarts from the top each time this turns true. */
  active: boolean;
  reduced: boolean;
  onCaption?: (line: string) => void;
  /** The visitor took the controls: the window stops moving to the next tab. */
  onHold?: () => void;
}

const N = STEPS.length;
const STEP_END = STEPS.map((s, k) => (k < N - 1 ? STEPS[k + 1].at - 1 : VENDOR_TOTAL_MS));
/** The frame shown before the scene plays, and the reduced-motion start: "Good to go", held. */
const GOOD_T = STEP_END[2];

const stepAt = (t: number) => {
  let k = 0;
  for (let i = 0; i < N; i++) if (t >= STEPS[i].at) k = i;
  return k;
};

interface Clock {
  t: number;
  playing: boolean;
  /** The visitor jumped to a step: show that step's own end state, even under reduced motion. */
  jumped: boolean;
  /** Bumped by every restart or jump, so the clock and the CSS restart from the new place. */
  seq: number;
}

function useClock(active: boolean, reduced: boolean, ready: boolean) {
  const [c, setC] = useState<Clock>({ t: GOOD_T, playing: false, jumped: false, seq: 0 });
  const ref = useRef(c);
  ref.current = c;

  useEffect(() => {
    if (!active) return;
    setC((p) => ({ t: 0, playing: true, jumped: false, seq: p.seq + 1 }));
  }, [active, reduced]);

  useEffect(() => {
    // The timeline starts once the certificate has decoded (or failed: the checklist then plays alone).
    if (!active || !c.playing || !ready) return;
    let raf = 0;
    let last = performance.now();
    let t = ref.current.t;
    const tick = (now: number) => {
      t += Math.min(120, Math.max(0, now - last));
      last = now;
      const next = CUES.find((q) => q > ref.current.t);
      if (next === undefined || t >= VENDOR_TOTAL_MS) {
        setC((p) => ({ ...p, t: VENDOR_TOTAL_MS, playing: false }));
        return;
      }
      if (t >= next) setC((p) => ({ ...p, t }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, c.playing, c.seq, ready]);

  /** Show step k's end state and hold there (the visitor took the controls). */
  const go = (k: number) => setC((p) => ({ t: STEP_END[k], playing: false, jumped: true, seq: p.seq + 1 }));
  const toggle = () =>
    setC((p) => {
      if (p.playing) return { ...p, playing: false };
      if (p.t >= VENDOR_TOTAL_MS) return { t: 0, playing: true, jumped: false, seq: p.seq + 1 };
      return { ...p, playing: true };
    });
  // Reduced motion runs the same clock but shows "Good to go" until the Filed cue (no step-by-step build-up).
  const shown = reduced && !c.jumped && c.t < STEPS[3].at ? GOOD_T : c.t;
  return { ...c, t: shown, go, toggle };
}

function useBox(ref: React.RefObject<HTMLElement | null>) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setBox((b) => (b.w === el.clientWidth && b.h === el.clientHeight ? b : { w: el.clientWidth, h: el.clientHeight }));
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return box;
}

type Rect = { x: number; y: number; w: number; h: number };
interface Layout {
  mode: "desk" | "phone" | "overlay";
  doc: Rect;
  /** The checklist column (desk) or block (phone). */
  side: CSSProperties;
  /** The checklist's width: under 480 the values use their short forms (no ellipsis). */
  sideW: number;
}

const RATIO = ACORD_IMAGE.nativeH / ACORD_IMAGE.nativeW;

/** Where the certificate and the checklist sit for a stage of W x H (design-spec-r2 §2.2). */
function layoutFor(variant: "desk" | "phone", W: number, H: number, sideH: number): Layout {
  // A tall, narrowish window (a tablet held upright) stacks like a phone: side by side, the page would be small and the column cramped.
  const tall = W < 1000 && H > W * 0.85;
  if (variant === "desk" && W >= 720 && !tall) {
    const pad = Math.round(Math.min(56, Math.max(24, W * 0.046)));
    const gap = Math.round(Math.min(88, Math.max(36, W * 0.07)));
    const top = H >= 560 ? 40 : 28;
    let h = Math.min(616, H - top - 20);
    let w = h / RATIO;
    const sideMin = 340;
    if (pad + w + gap + sideMin + pad > W) {
      w = Math.max(220, W - 2 * pad - gap - sideMin);
      h = w * RATIO;
    }
    const doc = { x: pad, y: top, w: Math.round(w), h: Math.round(h) };
    return { mode: "desk", doc, side: { left: doc.x + doc.w + gap, right: pad, top }, sideW: W - (doc.x + doc.w + gap) - pad };
  }
  // Phone: the certificate centred above the checklist; a short stage lays the checklist over the page.
  // The room under the page is the checklist's MEASURED height (each engine's own line boxes), else the spec's estimate.
  if (H >= 470) {
    const top = 12;
    const below = (sideH > 0 ? sideH : 236) + 12 + 8;
    const w = Math.round(Math.max(180, Math.min(W - 80, (H - top - below) / RATIO)));
    const doc = { x: Math.round((W - w) / 2), y: top, w, h: Math.round(w * RATIO) };
    const sideW = Math.min(W - 28, 560);
    return { mode: "phone", doc, side: { left: Math.round((W - sideW) / 2), width: sideW, top: doc.y + doc.h + 12 }, sideW };
  }
  // A short phone (toolbar showing, or a 320 x 568): the page fills the width and a compact checklist card sits over its lower part.
  const w = W - 24;
  const doc = { x: 12, y: 10, w, h: Math.round(w * RATIO) };
  return { mode: "overlay", doc, side: { left: 8, right: 8, bottom: 8 }, sideW: W - 16 };
}

type RowState = "wait" | "on" | "ok";
const rowState = (i: number, t: number): RowState => (t < T.checkAt[i] ? "wait" : t < T.checkAt[i] + T.tickAfter ? "on" : "ok");
/** A region outline: drawn while its check runs, green once it ticks, gone after; all four come back green with the verdict. */
const boxState = (i: number, t: number): "" | "is-on" | "is-ok" => {
  if (t >= T.verdict) return "is-ok";
  if (t < T.checkAt[i] || t >= T.checkAt[i] + T.boxOffAfter) return "";
  return t < T.checkAt[i] + T.tickAfter ? "is-on" : "is-ok";
};

export function HgVendorScene({ variant, active, reduced, onCaption, onHold }: VendorSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const [img, setImg] = useState<"loading" | "ready" | "failed">("loading");
  const clock = useClock(active, reduced, img !== "loading");
  const { t, playing, seq } = clock;
  const box = useBox(stageRef);
  const sideBox = useBox(sideRef);

  // The certificate is decoded before the timeline starts (spec §2.4).
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) {
      setImg("ready");
      return;
    }
    let live = true;
    el.decode()
      .then(() => live && setImg("ready"))
      .catch(() => live && setImg(el.complete && el.naturalWidth > 0 ? "ready" : "failed"));
    return () => {
      live = false;
    };
  }, []);

  const step = stepAt(t);
  const report = useRef(onCaption);
  report.current = onCaption;
  const listening = Boolean(onCaption);
  useEffect(() => {
    if (listening) report.current?.(STEPS[step].caption);
  }, [step, listening]);

  const W = box.w || (variant === "phone" ? 342 : 1218);
  const H = box.h || (variant === "phone" ? 560 : 700);
  const L = layoutFor(variant, W, H, sideBox.h);
  const s = L.doc.w / ACORD_IMAGE.nativeW;
  const phoneLike = L.mode !== "desk";
  const shortValues = phoneLike || L.sideW < 480;
  // Overlay: the verdict sits in the middle of the part of the page the card leaves showing.
  const visMid = L.mode === "overlay" && sideBox.h > 0 ? Math.max(40, (H - 8 - sideBox.h - L.doc.y) / 2) : null;
  /** Region outline width: thinner on a phone, where the page is drawn at a third of its size. */
  const bw = phoneLike ? 1.5 : 2;

  const filed = t >= T.filed;
  const good = t >= T.verdict;
  // The filed card opens (empty) as the thumbnail takes off, and fills as it lands; reduced motion shows both at once.
  const expanded = filed && (reduced || t >= T.fly);
  const open = filed && (reduced || t >= T.open);
  const motion = !reduced;
  // Entrance motion runs only while the story is live; before it plays (no JS, the probe) every element is at rest.
  const live = active && motion && seq > 0;
  const scanning = motion && t >= T.scanFrom && t < T.scanTo;
  const fileLine = t < T.scanFrom ? "New certificate · just now" : t < T.scanTo ? "Reading every field" : VENDOR_FILE;

  // The bar of the step now playing fills over the step's length; its start is fixed when the step begins.
  const fillFrom = useRef<{ key: string; delay: number }>({ key: "", delay: 0 });
  const fillKey = `${step}-${seq}`;
  if (fillFrom.current.key !== fillKey) fillFrom.current = { key: fillKey, delay: t - STEPS[step].at };

  // The flight: from the certificate's centre to the filed card's thumbnail slot (measured once the files show).
  const [slot, setSlot] = useState<Rect | null>(null);
  useLayoutEffect(() => {
    if (!filed) return;
    const root = rootRef.current;
    const el = slotRef.current;
    if (!root || !el) return;
    const r = el.getBoundingClientRect();
    const o = root.getBoundingClientRect();
    if (r.width > 0) setSlot({ x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height });
  }, [filed, W, H, seq]);
  const flying = motion && t >= T.fly && t < T.open && slot !== null && img !== "failed";
  const thumbW = phoneLike ? 76 : 120;
  const thumbH = Math.round(thumbW * RATIO);
  // The stage is the root's first row, at its top: stage and root coordinates are the same.
  const from = { x: L.doc.x + L.doc.w / 2 - thumbW / 2, y: L.doc.y + L.doc.h / 2 - thumbH / 2 };

  const hold = () => onHold?.();
  const label = (k: number) => `Step ${k + 1} of ${N}: ${STEPS[k].title}`;

  return (
    <div
      ref={rootRef}
      className={`hgv hgv--${L.mode}${L.mode === "desk" && H < 600 ? " is-short" : ""}${reduced ? " is-still" : ""}${live ? " is-live" : ""}${playing ? "" : " is-paused"}`}
      data-scene="hg-vendor"
      data-step={step + 1}
      data-t={Math.round(t)}
      data-arriving={live && playing && t < T.scanFrom ? "" : undefined}
    >
      <div className="hgv-stage" ref={stageRef}>
        <section className="hgv-view hgv-check" data-beat="check" hidden={filed}>
          {phoneLike ? null : (
            <p className="hgv-file" style={{ left: L.doc.x, top: Math.max(8, L.doc.y - 28) }}>
              {fileLine}
            </p>
          )}
          <div
            className={`hgv-doc${good ? " is-good" : ""}${img === "failed" ? " is-failed" : ""}`}
            style={{ left: L.doc.x, top: L.doc.y, width: L.doc.w, height: L.doc.h, ...(visMid !== null ? ({ "--hgv-vis-mid": `${visMid}px` } as CSSProperties) : null) }}
          >
            {/* A plain <img> at display size on purpose (static export; next/image would add a wrapper and srcset). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={ACORD_IMAGE.src}
              alt={ACORD_ALT}
              width={ACORD_IMAGE.width}
              height={ACORD_IMAGE.height}
              decoding="async"
              draggable={false}
              onLoad={() => setImg("ready")}
              onError={() => setImg("failed")}
            />
            {img === "failed" ? <p className="hgv-doc__fail">Certificate preview unavailable</p> : null}
            {CHECKS.map((c, i) => {
              const r = ACORD_REGIONS[c.key];
              return (
                <i
                  key={c.key}
                  className={`hgv-region ${boxState(i, t)}`}
                  data-region={c.key}
                  aria-hidden="true"
                  // The border is centred on the form's own column rules, so it never covers the first letters inside the column.
                  style={{ left: r.x * s - bw / 2, top: r.y * s - bw / 2, width: r.w * s + bw, height: r.h * s + bw, borderWidth: bw }}
                />
              );
            })}
            {good && phoneLike ? <Verdict key={`v-${seq}`} /> : null}
            {/* Last child: nothing paints above the scan line, so nothing else is promoted with it. */}
            {scanning ? (
              // The clip box keeps the moving line's bounds on the page, so nothing beside the page is promoted with it.
              <span className="hgv-scanbox" aria-hidden="true">
                <i
                  className="hgv-scan"
                  aria-hidden="true"
                  style={{ "--hgv-scan-to": `${L.doc.h - 2}px`, animationDelay: `${-(t - T.scanFrom)}ms` } as CSSProperties}
                />
              </span>
            ) : null}
          </div>

          <div className="hgv-side" style={L.side} ref={sideRef}>
            {phoneLike ? null : <p className="hgv-kicker">Vendor</p>}
            <p className="hgv-vendor">{VENDOR}</p>
            {phoneLike ? null : <p className="hgv-sub">Certificate of liability insurance · ACORD 25</p>}
            <ul className="hgv-checks">
              {CHECKS.map((c, i) => (
                <Row key={c.key} k={c.key} label={c.label} value={shortValues ? c.short : c.value} state={rowState(i, t)} />
              ))}
            </ul>
            {good && !phoneLike ? <Verdict key={`v-${seq}`} /> : null}
          </div>
        </section>

        <section className={`hgv-view hgv-files${phoneLike ? "" : " is-centred"}`} data-beat="filed" hidden={!filed}>
          <div className="hgv-files__in">
            {phoneLike ? null : <p className="hgv-kicker">Vendor files</p>}
            <p className="hgv-files__h">{phoneLike ? FILED.headingPhone : FILED.heading}</p>
            <ul className="hgv-folders">
              {FILES.map((f) => (
                <li
                  key={f.name}
                  className={`hgv-folder${f.open ? " is-target" : ""}${f.open && expanded ? " is-expanded" : ""}${f.open && open ? " is-open" : ""}`}
                >
                  <div className="hgv-folder__row">
                    <span className="hgv-folder__ic" aria-hidden="true" />
                    <span className="hgv-folder__name">
                      <b>{f.name}</b>
                      {phoneLike ? null : (
                        <span>
                          {f.open && open ? f.count : f.open ? f.count - 1 : f.count} certificates
                        </span>
                      )}
                    </span>
                    <span className="hgv-status">{FILED.status}</span>
                  </div>
                  {f.open ? (
                    <div className="hgv-filed" aria-hidden={!open || undefined}>
                      <div className="hgv-filed__in">
                        <div className="hgv-filed__card">
                          <span className="hgv-filed__thumb" ref={slotRef}>
                            {/* The certificate's own small copy; decorative here (the card's words say what it is). */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={ACORD_IMAGE.thumb} alt="" width={408} height={528} decoding="async" draggable={false} />
                          </span>
                          <span className="hgv-filed__txt">
                            <b>{FILED.title}</b>
                            <span>{FILED.sub}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {flying && slot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="hgv-fly"
          key={`fly-${seq}`}
          src={ACORD_IMAGE.thumb}
          alt=""
          aria-hidden="true"
          width={thumbW}
          height={thumbH}
          style={
            {
              left: from.x,
              top: from.y,
              width: thumbW,
              height: thumbH,
              "--hgv-fx": `${slot.x - from.x}px`,
              "--hgv-fy": `${slot.y - from.y}px`,
              "--hgv-fs": `${slot.w / thumbW}`,
              animationDelay: `${-(t - T.fly)}ms`,
            } as CSSProperties
          }
        />
      ) : null}

      <div className="hgv-ctl" role="group" aria-label="Vendor insurance steps">
        <button
          type="button"
          className="hgv-play"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => {
            hold();
            clock.toggle();
          }}
        >
          {playing ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.2v9.6L13 8z" fill="currentColor" />
            </svg>
          )}
        </button>
        <ol className="hgv-steps">
          {STEPS.map((st, k) => (
            <li key={st.id}>
              <button
                type="button"
                className={k < step ? "hgv-step is-past" : k === step ? "hgv-step is-now" : "hgv-step"}
                aria-label={label(k)}
                aria-current={k === step ? "step" : undefined}
                onClick={() => {
                  hold();
                  clock.go(k);
                }}
              >
                <span className="hgv-step__bar" aria-hidden="true">
                  <span
                    key={k === step ? fillKey : "rest"}
                    className="hgv-step__fill"
                    style={
                      k === step && playing && motion
                        ? ({
                            animationDuration: `${STEP_END[k] + 1 - st.at}ms`,
                            animationDelay: `${-fillFrom.current.delay}ms`,
                          } as CSSProperties)
                        : { transform: `scaleX(${k < step || (k === step && t >= STEP_END[k]) ? 1 : k === step ? (t - st.at) / (STEP_END[k] + 1 - st.at) : 0})` }
                    }
                    data-run={k === step && playing && motion ? "" : undefined}
                  />
                </span>
                <span className="hgv-step__label" aria-hidden="true">
                  {st.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Row({ k, label, value, state }: { k: CheckKey; label: string; value: string; state: RowState }) {
  return (
    <li className={`hgv-row is-${state}`} data-check={k}>
      <span className="hgv-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6.5 12.5l3.6 3.6 7.4-8" />
        </svg>
      </span>
      <span className="hgv-row__k">{label}</span>
      {/* The value shows once its check passes; until then the row holds its line (no jump). */}
      <span className="hgv-row__v">{state === "ok" ? value : " "}</span>
    </li>
  );
}

function Verdict() {
  return (
    <p className="hgv-verdict" role="status">
      <span className="hgv-ic hgv-ic--big" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6.5 12.5l3.6 3.6 7.4-8" />
        </svg>
      </span>
      Good to go
    </p>
  );
}
