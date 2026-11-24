/**
 * Company facts.
 *
 * EVERY value in this file is taken verbatim from either the legacy KONIN
 * website or one of the supplied source documents. Nothing is inferred.
 * Sources are noted per block so future edits stay honest.
 *
 * "About KONIN Valves.docx" is the most recent of those sources. Where it
 * restates something the legacy site also said, its wording wins.
 */

// Source: "About KONIN Valves.docx", opening paragraph
const INTRO =
  'KONIN Valves is a manufacturer of industrial valves and integrated automation solutions, delivering reliable flow-control and process solutions for a wide range of industrial applications.'

// Source: "About KONIN Valves.docx", Quality & Testing
const TESTING_CAPABILITIES = [
  'Spectrochemical Analysis',
  'Positive Material Identification (PMI)',
  'Grain Flow Examination for Forged Components',
  'Ultrasonic Testing (UT)',
  'Magnetic Particle Inspection (MPI)',
  'Dye Penetrant Testing (DPT)',
  'Radiographic Testing (RT)',
  'Hardness & Tensile Testing',
  'Impact Testing at Room and Low Temperatures',
  'Ball Roundness Inspection using CMM',
  'Surface Roughness (Ra) Measurement',
  'Salt Spray Testing',
  'Coating Thickness Measurement',
  'Rubber/Elastomer Composition, Tensile Strength and Shore A Hardness Testing',
] as const

// Source: "About KONIN Valves.docx", Third-Party Inspection & Specialized Testing
const INSPECTION_AGENCIES = ['CEIL', 'BVQL', 'TÜV', 'Germanischer Lloyd', 'RITES'] as const

