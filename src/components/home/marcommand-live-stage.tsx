/**
 * MarCommand live stage — presentational only. No animation, no state, no
 * effects. `marcommand-live.tsx` owns the timeline and drives this markup by
 * class and custom property.
 *
 * Two things about this file are load-bearing:
 *
 * 1. Everything ships in its END state (design brief §6). The Google Ads card
 *    is lit, every wire is drawn, all dials are up showing post-change values,
 *    `heat pump` is in the keyword list and Elara is at the Daily budget dial.
 *    The timeline's first act is to set the "before" state. A reduced-motion
 *    visitor, a saveData visitor, or anyone whose JS fails simply never has it
 *    disturbed — and there is no flash of the end-state on load.
 *
 * 2. One tree, two CSS-toggled groups (§3.2). `.mc-stage__wide` and
 *    `.mc-stage__narrow` are BOTH in the static export; a media query at 768px
 *    shows exactly one. No JS decides what renders, so there is no hydration
 *    branch by construction.
 *
 * The whole stage is decoration and is `aria-hidden`. The meaning lives in the
 * copy and in the visually-hidden text alternative in `marcommand-live.tsx`.
 */

/* ============================================================
   Geometry — design brief §2.3 (wide) and §3.3 (narrow).
   Hub coordinates are verbatim from the approved prototype at
   marcommand-main/src/ui/public/proto/elara/index.html:154-159.
   ============================================================ */

type DialGeom = {
  cy: number;
  r: number;
  arcR: number;
  needleLen: number;
  labelFont: number;
  valueFont: number;
};
type TileGeom = { x: number; y: number; w: number; h: number };
type PillGeom = { x: number; w: number; h: number; font: number };
type StageGeom = {
  w: number;
  h: number;
  pad: { x: number; y: number; r: number };
  cardSize: number;
  cardRadius: number;
  logoPx: number;
  capFont: number;
  dial: DialGeom;
  tile: TileGeom;
  pill: PillGeom;
};

/** Wide stage space. Matches the SVG viewBox exactly. */
const WIDE: StageGeom = {
  w: 1200,
  h: 680,
  pad: { x: 600, y: 340, r: 52 },
  cardSize: 112,
  cardRadius: 22,
  logoPx: 54,
  capFont: 14,
  dial: { cy: 430, r: 46, arcR: 36, needleLen: 30, labelFont: 15, valueFont: 17 },
  tile: { x: 140, y: 350, w: 200, h: 195 },
  pill: { x: 160, w: 160, h: 30, font: 15 },
};

/**
 * Narrow stage space, authored in its own 390x620 coordinate system and mapped
 * into the shared viewBox by ONE transform (see NARROW_TRANSFORM below).
 */
const NARROW: StageGeom = {
  w: 390,
  h: 620,
  pad: { x: 195, y: 310, r: 42 },
  cardSize: 84,
  cardRadius: 16,
  logoPx: 38,
  capFont: 15,
  dial: { cy: 300, r: 38, arcR: 29, needleLen: 24, labelFont: 16, valueFont: 19 },
  tile: { x: 40, y: 400, w: 300, h: 145 },
  pill: { x: 58, w: 264, h: 30, font: 17 },
};

/**
 * The SVG keeps ONE viewBox — `0 0 1200 680` — and never changes it, because
 * `viewBox` cannot be set from CSS and the brief forbids setting it from JS.
 *
 * `preserveAspectRatio="xMidYMid slice"` does the work instead:
 *  - Wide: the wrapper's aspect-ratio is exactly 1200/680, so `slice` and
 *    `meet` coincide and nothing is cropped at all.
 *  - Narrow: the wrapper's aspect-ratio becomes 390/620, so `slice` scales to
 *    cover and crops horizontally to the middle 680 * 390/620 = 427.742 units,
 *    i.e. x from 386.129 to 813.871, full height.
 *
 * So the narrow group is authored in a clean 390x620 space and dropped into
 * exactly that visible window. 620 * 1.0967742 = 680 and 390 * 1.0967742 =
 * 427.742 — the local space fills the crop precisely, with no letterboxing and
 * no JS.
 */
