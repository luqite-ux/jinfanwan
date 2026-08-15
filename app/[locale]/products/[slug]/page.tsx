import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { getLanguageConfig, getProducts } from "@/lib/content-db"
import { company } from "@/lib/site-data"

type LocaleProductProps = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: LocaleProductProps) {
  const [{ locale, slug }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) return {}
  const product = (await getProducts(locale)).find((item) => item.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} | JINFANWAN`,
    description: product.summary,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        en: `/products/${slug}`,
        [locale]: `/${locale}/products/${slug}`,
        "x-default": `/products/${slug}`,
      },
    },
  }
}

export default async function LocaleProductPage({ params }: LocaleProductProps) {
  const [{ locale, slug }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) notFound()
  const product = (await getProducts(locale)).find((item) => item.slug === slug)
  if (!product) notFound()
  const image = product.image.startsWith("http") ? product.image : `${company.siteUrl}${product.image}`
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image,
    brand: { "@type": "Brand", name: company.brand },
  }

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={product.category} title={product.name} text={product.summary} />
        <section className="product-detail">
          <div className="detail-image"><img src={product.image} alt={product.name} /></div>
          <div className="detail-copy">
            <div className="tag-row">{product.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
            <h2>Series highlights</h2>
            {product.details.map((detail) => <p key={detail}><CheckCircle2 size={18} /> {detail}</p>)}
          </div>
        </section>
        <section className="inquiry-band">
          <div><span className="eyebrow">Product inquiry</span><h2>Discuss this series with JINFANWAN</h2><p>Send material, size, shape, lid structure, color, and estimated quantity requirements.</p></div>
          <InquiryForm product={product.name} />
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  )
}
