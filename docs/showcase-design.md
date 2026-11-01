# Design: the product showcase (home card window + /showcase pages)

Status: prototype on `feat/product-showcase`, draft PR, not merged. Decision record: `DECISIONS/0020`.
Owner's ask, 2026-10-31: hover a product, a glass window pops in showing their website, then slides
to the command center we built them; or click through to a page with a "portal" that scrolls their
website while it explains what each part is doing, and why it works on the person reading it.

**Rendered before deciding:** Playwright Chromium 148 (Node API), 1440×900 and 390×844, both themes, the
current home work section (main @ 24c8af8); the real Duffer Command Center on its own test fixtures
(duffer-partner-program `panel/tests/harness.py`, Python Playwright); the real MarCommand client portal
for Hays on its harness SAMPLE, never the captured Hays payloads (`packages/portal-ui/harness`); the live
duffergolf.net and haysacademy.edu at 1280 and 390.
**Served build fingerprint:** home chunk `app/page-75ac6ac47e34b823.js` (prototype, final), `app/page-a378a500cab85375.js` (main baseline).

## 1. The problem in the current design

The home "Real Projects" track is 300×405 cards with a logo. Hover (fine pointer) or tap opens a text
panel inside the card and a link off-site. Nothing shows the work. For Duffer and Hays, the two things
we actually built (a storefront that sells, and a command center that runs the business) are a
sentence each. That is the gap; the track itself (order, sizes, swipe) is sound and stays.

## 2. Interaction model

| Context | Trigger | What opens | Closes on |
|---|---|---|---|
| Fine pointer, viewport ≥ 900px | Pointer rests 280ms on a showcase card | **Glass window**, up to 720px wide, grows out of the card (FLIP from the card's rect). It never covers the section heading or the card it came from (round 2, critique A1): it opens BESIDE the card, on the side with more room, at the card row (`top = clamp(vh − 16 − h720, heading.bottom + 16, card.top)`), and its width is solved from the height left (`w = min(720, side room, (vh − 16 − top − fixed) / 0.625 + 32)`). If that leaves less than 520px (the middle card at 1024px), the card opens IN PLACE: the window grows out of it and the card hides under it. A veil (dark `rgba(10,22,40,.55)`, light `rgba(255,255,255,.62)`) steps the rest of the section back, starting under the heading, with a hole at the source card | Pointer leaves card AND window for 260ms; Escape |
| Fine pointer, any width | Click or Enter/Space on the card | Same window as a **modal dialog**: focus to Close, Tab trapped, focus returned on close | Escape, Close, click outside |
| Touch, or < 900px | Tap the card | **Glass sheet** pinned at `max(12px, safe-area-top)` on every phone (round 2, A11); the site nav fades out and the page stops scrolling while it is up. < 600px: the frames FILL the stage (full width, the height the header, tabs, caption and buttons leave) and crop the picture vertically, so it stays readable at 320×568 instead of shrinking the whole phone (A3). No URL pill on the phone command slide. ≥ 600px: the desktop picture at its 16:10 ratio | Close (44×44), scrim tap, Escape |
| Any | Inside: "Walk through it" | `/showcase/<slug>` | — |

Inside the window, one timeline (motion allowed): 0ms pop → 420ms the website starts scrolling down
their real home page for 2800ms → 3700ms the command center slides in OVER the website, which recedes
(scale .94, blur 6px, dimmed) → 720ms it lands and goes live, the caption changes now (not before) →
it holds the whole screen 1000ms → the camera moves in over 900ms on the part that moves (Duffer: the
live feed; Hays: the channel cards, ribbons and seal, `data-focus="flow"`) → the newest event lands as
the camera arrives (`--dg-live-at` = 2000ms after live: the scan row drops in, Scans today 14 → 15).
A blue fill under the Website tab counts down the 3.7s so the move is never a surprise. Any tab click
stops the timeline for good. Reduced motion: no pan, no auto-advance; the command center tab cuts
straight to the zoomed, final frame.

Showcase cards no longer open their in-card text panel; the text stays in the HTML for crawlers.
Every other card is unchanged.

**`/showcase/<slug>`** (Duffer Golf, Hays Academy): h1, one paragraph in Tyler's voice, then the tour.
- ≥ 1024px (round 2, A9/W3): the first screen is the frame beside the h1. The hero sits at the top of
  the right column, the sticky frame on the left. On load the frame scrolls once down the site
  (2800ms, from 250ms) and comes back (1200ms) to chapter 1, whose spotlight fades in when it lands.
  Reduced motion skips that pass; scrolling to a chapter cancels it.
- ≥ 1024px: website frame sticky on the left (7fr), narration on the right (5fr). The chapter crossing
  the middle 10% of the screen is active (IntersectionObserver, rootMargin −45%/−45%). The frame glides
  (760ms) to that chapter's part of the site. The spotlight fades OUT when a move starts and back in
  120ms after the page lands (A7): the page goes quieter (`saturate(.7) brightness(.84)`, A8) and the
  exact element discussed is drawn at full colour on top, with a soft blue glow edge. After the last
  website chapter the command center slides in and the camera moves in on each command chapter's part,
  edged with the same glow. Time-based, never scroll-scrubbed (ADR-0020 §4).
- < 1024px, and with JavaScript off: no sticky frame. Every chapter carries its own phone frame already
  at its section, ring drawn. Pure CSS; nothing depends on hydration.

Which products: **Duffer Golf and Hays Academy now** (public site we built + command center). Next, in
order: NWKS Encounter (nwksencounter.com + admin panel; its stage already exists), FarmBooks
(farm-books.com + the books). HG Oil has command centers but its public site is not ours (ADR-0002
card note), so its showcase would be command-center-only. Anonymized clients never (ADR-0002).

## 3. Why the website half is a capture, not an iframe

`duffergolf.net` sends `x-frame-options: DENY` and `frame-ancestors 'none'` (curl, 2026-10-31). An
iframe cannot render it. A live iframe would also pull their analytics, their fonts and their video into
our home page. So: one dated full-page capture per width, content-hashed WebP, 207–228 KB each, fetched
only on intent (hover or tap warms it).

Left out of every capture, on purpose: testimonials (real customer and student names), Duffer's Black
Friday banner and band (dated), Duffer's owner-garage carousel, the Hays welcome collage (scroll-driven;
it captures as ~1,000px of blank), Hays partner logos, both footers. Capture script: `~/.claude/agent-reports/showcase-design-2026-10-31/tools/capture.py` on the PC that
built this (not in the repo); the rects it measured are in `src/data/showcase.ts`.

