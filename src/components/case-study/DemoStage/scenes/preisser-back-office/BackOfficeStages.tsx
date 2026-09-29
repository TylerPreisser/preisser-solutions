"use client";

import { DemoStage } from "../../DemoStage";
import { stages } from "@/data/demos/preisser-back-office";
import { BankStatement } from "./BankStatement";
import { MatchingRead } from "./MatchingRead";
import { HeldCards } from "./HeldCards";
import { ReviewScreen } from "./ReviewScreen";
import "./back-office.css";

/**
 * The scene entry for /case-studies/preisser-back-office (ADR-0016, ADR-0018;
 * spec-BO.md). Imported only by that route's page.tsx, so this file and its
 * fixture ship only there. Later back-office Proof Stages (ADR-0018 §1)
 * append to `stages` in src/data/demos/preisser-back-office.ts and get their
 * own slot entries here.
 */
export function BackOfficeStages() {
  const [depositMatcher] = stages;
  return (
    <DemoStage
      stage={depositMatcher}
      slots={{
        statement: <BankStatement />,
        matching: <MatchingRead />,
        held: <HeldCards />,
        review: <ReviewScreen />,
      }}
    />
  );
}
