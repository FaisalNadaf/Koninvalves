import type { Product } from './types'

/**
 * AUTOMATION SOLUTIONS
 *
 * Source: "KONIN VALVES AND AUTOMATION SOLUTIONS.pdf".
 *
 * The source document lists the eleven panel types by name with a photograph of
 * each, but publishes no ratings, enclosure classes or dimensions. Nothing of
 * that kind is invented here.
 *
 * Each entry therefore carries:
 *   · `summary` / `overview` — a neutral engineering definition of what that
 *     class of panel does. This is general electrical-engineering fact, not a
 *     claim about a specific KONIN build, and is presented on the page under
 *     the heading "What it is".
 *   · KONIN-specific statements — taken verbatim from the source document.
 *
 * Ratings, enclosure IP class, busbar current and schematics are shown as
 * "available on request" so real figures can drop straight in later.
 */

const PANEL_APPLICATIONS = [
  'Chemical',
  'Textile',
  'Petrochemical',
  'Pharmaceuticals',
  'Heavy Metal',
  'Food Processing',
  'Water Treatment',
  'Pump Houses',
  'Sewage Plants',
  'Refineries',
  'Oil Mills',
  'Iron and Steel Plants',
]

export const automationProducts: Product[] = [
  {
    slug: 'power-control-center',
    name: 'Power Control Center (PCC)',
    shortName: 'Power Control Center',
    group: 'Electrical Control Panels',
    summary:
      'Main incoming power distribution assembly that receives supply from the transformer and feeds downstream boards.',
    overview: [
      'A Power Control Center is the primary switchgear assembly in an installation. It takes the incoming supply from the transformer or generator, provides main protection and metering, and distributes power onward to motor control centers and sub-distribution boards.',
    ],
    image: {
      src: '/img/automation/power-control-center-switchgear.webp',
      alt: 'Draw-out circuit breakers in a low-voltage power control centre switchboard',
    },
    catalogueImage: {
      src: '/img/automation/power-control-center.webp',
      alt: 'KONIN power control center panel with metering and indication',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Power distribution' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'motor-control-center',
    name: 'Motor Control Center (MCC)',
    shortName: 'Motor Control Center',
    group: 'Electrical Control Panels',
    summary:
      'Grouped motor starter assembly bringing starting, protection and control for multiple motors into one enclosure.',
    overview: [
      'A Motor Control Center groups the starters, overload protection, isolation and control circuitry for several motors into a single compartmentalised assembly, so that motor feeders can be maintained and extended without disturbing the rest of the installation.',
    ],
    image: {
      src: '/img/automation/motor-control-center-modules.webp',
      alt: 'Rows of motor starter and protection modules in an open motor control centre',
    },
    catalogueImage: {
      src: '/img/automation/motor-control-center.webp',
      alt: 'KONIN motor control center panel with multiple starter modules',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Motor control' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'auto-main-failure-panel',
    name: 'Auto Main Failure Panel (AMF)',
    shortName: 'AMF Panel',
    group: 'Electrical Control Panels',
    summary:
      'Automatic changeover panel that starts the standby generator and transfers load when the mains supply fails.',
    overview: [
      'An Auto Main Failure panel monitors the incoming mains supply and, on detecting a failure, automatically signals the standby generator to start and transfers the load across. When mains supply is restored it returns the load and shuts the set down.',
    ],
    image: {
      src: '/img/automation/amf-panel-air-circuit-breakers.webp',
      alt: 'Air circuit breakers mounted in the doors of an AMF changeover panel',
    },
    catalogueImage: {
      src: '/img/automation/auto-main-failure-panel.webp',
      alt: 'KONIN auto main failure changeover panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Automatic changeover' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'sub-distribution-panel',
    name: 'Sub Distribution Panel (SDB)',
    shortName: 'Sub Distribution Panel',
    group: 'Electrical Control Panels',
    summary:
      'Secondary distribution board that subdivides supply from the main panel into local protected circuits.',
    overview: [
      'A sub distribution board takes a feeder from the main panel and splits it into a number of smaller protected outgoing circuits local to an area or process, keeping cable runs short and isolating faults to a single zone.',
    ],
    image: {
      src: '/img/automation/sub-distribution-panelboard.webp',
      alt: 'Sub distribution panelboard with branch circuit breakers and labelled outgoing wiring',
    },
    catalogueImage: {
      src: '/img/automation/sub-distribution-panel.webp',
      alt: 'KONIN sub distribution panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Secondary distribution' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'lighting-distribution-board',
    name: 'Lighting Distribution Board (LDB)',
    shortName: 'Lighting Distribution Board',
    group: 'Electrical Control Panels',
    summary:
      'Dedicated distribution board for lighting circuits with individual circuit protection and switching.',
    overview: [
      'A lighting distribution board separates lighting loads from power loads, providing individually protected and switched circuits for internal, external and emergency lighting.',
    ],
    image: {
      src: '/img/automation/lighting-distribution-mcb.webp',
      alt: 'Miniature circuit breakers wired in a lighting distribution board',
    },
    catalogueImage: {
      src: '/img/automation/lighting-distribution-board.webp',
      alt: 'KONIN lighting distribution board',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Lighting distribution' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'automatic-power-factor-control',
    name: 'Automatic Power Factor Control Panel (APFC)',
    shortName: 'APFC Panel',
    group: 'Electrical Control Panels',
    summary:
      'Capacitor bank panel that switches stages automatically to hold power factor at the target value.',
    overview: [
      'An Automatic Power Factor Control panel measures the reactive load and switches capacitor stages in and out to hold the power factor close to unity, reducing reactive demand charges and freeing transformer and cable capacity.',
    ],
    image: {
      src: '/img/automation/apfc-capacitor-panel.webp',
      alt: 'Open APFC panel with main switch, fuses, capacitor contactors and a row of power capacitors',
    },
    catalogueImage: {
      src: '/img/automation/automatic-power-factor-control.webp',
      alt: 'KONIN automatic power factor control panel with capacitor stages',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Reactive power compensation' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'variable-frequency-drive-panel',
    name: 'Variable Frequency Drive Panel (VFD)',
    shortName: 'VFD Panel',
    group: 'Electrical Control Panels',
    summary:
      'Drive panel that varies motor speed by controlling supply frequency, for pumps, fans and process drives.',
    overview: [
      'A Variable Frequency Drive panel controls motor speed by varying the frequency and voltage of the supply. On centrifugal pump and fan duties this gives smooth starting, precise process control and a substantial reduction in energy consumption at part load.',
    ],
    image: {
      src: '/img/automation/vfd-panel-drive-modules.webp',
      alt: 'Row of variable frequency drive modules installed in a drive panel',
    },
    catalogueImage: {
      src: '/img/automation/variable-frequency-drive.webp',
      alt: 'KONIN variable frequency drive panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Variable speed drive' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'plc-panel',
    name: 'Programmable Logic Controller Panel (PLC)',
    shortName: 'PLC Panel',
    group: 'Electrical Control Panels',
    summary:
      'PLC-based control panel for sequencing, interlocking and process automation, programmed in-house by KONIN.',
    overview: [
      'A PLC panel houses the programmable controller, its I/O and the field interface for a process. It executes the sequencing, interlocking and closed-loop control that the plant requires, and links to SCADA or HMI for operation and monitoring.',
      'KONIN programs PLCs for all established brands of process control and supervisory systems and can manage plant automation needs along the full plant lifecycle, from design and engineering to commissioning and maintenance to future upgrades and expansions.',
    ],
    image: {
      src: '/img/automation/plc-control-cabinet.webp',
      alt: 'PLC control cabinet with CPU, I/O modules, power supplies and terminal blocks',
    },
    catalogueImage: {
      src: '/img/automation/programmable-logic-controller.webp',
      alt: 'KONIN programmable logic controller panel with I/O modules',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Process control' },
      { label: 'Brands programmed', value: 'Allen Bradley · Siemens · Delta · Mitsubishi · Selec' },
      {
        label: 'Bus systems',
        value: 'PROFINET · PROFIBUS · Industrial Ethernet · DeviceNet · ControlNet · Ethernet/IP',
      },
    ],
    features: [
      'PLC programming for all established brands of process control and supervisory systems',
      'Established brands: Allen Bradley, Siemens, Delta, Mitsubishi and Selec',
      'Standard bus systems: PROFINET, PROFIBUS, Industrial Ethernet, DeviceNet, ControlNet, Ethernet/IP and serial interfaces',
      'Full plant lifecycle support: design, engineering, commissioning, maintenance, upgrades and expansions',
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'oem-panel',
    name: 'OEM Panel',
    shortName: 'OEM Panel',
    group: 'Electrical Control Panels',
    summary:
      'Control panels built to an equipment manufacturer’s own specification for integration into their machine.',
    overview: [
      'OEM panels are built to the equipment manufacturer’s drawings and specification for fitting into their own machine or skid, so that the finished product ships as a complete assembly.',
    ],
    image: {
      src: '/img/automation/oem-panel-contactor-testing.webp',
      alt: 'Technician testing contactors inside a machine control panel',
    },
    catalogueImage: {
      src: '/img/automation/oem-panel.webp',
      alt: 'KONIN OEM control panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Build to customer specification' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'fcma-soft-starter-panel',
    name: 'FCMA Soft Starter Panel',
    shortName: 'FCMA Soft Starter',
    group: 'Electrical Control Panels',
    summary:
      'Flux compensated magnetic amplifier soft starter panel for smooth, stepless starting of large motors.',
    overview: [
      'An FCMA (flux compensated magnetic amplifier) soft starter ramps a motor up smoothly and steplessly, limiting starting current and mechanical shock. It is commonly specified for large pump and compressor motors where a direct-on-line start would be unacceptable to the supply or the driven equipment.',
    ],
    image: {
      src: '/img/automation/soft-starter-panel-motor-starters.webp',
      alt: 'Rows of motor starters and contactors wired inside a starter panel',
    },
    catalogueImage: {
      src: '/img/automation/fcma-soft-starter-panel.webp',
      alt: 'KONIN FCMA soft starter panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Soft starting' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
  {
    slug: 'autotransformer-starter-panel',
    name: 'Autotransformer Starter Panel',
    shortName: 'Autotransformer Starter',
    group: 'Electrical Control Panels',
    summary:
      'Reduced-voltage starter panel using an autotransformer to limit inrush current on large motor starts.',
    overview: [
      'An autotransformer starter applies a reduced voltage to the motor through tappings on an autotransformer during starting, then transfers to full voltage once the motor is up to speed, limiting inrush current while retaining more starting torque than a star-delta arrangement.',
    ],
    image: {
      src: '/img/automation/starter-panel-contactors-overloads.webp',
      alt: 'Starter panel with power contactors, thermal overload relays and control relays K1 to K3',
    },
    catalogueImage: {
      src: '/img/automation/autotransformer-starter-panel.webp',
      alt: 'KONIN autotransformer starter panel',
    },
    quickFacts: [
      { label: 'Panel type', value: 'Reduced voltage starting' },
      { label: 'Build', value: 'Brand-independent panel builder' },
    ],
    applications: PANEL_APPLICATIONS,
    source: 'catalogue',
  },
]

/** Services — source: automation PDF pages 6 and 7. */
export const automationServices = [
  {
    slug: 'plc-programming',
    title: 'PLC Programming',
    image: {
      src: '/img/automation/automation-capability.webp',
      alt: 'PLC control system architecture diagram',
    },
    body: [
      'Do you want to optimise your production operation with automation systems? You can, if you tap into our experience and expertise. We program PLCs for all established brands of process control and supervisory systems and can manage your plant automation needs along the full plant lifecycle, from design and engineering to commissioning and maintenance to future upgrades and expansions.',
      'We employ established brands such as Allen Bradley, Siemens, Delta, Mitsubishi and Selec, as well as all standard bus systems and components such as PROFINET, PROFIBUS, Industrial Ethernet, DeviceNet, ControlNet, Ethernet/IP and serial interfaces.',
      'Our PLC programmers are exceedingly motivated and highly qualified. Being dyed-in-the-wool PLC professionals, we have extensive experience in all areas where PLC programming is needed.',
    ],
  },
  {
    slug: 'panel-service-amc',
    title: 'Panel Repair, Maintenance & AMC',
    image: {
      src: '/img/automation/panel-service-maintenance.webp',
      alt: 'KONIN engineers servicing an electrical control panel',
    },
    body: [
      'KONIN Automation Solutions specialises in electrical control panel repair, maintenance, service and AMC services for the commercial, residential and industrial sectors.',
      'KONIN has a division with immensely qualified engineers, supervisors and technicians. With due diligence we carry out planning, design, analysis, fabrication, integration, implementation, operations and maintenance of electrical solutions that fully meet the stipulated standards of various industries.',
      'KONIN Automation Solutions also provides Annual Maintenance Contract services as and when continuous support is needed. We also provide AMCs with spares or without spares.',
    ],
  },
] as const
