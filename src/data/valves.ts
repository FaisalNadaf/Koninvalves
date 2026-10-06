import type { Product } from './types'

/**
 * VALVE CATALOGUE
 *
 * Every specification below is transcribed from one of two KONIN sources:
 *  · "konin-valves-pdf.pdf"  — the printed KONIN Valves catalogue (pages 2–3)
 *  · the legacy koninvalve.com product pages (per-product specification tables)
 *
 * Where both sources describe the same product, the legacy site's engineering
 * table is used as the primary specification (it is the more detailed of the
 * two) and catalogue-only fields — operation, additional standards, catalogue
 * size band — are added as extra rows. Nothing here is invented or inferred.
 *
 * The lead photographs of the 1PC, 2PC and 3PC ball valves, the three automatic
 * control valves and the needle valve are KONIN's own studio shots, supplied in
 * "About KONIN Valves.docx". The markings in each alt text are read off the
 * photographed unit; they describe that unit, not the product's full range.
 *
 * The lead photographs of the wafer and double flanged butterfly valves, the
 * cast gate and globe valves, the knife gate valve and the air valve, and the
 * gallery shots credited to it below, come from "valve photos.docx" — see
 * scripts/extract-docx-photos.mjs for which photograph sat under which heading.
 */

const APPLICATIONS_PROCESS = [
  'Water Treatment Systems',
  'Wastewater Treatment Systems',
  'Oil & Gas Industries',
  'Petrochemical Industries',
  'Chemical Processing Industries',
  'Power Generation',
  'Water Distribution & Utilities',
  'Pulp & Paper Industries',
]

