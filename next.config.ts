import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/**"),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Next.js가 올바른 루트를 추적하도록 지정
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
