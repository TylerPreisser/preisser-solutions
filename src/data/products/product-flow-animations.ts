export interface ProductFlowItem {
  label: string;
  detail: string;
}

export interface ProductFlowAnimation {
  badge: string;
  centerLabel: string;
  centerSubcopy: string;
  proof: string;
  inputs: ProductFlowItem[];
  steps: ProductFlowItem[];
  outputs: ProductFlowItem[];
}

export const productFlowAnimations: Record<string, ProductFlowAnimation> = {
  "customer-reactivation-agent": {
    badge: "Revenue recovery flow",
    centerLabel: "Reactivation Agent",
    centerSubcopy: "Scores, writes, routes",
    proof: "Turns dormant customers into warm replies and booked appointments.",
    inputs: [
      { label: "Dormant CRM", detail: "312 old customers" },
      { label: "Service history", detail: "last visit + notes" },
      { label: "Open calendar", detail: "capacity by day" },
      { label: "Offer rules", detail: "safe outreach limits" },
    ],
    steps: [
      { label: "Score", detail: "rank likely buyers" },
      { label: "Personalize", detail: "write human messages" },
      { label: "Route", detail: "send replies to booking" },
    ],
    outputs: [
      { label: "Warm replies", detail: "ready for staff" },
      { label: "Booked visits", detail: "calendar filled" },
      { label: "Revenue receipt", detail: "ROI by segment" },
      { label: "Owner queue", detail: "only decisions left" },
    ],
  },
  "social-marketing-agent": {
    badge: "Local content engine",
    centerLabel: "Social Agent",
    centerSubcopy: "Finds proof, drafts, schedules",
    proof: "Turns everyday work into a publishable local content calendar.",
    inputs: [
      { label: "Recent jobs", detail: "photos + outcomes" },
      { label: "Reviews", detail: "customer proof" },
      { label: "Local signals", detail: "weather + seasonality" },
      { label: "Brand voice", detail: "approved tone" },
    ],
    steps: [
      { label: "Find angles", detail: "match market demand" },
      { label: "Draft assets", detail: "copy + creative brief" },
      { label: "Stage posts", detail: "approval calendar" },
    ],
    outputs: [
      { label: "Content calendar", detail: "week filled" },
      { label: "Review posts", detail: "proof recycled" },
      { label: "GBP updates", detail: "local visibility" },
      { label: "Approval queue", detail: "owner control" },
    ],
  },
  "customer-research-agent": {
    badge: "Buyer intelligence flow",
    centerLabel: "Research Agent",
    centerSubcopy: "Evidence into strategy",
    proof: "Turns raw customer and competitor signals into a demo-ready buyer brief.",
    inputs: [
      { label: "Website URLs", detail: "business + competitors" },
      { label: "Reviews", detail: "pain language" },
      { label: "CRM notes", detail: "sales context" },
      { label: "Local market", detail: "Kansas signals" },
    ],
    steps: [
      { label: "Extract", detail: "themes + triggers" },
      { label: "Profile", detail: "pain stack" },
      { label: "Package", detail: "demo strategy" },
    ],
    outputs: [
      { label: "Buyer brief", detail: "target persona" },
      { label: "Pain map", detail: "ranked urgency" },
      { label: "Objections", detail: "counters ready" },
      { label: "Demo prompt", detail: "agent build brief" },
    ],
  },
  "outbound-sales-agent": {
    badge: "Respectful outbound flow",
    centerLabel: "Outbound Agent",
    centerSubcopy: "Researches, writes, sequences",
    proof: "Turns a cold list into specific, approval-ready sales outreach.",
    inputs: [
      { label: "Account list", detail: "target companies" },
      { label: "ICP rules", detail: "fit criteria" },
      { label: "Proof points", detail: "safe claims" },
      { label: "Consent status", detail: "channel rules" },
    ],
    steps: [
      { label: "Research", detail: "find triggers" },
      { label: "Match", detail: "offer to pain" },
      { label: "Sequence", detail: "email + SMS" },
    ],
    outputs: [
      { label: "Email drafts", detail: "specific openers" },
      { label: "SMS follow-up", detail: "short + useful" },
      { label: "Held contacts", detail: "review required" },
      { label: "CRM tasks", detail: "reply routing" },
    ],
  },
  "marcommand-engine": {
    badge: "Multi-agent marketing flow",
    centerLabel: "MarCommand",
    centerSubcopy: "Orchestrates 8 agents",
    proof: "Turns disconnected channels into one coordinated growth command center.",
    inputs: [
      { label: "Analytics", detail: "GA4 + CRM" },
      { label: "Ad channels", detail: "spend + leads" },
      { label: "Reviews", detail: "proof library" },
      { label: "Offers", detail: "service priorities" },
    ],
    steps: [
      { label: "Assign", detail: "specialist agents" },
      { label: "Create", detail: "copy + AEO + ads" },
      { label: "QA", detail: "claims + approvals" },
    ],
    outputs: [
      { label: "Campaign board", detail: "channel plan" },
      { label: "AEO updates", detail: "AI-search ready" },
      { label: "Budget move", detail: "ROI decision" },
      { label: "Owner brief", detail: "what to do next" },
    ],
  },
  "invoice-processing-agent": {
    badge: "Invoice automation flow",
    centerLabel: "Invoice Agent",
    centerSubcopy: "Reads, matches, routes",
    proof: "Turns invoice chaos into an approval-ready accounting packet.",
    inputs: [
      { label: "PDF invoices", detail: "email + scans" },
      { label: "Vendor roster", detail: "known suppliers" },
      { label: "PO data", detail: "expected amounts" },
      { label: "Chart accounts", detail: "GL rules" },
    ],
    steps: [
      { label: "Extract", detail: "vendor + lines" },
      { label: "Match", detail: "PO + GL code" },
      { label: "Route", detail: "approve or flag" },
    ],
    outputs: [
      { label: "Structured record", detail: "ready to post" },
      { label: "PO match", detail: "confidence score" },
      { label: "Exceptions", detail: "duplicates held" },
      { label: "Approval packet", detail: "sent to owner" },
    ],
  },
  "intelligent-inventory-monitoring": {
    badge: "Inventory exception flow",
    centerLabel: "Inventory Agent",
    centerSubcopy: "Normalizes, detects, recommends",
    proof: "Turns inventory exports into a daily exception queue.",
    inputs: [
      { label: "SKU export", detail: "all locations" },
      { label: "Transfers", detail: "sent + received" },
      { label: "Cycle counts", detail: "actual on hand" },
      { label: "Sales velocity", detail: "demand trend" },
    ],
    steps: [
      { label: "Normalize", detail: "SKU aliases" },
      { label: "Detect", detail: "variance + risk" },
      { label: "Recommend", detail: "move or reorder" },
    ],
    outputs: [
      { label: "Stockout alerts", detail: "before it happens" },
      { label: "Transfer fixes", detail: "mismatch queue" },
      { label: "Reorder list", detail: "ranked by urgency" },
      { label: "Margin flags", detail: "cost drift" },
    ],
  },
  "ai-bookkeeper": {
    badge: "Bookkeeping cleanup flow",
    centerLabel: "Bookkeeper Agent",
    centerSubcopy: "Matches, categorizes, reconciles",
    proof: "Turns messy bank lines into review-ready books.",
    inputs: [
      { label: "Bank feed", detail: "transactions" },
      { label: "Receipts", detail: "Drive + email" },
      { label: "Vendor history", detail: "known rules" },
      { label: "Chart accounts", detail: "posting map" },
    ],
    steps: [
      { label: "Match", detail: "docs to lines" },
      { label: "Classify", detail: "category + memo" },
      { label: "Reconcile", detail: "flag gaps" },
    ],
    outputs: [
      { label: "Ready postings", detail: "approve batch" },
      { label: "Missing docs", detail: "receipt requests" },
      { label: "Rules learned", detail: "recurring vendors" },
      { label: "Close brief", detail: "what remains" },
    ],
  },
  "compliance-agent": {
    badge: "Compliance review flow",
    centerLabel: "Compliance Agent",
    centerSubcopy: "Retrieves, flags, rewrites",
    proof: "Turns risky drafts into cited review packets before they ship.",
    inputs: [
      { label: "Draft content", detail: "email + ads + docs" },
      { label: "Policy library", detail: "internal rules" },
      { label: "Reg references", detail: "required language" },
      { label: "Approval roles", detail: "who signs off" },
    ],
    steps: [
      { label: "Retrieve", detail: "relevant rules" },
      { label: "Flag", detail: "risk + severity" },
      { label: "Rewrite", detail: "safer language" },
    ],
    outputs: [
      { label: "Risk report", detail: "ranked issues" },
      { label: "Citations", detail: "source-backed" },
      { label: "Safe draft", detail: "ready for review" },
      { label: "Audit log", detail: "decision trail" },
    ],
  },
  "business-triage-agent": {
    badge: "Inbound triage flow",
    centerLabel: "Triage Agent",
    centerSubcopy: "Classifies, prioritizes, routes",
    proof: "Turns every inbound touchpoint into a calm priority queue.",
    inputs: [
      { label: "Emails", detail: "customer inbox" },
      { label: "Texts", detail: "SMS threads" },
      { label: "Calls", detail: "transcripts" },
      { label: "Forms", detail: "website leads" },
    ],
    steps: [
      { label: "Classify", detail: "intent + urgency" },
      { label: "Respond", detail: "routine answers" },
      { label: "Escalate", detail: "right person" },
    ],
    outputs: [
      { label: "Urgent alerts", detail: "on-call routed" },
      { label: "Auto replies", detail: "common asks" },
      { label: "Sales tasks", detail: "owner queue" },
      { label: "CRM memory", detail: "full context" },
    ],
  },
  "industry-specific-agent": {
    badge: "Insurance renewal flow",
    centerLabel: "Renewal Agent",
    centerSubcopy: "Monitors, blocks, reminds",
    proof: "Turns a policy book into a zero-miss renewal operating queue.",
    inputs: [
      { label: "Policy book", detail: "AMS export" },
      { label: "Renewal dates", detail: "90-day window" },
      { label: "Carrier docs", detail: "quotes + forms" },
      { label: "Producer notes", detail: "account context" },
    ],
    steps: [
      { label: "Monitor", detail: "timeline + owner" },
      { label: "Detect", detail: "missing blockers" },
      { label: "Remind", detail: "client + producer" },
    ],
    outputs: [
      { label: "At-risk renewals", detail: "ranked queue" },
      { label: "Producer tasks", detail: "next action" },
      { label: "Client reminders", detail: "no missed touch" },
      { label: "Reconciliation", detail: "month-end clean" },
    ],
  },
  "ai-digital-receptionist": {
    badge: "Voice booking flow",
    centerLabel: "Receptionist Agent",
    centerSubcopy: "Answers, books, remembers",
    proof: "Turns missed calls into booked appointments and clean handoffs.",
    inputs: [
      { label: "Phone call", detail: "live or after-hours" },
      { label: "Caller intent", detail: "issue + urgency" },
      { label: "Calendar rules", detail: "open slots" },
      { label: "CRM record", detail: "customer history" },
    ],
    steps: [
      { label: "Qualify", detail: "collect details" },
      { label: "Book", detail: "or escalate" },
      { label: "Summarize", detail: "staff handoff" },
    ],
    outputs: [
      { label: "Appointment", detail: "slot confirmed" },
      { label: "On-call alert", detail: "urgent routed" },
      { label: "Transcript", detail: "searchable record" },
      { label: "Morning digest", detail: "what happened" },
    ],
  },
  "business-forecast-agent": {
    badge: "Owner forecast flow",
    centerLabel: "Forecast Agent",
    centerSubcopy: "Models, explains, recommends",
    proof: "Turns scattered operating data into a plain-English decision brief.",
    inputs: [
      { label: "Financials", detail: "P&L + cash" },
      { label: "Pipeline", detail: "CRM stages" },
      { label: "Calendar", detail: "capacity load" },
      { label: "Operations", detail: "staff + backlog" },
    ],
    steps: [
      { label: "Model", detail: "revenue + cash" },
      { label: "Explain", detail: "driver changes" },
      { label: "Recommend", detail: "owner decision" },
    ],
    outputs: [
      { label: "Cash warning", detail: "before it hits" },
      { label: "Hiring call", detail: "capacity trigger" },
      { label: "Revenue forecast", detail: "confidence range" },
      { label: "Owner brief", detail: "what to do next" },
    ],
  },
  "custom-agent-development": {
    badge: "Custom workflow flow",
    centerLabel: "Custom Agent",
    centerSubcopy: "Maps, designs, scopes",
    proof: "Turns a messy internal process into a buildable agent blueprint.",
    inputs: [
      { label: "Workflow notes", detail: "how work happens" },
      { label: "Current systems", detail: "tools + APIs" },
      { label: "Exceptions", detail: "edge cases" },
      { label: "Sample records", detail: "real examples" },
    ],
    steps: [
      { label: "Map", detail: "steps + handoffs" },
      { label: "Design", detail: "agent roles" },
      { label: "Scope", detail: "MVP path" },
    ],
    outputs: [
      { label: "Blueprint", detail: "agent design" },
      { label: "Integration map", detail: "systems needed" },
      { label: "Build phases", detail: "MVP to launch" },
      { label: "Demo plan", detail: "proof artifact" },
    ],
  },
  "local-ai-deployment-agent": {
    badge: "Private AI deployment flow",
    centerLabel: "Local AI Agent",
    centerSubcopy: "Indexes, answers, logs locally",
    proof: "Turns private knowledge into useful AI without sending data outside the network.",
    inputs: [
      { label: "Private docs", detail: "manuals + policy" },
      { label: "Local hardware", detail: "server or edge" },
      { label: "Permissions", detail: "role access" },
      { label: "Audit rules", detail: "logging needs" },
    ],
    steps: [
      { label: "Index", detail: "local retrieval" },
      { label: "Route", detail: "local model" },
      { label: "Log", detail: "audit trail" },
    ],
    outputs: [
      { label: "Cited answer", detail: "private sources" },
      { label: "Zero cloud calls", detail: "network-safe" },
      { label: "Audit log", detail: "who asked what" },
      { label: "Deploy checklist", detail: "IT-ready" },
    ],
  },
  "agentic-coding-specialists": {
    badge: "Agentic coding flow",
    centerLabel: "Coding Agents",
    centerSubcopy: "Plan, patch, verify",
    proof: "Turns tickets into scoped patches with verification and review notes.",
    inputs: [
      { label: "Issue brief", detail: "what to change" },
      { label: "Codebase", detail: "repo context" },
      { label: "Tests", detail: "verification command" },
      { label: "Acceptance", detail: "definition done" },
    ],
    steps: [
      { label: "Read", detail: "patterns + risks" },
      { label: "Patch", detail: "owned files" },
      { label: "Verify", detail: "build + tests" },
    ],
    outputs: [
      { label: "Diff summary", detail: "files changed" },
      { label: "Build logs", detail: "pass/fail" },
      { label: "PR brief", detail: "review ready" },
      { label: "Risk notes", detail: "what remains" },
    ],
  },
};