## 4. Sample data, by view

| View | Shows | Invented in | Real names it may show |
|---|---|---|---|
| Duffer Command Center (desk 1280×800, phone 390×600) | 12 partners active, 9 displays, scans today 15, 30-day scans/leads/buy clicks derived from two 30-day series, attention bar "2 partners need display review", live feed of 5 events at 3 invented courses | `src/data/demos/duffer-golf.ts` | Duffer Golf, MarCommand |
| Hays MarCommand portal (desk; phone shows the same parts stacked, because the real portal holds below 1024px) | 7 channels with visited/leads, stage band Reached 12,430 → Visited 2,180 → Interested 214 → Leads 38 → Validated 31 (all derived), ribbons sized by leads, "Preisser runs" chips | `src/data/demos/hays-academy.ts` | Google, Meta, MarCommand. **Not the school's name**: it is on the private deny list (a ps-admin client), so the recreation shows the HA mark |

Invented courses and towns (`src/data/demos/invented/duffer-golf.ts`): Sumac Ridge Golf Club, Lone
Cottonwood Golf Course, Wheatgrass Pines Golf Club; Tull Prairie, Brannick, Osgood Bend. Each checked by
Bing exact-phrase search 2026-10-31: no course, club or Kansas town of the name surfaced. No people.
No dollar amounts anywhere in either recreation.

## 5. Hierarchy

Window: 1st the moving picture (their site, then their system) — it is 72% of the window's area and the
only thing in motion; 2nd the tab pair (where am I, what's next); 3rd the caption (one sentence, what this
is); 4th "Walk through it" (the one primary action, filled blue); "Visit duffergolf.net" is demoted to an
underlined text link (cost: fewer clicks to the client's site; the showcase is the stronger destination).

Page: 1st the frame (sticky, 58% of the row), 2nd the active chapter's title, 3rd its tag (the psychology
named in mono caps) and body (17px, ≤ 44ch). Inactive chapters sit at 34% opacity so the eye finds the
active one without a marker.

