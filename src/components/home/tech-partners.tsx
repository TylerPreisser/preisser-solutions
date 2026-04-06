"use client";

const techPartners = [
  // AI & Agent Tools
  "OpenAI",
  "Anthropic",
  "Claude Code",
  "Google Gemini",
  "Google NotebookLM",
  "Cursor",
  "Codex",
  // Business Systems We Integrate With
  "QuickBooks",
  "ServiceTitan",
  "Jobber",
  "HubSpot",
  "Salesforce",
  "Square",
  "Stripe",
  "Mailchimp",
  "ActiveCampaign",
  // Automation & Integration
  "n8n",
  "Zapier",
  "Make",
  // Web & Cloud
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Python",
  "Cloudflare",
  "Vercel",
  "GitHub",
  "Docker",
  // Mobile
  "Xcode",
  "Swift",
  "SwiftUI",
  // Data & Productivity
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Google Workspace",
  "Notion",
  "Figma",
];

export function TechPartners() {
  return (
    <section className="ps-tech-partners" aria-label="Technologies and platforms we work with">
      <div className="ps-tech-partners-header">
        <p className="ps-tech-partners-label" aria-hidden="true">// stack</p>
        <h2 className="ps-tech-partners-heading">
          Built With the Best Tools in the Industry
        </h2>
      </div>

      {/* Scrolling track — items duplicated for seamless loop */}
      <div
        className="ps-tech-partners-viewport"
        aria-hidden="true"
      >
        <div className="ps-tech-partners-track">
          {techPartners.map((name) => (
            <span key={`a-${name}`} className="ps-tech-pill">
              {name}
            </span>
          ))}
          {/* Duplicate set for seamless looping */}
          {techPartners.map((name) => (
            <span key={`b-${name}`} className="ps-tech-pill" aria-hidden="true">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Accessible static list (visually hidden) */}
      <ul className="ps-visually-hidden">
        {techPartners.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
