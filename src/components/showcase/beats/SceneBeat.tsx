"use client";

import type { SceneBeat as SceneBeatData } from "@/data/showcase/types";
import { NATIVE_SIZE, SCENES } from "@/components/showcase/scenes";
import { Chrome, Fit, type BeatProps } from "./shared";

/**
 * A product picture drawn by a scene (src/components/showcase/scenes): HG Oil's
 * vendor insurance and saltwater close, FarmBooks reading a bill, NWKS's bed
 * board. Not the MarCommand portal, so the chrome names the client, never
 * "MarCommand". The scene plays once while active and holds its final frame;
 * reduced motion shows the final frame with its caption.
 */
export function SceneBeat({ client, beat, variant, active, fill, reduced, quiet }: BeatProps<SceneBeatData>) {
  const Scene = SCENES[beat.scene];
  const n = NATIVE_SIZE[variant];
  return (
    <figure
      className={`sc-frame sc-frame--portal sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}
      data-demo-stage={`${client.slug}-scene`}
      aria-hidden={quiet || undefined}
    >
      <Chrome label={variant === "desk" ? client.short : undefined} badge />
      <p className="ps-visually-hidden" data-demo-narration>
        {beat.narration}
      </p>
      <div className="sc-frame__portal" style={fill ? undefined : { aspectRatio: `${n.w} / ${n.h}` }}>
        <Fit w={n.w} h={n.h}>
          <Scene layout={variant} playing={active && !reduced} loop={false} label={false} />
        </Fit>
      </div>
    </figure>
  );
}
