/**
 * Index of every /locations/[slug] page.
 *
 * Used by:
 *  - The /locations hub to build the geographic card grid
 *  - LocationPage to filter `relatedLocations` to known slugs (no 404s)
 *
 * Order within each region is the display order on the hub.
 *
 * URL convention:
 *   Tier-1 cities (>20k pop, primary economic gravity): <city>-kansas
 *   Tier-2/3 re-entry after doorway redirect, OR small cities targeting
 *     a specific service SERP: <city>-kansas-<service>
 *     (services: web-design, custom-software, seo, digital-marketing,
 *      web-applications, web-development)
 *   Regional roll-up: <region>-kansas-web-design
 *   Border-state: <city>-<state-name>-<service>
 *   Industry × city: <city>-<state>-<industry>-software
 */

import type { LocationPageData } from "@/types/location";

import { locationData as arkansasCityKansasWebDesign } from "./arkansas-city-kansas-web-design";
import { locationData as atchinsonKansasWebDesign } from "./atchison-kansas-web-design";
import { locationData as beloitKansasWebDesign } from "./beloit-kansas-web-design";
import { locationData as chanunteKansasWebDesign } from "./chanute-kansas-web-design";
import { locationData as coffeyvilleKansasWebDesign } from "./coffeyville-kansas-web-design";
import { locationData as colbyKansasWebDesign } from "./colby-kansas-web-design";
import { locationData as coloradoSpringsColoradoWebDesign } from "./colorado-springs-colorado-web-design";
import { locationData as denverColoradoWebDesign } from "./denver-colorado-web-design";
import { locationData as derbyKansasWebDesign } from "./derby-kansas-web-design";
import { locationData as dodgeCityKansas } from "./dodge-city-kansas";
import { locationData as dodgeCityKansasSeo } from "./dodge-city-kansas-seo";
import { locationData as dodgeCityKansasWebDesign } from "./dodge-city-kansas-web-design";
import { locationData as ellisKansasWebDesign } from "./ellis-kansas-web-design";
import { locationData as emporiaKansasWebDesign } from "./emporia-kansas-web-design";
import { locationData as gardenCityKansas } from "./garden-city-kansas";
import { locationData as gardenCityKansasSeo } from "./garden-city-kansas-seo";
import { locationData as gardenCityKansasWebDesign } from "./garden-city-kansas-web-design";
import { locationData as goodlandKansasWebDesign } from "./goodland-kansas-web-design";
import { locationData as greatBendKansas } from "./great-bend-kansas";
import { locationData as greatBendKansasDigitalMarketing } from "./great-bend-kansas-digital-marketing";
import { locationData as greatBendKansasWebDesign } from "./great-bend-kansas-web-design";
import { locationData as haysKansas } from "./hays-kansas";
import { locationData as haysKansasCustomSoftware } from "./hays-kansas-custom-software";
import { locationData as haysKansasDigitalMarketing } from "./hays-kansas-digital-marketing";
import { locationData as haysKansasHealthcareSoftware } from "./hays-kansas-healthcare-software";
import { locationData as haysKansasHvacSoftware } from "./hays-kansas-hvac-software";
import { locationData as haysKansasInsuranceSoftware } from "./hays-kansas-insurance-software";
import { locationData as haysKansasOilGasSoftware } from "./hays-kansas-oil-gas-software";
import { locationData as haysKansasRestaurantMarketing } from "./hays-kansas-restaurant-marketing";
import { locationData as haysKansasSeo } from "./hays-kansas-seo";
import { locationData as haysKansasTruckingSoftware } from "./hays-kansas-trucking-software";
import { locationData as haysKansasWebApplications } from "./hays-kansas-web-applications";
import { locationData as haysKansasWebDesign } from "./hays-kansas-web-design";
import { locationData as haysKansasWebDevelopment } from "./hays-kansas-web-development";
import { locationData as hillCityKansasWebDesign } from "./hill-city-kansas-web-design";
import { locationData as hutchinsonKansasWebDesign } from "./hutchinson-kansas-web-design";
import { locationData as independenceKansasWebDesign } from "./independence-kansas-web-design";
import { locationData as junctionCityKansasWebDesign } from "./junction-city-kansas-web-design";
import { locationData as kansasCityMissouriCustomSoftware } from "./kansas-city-missouri-custom-software";
import { locationData as lawrenceKansasCustomSoftware } from "./lawrence-kansas-custom-software";
import { locationData as lawrenceKansasWebDesign } from "./lawrence-kansas-web-design";
import { locationData as lenexaKansasCustomSoftware } from "./lenexa-kansas-custom-software";
import { locationData as liberalKansasWebDesign } from "./liberal-kansas-web-design";
import { locationData as lincolnNebraskaWebDesign } from "./lincoln-nebraska-web-design";
import { locationData as manhattanKansas } from "./manhattan-kansas";
import { locationData as manhattanKansasCustomSoftware } from "./manhattan-kansas-custom-software";
import { locationData as manhattanKansasSeo } from "./manhattan-kansas-seo";
import { locationData as mcphersonKansasWebDesign } from "./mcpherson-kansas-web-design";
import { locationData as newtonKansasWebDesign } from "./newton-kansas-web-design";
import { locationData as nortonKansasWebDesign } from "./norton-kansas-web-design";
import { locationData as oakleyKansasWebDesign } from "./oakley-kansas-web-design";
import { locationData as oklahomaCityOklahomaCustomSoftware } from "./oklahoma-city-oklahoma-custom-software";
import { locationData as olatheKansasCustomSoftware } from "./olathe-kansas-custom-software";
import { locationData as omahaNebraskWebDesign } from "./omaha-nebraska-web-design";
import { locationData as ottawaKansasWebDesign } from "./ottawa-kansas-web-design";
import { locationData as overlandParkKansasCustomSoftware } from "./overland-park-kansas-custom-software";
import { locationData as parsonsKansasWebDesign } from "./parsons-kansas-web-design";
import { locationData as phillipsburgKansasWebDesign } from "./phillipsburg-kansas-web-design";
import { locationData as pittsburgKansasWebDesign } from "./pittsburg-kansas-web-design";
import { locationData as plainvilleKansasWebDesign } from "./plainville-kansas-web-design";
import { locationData as prattKansasWebDesign } from "./pratt-kansas-web-design";
import { locationData as salinaKansas } from "./salina-kansas";
import { locationData as salinaKansasSeo } from "./salina-kansas-seo";
import { locationData as salinaKansasWebDesign } from "./salina-kansas-web-design";
import { locationData as topekaKansas } from "./topeka-kansas";
import { locationData as topekaKansasCustomSoftware } from "./topeka-kansas-custom-software";
import { locationData as topekaKansasDigitalMarketing } from "./topeka-kansas-digital-marketing";
import { locationData as topekaKansasSeo } from "./topeka-kansas-seo";
import { locationData as tulsaOklahomaWebDesign } from "./tulsa-oklahoma-web-design";
import { locationData as wakeeneyKansasWebDesign } from "./wakeeney-kansas-web-design";
import { locationData as westernKansasWebDesign } from "./western-kansas-web-design";
import { locationData as wichitaKansas } from "./wichita-kansas";
import { locationData as wichitaKansasCustomSoftware } from "./wichita-kansas-custom-software";
import { locationData as wichitaKansasDigitalMarketing } from "./wichita-kansas-digital-marketing";
import { locationData as wichitaKansasSeo } from "./wichita-kansas-seo";
import { locationData as wichitaKansasWebApplications } from "./wichita-kansas-web-applications";
import { locationData as winfieldKansasWebDesign } from "./winfield-kansas-web-design";

