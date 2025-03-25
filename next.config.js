/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {} // ✅ FIXED: Changed from `true` to an empty object `{}`.
  }
};

module.exports = nextConfig;
