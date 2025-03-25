/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Fix: Must be an object (not boolean)
  },
};

module.exports = nextConfig;
