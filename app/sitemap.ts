import type { MetadataRoute } from 'next'
import { company, news, products } from '@/lib/site-data'

const staticRoutes = [
  '',
  '/about-us',
  '/products',
  '/custom-solutions',
  '/manufacturing',
  '/quality-control',
  '/faq',
  '/news',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = [
    ...staticRoutes,
    ...products.map((product) => `/products/${product.slug}`),
    ...news.map((article) => `/news/${article.slug}`),
  ]

  return routes.map((route) => ({
    url: `${company.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
