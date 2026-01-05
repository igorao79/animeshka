import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.50.94:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
