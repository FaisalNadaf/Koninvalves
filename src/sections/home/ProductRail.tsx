import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { valves } from '../../data/valves'
import { featuredValveSlugs } from '../../data/categories'
import { Btn, Eyebrow, Glow, GridBackdrop } from '../../components/ui'
import { PremiumProductCard } from '../../components/products/PremiumProductCard'
import { LineReveal, Reveal } from '../../lib/motion'

const featured = featuredValveSlugs
  .map((slug) => valves.find((v) => v.slug === slug))
  .filter((v): v is NonNullable<typeof v> => Boolean(v))

/**
 * Featured valves, on a rail.
 *
 * A horizontal track rather than another three-across grid: it changes the
 * reading direction mid-page, shows more of the range in the same vertical
 * space, and gives the products room to be large. The track is a native scroll
 * container, so it works with a trackpad, a touch swipe, the arrow buttons and
 * the keyboard alike.
 *
 * The rail opens on a brand panel rather than on a product, so the row has a
 * head — and the catalogue's size is stated before the sample of it.
 */
export default function ProductRail() {
  const track = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft > max - 8)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const nudge = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    // One card plus its gutter, so a click always lands on a card edge.
    const card = el.querySelector('[data-rail-item]')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }

  const edge = 'max(1.25rem, calc((100vw - 1480px) / 2 + 3.75rem))'

  return (
    <section
      aria-labelledby="featured-title"
      className="tone-tint-deep relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20"
    >
      <GridBackdrop variant="dots" className="opacity-45" mask={false} />
      <Glow className="top-0 -right-40" color="aqua" size="44rem" intensity={0.16} drift />
      <Glow className="-bottom-40 -left-32" size="38rem" intensity={0.13} />

      <div className="relative container-k">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Featured products</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="featured-title"
              className="h-section mt-5 text-ink-900"
              lines={['Engineered for', 'the hard duties.']}
              accentClassName="text-gradient"
            />
          </div>

          <div className="flex flex-wrap items-end gap-8">
            <Reveal delay={0.1}>
              <p className="hidden max-w-xs text-[14.5px] leading-relaxed text-steel-600 md:block">
                A selection from the KONIN valve range. Every figure shown is taken from the
                published KONIN catalogue and product data.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Btn to="/products/valves" variant="outline-ink" size="lg">
                All {valves.length} valves
              </Btn>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------------- Rail ----------------
          Full-bleed on purpose: the track runs off the right edge of the
          viewport so it reads as continuing, not as a boxed carousel. */}
      <div
        ref={track}
        className="table-scroll mt-10 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-5"
        style={{ scrollPaddingInline: edge }}
      >
        <span aria-hidden="true" className="shrink-0" style={{ width: edge }} />

        {/* Head panel — the catalogue, before the sample of it.
            The rail reveals card by card as it is scrolled, not all at once:
            an item clipped out of the track is genuinely not intersecting, so
            the ones waiting off the right edge arrive as they are reached.
            `data-rail-item` rides along on the reveal, so the arrow buttons
            still measure their step from a card. */}
        <Reveal
          data-rail-item
          direction="from-bottom"
          amount={0.1}
          className="tone-brand relative w-[76vw] shrink-0 snap-start overflow-hidden rounded-3xl p-7 shadow-e4 sm:w-76 lg:w-84"
        >
          <span aria-hidden="true" className="bg-grid-light absolute inset-0 opacity-50" />
          <div className="relative flex h-full flex-col">
            <p className="eyebrow eyebrow-on-brand">Valve catalogue</p>
            <p className="mt-6 font-display text-[4rem] leading-none font-bold text-white tabular-nums">
              {valves.length}
            </p>
            <p className="mt-3 font-display text-xl leading-tight font-bold text-white">
              valves, cast and forged
            </p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/75">
              From 6&nbsp;mm instrument needle valves to 1800&nbsp;mm double flanged butterfly
              valves — every one dimension and pressure tested before dispatch.
            </p>
            <Link
              to="/products/valves"
              className="link-slide mt-auto inline-flex min-h-8 items-center pt-8 text-[14px] font-semibold text-white"
            >
              Browse the catalogue
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {featured.map((p, i) => (
          <Reveal
            key={p.slug}
            data-rail-item
            direction="from-bottom"
            amount={0.1}
            /* A short, fixed cascade across the first few, then nothing: past
               the fourth card the visitor is scrolling the rail and each one
               should answer immediately rather than wait its turn. */
            delay={Math.min(i, 3) * 0.07}
            className="w-[80vw] shrink-0 snap-start sm:w-[20rem] lg:w-88"
          >
            <PremiumProductCard product={p} categoryKey="valves" compact />
          </Reveal>
        ))}

        <span aria-hidden="true" className="shrink-0" style={{ width: edge }} />
      </div>

      {/* ---------------- Controls ---------------- */}
      <Reveal
        direction="from-bottom"
        distance={0.6}
        amount={0.5}
        className="relative container-k mt-4 flex items-center gap-6"
      >
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-steel-200" role="presentation">
          <div
            className="h-full rounded-full bg-linear-to-r from-brand-600 to-aqua-500 transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(10, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous products"
            className="grid size-12 place-items-center rounded-full border border-steel-200 bg-white text-ink-900 shadow-e1 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-600 hover:text-white hover:shadow-brand disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="More products"
            className="grid size-12 place-items-center rounded-full border border-steel-200 bg-white text-ink-900 shadow-e1 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-600 hover:text-white hover:shadow-brand disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </Reveal>
    </section>
  )
}
