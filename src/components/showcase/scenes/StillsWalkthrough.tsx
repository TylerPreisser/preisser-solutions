"use client";

/**
 * A product clicked through like a screen recording, from captured stills (design-spec-r2 §6.2,
 * §6.3): Duffer's Command Center and NWKS's Admin. Each still is the real screen; a drawn cursor
 * travels to what matters and clicks, stills crossfade, and two small coded overlays carry the
 * moments a still cannot (a new feed row lighting up, one man dragged to another cabin).
 *
 * Fluid: it fills the window's portal box. Each cue frames the part that matters (`cam`, in the still's
 * css px) and walkFrame.ts turns that into a scale and offset: the whole `cam` shows, the stage edge passes
 * through no word, and the picture covers the stage (a card the size of what the still can fill when the
 * stage is taller or wider than that). A new framing crossfades like a new still; nothing pans or zooms in
 * motion. Phone: a product with no narrow layout (`phoneUsesDesk`) shows a close window onto the desk still
 * (`phoneCam`), and a step that spans more of the screen than one window holds pans window to window.
 * The film ends on a replay control.
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
import { frameView, type Box, type Frame } from "./walkFrame";
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
  const [ended, setEnded] = useState(false);
  const t0 = useRef(0);
  const offset = useRef(0);
  const [seq, setSeq] = useState(0);

  useEffect(() => {
    if (!active) {
      setCue(ssrCue);
      setPaused(false);
      setEnded(false);
      return;
    }
    setEnded(false);
    setStarted(true);
    offset.current = 0;
    t0.current = performance.now();
    setCue(0);
    setSeq((s) => s + 1);
  }, [active, ssrCue]);

  useEffect(() => {
    if (!active || paused || ended) return;
    const now = offset.current + (performance.now() - t0.current);
    const next = data.cues.find((c) => c.at > now);
    // No cue left: the film rests on its last one until totalMs, then it is over.
    const id = window.setTimeout(
      () => (next ? setCue(cueAt(data.cues, offset.current + (performance.now() - t0.current))) : setEnded(true)),
      next ? next.at - now + 4 : Math.max(0, data.totalMs - now),
    );
    return () => window.clearTimeout(id);
  }, [active, paused, ended, cue, seq, data.cues, data.totalMs]);

  const jump = (i: number) => {
    offset.current = data.cues[i].at;
    t0.current = performance.now();
    setCue(i);
    setPaused(true);
    setEnded(false);
  };
  const replay = () => {
    offset.current = 0;
    t0.current = performance.now();
    setCue(0);
    setSeq((n) => n + 1);
    setPaused(false);
    setEnded(false);
  };
  const toggle = () => {
    if (ended) replay();
    else if (paused) {
      offset.current = data.cues[cue].at;
      t0.current = performance.now();
      setPaused(false);
    } else setPaused(true);
  };
  // Reduced motion still steps through the stills on their cues; it just never animates.
  return { cue: active ? cue : ssrCue, started, paused, ended, firstPlay: seq <= 1, jump, toggle, reduced };
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
const camKey = (cam: Rect | null) => (cam ? `${cam.x},${cam.y},${cam.w},${cam.h}${cam.grow === undefined ? "" : `+${cam.grow}`}` : "-");
const viewKey = (still: number, cam: Rect | null) => `${still}:${camKey(cam)}`;

/** The stage's content box in px, once it is laid out (null before: the plain fitted layout). */
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

