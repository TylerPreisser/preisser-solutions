const CANONICAL_HOST = "preissertech.com";
const LEGACY_HOSTS = new Set(["preissersolutions.com", "www.preissersolutions.com"]);
const DUPLICATE_HOSTS = new Set(["www.preissertech.com", "preisser-solutions.pages.dev"]);

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
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    return redirectToCanonical(url, {
      "x-robots-tag": "noindex, nofollow",
    });
  }

  if (DUPLICATE_HOSTS.has(host)) {
    return redirectToCanonical(url);
  }

  return context.next();
};
