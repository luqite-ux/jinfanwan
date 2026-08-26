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
