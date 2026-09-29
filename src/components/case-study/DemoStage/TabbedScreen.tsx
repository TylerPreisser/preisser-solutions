"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import type { DemoScreenBeat, DemoTab } from "@/types/demo-stage";
import { BeatHead } from "./Beat";
import { StepControls } from "./StepControls";
import { BAR_CLEARANCE_PX, useStageTimeline } from "./useStageTimeline";

const TOUR_DWELL_MS = 2200;
/** A visitor's own scroll past this, while the tour runs, takes the page back from it. */
const MANUAL_SCROLL_STOP_PX = 300;
/**
 * The tour's own scroll counts as "in flight" from its call until the window
 * has been still this long (or OWN_SCROLL_START_MS passes with no scroll at
 * all, e.g. a no-op scrollIntoView); scroll events inside that window are the
 * tour's, never the visitor's.
 */
const OWN_SCROLL_IDLE_MS = 200;
const OWN_SCROLL_START_MS = 400;
/**
 * A scroll is the visitor's only within this long of their own input (wheel,
 * touch, key, pointer). Anything else that moves the window -- the browser's
 * scroll anchoring when a panel above the fold changes height at rest -- is
 * not a visitor's scroll (measured, WebKit, NWKS 320x568: the Org Sheet
 * settling to its end frame moved the window ~1,046px with no input at all,
 * and a scroll-only detector took the page away from the tour).
 */
const USER_INPUT_MS = 1500;
/** The tab list's own scroll counts as at rest after this many still frames. */
const LIST_STILL_FRAMES = 6;
const LIST_REST_MAX_MS = 1500;
const USER_INPUTS = ["wheel", "touchstart", "touchmove", "keydown", "pointerdown"] as const;
/**
 * The panel scroll's landing watch: frames of stillness that count as "came
 * to rest", how many times a scroll that came to rest short is re-issued, and
 * the watch's ceiling. Measured need (WebKit, NWKS, 320x568, Org Sheet ->
 * Cabins): the tab switch's own layout shift jumped the window 32px in the
 * same frame as the smooth panel scroll, and WebKit dropped the scroll, so
 * the panel never came up.
 */
const LAND_STILL_FRAMES = 9;
const LAND_RETRIES = 2;
const LAND_MAX_MS = 4000;

/**
 * The tour's hold on the page's scroll (item B, lane F7). While `touring`, the
 * tour scrolls each tab's panel in and each step of it clear (`follow`). A
 * visitor who scrolls more than MANUAL_SCROLL_STOP_PX themselves -- measured
 * from where the tour's own last scroll left the page -- clears `follow` for
 * the rest of the tour: it keeps playing and changing tabs, but never moves
 * the page again, and each step then waits to be seen like any autoplay.
 */
interface TourScroll {
  /** The tour drives this panel's ticks: scroll each step clear. */
  follows: () => boolean;
  /** No tour scroll is travelling: a followed step may reveal (and scroll) now. */
  settled: () => boolean;
  /** The panel may scroll itself in: not touring (a tap), or a tour that still follows. */
  mayScroll: () => boolean;
  /** Call right before any kit scroll, so its scroll events are not the visitor's. */
  markOwnScroll: () => void;
  /** A scroll that stays the tour's own until `releaseOwnScroll` (the panel's landing watch). */
  holdOwnScroll: () => void;
  releaseOwnScroll: () => void;
}

export type TabbedScreenBeat = DemoScreenBeat & { tabs: readonly DemoTab[] };
export interface TabSlots {
  /** The tab's "before" card, drawn in the client's old materials. */
  before?: ReactNode;
  /** The tab's screen, with data-stage-step elements for its steps. */
  screen: ReactNode;
}

/**
 * ADR-0017's clickable panel. WITHOUT JS every panel renders stacked, each with
 * its tab name, and the tab bar is hidden: that is the complete end frame, and
 * tabs that do nothing would be worse. WITH JS one panel shows at a time.
 * Tab 0 plays on entry; any other tab plays the first time it is chosen; the
 * tour replays each tab in order. Any tap on a tab stops the tour.
 */
