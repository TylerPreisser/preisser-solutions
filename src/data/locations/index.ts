/**
 * Index of every /locations/[slug] page.
 *
 * Used by:
 *  - The /locations hub to build the geographic card grid
 *  - LocationPage to filter `relatedLocations` to known slugs (no 404s)
 *
 * Order within each region is the display order on the hub.
 */

import type { LocationPageData } from "@/types/location";

import { locationData as colbyKansasWebDesign } from "./colby-kansas-web-design";
import { locationData as dodgeCityKansas } from "./dodge-city-kansas";
import { locationData as dodgeCityKansasWebDesign } from "./dodge-city-kansas-web-design";
import { locationData as gardenCityKansas } from "./garden-city-kansas";
import { locationData as greatBendKansas } from "./great-bend-kansas";
import { locationData as greatBendKansasDigitalMarketing } from "./great-bend-kansas-digital-marketing";
import { locationData as greatBendKansasWebDesign } from "./great-bend-kansas-web-design";
import { locationData as haysKansas } from "./hays-kansas";
import { locationData as haysKansasCustomSoftware } from "./hays-kansas-custom-software";
import { locationData as haysKansasWebApplications } from "./hays-kansas-web-applications";
import { locationData as haysKansasWebDesign } from "./hays-kansas-web-design";
import { locationData as haysKansasWebDevelopment } from "./hays-kansas-web-development";
import { locationData as manhattanKansas } from "./manhattan-kansas";
import { locationData as russellKansasWebDesign } from "./russell-kansas-web-design";
import { locationData as salinaKansas } from "./salina-kansas";
import { locationData as salinaKansasSeo } from "./salina-kansas-seo";
import { locationData as salinaKansasWebDesign } from "./salina-kansas-web-design";
import { locationData as topekaKansas } from "./topeka-kansas";
import { locationData as wakeeneyKansasWebDesign } from "./wakeeney-kansas-web-design";
import { locationData as westernKansasWebDesign } from "./western-kansas-web-design";
import { locationData as wichitaKansas } from "./wichita-kansas";

export const ALL_LOCATIONS: LocationPageData[] = [
  haysKansas,
  haysKansasCustomSoftware,
  haysKansasWebApplications,
  haysKansasWebDevelopment,
  haysKansasWebDesign,
  russellKansasWebDesign,
  greatBendKansas,
  greatBendKansasWebDesign,
  greatBendKansasDigitalMarketing,
  wakeeneyKansasWebDesign,
  colbyKansasWebDesign,
  westernKansasWebDesign,
  salinaKansas,
  salinaKansasWebDesign,
  salinaKansasSeo,
  manhattanKansas,
  topekaKansas,
  wichitaKansas,
  gardenCityKansas,
  dodgeCityKansas,
  dodgeCityKansasWebDesign,
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
      "The home region. Hays headquarters and the I-70 / US-283 service radius.",
    slugs: [
      "hays-kansas",
      "hays-kansas-custom-software",
      "hays-kansas-web-applications",
      "hays-kansas-web-development",
      "hays-kansas-web-design",
      "russell-kansas-web-design",
      "wakeeney-kansas-web-design",
      "colby-kansas-web-design",
      "western-kansas-web-design",
    ],
  },
  {
    name: "Central Kansas",
    blurb:
      "The I-70 and I-135 corridor — Great Bend, Salina, and the surrounding counties.",
    slugs: [
      "great-bend-kansas",
      "great-bend-kansas-web-design",
      "great-bend-kansas-digital-marketing",
      "salina-kansas",
      "salina-kansas-web-design",
      "salina-kansas-seo",
    ],
  },
  {
    name: "Southwest Kansas",
    blurb:
      "The southwest plains — Garden City, Dodge City, and the ag and energy operators between them.",
    slugs: [
      "garden-city-kansas",
      "dodge-city-kansas",
      "dodge-city-kansas-web-design",
    ],
  },
  {
    name: "Northeast Kansas & Flint Hills",
    blurb:
      "The eastern half of the state — Manhattan, Topeka, and the Flint Hills corridor.",
    slugs: ["manhattan-kansas", "topeka-kansas"],
  },
  {
    name: "South-Central Kansas",
    blurb: "The largest economy in Kansas — Wichita and the surrounding metro.",
    slugs: ["wichita-kansas"],
  },
];
