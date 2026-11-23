"use client";

/**
 * Duffer's QR story, the head of Duffer's Impact tab (ADR-0028 §3; critic r2 M5; owner: "humans scanning a QR code at a
 * golf store ... boom instantly lands in our system"). A coded recreation: a physical scan cannot be captured.
 *
 * One continuous scene, the hero of the tab, as wide as the stage:
 *   a. a partner shop's counter (a club rack and a ball display behind it) with Duffer's standing display and its code;
 *   b. a golfer's hand brings a phone up to the display, the viewfinder locks on the code, the scan is confirmed;
 *   c. the scan travels to the Command Center's live feed and lands as a new row at the top, naming the shop and the
 *      code it is credited to, and the visitor count moves to the figure the Impact tab shows under the story.
 * The shop is drawn in inline SVG; every word is HTML text at 12 px or more, so it stays crisp and is never scaled down.
 * On a portrait stage (phones, tablet sheets) the counter sits over the feed; on a landscape one they sit side by side.
 *
 * Its own "Demonstration data" label and narration: it is a demo stage nested in the Impact fact stage
 * (tests/demo-privacy.probe.mjs scans the two apart). It plays once each time the tab is entered and rests on its end
 * frame; no script, reduced motion or an inactive tab: the end frame at once.
 */
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { DUFFER_QR as D, QR_FEED_EARLIER, QR_T } from "@/data/showcase/scenes/duffer-qr";
import "./duffer-qr.css";

/** When the story has come to rest (ms from the tab showing). */
export const QR_STORY_MS = QR_T.rest;

const MARKS = ["up", "locked", "scanned", "wire", "feed", "credited"] as const;
type Mark = (typeof MARKS)[number];

function useStory(active: boolean, reduced: boolean) {
  const [reached, setReached] = useState<number>(MARKS.length);
  useEffect(() => {
    if (!active || reduced) {
      setReached(MARKS.length);
      return;
    }
    setReached(0);
    const ids = MARKS.map((m, i) => window.setTimeout(() => setReached(i + 1), QR_T[m]));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [active, reduced]);
  return reached;
}

export interface DufferQrSceneProps {
  variant: "desk" | "phone";
  active: boolean;
  reduced: boolean;
  /** The Impact tab's own figure for visitors tracked: the feed's count lands on it. */
  count?: string;
}

export function DufferQrScene({ variant, active, reduced, count }: DufferQrSceneProps) {
  const reached = useStory(active, reduced);
  const on = (m: Mark) => reached > MARKS.indexOf(m);
  const flags = Object.fromEntries(MARKS.map((m) => [`data-${m}`, on(m) ? "" : undefined]));
  // The count before this scan, only when the figure is a plain whole number (never shown at rest).
  const prev = count && /^\d+$/.test(count) && Number(count) > 0 ? String(Number(count) - 1) : null;
  const feed = useFeedWindow();
  return (
    <div
      className={`dqr dqr--${variant}${active && !reduced ? "" : " is-still"}`}
      data-demo-stage="duffer-golf-qr"
      data-scene="duffer-qr"
      data-fit={feed.fit ? "" : undefined}
      {...flags}
    >
      <p className="ps-visually-hidden" data-demo-narration>
        How a partner shop&apos;s display earns: a golfer at the counter scans the Duffer Golf display with a phone, and the scan lands
        at the top of the Command Center&apos;s live feed, credited to the shop and its referral code, so a later sale with that code
        is credited to the shop for its commission.
      </p>

      <div className="dqr-in">
      <div className="dqr-shop" data-qr="shop" aria-hidden="true">
        <ShopArt />
        <span className="dqr-label" data-demo-label>
          Demonstration data
        </span>
        <span className="dqr-scanned">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="8" cy="8" r="8" />
            <path d="M4.6 8.3 7 10.6l4.4-4.9" />
          </svg>
          Scanned
        </span>
      </div>

      <div className="dqr-wire" aria-hidden="true">
        <span className="dqr-line" />
        <span className="dqr-dot" />
      </div>

      <div className="dqr-panel" data-qr="feed" aria-hidden="true">
        <div className="dqr-head">
          <span className="dqr-title">
            <i className="dqr-live" />
            Live feed
          </span>
          {count ? (
            <span className="dqr-stat">
              Visitors tracked{" "}
              <b className="dqr-count">
                {prev ? <span className="dqr-was">{prev}</span> : null}
                <span className="dqr-now" data-qr="count">
                  {count}
                </span>
              </b>
            </span>
          ) : null}
        </div>
        {/* The feed's window keeps one height from first frame to last: the new row lands at the top by sliding the
            rows down inside it (the oldest slides out), so nothing under the story moves. */}
        <div className="dqr-feed" ref={feed.ref} style={feed.fit ? ({ "--dqr-new-h": `${feed.fit.newH}px`, "--dqr-rest-h": `${feed.fit.restH}px` } as CSSProperties) : undefined}>
        <ol className="dqr-feed-in">
          <li className="dqr-row dqr-row--new" data-qr="row">
            <span className="dqr-what">Scan</span>
            <span className="dqr-where">{D.course}</span>
            <span className="dqr-when">just now</span>
            <span className="dqr-detail">
              {D.display} · code <b>{D.code}</b>
            </span>
            <span className="dqr-credit">
              Credited to <span>{D.course}</span>
            </span>
          </li>
          {QR_FEED_EARLIER.map((r, i) => (
            <li className="dqr-row" key={`${r.where} ${r.when}`} data-out={feed.fit && i + 1 >= feed.fit.rest ? "" : undefined}>
              <span className="dqr-what">{r.what}</span>
              <span className="dqr-where">{r.where}</span>
              <span className="dqr-when">{r.when}</span>
              <span className="dqr-detail">{r.detail}</span>
            </li>
          ))}
        </ol>
        </div>
      </div>
      </div>
    </div>
  );
}

/**
 * The feed's window: how tall the new row is (the rows sit that far up until it lands) and how tall the rows that rest
 * on screen are (two on a portrait stage, three on a landscape one). Measured from layout (offsets ignore transforms)
 * and again whenever the scene's size changes.
 */
function useFeedWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ newH: number; restH: number; rest: number } | null>(null);
  useLayoutEffect(() => {
    const box = ref.current;
    const scene = box?.closest<HTMLElement>(".dqr");
    if (!box || !scene || typeof ResizeObserver === "undefined") return;
    const read = () => {
      const rows = [...(box.firstElementChild?.children ?? [])] as HTMLElement[];
      // Three rows rest on a landscape stage (the scene sits beside the shop there), two on a portrait one.
      const stage = scene.closest<HTMLElement>(".im") ?? scene;
      const rest = Math.min(rows.length, stage.clientWidth >= stage.clientHeight ? 3 : 2);
      if (rows.length < 2 || rest < 2) return;
      const top = rows[0].offsetTop;
      const last = rows[rest - 1];
      const next = { newH: rows[1].offsetTop - top, restH: last.offsetTop + last.offsetHeight - top, rest };
      setFit((f) => (f && f.newH === next.newH && f.restH === next.restH && f.rest === next.rest ? f : next));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(scene);
    return () => ro.disconnect();
  }, []);
  return { ref, fit };
}

