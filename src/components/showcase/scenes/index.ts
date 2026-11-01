// The showcase scenes: one picture per client story, played as beats.
// Each takes SceneProps (layout "desk" 1280 x 800 or "phone" 390 x 600) and
// renders its final frame first (no JS, reduced motion, the privacy probe).
import type { ComponentType } from "react";
import type { SceneProps } from "./kit";
import { HgCoiScene } from "./HgCoiScene";
import { HgSwdScene } from "./HgSwdScene";
import { FarmbooksBillScene } from "./FarmbooksBillScene";
import { NwksBedsScene } from "./NwksBedsScene";

export type SceneId = "hg-coi" | "hg-swd" | "farmbooks-bill" | "nwks-beds";

export const SCENES: Record<SceneId, ComponentType<SceneProps>> = {
  "hg-coi": HgCoiScene,
  "hg-swd": HgSwdScene,
  "farmbooks-bill": FarmbooksBillScene,
  "nwks-beds": NwksBedsScene,
};

export { NATIVE_SIZE, type SceneLayout, type SceneProps } from "./kit";
export { HgCoiScene, HgSwdScene, FarmbooksBillScene, NwksBedsScene };
