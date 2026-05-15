# AI Agent Behavior Reference

**Purpose:** Definitive, sourced reference for how every major AI agent fetches, parses, and cites websites — used to optimize `preissersolutions.com` for maximum AI citation lift across all agents simultaneously.

**Date compiled:** 2026-05-04
**Audience:** Claude Code agents working on preissersolutions.com structured data, robots.txt, sitemap, llms.txt, and content patterns.
**Methodology:** Direct fetch of official vendor documentation where possible; cross-referenced industry analyses (Cloudflare, Ahrefs, Averi.ai, HumanSecurity, Known Agents) where official docs are absent.

---

## 1. Executive Summary — Five Principles for AI-Agent-Optimal Sites in 2026

1. **Two crawl tiers exist; optimize for both.** Every major AI vendor now operates a *training crawler* (respects robots.txt, can be blocked) and a *real-time user-fetcher* (often bypasses robots.txt because a human initiated the request). Blocking the training crawler does **not** prevent citation — the real-time fetcher still pulls your page when a user asks the model about you. Citations come from the real-time fetcher path, not the training path. **Block training, allow real-time.**

2. **Server-rendered HTML is non-negotiable.** Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Bytespider, CCBot, Amazonbot) **do not execute JavaScript reliably** or render headlessly only as a courtesy. Applebot and Diffbot render JS; Googlebot renders JS but with a delay. If your content is hydrated client-side, it is largely invisible to AI training and AI search indexes.

3. **The first 40-180 words of each section are the citation target.** Ahrefs' 1.4M-prompt study and Averi.ai's B2B SaaS benchmarks both confirm: AI engines extract the first 1-2 sentences after a heading. Lead every section with a direct, declarative answer. "120-180 words between headings receive 70% more citations" on ChatGPT. "40-60 word lead paragraphs with direct answers" perform optimally on Perplexity.

4. **Schema.org JSON-LD is the highest-leverage structured signal.** FAQPage schema produces a documented >20% lift in AI Overview citation probability. The four schemas with measurable AI-citation lift are `Organization`, `Service`, `FAQPage`, and `Article` — in that order for a B2B consultancy. Tier 1 schema generates a 3:1 improvement in citation rate vs unstructured content (averi.ai).

5. **`llms.txt` adoption is real but uneven; ship it anyway.** Anthropic, Microsoft, and OpenAI fetchers have been observed pulling `llms.txt` and `llms-full.txt`. Cursor, GitHub Copilot, and developer-AI tooling actively rely on it. PerplexityBot and Google-Extended currently **do not** fetch it (per October 2025 telemetry). It is cheap to publish and the asymmetric upside is high. Cloudflare's `Content-Signal` header (CC0 standard, contentsignals.org) is the emerging successor — implement both.

---

## 2. Per-Agent Quick Reference Table

| Agent | UA token (robots.txt) | Type | Honors robots.txt | JS execution | Cites source URLs |
|---|---|---|---|---|---|
| GPTBot | `GPTBot` | Training | Yes | No (static HTML) | N/A (training) |
| ChatGPT-User | `ChatGPT-User` | Real-time fetch | Maybe (user-initiated) | Limited | Yes, when web search runs |
| OAI-SearchBot | `OAI-SearchBot` | Search index | Yes | No | Yes, in ChatGPT search |
| ClaudeBot | `ClaudeBot` | Training | Yes | No | N/A |
| Claude-User | `Claude-User` | Real-time fetch | Maybe | Limited | Yes, with sources |
| Claude-SearchBot | `Claude-SearchBot` | Search index | Yes | No | Yes |
| anthropic-ai | `anthropic-ai` | Legacy/deprecated | Yes | No | N/A |
| PerplexityBot | `PerplexityBot` | Search/index | Yes | No | Yes |
| Perplexity-User | `Perplexity-User` | Real-time fetch | "Generally ignores robots.txt" | Limited | Yes |
| Googlebot | `Googlebot` | Search index | Yes | Yes (delayed WRS) | Yes (in SERPs) |
| Google-Extended | `Google-Extended` | AI training opt-out (Gemini/Vertex) | Yes (token-only) | N/A | N/A |
| Google-CloudVertexBot | `Google-CloudVertexBot` | On-demand Vertex Agent build | Yes | Yes | Custom |
| GoogleOther | `GoogleOther` | R&D/internal | Yes | Varies | N/A |
| Google-Agent | `Google-Agent` | Agentic user task (Mariner/Gemini) | User-initiated | Yes | Yes |
| Storebot-Google | `Storebot-Google` | Shopping | Yes | Yes | N/A |
| bingbot | `bingbot` | Search index (also feeds Copilot) | Yes | Yes (Edge engine) | Yes |
| BingPreview | `BingPreview` | Snapshot/preview | Yes | Yes | N/A (preview) |
| MSNBot-Media | `msnbot-media` | Media | Yes | No | N/A |
| Applebot | `Applebot` | Spotlight/Siri/Safari + Apple Intelligence | Yes | **Yes (full render)** | Limited |
| Applebot-Extended | `Applebot-Extended` | AI training opt-out | Yes (token-only) | N/A | N/A |
| meta-externalagent | `meta-externalagent` | Training/indexing | Yes | No | N/A |
| meta-externalfetcher | `meta-externalfetcher` | Real-time agent | "May bypass robots.txt" | Limited | Yes |
| facebookexternalhit | `facebookexternalhit` | Share preview | "May bypass" for integrity | No | N/A |
| FacebookBot | `FacebookBot` | AI speech-recognition training | Yes | No | N/A |
| Amazonbot | `Amazonbot` | Alexa/AI training | Yes | Unknown | Limited |
| Bytespider | `Bytespider` | TikTok/ByteDance LLM training | **No (widely reported)** | No | N/A |
| CCBot | `CCBot` | Common Crawl (feeds everyone) | Yes | No | N/A |
| cohere-ai | `cohere-ai` | Cohere chat (real-time) | Yes | Limited | Likely |
| cohere-training-data-crawler | `cohere-training-data-crawler` | Training | Yes | No | N/A |
| Diffbot | `Diffbot` | Knowledge graph | Mixed/disputed | **Yes (full)** | Custom |
| YouBot | `YouBot` | You.com search | Yes | No | Yes |
| AI2Bot / Ai2Bot-Dolma | `AI2Bot`, `Ai2Bot-Dolma` | OLMo/Dolma training | Yes (claimed) | No | N/A |
| DuckAssistBot | `DuckAssistBot` | DDG AI-assisted answers | Yes | No | Yes (with source citations) |
| MistralAI-User | `MistralAI-User` | Le Chat real-time | Limited (user-initiated) | Limited | Yes |
| MistralAI-Index | `MistralAI-Index` | Le Chat search index | Yes | No | Yes |
| xAI / Grok | `xAI-Grok`, `GrokBot` (rare) | Grok browse / DeepSearch | Inconsistent — often spoofs Safari | Yes (browse tool) | Yes |

