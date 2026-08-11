/**
 * POST /api/contact — the contact form's real submission endpoint.
 *
 * The form previously handed off to `mailto:`, which opens the visitor's mail
 * client. That silently fails for anyone reading webmail in a browser with no
 * mail handler registered — a large share of visitors, and no way for us to
 * know it happened. This posts the enquiry server-side and emails it instead.
 *
 * No SDK: the `resend` npm package pulls a dependency into the Worker bundle to
 * wrap one HTTP call. `fetch` is already in the runtime.
 *
 * The client keeps `mailto:` as its fallback for when this endpoint is
 * unreachable, so a failure here degrades to the old behaviour rather than
 * losing the enquiry.
 */

interface Env {
  /** Encrypted Pages secret. Set with `wrangler pages secret put RESEND_API_KEY`. */
  RESEND_API_KEY?: string;
  /**
   * Sender address. Defaults to Resend's shared sender, which only delivers to
   * the Resend account owner — fine while this is a notification to ourselves.
   * Once preissersolutions.com is a verified Resend domain, set this to an
   * address on it and nothing else has to change.
   */
  CONTACT_FROM?: string;
  /** Destination inbox. */
  CONTACT_TO?: string;
}

type PagesContext = {
  request: Request;
  env: Env;
};

const DEFAULT_FROM = "Preisser Solutions <onboarding@resend.dev>";
const DEFAULT_TO = "tyler@preissersolutions.com";

/**
 * Caps every field well above any legitimate answer. The details box is the
 * only one anybody writes prose into; the rest are single-line answers. This is
 * abuse protection, not validation — an over-long field is truncated, never a
 * reason to reject a real enquiry.
 */
const LIMITS = {
  name: 200,
  email: 320, // RFC-5321 maximum for a full address
  phone: 60,
  company: 200,
  need: 200,
  timeline: 100,
  details: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Never let an enquiry response sit in a cache.
      "cache-control": "no-store",
    },
  });
}

/** Trim, coerce to string, and truncate. Anything absent becomes "". */
function clean(value: unknown, field: FieldName): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, LIMITS[field]);
}

/**
 * Escapes text before it is interpolated into the notification's HTML body.
 * Without this, a visitor could put markup into a field and have it render as
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
 * JSON rather than raw SMTP, so this is defence in depth against header
 * injection rather than a live hole.
 */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const handlePost = async (context: PagesContext) => {
  const { request, env } = context;

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot. A real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and does not retry or adapt.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const name = clean(payload.name, "name");
  const email = clean(payload.email, "email");
  const phone = clean(payload.phone, "phone");
  const company = clean(payload.company, "company");
  const need = clean(payload.need, "need");
  const timeline = clean(payload.timeline, "timeline");
  const details = clean(payload.details, "details");

  // Server-side validation. The client validates too, for immediate feedback —
  // but the client is not a trust boundary and can be bypassed entirely.
  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!need) missing.push("need");
  if (!details) missing.push("details");

  if (missing.length > 0) {
    return json({ ok: false, error: "Missing required fields.", fields: missing }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "Invalid email address.", fields: ["email"] }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Configuration fault, not the visitor's. Say so plainly so the client can
    // fall back to mailto rather than telling someone their message was sent.
    console.error("[contact] RESEND_API_KEY is not set on this environment");
    return json({ ok: false, error: "Email is not configured." }, 503);
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ["Needs", need],
    ["Timeline", timeline || "—"],
  ];

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#0A1628">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from preissersolutions.com</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:4px 16px 4px 0;color:#697386;vertical-align:top;white-space:nowrap">${label}</td>
                 <td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td>
               </tr>`
          )
          .join("")}
      </table>
      <div style="padding:16px;background:#F6F9FC;border-radius:8px;border:1px solid #E6EBF1">
        <div style="color:#697386;margin-bottom:8px">Project details</div>
        <div style="white-space:pre-wrap">${escapeHtml(details)}</div>
      </div>
      <p style="margin-top:20px;color:#697386;font-size:13px">
        Reply directly to this email to answer ${escapeHtml(name)}.
      </p>
    </div>
  `;

  const text = [
    "New enquiry from preissersolutions.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project details:",
    details,
  ].join("\n");

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || DEFAULT_FROM,
        to: [env.CONTACT_TO || DEFAULT_TO],
        // Hitting reply in the inbox goes straight to the visitor.
        reply_to: email,
        subject: singleLine(`New enquiry — ${company || name}`),
        html,
        text,
      }),
    });
  } catch (error) {
    console.error("[contact] network failure calling Resend", error);
    return json({ ok: false, error: "Could not reach the mail service." }, 502);
  }

  if (!resendResponse.ok) {
    // Log the provider's reason; never return it — it can carry account detail.
    const detail = await resendResponse.text().catch(() => "<unreadable>");
    console.error(`[contact] Resend rejected the send (${resendResponse.status}): ${detail}`);
    return json({ ok: false, error: "The message could not be sent." }, 502);
  }

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
