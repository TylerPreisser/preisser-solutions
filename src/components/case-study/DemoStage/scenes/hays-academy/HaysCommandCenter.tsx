import { useId } from "react";
import { Fraunces } from "next/font/google";
import { haysChannels, haysStages, haysWindow, type HaysChannel } from "@/data/demos/hays-academy";
import "./hays-cc.css";

// The portal's own display face (portal/clients/hays-academy/theme.json "display": "Fraunces").
// Loaded only where this scene renders: the showcase route and the lazily loaded home popover.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--ha-font-display", display: "swap" });

/**
 * The hair school's MarCommand client portal (Overview), recreated on invented
 * data (ADR-0016 §6, ADR-0020). Source of the look: marcommand-marketing-engine
 * packages/portal-ui, rendered on its harness SAMPLE (never the captured Hays
 * payloads) for client hays-academy, 2026-10-31.
 *
 * Desk is drawn in a 1280 x 800 coordinate space: the HTML uses --ha-u (a
 * 1280th of the container) and the ribbons use an SVG viewBox of the same
 * size, so a ribbon starts exactly at its card at every width.
 *
 * The real portal shows a hold screen below 1024px. The phone picture is
 * therefore not an invented phone app: it is the same stage band and channel
 * cards, stacked, with the ribbons left out.
 *
 * The school's NAME never appears in here: it is on the private deny list
 * (a ps-admin client; see src/data/demos/invented/hays-academy.ts). The real
 * portal prints it in the sidebar; this one shows the school's mark there.
 */
const DESK = { cardX: 272, cardW: 320, cardY0: 190, step: 68, cardH: 58, markX: 1188, markY: 436 };

const STAGE_X = [624, 756, 888, 1016, 1140];

function ChannelIcon({ icon }: { icon: HaysChannel["icon"] }) {
  const d: Record<HaysChannel["icon"], string> = {
    ads: "M3 13 8 3l5 10M5.5 9h5",
    "social-ads": "M2.5 8c1.5-3 3.5-3 5.5 0s4 3 5.5 0c-1.5-3-3.5-3-5.5 0s-4 3-5.5 0",
    search: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.5 10.5 14 14",
    direct: "M6 3h6v10H6M2.5 8h7M7 5.5 9.5 8 7 10.5",
    social: "M3 4h10v7H8l-3 2.5V11H3zM6 7.5h.01M8 7.5h.01M10 7.5h.01",
    sites: "M6.5 9.5a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-.6.6M9.5 6.5a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l.6-.6",
    email: "M2.5 4h11v8h-11zM2.5 4.5 8 9l5.5-4.5",
  };
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d={d[icon]} />
    </svg>
  );
}

