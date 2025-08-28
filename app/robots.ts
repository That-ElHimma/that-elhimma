import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://thatelhimma.com/sitemap.xml',
    host: 'https://thatelhimma.com',
  }
}
