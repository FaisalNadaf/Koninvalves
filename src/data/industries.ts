/**
 * INDUSTRIES SERVED
 *
 * Source: the "Industries We Serve" panel of konin-valves-pdf.pdf (p4) and the
 * applications list published on the legacy koninvalve.com site. Images are the
 * application photographs from the legacy site. No industry has been added that
 * is not named in one of those two sources.
 */

export type Industry = {
  slug: string
  name: string
  blurb: string
  image: string
}

export const industries: Industry[] = [
  {
    slug: 'water-treatment-plants',
    name: 'Water Treatment Plants',
    blurb:
      'Isolation, control and air release valves for intake, treatment and distribution, plus WTP, ETP and STP automation.',
    image: '/img/industries/wtp.webp',
  },
  {
    slug: 'oil-and-gas',
    name: 'Oil & Gas',
    blurb:
      'Trunnion ball, forged and cast valves for upstream, midstream and processing duty, fire tested to API 607 / 6FA.',
    image: '/img/industries/oilgas.webp',
  },
  {
    slug: 'refineries',
    name: 'Refineries',
    blurb:
      'Full-bore isolation and regulating valves in alloy and stainless grades for refinery process lines and utilities.',
    image: '/img/industries/refineries.webp',
  },
  {
    slug: 'chemical',
    name: 'Chemical Industries',
    blurb:
      'Corrosion-resistant valve trains in CF8M, CF3M, CN7M and duplex, with PTFE and PEEK seating for aggressive media.',
    image: '/img/industries/chemical.webp',
  },
  {
    slug: 'fertilizer',
    name: 'Fertilizer Industries',
    blurb:
      'Valves and control panels for ammonia, urea and blending plants operating in abrasive and corrosive conditions.',
    image: '/img/industries/fertilizer.webp',
  },
  {
    slug: 'thermal-power',
    name: 'Thermal Power Plants',
    blurb:
      'Forged and cast valves for boiler feed, steam and condensate service, with actuated valves for remote operation.',
    image: '/img/industries/thermalpower.webp',
  },
  {
    slug: 'hydro-power',
    name: 'Hydro Power',
    blurb:
      'Large-bore butterfly and gate valves for penstock, cooling and drainage circuits, and dam gate automation.',
    image: '/img/industries/hydropower.webp',
  },
  {
    slug: 'nuclear-power',
    name: 'Nuclear Power Plants',
    blurb:
      'Valves supplied with third-party inspection by CEIL, TUV, BVQL, RITES and Germanischer Lloyd.',
    image: '/img/industries/nuclear-power.webp',
  },
  {
    slug: 'steel',
    name: 'Steel Industries',
    blurb:
      'Knife gate and butterfly valves for scale pits, gas cleaning and water circuits in integrated steel plants.',
    image: '/img/industries/steel.webp',
  },
  {
    slug: 'mining',
    name: 'Mining & Mineral Processing',
    blurb:
      'Hardfaced knife gate valves for slurry, tailings and dense media, selected against the abrasive duty.',
    image: '/img/industries/mining.webp',
  },
  {
    slug: 'pulp-and-paper',
    name: 'Pulp & Paper',
    blurb:
      'Knife gate and butterfly valves for stock, white water and recovery lines that would jam a conventional gate valve.',
    image: '/img/industries/paper.webp',
  },
  {
    slug: 'cement',
    name: 'Cement Industries',
    blurb:
      'Dust-tolerant valves and motor control centres for raw mill, kiln and packing plant services.',
    image: '/img/industries/cement.webp',
  },
  {
    slug: 'sugar',
    name: 'Sugar Industries',
    blurb:
      'Knife gate and butterfly valves for juice, molasses and bagasse handling, plus mill drive control panels.',
    image: '/img/industries/sugar.webp',
  },
  {
    slug: 'pharmaceutical',
    name: 'Pharmaceutical Industries',
    blurb:
      'Stainless steel valves with PTFE and RPTFE seating for clean utility and process service.',
    image: '/img/industries/pharma.webp',
  },
  {
    slug: 'marine',
    name: 'Marine Industries',
    blurb:
      'Salt-spray tested coatings and marine-grade materials, with Germanischer Lloyd inspection available.',
    image: '/img/industries/marine.webp',
  },
  {
    slug: 'fire-fighting',
    name: 'Fire Fighting',
    blurb:
      'Butterfly, gate and check valves plus automatic pressure reducing and sustaining valves for hydrant systems.',
    image: '/img/industries/fire.webp',
  },
  {
    slug: 'pipelines',
    name: 'Pipelines',
    blurb:
      'Trunnion ball valves, air valves and pipeline condition monitoring with ultrasonic leak detection.',
    image: '/img/industries/pipeline.webp',
  },
]

/** Additional industries named in the catalogue's "Industries We Serve" panel. */
export const additionalIndustries = [
  'Food Processing',
  'Beverages',
  'Milk Production',
  'Textiles',
  'Glass',
  'Rubber',
  'Petrochemical',
  'Heavy Metal',
  'Pump Houses',
  'Sewage Plants',
  'Oil Mills',
] as const
