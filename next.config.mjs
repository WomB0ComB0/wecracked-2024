/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
    scrollRestoration: true,
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
    },
  },
};

export default nextConfig;
