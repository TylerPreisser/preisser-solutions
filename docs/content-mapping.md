# Stripe-to-Preisser Solutions Content Mapping

> **Purpose:** Exhaustive find/replace mapping for transforming saved Stripe homepage HTML into Preisser Solutions website.
> **Source HTML:** `/Users/tylerpreisser/Desktop/stripe.com/stripe.com/index.html`
> **Content Source:** `/Users/tylerpreisser/Downloads/preisser-solutions-website-content.md`
> **Generated:** 2026-04-02

---

## IMPORTANT NOTES FOR SED AGENT

- The HTML file is **one single line** (575KB, 0 newlines). All sed operations must work on single-line content.
- Text is minified -- search strings appear exactly as shown below (no extra whitespace).
- Some strings appear multiple times (e.g., in `<title>`, `og:title`, `twitter:title`). Use global replacements where noted.
- Order matters: do longer/more-specific replacements FIRST to avoid partial matches.

---

## 1. PAGE TITLE AND META

```
FIND: Stripe | Financial Infrastructure to Grow Your Revenue
REPLACE: Preisser Solutions | AI-Powered Business Technology for Kansas Businesses
```
> Appears 3x: `<title>`, `og:title`, `twitter:title`. Use global replace.

```
FIND: Stripe is a financial services platform that helps all types of businesses accept payments, build flexible billing models, and manage money movement.
REPLACE: Preisser Solutions builds, fixes, and automates business technology for companies across Kansas. Custom AI automation, system integration, web development, and more. Work directly with Tyler Preisser.
```
> Appears 2x: `meta description`, `og:description`. Use global replace.

---

## 2. NAVIGATION ITEMS

```
FIND: >Products<
REPLACE: >Services<
```

```
FIND: >Solutions<
REPLACE: >Work<
```

```
FIND: >Developers<
REPLACE: >About<
```

```
FIND: >Resources<
REPLACE: >Resources<
```
> Keep as-is (or remap to blog/insights later).

```
FIND: >Pricing<
REPLACE: >Contact<
```

```
FIND: >Sign in<
REPLACE: >Contact<
```

---

## 3. HERO SECTION

### Headline

```
FIND: Financial infrastructure to grow your revenue.
REPLACE: Your Business Runs on Systems. We Make Them Work.
```
> Appears 2x (desktop and mobile). Use global replace.

### Subheadline

```
FIND: Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.
REPLACE: Preisser Solutions builds, fixes, and automates the technology behind your business — so your team stops fighting their tools and starts using them.
```

---

## 4. HERO CTA BUTTONS

```
FIND: >Start now<
REPLACE: >Talk to Tyler<
```

```
FIND: >Contact sales<
REPLACE: >Schedule a Free Consultation<
```

```
FIND: >Sign up with Google<
REPLACE: >Get Started<
```

---

## 5. "FLEXIBLE SOLUTIONS" SECTION -> "WHAT WE BUILD" (SERVICE PILLARS)

### Section Headline

```
FIND: Flexible solutions for every business model.
REPLACE: What We Build
```

### Section Subheadline

```
FIND: Grow your business with a comprehensive set of payments and financial tools\u2060—\u2060designed to work individually or together.
REPLACE: Five service pillars. Each one built to solve real problems in your operation.
```

```
FIND: Grow your business with the most comprehensive set of payments and financial tools.
REPLACE: Five service pillars designed to fix what's broken and automate what's slow.
```

### Individual Service Cards (Stripe products -> PS pillars)

```
FIND: Accept and optimize payments globally—online and in person
REPLACE: Systems & Integration — Your tools don't talk to each other. We fix that.
```

```
FIND: Enable any billing model
REPLACE: AI-Powered Automation — Stop paying people to do what a machine does better.
```

```
FIND: Monetize through agentic commerce
REPLACE: Web & Application Development — Professional, high-performance sites and apps — built to convert.
```

```
FIND: Create a card issuing program
REPLACE: Data & Business Intelligence — See your business clearly. Dashboards, reports, and analytics that drive decisions.
```

```
FIND: Access borderless money movement with stablecoins and crypto
REPLACE: Digital Marketing & Growth Engines — Automated marketing systems that generate leads while you sleep.
```

