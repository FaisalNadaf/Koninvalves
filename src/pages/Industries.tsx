import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Seo, breadcrumbSchema, itemListSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Chip, Img, SectionHeading } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { Reveal, rowDirection, Stagger, StaggerItem } from '../lib/motion'
import { industries, additionalIndustries, type Industry } from '../data/industries'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Industries', path: '/industries' },
]

/**
 * Industry tile.
 *
 * Every fifth tile is given double width, so the mosaic has a rhythm instead of
 * seventeen identical rectangles. The description is always present in the
 * markup — it is revealed by a grid-row transition on hover rather than being
 * mounted then, so the text is in the page for a crawler and for a screen
 * reader whether or not anyone points at it.
 */
function IndustryTile({ ind, index }: { ind: Industry; index: number }) {
  const wide = index % 5 === 0

  return (
    /* Direction comes from the tile's column, not its position in the list, so
       each row of the mosaic fans in from its own two ends. The wide tiles push
       the columns out of true further down the grid; at 32 px of travel that
       reads as the hand-laid rhythm the mosaic is already going for. */
    <StaggerItem
      as="article"
      direction={rowDirection(index % 3, 3)}
      className={`h-full ${wide ? 'sm:col-span-2' : ''}`}
    >
      <TiltCard className="h-full" max={5} lift={8}>
        <Link
          to="/industries"
          className="relative block h-full overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e4"
        >
          {/* The picture fills the tile rather than carrying its own aspect
              ratio: the row is a fixed height, so a wide tile and a standard one
              sitting side by side stay flush instead of leaving a band under the
              shorter picture. */}
          <Img
            src={ind.image}
            alt={`${ind.name}, an industry served by KONIN valves and solutions`}
            sizes={
              wide
                ? '(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 62vw'
                : '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw'
            }
            className="absolute inset-0 size-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/35 to-transparent transition-opacity duration-700 group-hover:via-ink-950/55"
          />

          <div className="absolute inset-x-5 bottom-5">
            <h2 className="font-display text-xl leading-tight font-bold text-white sm:text-2xl">
              {ind.name}
            </h2>
            <div className="grid grid-rows-[0fr] transition-all duration-700 ease-out-expo group-hover:mt-3 group-hover:grid-rows-[1fr] group-focus-within:mt-3 group-focus-within:grid-rows-[1fr]">
              <p className="overflow-hidden text-[13.5px] leading-relaxed text-white/85">
                {ind.blurb}
              </p>
            </div>
          </div>

          <span aria-hidden="true" className="sheen" />
        </Link>
      </TiltCard>
    </StaggerItem>
  )
}

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries Served: Water, Oil & Gas, Power | KONIN Valves"
        description="KONIN valves, automation and water solutions serve water treatment, oil & gas, refineries, chemical, power, steel, mining and pulp & paper industries."
        path="/industries"
        image="/img/industries/oilgas.webp"
        schema={[
          breadcrumbSchema(TRAIL),
          itemListSchema(
            industries.map((i) => ({ name: i.name, path: '/industries' })),
            'Industries served by KONIN'
          ),
        ]}
      />

      <PageHero
        eyebrow="Industries served"
        title="Built for the plants that cannot stop"
        lead="KONIN valves, control panels and water solutions are specified across water, energy, process and heavy industry."
        image="/img/heroes/industries-refinery-night.webp"
        imageAlt=""
      />

      <section className="tone-tint section-y">
        <div className="container-k">
          <Reveal>
            <SectionHeading
              eyebrow={`${industries.length} primary industries`}
              title={
                <>
                  Applications across the <span className="text-gradient">process chain.</span>
                </>
              }
            />
          </Reveal>

          <Stagger
            className="mt-10 grid auto-rows-68 gap-4 sm:auto-rows-76 sm:grid-cols-2 lg:auto-rows-84 lg:grid-cols-3"
            step={0.05}
          >
            {industries.map((ind, i) => (
              <IndustryTile key={ind.slug} ind={ind} index={i} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-steel-150 bg-white section-y-sm">
        <div className="container-k">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal direction="from-left">
                <SectionHeading
                  eyebrow="Also served"
                  title="Further sectors"
                  lead="Named in the KONIN catalogue “Industries We Serve” panel and in the KONIN Automation Solutions document."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Stagger as="ul" className="flex flex-wrap gap-2.5" step={0.04}>
                {additionalIndustries.map((a) => (
                  <StaggerItem key={a} as="li" direction="scale">
                    <Chip className="px-4 py-2.5 text-[13px]">{a}</Chip>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal direction="from-bottom" delay={0.15}>
                <Link
                  to="/products"
                  className="link-slide mt-8 inline-flex min-h-6 items-center text-[14.5px] font-semibold text-brand-700"
                >
                  Browse all products and solutions
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        titleLines={['Tell us your', 'industry and duty.']}
        lead="Media, temperature, pressure class and line size: we will specify the right valve, panel or control system for the application."
      />
    </>
  )
}
