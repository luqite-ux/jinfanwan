import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"

const tenantId = "d1690bc3-c00b-4558-b669-92a7adf93179"
const adminRoot = "D:/Cursor/Grand/huanqiu-admin"
const testSlug = "codex-delivery-translation-check"

for (const file of [".env.local", ".env", "_migrate-batch/.env"]) {
  const full = path.join(adminRoot, file)
  if (!fs.existsSync(full)) continue
  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "")
  }
}

const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "DEEPSEEK_API_KEY"]
for (const key of required) if (!process.env[key]) throw new Error(`Missing ${key}`)

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

async function translate(text, html = false) {
  const prompt = html
    ? "Translate the visible English text to Simplified Chinese. Preserve every HTML tag and the full HTML structure exactly. Return only translated HTML."
    : "Translate the following English B2B product copy to clear Simplified Chinese. Return only the translation."
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "deepseek-chat", temperature: 0.2, messages: [{ role: "system", content: prompt }, { role: "user", content: text }] }),
  })
  if (!response.ok) throw new Error(`DeepSeek request failed: ${response.status}`)
  const payload = await response.json()
  const translated = payload.choices?.[0]?.message?.content?.trim()
  if (!translated) throw new Error("DeepSeek returned empty content")
  return translated
}

const tenantResult = await db.from("tenants").select("default_language,supported_languages").eq("id", tenantId).single()
if (tenantResult.error) throw tenantResult.error
const originalLanguages = tenantResult.data.supported_languages

try {
  const enabled = await db.from("tenants").update({ supported_languages: ["en", "zh"] }).eq("id", tenantId)
  if (enabled.error) throw enabled.error

  const productResult = await db.from("products")
    .select("id,name_i18n,description_i18n,features_i18n")
    .eq("tenant_id", tenantId)
    .eq("slug", "four-side-lock-plastic-series")
    .single()
  if (productResult.error) throw productResult.error
  const product = productResult.data
  const featureSource = product.features_i18n?.en ?? []
  const [nameZh, descriptionZh, ...featuresZh] = await Promise.all([
    translate(product.name_i18n.en),
    translate(product.description_i18n.en),
    ...featureSource.map((item) => translate(item)),
  ])
  const productUpdate = await db.from("products").update({
    name_i18n: { ...product.name_i18n, zh: nameZh },
    description_i18n: { ...product.description_i18n, zh: descriptionZh },
    features_i18n: { ...product.features_i18n, zh: featuresZh },
  }).eq("id", product.id).eq("tenant_id", tenantId)
  if (productUpdate.error) throw productUpdate.error

  const articleEn = {
    title: "Food Container Translation Workflow Check",
    excerpt: "A temporary unpublished record used to verify multilingual article fields.",
    content: "<p>This temporary article verifies that <strong>HTML structure</strong> remains intact during translation.</p>",
  }
  const [titleZh, excerptZh, contentZh] = await Promise.all([
    translate(articleEn.title),
    translate(articleEn.excerpt),
    translate(articleEn.content, true),
  ])
  const articleInsert = await db.from("articles").upsert({
    tenant_id: tenantId,
    slug: testSlug,
    title: articleEn.title,
    title_en: articleEn.title,
    title_i18n: { en: articleEn.title, zh: titleZh },
    excerpt: articleEn.excerpt,
    excerpt_en: articleEn.excerpt,
    excerpt_i18n: { en: articleEn.excerpt, zh: excerptZh },
    content: articleEn.content,
    content_en: articleEn.content,
    content_i18n: { en: articleEn.content, zh: contentZh },
    is_published: false,
  }, { onConflict: "tenant_id,slug" })
  if (articleInsert.error) throw articleInsert.error

  const [productRead, articleRead] = await Promise.all([
    db.from("products").select("name_i18n,description_i18n,features_i18n").eq("id", product.id).single(),
    db.from("articles").select("title_i18n,excerpt_i18n,content_i18n,is_published").eq("tenant_id", tenantId).eq("slug", testSlug).single(),
  ])
  if (productRead.error) throw productRead.error
  if (articleRead.error) throw articleRead.error
  const html = articleRead.data.content_i18n?.zh ?? ""
  if (!productRead.data.name_i18n?.zh || !productRead.data.description_i18n?.zh || !productRead.data.features_i18n?.zh?.length) throw new Error("Product translation readback failed")
  if (!articleRead.data.title_i18n?.zh || !articleRead.data.excerpt_i18n?.zh || !html.includes("<p>") || !html.includes("<strong>")) throw new Error("Article translation or HTML readback failed")
  console.log(JSON.stringify({ productTranslated: true, articleTranslated: true, htmlPreserved: true, articlePublished: articleRead.data.is_published }, null, 2))
} finally {
  await db.from("articles").delete().eq("tenant_id", tenantId).eq("slug", testSlug)
  await db.from("tenants").update({ supported_languages: originalLanguages }).eq("id", tenantId)
  const [articleLeft, tenantRead] = await Promise.all([
    db.from("articles").select("id", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("slug", testSlug),
    db.from("tenants").select("supported_languages").eq("id", tenantId).single(),
  ])
  console.log(JSON.stringify({ testArticleRemaining: articleLeft.count, supportedLanguages: tenantRead.data?.supported_languages }, null, 2))
}
