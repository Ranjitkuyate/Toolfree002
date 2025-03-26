/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
          domains: ['propellerads.com', 'toolsfree.online'],
          formats: ['image/avif', 'image/webp'],
    },
    // Enable Netlify adapter
    target: 'serverless',
    // Configure environment variables
    env: {
          NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://toolsfree.online',
    },
    // Configure headers for security
    async headers() {
          return [
            {
                      source: '/(.*)',
                      headers: [
                        {
                                      key: 'X-Content-Type-Options',
                                      value: 'nosniff',
                        },
                        {
                                      key: 'X-Frame-Options',
                                      value: 'DENY',
                        },
                        {
                                      key: 'X-XSS-Protection',
                                      value: '1; mode=block',
                        },
                                ],
            },
                ];
    },
};

module.exports = nextConfig;
