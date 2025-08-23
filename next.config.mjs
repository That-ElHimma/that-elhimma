/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    domains: ["meistertask.com", "cdn.prod.website-files.com", "i0.wp.com", "www.figma.com"], // add your hosts here
  },
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:; " +
              "object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ]
  },
}
export default nextConfig
