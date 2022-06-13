/** @type {import('next').NextConfig} */
const path = require("path");
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
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com", "localhost"],
  },
};
module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
module.exports = {
  env: {
    HOSTNAME: process.env.HOSTNAME,
    STREAM_CHAT_KEY: process.env.STREAM_CHAT_KEY,
    STREAM_CHAT_SECRET: process.env.STREAM_CHAT_SECRET,
  },
};
