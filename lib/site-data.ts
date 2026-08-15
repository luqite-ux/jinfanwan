export const company = {
  brand: "JINFANWAN",
  name: "Suzhou Golden Rice Bowl New Material Technology Co., Ltd.",
  siteUrl: "https://jinfanwanfoodstorage.com",
  address: "2nd Floor, Comprehensive Building, No. 393 Fuping Road, Pingwang Town, Wujiang District, Suzhou, China",
  phone: "18270310577",
  email: "info@jinfanwanfoodstorage.com",
  logo: "/images/brand/jinfanwan-logo.png",
}

export async function findByRouteParams<T extends { slug: string }>(
  items: T[],
  params: Promise<{ slug: string }>,
) {
  const { slug } = await params
  return items.find((item) => item.slug === slug)
}

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/custom-solutions", label: "Custom Solutions" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/quality-control", label: "Quality Control" },
  { href: "/faq", label: "FAQ" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
]

export const stats = [
  ["6,000 m2", "Factory area"],
  ["3", "Workshops"],
  ["10", "Injection molding machines"],
  ["6", "Dual-head molding sets"],
  ["10", "Liquid silicone machines"],
  ["1,000,000", "Plastic lids per month"],
  ["800,000", "Silicone glass lids per month"],
]

export const categories = [
  {
    slug: "plastic-food-containers",
    name: "Plastic Food Containers",
    image: "/images/products/product-showcase-04.png",
    summary: "Square, rectangular, and round food storage formats with practical locking structures.",
  },
  {
    slug: "silicone-glass-food-containers",
    name: "Silicone Glass Food Containers",
    image: "/images/products/product-showcase-05.png",
    summary: "Flexible silicone lid solutions paired with clean glass storage formats.",
  },
  {
    slug: "plastic-glass-food-containers",
    name: "Plastic Glass Food Containers",
    image: "/images/products/product-showcase-06.png",
    summary: "Clear glass container bodies with plastic lid structures for B2B supply programs.",
  },
  {
    slug: "stainless-steel-lid-series",
    name: "Stainless Steel Lid Series",
    image: "/images/products/product-showcase-08.png",
    summary: "Durable lid variants designed for glass bowl compatibility and bulk procurement.",
  },
]

export const products = [
  {
    slug: "hinge-lock-plastic-square",
    name: "Hinge Lock Plastic Food Container - Square",
    category: "Plastic Food Containers",
    image: "/images/products/product-showcase-04.png",
    tags: ["Square", "Vented option", "No-hole option"],
    summary: "A square food storage container family for daily kitchen storage, private-label programs, and bulk purchasing.",
    details: [
      "Four-side locking structure for stable daily handling.",
      "Silicone sealing ring structure for practical food storage use.",
      "Square formats support organized stacking and retail-ready sets.",
    ],
  },
  {
    slug: "hinge-lock-plastic-rectangular",
    name: "Hinge Lock Plastic Food Container - Rectangular",
    category: "Plastic Food Containers",
    image: "/images/products/product-showcase-04.png",
    tags: ["Rectangular", "Meal prep", "Stackable"],
    summary: "A space-efficient rectangular series for prepared meals, refrigerator storage, and customized container sets.",
    details: [
      "Available with vented and non-vented lid concepts.",
      "Designed for efficient shelf, carton, and kitchen storage layouts.",
      "Suitable for custom lid color and packaging programs.",
    ],
  },
  {
    slug: "hinge-lock-glass-round",
    name: "Hinge Lock Glass Food Container - Round",
    category: "High Borosilicate Glass Container Series",
    image: "/images/products/product-showcase-06.png",
    tags: ["Round", "Glass body", "Food storage"],
    summary: "A round high borosilicate glass container series for fresh food, dry food, and reheating applications.",
    details: [
      "Clear glass body supports product visibility and clean presentation.",
      "Round formats suit fruits, prepared dishes, dry food, and leftovers.",
      "Lid options can be discussed by size, venting, and material requirements.",
    ],
  },
  {
    slug: "two-clip-plastic-glass-series",
    name: "Two-Clip Plastic Glass Food Container Series",
    category: "Plastic Glass Food Containers",
    image: "/images/products/product-showcase-05.png",
    tags: ["Two-clip", "Glass", "Multiple shapes"],
    summary: "A simplified two-clip glass container series covering square, rectangular, and round product lines.",
    details: [
      "Practical closure structure for everyday food storage needs.",
      "Clear container presentation for kitchen, retail, and promotional sets.",
      "Multiple shape options support coordinated product families.",
    ],
  },
  {
    slug: "silicone-glass-container-series",
    name: "Silicone Glass Food Container Series",
    category: "Silicone Glass Food Containers",
    image: "/images/products/product-showcase-08.png",
    tags: ["Silicone lid", "Glass", "Flexible structure"],
    summary: "A clean silicone glass container series for buyers seeking soft-touch lid structures and fresh visual appeal.",
    details: [
      "Silicone lid construction supports flexible product styling.",
      "Rectangular, square, and round directions can be developed for product lines.",
      "Suitable for fresh storage, meal prep, and custom color programs.",
    ],
  },
  {
    slug: "stainless-steel-lid-container-series",
    name: "Stainless Steel Lid Food Container Series",
    category: "Stainless Steel Lid Series",
    image: "/images/products/product-showcase-06.png",
    tags: ["Stainless steel lid", "Glass bowl", "Durable"],
    summary: "A stainless steel lid container series for durable kitchen storage and bulk procurement requirements.",
    details: [
      "Rectangular, round, and square options can be developed by order requirements.",
      "Stainless steel lid variants pair with compatible glass bowls.",
      "A practical option for buyers seeking a distinct material mix.",
    ],
  },
]

export const processSteps = [
  "Requirement Review",
  "Material / Size / Lid Structure Confirmation",
  "Sample or Specification Confirmation",
  "Production Planning",
  "Inspection Before Shipment",
  "Delivery Support",
]

export const faqs = [
  ["What product formats are available?", "We support square, rectangular, and round food storage container families with plastic, glass, silicone, and stainless steel lid directions."],
  ["Can you support OEM or ODM programs?", "Yes. Buyers can discuss size, material, lid structure, color, packaging, and private-label requirements with our team."],
  ["Can samples be discussed before bulk production?", "Sample or specification confirmation can be arranged according to the product family and order requirements."],
  ["What applications are these containers suitable for?", "They are suitable for vegetables, fruits, dry food, prepared meals, refrigerator storage, microwave heating, and room-temperature food storage."],
  ["How do you manage product quality?", "Production follows internal inspection steps for materials, lid fit, appearance, and shipment preparation. Third-party inspection can be coordinated when required by the order."],
]

export const news = [
  {
    slug: "choosing-food-storage-containers-for-private-label-programs",
    date: "2026-08-14",
    title: "Choosing Food Storage Containers for Private-label Programs",
    excerpt: "A practical guide for buyers comparing material, lid structure, shape, packaging, and application scenarios.",
  },
  {
    slug: "how-lid-structure-affects-food-container-sourcing",
    date: "2026-08-14",
    title: "How Lid Structure Affects Food Container Sourcing",
    excerpt: "Key points to review when sourcing vented, non-vented, silicone, plastic, and stainless steel lid options.",
  },
]
