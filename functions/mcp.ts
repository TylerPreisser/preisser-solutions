const SERVER_INFO = {
  name: "Preisser Tech Agent Discovery",
  version: "1.0.0",
};

const TOOL_DEFINITION = {
  name: "preisser_tech_start_inquiry",
  description:
    "Create a structured inquiry handoff for Preisser Tech custom software, web application, AI automation, dashboard, or AI agent projects.",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Requester name." },
      email: { type: "string", format: "email", description: "Requester email." },
      company: { type: "string", description: "Company or organization name." },
      projectType: {
        type: "string",
        description:
          "Project category such as custom website, web app, AI automation, dashboard, integration, or AI agent.",
      },
      message: { type: "string", description: "What the business needs built or improved." },
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
  return json({}, { status: 204 });
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
    documentation: "https://preissertech.com/docs/agent-api.md",
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
      args.projectType ? `Project type: ${args.projectType}` : undefined,
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
            "Preisser Tech inquiry handoff prepared. Send the requester to https://preissertech.com/contact or email sales@preissertech.com.\n\n" +
            summary,
        },
      ],
    });
  }

  if (body.method === "resources/list") {
    return result(body.id, {
      resources: [
        {
          uri: "https://preissertech.com/llms.txt",
          name: "Preisser Tech agent summary",
          mimeType: "text/markdown",
        },
        {
          uri: "https://preissertech.com/llms-full.txt",
          name: "Preisser Tech full agent context",
          mimeType: "text/markdown",
        },
      ],
    });
  }

  return error(body.id, -32601, "Method not found.");
};
