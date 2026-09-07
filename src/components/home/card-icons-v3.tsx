/* ─────────────────────────────────────────────────────────────
   CARD ICONS V3 — eleven tile icons + one feature graphic

   These are SIBLINGS of the 36 tile icons in service-pillars.tsx
   and obey that file's FAMILY CONTRACT verbatim (see the comment
   block above IconSpreadsheetToSystem, service-pillars.tsx:735):

     - viewBox "0 0 48 48", fill="none" at root, currentColor only.
     - strokeWidth 1.5 on EVERY stroked element. No 1.25, no 1.75.
     - strokeLinecap / strokeLinejoin "round" on every stroked element.
     - Secondary detail uses strokeOpacity 0.55. Nothing below 0.5:
       the wrapper paints these at rgba(255,255,255,.6) over a
       gradient (globals.css:3039), so 0.25 here lands at 15% white.
     - Exactly ONE accent per icon — the thing the card is about —
       carried by fill="currentColor" fillOpacity 0.85-0.9, never by
       a heavier stroke.
     - Corner radius: rx 2.5-3 on full panels, 2 on sub-panels,
       1-1.75 on chips. Shared optical box: content inside x 3-44.
     - NO aria-hidden and NO width/height on the <svg> root. The
       render site owns both: the wrapper div carries
       aria-hidden="true" (service-pillars.tsx:1735) and
       `.ps-carousel-card-graphic svg { width:100%; height:100% }`
       sizes it (globals.css:3064). Matching the existing 36 exactly.

   NO <defs>, NO gradients, NO ids anywhere in this file — several
   of these can render on the same page as each other and as the
   card visuals, and bare defs ids (#grad1, #clip0) silently steal
   each other's fills. Nothing here has an id to collide.

   Written 2026-09-07 as a set, judged from screenshots at the 80px
   the tiles actually render, on both #F6F9FC and #0A1628 grounds
   and over the live card gradient, beside the existing icons.
   ───────────────────────────────────────────────────────────── */

/* "Know Exactly What's Going On in 3 Seconds": the wall of detail you
   would otherwise have to read, funnelled down to three lines, the top
   one lit. No stopwatch and no device frame — the speed is carried by
   how little survives on the right.

   REDRAWN after the first screenshot pass: v1 put three descending
   blocks on a baseline under an arc, and at 80px over the card
   gradient it read as a small bar chart with a swoosh. The wall of
   quiet lines is what makes the compression legible. */
export function IconThreeSecondRead() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Everything there is to know, all of it, unread */}
      <line x1="3" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="12.5" x2="14" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="21.5" x2="11" y2="21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="26" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="30.5" x2="14" y2="30.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="35" x2="18" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="3" y1="39.5" x2="12" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Down to what you actually look at. This was a pair of
          converging diagonals in round two and at 200px they read as
          two stray slashes cutting across the accent, so it is now the
          family's plain connector arrow. */}
      <line x1="22" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 15.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the one that tells you whether the week is fine.
          0.9 rather than 0.88 because this icon carries the least
          full-weight stroke in the set (2.3% near-white on #0A1628 vs
          4.3-10.6% across the existing 12 measured) and needed the top
          of its range to hold up beside them on the card gradient. */}
      <rect x="29" y="14" width="15" height="8" rx="2.5" fill="currentColor" fillOpacity="0.9" />
      {/* And the two you glance at after it */}
      <rect x="29" y="25" width="15" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="29" y="34.5" width="10" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Quit Repeating Yourself": the call you make out loud once gets
   written down as a rule, and from then on the same rule is on
   everything that comes after without you being asked again. */
export function IconDecisionsEncoded() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Said once */}
      <rect x="3" y="5" width="24" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 19v4.5l5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the decision itself */}
      <rect x="7" y="10.2" width="12" height="3.6" rx="1.75" fill="currentColor" fillOpacity="0.88" />
      {/* Written down where the system can read it */}
      <line x1="28.5" y1="12" x2="31.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 10l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="5" width="12" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="35" y1="10" x2="41" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="35" y1="14" x2="39" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* And applied from then on, without asking you again */}
      <line x1="38" y1="19.5" x2="38" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M36 21.2l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="4" y="26" width="8" height="4" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="15" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="4" y="33" width="8" height="4" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="15" y1="35" x2="44" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="4" y="40" width="8" height="4" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="15" y1="42" x2="38" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Get Out of Spreadsheet Chaos": the sheets everybody keeps their
   own copy of, moved across as one clean set of aligned records with
   the move signed off as complete. The tilt is the only tilt in the
   family — it is what stops this reading as IconSpreadsheetToSystem,
   which is a single grid becoming a database. */
