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
    Promise.resolve({ slug: "hinge-lock-plastic-square" }),
  )

  assert.equal(product?.slug, "hinge-lock-plastic-square")
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
