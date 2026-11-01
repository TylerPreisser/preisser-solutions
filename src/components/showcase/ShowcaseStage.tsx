"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Rect, Showcase } from "@/data/showcase";
import { DufferCommandCenter } from "@/components/case-study/DemoStage/scenes/duffer-golf/DufferCommandCenter";
import { HaysCommandCenter } from "@/components/case-study/DemoStage/scenes/hays-academy/HaysCommandCenter";
import "./showcase.css";

/**
 * One product, two slides: their public website (a capture, ADR-0020) and the
 * command center we built them (a recreation on invented data, ADR-0016 §5-6).
 * Shared by the home window, the phone sheet and the /showcase pages.
 *
 * Website: the capture's scroll and the spotlight are percentages of the
 * capture's own size, so the same numbers hold at every frame width.
 * Command center: laid out at its native size (1280 x 800 or 390 x 600) in
 * whole pixels, then scaled as ONE picture by a camera transform. Font sizes
 * are never scaled one by one through container units: that is what made
 * Chromium space glyphs apart in round 1 (critique A2).
 */
export type StageVariant = "desk" | "phone";

const COMMAND = {
  "duffer-golf": DufferCommandCenter,
  "hays-academy": HaysCommandCenter,
} as const;

/** Native size of each command-center picture; also the view ratio of both frames. */
export const NATIVE: Record<StageVariant, { w: number; h: number }> = {
  desk: { w: 1280, h: 800 },
  phone: { w: 390, h: 600 },
};
export const VIEW_RATIO: Record<StageVariant, number> = { desk: 800 / 1280, phone: 600 / 390 };

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

/** Live width and height of an element (0 x 0 until measured). */
function useBox(ref: React.RefObject<HTMLElement | null>, on = true) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !on) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, on]);
  return box;
}

/** On an axis: center a picture smaller than the view, else keep it covering the view. */
function clampAxis(t: number, view: number, size: number) {
  return size <= view ? (view - size) / 2 : Math.min(0, Math.max(view - size, t));
}

function Chrome({ label, when, badge }: { label?: string; when?: string; badge?: boolean }) {
  return (
    <div className="sc-frame__chrome" aria-hidden="true">
      <span className="sc-frame__dots">
        <i />
        <i />
        <i />
      </span>
      {label ? <span className="sc-frame__url">{label}</span> : <span className="sc-frame__fill" />}
      {when ? <span className="sc-frame__when">{when}</span> : null}
      {badge ? (
        <span className="sc-frame__label" data-demo-label>
          Demonstration data
        </span>
      ) : null}
    </div>
  );
}

