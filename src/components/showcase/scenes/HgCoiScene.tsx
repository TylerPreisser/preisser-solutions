"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  COI_BEATS,
  DALE_QUOTE,
  DESK_AFTER,
  DESK_BEFORE,
  FILED,
  HUNT,
  LADDER,
  MAIL,
  MAILBOX_ADDRESS,
  NEW_CERT,
  NEW_READ,
  OLD_CERT,
  OLD_READ,
  OTHER_THREADS,
  PACKAGE,
  PAYMENT_HOLD,
  PEOPLE,
  READ_AS,
  SUBJECT,
  VERDICT_CHECKS,
  deskCounts,
  type AcordData,
  type CertRead,
  type Cov,
  type DeskRow,
  type MailMessage,
} from "@/data/showcase/scenes/hg-coi";
import { Acord25, ACORD_H, ACORD_W } from "./Acord25";
import "./hg-coi.css";

/**
 * HG Oil, vendor insurance (COI), ADR-0022 §4: one vendor's chase from a
 * real-looking ACORD 25 to the year's package, in nine beats, in the engine's
 * own words (src/data/showcase/scenes/hg-coi.ts).
 *
 * Unlike the other scenes this is not a fixed-size picture: it lays itself
 * out for its container (container queries, ~300 to ~1100 px wide), so the
 * mail reads as mail and the controls are real buttons. It plays on its own
 * once its tab is on screen; pause, previous, next and the step strip take it
 * over (and tell the window to stop moving on, `onHold`). Reduced motion: no
 * clock; every beat is its still end state, stepped with the controls.
 *
 * Every beat is in the DOM (only the current one shows), each at its end
 * state unless it is playing, so the privacy probe reads every word.
 */
export interface FluidSceneProps {
  variant: "desk" | "phone";
  /** The beat's tab is on screen: the story restarts from the top each time this turns true. */
  active: boolean;
  reduced: boolean;
  onCaption?: (line: string) => void;
  /** The visitor took the controls: the window stops moving to the next tab. */
  onHold?: () => void;
}

const N = COI_BEATS.length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);

/* ── The clock ───────────────────────────────────────────────────────────── */

interface Story {
  i: number;
  t: number;
  playing: boolean;
  /** Bumped by every jump, so the clock restarts from the new place. */
  seq: number;
}