export function TabbedScreen({ beat, panels }: { beat: TabbedScreenBeat; panels: Readonly<Record<string, TabSlots>> }) {
  const [js, setJs] = useState(false);
  const [active, setActive] = useState(0);
  const [touring, setTouring] = useState(false);
  const [playKeys, setPlayKeys] = useState<number[]>(() => beat.tabs.map(() => 0));
  const played = useRef<Set<number>>(new Set([0]));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const barRef = useRef<HTMLDivElement | null>(null);
  const touringRef = useRef(false);
  const tourTimer = useRef(0);
  const guard = useRef({ touring: false, follow: false, own: false, held: false, base: 0, timer: 0, input: -Infinity });
  const tour = useMemo<TourScroll>(() => {
    const g = guard.current;
    const land = () => {
      g.own = false;
      g.base = window.scrollY;
    };
    return {
      follows: () => g.touring && g.follow,
      settled: () => !g.own,
      mayScroll: () => !g.touring || g.follow,
      markOwnScroll: () => {
        g.own = true;
        window.clearTimeout(g.timer);
        if (!g.held) g.timer = window.setTimeout(land, OWN_SCROLL_START_MS);
      },
      holdOwnScroll: () => {
        g.held = true;
        g.own = true;
        window.clearTimeout(g.timer);
      },
      releaseOwnScroll: () => {
        g.held = false;
        window.clearTimeout(g.timer);
        land();
      },
    };
  }, []);
  // Flips true on the FIRST tap or "Take the tour" and stays true: gates the
  // scroll effects below so mount and hydration (active === 0 already, no
  // visitor action) never scroll the page (review-NW.md B3).
  const [interacted, setInteracted] = useState(false);

  useEffect(() => setJs(true), []);
  useEffect(() => {
    touringRef.current = touring;
  }, [touring]);
  useEffect(() => () => window.clearTimeout(tourTimer.current), []);

  // The visitor's own scroll, while the tour runs (see TourScroll above).
  useEffect(() => {
    if (!touring) return;
    const g = guard.current;
    if (!g.own) g.base = window.scrollY;
    const onInput = () => {
      g.input = performance.now();
    };
    const onScroll = () => {
      if (g.own) {
        if (g.held) return; // the landing watch releases it
        window.clearTimeout(g.timer);
        g.timer = window.setTimeout(() => {
          g.own = false;
          g.base = window.scrollY;
        }, OWN_SCROLL_IDLE_MS);
        return;
      }
      if (performance.now() - g.input > USER_INPUT_MS) {
        g.base = window.scrollY; // moved by layout, not by the visitor
        return;
      }
      if (g.follow && Math.abs(window.scrollY - g.base) > MANUAL_SCROLL_STOP_PX) g.follow = false;
    };
    for (const k of USER_INPUTS) window.addEventListener(k, onInput, { capture: true, passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      for (const k of USER_INPUTS) window.removeEventListener(k, onInput, { capture: true });
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(g.timer);
      g.own = false;
      g.held = false;
    };
  }, [touring]);

  const play = useCallback((i: number) => {
    played.current.add(i);
    setPlayKeys((keys) => keys.map((k, j) => (j === i ? k + 1 : k)));
  }, []);

  const stopTour = useCallback(() => {
    window.clearTimeout(tourTimer.current);
    guard.current.touring = false;
    guard.current.follow = false;
    setTouring(false);
  }, []);

  const choose = useCallback(
    (i: number) => {
      stopTour();
      setInteracted(true);
      setActive(i);
      if (!played.current.has(i)) play(i);
    },
    [play, stopTour],
  );

  const startTour = useCallback(() => {
    window.clearTimeout(tourTimer.current);
    guard.current.touring = true;
    guard.current.follow = true;
    guard.current.base = window.scrollY;
    setInteracted(true);
    setTouring(true);
    setActive(0);
    play(0);
  }, [play]);

  // Keep the active tab visible inside the bar's own horizontal scroller
  // (review-NW.md B3: "the active tab is outside the tab list's visible
  // area"). Adjusts `.demo-tabs__list.scrollLeft` directly rather than
  // `tabButton.scrollIntoView({inline:"nearest"})`: when the whole stage is
  // far below the fold (the tour's actual starting condition), a
  // scrollIntoView call on the tab -- even with `block:"nearest"` -- still
  // has to move the WINDOW vertically to make the tab visible at all, and
  // that competed with the panel effect's own, precise vertical scroll
  // (TabPanel below) for the same scroll animation, landing short of it.
  // Only touching `scrollLeft` cannot move the page.
  //
  // Always aligns the tab's START, on either side: the list snaps to tab
  // starts (demo-stage.css `scroll-snap-type: x proximity` +
  // `.demo-tabs__tab { scroll-snap-align: start }`), so any other offset --
  // e.g. the tab's right edge flush with the list's -- is not a snap
  // position and proximity snapping pulled it back to the previous tab's
  // start, clipping the active tab again (review-F4.md HIGH 2: Org Sheet
  // clipped 32.7px on the real NWKS tabs, all three engines). A start that
  // is past the list's maximum scroll clamps to the end, which is always a
  // valid snap position too.
  //
  // Then once more, when the list has come to rest: a scene's own smooth
  // `list.scrollTo` (NWKS TabFollow) can still be travelling past the
  // alignment above, and under load chromium measured it resting 1.2px past
  // the Attendees tab's start at 320x568 (the tab clipped at rest). Checked
  // after LIST_STILL_FRAMES frames with no horizontal movement, within
  // LIST_REST_MAX_MS.
  useEffect(() => {
    if (!interacted) return;
    const btn = tabRefs.current[active];
    const list = btn?.closest<HTMLElement>(".demo-tabs__list");
    if (!btn || !list) return;
    const align = (slack: number) => {
      const listRect = list.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      if (btnRect.left < listRect.left - slack || btnRect.right > listRect.right + slack) {
        list.scrollLeft += btnRect.left - listRect.left;
      }
    };
    align(0);
    const t0 = performance.now();
    let raf = 0;
    let still = 0;
    let lastX = Number.NaN;
    const frame = () => {
      const x = list.scrollLeft;
      still = x === lastX ? still + 1 : 0;
      lastX = x;
      if (still >= LIST_STILL_FRAMES) {
        raf = 0;
        align(0.5);
        return;
      }
      raf = performance.now() - t0 < LIST_REST_MAX_MS ? requestAnimationFrame(frame) : 0;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, interacted]);

  const onPanelEnd = useCallback(
    (i: number) => {
      if (!touringRef.current) return;
      if (i >= beat.tabs.length - 1) {
        guard.current.touring = false;
        guard.current.follow = false;
        setTouring(false);
        return;
      }
      tourTimer.current = window.setTimeout(() => {
        if (!touringRef.current) return;
        setActive(i + 1);
        play(i + 1);
      }, TOUR_DWELL_MS);
    },
    [beat.tabs.length, play],
  );

  // After every hook, so rules-of-hooks holds; a missing panel fails the build.
  for (const t of beat.tabs) {
    if (!panels[t.id]) throw new Error(`[TabbedScreen ${beat.id}] no panel for tab "${t.id}"`);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = beat.tabs.length - 1;
    const to =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (to < 0) return;
    e.preventDefault();
    choose(to);
    tabRefs.current[to]?.focus();
  };

  return (
    <div className="demo-beat demo-tabs" data-beat={beat.id} data-beat-kind="screen" data-tabs-js={js ? "" : undefined}>
      <BeatHead beat={beat} />
      <div className="demo-tabs__bar" ref={barRef}>
        <div className="demo-tabs__list" role="tablist" aria-label={beat.chrome} data-stage-scroller>
          {beat.tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${beat.id}-tab-${t.id}`}
              aria-controls={`${beat.id}-panel-${t.id}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className="demo-tabs__tab"
              onClick={() => choose(i)}
              onKeyDown={onKeyDown}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" className="demo-btn demo-tabs__tour" aria-pressed={touring} onClick={touring ? stopTour : startTour}>
          {touring ? "Stop the tour" : "Take the tour"}
        </button>
      </div>
      <p className="demo-tabs__tourcap" aria-live="polite">
        {touring ? beat.tabs[active].tourCaption : ""}
      </p>
      {beat.tabs.map((t, i) => (
        <TabPanel
          key={t.id}
          beatId={beat.id}
          tab={t}
          slots={panels[t.id]}
          index={i}
          active={i === active}
          hidden={js && i !== active}
          playKey={playKeys[i]}
          onEnd={onPanelEnd}
          barRef={barRef}
          interacted={interacted}
          tour={tour}
        />
      ))}
    </div>
  );
}

function TabPanel(props: {
  beatId: string;
  tab: DemoTab;
  slots: TabSlots;
  index: number;
  active: boolean;
  hidden: boolean;
  playKey: number;
  onEnd: (index: number) => void;
  barRef: RefObject<HTMLDivElement | null>;
  interacted: boolean;
  tour: TourScroll;
}) {
  const { beatId, tab, slots, index, active, hidden, playKey, onEnd, barRef, interacted, tour } = props;
  const tl = useStageTimeline(tab.steps, {
    autoplay: index === 0 ? "entry" : "manual",
    onEnd: () => onEnd(index),
    // Tour-driven steps scroll clear like a Next tap (NWKS B3: the phone
    // tour played steps 2+ behind the control bar); only the ACTIVE panel,
    // and only while the tour still owns the scroll.
    follow: () => active && tour.follows(),
    followReady: tour.settled,
    onScroll: tour.markOwnScroll,
    // A step scrolled to keeps its top clear of the pinned tab bar (phone and
    // tablet, where the bar is sticky under the site header), with the same
    // designed clearance the phone control bar gets at the bottom.
    topInset: () => {
      const bar = barRef.current;
      if (!bar || getComputedStyle(bar).position !== "sticky") return 0;
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 0;
      return nav + bar.getBoundingClientRect().height + BAR_CLEARANCE_PX;
    },
  });
  const { replay, goto, trackProps } = tl;
  const panelRef = trackProps.ref;
  useEffect(() => {
    if (playKey > 0) replay();
  }, [playKey, replay]);
  // A panel left mid-play finishes silently, so coming back shows its end frame.
  useEffect(() => {
    if (!active) goto(tab.steps.length);
  }, [active, goto, tab.steps.length]);
  // Scroll this panel's top just under the tab bar when the tour advances to
  // it or a visitor taps it (review-NW.md B3: "the product window starts
  // about 60% down the screen ... below the fold"). Never on mount/hydration
  // (`interacted` gate, set in TabbedScreen).
  //
  // The margin has two cases, because the bar's OWN top ends up in a
  // different place relative to the panel depending on how it holds its
  // position (demo-stage.css `@media (max-width: 1023px) .demo-tabs__bar`):
  //   - sticky (phone/tablet): the bar re-pins to `top: var(--nav-height)`
  //     regardless of scroll, decoupled from its own flow position, so the
  //     margin only needs the bar's OWN height on top of the header -- the
  //     pin does the rest.
  //   - static (desktop): nothing re-pins the bar, so scrolling the PANEL to
  //     merely `header + bar height` still leaves the beat's own heading
  //     (`BeatHead`, above the bar) and the bar itself high enough to land
  //     UNDER the fixed header, invisible behind it. The margin instead adds
  //     the bar's full top-to-panel-top distance (which includes that
  //     heading), landing the bar's own top -- not just the panel's --
  //     right at the header's edge. This distance is scroll-invariant (both
  //     rects move together), so it is safe to read before scrolling.
  useEffect(() => {
    if (!active || !interacted) return;
    // A tour the visitor has taken the scroll back from never moves the page.
    if (!tour.mayScroll()) return;
    const el = panelRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 0;
    const barRect = bar.getBoundingClientRect();
    const sticky = getComputedStyle(bar).position === "sticky";
    const offset = sticky ? barRect.height : el.getBoundingClientRect().top - barRect.top;
    // No transition on the panel itself, or the margin below is not in
    // force when scrollIntoView reads it: under reduced motion the site's
    // blanket reset (globals.css `@media (prefers-reduced-motion: reduce)
    // { *, *::before, *::after { transition-duration: 0.01ms !important } }`)
    // gives every element a real transition on `transition-property: all`
    // (the initial value), scroll-margin-top included. Firefox then reads
    // the transition's START value (0px) in the same task and lands the
    // panel 140px under the pinned bar (review-F4.md MEDIUM; measured
    // computed 0px with the inline 140px set, and 140px once this is set).
    // The panel animates nothing of its own; its steps carry their own
    // transitions (demo-stage.css `[data-track-armed] [data-stage-step]`).
    el.style.transitionProperty = "none";
    el.style.scrollMarginTop = `${nav + offset}px`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "instant" : "smooth";
    // Landing watch: the scroll stays the tour's own (no followed step
    // reveals, no scroll event counts as the visitor's) until the panel's top
    // sits at its margin, or the page cannot scroll any closer. A scroll that
    // came to rest short -- dropped by the engine, see LAND_RETRIES -- is
    // issued again.
    tour.holdOwnScroll();
    el.scrollIntoView({ block: "start", behavior });
    const t0 = performance.now();
    let raf = 0;
    let still = 0;
    let tries = 0;
    let lastY = Number.NaN;
    const frame = () => {
      const y = window.scrollY;
      still = y === lastY ? still + 1 : 0;
      lastY = y;
      const off = el.getBoundingClientRect().top - (nav + offset);
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const arrived = Math.abs(off) <= 1 || (off > 0 && y >= maxY - 1) || (off < 0 && y <= 0);
      if (arrived || performance.now() - t0 > LAND_MAX_MS) {
        raf = 0;
        tour.releaseOwnScroll();
        return;
      }
      if (still >= LAND_STILL_FRAMES && tries < LAND_RETRIES) {
        tries += 1;
        still = 0;
        el.scrollIntoView({ block: "start", behavior });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      tour.releaseOwnScroll();
    };
  }, [active, interacted, panelRef, barRef, tour]);
  return (
    <div
      role="tabpanel"
      id={`${beatId}-panel-${tab.id}`}
      aria-labelledby={`${beatId}-tab-${tab.id}`}
      className="demo-tabs__panel"
      hidden={hidden}
      {...tl.trackProps}
    >
      <div className="demo-tabs__panel-label" aria-hidden="true">
        {tab.label}
      </div>
      <p className="ps-visually-hidden">{tab.description}</p>
      <div className="demo-tabs__journey">
        {slots.before ? (
          <div className="demo-tabs__before">
            {tab.before ? <p className="demo-tabs__before-cap">{tab.before.caption}</p> : null}
            {slots.before}
          </div>
        ) : null}
        <div className="demo-tabs__after">{slots.screen}</div>
      </div>
      <StepControls steps={tab.steps} tl={tl} label={tab.label} />
    </div>
  );
}
