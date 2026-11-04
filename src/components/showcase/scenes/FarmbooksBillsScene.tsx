"use client";
/* eslint-disable @next/next/no-img-element -- static export: the bill is one pre-rendered raster drawn at display size (spec §6.1); next/image has no optimizer here. */

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import {
  BILL,
  BILL_IMG,
  BILL_REGIONS,
  BILLS_STEPS,
  BILLS_STILL_STEP,
  CUES,
  GLANCE,
  LINES,
  READ_FIELDS,
  RECENT_BILLS,
  SPLIT,
  money,
  type BillRegion,
  type BillsStepId,
} from "@/data/showcase/scenes/farmbooks-bills";
import "./farmbooks-bills.css";

/**
 * FarmBooks "Bills" (design-spec-r2 §6.1, ADR-0025): a coded recreation of one supplier bill going
 * through the real app, in six steps: Snaps, Reads, Sorts, Splits, Books, Sums up. Same shape as HG's
 * vendor scene: the document is a raster (rendered once by scripts/farmbooks-bill/render.mjs with
 * shipped fonts, so every engine draws it the same), the meaning is real text beside it, and a step
 * bar with pause sits under it.
 *
 * A fluid scene: it lays itself out for the window's stage from its measured size (desk: bill left,
 * the app's panel right; phone: bill on top, panel under it) and is never scaled as a picture. Motion
 * is on small elements only (scan line, region boxes, chips, bars, one thumbnail); the bill is one
 * <img> at display size with no transform or filter.
 *
 * Every element is in the DOM in every step (the privacy probe reads all of it); a cue switches it on
 * and CSS moves it. Jumping to a step shows that step's end state. Reduced motion, and the frame before
 * the tab is active, is the Splits end state; the step buttons still show every other step's end state.
 */
export interface FarmbooksBillsSceneProps {
  variant: "desk" | "phone";
  /** The beat's tab is on screen: the story restarts from the top each time this turns true. */
  active: boolean;
  reduced: boolean;
  onCaption?: (line: string) => void;
  /** The visitor took the controls: the window stops moving to the next tab. */
  onHold?: () => void;
}

const N = BILLS_STEPS.length;
const IDX = Object.fromEntries(BILLS_STEPS.map((s, k) => [s.id, k])) as Record<BillsStepId, number>;
const endOf = (k: number) => BILLS_STEPS[k].ms;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ASPECT = BILL_IMG.w / BILL_IMG.h;

/* ── The clock ─────────────────────────────────────────────────────────── */

interface Clock {
  i: number;
  t: number;
  playing: boolean;
  /** Bumped by every jump, so the clock restarts from the new place. */
  seq: number;
}
const STILL = { i: BILLS_STILL_STEP, t: endOf(BILLS_STILL_STEP), playing: false };

