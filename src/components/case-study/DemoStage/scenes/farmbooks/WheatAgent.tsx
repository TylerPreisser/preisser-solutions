"use client";
/**
 * The wheat agent — the FarmBooks logomark brought to life. Ported near-verbatim from
 * Farm Invoice Processing System/web/components/showcase/wheat-agent.tsx @8cbbbb4 (397 ln). The
 * ONLY edit is the import line: `./tokens` -> `./fb-motion` (spec-FB §1, §4). Every path below is
 * the shipped mark's own geometry; see the source file's docblock for the full anatomy and the
 * reduced-motion contract (every state resolves to a distinct static pose).
 *
 * Keeps Framer per spec-FB §4: this is the one file in the transplant that keeps its springs and
 * variants. The whole scene wraps in <MotionConfig reducedMotion="user"> in FarmBooksStages.tsx,
 * so this component's own `useReducedMotion()` read still resolves correctly for a reduced-motion
 * visitor without a second gate.
 */
import { useId } from "react";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { AMBER_EYES, EASE_IN_OUT, EASE_OUT, GOLD_MARK, SPRING_SOFT } from "./fb-motion";

const STEM = "M24 32V9";

const AWN = {
  legL: "M24 28.5l-5-4.2",
  legR: "M24 28.5l5-4.2",
  midL: "M24 22.5l-4.6-3.9",
  midR: "M24 22.5l4.6-3.9",
  armL: "M24 16.5l-4-3.4",
  armR: "M24 16.5l4-3.4",
} as const;

const BOOK = "M7 33.5c5-2.2 12-2.2 17 1 5-3.2 12-3.2 17-1v6.8c-5-2.2-12-2.2-17 1-5-3.2-12-3.2-17-1z";
const BOOK_SPINE = "M24 34.5v6.8";

const TRANSFORM_SEED = { rotate: 0, scale: 1, scaleY: 1, x: 0, y: 0 };
const pivot = (x: number, y: number) => ({ originX: `${x}px`, originY: `${y}px`, ...TRANSFORM_SEED });

const P_BODY = pivot(24, 32);
const P_LEGS = pivot(24, 28.5);
const P_MID = pivot(24, 22.5);
const P_ARMS = pivot(24, 16.5);
const P_HEAD = pivot(24, 7.2);
const P_BOOK = pivot(24, 41.3);

const STATES = ["idle", "walk", "read", "scan", "flag", "stamp"] as const;
export type WheatAgentState = (typeof STATES)[number];

export interface WheatAgentProps {
  state: WheatAgentState;
  size?: number;
  className?: string;
  still?: boolean;
}

const MIN_LIFT = -20;
const MAX_LIFT = 38;
const clampLift = (deg: number) => Math.max(MIN_LIFT, Math.min(MAX_LIFT, deg));
const rotate = (lift: number, right: boolean) => (right ? -1 : 1) * clampLift(lift);

type Lift = number | number[];

type LimbPose = {
  lift: Lift;
  liftR?: Lift;
  scale?: Lift;
  scaleR?: Lift;
  still: number;
  stillR?: number;
  stillScale?: number;
  stillScaleR?: number;
  transition: Transition;
};

type LimbSet = Record<WheatAgentState, LimbPose>;

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_IN_OUT,
  repeat: Infinity,
  repeatType: "loop",
});

const STAMP: Transition = {
  duration: 1,
  times: [0, 0.28, 0.52, 1],
  ease: EASE_OUT,
  repeat: Infinity,
  repeatDelay: 2,
};

const LEGS: LimbSet = {
  idle: { lift: [0, 2.5, 0], still: 0, transition: loop(5.6) },
  walk: { lift: [14, -8, 14], liftR: [-8, 14, -8], still: 14, stillR: -8, transition: loop(1) },
  read: { lift: 2, liftR: -8, still: 2, stillR: -8, transition: SPRING_SOFT },
  scan: { lift: [0, 2, 0], still: 0, transition: loop(4.4) },
  flag: { lift: 6, still: 6, transition: SPRING_SOFT },
  stamp: { lift: [0, -12, 4, 0], still: -12, transition: STAMP },
};

