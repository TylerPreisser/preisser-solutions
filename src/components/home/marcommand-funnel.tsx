/**
 * MarCommand funnel band — presentational only. No animation, no state, no
 * effects. `marcommand-live.tsx` owns the timeline and drives the ribbons.
 *
 * WHY THIS EXISTS
 * The MarCommand product's live surface has two halves: the acquisition funnel
 * (`src/ui/app/views/live/FunnelZone.jsx` in the marcommand-main repo) and the
 * agent's own stage. The homepage section shipped only the second half. This is
 * the first half, reduced to the part that reads at a glance.
 *
 * WHAT IS FAITHFUL TO THE SOURCE, AND WHERE IT CAME FROM
 *  - ADR-0010 decision 1: the funnel ends in the CLIENT — a glowing disc that
 *    every ribbon flows into. No triangular tip.
 *  - ADR-0010 decision 2: no stage icons on the ribbons. Nothing decorative
 *    sits on a ribbon.
 *  - ADR-0010 decision 4: legend names are SHORT and never truncated — PPC for
 *    Google Ads, LSA for Local Services, Mail for direct mail, FB, IG, TikTok.
 *  - The five stages and their order are verbatim from `FUNNEL_STAGES` in
 *    marcommand-main `src/ui/live/live.ts:201-217`: Reached, Visited,
 *    Interested, Leads, Validated.
 *  - ADR-0010 decision 3, "the funnel filters by channel": on the real product
 *    that is a click filter. A marketing section has nothing to click, so the
 *    filter is shown in its resting state — the PPC ribbon carries the accent
 *    and the other five are muted, matching the lit Google Ads card on the
 *    stage below. The two halves are showing the same channel at the same time.
 *
 * DELIBERATE DIVERGENCE, FLAGGED
 * ADR-0010 decision 1 says the tip carries the client's own mark, or its
 * initial when it has none. There is no client here — the visitor is the
 * client — so the disc is unlettered and captioned "Your business". Putting a
 * real tenant's logo on a marketing page would be exactly the thing that rule
 * forbids ("never another client's logo").
 *
 * The counts are demonstration figures and the visually-hidden text alternative
 * in `marcommand-live.tsx` says so, which is a truthfulness requirement (§7),
 * not a politeness one.
 *
 * The band ships in its END state, like the stage: every ribbon drawn, every
 * bar at full size, every count final. A reduced-motion visitor, a saveData
 * visitor or anyone whose GSAP chunk fails gets a complete, readable funnel and
 * simply never has it disturbed.
 */

/* ============================================================
   Shared content
   ============================================================ */

/** ADR-0010 decision 4 — short names, from one map, never truncated. */
const CHANNELS = [
  { id: "facebook", short: "FB" },
  { id: "instagram", short: "IG" },
  { id: "google_ads", short: "PPC" },
  { id: "tiktok", short: "TikTok" },
  { id: "direct_mail", short: "Mail" },
  { id: "google_lsa", short: "LSA" },
] as const;

/**
 * marcommand-main `src/ui/live/live.ts:201-217`. Order and labels are the
 * product's, not invented. Counts are a demonstration.
 */
const STAGES = [
  { id: "reached", label: "Reached", count: "128,400", bar: 96 },
  { id: "visited", label: "Visited", count: "9,240", bar: 74 },
  { id: "interested", label: "Interested", count: "2,180", bar: 56 },
  { id: "leads", label: "Leads", count: "486", bar: 40 },
  { id: "validated", label: "Validated", count: "173", bar: 26 },
] as const;

/* ============================================================
   Geometry

   Same discipline as the stage: ONE viewBox that never changes,
   `preserveAspectRatio="xMidYMid slice"`, and a narrow group
   authored in its own coordinate system and dropped into the
   crop by a single transform. No JS decides what renders.

   Wide   1200 x 240, wrapper aspect-ratio 1200/240 -> slice and
          meet coincide, nothing is cropped.
   Narrow wrapper aspect-ratio becomes 390/400, so slice crops to
          the middle 240 * 390/400 = 234 units, full height.
          390 * 0.6 = 234 and 400 * 0.6 = 240, so the local space
          fills the crop exactly. Offset x = (1200 - 234) / 2 = 483.

          Note the local box getting TALLER does not shrink the type:
          the CSS box grows with it (aspect-ratio tracks the same
          390/400), so a 17-unit glyph still lands at 13.4 CSS px at
          a 390px viewport. Measured, not assumed.
   ============================================================ */
