export const siteConfig = {
  name: "Preisser Tech",
  tagline: "We Build What Your Business Needs.",
  url: "https://preissertech.com",
  contact: {
    email: "sales@preissertech.com",
    phone: "+1-620-352-3296",
    location: "Hays, Kansas",
  },
  social: {
    // NOTE: LinkedIn and Facebook pages do not exist yet at these URLs.
    // URLs are set in advance to the canonical handles so that once Tyler creates
    // the pages, the JSON-LD sameAs array is immediately correct without a code deploy.
    // LinkedIn: create from scratch at linkedin.com/company/preissertech
    // Facebook: rename existing /preissersolutions page to preissertech via Page Settings
    // Twitter/X: claim @preissertech handle at x.com
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
    description: "World-class tech for your business.",
    themeColor: "#0D95E8",
  },
} as const;
