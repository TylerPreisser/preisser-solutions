"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MarCommandFunnel } from "@/components/home/marcommand-funnel";
import {
  MarCommandLiveStage,
  ELARA_MARKS,
  ROUTES,
  FRAME,
  DIAL_MATH,
  BUDGET,
} from "@/components/home/marcommand-live-stage";

type Variant = "wide" | "narrow";

/**
 * Beat durations. Desktop is the §2.5 table; mobile shortens the five walks
 * because the distances are genuinely shorter (§3.4). The EASING is never sped
 * up to compensate — that would read as a different character.
 */
const BEATS = {
  wide: {
    walk1: 1.6,
    tap: 0.35,
    light: 0.15,
    room: 0.9,
    walk2: 1.4,
    grip: 1.8,
    walk3: 1.3,
    face: 0.5,
    pocket: 0.6,
    walk4: 1.6,
    fold: 1.0,
    walk5: 1.5,
    rest: 1.4,
    cardMove: 0,
  },
  narrow: {
    walk1: 1.2,
    tap: 0.35,
    light: 0.15,
    room: 0.7,
    walk2: 1.0,
    grip: 1.4,
    walk3: 0.9,
    face: 0.4,
    pocket: 0.6,
    walk4: 1.1,
    fold: 0.9,
    walk5: 1.1,
    rest: 1.0,
    cardMove: 0.4,
  },
} as const;

const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