export function WebsiteFrame({
  show,
  variant,
  y,
  focus,
  panMs = 760,
  lazy = true,
  fill = false,
}: {
  show: Showcase;
  variant: StageVariant;
  y: number;
  focus?: Rect | null;
  /** Duration of the move to `y`; 0 cuts. */
  panMs?: number;
  lazy?: boolean;
  /** Take the height the parent gives (the phone sheet) instead of a fixed ratio. */
  fill?: boolean;
}) {
  const cap = show.site[variant];
  const viewRef = useRef<HTMLDivElement>(null);
  const box = useBox(viewRef, fill);
  const ratio = fill && box.w > 0 ? box.h / box.w : VIEW_RATIO[variant];
  const top = Math.max(0, Math.min(y, cap.height - cap.width * ratio));

  // The spotlight never arrives before the page does (critique A7): when the
  // target moves it fades out, the page pans, then the new one fades in.
  const key = focus ? focus.join(",") : "";
  const [shown, setShown] = useState<{ focus: Rect | null; on: boolean }>(() => ({ focus: focus ?? null, on: Boolean(focus) }));
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const cut = reducedMotion() || panMs === 0;
    if (cut) {
      setShown({ focus: focus ?? null, on: Boolean(focus) });
      return;
    }
    setShown((s) => ({ ...s, on: false }));
    const t = window.setTimeout(() => setShown({ focus: focus ?? null, on: Boolean(focus) }), panMs + 120);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, top]);

  const pageStyle = {
    transform: `translateY(-${(top / cap.height) * 100}%)`,
    "--sc-pan-ms": `${panMs}ms`,
  } as CSSProperties;
  const f = shown.focus;
  return (
    <figure className={`sc-frame sc-frame--web sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}>
      <Chrome label={show.liveLabel} when={variant === "desk" ? show.site.captured : undefined} />
      <div className="sc-frame__view" ref={viewRef} style={fill ? undefined : { aspectRatio: `1 / ${VIEW_RATIO[variant]}` }}>
        <div className={shown.on && f ? "sc-frame__page is-spot" : "sc-frame__page"} style={pageStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="sc-frame__shot"
            src={cap.src}
            width={cap.width}
            height={cap.height}
            alt={`The ${show.liveLabel} home page, as we built it.`}
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
            draggable={false}
          />
          {f ? (
            // The focused part at full colour over the muted page, with a soft glow edge.
            <span
              className={shown.on ? "sc-focus is-on" : "sc-focus"}
              aria-hidden="true"
              style={{ left: pct(f[0], cap.width), top: pct(f[1], cap.height), width: pct(f[2], cap.width), height: pct(f[3], cap.height) }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cap.src}
                alt=""
                draggable={false}
                style={{ width: pct(cap.width, f[2]), left: `-${(f[0] / f[2]) * 100}%`, top: `-${(f[1] / f[3]) * 100}%` }}
              />
            </span>
          ) : null}
        </div>
      </div>
    </figure>
  );
}

type Camera = { s: number; tx: number; ty: number };

/** The command center, as a labeled Proof Stage the privacy probe can read. */
export function CommandFrame({
  show,
  variant,
  focus,
  zoom,
  zoomAfterMs = 0,
  live,
  quiet,
  fill = false,
}: {
  show: Showcase;
  variant: StageVariant;
  fill?: boolean;
  /** A [data-focus] part to edge with a soft glow. */
  focus?: string | null;
  /** A [data-focus] part the camera moves in on while `live`. */
  zoom?: string | null;
  /** The overview beat: how long the whole screen holds before the camera moves in. */
  zoomAfterMs?: number;
  live?: boolean;
  /** A repeat of a stage already announced on this page: hide it from assistive tech. */
  quiet?: boolean;
}) {
  const Command = COMMAND[show.slug];
  const native = NATIVE[variant];
  const viewRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const [cam, setCam] = useState<Camera | null>(null);
  const [ring, setRing] = useState<{ l: number; t: number; w: number; h: number } | null>(null);
  const [armed, setArmed] = useState(false);

  // Fit: one scale for the whole picture, from the frame's width. Before the
  // first measure (server render, no JS) a typical frame size stands in.
  const box = useBox(viewRef);
  const vw = box.w || (variant === "phone" ? 330 : 700);
  const vh = box.h || vw * VIEW_RATIO[variant];
  const k = vw / native.w;
  const rest: Camera = { s: k, tx: clampAxis(0, vw, native.w * k), ty: clampAxis(0, vh, native.h * k) };

  // Where a [data-focus] part sits, in the picture's own (native) pixels.
  const partRect = (name: string) => {
    const fitEl = fitRef.current;
    const el = fitEl?.querySelector<HTMLElement>(`[data-focus="${name}"]`);
    if (!fitEl || !el) return null;
    const a = fitEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const s = a.width / native.w;
    if (!s) return null;
    return { x: (r.left - a.left) / s, y: (r.top - a.top) / s, w: r.width / s, h: r.height / s };
  };

  const target = live ? (zoom ?? null) : null;
  useEffect(() => {
    if (!target) {
      setArmed(false);
      setCam(null);
      return;
    }
    const t = window.setTimeout(() => setArmed(true), reducedMotion() ? 0 : zoomAfterMs);
    return () => window.clearTimeout(t);
  }, [target, zoomAfterMs]);

  // The camera: frame the part with a margin, never past the picture's edges.
  useLayoutEffect(() => {
    if (!armed || !target) return;
    const r = partRect(target);
    if (!r) return;
    const pad = variant === "phone" ? 12 : 24;
    const s = Math.max(k, Math.min(vw / (r.w + pad * 2), vh / (r.h + pad * 2), k * 2.2));
    const tx = clampAxis(vw / 2 - (r.x + r.w / 2) * s, vw, native.w * s);
    // A part taller than the view is framed from its top, where its newest line is.
    const ty = clampAxis(r.h * s + pad * 2 > vh ? pad - r.y * s : vh / 2 - (r.y + r.h / 2) * s, vh, native.h * s);
    setCam({ s, tx, ty });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, target, vw, vh]);

  // The glow sits on the focus part wherever the camera put it.
  const c = cam ?? rest;
  useLayoutEffect(() => {
    if (!focus) return setRing(null);
    const r = partRect(focus);
    if (!r) return setRing(null);
    const pad = 5;
    setRing({ l: r.x * c.s + c.tx - pad, t: r.y * c.s + c.ty - pad, w: r.w * c.s + pad * 2, h: r.h * c.s + pad * 2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, c.s, c.tx, c.ty]);

  // A cropped phone picture never shows half a row (critique r2, A-r2-1).
  // Once the camera has settled, any row the view's top or bottom edge would
  // slice is clipped off, and the strip shows the app's own background, so the
  // crop reads as padding. A "row" is the outermost block shorter than half the
  // visible height (list items, labels, bars), found by walking down from the
  // picture's root. Phone frames that crop (the sheet) only.
  // The clip moves with the camera (same 900ms curve), so it is never cut mid-move either.
  const [crop, setCrop] = useState<{ t: number; b: number; bgT: string; bgB: string } | null>(null);
  useLayoutEffect(() => {
    const fitEl = fitRef.current;
    if (!fill || !fitEl || !box.h) return setCrop(null);
    const a = fitEl.getBoundingClientRect();
    const now = a.height / native.h;
    if (!now) return;
    const y0 = -c.ty / c.s;
    const y1 = (vh - c.ty) / c.s;
    const limit = (y1 - y0) * 0.5;
    // The strip takes the colour of the screen behind the row (a full-width
    // ancestor), not of the card the row sits in.
    const bgOf = (el: Element | null) => {
      for (let e = el; e && e !== fitEl; e = e.parentElement) {
        if (e.getBoundingClientRect().width / now < native.w - 2) continue;
        const bg = getComputedStyle(e).backgroundColor;
        if (bg && bg !== "transparent" && !bg.endsWith(", 0)")) return bg;
      }
      return "#fff";
    };
    let t = y0;
    let b = y1;
    let bgT = "#fff";
    let bgB = "#fff";
    const walk = (el: Element) => {
      const r = el.getBoundingClientRect();
      const top = (r.top - a.top) / now;
      const bottom = (r.bottom - a.top) / now;
      if (r.height === 0 || bottom <= y0 || top >= y1) return;
      if (bottom - top > limit) {
        for (const ch of el.children) walk(ch);
        return;
      }
      // 1px past the row's edge, so not even its border line is left behind.
      if (top < y0 - 0.5 && bottom > y0 + 0.5 && bottom + 1 > t) {
        t = bottom + 1;
        bgT = bgOf(el.parentElement);
      }
      if (top < y1 - 0.5 && bottom > y1 + 0.5 && top - 1 < b) {
        b = top - 1;
        bgB = bgOf(el.parentElement);
      }
    };
    for (const ch of fitEl.children) walk(ch);
    setCrop(t > y0 + 0.5 || b < y1 - 0.5 ? { t: Math.max(0, t), b: Math.min(native.h, b), bgT, bgB } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill, c.s, c.tx, c.ty, vh, box.h]);
  const clip = fill ? (crop ? `inset(${crop.t}px 0 ${native.h - crop.b}px 0)` : "inset(0px 0 0px 0)") : undefined;

  // The live event lands just after the camera does.
  const liveAt = zoom ? (reducedMotion() ? 0 : zoomAfterMs) + 1000 : 900;
  return (
    <figure
      className={`sc-frame sc-frame--cmd sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}
      data-demo-stage={`${show.slug}-command-center`}
      data-live={live ? "" : undefined}
      aria-hidden={quiet || undefined}
      style={{ "--dg-live-at": `${liveAt}ms` } as CSSProperties}
    >
      <Chrome label={variant === "desk" ? show.commandName : undefined} badge />
      <p className="ps-visually-hidden" data-demo-narration>
        {show.narration}
      </p>
      <div
        className="sc-frame__cmd"
        ref={viewRef}
        style={
          fill
            ? crop
              ? { background: `linear-gradient(${crop.bgT} 50%, ${crop.bgB} 50%)` }
              : undefined
            : { aspectRatio: `${native.w} / ${native.h}` }
        }
      >
        <div
          ref={fitRef}
          className="sc-frame__fit"
          style={{ width: native.w, height: native.h, transform: `translate(${c.tx}px, ${c.ty}px) scale(${c.s})`, clipPath: clip }}
        >
          <Command layout={variant} />
        </div>
        {ring ? <span className="sc-ring" aria-hidden="true" style={{ left: ring.l, top: ring.t, width: ring.w, height: ring.h }} /> : null}
      </div>
    </figure>
  );
}

