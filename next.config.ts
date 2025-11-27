import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ensure API routes are not statically optimized
  staticPageGenerationTimeout: 90,
};

export default nextConfig;
