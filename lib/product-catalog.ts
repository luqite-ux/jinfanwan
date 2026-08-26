export type ProductCategory = {
  slug: string
  name: string
  image: string
  summary: string
}

export type ProductRecord = {
  slug: string
  name: string
  sourceNameZh: string
  sourceSlide: number
  category: string
  categorySlug: string
  image: string
  tags: string[]
  summary: string
  details: string[]
}

export const expandedCategories: ProductCategory[] = [
  {
    slug: "hinged-plastic-containers",
    name: "Hinged Plastic Containers",
    image: "/images/products/expanded/slide-01.png",
    summary: "Vented and non-vented hinged food container formats in square, rectangular, and round shapes.",
  },
  {
    slug: "hinged-glass-lid-containers",
    name: "Hinged Glass-Lid Containers",
    image: "/images/products/expanded/slide-07.png",
    summary: "Hinged glass-lid container formats with vented and non-vented configurations.",
  },
  {
    slug: "hinged-stainless-steel-lid-containers",
    name: "Hinged Stainless-Steel-Lid Containers",
    image: "/images/products/expanded/slide-13.png",
    summary: "Hinged stainless-steel-lid formats shown with compatible container and bowl options.",
  },
  {
    slug: "two-clip-plastic-glass-containers",
    name: "Two-Clip Plastic-and-Glass Containers",
    image: "/images/products/expanded/slide-17.png",
    summary: "Two-clip plastic-and-glass container formats in square, rectangular, and round shapes.",
  },
  {
    slug: "silicone-glass-containers",
    name: "Silicone-and-Glass Containers",
    image: "/images/products/expanded/slide-24.png",
    summary: "Silicone-and-glass food container formats represented in the supplied product range.",
  },
  {
    slug: "silicone-glass-lids",
    name: "Silicone-and-Glass Lids",
    image: "/images/products/expanded/slide-36.jpg",
    summary: "Two-clip silicone-and-glass lid formats, including vacuum-lid variants.",
  },
]

type ProductSource = readonly [
  slide: number,
  slug: string,
  name: string,
  sourceNameZh: string,
  category: string,
  tags: readonly string[],
]