const NARROW_TRANSFORM = "translate(386.129 0) scale(1.0967742)";

type Channel = {
  id: string;
  name: string;
  x: number;
  y: number;
};

/** §2.3. Two rows of three. */
const CARDS_WIDE: Channel[] = [
  { id: "facebook", name: "Facebook", x: 180, y: 120 },
  { id: "instagram", name: "Instagram", x: 600, y: 120 },
  { id: "google_ads", name: "Google Ads", x: 1020, y: 120 },
  { id: "tiktok", name: "TikTok", x: 180, y: 560 },
  { id: "direct_mail", name: "Direct mail", x: 600, y: 560 },
  { id: "google_lsa", name: "Local Services", x: 1020, y: 560 },
];

/** §3.3. Two columns of three, pad between the middle pair. */
const CARDS_NARROW: Channel[] = [
  { id: "facebook", name: "Facebook", x: 95, y: 90 },
  { id: "instagram", name: "Instagram", x: 295, y: 90 },
  { id: "google_ads", name: "Google Ads", x: 95, y: 310 },
  { id: "tiktok", name: "TikTok", x: 295, y: 310 },
  { id: "direct_mail", name: "Direct mail", x: 95, y: 530 },
  { id: "google_lsa", name: "Local Services", x: 295, y: 530 },
];

/**
 * Hub spokes. Right-angled and elbowed, never diagonal, and no line ever cuts
 * through an object (ADR-0018). Each leaves the pad's rim and lands on a card
 * edge.
 */
const SPOKES_WIDE: Record<string, string> = {
  facebook: "M548,340 H180 V176",
  instagram: "M600,288 V176",
  google_ads: "M652,340 H890 V190 H964",
  tiktok: "M548,340 H180 V504",
  direct_mail: "M600,392 V504",
  google_lsa: "M652,340 H1020 V504",
};

const SPOKES_NARROW: Record<string, string> = {
  facebook: "M153,310 V90 H137",
  instagram: "M237,310 V90 H253",
  google_ads: "M153,310 H137",
  tiktok: "M237,310 H253",
  direct_mail: "M153,310 V530 H137",
  google_lsa: "M237,310 V530 H253",
};

/**
 * Room wiring. The trunk begins at the exact point Elara taps, so the wire
 * literally emerges from his hand — the tap causes the room (ADR-0016
 * decision 2), it is never opened on a timer.
 *
 * Risers drop in the GUTTERS between dial columns (x = 400, 570, 750, 930 wide)
 * and enter each dial on its SIDE at cy + 12, so his hand lands inside the dial
 * rather than over its rim (ADR-0018 decision 1). At cy + 12 on a radius-46
 * circle the rim is at cx - sqrt(46^2 - 12^2) = cx - 44.4, which is where each
 * riser terminates.
 */
const BUS_WIDE = "M964,190 V250 H380 V470 H340";
const RISERS_WIDE = [
  "M400,250 V442 H435",
  "M570,250 V442 H615",
  "M750,250 V442 H795",
  "M930,250 V442 H975",
];

/**
 * Narrow wiring, re-derived for the shifted dial row. Side entries land at
 * cx - sqrt(38^2 - 12^2) = cx - 36.06, i.e. x = 70 / 166 / 262 at y = cy + 12 = 312,
 * and the two dial risers drop in the GUTTERS at x = 154 and 250 (ADR-0018 dec 1).
 * The bus's final run, y=312 from x=40 to x=70, is the segment Elara stands on at
 * x=45 — so he is on a line, at the elbow, with the wire continuing into the dial
 * his hand enters.
 */
