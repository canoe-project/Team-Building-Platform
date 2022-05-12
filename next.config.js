/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // it should be false by default
};
const withImages = require("next-images");

module.exports = withImages();
module.exports = nextConfig;
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: "csv-loader",
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
};