export const ALL_LOCATIONS: LocationPageData[] = [
  // ── Western Kansas / Hays Hub ────────────────────────────────
  haysKansas,
  haysKansasCustomSoftware,
  haysKansasWebApplications,
  haysKansasWebDevelopment,
  haysKansasWebDesign,
  haysKansasSeo,
  haysKansasDigitalMarketing,
  haysKansasHvacSoftware,
  haysKansasOilGasSoftware,
  haysKansasRestaurantMarketing,
  haysKansasHealthcareSoftware,
  haysKansasTruckingSoftware,
  haysKansasInsuranceSoftware,
  greatBendKansas,
  greatBendKansasWebDesign,
  greatBendKansasDigitalMarketing,
  wakeeneyKansasWebDesign,
  colbyKansasWebDesign,
  ellisKansasWebDesign,
  hillCityKansasWebDesign,
  goodlandKansasWebDesign,
  oakleyKansasWebDesign,
  nortonKansasWebDesign,
  phillipsburgKansasWebDesign,
  plainvilleKansasWebDesign,
  beloitKansasWebDesign,
  westernKansasWebDesign,
  // ── Central Kansas ───────────────────────────────────────────
  salinaKansas,
  salinaKansasWebDesign,
  salinaKansasSeo,
  hutchinsonKansasWebDesign,
  mcphersonKansasWebDesign,
  newtonKansasWebDesign,
  prattKansasWebDesign,
  // ── Southwest Kansas ────────────────────────────────────────
  gardenCityKansas,
  gardenCityKansasWebDesign,
  gardenCityKansasSeo,
  dodgeCityKansas,
  dodgeCityKansasWebDesign,
  dodgeCityKansasSeo,
  liberalKansasWebDesign,
  // ── South-Central Kansas ────────────────────────────────────
  wichitaKansas,
  wichitaKansasCustomSoftware,
  wichitaKansasSeo,
  wichitaKansasDigitalMarketing,
  wichitaKansasWebApplications,
  derbyKansasWebDesign,
  winfieldKansasWebDesign,
  arkansasCityKansasWebDesign,
  // ── Southeast Kansas ────────────────────────────────────────
  coffeyvilleKansasWebDesign,
  chanunteKansasWebDesign,
  independenceKansasWebDesign,
  parsonsKansasWebDesign,
  pittsburgKansasWebDesign,
  // ── Northeast Kansas & Flint Hills ──────────────────────────
  manhattanKansas,
  manhattanKansasCustomSoftware,
  manhattanKansasSeo,
  junctionCityKansasWebDesign,
  lawrenceKansasWebDesign,
  lawrenceKansasCustomSoftware,
  topekaKansas,
  topekaKansasCustomSoftware,
  topekaKansasSeo,
  topekaKansasDigitalMarketing,
  emporiaKansasWebDesign,
  atchinsonKansasWebDesign,
  ottawaKansasWebDesign,
  // ── Kansas City Metro ───────────────────────────────────────
  olatheKansasCustomSoftware,
  overlandParkKansasCustomSoftware,
  lenexaKansasCustomSoftware,
  kansasCityMissouriCustomSoftware,
  // ── Border Markets ──────────────────────────────────────────
  oklahomaCityOklahomaCustomSoftware,
  tulsaOklahomaWebDesign,
  denverColoradoWebDesign,
  coloradoSpringsColoradoWebDesign,
  omahaNebraskWebDesign,
  lincolnNebraskaWebDesign,
];

