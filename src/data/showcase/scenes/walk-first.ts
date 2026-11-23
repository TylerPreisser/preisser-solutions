// Each walkthrough's first picture: the still of its first cue, warmed when its client window opens (index.ts
// warmShowcase) so the tab normally has it decoded before anyone can choose it. Derived from the films' own cues.
import { DUFFER_CC, type WalkData } from "./duffer-cc";
import { NWKS_ADMIN } from "./nwks-admin";
import { WALK_POSTERS } from "./walk-posters";

const first = (d: WalkData) => {
  const st = d.stills[d.cues[0].still];
  return { desk: st.desk.src, phone: d.phoneUsesDesk ? st.desk.src : st.phone.src, poster: WALK_POSTERS[st.desk.src] as string | undefined };
};

export const WALK_FIRST: Readonly<Record<string, { desk: string; phone: string; poster?: string }>> = {
  "duffer-cc": first(DUFFER_CC),
  "nwks-admin": first(NWKS_ADMIN),
};
