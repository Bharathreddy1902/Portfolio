/**
 * GITHUB_PAGES=true  → fully static export to ./out (GitHub Pages, any static host).
 * otherwise          → normal Next.js server build (Vercel), with image optimization and /api/contact.
 */
const isPages = process.env.GITHUB_PAGES === "true";
// Only needed for project repos (username.github.io/<repo>). Empty for the username.github.io repo.
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  ...(isPages && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    basePath,
    assetPrefix: basePath || undefined,
  }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: isPages ? "true" : "" },
};

export default nextConfig;
