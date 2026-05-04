const CANONICAL_HOST = "preissertech.com";

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

function buildDestination(url: URL) {
  const destination = new URL(url.toString());
  destination.protocol = "https:";
  destination.hostname = CANONICAL_HOST;
  destination.pathname = LEGACY_PATH_REDIRECTS.get(url.pathname) ?? url.pathname;
  return destination;
}

export default {
  fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/robots.txt") {
      return new Response(LEGACY_ROBOTS_TXT, {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      });
    }

    const destination = buildDestination(url);
    return Response.redirect(destination.toString(), 301);
  },
};