---

## 3. Per-Agent Detail Sections

### 3.1 OpenAI

OpenAI publishes the canonical reference at `developers.openai.com/api/docs/bots`. Three distinct user agents, each with separate IP-range JSON files at `openai.com/<bot>.json`.

#### GPTBot (training)
- **UA string:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot` (current as of 2026-05; v1.1 still in widespread cached use).
- **Method:** GET. Static HTML only. No JS execution.
- **Purpose (verbatim):** "used to make our generative AI foundation models more useful and safe" and "crawl content that may be used in training our generative AI foundation models."
- **Robots.txt:** Honors. "Disallowing GPTBot via robots.txt signals that a site's content should not be used in training generative AI foundation models."
- **IPs:** `https://openai.com/gptbot.json`
- **Citation behavior:** None — training only.
- **Parses:** Body text, headings, meta description, JSON-LD, OpenGraph (best-effort).

#### ChatGPT-User (real-time, user-initiated)
- **UA string:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot`
- **Method:** GET. Limited JS.
- **Purpose:** "for certain user actions in ChatGPT and Custom GPTs. When users ask ChatGPT or a CustomGPT a question, it may visit a web page."
- **Robots.txt:** "ChatGPT-User is not used for crawling the web in an automatic fashion. Because these actions are initiated by a user, **robots.txt rules may not apply**."
- **IPs:** `https://openai.com/chatgpt-user.json`
- **Citation behavior:** Inline source links shown to the user when ChatGPT performs a web search. ChatGPT's web index is **Bing-derived**, not Google-derived (confirmed across multiple 2026 analyses).
- **Triggers a citation when:** model determines question benefits from current web info; user phrasing signals current/research intent ("recent", "latest", "what does X say about Y"); custom GPT browse action invokes it.

#### OAI-SearchBot (search index for ChatGPT search)
- **UA string:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.3; +https://openai.com/searchbot`
- **Method:** GET. Static HTML.
- **Purpose:** "for search" — to "surface websites in search results in ChatGPT's search features."
- **Robots.txt:** Honors. **Critical:** "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers."
- **IPs:** `https://openai.com/searchbot.json`

**Practical takeaway for preissersolutions.com:** Allow `OAI-SearchBot` and `ChatGPT-User` unconditionally. Decision on `GPTBot` is a values call (training opt-in vs out); does not affect citations.

---

### 3.2 Anthropic

Source: `support.claude.com/en/articles/8896518` (redirected from support.anthropic.com).

#### ClaudeBot (training)
- **UA token:** `ClaudeBot`
- **Purpose (verbatim):** "helps enhance the utility and safety of our generative AI models by collecting web content that could potentially contribute to their training."
- **Method:** GET. No JS.
- **Robots.txt:** Honors.
- **IP list:** `claude.com/crawling/bots.json`

#### Claude-User (real-time)
- **UA token:** `Claude-User`
- **Purpose:** "supports Claude AI users. When individuals ask questions to Claude, it may access websites using a Claude-User agent."
- **Robots.txt:** User-initiated, may not apply.

#### Claude-SearchBot (search index)
- **UA token:** `Claude-SearchBot`
- **Purpose:** "navigates the web to improve search result quality for users. It analyzes online content specifically to enhance the relevance and accuracy of search responses."
- **Robots.txt:** Honors.

