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
  // Use empty turbopack config to silence the warning and use default Turbopack
  turbopack: {},
  // Server-only modules configuration (moved from experimental in Next.js 16)
  serverExternalPackages: ['@prisma/client', 'prisma'],
}

export default nextConfig
