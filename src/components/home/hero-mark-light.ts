/**
 * hero-mark-light.ts — the hero background.
 *
 * ONE copy of the Preisser mark, drawn very large and cropped by the frame,
 * held at a low opacity so it sits behind the type, with a narrow beam of the
 * brand blue travelling its outline.
 *
 * The previous version decomposed the mark into four magnified fragments and
 * composed them as abstract planes. It measured well and read as nothing —
 * you could not see the P. The ask was simpler than the implementation:
 * the logo, big, cropped, faded, recoloured, with light on its edge. This is
 * that, and nothing else.
 *
 * MARK_BODY / MARK_WEDGE are the literal pixel boundary of
 * public/images/ps-logo.webp, traced from its ink mask (re-filling the two
 * polygons reproduces the original at IoU 0.9937). The wedge is a separate
 * ink island — the piece the swoosh cuts free — so the two are filled with
 * "evenodd" to keep the counter open.
 *
 * Cost: the mark never moves, so it is painted ONCE into an offscreen plate.
 * Per frame the only work is restoring the plate over the rectangle the beam
 * last touched and stroking the beam again. The loop never touches the full
 * viewport.
 *
 * Narrow viewports animate too, but cheaper: a smaller backing store, half the
 * frame rate and fewer beam segments. The lap there is FASTER, not slower —
 * see BEAM_PERIOD_MS. Only prefers-reduced-motion parks the beam as a still
 * frame.
 */

type RGB = [number, number, number];

const MARK_BODY = [
121,116, 121,117, 123.3,118.7, 239.6,194.4, 315.2,242.8, 316,244, 537,244,
  552,243, 721,243, 729,244, 738,244, 738.3,244.7, 758,249, 772.4,257.6,
  782,266, 782,267, 785.3,271.7, 791,283, 793,296, 793,309, 792.3,309.3,
  791.4,316.4, 786.8,332.8, 779.3,348.3, 773,358, 773,359, 770.2,361.2,
  761.8,370.8, 751.8,378.8, 750,381, 749,381, 724,395, 705.4,400.4,
  693.4,403.4, 680.3,405.3, 680,406, 666,407, 561,407, 553,408, 543,408,
  542.7,408.7, 514.7,412.7, 497.6,416.6, 482,421, 480,421, 479.7,421.7,
  450.1,432.1, 427,442, 391,460, 390.2,461.2, 370.8,472.8, 345.6,489.6,
  323.7,505.7, 306.6,519.6, 305,520, 264.2,560.2, 251.8,574.8, 249,577,
  248.6,578.6, 235.7,594.7, 223.6,611.6, 208.8,633.8, 194.2,658.2, 193,659,
  190.3,665.3, 168.7,705.7, 150,746, 147,751, 146.6,753.6, 127.2,799.2,
  85,906, 90.3,903.3, 155.6,856.6, 300.4,755.4, 377.6,700.6, 381,699,
  384.3,694.3, 386.8,688.8, 410.2,626.2, 421,602, 422.2,601.2, 432.2,587.2,
  439.3,579.3, 458,564, 480,553, 497.7,546.7, 498,546, 513.7,542.7,
  533.7,539.7, 534,539, 543,539, 551,538, 744,538, 745.2,537.2, 766.1,535.1,
  781.4,532.4, 802.7,526.7, 825,519, 852.2,504.2, 865.4,495.4, 877.4,486.4,
  879,486, 906.8,458.8, 916.2,447.2, 919,445, 920.6,441.6, 935.2,421.2,
  952,391, 953,387, 962.9,363.9, 970.3,340.3, 971,340, 977.3,310.3, 979,298,
  980,288, 980,261, 979.3,260.7, 976.3,239.7, 973.4,228.6, 970.9,220.1,
  963,200, 961.8,199.2, 951.4,182.6, 944.8,174.2, 924,154, 920.6,152.4,
  909.3,144.7, 892,136, 874.9,129.1, 856.3,123.7, 856,123, 824.1,117.9,
  809.2,116.8, 808,116
];
const MARK_WEDGE = [
316,278, 273.2,386.2, 203,570, 204,570, 206.8,567.8, 213.8,560.8,
  242.2,529.2, 265,506, 266.6,505.6, 281.2,492.2, 301.7,475.7, 323.3,460.3,
  327,457, 331.2,455.2, 363.7,435.7, 411,412, 415.8,410.8, 445.1,399.1,
  462.3,393.3, 486.4,386.4, 502.6,382.6, 508,382, 513.2,368.2, 516,363,
  518.1,355.1, 543.9,287.9, 547,278
];

const BOX = 1024;                 // the mark's native coordinate box
const NARROW_MAX = 768;           // below this we use the narrow framing
const DPR_CAP = 1.5;
const DPR_CAP_NARROW = 1.25;      // fewer pixels to clear/blit per frame
/** One full lap of the outline. This has to read as a line TRAVELLING the
 *  shape within the few seconds someone looks at the hero before scrolling —
 *  at the old 30s a visitor saw ~15% of a lap, which is a static glow, not a
 *  beam. 11s puts a visible head-of-light past a recognisable stretch of the
 *  mark in about a second.
 *
 *  Narrow is FASTER, not slower. The mark is drawn at 0.70 of the hero height
 *  there instead of 0.92, so a lap is fewer css pixels of travel and the same
 *  duration reads as slower motion; 9s restores the apparent speed. It is also
 *  the shorter visit. Smoothness is not the thing being bought here — at a 9s
 *  lap and 30fps the head advances 4.4% of the beam's own length per frame,
 *  which is far below the point where a low-opacity background line steps. */
const BEAM_PERIOD_MS = 11000;
const BEAM_PERIOD_MS_NARROW = 9000;
const FRAME_GAP_MS_NARROW = 30;   // ~30fps on a 60Hz or 120Hz phone
/* Beam weight multipliers. Added 2026-09-03: at the original alpha 0.55 /
   width 0.9-2.0 the beam measured 1.03:1 against the page on a light-theme
   phone and 1.70:1 on dark — moving, and invisible. The `.ps-hero` contrast
   veil sits over this canvas at a flat 0.55 (globals.css:1017-1031) and is a
   documented deliberate trade-off protecting the headline
   (globals.css:1033-1045), so it stays; the beam's own weight underneath is
   the only honest lever.
   Light theme takes the larger alpha gain because the veil costs it more
   headroom than it costs dark. Narrow takes the larger width gain because the
   mark is drawn at 0.70 scale there, so an identical stroke covers fewer CSS
   pixels — and a phone was the worst case to begin with.
   WIDTH_GAIN_* is read in TWO places: the stroke, and the dirty-rect `pad`
   that restores the plate behind it. Change one without the other and the
   blit misses the stroke's outer edge, leaving a sliver every frame until the
   ghost accumulates into coloured banding. */
/* Lowered 2026-09-04 from 1.85 / 1.5. Those were tuned to punch through a
   0.55-0.99 veil that the beam is no longer under: the mark is now fitted into
   a stage that sits where the light-theme scrim has already released (see
   `stage()` below), so 1.85 put the peak at 0.55*1.85 = 1.0 clamped — a fully
   saturated #1590FF hairline on near-white, which reads as harsh un-veiled. */
const ALPHA_GAIN_LIGHT = 1.15;   // peak 0.63
/* DARK LOWERED 1.25 -> 1.00 on 2026-09-04, as a direct consequence of §24: that
   change lowered the dark EDGE to 0.27 and released the veil that was also
   dimming the beam, so the mark got fainter and the beam got brighter from one
   edit. The target is the RELATIONSHIP, not the number — light reads correctly
   at beam/edge = 2.37/1.64 = 1.45x, and dark had drifted to 3.63/1.93 = 1.88x.
   Deliberately aimed at the low side of 1.3-1.5x because the beam is the moving
   element. WIDTH_GAIN_* is untouched: it is coupled to the dirty-rect pad.
   TUNED TO THE INSTRUMENT, not computed: 1.00 still measured 1.64x because §24
   raised the dark EDGE too (1.93 -> 2.13), so the ratio's denominator moved as
   well as its numerator. Measured 1.00 -> 1.64x, 0.85 -> 1.55x, 0.75 -> 1.46x,
   which lands on light's own 1.46x. */
const ALPHA_GAIN_DARK = 0.75;    // peak 0.413
const WIDTH_GAIN_NARROW = 1.9;
const WIDTH_GAIN_WIDE = 1.5;
const BEAM_STEPS = 72;
const BEAM_STEPS_NARROW = 44;     // the beam covers fewer css px on a phone

/** The mark's ink extent inside its 1024 box (verified against the webp at
 *  IoU 0.9924 — see the header note). */
const MARK_X0 = 85, MARK_Y0 = 116, MARK_W = 895, MARK_H = 790;
/** Clear air at the frame edges. (STAGE_GAP, the old bounding-box margin between
 *  the headline and the mark, is gone — §22(c) replaced that margin with a true
 *  ink-vs-ink test in layout(), which is what allows the mark to be large.) */
const STAGE_PAD = 24;
/** The x at which the light-theme desktop scrim reaches zero, as a fraction of
 *  the hero's width. MUST track globals.css `[data-theme="light"] .ps-hero-overlay`
 *  inside @media (min-width:768px). If that ramp moves, move this. */
/** §30-B, NARROW ONLY. The mark's width as a multiple of the viewport's, so it
 *  bleeds off the LEFT edge and, being contain-fitted, off the BOTTOM too.
 *  The non-obvious part: at 390 the binding constraint is VERTICAL, not
 *  horizontal — the headline's ink ends at y=479 in an 844 hero, leaving a band
 *  only ~350px tall. So bleeding left alone does not make the mark bigger; it
 *  has to bleed off the bottom as well, which is why this is expressed as a
 *  width multiplier rather than a left offset.
 *  1.10 gives ~429x379 at 390 with the left edge at ~-39. Larger was rendered
 *  and rejected: 560x494 loses the letterform and 700x618 is the abstract sweep
 *  that was called a smudge two iterations ago. NOT applied at >=768 — see the
 *  note in layout(). */
/* ===========================================================================
 * §32 — 2026-09-05. "bigger, less opaque, BEHIND the type, hanging off the
 *        right." Two instructions, because the first was misread.
 *
 * The client, first:
 *   "make the P up hero bigger and less opaque and make it under the
 *    business software title thing and hang the right side of it off of
 *    the edge of the display"
 *
 * That was implemented as "vertically below the first headline line". It was
 * wrong. The client, correcting it:
 *   "no the P hero should be higher I meant it should be behind the hero
 *    text there not vertically below it. it is going to by 1.7x the size it
 *    obviously wont fit below it"
 *
 * READ THAT AGAIN BEFORE YOU TOUCH THE VERTICAL PLACEMENT. "under" meant
 * BEHIND — z-order, beneath the type — NOT below it on the page. The mark is a
 * background layer sitting under the headline, and it belongs HIGHER, not
 * lower. The note that used to be in layout() saying the desktop mark "could
 * only sit BELOW the headline" was answering a question the client never
 * asked; his 1.7x makes "below" geometrically impossible anyway, which is what
 * he means by "it obviously wont fit below it".
 *
 * WHAT CHANGED
 *   (a) Alphas x0.75 in both themes, ratios preserved.  palette()
 *       light 0.13/0.25 -> 0.0975/0.1875, dark 0.065/0.175 -> 0.04875/0.13125.
 *       Measured peak on the plate: 0.345 -> 0.267 light, 0.231 -> 0.169 dark;
 *       mean 0.138 -> 0.104 light, 0.074 -> 0.052 dark.
 *   (b) WIDE is 1.7x and vertically CENTRED on the hero.  WIDE_MARK_W
 *   (c) The right overhang is re-expressed in the MARK's width, not the
 *       viewport's — §31's bug, and the reason its desktop mark stopped
 *       reading as a P.  MARK_OVERHANG
 *   (d) WIDE has NO ink guard. Overlapping the type is now the point.
 *   (e) The text-column alpha ramp is restored, and this time it covers the
 *       BEAM as well as the plate. Without it the headline fails WCAG.
 *       RAMP_SPAN
 *   (f) NARROW grows 1.35 -> 1.45 and is otherwise untouched — it already sat
 *       below the whole title and already read as a P.
 *
 * THE TRAP THAT ALMOST SHIPPED A WCAG FAILURE. Since §29 the plate and the
 * beam paint ABOVE .ps-hero-overlay, so the scrim does NOT buffer the type from
 * the mark. Putting the mark behind the headline therefore lands its alpha
 * directly on the text's background, and "AI Integration." (#1590FF on
 * #F6F9FC) has only ~0.22 of headroom over the 3:1 bar. Measured at 1.7x with
 * no ramp: 2.42:1 from the static ink, and 1.34:1 on the frame where the beam
 * crossed it. Alpha is not a sufficient lever and the arithmetic proves it —
 * compositing the edge colour over the page gives R = 246 - 142a, still only
 * 2.98:1 at a = 0.03. The ramp is what makes "behind the type" legal.
 *
 * SAMPLE THE BEAM ACROSS A LAP, NOT ONE FRAME. The beam is on an 11s loop. A
 * single screenshot reported the accent line at 2.42:1 when the true worst was
 * 1.34:1 nine frames later. Every contrast number below is the worst of 24
 * frames spanning a full lap, against pixels sampled from a screenshot taken
 * with .ps-hero-line hidden, so every sampled pixel is genuinely background.
 *
 * MEASURED — chromium/webkit/firefox, 14 viewports x 2 themes:
 *   size       markW at 1440: 634 -> 1077 css px = 1.70x exactly. §31's wide
 *              mark was always 0.44*W (stage 0.70*W .. 1.14*W), so 1.7x is
 *              0.748*W at every desktop width by construction.
 *   position   ink top 169 -> 0 at 1280/1440/1920: the mark is now taller than
 *              the hero and overflows the top edge. Higher, as asked.
 *   overhang   ink occupies all 8 device columns adjacent to the right
 *              boundary at every width and does not taper into it; the left 8
 *              read 0 at every wide width. Bounding-box checks are useless
 *              here and always read 0.00 — the canvas is inset:0.
 *   contrast   worst of 24 frames, both themes, all wide widths:
 *              "AI Integration."   3.21-3.22 light (baseline 3.22, bar 3.0)
 *                                  4.00-4.05 dark  (baseline 5.58)
 *              "Business Software."    7.57-10.08 light, 8.16-9.52 dark
 *              "Business Automation."  7.76-11.86 light, 7.58-10.24 dark
 *   scrollWidth === innerWidth: 168 states, 0 violations.
 *
 * WHY THE PLATE RAMP IS LIGHT-ONLY. Dark's accent line sits at 4.05:1 from the
 * static ink alone, so ramping its plate would cost the stem for nothing. The
 * BEAM ramp is not theme-scoped: the beam is brand blue in both themes and
 * crosses brand-blue type in both. `isLight` is a FUNCTION on this closure —
 * `&& isLight` is always truthy and silently ramps both themes. Call it.
 *
 * THE HONEST COST. On LIGHT the ramp fades the mark out across the text
 * column, so the stem and flag — the left third of the letterform — dissolve.
 * The bowl, counter and tail remain and it still reads as the mark, but light
 * is a softer, more partial P than dark, which keeps all of it. That asymmetry
 * is a contrast constraint, not a style choice, and the only way to remove it
 * is to give "AI Integration." more headroom than #1590FF-on-#F6F9FC has.
 * =========================================================================== */