const BUS_NARROW = "M195,112 V200 H40 V312 H70";
const RISERS_NARROW = ["M195,200 H355 V470 H340", "M154,200 V312 H166", "M250,200 V312 H262"];

type Dial = {
  id: string;
  x: number;
  label: string;
  value: string;
  /** 0..1 of the gauge's 270-degree sweep. */
  v: number;
};

/**
 * Four dials, not eight (§2.3). All four are genuine Google Ads levers from the
 * MarCommand catalog — do not invent a lever (ADR-0015 decision 5). Values are
 * the POST-change readings, because this is the end state.
 */
const DIALS_WIDE: Dial[] = [
  { id: "budget", x: 480, label: "Daily budget", value: "$2,850", v: 0.63 },
  { id: "bidding", x: 660, label: "Bidding", value: "Maximize conversions", v: 0.55 },
  { id: "radius", x: 840, label: "Radius", value: "25 mi", v: 0.38 },
  { id: "schedule", x: 1020, label: "Ad schedule", value: "6am–9pm", v: 0.62 },
];

/**
 * Three dials on mobile (§3.4) — the fourth is cut, not shrunk.
 *
 * The row is shifted RIGHT of the brief's §3.3 centres (85/195/295 -> 106/202/298)
 * to open a standing lane on the left. Reason, measured: Elara is a fixed 48 CSS px
 * div, so his width in stage units GROWS as the stage shrinks — 60.4u at a 390px
 * viewport and 78.0u at 320px. The brief put the budget dial's face at x=47, leaving
 * a 47u lane he cannot fit in at any width, so he stood ON the dial he was turning
 * and covered 37% of its face at 390px (49% at 320px). No mark could fix that: to
 * clear the old face he would have needed his left edge at -13.4u, off-stage.
 *
 * With the face at 68u the same mark leaves the body clear and only the reaching arm
 * crossing the rim: 9% at 390px, 21% at 320px, touching at 768px. Elara's mark itself
 * is UNCHANGED at (45,312) — he was always correctly on the rail; the dial was too
 * close to the left edge.
 */
const DIALS_NARROW: Dial[] = [
  { id: "budget", x: 106, label: "Daily budget", value: "$2,850", v: 0.63 },
  { id: "bidding", x: 202, label: "Bidding", value: "Max conv.", v: 0.55 },
  { id: "radius", x: 298, label: "Radius", value: "25 mi", v: 0.38 },
];

/** The gauge sweeps 270 degrees, starting at the 7:30 position. */
const GAUGE_SWEEP = 270;
const GAUGE_START = 135;
const arcDash = (v: number) => (v * GAUGE_SWEEP) / 360 * 100;
const needleAngle = (v: number) => GAUGE_START + v * GAUGE_SWEEP;

/** Keyword pills. `duct cleaning` is the one that gets pocketed. */
const PILLS = [
  { id: "kw-1", text: "hvac repair" },
  { id: "kw-2", text: "furnace tune-up" },
];

/* ============================================================
   Brand marks
   Copied verbatim from the approved prototype
   (proto/elara/index.html:244-249). These carry literal brand
   hexes on purpose: a themed Facebook logo is a wrong Facebook
   logo. They are brand identity, not theme colour, and they live
   here in the markup rather than in marcommand-live.css, which
   stays token-only. The Local Services mark is the real Google
   Guaranteed shield, not an invented compliance badge
   (ADR-0015 decision 7).
   ============================================================ */