function useClock(active: boolean, reduced: boolean) {
  const [s, setS] = useState<Clock>({ ...STILL, seq: 0 });
  const ref = useRef(s);
  ref.current = s;

  useEffect(() => {
    setS((p) => (active && !reduced ? { i: 0, t: 0, playing: true, seq: p.seq + 1 } : { ...STILL, seq: p.seq + 1 }));
  }, [active, reduced]);

  useEffect(() => {
    if (!active || !s.playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    let { i, t } = ref.current;
    let shown = t;
    const tick = (now: number) => {
      t += Math.min(120, Math.max(0, now - last));
      last = now;
      if (t >= endOf(i)) {
        if (i < N - 1) {
          i += 1;
          t = 0;
          shown = 0;
          setS((p) => ({ ...p, i, t: 0 }));
        } else {
          setS((p) => ({ ...p, t: endOf(i), playing: false }));
          return;
        }
      } else if (t - shown >= 50) {
        shown = t;
        setS((p) => ({ ...p, t }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, s.playing, s.seq]);

  const go = (k: number) => {
    const i = clamp(k, 0, N - 1);
    setS((p) => {
      const play = p.playing && !reduced;
      return { i, t: play ? 0 : endOf(i), playing: play, seq: p.seq + 1 };
    });
  };
  const toggle = () =>
    setS((p) => {
      if (p.playing) return { ...p, playing: false, seq: p.seq + 1 };
      const atEnd = p.i === N - 1 && p.t >= endOf(N - 1);
      return atEnd ? { i: 0, t: 0, playing: true, seq: p.seq + 1 } : { ...p, playing: true, seq: p.seq + 1 };
    });
  return { ...s, go, toggle };
}

/** Measured content box of an element (0 until mounted). */
function useBox(ref: RefObject<HTMLElement | null>) {
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

/* ── Layout (px from the measured stage; spec §2.2 numbers, adapted) ───── */

interface Geo {
  phone: boolean;
  /** Bill box. */
  bx: number;
  by: number;
  bw: number;
  bh: number;
  /** Right column (desk) or the panel under the bill (phone). */
  sx: number;
  sy: number;
  sw: number;
  /** Panel top once the bill has folded to a strip (phone, Sorts onward). */
  sy2: number;
  /** Drawn phone over the bill (desk, Snaps). */
  px: number;
  py: number;
  pw: number;
  ph: number;
  tight: boolean;
}

function layout(phone: boolean, W: number, H: number): Geo {
  const w = W || (phone ? 366 : 1218);
  const h = H || (phone ? 560 : 700);
  if (!phone) {
    const side = w < 1000 ? 32 : 56;
    let bh = Math.min(616, h - 64);
    let bw = bh * ASPECT;
    if (bw > w * 0.44) {
      bw = w * 0.44;
      bh = bw / ASPECT;
    }
    const by = Math.max(16, Math.round((h - bh) / 2));
    const sx = side + bw + (w < 1000 ? 32 : 52);
    const pw = clamp(Math.round(bw * 0.5), 200, 250);
    const ph = Math.min(Math.round(pw * 2.02), h - 24);
    return {
      phone,
      bx: side,
      by,
      bw: Math.round(bw),
      bh: Math.round(bh),
      sx: Math.round(sx),
      sy: by,
      sw: Math.round(w - sx - side),
      sy2: by,
      px: Math.round(side + bw / 2 - pw / 2),
      py: Math.round((h - ph) / 2),
      pw,
      ph,
      tight: h < 640,
    };
  }
  // Phone: the bill on top, centred, leaving the panel under it ~370 px for the read card and four lines.
  const bh = clamp(Math.round(h - 380), 150, 300);
  const bw = Math.min(w - 64, Math.round(bh * ASPECT));
  const realH = Math.round(bw / ASPECT);
  return {
    phone,
    bx: Math.round((w - bw) / 2),
    by: 10,
    bw,
    bh: realH,
    sx: 14,
    sy: 10 + realH + 12,
    sw: w - 28,
    sy2: 66,
    px: 0,
    py: 0,
    pw: 0,
    ph: 0,
    tight: h < 520,
  };
}

const pct = (r: BillRegion) => ({
  left: `${(r[0] / BILL_IMG.w) * 100}%`,
  top: `${(r[1] / BILL_IMG.h) * 100}%`,
  width: `${(r[2] / BILL_IMG.w) * 100}%`,
  height: `${(r[3] / BILL_IMG.h) * 100}%`,
});

/* ── The scene ─────────────────────────────────────────────────────────── */

export function FarmbooksBillsScene({ variant, active, reduced, onCaption, onHold }: FarmbooksBillsSceneProps) {
  const clock = useClock(active, reduced);
  const { i, t, playing } = clock;
  const step = BILLS_STEPS[i];
  const phone = variant === "phone";

  const report = useRef(onCaption);
  report.current = onCaption;
  const listening = Boolean(onCaption);
  useEffect(() => {
    if (listening) report.current?.(step.caption);
  }, [step.caption, listening]);

  const stageRef = useRef<HTMLDivElement>(null);
  const box = useBox(stageRef);
  const g = layout(phone, box.w, box.h);

  /** Has the story reached `ms` into step `id`? (Sticky: every later step counts as past it.) */
  const at = (id: BillsStepId, ms = 0) => i > IDX[id] || (i === IDX[id] && t >= ms);
  /** A cue that is "current": reached, and less than `hold` ms ago, in this very step. */
  const fresh = (id: BillsStepId, ms: number, hold = 900) => i === IDX[id] && t >= ms && t < ms + hold && !reduced;

  const hold = () => onHold?.();
  const filed = at("books", CUES.books.file);
  const sums = at("sums");
  const docOn = !filed && !sums;
  const folded = phone && at("sorts");

  // The region box on the bill: only the current one is ever drawn (the latest cue wins).
  const RD = CUES.reads;
  const matched = LINES.map((l, k) => ({ l, k })).filter(({ l }) => !l.split);
  const candidates: { on: boolean; r: BillRegion; tone: "read" | "ok" | "warn" }[] = [
    ...READ_FIELDS.map((f, k) => ({ on: fresh("reads", [RD.vendor, RD.invoice, RD.date, RD.total][k], 520), r: BILL_REGIONS[f.region], tone: "read" as const })),
    ...LINES.map((l, k) => ({ on: fresh("reads", RD.line0 + k * RD.lineEvery, 520), r: BILL_REGIONS[l.region], tone: "read" as const })),
    ...LINES.map((l, k) => ({ on: fresh("sorts", CUES.sorts.first + k * CUES.sorts.every, 640), r: BILL_REGIONS[l.region], tone: "ok" as const })),
    ...matched.map(({ l }, j) => ({
      on: fresh("splits", CUES.splits.field0 + j * CUES.splits.fieldEvery, 520),
      r: BILL_REGIONS[`fld${l.region.slice(4)}` as "fld1" | "fld2" | "fld4"],
      tone: "ok" as const,
    })),
    { on: fresh("splits", CUES.splits.flag, 1200), r: BILL_REGIONS[LINES[SPLIT.line].region], tone: "warn" },
    { on: fresh("books", CUES.books.check, 1000), r: BILL_REGIONS.total, tone: "ok" },
  ];
  const region = candidates.filter((c) => c.on).pop() ?? null;

  const vars = {
    "--fbb-bx": `${g.bx}px`,
    "--fbb-by": `${g.by}px`,
    "--fbb-bw": `${g.bw}px`,
    "--fbb-bh": `${g.bh}px`,
    "--fbb-sx": `${g.sx}px`,
    "--fbb-sy": `${folded ? g.sy2 : g.sy}px`,
    "--fbb-sw": `${g.sw}px`,
    "--fbb-px": `${g.px}px`,
    "--fbb-py": `${g.py}px`,
    "--fbb-pw": `${g.pw}px`,
    "--fbb-ph": `${g.ph}px`,
  } as CSSProperties;

  const cls = ["fbb", `fbb--${variant}`, reduced ? "is-still" : "", g.tight ? "is-tight" : "", playing ? "is-playing" : ""].filter(Boolean).join(" ");

  return (
    <div className={cls} data-scene="farmbooks-bills" data-step={step.id} style={vars}>
      <div className="fbb-stage" ref={stageRef}>
        {/* The bill: one raster at display size. Behind the drawn phone in Snaps (desk), dimmed. */}
        <div className={`fbb-doc${docOn && !folded ? " is-on" : ""}${i === 0 && !phone ? " is-behind" : ""}${phone && i === 0 ? " is-cam" : ""}`}>
          <img
            className="fbb-doc__img"
            src={BILL_IMG.src}
            width={BILL_IMG.w}
            height={BILL_IMG.h}
            alt={`Supplier invoice from ${BILL.vendor}, invoice ${BILL.invoice}, ${BILL.date}, total ${money(BILL.totalCents)}, demonstration data`}
            decoding="async"
          />
          {i === IDX.reads && playing && !reduced ? <span className={`fbb-scan${t >= RD.scan ? " is-go" : ""}`} aria-hidden="true" /> : null}
          {region ? <span className={`fbb-box fbb-box--${region.tone}`} style={pct(region.r)} aria-hidden="true" /> : null}
          {phone ? <Viewfinder on={i === 0} at={at} phone /> : null}
        </div>

        {/* Desk, Snaps: a drawn phone over the paper, its camera framing the whole bill. */}
        {!phone ? (
          <div className={`fbb-phone${i === 0 ? " is-on" : ""}`} aria-hidden={i !== 0 || undefined}>
            <div className="fbb-phone__screen">
              <Viewfinder on={i === 0} at={at} />
            </div>
          </div>
        ) : null}

        {/* Snaps, the app's side: where a bill comes in. */}
        <section className={`fbb-add${i === 0 ? " is-on" : ""}`} aria-hidden={i !== 0 || undefined}>
          <p className="fbb-kicker">Add a bill</p>
          <p className="fbb-title">Snap it, or drop it in</p>
          <p className="fbb-sub">A photo from the cab, or a PDF dragged in from the office.</p>
          <div className="fbb-drop">
            <Icon name="upload" />
            <span>
              <b>Drop bills here</b>
              <span>PDF or photo, one bill or a stack</span>
            </span>
          </div>
        </section>

        {/* Phone, Sorts onward: the bill folds to a strip so the lines get the room. */}
        {phone ? (
          <div className={`fbb-strip${folded && docOn ? " is-on" : ""}`} aria-hidden="true">
            <img src={BILL_IMG.thumb} alt="" width={30} height={34} />
            <span>
              <b>{BILL.vendor}</b>
              <span>
                Invoice {BILL.invoice} · {BILL.date} · {money(BILL.totalCents)}
              </span>
            </span>
          </div>
        ) : null}

        {/* Reads, Sorts, Splits, Books: the app's panel for this bill. */}
        <section className={`fbb-side${at("reads") && docOn ? " is-on" : ""}${i === IDX.reads ? " is-reading" : ""}`} aria-hidden={!(at("reads") && docOn) || undefined}>
          <p className="fbb-kicker">{i >= IDX.splits ? "Needs review" : "The bill"}</p>
          {phone ? null : (
            <>
              <p className={`fbb-title fbb-pop${at("reads", RD.vendor) ? " is-on" : ""}`}>{BILL.vendor}</p>
              <p className={`fbb-sub fbb-pop${at("sorts") ? " is-on" : ""}`}>
                Invoice {BILL.invoice} · {BILL.date} · {money(BILL.totalCents)}
              </p>
            </>
          )}
          <div className={`fbb-read${i === IDX.reads ? " is-open" : ""}`}>
            <dl className="fbb-read__grid">
              {READ_FIELDS.map((f, k) => (
                <div key={f.k}>
                  <dt>{f.label}</dt>
                  <dd className={`fbb-pop${at("reads", [RD.vendor, RD.invoice, RD.date, RD.total][k]) ? " is-on" : ""}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ol className="fbb-lines">
            {LINES.map((l, k) => {
              const j = matched.findIndex((m) => m.k === k);
              const fieldAt = CUES.splits.field0 + j * CUES.splits.fieldEvery;
              const S = CUES.splits;
              return (
                <li key={l.region} className={`fbb-line fbb-pop${at("reads", RD.line0 + k * RD.lineEvery) ? " is-on" : ""}`}>
                  <span className="fbb-line__printed">{l.printed}</span>
                  <span className="fbb-line__plain">{l.plain}</span>
                  <span className="fbb-line__amt">{l.amount}</span>
                  <span className="fbb-line__chips">
                    <span className={`fbb-chip fbb-chip--cat fbb-pop${at("sorts", CUES.sorts.first + k * CUES.sorts.every) ? " is-on" : ""}`}>{l.category}</span>
                    {l.split ? (
                      <span className={`fbb-chip fbb-pop${at("splits", S.flag) ? " is-on" : ""} ${at("splits", S.tie) ? "fbb-chip--ok" : "fbb-chip--warn"}`}>
                        <Icon name={at("splits", S.tie) ? "split" : "flag"} />
                        {at("splits", S.tie) ? `Split · ${SPLIT.rows.length} fields` : "No field on the bill"}
                      </span>
                    ) : (
                      <span className={`fbb-chip fbb-chip--field fbb-pop${at("splits", fieldAt) ? " is-on" : ""}`}>
                        <Icon name="field" />
                        {l.fieldName}
                      </span>
                    )}
                  </span>
                  {l.split ? (
                    <div className={`fbb-split${at("splits", S.open) ? " is-open" : ""}`}>
                      <div className="fbb-split__in">
                        <p className="fbb-split__head">
                          <b>Split by acres</b>
                          <span>You pick the fields; it works out the cents.</span>
                        </p>
                        {SPLIT.rows.map((r, n) => (
                          <p key={r.id} className={`fbb-split__row fbb-pop${at("splits", n === 0 ? S.row0 : S.row1) ? " is-on" : ""}`}>
                            <span className="fbb-split__name">{r.name}</span>
                            <span className="fbb-split__ac">{r.acres} ac</span>
                            <span className={`fbb-split__amt fbb-pop${at("splits", S.shares) ? " is-on" : ""}`}>{money(r.cents)}</span>
                          </p>
                        ))}
                        <p className={`fbb-split__tie fbb-pop${at("splits", S.tie) ? " is-on" : ""}`}>
                          <Tick />
                          {money(SPLIT.totalCents)} of {money(SPLIT.totalCents)}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className={`fbb-verdict fbb-pop${at("books", CUES.books.check) ? " is-on" : ""}`}>
            <Tick />
            <span>
              Lines add up to the printed total, <b>{money(BILL.totalCents)}</b>
            </span>
          </p>
        </section>

        {/* Books: filed into the bills list. */}
        <section className={`fbb-booked${filed && !sums ? " is-on" : ""}`} aria-hidden={!(filed && !sums) || undefined}>
          <p className="fbb-kicker">Bills</p>
          <p className="fbb-title">In the books</p>
          <p className="fbb-booked__tie">
            <Tick />
            Ties to the printed total, {money(BILL.totalCents)}
          </p>
          <ul className="fbb-bills">
            <BillRow
              first
              thumbOn={at("books", CUES.books.booked) || reduced}
              vendor={BILL.vendor}
              sub={`Invoice ${BILL.invoice} · ${BILL.date.replace(/, \d{4}$/, "")} · ${LINES.length} lines`}
              amount={money(BILL.totalCents)}
              pulse={fresh("books", CUES.books.booked, 900)}
            />
            {RECENT_BILLS.map((b) => (
              <BillRow key={b.vendor + b.date} vendor={b.vendor} sub={`${b.date} · ${b.category}`} amount={money(b.cents)} />
            ))}
          </ul>
        </section>

        {/* Sums up: the Exports "At a Glance". */}
        <Glance on={sums} counting={i === IDX.sums && playing && !reduced} t={i === IDX.sums ? t : endOf(IDX.sums)} phone={phone} />

        <Flight stage={stageRef} go={i === IDX.books && t >= CUES.books.file && t < CUES.books.booked + 200 && !reduced} />
      </div>

      <div className="fbb-ctl" role="group" aria-label="Bills walkthrough controls">
        {reduced ? null : (
          <button
            type="button"
            className="fbb-play"
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
        )}
        <ol className="fbb-steps">
          {BILLS_STEPS.map((s, k) => (
            <li key={s.id}>
              <button
                type="button"
                className={k < i ? "fbb-seg is-past" : k === i ? "fbb-seg is-now" : "fbb-seg"}
                aria-label={`Step ${k + 1} of ${N}: ${s.title}`}
                aria-current={k === i ? "step" : undefined}
                onClick={() => {
                  hold();
                  clock.go(k);
                }}
              >
                <span className="fbb-seg__bar">
                  <span className="fbb-seg__fill" style={{ transform: `scaleX(${k < i ? 1 : k === i ? t / s.ms : 0})` }} />
                </span>
                <span className="fbb-seg__label">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

/**
 * The phone camera's capture gate (FarmBooks web/components/add-bill.tsx): the shutter waits until
 * lighting, framing and focus pass, then auto-captures; the shot tucks into the tray; "Upload 1 invoice?".
 */
function Viewfinder({ on, at, phone }: { on: boolean; at: (id: BillsStepId, ms?: number) => boolean; phone?: boolean }) {
  const C = CUES.snaps;
  const checks = [
    { k: "Light", c: C.light },
    { k: "Framing", c: C.frame },
    { k: "Focus", c: C.focus },
  ];
  const ready = at("snaps", C.focus);
  const shot = at("snaps", C.flash);
  return (
    <div className={`fbb-cam${on ? " is-on" : ""}${phone ? " fbb-cam--inline" : ""}`} aria-hidden="true">
      <span className="fbb-cam__paper">
        {phone ? null : <img src={BILL_IMG.src} alt="" width={BILL_IMG.w} height={BILL_IMG.h} />}
        <span className={`fbb-cam__frame${ready ? " is-ready" : ""}`}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={`fbb-cam__flash${on && shot && !at("snaps", C.flash + 220) ? " is-on" : ""}`} />
      </span>
      <span className="fbb-cam__checks">
        {checks.map((x) => (
          <span key={x.k} className={at("snaps", x.c) ? "is-ok" : undefined}>
            <Tick />
            {x.k}
          </span>
        ))}
      </span>
      <span className={`fbb-cam__shutter${ready ? " is-ready" : ""}`} />
      <span className={`fbb-cam__tray${at("snaps", C.tray) ? " is-on" : ""}`}>
        <img src={BILL_IMG.thumb} alt="" width={30} height={34} />
        <b>1</b>
      </span>
      <span className={`fbb-cam__sheet${at("snaps", C.ask) ? " is-on" : ""}`}>
        <span>Upload 1 invoice?</span>
        <span className={`fbb-cam__btn${at("snaps", C.press) ? " is-pressed" : ""}`}>{at("snaps", C.press) ? "Uploading" : "Upload"}</span>
      </span>
    </div>
  );
}

function BillRow({ first, thumbOn, vendor, sub, amount, pulse }: { first?: boolean; thumbOn?: boolean; vendor: string; sub: string; amount: string; pulse?: boolean }) {
  return (
    <li className={`fbb-bill${first ? " is-new" : ""}`}>
      <span className="fbb-bill__thumb" data-fbb-slot={first ? "" : undefined}>
        {first ? <img className={thumbOn ? "is-on" : undefined} src={BILL_IMG.thumb} alt="" width={30} height={34} /> : <i />}
      </span>
      <span className="fbb-bill__who">
        <b>{vendor}</b>
        <span>{sub}</span>
      </span>
      <span className="fbb-bill__amt">{amount}</span>
      <span className={`fbb-bill__st${pulse ? " is-pulse" : ""}`}>Booked</span>
    </li>
  );
}

/** The bill's thumbnail flies from the page into its row in the bills list (700 ms), as HG's filing does. */
function Flight({ stage, go }: { stage: RefObject<HTMLDivElement | null>; go: boolean }) {
  const [f, setF] = useState<{ x: number; y: number; w: number; h: number; dx: number; dy: number; s: number; run: boolean } | null>(null);
  useLayoutEffect(() => {
    const root = stage.current;
    if (!go || !root) {
      setF(null);
      return;
    }
    const slot = root.querySelector("[data-fbb-slot]");
    const doc = root.querySelector(".fbb-doc");
    if (!slot || !doc) return;
    const R = root.getBoundingClientRect();
    const a = doc.getBoundingClientRect();
    const b = slot.getBoundingClientRect();
    const s = Math.min(4, Math.max(1, Math.min(120, a.width * 0.3) / b.width));
    setF({
      x: b.left - R.left,
      y: b.top - R.top,
      w: b.width,
      h: b.height,
      dx: a.left + a.width / 2 - (b.left + b.width / 2),
      dy: a.top + a.height / 2 - (b.top + b.height / 2),
      s,
      run: false,
    });
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setF((p) => (p ? { ...p, run: true } : p))));
    return () => cancelAnimationFrame(r);
  }, [go, stage]);
  if (!f) return null;
  return (
    <img
      className={`fbb-fly${f.run ? " is-run" : ""}`}
      src={BILL_IMG.thumb}
      alt=""
      aria-hidden="true"
      style={{
        left: f.x,
        top: f.y,
        width: f.w,
        height: f.h,
        transform: f.run ? "none" : `translate(${f.dx}px, ${f.dy}px) scale(${f.s})`,
      }}
    />
  );
}

/** The Exports screen's "At a Glance" (FarmBooks workbook_template.py, the Excel tab and the PDF). */
function Glance({ on, counting, t, phone }: { on: boolean; counting: boolean; t: number; phone: boolean }) {
  const C = CUES.sums;
  const reached = (ms: number) => on && t >= ms;
  const maxCat = GLANCE.categories[0].cents;
  const maxVen = GLANCE.vendors[0].cents;
  const maxAcre = GLANCE.fields[0].perAcreCents;
  return (
    <section className={`fbb-glance${on ? " is-on" : ""}`} aria-hidden={!on || undefined}>
      <header className="fbb-glance__head">
        <span>
          <p className="fbb-kicker">Exports</p>
          <p className="fbb-title">At a Glance</p>
          <p className="fbb-sub">
            {GLANCE.farm} · {GLANCE.period}
          </p>
        </span>
        <span className="fbb-glance__files">
          <span className="fbb-file">
            <Icon name="sheet" />
            Excel
          </span>
          <span className="fbb-file">
            <Icon name="pdf" />
            PDF
          </span>
        </span>
      </header>
      <div className="fbb-kpis">
        <div className={`fbb-kpi fbb-pop${reached(C.kpi) ? " is-on" : ""}`}>
          <span className="fbb-kpi__k">Total spent</span>
          <span className="fbb-kpi__v">
            <CountUp cents={GLANCE.totalCents} run={counting && reached(C.kpi)} />
          </span>
          <span className="fbb-kpi__note">
            Includes invoice {BILL.invoice}, {money(BILL.totalCents)}
          </span>
        </div>
        <div className={`fbb-kpi fbb-pop${reached(C.kpi + 120) ? " is-on" : ""}`}>
          <span className="fbb-kpi__k">Line items</span>
          <span className="fbb-kpi__v">{GLANCE.lineItems}</span>
          <span className="fbb-kpi__note">Every one in a category</span>
        </div>
      </div>
      <div className="fbb-cards">
        <Card title="Where the money went">
          {GLANCE.categories.map((c, k) => (
            <Bar key={c.name} label={c.name} value={money(c.cents)} frac={c.cents / maxCat} on={reached(C.cats + k * C.catEvery)} delay={0} />
          ))}
        </Card>
        {phone ? null : (
          <Card title="By vendor">
            {GLANCE.vendors.map((v, k) => (
              <Bar key={v.name} label={v.name} value={money(v.cents)} frac={v.cents / maxVen} on={reached(C.vendors + k * C.catEvery)} delay={0} quiet />
            ))}
          </Card>
        )}
        <Card title="Cost per acre, highest first">
          {GLANCE.fields.map((f, k) => (
            <Bar
              key={f.name}
              label={f.name}
              hint={`${f.acres} ac`}
              value={`${money(f.perAcreCents)}/ac`}
              frac={f.perAcreCents / maxAcre}
              on={reached(C.acres + k * C.acreEvery)}
              delay={0}
              accent
            />
          ))}
        </Card>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fbb-card">
      <p className="fbb-card__t">{title}</p>
      <div className="fbb-card__rows">{children}</div>
    </div>
  );
}

function Bar({ label, hint, value, frac, on, delay, quiet, accent }: { label: string; hint?: string; value: string; frac: number; on: boolean; delay: number; quiet?: boolean; accent?: boolean }) {
  return (
    <p className={`fbb-bar${quiet ? " is-quiet" : ""}${accent ? " is-accent" : ""}`}>
      <span className="fbb-bar__k">
        {label}
        {hint ? <span> · {hint}</span> : null}
      </span>
      <span className="fbb-bar__v">{value}</span>
      <span className="fbb-bar__track">
        <span className={`fbb-bar__fill${on ? " is-on" : ""}`} style={{ "--fbb-f": frac.toFixed(4), transitionDelay: `${delay}ms` } as CSSProperties} />
      </span>
    </p>
  );
}

/** Rolls the total up once (900 ms) when `run` turns true; otherwise shows the final figure. */
function CountUp({ cents, run }: { cents: number; run: boolean }) {
  const [v, setV] = useState(cents);
  useEffect(() => {
    if (!run) {
      setV(cents);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(cents * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, cents]);
  return <>{money(v)}</>;
}

function Tick() {
  return (
    <svg className="fbb-tick" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" />
      <path d="M4.6 8.3 7 10.6l4.4-4.9" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Icon({ name }: { name: "upload" | "field" | "flag" | "split" | "sheet" | "pdf" }) {
  const p: Record<typeof name, ReactNode> = {
    upload: <path d="M8 11V3M4.5 6.5 8 3l3.5 3.5M3 11.5v1.5h10v-1.5" />,
    field: <path d="M2.5 13.5 5 3h6l2.5 10.5zM6.7 3l-.9 10.5M9.3 3l.9 10.5M3.6 8.6h8.8" />,
    flag: <path d="M4 14V2.5M4 3h7.5l-1.8 2.7 1.8 2.8H4" />,
    split: <path d="M8 14V8.5M8 8.5 3.5 3M8 8.5 12.5 3M3.5 3v2.8M3.5 3h2.8M12.5 3v2.8M12.5 3H9.7" />,
    sheet: <path d="M3 2.5h7l3 3v8H3zM3 7h10M3 10.5h10M7 7v6.5" />,
    pdf: <path d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3M5.5 9h5M5.5 11.5h5" />,
  };
  return (
    <svg className="fbb-ic" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
}
