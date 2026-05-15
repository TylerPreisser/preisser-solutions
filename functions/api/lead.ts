type LeadRequest = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  website?: string;
  city?: string;
  interest?: string;
  message?: string;
  lead_type?: string;
  event_id?: string;
  attribution?: Record<string, string>;
};

type PagesFunctionContext = {
  request: Request;
  env?: {
    ZAPIER_LEAD_WEBHOOK_URL?: string;
  };
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      ...init.headers,
    },
  });
}

function clean(value: unknown, maxLength = 1200) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
  });
};

export const onRequestPost = async (context: PagesFunctionContext) => {
  let body: LeadRequest;

  try {
    body = await context.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    company: clean(body.company, 180),
    phone: clean(body.phone, 80),
    website: clean(body.website, 240),
    city: clean(body.city, 160),
    interest: clean(body.interest, 160),
    message: clean(body.message, 2000),
    lead_type: clean(body.lead_type, 80) || "website_lead",
    event_id: clean(body.event_id, 120),
    attribution: body.attribution || {},
    submitted_at: new Date().toISOString(),
  };

  if (!lead.name || !lead.email || !lead.company || !lead.city || !lead.message) {
    return json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (!isEmail(lead.email)) {
    return json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  const webhookUrl = context.env?.ZAPIER_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return json(
      { ok: false, error: "Lead webhook is not configured." },
      { status: 503 }
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    return json({ ok: false, error: "Lead delivery failed." }, { status: 502 });
  }

  return json({ ok: true, event_id: lead.event_id });
};