export function IconSpreadsheetMigration() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Everybody's own copy */}
      <g transform="rotate(-19 12 26)">
        <rect x="3.5" y="18" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      </g>
      <g transform="rotate(-8 12 22)">
        <rect x="5" y="13.5" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      </g>
      <g transform="rotate(5 12 18)">
        <rect x="4" y="9" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="14.5" x2="19" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
        <line x1="11.5" y1="14.5" x2="11.5" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      </g>
      {/* Moved across */}
      <line x1="22" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24.5 21.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* One structure, everything aligned in it */}
      <rect x="29" y="9" width="15" height="26" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="29" y1="15" x2="44" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the row that came across whole */}
      <rect x="32" y="18.5" width="9" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.88" />
      <line x1="32" y1="25.5" x2="41" y2="25.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="30" x2="41" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Nothing left behind */}
      <path d="M31 40.5l2.5 2.5 5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* "Free Up Your People for Work That Actually Matters": the identical
   jobs they were doing all day lift off and go, and what is left in
   their hands is the one piece of work worth a person. */
export function IconFreedCapacity() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gone, and going */}
      <path d="M35.5 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="34" y="6" width="9" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="26" y="13" width="9" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* The same job, over and over, that used to be theirs. Kept well
          clear of the head: at 200px a 9x6 tile beside a head read as a
          second speech bubble. */}
      <rect x="18" y="20" width="9" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20.5" y1="23" x2="24.5" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Your person */}
      <circle cx="10" cy="32.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 44.5c0-4 3.1-6.4 7-6.4s7 2.4 7 6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: put in their hands instead. Kept low and to the side of
          the torso, NOT beside the head -- at 80px a pill next to a head
          read as a speech bubble in the first screenshot pass. */}
      <line x1="17.5" y1="38.5" x2="21" y2="38.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="21" y="34.5" width="15" height="8" rx="3" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* "Get All Your Systems Talking to One Another": four tools that were
   never meant to meet, wired into one closed round trip after somebody
   audited what was actually there. Deliberately NOT IconEnteredOnce:
   that one is three identical boxes fed from one keystroke; these are
   four different-shaped systems joined edge to edge with no typist. */
export function IconSystemsConnected() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The round trip, closed */}
      <line x1="17" y1="11.5" x2="20" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="11.5" x2="31" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="37" y1="21" x2="37" y2="27.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="34.5" x2="18" y2="34.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 32.6l-2.6 1.9 2.6 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="10.5" y1="27.5" x2="10.5" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: the join that was missing */}
      <rect x="20.5" y="9.7" width="7" height="3.6" rx="1.75" fill="currentColor" fillOpacity="0.88" />
      {/* Four systems, none of them the same shape */}
      <rect x="4" y="6" width="13" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <ellipse cx="37" cy="9" rx="6" ry="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M31 9v9.6c0 1.33 2.69 2.4 6 2.4s6-1.07 6-2.4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="28" width="14" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="33" y1="33" x2="41" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="37" x2="38" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="10.5" cy="34.5" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.6 34.5l2.1 2.1 3.8-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "We Know How to Make AI Safe": a machined channel with rails on both
   sides, work travelling down it, and one station in the middle where a
   named person signs before it carries on. Guardrails as engineering,
   not as a fence — nothing here is a warning sign or a stop. */
export function IconAiSafetyEngineering() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The rails, run off both edges. Nothing is drawn below them:
          the first screenshot pass had two quiet lines down there and
          at 80px they read as a third and fourth rail. */}
      <line x1="3" y1="21" x2="45" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="35" x2="45" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: the work moving down it */}
      <rect x="4" y="25" width="11" height="6" rx="2.5" fill="currentColor" fillOpacity="0.88" />
      <path d="M17.5 25l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The person who is wired into the middle of it */}
      <circle cx="30" cy="8.5" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24.5 16.1c0-3 2.5-4.7 5.5-4.7s5.5 1.7 5.5 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="30" y1="16.5" x2="30" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Their station, on the line itself */}
      <rect x="24" y="23" width="12" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 27.9l2 2 4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* And on it goes */}
      <rect x="38" y="25" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Secure AI for Your Business": the whole frame IS the boundary. A
   double wall, the instance sitting at the centre of it, your records
   in the corners, and the only movement is a closed circulation
   between them. Nothing crosses out, because there is no out. */
export function IconPrivateAiInstance() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The boundary, and the second wall inside it */}
      <rect x="3" y="5" width="42" height="38" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6.5" y="8.5" width="35" height="31" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Your records, all of them on this side of it */}
      <rect x="9.5" y="12" width="8" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="30.5" y="12" width="8" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="9.5" y="32.5" width="8" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="30.5" y="32.5" width="8" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* It circulates in here and nowhere else */}
      <path d="M13.5 18.5c-2.2 3.6-2.2 7.4 0 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M34.5 18.5c2.2 3.6 2.2 7.4 0 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: your own instance, at the centre of it */}
      <rect x="17.5" y="17.5" width="13" height="13" rx="3.5" transform="rotate(45 24 24)" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* "An After-Hours AI Agent That Books the Next Day": the enquiry that
   arrives at eleven at night comes out the other side as a slot filled
   in on tomorrow. Reuses the family's crescent as its shorthand for
   after-hours (IconAfterHoursTriage established it) but everything
   else differs: that one splits and queues, this one books. */