export const company = {
  name: 'KONIN Valves',
  legalName: 'KONIN Valves',
  brand: 'KONIN',
  // Source: konin-valves-pdf.pdf, cover
  tagline: 'Where perfection and precision need…',
  url: 'https://www.koninvalve.com',
  logo: '/img/brand/logo.webp',

  // Source: "About KONIN Valves.docx", opening paragraph. Also the footer copy,
  // the homepage "About KONIN" block and the Organization schema description.
  positioning: INTRO,

  // Source: "About KONIN Valves.docx", About KONIN Valves
  about: [
    INTRO,
    'Our product portfolio includes Ball Valves, Butterfly Valves, Gate Valves, Globe Valves, Check Valves, Needle Valves and other specialized valve solutions. Our valves are available in Full Bore (FB) and Reduced Bore (RB) designs, with different pressure ratings, materials and configurations to suit diverse operating requirements.',
    'KONIN valves are manufactured in accordance with applicable API, BIS, BS, DIN, ISO and EN standards, with a strong focus on quality, dimensional accuracy, material integrity and dependable performance.',
  ],

  /** The standards and bore designs named in `about`, lifted out as chips. */
  standards: ['API', 'BIS', 'BS', 'DIN', 'ISO', 'EN'],
  boreDesigns: ['Full Bore (FB)', 'Reduced Bore (RB)'],

  // Source: "About KONIN Valves.docx", Product Features & Configurations
  productFeatures: {
    intro: 'KONIN offers a wide range of valve designs and configurations, including:',
    items: [
      'Fire-Safe Valves as per applicable API 607 / API 6D requirements',
      'Single-Piece, Two-Piece and Three-Piece Ball Valves',
      'Two-Way and Three-Way Configurations',
      'Full Bore and Reduced Bore Designs',
      'PTFE, RPTFE (CFT), PEEK and Metal-Seated Options',
      'Extended Stem Valves',
      'Jacketed Bonnet / Jacketed Valve Configurations',
      'Different pressure classes, materials and end connections',
    ],
  },

  // Source: "About KONIN Valves.docx", Quality & Testing
  quality: {
    intro:
      'At KONIN, quality is an integral part of our manufacturing process. In addition to 100% dimensional inspection and pressure testing, our products undergo comprehensive material and performance testing as required.',
    capabilitiesIntro: 'Our inspection and testing capabilities include:',
    capabilities: TESTING_CAPABILITIES,
    lowTemperature:
      'For low-temperature applications, impact testing can be carried out down to −101°C, as required.',
  },

  // Source: "About KONIN Valves.docx", Our Commitment
  commitment: [
    'At KONIN, we combine precision valve manufacturing, rigorous quality control and industrial automation expertise to provide dependable solutions for demanding applications.',
    'Whether it is a standalone industrial valve, an automated valve assembly, a PLC control panel, or a complete PLC-SCADA-based process automation solution, our objective is to deliver reliable, application-focused engineering solutions.',
  ],
  /** The four scopes of supply named in the second `commitment` paragraph. */
  supplyScopes: [
    'Standalone industrial valve',
    'Automated valve assembly',
    'PLC control panel',
    'Complete PLC-SCADA process automation',
  ],

  // Source: konin-valves-pdf.pdf p4 + legacy about page
  vision:
    'KONIN VALVES to be recognized all over the world as the first choice for critical and difficult valve challenges.',
  mission:
    'To provide the best products and service in the valves industry to our customers worldwide.',

  // Source: legacy about-konin-valves.html "Our Value"
  values: [
    'Customer commitment',
    'Quality',
    'Team-work',
    'Respect for people',
    'Integrity & personal accountability',
  ],

  // Source: "About KONIN Valves.docx", Third-Party Inspection & Specialized Testing
  thirdPartyApproval:
    'KONIN products can be supplied with third-party inspection and certification based on customer and project requirements. Inspection can be coordinated with recognized agencies such as CEIL, BVQL, TÜV, Germanischer Lloyd and RITES.',
  inspectionAgencies: INSPECTION_AGENCIES,
  flowTesting:
    'Specialized testing can also be arranged through suitable accredited facilities. Coefficient of Flow (Cv Value) testing can be carried out through FCRI, Palakkad, while Fire Safe and Cryogenic Testing can be arranged as required.',
  specializedTests: ['Cv Value testing at FCRI, Palakkad', 'Fire Safe Testing', 'Cryogenic Testing'],

  // Source: konin-valves-pdf.pdf p4 (address block) + legacy contact page
  address: {
    line1: 'B-102, Angol Industrial Estate',
    line2: 'Udyambag',
    city: 'Belagavi',
    region: 'Karnataka',
    postalCode: '590008',
    country: 'India',
    countryCode: 'IN',
    full: 'B-102, Angol Industrial Estate, Udyambag, Belagavi, Karnataka 590008, India',
  },

  phones: ['+91 94803 14844', '+91 70195 22742'],
  emails: ['sales@koninvalve.com', 'koninvalves@gmail.com', 'sales.koninvalves@gmail.com'],
  linkedin: 'https://in.linkedin.com/company/konin-valves',

  /**
   * Countries KONIN supplies, shown as the flag marquee on the homepage.
   * `code` is the ISO 3166-1 alpha-2 code; it picks the flag. Add or remove a
   * country here and the marquee follows.
   */
  supplyCountries: [
    { code: 'IN', name: 'India', region: 'Manufacturing base' },
    { code: 'AE', name: 'United Arab Emirates', region: 'Gulf' },
    { code: 'SA', name: 'Saudi Arabia', region: 'Gulf' },
    { code: 'QA', name: 'Qatar', region: 'Gulf' },
    { code: 'OM', name: 'Oman', region: 'Gulf' },
    { code: 'KW', name: 'Kuwait', region: 'Gulf' },
    { code: 'BH', name: 'Bahrain', region: 'Gulf' },
    { code: 'US', name: 'United States', region: 'North America' },
    { code: 'ZA', name: 'South Africa', region: 'Africa' },
  ],

  // Source: legacy certificates.html + konin-valves-pdf.pdf p4 badges
  certifications: [
    {
      name: 'ISO 9001:2015',
      issuer: 'TÜV India',
      note: 'Quality management system certification.',
      image: '/img/company/cert-iso.webp',
      file: '/docs/ISO.pdf',
    },
    {
      name: 'IEC Certificate',
      issuer: '—',
      note: 'Certificate published by KONIN Valves.',
      image: '/img/company/cert-iec.webp',
      file: '/docs/IEC-certificate.pdf',
    },
    {
      name: 'Udyam Registration',
      issuer: 'Ministry of MSME, Government of India',
      note: 'Micro, Small & Medium Enterprises registration.',
      image: '/img/company/cert-udyam.webp',
      file: '/docs/udyam-registration-certificate.pdf',
    },
  ],

  // Source: legacy index.html "Why Choose Konin Valves"
  whyKonin: [
    'Prompt technical support by understanding our customer’s need.',
    'Complete flow control solution under one roof with valve automation.',
    'We’ll always provide you with a realistic and achievable delivery time.',
    'Competitive price for the best quality products.',
    'Complete valve automation in pneumatic as well as electrical actuators.',
  ],

  // Figures from legacy index.html "Key Highlights", worded to match
  // "About KONIN Valves.docx". The legacy "12+ tests per product" is replaced by
  // the count of published capabilities: the DOCX says tests run "as required",
  // not on every product.
  highlights: [
    {
      value: '100%',
      label: 'Dimensional & pressure tested',
      detail: '100% dimensional inspection and pressure testing, with material and performance testing as required.',
    },
    {
      value: String(TESTING_CAPABILITIES.length),
      label: 'Inspection & testing capabilities',
      detail:
        'From spectrochemical analysis and PMI to radiography, CMM ball roundness and salt spray testing.',
    },
    {
      value: '−101°C',
      label: 'Low-temperature impact testing',
      detail: 'Impact testing at room and low temperatures, down to −101°C for low-temperature applications.',
    },
    {
      value: String(INSPECTION_AGENCIES.length),
      label: 'Third-party inspection agencies',
      detail: 'Inspection can be coordinated with CEIL, BVQL, TÜV, Germanischer Lloyd and RITES.',
    },
  ],

  // Source: legacy locations-we-serve.html (state list) — India-wide supply
  marketsNote:
    'KONIN supplies across India, with customers in Maharashtra, Karnataka, Gujarat, Tamil Nadu, Telangana, Andhra Pradesh, West Bengal, Punjab, Haryana, Delhi and beyond.',
  primaryStates: [
    'Karnataka',
    'Maharashtra',
    'Gujarat',
    'Tamil Nadu',
    'Telangana',
    'Andhra Pradesh',
    'West Bengal',
    'Punjab',
    'Haryana',
    'Delhi NCR',
    'Kerala',
    'Rajasthan',
    'Madhya Pradesh',
    'Odisha',
    'Jharkhand',
    'Assam',
  ],
} as const

