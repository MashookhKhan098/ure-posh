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
  // Disable static generation for API routes
  trailingSlash: false,
  // Enable static asset optimization
  experimental: {
    optimizeCss: true,
  },
  // Enable better error handling
  poweredByHeader: false,
  // Disable static export for API routes
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(process.cwd()),
    }
    return config
  },
}

export default nextConfig
