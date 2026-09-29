"use client";
import { useEffect, useRef } from "react";
import { DemoStage } from "../../DemoStage";
import { stages } from "@/data/demos/nwks-encounter";
import { DashboardScreen } from "./DashboardTab";
import { AttendeesScreen } from "./AttendeesTab";
import { OrgSheetScreen } from "./OrgSheetTab";
import { CabinsScreen } from "./CabinsTab";
import { EmailScreen } from "./EmailTab";
import { DashboardBefore, AttendeesBefore, OrgSheetBefore, CabinsBefore, EmailBefore } from "./OldMaterials";
import { LookoutScreen } from "./LookoutTab";
import { BeforeStrip } from "./BeforeStrip";
import "./nwks-admin.css";

/**
 * On a phone the six tabs are one sideways-scrolling row (nwks-admin.css, lane
 * NW5 item 1). The kit's tour and arrow keys change the selected tab without
 * scrolling that row, so the tab being played could sit out of sight. This
 * keeps the selected tab inside the row. It scrolls the row only (the list's
 * own scrollTo), never the page.
 */
function TabFollow() {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const list = ref.current?.previousElementSibling?.querySelector<HTMLElement>(".demo-skin--nwks-mens .demo-tabs__list");
    if (!list) return;
    const follow = () => {
      if (list.scrollWidth <= list.clientWidth + 1) return;
      const tab = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!tab) return;
      const lr = list.getBoundingClientRect();
      const tr = tab.getBoundingClientRect();
      const left = tr.left - lr.left + list.scrollLeft;
      const right = left + tr.width;
      if (left >= list.scrollLeft - 1 && right <= list.scrollLeft + list.clientWidth + 1) return;
      // To the tab's own start: the kit's list snaps to tab starts
      // (scroll-snap-align: start), so any other offset snaps back.
      const to = left;
      if (to === list.scrollLeft) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: Math.max(0, to), behavior: reduce ? "auto" : "smooth" });
    };
    const mo = new MutationObserver(follow);
    mo.observe(list, { attributes: true, subtree: true, attributeFilter: ["aria-selected"] });
    return () => mo.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}

export function NwksPanelStage() {
  const [stage] = stages;
  return (
    <>
      <DemoStage
        stage={stage}
        slots={{
          panel: {
            tabs: {
              dashboard: { before: <BeforeStrip title="A form that shut when full"><DashboardBefore /></BeforeStrip>, screen: <DashboardScreen /> },
              attendees: { before: <BeforeStrip title="A call-back list, by phone"><AttendeesBefore /></BeforeStrip>, screen: <AttendeesScreen /> },
              "org-sheet": { before: <BeforeStrip title="A re-typed team workbook"><OrgSheetBefore /></BeforeStrip>, screen: <OrgSheetScreen /> },
              cabins: { before: <BeforeStrip title="A rebuilt room spreadsheet"><CabinsBefore /></BeforeStrip>, screen: <CabinsScreen /> },
              email: { before: <BeforeStrip title="Emailed by hand, one by one"><EmailBefore /></BeforeStrip>, screen: <EmailScreen /> },
              lookout: { screen: <LookoutScreen /> },
            },
          },
        }}
      />
      <TabFollow />
    </>
  );
}