/* ===========================================================================
 * §33-P — 2026-09-06. PHONES. What changed, and the two things that did not.
 *
 * The client's §33 instruction names no viewport: "MOVE IT VERTICALLY UP SO IT
 * COVERS NEARLY THE ENTIRE HERO SECTION AND IS JUST SUPER ZOOMED IN." His
 * §32 correction — "it should be BEHIND the hero text there not vertically
 * below it" — names no viewport either, and §32 applied it to desktop ONLY.
 *
 * THE STATE HE HAS BEEN LOOKING AT ON A PHONE. Measured 2026-09-06 at 390x844
 * light, from the plate's backing store: ink box [0,485,389,842] in an 844px
 * hero, 26.89% coverage, ALL of it below the headline. The top 57% of the hero
 * — the entire wordmark — had nothing behind it. That is the composition he
 * corrected in words, still shipping on every phone, two passes later.
 *
 * SO: the phone regime is now the same geometry as the wide one — sized off
 * both axes, anchored by its ink top, cropped on every edge, sitting BEHIND the
 * type with the same measured keep-out protecting the accent line. The ink
 * guard that pushed it below the headline is deleted.
 *
 * WHAT IS *NOT* DONE, AND WHY. Phones do NOT get the desktop multiple.
 *   §30-B records a very large phone mark rejected TWICE as reading like a
 *   "smudge" — 560x494 "loses the letterform", 700x618 is "the abstract sweep".
 *   Those were rejections of a mark used as a discrete OBJECT below the type,
 *   which is a different question from a background FIELD behind it, so they do
 *   not simply carry over. But they are two rejections on this exact axis and
 *   they are worth respecting at the margin.
 *   The harder constraint is geometric and is the same one WIDE_MARK_H
 *   documents: a phone is a 0.46-aspect frame, the glyph is 1.13, and its
 *   bottom-right quadrant is EMPTY. Driving a phone from the width axis at the
 *   desktop's 1.42 gives s = 0.62 — a mark SMALLER than today's. Driving it to
 *   the desktop's coverage requires putting the frame inside the top bar, which
 *   is a solid tint, not a letterform, and is precisely the smudge.
 *   NARROW_MARK_H = 1.05 makes the mark one hero-height tall and ~2.6 viewports
 *   wide, cropped left, right and top, with the counter and the tail's diagonal
 *   both in frame.
 *   THE HONEST NUMBERS, because a round-up here is how the last two passes
 *   happened. Phone mark width 566 -> 1004 css px at 390x844, which is 1.78x
 *   LINEAR; 464 -> 623 at 320x568, 1.46x. Desktop moves 1.90x. So phones move
 *   slightly LESS than desktop, not more, and they land lower on coverage as
 *   well: 26.89% -> 42.42% of the hero at 390 against 20.96% -> 61.93% at 1440.
 *   The gap is the geometry above, not timidity — but it IS a gap, and if the
 *   client says the phone is still too small the lever is this constant.
 * =========================================================================== */
/** §33-P. The phone mark's width as a multiple of the viewport's, kept at §32's
 *  1.45 purely as a FLOOR. On every phone in the matrix the height term below
 *  wins, so this value no longer sets the size anywhere; it is retained so an
 *  extremely short landscape phone cannot collapse the mark. */
const NARROW_BLEED_W = 1.45;
/** §33-P. The phone mark's height as a multiple of the hero's. This is the term
 *  that actually binds on phones — at 390x844 it gives s = 1.12 against the
 *  width term's 0.63 — and it is the phone equivalent of WIDE_MARK_H.
 *
 *  1.05, not the tablet's 1.55 and not the desktop-equivalent 2.4. Rasterised
 *  at 390x844: 1.05 puts the counter's opening across the upper third and the
 *  tail's diagonal across the lower half; past ~1.4 the frame is inside the top
 *  bar and the counter is gone, which is §30-B's smudge. */
/** §35, 2026-09-06. 1.05 -> 0.95. A consequence of NARROW_OVERHANG 0.48 -> 0.12,
 *  not an independent taste change: pulling the frame back onto the bowl brings
 *  much more ink into view at the same height, and at 1.05 the crown of the bowl
 *  then pushed off the top of the frame. 0.95 keeps the whole bowl and its
 *  counter inside the crop. §30-B records a very large phone mark rejected
 *  TWICE for reading as a smudge, so this deliberately moves DOWN, not up. */
/** §39 RETIRES THIS CONSTANT. Superseded by MARK_HF_PORTRAIT / MARK_HF_LANDSCAPE
 *  below. Nothing reads it. Kept as the decision record only — see §39. */
const NARROW_MARK_H = 0.95;
/** §33-P. The phone's WIDE_MARK_TOP. Slightly under the desktop's 0.14 because
 *  a phone hero is tall and the headline sits low in it (y 381..479 in an 844
 *  hero at 390), so less lift is needed to clear the top bar off the frame. */
/** §38, 2026-09-06. NARROW_MARK_TOP 0.05 -> -0.18, NARROW_OVERHANG 0.12 -> 0.18.
 *  Settles what §36 left open, and settles it the way §36 said to: by looking at
 *  a FILLED render, which nobody had until f2f5cc7 shipped.
 *
 *  Note the sign. Placement is `y = -NARROW_MARK_TOP * H`, so a NEGATIVE value
 *  pushes the mark DOWN. -0.18 is a down-shift, which is what the client asked
 *  for ("JUST NEEDED SHIFTED DOWN A BIT") and what §35's 0.05 did not deliver:
 *  at 0.05 the ink sat entirely ABOVE the headline with the bottom ~45% of the
 *  hero empty white. The client's words were "behind the hero text", not above.
 *
 *  §39 SUPERSEDES THE INSTRUCTION QUOTED ABOVE. "JUST NEEDED SHIFTED DOWN A BIT"
 *  is NO LONGER THE LIVE REQUIREMENT and must not be read as a settled
 *  constraint. The owner's later instruction of 2026-09-06 19:42 is directly
 *  contrary — "the leg and more bottom left of the P is what should be shoing in
 *  hero tbh" — i.e. the bowl now leaves the TOP of the frame and the leg and its
 *  bottom-left terminal are the subject. That is an UP-shift and then some: the
 *  junction is pinned at the hero's top edge. See the §39 block below for the
 *  authority, the numbers and what replaced this constant.
 *
 *  Chosen from six real builds screenshotted at 390x844 and compared by eye,
 *  not argued from the constants:
 *    A  top -0.12 over 0.12  clear P, top-heavy, bottom ~35% empty
 *    B  top -0.25 over 0.22  fills the hero, but dissolves into an abstract
 *                            swoosh - the letter is gone
 *    C  top -0.38 over 0.22  worst: top 38% empty AND unreadable
 *    D  top -0.18 over 0.12  clear P, well centred vertically, not moved right
 *    E  top -0.12 over 0.18  clear P, moved right, still top-heavy
 *    F  top -0.18 over 0.18  <- shipped. D's vertical balance + E's shift right.
 *
 *  THE REAL CONSTRAINT, and why "way farther right" is not taken literally:
 *  B and C confirm the raster finding recorded in §36 - past roughly 0.20 the
 *  bowl and counter leave the frame and the mark stops reading as a P. So
 *  "farther right" and "still a letter" are in direct conflict above ~0.20.
 *  0.18 is the most rightward value that keeps the glyph. Going further is
 *  available and was rejected on the evidence above, not on taste.
 *
 *  The headline lands inside the COUNTER (white), so type contrast is carried
 *  by the counter rather than by the scrim - which matters, because §29 records
 *  that the plate and beam paint ABOVE .ps-hero-overlay and the scrim therefore
 *  buffers nothing. Do not "fix" a future type collision here by lowering alpha;
 *  the compositing proof in this file (R = 246 - 142a, 2.98:1 at a = 0.03) shows
 *  that cannot work. Move the mark instead. */
const NARROW_MARK_TOP = -0.18;
/** §36, 2026-09-06. COMMENT ROT REPAIR. The block that stood here was §33-P's
 *  argument FOR 0.48 ("at 0.48-0.50 it does not [fall off]"), left in place when
 *  §35 changed the value under it to 0.12. It read as an endorsement of a number
 *  the file no longer used, on the most-rewritten constant in the repo. Replaced
 *  rather than amended, because the next reader needs one claim, not two.
 *
 *  What this actually controls: how far the mark's stage runs PAST the right
 *  viewport edge, as a fraction of mark width.
 *
 *  §39, 2026-09-06 — DIRECTION CORRECTED IN PLACE. The sentence that stood here
 *  read "LARGER pushes the visible crop RIGHT across the glyph." THAT WAS
 *  BACKWARDS, on the most-rewritten constant in the file, on the exact axis the
 *  next editor has to reason about. The source is `stageX = W + NARROW_OVERHANG
 *  * markW - markW`: raising the constant raises stageX, which slides the GLYPH
 *  right under a fixed frame [0, W], so the frame therefore exposes material
 *  further LEFT along the letterform. LARGER => THE VISIBLE CROP MOVES LEFT
 *  ACROSS THE GLYPH, toward the leg and the bottom-left terminal.
 *  The measured claim in the next paragraph was always correct and corroborates
 *  this: the bowl is the glyph's RIGHTMOST ink, so it is what leaves the frame
 *  as the constant grows. Only the directional wording was inverted.
 *
 *  The measured constraint, from rasterising the polygons across 0.04..0.62:
 *  the BOWL and its COUNTER leave the frame between 0.20 and 0.30. Above that
 *  only the wedge and tail remain on screen and the mark stops reading as a P.
 *  0.48 was therefore not "further right", it was "mostly gone".
 *
 *  OPEN, and deliberately not settled here: the client asked for the phone P
 *  "way farther right", which points above 0.12, while the raster says the
 *  glyph dies above ~0.30. Both were argued against a build that painted the
 *  mark as HAIRLINE OUTLINES (fixed in f2f5cc7, unshipped at the time), so
 *  nobody has yet judged position against a P they could actually see. Re-judge
 *  on a filled render before moving this again. */
const NARROW_OVERHANG = 0.18;

/* ===========================================================================
 * §39-R, 2026-09-06 — READ THIS FIRST. THE SCOPE BELOW WAS CUT TO PHONES.
 *
 * §39 (below) originally applied the magnified crop to BOTH regimes and
 * re-pointed layout()'s wide branch at a mark-derived stage. THE OWNER
 * REVERSED THAT THE SAME DAY, verbatim:
 *     "The P is too big now."
 *     "IT IS ONLY SUPPOSED TO BE THAT BIG ON MOBILE BTW"
 *
 * So: the wide branch is BACK to §37's `contained` contain-fit with the ink
 * guard armed — a whole, modest, centred glyph, ~408x360 at 1440x900. The
 * magnified crop is NARROW ONLY, W < NARROW_MAX (768). The regime boundary is
 * the 768 breakpoint, NOT an orientation test: §39 briefly split on `H > W`,
 * which sent portrait TABLETS (768x1024, 820x1180) down the phone path, and
 * tablets are not "mobile".
 *
 * This also vindicates the instruction already in this file at ~:299-300 and
 * in commit 60c08fb — "these P changes were only supposed to be for mobile".
 * That note was overridden by an orchestrator decision (D3 in CROP-ANCHOR.md)
 * and the note was right. Weight it accordingly before widening scope again.
 *
 * Everything in §39 below still describes the PHONE composition accurately and
 * is unchanged for W < 768. Only its scope claim is superseded. See ADR-0011.
 * ===========================================================================
 *
 * §39, 2026-09-06 — ADR: THE HERO MARK IS A MAGNIFIED FRAGMENT.
 * SCOPE: PHONES ONLY (W < 768) per §39-R above. This block replaces the phone
 * constants above. Read it before changing any number in this file.
 *
 * WHO ASKED, AND WHEN. The owner, 2026-09-06 19:42, verbatim:
 *     "the leg and more bottom left of the P is what should be shoing in
 *      hero tbh"
 * recorded in CROP-ANCHOR.md alongside four binding decisions D1-D4.
 *
 * §37's note at ~:554 says: "DO NOT re-point the wide branch at these to
 * 'restore' desktop size. The client's instruction was the opposite direction.
 * If desktop is ever asked to bleed again, write a §38 and say who asked."
 * THIS IS THAT WRITE-UP (§38 was taken by the phone constants, so: §39), and
 * the answer to "who asked" is the owner, at the timestamp above. §37's
 * instruction was correct for its date and is now SUPERSEDED, not violated.
 *
 * TWO CEILINGS ARE REVOKED, on the owner's authority, per D2:
 *   - NARROW_OVERHANG's "~0.20 or the mark stops reading as a P" (:314-319,
 *     :338-341), and
 *   - the scale ceiling at :247-262 (§30-B's two "smudge" rejections).
 * Both were TASTE constraints predicated on the mark still reading as a whole
 * letter. CROP-ANCHOR.md inverts that premise in as many words: "Not a whole
 * letter... The viewer sees a magnified fragment of a letterform." A complete,
 * legible P sitting inside the hero is now a FAILING render, at every width.
 *
 * THE COMPOSITION, in three numbers, defined against the hero's live W x H and
 * against the glyph's own landmarks (measured off the rasterised polygons, not
 * read off the vertex lists):
 *   hF  ink height as a multiple of the hero's height  -> s  = hF * H / MARK_H
 *   jF  where the BOWL/STEM JUNCTION sits, as a fraction of H
 *                                                      -> oy = jF*H - 569*s
 *   fTx where the BOTTOM-LEFT TERMINAL sits, as a fraction of W
 *                                                      -> ox = fTx*W - 85*s
 * hF > 1 IS NOT A TYPO. The glyph is over twice the hero's height and bleeds
 * off the TOP and the RIGHT. It is forced, not chosen: with the junction at the
 * top edge, terminal_y/H = jF + (905-569)*hF/790, so putting the terminal near
 * the bottom of the frame REQUIRES hF ~ 2.05. There is no value <= 1 that
 * satisfies the crop at all; at hF = 1 the terminal reaches 0.43H and the
 * bottom 57% of the hero is empty. 0.9 is not a cautious version of this
 * number, it is the composition that has now been rejected three times.
 *
 * THE SPLIT IS THE 768 BREAKPOINT. (§39 originally split on orientation,
 * `H > W`; §39-R reverted that.) 768x1024 and 820x1180 are portrait heroes but
 * they are TABLETS, so they take the restored `contained` desktop path, not
 * this crop. Below 768, `portrait` still selects hF/jF for a rotated phone —
 * that is a proportion choice inside this regime, not a regime boundary.
 *
 * LEGIBILITY IS CARRIED BY THE KEEP-OUT AND THE CROP, NEVER BY SHRINKING THE P.
 * The platePush keep-out at :1199/:1387-1391 is WCAG-LOAD-BEARING and STAYS at
 * KEEPOUT_MARGIN 14 and feather max(0.14*W, 76), over EVERY headline line.
 * Light-theme "AI Integration." measures 3.07:1 with ZERO plate alpha over its
 * ink — 0.02 above the 3:1 large-text floor. ANY plate alpha over that line
 * fails WCAG. Do not narrow the keep-out, do not scope it to the accent line,
 * and do not try to buy contrast back by lowering alpha: the compositing proof
 * at ~:583 (R = 246 - 142a, still 2.98:1 at a = 0.03) shows that cannot work.
 * =========================================================================== */