#### anthropic-ai (legacy)
- The current support article **does not list `anthropic-ai`** as an active crawler. Industry consensus treats it as a deprecated/legacy token from pre-2024 robots.txt directives; still seen in many wild robots.txt files. `[unsourced — industry consensus only]` Anthropic's position: use the three modern tokens above.

**Anthropic explicitly recommends robots.txt over IP blocking:** "alternate methods like blocking IP addresses ... may not work correctly."

**Practical takeaway:** Keep `anthropic-ai` listed in robots.txt for backward compatibility but trust the three named bots.

---

### 3.3 Perplexity

Source: `docs.perplexity.ai/guides/bots`.

#### PerplexityBot (search/index)
- **UA string:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)`
- **Purpose (verbatim):** "Designed to surface and link websites in search results on Perplexity. **It is not used to crawl content for AI foundation models.**"
- **IPs:** `https://www.perplexity.com/perplexitybot.json`
- **Robots.txt:** Honors.

#### Perplexity-User (real-time)
- **UA string:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)`
- **Purpose:** "Supports user actions within Perplexity. When users ask Perplexity a question, it might visit a web page to help provide an accurate answer and include a link to the page in its response."
- **Robots.txt:** "**Generally ignores robots.txt rules**" since a user initiated the request.
- **IPs:** `https://www.perplexity.com/perplexity-user.json`

**Critical Perplexity citation patterns** (Averi.ai 2026 B2B benchmarks):
- Reddit community presence dominates (46.7% of top Perplexity citations).
- 40-60-word lead paragraphs perform optimally.
- Comparison tables with extractable data are prioritized.
- Recently updated content cited 30% more often.
- "X vs Y for Use Case" comparison articles overrepresented.

---

### 3.4 Google

Source: `developers.google.com/search/docs/crawling-indexing/google-common-crawlers` and `/google-special-case-crawlers`.

| Bot | UA string (canonical) | Purpose |
|---|---|---|
| Googlebot Smartphone | `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/_W.X.Y.Z_ Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` | Mobile-first index |
| Googlebot Desktop | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/_W.X.Y.Z_ Safari/537.36` | Desktop |
| Googlebot-Image | `Googlebot-Image/1.0` | Image search |
| Googlebot-Video | `Googlebot-Video/1.0` | Video |
| GoogleOther | `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X...) ... (compatible; GoogleOther)` | Internal R&D, may include AI experiments |
| Google-Extended | (no separate UA — token-only in robots.txt) | Opt-out from training Gemini & Vertex AI generative models |
| Google-CloudVertexBot | UA includes "Google-CloudVertexBot" substring | On-demand crawl when site owner builds a Vertex AI Agent |
| Google-Agent | `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Google-Agent; +https://developers.google.com/crawling/docs/crawlers-fetchers/google-agent) Chrome/_W.X.Y.Z_ Safari/537.36` | Project Mariner / Gemini agentic browsing on user's behalf |
| Storebot-Google | `Mozilla/5.0 (X11; Linux x86_64; Storebot-Google/1.0) AppleWebKit/537.36 ... Chrome/_W.X.Y.Z_ Safari/537.36` | Shopping graph |
| AdsBot-Google | `AdsBot-Google (+http://www.google.com/adsbot.html)` | Ad landing-page quality |

**Google's three categories** (verbatim from overview): "Common crawlers," "Special-case crawlers," "User-triggered fetchers." All Google crawlers crawl only the first **15MB** of a file. They support HTTP/1.1 + HTTP/2 and accept gzip/deflate/Brotli.

**AI Overviews / AI Mode UA:** Google has **not published a dedicated UA for AI Overviews**. AI Overviews source content from the regular Google Search index, which means Googlebot is the de facto AI Overviews crawler. `Google-Extended` exists only as a robots.txt token that opts content out of *generative-model training and grounding*; it does **not** prevent AI Overviews from displaying content (this is a critical and frequently misunderstood distinction). `[partially unsourced — vendor has not formally clarified, industry consensus across multiple SEO analyses]`

**Google-Agent** is the new (2025-2026) agentic UA appearing when Project Mariner / Gemini visits a site to complete a user task. HUMAN telemetry shows agentic traffic up 6900% YoY. Treated as user-initiated.

---

### 3.5 Microsoft / Bing

Source: `bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0` (the live page returns minimal content via WebFetch; cross-referenced with `blogs.bing.com`).

