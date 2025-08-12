/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@privefi/core',
    '@privefi/transparency',
    '@privefi/mockchain',
    '@privefi/utils'
  ]
}

module.exports = nextConfig