const NARROW_FUNNEL_TRANSFORM = "translate(483 0) scale(0.6)";

/* ---- wide ---- */
const W_DOT_X = 150;
const W_DOT_Y = [30, 64, 98, 132, 166, 200];
const W_TIP = { x: 330, y: 120, r: 26 };
/** Column centres: 5 columns of 148 starting at 420. */
const W_COL = [494, 642, 790, 938, 1086];
const W_BAR_W = 120;
const W_AXIS = 120;

/* ---- narrow: two rows of three channels, then five stacked rows ---- */
const N_DOT = [
  { x: 60, y: 38 },
  { x: 195, y: 38 },
  { x: 330, y: 38 },
  { x: 60, y: 102 },
  { x: 195, y: 102 },
  { x: 330, y: 102 },
];
const N_TIP = { x: 195, y: 186, r: 26 };
const N_ROW_Y = [270, 298, 326, 354, 382];
/**
 * Portrait row: LABEL | tapering track | COUNT, three separate lanes.
 *
 * The label sits OUTSIDE the track, at x=45, because the first attempt drew it
 * inside and "Interested" (about 78 units at 17px) is wider than the last two
 * tracks — the word ran out past the bar and the outcome bar's accent stroke cut
 * through it. Lanes: label 45..~125, track 140..max 295, count right-aligned at
 * 380 so "128,400" (about 62 units) lands at 318..380, clear of the longest
 * track. Every number here was measured on the built page at 390px.
 */
const N_ROW_X = 140;
const N_LABEL_X = 45;
const N_COUNT_X = 380;
const N_ROW_W = [155, 119, 90, 64, 42];

/**
 * A ribbon. Quadratic, so it is one curve with one control point and no
 * inflection — the same read as the product's measured ribbons without the
 * live-DOM layout pass those need.
 */
function ribbon(fromX: number, fromY: number, tip: { x: number; y: number; r: number }) {
  const toX = tip.x - tip.r;
  return `M${fromX},${fromY} Q${(fromX + toX) / 2 + 30},${fromY} ${toX},${tip.y}`;
}

function Ribbons({
  variant,
  points,
  tip,
}: {
  variant: "wide" | "narrow";
  points: readonly { x: number; y: number }[];
  tip: { x: number; y: number; r: number };
}) {
  return (
    <g className="mc-fn__ribbons">
      {CHANNELS.map((c, i) => (
        <path
          key={`${variant}-rb-${c.id}`}
          className={`mc-fn__ribbon${c.id === "google_ads" ? " mc-fn__ribbon--live" : ""}`}
          data-mc-ribbon={`${variant}-${c.id}`}
          d={ribbon(points[i].x, points[i].y, tip)}
        />
      ))}
    </g>
  );
}

function Tip({
  tip,
  font,
  capY,
}: {
  tip: { x: number; y: number; r: number };
  font: number;
  /* Explicit, not derived from the radius: the ribbons converge just above the
     disc, so a caption placed a fixed gap below it lands ON them at desktop and
     inside the first stage row at portrait. Both were measured on the built
     page before this became a parameter. */
  capY: number;
}) {
  return (
    <g className="mc-fn__tip">
      {/* The glow is a second, wider ring rather than a filter: a filter would
          be a per-frame composite on a 15s loop, which ADR-0015 decision 1 and
          the mobile budget both rule out. */}
      <circle className="mc-fn__tip-glow" cx={tip.x} cy={tip.y} r={tip.r + 8} />
      <circle className="mc-fn__tip-disc" cx={tip.x} cy={tip.y} r={tip.r} />
      <text
        className="mc-fn__tip-cap"
        x={tip.x}
        y={capY}
        fontSize={font}
      >
        Your business
      </text>
    </g>
  );
}