```
FIND: Embed payments in your platform
REPLACE: Built for Kansas businesses, not Silicon Valley startups.
```

---

## 6. STATS / SOCIAL PROOF SECTION

### Section Headline

```
FIND: The backbone of\xa0global commerce
REPLACE: Real Results for Real Businesses
```
> Note: `\xa0` is a non-breaking space character. In sed, use the actual byte.

### Individual Stats

```
FIND: currencies and payment methods supported
REPLACE: organic reach increase in 30 days (Cassidy HVAC)
```

```
FIND: $1.9T
REPLACE: 5x
```

```
FIND: in payments volume processed in 2025
REPLACE: organic reach increase in 30 days
```

```
FIND: 200M+
REPLACE: 95%
```

```
FIND: active subscriptions managed on Stripe Billing
REPLACE: reduction in back-office inventory time (HG Oil Holdings)
```

```
FIND: historical uptime for Stripe services
REPLACE: reactivation of dormant customer lists
```

```
FIND: historical uptime
REPLACE: 60%+
```

```
FIND: for Stripe services
REPLACE: reactivation of dormant customer lists
```

---

## 7. ENTERPRISE SECTION -> "WHY WORK WITH US"

### Section Headlines

```
FIND: Powering businesses of all sizes.
REPLACE: Why Work with Us
```

```
FIND: Run your business on a reliable platform that adapts to your needs.
REPLACE: Direct access. AI-native speed. Built for your business.
```

```
FIND: Transform your enterprise with agile financial infrastructure
REPLACE: Your Technology Should Be Working for You — Not the Other Way Around
```

```
FIND: Stripe for enterprises
REPLACE: The Preisser Solutions Difference
```

```
FIND: 50% of Fortune 100 companies have used Stripe to grow their businesses—from expanding internationally to reimagining the customer experience.
REPLACE: Every project gets Tyler's direct attention. No handoffs. No account managers. No junior developers. AI-first methodology means we deliver in weeks, not months.
```

### Enterprise Case Studies -> PS Case Studies

```
FIND: Hertz unifies commerce with Stripe.
REPLACE: Cassidy HVAC — 5x organic reach increase in 30 days.
```

```
FIND: URBN consolidates $5 billion in online and in-store revenue onto Stripe.
REPLACE: HG Oil Holdings — 95% reduction in back-office inventory time.
```

```
FIND: Instacart powers online grocery delivery with Stripe.
REPLACE: Cassidy HVAC — 60%+ reactivation of dormant customers.
```

```
FIND: Le Monde improves local and international payments with Stripe.
REPLACE: HG Oil Holdings — 75% decrease in manual invoice processing time.
```

```
FIND: >Read the story<
REPLACE: >See the results<
```
> Use global replace.

---

## 8. STARTUP SECTION -> ABOUT / APPROACH

```
FIND: Build a foundation for your startup that enables faster growth
REPLACE: Built by Someone Who Understands Your Business
```

```
FIND: Stripe for startups
REPLACE: About Preisser Solutions
```

```
FIND: From stablecoin pioneers to 78% of the Forbes AI 50, Stripe helps startups build what's next on easy-to-integrate financial infrastructure.
REPLACE: Founded on a simple belief: the technology running your business should actually make your life easier. Tyler Preisser builds every system personally — from analysis to deployment.
```

### Startup Case Study Cards -> Core Principles

```
FIND: Lovable grows into a vibe-coding juggernaut with Stripe.
REPLACE: Build it right. No shortcuts. Systems that work today and scale tomorrow.
```

```
FIND: Runway protects developer time with no-code solutions from Stripe.
REPLACE: Speed is a feature. AI-first methodology means we deliver in weeks, not months.
```

```
FIND: Supabase delivers its backend-as-a-service to 150 countries with Stripe.
REPLACE: Honesty over agreement. If your idea won't work, we'll tell you.
```

```
FIND: Linear partners with Stripe to handle billing and payments.
REPLACE: Working software beats promises. We ship working systems.
```

```
FIND: ElevenLabs grows into a $3B AI audio leader with Stripe.
REPLACE: Your success is the only metric that matters.
```

```
FIND: Browserbase offers usage-based billing for an AI agent browser with Stripe.
REPLACE: AI-first approach — we move 5x faster than traditional dev shops.
```

