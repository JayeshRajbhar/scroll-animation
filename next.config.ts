import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/scroll-animation",
  assetPrefix: "/scroll-animation/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
