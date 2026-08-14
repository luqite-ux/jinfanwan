import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { news } from "@/lib/site-data"

export default function NewsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="News" title="Food container sourcing insights" text="Educational articles for buyers planning food storage container programs." />
        <section className="section news-list wide">
          {news.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.slug}>
              <time>{post.date}</time>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span>Read article <ArrowRight size={15} /></span>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
