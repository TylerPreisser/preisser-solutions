const KEY = "cd9d2166e08f09a44331c911b5dace2d";
const HOST = "preissersolutions.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/services`,
  `https://${HOST}/contact`,
  `https://${HOST}/roi-calculator`,
  `https://${HOST}/why-automation`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/feed.xml`,
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
