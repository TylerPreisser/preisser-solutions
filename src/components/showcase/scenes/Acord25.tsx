import type { ReactNode } from "react";
import type { AcordData } from "@/data/showcase/scenes/hg-coi";

/**
 * An ACORD 25 (2016/03) Certificate of Liability Insurance, recreated in HTML
 * and CSS on a native 816 x 1056 page (8.5 x 11 in at 96 px), so it stays
 * crisp at any scale: the scene scales it as ONE transform. The grid, labels
 * and fine print follow the printed form; the fill is set in a typewriter
 * face, as agency systems print it. Filled with invented data only
 * (src/data/showcase/scenes/hg-coi.ts).
 *
 * `read` tints the regions already read. Every field the reader records is
 * marked `data-k` (head, producer, insured, insurers, gl, auto, umbrella, wc,
 * description, holder) so the scene can measure it and draw its highlight on
 * the page; `data-cam` marks the part of a coverage row a camera frames (the
 * typed policy number, dates and limits).
 */
export const ACORD_W = 816;
export const ACORD_H = 1056;

export type AcordRegion = "head" | "producer" | "insurers" | "insured" | "coverages" | "description" | "holder";

export function Acord25({ c, read }: { c: AcordData; read?: ReadonlySet<string> }) {
  const r = (name: AcordRegion) => (read?.has(name) ? " is-read" : "");
  const letters = ["A", "B", "C", "D", "E", "F"];
  return (
    <div className="ac" aria-hidden="true">
      <div className={`ac-head${r("head")}`} data-k="head">
        <div className="ac-logo">
          <span>ACORD</span>
          <sup>®</sup>
        </div>
        <p className="ac-title">CERTIFICATE OF LIABILITY INSURANCE</p>
        <div className="ac-date">
          <span className="ac-l">DATE (MM/DD/YYYY)</span>
          <span className="ac-f">{c.date}</span>
        </div>
      </div>

      <p className="ac-legal ac-legal--caps">
        THIS CERTIFICATE IS ISSUED AS A MATTER OF INFORMATION ONLY AND CONFERS NO RIGHTS UPON THE CERTIFICATE HOLDER. THIS
        CERTIFICATE DOES NOT AFFIRMATIVELY OR NEGATIVELY AMEND, EXTEND OR ALTER THE COVERAGE AFFORDED BY THE POLICIES
        BELOW. THIS CERTIFICATE OF INSURANCE DOES NOT CONSTITUTE A CONTRACT BETWEEN THE ISSUING INSURER(S), AUTHORIZED
        REPRESENTATIVE OR PRODUCER, AND THE CERTIFICATE HOLDER.
      </p>
      <p className="ac-legal">
        <b>IMPORTANT:</b> If the certificate holder is an ADDITIONAL INSURED, the policy(ies) must have ADDITIONAL INSURED
        provisions or be endorsed. If SUBROGATION IS WAIVED, subject to the terms and conditions of the policy, certain
        policies may require an endorsement. A statement on this certificate does not confer rights to the certificate
        holder in lieu of such endorsement(s).
      </p>

      <div className="ac-parties">
        <div className={`ac-producer${r("producer")}`} data-k="producer">
          <span className="ac-l ac-lb">PRODUCER</span>
          <span className="ac-f ac-lines">
            {c.producer.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
        <div className={`ac-cell ac-contact${r("producer")}`} data-k="producer">
          <span className="ac-l">CONTACT NAME:</span>
          <span className="ac-f">{c.producer.contact}</span>
        </div>
        <div className={`ac-cell ac-phone${r("producer")}`} data-k="producer">
          <span className="ac-l">
            PHONE
            <br />
            (A/C, No, Ext):
          </span>
          <span className="ac-f">{c.producer.phone}</span>
        </div>
        <div className={`ac-cell ac-fax${r("producer")}`} data-k="producer">
          <span className="ac-l">
            FAX
            <br />
            (A/C, No):
          </span>
          <span className="ac-f">{c.producer.fax}</span>
        </div>
        <div className={`ac-cell ac-email${r("producer")}`} data-k="producer">
          <span className="ac-l">
            E-MAIL
            <br />
            ADDRESS:
          </span>
          <span className="ac-f">{c.producer.email}</span>
        </div>
        <div className="ac-cell ac-ins-h">
          <span className="ac-l ac-c">INSURER(S) AFFORDING COVERAGE</span>
        </div>
        <div className="ac-cell ac-naic-h">
          <span className="ac-l ac-c">NAIC #</span>
        </div>
        {letters.map((L, i) => {
          const ins = c.insurers.find((x) => x.letter === L);
          return (
            <Fragmentish key={L}>
              <div className={`ac-cell ac-ins${ins ? r("insurers") : ""}`} style={{ gridRow: 5 + i }} data-k={ins ? "insurers" : undefined}>
                <span className="ac-l">INSURER {L} :</span>
                <span className="ac-f">{ins?.name ?? ""}</span>
              </div>
              <div className={`ac-cell ac-naic${ins ? r("insurers") : ""}`} style={{ gridRow: 5 + i }} data-k={ins ? "insurers" : undefined}>
                <span className="ac-f">{ins?.naic ?? ""}</span>
              </div>
            </Fragmentish>
          );
        })}
        <div className={`ac-insured${r("insured")}`} data-k="insured">
          <span className="ac-l ac-lb">INSURED</span>
          <span className="ac-f ac-lines">
            {c.insured.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
      </div>

      <div className="ac-band">
        <span className="ac-band__h">COVERAGES</span>
        <span className="ac-l">
          CERTIFICATE NUMBER: <span className="ac-f">{c.certificateNumber}</span>
        </span>
        <span className="ac-l">REVISION NUMBER:</span>
      </div>
      <p className="ac-legal ac-legal--caps ac-legal--tight">
        THIS IS TO CERTIFY THAT THE POLICIES OF INSURANCE LISTED BELOW HAVE BEEN ISSUED TO THE INSURED NAMED ABOVE FOR THE
        POLICY PERIOD INDICATED. NOTWITHSTANDING ANY REQUIREMENT, TERM OR CONDITION OF ANY CONTRACT OR OTHER DOCUMENT WITH
        RESPECT TO WHICH THIS CERTIFICATE MAY BE ISSUED OR MAY PERTAIN, THE INSURANCE AFFORDED BY THE POLICIES DESCRIBED
        HEREIN IS SUBJECT TO ALL THE TERMS, EXCLUSIONS AND CONDITIONS OF SUCH POLICIES. LIMITS SHOWN MAY HAVE BEEN REDUCED
        BY PAID CLAIMS.
      </p>

      <div className={`ac-cov${r("coverages")}`}>
        <div className="ac-cov__head">
          <span>
            INSR
            <br />
            LTR
          </span>
          <span>TYPE OF INSURANCE</span>
          <span>
            ADDL
            <br />
            INSD
          </span>
          <span>
            SUBR
            <br />
            WVD
          </span>
          <span>POLICY NUMBER</span>
          <span>
            POLICY EFF
            <br />
            (MM/DD/YYYY)
          </span>
          <span>
            POLICY EXP
            <br />
            (MM/DD/YYYY)
          </span>
          <span className="ac-cov__lim">LIMITS</span>
        </div>

        <Block
          k="gl"
          rows={7}
          p={c.gl}
          type={[
            <>
              <Box on /> <b>COMMERCIAL GENERAL LIABILITY</b>
            </>,
            <>
              <span className="ac-in" />
              <Box /> CLAIMS-MADE <Box on /> OCCUR
            </>,
            null,
            null,
            <>GEN&apos;L AGGREGATE LIMIT APPLIES PER:</>,
            <>
              <Box on /> POLICY <Box /> <span className="ac-stack">PRO-JECT</span> <Box /> LOC
            </>,
            <>OTHER:</>,
          ]}
          limits={[
            ["EACH OCCURRENCE", c.gl.eachOcc],
            [
              <>
                DAMAGE TO RENTED
                <br />
                PREMISES (Ea occurrence)
              </>,
              c.gl.rented,
            ],
            ["MED EXP (Any one person)", c.gl.med],
            ["PERSONAL & ADV INJURY", c.gl.pai],
            ["GENERAL AGGREGATE", c.gl.genAgg],
            ["PRODUCTS - COMP/OP AGG", c.gl.prodAgg],
            ["", ""],
          ]}
        />
        <Block
          k="auto"
          rows={5}
          p={c.auto}
          type={[
            <b key="a">AUTOMOBILE LIABILITY</b>,
            <>
              <Box on /> ANY AUTO
            </>,
            <span key="own" className="ac-two">
              <span>
                <Box /> OWNED AUTOS ONLY
              </span>
              <span>
                <Box /> SCHEDULED AUTOS
              </span>
            </span>,
            <span key="hired" className="ac-two">
              <span>
                <Box /> HIRED AUTOS ONLY
              </span>
              <span>
                <Box /> NON-OWNED AUTOS ONLY
              </span>
            </span>,
            null,
          ]}
          limits={[
            [
              <>
                COMBINED SINGLE LIMIT
                <br />
                (Ea accident)
              </>,
              c.auto.csl,
            ],
            ["BODILY INJURY (Per person)", ""],
            ["BODILY INJURY (Per accident)", ""],
            [
              <>
                PROPERTY DAMAGE
                <br />
                (Per accident)
              </>,
              "",
            ],
            ["", ""],
          ]}
        />
        <Block
          k="umbrella"
          rows={3}
          p={c.umbrella}
          type={[
            <span key="umb" className="ac-two">
              <span>
                <Box on /> <b>UMBRELLA LIAB</b>
              </span>
              <span>
                <Box on /> OCCUR
              </span>
            </span>,
            <span key="exc" className="ac-two">
              <span>
                <Box /> <b>EXCESS LIAB</b>
              </span>
              <span>
                <Box /> CLAIMS-MADE
              </span>
            </span>,
            <>
              DED <Box on /> RETENTION $ <span className="ac-f">{c.umbrella.retention}</span>
            </>,
          ]}
          limits={[
            ["EACH OCCURRENCE", c.umbrella.eachOcc],
            ["AGGREGATE", c.umbrella.agg],
            ["", ""],
          ]}
        />
        <Block
          k="wc"
          rows={4}
          p={c.wc}
          na
          type={[
            <span key="wc" className="ac-wc">
              <b>
                WORKERS COMPENSATION
                <br />
                AND EMPLOYERS&apos; LIABILITY
              </b>
              <span className="ac-yn">Y / N</span>
            </span>,
            <span key="excl" className="ac-wc">
              <span>
                ANY PROPRIETOR/PARTNER/EXECUTIVE
                <br />
                OFFICER/MEMBER EXCLUDED?
              </span>
              <span className="ac-ynbox">
                <span className="ac-f">{c.wc.excluded}</span>
              </span>
            </span>,
            <>(Mandatory in NH)</>,
            <>
              If yes, describe under
              <br />
              DESCRIPTION OF OPERATIONS below
            </>,
          ]}
          limits={[
            [
              <span className="ac-stat" key="s">
                <span>
                  <Box on /> PER STATUTE
                </span>
                <span>
                  <Box /> OTH-ER
                </span>
              </span>,
              null,
            ],
            ["E.L. EACH ACCIDENT", c.wc.each],
            ["E.L. DISEASE - EA EMPLOYEE", c.wc.disEmp],
            ["E.L. DISEASE - POLICY LIMIT", c.wc.disPol],
          ]}
        />
        <Block rows={2} p={null} type={[null, null]} limits={[["", ""], ["", ""]]} />
      </div>

      <div className={`ac-desc${r("description")}`} data-k="description">
        <span className="ac-l">
          DESCRIPTION OF OPERATIONS / LOCATIONS / VEHICLES (ACORD 101, Additional Remarks Schedule, may be attached if more
          space is required)
        </span>
        <span className="ac-f">{c.description}</span>
      </div>

      <div className="ac-foot2">
        <div className={`ac-holder${r("holder")}`} data-k="holder">
          <span className="ac-band__h ac-bar">CERTIFICATE HOLDER</span>
          <span className="ac-f ac-lines">
            {c.holder.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </div>
        <div className="ac-cancel">
          <span className="ac-band__h ac-bar">CANCELLATION</span>
          <span className="ac-l ac-cancel__t">
            SHOULD ANY OF THE ABOVE DESCRIBED POLICIES BE CANCELLED BEFORE THE EXPIRATION DATE THEREOF, NOTICE WILL BE
            DELIVERED IN ACCORDANCE WITH THE POLICY PROVISIONS.
          </span>
          <span className="ac-l ac-rep">AUTHORIZED REPRESENTATIVE</span>
          <svg className="ac-sig" viewBox="0 0 170 40" aria-hidden="true">
            <path
              d="M6 30c4-12 9-22 13-22s-3 22 1 22 7-17 11-17-2 15 2 15 6-9 9-9 1 9 5 8c5-1 8-12 12-12s-1 13 4 12c6-1 9-15 14-15 3 0 0 13 4 13 5 0 9-8 13-8M98 20c8 0 22-2 38-6M116 9c-2 10-4 20-5 26m22-21c-3 6-5 12-4 17 1 3 5 1 8-3s7-9 10-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="ac-foot">
        <span>ACORD 25 (2016/03)</span>
        <span>© 1988-2015 ACORD CORPORATION. All rights reserved.</span>
        <span />
      </div>
      <p className="ac-marks">The ACORD name and logo are registered marks of ACORD</p>
    </div>
  );
}

function Fragmentish({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** A form checkbox; `on` carries the typed X. */
function Box({ on }: { on?: boolean }) {
  return <span className={on ? "ac-box is-x" : "ac-box"}>{on ? "X" : ""}</span>;
}

type Limit = readonly [ReactNode, string | null];

/** One coverage block of the COVERAGES table: the letter, marks, number and dates once, the type and limits per row. */
function Block({
  k,
  rows,
  p,
  type,
  limits,
  na,
}: {
  k?: string;
  rows: number;
  p: { ltr: string; addl: string; subr: string; number: string; eff: string; exp: string } | null;
  type: readonly ReactNode[];
  limits: readonly Limit[];
  na?: boolean;
}) {
  return (
    <div className="ac-blk" style={{ gridTemplateRows: `repeat(${rows}, var(--ac-row))` }} data-k={k}>
      <span className="ac-c1 ac-f" style={{ gridRow: `1 / span ${rows}` }}>
        {p?.ltr}
      </span>
      {type.map((t, i) => (
        <span key={i} className="ac-c2" style={{ gridRow: i + 1 }}>
          {t}
        </span>
      ))}
      <span className="ac-c3 ac-f" style={{ gridRow: `1 / span ${rows}` }}>
        {na ? <span className="ac-na">N / A</span> : null}
        {p?.addl}
      </span>
      <span className="ac-c4 ac-f" style={{ gridRow: `1 / span ${rows}` }}>
        {p?.subr}
      </span>
      <span className="ac-c5 ac-f" style={{ gridRow: `1 / span ${rows}` }} data-cam={k}>
        {p?.number}
      </span>
      <span className="ac-c6 ac-f" style={{ gridRow: `1 / span ${rows}` }} data-cam={k}>
        {p?.eff}
      </span>
      <span className="ac-c7 ac-f" style={{ gridRow: `1 / span ${rows}` }} data-cam={k}>
        {p?.exp}
      </span>
      {limits.map(([label, amount], i) =>
        amount === null ? (
          <span key={i} className="ac-c8 ac-c8--wide" style={{ gridRow: i + 1 }} data-cam={k}>
            {label}
          </span>
        ) : (
          <Fragmentish key={i}>
            <span className="ac-c8" style={{ gridRow: i + 1 }} data-cam={k}>
              {label}
            </span>
            <span className="ac-c9" style={{ gridRow: i + 1 }} data-cam={k}>
              <span className="ac-dollar">$</span>
              <span className="ac-f">{amount}</span>
            </span>
          </Fragmentish>
        ),
      )}
    </div>
  );
}