/**
 * Both slides, layered. Moving to the command center is a depth move: the
 * website recedes (smaller, softer, darker) while the command center slides in
 * over it. `slide` 0 is the website, 1 the command center.
 */
export function ShowcaseStage({
  show,
  variant,
  slide,
  web,
  cmd,
  live,
  slideMs = 720,
  fill = false,
}: {
  show: Showcase;
  variant: StageVariant;
  fill?: boolean;
  slide: 0 | 1;
  web: { y: number; focus?: Rect | null; panMs?: number; lazy?: boolean };
  cmd?: { focus?: string | null; zoom?: string | null; zoomAfterMs?: number };
  live?: boolean;
  slideMs?: number;
}) {
  return (
    <div className={fill ? "sc-stage sc-stage--fill" : "sc-stage"} data-slide={slide} style={{ "--sc-slide-ms": `${slideMs}ms` } as CSSProperties}>
      <div className="sc-stage__slide sc-stage__slide--web" aria-hidden={slide !== 0 || undefined} inert={slide !== 0 || undefined}>
        <WebsiteFrame show={show} variant={variant} y={web.y} focus={web.focus} panMs={web.panMs} lazy={web.lazy} fill={fill} />
      </div>
      <div className="sc-stage__slide sc-stage__slide--cmd" aria-hidden={slide !== 1 || undefined} inert={slide !== 1 || undefined}>
        <CommandFrame
          show={show}
          variant={variant}
          focus={cmd?.focus}
          zoom={cmd?.zoom}
          zoomAfterMs={cmd?.zoomAfterMs}
          live={live && slide === 1}
          fill={fill}
        />
      </div>
    </div>
  );
}
