#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"
import { buildCatalogSeed, mergeMaintainedRow, validateCatalogSeed } from "../lib/catalog-seed.ts"
import { expandedProducts } from "../lib/product-catalog.ts"

const root = path.resolve(import.meta.dirname, "..")
const adminRoot = process.env.HUANQIU_ADMIN_ROOT || "D:/Cursor/Grand/huanqiu-admin"
const mode = process.argv.includes("--apply") ? "apply" : "check"
const expectedDomain = "jinfanwanfoodstorage.com"

for (const file of [
  path.join(root, ".env.local"),
  path.join(root, ".env"),
  path.join(adminRoot, ".env.local"),
  path.join(adminRoot, ".env"),
  path.join(adminRoot, "_migrate-batch", ".env"),
]) {
  if (!fs.existsSync(file)) continue
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "")
  }
}

for (const key of ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_TENANT_ID"]) {
  if (!process.env[key]) throw new Error(`Missing ${key}`)
}

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})
const tenantRead = await db.from("tenants").select("id,name,display_name,domain").eq("id", tenantId).single()
if (tenantRead.error) throw tenantRead.error
if (tenantRead.data.domain !== expectedDomain || tenantRead.data.name !== "jinfanwan") {
  throw new Error(`Tenant identity mismatch for ${tenantId}`)
}

if (mode === "check") {
  const preview = buildCatalogSeed(tenantId, (image) => `r2://tenants/jinfanwan${image}`)
  validateCatalogSeed(preview)
  console.log(JSON.stringify({ mode, tenant: tenantRead.data, categoryCount: preview.categories.length, productCount: preview.products.length }, null, 2))
} else {
for (const key of ["R2_S3_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_PUBLIC_URL_PREFIX"]) {
  if (!process.env[key]) throw new Error(`Missing ${key}`)
}

const { PutObjectCommand, S3Client } = await import("@aws-sdk/client-s3")
const bucket = process.env.R2_BUCKET_NAME || process.env.R2_BUCKET
if (!bucket) throw new Error("Missing R2 bucket name")
const publicBase = process.env.R2_PUBLIC_URL_PREFIX.replace(/\/$/, "")
const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

const uploaded = new Map()
for (const image of new Set(expandedProducts.map((product) => product.image))) {
  const localFile = path.join(root, "public", image.replace(/^\//, ""))
  if (!fs.existsSync(localFile)) throw new Error(`Missing catalog image ${localFile}`)
  const key = `tenants/jinfanwan${image}`
  const contentType = path.extname(localFile).toLowerCase() === ".jpg" ? "image/jpeg" : "image/png"
  await r2.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: fs.readFileSync(localFile), ContentType: contentType }))
  uploaded.set(image, `${publicBase}/${key}`)
}

const generated = buildCatalogSeed(tenantId, (image) => uploaded.get(image))
validateCatalogSeed(generated)
const [existingCategories, existingProducts] = await Promise.all([
  db.from("product_categories").select("*").eq("tenant_id", tenantId).in("slug", generated.categories.map((row) => row.slug)),
  db.from("products").select("*").eq("tenant_id", tenantId).in("slug", generated.products.map((row) => row.slug)),
])
for (const result of [existingCategories, existingProducts]) if (result.error) throw result.error
const existingCategoryBySlug = new Map(existingCategories.data.map((row) => [row.slug, row]))
const existingProductBySlug = new Map(existingProducts.data.map((row) => [row.slug, row]))
const seed = {
  categories: generated.categories.map((row) => mergeMaintainedRow(row, existingCategoryBySlug.get(row.slug))),
  products: generated.products.map((row) => mergeMaintainedRow(row, existingProductBySlug.get(row.slug))),
}
validateCatalogSeed(seed)
for (const row of seed.categories) {
  const result = await db.from("product_categories").upsert(row, { onConflict: "tenant_id,slug" })
  if (result.error) throw result.error
}
for (const row of seed.products) {
  const result = await db.from("products").upsert(row, { onConflict: "tenant_id,slug" })
  if (result.error) throw result.error
}

const productSlugs = seed.products.map((row) => row.slug)
const categorySlugs = seed.categories.map((row) => row.slug)
const [stagedCategories, stagedProducts] = await Promise.all([
  db.from("product_categories").select("slug").eq("tenant_id", tenantId).in("slug", categorySlugs),
  db.from("products").select("slug,image_url,category_slug,extra_data").eq("tenant_id", tenantId).in("slug", productSlugs),
])
for (const result of [stagedCategories, stagedProducts]) if (result.error) throw result.error
assertExactSet("staged category slugs", stagedCategories.data.map((row) => row.slug), categorySlugs)
assertExactSet("staged product slugs", stagedProducts.data.map((row) => row.slug), productSlugs)
assertExactSet("staged source slides", stagedProducts.data.map((row) => row.extra_data?.source_slide), Array.from({ length: 41 }, (_, index) => index + 1))
if (stagedProducts.data.some((row) => !row.image_url?.startsWith(publicBase) || !categorySlugs.includes(row.category_slug))) {
  throw new Error("Staged catalog references are incomplete; old rows remain active")
}
for (const [table, slugs] of [["products", productSlugs], ["product_categories", categorySlugs]]) {
  const result = await db.from(table).update({ is_active: false }).eq("tenant_id", tenantId).not("slug", "in", `(${slugs.join(",")})`)
  if (result.error) throw result.error
}

const [categoriesRead, productsRead, tenantAfter] = await Promise.all([
  db.from("product_categories").select("slug,icon,name_i18n").eq("tenant_id", tenantId).eq("is_active", true),
  db.from("products").select("slug,image_url,name_i18n,description_i18n,extra_data").eq("tenant_id", tenantId).eq("is_active", true),
  db.from("tenants").select("id,name,display_name,domain,admin_group").eq("id", tenantId).single(),
])
for (const result of [categoriesRead, productsRead, tenantAfter]) if (result.error) throw result.error
if (tenantAfter.data.domain !== expectedDomain || tenantAfter.data.admin_group !== 2) throw new Error("Tenant readback mismatch")
if (categoriesRead.data.length !== 6 || productsRead.data.length !== 41) throw new Error("Catalog readback count mismatch")
if (productsRead.data.some((row) => !row.image_url?.startsWith(publicBase) || !row.name_i18n?.en || !row.description_i18n?.en)) {
  throw new Error("Catalog readback content mismatch")
}
assertExactSet("active category slugs", categoriesRead.data.map((row) => row.slug), categorySlugs)
assertExactSet("active product slugs", productsRead.data.map((row) => row.slug), productSlugs)
assertExactSet("active source slides", productsRead.data.map((row) => row.extra_data?.source_slide), Array.from({ length: 41 }, (_, index) => index + 1))

console.log(JSON.stringify({
  mode,
  tenant: tenantAfter.data,
  categoryCount: categoriesRead.data.length,
  productCount: productsRead.data.length,
  firstProduct: productsRead.data.find((row) => row.extra_data?.source_slide === 1)?.slug,
  lastProduct: productsRead.data.find((row) => row.extra_data?.source_slide === 41)?.slug,
}, null, 2))
r2.destroy()
}

function assertExactSet(label, actual, expected) {
  const normalizedActual = [...actual].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
  const normalizedExpected = [...expected].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
  if (JSON.stringify(normalizedActual) !== JSON.stringify(normalizedExpected)) throw new Error(`${label} mismatch`)
}
