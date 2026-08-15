import { notFound } from "next/navigation"
import { HomePageContent } from "@/app/page"
import { getLanguageConfig } from "@/lib/content-db"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const { defaultLanguage, supportedLanguages } = await getLanguageConfig()
  return supportedLanguages.filter((locale) => locale !== defaultLanguage).map((locale) => ({ locale }))
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const [{ locale }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) notFound()
  return <HomePageContent locale={locale} />
}
