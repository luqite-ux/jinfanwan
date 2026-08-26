# JINFANWAN Product Expansion Design

## Goal

Expand the production JINFANWAN catalog from four brochure-level product families to the 41 customer-supplied PPT pages while preserving every supplied page as an independently addressable product record.

## Confirmed source and interpretation

- Source: `金饭碗 独立站扩品修改(2).rar`, containing one 41-slide PPTX.
- Each slide contains one product image and one Chinese product name.
- The PPTX contains no models, dimensions, notes, grouping instructions, or written implementation instructions.
- The owner confirmed that every slide must be retained as a separate product. Repeated names must not be collapsed; stable numbered slugs distinguish repeated variants.
- Products are grouped in the UI by material/lid/closure family, while shape and vent state remain visible in the product name and tags.

## Catalog model

The site keeps its existing `categories` and `products` interfaces so the current product list, detail routes, locale routes, metadata, sitemap, and Supabase fallback behavior continue to work. The catalog expands to these category families:

1. Hinged Plastic Containers
2. Hinged Glass-Lid Containers
3. Hinged Stainless-Steel-Lid Containers
4. Two-Clip Plastic-and-Glass Containers
5. Silicone-and-Glass Containers
6. Silicone-and-Glass Lids

All 41 products receive a unique slug, English B2B name, category, source slide number, source image, factual structure/shape tags, neutral summary, and neutral inquiry-oriented details. No dimensions, material grades, certifications, microwave claims, prices, or commercial promises may be invented.

## Images

The single product image from each slide is extracted without redesign or generative alteration. Assets use deterministic names under `public/images/products/expanded/slide-01.*` through `slide-41.*`. A checked-in source manifest maps slide number, original Chinese name, English name, category, slug, and image path. Image tests require one readable image per manifest entry.

## Data and deployment

- `lib/product-catalog.ts` is the single source for the 41-item fallback catalog and source manifest.
- `lib/site-data.ts` re-exports the expanded catalog through the existing `categories` and `products` interface.
- `scripts/seed-products.mjs` performs tenant-scoped upserts to `product_categories` and `products`, writes English values to all required `*_i18n` fields, uploads the 41 images to the existing tenant R2 prefix, deactivates stale product rows only for the JINFANWAN tenant, and reads back counts and URLs.
- Database and R2 writes are restricted to the configured `NEXT_PUBLIC_TENANT_ID`; the script refuses to run if the tenant readback is not JINFANWAN.

## Presentation

The existing visual system remains intact. The products page gains category filtering so 41 cards remain usable on desktop and mobile. Product cards and details continue to link to the inquiry flow. No broader visual redesign is included.

## Verification

- Automated tests prove exactly 41 unique products, source slides 1–41 without gaps, unique slugs, valid category references, readable unique image files, and prohibited-word compliance.
- Existing tests, lint, and production build must pass.
- Seed check/apply output must confirm the JINFANWAN tenant, six categories, 41 active products, multilingual fields, and R2 URLs.
- Desktop and 390px browser review covers homepage featured products, category filtering, all product cards, representative detail pages from each category, image legibility, overflow, inquiry links, sitemap, and console errors.
- A final source-to-site checklist confirms all 41 PPT pages are represented and repeated names remain separate.
