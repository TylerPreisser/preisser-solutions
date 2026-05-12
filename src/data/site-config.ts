export const siteConfig = {
  name: "Preisser Tech",
  tagline: "AI-powered marketing for Kansas",
  url: "https://preissertech.com",
  contact: {
    email: "sales@preissertech.com",
    phone: "+1-620-352-3296",
    location: "Hays, Kansas",
  },
  social: {
    // NOTE: URLs set in advance to canonical handles — once pages are created/renamed,
    // the JSON-LD sameAs array is immediately correct without a code deploy.
    linkedin: "https://www.linkedin.com/company/preissertech",
    facebook: "https://www.facebook.com/preissertech",
    twitter: "https://x.com/preissertech",
  },
  founder: {
    name: "Tyler Preisser",
    title: "Founder & Owner",
  },
  meta: {
    title: "Preisser Tech",
    description: "AI-powered marketing for Kansas businesses that need sharper websites, stronger local visibility, accountable ads, and practical automation.",
    themeColor: "#0D95E8",
  },
} as const;
