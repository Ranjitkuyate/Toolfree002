/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {} // ✅ Fixed (kept as an object)
  }
};

module.exports = nextConfig;