function Mark({ className }: { className: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src="/images/demos/hays-academy-monogram.svg" alt="" width={100} height={100} />;
}

/** One ribbon per channel: from the card's right edge into the cone. */
function ribbon(c: HaysChannel, i: number) {
  const y = DESK.cardY0 + i * DESK.step + DESK.cardH / 2;
  const x0 = DESK.cardX + DESK.cardW;
  const dy = y - DESK.markY;
  const reaches = c.leads > 0;
  const xEnd = reaches ? DESK.markX - 40 : 1000;
  const yEnd = DESK.markY + dy * (reaches ? 0.05 : 0.22);
  const yMid = DESK.markY + dy * (reaches ? 0.34 : 0.5);
  const d = `M${x0},${y} C${x0 + 120},${y} ${x0 + 150},${yMid} ${x0 + 270},${yMid} S${xEnd - 60},${yEnd} ${xEnd},${yEnd}`;
  const w = reaches ? 2 + c.leads * 1.5 : 1.5;
  return { d, w, key: c.key, paid: c.paid, reaches };
}

function Desk() {
  // Gradient ids must be unique per render: the page can draw this scene more than once.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const coneId = `hacc-cone-${uid}`;
  const glowId = `hacc-glow-${uid}`;
  const ribbons = haysChannels.map(ribbon);
  const leads = haysStages.find((s) => s.key === "leads")?.value ?? 0;
  return (
    <div className="hacc-desk">
      <aside className="hacc-side">
        <div className="hacc-side__client">
          <span className="hacc-side__mark">
            <Mark className="hacc-mark" />
          </span>
          <span>
            <b>Client portal</b>
            <small>Client view</small>
          </span>
        </div>
        <div className="hacc-side__search">Search</div>
        <div className="hacc-side__nav">MarCommand</div>
      </aside>

      <div className="hacc-main">
        <div className="hacc-top">
          <span className="hacc-tabs">
            <b>Overview</b>
            <span>Activity</span>
            <span>AI</span>
          </span>
          <span className="hacc-pill">30 days</span>
        </div>

        <div className="hacc-title">
          <span className="hacc-caps">{haysWindow}</span>
          <span className="hacc-title__v">
            {leads} <small>leads</small>
          </span>
        </div>

        <div className="hacc-band" data-focus="stages">
          {haysStages.map((s, i) => (
            <span
              key={s.key}
              className={s.key === "validated" ? "hacc-band__col hacc-band__col--end" : "hacc-band__col"}
              style={{ left: `calc(var(--ha-u) * ${STAGE_X[i]})` }}
            >
              <span className="hacc-caps">{s.label}</span>
              <span className="hacc-num">{s.value.toLocaleString("en-US")}</span>
            </span>
          ))}
        </div>

        <svg className="hacc-flow" viewBox="0 0 1280 800" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={coneId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#E84C88" stopOpacity="0.05" />
              <stop offset="1" stopColor="#E84C88" stopOpacity="0.22" />
            </linearGradient>
            <radialGradient id={glowId}>
              <stop offset="0.55" stopColor="#E84C88" stopOpacity="0.35" />
              <stop offset="1" stopColor="#E84C88" stopOpacity="0" />
            </radialGradient>
          </defs>
          {STAGE_X.map((x) => (
            <line key={x} x1={x + 10} x2={x + 10} y1={182} y2={690} className="hacc-flow__guide" />
          ))}
          <path d={`M820,${DESK.markY - 140} L${DESK.markX},${DESK.markY - 14} L${DESK.markX},${DESK.markY + 14} L820,${DESK.markY + 140} Z`} fill={`url(#${coneId})`} />
          {[
            [820, 140],
            [916, 108],
            [1010, 76],
            [1100, 44],
          ].map(([x, r]) => (
            <ellipse key={x} cx={x} cy={DESK.markY} rx={r / 6} ry={r} className="hacc-flow__ring" />
          ))}
          {ribbons.map((r) => (
            <g key={r.key} className={r.paid ? "hacc-rib hacc-rib--paid" : "hacc-rib"}>
              {r.paid ? <path d={r.d} className="hacc-rib__halo" strokeWidth={r.w + 10} /> : null}
              <path d={r.d} className="hacc-rib__core" strokeWidth={r.w} />
              {r.reaches ? <path d={r.d} className="hacc-rib__flow" strokeWidth={Math.min(2.4, r.w * 0.4)} /> : null}
            </g>
          ))}
          <circle cx={DESK.markX} cy={DESK.markY} r={78} fill={`url(#${glowId})`} />
          <circle cx={DESK.markX} cy={DESK.markY} r={50} className="hacc-flow__seal" />
        </svg>
        <span className="hacc-seal" data-focus="school">
          <Mark className="hacc-mark" />
        </span>

        <ul className="hacc-cards" data-focus="channels">
          {haysChannels.map((c, i) => (
            <li
              key={c.key}
              className="hacc-card"
              style={{ top: `calc(var(--ha-u) * ${DESK.cardY0 + i * DESK.step})` }}
              data-focus={c.key === "social-ads" ? "social-ads" : undefined}
            >
              <span className={c.paid ? "hacc-card__ico hacc-card__ico--paid" : "hacc-card__ico"}>
                <ChannelIcon icon={c.icon} />
              </span>
              <span className="hacc-card__name">
                {c.label}
                <small>{c.paid ? "Paid" : "Organic"}</small>
              </span>
              <span className="hacc-card__fig">
                <b className="hacc-num">{c.visited.toLocaleString("en-US")}</b>
                <small>Visited</small>
              </span>
              <span className="hacc-card__fig">
                <b className="hacc-num">{c.leads}</b>
                <small>Leads</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="hacc-runs">
          <span className="hacc-caps">Preisser runs</span>
          <span className="hacc-chip">Google listing care ✓</span>
          <span className="hacc-chip">Search upkeep ✓</span>
          <span className="hacc-chip">Lead follow-up ✓</span>
        </div>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="hacc-phone">
      <div className="hacc-phone__head">
        <span className="hacc-side__mark">
          <Mark className="hacc-mark" />
        </span>
        <b>Client portal</b>
      </div>
      <p className="hacc-caps hacc-phone__k">{haysWindow}</p>
      <div className="hacc-phone__band" data-focus="stages">
        {haysStages.map((s) => (
          <span key={s.key} className={s.key === "validated" ? "hacc-phone__stage hacc-phone__stage--end" : "hacc-phone__stage"}>
            <span className="hacc-caps">{s.label}</span>
            <span className="hacc-num">{s.value.toLocaleString("en-US")}</span>
          </span>
        ))}
      </div>
      <ul className="hacc-phone__cards" data-focus="channels">
        {haysChannels.slice(0, 5).map((c) => (
          <li key={c.key} className="hacc-card hacc-card--phone">
            <span className={c.paid ? "hacc-card__ico hacc-card__ico--paid" : "hacc-card__ico"}>
              <ChannelIcon icon={c.icon} />
            </span>
            <span className="hacc-card__name">
              {c.label}
              <small>{c.paid ? "Paid" : "Organic"}</small>
            </span>
            <span className="hacc-card__fig">
              <b className="hacc-num">{c.visited.toLocaleString("en-US")}</b>
              <small>Visited</small>
            </span>
            <span className="hacc-card__fig">
              <b className="hacc-num">{c.leads}</b>
              <small>Leads</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HaysCommandCenter() {
  return (
    <div className={`hacc ${fraunces.variable}`} aria-hidden="true">
      <Desk />
      <Phone />
    </div>
  );
}