export function IconAfterHoursAiAgent() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Eleven at night */}
      <path d="M8.4 4.4a5.3 5.3 0 100 10.2 5.9 5.9 0 010-10.2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Somebody asks anyway */}
      <rect x="3" y="18" width="19" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 31v4.5l5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6.5" y1="23" x2="18.5" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="27" x2="14" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Answered, and turned into something */}
      <line x1="23" y1="28" x2="26.5" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 25.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tomorrow */}
      <rect x="29" y="12" width="15" height="30" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="29" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="32" y="21" width="9" height="5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the appointment it booked */}
      <rect x="32" y="29" width="9" height="5" rx="1.75" fill="currentColor" fillOpacity="0.9" />
      <rect x="32" y="36.5" width="9" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Quote Faster Using What Your Past Jobs Already Know": three jobs you
   already finished, and what each of them turned out to cost, feeding
   the one line on the new quote that everybody argues about. */
export function IconQuoteFromHistory() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Jobs you already did */}
      <rect x="3" y="7" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6" y="10.5" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="19" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="22.5" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="31" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6" y="34.5" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* What they know, arriving at one place */}
      <path d="M18 12c6 .6 7.5 5.4 10.5 10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="18" y1="24" x2="28.5" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M18 36c6-.6 7.5-5.4 10.5-10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The new quote */}
      <rect x="30" y="5" width="14" height="38" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="33" y1="10" x2="41" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="14.5" x2="41" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the price, and you did not guess it */}
      <rect x="33" y="21.5" width="9" height="5" rx="2" fill="currentColor" fillOpacity="0.88" />
      <line x1="33" y1="33" x2="41" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="37.5" x2="38" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Nothing Gets Missed in the Inbox": everything that came in is read
   and filed against the job it belongs to, and the one thing that does
   not fit anywhere is lifted up in front of you instead of buried. */
export function IconInboxRouted() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* What came in overnight */}
      <rect x="3" y="6" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M4.2 7.4l5.3 4 5.3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="19" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.2 20.4l5.3 4 5.3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="32" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M4.2 33.4l5.3 4 5.3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Read, and sent where it belongs */}
      <path d="M17 10c5-.6 8-2 12-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26.5 5.6l2.9 1.5-2.2 2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="23.5" x2="26" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23.8 22.2l2.9 2.4-3.3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="36.5" x2="26" y2="37.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Against the actual job */}
      <path d="M28 22.5v-2.5h6l1.6 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="22.5" width="16" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 35.5v-2h5.5l1.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="28" y="35.5" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the one that fits nowhere and gets lifted out in front
          of you instead of buried. Raised clear of the two folders and
          reached by a full-weight arrow -- in the first screenshot pass
          it sat level with the flow on a 0.55 curve and read as a
          floating pill. */}
      <rect x="30" y="3" width="13" height="5.5" rx="2" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* "Eliminate Entering Data Off Documents": the fields come off the page
   and land in a record as key and value. Sibling to
   IconNumberVerification, and deliberately the OTHER half of it: that
   icon has the magnifier and the column of ticks and no destination,
   because it is about proving a figure is really on the page. This one
   has no magnifier and no ticks, and its whole right half is the
   structured record the page turned into. */
export function IconDocExtraction() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The paperwork somebody used to retype */}
      <rect x="3" y="5" width="21" height="38" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6.5" y1="10.5" x2="20.5" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="14.5" x2="17" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="35" x2="20.5" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="39" x2="15" y2="39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The three fields that actually matter on it */}
      <rect x="6.5" y="18.5" width="11" height="3.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6.5" y="24" width="11" height="3.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6.5" y="29.5" width="11" height="3.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Straight off the page */}
      <path d="M18.5 19.5L29 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="18.5" y1="25.2" x2="29" y2="24.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26.4 22.8l2.8 1.7-2.6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 30.8L29 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* And into the record, as a field with a name on it */}
      <rect x="30.5" y="12.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="38" y1="15" x2="45" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="30.5" y="22" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: the value, in the system, typed by nobody */}
      <rect x="38" y="22" width="7" height="5" rx="2" fill="currentColor" fillOpacity="0.88" />
      <rect x="30.5" y="31.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="38" y1="34" x2="43.5" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURE GRAPHIC — "Get Answers About Your Business in Seconds"

   The one place in this file where an interface IS the correct
   image: the owner asked for a custom chat, and the deliverable
   on that card literally is a conversation. It is drawn as the
   conversation and nothing else — no browser chrome, no URL bar,
   no traffic lights, no sidebar, no window title. The bubbles run
   off both edges so it reads as a crop of a longer thread.

   THE NUMBERS ARE NOT A CLIENT RESULT AND MUST NOT BECOME ONE.
   They are deliberately neutral operational COUNTS with no
   currency, no percentage, no growth arrow, no company name and
   no date range that implies a case study. Nothing on this
   graphic can be read as "this is what we got somebody". If you
   ever want to change them, change them here — and keep them
   counts, or take the graphic off the page.
   ───────────────────────────────────────────────────────────── */
