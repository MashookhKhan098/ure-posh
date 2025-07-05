import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    path: '/_next/image/',
  },
  // Disable static generation completely
  trailingSlash: false,
  // Enable static asset optimization
  experimental: {
    optimizeCss: true,
  },
  // Enable better error handling
  poweredByHeader: false,
  // Disable static export completely
  output: 'standalone',
  // Disable static generation for all pages
  generateStaticParams: false,
  // Disable static generation timeout
  staticPageGenerationTimeout: 0,
  // Disable static generation for error pages
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(process.cwd()),
    }
    return config
  },
}

export default nextConfig
