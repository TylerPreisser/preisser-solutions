const CANONICAL_HOST = "preissersolutions.com";
// LEGACY_HOSTS is intentionally a list of OUTBOUND-REDIRECT SOURCES.
// preissertech.com previously hosted the site under a short-lived rebrand
// (2026-05-02 → 2026-05-15); it was reverted to preissersolutions.com.
// Inbound requests on those hostnames are 301'd to the canonical domain.
// DO NOT remove these strings — they keep the migration redirect alive.
const LEGACY_HOSTS = new Set(["preissertech.com", "www.preissertech.com"]);
const DUPLICATE_HOSTS = new Set(["www.preissersolutions.com", "preisser-solutions.pages.dev"]);
const LEGACY_PATH_REDIRECTS = new Map([
  ["/index.html", "/"],
  ["/home", "/"],
  ["/contact.html", "/contact"],
  ["/services.html", "/services"],
  ["/about.html", "/about"],
  ["/why-automation.html", "/why-automation"],
  ["/roi-calculator.html", "/roi-calculator"],
  ["/pricing.html", "/pricing"],
  ["/process.html", "/process"],
  ["/faq.html", "/faq"],
]);

const LEGACY_ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://preissersolutions.com/sitemap.xml
`;

const OPEN_ROBOTS_TXT = `# Preisser Solutions — maximum-permissive crawler policy
# Search indexing, AI retrieval, and AI training are allowed.

User-agent: *
Allow: /
Content-Signal: search=yes,ai-train=yes,ai-input=yes

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: bingbot
Allow: /

Sitemap: https://preissersolutions.com/sitemap.xml
`;

const AGENT_DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/agent-api.md>; rel="service-doc"; type="text/markdown"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
  '</.well-known/agent-card.json>; rel="agent-card"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
  '</llms.txt>; rel="alternate"; type="text/markdown"',
].join(", ");

function redirectToCanonical(url: URL, extraHeaders?: HeadersInit) {
  const destination = new URL(url.toString());
  destination.protocol = "https:";
  destination.hostname = CANONICAL_HOST;
  return new Response(null, {
    status: 301,
    headers: {
      location: destination.toString(),
      ...extraHeaders,
    },
  });
}

function redirectToCanonicalPath(url: URL, pathname: string, extraHeaders?: HeadersInit) {
  const destination = new URL(url.toString());
  destination.protocol = "https:";
  destination.hostname = CANONICAL_HOST;
  destination.pathname = pathname;
  return new Response(null, {
    status: 301,
    headers: {
      location: destination.toString(),
      ...extraHeaders,
    },
  });
}

type MiddlewareContext = {
  request: Request;
  env?: {
    ASSETS?: {
      fetch: (request: Request) => Promise<Response>;
    };
  };
  next: () => Promise<Response>;
};

function acceptsMarkdown(request: Request) {
  const accept = request.headers.get("accept") || "";
  return accept.toLowerCase().includes("text/markdown");
}

function isPageRequest(pathname: string) {
  const lastSegment = pathname.split("/").pop() || "";
  return pathname === "/" || !lastSegment.includes(".") || pathname.endsWith(".html");
}

/**
 * Pages Function API routes (`functions/api/*.ts`).
 *
 * These are NOT content and must never be treated as a canonical-host or
 * content-negotiation concern. A canonical-host 301 on `/api/*` silently
 * destroys form submissions, because a 301 does two fatal things to a POST:
 *
 *   1. The browser CORS-rejects the cross-origin hop. The footer signup posts
 *      `content-type: application/json`, which is not a CORS-safelisted value,
 *      and `/api/subscribe` emits no `Access-Control-Allow-Origin`, so the
 *      redirected request fails before it is ever handled.
 *   2. If it were followed, Fetch §4.4 (HTTP-redirect fetch, step 11) rewrites
 *      POST to GET and drops the body on a 301. That GET lands on the method
 *      dispatcher in `functions/api/subscribe.ts` and shows the visitor the
 *      literal string "Method not allowed."
 *
 * Either way the address is lost. Verified against production 2026-09-05:
 *   curl -X POST https://www.preissersolutions.com/api/contact \
 *     -H 'content-type: application/json' --data '{}'
 *   -> HTTP/2 301  location: https://preissersolutions.com/api/contact
 *
 * The SEO reason for the host redirect is untouched: it exists to consolidate
 * indexable CONTENT on one hostname. `/api/*` returns `application/json` with
 * `cache-control: no-store`, is not in sitemap.xml, is not linked from any
 * page, and is not indexable by anything — so exempting it removes exactly
 * zero duplicate-content signal. Every page request on `www` and on
 * `preisser-solutions.pages.dev` still 301s to the apex, unchanged.
 */
function isApiRequest(pathname: string) {
  return pathname === "/api" || pathname.startsWith("/api/");
}

