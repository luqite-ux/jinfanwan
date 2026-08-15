import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { getProducts } from "@/lib/content-db"
import { company } from "@/lib/site-data"

type ProductDetailProps = { params: Promise<{ slug: string }> }

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const [{ slug }, products] = await Promise.all([params, getProducts()])
  const product = products.find((item) => item.slug === slug)
  return {
    title: product ? `${product.name} | JINFANWAN` : "Product | JINFANWAN",
    description: product?.summary,
    alternates: product ? { canonical: `/products/${product.slug}` } : undefined,
    openGraph: product ? {
      title: `${product.name} | JINFANWAN`,
      description: product.summary,
      type: "website" as const,
      url: `/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    } : undefined,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const [{ slug }, products] = await Promise.all([params, getProducts()])
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${company.siteUrl}${product.image}`,
    brand: { "@type": "Brand", name: company.brand },
  }

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={product.category} title={product.name} text={product.summary} />
        <section className="product-detail">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-copy">
            <div className="tag-row">
              {product.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}
            </div>
            <h2>Series highlights</h2>
            {product.details.map((detail) => (
              <p key={detail}><CheckCircle2 size={18} /> {detail}</p>
            ))}
          </div>
        </section>
        <section className="inquiry-band">
          <div>
            <span className="eyebrow">Product inquiry</span>
            <h2>Discuss this series with JINFANWAN</h2>
            <p>Send material, size, shape, lid structure, color, and estimated quantity requirements.</p>
          </div>
          <InquiryForm product={product.name} />
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  )
}