/** The word boxes of each still (its `.words.json`), fetched once the tab plays: the framing keeps the stage edge out of words. */
function useWordBoxes(stills: readonly Still[], srcs: readonly string[], enabled: boolean) {
  const [boxes, setBoxes] = useState<ReadonlyMap<string, readonly Box[]> | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    const want = [...new Set(srcs)];
    Promise.all(
      want.map((src) =>
        fetch(src.replace(/\.webp$/, ".words.json"))
          .then((r) => (r.ok ? r.json() : null))
          .then((j) => [src, (j?.boxes ?? []) as Box[]] as const)
          .catch(() => [src, [] as Box[]] as const),
      ),
    ).then((all) => live && setBoxes(new Map(all)));
    return () => {
      live = false;
    };
  }, [enabled, srcs, stills]);
  return boxes;
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
  const { ref: stageRef, box } = useBox();
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
  // Framing needs the stage's size and the words' boxes; until both are in, the plain fitted layout (and, once
  // the stage is measured, the screen waits invisibly for the boxes so the first view does not jump).
  const srcs = useMemo(() => data.stills.map((st) => pic(st).src), [data.stills, phone]); // eslint-disable-line react-hooks/exhaustive-deps
  const boxes = useWordBoxes(data.stills, srcs, active && framed);
  const framing = framed && box && boxes ? boxes : null;
  const cache = useMemo(() => new Map<string, Frame>(), [box?.w, box?.h, boxes]); // eslint-disable-line react-hooks/exhaustive-deps
  const frameOf = (still: number, cam: Rect | null): Frame | null => {
    if (!framing || !box) return null;
    const p = pic(data.stills[still]);
    const k = `${p.src}|${camKey(cam)}`;
    let f = cache.get(k);
    if (!f) {
      f = frameView(p.width, p.height, cam, box.w, box.h, framing.get(p.src) ?? []);
      cache.set(k, f);
    }
    return f;
  };
  const frame = (still: number, cam: Rect | null): CSSProperties | undefined => {
    const f = frameOf(still, cam);
    if (!f) return undefined;
    const p = pic(data.stills[still]);
    return { width: `${p.width}px`, height: `${p.height}px`, transform: `translate(${(-f.x0 * f.s).toFixed(2)}px, ${(-f.y0 * f.s).toFixed(2)}px) scale(${f.s.toFixed(4)})` };
  };
  const curFrame = frameOf(cur, curCam);
  const focus = curCam ?? { x: 0, y: 0, w: pic(data.stills[cur]).width, h: pic(data.stills[cur]).height };
  const cursor = motion ? cursorAt(data.cues, clock.cue, phone && !data.phoneUsesDesk) : null;
  // The tab opens on its no-script picture and goes straight to the film's first view: no crossfade from the one to the other.
  const fade = reduced || (clock.firstPlay && clock.cue === 0) ? 0 : cue.fadeMs ?? 280;
  const hold = () => onHold?.();

  // The firstStep of each step: where a dot jumps to.
  const firstOfStep = data.steps.map((_, s) => data.cues.findIndex((c) => c.step === s));

  return (
    <div
      className={`stw stw--${variant}${motion ? "" : " is-still"}`}
      data-scene={scene}
      data-step={step + 1}
      data-still={data.stills[cur].id}
      data-focus={framed ? `${focus.x},${focus.y},${focus.w},${focus.h}` : undefined}
      data-framing={framed && box && !boxes ? "waiting" : undefined}
      style={{ "--stw-fade": `${fade}ms` } as CSSProperties}>
      <div className="stw-stage" ref={stageRef}>
        {/* A window shorter than the stage is a card; the rest of the stage is a soft blur of the same picture, not a bar. */}
        {curFrame ? (
          <div className="stw-amb" aria-hidden="true">
            {[...new Set(mounted.map((k) => (views.get(k) ?? { still: cur }).still))].map((st) => (
              // eslint-disable-next-line @next/next/no-img-element -- the still itself, blurred behind the card
              <img key={st} src={pic(data.stills[st]).src} alt="" decoding="async" data-on={st === cur || undefined} draggable={false} />
            ))}
          </div>
        ) : null}
        <div className={`stw-screen${framed ? " stw-screen--framed" : ""}`} style={curFrame ? { width: `${curFrame.cardW}px`, height: `${curFrame.cardH}px` } : undefined}>
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
            aria-label={clock.ended ? "Replay" : clock.paused ? "Play" : "Pause"}
            onClick={() => {
              clock.toggle();
              hold();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {clock.ended ? (
                <path d="M8 2.2a5.8 5.8 0 1 0 5.4 3.7l-1.7.7A4 4 0 1 1 8 4v2.2l3.4-3.1L8 0z" fill="currentColor" />
              ) : clock.paused ? (
                <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
              ) : (
                <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" />
              )}
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
