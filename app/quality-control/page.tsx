import { CheckCircle2 } from "lucide-react"
import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"

export const metadata = {
  title: "Food Container Quality Control | JINFANWAN",
  description: "Review JINFANWAN inspection points for materials, appearance, lid fit, container clarity, packing, and shipment preparation.",
  alternates: { canonical: "/quality-control" },
}

const checks = ["Material and appearance review", "Lid fit and structure review", "Container surface and clarity review", "Packing and shipment preparation review"]

export default function QualityControlPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Quality Control"
          title="Inspection-focused production support"
          text="JINFANWAN applies defined inspection steps to materials, appearance, lid fit, packing, and shipment preparation."
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
