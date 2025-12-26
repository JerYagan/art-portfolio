/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/art-portfolio",
  assetPrefix: "/art-portfolio/",
  reactCompiler: true,
};

export default nextConfig;
