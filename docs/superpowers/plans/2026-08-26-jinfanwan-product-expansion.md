# JINFANWAN Product Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish all 41 customer-supplied JINFANWAN product pages as distinct, categorized, image-backed B2B product records.

**Architecture:** A typed catalog manifest becomes the shared fallback and seed input. Existing async Supabase reads and route components remain in place; a tenant-scoped seed synchronizes the manifest to Supabase/R2, while a small client filter keeps the expanded product grid usable.

**Tech Stack:** Next.js 16 App Router, TypeScript, Node test runner, Supabase, Cloudflare R2, PowerPoint Open XML assets.

**Spec:** `docs/superpowers/specs/2026-08-26-jinfanwan-product-expansion-design.md`

## Global Constraints

- Preserve all 41 PPT slides as distinct products; do not collapse repeated names.
- Use only claims supported by the slide title/image and existing confirmed company facts.
- Keep English launch content in multilingual JSONB fields and retain locale fallback routes.
- No prices, retail purchase flow, forbidden service-commitment terms, or unsupported performance claims.
- Restrict all database changes to the existing JINFANWAN tenant ID and read back the tenant identity before and after writes.
- Work only on `codex/jinfanwan-product-expansion`; do not push or deploy Production before review and approval.

---

### Task 1: Source manifest and assets

**Files:**
- Create: `lib/product-catalog.ts`
- Create: `public/images/products/expanded/slide-01.*` through `slide-41.*`
- Modify: `tests/site-quality.test.mjs`

**Interfaces:**
- Produces: `expandedCategories`, `expandedProducts`, and `sourceSlides` where product slugs and image paths are unique and source slide numbers equal 1–41.

- [ ] Add a failing test asserting 41 products, slide coverage 1–41, unique slugs/images, valid category references, and readable assets.
- [ ] Run `pnpm test` and confirm failure because the expanded manifest is missing.
- [ ] Add the typed manifest and extract the 41 slide images to deterministic paths.
- [ ] Run `pnpm test` and confirm the catalog contract passes.
- [ ] Commit the manifest, assets, and tests.

### Task 2: Frontend catalog integration and filtering

**Files:**
- Modify: `lib/site-data.ts`
- Create: `components/product-catalog-grid.tsx`
- Modify: `app/products/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-quality.test.mjs`

**Interfaces:**
- Consumes: `expandedCategories` and `expandedProducts`.
- Produces: accessible category filter buttons and a filtered product grid while preserving existing product URLs.

- [ ] Add a failing source/behavior test for category filtering, all-products reset, accessible pressed state, and 41 fallback products.
- [ ] Run the focused test and confirm the expected failure.
- [ ] Re-export the manifest from `site-data.ts`, add the client grid, and integrate it into the products page.
- [ ] Add responsive styles without changing the established visual system.
- [ ] Run tests and build, then commit.

### Task 3: Tenant-scoped Supabase and R2 synchronization

**Files:**
- Create: `scripts/seed-products.mjs`
- Create: `tests/product-seed.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: catalog manifest, secure environment variables, existing JINFANWAN tenant ID.
- Produces: six active categories and 41 active product rows with R2 image URLs and English `*_i18n` values.

- [ ] Add a failing test for dry-run default, tenant identity guard, exact count, tenant-scoped mutations, multilingual payloads, and prohibited terms.
- [ ] Run the test and confirm failure because the synchronizer is missing.
- [ ] Implement dry-run/check and explicit `--apply` modes with identity verification, R2 upload, upsert, stale-row deactivation, and readback.
- [ ] Run all tests, then run the check mode and inspect its manifest summary.
- [ ] Run `--apply`, read back the tenant/categories/products, and commit only non-secret code.

### Task 4: Review and delivery evidence

**Files:**
- Create: `docs/reviews/2026-08-26-product-expansion-review.md`
- Modify: code or data only for issues demonstrated by review evidence.

**Interfaces:**
- Produces: automated verification output, source-to-site reconciliation, desktop/mobile screenshots, reviewer findings, and a Preview deployment for owner review.

- [ ] Run tests, lint, build, forbidden-word scan, and a manifest-to-database reconciliation.
- [ ] Start the production build locally and review desktop plus 390px product list/detail pages with screenshots and console checks.
- [ ] Request independent code review against the spec and fix every Critical or Important finding with a failing regression test first.
- [ ] Push the `codex/` branch using the required company-token flow and verify the remote branch SHA through GitHub REST.
- [ ] Create a Preview deployment only; verify its routes and record evidence. Do not merge or deploy Production without owner approval.
