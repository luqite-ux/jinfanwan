import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer, Header, PageHero } from "@/components/site-shell"

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="404"
          title="Page not found"
          text="The requested page is unavailable or may have moved. Return to the product catalog to continue browsing."
        />
        <section className="section">
          <Link href="/products" className="primary-action">
            <ArrowLeft size={16} /> View products
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
