import { notFound } from "next/navigation"
import { NewsPageContent } from "@/app/news/page"
import { getLanguageConfig } from "@/lib/content-db"

export const revalidate = 60
export const dynamicParams = true

export default async function LocaleNewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [{ locale }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) notFound()
  return <NewsPageContent locale={locale} />
}
