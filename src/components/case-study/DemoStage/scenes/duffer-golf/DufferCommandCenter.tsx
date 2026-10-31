import { dufferDashboard as D, dufferFeed, type FeedRow } from "@/data/demos/duffer-golf";
import "./duffer-cc.css";

/**
 * The Duffer Golf Command Center, recreated on invented data (ADR-0016 §6, ADR-0020).
 *
 * Source of the look: duffer-partner-program panel (AppShellDesk, DashboardDesk,
 * DashboardPhone), rendered on its own test fixtures 2026-10-31. Two layouts:
 * desk (a 1280 x 800 picture) and phone (a 390 x 600 picture). Every length is in
 * --dg-u, one 1280th (or 390th) of the container's width, so each layout scales
 * as one picture instead of reflowing. The container picks the layout.
 *
 * End state first (ADR-0016 §3): the live row and the 15th scan are IN the
 * markup. `[data-live]` on an ancestor replays their arrival; without it, under
 * reduced motion, or with no JavaScript, the final frame is what renders.
 *
 * Decorative to assistive tech: the stage narration carries the meaning.
 * No headings (ADR-0016 §6). No ids (desk and phone both render).
 */
const NAV: { label: string; badge?: number; icon: keyof typeof ICONS }[] = [
  { label: "Dashboard", icon: "grid" },
  { label: "Prospects", badge: 3, icon: "inbox" },
  { label: "Inbox", badge: 3, icon: "route" },
  { label: "Partners", badge: D.needingReview, icon: "flag" },
  { label: "Dealers / installers", icon: "home" },
  { label: "Customers", icon: "people" },
  { label: "Orders", icon: "receipt" },
  { label: "Commissions", icon: "coins" },
  { label: "QR Codes", icon: "qr" },
  { label: "MarCommand", icon: "megaphone" },
];

const ICONS = {
  grid: <path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" />,
  inbox: <path d="M2.5 9.5 4 4h8l1.5 5.5v3h-11zM2.5 9.5H6l.8 1.5h2.4L10 9.5h3.5" />,
  route: <path d="M3 4h5a2.5 2.5 0 0 1 0 5H6a2.5 2.5 0 0 0 0 5h7M11 12l2 2-2 2" />,
  flag: <path d="M4 14V2.5M4 3h7l-1.5 2.5L11 8H4M2.5 14h6" />,
  home: <path d="M2.5 7.5 8 3l5.5 4.5V13h-11zM6.5 13V9.5h3V13" />,
  people: <path d="M6 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2 13.5c0-2.2 1.8-4 4-4s4 1.8 4 4M11 7a2 2 0 1 0 0-4M12 9.6c1.3.5 2.2 1.8 2.2 3.4" />,
  receipt: <path d="M4 2h8v12l-1.4-1-1.3 1-1.3-1-1.3 1-1.3-1L4 14zM6 5.5h4M6 8h4" />,
  coins: <path d="M8 6.5c3 0 5-1 5-2s-2-2-5-2-5 1-5 2 2 2 5 2zM3 4.5v3c0 1 2 2 5 2s5-1 5-2v-3M3 7.5v3c0 1 2 2 5 2s5-1 5-2v-3" />,
  qr: <path d="M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM2.5 9.5h4v4h-4zM9.5 9.5h1.5M12 9.5h1.5v1.5M9.5 12v1.5H12" />,
  megaphone: <path d="M2.5 6.5v3h2l5 3v-9l-5 3zM11.5 6a2.5 2.5 0 0 1 0 4" />,
} as const;

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg className="dgcc-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Logo() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="dgcc-logo" src="/images/demos/duffer-golf-logo-light.webp" alt="" width={680} height={233} />;
}

function FeedItem({ r, fresh }: { r: FeedRow; fresh?: boolean }) {
  return (
    <li className={fresh ? "dgcc-feed__row dgcc-feed__row--new" : "dgcc-feed__row"}>
      <div className="dgcc-feed__inner">
        <span className="dgcc-feed__time">{r.time}</span>
        <span className="dgcc-feed__what">
          <b>{r.kind}</b> · #{r.display} · {r.partner}
          <small>{r.where}</small>
        </span>
      </div>
    </li>
  );
}

/** Scans today: the end state is one more than the series, because the live scan landed. */
function ScansToday({ className }: { className: string }) {
  return (
    <span className={`${className} dgcc-tick`}>
      <span className="dgcc-tick__was">{D.stats.scansToday}</span>
      <span className="dgcc-tick__now">{D.stats.scansToday + 1}</span>
    </span>
  );
}

function Bars({ series, live, lead }: { series: readonly number[]; live?: boolean; lead?: boolean }) {
  const max = Math.max(...series) + 1;
  const n = series.length;
  return (
    <div className={lead ? "dgcc-bars dgcc-bars--leads" : "dgcc-bars"}>
      {series.map((v, i) => {
        const isToday = live && i === n - 1;
        const h = ((isToday ? v + 1 : v) / max) * 100;
        return (
          <i
            key={i}
            className={isToday ? "dgcc-bars__bar dgcc-bars__bar--today" : "dgcc-bars__bar"}
            style={{ height: `${Math.max(h, 1.5)}%` }}
          />
        );
      })}
    </div>
  );
}

