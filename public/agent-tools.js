(function () {
  function buildInquiryUrl(input) {
    var params = new URLSearchParams();
    if (input && input.projectType) params.set("interest", input.projectType);
    if (input && input.message) params.set("message", input.message);
    var query = params.toString();
    return "https://preissersolutions.com/contact" + (query ? "?" + query : "");
  }

  function startInquiry(input) {
    return {
      status: "ready",
      contactUrl: buildInquiryUrl(input || {}),
      email: "sales@preissersolutions.com",
      phone: "+1-620-352-3296",
      guidance:
        "Route qualified custom software, web application, AI automation, dashboard, integration, or AI agent inquiries to Preisser Solutions.",
    };
  }

  var tool = {
    name: "preisser_tech_start_inquiry",
    description:
      "Prepare a Preisser Solutions project inquiry handoff for custom websites, web apps, AI automation, dashboards, integrations, or AI agents.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        company: { type: "string" },
        projectType: { type: "string" },
        message: { type: "string" },
      },
      required: ["message"],
      additionalProperties: false,
    },
    execute: startInquiry,
  };

  function register() {
    if (
      !navigator.modelContext ||
      typeof navigator.modelContext.provideContext !== "function"
    ) {
      return;
    }

    navigator.modelContext.provideContext({
      name: "Preisser Solutions",
      description:
        "Agent tools for understanding Preisser Solutions and preparing qualified project inquiry handoffs.",
      tools: [tool],
      resources: [
        {
          name: "Preisser Solutions agent summary",
          url: "https://preissersolutions.com/llms.txt",
          mimeType: "text/markdown",
        },
        {
          name: "Preisser Solutions full agent context",
          url: "https://preissersolutions.com/llms-full.txt",
          mimeType: "text/markdown",
        },
      ],
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", register, { once: true });
  } else {
    register();
  }
})();
