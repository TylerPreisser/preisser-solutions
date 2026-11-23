"use client";

/**
 * Duffer's QR story (design-spec-r2 §3.5), the head of Duffer's Impact tab. A coded recreation:
 * a physical scan at a golf-shop counter cannot be captured. It depicts only what is built: the
 * display's QR opens duffergolf.net with the course's link, the scan lands in the Command Center's
 * live feed, a later sale carrying the course's referral code is credited to it, and the course's
 * commission is paid by check. Nothing is shown as instant or automatic money.
 *
 * ONE composed frame: the display and the golfer's phone, the live feed, the order and its check
 * all have a place from the start and arrive in story order; the end frame is all of them resting
 * together (never a collapsed strip). It lays out once at a design size (desk 1000 x 250, phone
 * 320 x 170) and is scaled, statically, to the slot. In the Impact tab its height comes from the
 * stage (`.im` is a size container), leaving the Impact numbers their room below it.
 *
 * Its own "Demonstration data" label and narration: it is a demo stage nested in the Impact fact
 * stage (tests/demo-privacy.probe.mjs scans the two apart). Its label is the tab's only one.
 * No script / reduced motion: the end frame, at once.
 *
 * In ImpactBeat (`beat.lead === "qr-story"`): <DufferQrScene variant={variant} active={active} reduced={reduced} />
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DUFFER_QR as D, QR_FEED_EARLIER, QR_SITE, QR_T } from "@/data/showcase/scenes/duffer-qr";
import "./duffer-qr.css";

/** When the story has come to rest (ms from the tab showing). */
export const QR_STORY_MS = QR_T.rest;

const MARKS = ["up", "locked", "site", "wire", "feed", "later", "order", "check"] as const;
type Mark = (typeof MARKS)[number];
const AT: Record<Mark, number> = {
  up: QR_T.phoneUp + 60,
  locked: QR_T.locked,
  site: QR_T.site,
  wire: QR_T.wire,
  feed: QR_T.feed,
  later: QR_T.later,
  order: QR_T.order,
  check: QR_T.check,
};

