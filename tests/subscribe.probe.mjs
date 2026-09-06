/**
 * Probe for functions/api/subscribe.ts.
 *
 * Imports the REAL exported handler and replaces globalThis.fetch with a
 * recorder, so the exact outbound Resend request is captured and NOTHING
 * leaves this machine. No mock of the handler itself — the code under test is
 * the code that ships.
 */
import assert from "node:assert/strict";

// Resolved relative to THIS file, so the suite runs from any checkout, on any
// machine, from any working directory. import.meta.url is already
// percent-encoded, so a repo path containing spaces survives intact.
const MODULE = new URL("../functions/api/subscribe.ts", import.meta.url);
const { onRequest } = await import(MODULE.href);

const ENV = {
  RESEND_API_KEY: "re_TEST_KEY_NOT_REAL",
  CONTACT_FROM: "Preisser Solutions <website@preissersolutions.com>",
  CONTACT_TO: "tyler@preissersolutions.com",
};

let captured = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  captured.push({ url: String(url), init });
  return new Response(JSON.stringify({ id: "fake-id" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
process.on("exit", () => {
  globalThis.fetch = realFetch;
});

/** Makes the outbound stub fail in a specific way for one call. */
function failWith(mode) {
  globalThis.fetch = async (url, init) => {
    captured.push({ url: String(url), init });
    if (mode === "throw") throw new TypeError("network unreachable");
    return new Response("Resend says: domain not verified for acct_12345", {
      status: 403,
    });
  };
}
function restoreOk() {
  globalThis.fetch = async (url, init) => {
    captured.push({ url: String(url), init });
    return new Response(JSON.stringify({ id: "fake-id" }), { status: 200 });
  };
}

function post(
  body,
  {
    ip = "203.0.113.1",
    method = "POST",
    raw = null,
    url = "https://preissersolutions.com/api/subscribe",
    // Omitted by DEFAULT, and every pre-existing case below relies on that:
    // a non-browser caller sends no Origin, and the endpoint must still serve
    // it. Only a MISMATCHED origin is refused. See isCrossSite() in the source.
    origin = null,
    secFetchSite = null,
  } = {}
) {
  const payload = raw !== null ? raw : JSON.stringify(body);
  return new Request(url, {
    method,
    headers: {
      "content-type": "application/json",
      "cf-connecting-ip": ip,
      "content-length": String(new TextEncoder().encode(payload).length),
      ...(origin === null ? {} : { origin }),
      ...(secFetchSite === null ? {} : { "sec-fetch-site": secFetchSite }),
    },
    ...(method === "GET" ? {} : { body: payload }),
  });
}

const call = (request) => onRequest({ request, env: ENV });

let pass = 0;
let fail = 0;
async function check(name, fn) {
  captured = [];
  try {
    await fn();
    pass += 1;
    console.log(`  PASS  ${name}`);
  } catch (error) {
    fail += 1;
    console.log(`  FAIL  ${name}\n        ${error.message}`);
  }
}

console.log("\n=== SUCCESS PATH — captured outbound Resend request ===");
await check("valid address -> 200 {ok:true} and exactly one outbound call", async () => {
  const res = await call(post({ email: "jane.doe+news@example.com" }, { ip: "203.0.113.10" }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(captured.length, 1, `expected 1 outbound call, got ${captured.length}`);
  assert.equal(captured[0].url, "https://api.resend.com/emails");

  const sent = JSON.parse(captured[0].init.body);
  console.log("\n--- CAPTURED PAYLOAD (POST https://api.resend.com/emails) ---");
  console.log(JSON.stringify(sent, null, 2));
  console.log("--- authorization header sent: " +
    JSON.stringify(captured[0].init.headers.authorization) + " ---\n");

  assert.deepEqual(sent.to, ["tyler@preissersolutions.com"], "recipient must be the owner");
  assert.equal(sent.from, ENV.CONTACT_FROM);
  assert.equal(sent.reply_to, "jane.doe+news@example.com");
  assert.equal(sent.subject, "New newsletter subscriber");
  assert.match(sent.text, /jane\.doe\+news@example\.com/, "subscriber address must be in the body");
  assert.match(sent.html, /jane\.doe\+news@example\.com/);
});

console.log("=== MALFORMED / EMPTY INPUT ===");
await check("malformed JSON -> 400, no send", async () => {
  const res = await call(post(null, { ip: "203.0.113.11", raw: "{not json" }));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, "Malformed request.");
  assert.equal(captured.length, 0);
});
await check("empty submit -> 400, no send", async () => {
  const res = await call(post({ email: "" }, { ip: "203.0.113.12" }));
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /enter your email/i);
  assert.equal(captured.length, 0);
});
await check("missing email key -> 400, no send", async () => {
  const res = await call(post({}, { ip: "203.0.113.13" }));
  assert.equal(res.status, 400);
  assert.equal(captured.length, 0);
});
await check("garbage address -> 400, no send", async () => {
  const res = await call(post({ email: "not-an-email" }, { ip: "203.0.113.14" }));
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /valid email/i);
  assert.equal(captured.length, 0);
});
await check("JSON array body -> 400, no send", async () => {
  const res = await call(post(null, { ip: "203.0.113.15", raw: '["a"]' }));
  assert.equal(res.status, 400);
  assert.equal(captured.length, 0);
});

console.log("\n=== HEADER INJECTION VIA THE ADDRESS FIELD ===");
const injections = [
  ["CRLF + Bcc", "victim@example.com\r\nBcc: attacker@evil.com"],
  ["bare LF + Bcc", "victim@example.com\nBcc: attacker@evil.com"],
  ["encoded CRLF", "victim@example.com%0d%0aBcc:attacker@evil.com"],
  ["comma second recipient", "victim@example.com,attacker@evil.com"],
  ["semicolon second recipient", "victim@example.com;attacker@evil.com"],
  ["angle-bracket display name", "Bob <attacker@evil.com>"],
  ["quoted local part with space", '"victim attacker"@evil.com'],
  ["NUL byte", "victim@example.com\u0000Bcc: attacker@evil.com"],
  ["backslash escape", "victim\\@example.com@evil.com"],
];
let injIp = 100;
for (const [label, address] of injections) {
  injIp += 1;
  await check(`rejects ${label} -> 400, no send`, async () => {
    const res = await call(post({ email: address }, { ip: `198.51.100.${injIp}` }));
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(address)}`);
    assert.equal(captured.length, 0, "NOTHING may be sent for an injection attempt");
  });
}

console.log("\n=== OPEN-RELAY SHAPE: can the caller steer recipient/subject/body? ===");
await check("attacker-supplied to/from/subject/html are ignored", async () => {
  const res = await call(
    post(
      {
        email: "real@example.com",
        to: ["victim@elsewhere.test"],
        from: "spoof@evil.com",
        subject: "Spoofed subject",
        html: "<b>attacker body</b>",
        text: "attacker body",
        reply_to: "attacker@evil.com",
      },
      { ip: "198.51.100.20" }
    )
  );
  assert.equal(res.status, 200);
  const sent = JSON.parse(captured[0].init.body);
  assert.deepEqual(sent.to, ["tyler@preissersolutions.com"], "recipient must NOT be steerable");
  assert.equal(sent.from, ENV.CONTACT_FROM, "sender must NOT be steerable");
  assert.equal(sent.subject, "New newsletter subscriber", "subject must NOT be steerable");
  assert.equal(sent.reply_to, "real@example.com", "reply_to must be the validated address only");
  assert.doesNotMatch(sent.html, /attacker body/, "body must NOT be steerable");
  assert.doesNotMatch(sent.text, /attacker body/);
});
await check("HTML in the address cannot reach the inbox unescaped", async () => {
  // This address is rejected outright by the grammar; assert it never sends.
  const res = await call(
    post({ email: "<img src=x onerror=alert(1)>@evil.com" }, { ip: "198.51.100.21" })
  );
  assert.equal(res.status, 400);
  assert.equal(captured.length, 0);
});

console.log("\n=== ABUSE PROTECTION ===");
await check("body over 2 KiB -> 413, no send", async () => {
  const big = JSON.stringify({ email: "a@b.com", pad: "x".repeat(4000) });
  const res = await call(post(null, { ip: "198.51.100.30", raw: big }));
  assert.equal(res.status, 413);
  assert.equal(captured.length, 0);
});
await check("address over 320 chars -> 400, no send", async () => {
  const res = await call(
    post({ email: "a".repeat(400) + "@example.com" }, { ip: "198.51.100.31" })
  );
  assert.equal(res.status, 400);
  assert.equal(captured.length, 0);
});
await check("honeypot filled -> 200 ok but NO send", async () => {
  const res = await call(
    post({ email: "bot@example.com", website: "http://spam" }, { ip: "198.51.100.32" })
  );
  assert.equal(res.status, 200);
  assert.equal(captured.length, 0, "honeypot must not trigger an email");
});
await check("double-click: 2 identical posts -> 1 email, 2nd flagged duplicate", async () => {
  const ip = "198.51.100.40";
  const first = await call(post({ email: "dupe@example.com" }, { ip }));
  const second = await call(post({ email: "DUPE@example.com" }, { ip }));
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.deepEqual(await second.json(), { ok: true, duplicate: true });
  assert.equal(captured.length, 1, `double-click must send once, sent ${captured.length}`);
});
await check("6th signup from one IP inside the window -> 429 + retry-after", async () => {
  const ip = "198.51.100.50";
  const codes = [];
  for (let i = 0; i < 6; i += 1) {
    const res = await call(post({ email: `flood${i}@example.com` }, { ip }));
    codes.push(res.status);
    if (res.status === 429) {
      assert.equal(res.headers.get("retry-after"), "600");
      assert.match((await res.json()).error, /too many/i);
    }
  }
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429], `got ${codes}`);
  assert.equal(captured.length, 5, `only 5 may send, sent ${captured.length}`);
});

console.log("\n=== FAILURE PATHS (visitor must NOT be told it worked) ===");
await check("RESEND_API_KEY unset -> 503 {ok:false}, no send", async () => {
  const res = await onRequest({
    request: post({ email: "nokey@example.com" }, { ip: "198.51.100.60" }),
    env: { CONTACT_FROM: ENV.CONTACT_FROM, CONTACT_TO: ENV.CONTACT_TO },
  });
  assert.equal(res.status, 503);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.equal(captured.length, 0);
});
await check("Resend rejects (403) -> 502 {ok:false}, provider detail NOT leaked", async () => {
  failWith("reject");
  const res = await call(post({ email: "rejected@example.com" }, { ip: "198.51.100.61" }));
  restoreOk();
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.doesNotMatch(JSON.stringify(body), /acct_12345/, "must not leak account detail");
});
await check("network throw -> 502 {ok:false}", async () => {
  failWith("throw");
  const res = await call(post({ email: "netfail@example.com" }, { ip: "198.51.100.62" }));
  restoreOk();
  assert.equal(res.status, 502);
  assert.equal((await res.json()).ok, false);
});
await check("GET -> 405, no send", async () => {
  const res = await call(post(null, { ip: "198.51.100.63", method: "GET", raw: "" }));
  assert.equal(res.status, 405);
  assert.equal(captured.length, 0);
});
await check("responses are never cached", async () => {
  const res = await call(post({ email: "cachecheck@example.com" }, { ip: "198.51.100.64" }));
  assert.equal(res.headers.get("cache-control"), "no-store");
});

console.log("\n=== SAME-ORIGIN ENFORCEMENT ===");
// A hostile page can POST here with a plain form (enctype="text/plain", no
// preflight) and make every one of ITS visitors spend THEIR OWN per-IP quota,
// emptying the primary defence while leaving it looking intact.
await check("same-origin POST (apex) -> 200 and sends", async () => {
  const res = await call(
    post({ email: "apexorigin@example.com" }, {
      ip: "198.51.100.70",
      origin: "https://preissersolutions.com",
      secFetchSite: "same-origin",
    })
  );
  assert.equal(res.status, 200);
  assert.equal(captured.length, 1, "a legitimate apex submission must still send");
});
await check("same-origin POST on www -> 200 and sends (host redirect exempts /api/)", async () => {
  const res = await call(
    post({ email: "wwworigin@example.com" }, {
      ip: "198.51.100.71",
      url: "https://www.preissersolutions.com/api/subscribe",
      origin: "https://www.preissersolutions.com",
      secFetchSite: "same-origin",
    })
  );
  assert.equal(res.status, 200);
  assert.equal(captured.length, 1);
});
await check("Pages preview deployment origin -> 200 and sends", async () => {
  const res = await call(
    post({ email: "preview@example.com" }, {
      ip: "198.51.100.72",
      url: "https://a1b2c3d4.preisser-solutions.pages.dev/api/subscribe",
      origin: "https://a1b2c3d4.preisser-solutions.pages.dev",
    })
  );
  assert.equal(res.status, 200);
  assert.equal(captured.length, 1);
});
await check("cross-site origin -> 403, no send", async () => {
  const res = await call(
    post({ email: "csrf@example.com" }, {
      ip: "198.51.100.73",
      origin: "https://evil.example",
      secFetchSite: "cross-site",
    })
  );
  assert.equal(res.status, 403);
  assert.equal((await res.json()).ok, false);
  assert.equal(captured.length, 0, "a forged cross-site post must never send");
});
await check("cross-site origin WITHOUT Sec-Fetch-Site -> 403, no send", async () => {
  const res = await call(
    post({ email: "csrf2@example.com" }, { ip: "198.51.100.74", origin: "https://evil.example" })
  );
  assert.equal(res.status, 403);
  assert.equal(captured.length, 0);
});
await check("Sec-Fetch-Site: cross-site alone -> 403, no send", async () => {
  const res = await call(
    post({ email: "csrf3@example.com" }, { ip: "198.51.100.75", secFetchSite: "cross-site" })
  );
  assert.equal(res.status, 403);
  assert.equal(captured.length, 0);
});
await check("Origin: null (sandboxed iframe) -> 403, no send", async () => {
  const res = await call(
    post({ email: "csrf4@example.com" }, { ip: "198.51.100.76", origin: "null" })
  );
  assert.equal(res.status, 403);
  assert.equal(captured.length, 0);
});
await check("look-alike host evil-preisser-solutions.pages.dev -> 403, no send", async () => {
  // The suffix match requires a leading dot; this string ends in
  // "-solutions.pages.dev", so it must NOT be treated as one of ours.
  const res = await call(
    post({ email: "csrf5@example.com" }, {
      ip: "198.51.100.77",
      origin: "https://evil-preisser-solutions.pages.dev",
    })
  );
  assert.equal(res.status, 403);
  assert.equal(captured.length, 0);
});
await check("a refused cross-site post costs the victim NO per-IP quota", async () => {
  // This is the property the whole control exists for. If the origin check ran
  // after the limiter, ten forged posts would leave the victim with zero
  // budget and their real signup would be refused from their own address.
  const ip = "198.51.100.80";
  for (let i = 0; i < 10; i += 1) {
    const res = await call(
      post({ email: `forged${i}@example.com` }, { ip, origin: "https://evil.example" })
    );
    assert.equal(res.status, 403);
  }
  captured = [];
  const codes = [];
  for (let i = 0; i < 5; i += 1) {
    const res = await call(post({ email: `victim${i}@example.com` }, { ip }));
    codes.push(res.status);
  }
  assert.deepEqual(codes, [200, 200, 200, 200, 200], `victim was throttled by the forgery: ${codes}`);
  assert.equal(captured.length, 5);
});

console.log("\n=== GLOBAL BUDGET COUNTS SENDS, NOT REQUESTS ===");
await check("100 honeypot hits do not exhaust the global budget", async () => {
  // GLOBAL_LIMIT is 100 and the window is 10 minutes. When it counted REQUESTS,
  // ~20 IPs making their 5 allowed requests each -- honeypot hits, typos,
  // malformed bodies, none of which send anything -- locked the isolate out for
  // the full window and every genuine signup behind them got 429. The budget
  // caps outbound MAIL, so only outbound mail may spend it.
  for (let block = 0; block < 25; block += 1) {
    for (let i = 0; i < 4; i += 1) {
      const res = await call(
        post({ email: `bot${block}_${i}@example.com`, website: "http://spam" }, {
          ip: `192.0.2.${block + 1}`,
        })
      );
      assert.equal(res.status, 200, "honeypot answers 200 so the bot does not adapt");
    }
  }
  assert.equal(captured.length, 0, "100 honeypot hits must send nothing");
  const res = await call(post({ email: "genuine-after-bots@example.com" }, { ip: "192.0.2.200" }));
  assert.equal(
    res.status,
    200,
    "a real signup after 100 non-sending requests must NOT be rate limited"
  );
  assert.equal(captured.length, 1, "the genuine signup must actually send");
});

console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail === 0 ? 0 : 1);