export function MarCommandLive() {
  const rootRef = useRef<HTMLElement>(null);

  /**
   * `motion` gates the pause control. WCAG 2.2 SC 2.2.2 applies because there
   * IS moving content — so the control appears only once a timeline actually
   * exists. A reduced-motion visitor, a saveData visitor, or anyone whose GSAP
   * chunk failed never sees a button that would do nothing.
   */
  const [motion, setMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggleRef = useRef<(() => void) | null>(null);

  const onToggle = useCallback(() => {
    toggleRef.current?.();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /**
     * Reduced motion returns BEFORE the dynamic import, so these visitors never
     * download or run the timeline at all. The markup already ships in its end
     * state (§6), so there is nothing to reveal and nothing to undo.
     */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /**
     * Data Saver: same deal. The 6 KB sprite still loads with the section, but
     * no timeline is built.
     */
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("@/lib/gsap")
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled || !rootRef.current) return;
        const el = rootRef.current;

        const q = <T extends Element>(sel: string) => el.querySelector<T>(sel);
        const qa = <T extends Element>(sel: string) =>
          Array.from(el.querySelectorAll<T>(sel));

        const anchor = q<HTMLElement>(".mc-elara-anchor");
        const sprite = q<HTMLElement>(".mc-elara");
        if (!anchor || !sprite) return;

        const setFrame = (n: number) =>
          sprite.style.setProperty("--mc-frame", String(n));
        const setFlip = (n: number) =>
          sprite.style.setProperty("--mc-flip", String(n));

        /**
         * A walk along an ORTHOGONAL ROUTE.
         *
         * The previous implementation issued one tween across both --mc-x and
         * --mc-y, which is a straight DIAGONAL between the two marks. Every rail
         * on this stage is a right-angled elbowed path, so he was on a line only
         * at the two endpoints and cut the corner across bare canvas for the whole
         * middle of the walk — measured 48.6 CSS px off the nearest visible rail
         * mid-walk at 1440px, which is the "he is not even walking on the line"
         * defect and a straight violation of ADR-0018.
         *
         * Now a walk takes the route's waypoint list. Consecutive waypoints always
         * share an axis, so every leg is a pure horizontal or vertical run along a
         * segment that is actually drawn. The duration is split across the legs in
         * proportion to their length, so he does not sprint the short legs and
         * crawl the long ones — his speed is constant through the corners.
         *
         * Percentages are of the stage box in each axis, so leg "length" is
         * normalised by the stage's aspect (1200x680 wide, 390x620 narrow) before
         * being compared. Otherwise a vertical leg would be weighted wrongly.
         */
        const num = (v: string) => parseFloat(v);

        const walk = (
          tl: gsap.core.Timeline,
          route: readonly { x: string; y: string }[],
          dur: number,
          at: number,
          aspect: number
        ) => {
          // Leg lengths in a square-ish space, so horizontal and vertical runs of
          // the same visual length get the same share of the duration.
          const legs: number[] = [];
          for (let i = 1; i < route.length; i += 1) {
            const dx = (num(route[i].x) - num(route[i - 1].x)) * aspect;
            const dy = num(route[i].y) - num(route[i - 1].y);
            legs.push(Math.abs(dx) + Math.abs(dy));
          }
          const total = legs.reduce((a, b) => a + b, 0) || 1;

          let cursor = at;
          for (let i = 1; i < route.length; i += 1) {
            const legDur = (legs[i - 1] / total) * dur;
            if (legDur > 0) {
              tl.to(
                anchor,
                {
                  "--mc-x": route[i].x,
                  "--mc-y": route[i].y,
                  duration: legDur,
                  // Ease in on the first leg and out on the last; the corners in
                  // between are linear so he does not stall at every elbow.
                  ease:
                    route.length === 2
                      ? "power1.inOut"
                      : i === 1
                        ? "power1.in"
                        : i === route.length - 1
                          ? "power1.out"
                          : "none",
                },
                cursor
              );
            }
            cursor += legDur;
          }

          // 0.34s two-step hop, held as discrete steps so it reads as pixel-art
          // footfall rather than a smooth float. One bob across the whole route.
          tl.to(
            sprite,
            {
              "--mc-bob": "-3px",
              duration: 0.17,
              repeat: Math.max(1, Math.round(dur / 0.17) - 1),
              yoyo: true,
              ease: "steps(1)",
            },
            at
          );
          tl.set(sprite, { "--mc-bob": "0px" }, at + dur);
        };

        const build = (variant: Variant) => {
          const B = BEATS[variant];
          const M = ELARA_MARKS[variant];
          const R = ROUTES[variant];
          // Stage aspect, used to weight horizontal vs vertical legs of a route.
          const aspect = variant === "wide" ? 1200 / 680 : 390 / 620;

          const liveRail = q<SVGPathElement>(`[data-mc-liverail="${variant}"]`);
          const ribbons = qa<SVGPathElement>(`[data-mc-ribbon^="${variant}-"]`);
          const wires = qa<SVGPathElement>(`[data-mc-wire^="${variant}-"]`);
          const cards = qa<SVGGElement>(`[data-mc-card^="${variant}-"]`);
          const litCard = q<SVGGElement>(`[data-mc-card="${variant}-google_ads"]`);
          const pad = q<SVGGElement>(`[data-mc-pad="${variant}"]`);

          /*
            THE HUB LAYER.

            Everything that belongs to the switchboard: the pad, the five unlit
            cards, ALL SIX spokes (including the live rail Elara walks in on) and,
            on portrait, the pad's link up to the room trunk.

            It fades as ONE unit when the room opens and returns as one unit when
            the room folds, because these objects only make sense together. The
            previous build faded the pad and the five cards but left all six
            spokes at opacity 1, so five grey rails radiated from an invisible hub
            to invisible cards and the blue live rail's tail dangled where the pad
            had been — measured at the grip beat: padOpacity "0" while
            `M548,340 H180 V176` and `M548,340 H180 V504` were both still
            opacity "1", visFrac 1. That is the "lines that start and stop without
            meeting anything".

            Fading the whole layer also kills the empty blue rectangle that the
            rail's elbow and the bus's elbow used to close off under the Google Ads
            card: the hub rail and the room bus are now never on screen together
            except during their 0.15s crossfade, and where they do overlap they are
            collinear.
          */
          const spokes = qa<SVGPathElement>(`[data-mc-spoke^="${variant}-"]`);
          const hubLink = q<SVGPathElement>(`[data-mc-hublink="${variant}"]`);
          const liveSpoke = q<SVGPathElement>(`[data-mc-spoke="${variant}-google_ads"]`);

          /*
            The hub layer is split in two, and the split is load-bearing.

            `hubFurniture` — the five unlit cards and their five spokes — is dead
            weight the moment the room opens, so it goes on the light beat. It does
            NOT come back on the fold beat, which is the obvious symmetric choice
            and is wrong: see beat 13, where the measurement is.

            `hubPath` — the pad, the Google Ads spoke, the blue live rail drawn over
            it, and (portrait) the pad's link up to the trunk — is the ground Elara
            is standing on. It cannot go on the light beat: on portrait he taps from
            the pad and the first two legs of walk2 run across the pad and up the hub
            link, so dropping it early leaves him walking on an invisible line for
            about 1.6s (0.35 tap + 0.15 light + 0.4 card lift + 0.7 room + the first
            33% of walk2 — measured from the beat table). It fades once he is demonstrably
            off it and onto the bus, and comes back before walk5 needs it.*/
          const hubFurniture = [
            ...cards.filter((c) => c !== litCard),
            ...spokes.filter((sp) => sp !== liveSpoke),
          ];
          const hubPath = [
            ...(liveSpoke ? [liveSpoke] : []),
            ...(liveRail ? [liveRail] : []),
            ...(pad ? [pad] : []),
            ...(hubLink ? [hubLink] : []),
          ];
          const hubLayer = [...hubFurniture, ...hubPath];

          const dials = qa<SVGGElement>(`[data-mc-dial^="${variant}-"]`);
          const tile = q<SVGGElement>(`[data-mc-tile="${variant}"]`);
          const arc = q<SVGCircleElement>(`[data-mc-arc="${variant}-budget"]`);
          const needle = q<SVGLineElement>(`[data-mc-needle="${variant}-budget"]`);
          const readout = q<SVGTextElement>(`[data-mc-value="${variant}-budget"]`);
          const pillOld = q<SVGGElement>(`[data-mc-pill="${variant}-kw-old"]`);
          const pillNew = q<SVGGElement>(`[data-mc-pill="${variant}-kw-new"]`);

          const controls = tile ? [tile, ...dials] : dials;

          const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.8,
            paused: true,
          });

          // ---- t=0: set the "before" state -------------------------------
          // The markup ships at the END state, so the timeline's first act is
          // to wind it back. That is what keeps a reduced-motion or JS-failed
          // visitor on a correct, information-dense still.
          tl.set(anchor, { "--mc-x": M.pad.x, "--mc-y": M.pad.y }, 0);
          tl.set(sprite, { "--mc-flip": 1, "--mc-bob": "0px" }, 0);
          tl.call(() => setFrame(FRAME.idle), undefined, 0);
          tl.set(liveRail, { strokeDashoffset: 100 }, 0);
          tl.set(wires, { strokeDashoffset: 100 }, 0);
          tl.set(controls, { opacity: 0, scale: 0.92, transformOrigin: "center" }, 0);
          tl.set(hubLayer, { opacity: 1 }, 0);
          tl.set(arc, { "--mc-arc": DIAL_MATH.arcDash(BUDGET.vFrom) }, 0);
          tl.set(pillOld, { opacity: 1, scale: 1 }, 0);
          tl.set(pillNew, { opacity: 0 }, 0);
          tl.call(
            () => {
              litCard?.classList.remove("mc-card--lit");
              if (needle) {
                needle.setAttribute(
                  "transform",
                  `rotate(${DIAL_MATH.needleAngle(BUDGET.vFrom)} ${needle.getAttribute("x1")} ${needle.getAttribute("y1")})`
                );
              }
              if (readout) readout.textContent = money(BUDGET.from);
            },
            undefined,
            0
          );
          // Portrait only: put the lit card back in its hub slot.
          if (variant === "narrow") {
            tl.set(litCard, { x: -100, y: 240 }, 0);
          }

          let t = 0;

          // ---- 1. Walk pad -> Google Ads card ----------------------------
          walk(tl, R.walk1, B.walk1, t, aspect);
          // The rail recolours AHEAD of him: an identical path drawn on top and
          // revealed by dashoffset, so no colour is tweened per frame.
          tl.to(liveRail, { strokeDashoffset: 0, duration: B.walk1, ease: "power1.inOut" }, t);
          if (variant === "narrow") tl.call(() => setFlip(-1), undefined, t);
          t += B.walk1;

          // ---- 2. Tap ----------------------------------------------------
          tl.call(() => setFrame(FRAME.reach), undefined, t);
          t += B.tap;

          // ---- 3. The tap lights the card (never a timer) -----------------
          tl.call(() => litCard?.classList.add("mc-card--lit"), undefined, t);
          tl.to(hubFurniture, { opacity: 0, duration: B.light, ease: "none" }, t);
          if (variant === "narrow") {
            /*
              THE CARD LIFTS ORTHOGONALLY: UP ITS OWN COLUMN FIRST, THEN ACROSS.

              A single `{x:0, y:0}` tween is one straight DIAGONAL from the hub
              slot (95,310) to the lifted position (195,70) — the same mistake the
              walks used to make, and forbidden by ADR-0018 for the same reason.
              It also swept the card's own caption straight through Elara, who is
              standing still at N_TAP (160,310) for the whole beat: measured worst
              frame 73.2% of the "Google Ads" caption covered by his body at 390
              dark, which on screen reads as the word "Google" with "Ads" hidden
              behind him.

              Rising in its own column at x=95 first keeps the card 23 units clear
              of his left edge for all but the moment its caption passes his
              shoulder — re-measured at 12.9%. The 0.45/0.55 overlap rounds the
              corner instead of hinging it, so it still reads as one movement.
            */
            tl.to(litCard, { y: 0, duration: B.cardMove * 0.55, ease: "power2.in" }, t);
            tl.to(
              litCard,
              { x: 0, duration: B.cardMove * 0.55, ease: "power2.out" },
              t + B.cardMove * 0.45
            );
            t += B.cardMove;
          }
          t += B.light;

          // ---- 4. The room draws outward FROM the card -------------------
          tl.to(wires, { strokeDashoffset: 0, duration: B.room, ease: "power3.out" }, t);
          tl.to(
            controls,
            { opacity: 1, scale: 1, duration: B.room, stagger: 0.06, ease: "power3.out" },
            t
          );
          t += B.room;

          // ---- 5. Walk to the Daily budget dial --------------------------
          tl.call(() => {
            setFrame(FRAME.idle);
            setFlip(1);
          }, undefined, t);
          walk(tl, R.walk2, B.walk2, t, aspect);
          // He is on the bus by 40% of walk2 in both profiles, so the ground he
          // came in on can go now — not a beat earlier (see hubPath above).
          tl.to(
            hubPath,
            { opacity: 0, duration: B.walk2 * 0.25, ease: "none" },
            t + B.walk2 * 0.4
          );
          t += B.walk2;

          // ---- 6. Grip and turn ------------------------------------------
          // He is standing at the control that changes. Nothing ever moves
          // from across the stage (ADR-0017 decision 5).
          const gripSteps = Math.floor(B.grip / 0.16);
          for (let i = 0; i < gripSteps; i += 1) {
            const f = i % 2 === 0 ? FRAME.gripA : FRAME.gripB;
            tl.call(() => setFrame(f), undefined, t + i * 0.16);
          }
          tl.to(
            arc,
            {
              "--mc-arc": DIAL_MATH.arcDash(BUDGET.vTo),
              duration: B.grip,
              ease: "power2.inOut",
            },
            t
          );
          if (needle) {
            // The needle is driven by writing the `transform` ATTRIBUTE from a
            // numeric proxy rather than by GSAP's `rotation` + `svgOrigin`.
            // Two reasons, both load-bearing:
            //   1. GSAP's `rotation` is ABSOLUTE, so handing it the delta
            //      (needleAngle(vTo) - needleAngle(vFrom) = 56.7deg) while the
            //      element sits at 248.4deg made it unwind ~192deg backwards.
            //   2. The t=0 `tl.call` writes the attribute directly, which GSAP's
            //      cached _gsTransform would not see, so the two mechanisms
            //      fought each other on every loop repeat.
            // A proxy tween has neither problem and stays a transform-only write.
            const nx = needle.getAttribute("x1");
            const ny = needle.getAttribute("y1");
            const spin = { a: DIAL_MATH.needleAngle(BUDGET.vFrom) };
            tl.to(
              spin,
              {
                a: DIAL_MATH.needleAngle(BUDGET.vTo),
                duration: B.grip,
                ease: "power2.inOut",
                onUpdate: () => {
                  needle.setAttribute("transform", `rotate(${spin.a} ${nx} ${ny})`);
                },
              },
              t
            );
          }
          if (readout) {
            const counter = { v: BUDGET.from };
            tl.to(
              counter,
              {
                v: BUDGET.to,
                duration: B.grip,
                ease: "none",
                onUpdate: () => {
                  readout.textContent = money(counter.v);
                },
              },
              t
            );
          }
          t += B.grip;

          // ---- 7. Walk to the keyword list -------------------------------
          tl.call(() => setFrame(FRAME.idle), undefined, t);
          walk(tl, R.walk3, B.walk3, t, aspect);
          t += B.walk3;

          // ---- 8. Face left ----------------------------------------------
          tl.call(() => {
            setFlip(-1);
            setFrame(FRAME.reach);
          }, undefined, t);
          t += B.face;

          // ---- 9. Pocket beat --------------------------------------------
          // `duct cleaning` shrinks toward his body; `heat pump` flies out on a
          // quadratic arc and is revealed on contact.
          tl.to(
            pillOld,
            {
              x: 60,
              y: -40,
              scale: 0.2,
              opacity: 0,
              transformOrigin: "center",
              duration: B.pocket,
              ease: "power1.in",
            },
            t
          );
          tl.fromTo(
            pillNew,
            { x: 70, y: -46, scale: 0.2, opacity: 0, transformOrigin: "center" },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: B.pocket, ease: "power2.out" },
            t + 0.12
          );
          t += B.pocket;

          // ---- 10. Walk back to the card. The room STAYS UP. --------------
          tl.call(() => {
            setFlip(1);
            setFrame(FRAME.idle);
          }, undefined, t);
          walk(tl, R.walk4, B.walk4, t, aspect);
          t += B.walk4;

          // ---- 11. Closing tap, same coordinate it opened from ------------
          tl.call(() => setFrame(FRAME.reach), undefined, t);
          t += B.tap;

          // ---- 12. That second tap dispatches the fold --------------------
          tl.to(
            [...controls].reverse(),
            {
              opacity: 0,
              scale: 0.92,
              duration: B.fold,
              stagger: 0.05,
              ease: "power2.in",
            },
            t
          );
          tl.call(() => litCard?.classList.remove("mc-card--lit"), undefined, t + B.fold * 0.8);
          t += B.fold;

          // ---- 13. Walk home down the same spoke, retraced ----------------
          tl.call(() => setFrame(FRAME.idle), undefined, t);
          walk(tl, R.walk5, B.walk5, t, aspect);
          // The ground comes back before the last leg of walk5 lands on it.
          tl.to(hubPath, { opacity: 1, duration: B.walk5 * 0.25, ease: "none" }, t);
          /*
            THE FIVE UNLIT CARDS COME BACK AT THE END OF WALK5, NOT ON THE FOLD.

            They used to return on the fold beat, i.e. before he had moved. On
            portrait that put them at opacity 1 while walk5 still had to bring
            him DOWN the bus at x=110 and along the y=200 trunk — and x=110 is
            underneath the Facebook card (face x 53..137). He is anchored by his
            feet and stands 73.4 stage units tall at a 390px viewport, so feet on
            y=200 puts his head at y=127 and his body straight across the
            "Facebook" caption at y 142..157. Worst frame measured: 63.8% of that
            caption covered, over samples 122-126 of a 233-sample sweep, all at
            card opacity 1.

            No geometry change fixes that one: the descent has to pass through
            every y between 112 and 200, so wherever the caption sits in that
            band he sweeps it. What fixes it is not having the card on screen
            while he is walking underneath it, which is also the truer reading —
            the room folds, he walks home, and the switchboard comes back up as
            he arrives, in the same beat the pad and the live rail already do.

            0.62 is measured, not chosen for looks. Weighting the route's legs the
            way `walk()` weights them (140,112 -> 110,112 -> 110,240 -> 195,240 ->
            195,310, x scaled by the 390/620 aspect) the leg boundaries fall at
            9.6% / 50.5% / 77.6%, and his left edge clears the Facebook caption's
            right edge (x=128) at 64.1%. The fade starts at 0.62 rather than 0.641
            because `power2.in` is still under 1% opacity there, and the remaining
            0.38 lands it exactly as he reaches the pad. If ROUTES.narrow.walk5 or
            the trunk's y changes, re-derive this and re-run the occlusion probe.

            Wide gets the same treatment. It does not strictly need it — the
            rerouted spoke keeps him out from under the Instagram card on walk5
            as well as walk1 — but the wide sprite is a fixed 96x116 CSS px on a
            fluid stage, so its size IN STAGE UNITS grows as the viewport falls
            toward the 769px breakpoint, and this keeps the cards off screen for
            that whole band rather than only where it was measured.
          */
          tl.to(
            hubFurniture,
            { opacity: 1, duration: B.walk5 * 0.38, ease: "power2.in" },
            t + B.walk5 * 0.62
          );
          /*
            The room's wiring retracts DURING the walk home, not during the fold.
            It has to: on portrait his route home runs back along the bus itself
            (closeTap sits beside the lifted card, which is only reachable on the
            bus's own y=112 run), so retracting the wire a beat earlier would have
            left him walking on nothing for the whole of walk5. Retracting it under
            him instead reads as the wire withdrawing behind him — dashoffset hides
            a path from its START, and every bus path starts at the card he is
            walking away from, so it peels off in the right direction.
          */
          tl.to(wires, { strokeDashoffset: 100, duration: B.walk5, ease: "power2.in" }, t);
          tl.to(liveRail, { strokeDashoffset: 100, duration: B.walk5, ease: "power1.inOut" }, t);
          if (variant === "narrow") {
            /*
              Home the same way, orthogonally — but DOWN ITS LIFTED COLUMN first
              (x stays at 195) and only then left along y=310 into the slot.

              Not the reverse of the lift, deliberately. The exact reverse would
              bring it left at y=70 and then down the x=95 column, and x=95 is
              where Elara is on the first two legs of walk5 (his box spans
              85..146 at 390px), so the card would descend through him. Coming down at
              x=195 puts it in the column he does not reach until leg 4, by which
              time it is already parked. Verified across the walk: no frame of
              walk5 puts his box on the card's caption.
            */
            tl.to(litCard, { y: 240, duration: B.walk5 * 0.55, ease: "power2.in" }, t);
            tl.to(
              litCard,
              { x: -100, duration: B.walk5 * 0.55, ease: "power2.out" },
              t + B.walk5 * 0.45
            );
          }
          t += B.walk5;

          // ---- 14. Rest on the pad. A real pause, not a turnaround. -------
          tl.to({}, { duration: B.rest }, t);
          const loopTotal = t + B.rest;

          /*
            ---- The funnel's ribbon flow -------------------------------------
            It rides THIS timeline rather than one of its own, which is the whole
            reason the funnel costs the loop nothing: the pause control, the
            ScrollTrigger gate and `visibilitychange` already govern this
            timeline, so SC 2.2.2 is satisfied for the funnel by construction
            and there is no second RAF loop to stop.

            The ribbons are dashed `6 10`, a 16-unit period. The offset slides by
            EXACTLY 32 units — two whole periods — over one loop, so when the
            timeline repeats and snaps the offset back to 0 the pattern is in the
            same phase and the seam is invisible. Any non-multiple would jump.

            Known and accepted: the timeline's 0.8s `repeatDelay` holds the flow
            still between loops. On a dashed line that reads as a lull, not a
            glitch, and removing it would mean giving the funnel its own ticker.

            Paint-only (`stroke-dashoffset`), which is the same mechanism the
            rails and the dial arcs already use on this surface. No layout, no
            filter, nothing composited per frame.
          */
          if (ribbons.length) {
            tl.set(ribbons, { strokeDashoffset: 0 }, 0);
            tl.to(
              ribbons,
              { strokeDashoffset: -32, duration: loopTotal, ease: "none" },
              0
            );
          }

          return tl;
        };

        const mm = gsap.matchMedia();
        let active: gsap.core.Timeline | null = null;
        let userPaused = false;
        let inView = false;
        let hidden = document.visibilityState === "hidden";

        const sync = () => {
          if (!active) return;
          if (inView && !userPaused && !hidden) active.play();
          else active.pause();
        };

        const register = (variant: Variant) => {
          const tl = build(variant);
          active = tl;
          setMotion(true);

          // Never burn CPU on an off-screen loop.
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            onEnter: () => {
              inView = true;
              sync();
            },
            onLeave: () => {
              inView = false;
              sync();
            },
            onEnterBack: () => {
              inView = true;
              sync();
            },
            onLeaveBack: () => {
              inView = false;
              sync();
            },
          });

          ScrollTrigger.refresh();

          // Seed the gate from the trigger's ACTUAL state instead of waiting for
          // an onEnter edge. If the section is already within start/end when the
          // chunk resolves — which is exactly what happens on a short viewport,
          // on a deep link, or on a restored scroll position — no edge is ever
          // crossed and the loop would sit paused forever.
          inView = st.isActive;
          sync();

          return () => {
            tl.kill();
            if (active === tl) active = null;
          };
        };

        mm.add("(min-width: 769px)", () => register("wide"));
        mm.add("(max-width: 768px)", () => register("narrow"));

        const onVisibility = () => {
          hidden = document.visibilityState === "hidden";
          sync();
        };
        document.addEventListener("visibilitychange", onVisibility);

        toggleRef.current = () => {
          userPaused = !userPaused;
          setPaused(userPaused);
          sync();
        };

        cleanup = () => {
          document.removeEventListener("visibilitychange", onVisibility);
          toggleRef.current = null;
          active?.kill();
          active = null;
          mm.revert();
          ScrollTrigger.getAll().forEach((tr) => tr.kill());
        };
      })
      .catch((err) => {
        // Never drop silently. The markup is already in its end state, so a
        // failed chunk leaves a correct still rather than an invisible section
        // — which is the defect in marcommand-callout.tsx:29, where the missing
        // .catch() strands content at opacity: 0.
        console.error(
          "[marcommand-live] GSAP chunk failed to load — leaving the static end-state",
          err
        );
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="mc-live ps-section"
      id="marcommand-live"
      aria-labelledby="marcommand-live-heading"
    >
      <div className="ps-container">
        <div className="mc-live__head">
          {/*
            The eyebrow is gone, not restyled. It said "MARCOMMAND" and the
            title now IS "MarCommand", so keeping it would print the product
            name twice in two type treatments. The descriptor takes the slot
            underneath instead — see .mc-live__descriptor in the stylesheet for
            why it is sentence case and not `.ps-eyebrow`.
          */}
          <h2 id="marcommand-live-heading" className="ps-section-heading mc-live__heading">
            MarCommand
          </h2>
          <p className="mc-live__descriptor">
            Our proprietary agentic learning marketing channel optimization platform
          </p>
          <p className="mc-live__body">
            MarCommand gives your business a custom AI agent that learns your audience, your
            channels and your products — then works the controls. Every channel you advertise on,
            every lever those platforms actually offer, in one place. Nothing moves without you.
          </p>
          <div className="mc-live__cta">
            <Link href="/contact" className="ps-btn ps-btn-primary-dark" prefetch={false}>
              Reach out
              <svg
                className="ps-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mc-live__stage-card">
          {/*
            The funnel and the agent stage are the two halves of the MarCommand
            live surface and they share one card, so the section reads as one
            product rather than two graphics. The funnel ships in its end state
            and its only motion is the ribbon flow, which lives on the SAME
            timeline as the stage — so the pause control, the ScrollTrigger gate
            and `visibilitychange` all already govern it, and the loop's
            wall-clock budget is unchanged.
          */}
          <div className="mc-fn" aria-hidden="true">
            <MarCommandFunnel />
          </div>

          <div className="mc-stage">
            <MarCommandLiveStage />

            {/* Elara is an overlay div, not an SVG node, so he can be sized in
                whole CSS pixels and stay crisp under image-rendering: pixelated
                (96x116 = exactly half the 192x232 source, 48x58 = a quarter). */}
            <div className="mc-elara-anchor" aria-hidden="true">
              <div className="mc-elara" />
            </div>
          </div>

          {motion && (
            <button
              type="button"
              className="mc-live__pause"
              onClick={onToggle}
              aria-pressed={paused}
              aria-label={paused ? "Play animation" : "Pause animation"}
            >
              {paused ? (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6 4l10 6-10 6V4z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor" />
                  <rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/*
          The stage is decoration; the meaning lives here. The last sentence is
          required — announcing fictional demo figures as fact is a truthfulness
          problem, not just a noise problem (§7).
        */}
        <p className="ps-visually-hidden">
          MarCommand is a marketing channel optimization platform. This animation shows two
          things. First, an acquisition funnel: six advertising channels — Facebook, Instagram,
          Google Ads, TikTok, direct mail and Google Local Services — flow into your business,
          and the audience is then counted through five stages: reached, visited, interested,
          leads, and validated. Second, the agent at work: it walks to the Google Ads channel,
          opens its control panel, and adjusts the real controls that platform offers — daily
          budget, bid strategy, targeting radius, ad schedule and the keyword list. The figures
          shown are a demonstration.
        </p>
      </div>
    </section>
  );
}