#### bingbot
- **Desktop UA:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/W.X.Y.Z Safari/537.36`
- **Mobile UA:** `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)`
- **Legacy UA (phasing out):** `Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)`
- **JS execution:** Yes — bingbot uses Microsoft Edge rendering engine.
- **Powers Copilot Search.** Copilot has no separate crawler UA published; it queries the bingbot index plus performs grounding queries on the user's behalf.

#### BingPreview
- **Mobile UA examples:** `Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 BingPreview/1.0b`
- **Purpose:** Render snapshots for SERP previews; also visits when users hover/expand previews. Effectively the same engine that Copilot grounding uses.

#### MSNBot-Media
- **UA token:** `msnbot-media`. Image and media crawl. Honors robots.txt.

**Practical takeaway:** ChatGPT search uses Bing's index. Optimizing for Bing = optimizing for ChatGPT-Search = optimizing for Copilot. This is the highest-leverage single-bot optimization.

---

### 3.6 Apple

Source: `support.apple.com/en-us/119829`.

#### Applebot
- **Desktop UA prefix:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, ...)` (full string includes Applebot identifier)
- **Mobile UA prefix:** `Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15`
- **Apple Podcasts:** `iTMS`
- **Reverse DNS:** `*.applebot.apple.com`
- **JS execution:** **Yes — full browser rendering.** Per Apple: "If javascript, CSS, and other resources are blocked via robots.txt, it may not be able to render the content properly."
- **Purpose:** Powers Spotlight, Siri, Safari Suggestions, and (via Applebot-Extended opt-out) **Apple Intelligence, Services, and Developer Tools**.
- **IP JSON:** Apple developer resource page.

#### Applebot-Extended
- **UA token:** `Applebot-Extended` (does NOT crawl — it's a robots.txt directive only).
- **Verbatim:** "Applebot-Extended does not crawl webpages. Webpages that disallow Applebot-Extended can still be included in search results."
- Disallowing it opts content out of training Apple Intelligence foundation models.

**Practical takeaway:** Applebot is one of the very few crawlers that fully renders JavaScript. Pages that work in Apple's index will likely work everywhere.

---

### 3.7 Meta

Source: `developers.facebook.com/docs/sharing/bot/`.

| Bot | UA | Purpose | Robots.txt |
|---|---|---|---|
| meta-externalagent | `meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)` | "training foundation AI models or improving products by indexing content directly" | Honors |
| meta-externalfetcher | `meta-externalfetcher/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)` | Fetches "at user request for evaluating and improving agentic AI capabilities" | "**May bypass robots.txt rules**" |
| facebookexternalhit | `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)` | Crawls shared content for "title, description, and thumbnail image" (OG tags) | "**Might bypass robots.txt** when performing security or integrity checks" |
| FacebookBot | (string varies; identifies as FacebookBot) | "AI speech recognition technology" training | Honors |

**Practical takeaway:** facebookexternalhit will fetch your OG tags regardless of robots.txt — make sure they're correct (og:title, og:description, og:image, og:url, og:site_name).

---

### 3.8 Smaller / Emerging Agents

#### Amazonbot (Alexa + Amazon AI)
- **UA:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot) Chrome/119.0.6045.214 Safari/537.36`
- **Purpose (verbatim):** "Used to improve our products and services" and "may be used to train Amazon AI models."
- **Robots.txt:** Honors. Also respects `rel=nofollow`, `<meta name="robots">` with `noarchive`, `noindex`, `none`. Caches robots.txt up to 30 days.
- **IPs:** `https://developer.amazon.com/amazonbot/ip-addresses/`
- **Source:** `developer.amazon.com/amazonbot`

#### Bytespider (TikTok / ByteDance)
- **UA:** `Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)`
- **Purpose:** Trains ByteDance LLMs (Doubao/Lark) and powers TikTok recommendation/search.
- **Robots.txt:** **Widely reported to ignore robots.txt** (F5, DataDome, multiple webmaster forums). ByteDance officially claims compliance.
- **Aggressive crawl rate** — community consensus is to firewall-block at IP/UA level if undesired.

#### CCBot (Common Crawl)
- **UA:** `CCBot/2.0 (https://commoncrawl.org/faq/)` (older: `CCBot/1.0 (+https://commoncrawl.org/bot.html)`)
- **Purpose:** Open repository of web crawl data — feeds OpenAI, Google, Anthropic, Meta, and basically every LLM training pipeline.
- **Robots.txt:** Honors. Verifiable via reverse DNS (`*.crawl.commoncrawl.org`).
- **IPs:** `https://index.commoncrawl.org/ccbot.json`
- **Source:** `commoncrawl.org/ccbot`

#### Cohere
- **cohere-training-data-crawler** — training. Honors robots.txt.
- **cohere-ai** — `Mozilla/5.0 (compatible; Cohere-AI/1.0; +https://cohere.com/)` — real-time fetch for chat responses (unconfirmed status per knownagents.com).

#### Diffbot
- **UA (canonical):** `Mozilla/5.0 (compatible; Diffbot/0.1; +http://www.diffbot.com/our-apis/crawler/)`
- **JS execution:** **Yes — full render including CSS, images, JavaScript.**
- **Robots.txt:** Officially yes, but practically disputed — known to spoof Chrome UA on some plans.
- **IPs:** AWS, GCP, Azure, Hurricane Electric — wide ranges, hard to firewall.

#### YouBot (You.com)
- **UA:** `Mozilla/5.0 (compatible; YouBot/1.0; +https://you.com/bot)`
- Honors robots.txt. Used for You.com search + AI summaries.

