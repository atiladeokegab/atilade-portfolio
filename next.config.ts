import type { NextConfig } from "next";

const homepageDiscoveryLinks = [
  '</docs/agents>; rel="service-doc"; type="text/html"',
  '</llms.txt>; rel="service-meta"; type="text/markdown"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: homepageDiscoveryLinks,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