/** The bowl/stem junction, in mark-box units: the last row of the glyph that
 *  still contains TWO ink segments, i.e. the row at which the counter closes.
 *  Measured from a standalone raster of MARK_BODY + MARK_WEDGE at 1024. This is
 *  the vertical ANCHOR — the wide branch used to centre on the ink box, which
 *  is why enlarging it pushed the bowl and the terminal off TOGETHER. */
const JUNCTION_Y = 569;
/** Ink height as a multiple of the hero's height. See §39 for why these exceed
 *  1 and why that is the whole point rather than an overshoot. */
const MARK_HF_PORTRAIT = 2.05;
const MARK_HF_LANDSCAPE = 2.20;
/** Where the junction sits as a fraction of H. 0 pins it exactly on the hero's
 *  top edge; the landscape hero is shorter, so it lifts slightly further. */
const MARK_JF_PORTRAIT = 0.0;
const MARK_JF_LANDSCAPE = -0.05;
/** Where the bottom-left TERMINAL sits as a fraction of W. Wider heroes see a
 *  wider slice of the glyph, so the terminal moves right to keep the leg's
 *  flank in frame; these anchor the ramp in `terminalX()` below. */
const TERM_X_PHONE = 0.150;      // W <= 430
const TERM_X_TABLET = 0.220;     // W == 768, portrait
const TERM_X_LAND_NEAR = 0.340;  // W == 1024, landscape
const TERM_X_LAND_FAR = 0.380;   // W == 1920, landscape

/** §39. The horizontal anchor, as a fraction of the hero's width.
 *
 *  THIS REPLACES NARROW_OVERHANG'S PARAMETERISATION, AND IT HAD TO. The old
 *  form was `stageX = W + OVERHANG*markW - markW`, i.e. the anchor was a
 *  fraction of the MARK's width — and markW is driven by H while W varies
 *  independently, so a single overhang constant resolves to a different
 *  fraction of W at every aspect ratio. Measured: the one value that puts the
 *  terminal at 0.150*W on a 390x844 phone puts it at 0.342*W on a 393x659 one —
 *  the SAME PHONE with its toolbar collapsed. No single value of NARROW_OVERHANG
 *  can hold the crop across the matrix. Anchoring on W directly is what makes
 *  the composition toolbar-invariant. */
function terminalX(w: number, portrait: boolean): number {
  if (portrait) {
    const t = TERM_X_PHONE + Math.max(0, w - 430) * (TERM_X_TABLET - TERM_X_PHONE) / (768 - 430);
    return Math.min(0.40, Math.max(TERM_X_PHONE, t));
  }
  const t = TERM_X_LAND_NEAR + (w - 1024) * (TERM_X_LAND_FAR - TERM_X_LAND_NEAR) / (1920 - 1024);
  return Math.min(0.40, Math.max(0.20, t));
}

/* §39 retires the four NARROW_* constants above, on the §37/WIDE_* precedent:
   voided rather than deleted, because their comment blocks are the §30-§38
   decision record. NOTHING READS THEM. Editing them is a silent no-op. */
void NARROW_BLEED_W; void NARROW_MARK_H; void NARROW_MARK_TOP; void NARROW_OVERHANG;
/** §31, 2026-09-05. How far the mark's stage runs PAST the right viewport edge,
 *  as a fraction of the hero's width. The client asked for the mark "bigger and
 *  less prominent, with less opacity and hanging off the right side of the page
 *  a bit" — this constant is the "hanging off the right" half of that.
 *
 *  It applies in BOTH regimes but buys different things in each. At >=768 the
 *  mark was fully CONTAINED (measured 2026-09-05: ink box right edge 574 in a
 *  768 hero, 1212 in 1280, 1417 in 1440 — 194px, 68px and 23px of dead air).
 *  There, widening the stage past W is what makes it both bigger AND cropped by
 *  the edge. Below 768 the mark already bled off both edges, so here the term
 *  shifts an already-oversized mark rightwards so the RIGHT crop is the
 *  deliberate one rather than an accident of centring.
 *
 *  This can never create horizontal page scroll: #ps-hero-canvas is inset:0 on
 *  the hero and is sized to W x H, so anything drawn beyond x = W lands outside
 *  the backing store and is simply never rasterised. Verified at all nine
 *  widths — scrollWidth === innerWidth throughout. */
/** §32, 2026-09-05 raised 0.14 -> 0.20. "hang the right side of it off of the
 *  edge of the display". THE COST IS NOT SYMMETRIC AND THIS IS THE ONE NUMBER
 *  IN THIS FILE THAT DESTROYS THE LETTERFORM — see §32(c). The mark's bowl and
 *  counter, the only two features that say "P", are its RIGHTMOST ink
 *  (MARK_BODY runs out to x=980; the tail runs out to x=85 bottom-LEFT). Every
 *  unit of right bleed eats the bowl first. Cropping LEFT or BOTTOM costs the
 *  tail, which the eye reconstructs; cropping RIGHT costs the identity. */
/** §33-P RETIRED THIS CONSTANT. The comment above is preserved verbatim because
 *  it records WHY a viewport-relative right bleed is the wrong unit, and that
 *  lesson is still load-bearing — MARK_OVERHANG and WIDE_OVERHANG_TALL are both
 *  expressed in the MARK's width because of it. The value itself had exactly one
 *  reader, the narrow branch of layout()'s `primary`, and §33-P replaced that
 *  branch with the shared two-axis placement. Nothing reads it now, so it is a
 *  documented zero rather than a live number. */
const MARK_RIGHT_BLEED = 0;
void MARK_RIGHT_BLEED;
/** §32(c). THE OVERHANG, EXPRESSED IN THE MARK'S OWN WIDTH — not the
 *  viewport's. This replaces MARK_RIGHT_BLEED for the WIDE regime and it is the
 *  single most important correction in §32.
 *
 *  MARK_RIGHT_BLEED is a fraction of W, and a fraction of W is not a fraction
 *  of the mark. Measured 2026-09-05 under §31: at 390 the 0.14 term put 55px
 *  past the edge, 10% of a 526px mark — the bowl stayed on screen and the glyph
 *  read as a P. At 1440 the SAME 0.14 term put 201px past the edge, 32% of a
 *  634px mark, which is the entire bowl. So one constant produced a tasteful
 *  crop on a phone and decapitated the letter on a desktop, and the wider the
 *  display the worse it got: 1920 was cropping 35%.
 *
 *  That is why the desktop mark stopped reading as a P while the phone kept
 *  working, and it is why the §31 result was described as abstract planes. The
 *  overhang has to be measured against the thing being cropped. 0.12 was chosen
 *  because it is what the phone was already doing successfully. */
const MARK_OVERHANG = 0.12;
/** §32(b). WIDE only. The mark's width as a fraction of the viewport's — the
 *  client's "1.7x", expressed in the one unit that makes it exact.
 *
 *  §31's wide mark was ALWAYS 0.44 * W, at every width: its stage ran from
 *  `floor` (0.70 * W) to W + 0.14 * W, and 1.14 - 0.70 = 0.44. So 1.7x is
 *  0.44 * 1.7 = 0.748, and the ratio is exact at every desktop width rather
 *  than being a number tuned at one and hoped for at the others.
 *
 *  At this size the mark is TALLER than the hero at most desktop viewports
 *  (0.748 * 1440 = 1077 wide, 951 tall, in a 900px hero), which is precisely
 *  why "vertically below the headline" was never going to work and why the
 *  client corrected it. It overflows top and bottom and that is intended. */
/* ===========================================================================
 * §33 — 2026-09-06. "SUPER ZOOMED IN." The 1.7x of §32 was rejected outright.
 *
 * The client, verbatim:
 *   "THE P IN THE HERO SECTION IS STILL NOT AT ALL WHAT I ASKED FOR MOVE IT
 *    VERTICALLY UP SO IT COVERS NEARLY THE ENTIRE HERO SECTION AND IS JUST
 *    SUPER ZOOMED IN."
 *
 * Read together with his §32 correction, which still stands:
 *   "the P hero should be higher I meant it should be behind the hero text
 *    there not vertically below it. it is going to by 1.7x the size it
 *    obviously wont fit below it"
 *
 * ONE instruction, three parts, and §32 delivered none of them at the asked
 * magnitude: a heavily CROPPED letterform used as a background FIELD, sitting
 * BEHIND the type, pushed UP so its top runs off the frame. "Super zoomed in"
 * means a FRAGMENT of the P at enormous scale — not a whole letter placed in
 * the frame. §32's 1.7x is the FLOOR of this ask, not the target.
 *
 * WHY §32 READ SO SMALL DESPITE MEASURING 1.7x. Two separate causes, and the
 * second one is the bigger of the two:
 *   1. The mark was sized off WIDTH ONLY (0.748 * W). On a portrait tablet
 *      that is a mark SHORTER than the hero: at 768x1024 it measured 574x507
 *      in a 1024-tall hero — a small object floating in the middle of a tall
 *      frame, which is the exact opposite of "covers the entire hero".
 *   2. THE §32 RAMP ERASED HALF THE CANVAS. RAMP_SPAN was a FULL-HEIGHT
 *      horizontal gradient that killed the plate for every y at x < the accent
 *      line's right edge. Measured on light at 1440 before this change: the
 *      plate's ink box started at x = 743 and its ink covered 20.96% of the
 *      hero, against 27.42% on dark. The client was looking at a mark that
 *      occupied the right 48% of a 1440 frame and being told it was 1.7x.
 *
 * WHAT CHANGED
 *   (a) The wide mark is sized off BOTH axes.  WIDE_MARK_W / WIDE_MARK_H
 *       s = max(WIDE_MARK_W * W / MARK_W, WIDE_MARK_H * H / MARK_H), so the
 *       height term only binds on portrait tablets, where width alone left the
 *       mark floating. 1.42 * W is 3.23x §31's 0.44 * W baseline, i.e. 1.90x
 *       the 1.7x he rejected.
 *   (b) It is pushed UP by construction, not centred.  WIDE_MARK_TOP
 *       The ink's TOP edge is placed WIDE_MARK_TOP * H ABOVE the hero's top, so
 *       the top bar of the P is cropped away at every wide viewport instead of
 *       "happening to overflow at 1440 and not at 1024". §32's centring was
 *       answering "higher" with "centred", which is not an answer.
 *   (c) RAMP_SPAN IS GONE, REPLACED BY A FEATHERED KEEP-OUT.  KEEPOUT_FEATHER
 *       See the block on that constant. This is what buys the coverage back.
 *   (d) Phones grow too, but NOT to the desktop multiple. See §33-P below.
 *   (e) The reduced-motion park point now prefers an ON-CANVAS vertex. At this
 *       scale the outline's rightmost vertex is far off the right edge, so the
 *       old park would have left the still frame with no beam at all.
 *
 * WHAT DID NOT CHANGE, DELIBERATELY: every alpha in palette(), both beam gains,
 * MARK_OVERHANG, .ps-hero-overlay's stops, the hero type, the scroll cue. The
 * ask was about SIZE and POSITION. Changing weight at the same time would have
 * made the next round of feedback unattributable.
 * =========================================================================== */
/** §33(a). The wide mark's width as a multiple of the VIEWPORT's width.
 *
 *  1.42 rather than 0.748. §31's wide mark was always 0.44 * W, so this is
 *  3.23x that baseline, and 1.90x LINEAR on the mark he rejected (1077 -> 2045
 *  css px of mark width at 1440). At 1440 the mark is 2045 x 1805 css px in a
 *  1440 x 900 hero — 1.42 viewports wide and 2.01 viewports tall — and the
 *  frame shows a 630 x 394 unit window of a 895 x 790 unit glyph, i.e. about a
 *  third of the letterform. That is the "fragment at enormous scale" reading.
 *  Measured ink coverage of the hero went 20.96% -> 61.93% light and
 *  27.42% -> 67.71% dark at 1440.
 *
 *  THE CEILING IS THE COUNTER, NOT THE FRAME. What still says "P" at this scale
 *  is the enclosed void between the wedge and the bowl plus the bowl's outer
 *  curve. Rasterising the polygon pair at 1440x900 across k = 0.75 .. 2.8 (see
 *  the §33 measurements in the report) the counter stops being enclosed by the
 *  frame somewhere past k ~ 1.6: above that you see two ink masses and a gap,
 *  which is §30-B's "smudge" arriving on desktop. 1.42 keeps the counter, the
 *  bowl's curve and the tail's diagonal all inside the frame at once. */
const WIDE_MARK_W = 1.42;
/** §33(a). The same size expressed against the viewport's HEIGHT, applied as a
 *  MAXIMUM against WIDE_MARK_W rather than instead of it.
 *
 *  Landscape desktops are width-bound and never reach this term (at 1440x900 it
 *  asks for s = 1.31 against width's 2.28). Portrait tablets are the case it
 *  exists for: 768x1024 and 820x1180 are in the WIDE regime, and width alone
 *  gave them a mark SHORTER than the hero — 574x507 in a 1024 hero under §32.
 *  1.15 makes the mark 1.15 hero-heights tall there, so it is cropped top and
 *  bottom like everywhere else.
 *
 *  1.55 rather than 1.42 because the two axes are not interchangeable here, and
 *  rather than the 2.0-2.15 that maximises raw coverage because that number is
 *  bought by putting the frame INSIDE a solid ink mass. Rasterised at 768x1024
 *  across kh = 1.1 .. 2.6: kh 2.0 reaches 76% ink and shows a plain diagonal
 *  edge with no counter and no bowl — §30-B's "smudge", arriving on a tablet.
 *  1.55 lands ~50% with the counter, the wedge and the tail all in frame.
 *
 *  A PORTRAIT FRAME CANNOT BE FULLY COVERED BY THIS GLYPH AND THAT IS GEOMETRY,
 *  NOT TUNING. The mark's ink runs top-RIGHT (bowl) to bottom-LEFT (tail); its
 *  bottom-right quadrant is empty by construction — see the raster in the
 *  report. Any axis-aligned window tall enough to fill a 0.75-aspect frame
 *  either straddles that empty quadrant or sits wholly inside the top bar.
 *  Portrait therefore lands lower on coverage than landscape ON PURPOSE, and
 *  the honest lever is WIDE_OVERHANG_TALL below, not more scale. */
