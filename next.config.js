/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["icons8.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.xml$/,
      use: [{ loader: "xml-loader" }],
    });

    return config;
  },
};

module.exports = nextConfig;
