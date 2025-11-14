/** @type {import('next').NextConfig} */
const nextConfig = {
  // `eslint` config is no longer supported in Next.js 16+ in `next.config.mjs`.
  // If you want to ignore ESLint during builds, run linting via a script or CI step
  // and remove the `eslint` key from this file.
  typescript: {
    // Keep this if you want Next.js to ignore TypeScript build errors during dev/build.
    // Prefer fixing type errors instead of ignoring them in production.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle Prisma Client for the browser
      config.resolve.alias = {
        ...config.resolve.alias,
        '@prisma/client': false,
        '.prisma/client': false,
      }
    }
    return config
  },
}

export default nextConfig
