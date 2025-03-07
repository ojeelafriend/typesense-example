import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/edoze",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com", pathname: "**" },
    ],
  },
};

export default nextConfig;