// Explicit maximum-permissive robots signal. Applied to every response that
// flows through this middleware so AI agents and crawlers see an affirmative
// "yes, index everything, take everything" header in addition to the open
// `<meta name="robots" content="index, follow">` baked into every HTML page.
//
// Tyler's directive (2026-05-11): ZERO restrictions on AI crawlers and agents.
// Every page, every path. Maximum visibility, maximum discoverability.
const OPEN_ROBOTS_TAG =
  "index, follow, archive, snippet, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

function estimateMarkdownTokens(markdown: string) {
  return Math.max(1, Math.ceil(markdown.trim().split(/\s+/).length * 1.35));
}

async function serveMarkdownForAgents(context: MiddlewareContext, url: URL) {
  const assetUrl = new URL("/llms.txt", url.origin);
  const assetRequest = new Request(assetUrl.toString(), {
    headers: { accept: "text/markdown" },
  });
  const assetResponse = context.env?.ASSETS
    ? await context.env.ASSETS.fetch(assetRequest)
    : await fetch(assetRequest);

  if (!assetResponse.ok) {
    return context.next();
  }

  const markdown = await assetResponse.text();
  // Markdown variant for AI agents is FULLY indexable.
  // Tyler's directive (2026-05-11): zero restrictions for AI agents/crawlers
  // on any path, any variant. The previous `shouldNoindex()` gate on this
  // response was removed so AI agents requesting `Accept: text/markdown`
  // get an affirmative `X-Robots-Tag: index, follow, ...` signal too.
  const headers: Record<string, string> = {
    "content-type": "text/markdown; charset=utf-8",
    "cache-control": "public, max-age=3600",
    "content-location": "/llms.txt",
    "vary": "Accept",
    "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
    "content-signal": "ai-train=yes, search=yes, ai-input=yes",
    "x-robots-tag": OPEN_ROBOTS_TAG,
    "link": AGENT_DISCOVERY_LINKS,
  };

  return new Response(markdown, {
    status: 200,
    headers,
  });
}

export const onRequest = async (context: MiddlewareContext) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (url.pathname === "/robots.txt") {
    return new Response(host === CANONICAL_HOST ? OPEN_ROBOTS_TXT : LEGACY_ROBOTS_TXT, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=300, must-revalidate",
        "content-signal": "ai-train=yes, search=yes, ai-input=yes",
        "x-robots-tag": OPEN_ROBOTS_TAG,
      },
    });
  }

  if (LEGACY_HOSTS.has(host)) {
    const mappedPath = LEGACY_PATH_REDIRECTS.get(url.pathname);
    if (mappedPath) {
      return redirectToCanonicalPath(url, mappedPath);
    }

    return redirectToCanonical(url);
  }

  // Duplicate-host consolidation. Exempts `/api/*` only — see isApiRequest().
  // Page requests on www / pages.dev still 301 to the apex.
  if (DUPLICATE_HOSTS.has(host) && !isApiRequest(url.pathname)) {
    return redirectToCanonical(url);
  }

  // `isPageRequest("/api/subscribe")` is TRUE on its own — the last segment has
  // no dot — so without the API guard an `Accept: text/markdown` POST to the
  // signup endpoint is answered with the contents of /llms.txt and the address
  // is discarded. Same failure mode as the 301 above, different door.
  if (
    acceptsMarkdown(context.request) &&
    isPageRequest(url.pathname) &&
    !isApiRequest(url.pathname)
  ) {
    return serveMarkdownForAgents(context, url);
  }

  const response = await context.next();

  // Tyler's directive (2026-05-11): ZERO restrictions on AI crawlers and
  // agents across preissersolutions.com. Every page, every path.
  //
  // The universal `X-Robots-Tag: index, follow, archive, snippet, ...` header
  // is set on every response by `public/_headers` at the Cloudflare Pages
  // edge — that handles all static assets and HTML routes uniformly. This
  // middleware only re-wraps HTML page responses where we additionally need
  // to inject the agent-discovery `Link` headers (currently only the homepage,
  // to avoid the per-request overhead of cloning every response body).
  //
  // (Earlier revision applied `noindex` here for every non-root HTML page,
  // which deindexed the entire site below /. Removed 2026-05-11 — Tyler
  // wants zero restrictions, so the previous gate is now replaced by the
  // open `X-Robots-Tag` already emitted by `_headers`.)

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const headers = new Headers(response.headers);
    if (!headers.get("link")?.includes('rel="api-catalog"')) {
      headers.append("link", AGENT_DISCOVERY_LINKS);
    }
    headers.append("vary", "Accept");
    // Belt-and-suspenders: also stamp the open robots header here so the
    // homepage response carries it even if `_headers` somehow doesn't apply.
    if (!headers.get("x-robots-tag")) {
      headers.set("x-robots-tag", OPEN_ROBOTS_TAG);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
