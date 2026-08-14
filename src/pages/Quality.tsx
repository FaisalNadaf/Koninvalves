import {
  ArrowUpRight,
  FileText,
  Gauge,
  Layers,
  Microscope,
  Ruler,
  ShieldCheck,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'
import { Seo, breadcrumbSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import {
  Img,
  SectionHeading,
  GridBackdrop,
  Glow,
  SectionSeam,
  cutoutFor,
} from '../components/ui'
import { TiltCard, Layer } from '../components/ui/TiltCard'
import { Counter } from '../components/fx'
import { Reveal, rowDirection, Stagger, StaggerItem } from '../lib/motion'
import { company } from '../data/company'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Quality', path: '/quality' },
]

type Regime = {
  icon: LucideIcon
  title: string
  body: string
  /**
   * The named checks inside the paragraph above, lifted out so a buyer scanning
   * the page for one of them — PMI, radiography, shore "A" — finds it without
   * reading. Every chip is a term taken from the same published sentence; none
   * is an addition to what KONIN states.
   */
  methods: string[]
  image: string
  imageAlt: string
}

/**
 * Source: legacy about-konin-valves.html — the published testing regime.
 *
 * Each card carries a photograph of a KONIN product of the type the check
 * applies to: a forged body against the grain-flow examination, a ball valve
 * against the CMM roundness check, coated bodies against the salt spray test.
 * The photographs are of the range, not of a test in progress.
 */
const REGIME: Regime[] = [
  {
    icon: Ruler,
    title: 'Dimensional & pressure testing',
    body: '100% of production undergoes dimension and pressure testing.',
    methods: ['Dimension', 'Pressure', '100% of production'],
    image: '/img/gallery/8-gtv-4.webp',
    imageAlt: 'A stacked batch of KONIN flanged gate valves awaiting dispatch',
  },
  {
    icon: Microscope,
    title: 'Composition & soundness',
    body: 'Spectro analysis, PMI, grain flow examination for forged parts, ultrasonic, MPI, DP and radiography.',
    methods: ['Spectro', 'PMI', 'Grain flow', 'Ultrasonic', 'Radiography'],
    image: '/img/gallery/forged-gate-valve.webp',
    imageAlt: 'A KONIN forged steel gate valve, its body stamped A105N',
  },
  {
    icon: Gauge,
    title: 'Physical properties',
    body: 'Hardness and tensile testing. Ball roundness measured on CMM; RA-value checked on stem and seating mating parts.',
    methods: ['Hardness', 'Tensile', 'CMM roundness', 'RA-value'],
    image: '/img/gallery/three-piece-ball-valve.webp',
    imageAlt: 'A KONIN flanged three-piece ball valve in stainless steel',
  },
  {
    icon: Snowflake,
    title: 'Low temperature',
    body: 'Impact tested at room temperature and at −101 °C for low temperature valves.',
    methods: ['Impact', 'Room temperature', '−101 °C'],
    image: '/img/gallery/check-valve.webp',
    imageAlt: 'A KONIN cast swing check valve body, marked 80 150CL',
  },
  {
    icon: ShieldCheck,
    title: 'Corrosion & coating',
    body: 'Salt spray testing on PTFE phosphate / zinc coated and painted parts. Coating thickness measured with a digital gauge for uniformity.',
    methods: ['Salt spray', 'Coating thickness', 'Digital gauge'],
    image: '/img/gallery/double-offset-butterfly.webp',
    imageAlt: 'A row of painted KONIN double-offset butterfly valves with electric actuators',
  },
  {
    icon: Layers,
    title: 'Seals',
    body: 'Rubber composition, tensile and shore “A” hardness checked for seals.',
    methods: ['Rubber composition', 'Tensile', 'Shore “A”'],
    image: '/img/gallery/butterfly-valve.webp',
    imageAlt: 'A large KONIN double-flanged butterfly valve, its seat ring visible in the bore',
  },
]

/**
 * The bodies named in company.thirdPartyApproval, plus the flow laboratory
 * named in company.flowTesting.
 *
 * The photographs are industrial grounds, not depictions: none of these images
 * shows the body's own works, which is why every one of them is decorative
 * (`alt=""`) and sits under a heavy scrim in near-monochrome. The name is the
 * content of the tile; the picture is the texture behind it.
 */
const INSPECTORS = [
  { name: 'CEIL', image: '/img/industries/refineries.webp' },
  { name: 'TUV', image: '/img/industries/chemical.webp' },
  { name: 'BVQL', image: '/img/industries/oilgas.webp' },
  { name: 'RITES', image: '/img/industries/pipeline.webp' },
  { name: 'Germanischer Lloyd', image: '/img/industries/marine.webp' },
  { name: 'FCRI, Palghat', image: '/img/industries/wtp.webp' },
]

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

/**
 * A testing-regime card.
 *
 * The head is a specimen stage rather than a photo panel: the product is cut
 * out of its background and floats on a lit ground, throwing a contact shadow
 * that spreads as the card is pointed at. A measuring line sweeps down the
 * stage on the same gesture — the page is about inspection, so the hover state
 * inspects. Everything else is the site's standard card choreography.
 */
function RegimeCard({ item, index }: { item: Regime; index: number }) {
  const Icon = item.icon
  const src = cutoutFor(item.image) ?? item.image

  return (
    <StaggerItem as="article" direction={rowDirection(index % 3, 3)} className="h-full">
      <TiltCard className="h-full" max={6} lift={8} scale={1.012}>
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 ease-out-expo group-hover:border-brand-200 group-hover:shadow-e4">
          {/* ---------------- Specimen stage ---------------- */}
          <div className="relative h-56 shrink-0 overflow-hidden border-b border-steel-150 bg-linear-to-b from-white via-steel-50 to-brand-50 sm:h-60">
            <span
              aria-hidden="true"
              className="bg-grid-fine absolute inset-0 opacity-70 mask-fade-radial"
            />
            {/* Backlight — grows behind the product as the card is pointed at. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-brand-300/0 blur-3xl transition-all duration-700 ease-out-expo group-hover:scale-100 group-hover:bg-brand-300/45"
            />

            <Layer z={30} className="absolute top-3.5 right-3.5 z-10">
              <span className="grid size-10 place-items-center rounded-xl border border-brand-100 bg-white/85 text-brand-700 shadow-e1 backdrop-blur-sm transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-linear-to-br group-hover:from-brand-600 group-hover:to-brand-500 group-hover:text-white group-hover:shadow-brand">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
            </Layer>

            {/* Contact shadow, under the product and ahead of it in the stack. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 left-1/2 h-4 w-2/5 -translate-x-1/2 rounded-[50%] bg-ink-900/30 blur-lg transition-all duration-700 ease-out-expo group-hover:h-5 group-hover:w-1/2 group-hover:bg-ink-900/40"
            />

            <Layer z={46} className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 pb-9">
              <Img
                src={src}
                alt={item.imageAlt}
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 29vw"
                className="max-h-full w-auto object-contain drop-shadow-[0_14px_20px_rgba(10,23,37,0.22)] transition-transform duration-900 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-107"
              />
            </Layer>

          </div>

          {/* ---------------- Body ---------------- */}
          <Layer z={22} className="flex flex-1 flex-col p-6">
            <h3 className="h-card text-ink-900 transition-colors duration-400 group-hover:text-brand-700">
              {item.title}
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-steel-600">{item.body}</p>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {item.methods.map((m) => (
                <li
                  key={m}
                  className="rounded-md border border-steel-150 bg-steel-50 px-2 py-1 font-mono text-[10.5px] tracking-wide text-steel-600 transition-colors duration-400 group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-brand-700"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Layer>

          <span aria-hidden="true" className="sheen z-10" />
        </div>
      </TiltCard>
    </StaggerItem>
  )
}

/** An inspection body, as a photographic tile. See the note on INSPECTORS. */
function InspectorTile({
  item,
  index,
}: {
  item: (typeof INSPECTORS)[number]
  index: number
}) {
  return (
    <StaggerItem as="li" direction={rowDirection(index % 3, 3)} className="h-full">
      <TiltCard className="h-full" max={9} lift={6}>
        <div className="relative h-full min-h-36 overflow-hidden rounded-2xl border border-steel-150 shadow-e2 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e4 sm:min-h-40">
          <Img
            src={item.image}
            alt=""
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 16vw"
            /* No `transition-*` utility here: `.duotone` already transitions
               both filter and transform, and a Tailwind transition utility
               would replace that shorthand and drop the colour recovery. */
            className="duotone absolute inset-0 size-full object-cover group-hover:scale-108"
          />
          {/* Deep enough under the name to hold the contrast floor, and gone by
              the top of the tile so the photograph is still a photograph. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/45 to-ink-950/10 transition-colors duration-700 group-hover:from-brand-950/88 group-hover:via-brand-950/38"
          />
          <Layer z={20} className="absolute inset-0 flex flex-col justify-end p-4">
            <span className="font-display text-[17px] leading-tight font-bold text-balance text-white">
              {item.name}
            </span>
            {/* Draws in under the name on hover. */}
            <span
              aria-hidden="true"
              className="mt-2.5 h-px w-full origin-left scale-x-0 bg-linear-to-r from-aqua-400 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            />
          </Layer>

          <span aria-hidden="true" className="sheen" />
        </div>
      </TiltCard>
    </StaggerItem>
  )
}

/** A published certificate, as the document it is. */
function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof company.certifications)[number]
  index: number
}) {
  return (
    <StaggerItem
      as="article"
      direction={rowDirection(index, company.certifications.length)}
      className="h-full"
    >
      <TiltCard className="h-full" max={8} lift={10} radius="rounded-3xl">
        <a
          href={cert.file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 ease-out-expo group-hover:border-brand-200 group-hover:shadow-e5"
        >
          {/* The document sits on a mount rather than flush to the card edge,
              so it reads as a page that has been placed there. */}
          <div className="relative overflow-hidden border-b border-steel-150 bg-linear-to-b from-steel-100 via-steel-50 to-white p-4 sm:p-5">
            <span
              aria-hidden="true"
              className="bg-grid-fine absolute inset-0 opacity-60 mask-fade-radial"
            />
            <div className="relative overflow-hidden rounded-lg border border-steel-200 shadow-e2 transition-shadow duration-500 group-hover:shadow-e4">
              <Img
                src={cert.image}
                alt={`${cert.name} certificate issued to KONIN Valves`}
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 40vw, 27vw"
                className="aspect-3/4 w-full object-cover object-top transition-transform duration-1000 ease-out-expo group-hover:scale-104"
              />
              {/* Paper light — a soft raking highlight as the plate tilts. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-tr from-ink-950/12 via-transparent to-white/35 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </div>

            <span className="absolute top-7 right-7 z-10 rounded-full border border-steel-200 bg-white/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-steel-600 uppercase shadow-e1 backdrop-blur-sm transition-colors duration-500 group-hover:border-brand-200 group-hover:text-brand-700 sm:top-8 sm:right-8">
              PDF
            </span>
          </div>

          <Layer z={24} className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="font-display text-lg leading-tight font-bold text-ink-900 transition-colors duration-400 group-hover:text-brand-700">
              {cert.name}
            </h3>
            {cert.issuer !== '—' && (
              <p className="mt-1.5 font-mono text-[11px] tracking-wide text-brand-700">
                {cert.issuer}
              </p>
            )}
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-steel-500">{cert.note}</p>

            <span className="mt-auto flex items-center justify-between gap-3 pt-6">
              <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
                <FileText className="size-3.5" aria-hidden="true" />
                Open certificate
              </span>
              <span className="grid size-9 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-all duration-400 ease-out-expo group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand">
                <ArrowUpRight
                  className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Layer>

          <span aria-hidden="true" className="sheen z-10" />
        </a>
      </TiltCard>
    </StaggerItem>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Quality() {
  return (
    <>
      <Seo
        title="Quality, Testing & Certifications — ISO 9001:2015 | KONIN Valves"
        description="KONIN Valves is ISO 9001:2015 certified. Every valve is 100% dimension and pressure tested, with PMI, radiography, ultrasonic and −101°C impact testing."
        path="/quality"
        image="/img/company/cert-iso.webp"
        schema={[breadcrumbSchema(TRAIL)]}
      />

      <PageHero
        eyebrow="Quality & certifications"
        title="Every valve proves itself before it ships"
        lead="An ISO 9001:2015 certified company. Testing covers composition, soundness, physical properties and low-temperature impact."
        image="/img/company/testing-lab.webp"
        imageAlt=""
      />

      {/* ---------------- Proof rail ----------------
          The published figures, given the top of the page. Each cell carries
          its own top rule rather than the group carrying dividers, so the
          pattern stays correct at one, two and four columns alike. */}
      <section aria-label="Quality at a glance" className="bg-white section-y-sm">
        <div className="container-k">
          <Stagger
            as="dl"
            className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4"
            step={0.08}
          >
            {company.highlights.map((h, i) => (
              <StaggerItem
                key={h.label}
                direction={rowDirection(i, company.highlights.length)}
                className="group border-t border-steel-150 pt-6 transition-colors duration-500 hover:border-brand-300"
              >
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <Counter
                    value={h.value}
                    className="numeral text-gradient block text-[clamp(2.3rem,3.6vw,3.15rem)]"
                  />
                  <span className="mt-4 block font-display text-[15px] leading-tight font-bold text-ink-900">
                    {h.label}
                  </span>
                  <span className="mt-2 block text-[13px] leading-relaxed text-steel-500">
                    {h.detail}
                  </span>
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- Testing regime ---------------- */}
      <section className="relative overflow-hidden bg-white section-y">
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <Glow className="-top-20 right-0" size="38rem" intensity={0.1} drift />

        <div className="relative container-k">
          <Reveal>
            <SectionHeading
              eyebrow="Testing regime"
              title={
                <>
                  Twelve-plus checks on <span className="text-gradient">every product.</span>
                </>
              }
              lead={company.about[1]}
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={0.07}>
            {REGIME.map((item, i) => (
              <RegimeCard key={item.title} item={item} index={i} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- Third-party approval ---------------- */}
      <section className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop />
        <Glow className="top-0 -left-32" size="42rem" intensity={0.14} drift />

        <div className="relative container-k">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal direction="from-left">
                <SectionHeading
                  eyebrow="Third-party approval"
                  title={
                    <>
                      Inspected by bodies{' '}
                      <span className="text-gradient">your client already trusts.</span>
                    </>
                  }
                  lead={company.thirdPartyApproval}
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Stagger
                as="ul"
                className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:gap-4"
                step={0.07}
              >
                {INSPECTORS.map((item, i) => (
                  <InspectorTile key={item.name} item={item} index={i} />
                ))}
              </Stagger>
            </div>
          </div>

      
        </div>
      </section>

      {/* ---------------- Certificates ---------------- */}
      <section className="relative bg-white section-y">
        <SectionSeam />
        <SectionSeam flip />

        <div className="relative container-k">
          <Reveal>
            <SectionHeading
              eyebrow="Certificates"
              align="center"
              title="Published in full"
              lead="Each certificate below is the original document as issued. Open any of them to view or download."
            />
          </Reveal>

          <Stagger className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3" step={0.1}>
            {company.certifications.map((cert, i) => (
              <CertificateCard key={cert.name} cert={cert} index={i} />
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        titleLines={['Need documentation', 'with your order?']}
        lead="Material test certificates, third-party inspection and test reports can be issued with the consignment. Tell us what your specification requires."
      />
    </>
  )
}
