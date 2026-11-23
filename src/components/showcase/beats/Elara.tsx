import { forwardRef, type CSSProperties } from "react";
import "./elara.css";

/** Sheet cells: 0 idle, 1-3 reach (arm out, then back), 4-7 walk. */
export type ElaraFrame = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const ELARA_IDLE: ElaraFrame = 0;
export const ELARA_REACH: readonly ElaraFrame[] = [1, 2, 3];
export const ELARA_WALK: readonly ElaraFrame[] = [4, 5, 6, 7];

/**
 * The sheet is 8 cells of 192 x 232. The widths that land on whole source
 * pixels under `image-rendering: pixelated` are 96 (half), 48 (quarter) and,
 * for the showcase's own bands, 72 (3/8). Height follows: 116, 58, 87.
 */
export type ElaraWidth = 96 | 72 | 48;
export const elaraHeight = (w: ElaraWidth) => Math.round((w * 232) / 192);

export interface ElaraProps {
  /** Rendered cell width in css px. */
  width?: ElaraWidth;
  /** Which cell shows. Set it per tick from the beat's timeline. */
  frame?: ElaraFrame;
  /** 1 faces right (as drawn), -1 faces left. */
  flip?: 1 | -1;
  /** The card colour behind him, for the knockout halo. Default: the beat's --card. */
  halo?: string;
  /** Position him with `transform` on a PARENT, or with left/top here; the point you give is where his feet stand. */
  style?: CSSProperties;
  className?: string;
}

/**
 * The home MarCommand section's robot, as a component (the home keeps its own
 * copy driven by GSAP; this one is driven by the showcase beats). Decorative:
 * aria-hidden. Absolutely positioned inside the nearest positioned ancestor;
 * the box's origin is his FEET centre.
 */
export const Elara = forwardRef<HTMLDivElement, ElaraProps>(function Elara(
  { width = 96, frame = 0, flip = 1, halo, style, className },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className ? `sc-elara ${className}` : "sc-elara"}
      style={
        {
          "--el-w": `${width}px`,
          "--el-frame": frame,
          "--el-flip": flip,
          ...(halo ? { "--el-halo": halo } : { "--el-halo": "var(--card, #fff)" }),
          ...style,
        } as CSSProperties
      }
    />
  );
});
