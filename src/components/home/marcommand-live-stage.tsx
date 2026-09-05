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
 *    "End state" includes what is NOT on screen. In the end state the room is
 *    open, so the whole HUB LAYER — the pad, the five unlit cards, all six
 *    spokes, the live rail and (portrait) the pad's link to the trunk — ships
 *    at `opacity: 0`. Shipping any of it visible superimposes the hub on the
 *    open room and produces text-on-text collisions at 390px; see the comment
 *    on ChannelCard for the measurements. The timeline's t=0
 *    `tl.set(hubLayer, { opacity: 1 })` winds all of it back for the animated
 *    path, so this is invisible to a visitor who gets the animation.
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

/**
 * Wide stage space. Matches the SVG viewBox exactly.
 *
 * The keyword tile sits further left than the brief's §2.3 (x 140 -> 100). It is
 * not a taste change: the bus's final run into the tile is the segment Elara
 * STANDS on at the keyword beat, and his drawn feet are 53 stage units wide at
 * 1440. With the tile's right edge at 340 that run was 20 units — he stood on a
 * stub. At 320 it was 55 units, which is only 2 units of tolerance and measured
 * FULLY_ON=false twice mid-walk. At 300 the run is 75 units and his feet sit
 * inside it with 11 units of margin on each side, through the whole walk.
 */
const WIDE: StageGeom = {
  w: 1200,
  h: 680,
  pad: { x: 600, y: 340, r: 52 },
  cardSize: 112,
  cardRadius: 22,
  logoPx: 54,
  capFont: 14,
  dial: { cy: 430, r: 46, arcR: 36, needleLen: 30, labelFont: 15, valueFont: 17 },
  tile: { x: 100, y: 350, w: 200, h: 195 },
  pill: { x: 120, w: 160, h: 30, font: 15 },
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
/* ---------------------------------------------------------------------------
   MOBILE geometry (rebuilt). Authored in viewBox units inside the 390/300
   slice band x 158..1042. Deliberately sparse: one ledge, one dial, one card.
   --------------------------------------------------------------------------- */
const M_LEDGE_Y = 580;
const M_PAD_X = 235;
const LEDGE_MOBILE = `M 210 ${M_LEDGE_Y} H 990`;

const MOBILE: StageGeom = {
  w: 884,
  h: 680,
  pad: { x: M_PAD_X, y: M_LEDGE_Y, r: 26 },
  cardSize: 150,
  cardRadius: 28,
  logoPx: 68,
  /* 34, not 44: at 44 the "Google Ads" caption is ~90px wide on screen and ran
     into the robot, who is 64.5px wide and standing right beside the card. */
  capFont: 34,
  /* 44/50 rather than the narrow sheet's 16/19: at 390px the stage renders at
     0.348 px per unit, so a 44-unit label is ~15px on screen. */
  dial: { cy: 300, r: 82, arcR: 64, needleLen: 52, labelFont: 44, valueFont: 50 },
  tile: { x: 0, y: 0, w: 0, h: 0 },
  pill: { x: 0, w: 0, h: 0, font: 0 },
};

/** ONE dial. Its before/after is BUDGET, which the timeline already drives. */
const DIALS_MOBILE: Dial[] = [
  /* x=300, not 365. The label and value sit BELOW the knob and are ~85px wide
     on screen; at 365 they ran under the robot's body when he stood at the
     dial — invisible at 390 because he is mid-walk at that moment, obvious at
     320 dark where he has already arrived. Caught in a screenshot, not a probe. */
  { id: "budget", x: 300, label: "Daily budget", value: "$2,850", v: 0.63 },
];

/** ONE card, the one he touches. */
/* Pushed up and right so the card and its caption clear the robot's box
   entirely: he spans x 136..200 on screen, the caption now spans 226..291. */
const CARD_MOBILE: Channel = { id: "google_ads", name: "Google Ads", x: 900, y: 175 };

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
  /*
    THE GOOGLE ADS SPOKE LEAVES THE PAD'S RIGHT RIM, NOT ITS TOP.

    It used to be `M600,288 V220 H964 V176` — it shared the Instagram card's
    trunk up the pad's top rim and then ran right along y=220. That rail is the
    one Elara walks in on and home again, and the consequence, measured on the
    built page, was that he stood UNDER the Instagram card for the whole of the
    corner: the sprite is anchored by its FEET and is 126.3 stage units tall at
    a 1440px viewport, so feet on y=220 puts his head at y=94 — through the
    Instagram card face (y 64..176) and straight over its caption (y 185..201).
    Worst frame measured 100.0% of the "Instagram" caption covered, at
    (600,220) on walk1 and again on walk5, both with the card at opacity 1.

    Lowering the y=220 run could not fix it. To clear a caption whose glyph box
    ends at y=201 his feet have to be below y=327, and a horizontal run at y=327
    from x=600 would cut straight through the pad (x 548..652, y 288..392),
    which ADR-0018 forbids.

    So the rail moves sideways instead of downwards. It now leaves the pad at
    the SAME rim point as the Local Services spoke (652,340) — they are
    collinear as far as x=800, exactly as facebook/tiktok already share
    `M548,340 H180` — climbs in the clear channel between the Instagram card
    (right edge x=656) and the Google Ads card (left edge x=964), and only then
    runs right along y=220 to the card. Nothing is above x=800, so his head has
    bare canvas the whole way up.

    Rim usage is more symmetric than it was, not less: top = Instagram,
    left = Facebook + TikTok, right = Google Ads + Local Services,
    bottom = direct mail.

    The 800 is not arbitrary. His half-width is ~52 units at 1440, so the
    climb needs an x with 52 units of clearance on both sides: the channel is
    656..964, its centre is 810, and 800 keeps him off the Google Ads caption
    (glyph box x 981..1059) as he arrives. If you move this, move
    W_RAILH / W_RAILV with it and re-run the occlusion probe.
  */
  google_ads: "M652,340 H800 V220 H964 V176",
  tiktok: "M548,340 H180 V504",
  direct_mail: "M600,392 V504",
  google_lsa: "M652,340 H1020 V504",
};