## 6. Layout

- Layering: window and sheet at z-index 1101, scrim 1100: above the site's floating nav and its
  dialog layer (1000/1001), below the skip link (10000). The sheet is modal, so it covers the nav.
- Window: 26px radius, 14/16px padding, 12px gap. Frames 14px radius, 34px chrome bar.
- Command centers are laid out at NATIVE size in whole pixels (desk 1280×800, phone 390×600) and scaled
  as one picture by a single `translate() scale()` camera on `.sc-frame__fit` (round 2, A2). Round 1 drew
  them in container units (`--dg-u`, `--ha-u`); Chromium spaced glyphs apart ("Lead s ubmitted"). Native
  size alone did not cure it: the root cause is that Blink lays text out with hinted whole-pixel advances
  and then draws it scaled without hinting. `text-rendering: geometricPrecision` on the fit box makes the
  advances fractional; before/after crops of the same frame and build are in the round-2 proof folder.
- Page: max 1280px, 24px gutters, 64px column gap ≥ 1024px; chapters `min-height: 62svh` (last 80svh);
  sticky frame `top: nav + 16px`, `height: 100svh − nav − 32px`, frame centred in it, width capped at
  `(100svh − nav − 96px) × 1.6` so a short laptop never cuts it.
- Phone: the sheet is a column (header, tabs, stage, caption reserved at 3 lines, buttons); the stage
  is `flex: 1` with `container-type: size`, and the frames fill it (< 600px). 600px and up: stage width
  `min(100cqw, (100cqh − 32px) × 1.6, 860px)`.

## 7. State matrix

| Surface | rest | hover | active | focus-visible | disabled | loading | error | empty |
|---|---|---|---|---|---|---|---|---|
| Showcase card | Logo card, unchanged | Lifts 4px (existing); after 280ms the window | Opens pinned window / sheet | Existing card focus ring; Enter opens the dialog | N/A, never disabled | Chunk + capture warm on hover/tap; the window paints the frame chrome at once and the capture decodes into it | Chunk fails to load: an error boundary (`ShowcaseBoundary`) drops the window and the page carries on; a later hover tries again. **Gap:** no visible message | N/A, only cards with a showcase get one |
| Tabs | Pill on Website, fill counting 3.7s | Tab text to 100% | Pill slides 420ms | 2px blue outline, 3px offset | N/A | N/A | N/A | N/A |
| Close | 36px circle (44px in sheet) | — | Window leaves 180ms | Same outline | N/A | N/A | N/A | N/A |
| Website frame | Capture at chapter offset | N/A, not interactive | N/A | N/A | N/A | Capture lazy on page, eager in window; chrome shows immediately | Image 404: frame shows its white body and the URL chip; nothing breaks around it | N/A |
| Command center | Final frame: live row in, 15 scans | N/A | N/A | N/A | N/A | N/A, HTML not data | N/A | N/A |
| Tour chapter | 34% opacity (≥1024) | N/A | 100% opacity, frame moves | Links none inside | N/A | N/A | N/A | N/A |

## 8. Motion

