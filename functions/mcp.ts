const SERVER_INFO = {
  name: "Preisser Solutions Agent Discovery",
  version: "1.0.0",
};

const TOOL_DEFINITION = {
  name: "preisser_solutions_start_inquiry",
  description:
    "Create a structured inquiry handoff for Preisser Solutions Hays Visibility Audit, local SEO, Google Business Profile, Google Ads, web design, review, lead tracking, or AI follow-up work.",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Requester name." },
      email: { type: "string", format: "email", description: "Requester email." },
      company: { type: "string", description: "Company or organization name." },
      projectType: {
        type: "string",
        description:
          "Need category such as Hays Visibility Audit, local SEO, Google Business Profile, Google Ads, web design, review system, lead tracking, social media marketing, or AI automation.",
      },
      message: { type: "string", description: "What the business needs reviewed, improved, built, tracked, or automated." },
    },
    required: ["message"],
    additionalProperties: false,
  },
};

type PagesFunctionContext = {
  request: Request;
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type, mcp-session-id",
      ...init.headers,
    },
  });
}

function result(id: unknown, payload: unknown) {
  return json({
    jsonrpc: "2.0",
    id,
    result: payload,
  });
}

function error(id: unknown, code: number, message: string) {
  return json({
    jsonrpc: "2.0",
    id,
    error: { code, message },
  });
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type, mcp-session-id",
    },
  });
};

export const onRequestGet = async () => {
  return json({
    serverInfo: SERVER_INFO,
    protocolVersion: "2025-06-18",
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
    },
    tools: [TOOL_DEFINITION],
    documentation: "https://preissersolutions.com/docs/agent-api.md",
  });
};

export const onRequestPost = async (context: PagesFunctionContext) => {
  let body: { id?: unknown; method?: string; params?: Record<string, unknown> };

  try {
    body = await context.request.json();
  } catch {
    return error(null, -32700, "Invalid JSON-RPC request.");
  }

  if (body.method === "initialize") {
    return result(body.id, {
      protocolVersion: "2025-06-18",
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
      },
      serverInfo: SERVER_INFO,
    });
  }

  if (body.method === "tools/list") {
    return result(body.id, { tools: [TOOL_DEFINITION] });
  }

  if (body.method === "tools/call") {
    const params = body.params || {};
    if (params.name !== TOOL_DEFINITION.name) {
      return error(body.id, -32602, "Unknown tool name.");
    }

    const args = (params.arguments || {}) as Record<string, string>;
    const summary = [
      args.projectType ? `Need: ${args.projectType}` : undefined,
      args.company ? `Company: ${args.company}` : undefined,
      args.name ? `Contact: ${args.name}` : undefined,
      args.email ? `Email: ${args.email}` : undefined,
      args.message ? `Message: ${args.message}` : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    return result(body.id, {
      content: [
        {
          type: "text",
          text:
            "Preisser Solutions inquiry handoff prepared. Send the requester to https://preissersolutions.com/contact?offer=hays-visibility-audit or email sales@preissersolutions.com.\n\n" +
            summary,
        },
      ],
    });
  }

  if (body.method === "resources/list") {
    return result(body.id, {
      resources: [
        {
          uri: "https://preissersolutions.com/llms.txt",
          name: "Preisser Solutions agent summary",
          mimeType: "text/markdown",
        },
        {
          uri: "https://preissersolutions.com/llms-full.txt",
          name: "Preisser Solutions full agent context",
          mimeType: "text/markdown",
        },
      ],
    });
  }

  return error(body.id, -32601, "Method not found.");
};
