import { notFound } from "next/navigation"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { getNews } from "@/lib/content-db"

type NewsDetailProps = { params: Promise<{ slug: string }> }

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const news = await getNews()
  return news.map((post) => ({ slug: post.slug }))
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const [{ slug }, news] = await Promise.all([params, getNews()])
  const post = news.find((item) => item.slug === slug)
  if (!post) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={post.date} title={post.title} text={post.excerpt} />
        <article className="article-body">
          {post.content ? <div dangerouslySetInnerHTML={{ __html: post.content }} /> : <p>{post.excerpt}</p>}
        </article>
      </main>
      <Footer />
    </>
  )
}
