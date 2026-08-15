/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL
      ?.trim()
      .replace(/[\r\n]/g, '')
      .replace(/\/$/, '')

    if (!adminUrl) return []

    return {
      afterFiles: [
        { source: '/admin', destination: `${adminUrl}/admin` },
        { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
