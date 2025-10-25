/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // izinkan semua domain
      },
    ],
  },
};

export default nextConfig;
