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
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(process.cwd()),
    }
    return config
  },
  // Custom server configuration
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