export const valves: Product[] = [
  /* ================= BALL VALVES ================= */
  {
    slug: 'single-piece-ball-valves',
    name: '1 (Single) Piece Ball Valves',
    shortName: 'Single Piece Ball Valve',
    group: 'Ball Valves',
    summary:
      'Compact one-piece ball valve for screwed and socket-weld lines, rated to Class 800 with PTFE-family seats.',
    overview: [
      'The KONIN single piece ball valve is a compact, lever-operated quarter-turn valve built for small-bore screwed and socket-weld piping. Its one-piece body removes a potential leak path and keeps the installed envelope tight.',
      'Bodies and inserts are available in WCB, CF8, CF8M and carbon steel, with a choice of soft seats — PTFE, CFT, GFT, Delrin, Nylon, PEEK — or metal seating for more demanding duties.',
    ],
    image: {
      src: '/img/products/single-piece-ball-valve-konin.webp',
      alt: 'KONIN 1 (single) piece ball valve with female screwed ends and red KONIN lever handle',
    },
    gallery: [
      {
        src: '/img/products/1-single-piece-ball-valves.webp',
        alt: 'KONIN 1 (single) piece stainless steel ball valve with lever handle and screwed ends',
      },
      {
        src: '/img/gallery/single-piece-ball-valve.webp',
        alt: 'Single piece ball valve body showing screwed end connection',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 800' },
      { label: 'End connection', value: 'Screwed · Socket' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 800' },
      { label: 'Catalogue size band', value: '10 mm – 65 mm' },
      { label: 'Design standard', value: 'BS EN ISO 17292 (BS 5351), API 6D' },
      { label: 'Face to face (flanged end only)', value: 'ASME B16.10, EN 558-2' },
      { label: 'Testing standard', value: 'API 598, BS 6755-1, EN 12266-1' },
      { label: 'End connection', value: 'Screwed, Socket' },
      {
        label: 'End detail',
        value:
          'SE — BS 21 (parallel / taper) / ASME B1.20.1 (NPT) threads · SWE — ASME B16.11',
      },
      { label: 'Operation', value: 'Lever' },
    ],
    materials: [
      { label: 'Body & insert', value: 'WCB, CF8, CF8M, CS' },
      { label: 'Ball', value: 'CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316' },
      { label: 'Seat', value: 'PTFE / CFT / GFT / Delrin / Nylon / PEEK / Metal' },
    ],
    standards: ['BS EN ISO 17292 (BS 5351)', 'API 6D', 'ASME B16.10', 'API 598', 'EN 12266-1'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'cast-steel-two-piece-ball-valves',
    name: 'Cast Steel Two Piece / CS 2 Piece Ball Valves',
    shortName: '2 Piece Ball Valve',
    group: 'Ball Valves',
    summary:
      'Two-piece cast steel ball valve up to 300 mm and Class 1500, with flanged, screwed, socket and butt-weld ends.',
    overview: [
      'The two-piece cast steel ball valve is KONIN’s general-purpose isolation valve for larger bore and higher class duties. The split-body construction allows the seats and ball to be serviced while retaining a robust pressure boundary.',
      'It is available up to 300 mm (12") in Class 150 and 300, and in reduced sizes for Class 600, 900 and 1500 service.',
    ],
    image: {
      src: '/img/products/two-piece-ball-valve-flanged-konin.webp',
      alt: 'KONIN two piece ball valve with flanged ends, CF8 body, PTFE seat and Class 150 nameplate',
    },
    gallery: [
      {
        src: '/img/products/cast-steel-two-piece-cs-2-piece-ball-valves.webp',
        alt: 'KONIN cast steel two piece ball valve with flanged ends and lever operation',
      },
      { src: '/img/gallery/high-pressure-ball-valve.webp', alt: 'High pressure ball valve assembly' },
      { src: '/img/products/ball-valve.webp', alt: 'Stainless steel ball valve close-up' },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 300 mm (12")' },
      { label: 'Pressure rating', value: 'Class 150 – 1500' },
      { label: 'End connection', value: 'Flanged · Screwed · Socket · Butt weld' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 300 mm (12") — Class 150, 300' },
      { label: '', value: '15 mm (½") to 150 mm (6") — Class 600' },
      { label: ' ', value: '15 mm (½") to 65 mm (2½") — Class 900 & 1500' },
      { label: 'Design standard', value: 'BS EN ISO 17292 (BS 5351)' },
      { label: 'Face to face', value: 'ASME B16.10, EN 558-2' },
      { label: 'Testing standard', value: 'API 598, BS 6755-1, EN 12266-1' },
      { label: 'End connection', value: 'Flanged, Screwed, Socket & Butt weld' },
      { label: 'Operation', value: 'Lever · Gear · Pneumatic actuator · Electric actuator' },
    ],
    materials: [
      { label: 'Body', value: 'WCB, CF8, CF8M, Duplex etc.' },
      { label: 'Ball', value: 'CF8, CF8M, Duplex etc.' },
      { label: 'Stem', value: '410, 304, 316 etc.' },
      { label: 'Seat', value: 'PTFE, CFT, GFT, PEEK, Delrin, Nylon & Metal' },
    ],
    standards: ['BS EN ISO 17292 (BS 5351)', 'API 6D', 'ASME B16.10', 'API 598', 'ISO 17292'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'forged-three-piece-ball-valves',
    name: 'Forged 3 (Three) Piece Ball Valves',
    shortName: '3 Piece Ball Valve',
    group: 'Ball Valves',
    summary:
      'Forged three-piece ball valve in Class 600 and 800. The body splits for in-line seat and ball replacement.',
    overview: [
      'The three-piece design lets the centre body be removed for maintenance without disturbing the end pieces welded or screwed into the line — the reason it is specified where in-situ serviceability matters.',
      'KONIN supplies the valve in forged WCB, CF8, CF8M and duplex materials with screwed, socket-weld and butt-weld ends.',
    ],
    image: {
      src: '/img/products/three-piece-ball-valve-screwed-konin.webp',
      alt: 'KONIN three piece CF8 ball valve with screwed ends and red KONIN lever handle',
    },
    gallery: [
      {
        src: '/img/products/forged-3-three-piece-ball-valves1.webp',
        alt: 'KONIN forged three piece stainless steel ball valve with lever handle',
      },
      { src: '/img/gallery/three-piece-ball-valve.webp', alt: 'Three piece ball valve body assembly' },
      { src: '/img/products/forged-ball-valve.webp', alt: 'Forged ball valve with flanged connection' },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 600 & 800' },
      { label: 'End connection', value: 'Screwed · Socket weld · Butt weld' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 600 & 800' },
      { label: 'Catalogue size band', value: '15 mm – 300 mm (2PC / 3PC range)' },
      { label: 'Design standard', value: 'BS EN ISO 17292 (BS 5351), API 6D' },
      { label: 'Face to face (flanged end only)', value: 'ASME B16.10, EN 558-2' },
      { label: 'Testing standard', value: 'API 598, BS 6755-1, EN 12266-1' },
      { label: 'End connection', value: 'Screwed, Socket weld & Butt weld' },
      {
        label: 'End detail',
        value:
          'SE — BS 21 (parallel / taper) / ASME B1.20.1 (NPT) threads · SWE — ASME B16.11 · BWE — ASME B16.25',
      },
      { label: 'Operation', value: 'Lever · Gear · Pneumatic actuator · Electric actuator' },
    ],
    materials: [
      { label: 'Body & end piece', value: 'WCB, CF8, CF8M, Duplex etc.' },
      { label: 'Ball', value: '410, 304, 316, Duplex etc.' },
      { label: 'Stem', value: '410, 304, 316 etc.' },
      { label: 'Seat', value: 'PTFE / CFT / GFT / Delrin / Nylon / PEEK / Metal' },
    ],
    standards: ['BS EN ISO 17292 (BS 5351)', 'API 6D', 'ASME B16.11', 'ASME B16.25', 'API 598'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'trunnion-ball-valves',
    name: 'Trunnion Ball Valves',
    shortName: 'Trunnion Ball Valve',
    group: 'Ball Valves',
    summary:
      'Trunnion-mounted ball valve to 750 mm and Class 1500, fire-tested to API 607 / 6FA for pipeline duty.',
    overview: [
      'Trunnion mounting carries the ball load into the body rather than the seats, which keeps operating torque low and sealing consistent on large-bore, high-pressure lines.',
      'KONIN builds the valve in A105 and LF2 bodies with 17-4PH and UNS S31803 stems, and offers hardened 410 or stellited 316 metal seats alongside the soft seat range.',
    ],
    image: {
      src: '/img/products/flanged-butt-weld-trunnion-ball-valves.webp',
      alt: 'KONIN trunnion mounted ball valve with flanged ends and gear operator',
    },
    gallery: [
      {
        src: '/img/products/flanged-butt-weld-trunnion-ball-valves1.webp',
        alt: 'Trunnion ball valve in stainless steel with flanged end connections',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '50 mm (2") – 750 mm (30")' },
      { label: 'Pressure rating', value: 'Class 150 – 1500' },
      { label: 'Fire test', value: 'API 607 / 6FA' },
    ],
    specs: [
      { label: 'Sizes', value: '50 mm (2") to 750 mm (30") — Class 150 & 300' },
      { label: '', value: '50 mm (2") to 600 mm (24") — Class 600' },
      { label: ' ', value: '50 mm (2") to 400 mm (16") — Class 900' },
      { label: '  ', value: '50 mm (2") to 300 mm (12") — Class 1500' },
      { label: 'Design standard', value: 'BS EN ISO 17292 (BS 5351), API 6D, ASME B16.34' },
      { label: 'Face to face', value: 'ASME B16.10' },
      {
        label: 'Testing standard',
        value: 'API 6D, API 598, EN 12266-1, ASME B16.34, API 607 / 6FA',
      },
      { label: 'End connection', value: 'Flanged' },
      { label: 'End detail', value: 'FE — ASME B16.5 · BWE — ASME B16.25' },
    ],
    materials: [
      { label: 'Body', value: 'A105, LF2' },
      { label: 'Ball', value: 'A105 + ENP, LF2 + ENP' },
      { label: 'Stem / trunnion', value: '17-4PH, UNS S31803' },
      { label: 'Seat', value: 'PTFE / RPTFE / Delrin / Nylon / PEEK / Metal' },
      { label: 'Metal seat', value: '410 + hardened, 316 + stellited' },
    ],
    standards: ['API 6D', 'ASME B16.34', 'ASME B16.5', 'API 607 / 6FA', 'BS EN ISO 17292'],
    applications: ['Oil & Gas Industries', 'Refineries', 'Pipelines', 'Petrochemical Industries'],
    source: 'website',
  },

  /* ================= GATE VALVES ================= */
  {
    slug: 'cast-gate-valves',
    name: 'Cast Gate Valves',
    shortName: 'Cast Gate Valve',
    group: 'Gate Valves',
    summary:
      'Flanged and butt-weld cast gate valve to 900 mm, built to API 600 / API 6D with rising or non-rising spindle.',
    overview: [
      'KONIN cast gate valves provide full-bore, low-pressure-drop isolation across water, steam and process duties. They are manufactured to API 600, API 6D and ASME B16.34 and tested to API 598.',
      'Both rising and non-rising spindle configurations are available, with handwheel, gear or electric actuator operation.',
    ],
    image: {
      src: '/img/products/cast-gate-valve-flanged-konin.webp',
      alt: 'KONIN cast steel gate valve with flanged ends and handwheel, body marked 6, 150 and WCB',
    },
    gallery: [
      {
        src: '/img/products/cast-gate-valves.webp',
        alt: 'KONIN cast steel gate valve in a silver finish with flanged ends and blue handwheel',
      },
      { src: '/img/gallery/gate-valve.webp', alt: 'Cast gate valve with rising spindle and handwheel' },
      { src: '/img/gallery/8-gtv-4.webp', alt: '8 inch KONIN gate valve' },
      { src: '/img/gallery/gun-metal-gate-valves.webp', alt: 'Gun metal gate valve' },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 900 mm (36")' },
      { label: 'Pressure rating', value: 'Class 150 & 300' },
      { label: 'Design standard', value: 'API 600 · API 6D' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 900 mm (36") — Class 150' },
      { label: '', value: '15 mm (½") to 600 mm (24") — Class 300' },
      { label: 'Catalogue size band', value: '25 mm – 600 mm (rising / non-rising spindle)' },
      { label: 'Design standard', value: 'API 600, API 6D, ASME B16.34' },
      { label: 'Face to face (flanged / butt weld end)', value: 'ASME B16.10, B16.25' },
      { label: 'Testing standard', value: 'API 598 / API 6D, ASME B16.34' },
      { label: 'End connection', value: 'Flanged, Butt weld end' },
      { label: 'Operation', value: 'Handwheel · Gear · Electric actuator' },
    ],
    materials: [
      { label: 'Body & bonnet', value: 'WCB, CF8, CF8M' },
      { label: 'Wedge', value: '410, 304, 316, 316L, CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316' },
      { label: 'Seat', value: '410, 304, 316, CF8, CF8M' },
      { label: 'Seating (catalogue)', value: 'GM · SS' },
    ],
    standards: ['API 600', 'API 6D', 'ASME B16.34', 'ASME B16.10', 'MSS SP-81', 'API 598'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'forged-gate-valves',
    name: 'Forged Gate Valves',
    shortName: 'Forged Gate Valve',
    group: 'Gate Valves',
    summary:
      'Small-bore forged steel gate valve to Class 2500 in A105 and F-series alloys, per API 602 / BS 5352.',
    overview: [
      'Forged gate valves handle the high-pressure, small-bore duties where cast bodies are unsuitable. KONIN supplies them in A105 and in F5, F9, F11, F22, F304 and F316 alloy forgings.',
      'Screwed, socket-weld and butt-weld ends are standard; weld-on flanged ends are available for Class 150, 300 and 600.',
    ],
    image: {
      src: '/img/products/forged-gate-valves.webp',
      alt: 'KONIN forged steel gate valve with socket weld ends and handwheel',
    },
    gallery: [
      { src: '/img/gallery/forged-gate-valve.webp', alt: 'Forged steel gate valve body' },
      { src: '/img/products/forged-gate-valves1.webp', alt: 'Forged gate valve alternate view' },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 800 · 1500 · 2500' },
      { label: 'Design standard', value: 'API 602 · BS 5352' },
    ],
    specs: [
      { label: 'Sizes — screwed, socket & butt weld', value: '15 mm (½") to 50 mm (2") — Class 800 & 1500' },
      { label: '', value: '15 mm (½") to 25 mm (1") — Class 2500' },
      { label: 'Sizes — flanged (weld-on flanges)', value: '15 mm (½") to 50 mm (2") — Class 150, 300 & 600' },
      { label: 'Design standard', value: 'API 602, BS 5352' },
      { label: 'Face to face', value: 'ASME B16.10' },
      { label: 'Testing standard', value: 'API 598 / EN 12266-1' },
      { label: 'End connection', value: 'Flanged, Screwed, Socket weld ends' },
      {
        label: 'End detail',
        value: 'SE — BS 21 (parallel / taper) / ASME B1.20.1 (NPT) threads · SWE — ASME B16.11',
      },
      { label: 'Operation', value: 'Handwheel' },
    ],
    materials: [
      { label: 'Body & bonnet', value: 'A105, F11, F22, F5, F9, F304 & F316' },
      { label: 'Wedge', value: 'CA15, CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316' },
      { label: 'Seat', value: '410, 304, 316' },
    ],
    standards: ['API 602', 'BS 5352', 'API 600', 'API 6D', 'MSS SP-81', 'ASME B16.10'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },

  /* ================= GLOBE VALVES ================= */
  {
    slug: 'cast-globe-valves',
    name: 'Cast Globe Valves',
    shortName: 'Cast Globe Valve',
    group: 'Globe Valves',
    summary:
      'Flanged cast globe valve to 350 mm for throttling and regulating duty, designed to BS 1873 / ASME B16.34.',
    overview: [
      'Globe valves give fine, repeatable control of flow rate — the disc moves perpendicular to the seat so the valve can be held part-open without the seat damage a gate valve would suffer.',
      'KONIN cast globe valves are offered in WCB, WC6, LCB, CF8, CF8M, CF3M and CN7M bodies for temperatures and media across the process range.',
    ],
    image: {
      src: '/img/products/cast-globe-valve-flanged-konin.webp',
      alt: 'KONIN cast steel globe valve with flanged ends and handwheel, body marked 6, 150 and WCB with a flow arrow',
    },
    gallery: [
      {
        src: '/img/products/cast-globe-valves.webp',
        alt: 'KONIN cast steel globe valve in a silver finish with flanged ends and handwheel',
      },
      { src: '/img/gallery/ibr-globe-valve.webp', alt: 'IBR globe valve' },
      { src: '/img/gallery/15nb-20nb-ibr-globe-valve.webp', alt: '15NB and 20NB IBR globe valves' },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 350 mm (14")' },
      { label: 'Pressure rating', value: 'Class 150 · 300 · 600' },
      { label: 'Design standard', value: 'BS 1873 · ASME B16.34' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 350 mm (14") — Class 150' },
      { label: '', value: '15 mm (½") to 350 mm (14") — Class 300' },
      { label: ' ', value: '50 mm (2") to 300 mm (12") — Class 600' },
      { label: 'Catalogue size band', value: '15 mm – 600 mm' },
      { label: 'Design standard', value: 'BS 1873, ASME B16.34' },
      { label: 'Face to face (flanged / butt weld end)', value: 'ASME B16.10, B16.25' },
      { label: 'Testing standard', value: 'EN 12266-1, API 598 / API 6D, ASME B16.34' },
      { label: 'End connection', value: 'Flanged, Butt weld end' },
      { label: 'Operation', value: 'Handwheel · Gear · Electric actuator' },
    ],
    materials: [
      { label: 'Body & bonnet', value: 'WCB, WC6, LCB, CF8, CF8M, CF3M, CN7M' },
      { label: 'Disc', value: '410, 304, 316, 316L, CA15, CF8, CF8M, CN7M' },
      { label: 'Stem', value: '410, 304, 316, AL20' },
      { label: 'Seat', value: '410, 304, 316, CF8, CF8M, CF3M, CN7M' },
      { label: 'Seating (catalogue)', value: 'GM · SS' },
    ],
    standards: ['BS 1873', 'ASME B16.34', 'ASME B16.10', 'API 598', 'ND-16', 'ND-40'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'forged-globe-valves',
    name: 'Forged Globe Valves',
    shortName: 'Forged Globe Valve',
    group: 'Globe Valves',
    summary:
      'Forged steel globe valve for small-bore regulating duty up to Class 2500, per API 602 / BS 5352.',
    overview: [
      'The forged globe valve pairs the throttling characteristic of a globe body with the pressure capability of a forged small-bore valve — the standard choice for instrument, drain and bypass lines on high-pressure systems.',
    ],
    image: {
      src: '/img/products/forged-globe-valves.webp',
      alt: 'KONIN forged steel globe valve with socket weld ends and handwheel',
    },
    gallery: [{ src: '/img/products/globe-valves1.webp', alt: 'Forged globe valve alternate view' }],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 800 · 1500 · 2500' },
      { label: 'Design standard', value: 'API 602 · BS 5352' },
    ],
    specs: [
      { label: 'Sizes — screwed, socket & butt weld', value: '15 mm (½") to 50 mm (2") — Class 800 & 1500' },
      { label: '', value: '15 mm (½") to 25 mm (1") — Class 2500' },
      { label: 'Sizes — flanged (weld-on flanges)', value: '15 mm (½") to 50 mm (2") — Class 150, 300 & 600' },
      { label: 'Design standard', value: 'API 602, BS 5352' },
      { label: 'Face to face', value: 'ASME B16.10' },
      { label: 'Testing standard', value: 'API 598 / EN 12266-1' },
      { label: 'End connection', value: 'Flanged, Screwed, Socket weld ends' },
      {
        label: 'End detail',
        value: 'SE — BS 21 (parallel / taper) / ASME B1.20.1 (NPT) threads · SWE — ASME B16.11',
      },
      { label: 'Operation', value: 'Handwheel' },
    ],
    materials: [
      { label: 'Body & bonnet', value: 'A105, F11, F22, F5, F9, F304 & F316' },
      { label: 'Disc', value: 'CA15, CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316' },
      { label: 'Seat', value: '410, 304, 316' },
    ],
    standards: ['API 602', 'BS 5352', 'API 600', 'API 6D', 'MSS SP-81', 'ASME B16.10'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },

  /* ================= CHECK VALVES ================= */
  {
    slug: 'cast-check-valves',
    name: 'Cast Check Valves',
    shortName: 'Cast Check Valve',
    group: 'Check Valves',
    summary:
      'Flanged cast check valve to 600 mm in swing, lift and disc-check patterns, per BS 1868 / API 6D.',
    overview: [
      'Cast check valves prevent reverse flow without external actuation. KONIN supplies swing, lift and disc-check patterns to BS 1868 and API 6D in sizes up to 600 mm.',
      'Body and cover materials cover WCB, WC6, LCB, CF8, CF8M, CF3M and CN7M for general, low-temperature and corrosive service.',
    ],
    image: {
      src: '/img/products/cast-check-valves.webp',
      alt: 'KONIN cast steel swing check valve with flanged ends',
    },
    gallery: [
      {
        src: '/img/gallery/swing-check-valve-flanged-konin.webp',
        alt: 'KONIN cast swing check valve with flanged ends and bolted cover, body marked 24, 150, WCB and 600 MM',
      },
      {
        src: '/img/gallery/check-valve.webp',
        alt: 'KONIN cast swing check valve with flanged ends',
      },
      {
        src: '/img/gallery/non-return-valve.webp',
        alt: 'Pair of KONIN non-return check valve discs',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 600 mm (24")' },
      { label: 'Pressure rating', value: 'Class 150 · 300 · 600' },
      { label: 'Pattern', value: 'Swing · Lift · Disc check' },
    ],
    specs: [
      { label: 'Sizes', value: '15 mm (½") to 600 mm (24") — Class 150' },
      { label: '', value: '15 mm (½") to 600 mm (24") — Class 300' },
      { label: ' ', value: '50 mm (2") to 300 mm (12") — Class 600' },
      { label: 'Catalogue size band', value: '25 mm – 600 mm' },
      { label: 'Type', value: 'Swing · Lift type · Disc check' },
      { label: 'Design standard', value: 'BS 1868, API 6D, ASME B16.34' },
      { label: 'Face to face (flanged / butt weld end)', value: 'ASME B16.10, B16.25' },
      { label: 'Testing standard', value: 'EN 12266-1, API 598 / API 6D' },
      { label: 'End connection', value: 'Flanged, Butt weld end' },
    ],
    materials: [
      { label: 'Body & cover', value: 'WCB, WC6, LCB, CF8, CF8M, CF3M, CN7M' },
      { label: 'Disc', value: '410, 304, 316, 316L, CA15, CF8, CF8M, CN7M' },
      { label: 'Hinge pin', value: '410, 304, 316, AL20' },
      { label: 'Seat', value: '410, 304, 316, CF8, CF8M, CF3M, CN7M' },
    ],
    standards: ['BS 1868', 'API 6D', 'ASME B16.34', 'ASME B16.10', 'API 598'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'forged-check-valves',
    name: 'Forged Check Valves',
    shortName: 'Forged Check Valve',
    group: 'Check Valves',
    summary:
      'Forged steel check valve for small-bore high-pressure lines up to Class 2500, per API 602 / BS 5352.',
    overview: [
      'Forged check valves protect pumps, compressors and instrument tappings on high-pressure small-bore piping where a cast body would be over-sized for the duty.',
    ],
    image: {
      src: '/img/products/forged-check-valves.webp',
      alt: 'KONIN forged steel check valve with socket weld ends',
    },
    quickFacts: [
      { label: 'Size range', value: '15 mm (½") – 50 mm (2")' },
      { label: 'Pressure rating', value: 'Class 800 · 1500 · 2500' },
      { label: 'Design standard', value: 'API 602 · BS 5352' },
    ],
    specs: [
      { label: 'Sizes — screwed, socket & butt weld', value: '15 mm (½") to 50 mm (2") — Class 800 & 1500' },
      { label: '', value: '15 mm (½") to 25 mm (1") — Class 2500' },
      { label: 'Sizes — flanged (weld-on flanges)', value: '15 mm (½") to 50 mm (2") — Class 150, 300 & 600' },
      { label: 'Design standard', value: 'API 602, BS 5352' },
      { label: 'Face to face', value: 'ASME B16.10' },
      { label: 'Testing standard', value: 'API 598 / EN 12266-1' },
      { label: 'End connection', value: 'Flanged, Screwed, Socket weld ends' },
      {
        label: 'End detail',
        value: 'SE — BS 21 (parallel / taper) / ASME B1.20.1 (NPT) threads · SWE — ASME B16.11',
      },
    ],
    materials: [
      { label: 'Body & bonnet', value: 'A105, F11, F22, F5, F9, F304 & F316' },
      { label: 'Disc', value: 'CA15, CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316' },
      { label: 'Seat', value: '410, 304, 316' },
    ],
    standards: ['API 602', 'BS 5352', 'ASME B16.10', 'API 598'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
  {
    slug: 'wafer-check-valves',
    name: 'Wafer Check Valves',
    shortName: 'Wafer Check Valve',
    group: 'Check Valves',
    summary:
      'Compact wafer-pattern check valve from 25 mm to 600 mm, designed to API 6D / API 594.',
    overview: [
      'The wafer check valve clamps between two flanges, giving non-return protection in a fraction of the face-to-face length of a flanged swing check — valuable where pipe runs are tight.',
    ],
    image: {
      src: '/img/products/wafer-check-valve.webp',
      alt: 'KONIN wafer pattern check valve in stainless steel',
    },
    gallery: [
      {
        src: '/img/products/wafer-type-check-valve.webp',
        alt: 'Wafer type check valve showing disc and body',
      },
      {
        src: '/img/gallery/disc-check-valve-konin.webp',
        alt: 'KONIN disc check valve in three views: seat face, disc and guide, and body marked KV-1004',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '25 mm – 600 mm' },
      { label: 'Pressure rating', value: '#150 · #300' },
      { label: 'Design standard', value: 'API 6D · API 594' },
    ],
    specs: [
      { label: 'Size range', value: '25 mm – 600 mm' },
      { label: 'Pressure rating', value: '#150 | #300' },
      { label: 'Design / mfg. standard', value: 'API 6D | API 594' },
    ],
    materials: [{ label: 'Material of construction', value: 'CI | CS | SS304 | SS316' }],
    standards: ['API 6D', 'API 594'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue',
  },
  {
    slug: 'dual-plate-check-valves',
    name: 'Dual Plate Check Valves',
    shortName: 'Dual Plate Check Valve',
    group: 'Check Valves',
    summary:
      'Twin-plate wafer check valve from 50 mm to 700 mm — low weight, low pressure drop, fast closing.',
    overview: [
      'Dual plate check valves use two spring-loaded semicircular plates instead of a single swinging disc. They close faster, which reduces slam, and they are considerably lighter than an equivalent swing check.',
    ],
    image: {
      src: '/img/gallery/double-plate-check-valve.webp',
      alt: 'KONIN dual plate check valve showing twin spring-loaded plates',
    },
    quickFacts: [
      { label: 'Size range', value: '50 mm – 700 mm' },
      { label: 'Pressure rating', value: '#150 · #300' },
      { label: 'End connection', value: 'Wafer · Both side flange drilled' },
    ],
    specs: [
      { label: 'Size range', value: '50 mm – 700 mm' },
      { label: 'End connection', value: 'Wafer type | Both side flange drilled' },
      { label: 'Pressure rating', value: '#150 | #300' },
      { label: 'Design / mfg. standard', value: 'API 594 | API 6D' },
    ],
    materials: [{ label: 'Material of construction', value: 'CI | CS | SS304 | SS316' }],
    standards: ['API 594', 'API 6D'],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue',
  },

  /* ================= BUTTERFLY VALVES ================= */
  {
    slug: 'wafer-butterfly-valves',
    name: 'Wafer & Flanged Type Butterfly Valves',
    shortName: 'Wafer Butterfly Valve',
    group: 'Butterfly Valves',
    summary:
      'Resilient-seated butterfly valve to 800 mm with a blowout-proof one-piece shaft and integral actuator platform.',
    overview: [
      'The wafer butterfly valve is KONIN’s highest-volume product — a compact quarter-turn valve for isolation and coarse regulation across water, HVAC and process service.',
      'A one-piece blowout-proof shaft, positive shaft-to-disc drive and a contoured disc keep torque low and flow resistance down. The integral mounting platform takes lever, gear, pneumatic or electric actuation directly.',
    ],
    image: {
      src: '/img/products/wafer-butterfly-valve-lever-konin.webp',
      alt: 'KONIN wafer type butterfly valve with lever handle and resilient seat, disc marked DN 100 CF 8',
    },
    gallery: [
      {
        src: '/img/products/butterfly-valve.webp',
        alt: 'KONIN wafer type butterfly valve with lever handle and resilient seat',
      },
      {
        src: '/img/gallery/butterfly-valve-with-actuator.webp',
        alt: 'KONIN wafer butterfly valve fitted with a pneumatic actuator',
      },
      {
        src: '/img/gallery/butterfly.webp',
        alt: 'Batch of KONIN wafer butterfly valves ready for dispatch',
      },
      {
        src: '/img/gallery/sanitary-butterfly-valve-2.webp',
        alt: 'Stainless steel sanitary butterfly valve with lever operation',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '50 mm (2") – 800 mm (32")' },
      { label: 'Pressure rating', value: 'PN6 · PN10 · PN16' },
      { label: 'Design standard', value: 'EN 593 · API 609' },
    ],
    specs: [
      {
        label: 'Type',
        value: 'Wafer, double flanged (replaceable seat, bonded seat, PTFE seat, metal seat)',
      },
      { label: 'Sizes', value: '50 mm (2") to 800 mm (32")' },
      { label: 'Pressure rating', value: 'PN6, PN10, PN16' },
      { label: 'Catalogue size band', value: '40 mm – 800 mm' },
      { label: 'Design standard', value: 'EN 593, API 609' },
      { label: 'Face to face (flanged / butt weld end)', value: 'API 609, BS 5155' },
      { label: 'Testing standard', value: 'EN 12266-1, API 598 & ANSI FCI 70.2 Class IV' },
      { label: 'End connection', value: 'Wafer, Flanged' },
      {
        label: 'Operation',
        value:
          'Lever · Gear · Pneumatic actuator · MOR · Solenoid valve · Positioner · AFR · Electric actuator',
      },
    ],
    materials: [
      { label: 'Body', value: 'CI, DI, WCB, CF8, CF8M' },
      { label: 'Disc', value: 'CI, DI, WCB, CA15, CF8, CF8M' },
      { label: 'Stem', value: '410, 304, 316, Duplex' },
      {
        label: 'Seat',
        value: 'EPDM, Nitrile, Neoprene, Butyl, Viton, Silicon, PTFE, RPTFE, 316, Inconel',
      },
    ],
    features: [
      'Enhanced reliability, longer service life',
      'Tight sealing, consistent low torque',
      'Assured shaft sealing',
      'One-piece blowout-proof shaft',
      'Reliable drive — positive shaft-disc connection',
      'Lower resistance to flow — contoured disc',
      'Ease of installation',
      'Integral actuator mounting platform',
    ],
    standards: ['API 609', 'EN 593', 'BS 5155', 'AWWA C504', 'IS 13095', 'EN 12266-1'],
    applications: [
      ...APPLICATIONS_PROCESS,
      'Food & Beverage Industries',
      'Textile Industries',
      'Pharmaceutical Industries',
      'HVAC Systems',
      'Dairy Industry',
    ],
    source: 'catalogue+website',
  },
  {
    slug: 'double-flanged-butterfly-valves',
    name: 'Double Flanged Butterfly Valves',
    shortName: 'Double Flanged Butterfly',
    group: 'Butterfly Valves',
    summary:
      'Large-bore double flanged butterfly valve from 100 mm to 1800 mm, including metal-to-metal seating.',
    overview: [
      'For large-diameter water transmission, intake and treatment-plant duty, the double flanged body carries the pipeline load directly rather than relying on clamping between flanges.',
      'KONIN offers this valve up to 1800 mm with resilient or metal-to-metal seating and the full actuation range.',
    ],
    image: {
      src: '/img/products/double-flanged-butterfly-valve-gear-konin.webp',
      alt: 'KONIN double flanged butterfly valve with gear operator, handwheel and lifting eyes',
    },
    gallery: [
      {
        src: '/img/gallery/butterfly-valve.webp',
        alt: 'Large double flanged butterfly valve fitted with an electric actuator',
      },
      {
        src: '/img/products/triple-butterfly-valve-2.webp',
        alt: 'Double flanged butterfly valve with gear operator and handwheel',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '100 mm – 1800 mm' },
      { label: 'Pressure rating', value: '#150 · PN10 – PN25' },
      { label: 'Design standard', value: 'API 609 · BS 5155' },
    ],
    specs: [
      { label: 'Size range', value: '100 mm – 1800 mm' },
      { label: 'Pressure rating', value: '#150 | PN10 | PN16 | PN20 | PN25' },
      {
        label: 'Operation',
        value:
          'Lever | Gear | Pneumatic actuator | MOR | Solenoid valve | Positioner | AFR | Electric actuator',
      },
      {
        label: 'Design / mfg. standard',
        value: 'API 609 | BS 5155 | BS EN 593 | AWWA C504 | IS 13095',
      },
    ],
    materials: [
      { label: 'Material of construction', value: 'CI | DI | CS | SS304 | SS316' },
      { label: 'Seat & seals', value: 'EPDM | Nitrile | Silicon | Metal to metal' },
    ],
    standards: ['API 609', 'BS 5155', 'BS EN 593', 'AWWA C504', 'IS 13095'],
    applications: [
      'Water Treatment Plants',
      'Water Distribution & Utilities',
      'Hydro Power Industries',
      'Pump Houses',
    ],
    source: 'catalogue',
  },
  {
    slug: 'double-offset-butterfly-valves',
    name: 'Fabricated Steel Double Offset Butterfly Valves',
    shortName: 'Double Offset Butterfly',
    group: 'Butterfly Valves',
    summary:
      'Fabricated steel double-offset butterfly valve from 150 mm to 1500 mm with self-energising bi-directional disc seal.',
    overview: [
      'Double offset (high-performance) geometry lifts the seal clear of the seat during the first few degrees of travel, which cuts seat wear and operating torque compared with a concentric design.',
      'KONIN fabricates the body in carbon steel IS 2062, A 516 Gr.70, SS 304 and SS 316 with nitrile, EPDM, Viton or metal seats.',
    ],
    image: {
      src: '/img/gallery/double-offset-butterfly.webp',
      alt: 'KONIN fabricated steel double offset butterfly valve',
    },
    gallery: [
      {
        src: '/img/products/double-offset-butterfly-valves1.webp',
        alt: 'Double offset butterfly valve body',
      },
      {
        src: '/img/products/double-offset-butterfly-valves2.webp',
        alt: 'Double offset butterfly valve disc detail',
      },
      {
        src: '/img/products/double-offset-butterfly-valves3.webp',
        alt: 'Double offset butterfly valve with gear operator',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '150 mm (6") – 1500 mm (60")' },
      { label: 'Pressure rating', value: 'PN6 · PN10 · PN16' },
      { label: 'Design standard', value: 'BS 5155' },
    ],
    specs: [
      { label: 'Size', value: '150 mm (6") to 1500 mm (60")' },
      { label: 'Pressure rating', value: 'PN6, PN10, PN16' },
      { label: 'Design standard', value: 'BS 5155' },
      { label: 'Testing standard', value: 'API 598' },
    ],
    materials: [
      { label: 'Body', value: 'Carbon steel IS 2062, A 516 Gr.70, SS 304, SS 316' },
      { label: 'Seat', value: 'Nitrile rubber, EPDM, Viton, Metal' },
    ],
    features: [
      'Self-energising disc seal — bi-directional bubble-tight sealing',
      'Assured sealing to atmosphere',
      'Lighter and stronger construction',
      'Lower torque, longer life',
      'Maintenance-free bearings',
    ],
    standards: ['BS 5155', 'API 598'],
    applications: [
      'Water Treatment Plants',
      'Hydro Power Industries',
      'Thermal Power Plants',
      'Steel Industries',
    ],
    source: 'website',
  },

  /* ================= KNIFE GATE ================= */
  {
    slug: 'knife-edge-gate-valves',
    name: 'Knife Edge Gate Valves',
    shortName: 'Knife Gate Valve',
    group: 'Knife Gate Valves',
    summary:
      'Wafer and lugged knife gate valve to 800 mm with a hardened cutting edge for slurries, pulp and sediment-laden media.',
    overview: [
      'A sharp, heavy-duty knife edge at the bottom of the gate shears through solid sediment as the valve closes, giving reliable shut-off on media that would jam a conventional gate valve.',
      'KONIN offers uni-directional and bi-directional designs with replaceable seats and a choice of gate surface treatments — hardfacing, nitriding or chrome plating — selected against the abrasive duty.',
    ],
    image: {
      src: '/img/products/knife-gate-valve-lugged-konin.webp',
      alt: 'KONIN lugged knife edge gate valve with red handwheel, gate closed across the bore',
    },
    gallery: [
      {
        src: '/img/products/knife-edge-valve.webp',
        alt: 'KONIN knife edge gate valve with handwheel and wafer body',
      },
      {
        src: '/img/products/knife-edge-gate-valve.webp',
        alt: 'Knife edge gate valve with pneumatic cylinder actuator',
      },
      { src: '/img/gallery/pulp-valve.webp', alt: 'Pulp valve for paper industry service' },
    ],
    quickFacts: [
      { label: 'Size range', value: '50 mm (2") – 800 mm (32")' },
      { label: 'Pressure rating', value: 'Class 150 · PN 10' },
      { label: 'Design standard', value: 'MSS SP-81' },
    ],
    specs: [
      { label: 'Sizes', value: '50 mm (2") to 800 mm (32")' },
      { label: 'ASME class', value: 'Class 150 and PN 10' },
      { label: 'Catalogue pressure rating', value: '#150 | #300' },
      { label: 'Design standard', value: 'MSS SP-81' },
      { label: 'Type', value: 'Uni-directional / Bi-directional' },
      { label: 'Ends', value: 'Wafer, Lugged — lugged to ANSI B16.5 #150' },
      {
        label: 'Operation',
        value: 'Handwheel, chain wheel, gear, lever, pneumatic or electric actuator',
      },
      {
        label: 'Specials',
        value: 'Extended stem, closed bonnet, deflector cone, soft seated, purge connection',
      },
      { label: 'Testing', value: 'As per MSS SP-81' },
    ],
    materials: [{ label: 'Material', value: 'CI, DI, WCB, CF8, CF8M, CG3M, CF3M' }],
    features: [
      'Sharp heavy-duty knife edge at the bottom of the gate cuts through solid sediments and ensures reliable shut-off',
      'Gate offered with surface coatings based on customer demand — hardfacing, nitriding, chrome plating',
      'Replaceable seats — easy maintenance at site, longer service life',
      'Low operating torque — facilitates use of smaller-size actuators, lower initial investment',
    ],
    standards: ['MSS SP-81', 'ANSI B16.5'],
    applications: [
      'Wastewater Treatment Systems',
      'Pulp & Paper Industries',
      'Mining Industries',
      'Mineral Processing Industries',
      'Sugar Industries',
      'Chemical Processing Industries',
      'Steel Industries',
    ],
    source: 'catalogue+website',
  },

  /* ================= CONTROL / AUTOMATIC ================= */
  {
    slug: 'pressure-reducing-valves',
    name: 'Pressure Reducing Valves (Automatic PRV)',
    shortName: 'Pressure Reducing Valve',
    group: 'Automatic Control Valves',
    summary:
      'Pilot-operated PRV that holds a constant downstream pressure independently of flow rate, in ductile iron with stainless trim.',
    overview: [
      'The "KONIN MAKE" pilot operated pressure reducing valve is designed for applications where the reduction of high inlet pressures to a safe and stable outlet pressure is required.',
      'The pilot assembly reacts to changes in downstream pressure, allowing the main valve to modulate between the closed and open position, ensuring a constant downstream set pressure. Once the downstream pressure reaches the pilot setting, the main valve seals shut, preventing damage downstream. Pressure regulation is not dependent upon flow rate, resulting in minimal pressure loss through the valve.',
    ],
    image: {
      src: '/img/products/pressure-reducing-valve-konin.webp',
      alt: 'KONIN pilot operated automatic pressure reducing valve, DN200 PN16 ductile iron GGG50 body',
    },
    quickFacts: [
      { label: 'Type', value: 'Pilot operated, modulating' },
      { label: 'Body', value: 'Ductile iron A536 / GGG50' },
      { label: 'Control', value: 'IP68 solenoid, SCADA compatible' },
    ],
    materials: [
      { label: 'Body', value: 'Ductile iron — A536 / GGG50' },
      { label: 'Stem', value: 'ASTM A276 type SS304' },
      { label: 'Seal ring', value: 'NBR' },
      { label: 'Spring', value: 'Stainless steel' },
      { label: 'Diaphragm', value: 'Stainless steel / mild steel' },
      { label: 'Double end bolt', value: 'Stainless steel / mild steel' },
      { label: 'Control filter', value: 'Stainless steel' },
      { label: 'Flow control pilot', value: 'Stainless steel' },
      { label: 'Ball valve', value: 'Stainless steel' },
      { label: 'Pressure reducing pilot', value: 'Stainless steel' },
      {
        label: 'IP68 solenoid with manual override (SCADA compatible)',
        value: 'Stainless steel',
      },
      { label: 'High pressure control tube', value: 'Stainless steel' },
    ],
    applications: [
      'Water Distribution & Utilities',
      'Water Treatment Plants',
      'Fire Fighting',
      'Pump Houses',
    ],
    source: 'website',
  },
  {
    slug: 'on-off-pressure-reducing-valves',
    name: 'On / Off Type Pressure Reducing Valves (Automatic PRV)',
    shortName: 'On / Off Type PRV',
    group: 'Automatic Control Valves',
    summary:
      'On/off pilot-controlled pressure reducing valve in ductile iron with SCADA-compatible IP68 solenoid control.',
    overview: [
      'The on/off variant of the KONIN automatic PRV operates the main valve between fully open and fully closed under pilot and solenoid control rather than modulating, for duties where staged isolation is preferred to continuous regulation.',
    ],
    image: {
      src: '/img/products/on-off-pressure-reducing-valve-konin.webp',
      alt: 'KONIN on/off type automatic pressure reducing valve, DN200 PN16, with solenoid and pilot assembly',
    },
    quickFacts: [
      { label: 'Type', value: 'Pilot operated, on / off' },
      { label: 'Body', value: 'Ductile iron A536 / GGG50' },
      { label: 'Control', value: 'IP68 solenoid, SCADA compatible' },
    ],
    materials: [
      { label: 'Body', value: 'Ductile iron — A536 / GGG50' },
      { label: 'Stem', value: 'ASTM A276 type SS304' },
      { label: 'Seal ring', value: 'NBR' },
      { label: 'Spring', value: 'Stainless steel' },
      { label: 'Diaphragm', value: 'Stainless steel / mild steel' },
      { label: 'Control filter', value: 'Stainless steel' },
      { label: 'Flow control pilot', value: 'Stainless steel' },
      { label: 'Pressure reducing pilot', value: 'Stainless steel' },
      {
        label: 'IP68 solenoid with manual override (SCADA compatible)',
        value: 'Stainless steel',
      },
      { label: 'High pressure control tube', value: 'Stainless steel' },
    ],
    applications: ['Water Distribution & Utilities', 'Water Treatment Plants', 'Pump Houses'],
    source: 'website',
  },
  {
    slug: 'pressure-relief-sustaining-valves',
    name: 'Automatic Pressure Relief / Pressure Sustaining Valves (PSV)',
    shortName: 'Pressure Relief / PSV',
    group: 'Automatic Control Valves',
    summary:
      'Pilot-operated relief and sustaining valve that protects upstream pressure and relieves surge, in ductile iron with stainless trim.',
    overview: [
      'The pressure relief / pressure sustaining valve holds a set minimum pressure upstream, opening to relieve excess pressure so that upstream demand is protected during surge or high-demand conditions.',
    ],
    image: {
      src: '/img/products/pressure-relief-sustaining-valve-konin.webp',
      alt: 'KONIN automatic pressure relief and pressure sustaining valve, DN200 PN16, with pilot assembly',
    },
    quickFacts: [
      { label: 'Type', value: 'Pilot operated relief / sustaining' },
      { label: 'Body', value: 'Ductile iron A536 / GGG50' },
      { label: 'Control', value: 'IP68 solenoid, SCADA compatible' },
    ],
    materials: [
      { label: 'Body', value: 'Ductile iron — A536 / GGG50' },
      { label: 'Stem', value: 'ASTM A276 type SS304' },
      { label: 'Seal ring', value: 'NBR' },
      { label: 'Spring', value: 'Stainless steel' },
      { label: 'Diaphragm', value: 'Stainless steel / mild steel' },
      { label: 'Control filter', value: 'Stainless steel' },
      { label: 'Flow control pilot', value: 'Stainless steel' },
      {
        label: 'IP68 solenoid with manual override (SCADA compatible)',
        value: 'Stainless steel',
      },
      { label: 'High pressure control tube', value: 'Stainless steel' },
    ],
    applications: ['Water Distribution & Utilities', 'Pump Houses', 'Fire Fighting'],
    source: 'website',
  },

  /* ================= INSTRUMENT / SPECIALITY ================= */
  {
    slug: 'high-pressure-needle-valves',
    name: 'High Pressure Needle Valves',
    shortName: 'Needle Valve',
    group: 'Instrument & Speciality Valves',
    summary:
      'Precision needle valve for instrument and hydraulic service, rated to 14000 PSI in CS, SS, titanium and special alloys.',
    overview: [
      'Needle valves give fine, repeatable throttling on small-bore instrument, sampling and hydraulic lines. The tapered stem meters flow precisely at low rates and seals positively when closed.',
      'KONIN supplies them in carbon steel, stainless steel, titanium and special alloys, with both male and female BSPT / NPT / BSP end connections.',
    ],
    image: {
      src: '/img/products/needle-valve-konin.webp',
      alt: 'KONIN SS 304 needle valve with ½" NPT female ends, 3000 PSI marking and T-bar handle',
    },
    gallery: [
      {
        src: '/img/products/high-pressure-needle-valves.webp',
        alt: 'KONIN high pressure needle valve with T-bar handle',
      },
      {
        src: '/img/products/high-pressure-needle-valves1.webp',
        alt: 'High pressure needle valve body detail',
      },
      {
        src: '/img/gallery/high-pressure-needle-valve.webp',
        alt: 'High pressure needle valve assembly',
      },
      {
        src: '/img/gallery/needle-valves-batch-konin.webp',
        alt: 'Rows of KONIN needle valves with T-bar handles, each body carrying a KONIN label',
      },
    ],
    quickFacts: [
      { label: 'Size range', value: '15 mm – 50 mm' },
      { label: 'Pressure rating', value: 'Up to 14000 PSI' },
      { label: 'Materials', value: 'CS · SS · Titanium · Special alloy' },
    ],
    specs: [
      { label: 'Size', value: '15 mm to 50 mm' },
      { label: 'Catalogue size band', value: '6 mm – 50 mm (high pressure ball | needle valve)' },
      { label: 'Rating', value: '800, 900, 1500, 2500' },
      { label: 'Catalogue pressure rating', value: '3000 PSI | 6000 PSI | 10000 PSI | 14000 PSI' },
      { label: 'Design', value: 'Manufacturer standard' },
      { label: 'Testing', value: 'BS 6755 Part 1' },
      { label: 'End connections', value: 'SWE / SE — both male & female BSPT / NPT / BSP' },
    ],
    materials: [
      { label: 'Material of construction', value: 'CS / SS / Titanium / Special alloy' },
      { label: 'Catalogue MOC', value: 'SS304 | SS316' },
    ],
    standards: ['BS 6755 Part 1'],
    applications: [
      'Oil & Gas Industries',
      'Refineries',
      'Chemical Processing Industries',
      'Power Generation',
    ],
    source: 'catalogue+website',
  },
  {
    slug: 'air-valves',
    name: 'Air Valves',
    shortName: 'Air Valve',
    group: 'Instrument & Speciality Valves',
    summary:
      'Single and double acting air release valve from 25 mm to 600 mm in CI, CS and gun metal.',
    overview: [
      'Air valves release accumulated air from the high points of a pipeline and admit air on draindown, protecting the line from air-lock, surge and vacuum collapse — standard fittings on water transmission mains.',
    ],
    image: {
      src: '/img/products/air-valve-flanged-konin.webp',
      alt: 'KONIN twin-chamber air valve with flanged base and nameplate, body marked 80, CI and PN10',
    },
    quickFacts: [
      { label: 'Size range', value: '25 mm – 600 mm' },
      { label: 'Pressure rating', value: '#150 · #300' },
      { label: 'Type', value: 'Single acting · Double acting' },
    ],
    specs: [
      { label: 'Size range', value: '25 mm – 600 mm' },
      { label: 'End connection', value: 'Screwed | Flanged' },
      { label: 'Type', value: 'Single acting | Double acting' },
      { label: 'Pressure rating', value: '#150 | #300' },
    ],
    materials: [{ label: 'Material of construction', value: 'CI | CS | GM' }],
    applications: [
      'Water Distribution & Utilities',
      'Water Treatment Plants',
      'Pump Houses',
      'Pipelines',
    ],
    source: 'catalogue',
  },
  {
    slug: 'strainers',
    name: 'Strainers',
    shortName: 'Strainer',
    group: 'Instrument & Speciality Valves',
    summary:
      'Y, T, pot and basket type pipeline strainers from 15 mm to 600 mm in CI, CS and stainless steel.',
    overview: [
      'Pipeline strainers protect pumps, meters and control valves by capturing scale, weld slag and debris before it reaches downstream equipment. KONIN supplies Y, T, pot and basket patterns with screwed or flanged ends.',
    ],
    image: {
      src: '/img/products/strainer.webp',
      alt: 'KONIN Y type and flanged pipeline strainers in stainless steel',
    },
    quickFacts: [
      { label: 'Size range', value: '15 mm – 600 mm' },
      { label: 'Pressure rating', value: '#150 · #300' },
      { label: 'Type', value: 'Y · T · Pot · Basket' },
    ],
    specs: [
      { label: 'Size range', value: '15 mm – 600 mm' },
      { label: 'End connection', value: 'Screwed | Flanged' },
      { label: 'Type', value: 'Y type | T type | Pot type | Basket type' },
      { label: 'Pressure rating', value: '#150 | #300' },
    ],
    materials: [{ label: 'Material of construction', value: 'CI | CS | SS' }],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue',
  },

  /* ================= VALVE AUTOMATION ================= */
  {
    slug: 'actuated-valves',
    name: 'Industrial Actuated Valves & Valve Actuators',
    shortName: 'Actuated Valves',
    group: 'Valve Automation',
    summary:
      'Complete valve automation in pneumatic and electrical actuators, with positioners, solenoids, limit switches and AFR sets.',
    overview: [
      'KONIN provides complete flow control solutions under one roof, including valve automation. Valves are supplied fully assembled and function-tested with pneumatic or electrical actuators.',
      'The actuation range covers lever and gear operation through to pneumatic actuators with solenoid valves, positioners, MOR and air filter regulator sets, and electric actuators for remote and SCADA-linked control.',
    ],
    image: {
      src: '/img/products/automated-butterfly-valve-2.webp',
      alt: 'KONIN butterfly valve fitted with a pneumatic rack and pinion actuator',
    },
    gallery: [
      {
        src: '/img/gallery/pneumatic-actuated-butterfly-valve-konin.webp',
        alt: 'KONIN wafer butterfly valve fitted with a KONIN pneumatic rotary actuator and limit switch box',
      },
      {
        src: '/img/gallery/pneumatic-actuated-ball-valve-konin.webp',
        alt: 'KONIN flanged ball valve fitted with a pneumatic actuator and limit switch box',
      },
      {
        src: '/img/gallery/motorised-ball-valve.webp',
        alt: 'Motorised ball valve with electric actuator',
      },
      {
        src: '/img/products/controlled-ball-valve.webp',
        alt: 'Controlled ball valve with pneumatic actuator and positioner',
      },
      {
        src: '/img/gallery/triple-butterfly-valve.webp',
        alt: 'Triple offset butterfly valve with actuator',
      },
      {
        src: '/img/gallery/automated-butterfly-valve.webp',
        alt: 'Automated butterfly valve assembly',
      },
    ],
    quickFacts: [
      { label: 'Actuation', value: 'Pneumatic · Electric' },
      { label: 'Accessories', value: 'Positioner · Solenoid · MOR · AFR' },
      { label: 'Control', value: 'On / off · Modulating' },
    ],
    features: [
      'Complete valve automation in pneumatic as well as electrical actuators',
      'Pneumatic actuator with solenoid valve, positioner, MOR and AFR options',
      'Electric actuators for remote and SCADA-linked operation',
      'Gear and lever operation for manual duty',
      'Valves supplied assembled and function tested',
    ],
    applications: APPLICATIONS_PROCESS,
    source: 'catalogue+website',
  },
]

export const valveGroups = [
  'Ball Valves',
  'Gate Valves',
  'Globe Valves',
  'Check Valves',
  'Butterfly Valves',
  'Knife Gate Valves',
  'Automatic Control Valves',
  'Instrument & Speciality Valves',
  'Valve Automation',
] as const
