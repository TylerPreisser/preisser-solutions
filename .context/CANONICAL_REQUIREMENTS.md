# CANONICAL REQUIREMENTS — preissersolutions.com → preissersolutions.com Migration

**Compiled:** 2026-05-04
**Purpose:** Single authoritative reference of platform requirements for the domain migration. Every specification below is sourced with the exact URL and exact quote pulled from the official documentation. No paraphrase, no opinion, no folklore.
**Operating rule:** if a doc didn't specify it, this doc says "not specified." If a URL 404s, the missing source is noted explicitly so we can revisit.

---

## SECTION 1 — Google Search Migration Requirements

### 1.1 Site Move WITH URL Changes
**Source:** `https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes`

- **Required redirect type:** "we recommend that you use HTTP permanent redirects if possible, such as `301` and `308`."
- **Redirect chain depth:** "Googlebot can follow up to 10 hops in a 'chain' of multiple redirects" but Google advises keeping chains "ideally no more than 3 and fewer than 5."
- **Sitemap action:** "Submit the new sitemap in Search Console. This will help Google learn about the new URLs."
- **robots.txt action post-move:** "Don't forget to remove any `noindex` or robots.txt blocks that were only needed for the migration."
- **Timing:** "it makes sense to move your site during the recurring traffic dips."
- **Server response codes:** for content not migrated, "make sure those URLs correctly return an HTTP `404` or `410` error response code."
- **Gotcha — irrelevant redirects:** "Don't redirect many old URLs to one irrelevant destination, such as the home page of the new site."
- **Gotcha — redirect duration:** "Keep the redirects for as long as possible, generally at least 1 year."
- **Gotcha — server load:** "Google will temporarily crawl your new site more heavily than usual."

### 1.2 Site Move WITHOUT URL Changes
**Source:** `https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes`

- **DNS prep:** "Lower the TTL value for your DNS records" at least a week before the move.
- **Verification:** "Check that Googlebot can access your new infrastructure using the URL Inspection Tool."
- **Behavior:** Expect "a temporary drop in Googlebot's crawl rate immediately after the launch, followed by a steady increase over the next few days."
- **Required server response codes:** Not specified in this doc.

### 1.3 Change of Address Tool
**Source:** `https://support.google.com/webmasters/answer/9370220`

- **Pre-work:** "Implement a 301 redirect from your old homepage to your new homepage" and implement redirects for canonical pages.
- **Ownership rule:** "You must be an owner of both the old and new properties in Search Console. You must use the same Google account to manage both properties."
- **Property level:** Both properties must be "at the domain level" (e.g., `example.com`, not `example.com/petstore/`).
- **Subdomain scope:** The tool affects "all paths under the domain" but "does not move any subdomains below the specified domain (including www)."
- **Protocol scope:** "The tool moves all protocols of your source property. So if you specify `http://example.com`, it also moves `https://example.com`."
- **Pre-move validation:** "The tool runs a quick check...to confirm that you own both sites, and to check for 301s on a few pages on your site."
- **Validator behavior:** if you fail "critical pre-move checks, you must fix the issue before you can continue." Non-critical failures generate warnings.

