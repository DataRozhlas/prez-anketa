/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/prez-anketa",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "data.irozhlas.cz",
        port: "",
        pathname: "/prez-anketa/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
