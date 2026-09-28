"use client";
import { DemoStage } from "../../DemoStage";
import { stages } from "@/data/demos/nwks-encounter";
import { DashboardScreen } from "./DashboardTab";
import { AttendeesScreen } from "./AttendeesTab";
import { OrgSheetScreen } from "./OrgSheetTab";
import { CabinsScreen } from "./CabinsTab";
import { EmailScreen } from "./EmailTab";
import { DashboardBefore, AttendeesBefore, OrgSheetBefore, CabinsBefore, EmailBefore } from "./OldMaterials";
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