const CHAT_ROWS: ReadonlyArray<readonly [string, string]> = [
  ["Jobs completed", "41"],
  ["Invoices sent", "38"],
  ["Still unpaid", "3"],
];

/* Landscape 320x240 (4:3). Legible from about 150px wide up — below
   that the row labels close up and it should be swapped for a tile
   icon instead. currentColor throughout, so it inherits whatever the
   surface sets and works on #F6F9FC and #0A1628 alike. */
export function CardVisualBusinessChat() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* You, asking it the way you would ask a person */}
      <rect x="118" y="4" width="200" height="38" rx="15" fill="currentColor" fillOpacity="0.14" />
      <rect x="118" y="4" width="200" height="38" rx="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <text
        x="303"
        y="28"
        textAnchor="end"
        fontFamily="inherit"
        fontSize="15"
        fontWeight="500"
        fill="currentColor"
        fillOpacity="0.92"
      >
        How did last month go?
      </text>

      {/* What comes back, off your own records */}
      <rect x="2" y="50" width="256" height="146" rx="15" fill="currentColor" fillOpacity="0.06" />
      <rect x="2" y="50" width="256" height="146" rx="15" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="22"
        y="74"
        fontFamily="inherit"
        fontSize="13"
        fontWeight="500"
        fill="currentColor"
        fillOpacity="0.72"
      >
        Last month, across every job:
      </text>

      {CHAT_ROWS.map(([label, value], i) => {
        const y = 100 + i * 26;
        return (
          <g key={label}>
            <text
              x="22"
              y={y}
              fontFamily="inherit"
              fontSize="13"
              fontWeight="500"
              fill="currentColor"
              fillOpacity="0.62"
            >
              {label}
            </text>
            <text
              x="238"
              y={y + 2}
              textAnchor="end"
              fontFamily="inherit"
              fontSize="21"
              fontWeight="600"
              fill="currentColor"
              fillOpacity="0.95"
            >
              {value}
            </text>
          </g>
        );
      })}
      {/* Where it got them */}
      <text
        x="22"
        y="180"
        fontFamily="inherit"
        fontSize="14"
        fontWeight="500"
        fill="currentColor"
        fillOpacity="0.55"
      >
        From your own records.
      </text>

      {/* Ask it the next thing */}
      <rect x="2" y="206" width="252" height="32" rx="16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="24" y1="214" x2="24" y2="230" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="222" x2="104" y2="222" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="288" cy="222" r="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M281 222h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M289 217l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═════════════════════════════════════════════════════════════
   BATCH TWO — PILLARS 4 (WEBSITES) AND 5 (SEARCH / AI / ADS)

   Same FAMILY CONTRACT as batch one above; see the header of this
   file. Reusable from the existing 36 and deliberately NOT
   rebuilt here: IconFormToRecord, IconAssistantAnswers,
   IconBookedWorkReport.
   ═════════════════════════════════════════════════════════════ */

/* ── PILLAR 4: WEBSITES ── */

/* W1 "Quality You'd Expect From a Firm Ten Times Our Size": a try
   square laid into the corner of the work, graduated, and the corner
   it proves is the lit one. Quality as tolerance -- the thing is
   actually square where nobody would have checked. No trophy, no
   medal, no star, no badge.

   REBUILT after round one. The first attempt was a facade over a
   ground line with an oversized footing under it, and at 80px AND
   200px it read unmistakably as a table lamp on a plinth. */
export function IconAgencyGradeBuild() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The work */}
      <rect x="17" y="9" width="24" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="15" x2="37" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="21" y1="20" x2="33" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The square, put on it because somebody bothered */}
      <path d="M6 5h6.5v27H43v6.5H6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Graduated, because the tolerance is the point */}
      <line x1="19" y1="32" x2="19" y2="35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="26" y1="32" x2="26" y2="35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="33" y1="32" x2="33" y2="35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="12.5" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="12.5" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: and it is actually square */}
      <rect x="17" y="22.5" width="10" height="6.5" rx="2" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* W2 "Every Page Engineered to Produce the Call": the page is composed
   so every line is shorter than the one above it and the whole thing
   narrows onto one lit action, and the action rings. NOT
   IconFunnelDropOff: that is a funnel with a leak in it and is about
   where people go, this is about where the page sends them. */
export function IconConversionPath() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The page */}
      <rect x="5" y="4" width="24" height="40" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Composed to narrow, line by line */}
      <rect x="9" y="8.5" width="16" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="9" y1="18" x2="25" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="9" y1="26" x2="19" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the one thing the whole page is for */}
      <rect x="9" y="31" width="16" height="7" rx="3.5" fill="currentColor" fillOpacity="0.88" />
      {/* And it rings */}
      <path d="M32 28.5a10 10 0 010 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M38 24.5a16 16 0 010 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* W3 "Built to Be Found Inside AI Conversations": the same page twice
   — what a person reads on the left, and the structure a machine can
   walk on the right, with the fact it can lift out lit. NOT
   IconAssistantAnswers (which asks assistants what they say) and NOT
   IconCitedVsAnswer (which is about your words landing in an answer):
   this one never leaves the page. */
