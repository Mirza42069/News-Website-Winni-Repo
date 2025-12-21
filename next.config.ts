import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
            {
                protocol: 'https',
                hostname: '**.fbcdn.net',
            },
            {
                protocol: 'https',
                hostname: '**.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            }
        ],
    },
};

export default nextConfig;
