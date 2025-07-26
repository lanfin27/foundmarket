/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@appweb/ui", "@appweb/database"],
  images: {
    domains: ['market.thefounder.co.kr', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.pstatic.net',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)