| What | Trigger | Duration | Easing | Meaning | Reduced motion |
|---|---|---|---|---|---|
| Pop | window opens | 640ms transform, 220ms opacity | `cubic-bezier(0.2,1.32,0.32,1)` (about 4% overshoot) | the card *is* the window: it grows from where you pointed | 120ms opacity only |
| Sheen + rim | window opens | 1100ms sweep from 160ms; the rim is static | ease-out | glass catches the light once; a 1px specular rim (bright top-left, navy shade bottom-right in light theme) gives the window an edge on a white page | sweep off; rim stays |
| Sheet | tap | 460ms | `cubic-bezier(0.32,0.72,0,1)` | comes from the thumb's edge | cut |
| Close | leave/close | 180ms (sheet 220ms) | `cubic-bezier(0.4,0,1,1)` | gets out of the way fast | 120ms opacity |
| Pan | 420ms after open | 2800ms | `cubic-bezier(0.45,0,0.25,1)` | "this is a real site, and it's long" | none; rests at the top |
| Slide (depth) | 3700ms, or tab | 720ms (page 760ms) | `cubic-bezier(0.22,0.9,0.24,1)` | the command center slides in over the website, which recedes (scale .94, blur 6px, 50% opacity): the thing behind the site | cut, no auto-advance |
| Camera | 1000ms after the command center lands (page: 280ms) | 900ms | `cubic-bezier(0.65,0,0.35,1)` | moves in on the part that is moving | cut to the zoomed frame |
| Live event | command center arrives | 520ms row, 320ms count | `cubic-bezier(0.2,0.8,0.2,1)` | it runs while you watch | final frame shown, no replay |
| Ribbon flow (Hays) | while live | 2.4s loop | linear | people moving toward the school | static dashes |
| Chapter move + spotlight | active chapter changes | 760ms move; spotlight out at once, in 280ms after landing | move `cubic-bezier(0.65,0,0.35,1)`, fade ease-out | points at the exact thing the words describe, never before the page gets there | cut |
| Page intro (≥ 1024px) | load | 2800ms down, 1200ms back | same move curve | the product is moving in the first second | skipped |

Nothing rests at opacity 0: every animated element's resting frame is its final frame (ADR-0016 §3).

## 9. Accessibility decisions

- Glass contrast, computed on the tint alone (body of the window; the band behind the header is heavier) (WebKit and Firefox headless draw no blur, and Safari's
  blur strength varies): caption over the worst card behind it **7.23:1** dark, **7.08:1** light.
- Targets: Close 44×44 in the sheet; tabs 36px tall in the sheet, 32px in the window (pointer context,
  ≥ 24px floor); CTAs 44px tall.
- Window opened by click/keyboard is `role=dialog aria-modal`, labelled by the product name, focus on
  Close, Tab trapped, focus restored. Hover-opened windows are not modal and do not steal focus.
- The inactive slide is `inert` + `aria-hidden`. Captions are `aria-live=polite`. Each command center is
  a labelled stage with a narration paragraph; repeats on the stacked page are `aria-hidden`.

## 10. Acceptance criteria — each measured before publication

