/**
 * Next.js Configuration for GitHub Pages Static Export (/Portfolio)
 */
const basePath = "/Portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: "true",
    NEXT_PUBLIC_SITE_URL: "https://bharathreddy1902.github.io/Portfolio",
  },
};

export default nextConfig;
