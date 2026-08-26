"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { filterProductsByCategory, type ProductRecord } from "@/lib/product-catalog"

type Category = { slug: string; name: string }

export function ProductCatalogGrid({ categories, products, localePrefix }: {
  categories: Category[]
  products: ProductRecord[]
  localePrefix: string
}) {
  const [activeCategory, setActiveCategory] = useState("all")
  const visibleProducts = useMemo(
    () => filterProductsByCategory(products, activeCategory),
    [activeCategory, products],
  )

  return (
    <>
      <div className="catalog-filters" aria-label="Filter products by category">
        <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          All products <span>{products.length}</span>
        </button>
        {categories.map((category) => {
          const count = products.filter((product) => product.categorySlug === category.slug).length
          return (
            <button
              type="button"
              key={category.slug}
              aria-pressed={activeCategory === category.slug}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name} <span>{count}</span>
            </button>
          )
        })}
      </div>
      <p className="catalog-result-count" aria-live="polite">Showing {visibleProducts.length} products</p>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <Link className="product-card" href={`${localePrefix}/products/${product.slug}`} key={product.slug}>
            <img src={product.image} alt={product.name} />
            <div>
              <span className="pill">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.summary}</p>
              <span className="card-action">View product <ArrowRight size={15} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
