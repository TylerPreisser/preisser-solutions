"use client";

/**
 * A product clicked through like a screen recording, from captured stills (design-spec-r2 §6.2,
 * §6.3): Duffer's Command Center and NWKS's Admin. Each still is the real screen; a drawn cursor
 * travels to what matters and clicks, stills crossfade, and two small coded overlays carry the
 * moments a still cannot (a new feed row lighting up, one man dragged to another cabin).
 *
 * Fluid: it fills the window's portal box. The screen fills the stage and each cue frames the part
 * that matters (`cam`, in the still's css px): zoomed so that box shows whole, never below cover.
 * A new framing crossfades like a new still; nothing pans or zooms in motion. Phone shows the
 * product's own narrow crop at the sheet's width, or, for a product with no narrow layout
 * (`phoneUsesDesk`), a portrait window onto the desk still (`phoneCam`).
 *
 * No script / reduced motion: `ssrStill` and its step, no cursor, no overlay; stills still change
 * on their cues under reduced motion, without fades or travel. Only the shown still is in the first
 * HTML; the rest mount when the tab first plays.
 *
 * Every still has a words manifest beside it that the privacy probe reads (spec §7.2 #18).
 */
import { useEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties } from "react";
import type { CursorTarget, Still } from "@/data/showcase/types";
import type { Rect, WalkCue, WalkData } from "@/data/showcase/scenes/duffer-cc";
import type { FluidSceneProps } from "./HgCoiScene";
import "./stills.css";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** The cue in force at t: the last one that has started. */
function cueAt(cues: readonly WalkCue[], t: number) {
  let i = 0;
  for (let k = 0; k < cues.length; k++) if (cues[k].at <= t) i = k;
  return i;
}

/** The step clock: restarts from 0 each time the tab is shown; wakes only at cue boundaries. */
function useWalkClock(active: boolean, reduced: boolean, data: WalkData) {
  const ssrCue = Math.max(0, data.cues.findIndex((c) => c.still === data.ssrStill));
  const [cue, setCue] = useState(ssrCue);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const t0 = useRef(0);
  const offset = useRef(0);
  const [seq, setSeq] = useState(0);

  useEffect(() => {
    if (!active) {
      setCue(ssrCue);
      setPaused(false);
      return;
    }
    setStarted(true);
    offset.current = 0;
    t0.current = performance.now();
    setCue(0);
    setSeq((s) => s + 1);
  }, [active, ssrCue]);

  useEffect(() => {
    if (!active || paused) return;
    const now = offset.current + (performance.now() - t0.current);
    const next = data.cues.find((c) => c.at > now);
    if (!next) return;
    const id = window.setTimeout(() => setCue(cueAt(data.cues, offset.current + (performance.now() - t0.current))), next.at - now + 4);
    return () => window.clearTimeout(id);
  }, [active, paused, cue, seq, data.cues]);

  const jump = (i: number) => {
    offset.current = data.cues[i].at;
    t0.current = performance.now();
    setCue(i);
    setPaused(true);
  };
  const toggle = () => {
    if (paused) {
      offset.current = data.cues[cue].at;
      t0.current = performance.now();
      setPaused(false);
    } else setPaused(true);
  };
  // Reduced motion still steps through the stills on their cues; it just never animates.
  return { cue: active ? cue : ssrCue, started, paused, jump, toggle, reduced };
}

/** The framing in force at cue i: its own, else the last one set on the same still. */
function camAt(cues: readonly WalkCue[], i: number, phone: boolean): Rect | null {
  for (let k = i; k >= 0 && cues[k].still === cues[i].still; k--) {
    const c = phone ? cues[k].phoneCam : cues[k].cam;
    if (c) return c;
  }
  return null;
}

/** One view = one still under one framing. */
const viewKey = (still: number, cam: Rect | null) => `${still}:${cam ? `${cam.x},${cam.y},${cam.w},${cam.h}` : "-"}`;

/** Screen px per still css px, and the offset, that show `cam` whole within an sw x sh screen. */
function frameFor(W: number, H: number, cam: Rect | null, sw: number, sh: number) {
  const cover = Math.max(sw / W, sh / H);
  const s = cam ? Math.max(cover, Math.min(sw / cam.w, sh / cam.h)) : cover;
  const clamp = (v: number, lo: number) => Math.min(0, Math.max(lo, v));
  const ox = cam ? clamp(sw / 2 - s * (cam.x + cam.w / 2), sw - s * W) : 0;
  const oy = cam ? clamp(sh / 2 - s * (cam.y + cam.h / 2), sh - s * H) : 0;
  return { width: `${W}px`, height: `${H}px`, transform: `translate(${ox.toFixed(1)}px, ${oy.toFixed(1)}px) scale(${s.toFixed(4)})` };
}