export function IconAiReadablePage() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* What a person reads */}
      <rect x="3" y="6" width="17" height="36" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="10" width="11" height="3.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="6" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6" y1="22" x2="14.5" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6" y1="29" x2="17" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6" y1="33" x2="13" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* The same thing, read the other way */}
      <line x1="21.5" y1="24" x2="25" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 21.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The structure underneath it */}
      <line x1="28" y1="11" x2="28" y2="38.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the answer it can find and take whole */}
      <rect x="33" y="11.5" width="11" height="5" rx="2" fill="currentColor" fillOpacity="0.88" />
      <line x1="28" y1="23" x2="32" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="33" y="20.5" width="11" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="33" y="29.5" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M36 36.5v2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="40" y="36" width="4" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* W4 "We Know Which Page Lost Them, and Why": four pages, a move
   recorded under every one of them, the trail stopping dead at the
   third, and the reason hanging off the stop rather than floating
   somewhere else in the frame. NOT IconFunnelDropOff, which is a
   funnel and a leak with no pages in it.

   Round one had the three "why" lines along the bottom-left, where
   they read as unrelated body copy. They now hang off the stop. */
export function IconGranularTracking() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The pages they moved through */}
      <rect x="3" y="5" width="9" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="14" y="5" width="9" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="25" y="5" width="9" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="36" y="5" width="8" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the page it ended on */}
      <rect x="27" y="8" width="5" height="7" rx="1.75" fill="currentColor" fillOpacity="0.9" />
      {/* Every move recorded, right up to the last one */}
      <line x1="3" y1="24" x2="29.5" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.5" cy="24" r="1.6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="18.5" cy="24" r="1.6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="25.5" cy="24" r="1.6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* Where it stops */}
      <line x1="29.5" y1="19.5" x2="29.5" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* And why, written against that page and no other */}
      <line x1="26" y1="35" x2="44" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="26" y1="39.5" x2="40" y2="39.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="26" y1="44" x2="36" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* W5 "Fast Because It's Built, Not Assembled": four mismatched slabs
   bolted on top of each other on one side, one milled piece on the
   other. No speedometer and no lightning bolt — the speed is the
   difference between the two masses. */
export function IconBuiltNotAssembled() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bolted together out of whatever was to hand */}
      <rect x="3" y="9" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="5" y="16.5" width="13" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3.5" y="24" width="15" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="6" y="31.5" width="11" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <circle cx="11" cy="15.75" r="1.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="11" cy="30.75" r="1.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* The line between the two ways of doing it */}
      <line x1="23.5" y1="6" x2="23.5" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: made in one piece */}
      <rect x="29" y="9" width="15" height="28.5" rx="3" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* W6 "Move Platforms Without Losing Your Rankings": the same ranked
   list on both sides, the same rung lit on both sides, and the only
   thing that changed is the box it lives in.

   REBUILT after round one. The first attempt drew the position as a
   horizontal line with a marker at each end, and at 80px and 200px it
   read as a slider with a handle on it -- the "same height" idea was
   completely invisible. A ranked list makes position unambiguous. */
export function IconPlatformMigration() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Where you are now */}
      <rect x="3" y="7" width="16" height="34" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="6" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <rect x="6" y="17" width="10" height="4.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="27" x2="16" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6" y1="32" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="6" y1="37" x2="12" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Across */}
      <line x1="21" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23.5 21.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Where you are after. Same list, same rung. */}
      <rect x="29" y="7" width="16" height="34" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="12" x2="42" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the position you kept */}
      <rect x="32" y="17" width="10" height="4.5" rx="1.75" fill="currentColor" fillOpacity="0.88" />
      <line x1="32" y1="27" x2="42" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="32" y1="37" x2="38" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ── PILLAR 5: SEARCH / AI VISIBILITY / ADS ── */

/* S7 "MarCommand: Your Whole Marketing Operation as One Engine": the
   channels on the left, ribbons converging on one disc, and a spine
   carrying what comes out of it. Consonant with the MarCommand
   vocabulary already on this site -- marcommand-funnel.tsx:196 draws
   six channel dots, quadratic ribbons and a client disc on a spine,
   and marcommand-live.css:838-860 sets the ribbon/dot weights. This
   is that read at 48 units, not a reproduction of the funnel. Five
   channels, not the product's six: at 80px a sixth ribbon closed the
   fan into a solid wedge. */
export function IconMarCommandEngine() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Every channel you are paying for */}
      <circle cx="5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="5" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="5" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="32.5" r="2.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="5" cy="41" r="2.2" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* Ribbons, one control point each, the way the product draws them */}
      <path d="M7.5 7Q16 7 19.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M7.5 15.5Q16 15.5 19.5 22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M7.5 24h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M7.5 32.5Q16 32.5 19.5 25.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M7.5 41Q16 41 19.5 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: one engine, and it is the only lit thing here */}
      <circle cx="26" cy="24" r="6.5" fill="currentColor" fillOpacity="0.88" />
      {/* What comes out of it, on the spine */}
      <line x1="32.5" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="35" y="13.5" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="35" y="27.5" width="9" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* S8 "See What a Customer Actually Costs You": everything you spent,
   ruled off, and what is left is one figure against one customer. No
   currency mark and no digits anywhere -- the figure is a lit block,
   because a made-up number on this card would read as a claim. */
