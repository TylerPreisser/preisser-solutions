const KEY = "cd9d2166e08f09a44331c911b5dace2d";
const HOST = "preissertech.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  // Homepage + existing public
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/services`,
  `https://${HOST}/contact`,
  `https://${HOST}/roi-calculator`,
  `https://${HOST}/why-automation`,
  // Brand defense
  `https://${HOST}/preisser-technology`,
  `https://${HOST}/tyler-preisser`,
  // Service hubs
  `https://${HOST}/custom-websites`,
  `https://${HOST}/web-applications`,
  `https://${HOST}/business-automation`,
  `https://${HOST}/ai-agents`,
  `https://${HOST}/dashboards-and-analytics`,
  `https://${HOST}/premium-web-development-kansas`,
  // Trust / utility
  `https://${HOST}/faq`,
  `https://${HOST}/pricing`,
  `https://${HOST}/process`,
  // Locations
  `https://${HOST}/locations/hays-kansas`,
  `https://${HOST}/locations/wichita-kansas`,
  `https://${HOST}/locations/salina-kansas`,
  `https://${HOST}/locations/topeka-kansas`,
  `https://${HOST}/locations/manhattan-kansas`,
  `https://${HOST}/locations/garden-city-kansas`,
  `https://${HOST}/locations/great-bend-kansas`,
  `https://${HOST}/locations/dodge-city-kansas`,
  // Industries
  `https://${HOST}/industries/hvac`,
  `https://${HOST}/industries/oil-gas`,
  `https://${HOST}/industries/healthcare`,
  `https://${HOST}/industries/insurance-financial`,
  `https://${HOST}/industries/manufacturing`,
  // Comparison defense
  `https://${HOST}/compare/adams-brown`,
  `https://${HOST}/compare/lost-highway-media`,
  `https://${HOST}/compare/pluto-sites`,
  `https://${HOST}/compare/akeratos`,
  `https://${HOST}/compare/wix-vs-custom`,
  // Feeds + indexes
  `https://${HOST}/llms.txt`,
  `https://${HOST}/feed.xml`,
  `https://${HOST}/sitemap.xml`,
];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST,
};

console.log("Submitting URLs to IndexNow...");
console.log(`Host: ${HOST}`);
console.log(`Key location: ${KEY_LOCATION}`);
console.log(`URLs (${URL_LIST.length}):`);
URL_LIST.forEach((url) => console.log(`  ${url}`));
console.log();

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (response.ok) {
  console.log(`Success: ${response.status} ${response.statusText}`);
} else {
  const body = await response.text().catch(() => "");
  console.error(`Error: ${response.status} ${response.statusText}`);
  if (body) console.error(`Response: ${body}`);
  process.exit(1);
}