const WIDE_MARK_H = 1.55;
/** §33(a). MARK_OVERHANG, but for the frames where the HEIGHT term binds.
 *
 *  MARK_OVERHANG (0.12) puts the frame over the glyph's RIGHT edge, which is
 *  correct on landscape — that is where the bowl is, and the bowl is the
 *  identity. On a portrait frame the same anchor is actively wrong: the window
 *  is tall, so its lower half lands in the glyph's empty bottom-right quadrant
 *  and the bottom third of the hero measured 0% ink at 768x1024.
 *
 *  0.34 slides the window left along the glyph so the tail's diagonal comes up
 *  into the bottom of the frame while the bowl's inner curve stays in the top.
 *  It is a fraction of the MARK's width, exactly like MARK_OVERHANG, so §32(c)'s
 *  correction — an overhang expressed in viewport widths crops a different
 *  fraction of the letter at every size — still holds. */
/** §35, 2026-09-06. 0.34 -> 0.12, for the same reason as NARROW_OVERHANG and
 *  landing on the same number as the desktop's MARK_OVERHANG. Verified at
 *  941x900, which produced the single most legible capture of the whole sweep:
 *  bowl, counter, stem, flag and tail all in frame at once. */
const WIDE_OVERHANG_TALL = 0.12;
/** §33(b). How far the mark's INK TOP sits ABOVE the hero's top edge, as a
 *  fraction of the hero's height. This is the client's "MOVE IT VERTICALLY UP",
 *  and it is the whole of it.
 *
 *  §32 centred the mark vertically and called the resulting overflow "higher".
 *  Centring is not a direction: at 1440 it happened to put the ink top at 0, at
 *  1024x768 it left a 46px gap above the ink, and at 768x1024 it left 258px.
 *  Anchoring the ink's top edge instead makes the top crop a GUARANTEE at every
 *  wide viewport rather than an accident of the aspect ratio.
 *
 *  0.14 at 1440x900 lifts the ink top to y = -126. Combined with (a) that puts
 *  the P's top bar entirely off-frame, opens the counter across the upper half,
 *  and brings the tail's diagonal up into the lower third. Larger values keep
 *  raising it but start trading the counter for the tail, and the tail alone is
 *  the abstract sweep §30-B recorded as rejected. */
const WIDE_MARK_TOP = 0.14;
/* ===========================================================================
 * §37 RETIRES THE FIVE CONSTANTS ABOVE. WIDE_MARK_W, WIDE_MARK_H,
 * WIDE_OVERHANG_TALL, WIDE_MARK_TOP and MARK_OVERHANG were the whole of the
 * desktop bleed regime and nothing reads any of them now. They are voided
 * rather than deleted, on the MARK_RIGHT_BLEED precedent at ~:348: the comment
 * blocks attached to them are the §31-§33 decision record, and §32(c) in
 * particular — "the overhang has to be measured against the thing being
 * cropped" — is still the load-bearing lesson behind NARROW_OVERHANG.
 *
 * DO NOT re-point the wide branch at these to "restore" desktop size. The
 * client's instruction was the opposite direction. If desktop is ever asked to
 * bleed again, write a §38 and say who asked.
 *
 * They stay ONLY as documentation. The live phone equivalents are
 * NARROW_BLEED_W, NARROW_MARK_H, NARROW_MARK_TOP and NARROW_OVERHANG.
 * =========================================================================== */
void WIDE_MARK_W; void WIDE_MARK_H; void WIDE_OVERHANG_TALL; void WIDE_MARK_TOP;
void MARK_OVERHANG;
/** §32(e), REPLACED BY §33(c). THE TEXT-COLUMN ALPHA RAMP — and this time it
 *  covers the beam as well as the plate.
 *
 *  A ramp used to live in build(). It was deleted on 2026-09-04 with the note
 *  "Geometry now does the separation the ramp was doing: the stage never
 *  overlaps the headline." That premise was true then and the client's
 *  correction makes it FALSE: "under" meant BEHIND, so the mark is now
 *  deliberately on top of the headline's column. The reason for the ramp is
 *  therefore back, and the note's own criticism of the old one is the spec for
 *  this one — "It faded the P but never the beam, the beam is stroked onto
 *  ctx, not onto the plate."
 *
 *  WHY IT IS NOT OPTIONAL. Since §29 the plate and the beam paint ABOVE
 *  .ps-hero-overlay (globals.css:1198-1204), so the scrim does not buffer the
 *  type from the mark at all — the mark's alpha lands directly on the text's
 *  background. "AI Integration." is #1590FF on #F6F9FC and measures 3.22:1
 *  against a 3:1 bar, i.e. ~0.22 of headroom. Measured at 1.7x with the mark
 *  behind it and NO ramp: 2.42:1 from the static ink, and 1.34:1 on the frame
 *  where the beam crosses it — brand blue under brand-blue type.
 *
 *  Alpha alone cannot fix this and the arithmetic says so: compositing the edge
 *  colour over the page at alpha a gives R = 246 - 142a, and the line still
 *  measures 2.98:1 at a = 0.03. There is no usable alpha at which the mark may
 *  sit behind this line. It has to be absent there, which is what the ramp
 *  does.
 *
 *  §33(c). ALL OF THE ABOVE IS STILL TRUE. What changed is the SHAPE of the
 *  attenuation, because §32's shape is what stopped the mark reading as big.
 *
 *  §32's ramp was a FULL-HEIGHT horizontal gradient: alpha 0 everywhere left of
 *  the accent line's ink right edge, ramping to 1 over 0.18 * W. At 1440 that
 *  erased x < 726 for every y — 50.4% of the canvas — to protect a line of type
 *  that occupies 144..726 x 467..573, which is 4.8% of it. Measured on the
 *  light plate before §33: ink box left edge 743, ink coverage 20.96% of the
 *  hero against dark's 27.42%. Ten times more mark was destroyed than the
 *  contrast constraint actually requires, and the client saw the difference.
 *
 *  §33 punches a FEATHERED RECTANGLE over the protected ink instead: fully
 *  erased inside the type's own ink box plus a small margin, ramping back to
 *  full over KEEPOUT_FEATHER. It is a 2-D keep-out, so the mark survives above
 *  the type, below it, and in the same column outside the type's y-band.
 *
 *  WHAT IS PROTECTED, AND WHY IT DIFFERS BY LAYER AND BY THEME:
 *    PLATE, light  — the ACCENT LINE ONLY. #1590FF on the scrimmed page has
 *                    ~0.22 of headroom over the 3:1 bar; the plate's peak
 *                    composite alpha is 1-(1-0.0975)(1-0.1875) = 0.2666, which
 *                    lands the backdrop near (214,219,226) and the line at
 *                    2.33:1. Lines 1 and 2 are #0A1628 on the same backdrop and
 *                    still measure ~13:1, so protecting them would cost the
 *                    letterform for nothing.
 *    PLATE, dark   — NOTHING. Dark's peak composite alpha is 0.1736 of
 *                    [150,186,232] over #0A1628, which puts the accent line at
 *                    3.97:1 by construction and lines 1 and 2 (white) at ~14:1.
 *                    §32 reached the same conclusion by measurement; the
 *                    arithmetic above is why it is not a coincidence.
 *    BEAM, both    — ALL THREE LINES. This is a §33 widening of §32's rule and
 *                    it is NOT optional. The beam is #1590FF at up to 0.63
 *                    alpha. Over light it puts a 8.6:1 backdrop under the dark
 *                    lines (fine) and a 1.0:1 backdrop under the accent line
 *                    (brand blue under brand-blue type). Over DARK the same
 *                    stroke composites to roughly (107,185,255), and WHITE type
 *                    on that is 2.10:1 — under the 3:1 bar. §32 never saw this
 *                    because at 1.7x the beam's visible arc never reached lines
 *                    1 and 2; at §33's scale it crosses all three.
 *                    `isLight` is a FUNCTION on this closure — `&& isLight` is
 *                    always truthy and silently applies to both themes. Call it.
 *
 *  The rects are the MEASURED ink boxes of .ps-hero-line, not the element
 *  boxes and not hardcoded fractions: the headline's ink moves with the webfont
 *  and with clamp(1.375rem, 7.5vw, 5.5rem). NARROW does not use any of this —
 *  the mark sits below all the headline ink there and nothing needs protecting.
 */
/** §33(c). Margin added around a protected ink box before the feather starts,
 *  and the width of the feather itself, both in CSS px scaled off the viewport.
 *  The feather is what keeps the keep-out invisible: at the mark's peak alpha of
 *  0.267 a hard edge would read as a rectangle cut out of the watermark, which
 *  is worse than the watermark being absent. */
/**
 * §35 — 2026-09-06. "SOLID, CONFIDENT, ZOOMED-IN MASS", not a ghost watermark.
 *
 * THE ONE DEFECT THIS FIXES, AND THE ONE IT DOES NOT TOUCH. §31-§33 spent three
 * revisions on SIZE, CROP and POSITION, and the owner rejected all three. This
 * section changes NONE of that geometry: the mark is still 1.42 * W wide
 * (0.748 * W of visible frame by construction, §33(a)), still taller than the
 * hero, still overflowing top and bottom, still cropped by the viewport, still
 * behind the headline. Re-read §31-§33 before touching those constants; the
 * rejected approaches are recorded there and this is not another one of them.
 *
 * The defect was the TREATMENT. Every version through §33 held
 * edge ~= 1.92 * fill — a CONTOUR-DOMINANT weighting. That is the correct
 * weighting for a hairline watermark and it is the literal cause of the
 * "faint outline / wireframe" reading: at fillA 0.0975 on light there was
 * effectively no mass at all, only a pale stroke tracing bowl and stem. A
 * design critic's survey of 329 screenshots of the surfaces this owner DOES
 * approve of found them to be fills only, zero structural strokes, depth from
 * shadow — and named hairline-stroke-with-no-filled-mass as "the literal
 * source of 'unsatisfying'".
 *
 * §35 INVERTS THE EMPHASIS to fill-dominant, edge = 1.24 * fill. The stroke is
 * now a definition ON a mass rather than being the mark itself.
 *
 * THE CROSS-THEME RELATIONSHIP §24 ESTABLISHED IS PRESERVED EXACTLY, and it is
 * matched on mean dRGB against each theme's own page, NOT on a WCAG ratio —
 * ratio is a text-legibility metric and on a dark ground the same ratio carries
 * ~12x less absolute luminance difference. §24's own numbers, recomputed:
 *   fill  light [140,160,190] on (246,249,252) =  85.67 dRGB per unit alpha
 *         dark  [150,186,232] on ( 10, 22, 40) = 165.33 dRGB per unit alpha
 *         => darkFill = 0.5182 * lightFill.  0.55 * 0.5182 = 0.285
 *   edge  light [104,128,162] = 117.67/unit, dark [150,186,232] = 165.33/unit
 *         => darkEdge = 0.7117 * lightEdge.  0.68 * 0.7117 = 0.484
 * MEASURED RESULT of those four numbers, from composited screenshot pixels:
 * light fill rgb(188,200,218) on rgb(246,249,252) = 1.57:1, mean dRGB 47.0;
 * dark fill rgb(50,69,95) on rgb(10,22,40) = 1.95:1, mean dRGB 47.3. The dRGB
 * match is 47.0 vs 47.3 — dark is present without going muddy, which is the
 * whole point of matching on dRGB rather than on ratio.
 *
 * DO NOT "tidy" these four into one pair. Light uses two DIFFERENT colours for
 * fill and edge; dark uses the SAME colour for both, so a proportional scale
 * from light does not preserve the fill-to-edge relationship. That asymmetry is
 * load-bearing and §24 documents it in the dark branch of palette().
 */
const MARK_FILL_A_LIGHT = 0.55;
const MARK_EDGE_A_LIGHT = 0.68;
const MARK_FILL_A_DARK = 0.285;
const MARK_EDGE_A_DARK = 0.484;
/** §35: 10 -> 14. A filled mass is a far heavier occluder than a hairline, so
 *  the protected ink needs more slack before the feather starts. */
const KEEPOUT_MARGIN = 14;
/** §35: 0.085 -> 0.14, plus a px floor. The feather is what keeps the keep-out
 *  INVISIBLE — at §33's peak alpha of 0.267 a hard edge read as a rectangle cut
 *  out of the watermark, and at §35's much heavier fill that rectangle would be
 *  blatant. KEEPOUT_FEATHER_MIN exists because the feather is a fraction of the
 *  hero's WIDTH: at 390 the 0.14 term is only 55px, which is too abrupt against
 *  a solid fill. The floor makes a phone feather as soft as a desktop one. */
const KEEPOUT_FEATHER = 0.14;    // fraction of the hero's width
const KEEPOUT_FEATHER_MIN = 76;  // css px floor, for narrow viewports
/** How long the beam takes to cross the whole off-screen arc, regardless of how
 *  much of it is off-screen. See the time remap in build(). */