export function IconTrueAcquisitionCost() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Everything that went out, channel by channel */}
      <rect x="5" y="6" width="24" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="5" y="13.5" width="16" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="5" y="21" width="29" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="5" y="28.5" width="12" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Ruled off, edge to edge */}
      <line x1="3" y1="37" x2="45" y2="37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* ACCENT: what one of them actually cost */}
      <rect x="5" y="39.5" width="19" height="6" rx="2.5" fill="currentColor" fillOpacity="0.88" />
      {/* One customer */}
      <circle cx="36" cy="40" r="2.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 46c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* S9 "Eight Specialists on Your Marketing, Not One Generalist": eight
   separate specialists, two columns of four, gathered by one
   orchestrator, and a review that has to pass before anything of
   yours goes out. The count is drawn, not implied. */
export function IconAgentTeam() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Eight of them, and none of them is doing all of it */}
      <rect x="3" y="4" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="13" y="4" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="12" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="13" y="12" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="20" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="13" y="20" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="3" y="28" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="13" y="28" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Gathered, not left to get on with it */}
      <path d="M21 6.5q6 0 7.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M21 30.5q6 0 7.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M21 18.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="33" cy="18.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30.5 18.5l1.9 1.9 3.4-3.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Nothing of yours goes out until it has been read */}
      <line x1="33" y1="24" x2="33" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="25" y="28" width="16" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="32.5" x2="38" y2="32.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: and then it goes */}
      <rect x="25" y="40" width="16" height="5" rx="2.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/* S10 "We Fight for Your Position Every Month, Not Once": the
   position is a beam and every month is a column under it. Take the
   columns away and it comes down. No circular refresh arrows.

   Round one drew the beam as a 1.5 line identical in weight to the
   base line, and with six evenly-spaced thin columns the whole thing
   read as a barcode at both 80px and 200px. The beam now has a body
   and there are four columns plus the lit one, not six. */
export function IconOngoingCadence() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The position, which is the thing being held up */}
      <rect x="3" y="6" width="41" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Every month, again */}
      <line x1="8" y1="17" x2="8" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="17" y1="17" x2="17" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="26" y1="17" x2="26" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="35" y1="17" x2="35" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: this month's */}
      <rect x="39.5" y="16.5" width="5" height="22" rx="2.5" fill="currentColor" fillOpacity="0.88" />
      {/* What they all stand on */}
      <line x1="3" y1="41" x2="44" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* S11 "Google Reviews That Arrive Without Anyone Asking": the job is
   ticked off, the ask leaves on its own, and written reviews come back
   down into a stack that is still filling. There is no person
   anywhere in this icon, which is the whole point of the card.

   Round one had a hooked arrowhead on the return curve that read as a
   stray mark, and three plain bars that read as a list rather than as
   received messages. */
export function IconReviewFunnel() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The job is finished */}
      <rect x="3" y="4" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9.5l2 2 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* So the ask goes, and nobody sent it */}
      <line x1="17.5" y1="9.5" x2="21" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 7l2.5 2.5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="4" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="25" y1="9.5" x2="33" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* And they come back on their own */}
      <path d="M38 16.5c5 4.5 4.5 13-2 16.5H29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <path d="M31.5 30.5L29 33l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* What people actually wrote */}
      <rect x="3" y="20" width="21" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <line x1="6.5" y1="24" x2="19" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* ACCENT: the one that just landed */}
      <rect x="3" y="30" width="21" height="8" rx="2.5" fill="currentColor" fillOpacity="0.88" />
      <rect x="3" y="40" width="21" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* "Get Answers About Your Business in Seconds" -- the STANDARD-SIZE
   tile icon for the same card CardVisualBusinessChat serves. Built as
   a fallback because that graphic needs 150px of width and the tile
   slot is 80px (see the report). Two bubbles with nothing between
   them: you ask in your own words, the figure comes straight back. No
   clock -- the "in seconds" is that there is no step in the middle.
   Distinct from IconPlainEnglishQuery, which is a query bar over a
   chart and a list. */
