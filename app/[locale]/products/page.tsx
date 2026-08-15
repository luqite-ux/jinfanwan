import { notFound } from "next/navigation"
import { ProductsPageContent } from "@/app/products/page"
import { getLanguageConfig } from "@/lib/content-db"

export const revalidate = 60
export const dynamicParams = true

export default async function LocaleProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [{ locale }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) notFound()
  return <ProductsPageContent locale={locale} />
}
