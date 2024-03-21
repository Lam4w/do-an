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
      {
        hostname: "utfs.io",
      },
      {
        hostname: "uploadthing.com",
      }
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;