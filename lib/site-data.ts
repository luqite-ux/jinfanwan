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

export const categories = [
  {
    slug: "plastic-food-containers",
    name: "Plastic Food Containers",
    image: "/images/products/product-showcase-04.png",
    summary: "Square, rectangular, and round food storage formats with practical locking structures.",
  },
  {
    slug: "vented-plastic-food-containers",
    name: "Vented Plastic Food Containers",
    image: "/images/products/product-showcase-05.png",
    summary: "Square, rectangular, and round containers with vented four-side locking lids.",
  },
  {
    slug: "tempered-glass-lid-food-containers",
    name: "Tempered-Glass Lid Food Containers",
    image: "/images/products/product-showcase-06.png",
    summary: "Food storage container formats featuring vented tempered-glass locking lids.",
  },
  {
    slug: "glass-silicone-storage-lids",
    name: "Glass and Silicone Storage Lids",
    image: "/images/products/product-showcase-08.png",
    summary: "Round tempered-glass and silicone lid structures for compatible storage jars.",
  },
]

export const products = [
  {
    slug: "four-side-lock-plastic-series",
    name: "Four-Side Lock Plastic Food Container Series",
    category: "Plastic Food Containers",
    image: "/images/products/product-showcase-04.png",
    tags: ["Multiple shapes", "Four-side lock", "Non-vented lid"],
    summary: "A coordinated plastic food container family with square, rectangular, and round formats.",
    details: [
      "Four-side locking lids are available across multiple container shapes.",
      "The lid structure is designed around the company's sealing-ring system.",
      "Shape, size, color, and packaging requirements can be discussed for OEM and ODM orders.",
    ],
  },
  {
    slug: "vented-four-side-lock-plastic-series",
    name: "Vented Four-Side Lock Plastic Food Container Series",
    category: "Vented Plastic Food Containers",
    image: "/images/products/product-showcase-05.png",
    tags: ["Vented lid", "Multiple shapes", "Four-side lock"],
    summary: "A plastic food container family with vented locking lids in square, rectangular, and round formats.",
    details: [
      "The vented lid concept is available across coordinated container shapes.",
      "Four-side locking points support consistent closure around the lid.",
      "Custom color, size, and packaging requirements can be reviewed for bulk orders.",
    ],
  },
  {
    slug: "vented-tempered-glass-lid-series",
    name: "Vented Tempered-Glass Lid Food Container Series",
    category: "Tempered-Glass Lid Food Containers",
    image: "/images/products/product-showcase-06.png",
    tags: ["Tempered-glass lid", "Vented lid", "Multiple shapes"],
    summary: "A food container series with vented tempered-glass locking lids in square, rectangular, and round formats.",
    details: [
      "The clear lid design provides direct visibility into the container.",
      "Square, rectangular, and round formats are shown in the product range.",
      "Compatible bowl, size, vent, and packaging requirements should be confirmed for each order.",
    ],
  },
  {
    slug: "round-tempered-glass-silicone-storage-lid",
    name: "Round Tempered-Glass and Silicone Storage Jar Lid",
    category: "Glass and Silicone Storage Lids",
    image: "/images/products/product-showcase-08.png",
    tags: ["Round lid", "Tempered glass", "Silicone structure"],
    summary: "A round tempered-glass and silicone lid developed for compatible food storage jars.",
    details: [
      "The lid combines a clear tempered-glass center with a silicone sealing structure.",
      "The pictured reference uses a 95 mm outer diameter.",
      "Jar compatibility, dimensions, color, and packaging must be confirmed before production.",
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
