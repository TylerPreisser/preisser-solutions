import type { AeoPageData } from "../types";
import { blogManifest } from "./manifest";

/**
 * Blog hub page (/blog).
 *
 * Renders through AeoPage, but the route at src/app/blog/page.tsx also
 * appends a custom post-listing grid below the standard AEO sections.
 * The hub keeps schemaType: "WebPage" — individual posts use "BlogPosting".
 */
export const pageData: AeoPageData = {
  slug: "blog",
  tier: "blog",
  metaTitle: "Blog — Preisser Solutions | AI Automation & AEO for Kansas SMBs",
  metaDescription:
    "Long-form essays from Tyler Preisser on AI automation, AEO/GEO, custom CRM builds, local SEO, and the work Preisser Solutions ships for Kansas small businesses.",
  eyebrow: "Preisser Solutions Blog",
  h1: "Practical writing on AI automation, AEO, and custom builds",
  subheadline:
    "Field notes from the work Preisser Solutions ships — what's actually moving the needle for Kansas small businesses, and what's just hype.",
  answerParagraph:
    "The Preisser Solutions blog is the long-form publication of Tyler Preisser, founder of Preisser Solutions (Hays, Kansas). Posts cover AI automation for small businesses, Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO), custom CRM and dashboard builds, local SEO, and industry-specific playbooks for HVAC, insurance, trucking, and other Kansas verticals. Every post is written by Tyler personally and grounded in the engagements Preisser Solutions has shipped — Cassidy HVAC, HG Oil Holdings, Astrus Insurance, Sunrise Transportation. No ghost-written guest posts, no SEO filler.",
  sections: [
    {
      eyebrow: "What you'll find here",
      heading: "Four content tracks",
      body: [
        "The blog is organized into four practical tracks. Posts cite the engagement that informed them so you can verify the patterns against real outcomes.",
      ],
      bullets: [
        "AI Search (AEO / GEO) — How to win citations in ChatGPT, Perplexity, Claude, and Google AI Overviews.",
        "AI Automation — What works, what doesn't, and how to spot vendors selling rebadged Zapier as \"AI.\"",
        "Industry Playbooks — Specific systems for HVAC, plumbing, insurance, trucking, and other Kansas trades.",
        "Custom Builds — When to build custom (CRM, dashboards, internal tools) and when off-the-shelf wins.",
      ],
    },
    {
      eyebrow: "Why we publish",
      heading: "Cited proof beats anonymous testimonials",
      body: [
        "Most consultancy blogs are SEO filler — generic listicles that read like they were written by a tool because they were. The Preisser Solutions blog is the opposite: every post draws on named client engagements, cites third-party research where relevant (Princeton GEO 2024, Local Falcon May 2025, Gartner search forecasts), and gets updated when the underlying numbers change.",
        "If you're scoping work with Preisser Solutions, the blog is the best window into how Tyler thinks about a given problem before you ever get on a call.",
      ],
    },
  ],
  faq: [
    {
      question: "Who writes the Preisser Solutions blog?",
      answer:
        "Tyler Preisser personally writes every post. There are no ghostwriters, contributing authors, or guest posts. If a post is published here, Tyler wrote it.",
    },
    {
      question: "How often do you publish?",
      answer:
        "New posts go up when there's something worth saying — typically every two to four weeks. We don't publish on a calendar cadence because that's how generic SEO filler gets produced.",
    },
    {
      question: "Can I republish or syndicate posts?",
      answer:
        "With attribution and a canonical link back to the original Preisser Solutions URL, yes. Email tyler@preissersolutions.com for syndication arrangements.",
    },
    {
      question: "Do you publish guest posts?",
      answer:
        "No. The blog is Tyler's voice and reflects engagements Preisser Solutions has shipped. We don't accept guest posts, sponsored content, or paid placements.",
    },
    {
      question: "How do I get notified of new posts?",
      answer:
        "The footer of every page has an email signup that captures new-post announcements. We send at most one email per new post — no marketing sequences, no upsells.",
    },
  ],
  schemaType: "WebPage",
  datePublished: "2025-08-01",
  dateModified: "2026-05-15",
  namedEntities: [
    "Preisser Solutions",
    "Tyler Preisser",
    "Hays, Kansas",
    "ChatGPT",
    "Perplexity",
    "Claude",
    "Google AI Overviews",
  ],
  relatedLinks: blogManifest.slice(0, 8).map((p) => ({
    label: p.title,
    href: `/blog/${p.slug}`,
  })),
  ctaHeadline: "Want this kind of thinking applied to your business?",
  ctaSubcopy:
    "Book a free Business Systems Audit. Thirty minutes with Tyler, fixed-price proposal after.",
};
