import type { Category, CategoryKey, Product } from './types'
import { valves, valveGroups } from './valves'
import { automationProducts } from './automation'
import { waterSolutions, waterGroups } from './water'

export const categories: Category[] = [
  {
    key: 'valves',
    index: '01',
    path: '/products/valves',
    name: 'Industrial Valves',
    shortName: 'Valves',
    tagline: 'Flow control, engineered',
    // Standards list per "About KONIN Valves.docx".
    summary:
      'Ball, butterfly, gate, globe, check, knife gate, needle and automatic control valves, manufactured to applicable API, BIS, BS, DIN, ISO and EN standards.',
    description: [
      'KONIN manufactures a complete industrial valve range in cast and forged construction, from 6 mm instrument needle valves to 1800 mm double flanged butterfly valves.',
      'Every valve is built to the applicable API / BIS / BS / DIN / ISO / EN series standard, and 100% of production is dimension and pressure tested before dispatch.',
    ],
    heroImage: {
      src: '/img/heroes/valves-plant-pipework.webp',
      alt: 'Flanged valves and actuators on plant pipework',
    },
    cardImage: {
      src: '/img/gallery/industrial-valves.webp',
      alt: 'KONIN industrial valve range including ball, gate and butterfly valves',
    },
    groups: [
      { name: 'Ball Valves', blurb: 'Single, two and three piece, plus trunnion mounted' },
      { name: 'Gate Valves', blurb: 'Cast and forged, rising and non-rising spindle' },
      { name: 'Globe Valves', blurb: 'Cast and forged, for regulating duty' },
      { name: 'Check Valves', blurb: 'Swing, lift, wafer and dual plate' },
      { name: 'Butterfly Valves', blurb: 'Wafer, double flanged and double offset' },
      { name: 'Knife Gate Valves', blurb: 'Wafer and lugged, for slurry and pulp' },
      { name: 'Automatic Control Valves', blurb: 'Pilot operated PRV and PSV' },
      { name: 'Instrument & Speciality Valves', blurb: 'Needle, air valves and strainers' },
      { name: 'Valve Automation', blurb: 'Pneumatic and electric actuation' },
    ],
    accent: 'brand',
  },
  {
    key: 'automation-solutions',
    index: '02',
    path: '/products/automation-solutions',
    name: 'Automation Solutions',
    shortName: 'Automation',
    tagline: 'Panels, PLCs and plant control',
    // PLC and SCADA integration per "About KONIN Valves.docx".
    summary:
      'Electrical control panels and automation systems integrated with PLC and SCADA, designed, built and supported by KONIN’s own engineering team.',
    description: [
      'KONIN Automation Solutions designs and builds a comprehensive range of electrical control panels, from power and motor control centres through to APFC, VFD and PLC panels.',
      'As a brand-independent panel builder, KONIN programs and integrates all established control platforms and supports plants through the full lifecycle: design, commissioning, maintenance and expansion.',
    ],
    heroImage: {
      src: '/img/automation/automation-panel-shop-hero.webp',
      alt: 'Rows of electrical control panel enclosures on a panel-building shop floor',
    },
    cardImage: {
      src: '/img/automation/motor-control-center-modules.webp',
      alt: 'Rows of motor starter and protection modules in an open motor control centre',
    },
    groups: [
      { name: 'Power & Distribution', blurb: 'PCC, SDB and lighting distribution boards' },
      { name: 'Motor Control', blurb: 'MCC, soft starter and autotransformer panels' },
      { name: 'Drives & Control', blurb: 'VFD, PLC and APFC panels' },
      { name: 'Services', blurb: 'PLC programming, repair, maintenance and AMC' },
    ],
    accent: 'signal',
  },
  {
    key: 'water-treatment-solutions',
    index: '03',
    path: '/products/water-treatment-solutions',
    name: 'Water Treatment Solutions',
    shortName: 'Water Treatment',
    tagline: 'Source to distribution',
    summary:
      'Automation for dams, canals, pump houses, WTP, ETP, STP and desalination, with pipeline and source condition monitoring.',
    description: [
      'KONIN delivers control and monitoring solutions across the water cycle: gate and canal control at source, pump house and distribution network automation, and process control for water, effluent, sewage and desalination plants.',
      'Remote sites are linked by cellular, radio and VSAT communication, and can run on autonomous solar power where grid supply is not available.',
    ],
    heroImage: {
      src: '/img/heroes/water-treatment-clarifiers-aerial.webp',
      alt: 'Aerial view of a treatment plant with circular clarifiers',
    },
    cardImage: {
      src: '/img/industries/wtp.webp',
      alt: 'Water treatment plant of the kind KONIN automates',
    },
    groups: [
      { name: 'Source & Conveyance', blurb: 'Dam automation and canal management' },
      { name: 'Treatment Plants', blurb: 'WTP, ETP, STP and desalination' },
      { name: 'Distribution & Networks', blurb: 'Pump house, distribution and collection' },
      { name: 'Monitoring Systems', blurb: 'Pipeline, source condition and solar power' },
    ],
    accent: 'brand',
  },
]

export const categoryByKey = Object.fromEntries(categories.map((c) => [c.key, c])) as Record<
  CategoryKey,
  Category
>

export const productsByCategory: Record<CategoryKey, Product[]> = {
  valves,
  'automation-solutions': automationProducts,
  'water-treatment-solutions': waterSolutions,
}

export const groupsByCategory: Record<CategoryKey, readonly string[]> = {
  valves: valveGroups,
  'automation-solutions': ['Electrical Control Panels'],
  'water-treatment-solutions': waterGroups,
}

export const allProducts = categories.flatMap((c) =>
  productsByCategory[c.key].map((p) => ({ ...p, category: c }))
)

export function getProduct(categoryKey: CategoryKey, slug: string) {
  return productsByCategory[categoryKey].find((p) => p.slug === slug)
}

/** Products in the same group, excluding the current one. Falls back to the category. */
export function getRelated(categoryKey: CategoryKey, slug: string, limit = 3) {
  const list = productsByCategory[categoryKey]
  const current = list.find((p) => p.slug === slug)
  if (!current) return []
  const sameGroup = list.filter((p) => p.slug !== slug && p.group === current.group)
  const rest = list.filter((p) => p.slug !== slug && p.group !== current.group)
  return [...sameGroup, ...rest].slice(0, limit)
}

/** Curated homepage selection — one strong product per major family. */
export const featuredValveSlugs = [
  'wafer-butterfly-valves',
  'cast-gate-valves',
  'trunnion-ball-valves',
  'knife-edge-gate-valves',
  'cast-check-valves',
  'high-pressure-needle-valves',
] as const
