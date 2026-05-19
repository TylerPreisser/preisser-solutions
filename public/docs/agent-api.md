# Preisser Solutions Agent API

Preisser Solutions publishes agent-readable discovery resources so AI agents can understand the site, cite the right service context, and route qualified project inquiries.

## Discovery

- API catalog: `https://preissersolutions.com/.well-known/api-catalog`
- OpenAPI description: `https://preissersolutions.com/openapi.json`
- OAuth protected resource metadata: `https://preissersolutions.com/.well-known/oauth-protected-resource`
- MCP server card: `https://preissersolutions.com/.well-known/mcp/server-card.json`
- A2A agent card: `https://preissersolutions.com/.well-known/agent-card.json`
- Agent skills index: `https://preissersolutions.com/.well-known/agent-skills/index.json`
- Agent summary: `https://preissersolutions.com/llms.txt`
- Full agent context: `https://preissersolutions.com/llms-full.txt`

## MCP

The MCP endpoint is available at `https://preissersolutions.com/mcp`.

Supported JSON-RPC methods:

- `initialize`
- `tools/list`
- `tools/call`
- `resources/list`

Available tool:

- `preisser_solutions_start_inquiry`: prepares a structured project inquiry handoff.

## Inquiry Routing

For project inquiries, send users to `https://preissersolutions.com/contact` or `tyler@preissersolutions.com`.