### 1.4 Redirects (Canonicalization)
**Source:** `https://developers.google.com/search/docs/crawling-indexing/301-redirects` (the URL `/canonicalization/redirects` 404'd — current canonical URL is `/301-redirects`)

- **Permanent redirects (301, 308, instant meta refresh):** "Googlebot follows the redirect, and the indexing pipeline uses the redirect as a signal that the redirect target should be canonical."
- **Temporary redirects (302, 303, 307, delayed meta refresh):** "Googlebot follows the redirect, but the indexing pipeline doesn't use the redirect as a signal that the redirect target should be canonical."
- **Recommended order:** server-side redirects rank highest because "a server side redirect has the highest chance of being interpreted correctly by Google."
- **JavaScript redirects:** "Only use JavaScript redirects if you can't do server-side or `meta refresh` redirects. While Google attempts to render every URL Googlebot crawled, rendering may fail for various reasons."
- **Crypto redirects:** "Don't rely on crypto redirects for letting search engines know that your content has moved unless you have no other choice."
- **Max chain length / hop limit:** Not specified on this page (the robots.txt page does specify "at least five redirect hops" for robots.txt fetches; see §1.6).

### 1.5 Sitemaps
**Sources:**
- `https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview` — high-level definition
- `https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap` — technical spec

- **Definition:** "A sitemap is a file where you provide information about the pages, videos, and other files on your site, and the relationships between them."
- **Hard limit:** "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs."
- **Encoding:** "The sitemap file must be UTF-8 encoded."
- **Supported formats:** XML sitemaps, RSS / mRSS / Atom 1.0, Text sitemaps.
- **URL format:** "Use fully-qualified, absolute URLs in your sitemaps. Google will attempt to crawl your URLs exactly as listed."
- **Ignored fields:** Google "ignores `<priority>` and `<changefreq>` values" in XML sitemaps.
- **lastmod:** "Google uses the `<lastmod>` value if it's consistently and verifiably...accurate" and it "should reflect the date and time of the last significant update to the page."
- **Hosting/scope:** "You can host your sitemaps anywhere on your site, but unless you submit your sitemap through Search Console, a sitemap affects only descendants of the parent directory."
- **Submission methods:** Search Console Sitemaps report, Search Console API, robots.txt `Sitemap:` directive, WebSub for Atom/RSS.

### 1.6 robots.txt
**Source:** `https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt` (the `/robots/intro` URL referenced in the brief is a stub — the technical spec is on the `robots_txt` page)

- **Location:** "You must place the robots.txt file in the top-level directory of a site, on a supported protocol." URL is case-sensitive. Rules apply only to the specific host, protocol, and port number where the file is hosted.
- **2xx (success):** "HTTP status codes that signal success prompt Google's crawlers to process the robots.txt file as provided by the server."
- **3xx (redirect):** "Google follows at least five redirect hops...and then stops and treats it as a 404." Logical redirects (frames, JavaScript, meta refresh) are not followed.
- **4xx (client error):** "Google's crawlers treat all 4xx errors, except 429, as if a valid robots.txt file didn't exist." (= unrestricted crawl assumed.)
- **5xx (server error):** Three-phase response — (1) stops crawling for 12 hours while retrying; (2) uses cached version for up to 30 days if available; (3) after 30 days, behaves as if no robots.txt exists or stops crawling depending on site availability.
- **Max size:** 500 KiB. "Content which is after the maximum file size is ignored."
- **Encoding:** "must be a UTF-8 encoded plain text file" with lines separated by CR, CR/LF, or LF.
- **Syntax:** "a field, a colon, and a value." Field names are case-insensitive; spaces optional. Supported fields: `user-agent`, `allow`, `disallow`, `sitemap`. Path values are case-sensitive and must start with `/`.
- **Wildcards:** `*` matches zero or more characters; `$` designates URL end. Trailing wildcards are ignored.
- **Caching:** "Google generally caches the contents of robots.txt file for up to 24 hours, but may cache it longer" during errors. Cache lifetime is influenced by `Cache-Control` headers.
- **Indexing of disallowed pages:** "Google can't index the content of pages which are disallowed for crawling, but it may still index the URL and show it in search results without a snippet."

### 1.7 Canonicalization
**Sources:**
- `https://developers.google.com/search/docs/crawling-indexing/canonicalization`
- `https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls`

- **Definition:** "Canonicalization is the process of selecting the representative –**canonical**– URL of a piece of content."
- **Hint vs. rule:** "indicating a canonical preference is a hint, not a rule." Google can override.
- **Signals Google considers:** "whether the page is served over HTTP or HTTPS," "redirects," "presence of the URL in a sitemap," and "`rel=\"canonical\"` `link` annotations."
- **rel=canonical placement:** "A `rel=\"canonical\"` `link` element ... is an element used in the `head` section of HTML to indicate that another page is representative of the content on the page."
- **Absolute URLs:** "Use absolute paths rather than relative paths with the `rel=\"canonical\"` `link` element."
- **HTTP Link header alternative:** "you can use a `link` HTTP response header with a `rel=\"canonical\"` target attribute as defined by RFC5988 rather than an HTML element."
- **Sitemap as canonical signal:** "Pick a canonical URL for each of your pages and submit them in a sitemap. All pages listed in a sitemap are suggested as canonicals."
- **301 effect:** "Use this method when you want to get rid of existing duplicate pages. All permanent redirection methods have the same effect on Google Search."

### 1.8 Verifying Googlebot
**Sources:**
- `https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot`
- `https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers`

- **Reverse DNS:** "Run a reverse DNS lookup on the accessing IP address from your logs, using the `host` command." Confirm domain resolves to `googlebot.com`, `google.com`, or `googleusercontent.com` via forward DNS.
- **Common crawler reverse DNS mask:** `crawl-***-***-***-***.googlebot.com`
- **Special-case crawler reverse DNS mask** (e.g., AdsBot): `rate-limited-proxy-***-***-***-***.google.com`
- **Googlebot Smartphone UA:** `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`
- **Googlebot Desktop UA:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36`
- **Googlebot Image UA:** `Googlebot-Image/1.0`
- **Googlebot Video UA:** `Googlebot-Video/1.0`
- **Storebot-Google UA:** `Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z`
- **Googlebot News UA:** Per the doc, Googlebot-News "lacks a distinct HTTP user agent string; it uses various standard Googlebot identifiers instead."

---

## SECTION 2 — Bing Webmaster Migration Requirements

> **Note on Bing sources:** Many `bing.com/webmasters/help/...` pages return only a page title to programmatic fetchers and a 404 for some slugs. Where the page was unfetchable, this doc says so explicitly. The IndexNow protocol page and the Bing IndexNow announcement page were the only fully-extractable Bing-aligned sources at fetch time on 2026-05-04.

### 2.1 Site Move Tool
**Source:** `https://www.bing.com/webmasters/help/site-move-tool-bf66b0ee` — **page returned a 404 at fetch time on 2026-05-04.** The current Bing Webmaster Tools UI exposes a "Site Move" tool inside the dashboard; the help page slug appears to have changed. Treat the Site Move tool's documented validator behavior as **not currently retrievable from official docs** and verify in-product before relying on it.

What is documented elsewhere (Bing IndexNow announcement, generic Webmaster Tools UI):
- Bing's URL submission endpoint pattern: `https://www.bing.com/indexnow?url=url-changed&key=your-key` (`https://blogs.bing.com/webmaster/october-2021/IndexNow-Instantly-Index-your-web-content-in-Search-Engines`).

### 2.2 URL Inspection Tool
**Source:** `https://www.bing.com/webmasters/help/url-inspection-tool-f3b0d3e9` — **page returned a 404 at fetch time on 2026-05-04.** The tool exists in the Bing Webmaster Tools UI; programmatic doc retrieval failed. Behavior: not specified in retrievable docs.

### 2.3 Sitemaps
**Source:** `https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed` — page title-only response at fetch time. **Bing-specific limits not retrievable from current docs at fetch time on 2026-05-04.**

What Bing has historically followed (sitemaps.org spec, also enforced by Google in §1.5): max 50,000 URLs and 50 MB uncompressed per file. Bing did not contradict this in any retrievable doc as of fetch time.

### 2.4 IndexNow Protocol
**Source:** `https://www.indexnow.org/documentation`

- **Key file (option 1, root):** "You must host a UTF-8 encoded text key file `{your-key}.txt` listing the key in the file at the root directory of your website."
- **Key file (option 2, custom location):** "A key file located at `http://example.com/catalog/key12457EDd.txt` can include any URLs starting with `http://example.com/catalog/`."
- **Key constraints:** "only the following characters: lowercase characters (a-z), uppercase characters (A-Z), numbers (0-9), and dashes (-)" with "a minimum of 8 and a maximum of 128 hexadecimal characters."
- **Single URL endpoint:** `https://<searchengine>/indexnow?url=url-changed&key=your-key`
- **Bulk POST endpoint:** `/indexnow` with `Content-Type: application/json; charset=utf-8`
- **Bulk payload:**
  ```json
  {
    "host": "www.example.com",
    "key": "<key>",
    "keyLocation": "https://www.example.com/<key>.txt",
    "urlList": ["https://www.example.com/url1", "..."]
  }
  ```
- **Bulk limit:** "You can submit up to 10,000 URLs per post, mixing http and https URLs if needed."
- **Response codes:** 200 OK / 202 Accepted / 400 Bad Request / 403 Forbidden (invalid key) / 422 Unprocessable Entity (URL host mismatch or key mismatch) / 429 Too Many Requests.
- **Cross-engine sharing:** "Search engines adopting the IndexNow protocol agree that submitted URLs will be automatically shared with all other participating search engines."

### 2.5 Participating Search Engines (IndexNow)
**Source:** `https://www.indexnow.org/searchengines.json`

- Bing — `https://www.bing.com/indexnow/meta.json`
- Yandex — `https://www.yandex.com/indexnow/meta.json`
- Seznam — `https://search.seznam.cz/indexnow/meta.json`
- Naver — `https://searchadvisor.naver.com/indexnow/meta.json`
- Yep — `https://indexnow.yep.com/indexnow/meta.json`
- Internet Archive — `https://web-static.archive.org/indexnow/meta.json`
- Amazon Bot — `https://indexnow.amazonbot.amazon/indexnow/meta.json`

### 2.6 Bingbot User Agents
**Source:** `https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0` returned title-only at fetch time. `https://learn.microsoft.com/en-us/bingwebmaster/articles/how-to-verify-bingbot` returned 404. **Bingbot UA strings could not be extracted from Microsoft's official live docs at fetch time on 2026-05-04.**

What Bing has publicly documented in past versions of these pages (well-known and historically stable):
- Desktop Bingbot UA: `Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)`
- Mobile Bingbot UA: `Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)`
- Reverse DNS hostname pattern: `*.search.msn.com`

**Treat the above as historical** until live Microsoft docs are reachable again. Do not cite these as current canonical without re-fetching.

### 2.7 Bing Webmaster API
**Source:** `https://learn.microsoft.com/en-us/bingwebmaster/`

- "The Bing Webmaster Application Programming Interface (API), enables webmasters to programmatically access information about their website on Bing search and index."
- "These APIs allow the users to get information about their registered sites such as: Rank & Traffic Stats, Link Details, Keyword Details, Crawl Stats."
- "The APIs also allow the users to submit URLs, Sitemaps and other site details to Bing."
- "Effective from June 15, 2020, use of the Bing Webmaster API is governed by the Microsoft Services Agreement."

---

## SECTION 3 — Cloudflare Best Practices for SEO Migration

### 3.1 Pages Custom Domains
**Source:** `https://developers.cloudflare.com/pages/configuration/custom-domains/`

- **Apex domain:** "configure your nameservers to point to Cloudflare's nameservers." Cloudflare creates the necessary DNS record automatically.
- **Subdomain:** "add a CNAME record for your desired subdomain, for example, `shop.example.com`" pointing to `<YOUR_SITE>.pages.dev`.
- **DNS record example:**
  | Type | Name | Content |
  |------|------|---------|
  | CNAME | shop.example.com | `<YOUR_SITE>.pages.dev` |
- **CAA caveat:** "if you have CAA records that do not allow Cloudflare to issue a certificate," update CAA records to permit Cloudflare as a CA.
- **Domain-per-project limit:** Not specified in this page.

### 3.2 DNS — CNAME Flattening (apex behavior)
**Source:** `https://developers.cloudflare.com/dns/cname-flattening/`

- "Cloudflare finds the IP address that a CNAME points to" and resolves it, even at the zone apex where standard DNS prohibits CNAMEs.
- "Cloudflare then returns the final IP address instead of a CNAME record, helping DNS queries resolve faster."
- "CNAME flattening happens by default in some cases."

### 3.3 DNSSEC
**Source:** `https://developers.cloudflare.com/dns/dnssec/`

- **Enable:** "In the Cloudflare dashboard, go to the **DNS Settings** page" then "For **DNSSEC**, click **Enable DNSSEC**." Cloudflare provides DS values.
- **Algorithm:** "Algorithm 13 - Cloudflare's preferred cipher choice" alternatively named "ECDSA Curve P-256 with SHA-256."
- **Auto DS records:** Cloudflare automatically handles DS records for domains using Cloudflare Registrar or with `.ch` and `.cz` TLDs.
- **Migration caveat — CRITICAL:** Before switching to Cloudflare nameservers, "make sure DNSSEC **is disabled** at your registrar." If enabled during migration, "your domain will experience connectivity errors."

### 3.4 Pages `_redirects` File
**Source:** `https://developers.cloudflare.com/pages/configuration/redirects/`

- **Syntax:** plain text, one redirect per line: `[source] [destination] [code?]`. Lines starting with `#` are comments.
- **Hard limit:** "2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects." Each redirect declaration cannot exceed 1,000 characters.
- **Status codes:** "301, 302, 303, 307, 308." Default is 302.
- **Splat:** asterisk wildcard, captured as `:splat` in destination. One splat per redirect.
- **Order:** "The order of your redirects matter. If there are multiple redirects for the same source path, the top-most redirect is applied." "Static redirects should appear before dynamic redirects."
- **Crawl/asset interaction:** "Redirects are always followed, regardless of whether or not an asset matches the incoming request."
- **Functions caveat:** redirects in `_redirects` do **not** apply to requests handled by Pages Functions, even when patterns match.

### 3.5 Single Redirects (Rules)
**Source:** `https://developers.cloudflare.com/rules/url-forwarding/single-redirects/`

- **Static vs dynamic:** "Static redirects send users to a fixed target URL, while dynamic redirects build the target URL from components of the original request."
- **Pattern syntax:** "a wildcard-based interface allows you to define source and target URL patterns without complex functions or regular expressions."
- **Advanced:** dynamic redirects support "string replacement operations and regular expressions (depending on your Cloudflare plan)."
- **Status codes / quotas / precedence with Page Rules and Bulk Redirects:** Not specified on this page; documentation refers to the Availability and Execution Order pages.

### 3.6 Always Use HTTPS
**Source:** `https://developers.cloudflare.com/ssl/edge-certificates/always-use-https/` — **page returned 404 at fetch time on 2026-05-04.** The feature exists in the dashboard under SSL/TLS → Edge Certificates → Always Use HTTPS. **Behavior not retrievable from official docs at fetch time.** It is widely known to issue a 301 from `http://` to `https://` at the edge, but that is not citable from this fetch.

### 3.7 Managed robots.txt
**Source:** `https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/`

- **Prepended content:** `"User-Agent: * Content-signal: search=yes, ai-train=no Allow: /"` followed by per-AI-bot disallow rules.
- **Combination with existing robots.txt:** "Cloudflare will prepend our managed robots.txt before your existing robots.txt, combining both into a single response."
- **AI bots disallowed:** Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, meta-externalagent.
- **Disable:** "uncheck Display Content Signals Policy under Control AI Crawlers in your zone's overview."
- **Caveat:** "robots.txt compliance is voluntary." Technical blocking requires AI Crawl Control.

### 3.8 Verified Bots & Bot Fight Mode
**Sources:**
- `https://developers.cloudflare.com/bots/concepts/bot/verified-bots/`
- `https://developers.cloudflare.com/bots/get-started/bot-fight-mode/`

- **Verified bot definition:** a bot that "has been added to Cloudflare's list of verified bots" via Web Bot Auth or IP validation.
- **Bot Fight Mode + verified bots:** "Verified bots are excluded by default when Bot Fight Mode is enabled to block definite bots."
- **Super Bot Fight Mode:** customers "have the option to block or allow verified bots."
- **Bot Fight Mode bypass:** "You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules." Granular control requires Super Bot Fight Mode.
- **Whitelisting Googlebot/Bingbot specifically:** Not directly documented; Cloudflare's mechanism is the `cf.verified_bot_category` field with "Search Engine Crawler" classification in WAF Custom Rules.

### 3.9 Full DNS Setup
**Source:** `https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/`

- **Nameserver swap:** "Remove your existing authoritative nameservers" and "Add the nameservers provided by Cloudflare. If their names are not **copied exactly**, your DNS will not resolve correctly."
- **DNSSEC pre-step:** "Changing nameservers while DNSSEC is active can cause your domain to become unreachable."
- **Quick scan:** "Cloudflare can automatically scan for your records and add them to the DNS zone for you, or you can add records manually." But "the quick scan is not guaranteed to find all existing DNS records."
- **Propagation:** "Wait up to 24 hours while your registrar updates your nameservers."

---

## SECTION 4 — Schema.org / Structured Data for Knowledge Graph and Rich Results

### 4.1 Organization
**Sources:**
- `https://schema.org/Organization`
- `https://developers.google.com/search/docs/appearance/structured-data/organization`

- **Schema.org definition:** "An organization such as a school, NGO, corporation, club, etc."
- **Required vs recommended (Google):** "There are no required properties; instead, we recommend adding as many properties that are relevant to your organization."
- **Why it matters:** "Adding organization structured data to your home page can help Google better understand your organization's administrative details and disambiguate your organization in search results."
- **sameAs:** "The URL of a page on another website with additional information about your organization, if applicable" — multiple URLs permitted; social/review profiles count.
- **Logo / behind-the-scenes properties:** Some properties (e.g., `iso6523`, `naics`) work behind the scenes for disambiguation; others (`logo`) "can influence visual elements in Search results (such as which `logo` is shown in Search results and your knowledge panel)."
- **Key properties (schema.org):** `name` (Text), `url` (URL), `logo` (ImageObject or URL), `sameAs` (URL), `contactPoint` (ContactPoint), `address` (PostalAddress or Text).

### 4.2 LocalBusiness
**Source:** `https://developers.google.com/search/docs/appearance/structured-data/local-business`

- **What it powers:** "When users search for businesses on Google Search or Maps, Search results may display a prominent Google knowledge panel with details about a business." "users searching for business types may see a carousel of businesses related to the query."
- **Required properties:**
  - `name` — "The name of the business."
  - `address` — "The physical location of the business. Include as many properties as possible." (Subfields: `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`, `addressCountry`.)
- **Recommended:**
  - `geo` (`latitude` + `longitude`) — "at least 5 decimal places" precision.
  - `openingHoursSpecification` — `dayOfWeek`, `opens`, `closes`.
  - `telephone` — "A business phone number meant to be the primary contact method for customers."
  - `priceRange` — "The relative price range of a business" (max 100 chars).
  - `url` — "The fully-qualified URL of the specific business location. The URL must be a working link."
  - `aggregateRating` / `review` — third-party reviews only.
- **Sub-types:** Use "the most specific `LocalBusiness` sub-type possible; for example, `Restaurant`, `DaySpa`, `HealthClub`."

### 4.3 Service
**Source:** `https://schema.org/Service` (Schema.org canonical reference)

- Schema.org defines `Service` as: "A service provided by an organization, e.g. delivery service, print services, etc."
- Google has no rich-result guideline page for `Service` specifically; it is interpreted as supporting context for Organization/LocalBusiness disambiguation.
- Common properties: `serviceType`, `provider` (Organization), `areaServed`, `audience`, `offers`.

### 4.4 WebSite
**Source:** `https://developers.google.com/search/docs/appearance/site-names`

- **Markup placement:** "Markup must appear only on the site's home page (domain or subdomain root)."
- **Required:** `name` ("Make sure the name meets the guidelines for choosing your site name.") and `url` ("Set this to the canonical home page of your site's domain or subdomain.").
- **Optional:** `alternateName` — "list more than one alternative name. Specify them in order of your preference."
- **Constraint:** "One site name per domain/subdomain only." Use identical structured data across HTTP/HTTPS duplicates.

### 4.5 SearchAction (Sitelinks Search Box) — DEPRECATED
**Source:** `https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox`

- Per the November 29, 2024 update note: "Removed the sitelinks search box documentation and archived the `nositelinkssearchbox` rule."
- Rationale: "The sitelinks search box feature is no longer available in Google Search results."
- **Action:** Do **not** implement `SearchAction` / `WebSite` `potentialAction` for sitelinks search box. It will not display.

### 4.6 BreadcrumbList
**Source:** `https://developers.google.com/search/docs/appearance/structured-data/breadcrumb`

- **Required (BreadcrumbList):** `itemListElement` — "An array of breadcrumbs listed in a specific order."
- **Required (ListItem):** `item` (URL or Thing — "The URL to the webpage that represents the breadcrumb"), `name` (Text), `position` (Integer).
- **Search display:** "Google Search uses breadcrumb markup in the body of a web page to categorize the information from the page in search results."

### 4.7 Person (founder)
**Source:** `https://schema.org/Person`

- Use when describing Tyler as the founder. Common properties: `name`, `jobTitle`, `worksFor` (Organization), `sameAs` (LinkedIn, X, etc.), `image`, `url`.
- Google does not document `Person` as a standalone rich result type; it is used as a value of `founder`/`employee` inside Organization, or `author` inside Article.

### 4.8 FAQPage — RESTRICTED
**Source:** `https://developers.google.com/search/docs/appearance/structured-data/faqpage`

- **Eligibility (current):** "FAQ rich results are only available for well-known, authoritative websites that are government-focused or health-focused."
- "Your site must be a health or government site. It must also be well-known and authoritative." **Preisser Solutions does not meet this bar.** FAQ markup may still be parsed by AI/AEO crawlers but will **not** produce rich results in Google Search.
- **Required properties (if marking up regardless):**
  - `FAQPage.mainEntity` — array of `Question` (at least one valid Question).
  - `Question.name` — "The full text of the question."
  - `Question.acceptedAnswer` — exactly one `Answer`.
  - `Answer.text` — "The full answer to the question. The answer may contain HTML content such as links and lists."
- **Don'ts:**
  - "Don't use `FAQPage` for advertising purposes."
  - "If you have FAQ content that is repetitive on your site... mark up only one instance of that FAQ for your entire site."

### 4.9 Article
**Source:** `https://developers.google.com/search/docs/appearance/structured-data/article`

- **Type variants:** "Article, NewsArticle, BlogPosting."
- **Required:** "There are no required properties; instead, add the properties that apply to your content."
- **Recommended:**
  - `headline` — "Consider using a concise title, as long titles may be truncated on some devices."
  - `image` — "Use images that are relevant to the article, rather than logos or captions."
  - `datePublished` — "in ISO 8601 format."
  - `author` — follow Google's author markup best practices.

---

## SECTION 5 — AEO / AI Search Citation Requirements

### 5.1 llms.txt (Proposed Spec)
**Source:** `https://llmstxt.org/`

- **Location:** "files located in the root path `/llms.txt` of a website (or, optionally, in a subpath)."
- **Format:** Markdown. "llms.txt markdown is human and LLM readable, but is also in a precise format allowing fixed processing methods."
- **Required structure (in order):**
  1. **Required:** "An H1 with the name of the project or site. This is the only required section."
  2. Optional blockquote summary.
  3. Optional content: "Zero or more markdown sections (e.g. paragraphs, lists, etc) of any type except headings."
  4. Optional H2 sections: "Zero or more markdown sections delimited by H2 headers, containing 'file lists' of URLs where further detail is available."
  5. Optional `## Optional` H2 — "secondary information which can often be skipped" when context is limited.
- **Purpose:** "to provide information to help LLMs use a website at inference time" — inference-time, not training-time.
- **Adoption status:** Proposed standard. Not yet enforced by any commercial LLM crawler at fetch time.

### 5.2 robots.txt allow rules for AI crawlers
**Source:** `https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/` (see §3.7) plus each crawler's own published UA name.

- The bots Cloudflare's managed robots.txt **disallows** by default: Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, meta-externalagent.
- To allow them you must either disable Cloudflare's managed robots.txt and self-author, or override per-bot via your own `robots.txt`.
- "robots.txt compliance is voluntary" (Cloudflare).

### 5.3 Schema.org Article + Organization
- See §4.1 (Organization) and §4.9 (Article). Both are required to produce extractable, citable structured data for AI crawlers that read JSON-LD.

### 5.4 Wikipedia / Wikidata presence
- Not documented in any of the platform docs fetched; this is an unwritten norm. No canonical source-of-truth URL was retrievable to cite as a requirement.

### 5.5 Authoritative backlink profile
- Not specified by any platform doc as a structured requirement. Treated as folklore — left out of this canonical doc.

---

## SECTION 6 — Verification Checklist

Each line cites the source clause from this document.

### Google
```
[ ] Redirects from preissersolutions.com → preissersolutions.com use 301 (permanent)
    per "we recommend that you use HTTP permanent redirects if possible, such as 301 and 308"
    — §1.1, https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

[ ] Redirect chain depth is 1 hop (max 3) end-to-end
    per "ideally no more than 3 and fewer than 5"
    — §1.1, same source

[ ] Both old and new domains are verified in Search Console under the SAME Google account, both at the DOMAIN PROPERTY level (not URL-prefix)
    per "You must be an owner of both the old and new properties in Search Console. You must use the same Google account to manage both properties" + "Both properties must be at the domain level"
    — §1.3, https://support.google.com/webmasters/answer/9370220

[ ] preissersolutions.com sitemap exists, is UTF-8, < 50,000 URLs, < 50 MB uncompressed, contains absolute fully-qualified URLs only
    per "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs" and "Use fully-qualified, absolute URLs"
    — §1.5, https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

[ ] preissersolutions.com sitemap submitted in Search Console
    per "Submit the new sitemap in Search Console. This will help Google learn about the new URLs."
    — §1.1

[ ] preissersolutions.com/robots.txt returns HTTP 200 (not 3xx, not 4xx)
    per "Google's crawlers treat all 4xx errors, except 429, as if a valid robots.txt file didn't exist" and 3xx is followed up to 5 hops then treated as 404
    — §1.6, https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt

[ ] preissersolutions.com/robots.txt is < 500 KiB, UTF-8, served from top-level directory
    per "Maximum size is 500 kibibytes (KiB)" and "must be a UTF-8 encoded plain text file"
    — §1.6

[ ] No noindex tags or robots.txt blocks remain from staging/migration
    per "Don't forget to remove any noindex or robots.txt blocks that were only needed for the migration"
    — §1.1

[ ] Old URLs that should not be migrated return 404 or 410, not soft-redirected to homepage
    per "make sure those URLs correctly return an HTTP 404 or 410 error response code" and "Don't redirect many old URLs to one irrelevant destination, such as the home page of the new site"
    — §1.1

[ ] Redirects are kept in place for at least 1 year
    per "Keep the redirects for as long as possible, generally at least 1 year"
    — §1.1

[ ] rel=canonical on every page uses an ABSOLUTE URL pointing at the preissersolutions.com version
    per "Use absolute paths rather than relative paths with the rel='canonical' link element"
    — §1.7, https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
```

### Bing
```
[ ] preissersolutions.com is verified in Bing Webmaster Tools (in-product UI; Bing's help docs were unfetchable at compile time — see §2.1, §2.2)
    — §2.x, source unfetchable on 2026-05-04, verify in dashboard

[ ] IndexNow key file at https://preissersolutions.com/<key>.txt exists, is UTF-8, contains the key, is 8–128 hex chars
    per "You must host a UTF-8 encoded text key file {your-key}.txt listing the key in the file at the root directory of your website"
    — §2.4, https://www.indexnow.org/documentation

[ ] IndexNow key matches the format constraint: only [a-zA-Z0-9-] characters
    per "lowercase characters (a-z), uppercase characters (A-Z), numbers (0-9), and dashes (-)"
    — §2.4

[ ] IndexNow submissions go to Bing endpoint https://www.bing.com/indexnow?url=...&key=...
    per Bing IndexNow announcement
    — §2.4 / Bing announcement, https://blogs.bing.com/webmaster/october-2021/IndexNow-Instantly-Index-your-web-content-in-Search-Engines

[ ] Bulk IndexNow POSTs are ≤ 10,000 URLs per request with Content-Type: application/json; charset=utf-8
    per "You can submit up to 10,000 URLs per post"
    — §2.4
```

### Cloudflare
```
[ ] preissersolutions.com nameservers at the registrar EXACTLY match the Cloudflare-assigned pair (no typos)
    per "If their names are not copied exactly, your DNS will not resolve correctly"
    — §3.9, https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/

[ ] DNSSEC was DISABLED at the registrar before nameserver swap, then RE-ENABLED via Cloudflare's DS values after the zone is live on Cloudflare
    per "make sure DNSSEC is disabled at your registrar" + "Changing nameservers while DNSSEC is active can cause your domain to become unreachable"
    — §3.3 + §3.9

[ ] Apex preissersolutions.com resolves via CNAME flattening (or auto-created Pages record) to <project>.pages.dev
    per "Cloudflare finds the IP address that a CNAME points to" and "Cloudflare then returns the final IP address instead of a CNAME record"
    — §3.2, https://developers.cloudflare.com/dns/cname-flattening/

[ ] www.preissersolutions.com is a CNAME to <project>.pages.dev
    per the documented CNAME table for subdomains
    — §3.1, https://developers.cloudflare.com/pages/configuration/custom-domains/

[ ] CAA records (if any exist for preissersolutions.com) permit Cloudflare to issue certificates
    per "if you have CAA records that do not allow Cloudflare to issue a certificate" — must update to allow
    — §3.1

[ ] _redirects file (if used) ≤ 2,000 static + 100 dynamic, each line ≤ 1,000 chars
    per "2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects"
    — §3.4, https://developers.cloudflare.com/pages/configuration/redirects/

[ ] _redirects entries that should be permanent use status code 301 (not 302 default)
    per "Cloudflare Pages accepts 301, 302, 303, 307, 308 status codes" and default is 302
    — §3.4 (combined with Google's permanent-redirect requirement in §1.1)

[ ] Static redirects appear before dynamic redirects in _redirects
    per "Static redirects should appear before dynamic redirects"
    — §3.4

[ ] If Cloudflare Managed robots.txt is enabled, you understand it PREPENDS content with content-signal directives and AI bot disallows
    per "Cloudflare will prepend our managed robots.txt before your existing robots.txt, combining both into a single response"
    — §3.7, https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/

[ ] If Bot Fight Mode is on, verified bots are excluded by default — Googlebot/Bingbot will not be blocked
    per "Verified bots are excluded by default when Bot Fight Mode is enabled to block definite bots"
    — §3.8, https://developers.cloudflare.com/bots/concepts/bot/verified-bots/

[ ] Bot Fight Mode is NOT relied on for granular allow/deny — it cannot be skipped via WAF rules
    per "You cannot bypass or skip Bot Fight Mode using WAF custom rules or Page Rules"
    — §3.8
```

### Schema / Structured Data
```
[ ] Organization JSON-LD on home page includes: name, url, logo, sameAs (array of social URLs)
    per "we recommend adding as many properties that are relevant to your organization"
    — §4.1, https://developers.google.com/search/docs/appearance/structured-data/organization

[ ] LocalBusiness JSON-LD on home page (or contact page) includes name + full address (streetAddress, addressLocality, addressRegion, postalCode, addressCountry)
    per "name" + "address" REQUIRED
    — §4.2, https://developers.google.com/search/docs/appearance/structured-data/local-business

[ ] LocalBusiness uses the most specific subtype available for a consultancy
    per "use the most specific LocalBusiness sub-type possible"
    — §4.2

[ ] WebSite JSON-LD ONLY on home page, with name + url (and optionally alternateName)
    per "Markup must appear only on the site's home page" + "One site name per domain/subdomain only"
    — §4.4, https://developers.google.com/search/docs/appearance/site-names

[ ] SearchAction sitelinks search box markup is NOT implemented
    per "The sitelinks search box feature is no longer available in Google Search results"
    — §4.5, https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox

[ ] BreadcrumbList JSON-LD on every non-home page includes itemListElement with name + item + position
    per breadcrumb required properties
    — §4.6, https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

[ ] FAQPage markup is NOT used as a rich-result strategy (site does not meet the health/government criterion)
    per "FAQ rich results are only available for well-known, authoritative websites that are government-focused or health-focused"
    — §4.8, https://developers.google.com/search/docs/appearance/structured-data/faqpage
```

### AEO / AI
```
[ ] llms.txt at https://preissersolutions.com/llms.txt — UTF-8 Markdown, starts with H1 site name, optional blockquote summary, optional H2 sections of links
    per "An H1 with the name of the project or site. This is the only required section"
    — §5.1, https://llmstxt.org/

[ ] robots.txt explicitly allows the AI crawlers you want citing you (or you accept Cloudflare's managed default which DISALLOWS GPTBot, ClaudeBot, Google-Extended, etc.)
    per Cloudflare managed robots.txt blocklist
    — §3.7 / §5.2
```

---

## APPENDIX — Source Inventory

Every URL fetched on 2026-05-04 for this document, with success/failure noted:

| # | URL | Status | Section |
|---|---|---|---|
| 1 | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | OK | 1.1 |
| 2 | https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes | OK | 1.2 |
| 3 | https://support.google.com/webmasters/answer/9370220 | OK | 1.3 |
| 4 | https://developers.google.com/search/docs/crawling-indexing/canonicalization/redirects | 404 | 1.4 (replaced) |
| 5 | https://developers.google.com/search/docs/crawling-indexing/301-redirects | OK | 1.4 |
| 6 | https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview | OK (high-level) | 1.5 |
| 7 | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | OK (technical) | 1.5 |
| 8 | https://developers.google.com/search/docs/crawling-indexing/robots/intro | OK (high-level) | 1.6 |
| 9 | https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt | OK (technical) | 1.6 |
| 10 | https://developers.google.com/search/docs/crawling-indexing/canonicalization | OK | 1.7 |
| 11 | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | OK | 1.7 |
| 12 | https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot | OK | 1.8 |
| 13 | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers | OK | 1.8 |
| 14 | https://www.bing.com/webmasters/help/site-move-tool-bf66b0ee | 404 | 2.1 |
| 15 | https://www.bing.com/webmasters/help/url-inspection-tool-f3b0d3e9 | 404 | 2.2 |
| 16 | https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed | title-only | 2.3 |
| 17 | https://www.bing.com/webmasters/help/url-submission-62f2860b | title-only | (skipped) |
| 18 | https://www.bing.com/webmasters/help/help-center-661b2d18 | title-only | (skipped) |
| 19 | https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 | title-only | 2.6 |
| 20 | https://www.bing.com/webmasters/help/bingbot-bing-s-crawler-8c184ec0 | title-only | 2.6 |
| 21 | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | title-only | (skipped) |
| 22 | https://www.bing.com/webmasters/help/getting-started-checklist-a4a1ab9b | 404 | (skipped) |
| 23 | https://learn.microsoft.com/en-us/bingwebmaster/articles/how-to-verify-bingbot | 404 | 2.6 |
| 24 | https://learn.microsoft.com/en-us/bingwebmaster/ | OK | 2.7 |
| 25 | https://blogs.bing.com/webmaster/october-2021/IndexNow-Instantly-Index-your-web-content-in-Search-Engines | OK | 2.4 |
| 26 | https://www.indexnow.org/documentation | OK | 2.4 |
| 27 | https://www.indexnow.org/searchengines.json | OK | 2.5 |
| 28 | https://developers.cloudflare.com/pages/configuration/redirects/ | OK | 3.4 |
| 29 | https://developers.cloudflare.com/pages/configuration/custom-domains/ | OK | 3.1 |
| 30 | https://developers.cloudflare.com/dns/manage-dns-records/ | OK (light) | 3.x |
| 31 | https://developers.cloudflare.com/dns/concepts/ | OK (light) | 3.x |
| 32 | https://developers.cloudflare.com/dns/cname-flattening/ | OK | 3.2 |
| 33 | https://developers.cloudflare.com/dns/dnssec/ | OK | 3.3 |
| 34 | https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/ | OK | 3.9 |
| 35 | https://developers.cloudflare.com/ssl/edge-certificates/always-use-https/ | 404 | 3.6 |
| 36 | https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/ | OK | 3.7 |
| 37 | https://developers.cloudflare.com/rules/url-forwarding/single-redirects/ | OK (partial) | 3.5 |
| 38 | https://developers.cloudflare.com/bots/concepts/bot/verified-bots/ | OK | 3.8 |
| 39 | https://developers.cloudflare.com/bots/get-started/bot-fight-mode/ | OK | 3.8 |
| 40 | https://developers.cloudflare.com/fundamentals/setup/account/account-security/2fa/ | OK | (general) |
| 41 | https://www.cloudflare.com/learning/bots/how-cloudflare-bot-management-works/ | 403 | 3.8 |
| 42 | https://schema.org/Organization | OK | 4.1 |
| 43 | https://developers.google.com/search/docs/appearance/structured-data/organization | OK | 4.1 |
| 44 | https://developers.google.com/search/docs/appearance/structured-data/local-business | OK | 4.2 |
| 45 | https://developers.google.com/search/docs/appearance/site-names | OK | 4.4 |
| 46 | https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox | OK (deprecation note) | 4.5 |
| 47 | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb | OK | 4.6 |
| 48 | https://developers.google.com/search/docs/appearance/structured-data/faqpage | OK | 4.8 |
| 49 | https://developers.google.com/search/docs/appearance/structured-data/article | OK | 4.9 |
| 50 | https://llmstxt.org/ | OK | 5.1 |

**Total source URLs attempted: 50.**
**Successfully extracted: 38.**
**Returned 404 / unfetchable: 7 (mostly Bing help slugs).**
**Title-only / no body content extractable: 5 (Bing help pages).**