const MID: LimbSet = {
  idle: { lift: [0, 4, 0], still: 0, transition: loop(5.6, 0.15) },
  walk: { lift: [-4, 8, -4], liftR: [8, -4, 8], still: -4, stillR: 8, transition: loop(1) },
  read: { lift: -6, liftR: 6, still: -6, stillR: 6, transition: SPRING_SOFT },
  scan: { lift: [2, 5, 2], still: 3, transition: loop(4.4, 0.2) },
  flag: { lift: 22, still: 22, transition: SPRING_SOFT },
  stamp: { lift: [0, -10, 3, 0], still: -10, transition: STAMP },
};

const ARMS: LimbSet = {
  idle: { lift: [0, 5.5, 0], still: 0, transition: loop(5.6, 0.3) },
  walk: { lift: [10, 2, 10], liftR: [2, 10, 2], still: 10, stillR: 2, transition: loop(1) },
  read: {
    lift: 14,
    liftR: -4,
    scale: 1,
    scaleR: 1.34,
    still: 14,
    stillR: -4,
    stillScale: 1,
    stillScaleR: 1.34,
    transition: SPRING_SOFT,
  },
  scan: { lift: 8, still: 8, transition: SPRING_SOFT },
  flag: { lift: 30, still: 30, transition: SPRING_SOFT },
  stamp: { lift: [16, -6, 6, 0], still: -6, transition: STAMP },
};

function limbVariants(set: LimbSet, right: boolean, reduce: boolean): Variants {
  const out: Variants = {};
  for (const key of STATES) {
    const p = set[key];
    if (reduce) {
      const lift = right ? (p.stillR ?? p.still) : p.still;
      const scale = right ? (p.stillScaleR ?? p.stillScale) : p.stillScale;
      out[key] = { rotate: rotate(lift, right), scale: scale ?? 1 };
      continue;
    }
    const lift = (right ? p.liftR : undefined) ?? p.lift;
    const scale = (right ? p.scaleR : undefined) ?? p.scale;
    out[key] = {
      rotate: Array.isArray(lift) ? lift.map((v) => rotate(v, right)) : rotate(lift, right),
      scale: scale ?? 1,
      transition: p.transition,
    };
  }
  return out;
}

type Pose = { rotate?: Lift; x?: Lift; y?: Lift; scale?: Lift; scaleY?: Lift };
type PartSet = Record<WheatAgentState, { anim: Pose; still: Pose; transition: Transition }>;

const BODY: PartSet = {
  idle: { anim: { rotate: [-2.2, 2.2, -2.2], y: 0 }, still: { rotate: 0, y: 0 }, transition: loop(5.6) },
  walk: {
    anim: { rotate: [-1.6, 1.6, -1.6], y: [0, -1.3, 0] },
    still: { rotate: -2, y: -1.2 },
    transition: { rotate: loop(2), y: loop(1) },
  },
  read: { anim: { rotate: [9.2, 10.8, 9.2], y: 0 }, still: { rotate: 10, y: 0 }, transition: loop(4.4) },
  scan: { anim: { rotate: 0, y: 0 }, still: { rotate: 0, y: 0 }, transition: SPRING_SOFT },
  flag: { anim: { rotate: [-1.4, 1.4, -1.4], y: 0 }, still: { rotate: 0, y: 0 }, transition: loop(4.6) },
  stamp: { anim: { rotate: 0, y: [0, 3.6, -0.7, 0] }, still: { rotate: 0, y: 3.4 }, transition: STAMP },
};

const HEAD: PartSet = {
  idle: { anim: { scale: [1, 1.055, 1], x: 0, y: 0 }, still: { scale: 1, x: 0, y: 0 }, transition: loop(3.4) },
  walk: { anim: { scale: 1, x: 0, y: [0, -0.4, 0] }, still: { scale: 1, x: 0, y: -0.4 }, transition: loop(1) },
  read: { anim: { scale: [1, 1.03, 1], x: 1, y: 0.8 }, still: { scale: 1, x: 1, y: 0.8 }, transition: loop(4.4) },
  scan: { anim: { scale: 1, x: [-2.6, 2.6, -2.6], y: 0 }, still: { scale: 1, x: 2.4, y: 0 }, transition: loop(2.8) },
  flag: { anim: { scale: 1, x: 1.5, y: -0.6 }, still: { scale: 1, x: 1.5, y: -0.6 }, transition: SPRING_SOFT },
  stamp: { anim: { scale: [1, 0.9, 1.04, 1], x: 0, y: 0 }, still: { scale: 0.92, x: 0, y: 0 }, transition: STAMP },
};

