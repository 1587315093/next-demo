/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["antd-mobile"],
  pages: {
    "src/app.tsx": { page: "/app" },
  },
};

module.exports = nextConfig;
