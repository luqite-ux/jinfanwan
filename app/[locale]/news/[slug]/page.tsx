import { notFound } from "next/navigation"
import { Footer, Header, PageHero } from "@/components/site-shell"
import { getLanguageConfig, getNews } from "@/lib/content-db"
import { company } from "@/lib/site-data"

type LocaleNewsProps = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: LocaleNewsProps) {
  const [{ locale, slug }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) return {}
  const post = (await getNews(locale)).find((item) => item.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | JINFANWAN`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: { en: `/news/${slug}`, [locale]: `/${locale}/news/${slug}`, "x-default": `/news/${slug}` },
    },
  }
}

export default async function LocaleNewsDetailPage({ params }: LocaleNewsProps) {
  const [{ locale, slug }, config] = await Promise.all([params, getLanguageConfig()])
  if (!config.supportedLanguages.includes(locale) || locale === config.defaultLanguage) notFound()
  const post = (await getNews(locale)).find((item) => item.slug === slug)
  if (!post) notFound()
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: company.name },
    mainEntityOfPage: `${company.siteUrl}/${locale}/news/${post.slug}`,
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
