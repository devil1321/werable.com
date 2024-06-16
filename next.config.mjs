/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=3600',
              },
            ],
          },
        ];
      },
    images: {
        domains: ['files.cdn.printful.com'],
    }
};


export default nextConfig;