```
FIND: Decagon decreases support costs by 65% with Stripe-integrated agents.
REPLACE: No retainers required. Scope it. Build it. Ship it.
```

```
FIND: Read Lovable's story
REPLACE: Learn more
```

```
FIND: Read Runway's story
REPLACE: Learn more
```

```
FIND: Read Supabase's story
REPLACE: Learn more
```

```
FIND: Read Linear's story
REPLACE: Learn more
```

```
FIND: Read Browserbase's story
REPLACE: Learn more
```

```
FIND: Read Decagon's story
REPLACE: Learn more
```

```
FIND: >Watch the video<
REPLACE: >Learn more<
```

---

## 9. PLATFORMS SECTION -> PROCESS / HOW WE WORK

```
FIND: Make your SaaS platform a complete financial operating system
REPLACE: How We Work
```

```
FIND: Stripe for platforms
REPLACE: Our Process
```

```
FIND: From the Fortune 100 to the Forbes Cloud 100, vertical SaaS platforms use Stripe to expand their product offerings with embedded payments and financial services.
REPLACE: Every engagement starts with a conversation. We learn your operation, find what's broken or slow, and build the exact solution your business needs.
```

```
FIND: Get to market faster.
REPLACE: We Talk.
```

```
FIND: Launch and scale payments products with lower operational overhead using embedded components and no-code tools.
REPLACE: Tell us what's not working. We'll listen, ask questions, and identify the real problem — not just the symptoms.
```

```
FIND: >Read the guide<
REPLACE: >Get started<
```

```
FIND: Grow new lines of revenue.
REPLACE: We Build.
```

```
FIND: Monetize platform transactions—including payments, card interchange, and financing fees.
REPLACE: Custom-engineered solutions using AI-first methodology. Delivered in weeks, not months.
```

```
FIND: Manage platform risk.
REPLACE: We Support.
```

```
FIND: Stay ahead of global regulations with tools for compliance, credit risk, fraud prevention, and account security.
REPLACE: Every system comes with ongoing support. We maintain, adapt, and improve what we build — because your business doesn't stop evolving.
```

### Platform Testimonial Quotes

```
FIND: With Stripe, we have a global technology partner to help our customers—from Canadian yoga studios to British boxing classes—keep growing and evolving in a new wellness world.
REPLACE: Preisser Solutions didn't sell us another tool. They got inside our operation, found what was broken, and built the exact solution we needed.
```

```
FIND: Kurtis Moyer,
REPLACE: Client,
```

```
FIND: Lead Product Manager of Payments, Mindbody
REPLACE: Cassidy HVAC
```

```
FIND: Stripe offers an enterprise-grade infrastructure that puts our customers on the cutting edge of modern payments technology. The combination of Terminal and Connect is a powerful integrated solution.
REPLACE: The system runs 24/7 without human input. It saved us 10+ hours per week and we haven't touched it since it launched.
```

```
FIND: Dax Dasilva,
REPLACE: Client,
```

```
FIND: Founder and CEO, Lightspeed
REPLACE: HG Oil Holdings
```

---

## 10. DEVELOPER SECTION -> TECHNOLOGY APPROACH

```
FIND: Reliable, extensible infrastructure for every stack.
REPLACE: AI-First Technology That Actually Works.
```

```
FIND: Adapt Stripe to your business needs with flexible integration options.
REPLACE: We use artificial intelligence at every stage — from analysis to build to deployment.
```

```
FIND: >View developer docs<
REPLACE: >See our services<
```

```
FIND: >View Stripe's GitHub<
REPLACE: >View our work<
```

```
FIND: Connect to existing systems.
REPLACE: Connect your systems.
```

```
FIND: Orchestrate payments across multiple processors, build custom workflows, and connect to third parties using APIs, partner apps, or prebuilt integrations.
REPLACE: Your CRM, accounting, scheduling, and customer tools — connected through custom integrations so data moves automatically.
```

```
FIND: Scale with confidence.
REPLACE: Automate with confidence.
```

```
FIND: Handle thousands of transactions per second with consistent speed and reliability, even during peak traffic periods.
REPLACE: AI-powered automation handles repetitive tasks faster, more accurately, and without overtime.
```

