import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hneqztnczuqmoipymsij.supabase.co', // Seu domínio do Supabase
      },
    ],
  },
};

export default nextConfig;