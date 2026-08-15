import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { findByRouteParams, products } from "@/lib/site-data"

type ProductDetailProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const product = await findByRouteParams(products, params)
  return {
    title: product ? `${product.name} | JINFANWAN` : "Product | JINFANWAN",
    description: product?.summary,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await findByRouteParams(products, params)
  if (!product) notFound()

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
    </>
  )
}