### Developer Stats

```
FIND: 500M+
REPLACE: 10+
```

```
FIND: API requests per day
REPLACE: hours freed per week for staff
```

```
FIND: 10K+
REPLACE: 75%
```

```
FIND: API requests per second
REPLACE: decrease in manual processing time
```

```
FIND: 150K+
REPLACE: 95%
```

```
FIND: transactions per minute
REPLACE: reduction in back-office time
```

### Integration Paths -> Getting Started

```
FIND: Choose an integration path.
REPLACE: Getting started is simple.
```

```
FIND: With AI-powered support, rich documentation, and built-in debugging tools, you can quickly get started with the best option for your business.
REPLACE: Every engagement starts with a conversation. No commitment, no sales pitch, no pressure.
```

```
FIND: Don't code?
REPLACE: Need one thing fixed?
```

```
FIND: Set up billing, take in-person payments, or share a payment link—right from the Stripe Dashboard, no code required.
REPLACE: We scope single projects — one broken process, one integration, one automation. Fixed and shipped.
```

```
FIND: >Explore no-code<
REPLACE: >Get started<
```

```
FIND: Use a pre-integrated platform.
REPLACE: Need a full overhaul?
```

```
FIND: Browse our directory of platforms that integrate Stripe with website-building tools.
REPLACE: We audit your entire operation, identify every inefficiency, and build a comprehensive solution.
```

```
FIND: >See directory<
REPLACE: >Talk to Tyler<
```

```
FIND: Build your own integration.
REPLACE: Not sure what you need?
```

```
FIND: Use our SDKs, APIs, MCP server, and AI developer tools to build and maintain your own integration with Stripe.
REPLACE: That's fine. Tell us what's not working and we'll tell you how we can fix it.
```

---

## 11. "WHAT'S HAPPENING" / NEWS SECTION -> CASE STUDIES PREVIEW

```
FIND: What's happening
REPLACE: Our Work
```

```
FIND: See the latest from Stripe.
REPLACE: Real results for real businesses.
```

```
FIND: Businesses on Stripe generated $1.9T in 2025.
REPLACE: Cassidy HVAC — Automated Social Media Engine
```

```
FIND: Our annual letter explores the trends defining the internet economy—including steeper growth for newer businesses, faster international expansion, stablecoin progress, agentic commerce, and more.
REPLACE: Built a fully autonomous AI-powered social media content engine. 5x increase in organic reach within 30 days. 100% hands-off daily content creation.
```

```
FIND: >Read the letter<
REPLACE: >See the results<
```

```
FIND: 150K+ users have their best day ever on Stripe.
REPLACE: Cassidy HVAC — AI-Driven Customer Reactivation
```

```
FIND: From Black Friday through Cyber Monday 2025, Stripe processed more than $40B for businesses while maintaining a 99.9999% uptime.
REPLACE: AI-powered SMS and email outreach engine. 60%+ reactivation of dormant customers. Staff saved 10+ hours per week.
```

```
FIND: >See the numbers<
REPLACE: >See the results<
```

```
FIND: Tidemark's vertical and SMB SaaS benchmark report.
REPLACE: HG Oil Holdings — Automated Inventory Management
```

```
FIND: Learn what's driving growth in vertical SaaS in 2025—going multiproduct, embedding fintech, and integrating AI into the core of their products.
REPLACE: Centralized automated inventory system. 95% reduction in back-office time. Converted a cost center into a profit center.
```

```
FIND: >Get the data<
REPLACE: >See the results<
```

```
FIND: Shopify's Tobi Lütke sits down with John Collison.
REPLACE: HG Oil Holdings — AI Invoicing Assistant
```

```
FIND: Hear them discuss the choices that shaped Shopify and Stripe, the future of commerce, and their advice for founders.
REPLACE: AI-powered invoice processing assistant. 75% decrease in manual invoice handling. Eliminated manual reading and data extraction.
```

```
FIND: >Watch video<
REPLACE: >See the results<
```

### Remaining news cards (map to PS value props)

```
FIND: New tools to process payments outside app stores.
REPLACE: AI-first approach means 5x faster delivery.
```

