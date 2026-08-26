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
  ["6,000 m2", "Production area"],
  ["3", "Workshops"],
  ["10", "Injection molding machines"],
  ["6", "Dual-head compression molding sets"],
  ["10", "Liquid silicone machines"],
  ["1,000,000", "Plastic lids per month"],
  ["800,000", "Silicone glass lids per month"],
]

export const categories = expandedCategories

export const products = expandedProducts

export const processSteps = [
  "Requirement Review",
  "Material / Size / Lid Structure Confirmation",
  "Sample or Specification Confirmation",
  "Production Planning",
  "Inspection Before Shipment",
  "Delivery Support",
]

export const faqs = [
  ["What product formats are available?", "The current range includes square, rectangular, and round food storage containers with plastic, tempered-glass, and silicone lid structures."],
  ["Can you support OEM or ODM programs?", "Yes. Buyers can discuss size, material, lid structure, color, packaging, and private-label requirements with our team."],
  ["Can samples be discussed before bulk production?", "Sample or specification confirmation can be arranged according to the product family and order requirements."],
  ["What applications are these containers suitable for?", "The product range is intended for vegetables, fruit, dry food, prepared meals, refrigerated storage, and room-temperature storage. Microwave suitability must be confirmed for the selected container and lid combination."],
  ["How do you manage product quality?", "Production follows internal inspection steps for materials, lid fit, appearance, and shipment preparation. Third-party inspection can be coordinated when required by the order."],
]

export type NewsItem = {
  slug: string
  date: string
  title: string
  excerpt: string
}

export const news: NewsItem[] = []
import { expandedCategories, expandedProducts } from "./product-catalog.ts"