export function IconBusinessAnswers() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* You ask it the way you would ask a person */}
      <rect x="10" y="5" width="34" height="13" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39 18v4.5l-5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14.5" y1="11.5" x2="34" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* It answers */}
      <rect x="4" y="25" width="34" height="15" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 40v4.5l5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: with the actual figure in it */}
      <rect x="8" y="29" width="13" height="7" rx="2.5" fill="currentColor" fillOpacity="0.88" />
      <line x1="24" y1="32.5" x2="34" y2="32.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/* ═════════════════════════════════════════════════════════════
   BATCH THREE — the six subjects batches one and two did not cover

   AUDIT FIRST, because the brief I was handed was stale. When I
   opened this file it was already 860 lines with 24 exports, not
   499 with 12: another agent had completed a whole "BATCH TWO"
   (divider at :501) and filed its report before I started. EIGHT
   of the fourteen icons I was asked for ALREADY EXISTED, verified
   at 80px in both themes, and I did not redraw them -- redrawing
   would have forked the set. Two more existed under other names.

   Already present, deliberately NOT rebuilt: IconBusinessAnswers
   (:845), IconAgencyGradeBuild (:521), IconConversionPath (:547),
   IconAiReadablePage (:572), IconGranularTracking (:608),
   IconMarCommandEngine (:699), IconOngoingCadence (:787),
   IconReviewFunnel (:813).

   Same FAMILY CONTRACT as batches one and two; see the file
   header. strokeWidth 1.5 everywhere, secondary detail at
   strokeOpacity 0.55, exactly ONE fill accent at 0.88-0.9, no
   defs, no ids, no aria-hidden, no width/height on the root.

   Four of these six are ROUND-TWO drawings. What round one got
   wrong is recorded on each one, because the mistakes were all
   the same mistake: detail that survives at 200px on a flat
   ground and dies at 80px under rgba(255,255,255,.6) on a
   saturated gradient. That is the only condition that counts.
   ═════════════════════════════════════════════════════════════ */

/* B3-1 "Completely Custom to Your Business": four identical modules in
   a row -- the template a thousand other businesses are all running --
   over one solid mass that is plainly not any of them. The lit shape
   is asymmetric on purpose: it has a shoulder on one side and not the
   other, because it was cut to one operation and there is no reason
   for it to be symmetrical.

   REBUILT TWICE, both times from the render. Round one nested an
   L-shaped socket and the piece seated inside it at an even
   three-unit gap, on the theory that the evenness of the gap WAS the
   drawing; at 80px three units is five pixels and the two merged into
   a blob that read as a letter P. Round two cut the profile as a
   notch in the TOP MIDDLE of the mass, which turned it into a trough
   -- four circles sitting above a tub. Symmetrical bites read as
   containers. An asymmetric side step reads as a shaped part.

   Round three also carried two dimension ticks between the modules
   and the mass, to say "somebody measured this". At 170px they read
   as two stray dashes and at 80px they were invisible, so they are
   gone: five elements, and the contrast carries it without them. */
export function IconBuiltForYouOnly() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Off the shelf: four of the same module, evenly spaced, and
          every one of them interchangeable with the others */}
      <rect x="6" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="15" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="24" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="33" y="6" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: cut to that, and to nothing else. Not one of the four. */}
      <path d="M9 23H24V29H39V40H9Z" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* B3-7 "Snappy and Secure": the wall IS the accent. One solid mass in
   two pieces, running off the top and bottom edges so it has no ends
   and no way round, with a single slot through it -- and one unbroken
   run from the request, through the slot, to a delivery that is
   already sitting on the far side. Security is the mass. Speed is
   that the slot is ON the path: nothing queues in front of the wall
   and there is no second gate behind it.

   No speedometer, no lightning bolt, no padlock. REBUILT FOUR TIMES,
   every time from the render and never from the source:
     1. A rounded strongbox with a pinned seam. The pin was r=1.8 and
        vanished at 80px; the shell read as a container, very nearly
        as a battery.
     2. Four thin full-weight lines with a break in them. At 80px four
        hairlines read as a pause glyph.
     3. Two 9-wide outlined blocks, 10-unit gap. The gap was so wide
        relative to the blocks that they read as two small objects.
     4. Twelve-wide outlined blocks with courses ruled across them.
        Still two objects, now reading as two stacked cards.
   The lesson, and it is the lesson of this whole batch: an OUTLINED
   rect cannot carry mass at 80px under rgba(255,255,255,.6). Only a
   fill can. So the wall takes the one accent this family allows and
   the delivery is the outlined thing -- the inverse of where I
   started, and the only version that reads. Two subpaths in one
   <path> keep it to a single accent element. */
export function IconSnappyAndSecure() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Asked for, with nothing standing between it and the way in */}
      <rect x="3" y="20" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the wall, off both edges, with the one slot through it */}
      <path d="M17 2H28V21.5H17Z M17 26.5H28V46H17Z" fill="currentColor" fillOpacity="0.88" />
      {/* One straight run, and it goes clean through */}
      <line x1="11.5" y1="24" x2="31" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Delivered, already the other side of it */}
      <rect x="31.5" y="18.5" width="12.5" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* B3-8 "We Migrate Your SEO Equity and All Your Content": years of
   earned position as courses of masonry, every course lifted onto a
   new footing with the count intact and the top one still on top. The
   footing it left is drawn empty, which is the only way to show that
   nothing stayed behind.

   Deliberately NOT two panels with an arrow between them. The
   existing IconPlatformMigration (:663) is already that, and batch
   two's own report flags it as near-colliding with the existing
   IconTwoListsReconciled -- a third two-panel migration icon would
   have been the worst thing I could add to this set. Equity as
   accumulated MASS on a plinth shares no silhouette with either.
   Round one used five courses and a shallower footing and read as a
   stack of coins; four courses and a plinth that oversails the column
   on both sides reads as a standing structure. */
