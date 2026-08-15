import Link from "next/link"
import { ArrowRight, CheckCircle2, Factory, Sparkles } from "lucide-react"
import { Footer, Header, SectionHeading } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { getCategories, getNews, getProducts } from "@/lib/content-db"
import { company, faqs, processSteps, stats } from "@/lib/site-data"

export const revalidate = 60

export async function HomePageContent({ locale = "en" }: { locale?: string }) {
  const [categories, products, news] = await Promise.all([getCategories(locale), getProducts(locale), getNews(locale)])
  const localePrefix = locale === "en" ? "" : `/${locale}`
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Food container manufacturing</span>
            <h1>Food Storage Containers for Global B2B Buyers</h1>
            <p>
              JINFANWAN develops plastic food containers and coordinated plastic, tempered-glass,
              and silicone lid structures for international sourcing programs.
            </p>
            <div className="hero-actions">
              <Link href="/contact#inquiry" className="primary-action">Request a Quote <ArrowRight size={16} /></Link>
              <Link href={`${localePrefix}/products`} className="secondary-action">Explore Products</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-card float-card">
              <img src="/images/products/product-showcase-04.png" alt="JINFANWAN food storage container series" />
            </div>
            <div className="material-note"><Sparkles size={18} /> Clear product options for custom sourcing programs</div>
          </div>
        </section>

        <section className="stats-strip">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="section">
          <SectionHeading
            eyebrow="Product categories"
            title="Container families for modern food storage brands"
            text="Shape, lid structure, and material directions can be matched to your sourcing plan."
          />
          <div className="category-grid">
            {categories.map((category) => (
              <Link href={`${localePrefix}/products`} key={category.slug} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
                <span>View category <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section soft-band">
          <SectionHeading
            eyebrow="Featured series"
            title="Built for inquiry-first B2B sourcing"
            text="Every path is designed for inquiry-led sourcing and product requirement discussions."
          />
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <Link className="product-card" href={`${localePrefix}/products/${product.slug}`} key={product.slug}>
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

        <section className="split-section">
          <div>
            <SectionHeading
              eyebrow="Manufacturing capability"
              title="From product development to scalable container production"
              text="The company integrates product development, design, production, and sales, with equipment capacity for plastic and silicone lid programs."
            />
            <div className="capability-list">
              {["10 injection molding machines", "6 dual-head molding machine sets", "10 liquid silicone machines", "3 workshops across 6,000 m2"].map((item) => (
                <p key={item}><Factory size={18} /> {item}</p>
              ))}
            </div>
          </div>
          <div className="glass-panel">
            <h3>Sealing and material options</h3>
            <p>
              JINFANWAN focuses on practical four-side locking structures, silicone sealing ring
              structures, high borosilicate glass bodies, and coordinated lid variants for vegetables,
              dry food, prepared meals, refrigerator storage, microwave heating, and room-temperature storage.
            </p>
          </div>
        </section>

        <section className="section">
          <SectionHeading eyebrow="Custom process" title="A clear sourcing path for OEM / ODM programs" />
          <div className="process-line">
            {processSteps.map((step, index) => (
              <div key={step}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section two-column">
          <div>
            <SectionHeading eyebrow="FAQ" title="Common buyer questions" />
            <div className="faq-list">
              {faqs.slice(0, 3).map(([question, answer]) => (
                <article key={question}>
                  <h3><CheckCircle2 size={18} /> {question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="News" title="Sourcing insights" />
            <div className="news-list">
              {news.length ? news.map((post) => (
                <Link href={`${localePrefix}/news/${post.slug}`} key={post.slug}>
                  <time>{post.date}</time>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              )) : <p className="empty-state">No company updates have been published yet.</p>}
            </div>
          </div>
        </section>

        <section className="inquiry-band">
          <div>
            <span className="eyebrow">{company.brand} inquiry desk</span>
            <h2>Tell us your container requirements</h2>
            <p>Share target product family, material, shape, lid structure, and estimated quantity.</p>
          </div>
          <InquiryForm />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function HomePage() {
  return <HomePageContent />
}
