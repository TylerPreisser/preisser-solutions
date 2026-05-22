import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  compiler: {
    // Strip all console.* calls from production bundles
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
