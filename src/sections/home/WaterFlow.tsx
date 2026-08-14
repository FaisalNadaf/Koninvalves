import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { waterSolutions } from '../../data/water'
import { Btn, Eyebrow, Img } from '../../components/ui'
import { TiltCard, Layer } from '../../components/ui/TiltCard'
import { ImageReveal } from '../../components/fx'
import { LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../../lib/motion'

/**
 * The four stages of the water cycle KONIN automates, in the order water
 * actually travels. Membership is read from `water.ts` rather than repeated
 * here, so a new solution appears in the right stage automatically.
 */
const STAGES = [
  {
    group: 'Source & Conveyance',
    n: '01',
    note: 'Gate control at the dam and along the canal, on autonomous solar power where there is no grid.',
    image: '/img/water/dam-automation.webp',
    alt: 'Dam gate automation with local controllers and a central master station',
  },
  {
    group: 'Treatment Plants',
    n: '02',
    note: 'Process control for water, effluent, sewage and desalination plants.',
    image: '/img/water/water-treatment-plant-automation.webp',
    alt: 'Water treatment plant process control system',
  },
  {
    group: 'Distribution & Networks',
    n: '03',
    note: 'Pump house automation and the distribution and collection network that carries the supply.',
    image: '/img/water/pump-house-automation.webp',
    alt: 'Pump house automation panel and pump set',
  },
  {
    group: 'Monitoring Systems',
    n: '04',
    note: 'Pipeline and source condition monitoring, reported back over cellular, radio or VSAT links.',
    image: '/img/water/pipeline-condition-monitoring.webp',
    alt: 'Pipeline condition monitoring instrumentation',
  },
] as const

export default function WaterFlow() {
  return (
    <section aria-labelledby="water-title" className="relative overflow-hidden">
      {/* ---------------- Full-bleed opening plate ----------------
          The one photographic passage on the page that is allowed to run edge
          to edge. It is graded up into the light rather than down into the
          dark, so it sits inside the light system instead of interrupting it. */}
      <div className="relative isolate">
        <Img
          src="/img/water/water-hero.webp"
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/90 to-white/45"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-canvas via-transparent to-canvas"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_12%_50%,rgba(23,171,223,0.16),transparent_65%)]"
        />

        <div className="container-k pt-16 pb-12 sm:pt-20 sm:pb-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>03 · Water Treatment Solutions</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="water-title"
                className="h-section mt-5 text-ink-900"
                lines={['From the dam gate', 'to the distribution main.']}
                accentClassName="text-gradient"
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal direction="from-right" delay={0.12}>
                <p className="text-[15.5px] leading-relaxed text-steel-600">
                  Control and monitoring across the whole water cycle — source, treatment,
                  distribution and the instrumentation that watches all three.
                </p>
                <div className="mt-6">
                  <Btn to="/products/water-treatment-solutions" variant="outline-ink">
                    Explore water solutions
                  </Btn>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- The line ----------------
          A process diagram rather than a row of cards: the stages are joined by
          a rule that runs the full width, so the eye reads the sequence before
          it reads any individual item. */}
      <div className="relative container-k pb-16 sm:pb-20">
        <Stagger
          as="ol"
          className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          step={0.12}
        >
          {STAGES.map((stage, i) => {
            const items = waterSolutions.filter((s) => s.group === stage.group)
            return (
              <StaggerItem
                as="li"
                key={stage.group}
                direction={rowDirection(i, STAGES.length)}
                className="h-full"
              >
                <TiltCard className="h-full" max={6} lift={7}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e4">
                    <ImageReveal className="relative aspect-16/10 shrink-0">
                      <Img
                        src={stage.image}
                        alt={stage.alt}
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 23vw"
                        className="size-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-ink-900/55 to-transparent"
                      />
                    </ImageReveal>

                    <Layer z={22} className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-xl leading-tight font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                        {stage.group}
                      </h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-steel-600">
                        {stage.note}
                      </p>

                      <ul className="mt-4 space-y-0.5 border-t border-steel-150 pt-3">
                        {items.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/products/water-treatment-solutions/${s.slug}`}
                              className="group/i flex min-h-8 items-center justify-between gap-3 rounded-lg px-2 py-1 text-[13px] text-steel-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                            >
                              <span className="truncate">{s.shortName ?? s.name}</span>
                              <ArrowUpRight
                                className="size-3 shrink-0 opacity-0 transition-opacity group-hover/i:opacity-100"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Layer>

                    <span aria-hidden="true" className="sheen z-10" />
                  </div>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
