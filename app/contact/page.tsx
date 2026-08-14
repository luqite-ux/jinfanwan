import { Footer, Header, PageHero } from "@/components/site-shell"
import { InquiryForm } from "@/components/inquiry-form"
import { company } from "@/lib/site-data"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Contact" title="Send your food container inquiry" text="Share your product interest, estimated quantity, and customization requirements." />
        <section className="split-section">
          <div className="glass-panel">
            <h2>{company.name}</h2>
            <p>{company.address}</p>
            <p>Email: {company.email}</p>
            <p>Phone: {company.phone}</p>
          </div>
          <InquiryForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
