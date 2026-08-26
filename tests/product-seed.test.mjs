import assert from "node:assert/strict"
import test from "node:test"
import { buildCatalogSeed } from "../lib/catalog-seed.ts"

const tenantId = "d1690bc3-c00b-4558-b669-92a7adf93179"

test("catalog seed builds tenant-scoped multilingual rows for all supplied products", () => {
  const seed = buildCatalogSeed(tenantId, (image) => `https://assets.example.test${image}`)

  assert.equal(seed.categories.length, 6)
  assert.equal(seed.products.length, 41)
  assert.equal(seed.products.every((row) => row.tenant_id === tenantId), true)
  assert.equal(seed.products.every((row) => row.name_i18n.en === row.name), true)
  assert.equal(seed.products.every((row) => row.description_i18n.en === row.description), true)
  assert.deepEqual(seed.products.map((row) => row.extra_data.source_slide), Array.from({ length: 41 }, (_, index) => index + 1))
  assert.equal(seed.products.every((row) => row.image_url.startsWith("https://assets.example.test/")), true)
})

test("catalog seed refuses an empty tenant identity", () => {
  assert.throws(() => buildCatalogSeed("", (image) => image), /tenant/i)
})