function useStory(active: boolean, reduced: boolean) {
  const [s, setS] = useState<Story>({ i: 0, t: COI_BEATS[0].ms, playing: false, seq: 0 });
  const ref = useRef(s);
  ref.current = s;

  useEffect(() => {
    if (!active) return;
    setS((p) => (reduced ? { i: 0, t: COI_BEATS[0].ms, playing: false, seq: p.seq + 1 } : { i: 0, t: 0, playing: true, seq: p.seq + 1 }));
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
      if (t >= COI_BEATS[i].ms) {
        if (i < N - 1) {
          i += 1;
          t = 0;
          shown = 0;
          setS((p) => ({ ...p, i, t: 0 }));
        } else {
          setS((p) => ({ ...p, t: COI_BEATS[i].ms, playing: false }));
          return;
        }
      } else if (t - shown >= 33) {
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
    setS((p) => ({ i, t: p.playing && !reduced ? 0 : COI_BEATS[i].ms, playing: p.playing && !reduced, seq: p.seq + 1 }));
  };
  const toggle = () =>
    setS((p) => {
      if (p.playing) return { ...p, playing: false, seq: p.seq + 1 };
      const atEnd = p.i === N - 1 && p.t >= COI_BEATS[N - 1].ms;
      return atEnd ? { i: 0, t: 0, playing: true, seq: p.seq + 1 } : { ...p, playing: true, seq: p.seq + 1 };
    });
  return { ...s, go, toggle };
}

/* ── The scene ───────────────────────────────────────────────────────────── */

export function HgCoiScene({ variant, active, reduced, onCaption, onHold }: FluidSceneProps) {
  const story = useStory(active, reduced);
  const { i, t, playing } = story;
  const beat = COI_BEATS[i];

  const report = useRef(onCaption);
  report.current = onCaption;
  const listening = Boolean(onCaption);
  useEffect(() => {
    if (listening) report.current?.(beat.caption);
  }, [beat.caption, listening]);

  const hold = () => onHold?.();
  return (
    <div className={`hgc hgc--${variant}${reduced ? " is-still" : ""}`} data-scene="hg-coi" data-step={i + 1}>
      <div className="hgc-top" aria-hidden="true">
        <span className="hgc-mark">HG</span>
        <span className="hgc-top__name">Vendor insurance</span>
        <span className="hgc-kind">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1.5l1.5 4.2 4.3 1.5-4.3 1.5L8 13l-1.5-4.3L2.2 7.2l4.3-1.5zM13 11l.6 1.6 1.6.6-1.6.6L13 15.4l-.6-1.6-1.6-.6 1.6-.6z" fill="currentColor" />
          </svg>
          AI at work
        </span>
        <span className="hgc-top__step">
          <b>{i + 1}</b>
          <span>/{N}</span> {beat.title}
        </span>
      </div>

      {/* Real text, not a picture: readable by assistive tech, and its scroll panes are keyboard-reachable (never inside aria-hidden). */}
      <div className="hgc-main">
        {COI_BEATS.map((b, k) => (
          <section key={b.id} className={`hgc-beat${playing ? "" : " is-settled"}`} data-beat={b.id} hidden={k !== i}>
            {/* Remounted as it comes on screen, so its panes open on their newest line (useFollow). */}
            <BeatBody key={k === i ? "on" : "off"} id={b.id} t={k === i ? t : b.ms} />
          </section>
        ))}
      </div>

      <div className="hgc-ctl" role="group" aria-label="COI story controls">
        <button
          type="button"
          className="hgc-btn"
          aria-label="Previous step"
          disabled={i === 0}
          onClick={() => {
            hold();
            story.go(i - 1);
          }}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {reduced ? null : (
          <button
            type="button"
            className="hgc-btn hgc-btn--play"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => {
              hold();
              story.toggle();
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
        <button
          type="button"
          className="hgc-btn"
          aria-label="Next step"
          disabled={i === N - 1}
          onClick={() => {
            hold();
            story.go(i + 1);
          }}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <ol className="hgc-strip">
          {COI_BEATS.map((b, k) => (
            <li key={b.id}>
              <button
                type="button"
                className={k < i ? "hgc-seg is-past" : k === i ? "hgc-seg is-now" : "hgc-seg"}
                aria-label={`Step ${k + 1} of ${N}: ${b.title}`}
                aria-current={k === i ? "step" : undefined}
                onClick={() => {
                  hold();
                  story.go(k);
                }}
              >
                <span className="hgc-seg__bar">
                  <span className="hgc-seg__fill" style={{ transform: `scaleX(${k < i ? 1 : k === i ? t / b.ms : 0})` }} />
                </span>
                <span className="hgc-seg__label">{b.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const BeatBody = memo(function BeatBody({ id, t }: { id: (typeof COI_BEATS)[number]["id"]; t: number }) {
  switch (id) {
    case "read":
      return <CertView cert={OLD_CERT} read={OLD_READ} t={t} T={READ_T} mode="full" />;
    case "detect":
      return <DetectBeat t={t} />;
    case "ask":
      return <AskBeat t={t} />;
    case "chase":
      return <ChaseBeat t={t} />;
    case "reply":
      return <ReplyBeat t={t} />;
    case "answer":
      return <AnswerBeat t={t} />;
    case "cert":
      return <CertBeat t={t} />;
    case "filed":
      return <FiledBeat t={t} />;
    case "package":
      return <PackageBeat t={t} />;
  }
});

/* ── Shared pieces ───────────────────────────────────────────────────────── */

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

/**
 * One rule for every scroll pane in the story, so no pane ever rests with a
 * line of text cut by its edge (critic r1 #4, #10; round 2 #2).
 * - "end" (default): follows the newest thing while the beat plays and rests
 *   with its top edge on a TEXT-LINE boundary, measured from the real line
 *   boxes. When that boundary lies past the furthest the pane can scroll, the
 *   pane's bottom padding grows by the difference, so the boundary is reachable.
 * - "top": rests at its top; when more is below, its bottom edge fades
 *   (`is-more`), so the last visible row reads as "more below", not as a slice.
 * A visitor who scrolls or touches the pane takes it over. Re-rests once the
 * web fonts settle (line heights change).
 */
function useFollow(key: number | string, t: number, rest: "end" | "top" = "end") {
  const ref = useRef<HTMLDivElement>(null);
  const own = useRef(false);
  const first = useRef(true);
  const base = useRef<number | null>(null);
  useEffect(() => {
    if (t === 0) own.current = false;
  }, [t]);
  useLayoutEffect(() => {
    const more = () => {
      const el = ref.current;
      if (el) el.classList.toggle("is-more", el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    };
    const snap = (smooth: boolean) => {
      const el = ref.current;
      if (!el) return;
      if (rest === "top" || own.current) return more();
      if (base.current === null) base.current = parseFloat(getComputedStyle(el).paddingBottom) || 0;
      el.style.paddingBottom = `${base.current}px`;
      const need = el.scrollHeight - el.clientHeight;
      if (need <= 0) return more();
      const er = el.getBoundingClientRect();
      const lines: [number, number][] = [];
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if (!n.textContent || !n.textContent.trim()) continue;
        range.selectNodeContents(n);
        for (const q of range.getClientRects()) {
          if (q.height < 2) continue;
          lines.push([q.top - er.top + el.scrollTop, q.bottom - er.top + el.scrollTop]);
        }
      }
      const clear = (c: number) => !lines.some(([t0, t1]) => t0 < c - 1 && t1 > c + 1);
      // The first line top at or past the furthest needed: whole lines above it, room below. A little air over it if that is clear too.
      const tops = [...new Set(lines.map(([t0]) => Math.floor(t0)))].sort((x, y) => x - y);
      let top = need;
      for (const c of tops) {
        if (c < need - 0.5) continue;
        if (!clear(c)) continue;
        top = c - 6 >= need && clear(c - 6) ? c - 6 : c;
        break;
      }
      if (top > need) el.style.paddingBottom = `${base.current + Math.ceil(top - need)}px`;
      el.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
      more();
    };
    const smooth = !first.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    first.current = false;
    snap(smooth);
    let live = true;
    document.fonts?.ready.then(() => live && snap(false));
    const tm = window.setTimeout(() => snap(false), 700);
    const el = ref.current;
    el?.addEventListener("scroll", more, { passive: true });
    return () => {
      live = false;
      window.clearTimeout(tm);
      el?.removeEventListener("scroll", more);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const take = () => {
    own.current = true;
  };
  return { ref, onWheel: take, onTouchStart: take };
}

function Avatar({ who, name }: { who: MailMessage["who"]; name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return <span className={`hgc-av hgc-av--${who}`}>{initials}</span>;
}

function PdfIcon() {
  return (
    <svg className="hgc-pdf" viewBox="0 0 20 24" aria-hidden="true">
      <path d="M3 1h10l5 5v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" fill="#fff" stroke="#c9ced6" />
      <path d="M13 1v5h5" fill="#eef0f3" stroke="#c9ced6" />
      <rect x="0" y="11" width="15" height="8" rx="1.5" fill="#d93025" />
      <text x="7.5" y="17.2" textAnchor="middle" fontSize="5.6" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">
        PDF
      </text>
    </svg>
  );
}

function Attachment({ name, size, glow }: { name: string; size: string; glow?: boolean }) {
  return (
    <span className={glow ? "hgc-att is-glow" : "hgc-att"}>
      <PdfIcon />
      <span className="hgc-att__t">
        <b>{name}</b>
        <span>{size}</span>
      </span>
    </span>
  );
}

/** Body text that streams in word by word as the AI writes it (`n` chars, null = all). */
function Stream({ m, n, hold }: { m: MailMessage; n: number | null; hold?: boolean }) {
  const paras = [...m.body.map((text) => ({ text, sign: false })), { text: m.sign.join("\n"), sign: true }];
  const all = paras.map((p) => p.text).join("\n");
  let shown = all.length;
  if (n !== null) {
    // Snap to the end of a word, the way a model streams.
    const sp = all.slice(n).search(/\s/);
    shown = sp < 0 ? all.length : n + sp;
  }
  const streaming = n !== null && shown < all.length;
  let o = 0;
  const vis = paras.map((p) => {
    const v = clamp(shown - o, 0, p.text.length);
    o += p.text.length + 1;
    return v;
  });
  const lastOn = vis.reduce((a, v, k) => (v > 0 ? k : a), -1);
  return (
    <div className="hgc-msg__body">
      {paras.map((p, k) => {
        const v = vis[k];
        if (v <= 0) return null;
        const text = p.text.slice(0, v);
        const at = hold ? p.text.indexOf(PAYMENT_HOLD) : -1;
        const body =
          at >= 0 && v > at ? (
            <>
              {text.slice(0, at)}
              <mark className="hgc-hold">{text.slice(at, at + PAYMENT_HOLD.length)}</mark>
              {text.slice(at + PAYMENT_HOLD.length)}
            </>
          ) : (
            text
          );
        return (
          <p key={k} className={p.sign ? "hgc-msg__sign" : undefined}>
            {body}
            {streaming && k === lastOn ? <i className="hgc-caret" /> : null}
          </p>
        );
      })}
    </div>
  );
}

const streamLen = (m: MailMessage) => m.body.reduce((a, p) => a + p.length + 1, 0) + m.sign.join("\n").length;

/** One message in the reading pane, open or folded to a line. */
function Message({
  m,
  open = true,
  n = null,
  status,
  hold,
  glow,
  arriving,
  children,
}: {
  m: MailMessage;
  open?: boolean;
  n?: number | null;
  status?: ReactNode;
  hold?: boolean;
  glow?: boolean;
  arriving?: boolean;
  children?: ReactNode;
}) {
  const cls = `hgc-msg hgc-msg--${m.who}${open ? "" : " is-folded"}${arriving ? " is-arriving" : ""}`;
  if (!open) {
    return (
      <div className={cls}>
        <Avatar who={m.who} name={m.name} />
        <span className="hgc-msg__fold">
          <b>{m.name}</b>
          <span>{m.snippet}</span>
        </span>
        {m.attach ? (
          <svg className="hgc-clip" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10.5 4.5 5.8 9.2a1.6 1.6 0 0 0 2.3 2.3l5-5a2.9 2.9 0 0 0-4.1-4.1L3.9 7.5a4.2 4.2 0 0 0 5.9 5.9l3.7-3.7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        ) : null}
        <span className="hgc-msg__when">{m.when.replace(/^\w+, /, "").replace(/, \d.*$/, "")}</span>
      </div>
    );
  }
  return (
    <div className={cls}>
      <div className="hgc-msg__head">
        <Avatar who={m.who} name={m.name} />
        <div className="hgc-msg__who">
          <p>
            <b>{m.name}</b> <span className="hgc-msg__addr">&lt;{m.address}&gt;</span>
          </p>
          <p className="hgc-msg__to">
            To: {m.to}
            {m.cc ? <span> · Cc: {m.cc}</span> : null}
          </p>
        </div>
        <span className="hgc-msg__when">{status ?? m.when}</span>
      </div>
      <Stream m={m} n={n} hold={hold} />
      {m.attach ? <Attachment name={m.attach.name} size={m.attach.size} glow={glow} /> : null}
      {children}
    </div>
  );
}

/** "Written from the whole thread · checked in code · passed by an independent judge", each ticking in turn. */
function Checks({ t, at }: { t: number; at: number }) {
  const items = ["Written from the whole thread", "Checked in code", "Passed by an independent judge"];
  if (t < at) return null;
  return (
    <p className="hgc-checks">
      {items.map((x, k) => (
        <span key={x} className={t >= at + k * 450 ? "is-on" : undefined}>
          <i aria-hidden="true">✓</i>
          {x}
        </span>
      ))}
    </p>
  );
}

function Status({ t, sentAt, when }: { t: number; sentAt: number; when: string }) {
  if (t >= sentAt) return <span className="hgc-sent">Sent {when.replace(/^\w+, /, "")}</span>;
  return <span className="hgc-draft">Writing</span>;
}

type ThreadRow = { name: string; subject: string; when: string; unread?: boolean; attach?: boolean; on?: boolean };

/** The mail client: the inbox list (wide containers only) and the reading pane. */
function Mail({ row, t, followKey, children, chip }: { row: ThreadRow; t: number; followKey: number | string; children: ReactNode; chip?: ReactNode }) {
  const f = useFollow(followKey, t);
  const rows: ThreadRow[] = [{ ...row, on: true }, ...OTHER_THREADS];
  return (
    <div className="hgc-mail">
      <div className="hgc-mail__list">
        <p className="hgc-mail__folder">
          <b>Inbox</b>
          <span>{MAILBOX_ADDRESS}</span>
        </p>
        {rows.map((r) => (
          <div key={r.name} className={`hgc-row${r.on ? " is-on" : ""}${r.unread ? " is-unread" : ""}`}>
            <p className="hgc-row__a">
              <b>{r.name}</b>
              <span>{r.when}</span>
            </p>
            <p className="hgc-row__b">
              {r.attach ? (
                <svg className="hgc-clip" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10.5 4.5 5.8 9.2a1.6 1.6 0 0 0 2.3 2.3l5-5a2.9 2.9 0 0 0-4.1-4.1L3.9 7.5a4.2 4.2 0 0 0 5.9 5.9l3.7-3.7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ) : null}
              {r.subject}
            </p>
          </div>
        ))}
      </div>
      <div className="hgc-mail__read">
        <div className="hgc-mail__subj">
          <p>{SUBJECT}</p>
          {chip}
        </div>
        <div className="hgc-mail__scroll" ref={f.ref} onWheel={f.onWheel} onTouchStart={f.onTouchStart}>
          {children}
        </div>
      </div>
    </div>
  );
}

const shortWhen = (m: MailMessage) => m.when.replace(/^\w+, /, "").replace(/, \d.*$/, "");

/* ── Beat 1 and 7: the certificate, scanned and read ─────────────────────── */

interface CertTimes {
  arrive: number;
  scanFrom: number;
  scanTo: number;
  /** The page leaves full width for its reading view, the panel opens. */
  dock: number;
  rowsFrom: number;
  /** One field every this many ms: the camera and the highlight move to it, its row lands. */
  rowEvery: number;
  /** Beat 1: the conclusion under the panel, and the camera back on the lapsed line. */
  footAt: number;
  tickFrom?: number;
  tickEvery?: number;
}

const READ_T: CertTimes = { arrive: 350, scanFrom: 700, scanTo: 4300, dock: 4500, rowsFrom: 4900, rowEvery: 620, footAt: 12900 };
const CERT_OPEN = 2600;
const NEW_T: CertTimes = {
  arrive: 300,
  scanFrom: 500,
  scanTo: 3200,
  dock: 3400,
  rowsFrom: 3800,
  rowEvery: 620,
  footAt: 99999,
  tickFrom: 8400,
  tickEvery: 620,
};

/** What a field the reader records points at on the page (Acord25 data-k). */
type Item =
  | { kind: "row"; label: string; value: string; region: string; k: string; n: number }
  | { kind: "pol"; p: CertRead["policies"][number]; region: string; k: string; n: number }
  | { kind: "head"; label: string };

const POLICY_K = ["gl", "auto", "umbrella", "wc"] as const;

function itemsOf(read: CertRead, mode: "full" | "compact"): Item[] {
  const rows = mode === "full" ? read.rows : read.rows.filter((r) => r.label === "Producer" || r.label === "Insured");
  const out: Item[] = [];
  let n = 0;
  for (const r of rows) out.push({ kind: "row", ...r, k: r.region, n: ++n });
  out.push({ kind: "head", label: "Policies" });
  read.policies.forEach((p, i) => out.push({ kind: "pol", p, region: "coverages", k: POLICY_K[i], n: ++n }));
  if (mode === "full") for (const r of read.after) out.push({ kind: "row", ...r, k: r.region, n: ++n });
  return out;
}

const labelOf = (it: Item) => (it.kind === "pol" ? it.p.type : it.label);

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Native rects of every marked field on the page: `hl` the whole field, `cam` what a camera frames (coverage rows: the typed number, dates and limits). */
function useFieldRects(docRef: React.RefObject<HTMLDivElement | null>) {
  const [rects, setRects] = useState<{ hl: Record<string, Rect>; cam: Record<string, Rect> } | null>(null);
  useLayoutEffect(() => {
    const doc = docRef.current;
    const root = doc?.querySelector<HTMLElement>(".ac");
    if (!doc || !root) return;
    const measure = () => {
      const rr = root.getBoundingClientRect();
      const k = rr.width / ACORD_W;
      if (!(k > 0)) return;
      const union = (sel: string, attr: string) => {
        const out: Record<string, Rect> = {};
        root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          const key = el.getAttribute(attr);
          if (!key) return;
          const r = el.getBoundingClientRect();
          const x0 = (r.left - rr.left) / k;
          const y0 = (r.top - rr.top) / k;
          const x1 = (r.right - rr.left) / k;
          const y1 = (r.bottom - rr.top) / k;
          const o = out[key];
          out[key] = o
            ? { x: Math.min(o.x, x0), y: Math.min(o.y, y0), w: Math.max(o.x + o.w, x1) - Math.min(o.x, x0), h: Math.max(o.y + o.h, y1) - Math.min(o.y, y0) }
            : { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
        });
        return out;
      };
      setRects({ hl: union("[data-k]", "data-k"), cam: union("[data-cam]", "data-cam") });
    };
    measure();
    // Once more after the web fonts settle (the form's own faces are system fonts, the panel's are not).
    const t = window.setTimeout(measure, 500);
    return () => window.clearTimeout(t);
  }, [docRef]);
  return rects;
}

/**
 * Scale and offset that frame native rect `r` in a `vw` x `vh` view: as close
 * as a readable scale allows (never below full page width, never past 1.15),
 * centred on the rect and clamped to the page's edges.
 */
function frame(r: Rect | null, vw: number, vh: number) {
  const floor = vw / ACORD_W;
  if (!r) return { s: floor, x: 0, y: 0 };
  // A view wide enough to show the whole page width at a readable scale (typed fill 8.5 px or more)
  // keeps the whole width and only pans down: the form reads as a whole page, never a crop.
  // Otherwise one reading scale for the whole view (a ~500 native px window onto the page: half-width
  // boxes and a coverage row's typed columns fit), so moving between fields only moves the page.
  const s = floor >= 0.8 ? Math.min(floor, 1.1) : clamp((vw * 0.94) / 500, floor, 1.0);
  const pw = ACORD_W * s;
  const ph = ACORD_H * s;
  const x = pw <= vw ? (vw - pw) / 2 : clamp(vw / 2 - (r.x + r.w / 2) * s, vw - pw, 0);
  // A tall rect shows from its top; a short one sits a little above centre.
  const y = ph <= vh ? (vh - ph) / 2 : clamp(r.h * s > vh * 0.84 ? 8 - r.y * s : vh * 0.46 - (r.y + r.h / 2) * s, vh - ph, 0);
  return { s, x, y };
}

function CertView({ cert, read, t, T, mode }: { cert: AcordData; read: CertRead; t: number; T: CertTimes; mode: "full" | "compact" }) {
  const ref = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const box = useBox(ref);
  const rects = useFieldRects(docRef);
  const W = box.w || 640;
  const H = box.h || 360;
  const pad = 8;
  const docked = t >= T.dock;
  // A tall stage (the phone sheet) puts the page above the panel; a wide one beside it.
  const tall = H > W * 0.82 || W < 520;
  const view: Rect = !docked
    ? { x: 0, y: 0, w: W, h: H }
    : tall
      ? { x: 0, y: 0, w: W, h: Math.round(H * 0.5) }
      : { x: 0, y: 0, w: Math.round((W - pad) * 0.62), h: H };
  const panel: CSSProperties = tall
    ? { left: 0, right: 0, top: view.h + pad, bottom: 0 }
    : { left: view.w + pad, right: 0, top: 0, bottom: 0 };

  const items = itemsOf(read, mode);
  const fields = items.filter((it): it is Exclude<Item, { kind: "head" }> => it.kind !== "head");
  const landedN = docked ? clamp(Math.floor((t - T.rowsFrom) / T.rowEvery) + 1, 0, fields.length) : 0;
  const ticks = T.tickFrom !== undefined && T.tickEvery ? clamp(Math.floor((t - T.tickFrom) / T.tickEvery) + 1, 0, VERDICT_CHECKS.length + 1) : 0;
  const footOn = t >= T.footAt;
  // The line the conclusion rests on: general liability's dates (ended, or the new end).
  const verdictOn = footOn || ticks > 0;
  const hot = !verdictOn && landedN > 0 ? fields[landedN - 1] : null;
  const shown = new Set(fields.slice(0, landedN));
  const readSet = new Set(fields.slice(0, landedN).map((f) => f.region));

  let s: number;
  let x: number;
  let y: number;
  if (!docked) {
    // Scanning: the whole page at full width, panning down with the line.
    const scanP = prog(t, T.scanFrom, T.scanTo);
    s = (W - 2 * pad) / ACORD_W;
    x = pad;
    const maxPan = Math.max(0, ACORD_H * s + 2 * pad - H);
    y = pad - clamp(scanP * ACORD_H * s - H * 0.45, 0, maxPan);
  } else {
    const k = verdictOn ? "gl" : hot?.k;
    const r = k && rects ? (rects.cam[k] ?? rects.hl[k] ?? null) : null;
    ({ s, x, y } = frame(r, view.w, view.h));
  }
  const scanP = prog(t, T.scanFrom, T.scanTo);
  const scanning = t >= T.scanFrom && t < T.scanTo;

  // The highlight drawn on the page, in the view's px: the field being read, or the conclusion line.
  const hlKey = verdictOn ? "gl" : hot?.k;
  const hlRect = docked && hlKey && rects ? rects.hl[hlKey] : null;
  const hlTone = verdictOn ? (mode === "full" ? "bad" : "good") : "read";
  const hlTag = verdictOn
    ? mode === "full"
      ? `Ended ${cert.gl.exp}`
      : `Ends ${cert.gl.exp}`
    : hot
      ? labelOf(hot)
      : "";
  const f = useFollow(`${landedN}-${ticks}-${footOn}`, t);

  return (
    <div ref={ref} className={`hgc-cv${docked ? " is-docked" : ""}${tall ? " is-tall" : ""}`}>
      <div className="hgc-cv__view" style={{ width: view.w, height: view.h }}>
        {/* The page is LAID OUT at its reading size (CSS zoom) and placed with left/top: no transform, no
            will-change, so it is never a promoted layer. A promoted, scaled-down 816 x 1056 page was a
            2904 x 3420 device-px texture at 3x (coi-layers.md), past iOS WebContent's budget. */}
        <div ref={docRef} className="hgc-doc" style={{ left: x, top: y, width: ACORD_W * s, height: ACORD_H * s }}>
          <div className="hgc-page" style={{ zoom: s }}>
            <Acord25 c={cert} read={docked ? readSet : undefined} />
            {scanning ? <div className="hgc-scan" style={{ top: scanP * ACORD_H }} /> : null}
            {scanning ? <div className="hgc-scanned" style={{ height: scanP * ACORD_H }} /> : null}
          </div>
        </div>
        {hlRect ? (
          <div
            className={`hgc-hl hgc-hl--${hlTone}${y + hlRect.y * s < 26 ? " is-top" : ""}`}
            style={{ left: x + hlRect.x * s - 3, top: y + hlRect.y * s - 3, width: hlRect.w * s + 6, height: hlRect.h * s + 6 }}
          >
            {/* The tag stays in view when the box runs off the view's left edge (a coverage row framed on its typed columns). */}
            <span className="hgc-hl__tag" style={{ marginLeft: Math.max(0, -(x + hlRect.x * s - 3)) + 4 }}>
              {hot && !verdictOn ? <i>{hot.n}</i> : null}
              {hlTag}
            </span>
          </div>
        ) : null}
        {!docked ? (
          <p className="hgc-cv__pill">
            <PdfIcon />
            <b>{read.file}</b>
            <span>{t < T.scanFrom ? "Opening" : "Reading every field as printed"}</span>
          </p>
        ) : null}
      </div>
      {docked ? (
        <div className="hgc-read" style={panel}>
          <p className="hgc-read__h">
            <b>What it read</b>
            <span>{read.file}</span>
          </p>
          <div className="hgc-read__list" ref={f.ref} onWheel={f.onWheel} onTouchStart={f.onTouchStart}>
            {items.map((it, k) => {
              if (it.kind === "head") {
                const next = items[k + 1];
                return next && next.kind !== "head" && shown.has(next) ? (
                  <p key={k} className="hgc-read__sub" data-row>
                    {it.label}
                  </p>
                ) : null;
              }
              if (!shown.has(it)) return null;
              const on = hot === it;
              return it.kind === "row" ? (
                <div key={k} className={`hgc-kv${on ? " is-hot" : ""}`} data-row>
                  <i className="hgc-n">{it.n}</i>
                  <span>{it.label}</span>
                  <b>{it.value}</b>
                </div>
              ) : (
                <div key={k} className={`hgc-pol${on ? " is-hot" : ""}`} data-row>
                  <i className="hgc-n">{it.n}</i>
                  <div>
                    <p>
                      <b>{it.p.type}</b>
                      <span>
                        {it.p.number} · insurer {it.p.ltr}
                      </span>
                    </p>
                    <p>
                      <span>{it.p.term}</span>
                      <span>{it.p.limit}</span>
                      <span className="hgc-pol__marks">{it.p.marks}</span>
                    </p>
                  </div>
                </div>
              );
            })}
            {ticks > 0 ? <p className="hgc-read__sub" data-row>The checks it makes</p> : null}
            {VERDICT_CHECKS.slice(0, ticks).map((c) => (
              <p key={c.check} className="hgc-tick__row" data-row>
                <i aria-hidden="true">✓</i>
                <span>{c.check}</span>
                <b>{c.result}</b>
              </p>
            ))}
            {ticks > VERDICT_CHECKS.length ? (
              <p className="hgc-verdict" data-row>
                Verdict <span className="hgc-chip hgc-chip--good">Accepted</span>
              </p>
            ) : null}
            {footOn ? (
              <div className="hgc-read__foot" data-row>
                <p>Read in one pass, every field as printed, then checked against the page once more before it is recorded.</p>
                <p className="hgc-rec">
                  <Mark cov="missing" />
                  Not covered since Oct 12, 2026: general liability ended.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ── Beat 2 and 9: the vendor desk ───────────────────────────────────────── */

function Mark({ cov }: { cov: Cov | "unread" }) {
  return <i className={`hgc-mk hgc-mk--${cov}`} aria-hidden="true" />;
}

const COV_WORD: Record<Cov, string> = { covered: "Covered", expiring: "Expiring", missing: "Not covered" };

function Tiles({ c }: { c: ReturnType<typeof deskCounts> }) {
  const tiles: [string, number, string][] = [
    ["Not covered", c.missing, "missing"],
    ["Expiring", c.expiring, "expiring"],
    ["Covered", c.covered, "covered"],
    ["Needs me", c.needs, "needs"],
  ];
  return (
    <div className="hgc-tiles">
      {tiles.map(([label, n, k]) => (
        <p key={label} className={`hgc-tile hgc-tile--${k}${n > 0 && (k === "missing" || k === "needs") ? " is-lit" : ""}`}>
          <b>{n}</b>
          <span>{label}</span>
        </p>
      ))}
    </div>
  );
}

function DeskRows({ rows, hot, extra }: { rows: readonly (DeskRow & { reading?: boolean })[]; hot?: string; extra?: (r: DeskRow) => ReactNode }) {
  return (
    <div className="hgc-vlist">
      {rows.map((r) => (
        <div key={r.name} className={`hgc-v${hot === r.name ? " is-hot" : ""}`}>
          <Mark cov={r.reading ? "unread" : r.cov} />
          <div className="hgc-v__main">
            <p className="hgc-v__name">
              <b>{r.name}</b>
              <span className={`hgc-cov hgc-cov--${r.reading ? "unread" : r.cov}`}>{r.reading ? "Not read" : COV_WORD[r.cov]}</span>
            </p>
            <p className="hgc-v__rec">{r.reading ? "Reading a certificate" : r.record}</p>
            {r.needs ? (
              <p className="hgc-v__needs">
                <i aria-hidden="true" />
                Needs me: {r.needs}
              </p>
            ) : null}
            {extra?.(r)}
          </div>
          <span className="hgc-v__touch">{r.touch}</span>
        </div>
      ))}
    </div>
  );
}

function DetectBeat({ t }: { t: number }) {
  const flipped = t >= 1400;
  const rows = DESK_BEFORE.map((r, k) => (k === 0 && !flipped ? { ...r, reading: true } : r));
  const counts = deskCounts(flipped ? DESK_BEFORE : DESK_BEFORE.slice(1));
  // The red vendor is the first row, so the desk rests at its top (a fade says more is below).
  const f = useFollow(`${flipped}-${t >= 2600}-${t >= 3600}`, t, "top");
  return (
    <div className="hgc-desk" ref={f.ref} onWheel={f.onWheel} onTouchStart={f.onTouchStart}>
      <p className="hgc-desk__h">
        <b>Vendors</b>
        <span>Tue, Nov 3 · daily check, 7:15 AM</span>
      </p>
      <Tiles c={counts} />
      <DeskRows
        rows={rows}
        hot={flipped ? PEOPLE.vendor : undefined}
        extra={(r) =>
          r.source && t >= 2600 ? (
            <>
              <p className="hgc-v__src">{r.source}</p>
              {t >= 3600 ? <p className="hgc-next">Next: ask for a current certificate</p> : null}
            </>
          ) : null
        }
      />
    </div>
  );
}

function PackageBeat({ t }: { t: number }) {
  const pressed = t >= 1500;
  const open = t >= 2300;
  const files = clamp(Math.floor((t - 2700) / 280) + 1, 0, PACKAGE.files.length);
  // The list rests at its top (the rundown, then the certificates; the renewed one is the fourth) and fades when more is below.
  const f = useFollow(`${open}-${files}`, t, "top");
  const desk = useFollow(`${open}`, t, "top");
  return (
    <div className={`hgc-pkgwrap${open ? " is-open" : ""}`}>
      <div className="hgc-desk" ref={desk.ref} onWheel={desk.onWheel} onTouchStart={desk.onTouchStart}>
        <p className="hgc-desk__h">
          <b>Vendors</b>
          <span>Thu, Nov 5</span>
          <span className={`hgc-build${pressed ? " is-pressed" : ""}`}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 5.5 8 3l5 2.5v5L8 13l-5-2.5zM3 5.5 8 8l5-2.5M8 8v5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            Build package
          </span>
        </p>
        <Tiles c={deskCounts(DESK_AFTER)} />
        <DeskRows rows={DESK_AFTER} hot={PEOPLE.vendor} />
      </div>
      {open ? (
        <div className="hgc-pkg">
          <p className="hgc-pkg__zip">
            <svg viewBox="0 0 20 24" aria-hidden="true">
              <path d="M3 1h10l5 5v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" fill="#f3e9c6" stroke="#b9a35a" />
              <path d="M9 2h2v2H9zM9 6h2v2H9zM9 10h2v2H9zM8.5 14h3v4h-3z" fill="#7a6a2f" />
            </svg>
            <span>
              <b>{PACKAGE.zip}</b>
              <span>{PACKAGE.files.length + 1} files</span>
            </span>
          </p>
          <div className="hgc-pkg__list" ref={f.ref} onWheel={f.onWheel} onTouchStart={f.onTouchStart}>
          <div className="hgc-tree">
            <p className={files > 0 ? "is-in" : undefined}>
              <PdfIcon />
              {PACKAGE.rundown}
            </p>
            <p className={`hgc-tree__dir${files > 0 ? " is-in" : ""}`}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1.5 4a1 1 0 0 1 1-1h3.6l1.5 1.6h5.9a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z" fill="currentColor" />
              </svg>
              Certificates
            </p>
            {PACKAGE.files.slice(0, files).map((name) => {
              // One line per file, as a file browser shows it: the vendor's name gives way, "exp <date>.pdf" never does.
              const at = name.lastIndexOf(" exp ");
              return (
                <p key={name} className={`hgc-tree__f is-in${name.startsWith(PEOPLE.vendor) ? " is-new" : ""}`} title={name}>
                  <PdfIcon />
                  <span className="hgc-fn">
                    <span className="hgc-fn__a">{name.slice(0, at + 1)}</span>
                    <span className="hgc-fn__b">{name.slice(at + 1)}</span>
                  </span>
                </p>
              );
            })}
          </div>
          </div>
          {t >= 5200 ? <p className="hgc-pkg__note">{PACKAGE.note}</p> : null}
          {t >= 6000 ? (
            <p className="hgc-loop">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13 8a5 5 0 1 1-1.5-3.6M13.5 2v3.2h-3.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {PACKAGE.loop}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/* ── Beat 3: the ask goes out ────────────────────────────────────────────── */

const ASK_T = { from: 900, to: 6200, checks: 6600, sent: 8200 };

function AskBeat({ t }: { t: number }) {
  const m = MAIL.ask;
  const len = streamLen(m);
  const n = t >= ASK_T.to ? null : Math.floor(prog(t, ASK_T.from, ASK_T.to) * len);
  const sent = t >= ASK_T.sent;
  return (
    <Mail
      t={t}
      followKey={n === null ? `done-${t >= ASK_T.checks}-${sent}` : Math.floor(n / 60)}
      row={{ name: sent ? m.name : "Draft", subject: SUBJECT, when: sent ? shortWhen(m) : "" }}
      chip={sent ? <span className="hgc-chip">Waiting on vendor</span> : null}
    >
      <Message m={m} n={n} hold status={<Status t={t} sentAt={ASK_T.sent} when={m.when} />}>
        {n === null ? (
          <p className="hgc-holdnote">
            <mark className="hgc-hold">Highlighted</mark> only when the vendor invoiced HG Oil this year.
          </p>
        ) : null}
        <Checks t={t} at={ASK_T.checks} />
      </Message>
    </Mail>
  );
}

/* ── Beat 4: who to write, and the reminders if no one answers ───────────── */

function ChaseBeat({ t }: { t: number }) {
  const q = HUNT.query;
  const typed = Math.floor(prog(t, 1300, 2300) * q.length);
  const rungs = clamp(Math.floor((t - 4800) / 450) + 1, 0, LADDER.rungs.length);
  const f = useFollow(`${t >= 400}-${t >= 2600}-${t >= 3400}-${t >= 4200}-${rungs}-${t >= 7000}-${t >= 7800}`, t);
  return (
    <div className="hgc-chase" ref={f.ref} onWheel={f.onWheel} onTouchStart={f.onTouchStart}>
      <div className="hgc-card">
        <p className="hgc-card__h">Who to write</p>
        {t >= 400 ? (
          <p className="hgc-step is-in">
            <span>{HUNT.steps[0].k}</span>
            <b>{HUNT.steps[0].v}</b>
          </p>
        ) : null}
        {t >= 1100 ? (
          <div className="hgc-search is-in">
            <p className="hgc-search__lbl">Searching HG Oil&apos;s mailboxes</p>
            <p className="hgc-search__bar">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span>
                {q.slice(0, typed)}
                {typed < q.length ? <i className="hgc-caret" /> : null}
              </span>
            </p>
            {t >= 2600 ? (
              <p className="hgc-search__hit">
                <b>{HUNT.hit.from}</b>
                <span>{HUNT.hit.subject}</span>
                <span>{HUNT.hit.when}</span>
              </p>
            ) : null}
          </div>
        ) : null}
        {t >= 3400 ? (
          <p className="hgc-step is-in is-good">
            <span>The ask went to</span>
            <b>
              {PEOPLE.dale.full}, {HUNT.hit.from}
            </b>
          </p>
        ) : null}
        {t >= 4200 ? <p className="hgc-fine">{HUNT.bounce}</p> : null}
      </div>
      <div className="hgc-card">
        <p className="hgc-card__h">If no one answers</p>
        <ol className="hgc-ladder">
          {LADDER.rungs.map((r, k) => (
            <li key={k} className={`is-${r.state}${k < rungs ? " is-lit" : ""}`}>
              <span className="hgc-ladder__when">{r.when}</span>
              <span className="hgc-ladder__what">
                {r.what}
                {r.state === "sent" ? <em>Sent</em> : r.state === "next" ? <em>Next</em> : null}
              </span>
              {r.state === "next" && k < rungs ? <q className="hgc-ladder__q">{LADDER.reminder}</q> : null}
            </li>
          ))}
        </ol>
        {rungs > 0 ? <p className="hgc-fine">{LADDER.band}</p> : null}
        {t >= 7000 ? <p className="hgc-fine">{LADDER.after}</p> : null}
        {t >= 7800 ? <p className="hgc-rule">{LADDER.never}</p> : null}
      </div>
    </div>
  );
}

/* ── Beat 5: Dale writes back ────────────────────────────────────────────── */

function ReplyBeat({ t }: { t: number }) {
  const m = MAIL.reply;
  const arrived = t >= 500;
  return (
    <Mail
      t={t}
      followKey={`${arrived}-${t >= 2800}-${t >= 3400}-${t >= 4000}-${t >= 5000}`}
      row={arrived ? { name: m.name, subject: m.snippet, when: shortWhen(m), unread: t < 2400 } : { name: MAIL.ask.name, subject: SUBJECT, when: shortWhen(MAIL.ask) }}
      chip={<span className="hgc-chip">{t >= 5000 ? "Says it is coming" : "Waiting on vendor"}</span>}
    >
      <Message m={MAIL.ask} open={false} />
      {arrived ? (
        <Message m={m} arriving={t < 900}>
          {t >= 2800 ? (
            <div className="hgc-readas">
              <p className="hgc-readas__h">Read with the whole thread</p>
              <p className="hgc-readas__chips">
                <span className="hgc-chip hgc-chip--ai">Meaning: {READ_AS.meaning}</span>
                {t >= 3400 ? <span className="hgc-chip">Contact: {READ_AS.contact}</span> : null}
              </p>
              {t >= 4000 ? <p className="hgc-readas__sum">{READ_AS.summary}</p> : null}
              {t >= 5000 ? (
                <p className="hgc-readas__did">
                  <s>Reminder about Nov 10</s> called off: {PEOPLE.dale.first} replied.
                </p>
              ) : null}
            </div>
          ) : null}
        </Message>
      ) : null}
    </Mail>
  );
}

/* ── Beat 6: the AI answers ──────────────────────────────────────────────── */

const ANS_T = { wait: 1800, from: 2000, to: 4400, quote: 4700, checks: 5300, sent: 6800 };

function AnswerBeat({ t }: { t: number }) {
  const m = MAIL.answer;
  const len = streamLen(m);
  const n = t < ANS_T.from ? 0 : t >= ANS_T.to ? null : Math.floor(prog(t, ANS_T.from, ANS_T.to) * len);
  const sent = t >= ANS_T.sent;
  return (
    <Mail
      t={t}
      followKey={n === null ? `d-${t >= ANS_T.quote}-${t >= ANS_T.checks}-${sent}` : `${t >= ANS_T.from}-${Math.floor((n ?? 0) / 60)}`}
      row={{ name: sent ? m.name : MAIL.reply.name, subject: sent ? m.snippet : MAIL.reply.snippet, when: sent ? shortWhen(m) : shortWhen(MAIL.reply) }}
      chip={<span className="hgc-chip">Says it is coming</span>}
    >
      <Message m={MAIL.ask} open={false} />
      <Message m={MAIL.reply} open={false} />
      {t < ANS_T.wait ? (
        <div className="hgc-wait">
          <p>
            {PEOPLE.dale.first} wrote at 11:40 AM. The reply waits like a person&apos;s would: 25 to 90 minutes.
          </p>
          <span className="hgc-wait__bar">
            <span style={{ transform: `scaleX(${prog(t, 100, ANS_T.wait)})` }} />
          </span>
        </div>
      ) : (
        <Message m={m} n={n} status={<Status t={t} sentAt={ANS_T.sent} when={m.when} />}>
          {t >= ANS_T.quote ? (
            <p className="hgc-quote">
              <span>Quoted from {PEOPLE.dale.first}</span>
              <q>{DALE_QUOTE}</q>
              <em>found in his message</em>
            </p>
          ) : null}
          <Checks t={t} at={ANS_T.checks} />
        </Message>
      )}
    </Mail>
  );
}

/* ── Beat 7: Marcy sends the certificate; it is read and checked ─────────── */

function CertBeat({ t }: { t: number }) {
  const m = MAIL.cert;
  if (t < CERT_OPEN) {
    return (
      <Mail
        t={t}
        followKey={`${t >= 300}-${t >= 1500}`}
        row={t >= 300 ? { name: m.name, subject: m.snippet, when: shortWhen(m), unread: true, attach: true } : { name: MAIL.answer.name, subject: MAIL.answer.snippet, when: shortWhen(MAIL.answer) }}
        chip={<span className="hgc-chip">Says it is coming</span>}
      >
        <Message m={MAIL.ask} open={false} />
        <Message m={MAIL.reply} open={false} />
        <Message m={MAIL.answer} open={false} />
        {t >= 300 ? <Message m={m} arriving={t < 700} glow={t >= 1500} /> : null}
      </Mail>
    );
  }
  return <CertView cert={NEW_CERT} read={NEW_READ} t={t - CERT_OPEN} T={NEW_T} mode="compact" />;
}

/* ── Beat 8: thanked, and filed ──────────────────────────────────────────── */

const THX_T = { from: 500, to: 3200, checks: 3500, sent: 5000, file: 5800, flip: 7000 };

function FiledBeat({ t }: { t: number }) {
  const m = MAIL.thanks;
  const len = streamLen(m);
  const n = t < THX_T.from ? 0 : t >= THX_T.to ? null : Math.floor(prog(t, THX_T.from, THX_T.to) * len);
  const sent = t >= THX_T.sent;
  const rec = useFollow(`${t >= THX_T.file}-${t >= THX_T.flip}`, t);
  return (
    <div className={`hgc-filed${sent ? " is-open" : ""}`}>
      <Mail
        t={t}
        followKey={n === null ? `d-${t >= THX_T.checks}-${sent}` : Math.floor((n ?? 0) / 60)}
        row={{ name: sent ? m.name : MAIL.cert.name, subject: sent ? m.snippet : MAIL.cert.snippet, when: sent ? shortWhen(m) : shortWhen(MAIL.cert), attach: !sent }}
        chip={<span className={sent ? "hgc-chip hgc-chip--good" : "hgc-chip"}>{sent ? "Closed: accepted" : "Reading a certificate"}</span>}
      >
        <Message m={MAIL.ask} open={false} />
        <Message m={MAIL.reply} open={false} />
        <Message m={MAIL.answer} open={false} />
        <Message m={MAIL.cert} open={false} />
        <Message m={m} n={n} status={<Status t={t} sentAt={THX_T.sent} when={m.when} />}>
          <Checks t={t} at={THX_T.checks} />
        </Message>
      </Mail>
      {sent ? (
        <div className="hgc-record" ref={rec.ref} onWheel={rec.onWheel} onTouchStart={rec.onTouchStart}>
          <p className="hgc-card__h">Filed</p>
          <p className={`hgc-file${t >= THX_T.file ? " is-in" : ""}`}>
            <PdfIcon />
            <span>{FILED}</span>
          </p>
          <div className={`hgc-flip${t >= THX_T.flip ? " is-flipped" : ""}`}>
            <Mark cov={t >= THX_T.flip ? "covered" : "missing"} />
            <div>
              <p>
                <b>{PEOPLE.vendor}</b>
              </p>
              <p className="hgc-flip__rec">{t >= THX_T.flip ? DESK_AFTER[0].record : DESK_BEFORE[0].record}</p>
              <p className="hgc-flip__touch">{t >= THX_T.flip ? DESK_AFTER[0].touch : "Reading a certificate"}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
