/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d200w6x3hyri2y.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
