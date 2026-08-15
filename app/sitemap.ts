import type { MetadataRoute } from 'next'
import { getNews, getProducts } from '@/lib/content-db'
import { company } from '@/lib/site-data'

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

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, news] = await Promise.all([getProducts(), getNews()])
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
