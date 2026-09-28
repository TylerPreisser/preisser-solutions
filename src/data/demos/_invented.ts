// The PUBLIC registry of invented names (ADR-0016 §5). Every person, business,
// town and domain drawn inside a Proof Stage comes from here. Fiction only.
//
// Registering a name:
//   1. Invent it. Never lift a name from any other repo, seed, fixture, handoff
//      or screenshot (the NWKS demo seed's names included: they are shapes, not
//      a name source). Never a real client, vendor, town or person.
//   2. Search the web for it plus "Kansas". Record what you searched in
//      `checked` ("2026-09-28 web: no Kansas business by this name"). A hit
//      means pick another name.
//   3. Add it to invented/<slug>.ts for the case study that uses it, or to
//      invented/_shared.ts if two case studies need it.
// Domains end in `.example` (RFC 2606): guaranteed never to resolve to anyone.
import { invented as shared } from "./invented/_shared";
import { invented as backOffice } from "./invented/preisser-back-office";
import { invented as farmbooks } from "./invented/farmbooks";
import { invented as nwks } from "./invented/nwks-encounter";

export type InventedDomain = `${string}.example`;

interface Checked {
  /** What was searched to confirm the name is not real, and when. */
  checked: string;
}

export interface InventedPerson extends Checked {
  id: string;
  first: string;
  last: string;
  /** Deliberate variants the story needs, e.g. a transposed surname in a sheet check. */
  aliases?: readonly string[];
}

export interface InventedBusiness extends Checked {
  id: string;
  name: string;
  /** Other spellings the screens use, e.g. a bank descriptor "HARLAN FEED CO". */
  aliases?: readonly string[];
}

export interface InventedTown extends Checked {
  id: string;
  name: string;
}

export interface InventedDomainEntry {
  id: string;
  domain: InventedDomain;
}

/** A REAL name a stage may show, with the row that approves it. */
export interface ApprovedEntity {
  name: string;
  /** e.g. "docs/WRITER-AGENT-PROMPT.md APPROVED ENTITIES: NWKS Encounter". */
  source: string;
}

export interface StageAsset {
  path: `/images/demos/${string}`;
  /** Where the file came from and why it is invented, e.g. repo@sha:path. */
  provenance: string;
}

export interface InventedSet {
  /** "_shared", or the case-study slug whose page may use these names. */
  scope: string;
  people: readonly InventedPerson[];
  businesses: readonly InventedBusiness[];
  towns: readonly InventedTown[];
  domains: readonly InventedDomainEntry[];
  /** Capitalised UI words particular to this product ("Attendees", "Cabins"). */
  vocabulary: readonly string[];
  approved: readonly ApprovedEntity[];
  assets: readonly StageAsset[];
}

export const INVENTED_SETS: readonly InventedSet[] = [shared, backOffice, farmbooks, nwks];

function index<T extends { id: string }>(kind: string, pick: (s: InventedSet) => readonly T[]): Map<string, T> {
  const map = new Map<string, T>();
  for (const set of INVENTED_SETS) {
    for (const item of pick(set)) {
      if (map.has(item.id)) throw new Error(`[demo registry] duplicate ${kind} id "${item.id}" (in ${set.scope})`);
      map.set(item.id, item);
    }
  }
  return map;
}

const PEOPLE = index("person", (s) => s.people);
const BUSINESSES = index("business", (s) => s.businesses);
const TOWNS = index("town", (s) => s.towns);
const DOMAINS = index("domain", (s) => s.domains);

function get<T>(map: Map<string, T>, kind: string, id: string): T {
  const v = map.get(id);
  if (!v) {
    throw new Error(`[demo registry] unknown ${kind} "${id}": register it in src/data/demos/invented/<slug>.ts (ADR-0016 §5)`);
  }
  return v;
}

export function person(id: string): InventedPerson & { full: string } {
  const p = get(PEOPLE, "person", id);
  return { ...p, full: `${p.first} ${p.last}` };
}
export const business = (id: string): InventedBusiness => get(BUSINESSES, "business", id);
export const town = (id: string): InventedTown => get(TOWNS, "town", id);
export const domain = (id: string): InventedDomain => get(DOMAINS, "domain", id).domain;
export function email(personId: string, domainId: string): string {
  const p = person(personId);
  return `${p.first}.${p.last}@${domain(domainId)}`.toLowerCase();
}
