// The showcase scenes: one picture per client story, played as beats.
// Each takes SceneProps (layout "desk" 1280 x 800 or "phone") and
// renders its final frame first (no JS, reduced motion, the privacy probe).
// Layout "phone" is 300 x 460 since round 7 (see NATIVE_SIZE in ./kit).
import type { ComponentType } from "react";
import type { SceneProps } from "./kit";
import { HgCoiScene } from "./HgCoiScene";
import { HgSwdScene } from "./HgSwdScene";
import { FarmbooksBillScene } from "./FarmbooksBillScene";
import { NwksBedsScene } from "./NwksBedsScene";
import { coiCam, coiCues, swdCam, swdCues, swdDeskCam } from "@/data/demos/scenes/hg-oil";
import { fbCam, fbCues, fbHoldMs } from "@/data/demos/scenes/farmbooks";
import { bedsCam, bedsCues } from "@/data/demos/scenes/nwks-encounter";

export type SceneId = "hg-coi" | "hg-swd" | "farmbooks-bill" | "nwks-beds";

export const SCENES: Record<SceneId, ComponentType<SceneProps>> = {
  "hg-coi": HgCoiScene,
  "hg-swd": HgSwdScene,
  "farmbooks-bill": FarmbooksBillScene,
  "nwks-beds": NwksBedsScene,
};

/** How long each scene plays once: its last beat plus the hold on the final frame. */
export const SCENE_MS: Record<SceneId, number> = {
  "hg-coi": coiCues[coiCues.length - 1] + 4400,
  "hg-swd": swdCues[swdCues.length - 1] + 3400,
  // The catch is the last beat: its rows land over ~2.9 s, then the held bill holds 4.5 s.
  "farmbooks-bill": fbCues[fbCues.length - 1] + fbHoldMs,
  "nwks-beds": bedsCues[bedsCues.length - 1] + 4200,
};

/** The phone picture is 300 wide; its height is per scene (the COI cards need more room). */
export const PHONE_H: Record<SceneId, number> = {
  "hg-coi": 520,
  "hg-swd": 494,
  "farmbooks-bill": 460,
  "nwks-beds": 460,
};

/**
 * One camera shot: from `at` ms after the scene starts, frame the native rect
 * (x, y, w, h; x and w default to the full width). `ms` is the move's length.
 */
export interface Shot {
  at: number;
  y: number;
  h: number;
  x?: number;
  w?: number;
  ms?: number;
}

/**
 * Where the camera looks, per scene and layout. Phone: the picture fills the
 * sheet's width and the camera moves down to the part each step is about (a
 * short phone shows about 280 of the 460 native px). The LAST shot is also the
 * reduced-motion frame. Desk: only the HG close pushes in, so the held row of
 * the tie-out reads at 14 css px or more (critique r6 C2).
 */
export const SCENE_CAM: Record<SceneId, { desk?: readonly Shot[]; phone?: readonly Shot[] }> = {
  "hg-coi": { phone: coiCam },
  "hg-swd": { desk: swdDeskCam, phone: swdCam },
  "farmbooks-bill": { phone: fbCam },
  "nwks-beds": { phone: bedsCam },
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
