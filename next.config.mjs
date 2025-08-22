/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize bundle splitting
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'react-icons'],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize chunks
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra-ui',
            chunks: 'all',
            priority: 10,
          },
          icons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'react-icons',
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }
    return config;
  },
  
  // Enable static optimization
  trailingSlash: false,
  poweredByHeader: false,
  
  // Optimize builds
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
