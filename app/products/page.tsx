import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { getCategories, getProducts } from "@/lib/content-db"

export const metadata = {
  title: "Food Storage Container Products | JINFANWAN",
  description: "Explore JINFANWAN plastic food containers and vented, tempered-glass, and silicone lid structures for B2B sourcing.",
  alternates: { canonical: "/products" },
}

export const revalidate = 60

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Products"
          title="Food storage container series for B2B sourcing"
          text="Explore plastic containers and vented, tempered-glass, and silicone lid structures. Product specifications and order requirements are confirmed through direct inquiry."
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
              <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span className="pill">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <span className="card-action">View product <ArrowRight size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
