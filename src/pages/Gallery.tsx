import { useMemo, useState } from 'react'
import { Seo, breadcrumbSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Img, cutoutFor, GridBackdrop } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { Reveal } from '../lib/motion'
import { valves } from '../data/valves'
import { automationProducts } from '../data/automation'
import { waterSolutions } from '../data/water'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
]

type Shot = { src: string; alt: string; group: string; filter: string }

const FILTERS = ['All', 'Valves', 'Automation', 'Water'] as const

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  const shots = useMemo<Shot[]>(() => {
    const out: Shot[] = []
    const seen = new Set<string>()
    const push = (s: Shot) => {
      if (seen.has(s.src)) return
      seen.add(s.src)
      out.push(s)
    }

    for (const p of valves) {
      for (const img of [p.image, ...(p.gallery ?? [])]) {
        push({ src: img.src, alt: img.alt, group: p.group, filter: 'Valves' })
      }
    }
    for (const p of automationProducts) {
      push({ src: p.image.src, alt: p.image.alt, group: 'Control Panels', filter: 'Automation' })
    }
    for (const p of waterSolutions) {
      push({ src: p.image.src, alt: p.image.alt, group: p.group, filter: 'Water' })
    }
    return out
  }, [])

  const visible = filter === 'All' ? shots : shots.filter((s) => s.filter === filter)

  return (
    <>
      <Seo
        title="Product Gallery — Valves, Panels & Water Solutions | KONIN"
        description="Photographs of KONIN industrial valves, electrical control panels and water treatment automation solutions, taken from the KONIN catalogue and product documentation."
        path="/gallery"
        image="/img/gallery/industrial-valves.webp"
        schema={[breadcrumbSchema(TRAIL)]}
      />

      <PageHero
        eyebrow="Gallery"
        title="The KONIN range, in detail"
        lead={`${shots.length} photographs of valves, control panels and water treatment solutions, from KONIN’s own product documentation.`}
        image="/img/company/plant-5.webp"
        imageAlt=""
      />

      <section className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop variant="dots" className="opacity-40" mask={false} />
        <div className="relative container-k">
          {/* Filter */}
          <Reveal>
            <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const count = f === 'All' ? shots.length : shots.filter((s) => s.filter === f).length
                const on = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 ${
                      on
                        ? 'border-transparent bg-brand-600 text-white shadow-brand'
                        : 'border-steel-200 bg-white text-steel-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-e2'
                    }`}
                  >
                    {f}
                    <span
                      className={`font-mono text-[11px] ${on ? 'text-white/70' : 'text-steel-400'}`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Each tile watches for itself rather than the grid releasing all of
              them together. A <Stagger> pays its step for every child it has, and
              at well over a hundred photographs the last one would be waiting
              several seconds — most of them off screen while they waited. Per
              tile, the grid reveals as it is scrolled through, and the delay is
              taken from the column so each row still arrives left to right.

              `key={filter}` remounts the grid on a filter change, which resets
              the reveals and plays the new set in. */}
          <div
            key={filter}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {visible.map((s, i) => (
              <Reveal
                key={s.src}
                direction="scale"
                amount={0.15}
                delay={(i % 4) * 0.06}
                className="h-full"
              >
                <TiltCard className="h-full" max={8} lift={6}>
                  <figure className="product-stage relative aspect-square overflow-hidden rounded-2xl border border-steel-150 shadow-e1 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e3">
                    <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-900 ease-out-expo group-hover:scale-[1.08]">
                      <Img
                        src={cutoutFor(s.src) ?? s.src}
                        alt={s.alt}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                        className="max-h-full w-auto object-contain drop-shadow-[0_12px_18px_rgba(10,23,37,0.2)]"
                      />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-3 py-2.5 text-[11.5px] leading-snug text-ink-900 backdrop-blur-sm transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                      {s.alt}
                    </figcaption>
                    <span aria-hidden="true" className="sheen" />
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