```
FIND: New regulations mean new opportunities. Read how Stripe can help you process payments outside of the iOS and Android app stores, giving you more control and helping grow your revenue.
REPLACE: We use artificial intelligence at every stage — analysis, build, deployment. What used to take agencies months, we ship in weeks.
```

```
FIND: >Learn how<
REPLACE: >Get started<
```

```
FIND: Crypto.com partners with Stripe to enable better crypto payments.
REPLACE: You work directly with the person who builds it.
```

```
FIND: Learn how the partnership can help you tap into a new global customer base by letting customers pay with their crypto balance directly at checkout.
REPLACE: No handoffs. No account managers. No junior developers learning on your dime. Tyler Preisser builds your system personally.
```

```
FIND: >View announcement<
REPLACE: >Talk to Tyler<
```

```
FIND: Make your products shoppable through AI platforms.
REPLACE: No retainers required. Scope it. Build it. Ship it.
```

```
FIND: Find out how the Agentic Commerce Protocol (ACP) makes it simple for any business to accept purchases from AI platforms—no major technical changes required.
REPLACE: Every project is scoped, priced, and delivered. You know exactly what you're getting before we start.
```

```
FIND: >Read more<
REPLACE: >Get started<
```

```
FIND: How leading retailers unify customer experiences and drive growth.
REPLACE: Based in Hays, Kansas. Serving businesses locally and across the state.
```

```
FIND: Get insights into how other brands have unified their online and in-store experiences and optimized their checkouts for a seamless shopping experience.
REPLACE: Whether you're down the street or across the state, the process is the same: we talk, we learn your operation, and we build exactly what you need.
```

```
FIND: >Get the report<
REPLACE: >Schedule a consultation<
```

```
FIND: Item 1 of 8: Businesses on Stripe generated $1.9T in 2025.
REPLACE: Item 1 of 4: Cassidy HVAC — Automated Social Media Engine
```

---

## 12. BOOK / STRIPE PRESS SECTION -> CTA SECTION

```
FIND: Entrepreneurship starts with ideas.
REPLACE: Your Technology Shouldn't Hold You Back.
```

```
FIND: >Stripe Press<
REPLACE: >Preisser Solutions<
```

```
FIND: >Works in Progress<
REPLACE: >Contact Us<
```

---

## 13. BOTTOM CTA SECTION

```
FIND: Ready to get started?
REPLACE: Ready to fix what's broken?
```

```
FIND: Create an account instantly, or contact us to design a custom package for your business.
REPLACE: Whether you need one broken process fixed or your entire operation overhauled, it starts with a conversation.
```

```
FIND: See what you'll pay
REPLACE: Talk to Tyler
```

```
FIND: Integrated per-transaction pricing with no hidden fees.
REPLACE: Every engagement starts with a free consultation. No pressure.
```

```
FIND: >Pricing details<
REPLACE: >Schedule a call<
```

```
FIND: >Start building<
REPLACE: >See our services<
```

```
FIND: Get up and running with Stripe in as little as 10 minutes.
REPLACE: Systems & Integration, AI Automation, Web Development, Data & Intelligence, Marketing & Growth.
```

```
FIND: >Integration options<
REPLACE: >View services<
```

---

## 14. FOOTER CONTENT

### Footer Product Links -> Service Links

```
FIND: Products and pricing
REPLACE: Services
```

```
FIND: >Atlas<
REPLACE: >Systems & Integration<
```

```
FIND: >Billing<
REPLACE: >AI Automation<
```

```
FIND: >Payments<
REPLACE: >Web Development<
```

```
FIND: >Issuing<
REPLACE: >Data & Intelligence<
```

```
FIND: >Connect<
REPLACE: >Marketing & Growth<
```

### Footer Solutions -> Work

```
FIND: >Enterprises<
REPLACE: >Cassidy HVAC<
```

```
FIND: >Startups<
REPLACE: >HG Oil Holdings<
```

### Footer Resources

```
FIND: >Documentation<
REPLACE: >About<
```

```
FIND: >API reference<
REPLACE: >Services<
```

```
FIND: >Customer stories<
REPLACE: >Our Work<
```

```
FIND: >Blog<
REPLACE: >Contact<
```

```
FIND: >Sessions annual conference<
REPLACE: >Free Consultation<
```

### Footer Company

