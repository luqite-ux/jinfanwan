import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { company, stats } from "@/lib/site-data"

export const metadata = {
  title: "About JINFANWAN | Food Container Manufacturer",
  description: "Learn about Suzhou Golden Rice Bowl New Material Technology Co., Ltd., its food container product focus, production area, equipment, and contact details.",
  alternates: { canonical: "/about-us" },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About JINFANWAN"
          title="Integrated R&D, design, production, and sales for food storage containers"
          text="Suzhou Golden Rice Bowl New Material Technology Co., Ltd. develops practical food storage container programs for global B2B buyers."
        />
        <section className="split-section">
          <div>
            <SectionHeading
              eyebrow="Company profile"
              title="A focused container manufacturer in Suzhou"
              text="The company specializes in high borosilicate food storage containers, plastic lids, silicone lid structures, and coordinated food storage product families."
            />
            <p className="lead-text">
              JINFANWAN combines product design, mold and lid structure experience, and production capacity to support
              square, rectangular, and round container programs for brand owners, distributors, and sourcing teams.
            </p>
          </div>
          <div className="glass-panel">
            <h3>Contact details</h3>
            <p>{company.name}</p>
            <p>{company.address}</p>
            <p>{company.email}</p>
            <p>{company.phone}</p>
          </div>
        </section>
        <section className="stats-strip">
          {stats.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
