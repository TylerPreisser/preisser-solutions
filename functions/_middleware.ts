const CANONICAL_HOST = "preissersolutions.com";
const LEGACY_HOSTS = new Set(["preissertech.com", "www.preissertech.com"]);
const DUPLICATE_HOSTS = new Set([
  "www.preissersolutions.com",
  "preisser-solutions.pages.dev",
  "preissersolutions.pages.dev",
]);
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

const CANONICAL_PATH_REDIRECTS = new Map([
  ...LEGACY_PATH_REDIRECTS,
  ["/about-tyler-preisser", "/tyler-preisser"],
  ["/preisser-technology", "/about"],
  ["/services/local-seo", "/services/local-seo-hays-ks"],
  ["/industries/construction", "/industries/contractors"],
  ["/custom-websites", "/services/web-design-hays-ks"],
  ["/premium-web-development-kansas", "/services/web-design-hays-ks"],
  ["/business-automation", "/services/ai-automation-hays-ks"],
  ["/ai-agents", "/services/ai-automation-hays-ks"],
  ["/services/ai-search-optimization", "/services/ai-automation-hays-ks"],
  ["/dashboards-and-analytics", "/services/ai-automation-hays-ks"],
  ["/web-applications", "/services/web-design-hays-ks"],
  ["/case-studies/cassidy-hvac", "/case-studies"],
  ["/case-studies/hg-oil-holdings", "/case-studies"],
  ["/case-studies/iron-and-oak-podcast", "/case-studies"],
  ["/case-studies/wife-supply-co", "/case-studies"],
  ["/preisser-solutions", "/"],
]);

const LEGACY_ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://preissersolutions.com/sitemap.xml
`;

const OPEN_ROBOTS_TXT = `User-agent: *
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

function normalizePath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function getPathRedirect(pathname: string) {
  const normalized = normalizePath(pathname);
  if (normalized.startsWith("/preisser-solutions/")) return "/";
  return CANONICAL_PATH_REDIRECTS.get(normalized);
}

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

export const onRequest = async (context: MiddlewareContext) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (url.pathname === "/robots.txt") {
    return new Response(host === CANONICAL_HOST ? OPEN_ROBOTS_TXT : LEGACY_ROBOTS_TXT, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=300, must-revalidate",
      },
    });
  }

  const mappedPath = getPathRedirect(url.pathname);

  if (LEGACY_HOSTS.has(host) || DUPLICATE_HOSTS.has(host)) {
    return mappedPath ? redirectToCanonicalPath(url, mappedPath) : redirectToCanonical(url);
  }

  if (mappedPath) {
    return redirectToCanonicalPath(url, mappedPath);
  }

  const response = await context.next();

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const headers = new Headers(response.headers);
    if (!headers.get("link")?.includes('rel="api-catalog"')) {
      headers.append("link", AGENT_DISCOVERY_LINKS);
    }
    headers.append("vary", "Accept");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
