import type { MetadataRoute } from 'next'
import { getLanguageConfig, getNews, getProducts } from '@/lib/content-db'
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
  const [products, news, languageConfig] = await Promise.all([getProducts(), getNews(), getLanguageConfig()])
  const lastModified = new Date()
  const routes = [
    ...staticRoutes,
    ...products.map((product) => `/products/${product.slug}`),
    ...news.map((article) => `/news/${article.slug}`),
  ]
  const translatedRoutes = languageConfig.supportedLanguages
    .filter((locale) => locale !== languageConfig.defaultLanguage)
    .flatMap((locale) => [
      `/${locale}`,
      `/${locale}/products`,
      ...products.map((product) => `/${locale}/products/${product.slug}`),
      `/${locale}/news`,
      ...news.map((article) => `/${locale}/news/${article.slug}`),
    ])

  return [...routes, ...translatedRoutes].map((route) => ({
    url: `${company.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