function ChannelLogo({ id }: { id: string }) {
  switch (id) {
    case "facebook":
      return (
        <>
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            fill="#fff"
            d="M13.4 23.9V14.6h3l.5-3.3h-3.5V9.3c0-1 .5-1.7 1.8-1.7H17V4.6c-.3 0-1.4-.2-2.7-.2-2.7 0-4.4 1.7-4.4 4.6v2.3H7v3.3h2.9v9.3z"
          />
        </>
      );
    case "instagram":
      return (
        <g fill="none" stroke="#E1306C" strokeWidth="2">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.4" />
          <circle cx="17.5" cy="6.5" r="1.3" fill="#E1306C" stroke="none" />
        </g>
      );
    case "google_ads":
      return (
        <>
          <path d="M6 17.2 12 6.8" stroke="#FBBC04" strokeWidth="6" strokeLinecap="round" />
          <path d="M12 6.8 18 17.2" stroke="#4285F4" strokeWidth="6" strokeLinecap="round" />
          <circle cx="6" cy="17.2" r="3" fill="#34A853" />
        </>
      );
    case "tiktok":
      return (
        <path
          d="M13 2h3.4a5.8 5.8 0 0 0 5.8 5.8v3.3a9 9 0 0 1-5.2-1.7v6.6a6.3 6.3 0 1 1-6.3-6.3c.35 0 .7.03 1.03.09v3.4a2.9 2.9 0 1 0 2.07 2.78z"
          fill="#000"
        />
      );
    case "direct_mail":
      return (
        <g fill="none" stroke="#28303A" strokeWidth="2" strokeLinejoin="round">
          <rect x="2.5" y="6.5" width="19" height="11" rx="1.5" />
          <path d="M3.2 7.4 12 13.4l8.8-6" />
        </g>
      );
    case "google_lsa":
      return (
        <>
          <path d="M12 2l8.5 3.2v6.3c0 5.3-3.6 9.1-8.5 10.5C7.1 20.6 3.5 16.8 3.5 11.5V5.2z" fill="#34A853" />
          <path
            d="M7.8 12.2l3 3 5.4-5.6"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      );
    default:
      return null;
  }
}

/* ============================================================
   Pieces
   ============================================================ */

function ChannelCard({
  channel,
  size,
  radius,
  logoPx,
  capFont,
  lit,
  variant,
}: {
  channel: Channel;
  size: number;
  radius: number;
  logoPx: number;
  capFont: number;
  lit: boolean;
  variant: "wide" | "narrow";
}) {
  const half = size / 2;
  const logoScale = logoPx / 24;
  return (
    <g
      className={`mc-card${lit ? " mc-card--lit" : ""}`}
      data-mc-card={`${variant}-${channel.id}`}
    >
      {/* No shadow, ever. ADR-0015 decision 1 is flat 2D, no depth. */}
      <rect
        className="mc-card__face"
        x={channel.x - half}
        y={channel.y - half}
        width={size}
        height={size}
        rx={radius}
      />
      <g
        transform={`translate(${channel.x - logoPx / 2} ${channel.y - logoPx / 2}) scale(${logoScale})`}
      >
        <ChannelLogo id={channel.id} />
      </g>
      <text
        className="mc-card__cap"
        x={channel.x}
        y={channel.y + half + capFont + 6}
        fontSize={capFont}
      >
        {channel.name}
      </text>
    </g>
  );
}

function DialGroup({
  dial,
  geom,
  variant,
}: {
  dial: Dial;
  geom: DialGeom;
  variant: "wide" | "narrow";
}) {
  const { cy, r, arcR, needleLen, labelFont, valueFont } = geom;
  return (
    <g className="mc-dial" data-mc-dial={`${variant}-${dial.id}`}>
      {/*
        The ring is the whole point. On the dark page the charcoal body is
        1.07:1 against the background — without an edge it reads as a hole
        rather than a dial (§4.2).
      */}
      <circle className="mc-dial__body" cx={dial.x} cy={cy} r={r} />
      <circle
        className="mc-dial__arc"
        data-mc-arc={`${variant}-${dial.id}`}
        cx={dial.x}
        cy={cy}
        r={arcR}
        pathLength={100}
        style={{ ["--mc-arc" as string]: arcDash(dial.v) }}
        transform={`rotate(135 ${dial.x} ${cy})`}
      />
      <line
        className="mc-dial__needle"
        data-mc-needle={`${variant}-${dial.id}`}
        x1={dial.x}
        y1={cy}
        x2={dial.x + needleLen}
        y2={cy}
        transform={`rotate(${needleAngle(dial.v)} ${dial.x} ${cy})`}
      />
      <text className="mc-dial__label" x={dial.x} y={cy + r + labelFont + 8} fontSize={labelFont}>
        {dial.label}
      </text>
      <text
        className="mc-dial__value"
        data-mc-value={`${variant}-${dial.id}`}
        x={dial.x}
        y={cy + r + labelFont + valueFont + 14}
        fontSize={valueFont}
      >
        {dial.value}
      </text>
    </g>
  );
}

