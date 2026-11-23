"use client";

/**
 * A product clicked through like a screen recording, from captured stills (design-spec-r2 §6.2,
 * §6.3): Duffer's Command Center and NWKS's Admin. Each still is the real screen; a drawn cursor
 * travels to what matters and clicks, stills crossfade, and two small coded overlays carry the
 * moments a still cannot (a new feed row lighting up, one man dragged to another cabin).
 *
 * Fluid: it fills the window's portal box. On a wide stage each cue frames the part that matters (`cam`, in the
 * still's css px; walkFrame.ts frameView): the whole `cam` shows, the stage edge passes through no word, the
 * picture covers the stage. On a phone, a portrait stage, or one too small for the desk framing to read
 * (walkFrame.ts wantsClose), each cue names the WHOLE unit(s) a stranger must see (`close`) and frameClose
 * finds the window that shows them whole, readable, filling the stage. A new framing on the same still is a
 * camera move (the picture travels and zooms, 700 ms); a new still crossfades. The film ends on a replay control.
 *
 * No script: the film's first cue (its still and step 1), no cursor, no overlay. The tab opens on that same picture
 * with the first dot lit, so the film starts from it and never fades in from another page. Reduced motion steps
 * through the stills on their cues without fades or travel. Only the first still is in the first HTML; the rest
 * mount when the tab first plays.
 *
 * Every still has a words manifest beside it that the privacy probe reads (spec §7.2 #18).
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentType, type CSSProperties } from "react";
import type { CursorTarget, Still } from "@/data/showcase/types";
import type { Rect, WalkCue, WalkData } from "@/data/showcase/scenes/duffer-cc";
import type { FluidSceneProps } from "./HgCoiScene";
import { closeOpts, frameClose, frameView, viewPlan, wantsClose, withLines, CARD, ART, type Box, type Frame, type PlanView } from "./walkFrame";
import "./stills.css";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const noSubscribe = () => () => {};
/** False in the server HTML (and while it hydrates), true in the browser: the no-script picture is never hidden. */
const useInBrowser = () => useSyncExternalStore(noSubscribe, () => true, () => false);

/** The cue in force at t: the last one that has started. */
function cueAt(cues: readonly WalkCue[], t: number) {
  let i = 0;
  for (let k = 0; k < cues.length; k++) if (cues[k].at <= t) i = k;
  return i;
}

/** The step clock: restarts from 0 each time the tab is shown; wakes only at cue boundaries. */
function useWalkClock(active: boolean, reduced: boolean, data: WalkData, ready: boolean) {
  // The resting (no-script) picture IS the film's first cue: the opening can never show another page or dot.
  const ssrCue = 0;
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
  // The film's clock starts when its first view is on the stage (framing it can take a moment on a slow device).
  useEffect(() => {
    if (!active || !ready) return;
    offset.current = 0;
    t0.current = performance.now();
  }, [active, ready]);

  useEffect(() => {
    if (!active || !ready || paused || ended) return;
    const now = offset.current + (performance.now() - t0.current);
    const next = data.cues.find((c) => c.at > now);
    // No cue left: the film rests on its last one until totalMs, then it is over.
    const id = window.setTimeout(
      () => (next ? setCue(cueAt(data.cues, offset.current + (performance.now() - t0.current))) : setEnded(true)),
      next ? next.at - now + 4 : Math.max(0, data.totalMs - now),
    );
    return () => window.clearTimeout(id);
  }, [active, ready, paused, ended, cue, seq, data.cues, data.totalMs]);

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
  return { cue: active ? cue : ssrCue, started, paused, ended, jump, toggle, reduced };
}

/** The stage's content box in px, once it is laid out (null before: the plain fitted layout). */
function useBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  // Measured before the first paint too (a ResizeObserver reports a frame or more later), so the opening picture is
  // laid out from the first frame the tab shows.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const h = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (w > 0 && h > 0) setBox((b) => b ?? { w, h });
  }, []);
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
          .then((j) => [src, [...((j?.boxes ?? []) as Box[]), ...((j?.cards ?? []) as number[][]).map(([x, y, w, h]) => [x, y, w, h, CARD] as const), ...((j?.art ?? []) as number[][]).map(([x, y, w, h]) => [x, y, w, h, ART] as const)] as Box[]] as const)
          .catch(() => [src, [] as Box[]] as const),
      ),
    ).then((all) => live && setBoxes(new Map(all)));
    return () => {
      live = false;
    };
  }, [enabled, srcs, stills]);
  return boxes;
}

