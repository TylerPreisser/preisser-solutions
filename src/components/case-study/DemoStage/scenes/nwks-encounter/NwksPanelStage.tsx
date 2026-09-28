"use client";
import { DemoStage } from "../../DemoStage";
import { stages } from "@/data/demos/nwks-encounter";
import { DashboardScreen, DashboardBefore } from "./DashboardTab";
import { AttendeesScreen, AttendeesBefore } from "./AttendeesTab";
import { OrgSheetScreen, OrgSheetBefore } from "./OrgSheetTab";
import { CabinsScreen, CabinsBefore } from "./CabinsTab";
import { EmailScreen, EmailBefore } from "./EmailTab";
import { LookoutScreen } from "./LookoutTab";
import "./nwks-admin.css";

export function NwksPanelStage() {
  const [stage] = stages;
  return (
    <DemoStage
      stage={stage}
      slots={{
        panel: {
          tabs: {
            dashboard: { before: <DashboardBefore />, screen: <DashboardScreen /> },
            attendees: { before: <AttendeesBefore />, screen: <AttendeesScreen /> },
            "org-sheet": { before: <OrgSheetBefore />, screen: <OrgSheetScreen /> },
            cabins: { before: <CabinsBefore />, screen: <CabinsScreen /> },
            email: { before: <EmailBefore />, screen: <EmailScreen /> },
            lookout: { screen: <LookoutScreen /> },
          },
        },
      }}
    />
  );
}