```
FIND: >Jobs<
REPLACE: >About Tyler<
```

```
FIND: >Newsroom<
REPLACE: >Our Work<
```

### Footer Support

```
FIND: >Get support<
REPLACE: >Contact Us<
```

```
FIND: >Managed support plans<
REPLACE: >Schedule a Call<
```

```
FIND: CA residents: +1 888 926 2289
REPLACE: Hays, Kansas — Serving businesses locally and across the state
```

### Footer Bottom

```
FIND: >United States<
REPLACE: >Hays, Kansas<
```

```
FIND: Stripe, LLC.
REPLACE: Preisser Solutions. All Rights Reserved.
```

---

## 15. GLOBAL BRAND REPLACEMENTS

> Run these LAST to catch any remaining instances.

```
FIND: Stripe
REPLACE: Preisser Solutions
```
> WARNING: This is a global catch-all. Run AFTER all specific replacements above. Be careful not to break URLs, CSS class names, or asset paths that contain "stripe" or "Stripe". Only replace in visible text contexts (between `>` and `<`), in `content="..."` attributes, and in `alt="..."` attributes. DO NOT replace in `href`, `src`, `class`, or `id` attributes.

---

## 16. SECTIONS TO REMOVE ENTIRELY

The following sections should be removed from the HTML. Identify the containing `<section>` or `<div>` element and delete the entire block.

### A. Sessions Conference Banner
```
REMOVE SECTION CONTAINING: The internet economy conference
ALSO CONTAINS: Join us at Sessions
ALSO CONTAINS: April 29–30,
ALSO CONTAINS: Moscone West,
ALSO CONTAINS: San Francisco
```
> This is a time-limited event banner. Remove entirely.

### B. "Global GDP running on Stripe" marquee
```
REMOVE SECTION CONTAINING: Global GDP running on Stripe:
```
> Stripe-specific stat. Remove entirely.

### C. Billing Model Demo UI
```
REMOVE SECTION CONTAINING: Pro Plan
ALSO CONTAINS: Billed monthly
ALSO CONTAINS: Tokens
ALSO CONTAINS: Usage meter
ALSO CONTAINS: Tokens used in the last
```
> This is a Stripe Billing product demo. Remove entirely.

### D. Stripe Atlas / Startups Program CTAs
```
REMOVE SECTION CONTAINING: Stripe Startups program.
ALSO CONTAINS: Access financial benefits, a focused community
ALSO CONTAINS: Apply now
```

```
REMOVE SECTION CONTAINING: Stripe Atlas.
ALSO CONTAINS: Incorporate and get everything you need
ALSO CONTAINS: Start your company
```

### E. Book of the Week
```
REMOVE SECTION CONTAINING: Book of the week
ALSO CONTAINS: The World of Yesterday
ALSO CONTAINS: Stefan Zweig
```
> Stripe Press content. Remove entirely.

### F. Footer Product Links That Don't Map
Remove these individual footer links (they are Stripe-specific products with no PS equivalent):
```
REMOVE: Authorization Boost
REMOVE: Capital
REMOVE: Capital for platforms
REMOVE: Checkout
REMOVE: Climate
REMOVE: Crypto
REMOVE: Data Pipeline
REMOVE: Elements
REMOVE: Financial Accounts
REMOVE: Financial Accounts for platforms
REMOVE: Financial Connections
REMOVE: Global Payouts
REMOVE: Identity
REMOVE: Invoicing
REMOVE: Link
REMOVE: Managed Payments
REMOVE: Payment Links
REMOVE: Payment methods
REMOVE: Radar
REMOVE: Revenue Recognition
REMOVE: Stripe Sigma
REMOVE: Terminal
REMOVE: Usage-based billing
```

### G. Footer Solution Links That Don't Map
Remove these individual footer links:
```
REMOVE: Agentic commerce
REMOVE: Ecommerce
REMOVE: Embedded finance
REMOVE: Finance automation
REMOVE: Global businesses
REMOVE: In-app payments
REMOVE: Marketplaces
REMOVE: Platforms
REMOVE: SaaS
REMOVE: AI companies
REMOVE: Creator economy
REMOVE: Hospitality, travel, and leisure
REMOVE: Insurance
REMOVE: Media and entertainment
REMOVE: Nonprofits
REMOVE: Retail
```

