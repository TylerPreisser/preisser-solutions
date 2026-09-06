/**
 * POST /api/subscribe — the footer "Stay up to date" signup endpoint.
 *
 * The footer previously handed off to `mailto:` and then called
 * `setSubscribed(true)` unconditionally on the very next line, so the visitor
 * was told "Thanks for subscribing." whether or not their mail client existed,
 * opened, or sent anything. On a machine with no registered mail handler the
 * address was simply lost and nobody — visitor or owner — ever knew.
 *
 * This is the same shape as `functions/api/contact.ts`: a Cloudflare Pages
 * Function, because the site is `output: "export"` (next.config.ts:6) and has
 * no Next.js route handlers at runtime. No SDK — `fetch` is already in the
 * runtime and the `resend` package would only wrap one HTTP call.
 *
 * It reuses the contact form's provisioning verbatim: RESEND_API_KEY (encrypted
 * Pages secret), CONTACT_FROM and CONTACT_TO ([vars] in wrangler.toml). No new
 * configuration is introduced.
 *
 * SECURITY NOTE — this endpoint deliberately does NOT inherit the whole of
 * /api/contact's posture. That endpoint has no rate limiting, and copying it
 * unchanged would have opened a second unthrottled public send path. See
 * `rateLimit()` below.
 */

interface Env {
  /** Encrypted Pages secret. Set with `wrangler pages secret put RESEND_API_KEY`. */
  RESEND_API_KEY?: string;
  /** Sender identity. Shared with the contact form; see wrangler.toml. */
  CONTACT_FROM?: string;
  /** Destination inbox. Shared with the contact form; see wrangler.toml. */
  CONTACT_TO?: string;
}

type PagesContext = {
  request: Request;
  env: Env;
};

const DEFAULT_FROM = "Preisser Solutions <onboarding@resend.dev>";
const DEFAULT_TO = "tyler@preissersolutions.com";

/** RFC-5321 maximum for a full address. Anything longer is not an address. */
const MAX_EMAIL_LENGTH = 320;

/**
 * Hard cap on the raw request body. The only legitimate payload here is one
 * address and a honeypot — a couple of hundred bytes. 2 KiB is generous and
 * still refuses to buffer an attacker's megabyte.
 */
const MAX_BODY_BYTES = 2048;

/**
 * Address grammar. This is NOT the loose `[^\s@]+@[^\s@]+\.[^\s@]{2,}` used on
 * the contact form, and the difference is the security control.
 *
 * The local part is an RFC-5322 dot-atom and the domain is a hostname. That
 * character set contains no CR, no LF, no comma, no semicolon, no angle
 * bracket, no quote and no backslash — i.e. none of the characters that turn a
 * value into extra headers or extra recipients when it reaches a mail system.
 * The address is therefore structurally incapable of carrying an injection
 * before it is ever interpolated anywhere.
 *
 * It is stricter than the contact form on purpose. It rejects the exotic
 * quoted-string local parts ("a b"@example.com) that RFC-5322 permits; those
 * are vanishingly rare in the wild and are exactly the shape that makes header
 * injection possible, so a newsletter signup trades them away without loss.
 * `+` tags, dots, hyphens and underscores — the things people actually use —
 * all pass.
 */
const ATOM = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
const EMAIL_PATTERN = new RegExp(
  `^${ATOM}(?:\\.${ATOM})*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z]{2,63}$`
);

/**
 * Belt-and-braces control-character check. EMAIL_PATTERN already excludes these
 * — this exists so that a future loosening of the pattern cannot silently
 * re-open header injection without also deleting this line.
 */