const BOOK_POSE: PartSet = {
  idle: { anim: { rotate: 0, scaleY: 1 }, still: { rotate: 0, scaleY: 1 }, transition: SPRING_SOFT },
  walk: { anim: { rotate: [-3, 3, -3], scaleY: 1 }, still: { rotate: 3, scaleY: 1 }, transition: loop(1) },
  read: { anim: { rotate: 0, scaleY: 1 }, still: { rotate: 0, scaleY: 1 }, transition: SPRING_SOFT },
  scan: { anim: { rotate: 0, scaleY: 1 }, still: { rotate: 0, scaleY: 1 }, transition: SPRING_SOFT },
  flag: { anim: { rotate: 0, scaleY: 1 }, still: { rotate: 0, scaleY: 1 }, transition: SPRING_SOFT },
  stamp: { anim: { rotate: 0, scaleY: [1, 0.93, 1.02, 1] }, still: { rotate: 0, scaleY: 0.93 }, transition: STAMP },
};

function partVariants(set: PartSet, reduce: boolean): Variants {
  const out: Variants = {};
  for (const key of STATES) {
    out[key] = reduce ? { ...set[key].still } : { ...set[key].anim, transition: set[key].transition };
  }
  return out;
}

export function WheatAgent({ state, size = 96, className, still = false }: WheatAgentProps) {
  const reduce = useReducedMotion() === true || still;
  const sweepId = `wheat-sweep-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const legL = limbVariants(LEGS, false, reduce);
  const legR = limbVariants(LEGS, true, reduce);
  const midL = limbVariants(MID, false, reduce);
  const midR = limbVariants(MID, true, reduce);
  const armL = limbVariants(ARMS, false, reduce);
  const armR = limbVariants(ARMS, true, reduce);
  const bodyV = partVariants(BODY, reduce);
  const headV = partVariants(HEAD, reduce);
  const bookV = partVariants(BOOK_POSE, reduce);

  const stalk = state === "flag" ? AMBER_EYES : GOLD_MARK;

  return (
    <motion.svg
      data-agent-state={state}
      data-agent-motion={reduce ? "still" : "animated"}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
      animate={state}
    >
      <defs>
        <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GOLD_MARK} stopOpacity="0" />
          <stop offset="50%" stopColor={GOLD_MARK} stopOpacity="0.55" />
          <stop offset="100%" stopColor={GOLD_MARK} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.rect
        x={19.5}
        y={3}
        width={9}
        height={32}
        rx={4.5}
        fill={`url(#${sweepId})`}
        style={{ x: 0 }}
        animate={
          state !== "scan"
            ? { opacity: 0 }
            : reduce
              ? { x: 9, opacity: 0.5 }
              : { x: [-16, 16], opacity: [0, 0.8, 0] }
        }
        transition={
          state !== "scan"
            ? { duration: 0.3, ease: EASE_OUT }
            : reduce
              ? { duration: 0 }
              : { duration: 2.8, ease: EASE_IN_OUT, repeat: Infinity }
        }
      />

      <motion.g variants={bookV} style={P_BOOK} stroke={GOLD_MARK}>
        <path d={BOOK} strokeWidth="2.2" />
        <path d={BOOK_SPINE} strokeWidth="2.2" />
      </motion.g>

      <motion.g variants={bodyV} style={P_BODY} stroke={stalk} className="transition-[stroke] duration-500">
        <path d={STEM} strokeWidth="2.4" />

        <motion.path d={AWN.legL} strokeWidth="2.2" variants={legL} style={P_LEGS} />
        <motion.path d={AWN.legR} strokeWidth="2.2" variants={legR} style={P_LEGS} />
        <motion.path d={AWN.midL} strokeWidth="2.2" variants={midL} style={P_MID} />
        <motion.path d={AWN.midR} strokeWidth="2.2" variants={midR} style={P_MID} />
        <motion.path d={AWN.armL} strokeWidth="2.2" variants={armL} style={P_ARMS} />
        <motion.path d={AWN.armR} strokeWidth="2.2" variants={armR} style={P_ARMS} />

        <motion.circle
          cx={24}
          cy={7.2}
          r={2.1}
          fill={stalk}
          stroke="none"
          variants={headV}
          style={P_HEAD}
          className="transition-[fill] duration-500"
        />
      </motion.g>
    </motion.svg>
  );
}
