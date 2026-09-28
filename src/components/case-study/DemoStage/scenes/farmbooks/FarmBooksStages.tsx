"use client";
/**
 * scenes/farmbooks/FarmBooksStages.tsx — the scene's top-level export, mounted only by
 * src/app/case-studies/farmbooks/page.tsx (ADR-0016 §7: the scene ships only on its own route).
 *
 * Wraps the whole scene in <MotionConfig reducedMotion="user">, once, per spec-FB §4: FarmBooks
 * wraps its whole app in this (app/layout.tsx:59 @8cbbbb4), and the Preisser site has none of its
 * own — so WheatAgent's springs drop transform motion for a reduced-motion visitor exactly as
 * farm-books.com does, without touching any other route.
 */
import { MotionConfig } from "framer-motion";
import { DemoStage } from "../../DemoStage";
import { stages } from "@/data/demos/farmbooks";
import { TheRead } from "./TheRead";
import { TheBooks } from "./TheBooks";
import { WhatGoesWrong } from "./WhatGoesWrong";
import { TheYear } from "./TheYear";
import "./farmbooks.css";

export function FarmBooksStages({ fontVariable }: { fontVariable: string }) {
  const [showcase] = stages;
  return (
    <div className={fontVariable}>
      <MotionConfig reducedMotion="user">
        <DemoStage
          stage={showcase}
          slots={{
            read: <TheRead />,
            books: <TheBooks />,
            caught: <WhatGoesWrong />,
            year: <TheYear />,
          }}
        />
      </MotionConfig>
    </div>
  );
}
