/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "",
  assetPrefix: process.env.GITHUB_ACTIONS
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : undefined,
};

module.exports = nextConfig;