function hasControlChars(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

/* ── Abuse protection ───────────────────────────────────────────────────────
 *
 * A newsletter signup is a public, unauthenticated path that causes an outbound
 * email. Without a limiter, one script turns it into a mail flood against the
 * owner's inbox and burns the Resend quota.
 *
 * This is an in-isolate sliding window. Be precise about what that does and
 * does not buy, because overstating it is worse than not having it:
 *   - It DOES stop the realistic threat — one source hammering one colo.
 *   - It does NOT coordinate across Cloudflare isolates or colos, and it resets
 *     on cold start. A distributed flood spread across many edge locations
 *     would get more than PER_IP_LIMIT through.
 * Making it global would need a KV or Durable Object binding, which is not
 * provisioned on this project. That is a deliberate, stated limit rather than a
 * silent one; if the endpoint is ever actually attacked, a KV-backed limiter is
 * the upgrade path.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const PER_IP_LIMIT = 5; // REQUESTS per IP per window — throttles the abuser
const GLOBAL_LIMIT = 100; // SEND ATTEMPTS per isolate per window — blast radius cap
/** How long an identical address is treated as already-handled. Absorbs the
 *  double-click and the impatient retry without a second email. */
const DEDUPE_MS = 60 * 1000;

const hits = new Map<string, number[]>();
const recentAddresses = new Map<string, number>();

/** Drops timestamps that have fallen out of the window. Keeps the maps bounded. */
function prune(now: number) {
  for (const [key, times] of hits) {
    const live = times.filter((t) => now - t < WINDOW_MS);
    if (live.length === 0) hits.delete(key);
    else hits.set(key, live);
  }
  for (const [address, at] of recentAddresses) {
    if (now - at >= DEDUPE_MS) recentAddresses.delete(address);
  }
}

/**
 * The two budgets count DIFFERENT things, and the difference is the whole point.
 *
 *   PER_IP  counts REQUESTS. That is correct: the thing being throttled is one
 *           source hammering the endpoint, and the cost of a request is real
 *           whether or not it ends in a send. An abuser must not be able to
 *           make free attempts by deliberately failing validation.
 *
 *   GLOBAL  counts SEND ATTEMPTS. It used to count requests, which inverted it
 *           from an abuse guard into a self-inflicted denial of service: a
 *           honeypot hit, a typo'd address, a malformed body and a duplicate
 *           double-click each burned a unit of a 100-wide budget that no send
 *           had used. About 20 ordinary visitors making their 5 requests each
 *           — none of them abusive, some of them just clumsy — could lock the
 *           isolate out for a full 10-minute window and every genuine signup
 *           behind them got 429. The budget exists to cap the blast radius of
 *           OUTBOUND MAIL, so outbound mail is what it must measure.
 *
 * "Attempt" rather than "confirmed success" is deliberate. A Resend outage
 * returning 502 to every call is exactly when a retry storm is most likely, and
 * counting only confirmed sends would leave the cap wide open through it. The
 * unit of cost is the outbound call, not its outcome.
 */

/** True when this request should be refused. Records the per-IP hit when it should not. */
function rateLimit(ip: string, now: number): boolean {
  prune(now);

  // Read-only. The global budget is spent by recordSendAttempt(), not here.
  const globalTimes = hits.get("*") ?? [];
  if (globalTimes.length >= GLOBAL_LIMIT) return true;

  const ipTimes = hits.get(ip) ?? [];
  if (ipTimes.length >= PER_IP_LIMIT) return true;

  hits.set(ip, [...ipTimes, now]);
  return false;
}

/**
 * Spends one unit of the global budget. Called immediately before the outbound
 * call to Resend and nowhere else — every early return above it (honeypot,
 * invalid address, duplicate, unconfigured key) costs the global budget
 * nothing, which is the fix.
 *
 * `prune()` has already run for this request inside rateLimit(), so reading the
 * live array back out here is correct without pruning again.
 */
function recordSendAttempt(now: number): void {
  hits.set("*", [...(hits.get("*") ?? []), now]);
}

/* ── Same-origin enforcement ────────────────────────────────────────────────
 *
 * Without this, the per-IP limiter — the primary defence — can be turned
 * against the site. A hostile page anywhere on the web can POST here with a
 * plain HTML form using `enctype="text/plain"`, which needs no CORS preflight
 * and which an attacker can shape into a body that parses as our JSON. The
 * attacker never sees the response, so this is not data theft; the damage is
 * that every visitor to the hostile page spends THEIR OWN five-per-window
 * quota, and the real signup form then refuses them from their own address.
 * The limiter stays intact on paper while being emptied in practice.
 *
 * STRICTNESS CHOSEN: reject a MISMATCHED Origin; ALLOW a MISSING one.
 *
 * Requiring an Origin outright was considered and rejected, on the evidence
 * rather than on preference:
 *   - Every browser sends `Origin` on POST, including on a cross-site form
 *     submission and including with `enctype="text/plain"`. The attack this
 *     control exists to stop therefore ALWAYS carries the header, so refusing
 *     mismatches closes it completely. A mandatory-Origin rule would add no
 *     security over that.
 *   - Non-browser clients — curl, a native app, a server-to-server integration,
 *     and the probes in tests/subscribe.probe.mjs, which call the exported
 *     onRequest with a synthetic Request carrying no Origin — legitimately send
 *     none. Refusing those breaks real callers to buy nothing.
 * So a missing Origin is not evidence of an attack, and a wrong one is.
 *
 * `Sec-Fetch-Site: cross-site` is checked as an independent second signal. It
 * is set by the browser and unforgeable by page script (it is a forbidden
 * header name), so it catches a cross-site post even if Origin were ever
 * absent. Same tolerance rule: absent is fine, `cross-site` is not.
 */
const KNOWN_SITE_HOSTS = new Set([
  "preissersolutions.com",
  "www.preissersolutions.com",
  "preisser-solutions.pages.dev",
  // Local development (`next dev`, `wrangler pages dev`), any port.
  "localhost",
  "127.0.0.1",
]);

function isAllowedOrigin(origin: string, requestUrl: string): boolean {
  let originHost: string;
  try {
    originHost = new URL(origin).hostname.toLowerCase();
  } catch {
    // `Origin: null` (sandboxed iframe, some redirects) or an unparseable
    // value. Not a host we can vouch for, so it is not same-origin.
    return false;
  }

  // The real same-origin test, and the one that carries the weight: the page
  // that posted must be on the host that served this request. This needs no
  // list to maintain and covers the apex, www, pages.dev, and every Pages
  // preview deployment automatically.
  try {
    if (originHost === new URL(requestUrl).hostname.toLowerCase()) return true;
  } catch {
    // Unparseable request URL should be impossible; fall through to the list.
  }

  // Belt and braces. If a proxy layer ever rewrote the host in `request.url`,
  // the check above would start refusing legitimate submissions from our own
  // form — a silent outage of the exact kind this endpoint was built to end.
  if (KNOWN_SITE_HOSTS.has(originHost)) return true;

  // Cloudflare Pages preview deployments: <hash>.preisser-solutions.pages.dev.
  // A leading dot is required, so `evil-preisser-solutions.pages.dev` does not
  // match — that string ends in "-solutions.pages.dev", not ".preisser-...".
  return originHost.endsWith(".preisser-solutions.pages.dev");
}

/** True when this request came from somewhere that is not us. */
function isCrossSite(request: Request): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite.toLowerCase() === "cross-site") return true;

  const origin = request.headers.get("origin");
  if (!origin) return false; // Non-browser client. See the note above.

  return !isAllowedOrigin(origin, request.url);
}

