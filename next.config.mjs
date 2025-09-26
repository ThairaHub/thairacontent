/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude client-side only dependencies from server bundle
      config.externals.push('@monaco-editor/react', 'monaco-editor', '@babel/standalone');
    }
    return config;
  },
}

export default nextConfig
