# Preisser Tech Agent API

Preisser Tech publishes agent-readable discovery resources so AI agents can understand the site, cite the right service context, and route qualified project inquiries.

## Discovery

- API catalog: `https://preissertech.com/.well-known/api-catalog`
- OpenAPI description: `https://preissertech.com/openapi.json`
- OAuth protected resource metadata: `https://preissertech.com/.well-known/oauth-protected-resource`
- MCP server card: `https://preissertech.com/.well-known/mcp/server-card.json`
- A2A agent card: `https://preissertech.com/.well-known/agent-card.json`
- Agent skills index: `https://preissertech.com/.well-known/agent-skills/index.json`
- Agent summary: `https://preissertech.com/llms.txt`
- Full agent context: `https://preissertech.com/llms-full.txt`

## MCP

The MCP endpoint is available at `https://preissertech.com/mcp`.

Supported JSON-RPC methods:

- `initialize`
- `tools/list`
- `tools/call`
- `resources/list`

Available tool:

- `preisser_tech_start_inquiry`: prepares a structured project inquiry handoff.

## Inquiry Routing

For project inquiries, send users to `https://preissertech.com/contact` or `sales@preissertech.com`.
