export type SpecRow = {
  label: string
  value: string
}

export type ProductImage = {
  src: string
  alt: string
  /**
   * Gallery caption for this photograph, when it shows something other than
   * the product it is filed under. Defaults to the product's name.
   */
  caption?: string
}

/** A single catalogue item — a valve, a control panel, or a water solution. */
export type Product = {
  slug: string
  name: string
  /** Short label used in cards, breadcrumbs and nav. */
  shortName?: string
  /** Sub-family within the category, e.g. "Ball Valves". */
  group: string
  /** One-line description used on cards and meta descriptions. */
  summary: string
  /** Longer body copy for the detail page overview. */
  overview?: string[]
  image: ProductImage
  /**
   * KONIN's own catalogue photograph of the product, kept for reference when
   * `image` is illustrative photography instead. Not rendered at present.
   */
  catalogueImage?: ProductImage
  gallery?: ProductImage[]
  /** Headline facts surfaced on the card and the detail hero. */
  quickFacts?: SpecRow[]
  /** Full technical table. */
  specs?: SpecRow[]
  /** Secondary table (e.g. materials of construction). */
  materials?: SpecRow[]
  features?: string[]
  applications?: string[]
  standards?: string[]
  /** Where the data came from — surfaced in the UI as provenance. */
  source: 'catalogue' | 'website' | 'catalogue+website'
}

export type CategoryKey = 'valves' | 'automation-solutions' | 'water-treatment-solutions'

export type Category = {
  key: CategoryKey
  index: string
  path: string
  name: string
  shortName: string
  tagline: string
  summary: string
  description: string[]
  heroImage: ProductImage
  cardImage: ProductImage
  /** Sub-families listed under the category and in the mega-menu. */
  groups: { name: string; blurb: string }[]
  accent: 'brand' | 'signal' | 'steel'
}