/** Each still's bytes, decoded once per page (a failed decode resolves too, so a broken still cannot stop the film). */
const decodes = new Map<string, Promise<void>>();
function decodeStill(src: string): Promise<void> {
  let p = decodes.get(src);
  if (!p) {
    const im = new Image();
    im.decoding = "async";
    im.src = src;
    p = im.decode().catch(() => undefined);
    decodes.set(src, p);
  }
  return p;
}

/**
 * The cue the film shows: the clock's cue once its still is decoded, else the cue it showed before. On a slow
 * connection the next still may not have arrived when its step comes; switching to it would put a blank stage up
 * (the picture is transparent until it paints), so the previous view stays until the still can paint, as
 * HgVendorScene holds its certificate back.
 */
function useDecodedCue(cue: number, started: boolean, srcOf: (i: number) => string, srcs: readonly string[]) {
  const [ready, setReady] = useState<ReadonlySet<string>>(() => new Set());
  useEffect(() => {
    if (!started) return;
    let live = true;
    for (const src of new Set(srcs)) decodeStill(src).then(() => live && setReady((r) => (r.has(src) ? r : new Set(r).add(src))));
    return () => {
      live = false;
    };
  }, [started, srcs]);
  const [shown, setShown] = useState(cue);
  const ok = !started || ready.has(srcOf(cue));
  useEffect(() => {
    if (ok) setShown(cue);
  }, [ok, cue]);
  return ok ? cue : shown;
}

/** The pointer in force at cue i and the cue that set it (the click ring replays per setting cue). */
function cursorAt(cues: readonly WalkCue[], i: number, close: boolean, set: number): { c: CursorTarget; from: number } | null {
  for (let k = i; k >= 0; k--) {
    const cc = close ? cues[k].closeCursor : undefined;
    const c = cc ? (Array.isArray(cc) ? (cc as readonly CursorTarget[])[Math.min(set, cc.length - 1)] : (cc as CursorTarget)) : cues[k].cursor;
    if (c) return { c, from: k };
  }
  return null;
}

const unionOf = (rs: readonly Rect[]) => {
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
};

/** The film as a phone plays it: `phoneSkip` cues left out, the later ones (and the end) sooner. */
function forPhone(data: WalkData): WalkData {
  const k = data.phoneSkip;
  if (!k) return data;
  const span = k.to - k.from;
  const cues = data.cues.filter((c) => c.at < k.from || c.at >= k.to).map((c) => (c.at >= k.to ? { ...c, at: c.at - span } : c));
  return { ...data, cues, totalMs: data.totalMs - span };
}