**Round 2 (2026-10-31).** The table below is round 1's, measured on build `75ac6ac…`. Round 2 adds,
measured on the deployed preview and recorded item by item, with a proof screenshot per item, in
`~/.claude/agent-reports/showcase-r2-changelog.md`: the window never overlaps `#work-heading` or its
source card (A1); no letter-spaced words inside either recreation in Chromium (A2); the sheet top is
12px on every phone and slug (A11, replacing C4's 12/58/58); `scrollWidth == viewport` on both pages
at 320 **with `isMobile: true`** (A4; round 1's C6 ran without it and missed 333px).

Measured by `~/.claude/agent-reports/showcase-design-2026-10-31/tools/criteria.mjs` (not in the repo; raw output beside it in `criteria-measured.json`), Chromium 148,
served build `app/page-75ac6ac47e34b823.js`. Each criterion was run against the build AND a known-bad.

| # | Criterion | Instrument (what it physically samples) | Threshold + calibration | Reference (this build) | Rejected / known-bad |
|---|---|---|---|---|---|
| C1 | Resting the pointer on a showcase card at 1440×900 opens a window ≥ 600px wide holding the client-site capture | `getBoundingClientRect` of `.sc-pop`, `src` of its `img`, after a real `mouse.move` and 1.5s | ≥ 600px and a `/images/showcase/` src. Known-bad = today's behaviour on the same build (FarmBooks card) | 720px, `duffer-golf-site-desk-add02c14.webp` | FarmBooks: no window (0), in-card panel 300px. **Fails** |
| C2 | On `/showcase/*` at 1440×900, every website chapter's ring is fully inside the frame's visible view | Intersection of `.sc-ring` and `.sc-frame__view` rects, 1.3s after centring each chapter | 100% for every chapter. Known-bad: frame transform forced to none | Duffer 100/100/100/100/100, Hays 100/100/100/100/100 (first run found 87%, 97%, 97%; scroll targets fixed) | 100/0/0/0/0. **Fails** |
| C3 | At 390×844 the sheet's Close is fully on screen and ≥ 44×44, tabs fully on screen | Rects of `.sc-close` and `.sc-tabs` after a real tap | right ≤ viewport, w,h ≥ 44. Known-bad: the first-pass one-row header, re-injected | right 373/390, 44×44, tabs right 373 | Close squeezed to 16×44 (first render: off screen entirely). **Fails** |
| C4 | The phone sheet fits short phones with no inner scroll | `scrollHeight − clientHeight` of `.sc-sheet`, its top edge | 0 overflow and top ≥ 0 at 320×568, 375×667, 393×659. Known-bad: phone frame forced to 100% width | 0 / 0 / 0 (tops 12, 58, 58) | 98px overflow at 320×568. **Fails** |
| C5 | Reduced motion: no auto-advance, no pop transform, final frame visible | `data-slide` at 6.5s; computed `transition-duration`; live row opacity and the "15" after selecting the tab | slide stays 0, duration ≈ 0, row opacity 1, shows 15. Calibrated against the motion run | slide 0, 0.00001s, opacity 1, 15 | Motion run: slide 1 at 6.5s, 0.56s. (Discriminates; both end states visible) |
| C6 | No sideways scroll anywhere the showcase lives | `scrollWidth − innerWidth` on both pages, and the open window/sheet's rect vs the viewport, at all 14 viewports | 0 everywhere. Known-bad: `.sc-tour{width:120vw}` | 0 offenders across 14 viewports × (2 pages + home window) | +78px. **Fails** |
| C7 | Opening the window shifts nothing on the home page | `PerformanceObserver('layout-shift')` sum without recent input, over 5.6s from hover | ≤ 0.01. Known-bad: a 100px insert above the track while open | 0 | 0.0457. **Fails** |
| C8 | Window text stays readable over any card with NO blur drawn | WCAG ratio of the caption (86% opacity) over the glass tint composited on the lightest/darkest card | ≥ 4.5:1. Known-bad: a 0.62 tint | 7.23:1 dark, 7.08:1 light (top band now heavier still) | 0.62 tint: 4.27:1. **Fails** |
| C9 | No real name inside any command-center stage or its source | `npm run test:privacy` over `out/case-studies` + `out/showcase`, plus source roots | exit 0. Known-bad: a deny-listed real name planted in the built Duffer stage and in its fixture | PASS, 30 pages, 11 stages, 45 deny entries | exit 1: `[deny]` on `/showcase/duffer-golf` and on `src/data/demos/duffer-golf.ts`. **Fails** |
| C10 | Home stays light | `next build` First Load JS for `/` | ≤ +2 kB over main. (Guard; main passes trivially) | 73.5 kB vs 72.2 kB (+1.3) | n/a |

Set check: C3 and C4 bound different quantities (horizontal fit, vertical fit) and were solved together at
320×568, the tightest case: Close right edge 303 ≤ 320 with 0px vertical overflow. C1 and C7 together: the
window is 720px yet shifts 0, because it is `position: fixed` and never enters the flow.

## 11. What I removed, and what it cost

- The in-card text panel on the two showcase cards (cost: the description is one hover further away;
  the window's caption replaces it).
- Testimonials, promotions, the owner-garage carousel and footers from the captures (cost: the window
  shows less of the site; it shows nothing dated or personal).
- A ribbon draw-in on the Hays portal (decorative; flow dashes alone carry the meaning).
- The school's name inside the Hays recreation (deny list); the HA mark carries it.
- A phone layout for the Hays portal: the real one has none, so I did not invent one.

## 12. Not assessed

- **Real Safari: un-run.** This machine is Linux (WSL); there is no safaridriver. Every Safari conclusion
  is un-run, including whether the glass blur reads on an iPhone and how the sheet sits under the
  dynamic toolbar (393×659 vs 393×852 were measured in Chromium only).
- Playwright WebKit and Firefox composite no backdrop blur, so their glass screenshots show the tint only.
- Real-device hover-intent feel, trackpad sweeps, and the 280ms dwell.
- Core Web Vitals in the field. Measured locally: home first-load JS +1.3 kB; no layout shift on open.
- The chunk-load-error state drops silently; there is no visible message (not rendered: I did not force a failed chunk).
