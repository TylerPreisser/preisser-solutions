"use client";

/**
 * Duffer's QR story (design-spec-r2 §3.5), the head of Duffer's Impact tab. A coded recreation:
 * a physical scan at a golf-shop counter cannot be captured. It depicts only what is built: the
 * display's QR opens duffergolf.net with the course's link, the scan lands in the Command Center's
 * live feed, a later sale carrying the course's referral code is credited to it, and the course's
 * commission is paid by check. Nothing is shown as instant or automatic money.
 *
 * DROP-IN for the Impact beat (builder B2), one line where `beat.lead === "qr-story"`:
 *   <DufferQrScene variant={variant} active={active} reduced={reduced} />
 * It sits at the top of the panel and fills the height it is given; at QR_STORY_MS - 1000 it
 * compacts to a strip (desk 200 px, phone 120 px), and from QR_STORY_MS the Impact numbers rise
 * in below it. It carries its own "Demonstration data" label and narration (its own demo stage
 * nested in the Impact fact stage; tests/demo-privacy.probe.mjs scans the two apart).
 * No script / reduced motion: the strip's end frame, at once.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DUFFER_QR as D, QR_FEED_EARLIER, QR_SITE, QR_T } from "@/data/showcase/scenes/duffer-qr";
import "./duffer-qr.css";

/** When the Impact numbers may rise in below the strip (ms from the tab showing). */
export const QR_STORY_MS = QR_T.numbers;

const MARKS = ["up", "locked", "site", "wire", "feed", "later", "order", "check", "strip"] as const;
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
  strip: QR_T.strip,
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

export interface DufferQrSceneProps {
  variant: "desk" | "phone";
  active: boolean;
  reduced: boolean;
}

/** Desk: the story is laid out once at 960 x 480 and scaled to fill the slot it is given. */
const DESK_W = 960;
const DESK_H = 480;
function useFit(on: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!on || !el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setK(Math.max(0.55, Math.min(1.45, (width - 56) / DESK_W, (height - 64) / DESK_H)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [on]);
  return { ref, k };
}

export function DufferQrScene({ variant, active, reduced }: DufferQrSceneProps) {
  const reached = useStory(active, reduced);
  const fit = useFit(variant === "desk");
  const on = (m: Mark) => reached > MARKS.indexOf(m);
  const flags = Object.fromEntries(MARKS.map((m) => [`data-${m}`, on(m) ? "" : undefined]));
  return (
    <div
      ref={fit.ref}
      style={{ "--dqr-k": fit.k } as CSSProperties}
      className={`dqr dqr--${variant}${active && !reduced ? "" : " is-still"}`}
      data-demo-stage="duffer-golf-qr"
      data-scene="duffer-qr"
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

        {/* ── The Command Center: live feed, then the order and its commission ── */}
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
              <span className="dqr-detail">
                {D.town} · {D.device}
              </span>
              <span className="dqr-when">just now</span>
            </li>
            {QR_FEED_EARLIER.map((r) => (
              <li className="dqr-row" key={r.where}>
                <span className="dqr-what">{r.what}</span>
                <span className="dqr-where">{r.where}</span>
                <span className="dqr-detail">{r.detail}</span>
                <span className="dqr-when">{r.when}</span>
              </li>
            ))}
          </ol>
          <span className="dqr-later">3 days later</span>
          <div className="dqr-order">
            <span className="dqr-otitle">Orders</span>
            <span className="dqr-oline">
              <b>{D.order.id}</b> · {D.order.item} · sold with referral code <b>{D.order.code}</b>
            </span>
            <span className="dqr-owed">
              Commission owed · <b>{D.commission.amount}</b> · {D.commission.to}
            </span>
          </div>
        </div>

        {/* ── The check goes back to the course ── */}
        <div className="dqr-check">
          <span className="dqr-cmark">✓</span>
          <span>
            Paid by check
            <small>{D.commission.to}</small>
          </span>
        </div>
      </div>

      {/* ── The end frame: what the story did, in three words ── */}
      <ol className="dqr-strip">
        <li>
          <Icon k="scan" />
          <span>
            <b>Scanned</b>
            <small>{D.display}</small>
          </span>
        </li>
        <li>
          <Icon k="credit" />
          <span>
            <b>Credited</b>
            <small>{D.course}</small>
          </span>
        </li>
        <li>
          <Icon k="paid" />
          <span>
            <b>Paid</b>
            <small>by check</small>
          </span>
        </li>
      </ol>
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

function Icon({ k }: { k: "scan" | "credit" | "paid" }) {
  const d =
    k === "scan"
      ? "M3 7V4h3M14 4h3v3M17 13v3h-3M6 16H3v-3M5 10h10"
      : k === "credit"
        ? "M4 10.5l3.5 3.5L16 5.5"
        : "M3 6h14v9H3zM3 9h14M6 12.5h3";
  return (
    <span className="dqr-ico" data-k={k}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
