"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Rect, Showcase } from "@/data/showcase";
import { DufferCommandCenter } from "@/components/case-study/DemoStage/scenes/duffer-golf/DufferCommandCenter";
import { HaysCommandCenter } from "@/components/case-study/DemoStage/scenes/hays-academy/HaysCommandCenter";
import "./showcase.css";

/**
 * One product, two slides: their public website (a capture, ADR-0020) and the
 * command center we built them (a recreation on invented data, ADR-0016 §5-6).
 * Shared by the home popover, the phone sheet and the /showcase pages.
 *
 * The frame never measures the page to position the capture: the capture's
 * scroll and the spotlight are percentages of the capture's own size, so the
 * same numbers hold at every frame width. Only the command-center spotlight
 * measures, because it rings a live DOM element.
 */
export type StageVariant = "desk" | "phone";

const COMMAND = {
  "duffer-golf": DufferCommandCenter,
  "hays-academy": HaysCommandCenter,
} as const;

/** The frame's view, as height over width: 16:10 on desk, 600:390 on phone. */
export const VIEW_RATIO: Record<StageVariant, number> = { desk: 10 / 16, phone: 600 / 390 };

function clampY(y: number, cap: { width: number; height: number }, variant: StageVariant) {
  const viewH = cap.width * VIEW_RATIO[variant];
  return Math.max(0, Math.min(y, cap.height - viewH));
}

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export function WebsiteFrame({
  show,
  variant,
  y,
  focus,
  panMs,
  lazy = true,
}: {
  show: Showcase;
  variant: StageVariant;
  y: number;
  focus?: Rect | null;
  /** Duration of the move to `y`; 0 cuts. */
  panMs?: number;
  lazy?: boolean;
}) {
  const cap = show.site[variant];
  const top = clampY(y, cap, variant);
  const pageStyle = {
    transform: `translateY(-${(top / cap.height) * 100}%)`,
    "--sc-pan-ms": `${panMs ?? 760}ms`,
  } as CSSProperties;
  return (
    <figure className={`sc-frame sc-frame--web sc-frame--${variant}`}>
      <div className="sc-frame__chrome" aria-hidden="true">
        <span className="sc-frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="sc-frame__url">{show.liveLabel}</span>
        <span className="sc-frame__when">{show.site.captured}</span>
      </div>
      <div className="sc-frame__view" style={{ aspectRatio: `1 / ${VIEW_RATIO[variant]}` }}>
        <div className="sc-frame__page" style={pageStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cap.src}
            width={cap.width}
            height={cap.height}
            alt={`The ${show.liveLabel} home page, as we built it.`}
            loading={lazy ? "lazy" : "eager"}
            decoding="async"
            draggable={false}
          />
          {focus ? (
            <span
              className="sc-ring"
              aria-hidden="true"
              style={{
                left: pct(focus[0], cap.width),
                top: pct(focus[1], cap.height),
                width: pct(focus[2], cap.width),
                height: pct(focus[3], cap.height),
              }}
            />
          ) : null}
        </div>
      </div>
    </figure>
  );
}

/** The command center, as a labeled Proof Stage the privacy probe can read. */
export function CommandFrame({
  show,
  variant,
  focus,
  live,
  quiet,
}: {
  show: Showcase;
  variant: StageVariant;
  focus?: string | null;
  live?: boolean;
  /** A repeat of a stage already announced on this page: hide it from assistive tech. */
  quiet?: boolean;
}) {
  const Command = COMMAND[show.slug];
  const bodyRef = useRef<HTMLDivElement>(null);
  const [ring, setRing] = useState<{ l: number; t: number; w: number; h: number } | null>(null);

  // Ring the [data-focus] element of whichever layout (desk or phone) is showing.
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body || !focus) {
      setRing(null);
      return;
    }
    const place = () => {
      const target = [...body.querySelectorAll<HTMLElement>(`[data-focus="${focus}"]`)].find((el) => el.offsetParent !== null);
      if (!target) return setRing(null);
      const b = body.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      if (b.width === 0) return;
      const pad = 6;
      setRing({ l: r.left - b.left - pad, t: r.top - b.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(body);
    return () => ro.disconnect();
  }, [focus, variant]);

  return (
    <figure
      className={`sc-frame sc-frame--cmd sc-frame--${variant}`}
      data-demo-stage={`${show.slug}-command-center`}
      data-live={live ? "" : undefined}
      aria-hidden={quiet || undefined}
    >
      <div className="sc-frame__chrome" aria-hidden="true">
        <span className="sc-frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="sc-frame__url">{show.commandName}</span>
        <span className="sc-frame__label" data-demo-label>
          Demonstration data
        </span>
      </div>
      <p className="ps-visually-hidden" data-demo-narration>
        {show.narration}
      </p>
      <div className="sc-frame__cmd" ref={bodyRef} style={{ aspectRatio: `1 / ${VIEW_RATIO[variant]}` }}>
        <div className={`sc-frame__fit sc-frame__fit--${variant}`}>
          <Command />
        </div>
        {ring ? (
          <span
            className="sc-ring sc-ring--px"
            aria-hidden="true"
            style={{ left: ring.l, top: ring.t, width: ring.w, height: ring.h }}
          />
        ) : null}
      </div>
    </figure>
  );
}

/** Both slides on one track. `slide` 0 is the website, 1 the command center. */
export function ShowcaseStage({
  show,
  variant,
  slide,
  web,
  commandFocus,
  live,
  slideMs = 640,
}: {
  show: Showcase;
  variant: StageVariant;
  slide: 0 | 1;
  web: { y: number; focus?: Rect | null; panMs?: number; lazy?: boolean };
  commandFocus?: string | null;
  live?: boolean;
  slideMs?: number;
}) {
  return (
    <div className="sc-stage" style={{ "--sc-slide-ms": `${slideMs}ms` } as CSSProperties}>
      <div className="sc-stage__track" style={{ transform: `translateX(${slide === 1 ? "-50%" : "0%"})` }}>
        <div className="sc-stage__slide" aria-hidden={slide !== 0 || undefined} inert={slide !== 0 || undefined}>
          <WebsiteFrame show={show} variant={variant} y={web.y} focus={web.focus} panMs={web.panMs} lazy={web.lazy} />
        </div>
        <div className="sc-stage__slide" aria-hidden={slide !== 1 || undefined} inert={slide !== 1 || undefined}>
          <CommandFrame show={show} variant={variant} focus={commandFocus} live={live && slide === 1} />
        </div>
      </div>
    </div>
  );
}