function Desk() {
  const s = D.stats;
  return (
    <div className="dgcc-desk">
      <aside className="dgcc-side">
        <div className="dgcc-side__brand">
          <Logo />
          <span className="dgcc-side__cc">Command Center</span>
        </div>
        <p className="dgcc-side__asof">Figures as of {D.asOf}</p>
        <ul className="dgcc-nav">
          {NAV.map((n, i) => (
            <li key={n.label} className={i === 0 ? "dgcc-nav__item dgcc-nav__item--on" : "dgcc-nav__item"}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
              {n.badge ? <em>{n.badge}</em> : null}
            </li>
          ))}
        </ul>
      </aside>

      <div className="dgcc-main">
        <div className="dgcc-head">
          <div>
            <p className="dgcc-head__title">Dashboard</p>
            <p className="dgcc-head__sub">What the partner network is doing. Days are Central time.</p>
          </div>
          <div className="dgcc-head__right">
            <span>Figures as of {D.asOf}</span>
            <span className="dgcc-btn">Refresh</span>
          </div>
        </div>

        <div className="dgcc-attn" data-focus="attention">
          <span>{D.needingReview} partners need display review</span>
          <span className="dgcc-btn dgcc-btn--go">Review</span>
        </div>

        <div className="dgcc-stats" data-focus="stats">
          <div className="dgcc-stat">
            <span className="dgcc-stat__k">Partners active</span>
            <span className="dgcc-stat__v">{s.partnersActive}</span>
            <span className="dgcc-stat__s">With a display {s.withDisplay}</span>
            <span className="dgcc-stat__s">Needing review {D.needingReview}</span>
          </div>
          <div className="dgcc-stat">
            <span className="dgcc-stat__k">Displays assigned</span>
            <span className="dgcc-stat__v">{s.displaysAssigned}</span>
            <span className="dgcc-stat__s">At partner courses</span>
          </div>
          <div className="dgcc-stat dgcc-stat--live">
            <span className="dgcc-stat__k">Scans today</span>
            <ScansToday className="dgcc-stat__v" />
            <span className="dgcc-stat__s">7 days {s.scans7 + 1}</span>
            <span className="dgcc-stat__s">30 days {s.scans30 + 1}</span>
          </div>
          <div className="dgcc-stat">
            <span className="dgcc-stat__k">Unique visitors, 30 days</span>
            <span className="dgcc-stat__v">{s.visitors30}</span>
          </div>
          <div className="dgcc-stat">
            <span className="dgcc-stat__k">Leads, 30 days</span>
            <span className="dgcc-stat__v">{s.leads30}</span>
            <span className="dgcc-stat__s">7 days {s.leads7}</span>
          </div>
          <div className="dgcc-stat">
            <span className="dgcc-stat__k">Buy clicks, 30 days</span>
            <span className="dgcc-stat__v">{s.buyClicks30}</span>
            <span className="dgcc-stat__s">7 days {s.buyClicks7}</span>
          </div>
        </div>

        <div className="dgcc-lower">
          <div className="dgcc-card dgcc-chart">
            <p className="dgcc-card__title">Last 30 days</p>
            <p className="dgcc-chart__k">Scans per day</p>
            <Bars series={D.scansPerDay} live />
            <div className="dgcc-chart__axis">
              <span>Oct 2</span>
              <span>Oct 9</span>
              <span>Oct 16</span>
              <span>Oct 23</span>
              <span>Oct 30</span>
            </div>
            <p className="dgcc-chart__k">Leads per day</p>
            <Bars series={D.leadsPerDay} lead />
          </div>
          <div className="dgcc-card dgcc-feed" data-focus="feed">
            <p className="dgcc-card__title">
              Live feed <small>Refreshes every 15 seconds.</small>
            </p>
            <ul>
              {dufferFeed.slice(0, 5).map((r, i) => (
                <FeedItem key={r.time} r={r} fresh={i === 0} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Phone() {
  const s = D.stats;
  return (
    <div className="dgcc-phone">
      <div className="dgcc-phone__bar">
        <Logo />
        <span>Sign out</span>
      </div>
      <div className="dgcc-phone__body">
        <div className="dgcc-attn dgcc-attn--phone" data-focus="attention">
          <span>{D.needingReview} partners need display review</span>
          <span className="dgcc-btn dgcc-btn--go">Review</span>
        </div>
        <p className="dgcc-phone__k">Scans today</p>
        <ScansToday className="dgcc-phone__big" />
        <p className="dgcc-phone__k">Network</p>
        <ul className="dgcc-phone__list" data-focus="stats">
          <li><span>Scans, 7 days</span><b>{s.scans7 + 1}</b></li>
          <li><span>Scans, 30 days</span><b>{s.scans30 + 1}</b></li>
          <li><span>Visitors, 30 days</span><b>{s.visitors30}</b></li>
          <li><span>Leads, 7 / 30 days</span><b>{s.leads7} / {s.leads30}</b></li>
        </ul>
        <p className="dgcc-phone__k">Live feed</p>
        <ul className="dgcc-feed dgcc-feed--phone" data-focus="feed">
          {dufferFeed.slice(0, 2).map((r, i) => (
            <FeedItem key={r.time} r={r} fresh={i === 0} />
          ))}
        </ul>
      </div>
      <div className="dgcc-phone__tabs">
        {(["grid", "flag", "receipt", "coins"] as const).map((k, i) => (
          <span key={k} className={i === 0 ? "dgcc-phone__tab dgcc-phone__tab--on" : "dgcc-phone__tab"}>
            <Icon name={k} />
            {["Dashboard", "Partners", "Orders", "Commissions"][i]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DufferCommandCenter() {
  return (
    <div className="dgcc" aria-hidden="true">
      <Desk />
      <Phone />
    </div>
  );
}