#### AI2Bot / Ai2Bot-Dolma / AI2Bot-DeepResearchEval
- Allen Institute for AI's crawlers. Feed Dolma dataset / OLMo open models.
- Claims to honor robots.txt; one third-party source disputes this. UA strings include `AI2Bot`, `Ai2Bot-Dolma`, `AI2Bot-DeepResearchEval`.

#### DuckAssistBot
- **UA:** `DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)`
- **Purpose:** Real-time fetch for DDG AI-assisted answers (with prominent source citations).
- **Robots.txt:** Honors (72-hour propagation). **Data is not used for AI training.**
- **IPs:** `duckduckgo.com/duckassistbot.json` (mostly Azure 20.x/40.x/52.x ranges).
- Opting out does not affect organic search ranking.

#### Mistral
- **MistralAI-User:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)` — Le Chat real-time fetch when user asks a question. **Not used for training.**
- **MistralAI-Index:** `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-Index/1.0; +https://docs.mistral.ai/robots)` — Le Chat search index. **Not used for training.**
- **IPs:** `mistral.ai/mistralai-user-ips.json`, `mistral.ai/mistralai-index-ips.json`.

#### xAI / Grok
- **No official documentation page from xAI as of 2026-05.** Documented strings include `GrokBot/1.0`, `xAI-Grok/1.0`, `Grok-DeepSearch/1.0`, but **rarely observed in the wild.**
- Grok's browse tool routinely uses **disguised iPhone Safari UA**: `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`. Residential IP rotation reported by HumanSecurity.
- **Implication:** You cannot reliably control xAI access via UA-based robots.txt. Treat as unblockable real-time fetcher.

---

## 4. The `llms.txt` and `llms-full.txt` Specification

Source: `llmstxt.org` (Jeremy Howard / Answer.AI proposal).

### Purpose (verbatim)
> "a proposal to standardise on using an /llms.txt file to provide information to help LLMs use a website at inference time."

### File location
- `/llms.txt` at the site root.
- `/llms-full.txt` at the site root — full Markdown export of the documentation/content.

### Format

The spec mandates Markdown-based structure (not XML/JSON):

> "The llms.txt file is unusual in that it uses Markdown to structure the information rather than a classic structured format such as XML."

### Required & optional sections (in order)
1. **H1** — name of project/site. *Only required section.*
2. **Blockquote** — short summary "containing key information necessary for understanding the rest of the file." (Strongly recommended.)
3. **Body content** — zero or more Markdown paragraphs/lists, no headings.
4. **H2 sections** — "file lists" of curated URLs.
5. **`## Optional`** — special section: URLs here "can be skipped if a shorter context is needed. Use it for secondary information which can often be skipped."

### Verbatim spec template
```
# Title

> Optional description goes here

Optional details go here

## Section name

- [Link title](https://link_url): Optional link details

## Optional

- [Link title](https://link_url)
```

### Adoption status (May 2026)
- **Confirmed fetching:** Anthropic crawlers, Microsoft crawlers, OpenAI crawlers (per multiple 2026 industry analyses), Cursor, GitHub Copilot, Mintlify-hosted docs.
- **Confirmed NOT fetching (as of late 2025):** PerplexityBot, Google-Extended, ClaudeBot (the search variant did fetch, training did not), GPTBot — per aeoengine.ai October 2025 telemetry. *This data is older; 2026 data showing OpenAI/MS/Anthropic fetches is more recent.*
- **Adoption rate:** 10.13% of crawled domains have an `llms.txt`; only 1 of the top 50 AI-cited domains has one. Asymmetric upside.

### Recommended `llms.txt` for a B2B Consultancy (preissersolutions.com template)

```markdown
# Preisser Solutions

> Premium business automation consultancy specializing in AI-driven workflows, Stripe-grade product engineering, and operational system design for high-growth B2B companies. Founded by Tyler Preisser. Based in [LOCATION]. Serves clients globally.

Preisser Solutions builds custom automation, integrations, and product infrastructure for companies that have outgrown off-the-shelf tools. Engagements typically run 4-12 weeks and combine strategy, engineering, and operator handoff. We do not sell software products — we build systems for you.

## Services

- [AI Workflow Automation](https://preissersolutions.com/services/automation): Custom multi-step automations using LLMs, MCP servers, and event-driven architectures.
- [Product Engineering](https://preissersolutions.com/services/engineering): Full-stack builds in Next.js / TypeScript / Cloudflare with first-principles design.
- [Operational Systems](https://preissersolutions.com/services/operations): Internal tooling, dashboards, and data pipelines that reduce headcount needs.

## About

- [About Preisser Solutions](https://preissersolutions.com/about): Company story, values, and engagement philosophy.
- [Tyler Preisser](https://preissersolutions.com/about/tyler): Founder bio, background, and credentials.

## Case Studies

- [Case Studies Overview](https://preissersolutions.com/case-studies): Outcomes and metrics from past engagements.

## Contact

- [Book a Discovery Call](https://preissersolutions.com/contact): How to start a conversation about a project.

## Optional

- [Blog](https://preissersolutions.com/blog): Long-form essays on automation, engineering, and consultancy operations.
- [Privacy Policy](https://preissersolutions.com/privacy)
- [Terms of Service](https://preissersolutions.com/terms)
```

