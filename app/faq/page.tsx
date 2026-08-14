import { Footer, Header, PageHero } from "@/components/site-shell"
import { faqs } from "@/lib/site-data"

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="FAQ" title="Questions for food container sourcing" text="Answers are written for B2B procurement discussions and custom product planning." />
        <section className="section faq-list wide">
          {faqs.map(([question, answer]) => (
            <article key={question}><h3>{question}</h3><p>{answer}</p></article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
