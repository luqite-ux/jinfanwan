import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { company } from "../lib/site-data.ts"
import * as siteData from "../lib/site-data.ts"

const root = path.resolve(import.meta.dirname, "..")

const requiredRoutes = [
  "app/page.tsx",
  "app/about-us/page.tsx",
  "app/products/page.tsx",
  "app/products/[slug]/page.tsx",
  "app/custom-solutions/page.tsx",
  "app/manufacturing/page.tsx",
  "app/quality-control/page.tsx",
  "app/faq/page.tsx",
  "app/news/page.tsx",
  "app/news/[slug]/page.tsx",
  "app/contact/page.tsx",
  "app/not-found.tsx",
]

const requiredAssets = [
  "public/images/brand/jinfanwan-logo.png",
  "public/favicon.png",
  "public/images/products/product-showcase-04.png",
]

test("all required independent pages exist", () => {
  for (const route of requiredRoutes) {
    assert.equal(fs.existsSync(path.join(root, route)), true, `${route} should exist`)
  }
})

test("real brand and product assets exist", () => {
  for (const asset of requiredAssets) {
    assert.equal(fs.existsSync(path.join(root, asset)), true, `${asset} should exist`)
  }
})

test("mobile navigation exposes a real expandable menu", () => {
  const shell = fs.readFileSync(path.join(root, "components/site-shell.tsx"), "utf8")
  const styles = fs.readFileSync(path.join(root, "app/globals.css"), "utf8")

  assert.match(shell, /aria-expanded=\{menuOpen\}/)
  assert.match(shell, /desktop-nav menu-open/)
  assert.match(styles, /\.desktop-nav\.menu-open/)
})

test("formal contact email matches the production hostname", () => {
  assert.equal(typeof company.siteUrl, "string")
  const hostname = new URL(company.siteUrl).hostname
  const emailDomain = company.email.split("@")[1]?.toLowerCase()

  assert.equal(hostname, "jinfanwanfoodstorage.com")
  assert.equal(emailDomain, hostname)
})

test("detail routes resolve items from asynchronous Next.js params", async () => {
  assert.equal(typeof siteData.findByRouteParams, "function")
  const product = await siteData.findByRouteParams(
    siteData.products,
    Promise.resolve({ slug: "four-side-lock-plastic-series" }),
  )

  assert.equal(product?.slug, "four-side-lock-plastic-series")
})

test("customer admin login handler exists", () => {
  assert.equal(fs.existsSync(path.join(root, "lib/admin-login.ts")), true)
})

test("site copy avoids forbidden retail and warranty language", () => {
  const forbidden = /\b(warranty|warranties|guarantee|guaranteed|cart|checkout|payment)\b|质保|保修|质量保证/i
  const files = []

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.(tsx|ts|jsx|js|css|md)$/.test(entry.name)) files.push(full)
    }
  }

  walk(root)
  const offenders = files
    .map((file) => [file, fs.readFileSync(file, "utf8")])
    .filter(([file, content]) => forbidden.test(content) && !file.endsWith("site-quality.test.mjs"))
    .map(([file]) => path.relative(root, file))

  assert.deepEqual(offenders, [])
})

test("published copy contains no template, placeholder, or unsupported marketing claims", () => {
  const forbidden = /v0\.app|file upload placeholder|industry-leading|world-class|top manufacturer|premium food storage/i
  const files = ["lib/site-data.ts", "components/site-shell.tsx", "components/inquiry-form.tsx", ...requiredRoutes]
  const offenders = files.filter((file) => forbidden.test(fs.readFileSync(path.join(root, file), "utf8")))

  assert.deepEqual(offenders, [])
})

test("product records match the four verified brochure image groups", () => {
  assert.equal(siteData.products.length, 4)
  assert.deepEqual(
    siteData.products.map((product) => product.image),
    [
      "/images/products/product-showcase-04.png",
      "/images/products/product-showcase-05.png",
      "/images/products/product-showcase-06.png",
      "/images/products/product-showcase-08.png",
    ],
  )
  assert.equal(siteData.news.length, 0, "unverified demo news must not be published")
})

test("locale routes and language-aware data access remain available for expansion", () => {
  const requiredLocaleRoutes = [
    "app/[locale]/page.tsx",
    "app/[locale]/products/page.tsx",
    "app/[locale]/products/[slug]/page.tsx",
    "app/[locale]/news/page.tsx",
    "app/[locale]/news/[slug]/page.tsx",
  ]
  for (const route of requiredLocaleRoutes) assert.equal(fs.existsSync(path.join(root, route)), true, `${route} should exist`)
  const dataLayer = fs.readFileSync(path.join(root, "lib/content-db.ts"), "utf8")
  assert.match(dataLayer, /localized\(row\.name_i18n, locale\)/)
  assert.match(dataLayer, /getLanguageConfig/)
})