### `llms-full.txt`
Same site, single file, contains the full Markdown text of every public page concatenated in document order with H1/H2 hierarchy preserved. Cursor and developer-AI tools prefer this format because it is single-fetch.

---

## 5. Schema.org Priority Matrix for AI Citation

Based on Averi.ai 2026 benchmarks, ALM Corp 2026 schema guide, and frase.io / ZipTie.dev FAQ analyses.

| Schema Type | AI Citation Lift | Required for B2B consultancy? | Where to use |
|---|---|---|---|
| **Organization** | Tier 1 — site-wide | **Yes** | Root layout, every page |
| **Service** | Tier 1 | **Yes** | Each `/services/*` page |
| **FAQPage** | **>20% citation lift on AI Overviews** | **Yes** | Service pages, FAQ page, contact |
| **Article** | Tier 1 | **Yes** | Every blog post |
| **Person** | Tier 2 | **Yes** | About/team pages (founder schema) |
| **LocalBusiness** | Tier 2 | If physical office or local-service play | Footer/contact |
| **BreadcrumbList** | Tier 2 — site-wide | **Yes** | Every non-home page |
| **WebSite** + `SearchAction` | Tier 2 | Recommended | Root layout |
| **Product** | High | Only if productized service | Productized offerings |
| **Review / AggregateRating** | High when authentic | Yes (testimonials) | Case studies, service pages |
| **HowTo** | Medium | Optional | Process/methodology pages |
| **VideoObject** | Medium for AI Overviews | If hosting video | Pages with video |
| **CreativeWork** | Low | No | Skip |

**Key data points:**
- "Tier 1 schema types generate a 3:1 improvement in AI citation rate compared to unstructured content." (averi.ai)
- "FAQPage schema increases AI Overview citation probability by over 20% compared to equivalent pages without it."
- "Without proper schema implementation, websites could lose up to 60% of their visibility by 2026 as AI search continues growing." (almcorp 2026)
- Pages with **15+ recognized entities** show 4.8x higher selection probability in Google AI Overviews — implies entity-rich `sameAs` links and `mentions` in Organization/Person schema.
- 92.36% of Google AI Overview citations come from pages also ranking in the top 10 organic results — schema must complement, not replace, classic SEO.

**Implementation:**
- Use **JSON-LD** in `<head>`. Microdata and RDFa are deprecated for AI purposes.
- Cross-link entities via `sameAs` to LinkedIn, X, Crunchbase, Wikipedia (where applicable), GitHub.
- For `Service`, populate `serviceType`, `provider` (linked to Organization), `areaServed`, `audience`, and `offers`.
- For `FAQPage`, use `Question` + `acceptedAnswer` with the answer text matching the visible HTML answer verbatim.

---

## 6. Content Patterns That Get Cited

### What ChatGPT cites (Ahrefs 1.4M-prompt study)
1. **Title semantic relevance to internal fanout queries** is the single strongest signal. Cited URLs show 0.656 cosine similarity to fanout queries vs 0.484 for non-cited.
2. **Natural-language URL slugs** — 89.78% citation rate vs 81.11% for non-natural slugs.
3. **88.46% of citations come from the "search" retrieval channel** — meaning Bing-indexed web pages. Reddit (1.93%), YouTube (0.51%), Academia (0.40%) are rarely cited despite being retrieved heavily.
4. **Freshness matters for news-style queries.** Cited news pages skew younger (~200 days median) vs non-cited (~300 days).
5. ChatGPT prefers **comprehensive content >2,000 words** with strong topical completeness.
6. **120-180 words between headings receive 70% more citations** (Averi.ai).
7. Surprisingly, **FAQ-style headings underperform straightforward headings** on ChatGPT (3.4 vs 4.3 citations) — this contradicts the general AI-Overview FAQ-lift finding.

### What Perplexity cites
1. Reddit (46.7% of top citations) — suggests answer-engine optimization should include Reddit discussion of your brand.
2. **40-60-word lead paragraphs** with direct answers.
3. Comparison tables with extractable numerical data.
4. Recently updated content.
5. "X vs Y" comparison articles.
6. Authority alone is insufficient without community validation.

### What Google AI Overviews cites
1. **Multi-modal content** — text + images + videos + structured data on the same page (78% of featured sources).
2. Pages already ranking organic top 10 (92.36% overlap).
3. **15+ recognized entities** (4.8x higher selection probability).
4. **Comparison tables with schema markup** — 47% higher citation rate.
5. Strong E-E-A-T signals (96% of citations).

### Universal patterns
1. **Lead with a direct answer.** Every section's first 1-2 sentences are the citation target.
2. **Named entities + dates + specific numbers** in answer-style paragraphs.
3. **Question as H2/H3, declarative sentence as first answer line** — the "answer capsule" pattern.
4. **Tables for comparable data** (price, timeline, deliverables, vs-competitor matrices).
5. **Case studies with specific outcomes** — quantified results, dates, named clients (when permission allows).

---

## 7. Per-Agent Tailoring (UA-based serving)

