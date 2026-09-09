"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MarCommandLiveStage,
  ELARA_MARKS,
  ROUTES,
  FRAME,
  DIAL_MATH,
  BUDGET,
  RADIUS,
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
    /* Was 0, which is why the desktop card never moved and the tap landed on a
       static object. See the coupled-lift block in the timeline. */
    cardMove: 0.5,
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
    /*
      1.0, up from 0.4. This beat is no longer a card lift he watches — it is the
      RIDE, and he is on it (see the coupled-ride block in the timeline). It
      covers 198 units of climb plus a 50-unit step-off, which is a longer
      journey than walk1 (35 units) and comparable to walk2, so 0.4s would have
      made the one beat the owner asked for the fastest movement in the loop.
      Split 0.55/0.55 with the 0.45 overlap, that is 0.55s of climb and 0.55s of
      step-off, which puts his climbing speed within ~15% of his walking speed on
      the other legs — the EASING is untouched, per the note at the top of BEATS.
    */
    cardMove: 1.0,

    /*
      ---- THE SECOND ARC (TikTok). Portrait only. ----
      Shorter than the Google Ads arc on purpose. The first arc has to teach
      the idea — tap a channel, the room opens, a lever moves — and it spends
      walk3/face/pocket doing it on the keyword tile. The second arc only has
      to show that the SAME agent does the SAME job on a DIFFERENT channel, so
      it drops the keyword beat entirely and goes card -> knob -> home.

      walk6 is set equal to walk1 (1.2) rather than trimmed: it is the mirror
      of walk1 along the same rail, and giving the two arrivals different
      speeds is what would make the second one look like a different animation.
    */
    walk6: 1.2,
    walk7: 1.0,
    grip2: 1.3,
    walk8: 1.0,
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

          /*
            ---- THE SECOND ARC'S NODES -------------------------------------
            TikTok's card, its spoke and its own blue live rail. `liveRail2` is
            a separate path rather than a re-pointed `d` on `liveRail`, because
            both rails exist across the fold between the arcs and rewriting `d`
            mid-timeline would snap the first one out from under him.

            These are queried unconditionally for both variants — `q` returns
            null on wide, where there is no second arc — so the query block
            stays one shape and nothing here is behind a branch.
          */
          const litCard2 = q<SVGGElement>(`[data-mc-card="${variant}-tiktok"]`);
          const liveRail2 = q<SVGPathElement>(`[data-mc-liverail2="${variant}"]`);
          const liveSpoke2 = q<SVGPathElement>(`[data-mc-spoke="${variant}-tiktok"]`);

          /* The arc-2 mirror of hubFurniture / hubPath: the ground he stands on
             is TikTok's spoke this time, so TikTok's spoke is what has to
             survive the light beat and everything else is dead weight. */
          const hubFurniture2 = [
            ...cards.filter((c) => c !== litCard2),
            ...spokes.filter((sp) => sp !== liveSpoke2),
          ];
          const hubPath2 = [
            ...(liveSpoke2 ? [liveSpoke2] : []),
            ...(liveRail2 ? [liveRail2] : []),
            ...(pad ? [pad] : []),
            ...(hubLink ? [hubLink] : []),
          ];

          const dials = qa<SVGGElement>(`[data-mc-dial^="${variant}-"]`);
          const tile = q<SVGGElement>(`[data-mc-tile="${variant}"]`);
          const arc = q<SVGCircleElement>(`[data-mc-arc="${variant}-budget"]`);
          const needle = q<SVGLineElement>(`[data-mc-needle="${variant}-budget"]`);
          const readout = q<SVGTextElement>(`[data-mc-value="${variant}-budget"]`);

          /* The second arc's knob. Radius, not Bidding: Bidding's readout is the
             word "Max conv." and a needle sweep with no number moving beside it
             does not read as a VALUE changing — which is the whole point of the
             beat. Radius counts 25 -> 40 in miles, the way budget counts money. */
          const arcRad = q<SVGCircleElement>(`[data-mc-arc="${variant}-radius"]`);
          const needleRad = q<SVGLineElement>(`[data-mc-needle="${variant}-radius"]`);
          const readoutRad = q<SVGTextElement>(`[data-mc-value="${variant}-radius"]`);
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

          /*
            The second arc's own wind-back. TikTok's rail is retracted, its card
            is put back in its hub slot and un-lit, and the Radius needle is
            wound back to 25 mi. Without this the loop would ratchet: the card
            would stay perched at (195,70) and the needle would sit at 40 mi
            from the second repeat onwards, so the "before" state would silently
            become the "after" state one loop in.
          */
          tl.set(liveRail2, { strokeDashoffset: 100, opacity: 1 }, 0);
          tl.set(litCard2, { x: 0, y: 0 }, 0);
          tl.call(() => litCard2?.classList.remove("mc-card--lit"), undefined, 0);
          tl.set(arcRad, { "--mc-arc": DIAL_MATH.arcDash(RADIUS.vFrom) }, 0);
          if (needleRad) {
            const nx0 = needleRad.getAttribute("x1");
            const ny0 = needleRad.getAttribute("y1");
            tl.call(
              () =>
                needleRad.setAttribute(
                  "transform",
                  `rotate(${DIAL_MATH.needleAngle(RADIUS.vFrom)} ${nx0} ${ny0})`
                ),
              undefined,
              0
            );
          }
          if (readoutRad) {
            tl.call(() => {
              readoutRad.textContent = `${RADIUS.from} mi`;
            }, undefined, 0);
          }
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
          } else {
            // Landscape: the card lifts in place, so the loop head just returns
            // it to rest. Without this it would ratchet upward every repeat.
            tl.set(litCard, { x: 0, y: 0 }, 0);
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
          /*
            THE PAD FADES HERE TOO, NOT DURING walk2.

            This is the client's "stray grey ring". `.mc-pad__ring` is a 96px
            circle stroked in --theme-border (rgb(226,232,240)) and it lived in
            `hubPath`, which fades ~33% into walk2 — while the unlit cards and
            spokes fade here, at the light beat. For ~1.4s the pad was therefore
            the only hub object still on screen, alone in empty space, which is
            exactly what reads as a stray ring. He is already at the card by this
            beat, so fading it here costs nothing.

            It is a TIMING bug, not a styling one: nothing about the ring's
            appearance is wrong, only when it is still visible.
          */
          tl.to(
            [...hubFurniture, ...(pad ? [pad] : [])],
            { opacity: 0, duration: B.light, ease: "none" },
            t
          );
          /*
            PORTRAIT ALSO DROPS THE REST OF THE HUB PATH HERE, over the ride
            rather than in one snap.

            hubPath is the ground he was standing on — the Google Ads spoke, the
            blue live rail, and the pad's link up to the trunk. On wide it has to
            survive into walk2 because he walks out along it. On portrait he does
            not: the very next thing he does is leave the floor with the card, so
            the moment the ride starts nothing on the hub is under him again until
            walk5 brings him home. Fading it across the first half of the ride
            hands the stage over to the room in one continuous movement instead of
            leaving a lone grey ring behind him.
          */
          if (variant === "narrow") {
            tl.to(
              hubPath.filter((el) => el !== pad),
              { opacity: 0, duration: B.cardMove * 0.5, ease: "none" },
              t
            );
            /*
              ================================================================
              THE RIDE. HE GOES UP WITH THE CARD.
              ================================================================
              Owner, verbatim: "the robot is staying where he is when he taps on
              an icon instead of moving with the icon to wherever the icon is and
              then walking back down to tune the knobs."

              That is a literal description of what portrait did. The card
              travelled the full 198 units from the hub slot (95,310) to its
              perch (195,70) while `--mc-x`/`--mc-y` never changed: measured on
              the built page at 390px, feet at (162.9, 416.1) at the tap and
              (162.9, 416.1) when the card had finished lifting. He watched it go.

              Desktop already solved this — the coupled-lift block below drives
              the card and the sprite anchor from ONE proxy so they cannot drift
              apart. Portrait now uses the same mechanism, extended to both axes
              because portrait's card travels in both:

                card   (95,310) -> (95,70) -> (195,70)
                Elara (160,310) -> (160,112) -> (110,112)

              Phase A is the climb. He holds his tap column (x=160), so the 23
              units of clearance he had to the card's right edge at the tap are
              the same 23 units at the top: he rises BESIDE it, in step, which is
              what "moving with the icon" looks like. He keeps FRAME.reach for
              the whole climb, so his hand stays on the card that is carrying him.

              Phase B is the step-off. The card slides right into its perch and
              he steps left onto the bus elbow at (110,112) — out of its way, and
              onto the corner where the descent starts. FRAME.idle and a walk bob
              here, because this leg IS a walk; the climb is not, and giving it a
              bob would have read as levitation.

              The 0.45/0.55 overlap is kept from the old card-only lift: it
              rounds the corner instead of hinging it, for the card and for him
              identically, because both are driven by the same two proxies.

              DISCLOSED, not hidden: the climb is the one movement in this build
              that is not along a drawn line. ADR-0018's rule is about WALKING on
              rails, and this is a coupled ride with a drawn object that is
              itself crossing open canvas — which is precisely what the owner
              asked for. If it should instead be a walk, it needs a drawn riser
              from (160,310) to (160,112) and that is new geometry, not a tweak.
            */
            const RIDE_FROM_X = 41.0256; /* (160) his tap column   */
            const RIDE_TO_X = 28.2051; /*   (110) the bus elbow  */
            const RIDE_FROM_Y = 50; /*      (310) the hub row   */
            const RIDE_TO_Y = 18.0645; /*   (112) the card's sill*/

            const climb = { v: 0 };
            tl.to(
              climb,
              {
                v: 1,
                duration: B.cardMove * 0.55,
                ease: "power2.in",
                onUpdate: () => {
                  const p = climb.v;
                  gsap.set(litCard, { y: 240 * (1 - p) });
                  gsap.set(anchor, {
                    "--mc-y": `${RIDE_FROM_Y - (RIDE_FROM_Y - RIDE_TO_Y) * p}%`,
                  });
                },
              },
              t
            );

            const stepOff = { v: 0 };
            tl.call(
              () => {
                setFrame(FRAME.idle);
                /* Still facing left — the step-off travels left too, so the
                   flip he took at walk1 is already correct and re-asserting it
                   would be a no-op that hides a future regression. */
              },
              undefined,
              t + B.cardMove * 0.45
            );
            tl.to(
              stepOff,
              {
                v: 1,
                duration: B.cardMove * 0.55,
                ease: "power2.out",
                onUpdate: () => {
                  const p = stepOff.v;
                  gsap.set(litCard, { x: -100 * (1 - p) });
                  gsap.set(anchor, {
                    "--mc-x": `${RIDE_FROM_X - (RIDE_FROM_X - RIDE_TO_X) * p}%`,
                  });
                },
              },
              t + B.cardMove * 0.45
            );
            /* The two-step footfall, on the step-off only. */
            tl.to(
              sprite,
              {
                "--mc-bob": "-3px",
                duration: 0.17,
                repeat: Math.max(1, Math.round((B.cardMove * 0.55) / 0.17) - 1),
                yoyo: true,
                ease: "steps(1)",
              },
              t + B.cardMove * 0.45
            );
            tl.set(sprite, { "--mc-bob": "0px" }, t + B.cardMove);
            t += B.cardMove;
          } else if (B.cardMove > 0) {
            /*
              LANDSCAPE: THE CARD RISES AND HE RIDES IT UP.

              The client's sentence is the spec: "he taps the Google Ads thing,
              but then he stays there instead of going up with the Google Ads
              thing and then walking back down." Desktop had cardMove: 0, so the
              card never moved and the tap landed on a static object.

              ONE tween drives BOTH the card's y and the sprite anchor's --mc-y,
              through a single proxy value read by one onUpdate. It is NOT two
              tweens with matching durations: that is what the original did, and
              matched tweens drift under load, which is precisely what read as
              broken. There is nothing here left to desynchronise.

              He stands at W_TAP (932,220) and the card spans x 964..1076, so he
              is clear to its LEFT. The movement is vertical only and cannot push
              him through the card or its caption.
            */
            const TAP = R.walk1[R.walk1.length - 1];
            const tapY = num(TAP.y);
            const LIFT = 26; /* stage units, of 680 */
            const liftPct = (LIFT / 680) * 100;
            const ride = { v: 0 };

            tl.to(
              ride,
              {
                v: 1,
                duration: B.cardMove,
                ease: "power2.out",
                onUpdate: () => {
                  gsap.set(litCard, { y: -LIFT * ride.v });
                  gsap.set(anchor, { "--mc-y": `${tapY - liftPct * ride.v}%` });
                },
              },
              t
            );
            t += B.cardMove;

            /* "...and then walking back down." He steps off and descends to the
               rail he arrived on. The card stays up for the room sequence and is
               returned to rest at the loop head, so walk2 starts from a position
               he actually occupies rather than snapping down a frame later. */
            tl.to(
              anchor,
              { "--mc-y": TAP.y, duration: B.cardMove * 0.6, ease: "power1.inOut" },
              t
            );
            t += B.cardMove * 0.6;
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
          /*
            HE FACES THE WAY HE IS GOING, AND TURNS ONCE, AT THE DIAL.

            This used to be a flat `setFlip(1)` for the whole of walk2, and walk2
            is overwhelmingly a LEFTWARD journey in both profiles — the long
            trunk run is 525 units right-to-left on wide and 82 on portrait. He
            walked it backwards. The only rightward part is the last leg, the
            short step in to the dial face, which is also the one moment his
            facing carries meaning because he is about to reach into it.

            0.95 is derived, not chosen: weighting the route's legs exactly the
            way `walk()` weights them (x scaled by the stage aspect), the final
            leg begins at 0.958 of walk2 on wide and 0.950 on portrait. If either
            ROUTES.*.walk2 changes, re-derive this.
          */
          tl.call(() => {
            setFrame(FRAME.idle);
            setFlip(-1);
          }, undefined, t);
          tl.call(() => setFlip(1), undefined, t + B.walk2 * 0.95);
          walk(tl, R.walk2, B.walk2, t, aspect);
          /*
            LANDSCAPE ONLY. He is on the bus by 40% of walk2 on wide, so the
            ground he came in on can go now — not a beat earlier (see hubPath).

            Portrait no longer fades hubPath here, and it MUST not: walk2 on
            portrait now starts at (110,112), beside the lifted card, because he
            rode up with it. He left the spoke a whole beat ago and never touches
            the pad or the hub link again until walk5. Leaving the fade here would
            have held the pad's 96px `.mc-pad__ring` — the client's "stray grey
            ring" — on screen alone for ride(1.0) + light(0.15) + room(0.7) +
            0.4*walk2 = about 2.25s, which is longer than the window that was
            reported as a defect in the first place. Portrait fades it on the tap
            instead, in the block above.
          */
          if (variant === "wide") {
            tl.to(
              hubPath,
              { opacity: 0, duration: B.walk2 * 0.25, ease: "none" },
              t + B.walk2 * 0.4
            );
          }
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
          /*
            The RAILS come back before the last leg of walk5 lands on them — he
            is walking on them, so they cannot be late.

            The PAD is deliberately NOT in this group. Returning it here put a
            lone 96px grey ring (.mc-pad__ring, stroked --theme-border) on an
            otherwise empty stage for ~0.55s, because hubFurniture is held back
            until 0.62 of walk5 for a measured reason (the 63.8% Facebook-caption
            occlusion documented below). That lone ring is the second half of the
            client's "stray ring": fixing only the light-beat window left this one.
            The pad rides back with the cards instead, and he does not land on it
            until the end of walk5, by which time it is fully opaque.
          */
          tl.to(
            hubPath.filter((el) => el !== pad),
            { opacity: 1, duration: B.walk5 * 0.25, ease: "none" },
            t
          );
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
            [...hubFurniture, ...(pad ? [pad] : [])],
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

          /* ================================================================
             BEATS 15-20 — THE SECOND ARC: TIKTOK.

             This is the half of the sequence the owner remembers and the build
             at HEAD could not tell: "...moves to TikTok, turns a knob." He is
             back on the pad with the hub restored, which is byte-for-byte the
             state the timeline started in, so the second arc is the first one
             replayed against a different card and a different knob — mirrored
             across the pad rather than newly choreographed.

             Portrait only, and that is a geometry fact rather than a
             preference: on wide the keyword tile occupies x 100..300, y
             350..545 and the TikTok card sits at x 124..236, y 504..616, so
             the room's own tile is drawn on top of the card he would be
             lighting. Giving desktop a second stop needs new WIDE geometry,
             not new routes, and that is a separate change.
             ================================================================ */
          if (variant === "narrow") {
            const NB = BEATS.narrow;
            const NR = ROUTES.narrow;

            // ---- 15. Walk the line again, this time to the right ---------
            tl.call(() => {
              setFrame(FRAME.idle);
              /* Facing RIGHT. walk1 set -1 to face Google Ads on the left; the
                 mirror leg has to undo that or he moonwalks to TikTok. */
              setFlip(1);
            }, undefined, t);
            walk(tl, NR.walk6, NB.walk6, t, aspect);
            tl.to(
              liveRail2,
              { strokeDashoffset: 0, duration: NB.walk6, ease: "power1.inOut" },
              t
            );
            t += NB.walk6;

            // ---- 16. Tap TikTok ------------------------------------------
            tl.call(() => setFrame(FRAME.reach), undefined, t);
            t += NB.tap;

            // ---- 17. The tap lights TikTok, and the card gets out of the
            //          way of the knob it is about to turn ------------------
            tl.call(() => litCard2?.classList.add("mc-card--lit"), undefined, t);
            tl.to(
              [...hubFurniture2, ...(pad ? [pad] : [])],
              { opacity: 0, duration: NB.light, ease: "none" },
              t
            );
            /*
              THE LIFT IS NOT DECORATION HERE, IT IS CLEARANCE.

              TikTok's hub slot is (295,310) and the Radius dial's face is
              (298,300) r=38 — the card is sitting exactly on top of the knob
              this arc exists to turn. So it rides up its own column to the same
              (195,70) perch the Google Ads card uses, which is empty by the
              time it gets there because Google Ads went home on walk5.
              Orthogonally, up first then across, for the same reason walk1's
              lift is orthogonal: a diagonal would cut the corner across bare
              canvas.
            */
            /* And he rides it, exactly as he rides the Google Ads card — same
               two proxies, same 0.45/0.55 overlap, mirrored. His climb column is
               his TikTok tap column (230), so he holds the same clearance to the
               card's left edge going up that he had at the tap; then the card
               slides LEFT into the perch and he steps further left onto the same
               bus elbow at (110,112) both arcs descend from.

               The step-off is the one place the two arcs are not identical: here
               he and the card are both travelling left, so for the first third of
               the slide the card's left edge (253 -> 153) is within ~7 units of
               his right edge before the gap opens to 13. That is the same order
               as the 5- and 8-unit knob-rim overlaps this build already accepts,
               and `power2.out` clears it inside the first 0.2s. */
            const climb2 = { v: 0 };
            tl.to(
              climb2,
              {
                v: 1,
                duration: NB.cardMove * 0.55,
                ease: "power2.in",
                onUpdate: () => {
                  const p = climb2.v;
                  gsap.set(litCard2, { y: -240 * p });
                  gsap.set(anchor, { "--mc-y": `${50 - (50 - 18.0645) * p}%` });
                },
              },
              t
            );
            tl.call(
              () => {
                setFrame(FRAME.idle);
                /* He arrived facing RIGHT (walk6 set +1) and now travels LEFT. */
                setFlip(-1);
              },
              undefined,
              t + NB.cardMove * 0.45
            );
            const stepOff2 = { v: 0 };
            tl.to(
              stepOff2,
              {
                v: 1,
                duration: NB.cardMove * 0.55,
                ease: "power2.out",
                onUpdate: () => {
                  const p = stepOff2.v;
                  gsap.set(litCard2, { x: -100 * p });
                  gsap.set(anchor, { "--mc-x": `${58.9744 - (58.9744 - 28.2051) * p}%` });
                },
              },
              t + NB.cardMove * 0.45
            );
            tl.to(
              sprite,
              {
                "--mc-bob": "-3px",
                duration: 0.17,
                repeat: Math.max(1, Math.round((NB.cardMove * 0.55) / 0.17) - 1),
                yoyo: true,
                ease: "steps(1)",
              },
              t + NB.cardMove * 0.45
            );
            tl.set(sprite, { "--mc-bob": "0px" }, t + NB.cardMove);
            /* Arc 2's ground goes on the ride too, for the reason arc 1's does. */
            tl.to(
              hubPath2.filter((el) => el !== pad),
              { opacity: 0, duration: NB.cardMove * 0.5, ease: "none" },
              t
            );
            t += NB.cardMove;
            t += NB.light;

            // ---- 18. The room draws out of the TikTok card ---------------
            tl.to(wires, { strokeDashoffset: 0, duration: NB.room, ease: "power3.out" }, t);
            tl.to(
              controls,
              { opacity: 1, scale: 1, duration: NB.room, stagger: 0.06, ease: "power3.out" },
              t
            );
            t += NB.room;

            // ---- 19. Walk to the Radius dial -----------------------------
            tl.call(() => {
              setFrame(FRAME.idle);
              setFlip(1);
            }, undefined, t);
            walk(tl, NR.walk7, NB.walk7, t, aspect);
            /* The hubPath2 fade moved to the ride, alongside arc 1's. Nothing
               is left to fade here: walk7 now starts at (110,112) on the bus,
               so the pad and TikTok's rail were already gone before he set off. */
            t += NB.walk7;

            // ---- 20. Grip and turn the SECOND knob -----------------------
            const gripSteps2 = Math.floor(NB.grip2 / 0.16);
            for (let i = 0; i < gripSteps2; i += 1) {
              const f = i % 2 === 0 ? FRAME.gripA : FRAME.gripB;
              tl.call(() => setFrame(f), undefined, t + i * 0.16);
            }
            tl.to(
              arcRad,
              {
                "--mc-arc": DIAL_MATH.arcDash(RADIUS.vTo),
                duration: NB.grip2,
                ease: "power2.inOut",
              },
              t
            );
            if (needleRad) {
              /* Attribute-written from a numeric proxy, for the two reasons
                 spelled out on the budget needle at beat 6. Same mechanism, so
                 the two knobs cannot drift apart in behaviour. */
              const nx = needleRad.getAttribute("x1");
              const ny = needleRad.getAttribute("y1");
              const spin2 = { a: DIAL_MATH.needleAngle(RADIUS.vFrom) };
              tl.to(
                spin2,
                {
                  a: DIAL_MATH.needleAngle(RADIUS.vTo),
                  duration: NB.grip2,
                  ease: "power2.inOut",
                  onUpdate: () => {
                    needleRad.setAttribute("transform", `rotate(${spin2.a} ${nx} ${ny})`);
                  },
                },
                t
              );
            }
            if (readoutRad) {
              const counter2 = { v: RADIUS.from };
              tl.to(
                counter2,
                {
                  v: RADIUS.to,
                  duration: NB.grip2,
                  ease: "none",
                  onUpdate: () => {
                    readoutRad.textContent = `${Math.round(counter2.v)} mi`;
                  },
                },
                t
              );
            }
            t += NB.grip2;

            // ---- 21. Fold the room ---------------------------------------
            tl.to(
              [...controls].reverse(),
              { opacity: 0, scale: 0.92, duration: NB.fold, stagger: 0.05, ease: "power2.in" },
              t
            );
            tl.call(
              () => litCard2?.classList.remove("mc-card--lit"),
              undefined,
              t + NB.fold * 0.8
            );
            t += NB.fold;

            // ---- 22. Walk home, and put the hub back ---------------------
            tl.call(() => setFrame(FRAME.idle), undefined, t);
            walk(tl, NR.walk8, NB.walk8, t, aspect);
            /* The ground returns BEFORE the last leg lands on it — he walks the
               bus back to the hub link and then down onto the pad, so the pad
               cannot arrive late. */
            tl.to(hubPath2, { opacity: 1, duration: NB.walk8 * 0.3, ease: "none" }, t);
            tl.to(
              [...hubFurniture2, ...(pad ? [pad] : [])],
              { opacity: 1, duration: NB.walk8 * 0.4, ease: "power2.in" },
              t + NB.walk8 * 0.55
            );
            tl.to(wires, { strokeDashoffset: 100, duration: NB.walk8, ease: "power2.in" }, t);
            tl.to(
              liveRail2,
              { strokeDashoffset: 100, duration: NB.walk8, ease: "power1.inOut" },
              t
            );
            /* TikTok comes down its own lifted column and then across into its
               slot — the same order, and for the same reason, as the Google Ads
               card on walk5: the exact reverse would bring it left at y=70 and
               down the x=295 column, which is where he is standing. */
            tl.to(litCard2, { y: 0, duration: NB.walk8 * 0.55, ease: "power2.in" }, t);
            tl.to(
              litCard2,
              { x: 0, duration: NB.walk8 * 0.55, ease: "power2.out" },
              t + NB.walk8 * 0.45
            );
            t += NB.walk8;
          }

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
          "[marcommand-live] GSAP chunk failed to load; leaving the static end-state",
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
            TITLE, THEN THE PROPRIETARY LINE UNDER IT. EXACTLY TWO THINGS.

            Owner: "the marcommand was supposed to have MarCommand as the title
            and then the our proprietary section under it as the text."

            This reverses an over-application, not a decision. His earlier
            instruction — a one-line headline naming the platform, and "get rid
            of the thing below it" — was read as "merge everything into one
            line", so the descriptor's sentence was folded INTO the <h2> and
            nothing was left beneath. The element he actually wanted gone was a
            different one: the long `.mc-live__body` prose paragraph that sat
            further down (measured 184px, three-and-a-bit lines between the claim
            and the animation that demonstrates the claim), plus the duplicate
            `.mc-live__descriptor` deck. Those two stay deleted. The sentence
            itself was never the thing to remove — it was in the wrong element.

            So: <h2> is the product name, <p> beneath it is the proprietary line,
            verbatim as he gave it. Nothing else goes in this block.

            THE ID STAYS ON THE <h2>. `marcommand-live-heading` is referenced by
            this section's own `aria-labelledby` and nowhere else — checked
            across src/, scripts/ and public/ before moving anything, and the
            only two hits are both in this file. The <h2> remains the labelling
            element, so the reference keeps pointing at a real heading.

            THE WORDMARK IS ONE WORD AND MUST STAY ONE WORD.

            The two spans are written adjacent on a single line with no
            whitespace, no newline and no separator between them, so the DOM
            holds "Mar" + "Command" as touching inline text and `textContent` is
            the single token "MarCommand". Put them on separate lines and a
            formatter is one reflow away from turning this into "Mar Command" in
            the accessible name. Nothing here may introduce a break opportunity
            mid-word either: there is no space and no hyphen, and the only
            `overflow-wrap: break-word` on the site is scoped to
            `.ps-hero-headline`, so the word cannot be split across lines.
          */}
          <h2 id="marcommand-live-heading" className="ps-section-heading mc-live__heading">
            <span className="mc-live__wm mc-live__wm--a">Mar</span><span className="mc-live__wm mc-live__wm--b">Command</span>
          </h2>
          <p className="mc-live__lede">
            Our proprietary AI-powered marketing optimization platform
          </p>
        </div>

        <div className="mc-live__stage-card">
          {/*
            >> THE FUNNEL IS REMOVED, ON THE OWNER'S INSTRUCTION: "remove this
            flow chart from the marcommand thing", marked on a render of this
            card. It was `<MarCommandFunnel />` in a `.mc-fn` wrapper, sitting
            above the stage: six channel nodes converging on "Your business",
            then a five-step funnel reading Reached / Visited / Interested /
            Leads / Validated.

            This card used to be two halves sharing one surface so the section
            read as one product. It is now the agent stage alone, which is the
            half that actually demonstrates the thing. The funnel's only motion
            was the ribbon flow and it rode the SAME timeline as the stage, so
            the pause control, the ScrollTrigger gate and `visibilitychange`
            still govern everything that is left, and the loop's wall-clock
            budget only goes down.

            `marcommand-funnel.tsx` is left on disk, unused and unimported, the
            same way `RevenueVisual` is kept in `card-visuals.tsx`. Do
            not re-wire it without asking him.
          */}
          <div className="mc-stage">
            <MarCommandLiveStage />

            {/* Elara is an overlay div, not an SVG node, so he can be sized in
                whole CSS pixels and stay crisp under image-rendering: pixelated
                (96x116 = exactly half the 192x232 source, 48x58 = a quarter). */}
            <div className="mc-elara-anchor" aria-hidden="true">
              <div className="mc-elara" />
            </div>
          </div>

          {/*
            >> THE OUTCOME FIGURES ARE REMOVED, ON THE OWNER'S INSTRUCTION:
            "Get rid of this crap. I do not want to see this at all", marked on
            a desktop render of this card. It was a `.mc-live__outcomes` <dl>
            reading Reached 1,625,100 / Leads 1,482 / Revenue $156,740, with a
            `.mc-live__claim` caption underneath reading "Demonstration figures,
            not client data."

            Two independent reasons, either one sufficient:

            1. IT WAS BROKEN AS SHIPPED. The <dl> was only ever styled inside
               `@media (max-width: 768px)`. When the desktop `display: none`
               was deleted so the figures would show above 769, the grid rules
               that made them read as three centred columns stayed behind in
               the mobile block, so desktop rendered a bare <dl>: six lines of
               unstyled text flush against the card's left padding edge,
               183.6px tall, in an otherwise empty band below the stage.
               Measured at 1440x900 and 1920x1080 in both themes before
               deletion.

            2. THE NUMBERS WERE INVENTED. They are fabricated dollar amounts
               and counts a viewer would read as this business's results, which
               his standing content ruling forbids outright. The caption existed
               only to excuse them, so it goes with them rather than being left
               to disclaim nothing.

            The claim caption is NOT needed by anything that remains: no visible
            copy states a figure any more. The dial readouts inside the stage
            are still demonstration values and the two visually-hidden
            descriptions below still say so in their own last sentence.

            Nothing animated into these nodes. The two GSAP counters in this
            file (`:734` budget, `:1098` radius) write `textContent` on SVG
            readouts inside the stage, never on this <dl>, so the timeline has
            no beat here and loses no step. Do not re-add either element.
          */}

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
        {/*
          TWO descriptions, switched at the same breakpoint as the visuals.

          One shared paragraph cannot be true of both any more: the desktop
          surface is a six-channel funnel plus a four-dial control room, and the
          mobile surface is a ledge with ONE dial and ONE card. (The three
          outcome figures this used to also name are gone; see the deletion note
          on the stage card above.) Describing the funnel to a phone user
          announces content that
          is not on their screen, which is a worse defect than the vague text it
          replaces. `display: none` removes the inactive one from the
          accessibility tree, so exactly one is ever announced.
        */}
        {/*
          >> THE FUNNEL SENTENCE IS GONE FROM THIS ONE. The funnel graphic was
          removed on the owner's instruction, and a description that narrates
          six channels flowing through five stages now announces content that
          is not on anyone's screen. That is the exact defect the note above
          warns about, arriving from the other direction: the visual left and
          the description stayed.
        */}
        <p className="ps-visually-hidden mc-live__sr mc-live__sr--wide">
          MarCommand is a marketing channel optimization platform. This animation shows the
          agent at work: it walks to the Google Ads channel, opens its control panel, and
          adjusts the real controls that platform offers: daily budget, audience demographic,
          targeting radius, ad schedule and the keyword list. The figures shown are a
          demonstration.
        </p>
        <p className="ps-visually-hidden mc-live__sr mc-live__sr--narrow">
          MarCommand is a marketing channel optimization platform. This animation shows the
          agent at work on a switchboard of six advertising channels. It walks to the Google
          Ads card, taps it, and rides up with the card as it lifts, then walks back down to
          the control panel below and turns the daily budget dial from $2,400 up to $2,850. It
          swaps the keyword duct cleaning for heat pump, closes the panel, and then repeats the
          whole sequence on a second channel, TikTok, where it widens the targeting radius from
          25 to 40 miles. The panel also shows an audience demographic dial reading age 45 and
          over. The figures shown are a demonstration.
        </p>      </div>
    </section>
  );
}
