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
  // Empty turbopack config to acknowledge Turbopack is being used
  // The '@' alias is already configured in tsconfig.json
  turbopack: {
    experimental: {
      useSystemTlsCerts: true,
    },
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
