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
  // Service depth pages
  `https://${HOST}/services/local-seo`,
  `https://${HOST}/services/ai-search-optimization`,
  `https://${HOST}/services/website-redesign`,
  `https://${HOST}/services/website-migration`,
  `https://${HOST}/services/custom-crm`,
  `https://${HOST}/services/client-portal`,
  `https://${HOST}/services/ai-invoicing`,
  `https://${HOST}/services/ai-customer-service`,
  `https://${HOST}/services/conversion-optimization`,
  `https://${HOST}/services/api-integration`,
  // Trust / utility
  `https://${HOST}/faq`,
  `https://${HOST}/pricing`,
  `https://${HOST}/process`,
  // Case studies
  `https://${HOST}/case-studies`,
  `https://${HOST}/case-studies/cassidy-hvac`,
  `https://${HOST}/case-studies/hg-oil-holdings`,
  `https://${HOST}/case-studies/iron-and-oak-podcast`,
  `https://${HOST}/case-studies/wife-supply-co`,
  // Locations (existing)
  `https://${HOST}/locations/hays-kansas`,
  `https://${HOST}/locations/wichita-kansas`,
  `https://${HOST}/locations/salina-kansas`,
  `https://${HOST}/locations/topeka-kansas`,
  `https://${HOST}/locations/manhattan-kansas`,
  `https://${HOST}/locations/garden-city-kansas`,
  `https://${HOST}/locations/great-bend-kansas`,
  `https://${HOST}/locations/dodge-city-kansas`,
  // Locations (new)
  `https://${HOST}/locations/russell-kansas`,
  `https://${HOST}/locations/plainville-kansas`,
  `https://${HOST}/locations/phillipsburg-kansas`,
  `https://${HOST}/locations/norton-kansas`,
  `https://${HOST}/locations/hill-city-kansas`,
  `https://${HOST}/locations/smith-center-kansas`,
  `https://${HOST}/locations/concordia-kansas`,
  `https://${HOST}/locations/beloit-kansas`,
  `https://${HOST}/locations/pratt-kansas`,
  `https://${HOST}/locations/emporia-kansas`,
  `https://${HOST}/locations/pittsburg-kansas`,
  `https://${HOST}/locations/newton-kansas`,
  `https://${HOST}/locations/atchison-kansas`,
  `https://${HOST}/locations/ottawa-kansas`,
  `https://${HOST}/locations/coffeyville-kansas`,
  `https://${HOST}/locations/parsons-kansas`,
  `https://${HOST}/locations/hutchinson-kansas`,
  `https://${HOST}/locations/liberal-kansas`,
  `https://${HOST}/locations/goodland-kansas`,
  `https://${HOST}/locations/colby-kansas`,
  `https://${HOST}/locations/mcpherson-kansas`,
  `https://${HOST}/locations/junction-city-kansas`,
  `https://${HOST}/locations/lawrence-kansas`,
  `https://${HOST}/locations/olathe-kansas`,
  `https://${HOST}/locations/overland-park-kansas`,
  // Industries (existing)
  `https://${HOST}/industries/hvac`,
  `https://${HOST}/industries/oil-gas`,
  `https://${HOST}/industries/healthcare`,
  `https://${HOST}/industries/insurance-financial`,
  `https://${HOST}/industries/manufacturing`,
  // Industries (new)
  `https://${HOST}/industries/plumbing`,
  `https://${HOST}/industries/electrical`,
  `https://${HOST}/industries/roofing`,
  `https://${HOST}/industries/landscaping`,
  `https://${HOST}/industries/pest-control`,
  `https://${HOST}/industries/garage-door`,
  `https://${HOST}/industries/auto-service`,
  `https://${HOST}/industries/veterinary`,
  `https://${HOST}/industries/dental`,
  `https://${HOST}/industries/real-estate`,
  `https://${HOST}/industries/construction`,
  `https://${HOST}/industries/trucking-logistics`,
  `https://${HOST}/industries/restaurants`,
  `https://${HOST}/industries/retail`,
  `https://${HOST}/industries/agriculture`,
  // Comparisons (existing)
  `https://${HOST}/compare/adams-brown`,
  `https://${HOST}/compare/lost-highway-media`,
  `https://${HOST}/compare/pluto-sites`,
  `https://${HOST}/compare/akeratos`,
  `https://${HOST}/compare/wix-vs-custom`,
  // Comparisons (new)
  `https://${HOST}/compare/squarespace-vs-custom`,
  `https://${HOST}/compare/webflow-vs-custom-coded`,
  `https://${HOST}/compare/shopify-vs-custom-ecommerce`,
  `https://${HOST}/compare/wordpress-vs-custom`,
  `https://${HOST}/compare/hubspot-vs-custom-crm`,
  `https://${HOST}/compare/salesforce-vs-custom-crm`,
  `https://${HOST}/compare/bubble-vs-custom-coded`,
  `https://${HOST}/compare/flutterflow-vs-custom-coded`,
  `https://${HOST}/compare/zapier-vs-custom-automation`,
  `https://${HOST}/compare/make-com-vs-custom-automation`,
  `https://${HOST}/compare/conceptualized-design`,
  `https://${HOST}/compare/toucan-design`,
  `https://${HOST}/compare/csg-media`,
  `https://${HOST}/compare/imagemakers`,
  `https://${HOST}/compare/kc-web-designer`,
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
