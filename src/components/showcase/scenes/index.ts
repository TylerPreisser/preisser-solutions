// The showcase scenes: one picture per client story, played as beats.
// Each takes SceneProps (layout "desk" 1280 x 800 or "phone" 390 x 600) and
// renders its final frame first (no JS, reduced motion, the privacy probe).
import type { ComponentType } from "react";
import type { SceneProps } from "./kit";
import { HgCoiScene } from "./HgCoiScene";
import { HgSwdScene } from "./HgSwdScene";
import { FarmbooksBillScene } from "./FarmbooksBillScene";
import { NwksBedsScene } from "./NwksBedsScene";
import { coiCues, swdCues } from "@/data/demos/scenes/hg-oil";
import { fbCues } from "@/data/demos/scenes/farmbooks";
import { bedsCues } from "@/data/demos/scenes/nwks-encounter";

export type SceneId = "hg-coi" | "hg-swd" | "farmbooks-bill" | "nwks-beds";

export const SCENES: Record<SceneId, ComponentType<SceneProps>> = {
  "hg-coi": HgCoiScene,
  "hg-swd": HgSwdScene,
  "farmbooks-bill": FarmbooksBillScene,
  "nwks-beds": NwksBedsScene,
};

/** How long each scene plays once: its last beat plus the hold on the final frame. */
export const SCENE_MS: Record<SceneId, number> = {
  "hg-coi": coiCues[coiCues.length - 1] + 3200,
  "hg-swd": swdCues[swdCues.length - 1] + 3200,
  "farmbooks-bill": fbCues[fbCues.length - 1] + 3200,
  "nwks-beds": bedsCues[bedsCues.length - 1] + 3400,
};

export { NATIVE_SIZE, type SceneLayout, type SceneProps } from "./kit";

/**
 * A product beat drawn by one of these scenes. The showcase schema
 * (src/data/showcase/types.ts) has no kind for it yet: this is the shape a
 * `kind: "scene"` beat would carry, kept beside each client's data until the
 * framework takes it (see ~/.claude/agent-reports/showcase-scenes-changelog.md).
 */
export interface SceneBeatData {
  kind: "scene";
  tab: string;
  caption: string;
  scene: SceneId;
  /** Screen-reader narration for the stage (80+ characters). */
  narration: string;
}
export { HgCoiScene, HgSwdScene, FarmbooksBillScene, NwksBedsScene };
