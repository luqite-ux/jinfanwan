import { Footer, Header, PageHero, SectionHeading } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { processSteps } from "@/lib/site-data"

export default function CustomSolutionsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Custom Solutions"
          title="OEM and ODM food container programs"
          text="Discuss custom shape, material, lid structure, color, packaging, and private-label requirements with the JINFANWAN team."
        />
        <section className="section">
          <SectionHeading eyebrow="Process" title="From requirement review to delivery support" />
          <div className="process-line">
            {processSteps.map((step, index) => (
              <div key={step}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{step}</span></div>
            ))}
          </div>
        </section>
        <section className="inquiry-band">
          <div><span className="eyebrow">Start a custom project</span><h2>Send your container brief</h2></div>
          <InquiryForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