function KeywordTile({
  tile,
  pill,
  variant,
}: {
  tile: TileGeom;
  pill: PillGeom;
  variant: "wide" | "narrow";
}) {
  const titleFont = variant === "wide" ? 14 : 16;
  const rowGap = pill.h + 10;
  const row0 = tile.y + titleFont + 18;
  return (
    <g className="mc-tile" data-mc-tile={variant}>
      <rect
        className="mc-tile__box"
        x={tile.x}
        y={tile.y}
        width={tile.w}
        height={tile.h}
        rx={12}
      />
      <text className="mc-tile__title" x={pill.x} y={tile.y + titleFont + 8} fontSize={titleFont}>
        KEYWORDS
      </text>

      {PILLS.map((p, i) => (
        <g className="mc-pill" key={p.id} data-mc-pill={`${variant}-${p.id}`}>
          <rect
            className="mc-pill__box"
            x={pill.x}
            y={row0 + i * rowGap}
            width={pill.w}
            height={pill.h}
            rx={pill.h / 2}
          />
          <text
            className="mc-pill__text"
            x={pill.x + 14}
            y={row0 + i * rowGap + pill.h / 2 + pill.font * 0.35}
            fontSize={pill.font}
          >
            {p.text}
          </text>
        </g>
      ))}

      {/*
        Slot 3 holds both pills stacked. `duct cleaning` is the one he pockets,
        so it ships at opacity 0 (the end state); `heat pump` ships visible and
        outlined. The timeline swaps them.
      */}
      <g
        className="mc-pill"
        data-mc-pill={`${variant}-kw-old`}
        style={{ opacity: 0 }}
      >
        <rect
          className="mc-pill__box"
          x={pill.x}
          y={row0 + 2 * rowGap}
          width={pill.w}
          height={pill.h}
          rx={pill.h / 2}
        />
        <text
          className="mc-pill__text"
          x={pill.x + 14}
          y={row0 + 2 * rowGap + pill.h / 2 + pill.font * 0.35}
          fontSize={pill.font}
        >
          duct cleaning
        </text>
      </g>

      <g className="mc-pill mc-pill--new" data-mc-pill={`${variant}-kw-new`}>
        <rect
          className="mc-pill__box"
          x={pill.x}
          y={row0 + 2 * rowGap}
          width={pill.w}
          height={pill.h}
          rx={pill.h / 2}
        />
        <text
          className="mc-pill__text"
          x={pill.x + 14}
          y={row0 + 2 * rowGap + pill.h / 2 + pill.font * 0.35}
          fontSize={pill.font}
        >
          heat pump
        </text>
      </g>
    </g>
  );
}

/* ============================================================
   Stage
   ============================================================ */

