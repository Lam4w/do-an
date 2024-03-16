/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "*.utfs.io",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;