import { getSupabaseClient } from "@/lib/supabase"
import { categories as fallbackCategories, news as fallbackNews, products as fallbackProducts } from "@/lib/site-data"

type I18nValue = Record<string, unknown> | null | undefined

function localized(value: I18nValue, locale: string, fallback = "en") {
  if (!value || typeof value !== "object") return undefined
  const preferred = value[locale]
  if (typeof preferred === "string" && preferred.trim()) return preferred
  const defaultValue = value[fallback]
  if (typeof defaultValue === "string" && defaultValue.trim()) return defaultValue
  return Object.values(value).find((item) => typeof item === "string" && item.trim()) as string | undefined
}

function localizedList(value: I18nValue, locale: string, fallback = "en") {
  if (!value || typeof value !== "object") return undefined
  for (const key of [locale, fallback, ...Object.keys(value)]) {
    const candidate = value[key]
    if (Array.isArray(candidate) && candidate.every((item) => typeof item === "string")) return candidate
  }
  return undefined
}

export async function getCategories(locale = "en") {
  const db = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!db || !tenantId) return fallbackCategories

  const { data, error } = await db
    .from("product_categories")
    .select("slug,name,name_i18n,description,description_i18n,icon,sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order")

  if (error || !data?.length) return fallbackCategories
  return data.map((row) => ({
    slug: row.slug,
    name: localized(row.name_i18n, locale) ?? row.name,
    image: row.icon,
    summary: localized(row.description_i18n, locale) ?? row.description,
  }))
}

export async function getProducts(locale = "en") {
  const db = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!db || !tenantId) return fallbackProducts

  const { data, error } = await db
    .from("products")
    .select("slug,name,name_i18n,category,description,description_i18n,features_i18n,specs,image_url,sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order")

  if (error || !data?.length) return fallbackProducts
  return data.map((row) => {
    const fallback = fallbackProducts.find((product) => product.slug === row.slug)
    const tags = row.specs && typeof row.specs === "object" && Array.isArray(row.specs.Tags) ? row.specs.Tags : fallback?.tags ?? []
    return {
      slug: row.slug,
      name: localized(row.name_i18n, locale) ?? row.name,
      category: row.category,
      image: row.image_url,
      tags,
      summary: localized(row.description_i18n, locale) ?? row.description,
      details: localizedList(row.features_i18n, locale) ?? fallback?.details ?? [],
    }
  })
}

export async function getNews(locale = "en") {
  const db = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!db || !tenantId) return fallbackNews

  const { data, error } = await db
    .from("articles")
    .select("slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,published_at")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (error) return fallbackNews
  return (data ?? []).map((row) => ({
    slug: row.slug,
    date: row.published_at ? new Date(row.published_at).toISOString().slice(0, 10) : "",
    title: localized(row.title_i18n, locale) ?? row.title,
    excerpt: localized(row.excerpt_i18n, locale) ?? row.excerpt,
    content: localized(row.content_i18n, locale) ?? row.content,
  }))
}
