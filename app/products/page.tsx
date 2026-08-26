import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { ProductCatalogGrid } from "@/components/product-catalog-grid"
import { getCategories, getProducts } from "@/lib/content-db"

export const metadata = {
  title: "Food Storage Container Products | JINFANWAN",
  description: "Explore JINFANWAN plastic food containers and vented, tempered-glass, and silicone lid structures for B2B sourcing.",
  alternates: { canonical: "/products" },
}

export const revalidate = 60

export async function ProductsPageContent({ locale = "en" }: { locale?: string }) {
  const [categories, products] = await Promise.all([getCategories(locale), getProducts(locale)])
  const localePrefix = locale === "en" ? "" : `/${locale}`
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
          <ProductCatalogGrid categories={categories} products={products} localePrefix={localePrefix} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function ProductsPage() {
  return <ProductsPageContent />
}
