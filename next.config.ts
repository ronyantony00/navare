import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  productionBrowserSourceMaps: false,
  generateEtags: false,

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@electric-sql/pglite'],
  compress: true,

  images: {
    formats: ['image/webp', 'image/avif'] as const,
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_BASE_URL?.replace('https://', '') || 'localhost',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME?.replace('https://', '') || 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'd9ouozp3mq81k.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      'react-icons',
      '@mui/material',
      'gsap',
      'swiper',
    ],
  },

  // 🔥 CRITICAL: Perfect Cache Headers + Security Headers
  async headers() {
    return [
      // Static assets - Cache forever (immutable with hash)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js optimized images - 30 days
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
        ],
      },
      // ISR pages - Align with CDN TTLs
      {
        source: '/((?!_next/static|_next/image|api|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=10, stale-while-revalidate=60',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      // API routes - Never cache
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  {
    org: process.env.SENTRY_ORG || 'nextjs-boilerplate-org',
    project: process.env.SENTRY_PROJECT || 'nextjs-boilerplate',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    telemetry: false,
  },
);
