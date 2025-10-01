import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/**"),
    ],
  },
};

export default nextConfig;
