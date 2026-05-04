const CANONICAL_HOST = "preissertech.com";
const LEGACY_HOSTS = new Set(["preissersolutions.com", "www.preissersolutions.com"]);
const DUPLICATE_HOSTS = new Set(["www.preissertech.com", "preisser-solutions.pages.dev"]);
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

Sitemap: https://preissertech.com/sitemap.xml
`;

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
  next: () => Promise<Response>;
};

export const onRequest = async (context: MiddlewareContext) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  if (LEGACY_HOSTS.has(host)) {
    if (url.pathname === "/robots.txt") {
      return new Response(LEGACY_ROBOTS_TXT, {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      });
    }

    const mappedPath = LEGACY_PATH_REDIRECTS.get(url.pathname);
    if (mappedPath) {
      return redirectToCanonicalPath(url, mappedPath);
    }

    return redirectToCanonical(url);
  }

  if (DUPLICATE_HOSTS.has(host)) {
    return redirectToCanonical(url);
  }

  return context.next();
};