The cloaking line: **Do not serve different *content* to AI agents than to humans.** This violates Google's spam policies and Anthropic's terms of service, and it is detected.

**What is acceptable:**
- Serve the same HTML but with **denser hydration** (i.e., more inline server-rendered content) when UA is identified as an AI bot — this is not cloaking, it's progressive enhancement going the other direction.
- Serve **different response headers** (e.g., `Content-Signal: ai-train=no, search=yes, ai-input=yes` for AI bots; absent for humans). Cloudflare's Markdown for Agents service does this.
- Serve **Markdown rendition** at the same URL with `Accept: text/markdown` or via a `?format=markdown` parameter (Cloudflare Markdown for Agents pattern). Not UA-based, content-negotiation-based.
- Skip heavy media (autoplay videos, large hero images) for crawlers without lying about content.

**What is NOT acceptable:**
- Different prices, claims, or testimonials between human and AI versions.
- Hidden text injected only when UA matches a bot.
- Redirecting AI bots to a different URL.

**Verification of bot identity:** Always verify with **reverse DNS or published IP JSON file** before trusting a UA string — UA spoofing is rampant (Grok, scrapers, attackers per HumanSecurity 2026 report on AI crawler spoofing).

---

## 8. The Cloudflare `Content-Signal` Standard (CC0)

Source: `contentsignals.org`, `blog.cloudflare.com/content-signals-policy/`. Released CC0 — anyone can implement.

### Three signals
- **`search`** — "building a search index and providing search results (e.g., returning hyperlinks and short excerpts from your website's contents)"
- **`ai-input`** — "inputting content into one or more AI models (e.g., retrieval augmented generation, grounding, or other real-time taking of content for generative AI search answers)"
- **`ai-train`** — "training or fine-tuning AI models"

### Values
- `=yes` → permission granted for that use.
- `=no` → permission denied.
- *omitted* → neutral / no expressed preference.

### robots.txt syntax (verbatim Cloudflare example)
```
User-Agent: *
Content-Signal: search=yes, ai-train=no
Allow: /
```

### HTTP response header (Markdown for Agents default)
```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

### Recommended for preissersolutions.com
```
User-Agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
```
This expresses: "yes you may index me for search; yes you may use my content as real-time RAG input with citation; no you may not bake me into the model weights."

---

## 9. `.well-known/ai-plugin.json` (ChatGPT Plugins) — STATUS: DEPRECATED

- Plugin beta announced March 2023, **shut down by April 2024**.
- Custom GPTs with Actions (Nov 2023) replaced plugins; still active but in maintenance mode.
- **MCP (Model Context Protocol)** — Anthropic spec from Nov 2024, adopted by OpenAI at DevDay October 2025 — is the current path forward. Cursor, Claude, ChatGPT, Copilot all support it.

**Bottom line:** `.well-known/ai-plugin.json` is **not relevant for new development in 2026.** Skip it. If preissersolutions.com wants to expose data to AI clients, ship an MCP server instead.

---

## 10. Sitemaps, IndexNow, and Discovery

- **`sitemap.xml`** at root — used by Googlebot, bingbot, Applebot, Amazonbot, ClaudeBot. Submit via Google Search Console + Bing Webmaster Tools.
- **`sitemap_index.xml`** if multiple sitemaps.
- **`robots.txt` `Sitemap:` directive** — declares sitemap location to all crawlers.
- **IndexNow** (`api.indexnow.org`) — instant push notification of new/updated URLs to Bing, Yandex, Naver, Seznam. **bingbot honors this.** Indirectly benefits ChatGPT search (Bing-backed).
- **Google's `URL Inspection API`** — programmatic re-crawl request via Search Console.
- **`<link rel="canonical">`** — every page; AI crawlers respect it.

---

## 11. OpenGraph and Twitter Cards (still required in 2026)

facebookexternalhit, LinkedInBot, Twitterbot, Slackbot, Discordbot all read OG tags regardless of robots.txt for share previews. Required minimum:

```html
<meta property="og:type" content="website" />  <!-- or "article" for posts -->
<meta property="og:url" content="https://preissersolutions.com/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://preissersolutions.com/og/...png" />
<meta property="og:site_name" content="Preisser Solutions" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@preissersolutions" />
```

For articles, add `og:article:author`, `og:article:published_time`, `og:article:modified_time`, `og:article:section`, `og:article:tag`.

---

## 12. Verification Methods — Did the Agent Parse Your Page Correctly?

| Method | What it tests | URL/Tool |
|---|---|---|
| Google Rich Results Test | JSON-LD validity for Googlebot/AI Overviews | `search.google.com/test/rich-results` |
| Schema.org Validator | Generic schema validity | `validator.schema.org` |
| Bing URL Inspection | bingbot view of your page | Bing Webmaster Tools → URL Inspection |
| OG Debugger | facebookexternalhit preview | `developers.facebook.com/tools/debug/` |
| Twitter Card Validator | Twitterbot preview | `cards-dev.twitter.com/validator` (legacy; X removed but still works for some) |
| LinkedIn Post Inspector | LinkedInBot preview | `linkedin.com/post-inspector/` |
| Curl with UA | Static HTML view | `curl -A "GPTBot" https://preissersolutions.com/...` |
| Cloudflare bot analytics | Real bot traffic logs | CF dashboard → Security → Bots |
| Live ChatGPT/Claude/Perplexity test | Ask each model a question your page should answer; check if cited | Manual |
| Bing Webmaster Tools AI Performance Report | Tracks Copilot/ChatGPT-via-Bing citations | BWT → AI Performance |
| ai.robots.txt project | Standardized AI bot blocklist comparison | github.com/ai-robots-txt/ai.robots.txt |

