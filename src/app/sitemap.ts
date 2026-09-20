import type { MetadataRoute } from 'next'
import { SITE } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/stories', '/race-info', '/course-map', '/community-guidelines', '/archive', '/privacy']
  return routes.map(route => ({
    url: `${SITE.url}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
