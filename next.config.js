/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = withLess({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["picsum.photos"],
  },
});

module.exports = nextConfig;