/** The screen's size in px, once it is laid out (null before: the plain fitted layout). */
function useBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      const r = e.contentRect;
      if (r.width > 0 && r.height > 0) setBox((b) => (b && Math.abs(b.w - r.width) < 0.5 && Math.abs(b.h - r.height) < 0.5 ? b : { w: r.width, h: r.height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, box };
}

/** The cursor position in force at cue i: the last cue that set one (cursor stays where it was). */
function cursorAt(cues: readonly WalkCue[], i: number, phone: boolean): { c: CursorTarget; from: number } | null {
  for (let k = i; k >= 0; k--) {
    const c = phone ? cues[k].phoneCursor : cues[k].cursor;
    if (c) return { c, from: k };
    if (phone && cues[k].cursor) return null;
  }
  return null;
}

export function StillsWalkthrough({ data, variant, active, reduced, onCaption, onHold, scene }: FluidSceneProps & { data: WalkData; scene: string }) {
  const phone = variant === "phone";
  // Which picture the sheet shows: the phone crop, or (no narrow layout) the desk still framed.
  const pic = (st: Still) => (phone && !data.phoneUsesDesk ? st.phone : st.desk);
  const framed = !phone || Boolean(data.phoneUsesDesk);
  const { ref: screenRef, box } = useBox();
  const clock = useWalkClock(active, reduced, data);
  const cue = data.cues[clock.cue];
  const cur = cue.still;
  const step = cue.step;
  const motion = active && !reduced;

  const report = useRef(onCaption);
  report.current = onCaption;
  const listening = Boolean(onCaption);
  useEffect(() => {
    if (listening) report.current?.(data.captions[step]);
  }, [step, listening, data.captions]);

  // Views (a still under a framing) mount once the tab first plays; before that only the shown one is in the page.
  const camOf = (i: number) => (framed ? camAt(data.cues, i, phone) : null);
  const views = useMemo(() => {
    const seen = new Map<string, { still: number; cam: Rect | null }>();
    data.cues.forEach((c, i) => {
      const cam = framed ? camAt(data.cues, i, phone) : null;
      const k = viewKey(c.still, cam);
      if (!seen.has(k)) seen.set(k, { still: c.still, cam });
    });
    return seen;
  }, [data.cues, framed, phone]);
  const curCam = camOf(clock.cue);
  const curKey = viewKey(cur, curCam);
  const mounted = clock.started ? [...views.keys()] : [curKey];
  const frame = (still: number, cam: Rect | null): CSSProperties | undefined => {
    if (!framed || !box) return undefined;
    const p = pic(data.stills[still]);
    return frameFor(p.width, p.height, cam, box.w, box.h);
  };
  const cursor = motion ? cursorAt(data.cues, clock.cue, phone && !data.phoneUsesDesk) : null;
  const fade = reduced ? 0 : cue.fadeMs ?? 280;
  const hold = () => onHold?.();

  // The firstStep of each step: where a dot jumps to.
  const firstOfStep = data.steps.map((_, s) => data.cues.findIndex((c) => c.step === s));

  return (
    <div className={`stw stw--${variant}${motion ? "" : " is-still"}`} data-scene={scene} data-step={step + 1} data-still={data.stills[cur].id} style={{ "--stw-fade": `${fade}ms` } as CSSProperties}>
      <div className="stw-stage">
        <div ref={screenRef} className={`stw-screen${framed ? " stw-screen--framed" : ""}`}>
          {mounted.map((k) => {
            const v = views.get(k) ?? { still: cur, cam: curCam };
            return <Shot key={k} still={data.stills[v.still]} pic={pic(data.stills[v.still])} on={k === curKey} frame={frame(v.still, v.cam)} />;
          })}
          {/* One layer framed like the shown view: the cursor lives here so it TRAVELS between targets and stills. */}
          {motion ? (
            <div className="stw-layer" style={{ aspectRatio: `${pic(data.stills[cur]).width} / ${pic(data.stills[cur]).height}`, ...frame(cur, curCam) }}>
              <Overlays data={data} cueIndex={clock.cue} still={cur} phone={phone && !data.phoneUsesDesk} />
              {cursor && data.cues[clock.cue].overlay !== "pin-drag" ? <Cursor c={cursor.c} size={pic(data.stills[cur])} ring={cursor.from} /> : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="stw-foot">
        <div className="stw-dots" role="group" aria-label="Steps">
          {data.steps.map((name, s) => (
            <button
              key={name}
              type="button"
              className="stw-dot"
              aria-current={s === step ? "step" : undefined}
              aria-label={name}
              onClick={() => {
                clock.jump(Math.max(0, firstOfStep[s]));
                hold();
              }}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <span className="stw-step" aria-hidden="true">
          {data.steps[step]}
        </span>
        {active && !reduced ? (
          <button
            type="button"
            className="stw-pause"
            aria-label={clock.paused ? "Play" : "Pause"}
            onClick={() => {
              clock.toggle();
              hold();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {clock.paused ? <path d="M5 3.5v9l7-4.5z" fill="currentColor" /> : <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" />}
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Shot({ still, pic: s, on, frame }: { still: Still; pic: Still["desk"]; on: boolean; frame?: CSSProperties }) {
  return (
    <div className="stw-shot" data-on={on || undefined} aria-hidden={on ? undefined : true} style={{ aspectRatio: `${s.width} / ${s.height}`, ...frame }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed, pre-sized still; next/image is off in this static export */}
      <img src={s.src} width={s.width} height={s.height} alt={on ? still.alt : ""} decoding="async" draggable={false} />
    </div>
  );
}

/** The drawn arrow: travels 520 ms to its target, then a click ring if the cue clicks. */
function Cursor({ c, size: s, ring }: { c: CursorTarget; size: Still["desk"]; ring: number }) {
  return (
    <div className="stw-cursor" style={{ left: pct(c.x, s.width), top: pct(c.y, s.height) }}>
      {c.click ? <span className="stw-ring" key={ring} /> : null}
      <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
        <path d="M3 2l14.5 9.2-6.3 1.3 3.6 6.6-2.6 1.4-3.6-6.6L3.9 18z" fill="#0f172a" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Overlays({ data, cueIndex, still, phone }: { data: WalkData; cueIndex: number; still: number; phone: boolean }) {
  const cue = data.cues[cueIndex];
  const s = phone ? data.stills[still].phone : data.stills[still].desk;
  if (cue.overlay === "feed-row" && data.feedRow && data.feedRow.still === still) {
    const r = phone ? data.feedRow.phone : data.feedRow.desk;
    if (!r) return null;
    return <div className="stw-hl" style={{ left: pct(r.x, s.width), top: pct(r.y, s.height), width: pct(r.w, s.width), height: pct(r.h, s.height) }} />;
  }
  if (cue.overlay === "pin-drag" && data.pinDrag && data.pinDrag.still === still && !phone) return <PinDrag d={data.pinDrag} w={s.width} h={s.height} />;
  return null;
}

/** One initials pin lifted out of Cabin 1 and set into a free bed in Cabin 3 (900 ms), the cursor with it. */
function PinDrag({ d, w, h }: { d: NonNullable<WalkData["pinDrag"]>; w: number; h: number }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setGo(true), 120);
    return () => window.clearTimeout(id);
  }, []);
  const p = go ? d.to : d.from;
  const size = { width: pct(d.from.w, w), height: pct(d.from.h, h) };
  return (
    <>
      {/* The bed the man leaves: covered in its own colour while he is in the hand. */}
      <span className="stw-bed" style={{ left: pct(d.from.x - 1, w), top: pct(d.from.y - 1, h), width: pct(d.from.w + 2, w), height: pct(d.from.h + 2, h), background: d.look.bed }} />
      <span
        className="stw-pin"
        data-go={go || undefined}
        style={{ left: pct(p.x, w), top: pct(p.y, h), ...size, background: d.look.bg, borderColor: d.look.border, color: d.look.color } as CSSProperties}
      >
        {d.initials}
      </span>
      <div className="stw-cursor stw-cursor--drag" style={{ left: pct(p.x + p.w * 0.7, w), top: pct(p.y + p.h * 0.7, h) }}>
        <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
          <path d="M3 2l14.5 9.2-6.3 1.3 3.6 6.6-2.6 1.4-3.6-6.6L3.9 18z" fill="#0f172a" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

/** A scene component for the registry: the walkthrough bound to one client's stills. */
export function stillsScene(data: WalkData, scene: string): ComponentType<FluidSceneProps> {
  function Scene(p: FluidSceneProps) {
    return <StillsWalkthrough {...p} data={data} scene={scene} />;
  }
  Scene.displayName = `StillsWalkthrough(${scene})`;
  return Scene;
}
