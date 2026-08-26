import { expandedCategories, expandedProducts } from "./product-catalog.ts"

export function buildCatalogSeed(tenantId: string, publicImageUrl: (image: string) => string) {
  if (!tenantId.trim()) throw new Error("A verified tenant identity is required")

  const categories = expandedCategories.map((category, index) => ({
    tenant_id: tenantId,
    slug: category.slug,
    name: category.name,
    name_en: category.name,
    name_i18n: { en: category.name },
    description: category.summary,
    description_en: category.summary,
    description_i18n: { en: category.summary },
    icon: publicImageUrl(category.image),
    sort_order: index,
    is_active: true,
    extra_data: { multilingual_ready: true, source: "customer expansion PPT" },
  }))

  const products = expandedProducts.map((product, index) => {
    const imageUrl = publicImageUrl(product.image)
    return {
      tenant_id: tenantId,
      slug: product.slug,
      model: `JFW-${String(product.sourceSlide).padStart(3, "0")}`,
      category: product.category,
      category_slug: expandedCategories.find((category) => category.name === product.category)?.slug,
      name: product.name,
      name_en: product.name,
      name_i18n: { en: product.name },
      description: product.summary,
      description_en: product.summary,
      description_i18n: { en: product.summary },
      overview: product.summary,
      overview_en: product.summary,
      overview_i18n: { en: product.summary },
      features: product.details,
      features_i18n: { en: product.details },
      applications: [],
      applications_i18n: { en: [] },
      advantages: [],
      advantages_i18n: { en: [] },
      specs: { Tags: product.tags, "Source slide": product.sourceSlide },
      image_url: imageUrl,
      sort_order: index,
      is_active: true,
      extra_data: {
        images: [imageUrl],
        multilingual_ready: true,
        source: "customer expansion PPT",
        source_slide: product.sourceSlide,
        source_name_zh: product.sourceNameZh,
      },
    }
  })

  return { categories, products }
}

export function validateCatalogSeed(seed: ReturnType<typeof buildCatalogSeed>) {
  if (seed.categories.length !== 6) throw new Error("Catalog must contain exactly 6 categories")
  if (seed.products.length !== 41) throw new Error("Catalog must contain exactly 41 source slides")
  const slides = seed.products.map((row) => row.extra_data.source_slide).sort((a, b) => a - b)
  const expectedSlides = Array.from({ length: 41 }, (_, index) => index + 1)
  if (JSON.stringify(slides) !== JSON.stringify(expectedSlides)) throw new Error("Source slide mapping must cover 1 through 41 exactly once")
  for (const [label, values] of [
    ["product slug", seed.products.map((row) => row.slug)],
    ["category slug", seed.categories.map((row) => row.slug)],
    ["product image", seed.products.map((row) => row.image_url)],
  ] as const) {
    if (values.some((value) => !value) || new Set(values).size !== values.length) throw new Error(`${label} values must be nonempty and unique`)
  }
  const categorySlugs = new Set(seed.categories.map((row) => row.slug))
  if (seed.products.some((row) => !row.category_slug || !categorySlugs.has(row.category_slug))) {
    throw new Error("Every product must reference an expected category slug")
  }
}

export function mergeMaintainedRow<T extends Record<string, any>>(generated: T, existing?: Record<string, any> | null): T {
  if (!existing) return generated
  const manual = new Set(existing.extra_data?.manually_maintained_fields ?? [])
  const merged: Record<string, any> = { ...generated }
  for (const key of Object.keys(generated).filter((field) => field.endsWith("_i18n"))) {
    if (manual.has(key)) {
      merged[key] = existing[key] ?? generated[key]
      continue
    }
    merged[key] = { ...(existing[key] ?? {}), ...(generated[key] ?? {}) }
    for (const locale of Object.keys(existing[key] ?? {})) {
      if (locale !== "en" || manual.has(`${key}.${locale}`)) merged[key][locale] = existing[key][locale]
    }
  }
  merged.extra_data = { ...(existing.extra_data ?? {}), ...(generated.extra_data ?? {}) }
  for (const field of manual) {
    if (field.startsWith("extra_data.")) {
      const nested = field.slice("extra_data.".length)
      if (nested in (existing.extra_data ?? {})) merged.extra_data[nested] = existing.extra_data[nested]
    } else if (!field.includes(".") && field in existing && !field.endsWith("_i18n")) {
      merged[field] = existing[field]
    }
  }
  if (existing.extra_data?.manually_maintained_fields) {
    merged.extra_data.manually_maintained_fields = existing.extra_data.manually_maintained_fields
  }
  return merged as T
}