/**
 * The counter of a partner's golf shop, drawn: a club rack and a shelf of balls behind it, Duffer's standing display on
 * the counter, and a golfer's hand holding a phone up to its code. Colours come from duffer-qr.css (both themes).
 */
function ShopArt() {
  const clubs = [22, 33, 44, 55, 66, 77, 88];
  const wall = `dqr-wall-${useId().replace(/[^A-Za-z0-9_-]/g, "")}`;
  return (
    <svg className="dqr-art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={wall} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="a-wall-hi" />
          <stop offset="1" className="a-wall-lo" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#${wall})`} />

      {/* The club rack: grips up, a wooden bar across, the shafts running down behind the counter. */}
      <g className="a-rack">
        <rect className="a-wood-d" x="14" y="30" width="86" height="96" rx="3" opacity="0.18" />
        {clubs.map((x, i) => (
          <g key={x} transform={`rotate(${(i - 3) * 2.2} ${x} 120)`}>
            <rect className="a-shaft" x={x - 1} y="40" width="2" height="84" />
            <rect className={i % 3 === 1 ? "a-grip-2" : "a-grip"} x={x - 2.4} y={i % 2 ? 22 : 26} width="4.8" height="22" rx="2" />
          </g>
        ))}
        <rect className="a-wood" x="12" y="68" width="90" height="7" rx="2" />
      </g>

      {/* The ball shelf, clear of the phone: a pyramid of balls and their sleeves. */}
      <g className="a-shelf">
        <rect className="a-wood" x="246" y="70" width="66" height="6" rx="2" />
        <rect className="a-wood-d" x="246" y="76" width="66" height="3" />
        {[0, 1, 2].map((i) => (
          <circle key={`b1${i}`} className="a-ball" cx={258 + i * 13} cy="63" r="6.4" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`b2${i}`} className="a-ball" cx={264.5 + i * 13} cy="51.6" r="6.4" />
        ))}
        <circle className="a-ball" cx="271" cy="40.2" r="6.4" />
        <rect className="a-sleeve" x="295" y="46" width="13" height="24" rx="2" />
        <rect className="a-sleeve-2" x="250" y="98" width="16" height="22" rx="2" />
        <rect className="a-sleeve" x="270" y="98" width="16" height="22" rx="2" />
        <rect className="a-sleeve-3" x="290" y="98" width="16" height="22" rx="2" />
        <rect className="a-wood" x="244" y="120" width="70" height="4" rx="1" />
      </g>

      {/* The counter. */}
      <rect className="a-top" x="-4" y="120" width="328" height="9" rx="2" />
      <rect className="a-front" x="-4" y="129" width="328" height="51" />
      {[40, 120, 200, 280].map((x) => (
        <rect key={x} className="a-panel" x={x - 34} y="137" width="68" height="43" rx="2" />
      ))}

      {/* Duffer's standing display, with its code. */}
      <g data-qr="sign">
        <ellipse className="a-shadow" cx="118" cy="122" rx="40" ry="3.5" />
        <path className="a-easel" d="M100 121 L110 52 L126 52 L136 121 Z" />
        <rect className="a-sign" x="86" y="40" width="64" height="80" rx="6" />
        <image href="/images/demos/duffer-golf-logo-light.webp" x="93" y="46" width="50" height="17" preserveAspectRatio="xMidYMid meet" />
        <rect x="99" y="68" width="38" height="38" rx="3" fill="#ffffff" />
        <g transform="translate(101.5 70.5) scale(1.137931)">
          <QrPaths />
        </g>
        <rect className="a-sign-foot" x="98" y="111" width="40" height="3" rx="1.5" />
      </g>

      {/* The golfer's hand and phone, raised to the code. */}
      <g className="a-hand" data-qr="hand">
        <path className="a-sleeve-cloth" d="M188 180 L194 152 Q214 146 236 152 L244 180 Z" />
        <path className="a-cuff" d="M193 156 Q214 149 237 156 L238.5 162 Q214 155 191.5 162 Z" />
        <path className="a-skin" d="M196 156 C192 140 192 120 198 106 L230 104 C236 118 238 140 234 156 Z" />
        <g className="a-phone" data-qr="phone">
          <rect className="a-phone-body" x="194" y="38" width="42" height="78" rx="7" />
          <rect className="a-phone-screen" x="197.5" y="44" width="35" height="66" rx="4" />
          <g className="a-view">
            <rect x="203" y="60" width="24" height="24" rx="1.5" fill="#ffffff" />
            <g transform="translate(204.2 61.2) scale(0.745)">
              <QrPaths />
            </g>
          </g>
          <g className="a-brackets">
            <path d="M200 60v-4h4M230 60v-4h-4M200 84v4h4M230 84v4h-4" />
          </g>
          <g className="a-ok">
            <circle cx="215" cy="98" r="6.5" />
            <path d="M212 98.2 214.2 100.4 218.3 96" />
          </g>
        </g>
        <path className="a-skin" d="M193 112 C186 108 184 96 190 90 C194 87 198 92 198 98 L199 112 Z" />
        <path className="a-skin-2" d="M232 70 h6 a4 4 0 0 1 0 9 h-6 Z M233 82 h6.5 a4 4 0 0 1 0 9 h-6.5 Z M233 94 h6 a4 4 0 0 1 0 9 h-6 Z" />
      </g>
    </svg>
  );
}

/** A drawn QR-like mark (finder squares and a fixed scatter) in a 29-unit box. Decorative: it encodes nothing. */
function QrPaths() {
  return (
    <path
      d="M2 2h7v7H2zM20 2h7v7h-7zM2 20h7v7H2zM4 4v3h3V4zM22 4v3h3V4zM4 22v3h3v-3zM11 2h2v2h-2zM14 4h2v3h-2zM11 8h3v2h-3zM16 11h3v2h-3zM11 13h2v4h-2zM20 11h2v2h-2zM23 13h4v2h-4zM14 16h3v3h-3zM19 17h2v2h-2zM22 19h3v2h-3zM11 20h2v2h-2zM14 22h2v5h-2zM18 22h2v2h-2zM21 24h3v3h-3zM25 22h2v2h-2zM2 11h2v2H2zM5 13h3v2H5zM2 16h2v2H2z"
      fill="#111211"
      fillRule="evenodd"
    />
  );
}