const sources: ProductSource[] = [
  [1, "hinged-non-vented-square-food-container", "Hinged Non-Vented Square Food Container", "转轴无孔正方形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Non-vented", "Square"]],
  [2, "hinged-non-vented-rectangular-food-container", "Hinged Non-Vented Rectangular Food Container", "转轴无孔长方形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Non-vented", "Rectangular"]],
  [3, "hinged-non-vented-round-food-container", "Hinged Non-Vented Round Food Container", "转轴无孔圆形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Non-vented", "Round"]],
  [4, "hinged-vented-square-food-container", "Hinged Vented Square Food Container", "转轴有孔正方形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Vented", "Square"]],
  [5, "hinged-vented-rectangular-food-container", "Hinged Vented Rectangular Food Container", "转轴有孔长方形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Vented", "Rectangular"]],
  [6, "hinged-vented-round-food-container", "Hinged Vented Round Food Container", "转轴有孔圆形保鲜盒", "Hinged Plastic Containers", ["Hinged lid", "Vented", "Round"]],
  [7, "hinged-vented-glass-lid-square-food-container", "Hinged Vented Glass-Lid Square Food Container", "转轴玻璃有孔正方形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Vented", "Square"]],
  [8, "hinged-vented-glass-lid-round-food-container", "Hinged Vented Glass-Lid Round Food Container", "转轴玻璃有孔圆形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Vented", "Round"]],
  [9, "hinged-vented-glass-lid-rectangular-food-container", "Hinged Vented Glass-Lid Rectangular Food Container", "转轴玻璃有孔长方形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Vented", "Rectangular"]],
  [10, "hinged-non-vented-glass-lid-square-food-container", "Hinged Non-Vented Glass-Lid Square Food Container", "转轴玻璃无孔正方形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Non-vented", "Square"]],
  [11, "hinged-non-vented-glass-lid-rectangular-food-container-v1", "Hinged Non-Vented Glass-Lid Rectangular Food Container — Variant 1", "转轴玻璃无孔长方形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Non-vented", "Rectangular"]],
  [12, "hinged-non-vented-glass-lid-round-food-container", "Hinged Non-Vented Glass-Lid Round Food Container", "转轴玻璃无孔圆形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Non-vented", "Round"]],
  [13, "hinged-non-vented-stainless-steel-lid-rectangular-food-container", "Hinged Non-Vented Stainless-Steel-Lid Rectangular Food Container", "转轴不锈钢无孔长方形保鲜盒", "Hinged Stainless-Steel-Lid Containers", ["Stainless-steel lid", "Non-vented", "Rectangular"]],
  [14, "hinged-non-vented-stainless-steel-lid-round-food-container-v1", "Hinged Non-Vented Stainless-Steel-Lid Round Food Container — Variant 1", "转轴不锈钢无孔圆形保鲜盒", "Hinged Stainless-Steel-Lid Containers", ["Stainless-steel lid", "Non-vented", "Round"]],
  [15, "hinged-non-vented-stainless-steel-lid-square-food-container", "Hinged Non-Vented Stainless-Steel-Lid Square Food Container", "转轴不锈钢无孔正方形保鲜盒", "Hinged Stainless-Steel-Lid Containers", ["Stainless-steel lid", "Non-vented", "Square"]],
  [16, "hinged-non-vented-glass-lid-rectangular-food-container-v2", "Hinged Non-Vented Glass-Lid Rectangular Food Container — Variant 2", "转轴玻璃无孔长方形保鲜盒", "Hinged Glass-Lid Containers", ["Glass lid", "Non-vented", "Rectangular"]],
  [17, "two-clip-plastic-glass-square-food-container-v1", "Two-Clip Plastic-and-Glass Square Food Container — Variant 1", "两扣塑料玻璃正方形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Square"]],
  [18, "two-clip-plastic-glass-rectangular-food-container-v1", "Two-Clip Plastic-and-Glass Rectangular Food Container — Variant 1", "两扣塑料玻璃长方形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Rectangular"]],
  [19, "two-clip-plastic-glass-round-food-container-v1", "Two-Clip Plastic-and-Glass Round Food Container — Variant 1", "两扣塑料玻璃圆形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Round"]],
  [20, "two-clip-plastic-glass-square-food-container-v2", "Two-Clip Plastic-and-Glass Square Food Container — Variant 2", "两扣塑料玻璃正方形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Square"]],
  [21, "two-clip-plastic-glass-round-food-container-v2", "Two-Clip Plastic-and-Glass Round Food Container — Variant 2", "两扣塑料玻璃圆形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Round"]],
  [22, "two-clip-plastic-glass-square-food-container-v3", "Two-Clip Plastic-and-Glass Square Food Container — Variant 3", "两扣塑料玻璃正方形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Square"]],
  [23, "two-clip-plastic-glass-rectangular-food-container-v2", "Two-Clip Plastic-and-Glass Rectangular Food Container — Variant 2", "两扣塑料玻璃长方形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Two-clip", "Plastic and glass", "Rectangular"]],
  [24, "two-clip-silicone-glass-food-container", "Two-Clip Silicone-and-Glass Food Container", "两扣硅胶玻璃保鲜盒", "Silicone-and-Glass Containers", ["Two-clip", "Silicone and glass"]],
  [25, "silicone-glass-rectangular-food-container", "Silicone-and-Glass Rectangular Food Container", "硅胶玻璃长方形保鲜盒", "Silicone-and-Glass Containers", ["Silicone and glass", "Rectangular"]],
  [26, "silicone-glass-square-food-container-v1", "Silicone-and-Glass Square Food Container — Variant 1", "硅胶玻璃正方形保鲜盒", "Silicone-and-Glass Containers", ["Silicone and glass", "Square"]],
  [27, "silicone-glass-square-food-container-v2", "Silicone-and-Glass Square Food Container — Variant 2", "硅胶玻璃正方形保鲜盒", "Silicone-and-Glass Containers", ["Silicone and glass", "Square"]],
  [28, "plastic-glass-round-food-container", "Plastic-and-Glass Round Food Container", "塑料玻璃圆形保鲜盒", "Two-Clip Plastic-and-Glass Containers", ["Plastic and glass", "Round"]],
  [29, "silicone-glass-round-food-container", "Silicone-and-Glass Round Food Container", "硅胶玻璃圆形保鲜盒", "Silicone-and-Glass Containers", ["Silicone and glass", "Round"]],
  [30, "silicone-glass-square-food-container-v3", "Silicone-and-Glass Square Food Container — Variant 3", "硅胶玻璃正方形保鲜盒", "Silicone-and-Glass Containers", ["Silicone and glass", "Square"]],
  [31, "hinged-non-vented-stainless-steel-lid-round-food-container-v2", "Hinged Non-Vented Stainless-Steel-Lid Round Food Container — Variant 2", "转轴不锈钢无孔圆形保鲜盒", "Hinged Stainless-Steel-Lid Containers", ["Stainless-steel lid", "Non-vented", "Round"]],
  [32, "hinged-non-vented-round-container-for-stainless-steel-bowl", "Hinged Non-Vented Round Container for Stainless-Steel Bowl", "转轴无孔圆形保鲜盒（匹配不锈钢碗）", "Hinged Plastic Containers", ["Hinged lid", "Non-vented", "Round", "For stainless-steel bowl"]],
  [33, "hinged-vented-round-container-for-stainless-steel-bowl", "Hinged Vented Round Container for Stainless-Steel Bowl", "转轴有孔圆形保鲜盒（匹配不锈钢碗）", "Hinged Plastic Containers", ["Hinged lid", "Vented", "Round", "For stainless-steel bowl"]],
  [34, "hinged-vented-square-container-for-stainless-steel-bowl", "Hinged Vented Square Container for Stainless-Steel Bowl", "转轴有孔正方形保鲜盒（匹配不锈钢碗）", "Hinged Plastic Containers", ["Hinged lid", "Vented", "Square", "For stainless-steel bowl"]],
  [35, "hinged-stainless-steel-square-food-container-with-glass-bowl", "Hinged Stainless-Steel Square Food Container with Glass Bowl", "转轴不锈钢正方形保鲜盒（玻璃碗）", "Hinged Stainless-Steel-Lid Containers", ["Stainless-steel lid", "Square", "Glass bowl"]],
  [36, "two-clip-square-silicone-glass-vacuum-lid", "Two-Clip Square Silicone-and-Glass Vacuum Lid", "两扣正方形硅胶玻璃真空盖", "Silicone-and-Glass Lids", ["Two-clip", "Vacuum lid", "Square"]],
  [37, "two-clip-round-silicone-glass-vacuum-lid", "Two-Clip Round Silicone-and-Glass Vacuum Lid", "两扣圆形硅胶玻璃真空盖", "Silicone-and-Glass Lids", ["Two-clip", "Vacuum lid", "Round"]],
  [38, "two-clip-rectangular-silicone-glass-vacuum-lid", "Two-Clip Rectangular Silicone-and-Glass Vacuum Lid", "两扣长方形硅胶玻璃真空盖", "Silicone-and-Glass Lids", ["Two-clip", "Vacuum lid", "Rectangular"]],
  [39, "two-clip-round-silicone-glass-lid", "Two-Clip Round Silicone-and-Glass Lid", "两扣圆形硅胶玻璃盖", "Silicone-and-Glass Lids", ["Two-clip", "Silicone and glass", "Round"]],
  [40, "two-clip-rectangular-silicone-glass-lid", "Two-Clip Rectangular Silicone-and-Glass Lid", "两扣长方形硅胶玻璃盖", "Silicone-and-Glass Lids", ["Two-clip", "Silicone and glass", "Rectangular"]],
  [41, "two-clip-square-silicone-glass-lid", "Two-Clip Square Silicone-and-Glass Lid", "两扣正方形硅胶玻璃盖", "Silicone-and-Glass Lids", ["Two-clip", "Silicone and glass", "Square"]],
]

