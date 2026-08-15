import { notFound } from "next/navigation"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { findByRouteParams, news } from "@/lib/site-data"

type NewsDetailProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }))
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const post = await findByRouteParams(news, params)
  if (!post) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={post.date} title={post.title} text={post.excerpt} />
        <article className="article-body">
          <p>
            Food storage container sourcing starts with the expected use scenario, material direction, lid
            structure, shape, and packaging plan. Buyers should compare whether the project needs plastic
            containers, high borosilicate glass bodies, silicone lid options, or stainless steel lid variants.
          </p>
          <p>
            For private-label and distributor programs, it is helpful to prepare target dimensions, color
            direction, estimated quantity, packaging format, and inspection requirements before discussing a
            container series with the factory.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