export function MarCommandLiveStage() {
  return (
    <svg
      className="mc-stage__svg"
      viewBox="0 0 1200 680"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      {/* ---------------- WIDE ---------------- */}
      <g className="mc-stage__wide">
        {/* Idle spokes */}
        {CARDS_WIDE.map((c) => (
          <path key={`sw-${c.id}`} className="mc-rail" d={SPOKES_WIDE[c.id]} />
        ))}

        {/* The Google Ads spoke, live. Identical path drawn on top and revealed
            by stroke-dashoffset, so "the rail recolours ahead of him" is a
            geometry reveal rather than a per-frame colour tween. */}
        <path
          className="mc-rail mc-rail--live"
          data-mc-liverail="wide"
          d={SPOKES_WIDE.google_ads}
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={0}
        />

        {/*
          Pad. It is HUB furniture, so it fades with the five unlit cards when
          the room opens and ships at opacity 0 because the end state (§6) is
          the room-open composition.

          This is a deliberate, measured divergence from §6, which lists the
          five unlit cards but never mentions the pad. Reason: the brief's own
          §3.3 coordinates put the narrow pad at (195,310) r=42 and the middle
          dial at (195,300) r=38 — centres 10u apart, so the dial sits almost
          concentrically INSIDE the pad and the pad's ring escapes as a grey
          halo around the Bidding dial in every portrait render. Fading the pad
          with the hub is the fix that needs no coordinate to move.
          (Wide does not collide — nearest centres are 108.17u apart vs a 98u
          radius sum — but the pad is hub furniture there too, and leaving one
          orphan circle floating in an opened room reads as an artifact.)
        */}
        <g className="mc-pad" data-mc-pad="wide" style={{ opacity: 0 }}>
          <circle className="mc-pad__fill" cx={WIDE.pad.x} cy={WIDE.pad.y} r={WIDE.pad.r} />
          <circle className="mc-pad__ring" cx={WIDE.pad.x} cy={WIDE.pad.y} r={WIDE.pad.r} />
        </g>

        {/* Room wiring */}
        <g data-mc-room="wide">
          <path
            className="mc-wire"
            data-mc-wire="wide-bus"
            d={BUS_WIDE}
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={0}
          />
          {RISERS_WIDE.map((d, i) => (
            <path
              key={`rw-${i}`}
              className="mc-wire"
              data-mc-wire={`wide-riser-${i}`}
              d={d}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={0}
            />
          ))}
        </g>

        {/* Channel cards */}
        {CARDS_WIDE.map((c) => (
          <ChannelCard
            key={`cw-${c.id}`}
            channel={c}
            size={WIDE.cardSize}
            radius={WIDE.cardRadius}
            logoPx={WIDE.logoPx}
            capFont={WIDE.capFont}
            lit={c.id === "google_ads"}
            variant="wide"
          />
        ))}

        {/* Controls */}
        <KeywordTile tile={WIDE.tile} pill={WIDE.pill} variant="wide" />
        {DIALS_WIDE.map((d) => (
          <DialGroup key={`dw-${d.id}`} dial={d} geom={WIDE.dial} variant="wide" />
        ))}
      </g>

      {/* ---------------- NARROW ---------------- */}
      <g className="mc-stage__narrow" transform={NARROW_TRANSFORM}>
        {CARDS_NARROW.map((c) => (
          <path key={`sn-${c.id}`} className="mc-rail" d={SPOKES_NARROW[c.id]} />
        ))}

        <path
          className="mc-rail mc-rail--live"
          data-mc-liverail="narrow"
          d={SPOKES_NARROW.google_ads}
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={0}
        />

        <g className="mc-pad" data-mc-pad="narrow" style={{ opacity: 0 }}>
          <circle className="mc-pad__fill" cx={NARROW.pad.x} cy={NARROW.pad.y} r={NARROW.pad.r} />
          <circle className="mc-pad__ring" cx={NARROW.pad.x} cy={NARROW.pad.y} r={NARROW.pad.r} />
        </g>

        <g data-mc-room="narrow">
          <path
            className="mc-wire"
            data-mc-wire="narrow-bus"
            d={BUS_NARROW}
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={0}
          />
          {RISERS_NARROW.map((d, i) => (
            <path
              key={`rn-${i}`}
              className="mc-wire"
              data-mc-wire={`narrow-riser-${i}`}
              d={d}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={0}
            />
          ))}
        </g>

        {/*
          Mobile-only divergence (§3.3): the lit card ships at (195, 70) rather
          than in its hub slot, because that IS the end state on portrait —
          leaving it in a corner wastes half the canvas. The timeline tweens it
          back down to the hub for the "before" state and then up again.
        */}
        {CARDS_NARROW.map((c) => {
          const lit = c.id === "google_ads";
          const moved = lit ? { x: 195, y: 70 } : c;
          return (
            <ChannelCard
              key={`cn-${c.id}`}
              channel={{ ...c, x: moved.x, y: moved.y }}
              size={NARROW.cardSize}
              radius={NARROW.cardRadius}
              logoPx={NARROW.logoPx}
              capFont={NARROW.capFont}
              lit={lit}
              variant="narrow"
            />
          );
        })}

        <KeywordTile tile={NARROW.tile} pill={NARROW.pill} variant="narrow" />
        {DIALS_NARROW.map((d) => (
          <DialGroup key={`dn-${d.id}`} dial={d} geom={NARROW.dial} variant="narrow" />
        ))}
      </g>
    </svg>
  );
}

