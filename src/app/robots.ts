import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/stories', '/race-info', '/course-map', '/community-guidelines', '/archive', '/privacy', '/fundraise/'],
      disallow: ['/dashboard', '/ticket', '/training', '/feed', '/profile', '/results', '/teams', '/challenges', '/admin'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
