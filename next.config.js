/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'avatars.githubusercontent.com', // GitHub user images
      'lh3.googleusercontent.com', // Google user images
    ],
  },
}

module.exports = nextConfig