export function StillsWalkthrough({ data: film, variant, active, reduced, onCaption, onHold, scene }: FluidSceneProps & { data: WalkData; scene: string }) {
  const phone = variant === "phone";
  const data = useMemo(() => (phone ? forPhone(film) : film), [film, phone]);
  // Which picture the sheet shows: the phone crop, or (no narrow layout) the desk still framed.
  const pic = (st: Still) => (phone && !data.phoneUsesDesk ? st.phone : st.desk);
  const framed = !phone || Boolean(data.phoneUsesDesk);
  const { ref: stageRef, box } = useBox();
  // Set once the first framed view is on the stage (or at once where nothing is framed): the clock waits for it.
  const [firstShown, setFirstShown] = useState(false);
  const clock = useWalkClock(active, reduced, data, firstShown);
  const srcs = useMemo(() => data.stills.map((st) => pic(st).src), [data.stills, phone]); // eslint-disable-line react-hooks/exhaustive-deps
  const at = useDecodedCue(clock.cue, clock.started, (i) => srcs[data.cues[i].still], srcs);
  const cue = data.cues[at];
  const cur = cue.still;
  const step = cue.step;
  const motion = active && !reduced;

  const report = useRef(onCaption);
  report.current = onCaption;
  const listening = Boolean(onCaption);
  useEffect(() => {
    if (listening) report.current?.(data.captions[step]);
  }, [step, listening, data.captions]);

  // Close views (whole units) on a phone, a portrait stage, or one too small for the desk framing to read.
  const close = framed && (box ? wantsClose(phone, box.w, box.h) : phone);
  const plan = useMemo(() => viewPlan(data.cues, close), [data.cues, close]);
  const curKey = plan.keys[at];
  // Stills mount once the tab first plays; before that only the shown one is in the page.
  const mounted = clock.started ? [...new Set(data.cues.map((c) => c.still))] : [cur];
  // Framing needs the stage's size and the words' boxes; until both are in, the plain fitted layout (and, once
  // the stage is measured, the screen waits invisibly for the boxes so the first view does not jump).
  const boxes = useWordBoxes(data.stills, srcs, active && framed);
  // The framing search blocks the page while it runs (up to ~1 s for a first close view on a slow device): it starts
  // only once the opening picture (preRoll, below) has painted, its still decoded, so what stays on the stage meanwhile
  // is that picture and not an empty card.
  const [canFrame, setCanFrame] = useState(false);
  const firstSrc = srcs[data.cues[0].still];
  useEffect(() => {
    if (!box || !active || canFrame) return;
    let live = true;
    let id = 0;
    decodeStill(firstSrc).then(() => {
      if (!live) return;
      id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => live && setCanFrame(true));
      });
    });
    return () => {
      live = false;
      cancelAnimationFrame(id);
    };
  }, [Boolean(box), active, canFrame, firstSrc]); // eslint-disable-line react-hooks/exhaustive-deps
  const framing = framed && box && boxes && canFrame ? boxes : null;
  const inBrowser = useInBrowser();
  const cache = useMemo(() => new Map<string, Frame & { set?: number }>(), [box?.w, box?.h, boxes, close]); // eslint-disable-line react-hooks/exhaustive-deps
  const frameOf = (key: string): (Frame & { set?: number }) | null => {
    const v: PlanView | undefined = plan.views.get(key);
    if (!framing || !box || !v) return null;
    let f = cache.get(key);
    if (!f) {
      const st = data.stills[v.still];
      const p = pic(st);
      // The still's word boxes, and its form controls whose text the capture did not record (each one word).
      const all: Box[] = [...(framing.get(p.src) ?? []), ...(data.solids?.[st.id] ?? []).map((r) => [r.x, r.y, r.w, r.h, "[control]"] as const)];
      f = close && v.framed ? frameClose(p.width, p.height, v.framed, box.w, box.h, withLines(all), closeOpts(phone, box.w, box.h)) : frameView(p.width, p.height, v.cam, box.w, box.h, all.filter((b) => b[4] !== CARD && b[4] !== ART));
      cache.set(key, f);
    }
    return f;
  };
  const style = (still: number, f: Frame | null): CSSProperties | undefined => {
    if (!f) return undefined;
    const p = pic(data.stills[still]);
    return { width: `${p.width}px`, height: `${p.height}px`, transform: `translate(${(-f.x0 * f.s).toFixed(2)}px, ${(-f.y0 * f.s).toFixed(2)}px) scale(${f.s.toFixed(4)})` };
  };
  // Only the shown view (and the one fading out) is framed, when it is shown: the opening view never waits on the
  // framing of every later still (each search can take a few hundred ms), and none runs under a moving pointer.
  // Each still sits at its own view while it is shown, and waits (invisible) at the view it will open on next, so a
  // new still fades in already framed and only a new framing of the shown still moves.
  const prev = at > 0 ? data.cues[at - 1].still : -1;
  const keyFor = (still: number) => {
    if (still === cur) return curKey;
    // The still that just faded out keeps its framing while it fades.
    if (still === prev) for (let k = at; k >= 0; k--) if (data.cues[k].still === still) return plan.keys[k];
    for (let k = at + 1; k < data.cues.length; k++) if (data.cues[k].still === still) return plan.keys[k];
    for (let k = at; k >= 0; k--) if (data.cues[k].still === still) return plan.keys[k];
    return plan.keys[data.cues.findIndex((c) => c.still === still)];
  };
  const curView = plan.views.get(curKey);
  const realFrame = frameOf(curKey);
  useEffect(() => {
    setFirstShown(active && (!framed || Boolean(realFrame)));
  }, [active, framed, Boolean(realFrame)]); // eslint-disable-line react-hooks/exhaustive-deps
  // Until the first view is framed (its word boxes loading, its search running), the card already shows the first
  // still: the page's whole height, centred on what the view will show (its smallest unit set, which every larger one
  // holds). The camera then pushes in to the framed view. Never an empty stage, never another page, no dissolve.
  const waiting = framed && inBrowser && !realFrame;
  const preRoll = ((): Frame | null => {
    if (!waiting || !box) return null;
    const p = pic(data.stills[cur]);
    const u = close && curView?.sets ? unionOf(curView.sets[curView.sets.length - 1]) : curView?.cam ?? { x: 0, y: 0, w: p.width, h: p.height };
    const s = Math.max(box.w / p.width, box.h / p.height);
    const vw = box.w / s;
    const vh = box.h / s;
    const x0 = Math.min(Math.max(0, u.x + u.w / 2 - vw / 2), p.width - vw);
    const y0 = Math.min(Math.max(0, u.y + u.h / 2 - vh / 2), p.height - vh);
    return { s, x0, y0, cardW: box.w, cardH: box.h, cuts: 0 };
  })();
  const curFrame: (Frame & { set?: number }) | null = realFrame ?? preRoll;
  // The push in from the opening picture is a camera move (for the move's length after the framed view arrives).
  const [preRolled, setPreRolled] = useState(false);
  useEffect(() => {
    if (preRoll) return setPreRolled(true);
    if (!preRolled) return;
    const id = window.setTimeout(() => setPreRolled(false), 900);
    return () => window.clearTimeout(id);
  }, [Boolean(preRoll), preRolled]); // eslint-disable-line react-hooks/exhaustive-deps
  const pushIn = preRolled && !preRoll;
  const set = curFrame?.set ?? 0;
  const units = close && curView?.sets ? curView.sets[Math.min(set, curView.sets.length - 1)] : null;
  const focus = units ? unionOf(units) : curView?.cam ?? { x: 0, y: 0, w: pic(data.stills[cur]).width, h: pic(data.stills[cur]).height };
  const cursor = motion ? cursorAt(data.cues, at, close, set) : null;
  // The camera moves only once the first framed view has painted (not from the plain layout into it).
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!curFrame) return setArmed(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setArmed(true)));
    return () => cancelAnimationFrame(id);
  }, [Boolean(curFrame), box?.w, box?.h]); // eslint-disable-line react-hooks/exhaustive-deps
  // (The no-script picture is the film's first view, so nothing crossfades at the opening.)
  const fade = reduced ? 0 : cue.fadeMs ?? 280;
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
      data-close={close ? "" : undefined}
      data-units={units ? JSON.stringify(units.map((r) => [r.x, r.y, r.w, r.h])) : undefined}
      data-solids={framed && data.solids?.[data.stills[cur].id] ? JSON.stringify(data.solids[data.stills[cur].id].map((r) => [r.x, r.y, r.w, r.h])) : undefined}
      data-framing={waiting ? "waiting" : undefined}
      data-armed={(armed || pushIn) && motion ? "" : undefined}
      data-cam={prev === cur || pushIn ? "move" : undefined}
      style={{ "--stw-fade": `${fade}ms` } as CSSProperties}>
      <div className="stw-stage" ref={stageRef}>
        {/* A window shorter than the stage is a card; the rest of the stage is a soft blur of the same picture, not a bar. */}
        {curFrame ? (
          <div className="stw-amb" aria-hidden="true">
            {mounted.map((st) => (
              // eslint-disable-next-line @next/next/no-img-element -- the still itself, blurred behind the card
              <img key={st} src={pic(data.stills[st]).src} alt="" decoding="async" data-on={st === cur || undefined} draggable={false} />
            ))}
          </div>
        ) : null}
        <div className={`stw-screen${framed ? " stw-screen--framed" : ""}`} style={curFrame ? { width: `${curFrame.cardW}px`, height: `${curFrame.cardH}px` } : undefined}>
          {mounted.map((st) => (
            <Shot key={st} still={data.stills[st]} pic={pic(data.stills[st])} on={st === cur} frame={style(st, st === cur ? curFrame : st === prev ? frameOf(keyFor(st)) : cache.get(keyFor(st)) ?? null)} />
          ))}
          {/* One layer framed like the shown view: the cursor lives here so it TRAVELS between targets and stills. */}
          {motion ? (
            <div className="stw-layer" style={{ aspectRatio: `${pic(data.stills[cur]).width} / ${pic(data.stills[cur]).height}`, ...style(cur, curFrame) }}>
              <Overlays data={data} cueIndex={at} still={cur} phone={phone && !data.phoneUsesDesk} />
              {cursor && data.cues[at].overlay !== "pin-drag" ? <Cursor c={cursor.c} size={pic(data.stills[cur])} ring={cursor.from} /> : null}
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
            data-ended={clock.ended || undefined}
            aria-label={clock.ended ? "Replay" : clock.paused ? "Play" : "Pause"}
            onClick={() => {
              clock.toggle();
              hold();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {clock.ended ? (
                <path d="M3.2 8a4.8 4.8 0 1 0 1.4-3.4M4.6 1.9v2.7h2.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
