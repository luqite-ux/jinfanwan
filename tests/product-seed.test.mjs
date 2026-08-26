import assert from "node:assert/strict"
import test from "node:test"
import { buildCatalogSeed, mergeMaintainedRow, validateCatalogSeed } from "../lib/catalog-seed.ts"

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
  assert.doesNotThrow(() => validateCatalogSeed(seed))
})

test("catalog seed refuses an empty tenant identity", () => {
  assert.throws(() => buildCatalogSeed("", (image) => image), /tenant/i)
})

test("catalog validation rejects duplicate or incomplete slide mappings before destructive sync", () => {
  const seed = buildCatalogSeed(tenantId, (image) => `https://assets.example.test${image}`)
  seed.products[40].extra_data.source_slide = 40
  assert.throws(() => validateCatalogSeed(seed), /slide/i)
})

test("repeat synchronization preserves maintained translations and metadata", () => {
  const generated = {
    image_url: "generated-image",
    specs: { generated: true },
    name_i18n: { en: "Generated English" },
    description_i18n: { en: "Generated description" },
    extra_data: { source_slide: 1, source: "customer expansion PPT", images: ["generated-image"], source_name_zh: "generated" },
  }
  const existing = {
    image_url: "maintained-image",
    specs: { maintained: true },
    name_i18n: { en: "Existing English", de: "Bestehender Name" },
    description_i18n: { en: "Existing description", de: "Bestehende Beschreibung" },
    extra_data: {
      source_slide: 1,
      images: ["maintained-image"],
      source_name_zh: "maintained",
      manually_maintained_fields: ["name_i18n.en", "description_i18n", "image_url", "specs", "extra_data.images", "extra_data.source_name_zh"],
      sales_note: "keep",
    },
  }
  const merged = mergeMaintainedRow(generated, existing)

  assert.equal(merged.name_i18n.en, "Existing English")
  assert.equal(merged.name_i18n.de, "Bestehender Name")
  assert.equal(merged.description_i18n.en, "Existing description")
  assert.equal(merged.description_i18n.de, "Bestehende Beschreibung")
  assert.equal(merged.image_url, "maintained-image")
  assert.deepEqual(merged.specs, { maintained: true })
  assert.deepEqual(merged.extra_data.images, ["maintained-image"])
  assert.equal(merged.extra_data.source_name_zh, "maintained")
  assert.equal(merged.extra_data.sales_note, "keep")
})
