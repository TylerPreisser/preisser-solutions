import { ATTENDEES, SERVERS, TEAMS, attendeeName, attendeeTown, serverName, type Attendee } from "@/data/demos/nwks-encounter";
import { person } from "@/data/demos/_invented";

/**
 * The "before" of each tab (critic-NW M2): a picture of the ministry's OLD
 * materials, drawn in HTML/CSS with invented content, never a paragraph about
 * them. What each one shows comes from the case study's own account of how
 * the work was done before (src/data/case-studies/nwks-encounter.ts): sign-ups
 * on a form that simply closed when the weekend filled, a waitlist worked by
 * telephone, a team workbook re-typed each cycle, room assignments rebuilt in
 * a spreadsheet every cycle, letters sent one at a time. Every name is from
 * the invented registry. The kit prints the tab's one-sentence caption above.
 * Each picture is one image to assistive tech (role="img" + a label).
 */

const REGISTERED = ATTENDEES.filter((a) => a.status === "registered");
const WAITLIST = ATTENDEES.filter((a) => a.status.startsWith("waitlist"));
const INVITED = REGISTERED.filter((a) => a.inviterId);

/** Sign-ups: a web form on the ministry's site, closed once the weekend filled. */
export function DashboardBefore() {
  return (
    <div className="nwks-old nwks-old-form" role="img" aria-label="A sign-up web form marked no longer accepting responses.">
      <div className="nwks-old-form-title">Men&apos;s Encounter 2027 sign-up</div>
      <div className="nwks-old-form-closed">This form is no longer accepting responses</div>
      <div className="nwks-old-form-fields" aria-hidden="true">
        {["Your name", "Your town", "Who invited you"].map((f) => (
          <div className="nwks-old-form-field" key={f}>
            <span>{f}</span>
            <i />
          </div>
        ))}
        <div className="nwks-old-form-field">
          <span>Shirt size</span>
          <span className="nwks-old-form-radios">
            {["S", "M", "L", "XL"].map((s) => (
              <span key={s}>○ {s}</span>
            ))}
          </span>
        </div>
      </div>
      <span className="nwks-old-form-submit" aria-hidden="true">
        Submit
      </span>
    </div>
  );
}

/** After the form: the waitlist, worked by telephone from a notepad. */
export function AttendeesBefore() {
  const notes = ["left a message", "no answer, try again", "call back after supper"];
  return (
    <div className="nwks-old nwks-old-pad" role="img" aria-label="A handwritten call-back list of men waiting for a seat.">
      <div className="nwks-old-pen nwks-old-pad-head">Weekend full. Call back if a seat opens</div>
      <ol className="nwks-old-pad-lines" aria-hidden="true">
        {WAITLIST.map((a, i) => (
          <li key={a.personId} className={i === 1 ? "nwks-old-struck" : undefined}>
            <span className="nwks-old-pen">{attendeeName(a)}</span>
            <span className="nwks-old-pen nwks-old-pad-note">{notes[i % notes.length]}</span>
          </li>
        ))}
        <li>
          <span className="nwks-old-pen nwks-old-pad-note">retype the sheet tonight</span>
        </li>
      </ol>
    </div>
  );
}

/** The team sheet: a workbook re-typed every cycle, names moved by hand. */
export function OrgSheetBefore() {
  const cols = TEAMS.slice(0, 5);
  const rows = 3;
  const moved = person("srv-sam-whitcomb").full;
  return (
    <div className="nwks-old nwks-old-sheet" role="img" aria-label="A hand-kept spreadsheet of team columns, one name crossed out and rewritten in pen.">
      <div aria-hidden="true">
        <table className="nwks-old-grid nwks-old-grid--teams">
          <thead>
            <tr>
              <th className="nwks-old-rn" />
              {cols.map((t) => (
                <th key={t.id}>
                  {t.name}
                  <small>{t.job}</small>
                </th>
              ))}
              <th>
                SPARE
                <small>names to drag</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                <td className="nwks-old-rn">{r + 1}</td>
                {cols.map((t) => {
                  const s = SERVERS.filter((x) => x.teamId === t.id)[r];
                  const isMoved = t.id === "t2" && r === 2;
                  return (
                    <td key={t.id} className={isMoved ? "nwks-old-struck" : undefined}>
                      {isMoved ? moved : s ? serverName(s) : ""}
                    </td>
                  );
                })}
                <td className="nwks-old-spare">{serverName(SERVERS.filter((x) => x.step === 5)[r])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="nwks-old-pen nwks-old-sheet-pen">{moved}, Food</span>
    </div>
  );
}

/** Room assignments: a spreadsheet rebuilt every cycle, grouped by who invited whom, then by town. */
export function CabinsBefore() {
  const groups = Array.from(new Set(INVITED.map((a) => a.inviterId as string))).slice(0, 3);
  const cabinGuess = ["1 L", "1 L", "?"];
  return (
    <div className="nwks-old nwks-old-sheet" role="img" aria-label="A spreadsheet of guests grouped by who invited them, with the cabin column filled in by hand.">
      <table className="nwks-old-grid nwks-old-grid--rooms" aria-hidden="true">
        <thead>
          <tr>
            <th>Name</th>
            <th>Town</th>
            <th>Cabin</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g, gi) => (
            <GroupRows key={g} inviter={person(g).full} guests={INVITED.filter((a) => a.inviterId === g)} cabin={cabinGuess[gi]} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({ inviter, guests, cabin }: { inviter: string; guests: readonly Attendee[]; cabin: string }) {
  return (
    <>
      <tr className="nwks-old-group">
        <td colSpan={3}>Invited by {inviter}</td>
      </tr>
      {guests.map((a) => (
        <tr key={a.personId}>
          <td>{attendeeName(a)}</td>
          <td>{attendeeTown(a)}</td>
          <td className="nwks-old-pen">{cabin}</td>
        </tr>
      ))}
    </>
  );
}

/** Letters: the same launch-point email, sent one person at a time, a day or two apart. */
export function EmailBefore() {
  const days = ["Mon", "Mon", "Tue", "Thu"];
  return (
    <div className="nwks-old nwks-old-mail" role="img" aria-label="A Sent folder listing the same letter sent to one person at a time.">
      <div className="nwks-old-mail-head" aria-hidden="true">
        Sent
      </div>
      <ul className="nwks-old-mail-list" aria-hidden="true">
        {REGISTERED.slice(0, 4).map((a, i) => (
          <li key={a.personId}>
            <span className="nwks-old-mail-to">{attendeeName(a)}</span>
            <span className="nwks-old-mail-subj">Your launch point and what to bring</span>
            <span className="nwks-old-mail-day">{days[i]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
