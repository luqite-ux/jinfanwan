import { Footer, Header, PageHero } from "@/components/site-shell"
import { faqs } from "@/lib/site-data"

export const metadata = {
  title: "Food Container Sourcing FAQ | JINFANWAN",
  description: "Answers about JINFANWAN product formats, customization, samples, applications, inspection, and OEM or ODM order discussions.",
  alternates: { canonical: "/faq" },
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="FAQ" title="Common food container sourcing questions" text="Review product formats, customization options, samples, applications, and inspection arrangements." />
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
