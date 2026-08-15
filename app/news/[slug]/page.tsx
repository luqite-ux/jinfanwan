import { notFound } from "next/navigation"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { getNews } from "@/lib/content-db"
import { company } from "@/lib/site-data"

type NewsDetailProps = { params: Promise<{ slug: string }> }

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const news = await getNews()
  return news.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: NewsDetailProps) {
  const [{ slug }, news] = await Promise.all([params, getNews()])
  const post = news.find((item) => item.slug === slug)
  return {
    title: post ? `${post.title} | JINFANWAN` : "News | JINFANWAN",
    description: post?.excerpt,
    alternates: post ? { canonical: `/news/${post.slug}` } : undefined,
    openGraph: post ? {
      title: post.title,
      description: post.excerpt,
      type: "article" as const,
      url: `/news/${post.slug}`,
    } : undefined,
  }
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const [{ slug }, news] = await Promise.all([params, getNews()])
  const post = news.find((item) => item.slug === slug)
  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name, logo: { "@type": "ImageObject", url: `${company.siteUrl}${company.logo}` } },
    mainEntityOfPage: `${company.siteUrl}/news/${post.slug}`,
  }

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}
