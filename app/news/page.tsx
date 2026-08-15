import { Footer, Header, PageHero } from "@/components/site-shell"
import { getNews } from "@/lib/content-db"

export const metadata = {
  title: "Company News and Product Updates | JINFANWAN",
  description: "Read published company news and food storage container product updates from JINFANWAN.",
  alternates: { canonical: "/news" },
}

export const revalidate = 60

export async function NewsPageContent({ locale = "en" }: { locale?: string }) {
  const news = await getNews(locale)
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="News" title="Company news and product updates" text="Published company and product information will appear here." />
        <section className="section news-list wide">
          {news.length ? null : <p className="empty-state">No company updates have been published yet.</p>}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function NewsPage() {
  return <NewsPageContent />
}
