import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Next.js built-in image optimization is disabled for static export.
  // `unoptimized: true` is required because `output: "export"` generates
  // static HTML without a Node.js server to run the image optimizer.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
