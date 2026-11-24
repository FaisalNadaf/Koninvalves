import { useMemo, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { Seo, breadcrumbSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Lightbox } from '../components/Lightbox'
import { Img, cutoutFor, GridBackdrop } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { Reveal } from '../lib/motion'
import { valves, valveGroups } from '../data/valves'
import { automationProducts } from '../data/automation'
import { waterSolutions, waterGroups } from '../data/water'
import { galleryPhotos, galleryHidden } from '../data/gallery'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
]

const FILTERS = ['All', 'Valves', 'Automation', 'Water'] as const
type Filter = (typeof FILTERS)[number]

type Shot = {
  src: string
  alt: string
  /** Caption under the tile — the product the photograph shows. */
  name: string
  /** The section the tile sits in. */
  group: string
  filter: Filter
  /** The product page the photograph belongs to, when it belongs to one. */
  href?: string
  fill?: boolean
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<number | null>(null)

  /**
   * Built in section order — each valve group in catalogue order, then any
   * photograph that has a section of its own, then the panels and the water
   * groups — so every section is one unbroken run of the list.
   */
  const shots = useMemo<Shot[]>(() => {
    const out: Shot[] = []
    const seen = new Set<string>()
    const push = (s: Shot) => {
      if (seen.has(s.src) || galleryHidden.has(s.src)) return
      seen.add(s.src)
      out.push(s)
    }
    const groups: readonly string[] = valveGroups

    for (const group of valveGroups) {
      for (const p of valves.filter((v) => v.group === group)) {
        for (const img of [p.image, ...(p.gallery ?? [])]) {
          push({
            ...img,
            name: img.caption ?? p.shortName ?? p.name,
            group,
            filter: 'Valves',
            href: `/products/valves/${p.slug}`,
          })
        }
      }
      for (const g of galleryPhotos.filter((g) => g.group === group)) {
        push({ ...g, filter: 'Valves' })
      }
    }
    for (const g of galleryPhotos.filter((g) => !groups.includes(g.group))) {
      push({ ...g, filter: 'Valves' })
    }
    for (const p of automationProducts) {
      push({
        ...p.image,
        name: p.shortName ?? p.name,
        group: 'Control Panels',
        filter: 'Automation',
        href: `/products/automation-solutions/${p.slug}`,
        // Scene photographs, not cut-outs: they fill the tile.
        fill: true,
      })
    }
    for (const group of waterGroups) {
      for (const p of waterSolutions.filter((w) => w.group === group)) {
        push({
          ...p.image,
          name: p.shortName ?? p.name,
          group,
          filter: 'Water',
          href: `/products/water-treatment-solutions/${p.slug}`,
        })
      }
    }
    return out
  }, [])

  const visible = useMemo(
    () => (filter === 'All' ? shots : shots.filter((s) => s.filter === filter)),
    [filter, shots]
  )

  /** Consecutive runs of `visible` that share a group, each with its offset into it. */
  const sections = useMemo(() => {
    const out: { group: string; start: number; items: Shot[] }[] = []
    visible.forEach((s, i) => {
      const last = out[out.length - 1]
      if (last && last.group === s.group) last.items.push(s)
      else out.push({ group: s.group, start: i, items: [s] })
    })
    return out
  }, [visible])

  const pickFilter = (f: Filter) => {
    setOpen(null)
    setFilter(f)
  }

  return (
    <>
      <Seo
        title="Product Gallery: Valves, Panels & Water Solutions | KONIN"
        description="Photographs of KONIN industrial valves, electrical control panels and water treatment automation solutions."
        path="/gallery"
        image="/img/gallery/industrial-valves.webp"
        schema={[breadcrumbSchema(TRAIL)]}
      />

      <PageHero
        eyebrow="Gallery"
        title="The KONIN range, in detail"
        lead={`${shots.length} photographs of valves, control panels and water treatment solutions.`}
        image="/img/heroes/gallery-gate-valve-handwheel.webp"
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
                    onClick={() => pickFilter(f)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 ${
                      on
                        ? 'border-transparent bg-brand-600 text-white shadow-brand'
                        : 'border-steel-200 bg-white text-steel-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-e2'
                    }`}
                  >
                    {f}
                    <span
                      className={`font-medium text-[11px] ${on ? 'text-white/70' : 'text-steel-400'}`}
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
          <div key={filter}>
            {sections.map(({ group, start, items }) => {
              const headingId = `gallery-${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
              return (
                <section key={group} aria-labelledby={headingId} className="mt-12 first:mt-9">
                  <Reveal>
                    <div className="flex items-baseline gap-3 border-b border-steel-200 pb-3">
                      <h2 id={headingId} className="h-card text-ink-900">
                        {group}
                      </h2>
                      <span className="mono-label text-steel-400 tabular-nums">{items.length}</span>
                    </div>
                  </Reveal>

                  <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((s, i) => (
                      <Reveal
                        key={s.src}
                        direction="scale"
                        amount={0.15}
                        delay={(i % 4) * 0.06}
                        className="h-full"
                      >
                        <figure>
                          <TiltCard max={8} lift={6}>
                            <button
                              type="button"
                              onClick={() => setOpen(start + i)}
                              aria-haspopup="dialog"
                              className="product-stage relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-steel-150 shadow-e1 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e3"
                            >
                              {s.fill ? (
                                <Img
                                  src={s.src}
                                  alt={s.alt}
                                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                                  className="absolute inset-0 size-full object-cover transition-transform duration-900 ease-out-expo group-hover:scale-[1.06]"
                                />
                              ) : (
                                <span className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-900 ease-out-expo group-hover:scale-[1.08]">
                                  <Img
                                    src={cutoutFor(s.src) ?? s.src}
                                    alt={s.alt}
                                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                                    className="max-h-full w-auto object-contain drop-shadow-[0_12px_18px_rgba(10,23,37,0.2)]"
                                  />
                                </span>
                              )}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-3 py-2.5 text-left text-[11.5px] leading-snug text-ink-900 backdrop-blur-sm transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
                              >
                                {s.alt}
                              </span>
                              <span
                                aria-hidden="true"
                                className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow-e1 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
                              >
                                <Maximize2 className="size-3.5" />
                              </span>
                              <span aria-hidden="true" className="sheen" />
                            </button>
                          </TiltCard>
                          <figcaption className="mt-2.5 px-1 text-[13px] leading-snug font-semibold text-ink-900">
                            {s.name}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />

      <CtaBand />
    </>
  )
}
