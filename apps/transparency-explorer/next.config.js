/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: [
    '@privefi/core',
    '@privefi/transparency',
    '@privefi/mockchain',
    '@privefi/utils'
  ]
}

module.exports = nextConfig