const SPOKES_NARROW: Record<string, string> = {
  facebook: "M153,310 V90 H137",
  instagram: "M237,310 V90 H253",
  google_ads: "M195,310 H137",
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
const BUS_WIDE = "M964,176 V220 H900 V270 H375 V470 H300";
const RISERS_WIDE = [
  "M375,442 H435",
  "M570,270 V442 H615",
  "M750,270 V442 H795",
  "M890,270 V442 H975",
];

/**
 * Narrow wiring, re-derived for the shifted dial row. Side entries land at
 * cx - sqrt(38^2 - 12^2) = cx - 36.06, i.e. x = 70 / 166 / 262 at y = cy + 12 = 312,
 * and the two dial risers drop in the GUTTERS at x = 154 and 250 (ADR-0018 dec 1).
 * The bus's final run, y=312 from x=40 to x=70, is the segment Elara stands on at
 * x=45 — so he is on a line, at the elbow, with the wire continuing into the dial
 * his hand enters.
 */
/*
  THE TRUNK SITS AT y=240, NOT y=200.

  y=200 left only 63 units between the lifted Google Ads card's caption (glyph
  box y 122..137 once the card is at (195,70)) and the run Elara walks along.
  He is anchored by his FEET and stands 73.4 stage units tall at a 390px
  viewport, so feet on y=200 put his head at y=127 and his shoulders through
  that caption on walk3, walk4 AND walk5 — measured worst frame 58.0% of
  "Google Ads" covered, and unlike the hub cards this one is lit and on screen
  for the whole room sequence, so it recurred three times a loop.

  240 is bounded on both sides and both bounds were checked:
    - ABOVE: clear of the lifted caption by 29.6u at 390px and still 12u at a
      320px viewport, where the sprite grows to ~91u tall.
    - BELOW: the dial faces start at y=262 (cy 300, r 38), so the run and its
      risers must stay above that. 240 clears by 22u.
    - The pad's top rim is y=268, so the trunk still passes above the pad
      rather than through it (ADR-0018).
  The risers still drop in the GUTTERS at x=154 and x=250 between the dial
  columns (faces 68..144, 164..240, 260..336) and still enter each dial on its
  side at cy+12 = 312. Only the y they start from changed.
*/
const BUS_NARROW = "M195,112 H110 V240 H375 V470 H340";
const RISERS_NARROW = ["M110,240 H28 V312 H70", "M154,240 V312 H166", "M250,240 V312 H262"];

/**
 * The hub link. It is HUB furniture, not room wiring: it joins the pad's top rim
 * to the room trunk so Elara has a continuous orthogonal route off the pad, and it
 * fades with the pad. Both of its ends are real objects while it is drawn.
 */
const HUB_LINK_NARROW = "M195,268 V240";

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
      /*
        M2. The five UNLIT cards ship at opacity 0, the same way the pad does
        and for the same reason: the shipped markup is the END state (§6), and
        in the end state the room is open and the hub has been faded out. They
        used to ship at opacity 1, which meant the one composition nobody ever
        animates into place — the still kept by prefers-reduced-motion visitors,
        by saveData visitors, and by anyone whose GSAP chunk fails — was the hub
        and the open room printed ON TOP OF EACH OTHER. Measured in that state
        at 390px, in both themes: "TikTok" over "25 mi" 252px (48.3% of the
        smaller glyph box) and "TikTok" over "Radius" 194px (37.3%). At 1440
        there was no text collision but all six cards still sat over the room
        with five spokes hanging down into the wiring, which reads as a double
        exposure rather than a diagram.

        Nothing about the animated path changes: the timeline's t=0 already does
        `tl.set(hubLayer, { opacity: 1 })`, so the "before" state winds these
        straight back up before the first frame is shown. The condition is tied
        to `lit` on purpose — `hubFurniture` in marcommand-live.tsx is exactly
        `cards.filter(c => c !== litCard)`, so the two sets cannot drift apart.
      */
      style={lit ? undefined : { opacity: 0 }}
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
  labelAbove = false,
  dial,
  geom,
  variant,
}: {
  dial: Dial;
  geom: DialGeom;
  /* Mobile puts the readout ABOVE the knob. Below it, the text sits at y 434 and
     490, and the sprite — 78 fixed CSS px, which is 272 viewBox units tall at a
     320px viewport — spans y 308..580, so he walked straight through it. Measured
     92% occlusion of the readout mid-walk at 320. Above the knob he cannot reach
     it: his head tops out at y=308. */
  labelAbove?: boolean;
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
      <text
        className="mc-dial__label"
        x={dial.x}
        y={labelAbove ? cy - r - labelFont - valueFont - 16 : cy + r + labelFont + 8}
        fontSize={labelFont}
      >
        {dial.label}
      </text>
      <text
        className="mc-dial__value"
        data-mc-value={`${variant}-${dial.id}`}
        x={dial.x}
        y={labelAbove ? cy - r - valueFont - 8 : cy + r + labelFont + valueFont + 14}
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
        {/* Hub furniture, so it ships hidden with the rest of the hub layer (M2). */}
        {CARDS_WIDE.map((c) => (
          <path
            key={`sw-${c.id}`}
            className="mc-rail"
            data-mc-spoke={`wide-${c.id}`}
            d={SPOKES_WIDE[c.id]}
            style={{ opacity: 0 }}
          />
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
          style={{ opacity: 0 }}
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
      {/*
        ---- MOBILE (rebuilt) --------------------------------------------------
        NOT the desktop schematic re-packed. The portrait version of the wiring
        diagram was the thing the client rejected: six cards, four gauges, a bus
        and risers inside 390px is unreadable at any height, and the "overlapping
        lines" were the symptom of that density rather than bad routing.

        This is the robot and ONE control. He stands on a console ledge with the
        Daily budget dial on his left and the Google Ads card on his right, and
        that is the whole surface. The outcome figures live below the stage as
        real DOM text, not SVG, so they cost no aspect-ratio height and are
        selectable and screen-reader-native.

        Authored directly in viewBox units — no NARROW_TRANSFORM. At
        aspect-ratio 390/300 the `slice` crop shows x 158..1042 (884 units) by
        the full 0..680, so everything below sits inside that band.
      */}
      <g className="mc-stage__narrow">
        {/* The ledge he walks on. He is never off this line. */}
        <path className="mc-wire" data-mc-wire="narrow-ledge" d={LEDGE_MOBILE}
          pathLength={100} strokeDasharray={100} strokeDashoffset={0} />

        {/* Kept so the timeline's hub queries resolve; it is his entry mark. */}
        <g className="mc-pad" data-mc-pad="narrow" style={{ opacity: 0 }}>
          <circle className="mc-pad__fill" cx={M_PAD_X} cy={M_LEDGE_Y} r={26} />
        </g>

        <path className="mc-rail mc-rail--live" data-mc-liverail="narrow"
          d={LEDGE_MOBILE} pathLength={100} strokeDasharray={100}
          strokeDashoffset={0} style={{ opacity: 0 }} />

        <g data-mc-room="narrow" />

        {DIALS_MOBILE.map((d) => (
          <DialGroup
            key={`dm-${d.id}`}
            dial={d}
            geom={MOBILE.dial}
            variant="narrow"
            labelAbove
          />
        ))}

        <ChannelCard
          channel={CARD_MOBILE}
          size={MOBILE.cardSize}
          radius={MOBILE.cardRadius}
          logoPx={MOBILE.logoPx}
          capFont={MOBILE.capFont}
          lit
          variant="narrow"
        />
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
    /* (600, 340) — dead centre of the pad, on the spoke line. */
    pad: { x: "50%", y: "50%" },
    /* (932, 220) — on the hub rail's y=220 run, arm up-right into the card. */
    tap: { x: "77.6667%", y: "32.3529%" },
    /* (400, 442) — mid-way along the budget dial's 55u entry leg. */
    dial: { x: "33.75%", y: "65%" },
    /* (355, 470) — on the bus's 60u tile run, facing left into the tile. */
    keys: { x: "28.125%", y: "69.1176%" },
    /* Desktop closes at the identical coordinate it opened from (§2.5 beat 11). */
    closeTap: { x: "77.6667%", y: "32.3529%" },
  },
  narrow: {
    /* All feet-on-the-ledge; see the MOBILE waypoint note for the mapping. */
    pad: { x: "8.7104%", y: "85.2941%" },
    tap: { x: "54.5249%", y: "85.2941%" },
    dial: { x: "47.7376%", y: "85.2941%" },
    keys: { x: "47.7376%", y: "85.2941%" },
    closeTap: { x: "54.5249%", y: "85.2941%" },
  },
};

/** A standing spot, expressed as a percentage of the STAGE BOX. */
type Waypoint = { x: string; y: string };

const W_PAD: Waypoint = { x: "50%", y: "50%" };            /* (600,340) pad centre   */
/*
  The two waypoints that replace the old W_RAILCORNER at (600,220). He now
  crosses the pad to its right rim and climbs in the open channel at x=800
  rather than rising through the Instagram card — see SPOKES_WIDE.google_ads
  for the measurement that forced it. x=600..652 of the first leg is the pad
  disc itself and x=652..800 is the new spoke, so he is on a drawn object for
  every instant of it.
*/
const W_RAILH: Waypoint = { x: "66.6667%", y: "50%" };      /* (800,340) rail elbow   */
const W_RAILV: Waypoint = { x: "66.6667%", y: "32.3529%" }; /* (800,220) rail elbow   */
const W_TAP: Waypoint = { x: "77.6667%", y: "32.3529%" };   /* (932,220) hub rail + bus */
const W_BUSTOP: Waypoint = { x: "75%", y: "32.3529%" };     /* (900,220) bus elbow    */
const W_TRUNKR: Waypoint = { x: "75%", y: "39.7059%" };     /* (900,270) trunk right  */
const W_TRUNKL: Waypoint = { x: "31.25%", y: "39.7059%" };  /* (375,270) trunk left   */
const W_DROP: Waypoint = { x: "31.25%", y: "65%" };         /* (375,442) riser-0 tee  */
const W_DIAL: Waypoint = { x: "33.75%", y: "65%" };         /* (405,442) at the dial  */
const W_TILEL: Waypoint = { x: "31.25%", y: "69.1176%" };   /* (375,470) bus elbow    */
const W_KEYS: Waypoint = { x: "28.125%", y: "69.1176%" };   /* (337.5,470) at the tile*/

/* ---- MOBILE waypoints. He walks one ledge, so there are three marks, not
   twelve. Percentages are of the STAGE BOX: at aspect 390/300 the slice band is
   viewBox x 158..1042 (884u) by y 0..680, so boxX% = (x-158)/884 and
   boxY% = y/680. Ledge y=520 -> 76.4706%. ---- */
const N_PAD: Waypoint = { x: "8.7104%", y: "85.2941%" };   /* (235,580) enters left */
const N_DIAL: Waypoint = { x: "47.7376%", y: "85.2941%" }; /* (580,580) at the dial */
const N_TAP: Waypoint = { x: "54.5249%", y: "85.2941%" };  /* (640,580) at the card */

export const ROUTES = {
  wide: {
    /* pad -> across to the rim -> up the clear channel -> along y=220 to the card */
    walk1: [W_PAD, W_RAILH, W_RAILV, W_TAP],
    /* card -> bus jog -> down -> trunk -> down -> into the budget dial */
    walk2: [W_TAP, W_BUSTOP, W_TRUNKR, W_TRUNKL, W_DROP, W_DIAL],
    /* dial -> back to the bus tee -> down -> along the tile run */
    walk3: [W_DIAL, W_DROP, W_TILEL, W_KEYS],
    /* tile -> back up the bus to the card */
    walk4: [W_KEYS, W_TILEL, W_TRUNKL, W_TRUNKR, W_BUSTOP, W_TAP],
    /* card -> home down the hub rail, retraced */
    walk5: [W_TAP, W_RAILV, W_RAILH, W_PAD],
  },
  narrow: {
    /* One ledge, three stops: in -> card -> dial -> card -> out. Same beat
       structure as wide, so the timeline needs no mobile-specific branch. */
    walk1: [N_PAD, N_TAP],
    walk2: [N_TAP, N_DIAL],
    /* No keyword tile on mobile: this leg is zero-length and walk() skips it. */
    walk3: [N_DIAL, N_DIAL],
    walk4: [N_DIAL, N_TAP],
    walk5: [N_TAP, N_PAD],
  },
} as const;

/** Sprite sheet frame indices. Sheet order is idle, reach, grip-a, grip-b. */
export const FRAME = { idle: 0, reach: 1, gripA: 2, gripB: 3 } as const;

/** Gauge helpers, shared with the timeline. */
export const DIAL_MATH = { arcDash, needleAngle };

/** The Daily budget dial's before/after readings (§2.5 beat 6). */
export const BUDGET = { from: 2400, to: 2850, vFrom: 0.42, vTo: 0.63 } as const;
