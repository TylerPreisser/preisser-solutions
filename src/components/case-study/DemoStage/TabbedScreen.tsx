"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import type { DemoScreenBeat, DemoTab } from "@/types/demo-stage";
import { BeatHead } from "./Beat";
import { StepControls } from "./StepControls";
import { useStageTimeline } from "./useStageTimeline";

const TOUR_DWELL_MS = 2200;

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
  // Flips true on the FIRST tap or "Take the tour" and stays true: gates the
  // scroll effects below so mount and hydration (active === 0 already, no
  // visitor action) never scroll the page (review-NW.md B3).
  const [interacted, setInteracted] = useState(false);

  useEffect(() => setJs(true), []);
  useEffect(() => {
    touringRef.current = touring;
  }, [touring]);
  useEffect(() => () => window.clearTimeout(tourTimer.current), []);

  const play = useCallback((i: number) => {
    played.current.add(i);
    setPlayKeys((keys) => keys.map((k, j) => (j === i ? k + 1 : k)));
  }, []);

  const stopTour = useCallback(() => {
    window.clearTimeout(tourTimer.current);
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
  useEffect(() => {
    if (!interacted) return;
    const btn = tabRefs.current[active];
    const list = btn?.closest<HTMLElement>(".demo-tabs__list");
    if (!btn || !list) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (btnRect.left < listRect.left || btnRect.right > listRect.right) {
      list.scrollLeft += btnRect.left - listRect.left;
    }
  }, [active, interacted]);

  const onPanelEnd = useCallback(
    (i: number) => {
      if (!touringRef.current) return;
      if (i >= beat.tabs.length - 1) {
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
}) {
  const { beatId, tab, slots, index, active, hidden, playKey, onEnd, barRef, interacted } = props;
  const tl = useStageTimeline(tab.steps, {
    autoplay: index === 0 ? "entry" : "manual",
    onEnd: () => onEnd(index),
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
    el.scrollIntoView({ block: "start", behavior: reduced ? "instant" : "smooth" });
  }, [active, interacted, panelRef, barRef]);
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