function useStory(active: boolean, reduced: boolean) {
  const [reached, setReached] = useState<number>(MARKS.length);
  useEffect(() => {
    if (!active || reduced) {
      setReached(MARKS.length);
      return;
    }
    setReached(0);
    const ids = MARKS.map((m, i) => window.setTimeout(() => setReached(i + 1), AT[m]));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [active, reduced]);
  return reached;
}

/** The design size each variant lays out at, and the room kept for the label above it. */
const DESIGN = { desk: { w: 1000, h: 250, top: 34, side: 20, bottom: 12 }, phone: { w: 320, h: 170, top: 30, side: 10, bottom: 6 } } as const;

/** Scale the composition to the box it is given (static: the scale never animates). */
function useFit(variant: "desk" | "phone") {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const d = DESIGN[variant];
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setK(Math.max(0.5, Math.min(1.2, (width - 2 * d.side) / d.w, (height - d.top - d.bottom) / d.h)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [variant]);
  return { ref, k };
}

export interface DufferQrSceneProps {
  variant: "desk" | "phone";
  active: boolean;
  reduced: boolean;
}

export function DufferQrScene({ variant, active, reduced }: DufferQrSceneProps) {
  const reached = useStory(active, reduced);
  const fit = useFit(variant);
  const on = (m: Mark) => reached > MARKS.indexOf(m);
  const flags = Object.fromEntries(MARKS.map((m) => [`data-${m}`, on(m) ? "" : undefined]));
  return (
    <div
      ref={fit.ref}
      className={`dqr dqr--${variant}${active && !reduced ? "" : " is-still"}`}
      data-demo-stage="duffer-golf-qr"
      data-scene="duffer-qr"
      data-fit={fit.k === null ? undefined : ""}
      style={fit.k === null ? undefined : ({ "--dqr-k": fit.k.toFixed(4) } as CSSProperties)}
      {...flags}
    >
      <span className="dqr-label" data-demo-label>
        Demonstration data
      </span>
      <p className="ps-visually-hidden" data-demo-narration>
        How a course display earns: a golfer scans the countertop display at a partner course, the scan lands in the Command Center&apos;s live feed with the display and course, a later sale made with the course&apos;s referral code is credited to it, and the course&apos;s commission is paid by check.
      </p>

      <div className="dqr-story" aria-hidden="true">
        {/* ── The counter: the course's display, a golfer's phone ── */}
        <div className="dqr-counter">
          <div className="dqr-board">
            {/* eslint-disable-next-line @next/next/no-img-element -- a small registered logo */}
            <img className="dqr-logo" src="/images/demos/duffer-golf-logo-light.webp" width={680} height={233} alt="" />
            <span className="dqr-qr">
              <QrMark />
            </span>
            <span className="dqr-num">{D.display}</span>
            <span className="dqr-stand" />
          </div>
          <div className="dqr-phone">
            <div className="dqr-screen">
              <span className="dqr-view">
                <QrMark />
              </span>
              <span className="dqr-scanline" />
              <span className="dqr-brk dqr-brk--tl" />
              <span className="dqr-brk dqr-brk--tr" />
              <span className="dqr-brk dqr-brk--bl" />
              <span className="dqr-brk dqr-brk--br" />
              {/* eslint-disable-next-line @next/next/no-img-element -- crop of the site capture already on this page */}
              <img className="dqr-site" src={QR_SITE.src} width={QR_SITE.width} height={QR_SITE.height} alt="" />
              <span className="dqr-chip">{D.course}&apos;s link</span>
            </div>
          </div>
        </div>

        {/* ── The wire: the scan travels to the Command Center ── */}
        <div className="dqr-wire">
          <span className="dqr-line" />
          <span className="dqr-dot" />
        </div>

        {/* ── The Command Center's live feed ── */}
        <div className="dqr-panel">
          <div className="dqr-head">
            <span className="dqr-title">Live feed</span>
            <span className="dqr-stat">
              Scans today{" "}
              <b className="dqr-count">
                <span className="dqr-was">{D.scansBefore}</span>
                <span className="dqr-now">{D.scansAfter}</span>
              </b>
            </span>
          </div>
          <ol className="dqr-feed">
            <li className="dqr-row dqr-row--new">
              <span className="dqr-what">Scan</span>
              <span className="dqr-where">
                {D.display} · {D.course}
              </span>
              <span className="dqr-when">just now</span>
              <span className="dqr-detail">
                {D.town} · {D.device}
              </span>
            </li>
            {QR_FEED_EARLIER.map((r) => (
              <li className="dqr-row" key={r.where}>
                <span className="dqr-what">{r.what}</span>
                <span className="dqr-where">{r.where}</span>
                <span className="dqr-when">{r.when}</span>
                <span className="dqr-detail">{r.detail}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Later: the order it earned, and the check that paid it ── */}
        <div className="dqr-money">
          <span className="dqr-later">3 days later</span>
          <div className="dqr-order">
            <span className="dqr-otitle">Orders</span>
            <span className="dqr-oline">
              <b>{D.order.id}</b>
              <span className="dqr-long"> · {D.order.item} · sold with referral code</span>
              <span className="dqr-short"> · code</span> <b>{D.order.code}</b>
            </span>
            <span className="dqr-owed">
              Commission owed · <b>{D.commission.amount}</b>
              <span className="dqr-long"> · {D.commission.to}</span>
            </span>
          </div>
          <div className="dqr-check">
            <span className="dqr-cmark">✓</span>
            <span>
              Paid by check
              <small>{D.commission.to}</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A drawn QR-like mark (finder squares and a fixed scatter). Decorative: it encodes nothing. */
function QrMark() {
  return (
    <svg viewBox="0 0 29 29" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="29" height="29" fill="#fff" />
      <path
        d="M2 2h7v7H2zM20 2h7v7h-7zM2 20h7v7H2zM4 4v3h3V4zM22 4v3h3V4zM4 22v3h3v-3zM11 2h2v2h-2zM14 4h2v3h-2zM11 8h3v2h-3zM16 11h3v2h-3zM11 13h2v4h-2zM20 11h2v2h-2zM23 13h4v2h-4zM14 16h3v3h-3zM19 17h2v2h-2zM22 19h3v2h-3zM11 20h2v2h-2zM14 22h2v5h-2zM18 22h2v2h-2zM21 24h3v3h-3zM25 22h2v2h-2zM2 11h2v2H2zM5 13h3v2H5zM2 16h2v2H2z"
        fill="#111211"
        fillRule="evenodd"
      />
    </svg>
  );
}