export function MarCommandFunnel() {
  return (
    <svg
      className="mc-fn__svg"
      viewBox="0 0 1200 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      {/* ---------------- WIDE ---------------- */}
      <g className="mc-fn__wide">
        <Ribbons
          variant="wide"
          points={W_DOT_Y.map((y) => ({ x: W_DOT_X, y }))}
          tip={W_TIP}
        />

        {CHANNELS.map((c, i) => (
          <g key={`wd-${c.id}`}>
            <circle
              className={`mc-fn__dot${c.id === "google_ads" ? " mc-fn__dot--live" : ""}`}
              cx={W_DOT_X}
              cy={W_DOT_Y[i]}
              r={9}
            />
            <text
              className="mc-fn__dot-cap"
              x={W_DOT_X - 18}
              y={W_DOT_Y[i] + 5}
              fontSize={14}
              textAnchor="end"
            >
              {c.short}
            </text>
          </g>
        ))}

        <Tip tip={W_TIP} font={14} capY={196} />

        {/* The spine every stage sits on. It starts at the client disc, so the
            five stages are visibly downstream of the funnel rather than a
            second, unrelated chart. */}
        <path
          className="mc-fn__spine"
          d={`M${W_TIP.x + W_TIP.r},${W_AXIS} H${W_COL[4] + W_BAR_W / 2}`}
        />

        {STAGES.map((s, i) => (
          <g className="mc-fn__stage" key={`ws-${s.id}`}>
            <rect
              className={`mc-fn__bar${i === STAGES.length - 1 ? " mc-fn__bar--out" : ""}`}
              x={W_COL[i] - W_BAR_W / 2}
              y={W_AXIS - s.bar / 2}
              width={W_BAR_W}
              height={s.bar}
              rx={8}
            />
            <text
              className="mc-fn__count"
              x={W_COL[i]}
              y={52}
              fontSize={22}
              textAnchor="middle"
            >
              {s.count}
            </text>
            <text
              className="mc-fn__label"
              x={W_COL[i]}
              y={200}
              fontSize={14}
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>

      {/* ---------------- NARROW ---------------- */}
      <g className="mc-fn__narrow" transform={NARROW_FUNNEL_TRANSFORM}>
        <Ribbons variant="narrow" points={N_DOT} tip={N_TIP} />

        {CHANNELS.map((c, i) => (
          <g key={`nd-${c.id}`}>
            <circle
              className={`mc-fn__dot${c.id === "google_ads" ? " mc-fn__dot--live" : ""}`}
              cx={N_DOT[i].x}
              cy={N_DOT[i].y}
              r={11}
            />
            <text
              className="mc-fn__dot-cap"
              x={N_DOT[i].x}
              y={N_DOT[i].y + 32}
              fontSize={18}
              textAnchor="middle"
            >
              {c.short}
            </text>
          </g>
        ))}

        <Tip tip={N_TIP} font={17} capY={246} />

        {/* Portrait stacks the stages as rows whose bar length carries the
            same proportions the wide bars' heights do. A five-column chart at
            390px would put every label under 12px, which §7 will not have. */}
        {STAGES.map((s, i) => (
          <g className="mc-fn__stage" key={`ns-${s.id}`}>
            <rect
              className={`mc-fn__bar${i === STAGES.length - 1 ? " mc-fn__bar--out" : ""}`}
              x={N_ROW_X}
              y={N_ROW_Y[i] - 11}
              width={N_ROW_W[i]}
              height={22}
              rx={6}
            />
            <text
              className="mc-fn__label"
              x={N_LABEL_X}
              y={N_ROW_Y[i] + 6}
              fontSize={17}
              textAnchor="start"
            >
              {s.label}
            </text>
            <text
              className="mc-fn__count"
              x={N_COUNT_X}
              y={N_ROW_Y[i] + 6}
              fontSize={17}
              textAnchor="end"
            >
              {s.count}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
