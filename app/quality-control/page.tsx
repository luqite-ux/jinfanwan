import { CheckCircle2 } from "lucide-react"
import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"

const checks = ["Material and appearance review", "Lid fit and structure review", "Container surface and clarity review", "Packing and shipment preparation review"]

export default function QualityControlPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Quality Control"
          title="Inspection-focused production support"
          text="JINFANWAN uses neutral inspection and production review steps to help buyers prepare stable container programs."
        />
        <section className="section">
          <SectionHeading eyebrow="Inspection points" title="Practical checks before shipment preparation" />
          <div className="feature-grid">
            {checks.map((item) => (
              <article className="feature-card" key={item}><CheckCircle2 size={22} /><h3>{item}</h3><p>Reviewed according to the confirmed product and order requirements.</p></article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
