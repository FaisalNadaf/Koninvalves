import type { Product } from './types'

/**
 * WATER TREATMENT SOLUTIONS
 *
 * Source: "Solution_Guide_Water KONIN.pdf" — a solution guide for the water
 * industry covering eleven application areas.
 *
 * The `overview` text below is transcribed from that document (lightly
 * copy-edited for typos only). Where the source names the control technology
 * platform it is used for — Phoenix Contact — that attribution is preserved
 * rather than dropped, so the site does not imply KONIN manufactures it.
 *
 * The source publishes no equipment model numbers, capacities or ratings, so
 * none appear here.
 */

export const waterSolutions: Product[] = [
  {
    slug: 'dam-automation',
    name: 'DAM Automation',
    shortName: 'Dam Automation',
    group: 'Source & Conveyance',
    summary:
      'Local gate controllers with redundant communication under a redundant central master, remotely monitored and controlled.',
    overview: [
      'Dam automation requires local controllers for individual gates with redundant communication and a high-end central controller, preferably in a redundant configuration. Along with this requirement, the system also needs to be monitored and controlled remotely.',
      'The Class 100 controllers form the local controllers for the gate and control the gate’s VFD based on upstream and downstream water levels, under the supervision and control of the Class 300 master controller in either redundant or singular configuration. Remote communication can be achieved via a cellular network or VSAT communication.',
    ],
    image: {
      src: '/img/water/dam-spillway-gates.webp',
      alt: 'Row of radial gates on a dam releasing water downstream',
    },
    gallery: [
      {
        src: '/img/water/dam-automation-2.webp',
        alt: 'Dam automation control architecture diagram',
      },
    ],
    quickFacts: [
      { label: 'Local control', value: 'Class 100 gate controllers' },
      { label: 'Master control', value: 'Class 300, redundant or singular' },
      { label: 'Remote link', value: 'Cellular network · VSAT' },
    ],
    features: [
      'Local controllers for individual gates',
      'Redundant communication network',
      'Gate VFD control from upstream and downstream water levels',
      'Remote monitoring and control',
    ],
    source: 'catalogue',
  },
  {
    slug: 'canal-management',
    name: 'CANAL Management',
    shortName: 'Canal Management',
    group: 'Source & Conveyance',
    summary:
      'Solar-powered canal gate controllers with real-time-clock scheduling and SMS command and alarm reporting.',
    overview: [
      'Canal management is an important functionality for irrigation. The individual canal gates can be powered with an autonomous solar based power supply system.',
      'Scheduling can be done using the real time clock of the canal gate controller. Commands from the central centre can be communicated reliably via SMS, and the central centre can also send scheduling information via SMS to each canal controller.',
      'As the system operation time is normally very small (only during gate operation), the system can be optimally designed with a solar power supply. The system is also capable of sending an alarm in the event of a system fault condition or unauthorised access.',
    ],
    image: {
      src: '/img/water/canal-control-gate.webp',
      alt: 'Water flowing through a canal control gate',
    },
    gallery: [
      { src: '/img/water/canal-management-2.webp', alt: 'Canal management system schematic' },
    ],
    quickFacts: [
      { label: 'Power', value: 'Autonomous solar supply' },
      { label: 'Scheduling', value: 'Controller real-time clock' },
      { label: 'Communication', value: 'SMS command & alarm' },
    ],
    features: [
      'Autonomous solar based power supply per gate',
      'Real-time-clock scheduling at the controller',
      'SMS scheduling and command from the central centre',
      'Fault and unauthorised-access alarms',
    ],
    source: 'catalogue',
  },
  {
    slug: 'pump-house-automation',
    name: 'Pump House Automation',
    shortName: 'Pump House Automation',
    group: 'Distribution & Networks',
    summary:
      'Round-the-clock pump house control with remote management, motor condition monitoring and power supply supervision.',
    overview: [
      'The water supply system and the waste water collection network are the backbone of any city. The pump houses distributed all over the area are required to have high availability round the clock.',
      'The automation of pump houses is carried out via Class 100 controllers and can be monitored remotely via the ODP server or the 104 protocol. The system can be scheduled, or it can be remotely managed along with the monitoring.',
      'The system is capable of handling not only the pump house operations but also the condition monitoring of the motors and the power supply system. The vital information on pump house availability also provides the flexibility of taking counter measures at the need of the hour.',
    ],
    image: {
      src: '/img/water/pump-house-pumps-pipework.webp',
      alt: 'Pump room with motor-driven pumps, valves and stainless pipework',
    },
    gallery: [
      {
        src: '/img/water/pump-house-automation-2.webp',
        alt: 'Pump house automation network architecture',
      },
    ],
    quickFacts: [
      { label: 'Control', value: 'Class 100 controllers' },
      { label: 'Remote monitoring', value: 'ODP server · IEC 60870-5-104' },
      { label: 'Monitoring', value: 'Motor & power supply condition' },
    ],
    features: [
      'Remote monitoring via ODP server or 104 protocol',
      'Scheduled or remotely managed operation',
      'Motor condition monitoring',
      'Power supply system monitoring',
      'Pump house availability reporting',
    ],
    source: 'catalogue',
  },
  {
    slug: 'water-treatment-plant-automation',
    name: 'Water Treatment Plant (WTP) Automation',
    shortName: 'WTP Automation',
    group: 'Treatment Plants',
    summary:
      'Distributed control for drinking water treatment with integrated water quality monitoring and HART / PROFIBUS DP / IO-Link instrument integration.',
    overview: [
      'Making pure drinking water available for people is the key task and objective of the whole water management process. Water treatment plants are optimally operated with high performance controllers and distributed control technology. This allows the user to ensure that the quality of water at the distribution point is as desired.',
      'This vital infrastructure is critical for the health of the population. The control system also monitors water quality, and in the event of any part failure it provides the information to the respective maintenance personnel while limiting the outflow of the process to restrict the flow of untreated water into the mainstream.',
      'Easy integration of process instruments over HART, PROFIBUS DP or IO-Link ensures faster installation and commissioning.',
    ],
    image: {
      src: '/img/water/water-treatment-clarifiers-filters.webp',
      alt: 'Aerial view of a water treatment plant with clarifiers and filter beds',
    },
    gallery: [
      {
        src: '/img/water/water-treatment-plant-automation-2.webp',
        alt: 'Water treatment plant control architecture',
      },
    ],
    quickFacts: [
      { label: 'Architecture', value: 'Distributed control technology' },
      { label: 'Instrument bus', value: 'HART · PROFIBUS DP · IO-Link' },
      { label: 'Monitoring', value: 'Continuous water quality' },
    ],
    features: [
      'High performance controllers with distributed control technology',
      'Continuous water quality monitoring at the distribution point',
      'Fault notification to maintenance personnel',
      'Outflow limiting to restrict untreated water reaching the mainstream',
      'Instrument integration over HART, PROFIBUS DP or IO-Link',
    ],
    source: 'catalogue',
  },
  {
    slug: 'effluent-treatment-plant-automation',
    name: 'Effluent Treatment Plant (ETP) Automation',
    shortName: 'ETP Automation',
    group: 'Treatment Plants',
    summary:
      'Industrial effluent control integrated with plant SCADA, reporting effluent quantity and quality online for pollution control board compliance.',
    overview: [
      'Industrial waste water has its own characteristics and follows a different process of treatment. The control system is required to be interfaced with the plant SCADA and it also needs to provide information on the quality of effluent generation along with the treated water / waste. These are mandatory requirements from the pollution control boards.',
      'Phoenix Contact control technology helps the user to have a seamlessly integrated automation system. Along with wireless and remote communication technology and IT capability in the system, the user is able to monitor and control the system and also gets online data on effluent quantity and quality.',
    ],
    image: {
      src: '/img/water/effluent-treatment-basin.webp',
      alt: 'Treatment basin with a travelling sludge collector bridge',
    },
    gallery: [
      {
        src: '/img/water/effluent-treatment-plant-automation-2.webp',
        alt: 'Effluent treatment plant control system diagram',
      },
    ],
    quickFacts: [
      { label: 'Integration', value: 'Plant SCADA interface' },
      { label: 'Reporting', value: 'Online effluent quantity & quality' },
      { label: 'Control platform', value: 'Phoenix Contact control technology' },
    ],
    features: [
      'Interfaced with plant SCADA',
      'Effluent quality and quantity reporting for pollution control board compliance',
      'Wireless and remote communication technology',
      'Online data on effluent quantity and quality',
    ],
    source: 'catalogue',
  },
  {
    slug: 'sewage-treatment-plant-automation',
    name: 'Sewage Treatment Plant (STP) Automation',
    shortName: 'STP Automation',
    group: 'Treatment Plants',
    summary:
      'Redundant control and PROFINET network for sewage treatment, with intrinsically safe I/O for digester systems.',
    overview: [
      'Sewage treatment is an important process in water management. This process not only helps in effectively keeping the living environment safe but also accounts for a major share of the water requirements in any economy.',
      'The solution from Phoenix Contact provides a redundant control system and communication network with PROFINET technology. All process instruments and devices are connected seamlessly using PROFIBUS DP, HART and Modbus to the control unit. The system is also designed for a distributed control philosophy with local controllers taking care of individual processes.',
      'The widespread plant is networked with a combination of wired and wireless network. Phoenix Contact offers specialised solutions for digester systems in the form of an intrinsically safe I/O system. The remote communication uses internet technology with industrial grade security for safe operation of the system.',
    ],
    image: {
      src: '/img/water/sewage-treatment-plant-aerial.webp',
      alt: 'Aerial view of a sewage treatment plant with four circular clarifiers',
    },
    gallery: [
      {
        src: '/img/water/sewage-treatment-plant-automation-2.webp',
        alt: 'Sewage treatment plant network topology',
      },
    ],
    quickFacts: [
      { label: 'Control system', value: 'Redundant' },
      { label: 'Network', value: 'PROFINET · PROFIBUS DP · HART · Modbus' },
      { label: 'Hazardous area', value: 'Intrinsically safe I/O for digesters' },
    ],
    features: [
      'Redundant control system and communication network with PROFINET',
      'Instrument connection over PROFIBUS DP, HART and Modbus',
      'Distributed control philosophy with local process controllers',
      'Combined wired and wireless plant network',
      'Intrinsically safe I/O system for digester systems',
      'Remote communication with industrial grade security',
    ],
    source: 'catalogue',
  },
  {
    slug: 'desalination-plant-automation',
    name: 'Desalination Plant Automation',
    shortName: 'Desalination Automation',
    group: 'Treatment Plants',
    summary:
      'Complete process automation for desalination, using products tested for marine and saline service.',
    overview: [
      'With only 1% of total water availability being fresh water, it is attractive to use the unlimited resource of sea water to meet the demand of the rising population across the globe. The desalination process provides fresh water from sea water and hence is key to future water technology.',
      'Due to the saline nature of the installations and the water itself, it is desirable to use highly reliable products for these applications for longer system availability. Phoenix Contact offers systems and products well tested in these conditions (marine applications) and is a trusted partner to this industry.',
      'Whether using solar based technology or the conventional desalination process, the complete process automation solution is offered with the standard product portfolio and technology. Water quality check, process control, and the storage and transportation applications are centrally controlled and monitored as required.',
    ],
    image: {
      src: '/img/water/desalination-process-skid.webp',
      alt: 'Stainless steel process pipework and pump on a treatment skid',
    },
    gallery: [
      {
        src: '/img/water/desalination-plant-automation-2.webp',
        alt: 'Desalination process control schematic',
      },
    ],
    quickFacts: [
      { label: 'Environment', value: 'Marine / saline tested products' },
      { label: 'Scope', value: 'Quality check · process control · storage' },
      { label: 'Process', value: 'Solar based or conventional' },
    ],
    features: [
      'Products tested for marine and saline conditions',
      'Complete process automation solution',
      'Water quality check and process control',
      'Central control and monitoring of storage and transportation',
    ],
    source: 'catalogue',
  },
  {
    slug: 'water-distribution-collection-system',
    name: 'Water Distribution & Collection System (WDCS) Automation',
    shortName: 'Distribution & Collection',
    group: 'Distribution & Networks',
    summary:
      'Bi-directional remote communication over IEC 60870-5-104, ODP and SQL linking remote pumps and instruments to central SCADA.',
    overview: [
      'The water distribution and collection system is distinguished by its high dependency on remote communication systems.',
      'Phoenix Contact offers reliable bi-directional communication solutions based on the proven technology of IEC 60870-5-104, ODP and SQL. The remote pumps and instruments are connected to the central station and SCADA system using these protocols and take care of the critical demands of supply management.',
      'The system is also flexible enough to monitor and record area-wise distribution and collection of water and waste water respectively. Water quality check can also be made an integrated function. Flexibility to use a mix of communication media like 2G, 3G, ISDN or PSTN enables designers to optimise the system as required.',
    ],
    image: {
      src: '/img/water/water-distribution-valves-mains.webp',
      alt: 'Water mains with gate valves and a control valve in a distribution chamber',
    },
    quickFacts: [
      { label: 'Protocols', value: 'IEC 60870-5-104 · ODP · SQL' },
      { label: 'Media', value: '2G · 3G · ISDN · PSTN' },
      { label: 'Function', value: 'Area-wise distribution & collection recording' },
    ],
    features: [
      'Reliable bi-directional communication to central SCADA',
      'Area-wise distribution and collection monitoring and recording',
      'Integrated water quality check',
      'Mixed communication media for system optimisation',
    ],
    source: 'catalogue',
  },
  {
    slug: 'pipeline-condition-monitoring',
    name: 'Pipe Line Condition Monitoring (PLCM) System',
    shortName: 'Pipeline Monitoring',
    group: 'Monitoring Systems',
    summary:
      'GPRS/GSM controllers with ultrasonic leakage sensors that report pipeline losses and breakage alarms to the control room.',
    overview: [
      'Leakages in water carrying pipes are the major cause of losses in any water distribution network. With limited resources, it is very expensive to lose water with no use of it.',
      'Phoenix Contact offers cost effective solutions for this, with GPRS / GSM based controllers recording water leakage in a pipeline using ultrasonic leakage sensors. Information regarding the leakage can be sent to the central control room via GPRS or SMS technology.',
      'The system can also send alarm messages in case of a sudden increase in leakage due to pipeline breakage, to the concerned authorities. The system can be networked via GSM/GPRS or wireless radio network technology.',
    ],
    image: {
      src: '/img/water/pipeline-through-forest.webp',
      alt: 'Three large water transmission pipelines running through a forest',
    },
    gallery: [
      {
        src: '/img/water/pipeline-condition-monitoring-2.webp',
        alt: 'Pipeline condition monitoring network diagram',
      },
    ],
    quickFacts: [
      { label: 'Sensing', value: 'Ultrasonic leakage sensors' },
      { label: 'Controller', value: 'GPRS / GSM based' },
      { label: 'Alerting', value: 'GPRS · SMS breakage alarms' },
    ],
    features: [
      'Ultrasonic leakage sensing along the pipeline',
      'Leakage data to the central control room via GPRS or SMS',
      'Alarm on sudden leakage increase from pipeline breakage',
      'GSM/GPRS or wireless radio networking',
    ],
    source: 'catalogue',
  },
  {
    slug: 'water-source-condition-monitoring',
    name: 'Water Source Condition Monitoring (WSCM) System',
    shortName: 'Source Monitoring',
    group: 'Monitoring Systems',
    summary:
      'PLC-based monitoring of turbidity, conductivity, pH and oxygen at source and effluent points, with central ODP recording.',
    overview: [
      'A water condition monitoring system is typically required at the water source and also at effluent / sewage generation localities, to decide the level of treatment required.',
      'The system consists of a PLC system for data collection with an integrated GPRS modem and the required I/O or interface to integrate the various sensors such as turbidity, conductivity, pH, oxygen and other parameters.',
      'The system can also take decisions based on the above or on billing information, to actuate the aeration process or to close or open the inflow or outflow valves as required in the respective cases. The data is recorded centrally over an ODP server for further analysis and online visualisation.',
    ],
    image: {
      src: '/img/water/water-source-intake-tower.webp',
      alt: 'Water intake tower and access bridge on a reservoir',
    },
    gallery: [
      {
        src: '/img/water/water-source-condition-monitoring-2.webp',
        alt: 'Water source monitoring system schematic',
      },
    ],
    quickFacts: [
      { label: 'Parameters', value: 'Turbidity · conductivity · pH · oxygen' },
      { label: 'Controller', value: 'PLC with integrated GPRS modem' },
      { label: 'Recording', value: 'Central ODP server' },
    ],
    features: [
      'Multi-parameter water quality sensing',
      'PLC data collection with integrated GPRS modem',
      'Automatic actuation of aeration or inflow / outflow valves',
      'Central ODP recording with online visualisation',
    ],
    source: 'catalogue',
  },
  {
    slug: 'autonomous-power-supply-system',
    name: 'Autonomous Power Supply (APS) System',
    shortName: 'Autonomous Power Supply',
    group: 'Monitoring Systems',
    summary:
      'Solar power system with VRLA battery banks and health reporting, for instruments, valves and actuators off the grid.',
    overview: [
      'Solar based autonomous power supply systems are required to operate various instruments, valves and actuators in remote areas where power availability is not possible from the grid.',
      'The system consists of the required solar panels, charging system and battery banks. Long life maintenance free VRLA batteries are used, along with battery and solar power monitoring to provide the health status of the station to the central server and local authorities via SMS.',
    ],
    image: {
      src: '/img/water/autonomous-solar-power-station.webp',
      alt: 'Remote station powered by solar panels with a communication mast',
    },
    gallery: [
      {
        src: '/img/water/autonomous-power-supply-system-2.webp',
        alt: 'Autonomous power supply battery and solar arrangement',
      },
    ],
    quickFacts: [
      { label: 'Source', value: 'Solar panels + charging system' },
      { label: 'Storage', value: 'Maintenance free VRLA batteries' },
      { label: 'Reporting', value: 'Station health via SMS' },
    ],
    features: [
      'Solar panels, charging system and battery banks',
      'Long life maintenance free VRLA batteries',
      'Battery and solar power monitoring',
      'Station health status to central server and local authorities via SMS',
    ],
    source: 'catalogue',
  },
]

export const waterGroups = [
  'Source & Conveyance',
  'Treatment Plants',
  'Distribution & Networks',
  'Monitoring Systems',
] as const
