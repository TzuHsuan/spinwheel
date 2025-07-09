import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/spinwheel',
  publicRuntimeConfig: { basePath: '/spinwheel' },
  assetPrefix: '/spinwheel',
  /* config options here */
};

export default nextConfig;