/** Source: KONIN VALVES AND AUTOMATION SOLUTIONS.pdf, pages 2, 3, 8 and 9. */
export const automationDivision = {
  intro:
    'KONIN is a rapidly expanding organization in the automation field. We specialize in delivering a range of electrical control panels, electrical maintenance and services for all kinds of industries. We have a dedicated engineering team to develop and sustain the quality standards to fulfil our client’s requirements.',
  positioning:
    'We at KONIN Automation Solutions are emerging as India’s pioneer manufacturers, suppliers and service providers of a comprehensive range of electrical control panels. We use standard quality material and environment friendly processing techniques.',
  vision:
    'To be the best engineering techno firm to develop well designed and quality products to meet stringent quality standards as per customer requirement.',
  values: [
    'Preserve and prevail a positive environment for our employees to innovate, create and push their limits to grow along with the organization.',
    'Transparency, dignity and respect while connecting with customers.',
    'Self-honesty and accountability in delivering good quality products and services.',
  ],
  mission: [
    'Enabling safe and reliable solutions.',
    'To achieve success through the commitment, actively engage, empower and continuously develop our workforce.',
  ],
  strengths: [
    '8+ engineers from various disciplines & technicians.',
    'Rich experience in design & technical services, project management, customer service and a complete range of software tools.',
    'After sales support.',
    'Installations acting as a knowledge base for critical processes in all domains of industry.',
    'Hands-on experience in handling unique, complex automation products.',
  ],
  panelBuilderNote:
    'As a brand-independent panel builder, our engineers and technicians apply their considerable flexibility, knowledge and skills every single day.',

  // Source: "About KONIN Valves.docx", Automation & Control Solutions. The
  // closing sentence's em dash is set as a comma; the wording is otherwise as
  // supplied.
  control: {
    intro: [
      'Along with our valve manufacturing capabilities, KONIN provides complete automation and control solutions for industrial processes.',
      'We design and manufacture electrical control panels and automation systems integrated with PLC controllers and SCADA systems, enabling efficient monitoring, control and automation of industrial processes.',
    ],
    capabilitiesIntro: 'Our automation solutions can include:',
    capabilities: [
      'PLC-based process control systems',
      'SCADA-based monitoring and supervisory control',
      'Electrical & PLC control panel manufacturing',
      'Valve automation and actuator control',
      'Automatic process sequencing and interlocking',
      'Real-time process monitoring',
      'Alarm and event management',
      'Data acquisition and system visualization',
      'Remote monitoring and operational control',
      'Integration of valves, instruments, sensors and field devices',
    ],
    integration:
      'This combination of industrial valves, automation panels, PLC control and SCADA-based monitoring enables KONIN to provide integrated solutions, from individual valve supply to complete automated process-control systems.',
  },
  // Source: automation PDF p6
  plcBrands: ['Allen Bradley', 'Siemens', 'Delta', 'Mitsubishi', 'Selec'],
  busSystems: [
    'PROFINET',
    'PROFIBUS',
    'Industrial Ethernet',
    'DeviceNet',
    'ControlNet',
    'Ethernet/IP',
    'Serial interfaces',
  ],
  // Source: automation PDF p2
  industries: [
    'Chemical',
    'Textile',
    'Petrochemical',
    'Pharmaceuticals',
    'Heavy Metal',
    'Food Processing',
    'Water Treatment',
    'Pump Houses',
    'Sewage Plants',
    'Shopping Malls',
    'Refineries',
    'Oil Mills',
    'Iron and Steel Plants',
  ],
} as const
