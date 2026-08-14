/**
 * Company facts.
 *
 * EVERY value in this file is taken verbatim from either the legacy KONIN
 * website or one of the three supplied source documents. Nothing is inferred.
 * Sources are noted per block so future edits stay honest.
 */

export const company = {
  name: 'KONIN Valves',
  legalName: 'KONIN Valves',
  brand: 'KONIN',
  // Source: konin-valves-pdf.pdf, cover
  tagline: 'Where perfection and precision need…',
  url: 'https://www.koninvalve.com',
  logo: '/img/brand/logo.webp',

  // Source: konin-valves-pdf.pdf p4 "About Us" + legacy about page
  positioning:
    'KONIN Valves (An ISO 9001-2015 Co.) is a leading Manufacturer and Supplier of Industrial Valves. We focus to provide complete flow control solution under one roof with valve automation.',

  // Source: legacy about-konin-valves.html
  about: [
    'Konin Valves manufacture a wide range of valves like Ball, Butterfly, Gate, Globe, Check and Needle valves. These valves are available in FB and RB design with different pressure ratings. Valves at KONIN are manufactured as per applicable API / BIS / BS / DIN / ISO / EN series standards.',
    'Apart from 100% dimension & pressure test our product undergoes different tests like spectro analysis, PMI, grain flow examination for forged parts, ultrasonic, MPI, DP and radiography to ensure composition and material soundness.',
    'Impact at room temperature and minus 101°C is checked for low temperature valves. Hardness and tensile is checked to ensure physical properties. Ball roundness on CMM and RA-value for stem and seating mating parts are checked. Salt spray test is conducted on PTFE phosphate / zinc coated and painted parts to ensure resistance to rust under severe marine conditions.',
    'Coating thickness is measured with a digital thickness measuring gauge to ensure uniformity and minimum coating / painting thickness. Rubber composition, tensile and shore "A" hardness are checked for seals.',
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

  // Source: legacy about page — third party approval paragraph
  thirdPartyApproval:
    'We offer our products with third party inspection agencies like CEIL, BVQL, TUV, Germanischer Lloyd and RITES.',
  flowTesting:
    'Critical tests like co-efficient of flow (Cv value) are checked at FCRI, Palghat. "Fire safe" and cryogenic tests can be conducted as and when required with our side laboratory.',
  salientFeatures:
    'Valves are with fire safe design as per API 607 and API 6D — single piece, 2 piece, 2 way and 3 way — with different types of seat material such as PTFE, RPTFE (CFT), PEEK and metal seated. Valves with extended stem / jacketed bonnet are also available.',

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

  phones: ['+91 94803 14844', '+91 70198 33232', '+91 70195 22742'],
  emails: ['sales@koninvalve.com', 'koninvalves@gmail.com', 'sales.koninvalves@gmail.com'],
  linkedin: 'https://in.linkedin.com/company/konin-valves',

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

  // Source: legacy index.html "Key Highlights"
  highlights: [
    {
      value: '100%',
      label: 'Dimensional & pressure tested',
      detail: 'Every valve undergoes 100% dimension and pressure testing before dispatch.',
    },
    {
      value: '12+',
      label: 'Quality tests per product',
      detail:
        'Including spectro analysis, PMI, grain flow examination, ultrasonic, MPI, DP and radiography.',
    },
    {
      value: '−101°C',
      label: 'Low-temperature impact tested',
      detail: 'Impact tested at room temperature and at −101°C for low temperature valves.',
    },
    {
      value: '5',
      label: 'Third-party inspection bodies',
      detail: 'Approved by CEIL, TUV, BVQL, RITES and Germanischer Lloyd.',
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
