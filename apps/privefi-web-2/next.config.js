/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@privefi/core',
    '@privefi/vault-engine',
    '@privefi/faucet',
    '@privefi/services',
    '@privefi/utils'
  ]
}

module.exports = nextConfig