import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const prefix = isGitHubPages ? "/preisser-solutions" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: prefix,
  assetPrefix: prefix,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: prefix,
  },
  compiler: {
    // Strip all console.* calls from production bundles
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