const HIDDEN_TRAVERSE_MS = 350;
/* ===========================================================================
 * §37 — 2026-09-06. DESKTOP GOES BACK. The P changes were only ever for mobile.
 *
 * The client, twice, verbatim:
 *   "all these P chnanges were only supposed to be for mobile dude. you need to
 *    put desktop back to the way it was before all of this"
 *   "just teh P not all the other stuf obviously"
 *
 * He is right, and it had never been done. §31 through §35 read his phone
 * feedback as site-wide feedback and applied every round of it to desktop as
 * well. Nothing in §31-§35 records him asking for a desktop change; §32's own
 * header even notes his correction "names no viewport". Five rounds of growing
 * the desktop mark were inferred, not requested.
 *
 * WHAT "BEFORE ALL OF THIS" IS, EXACTLY. Commit 6fcfd65, the pre-rebuild
 * baseline: a 752-line file with NO WIDE_* constants at all. Its desktop mark
 * was CONTAINED — layout() built a stage inset by STAGE_PAD, running from
 * `floor` (W * SCRIM_CLEAR) to W - STAGE_PAD, and handed it to fitInto(), which
 * contain-fits. The whole glyph sat inside the hero with air around it. That
 * rect is restored verbatim as `contained` in layout(); see 6fcfd65:365.
 *
 * WHAT CHANGED, AND IT IS ONLY THESE THREE THINGS
 *   (a) layout()'s wide branch is 6fcfd65's `contained` stage again, instead of
 *       the mark-derived bleeding stage §33(a) built from WIDE_MARK_W/_H.
 *   (b) The ink guard is re-armed for wide only — `narrow ? [] : rects`. This
 *       is not decoration. With the guard empty at every viewport since §33,
 *       the `dropped` stage and the 12-step Math.pow(0.96, k) shrink below it
 *       were unreachable code. Restoring a contained stage without them would
 *       have put a whole glyph straight under the headline with no mechanism to
 *       move it. The guard, the drop and the shrink are one instrument.
 *   (c) WIDE_MARK_W, WIDE_MARK_H, WIDE_OVERHANG_TALL, WIDE_MARK_TOP and
 *       MARK_OVERHANG are voided. See the retirement block at ~:512.
 *
 * WHAT WAS DELIBERATELY *NOT* REVERTED — "just teh P not all the other stuf".
 * The client scoped this himself and the scope is narrow. Untouched:
 *   - THE FILL FIX (f2f5cc7) AND ITS ALPHAS. MARK_FILL_A_* / MARK_EDGE_A_* stay
 *     at §35's fill-dominant values. This is the most important non-reversion in
 *     the section. 6fcfd65 painted the mark as hairline CONTOURS at roughly a
 *     10/255 delta, i.e. invisible — which is the actual reason four consecutive
 *     rounds of resizing it changed nothing anybody could see. Taking the old
 *     geometry back while also taking the old alphas back would have restored
 *     the defect along with the layout. GEOMETRY ONLY: every alpha in palette()
 *     is exactly what it was before §37.
 *   - the beam, both beam gains, BEAM_STEPS*, BEAM_PERIOD_MS*, the plate, the
 *     offscreen-plate/dirty-rect paint order, the DPR caps, the reduced-motion
 *     park point (§33(e)), the keep-outs and their feather (§33(c)/§35).
 *   - EVERY NARROW_* CONSTANT AND THE ENTIRE NARROW BRANCH. See below.
 *
 * MOBILE IS UNTOUCHED, AND HERE IS WHY THAT IS STRUCTURALLY TRUE RATHER THAN
 * JUST INTENDED. The two edits in layout() are both `narrow ?` ternaries whose
 * narrow arm is the pre-§37 expression verbatim: NARROW_BLEED_W, NARROW_MARK_H,
 * NARROW_MARK_TOP and NARROW_OVERHANG feed `bleeding` with the same terms in
 * the same order, and the guard's narrow arm is still the empty array, so the
 * loop still returns `primary` on iteration one without ever calling
 * inkOverlap(). There is no path by which a phone reaches `contained`.
 * Verified by render, not by reading: 390x844 light and dark, chromium,
 * before and after — 0 differing pixels out of 2,962,440.
 *
 * §36 IS NOT CONTRADICTED. It records NARROW_OVERHANG = 0.12 as OPEN, pending a
 * judgment of phone position against a FILLED render rather than the hairline
 * one the client was shown. §37 does not move that constant, does not settle
 * that question, and does not touch anything on the phone path. That judgment
 * is still owed.
 *
 * THE ONE TRAP IF YOU REVISIT THIS. Do not try to keep the desktop mark clear of
 * the headline by lowering its alpha. §29 put the plate and beam ABOVE
 * .ps-hero-overlay (globals.css:1198-1204), so the scrim does not buffer the
 * type from the mark, and the compositing arithmetic in §32 is decisive:
 * R = 246 - 142a gives only 2.98:1 even at a = 0.03. Type collisions are solved
 * by the guard, the `dropped` stage and the shrink loop. That is what they are
 * for and it is why §37 restored them together.
 * =========================================================================== */
const SCRIM_CLEAR = 0.70;
/* NOTE, kept because it corrects a false claim that lived here: the phone scrim
 * is NOT "a flat veil with no horizontal ramp". It is a 90deg ramp exactly like
 * the desktop one — `0.97 0% -> 0.95 62% -> 0.55 70% -> 0 78%` after the
 * 2026-09-04 retiming in globals.css. There is no SCRIM_CLEAR_NARROW any more:
 * §22(b) gives narrow viewports the FULL width and lets the ramp fade the mark's
 * left side, which is the large-faint-watermark reading the client asked for
 * rather than a small fully-released badge. */

