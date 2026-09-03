"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MarCommandLiveStage,
  ELARA_MARKS,
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

        /** A walk: position tween plus the two-step bob, on one timeline slot. */
        const walk = (
          tl: gsap.core.Timeline,
          to: { x: string; y: string },
          dur: number,
          at: number
        ) => {
          tl.to(
            anchor,
            {
              "--mc-x": to.x,
              "--mc-y": to.y,
              duration: dur,
              ease: "power1.inOut",
            },
            at
          );
          // 0.34s two-step hop, held as discrete steps so it reads as pixel-art
          // footfall rather than a smooth float.
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

          const liveRail = q<SVGPathElement>(`[data-mc-liverail="${variant}"]`);
          const wires = qa<SVGPathElement>(`[data-mc-wire^="${variant}-"]`);
          const cards = qa<SVGGElement>(`[data-mc-card^="${variant}-"]`);
          const litCard = q<SVGGElement>(`[data-mc-card="${variant}-google_ads"]`);
          const pad = q<SVGGElement>(`[data-mc-pad="${variant}"]`);
          // The pad is hub furniture and fades on exactly the same cue as the
          // five unlit cards, so it is never left ringing an opened dial.
          const otherCards = [
            ...cards.filter((c) => c !== litCard),
            ...(pad ? [pad] : []),
          ];
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
          tl.set(otherCards, { opacity: 1 }, 0);
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
          walk(tl, M.tap, B.walk1, t);
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
          tl.to(otherCards, { opacity: 0, duration: B.light, ease: "none" }, t);
          if (variant === "narrow") {
            tl.to(litCard, { x: 0, y: 0, duration: B.cardMove, ease: "power2.inOut" }, t);
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
          walk(tl, M.dial, B.walk2, t);
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
          walk(tl, M.keys, B.walk3, t);
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
          walk(tl, M.closeTap, B.walk4, t);
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
          tl.to(wires, { strokeDashoffset: 100, duration: B.fold, ease: "power2.in" }, t);
          tl.to(otherCards, { opacity: 1, duration: B.fold, ease: "power2.in" }, t);
          tl.call(() => litCard?.classList.remove("mc-card--lit"), undefined, t + B.fold * 0.8);
          if (variant === "narrow") {
            tl.to(litCard, { x: -100, y: 240, duration: B.fold, ease: "power2.inOut" }, t);
          }
          t += B.fold;

          // ---- 13. Walk home down the same spoke, retraced ----------------
          tl.call(() => setFrame(FRAME.idle), undefined, t);
          walk(tl, M.pad, B.walk5, t);
          tl.to(liveRail, { strokeDashoffset: 100, duration: B.walk5, ease: "power1.inOut" }, t);
          t += B.walk5;

          // ---- 14. Rest on the pad. A real pause, not a turnaround. -------
          tl.to({}, { duration: B.rest }, t);

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
          <span className="ps-eyebrow">MarCommand</span>
          <h2 id="marcommand-live-heading" className="ps-section-heading mc-live__heading">
            Watch the agent work.
          </h2>
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
          An animation of the MarCommand agent at work. Six advertising channels — Facebook,
          Instagram, Google Ads, TikTok, direct mail and Google Local Services — connect to a
          central hub. The agent walks to the Google Ads channel, opens its control panel, and
          adjusts the real controls that platform offers: daily budget, bid strategy, targeting
          radius, ad schedule and the keyword list. The figures shown are a demonstration.
        </p>
      </div>
    </section>
  );
}
