const KEY = "cd9d2166e08f09a44331c911b5dace2d";
const HOST = "preissersolutions.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  // Canonical local growth pages only. Do not ping legacy noindex/redirected pages.
  `https://${HOST}/`,
  `https://${HOST}/marketing-agency-hays-ks`,
  `https://${HOST}/services`,
  `https://${HOST}/services/local-seo-hays-ks`,
  `https://${HOST}/services/google-business-profile-optimization-hays-ks`,
  `https://${HOST}/services/google-ads-hays-ks`,
  `https://${HOST}/services/web-design-hays-ks`,
  `https://${HOST}/services/social-media-marketing-hays-ks`,
  `https://${HOST}/services/ai-automation-hays-ks`,
  `https://${HOST}/industries`,
  `https://${HOST}/industries/contractors`,
  `https://${HOST}/industries/restaurants`,
  `https://${HOST}/industries/professional-services`,
  `https://${HOST}/locations`,
  `https://${HOST}/locations/hays-kansas`,
  `https://${HOST}/about`,
  `https://${HOST}/tyler-preisser`,
  `https://${HOST}/case-studies`,
  `https://${HOST}/contact`,
  `https://${HOST}/review`,
  `https://${HOST}/resources`,
  `https://${HOST}/privacy`,
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
