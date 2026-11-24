import { useEffect } from 'react'
import { Navigate, useParams, useSearchParams, Link } from 'react-router-dom'
import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { Seo, breadcrumbSchema, itemListSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { PremiumProductCard } from '../components/products/PremiumProductCard'
import { scrollToElement } from '../components/fx'
import { Btn, Img, Glow } from '../components/ui'
import { TiltCard, Layer } from '../components/ui/TiltCard'
import { Reveal, rowDirection, Stagger, StaggerItem } from '../lib/motion'
import { categoryByKey, productsByCategory, groupsByCategory } from '../data/categories'
import type { CategoryKey } from '../data/types'
import CtaBand from '../sections/CtaBand'

/**
 * The published PDF for each category.
 *
 * Two of the three files are named for a person rather than for a URL, so the
 * paths are percent-encoded and the `download` name is set explicitly — the
 * visitor gets a tidy filename without the originals having to be renamed.
 */
const CATALOGUES: Record<
  CategoryKey,
  { href: string; as: string; label: string; size: string }
> = {
  valves: {
    href: '/docs/konin-valves-catalogue.pdf',
    as: 'KONIN-Valve-Catalogue.pdf',
    label: 'valve catalogue',
    size: '1.6 MB',
  },
  'automation-solutions': {
    href: '/docs/KONIN%20VALVES%20AND%20AUTOMATION%20SOLUTIONS.pdf',
    as: 'KONIN-Automation-Solutions.pdf',
    label: 'automation guide',
    size: '1.0 MB',
  },
  'water-treatment-solutions': {
    href: '/docs/Solution_Guide_Water%20KONIN.pdf',
    as: 'KONIN-Water-Solution-Guide.pdf',
    label: 'water solution guide',
    size: '0.8 MB',
  },
}

export default function Category() {
  const { category } = useParams<{ category: string }>()
  const key = category as CategoryKey
  const cat = categoryByKey[key]
  /**
   * The sub-family filter lives in the URL rather than in component state, so
   * the products page can link straight to one — `?group=Ball Valves` — and so
   * a filtered view can be shared, bookmarked and reached with the back button.
   *
   * Both hooks sit above the early return, so the hook order is stable whatever
   * the route parameter turns out to be.
   */
  const [params, setParams] = useSearchParams()
  const requested = params.get('group')

  useEffect(() => {
    if (!requested) return
    // One frame after mount. RootLayout scrolls the page to the top whenever
    // the pathname changes, in its own passive effect; a rAF scheduled here
    // runs after that whole flush, so this lands last rather than racing it.
    const frame = requestAnimationFrame(() => scrollToElement('#product-list'))
    return () => cancelAnimationFrame(frame)
  }, [requested])

  if (!cat) return <Navigate to="/products" replace />

  const products = productsByCategory[key]
  const catalogue = CATALOGUES[key]
  const groups = groupsByCategory[key].filter((g) => products.some((p) => p.group === g))
  // An unknown or stale `group` falls back to showing everything rather than
  // to an empty page.
  const filter = requested && groups.includes(requested) ? requested : 'All'
  const shown = filter === 'All' ? groups : groups.filter((g) => g === filter)

  const setFilter = (g: string) => {
    const next = new URLSearchParams(params)
    if (g === 'All') next.delete('group')
    else next.set('group', g)
    // Replace rather than push: a row of filter chips should not bury the page
    // the visitor arrived from under a dozen history entries.
    setParams(next, { replace: true })
  }
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: cat.name, path: cat.path },
  ]

  return (
    <>
      <Seo
        title={`${cat.name} (${products.length} Products) | KONIN`}
        description={cat.summary}
        path={cat.path}
        image={cat.cardImage.src}
        schema={[
          breadcrumbSchema(trail),
          itemListSchema(
            products.map((p) => ({ name: p.name, path: `${cat.path}/${p.slug}` })),
            cat.name
          ),
        ]}
      />

      <PageHero
        eyebrow={cat.tagline}
        title={cat.name}
        lead={cat.summary}
        image={cat.heroImage.src}
        imageAlt=""
      />

      {/* ---------------- Products, grouped by sub-family ---------------- */}
      <section aria-label={`${cat.name} products`} className="tone-tint relative overflow-hidden section-y">
        <Glow className="top-40 -right-40" color="aqua" size="40rem" intensity={0.13} drift />

        <div className="relative container-k">
          {/* ---------------- Catalogue band ----------------
              A bare button on a rule left most of the row empty and said
              nothing about what the file is. As a band it fills the width and
              carries the copy that makes the download worth clicking. */}
          <Reveal direction="scale" amount={0.3}>
            <div className="grid items-center gap-6 rounded-3xl border border-brand-100 bg-linear-to-br from-brand-50 via-white to-aqua-50 p-6 shadow-e2 sm:p-8 lg:grid-cols-12 lg:gap-10">
              <div className="flex items-start gap-5 lg:col-span-8">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-100 bg-white text-brand-700 shadow-e1">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-xl leading-tight font-bold text-ink-900">
                    The complete {cat.shortName} catalogue
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-steel-600">{cat.summary}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
                <Btn
                  href={catalogue.href}
                  download={catalogue.as}
                  variant="primary"
                  size="lg"
                  icon={<Download className="size-4" aria-hidden="true" />}
                >
                  Download PDF
                </Btn>
                <span className="mono-label text-steel-400">{catalogue.size}</span>
              </div>
            </div>
          </Reveal>

          {/* The filter and the list it drives are one region, so a visitor
              arriving on `?group=` can be landed on both at once. */}
          <div id="product-list" className="scroll-mt-28">
          {/* Sub-family filter — on a 23-product category, jumping straight to
              the family you need beats scrolling past the five you do not. */}
          {groups.length > 1 && (
            <Reveal direction="from-bottom" amount={0.4}>
              <div
                role="group"
                aria-label="Filter by sub-family"
                className="mt-10 flex flex-wrap gap-2"
              >
                {['All', ...groups].map((g) => {
                  const count = g === 'All' ? products.length : products.filter((p) => p.group === g).length
                  const on = filter === g
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFilter(g)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 ${
                        on
                          ? 'border-transparent bg-brand-600 text-white shadow-brand'
                          : 'border-steel-200 bg-white text-steel-600 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-e2'
                      }`}
                    >
                      {g}
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
          )}

          <div className="mt-10 space-y-14 lg:space-y-20">
            {shown.map((group) => {
              const items = products.filter((p) => p.group === group)
              return (
                <div key={group}>
                  <Reveal direction="from-left" amount={0.5}>
                    <div className="border-b border-steel-200 pb-4">
                      <h2 className="h-sub text-ink-900">{group}</h2>
                    </div>
                  </Reveal>

                  <Stagger
                    className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    step={0.07}
                  >
                    {items.map((p, i) => (
                      <StaggerItem
                        key={p.slug}
                        direction={rowDirection(i % 3, 3)}
                        className="h-full"
                      >
                        <PremiumProductCard product={p} categoryKey={key} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </section>

      {/* ---------------- Cross-links ----------------
          Two cards on a full-width row were mostly padding: an 80 px thumbnail
          and one line of copy in a 700 px card. The picture now runs the height
          of the card and the summary fills the rest, so the band carries its
          own weight. */}
      <section className="border-t border-steel-150 bg-white section-y-sm">
        <div className="container-k">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="eyebrow">Continue exploring</p>
              <Link
                to="/products"
                className="link-slide min-h-7 text-[13.5px] font-semibold text-brand-700"
              >
                All products &amp; solutions
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2" step={0.09}>
            {Object.values(categoryByKey)
              .filter((c) => c.key !== key)
              .map((c, i) => (
                <StaggerItem
                  key={c.key}
                  direction={i === 0 ? 'from-left' : 'from-right'}
                  className="h-full"
                >
                  <TiltCard className="h-full" max={6} lift={6}>
                    <Link
                      to={c.path}
                      className="flex h-full overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e1 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e4"
                    >
                      <div className="relative w-32 shrink-0 overflow-hidden sm:w-40">
                        <Img
                          src={c.cardImage.src}
                          alt=""
                          sizes="160px"
                          className="absolute inset-0 size-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-110"
                        />
                      </div>

                      <Layer z={18} className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
                        <span className="block font-display text-lg leading-tight font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                          {c.name}
                        </span>
                        <span className="mono-label mt-2 block text-brand-600">{c.tagline}</span>
                        <span className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-steel-600">
                          {c.summary}
                        </span>
                        <span className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-brand-700">
                          Explore
                          <ArrowUpRight
                            className="size-3.5 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Layer>
                    </Link>
                  </TiltCard>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