function imageForSlide(slide: number) {
  const extension = slide >= 36 && slide <= 40 ? "jpg" : "png"
  return `/images/products/expanded/slide-${String(slide).padStart(2, "0")}.${extension}`
}

export const expandedProducts: ProductRecord[] = sources.map(([sourceSlide, slug, name, sourceNameZh, category, tags]) => ({
  slug,
  name,
  sourceNameZh,
  sourceSlide,
  category,
  categorySlug: expandedCategories.find((item) => item.name === category)!.slug,
  image: imageForSlide(sourceSlide),
  tags: [...tags],
  summary: `${name} from the JINFANWAN food storage product range for B2B sourcing inquiries.`,
  details: [
    `The supplied product reference identifies this item as ${sourceNameZh}.`,
    "Confirm the required size, color, container or bowl match, and packaging for the selected item.",
    "Order-specific sampling, production, and inspection requirements can be reviewed through direct inquiry.",
  ],
}))

export const sourceSlides = expandedProducts.map(({ sourceSlide: slide, sourceNameZh, slug, image }) => ({
  slide,
  sourceNameZh,
  slug,
  image,
}))

export function filterProductsByCategory(products: ProductRecord[], categorySlug: string) {
  return categorySlug === "all" ? products : products.filter((product) => product.categorySlug === categorySlug)
}