export const ALL_LOCATION_SLUGS: Set<string> = new Set(
  ALL_LOCATIONS.map((l) => l.slug)
);

export const LOCATIONS_BY_SLUG: Record<string, LocationPageData> = Object.fromEntries(
  ALL_LOCATIONS.map((l) => [l.slug, l])
);

/**
 * Geographic regions for the hub page. Slugs only — hub resolves them
 * via LOCATIONS_BY_SLUG.
 */
export interface LocationRegion {
  name: string;
  blurb: string;
  slugs: string[];
}

export const LOCATION_REGIONS: LocationRegion[] = [
  {
    name: "Western Kansas",
    blurb:
      "The home region. Hays headquarters and the I-70 / US-283 service radius — plus the northwest Kansas corridor.",
    slugs: [
      "hays-kansas",
      "hays-kansas-custom-software",
      "hays-kansas-web-applications",
      "hays-kansas-web-development",
      "hays-kansas-web-design",
      "hays-kansas-seo",
      "hays-kansas-digital-marketing",
      "hays-kansas-hvac-software",
      "hays-kansas-oil-gas-software",
      "hays-kansas-restaurant-marketing",
      "hays-kansas-healthcare-software",
      "hays-kansas-trucking-software",
      "hays-kansas-insurance-software",
      "ellis-kansas-web-design",
      "wakeeney-kansas-web-design",
      "colby-kansas-web-design",
      "goodland-kansas-web-design",
      "oakley-kansas-web-design",
      "hill-city-kansas-web-design",
      "norton-kansas-web-design",
      "phillipsburg-kansas-web-design",
      "plainville-kansas-web-design",
      "beloit-kansas-web-design",
      "western-kansas-web-design",
    ],
  },
  {
    name: "Central Kansas",
    blurb:
      "The I-70 and I-135 corridor — Great Bend, Salina, Hutchinson, and the surrounding counties.",
    slugs: [
      "great-bend-kansas",
      "great-bend-kansas-web-design",
      "great-bend-kansas-digital-marketing",
      "salina-kansas",
      "salina-kansas-web-design",
      "salina-kansas-seo",
      "hutchinson-kansas-web-design",
      "mcpherson-kansas-web-design",
      "newton-kansas-web-design",
      "pratt-kansas-web-design",
    ],
  },
  {
    name: "Southwest Kansas",
    blurb:
      "The southwest plains — Garden City, Dodge City, and the ag and energy operators between them.",
    slugs: [
      "garden-city-kansas",
      "garden-city-kansas-web-design",
      "garden-city-kansas-seo",
      "dodge-city-kansas",
      "dodge-city-kansas-web-design",
      "dodge-city-kansas-seo",
      "liberal-kansas-web-design",
    ],
  },
  {
    name: "South-Central Kansas",
    blurb:
      "The largest economy in Kansas — Wichita, Derby, and the surrounding metro.",
    slugs: [
      "wichita-kansas",
      "wichita-kansas-custom-software",
      "wichita-kansas-seo",
      "wichita-kansas-digital-marketing",
      "wichita-kansas-web-applications",
      "derby-kansas-web-design",
      "winfield-kansas-web-design",
      "arkansas-city-kansas-web-design",
    ],
  },
  {
    name: "Southeast Kansas",
    blurb:
      "The southeast corridor — Coffeyville, Chanute, Parsons, Pittsburg, and Montgomery and Crawford counties.",
    slugs: [
      "coffeyville-kansas-web-design",
      "independence-kansas-web-design",
      "chanute-kansas-web-design",
      "parsons-kansas-web-design",
      "pittsburg-kansas-web-design",
    ],
  },
  {
    name: "Northeast Kansas & Flint Hills",
    blurb:
      "The eastern half of the state — Manhattan, Junction City, Lawrence, Topeka, Emporia, and the Flint Hills corridor.",
    slugs: [
      "manhattan-kansas",
      "manhattan-kansas-custom-software",
      "manhattan-kansas-seo",
      "junction-city-kansas-web-design",
      "lawrence-kansas-web-design",
      "lawrence-kansas-custom-software",
      "topeka-kansas",
      "topeka-kansas-custom-software",
      "topeka-kansas-seo",
      "topeka-kansas-digital-marketing",
      "emporia-kansas-web-design",
      "ottawa-kansas-web-design",
      "atchison-kansas-web-design",
    ],
  },
  {
    name: "Kansas City Metro",
    blurb:
      "Johnson County, the eastern Kansas metro, and the Missouri side — Olathe, Overland Park, Lenexa, and Kansas City, MO.",
    slugs: [
      "olathe-kansas-custom-software",
      "overland-park-kansas-custom-software",
      "lenexa-kansas-custom-software",
      "kansas-city-missouri-custom-software",
    ],
  },
  {
    name: "Border Markets",
    blurb:
      "Regional remote-delivery markets — Oklahoma, Colorado, Nebraska, and Missouri. On-site travel available for material engagements.",
    slugs: [
      "oklahoma-city-oklahoma-custom-software",
      "tulsa-oklahoma-web-design",
      "denver-colorado-web-design",
      "colorado-springs-colorado-web-design",
      "omaha-nebraska-web-design",
      "lincoln-nebraska-web-design",
    ],
  },
];
