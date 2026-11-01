"use client";

import type { Beat } from "@/data/showcase/types";
import { AiAskBeat, aiMs } from "./AiAskBeat";
import { AiWorkBeat, aiWorkMs } from "./AiWorkBeat";
import { FunnelBeat, funnelMs } from "./FunnelBeat";
import { WebsiteBeat, websiteMs } from "./WebsiteBeat";
import type { BeatProps } from "./shared";
import "./portal.css";

export type { Variant } from "./shared";

/** One beat of any kind. */
export function BeatView(p: BeatProps<Beat>) {
  const b = p.beat;
  switch (b.kind) {
    case "website":
      return <WebsiteBeat {...p} beat={b} />;
    case "funnel":
      return <FunnelBeat {...p} beat={b} />;
    case "ai-ask":
      return <AiAskBeat {...p} beat={b} />;
    case "ai-at-work":
      return <AiWorkBeat {...p} beat={b} />;
  }
}

/** How long a beat plays before the window moves to the next one. */
export function beatMs(b: Beat, phone: boolean): number {
  switch (b.kind) {
    case "website":
      return websiteMs(b, phone);
    case "funnel":
      return funnelMs(phone);
    case "ai-ask":
      return aiMs(b);
    case "ai-at-work":
      return aiWorkMs(b);
  }
}