export function IconSeoEquityMigration() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Where it used to stand. There is nothing left on it. */}
      <rect x="3" y="38" width="9" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Moved */}
      <line x1="13" y1="41" x2="16" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 39l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* The footing it stands on now, oversailing on both sides */}
      <rect x="18" y="38" width="26" height="6" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Every course of it came across. All of them, in order. */}
      <rect x="23" y="30" width="17" height="5.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="23" y="23.5" width="17" height="5.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="23" y="17" width="17" height="5.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: including the one on top, which is the whole point */}
      <rect x="23" y="10.5" width="17" height="5.5" rx="1.75" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* B3-10 "What's Your Real ROI on Ad Spend?": a small light thing goes
   out, and a much heavier one comes back. The asymmetry of mass
   between the two IS the return -- no figure is quoted because none
   can honestly be, and the thin faint outbound against the solid
   inbound says it without one.

   No currency mark and no digit anywhere: a made-up number on a card
   asking about ad spend would read as a client result and would
   outlive me. REBUILT. Round one measured spend and return as two
   bars off a shared left edge with the overrun lit inside the lower
   one. It read as a small bar chart -- a diagram, not a picture --
   and worse, it sat beside the existing IconTrueAcquisitionCost
   (:728), which is also bars off a left edge, and the two looked like
   two drawings of one idea. */
export function IconRealRoi() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* What you put in */}
      <rect x="4" y="7" width="11" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* Out it goes, and this is the light half of the picture */}
      <line x1="17" y1="11.5" x2="38" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      <path d="M35.5 9l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* And comes back. Full weight, because this is the half that matters. */}
      <line x1="29" y1="32" x2="9" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 29.5L9 32l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: more came back than went out, and that is the answer */}
      <rect x="30" y="24" width="14" height="16" rx="3.5" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* B3-12 "World-Class SEO, Built to Be Found by AI": one page, found
   two unlike ways -- ranked in an order for the people who search,
   and quoted out loud for the people who ask instead. The fork is the
   drawing: the same work has to land on two surfaces that have
   nothing in common, and the lit thing is your own words inside what
   the assistant actually says.

   Distinct from IconAiReadablePage (:572), which is one page drawn
   twice, human then machine, and never leaves the page -- this one is
   entirely about where the page turns up. Distinct from the existing
   IconAssistantAnswers, whose source is a bubble and whose
   destinations are three panels of the SAME kind on a straight spine.

   REBUILT. Round one gave the search branch a boxed rung between two
   0.55 rules. At rgba(255,255,255,.6) over a gradient those rules
   vanished completely, so the branch read as a lone pill and the icon
   collapsed into a generic flowchart forking to two identical boxes.
   The ranking is now carried by three rungs of DECREASING width,
   which survives because it is a shape and not a hairline, and the
   answer now carries a tail so the two destinations cannot be
   confused for one another. */
export function IconAiFindableSeo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Your page. One source, and both of them read this one thing. */}
      <rect x="3" y="18" width="11" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="23" x2="11" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Found two ways, out of the one place */}
      <path d="M14.5 22Q21 22 24 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 27Q21 27 24 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Ranked in an order, and you are the top of it */}
      <rect x="26" y="4" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="11.5" width="13" height="4" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="26" y="18" width="9" height="4" rx="1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* And said out loud, for the ones who ask instead of search */}
      <rect x="26" y="27" width="18" height="13" rx="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 40v4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ACCENT: your own words, inside what it tells them */}
      <rect x="29" y="31" width="12" height="5" rx="2" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}

/* B3-14 "Your Success Is Our Success": one tally, gripped from both
   sides by two brackets of identical weight, counting discrete real
   outcomes -- and the newest one lit. Take either bracket away and
   nothing is holding it up. The symmetry is the argument: neither
   side's grip is drawn heavier than the other's, and the thing they
   are both holding is the same single stack.

   Not a handshake. Not two rising curves either, which is a chart
   rather than a picture. The outcomes are drawn as countable units of
   equal size because the card is about real ones being counted, not
   about a number going up. Kept off IconOngoingCadence (:787), which
   is a beam carried on columns from below and has a ground line --
   this grips from the sides and has neither. */
export function IconSharedSuccess() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Yours */}
      <path d="M13 6H7v36h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* And ours, at exactly the same weight */}
      <path d="M35 6h6v36h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Counted one real outcome at a time, not a number going up */}
      <rect x="16" y="34" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="16" y="26" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <rect x="16" y="18" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      {/* ACCENT: the one that just landed, and it is both of ours */}
      <rect x="16" y="10" width="16" height="6" rx="2" fill="currentColor" fillOpacity="0.88" />
    </svg>
  );
}
