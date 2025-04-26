import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  output: 'standalone',

  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'], // for modern format
    // domains: ['your-image-domain.com'], // if external
  },
  compress: true,
  productionBrowserSourceMaps: true,
  experimental: {
    optimizeCss: true,
    serverActions: {},
  },
};

export default nextConfig;