/**
 * Elara's standing spots, as percentages of the stage box, feet-anchored.
 *
 * Exported for the timeline. They are percentages rather than pixels so they
 * track the fluid SVG through any container width without a resize listener,
 * and they are applied through `--mc-x` / `--mc-y` on a full-size anchor —
 * which means GSAP only ever writes custom properties, never `transform`,
 * `left` or `top` (…reposition.md:264).
 */
export const ELARA_MARKS = {
  wide: {
    /* (600, 352) — standing on the pad */
    pad: { x: "50%", y: "51.765%" },
    /* (930, 190) — beside the Google Ads card, arm into its left edge */
    tap: { x: "77.5%", y: "27.941%" },
    /* (415, 442) — on the riser, hand inside the Daily budget dial */
    dial: { x: "34.583%", y: "65%" },
    /* (380, 470) — at the keyword list's right edge, facing left */
    keys: { x: "31.667%", y: "69.118%" },
    /* Desktop closes at the identical coordinate it opened from (§2.5 beat 11). */
    closeTap: { x: "77.5%", y: "27.941%" },
  },
  narrow: {
    /* (195, 322) */
    pad: { x: "50%", y: "51.935%" },
    /* (160, 310) — beside the Google Ads card in its hub slot, facing left */
    tap: { x: "41.026%", y: "50%" },
    /*
      (45, 312) — on the bus's final run into the Daily budget dial, standing at
      the elbow with the reaching arm crossing the rim at x=68. UNCHANGED by the
      dial-row shift: the mark was always right, the dial was too close to the
      left edge. See DIALS_NARROW for the measurements.
    */
    dial: { x: "11.538%", y: "50.323%" },
    /* (355, 470) */
    keys: { x: "91.026%", y: "75.806%" },
    /*
      (140, 112) — beside the lit card AFTER it has tweened to (195, 70).
      The "identical coordinate" invariant is about the card's own frame: on
      portrait the card moves (a deliberate §3.3 divergence), so the tap point
      moves with it. He still closes it from exactly where he opened it
      relative to the card, and the card rides back down to the hub during the
      fold with him alongside.
    */
    closeTap: { x: "35.897%", y: "18.065%" },
  },
} as const;

/** Sprite sheet frame indices. Sheet order is idle, reach, grip-a, grip-b. */
export const FRAME = { idle: 0, reach: 1, gripA: 2, gripB: 3 } as const;

/** Gauge helpers, shared with the timeline. */
export const DIAL_MATH = { arcDash, needleAngle };

/** The Daily budget dial's before/after readings (§2.5 beat 6). */
export const BUDGET = { from: 2400, to: 2850, vFrom: 0.42, vTo: 0.63 } as const;