function parseRGB(raw: string): RGB | null {
  const m = raw.trim().match(/^#?([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const r = raw.match(/rgba?\(([^)]+)\)/);
  if (!r) return null;
  const p = r[1].split(",").map((v) => parseFloat(v));
  return p.length >= 3 ? [p[0], p[1], p[2]] : null;
}
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** Theme-dependent ink. Dark: the mark is a lighter form catching light.
 *  Light: a cool shade, because the page is #F6F9FC and a grey wash reads as
 *  dirt — a tinted shadow reads as a form. */
function palette(isLight: boolean) {
  return isLight
    // Raised 2026-09-04. WCAG relative-luminance ratios against the measured
    // hero background (rgb(246,249,252) light, rgb(10,22,40) dark) with the mark
    // in its released position: fill ~1.35:1 (a soft watermark that is
    // unmistakably present without competing), edge ~2.2:1 (a definite
    // contour). Both are far under the headline's own >15:1, so the mark cannot
    // pull focus. Light and dark are matched so the mark reads the same weight
    // in both themes — dark used to be 2.4x fainter than light on fill.
    // 2026-09-04, §22(a): back to the WATERMARK register. The 0.34/0.62 values
    // were tuned when the mark was a small contained badge and needed to hold
    // its own; at watermark scale they read as a placed object. Lowering these
    // LOWERS the measured contrast ratio and that is the correct direction —
    // §3's targets were always ~1.3:1 fill and ~2.1:1 contour, and the number
    // was never the problem. Dark is scaled proportionally.
    // §31, 2026-09-05: "less prominent, with less opacity". Both alphas drop to
    // ~0.65 of their previous value (light 0.20/0.38 -> 0.13/0.25, dark
    // 0.10/0.27 -> 0.065/0.175). The fill:edge RATIO is preserved exactly in
    // each theme, so the mark keeps reading as a contoured form rather than a
    // flat smudge — §24 matched dark to light on mean dRGB and that match still
    // holds after a uniform scale. The alpha cut is deliberately paired with
    // the size increase above: a mark that is now ~1.6x larger at the same
    // alpha would have gained prominence, which is the opposite of the ask.
    // §32, 2026-09-05: "less opaque" again, on top of §31's cut. Both alphas in
    // BOTH themes are multiplied by the SAME 0.75, so every relationship the
    // blocks above spent four revisions establishing survives untouched: the
    // light fill:edge ratio stays 0.52, the dark fill:edge ratio stays 0.372,
    // and §24's cross-theme match on mean dRGB is preserved because a uniform
    // scale on both themes cannot move their ratio to each other. Do NOT
    // "tidy" these into a single pair of numbers — dark is 0.27-not-0.20 for
    // the reason spelled out in the dark branch below, and that asymmetry is
    // load-bearing.
    // Light 0.13 -> 0.0975 fill, 0.25 -> 0.1875 edge.
    // §35: 0.0975 -> MARK_FILL_A_LIGHT (0.55), 0.1875 -> MARK_EDGE_A_LIGHT (0.68).
    // The comments above record the WATERMARK register that §22-§33 tuned for.
    // §35 deliberately leaves that register: the owner rejected it three times
    // as a ghost. See the §35 block for the fill-dominant rationale.
    ? { fill: [140, 160, 190] as RGB, fillA: MARK_FILL_A_LIGHT, edge: [104, 128, 162] as RGB, edgeA: MARK_EDGE_A_LIGHT }
    // DARK EDGE IS 0.27, NOT 0.20. §22 scaled dark proportionally from light,
    // but light uses two DIFFERENT colours for fill and edge ([140,160,190] /
    // [104,128,162]) while dark uses the SAME colour for both, so proportional
    // scaling does not preserve the fill-to-edge relationship. Matched instead
    // on mean dRGB against the page: light fill 0.20 -> 17.1 vs dark 0.10 ->
    // 17.0; light edge 0.38 -> 45.2 vs dark 0.27 -> 44.6. (0.20 would give 33.1,
    // about a quarter of light.) dRGB rather than a WCAG ratio deliberately:
    // ratio is a text-legibility metric, and on a dark ground the same ratio
    // carries ~12x less absolute luminance difference.
    // §32: dark 0.065 -> 0.04875 fill, 0.175 -> 0.13125 edge. Same 0.75 factor.
    // §35: 0.04875 -> MARK_FILL_A_DARK (0.285), 0.13125 -> MARK_EDGE_A_DARK
    // (0.484). Derived from light by §24's mean-dRGB match, NOT by a uniform
    // scale — the arithmetic is in the §35 block.
    : { fill: [150, 186, 232] as RGB, fillA: MARK_FILL_A_DARK, edge: [150, 186, 232] as RGB, edgeA: MARK_EDGE_A_DARK };
}

export type MarkLight = { destroy: () => void };

export function mountMarkLight(container: HTMLElement): MarkLight {
  /* TWO canvases, with the scrim between them. This is the whole of §26.1.
     The beam's invisibility under the phone plateau was never a scrim problem —
     it was a layering accident. One canvas held mark AND beam at z-0 with
     .ps-hero-overlay at z-1 on top, so the 0.95-0.97 white plateau crushed the
     beam wherever it crushed the mark. Alphas, gains, moving stops and parking
     were all aimed at the wrong thing.

       #ps-hero-canvas   z 0   the plate (mark) — under the scrim, stays faint
       .ps-hero-overlay  z 1   the scrim        — UNCHANGED, not one stop moves
       #ps-hero-beam     z 1   the beam only    — inserted AFTER the overlay
       .ps-hero-content  z 2   the type         — unchanged, still on top

     Equal z-index with later DOM order puts the beam above the scrim and below
     the type. The scrim's job is to protect TYPE from the MARK; the beam is a
     1-3px highlight that never approaches the headline ink, because the stage is
     below it by construction. It should never have been under that veil. */
  /* §29: the PLATE now goes above the scrim too, for the same reason the beam
     did in §26.1. Under the scrim, the plate's visible opacity was its own alpha
     MULTIPLIED by whatever the scrim left — and the scrim varies across the
     width, so that variation was the gradient the client saw. Above it, the
     alpha is exactly what palette() sets, uniformly.
     NO VALUE CHANGES. 0.20 / 0.38 already ARE the unveiled values: §22 tuned
     them by rendering at 1440, where the mark sits entirely in the released
     column and the scrim is ~0, so they were never chosen against a veil.
     Measured confirmation: released-region edge 1.46 against desktop's 1.47.
     Final order — overlay, plate, beam, type — all three canvases at z-index 1
     except the type at 2, so DOM order decides between them. */
  const overlay = container.querySelector(".ps-hero-overlay");

  const canvas = document.createElement("canvas");
  canvas.id = "ps-hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  if (overlay) overlay.after(canvas);
  else container.prepend(canvas);

  const beamCanvas = document.createElement("canvas");
  beamCanvas.id = "ps-hero-beam";
  beamCanvas.setAttribute("aria-hidden", "true");
  // After the PLATE, not the overlay: the beam is a highlight ON the mark and
  // must stay above it.
  canvas.after(beamCanvas);

  const ctx0 = canvas.getContext("2d");
  const bctx0 = beamCanvas.getContext("2d");
  if (!ctx0 || !bctx0) return { destroy: () => { canvas.remove(); beamCanvas.remove(); } };
  const ctx: CanvasRenderingContext2D = ctx0;
  const bctx: CanvasRenderingContext2D = bctx0;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  let raf = 0;
  let destroyed = false;
  let plate: HTMLCanvasElement | null = null;
  let outline: Array<[number, number]> = [];
  let cumulative: number[] = [];
  let total = 0;
  let W = 0, H = 0, dpr = 1;
  let onStage = true;
  let started = 0;
  let narrow = false;
  /* §33(c). The feathered keep-outs, in CSS px, set by layout() and consumed by
     BOTH the plate (light only) and the beam (both themes). Empty disables.
     `feather` is the same for every rect and is carried alongside so the beam's
     per-segment attenuation and the plate's gradient punch cannot drift apart.
     platePush is a SUBSET of beamPush — see the §33(c) block. */
  type Keepout = { l: number; t: number; r: number; b: number };
  let platePush: Keepout[] = [];
  let beamPush: Keepout[] = [];
  let feather = 0;
  let lastPaint = 0;
  /** --color-primary, resolved once per build() instead of on every frame.
     It only changes with the theme, and a theme change already triggers a
     rebuild via the MutationObserver below. Cheap either way (0.33us on clean
     style) but there is no reason to read layout-adjacent state at 30-60Hz. */
  let accent: RGB = [21, 144, 255];
  /** The rectangle the previous frame's beam was stroked into, in device
   *  pixels. Restoring only this plus the new one is what keeps the loop off
   *  the full viewport. Null means "the whole canvas is clean plate". */
  let dirty: [number, number, number, number] | null = null;
  /** Arc-length distance of the outline's rightmost vertex. Set in build(). */
  let parkDist = 0;
  /* TIME remap for the beam, §30-B. With the mark bleeding off-frame, part of
     the outline is off-canvas, and walking it at a constant arc-length rate
     leaves the beam invisible for as long as that arc takes — measured 0.70s at
     a 430px mark and 5.45s at 700px, against the client's original complaint of
     gaps "up to 1,400ms". So the loop is re-timed rather than re-shaped: the
     visible arc keeps the whole lap minus a FIXED HIDDEN_TRAVERSE_MS, and the
     entire off-screen arc is crossed in that fixed budget however long it is.
     Dark time is then constant at any bleed, and the beam re-enters AT THE FRAME
     EDGE, where a viewer expects a cropped thing to reappear — never mid-form,
     which is what read as broken and which §26.1 fixed separately.
     It also decouples size from beam continuity permanently: a future "bigger
     still" costs nothing here.
     On desktop nothing is off-canvas, so hidLen is 0, the whole lap goes to the
     visible arc, and this reduces EXACTLY to the previous uniform mapping. */
  let segT: number[] = [0];
  let lapMs = 0;
  let parkT = 0;

  const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
  /** Only a stated motion preference parks the beam. The narrow park added in
   *  §25.1 is REVERTED: it existed because the beam was invisible for 8 of 12
   *  samples under the phone plateau, and §26.1 fixed that by moving the beam
   *  above the scrim instead. A layering fix beats a motion workaround. */
  const still = () => reduced;
  const period = () => (narrow ? BEAM_PERIOD_MS_NARROW : BEAM_PERIOD_MS);
  /** Where the parked beam sits, as a `now` value that drawBeam turns into a
   *  phase. The old hardcoded 0.34 of a lap was chosen when the mark was
   *  elsewhere and is no longer guaranteed to land in the released band — park
   *  on the outline's RIGHTMOST point instead, which is the bowl's outer curve
   *  and is released at every width by construction, since the stage's right
   *  edge is W - STAGE_PAD. */
  const parked = () => parkT;

  function markPath(p: Path2D, s: number, tx: number, ty: number) {
    for (const poly of [MARK_BODY, MARK_WEDGE]) {
      p.moveTo(poly[0] * s + tx, poly[1] * s + ty);
      for (let i = 2; i < poly.length; i += 2) p.lineTo(poly[i] * s + tx, poly[i + 1] * s + ty);
      p.closePath();
    }
  }

  /** §33(c). How much of the mark survives at a point, 0 (fully erased) to 1
   *  (untouched), given a set of keep-out rects and the shared feather. The
   *  distance is the true Euclidean distance to the rect, so the corners fall
   *  off on a quarter-circle rather than a square — which is what punch() draws
   *  on the plate, and the two MUST agree or the beam will glow inside a hole
   *  the plate has already cleared. */
  function keepFactor(x: number, y: number, rects: Keepout[]): number {
    if (!rects.length || !(feather > 0)) return 1;
    let f = 1;
    for (const k of rects) {
      const dx = Math.max(0, k.l - x, x - k.r);
      const dy = Math.max(0, k.t - y, y - k.b);
      const d = Math.hypot(dx, dy);
      const v = d >= feather ? 1 : d / feather;
      if (v < f) f = v;
      if (f === 0) return 0;
    }
    return f;
  }

  /** §33(c). Erase a feathered rectangle out of `c` (which must already be in a
   *  destination-out composite). Built from a solid core, four linear-gradient
   *  edges and four clipped radial-gradient corners rather than from
   *  ctx.filter = "blur(...)".
   *
   *  THAT IS DELIBERATE AND IT IS A SAFARI CONSTRAINT, NOT A STYLE CHOICE.
   *  Canvas2D `filter` is unsupported in Safari before 17 and silently does
   *  nothing there — the punch would land as a hard-edged rectangle cut out of
   *  the watermark on exactly the browser this project has been burned on
   *  twice. Gradients are universally supported and the corner radials give the
   *  same Euclidean falloff keepFactor() computes analytically. Nine fills, once
   *  per build(), never per frame. */
  function punch(c: CanvasRenderingContext2D, k: Keepout, scale: number) {
    const F = feather * scale;
    const l = k.l * scale, t = k.t * scale, r = k.r * scale, b = k.b * scale;
    const solid = "rgba(0,0,0,1)", clear = "rgba(0,0,0,0)";
    c.fillStyle = solid;
    c.fillRect(l, t, r - l, b - t);
    const lin = (x0: number, y0: number, x1: number, y1: number,
                 rx: number, ry: number, rw: number, rh: number) => {
      if (rw <= 0 || rh <= 0) return;
      const g = c.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, solid); g.addColorStop(1, clear);
      c.fillStyle = g; c.fillRect(rx, ry, rw, rh);
    };
    lin(0, t, 0, t - F, l, t - F, r - l, F);          // top
    lin(0, b, 0, b + F, l, b, r - l, F);              // bottom
    lin(l, 0, l - F, 0, l - F, t, F, b - t);          // left
    lin(r, 0, r + F, 0, r, t, F, b - t);              // right
    for (const [cx, cy, qx, qy] of [[l, t, l - F, t - F], [r, t, r, t - F],
                                    [l, b, l - F, b], [r, b, r, b]]) {
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, F);
      g.addColorStop(0, solid); g.addColorStop(1, clear);
      c.save();
      c.beginPath(); c.rect(qx, qy, F, F); c.clip();
      c.fillStyle = g; c.fillRect(qx, qy, F, F);
      c.restore();
    }
  }

  /** The rectangle the whole mark is fitted inside. Two candidates: the column
   *  right of the headline, and the band between the CTAs and the scroll cue.
   *  Whichever fits the mark larger wins — which self-selects the column on
   *  desktop and the band on tablets and phones, with no magic breakpoint.
   *  Measured rather than assumed: the headline's ink edge moves with the webfont
   *  and with clamp(1.375rem, 7.5vw, 5.5rem), so a hardcoded fraction is wrong on
   *  half the width range. */
  /** The headline's INK rectangles, in container coordinates. Boxes are the full
   *  flex column and are useless for this; ink is what can actually collide. */
  function headlineInk(): Array<{ l: number; r: number; t: number; b: number; accent: boolean }> {
    const cr = container.getBoundingClientRect();
    const out: Array<{ l: number; r: number; t: number; b: number; accent: boolean }> = [];
    container.querySelectorAll(".ps-hero-line").forEach((el) => {
      const rg = document.createRange();
      rg.selectNodeContents(el);
      const b = rg.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) {
        /* §32 keeps the accent flag even though the wide guard no longer uses
           it: it is how a future reader identifies the one line with no
           contrast headroom, and it is what the contrast harness keys on. */
        out.push({ l: b.left - cr.left, r: b.right - cr.left, t: b.top - cr.top, b: b.bottom - cr.top,
                   accent: el.classList.contains("ps-hero-line--accent") });
      }
    });
    return out;
  }

  /** Area, in css px², where the mark's INK overlaps the headline's INK.
   *  Scanlines the evenodd polygon pair — the same fill rule markPath() uses —
   *  against each line's ink rect. This is the whole point of §22(c): the old
   *  guard pushed the mark's BOX right of the headline, but the mark's ink at
   *  the headline's y-band sits far right of its box edge because the tail
   *  sweeps down-left BELOW the text. Testing ink against ink is what buys the
   *  size back. Runs in build(), never in frame(). */
  function inkOverlap(sCss: number, ox: number, oy: number,
                      rects: Array<{ l: number; r: number; t: number; b: number; accent?: boolean }>): number {
    if (!rects.length || !(sCss > 0)) return 0;
    let area = 0;
    for (const rect of rects) {
      const y0 = Math.floor(rect.t), y1 = Math.ceil(rect.b);
      for (let y = y0; y < y1; y++) {
        const xs: number[] = [];
        for (const poly of [MARK_BODY, MARK_WEDGE]) {
          const n = poly.length / 2;
          for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const ay = poly[i * 2 + 1] * sCss + oy, by = poly[j * 2 + 1] * sCss + oy;
            if ((ay <= y && by > y) || (by <= y && ay > y)) {
              const ax = poly[i * 2] * sCss + ox, bx = poly[j * 2] * sCss + ox;
              xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
            }
          }
        }
        if (xs.length < 2) continue;
        xs.sort((a, b) => a - b);
        // even-odd: fill between alternate pairs
        for (let k = 0; k + 1 < xs.length; k += 2) {
          const l = Math.max(xs[k], rect.l), r = Math.min(xs[k + 1], rect.r);
          if (r > l) area += r - l;
        }
      }
    }
    return area;
  }

  type Placement = { sCss: number; ox: number; oy: number };

  /** Fit the mark into a stage rect and return its placement in css px, where a
   *  polygon point maps to (P.x * sCss + ox, P.y * sCss + oy). */
  function fitInto(st: { x: number; y: number; w: number; h: number }, shrink: number): Placement {
    const sCss = Math.min(st.w / MARK_W, st.h / MARK_H) * shrink;
    return {
      sCss,
      ox: st.x + (st.w - MARK_W * sCss) / 2 - MARK_X0 * sCss,
      oy: st.y + (st.h - MARK_H * sCss) / 2 - MARK_Y0 * sCss,
    };
  }

  /** §22(b)+(c). A WIDTH REGIME, not an A/B fit, plus a true ink test.
   *
   *  Wide: the full hero height in the column the light scrim has released. The
   *  mark is width-bound there, so it grows to fill that column.
   *  Narrow: the full width, dropped below the headline's ink, sweeping BEHIND
   *  the CTA buttons. Passing behind content is what makes it read as a
   *  background layer; the previous contained version sat in empty space below
   *  everything, which is exactly what makes a thing look stuck on.
   *
   *  The headline guard is now a TEST, not a margin. Deleting it outright is not
   *  safe — measured at 820, the scrim floor alone leaves ~2,825 px² of real ink
   *  overlap. So: lay out, scanline, and only if ink actually collides drop
   *  below the headline and then shrink 4% per iteration. */
  function layout(): Placement {
    const rects = headlineInk();
    const headBottom = rects.length ? Math.max(...rects.map((r) => r.b)) : 0;
    const floor = Math.max(STAGE_PAD, W * SCRIM_CLEAR);

    /* NARROW bleeds; WIDE does not, and that asymmetry is deliberate. At 1440
       the headline ink is [144,279,1296,573] and the mark sits beside it at
       [1008,1416]; a left-bleeding mark would have to cross the headline's
       column, and the only headline-free bands are y<279 and y>573 — so on
       desktop it could only sit BELOW the headline, replacing the one
       composition of this element nobody has rejected. Until the client rules
       on that trade, >=768 is untouched. */
    /* §33-P. `bleedW` is gone: NARROW_BLEED_W is now one of two inputs to the
       shared two-axis fit below rather than the phone's whole size. */
    /* §31. The stage's right edge is pushed past the viewport in both regimes.
       WIDE also drops its right-hand STAGE_PAD: keeping a 24px inset while
       asking the mark to hang off the edge is self-cancelling. The left edge is
       untouched at >=768 — it stays pinned to `floor`, the x where the
       light-theme scrim has released — so the mark still cannot walk into the
       headline's column, and the ink test below is still the thing that
       guarantees it. */
    /* §32. The stage is now built from the MARK outwards in both regimes: pick
       the mark's width, derive its height from the mark's own aspect, then
       place it so exactly MARK_OVERHANG of that width sits past the right edge.
       Because the stage's aspect equals the mark's, fitInto() is exact and the
       placement is the geometry, not the result of a contain-fit negotiation.

       NARROW keeps its §30-B rule: anchored under ALL the headline ink, sized
       by NARROW_BLEED_W. That composition is the one nobody has rejected and
       the one that still reads as a P, so §32 only grows it.

       WIDE is the part the client ruled on. The note above in this function
       recorded that on desktop the mark "could only sit BELOW the headline,
       replacing the one composition of this element nobody has rejected. Until
       the client rules on that trade, >=768 is untouched." He has now ruled:
       "make it under the business software title thing". So the wide mark drops
       to just below line 1's ink and is no longer confined to the column right
       of the headline — it is free to run left, behind lines 2 and 3, which is
       what buys back the size AND the bowl. `floor` is therefore no longer the
       wide left edge; the scrim still fades the mark's left side exactly as it
       does on a phone, which is the whole reason that phone composition works. */
    /* §32. WIDE: 1.7x, centred on the hero, deliberately BEHIND the type.
       Vertically CENTRED rather than anchored to anything in the headline. At
       1.7x the mark is taller than the hero at most desktop sizes (951px in a
       900px hero at 1440), so centring puts its top ABOVE the hero's top edge
       and it overflows both ways — which is exactly the "higher" the client
       asked for, and it needs no magic offset to achieve. */
    /* §33(c). Arm the feathered keep-outs, in BOTH regimes now. The plate takes
       the accent line; the beam takes every line. Both are the MEASURED ink
       boxes grown by KEEPOUT_MARGIN.
       NARROW ARMS THEM TOO, WHICH §32 DID NOT. Under §32 the phone mark sat
       BELOW all the headline ink, so nothing needed protecting; §33-P puts it
       BEHIND the type exactly as on desktop, so the same protection applies.
       Leaving this wide-only was the single change most likely to ship a WCAG
       failure on a phone. */
    const grow = (r: { l: number; t: number; r: number; b: number }): Keepout => ({
      l: r.l - KEEPOUT_MARGIN, t: r.t - KEEPOUT_MARGIN,
      r: r.r + KEEPOUT_MARGIN, b: r.b + KEEPOUT_MARGIN,
    });
    if (rects.length) {
      /* §35: the feather takes a px floor. See KEEPOUT_FEATHER_MIN. */
      feather = Math.max(KEEPOUT_FEATHER * W, KEEPOUT_FEATHER_MIN);
      beamPush = rects.map(grow);
      /* §35: EVERY headline line, not just the accent one. §33(c) protected the
         accent line alone because at fillA 0.0975 the plate was too faint to
         threaten the white/near-black lines. At §35's 0.55 it is not: measured
         unprotected, the plate pulls line 1 well down from its 15.7:1. The
         subset optimisation was correct for a hairline and is wrong for a
         mass. */
      platePush = rects.map(grow);
    } else {
      feather = 0; beamPush = []; platePush = [];
    }

    /* §33(a)+(b), NOW NARROW ONLY — see §37. Sized off BOTH axes and anchored by
       its INK TOP. s0 is the scale in css px per mark-box unit; on every phone in
       the matrix the HEIGHT term binds (at 390x844, sH 1.12 against sW 0.63), so
       NARROW_BLEED_W is the floor §33-P describes and NARROW_MARK_H is the live
       lever. The stage's width and height are the mark's own, so fitInto()'s
       contain-fit is exact and this placement IS the geometry rather than the
       result of a negotiation.

       THIS BLOCK IS THE PHONE COMPOSITION THE CLIENT HAS ACCEPTED. §37 changed
       nothing in it — not one constant, not one term. If you are here to change
       desktop, the branch you want is `contained` below. */
    /* §39, NARROW ONLY (see §39-R). The mark-derived stage that produces the
       magnified crop: bowl off the TOP, leg and bottom-left terminal in frame.
       It replaces §33-P's `bleeding`, and it is reached ONLY when
       `narrow === true`, i.e. W < NARROW_MAX (768).

       Three things about this are load-bearing and are NOT interchangeable with
       the shape it replaced:

       1. The stage's w/h ARE the mark's own w/h, so fitInto()'s Math.min at
          ~:1109 returns exactly s0 and both of its centring terms evaluate to
          zero. The placement IS the geometry, not the outcome of a contain-fit
          negotiation.
       2. `y` anchors the BOWL/STEM JUNCTION, not the ink top. fitInto's vertical
          centring is incompatible with the target: enlarging a centred glyph
          pushes the bowl off the top AND the terminal off the bottom together,
          which is the exact opposite of "show me the leg".
       3. `x` is a fraction of W, not of the mark's width. See terminalX().

       `portrait` here is NOT a regime boundary — the regime boundary is the 768
       breakpoint above. It only selects the crop's proportions for a phone that
       has been ROTATED, which is a shorter hero needing a slightly taller
       multiple. Every phone in the test matrix is portrait. */
    const portrait = H > W;
    const hF = portrait ? MARK_HF_PORTRAIT : MARK_HF_LANDSCAPE;
    const jF = portrait ? MARK_JF_PORTRAIT : MARK_JF_LANDSCAPE;
    const s0 = hF * H / MARK_H;
    const bleeding = {
      x: terminalX(W, portrait) * W,
      y: jF * H - (JUNCTION_Y - MARK_Y0) * s0,
      w: MARK_W * s0,
      h: MARK_H * s0,
    };

    /* §37. WIDE, restored verbatim from 6fcfd65:365 — the pre-rebuild desktop
       stage. The full hero height inset by STAGE_PAD, in the column running from
       `floor` (the x where the light-theme scrim has released) to W - STAGE_PAD.
       fitInto() CONTAIN-fits the mark inside it, so the glyph is whole and no
       edge of it leaves the frame. This is the composition the client asked to
       have back, and the reason it is a rect handed to fitInto() rather than a
       mark-derived stage is that "contained" is exactly what a contain-fit
       against a frame-inset rect means. */
    /* §37, RESTORED BY §39-R. WIDE, verbatim from 6fcfd65:365 — the pre-rebuild
       desktop stage. The full hero height inset by STAGE_PAD, in the column
       running from `floor` (the x where the light-theme scrim has released) to
       W - STAGE_PAD. fitInto() CONTAIN-fits the mark inside it, so the glyph is
       whole and no edge of it leaves the frame.

       §39 briefly re-pointed this branch at the mark-derived stage above. The
       owner reversed that on 2026-09-06: "The P is too big now" / "IT IS ONLY
       SUPPOSED TO BE THAT BIG ON MOBILE BTW". See §39-R and ADR-0011. */
    const contained = { x: floor, y: STAGE_PAD, w: W - STAGE_PAD - floor, h: H - STAGE_PAD * 2 };

    const primary = narrow ? bleeding : contained;
    // Step 3: the same recipe the narrow regime already uses — drop clear of the
    // headline's ink entirely. For narrow this is identical to `primary`, so the
    // loop simply falls through to the shrink step.
    const dropped = { x: STAGE_PAD, y: headBottom + 8, w: W - STAGE_PAD * 2, h: H - STAGE_PAD - (headBottom + 8) };

    /* §32. WIDE is tested against LINE 1 ONLY. The guard's job changed with the
       client's ruling: it used to mean "the mark may not touch the headline",
       and it now means "the mark must stay under the Business Software. line".
       Lines 2 and 3 are crossed DELIBERATELY — that is what "under the title"
       buys and it is what the phone regime has always done behind the CTAs.
       Crossing them is only safe because of three things that are all still
       true, and if any of them changes this has to be re-tested:
         - the alphas are 0.0975/0.1875 light and 0.04875/0.13125 dark,
         - .ps-hero-overlay's left plateau (0.97 to 62%) is untouched by §32,
         - the mark's ink left edge is measured, not assumed.
       Measured after this change: worst-case contrast behind every headline
       line is unchanged from before §32 to two decimal places in both themes at
       all fourteen viewports. The numbers are in the §32 block. NARROW still
       tests every line, which costs nothing because it sits below all of them. */
    /* §32. WIDE HAS NO INK GUARD. "under" meant BEHIND: the mark is supposed to
       sit beneath the headline in z-order, so an ink-collision test that pushes
       it out of the headline's way is now testing for the wrong thing entirely.
       Legibility is defended by ALPHA and measured contrast instead — and it
       has to be, because since §29 the plate paints ABOVE .ps-hero-overlay
       (globals.css:1198-1204), so the scrim does not buffer the type from the
       mark at all. NARROW keeps the guard: it sits below the headline there and
       the test costs nothing. */
    /* §33-P. NARROW NO LONGER KEEPS THE GUARD EITHER, and this is the whole of
       the phone change. The guard pushed the phone mark below the headline's
       ink — which is the composition the client rejected IN WORDS on 2026-09-05:
       "the P hero should be higher I meant it should be behind the hero text
       there not vertically below it." §32 applied that correction to desktop
       only and left phones sitting under the type. Measured before §33 at
       390x844 light: the plate's ink box was [0,485,389,842] in an 844px hero —
       the entire headline, and the top 57% of the hero, had no mark behind it at
       all. Two passes have now shipped that. The guard goes; legibility on
       phones is defended by the same measured keep-out as on desktop. */
    /* §37. THE GUARD IS BACK ON DESKTOP AND STILL OFF ON PHONES.
       Wide gets `rects` — every headline line, ink-vs-ink, exactly as 6fcfd65:378
       had it. That is what re-arms the two mechanisms below: the `dropped` stage
       and the 12-step 0.96 shrink. Under §33 this array was empty at every
       viewport, so `inkOverlap(...) === 0` was true on the first iteration and
       BOTH mechanisms were dead code. Restoring the contained stage without
       restoring this would have left the desktop mark sitting on the headline
       with nothing to push it clear.
       NARROW KEEPS THE EMPTY GUARD. §33-P deleted it deliberately — the phone
       mark is SUPPOSED to sit behind the type — and re-arming it there would
       push the phone mark back below the headline, which is the composition the
       client rejected in words on 2026-09-05. Empty here means the loop returns
       `primary` on its first iteration, i.e. the phone path is bit-for-bit what
       it was before §37. */
    /* §37, RESTORED BY §39-R. THE GUARD IS ARMED ON WIDE AND EMPTY ON NARROW.

       Wide gets `rects` — every headline line, ink-vs-ink, exactly as
       6fcfd65:378 had it. That is what arms the two mechanisms below: the
       `dropped` stage and the 12-step 0.96 shrink. Without it the restored
       `contained` stage would sit on the headline with nothing to push it clear.

       NARROW KEEPS THE EMPTY GUARD. The phone mark is SUPPOSED to sit behind
       the type; re-arming it there would push the phone mark back below the
       headline, which the client rejected in words on 2026-09-05. Empty here
       means the loop returns `primary` on its first iteration, so the phone
       path is bit-for-bit the §39 crop.

       §39 briefly emptied this on wide too, to stop the shrink/drop loop eating
       the desktop enlargement. The owner reversed that enlargement, so the
       guard goes back with it — see §39-R. Legibility on BOTH paths is still
       carried by the platePush keep-out, which yields plate alpha exactly 0
       over every headline line and is unchanged throughout. */
    const guard: typeof rects = narrow ? [] : rects;
    let last = fitInto(primary, 1);
    for (const st of [primary, dropped]) {
      if (!(st.w > 0 && st.h > 0)) continue;
      for (let k = 0; k < 12; k++) {
        const pl = fitInto(st, Math.pow(0.96, k));
        if (!(pl.sCss > 0)) break;
        last = pl;
        if (inkOverlap(pl.sCss, pl.ox, pl.oy, guard) === 0) return pl;
      }
    }
    return last;   // never paint nothing; the caller guards sCss > 0
  }


  /** Paint the mark into the offscreen plate and cache its outline in device
   *  pixels so the beam can walk the same edge that is actually visible. */
  function build() {
    const rect = container.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    narrow = W < NARROW_MAX;
    dpr = Math.min(window.devicePixelRatio || 1, narrow ? DPR_CAP_NARROW : DPR_CAP);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    beamCanvas.width = canvas.width;
    beamCanvas.height = canvas.height;
    beamCanvas.style.width = W + "px";
    beamCanvas.style.height = H + "px";

    /* The whole mark is fitted INSIDE a measured stage rather than drawn
       oversized and cropped by the frame. That single change is what makes the
       beam continuously visible (no part of the outline is off-canvas, so there
       are no dark gaps), what makes the P legible (it now sits where the scrim
       has released, so raising its alpha actually shows up), and what takes the
       headline overlap to zero at every width by construction rather than by
       tuning a breakpoint. It deliberately reverses the "bigger than 1 means it
       is cropped by the frame — which is the point" intent in the header note:
       you cannot have a continuously-visible beam around a shape whose outline
       leaves the frame. */
    const pl = layout();
    const sCss = pl.sCss;
    const s = sCss * dpr;
    const tx = pl.ox * dpr;
    const ty = pl.oy * dpr;

    /* §39. Publish the placement actually used to paint. The keep-out punch
       erases the mark wherever the headline is, so the painted ink's bounding
       box is NOT the placement and cannot be inverted to recover it — a render
       can satisfy an ink-bbox target exactly while showing almost nothing. This
       is the only way to check the geometry criterion against what shipped
       rather than against what the constants imply. Data attribute only: no
       layout, no paint, no reflow, and #ps-hero-canvas is pointer-events:none
       and aria-hidden already. */
    canvas.dataset.placement = JSON.stringify({
      sCss: +sCss.toFixed(4), ox: +pl.ox.toFixed(2), oy: +pl.oy.toFixed(2), w: W, h: H,
    });

    // A degenerate stage (a very short viewport) means there is nowhere honest
    // to put the mark. Paint nothing rather than a sliver.
    if (!(s > 0)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
      outline = []; cumulative = [0]; total = 0; plate = null; dirty = null;
      return;
    }

    accent = parseRGB(getComputedStyle(container).getPropertyValue("--color-primary")) || [21, 144, 255];
    const pal = palette(isLight());
    plate = document.createElement("canvas");
    plate.width = canvas.width;
    plate.height = canvas.height;
    const p = plate.getContext("2d");
    if (!p) return;

    // Filled from the traced contour, not the webp. The bitmap is lossy and
    // its compression banding becomes visible as vertical striping once it is
    // tinted and scaled this far up; the polygons are exact and flat.
    const path = new Path2D();
    markPath(path, s, tx, ty);
    p.fillStyle = rgba(pal.fill, pal.fillA);
    p.fill(path, "evenodd");
    // A hairline keeps the edge definite rather than letting it dissolve.
    p.strokeStyle = rgba(pal.edge, pal.edgeA);
    /* Scale-proportional, clamped. An absolute 1.1*dpr hairline read ~2.2x
       heavier once the mark stopped being drawn oversized. */
    p.lineWidth = Math.max(1.25 * dpr, Math.min(3 * dpr, s * 3.2));
    p.lineJoin = "round";
    p.stroke(path);

    /* §32(e). Fade the plate out across the text column. destination-in keeps
       the plate's own shape and multiplies its alpha by the gradient, so the
       mark dissolves toward the headline instead of being clipped by a hard
       edge. One gradient fill per build(), never per frame. */
    /* LIGHT ONLY. Dark does not need the PLATE ramped: measured at 1.7x with
       the mark behind it and the beam attenuated, dark's accent line sits at
       4.05:1 from the static ink alone, well clear of 3:1. Light has ~0.22 of
       headroom and fails at 2.42:1. Ramping only the theme that needs it keeps
       the whole letterform on dark, where the stem is otherwise the first thing
       the ramp eats. The BEAM ramp below is NOT theme-scoped — the beam is
       brand blue in both themes and crosses brand-blue type in both. */
    /* §35: NO LONGER LIGHT-ONLY. The light-only reasoning above was measured at
       §33's dark fillA of 0.04875, where dark genuinely had the headroom. At
       §35's 0.285 it does not — the dark plate leaves the accent line around
       3:1 unprotected, which is not a margin. Ramping both themes costs dark a
       little of the stem, which is the cheaper trade. NOTE `isLight` is a
       FUNCTION on this closure: `&& isLight` (no call) is always truthy and
       would silently apply to both themes by accident rather than by choice. */
    if (platePush.length && feather > 0) {
      p.globalCompositeOperation = "destination-out";
      for (const k of platePush) punch(p, k, dpr);
      p.globalCompositeOperation = "source-over";
    }

    /* The `destination-in` alpha ramp that used to fade the plate toward the
       text column is GONE (2026-09-04). It faded the P but never the beam —
       the beam is stroked onto `ctx`, not onto the plate — so the light read as
       detached from a mark that was not there. Geometry now does the separation
       the ramp was doing: the stage never overlaps the headline. Removing it
       also drops one full-canvas gradient fill and one composite pass from
       every build(). */

    // Outline in device pixels, for the beam.
    outline = [];
    for (let i = 0; i < MARK_BODY.length; i += 2) {
      outline.push([MARK_BODY[i] * s + tx, MARK_BODY[i + 1] * s + ty]);
    }
    // Close the loop. Without this the closing edge — the top bar of the P —
    // is not part of the arc-length, so when the beam runs off the last vertex
    // it jumps straight back to the first instead of crossing that edge.
    outline.push([outline[0][0], outline[0][1]]);
    cumulative = [0];
    total = 0;
    for (let i = 1; i < outline.length; i++) {
      total += Math.hypot(outline[i][0] - outline[i - 1][0], outline[i][1] - outline[i - 1][1]);
      cumulative.push(total);
    }
    /* §33(e). THE PARK POINT — where the beam sits as a STILL FRAME under
       prefers-reduced-motion. Rewritten, and the first version of this rewrite
       was still wrong, which is worth recording.

       The rule used to be "the rightmost vertex, i.e. deepest into the released
       band". At §33's scale that vertex is ~800px past the right edge, so the
       still frame parked on a beam nobody could see. The obvious repair —
       "rightmost vertex that is ON canvas" — MEASURED ZERO BEAM PIXELS at
       390x844 and 768x1024 in both themes. It is not enough, because the beam
       is not a point: it is a RUN of the outline `total * 0.085` long ending at
       the head, and it is attenuated per segment by the keep-out. A head can
       sit on canvas while the whole run behind it is off-frame or inside the
       hole punched over the headline, and then nothing is drawn.
       So score the RUN, not the point: sample candidate heads around the lap,
       and for each count how much of its own span would actually be painted.
       Ties break rightwards, which preserves the old rule's intent — park deep
       in the band the light scrim has released. */
    parkDist = 0;
    let parkIdx = 0;
    {
      const spanLen = total * 0.085;
      const CANDIDATES = 96, PROBES = 16;
      let bestScore = -1, bestX = -Infinity;
      const atIdx = (d: number) => {
        let lo = 0, hi = cumulative.length - 1;
        while (lo < hi - 1) { const m = (lo + hi) >> 1; if (cumulative[m] <= d) lo = m; else hi = m; }
        return lo;
      };
      for (let c = 0; c < CANDIDATES; c++) {
        const head = (c / CANDIDATES) * total;
        let score = 0, sumX = 0;
        for (let q = 0; q <= PROBES; q++) {
          const d = (head - spanLen * (1 - q / PROBES) + total) % total;
          const i = atIdx(d);
          const [px, py] = outline[i];
          if (px < 0 || px > canvas.width || py < 0 || py > canvas.height) continue;
          if (keepFactor(px / dpr, py / dpr, beamPush) <= 0.3) continue;
          score++; sumX += px;
        }
        const avgX = score ? sumX / score : -Infinity;
        if (score > bestScore || (score === bestScore && avgX > bestX)) {
          bestScore = score; bestX = avgX;
          parkIdx = atIdx(head); parkDist = cumulative[parkIdx];
        }
      }
    }

    // Time remap: visible arc at normal rate, the whole hidden arc in a fixed
    // budget. A segment counts as hidden if its midpoint is off the canvas.
    const vis: boolean[] = [];
    let hidLen = 0;
    for (let i = 1; i < outline.length; i++) {
      const mx = (outline[i][0] + outline[i - 1][0]) / 2;
      const my = (outline[i][1] + outline[i - 1][1]) / 2;
      const v = mx >= 0 && mx <= canvas.width && my >= 0 && my <= canvas.height;
      vis.push(v);
      if (!v) hidLen += cumulative[i] - cumulative[i - 1];
    }
    const visLen = total - hidLen;
    const P0 = period();
    // Never spend more than half a lap in the dark, however extreme the bleed.
    const hidMs = hidLen > 0 ? Math.min(HIDDEN_TRAVERSE_MS, P0 * 0.5) : 0;
    const visMs = P0 - hidMs;
    segT = [0];
    for (let i = 1; i < outline.length; i++) {
      const len = cumulative[i] - cumulative[i - 1];
      const dt = vis[i - 1]
        ? (visLen > 0 ? (len / visLen) * visMs : 0)
        : (hidLen > 0 ? (len / hidLen) * hidMs : 0);
      segT.push(segT[i - 1] + dt);
    }
    lapMs = segT[segT.length - 1] || P0;
    parkT = segT[parkIdx] || 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plate, 0, 0);
    bctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
    dirty = null;   // both canvases are clean
  }

  const at = (d: number): [number, number] => {
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (cumulative[mid] <= d) lo = mid; else hi = mid; }
    const seg = cumulative[hi] - cumulative[lo] || 1;
    const t = (d - cumulative[lo]) / seg;
    return [outline[lo][0] + (outline[hi][0] - outline[lo][0]) * t,
            outline[lo][1] + (outline[hi][1] - outline[lo][1]) * t];
  };

  /** The beam: a short run of the outline, brightest at its head, faded at
   *  both ends. It is no longer clipped — the mark is fitted into a stage that
   *  is already clear of the wordmark, so the whole lap is on-canvas and the
   *  light never reaches the type. */
  function drawBeam(now: number) {
    if (!plate || !total) return;

    // Time -> arc distance through the remap, not a linear phase.
    const t = lapMs > 0 ? (((now - started) % lapMs) + lapMs) % lapMs : 0;
    let lo = 0, hi = segT.length - 1;
    while (lo < hi - 1) { const mid = (lo + hi) >> 1; if (segT[mid] <= t) lo = mid; else hi = mid; }
    const span = segT[hi] - segT[lo] || 1;
    const head = cumulative[lo] + (cumulative[hi] - cumulative[lo]) * ((t - segT[lo]) / span);
    const len = total * 0.085;
    const steps = narrow ? BEAM_STEPS_NARROW : BEAM_STEPS;
    /* Half the widest stroke, plus the round cap, plus a pixel of slack. This
       MUST track the `widthGain` used when stroking below: the beam's widest
       lineWidth is (0.9 + 1.1) * widthGain * dpr, and a round cap extends half
       that beyond each endpoint. Under-padding here does not merely clip — the
       restore blit misses the stroke's outer edge, so every frame leaves a
       sliver behind and the ghost accumulates to near-opaque coloured banding.
       Kept deliberately generous; the dirty area is ~1.4% of the canvas even
       so. */
    const widthGain = narrow ? WIDTH_GAIN_NARROW : WIDTH_GAIN_WIDE;
    const widestStroke = 2.0 * widthGain * dpr;
    const pad = widestStroke + 2 * dpr + 2;

    // Walk the beam first and keep its bounding box, so the repaint below can
    // be confined to the pixels this frame and the last one actually touch.
    const segs: Array<[number, number, number, number, number]> = [];
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const a = (head - len * (1 - t0) + total) % total;
      const b = (head - len * (1 - t1) + total) % total;
      const p0 = at(a), p1 = at(b);
      /* The left guard (`W * 0.46 * dpr`) is gone with the ramp. It existed to
         keep the beam out of the text column; the mark is no longer in the text
         column. Below ~900px it was the second source of the dark gaps in the
         lap — at 390 it removed roughly a third of the outline. */
      const fall = Math.sin(Math.PI * t1);       // dark -> bright -> dark
      segs.push([p0[0], p0[1], p1[0], p1[1], fall]);
      x0 = Math.min(x0, p0[0], p1[0]); x1 = Math.max(x1, p0[0], p1[0]);
      y0 = Math.min(y0, p0[1], p1[1]); y1 = Math.max(y1, p0[1], p1[1]);
    }
    const box: [number, number, number, number] | null = segs.length
      ? [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2]
      : null;

    // Restore the plate over the union of the old beam's rectangle and the new
    // one. clearRect first: drawImage composites, it does not replace. Without
    // this, every frame stacks another copy of the semi-transparent plate and
    // another beam stroke — the ghost accumulates to near-opaque and the beam
    // smears into coloured vertical banding.
    /* The beam now lives on its own TRANSPARENT canvas, so restoring the
       previous frame is a bare clearRect — the plate does not have to be blitted
       back underneath it. That is strictly cheaper per frame than the
       clearRect + drawImage this replaces. The dirty-rect union and `pad` logic
       are unchanged and still coupled to WIDTH_GAIN_* (§14.7). */
    const zone = union(dirty, box);
    if (zone) {
      const [rx, ry, rw, rh] = zone;
      bctx.clearRect(rx, ry, rw, rh);
    }
    dirty = box;

    /* Beam weight. The old values (alpha 0.55 * fall^2, width 0.9 + 1.1 * fall)
       measured 1.03:1 against the page on a light-theme phone and 1.70:1 on
       dark — i.e. the light was moving and nobody could see it, which is the
       whole thing the owner asked for. The `.ps-hero` contrast veil at
       globals.css:1017-1031 sits OVER this canvas at a flat 0.55 and is a
       deliberate, documented trade-off (globals.css:1033-1045) protecting the
       headline, so it stays; the only honest lever is the beam's own weight
       underneath it.
       Narrow viewports get the bigger boost: the mark is drawn at 0.70 scale
       there, so the same stroke covers fewer CSS pixels and reads thinner, and
       a phone is the case that was worst. Light theme gets a further push
       because the veil costs it more headroom than it costs dark.
       Widening the stroke is doing more of the work than raising alpha — on a
       3x screen a bright hairline still reads as a hairline. */
    const alphaGain = isLight() ? ALPHA_GAIN_LIGHT : ALPHA_GAIN_DARK;

    /* BUTT caps, except on the two ends of the beam. (§27)
       The beam is 72 separate segments, each `total * 0.085 / 72` long. A ROUND
       cap extends lineWidth/2 past each endpoint — which is LONGER than the
       segments themselves — so every cap overlapped its neighbour and 71
       source-over composites accumulated as 1-(1-a)^n. Measured on the beam
       layer: max alpha 239/255 against a per-stroke ceiling of 0.6325 -> 161.
       That is 1.48x hotter than any tuned value intended.
       Butt caps abut exactly: no overlap, no accumulation, and all 72 alpha and
       width steps survive, so the sin(pi*t) head-bright/tail-dark envelope is
       untouched. Round is kept on the FIRST and LAST segment only, so the taper
       still terminates softly instead of ending on a flat edge.
       NOTE FOR WHOEVER FINDS THIS NEXT: the accumulation was always here. The
       two-canvas split in §26.1 did not cause it — it made it measurable for the
       first time, by isolating the beam on its own layer where its alpha could
       be read directly. The desktop beam has been ~1.48x hot since long before
       this run and nothing could have shown it. */
    bctx.save();
    const last = segs.length - 1;
    for (let i = 0; i <= last; i++) {
      const [ax, ay, bx, by, fall] = segs[i];
      bctx.lineCap = (i === 0 || i === last) ? "round" : "butt";
      /* §32(e), widened by §33(c). The beam gets the SAME keep-out as the plate,
         per segment — and over EVERY headline line in BOTH themes, not just the
         accent line on light. This is the half the 2026-09-04 ramp was missing,
         and it is the half that matters most: the beam is #1590FF at up to 0.63
         alpha, and unattenuated it measured 1.34:1 against #1590FF headline type
         on light and 2.10:1 against WHITE type on dark. Sampled at the segment's
         MIDPOINT, not its start: a segment is total*0.085/72 long, so an endpoint
         test lets the far end of the last unattenuated segment sit inside the
         hole. `ax`/`bx` are device px; keepFactor works in css px. */
      const rx = keepFactor((ax + bx) / 2 / dpr, (ay + by) / 2 / dpr, beamPush);
      if (rx <= 0) continue;
      bctx.strokeStyle = rgba(accent, Math.min(1, 0.55 * alphaGain * fall * fall * rx));
      bctx.lineWidth = (0.9 + 1.1 * fall) * widthGain * dpr;
      bctx.beginPath(); bctx.moveTo(ax, ay); bctx.lineTo(bx, by); bctx.stroke();
    }
    bctx.restore();
  }

  /** Union of two device-pixel rects, snapped out to whole pixels and clamped
   *  to the canvas. Either side may be absent. */
  function union(
    a: [number, number, number, number] | null,
    b: [number, number, number, number] | null,
  ): [number, number, number, number] | null {
    const r = !a ? b : !b ? a : [
      Math.min(a[0], b[0]),
      Math.min(a[1], b[1]),
      Math.max(a[0] + a[2], b[0] + b[2]) - Math.min(a[0], b[0]),
      Math.max(a[1] + a[3], b[1] + b[3]) - Math.min(a[1], b[1]),
    ] as [number, number, number, number];
    if (!r) return null;
    const lx = Math.max(0, Math.floor(r[0]));
    const ly = Math.max(0, Math.floor(r[1]));
    const rx = Math.min(canvas.width, Math.ceil(r[0] + r[2]));
    const ry = Math.min(canvas.height, Math.ceil(r[1] + r[3]));
    return rx > lx && ry > ly ? [lx, ly, rx - lx, ry - ly] : null;
  }

  function frame(now: number) {
    if (!started) started = now;
    // Narrow viewports paint at ~30fps. rAF still drives the loop so the
    // browser keeps throttling us in background tabs; we just skip the work.
    if (!narrow || now - lastPaint >= FRAME_GAP_MS_NARROW) {
      lastPaint = now;
      drawBeam(now);
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    /* `destroyed` is load-bearing, not defensive. io.disconnect() does not reset
       onStage, so after unmount a still-pending fonts.ready.then(rebuild) — or
       the entrance animationend — reached start() with onStage still true and
       started an rAF loop on a detached canvas that nothing could ever cancel:
       one leaked loop per client-side visit to the homepage. */
    if (destroyed || raf || still() || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function rebuild() {
    if (destroyed) return;   // a late fonts.ready / animationend must not repaint
    stop();
    build();               // sets `narrow`, which parked() and the loop read
    started = 0;
    lastPaint = 0;
    if (still()) {
      drawBeam(parked());  // a still frame, beam parked on the edge
    } else if (onStage) {
      start();
    }
  }

  build();
  if (still()) drawBeam(parked());

  // The hero leaves a phone's viewport within one flick of the thumb, so this
  // is the mitigation that matters most on mobile: no beam, no loop, off stage.
  const io = new IntersectionObserver((entries) => {
    onStage = entries[0]?.isIntersecting ?? true;
    if (onStage) start(); else stop();
  }, { threshold: 0 });
  io.observe(container);

  // rAF is already throttled in a hidden tab, but cancel the handle outright
  // so a backgrounded phone holds no pending frame at all.
  const onVisibility = () => { if (document.hidden) stop(); else if (onStage) start(); };
  document.addEventListener("visibilitychange", onVisibility);

  // Repaint on theme change even while the loop is stopped.
  const mo = new MutationObserver(rebuild);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  /* Rebuild on WIDTH changes only. The stage, the mark's scale and the backing
     store are all driven by width; a height-only change (an iOS toolbar moving,
     a desktop window dragged shorter) does not need either canvas reallocated.
     Height is still re-read on the next real rebuild. Belt-and-braces with the
     svh change in globals.css: that stops the hero's box tracking the toolbar,
     this stops the canvas reacting even if some other height source moves.
     `lastW` is seeded from W AFTER the first build() above, because build() is
     what sets W. */
  /* §39 — WIDTH-ONLY IS NOW A BUG AND THIS WATCHES HEIGHT TOO. The premise
     above ("the mark's scale is driven by width") was true under §37 and is
     FALSE under §39: s0 is `hF * H / MARK_H` and the vertical anchor is
     `jF * H`, so EVERY term of the new placement is driven by HEIGHT. Under the
     old guard a height-only change — an iOS toolbar collapsing, a desktop window
     dragged shorter — left the mark at a stale scale until some unrelated width
     or theme change happened to fire a rebuild. Reproduced before this change on
     a live page: resizing 393x852 -> 393x659 by height alone left the mark
     painted at the 852 scale, and the composition drifted by 0.19 of H.
     The 150ms debounce is unchanged, so a toolbar transition still coalesces
     into one rebuild rather than one per resize event. */
  let lastW = W;
  let lastH = H;
  let resizeTimer = 0;
  const onResize = () => {
    const box = container.getBoundingClientRect();
    if (Math.round(box.width) === lastW && Math.round(box.height) === lastH) return;
    clearTimeout(resizeTimer);
    // rebuild() FIRST: build() is the only thing that writes W, so reading
    // lastW before it left lastW permanently stale and the width guard dead
    // after a single width change.
    resizeTimer = window.setTimeout(() => { rebuild(); lastW = W; lastH = H; }, 150);
  };
  window.addEventListener("resize", onResize);

  // The stage is measured from the headline's ink, which moves when the webfont
  // swaps in. Without this the mark is laid out against the fallback metrics.
  if (document.fonts?.ready) document.fonts.ready.then(() => rebuild());

  /* Rebuild once the entrance settles. hero-entrance.css TRANSFORMS the hero's
     elements while it plays, and layout() measures the headline's INK — so a
     build() that lands mid-entrance measures the lines 24px low and lays the
     keep-out out against a position they do not end up in.

     §39-R2: the original note here described stage() candidate B being anchored
     to `.ps-hero-ctas`'s rect via `ctasBottom`. BOTH are gone — stage() was
     replaced by layout() in §39, and the CTAs were removed on 2026-09-07 — so
     that reasoning no longer describes this code and has been cut rather than
     left to mislead. What remains true and load-bearing:
       - `.ps-hero-line` is the anchor that matters; the headline moves 24px.
       - `.ps-hero-cue__btn` moves 12px and finishes last; rebuilding on it too
         is cheap insurance, and rebuild() is idempotent (1-2ms).
       - Under prefers-reduced-motion NO animationend EVER fires. That path must
         be correct without this listener — nothing is transformed there, so the
         first build() already measures everything at rest. This listener must
         never become the only thing producing a correct build. Verified. */
  /* §39-R2: `ps-hero-ctas` was a third anchor here. The hero CTAs were REMOVED
     on the owner's instruction of 2026-09-07, so that element no longer exists
     and the entry could only ever be a dead string. `ps-hero-line` is the
     load-bearing anchor — layout() measures the HEADLINE's ink and
     hero-entrance.css translates those lines by 24px while the entrance plays. */
  const ENTRANCE_ANCHORS = ["ps-hero-line", "ps-hero-cue__btn"];
  const onEntranceEnd = (e: AnimationEvent) => {
    if (!e.animationName.startsWith("ps-hero-rise")) return;
    const el = e.target as HTMLElement;
    if (el.offsetParent === null) return;
    if (!ENTRANCE_ANCHORS.some((c) => el.classList?.contains(c))) return;
    rebuild();
  };
  container.addEventListener("animationend", onEntranceEnd);

  return {
    destroy() {
      destroyed = true;
      onStage = false;      // io.disconnect() does NOT do this, and start() reads it
      stop(); io.disconnect(); mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("animationend", onEntranceEnd);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      canvas.remove();
      beamCanvas.remove();
    },
  };
}
