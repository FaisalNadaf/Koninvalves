import { FileText, Gauge, Microscope, Ruler, ShieldCheck } from 'lucide-react'
import { company } from '../../data/company'
import { Btn, Eyebrow, GridBackdrop, Img } from '../../components/ui'
import { TiltCard, Layer } from '../../components/ui/TiltCard'
import { ImageReveal } from '../../components/fx'
import { LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../../lib/motion'

/** Source: the testing regime KONIN publishes on its about page. */
const TESTS = [
  {
    icon: Ruler,
    title: 'Dimensional & pressure',
    body: '100% of production is dimension and pressure tested before it leaves the works.',
  },
  {
    icon: Microscope,
    title: 'Material soundness',
    body: 'Spectro analysis, PMI, grain flow examination for forged parts, ultrasonic, MPI, DP and radiography.',
  },
  {
    icon: Gauge,
    title: 'Physical properties',
    body: 'Hardness and tensile checks, ball roundness on CMM, and RA-value on stem and seating mating parts.',
  },
  {
    icon: ShieldCheck,
    title: 'Environmental & low-temp',
    body: 'Impact tested at room temperature and −101 °C. Salt spray testing on coated and painted parts for marine service.',
  },
]

/**
 * Quality, shown rather than claimed.
 *
 * The laboratory photograph runs flush to the left edge of the viewport,
 * breaking the container the rest of the page keeps to. That single deliberate
 * break is what stops the page settling into a rhythm of identical bands.
 */
export default function QualityProof() {
  return (
    <section
      aria-labelledby="quality-title"
      className="tone-tint relative overflow-hidden section-y"
    >
      <GridBackdrop variant="fine" className="opacity-50" mask={false} />

      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-0">
        {/* ---------------- Full-bleed plate ---------------- */}
        <div className="lg:col-span-5 lg:pr-12">
          <ImageReveal
            direction="left"
            className="relative h-full min-h-96 border border-l-0 border-steel-150 shadow-e4 lg:rounded-r-3xl"
          >
            <Img
              src="/img/company/testing-lab.webp"
              alt="A KONIN technician examining a material sample under the metallurgical microscope"
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="size-full min-h-96 object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
              <p className="mono-label text-signal-300">In-house</p>
              <p className="mt-3 font-display text-xl leading-tight font-bold text-white">
                Metallurgical &amp; testing laboratory
              </p>
              <p className="mt-2.5 max-w-sm text-[13.5px] leading-relaxed text-white/75">
                Composition, soundness and physical properties are proved here before a valve is
                allowed near a pressure test.
              </p>
            </div>
          </ImageReveal>
        </div>

        {/* ---------------- Content ---------------- */}
        <div className="lg:col-span-7">
          <div className="px-[max(1.25rem,calc((100vw-1480px)/2+3.75rem))] lg:pl-0">
            {/* The whole column sits to the right of the full-bleed plate, so
                its copy arrives from that side and the two halves of the
                section move apart rather than together. */}
            <Reveal direction="from-right">
              <Eyebrow>Engineering &amp; quality</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="quality-title"
              className="h-section mt-5 text-ink-900"
              lines={['Tested before', 'it ever ships.']}
              accentClassName="text-gradient"
            />
            <Reveal direction="from-right" delay={0.1}>
              <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-steel-600">
                {company.about[1]}
              </p>
            </Reveal>

            {/* Testing regime */}
            <Stagger className="mt-9 grid gap-4 sm:grid-cols-2" step={0.08}>
              {TESTS.map(({ icon: Icon, title, body }, i) => (
                <StaggerItem
                  key={title}
                  direction={rowDirection(i, TESTS.length)}
                  className="h-full"
                >
                  <TiltCard className="h-full" max={7} lift={6}>
                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-150 bg-white p-6 shadow-e1 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e3">
                      <Layer z={20}>
                        <span className="grid size-11 place-items-center rounded-xl border border-brand-100 bg-linear-to-b from-brand-50 to-white text-brand-700 shadow-e1 transition-all duration-500 group-hover:border-transparent group-hover:bg-brand-600 group-hover:from-brand-600 group-hover:to-brand-500 group-hover:text-white group-hover:shadow-brand">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 font-display text-lg leading-tight font-bold text-ink-900">
                          {title}
                        </h3>
                        <p className="mt-2.5 text-[13.5px] leading-relaxed text-steel-600">{body}</p>
                      </Layer>
                      <span aria-hidden="true" className="sheen" />
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Third-party approval */}
            <Reveal direction="scale" delay={0.12}>
              <div className="mt-4 grid gap-6 rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-7 shadow-e1 md:grid-cols-2">
                <div>
                  <p className="mono-label text-brand-700">Third party approval</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-steel-600">
                    {company.thirdPartyApproval}
                  </p>
                </div>
                <div>
                  <p className="mono-label text-signal-600">Flow &amp; fire testing</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-steel-600">
                    {company.flowTesting}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Certificates */}
            <Stagger className="mt-4 grid gap-3 sm:grid-cols-3" step={0.08}>
              {company.certifications.map((cert, i) => (
                <StaggerItem
                  key={cert.name}
                  as="article"
                  direction={rowDirection(i, company.certifications.length)}
                  className="h-full"
                >
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-steel-150 bg-white p-4 shadow-e1 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-e3"
                  >
                    <Img
                      src={cert.image}
                      alt={`${cert.name} certificate issued to KONIN Valves`}
                      sizes="80px"
                      className="h-20 w-14 shrink-0 rounded-lg border border-steel-150 object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] leading-tight font-bold text-ink-900">
                        {cert.name}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-brand-700">
                        <FileText className="size-3.5" aria-hidden="true" />
                        View certificate
                      </span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal direction="from-bottom" delay={0.1}>
              <div className="mt-8">
                <Btn to="/quality" variant="outline-ink">
                  Quality &amp; certifications
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
