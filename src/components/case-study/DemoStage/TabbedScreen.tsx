"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
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
  const touringRef = useRef(false);
  const tourTimer = useRef(0);

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
      setActive(i);
      if (!played.current.has(i)) play(i);
    },
    [play, stopTour],
  );

  const startTour = useCallback(() => {
    window.clearTimeout(tourTimer.current);
    setTouring(true);
    setActive(0);
    play(0);
  }, [play]);

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
      <div className="demo-tabs__bar">
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
}) {
  const { beatId, tab, slots, index, active, hidden, playKey, onEnd } = props;
  const tl = useStageTimeline(tab.steps, {
    autoplay: index === 0 ? "entry" : "manual",
    onEnd: () => onEnd(index),
  });
  const { replay, goto } = tl;
  useEffect(() => {
    if (playKey > 0) replay();
  }, [playKey, replay]);
  // A panel left mid-play finishes silently, so coming back shows its end frame.
  useEffect(() => {
    if (!active) goto(tab.steps.length);
  }, [active, goto, tab.steps.length]);
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
