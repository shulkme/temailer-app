import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // antd v5存在 findDOMNode 警告
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'picook.oss-ap-southeast-1.aliyuncs.com',
      //   pathname: '/static/**',
      // },
    ],
  },
};

export default withNextIntl(nextConfig);
