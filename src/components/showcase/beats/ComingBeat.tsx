"use client";

import type { EngineBeat } from "@/data/showcase/types";
import { Chrome, themeStyle, type BeatProps } from "./shared";

/**
 * Round 2 stand-in for a beat its builder has not landed (ADR-0025): a neutral
 * box that keeps the tab and the build alive. beats/index.tsx imports this for
 * "engine" (B4: EngineBeat.tsx); the
 * builder replaces that one import and deletes nothing else.
 */
export function ComingBeat({ client, beat, variant, fill, quiet }: BeatProps<EngineBeat>) {
  return (
    <figure
      className={`sc-frame sc-frame--portal sc-frame--${variant}${fill ? " sc-frame--fill" : ""}`}
      data-demo-stage={`${client.slug}-scene`}
      aria-hidden={quiet || undefined}
    >
      <Chrome label={variant === "desk" && beat.kind === "engine" ? "MarCommand" : undefined} badge />
      <p className="ps-visually-hidden" data-demo-narration>
        {beat.narration}
      </p>
      <div
        className="sc-frame__portal"
        style={{ ...themeStyle(client.theme), ...(fill ? null : { aspectRatio: "1.6 / 1" }), display: "grid", placeItems: "center", color: "var(--pt-ink-soft)" }}
      >
        <div aria-hidden="true" style={{ border: "1px dashed currentColor", borderRadius: 14, width: "60%", height: "50%", opacity: 0.5 }} />
      </div>
    </figure>
  );
}

/** How long the stand-in holds before the window moves on. */
export const comingMs = 6000;