### H. Footer Developer Links That Don't Map
```
REMOVE: API status
REMOVE: API changelog
REMOVE: Libraries and SDKs
REMOVE: Developer blog
REMOVE: Integrations and custom solutions
REMOVE: Stripe App Marketplace
REMOVE: Stripe Partner ecosystem
REMOVE: Professional services
REMOVE: Guides
```

### I. Footer Legal Links to Review
```
REMOVE: Prohibited and restricted businesses
REMOVE: Licenses
REMOVE: Sitemap
```
> Keep: Privacy and terms, Cookie settings, Your privacy choices (update links to PS equivalents later).

---

## 17. LINK HREF UPDATES

All internal Stripe links (e.g., `/payments`, `/billing`, `/connect`) need to be remapped or set to `#` or `/contact`. Key mappings:

```
FIND: href="/payments"
REPLACE: href="/services/systems-integration"
```

```
FIND: href="/billing"
REPLACE: href="/services/ai-automation"
```

```
FIND: href="/connect"
REPLACE: href="/services/web-development"
```

```
FIND: href="/enterprise"
REPLACE: href="/about"
```

```
FIND: href="/startups"
REPLACE: href="/work"
```

```
FIND: href="/pricing"
REPLACE: href="/contact"
```

```
FIND: href="/docs"
REPLACE: href="/services"
```

```
FIND: href="/customers"
REPLACE: href="/work"
```

```
FIND: href="/contact/sales"
REPLACE: href="/contact"
```

```
FIND: href="/register"
REPLACE: href="/contact"
```

```
FIND: href="/login"
REPLACE: href="/contact"
```

> For any remaining `/stripe.com/...` or `stripe.com` absolute URLs in href attributes, replace the domain with the PS domain or use relative paths.

---

## 18. SCHEMA.ORG / STRUCTURED DATA

The HTML contains JSON-LD structured data in a `<script type="application/ld+json">` block. This entire block should be replaced with PS-appropriate structured data:

```
FIND: "name":"Stripe"
REPLACE: "name":"Preisser Solutions"
```

```
FIND: "legalName":"Stripe, LLC"
REPLACE: "legalName":"Preisser Solutions, LLC"
```

```
FIND: "url":"https://stripe.com/"
REPLACE: "url":"https://preissersolutions.com/"
```

```
FIND: "description":"Stripe powers online and in-person payment processing and financial solutions for businesses of all sizes."
REPLACE: "description":"Preisser Solutions builds, fixes, and automates business technology for companies across Kansas."
```

```
FIND: Patrick Collison
REPLACE: Tyler Preisser
```

```
FIND: John Collison
REPLACE: Tyler Preisser
```

> The `sameAs`, `location`, and `contactPoint` arrays should be removed or replaced with PS social links and Hays, KS address.

---

## EXECUTION ORDER

1. Sections 16 (REMOVALS) first -- delete entire blocks before text replacement
2. Sections 1-15 (SPECIFIC REPLACEMENTS) -- longest/most-specific strings first
3. Section 15 (GLOBAL BRAND) last -- catch remaining "Stripe" references
4. Section 17 (LINK HREFS) -- update navigation targets
5. Section 18 (STRUCTURED DATA) -- update JSON-LD
6. Final pass: search for any remaining "Stripe" or "stripe" in visible text and replace

---

## VERIFICATION CHECKLIST

After all replacements, search the output for these terms to verify completeness:

- [ ] No remaining "Stripe" in visible text (between `>` and `<`)
- [ ] No remaining "Financial infrastructure" text
- [ ] No remaining "payments" in hero/headline contexts
- [ ] All CTAs say "Talk to Tyler", "Get started", or "Schedule a Free Consultation"
- [ ] Footer says "Preisser Solutions" and "Hays, Kansas"
- [ ] Title tag reads "Preisser Solutions | AI-Powered Business Technology for Kansas Businesses"
- [ ] All 5 service pillars appear in the service section
- [ ] All 4 case study stats appear (5x, 95%, 60%+, 75%)
- [ ] Sessions conference banner is gone
- [ ] Stripe-specific product names (Atlas, Sigma, Radar, Terminal, etc.) are gone from visible text
