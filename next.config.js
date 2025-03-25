/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["your-domain.com", "cdn.your-domain.com"], // ✅ Add allowed image domains
    formats: ["image/avif", "image/webp"]
  },
  experimental: {
    serverActions: true // ✅ Ensure compatibility with Next.js 15+
  },
  eslint: {
    ignoreDuringBuilds: true // ✅ Prevents build failure due to linting errors
  }
};

module.exports = nextConfig;
