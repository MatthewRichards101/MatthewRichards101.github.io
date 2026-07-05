/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
