import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        /*  '/about', '/members', '/films', '/reviews',  */ '/api/og/*',
      ],
    },
  }
}
