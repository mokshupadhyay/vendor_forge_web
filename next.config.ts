/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
