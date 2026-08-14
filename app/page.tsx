import Link from "next/link"
import { ArrowRight, CheckCircle2, Factory, Sparkles } from "lucide-react"
import { Footer, Header, SectionHeading } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { categories, company, faqs, news, processSteps, products, stats } from "@/lib/site-data"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Food-grade container manufacturing</span>
            <h1>Premium Food Storage Containers for Global Buyers</h1>
            <p>
              JINFANWAN manufactures high borosilicate glass, plastic, silicone-lid, and stainless
              steel lid food storage container programs for B2B sourcing teams.
            </p>
            <div className="hero-actions">
              <Link href="/contact#inquiry" className="primary-action">Request a Quote <ArrowRight size={16} /></Link>
              <Link href="/products" className="secondary-action">Explore Products</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glow-card float-card">
              <img src="/images/products/product-showcase-04.png" alt="JINFANWAN food storage container series" />
            </div>
            <div className="material-note"><Sparkles size={18} /> Clear, bright, custom-ready container programs</div>
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
              <Link href="/products" key={category.slug} className="category-card">
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
              <article className="product-card" key={product.slug}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span className="pill">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <Link href={`/products/${product.slug}`}>Send Inquiry <ArrowRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section">
          <div>
            <SectionHeading
              eyebrow="Manufacturing capability"
              title="From R&D design to scalable container production"
              text="The factory integrates independent R&D, design, production, and sales with equipment capacity for plastic and silicone lid programs."
            />
            <div className="capability-list">
              {["10 injection molding machines", "6 dual-head molding machine sets", "10 liquid silicone machines", "3 workshops across 6,000 m2"].map((item) => (
                <p key={item}><Factory size={18} /> {item}</p>
              ))}
            </div>
          </div>
          <div className="glass-panel">
            <h3>Sealing and material directions</h3>
            <p>
              JINFANWAN focuses on practical four-side locking structures, silicone sealing ring
              concepts, high borosilicate glass bodies, and coordinated lid variants for vegetables,
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
              {news.map((post) => (
                <Link href={`/news/${post.slug}`} key={post.slug}>
                  <time>{post.date}</time>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
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
