import { Factory } from "lucide-react"
import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { stats } from "@/lib/site-data"

export default function ManufacturingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Manufacturing"
          title="Scalable production for food storage container programs"
          text="JINFANWAN supports plastic lid, silicone lid, glass container, and coordinated container family production."
        />
        <section className="stats-strip">
          {stats.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>
        <section className="split-section">
          <div>
            <SectionHeading eyebrow="Factory capability" title="Equipment for flexible production planning" />
            {["Injection molding for plastic lid structures", "Dual-head molding capacity for matched container programs", "Liquid silicone equipment for silicone lid directions", "Workshop flow for sampling, production, and shipment preparation"].map((item) => (
              <p className="icon-line" key={item}><Factory size={18} /> {item}</p>
            ))}
          </div>
          <img className="rounded-image" src="/images/products/product-showcase-05.png" alt="JINFANWAN manufacturing product overview" />
        </section>
      </main>
      <Footer />
    </>
  )
}
