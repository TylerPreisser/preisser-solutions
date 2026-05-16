export const siteConfig = {
  name: "Preisser Solutions",
  tagline: "AI-powered marketing for Kansas",
  url: "https://preissersolutions.com",
  contact: {
    email: "sales@preissersolutions.com",
    phone: "+1-620-352-3296",
    location: "Hays, Kansas",
  },
  social: {
    // NOTE: URLs set in advance to canonical handles — once pages are created/renamed,
    // the JSON-LD sameAs array is immediately correct without a code deploy.
    linkedin: "https://www.linkedin.com/company/preissersolutions",
    facebook: "https://www.facebook.com/preissersolutions",
    twitter: "https://x.com/preissersolutions",
  },
  founder: {
    name: "Tyler Preisser",
    title: "Founder & Owner",
  },
  meta: {
    title: "Preisser Solutions",
    description: "AI-powered marketing for Kansas businesses that need sharper websites, stronger local visibility, accountable ads, and practical automation.",
    themeColor: "#0D95E8",
  },
} as const;
