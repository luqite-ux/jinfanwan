import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { categories, products } from "@/lib/site-data"

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Products"
          title="Food storage container series for B2B sourcing"
          text="Explore plastic, glass, silicone, and stainless steel lid container directions. No prices are displayed; each product path supports inquiry-based sourcing."
        />
        <section className="section">
          <SectionHeading eyebrow="Categories" title="Start from a material or lid direction" />
          <div className="category-grid">
            {categories.map((category) => (
              <article key={category.slug} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section soft-band">
          <SectionHeading eyebrow="Product families" title="Choose a series and send requirements" />
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.slug}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span className="pill">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <Link href={`/products/${product.slug}`}>View details <ArrowRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