function json(body: unknown, status: number, extraHeaders?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Never let a signup response sit in a cache.
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

/**
 * Escapes text before it is interpolated into the notification's HTML body.
 * Without this, someone could put markup in the field and have it render as
 * live HTML inside the inbox that reads it.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strips CR/LF from anything that lands in a header-like field. Resend takes
 * JSON rather than raw SMTP, and EMAIL_PATTERN already refuses these bytes, so
 * this is the third independent layer rather than the load-bearing one.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const handlePost = async (context: PagesContext) => {
  const { request, env } = context;
  const now = Date.now();

  // FIRST, before the limiter. A cross-site forgery must not be able to spend
  // the victim's per-IP quota on its way to being refused — that is the exact
  // damage this check exists to prevent, so refusing after the limiter had
  // already charged them would leave the hole open. Costs no state and no I/O.
  if (isCrossSite(request)) {
    console.warn(
      `[subscribe] cross-site POST refused (origin=${JSON.stringify(
        request.headers.get("origin")
      )} sec-fetch-site=${JSON.stringify(request.headers.get("sec-fetch-site"))})`
    );
    return json({ ok: false, error: "This request did not come from our site." }, 403);
  }

  // Cheapest possible rejection of an oversized body: refuse on the declared
  // length before reading a single byte of it.
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (rateLimit(ip, now)) {
    console.warn(`[subscribe] rate limited ${ip}`);
    return json(
      { ok: false, error: "Too many signups from this connection. Please try again later." },
      429,
      { "retry-after": String(Math.ceil(WINDOW_MS / 1000)) }
    );
  }

  // Read as text so an undeclared oversized body is still caught. `content-length`
  // is a claim by the client, not a fact.
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Request too large." }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot. A real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and does not retry or adapt.
  // The client refuses to post a filled honeypot at all and shows the visitor a
  // real route to us, so a human who somehow trips it is never told a lie.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().slice(0, MAX_EMAIL_LENGTH) : "";

  // Server-side validation. The client validates too, for immediate feedback —
  // but the client is not a trust boundary and can be bypassed entirely.
  if (!email) {
    return json({ ok: false, error: "Please enter your email address." }, 400);
  }
  if (hasControlChars(email) || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "That doesn't look like a valid email address." }, 400);
  }

  // Double-click and impatient-retry absorber. The address already went out
  // moments ago; report success rather than sending a duplicate.
  const key = email.toLowerCase();
  const seenAt = recentAddresses.get(key);
  if (seenAt !== undefined && now - seenAt < DEDUPE_MS) {
    return json({ ok: true, duplicate: true }, 200);
  }

  if (!env.RESEND_API_KEY) {
    // Configuration fault, not the visitor's. Say so plainly rather than
    // rendering a success state over a send that never happened.
    console.error("[subscribe] RESEND_API_KEY is not set on this environment");
    return json({ ok: false, error: "Signup is not configured." }, 503);
  }

  const safeEmail = singleLine(email);

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#0A1628">
      <h2 style="margin:0 0 16px;font-size:18px">New newsletter subscriber</h2>
      <p style="margin:0 0 8px">Someone signed up from the footer of preissersolutions.com.</p>
      <p style="margin:0 0 20px;font-size:17px"><strong>${escapeHtml(safeEmail)}</strong></p>
      <p style="margin:0;color:#697386;font-size:13px">
        Reply directly to this email to reach them.
      </p>
    </div>
  `;

  const text = [
    "New newsletter subscriber",
    "",
    `Email: ${safeEmail}`,
    "",
    "-- from the footer signup on preissersolutions.com",
  ].join("\n");

  // The global budget is spent HERE — on the outbound call itself — and not on
  // any of the paths above that returned without one. See recordSendAttempt().
  recordSendAttempt(now);

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // `from` and `to` come from configuration ONLY. Nothing the caller sends
        // can influence either, so this cannot be driven as an open relay: the
        // single recipient is always the owner's own inbox.
        from: env.CONTACT_FROM || DEFAULT_FROM,
        to: [env.CONTACT_TO || DEFAULT_TO],
        // The one attacker-influenced value that reaches a header. It has passed
        // EMAIL_PATTERN (no CR/LF/comma/semicolon/quote/angle-bracket possible),
        // the control-character check, and singleLine().
        reply_to: safeEmail,
        // Constant. The caller controls no part of the subject, so there is no
        // subject-line injection surface at all.
        subject: "New newsletter subscriber",
        html,
        text,
      }),
    });
  } catch (error) {
    console.error("[subscribe] network failure calling Resend", error);
    return json({ ok: false, error: "Could not reach the mail service." }, 502);
  }

  if (!resendResponse.ok) {
    // Log the provider's reason; never return it — it can carry account detail.
    const detail = await resendResponse.text().catch(() => "<unreadable>");
    console.error(`[subscribe] Resend rejected the send (${resendResponse.status}): ${detail}`);
    return json({ ok: false, error: "The signup could not be sent." }, 502);
  }

  // Only recorded once the send is CONFIRMED. Recording it earlier would let a
  // failed send suppress the visitor's retry.
  recentAddresses.set(key, now);

  return json({ ok: true }, 200);
};

/**
 * Single entry point, dispatching on method. Exporting both `onRequest` and
 * `onRequestPost` leaves which one wins up to the runtime's precedence rules —
 * one handler that switches is unambiguous.
 */
export const onRequest = async (context: PagesContext) => {
  if (context.request.method === "POST") {
    return handlePost(context);
  }
  return json({ ok: false, error: "Method not allowed." }, 405);
};