**Direct citation testing protocol:**
1. Pick 5 questions a customer might ask that your page answers.
2. Ask each question in ChatGPT (with web search), Claude, Perplexity, Google AI Mode, Bing Copilot, Grok, You.com, DuckDuckGo.
3. Note which answers cite your URL, which cite a competitor, which cite Reddit/Wikipedia/news.
4. For uncited answers: copy the AI's answer text and grep your page for the same wording. If no overlap, you're not the source. If overlap, you're being used uncited — file feedback / open a support ticket.
5. Re-test monthly. ChatGPT recency bias means content updated within 1-2 weeks gets re-cited.

---

## 13. Sources (accessed 2026-05-04)

### Vendor official documentation
- OpenAI bots: `https://developers.openai.com/api/docs/bots`
- Anthropic crawlers: `https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler`
- Perplexity bots: `https://docs.perplexity.ai/guides/bots`
- Google common crawlers: `https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers`
- Google special-case crawlers: `https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers`
- Google crawlers overview: `https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers`
- Bing crawlers help: `https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0`
- Bing bingbot UA announcement: `https://blogs.bing.com/webmaster/april-2022/Announcing-user-agent-change-for-Bing-crawler-bingbot`
- Apple Applebot: `https://support.apple.com/en-us/119829`
- Meta crawlers: `https://developers.facebook.com/docs/sharing/bot/`
- Amazon Amazonbot: `https://developer.amazon.com/amazonbot`
- Common Crawl CCBot: `https://commoncrawl.org/ccbot`
- Mistral AI crawlers: `https://docs.mistral.ai/robots`
- DuckDuckGo DuckAssistBot: `https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot`
- llms.txt spec: `https://llmstxt.org/`
- Cloudflare Content Signals: `https://blog.cloudflare.com/content-signals-policy/` and `https://contentsignals.org/`
- Google blog AI Overviews: `https://blog.google/products/search/generative-ai-google-search-may-2024/`

### Industry analyses cross-referenced
- Ahrefs 1.4M ChatGPT citation study: `https://ahrefs.com/blog/why-chatgpt-cites-pages/`
- Averi.ai B2B SaaS Citation Benchmarks 2026: `https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026)`
- HumanSecurity AI crawler spoofing: `https://www.humansecurity.com/learn/blog/ai-crawler-spoofing-chatgpt-mistral-perplexity/`
- HumanSecurity 2026 crawlers list: `https://www.humansecurity.com/learn/blog/crawlers-list-known-bots-guide/`
- No Hacks 2026 AI UA landscape: `https://nohacks.co/blog/ai-user-agents-landscape-2026`
- Momentic AI search crawlers: `https://momenticmarketing.com/blog/ai-search-crawlers-bots`
- Known Agents (formerly Dark Visitors) directory: `https://knownagents.com/`
- CrawlerCheck directory: `https://crawlercheck.com/directory/ai-bots`
- ALM Corp 2026 schema guide: `https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/`
- ALM Corp Markdown for Agents guide: `https://almcorp.com/blog/cloudflare-markdown-for-agents-complete-guide/`
- WPRiders schema for AI citations: `https://wpriders.com/schema-markup-for-ai-search-types-that-get-you-cited/`
- ZipTie.dev FAQ schema for AI: `https://ziptie.dev/blog/faq-schema-for-ai-answers/`
- aeo.press State of llms.txt 2026: `https://www.aeo.press/ai/the-state-of-llms-txt-in-2026`
- aeoengine llms.txt usage report: `https://aeoengine.ai/blog/llms-txt-zero-usage-ai-bots-ignore`
- SearchEngineLand on Google-Agent: `https://searchengineland.com/google-agent-user-agent-472674`
- Cloudflare Markdown for Agents: `https://blog.cloudflare.com/markdown-for-agents/`
- ai.robots.txt repo: `https://github.com/ai-robots-txt/ai.robots.txt`

### Vendor IP JSON files (for verification)
- `https://openai.com/gptbot.json`
- `https://openai.com/chatgpt-user.json`
- `https://openai.com/searchbot.json`
- `https://claude.com/crawling/bots.json`
- `https://www.perplexity.com/perplexitybot.json`
- `https://www.perplexity.com/perplexity-user.json`
- `https://duckduckgo.com/duckassistbot.json`
- `https://mistral.ai/mistralai-user-ips.json`
- `https://mistral.ai/mistralai-index-ips.json`
- `https://index.commoncrawl.org/ccbot.json`
- `https://developer.amazon.com/amazonbot/ip-addresses/`

---

**End of reference.**
