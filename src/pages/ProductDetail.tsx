import { useState } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowRight, Check, FileText, Info } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Seo, breadcrumbSchema, productSchema } from '../components/Seo'
import { Chip, Glow, GridBackdrop, Img, cutoutFor, SectionHeading } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { PremiumProductCard } from '../components/products/PremiumProductCard'
import { Reveal, rowDirection, Stagger, StaggerItem, EASE } from '../lib/motion'
import { categoryByKey, getProduct, getRelated } from '../data/categories'
import { company } from '../data/company'
import type { CategoryKey, SpecRow } from '../data/types'
import CtaBand from '../sections/CtaBand'

/** Renders a two-column spec table, skipping the blank continuation labels. */
function SpecTable({ rows, caption }: { rows: SpecRow[]; caption: string }) {
  return (
    <div className="table-scroll overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e1">
      <table className="spec-table">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.label}-${i}`}>
              <th scope="row">{r.label.trim() || ''}</th>
              <td>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ProductDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const key = category as CategoryKey
  const cat = categoryByKey[key]
  const product = cat && slug ? getProduct(key, slug) : undefined
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  if (!cat || !product) return <Navigate to="/products" replace />

  const gallery = [product.image, ...(product.gallery ?? [])]
  const current = gallery[Math.min(active, gallery.length - 1)]
  const currentSrc = cutoutFor(current.src) ?? current.src
  const related = getRelated(key, product.slug, 3)

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: cat.shortName, path: cat.path },
    { name: product.shortName ?? product.name, path: `${cat.path}/${product.slug}` },
  ]

  const hasTables = Boolean(product.specs?.length || product.materials?.length)

  // Keep the <title> inside the ~70 char SERP limit: fall back to the short
  // product name, then drop the category segment, before allowing a truncation.
  const titleCandidates = [
    `${product.name} — ${cat.shortName} | KONIN`,
    `${product.shortName ?? product.name} — ${cat.shortName} | KONIN`,
    `${product.shortName ?? product.name} | KONIN`,
  ]
  const pageTitle = titleCandidates.find((t) => t.length <= 70) ?? titleCandidates[2]

  return (
    <>
      <Seo
        title={pageTitle}
        description={product.summary}
        path={`${cat.path}/${product.slug}`}
        image={product.image.src}
        type="product"
        schema={[
          breadcrumbSchema(trail),
          productSchema({
            name: product.name,
            description: product.summary,
            image: product.image.src,
            path: `${cat.path}/${product.slug}`,
            category: cat.name,
            standards: product.standards,
          }),
        ]}
      />

      {/* ---------------- Product hero ---------------- */}
      <section className="tone-tint relative overflow-hidden">
        <GridBackdrop className="opacity-55" />
        <Glow className="-top-40 left-1/3" size="44rem" intensity={0.14} drift />
        <Glow className="right-0 bottom-0" color="aqua" size="34rem" intensity={0.12} />

        <div className="relative container-k pt-[calc(var(--nav-h)+2.5rem)] pb-14 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Image stage */}
            <div className="lg:col-span-6">
              <TiltCard max={6} lift={6}>
                <div
                  className="product-stage anim-fade-scale relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl border border-steel-150 p-10 shadow-e4"
                  style={{ animationDelay: '80ms' }}
                >
                  <motion.div
                    key={currentSrc}
                    initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex size-full items-center justify-center"
                  >
                    <Img
                      src={currentSrc}
                      alt={current.alt}
                      priority
                      sizes="(max-width: 1024px) 92vw, 46vw"
                      className="max-h-full w-auto object-contain drop-shadow-[0_24px_32px_rgba(10,23,37,0.26)] transition-transform duration-1100 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </motion.div>

                  <span aria-hidden="true" className="sheen" />
                </div>
              </TiltCard>

              {gallery.length > 1 && (
                <Stagger className="mt-4 flex flex-wrap gap-3" step={0.06}>
                  {gallery.map((g, i) => (
                    <StaggerItem key={g.src}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Show image ${i + 1}: ${g.alt}`}
                        aria-current={i === active}
                        className={`product-stage grid size-20 grid-cols-1 grid-rows-1 place-items-center overflow-hidden rounded-xl border p-2 transition-all duration-300 ${
                          i === active
                            ? 'border-brand-500 shadow-e2 ring-2 ring-brand-500/25'
                            : 'border-steel-150 opacity-70 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-e1'
                        }`}
                      >
                        {/* Sized to the button, not to the picture. With the grid's
                            default auto row, a percentage height resolved against a
                            row that grew to fit the image, so a tall valve
                            overflowed and showed only its top; the one fixed
                            1fr row gives the image a definite box to fit inside. */}
                        <Img
                          src={cutoutFor(g.src) ?? g.src}
                          alt=""
                          sizes="80px"
                          className="size-full object-contain"
                        />
                      </button>
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </div>

            {/* Headline + facts */}
            <div className="lg:col-span-6">
              <p className="eyebrow anim-fade-up" style={{ animationDelay: '60ms' }}>
                {cat.name}
              </p>
              <h1
                className="anim-fade-up mt-5 font-display text-[clamp(2rem,3.8vw,3.1rem)] leading-[1] font-bold tracking-tight text-ink-900"
                style={{ animationDelay: '130ms' }}
              >
                {product.name}
              </h1>
              <p className="lead anim-fade-up mt-5 text-steel-600" style={{ animationDelay: '200ms' }}>
                {product.summary}
              </p>

              {product.quickFacts && product.quickFacts.length > 0 && (
                <dl
                  className="anim-fade-up mt-7 grid gap-2.5 sm:grid-cols-3"
                  style={{ animationDelay: '270ms' }}
                >
                  {product.quickFacts.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl border border-steel-150 bg-white p-4 shadow-e1 transition-all duration-400 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-e2"
                    >
                      <dt className="text-[10px] tracking-[0.14em] text-steel-400 uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-2.5 text-[14.5px] leading-snug font-semibold text-ink-900">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="anim-fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: '340ms' }}>
                <Link to="/contact" className="btn btn-primary btn-lg group">
                  Request a quote
                  <ArrowRight
                    className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href={`mailto:${company.emails[0]}?subject=${encodeURIComponent(
                    `Enquiry: ${product.name}`
                  )}`}
                  className="btn btn-outline-ink btn-lg"
                >
                  Email an enquiry
                </a>
              </div>

              {product.standards && product.standards.length > 0 && (
                <div
                  className="anim-fade-up mt-7 border-t border-steel-200 pt-6"
                  style={{ animationDelay: '410ms' }}
                >
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-steel-400 uppercase">
                    Manufactured &amp; tested to
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {product.standards.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Overview / features / specs ---------------- */}
      <section className="bg-white section-y">
        <div className="container-k">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left: narrative */}
            <div className="lg:col-span-7">
              {product.overview && product.overview.length > 0 && (
                <Reveal direction="from-left">
                  <h2 className="h-sub text-ink-900">
                    {key === 'automation-solutions' ? 'What it is' : 'Overview'}
                  </h2>
                  <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-steel-600">
                    {product.overview.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mt-12">
                  <Reveal direction="from-left">
                    <h2 className="h-sub text-ink-900">Features</h2>
                  </Reveal>
                  <Stagger as="ul" className="mt-5 grid gap-2.5 sm:grid-cols-2" step={0.06}>
                    {product.features.map((f) => (
                      <StaggerItem
                        as="li"
                        key={f}
                        direction="right"
                        className="flex items-start gap-3.5 rounded-xl border border-steel-150 bg-steel-50 p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                          <Check className="size-3" aria-hidden="true" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] leading-relaxed text-steel-600">{f}</span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              )}

              {product.applications && product.applications.length > 0 && (
                <div className="mt-12">
                  <Reveal direction="from-left">
                    <h2 className="h-sub text-ink-900">Applications</h2>
                  </Reveal>
                  <Stagger as="ul" className="mt-5 flex flex-wrap gap-2" step={0.04}>
                    {product.applications.map((a) => (
                      <StaggerItem key={a} as="li" direction="scale">
                        <Chip>{a}</Chip>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              )}
            </div>

            {/* Right: specification tables.
                `min-w-0` matters here: a grid item defaults to `min-width:auto`,
                so without it the wide spec table stretches the column instead of
                scrolling inside its own wrapper, and pushes the page sideways. */}
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                {product.specs && product.specs.length > 0 && (
                  <Reveal direction="from-right">
                    <h2 className="mono-label text-brand-700">Technical specifications</h2>
                    <div className="mt-4">
                      <SpecTable
                        rows={product.specs}
                        caption={`${product.name} technical specifications`}
                      />
                    </div>
                  </Reveal>
                )}

                {product.materials && product.materials.length > 0 && (
                  <Reveal direction="from-right" delay={0.1}>
                    <h2 className="mono-label mt-8 text-brand-700">Materials of construction</h2>
                    <div className="mt-4">
                      <SpecTable
                        rows={product.materials}
                        caption={`${product.name} materials of construction`}
                      />
                    </div>
                  </Reveal>
                )}

                {/* Where KONIN publishes no ratings for an item, the sidebar
                    carries an enquiry card instead of an empty column. */}
                {!hasTables && (
                  <Reveal direction="from-right">
                    <div className="overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2">
                      <div className="border-b border-steel-150 bg-linear-to-br from-brand-50 to-white px-6 py-6">
                        <h2 className="h-card text-ink-900">Specification on enquiry</h2>
                        <p className="mt-3 text-[13.5px] leading-relaxed text-steel-600">
                          Panel ratings, enclosure class, busbar sizing and schematics are prepared
                          against your load list and site conditions.
                        </p>
                      </div>
                      <ul className="divide-y divide-steel-150">
                        {[
                          'Load list and rating requirement',
                          'Enclosure type, IP class and mounting',
                          'Control philosophy and interlocks',
                          'Preferred component brands',
                        ].map((i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 px-6 py-3.5 text-[13.5px] text-steel-600"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 size-1.5 shrink-0 rotate-45 rounded-[1px] bg-signal-500"
                            />
                            {i}
                          </li>
                        ))}
                      </ul>
                      <div className="p-6">
                        <Link to="/contact" className="btn btn-primary w-full">
                          Request a specification
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Honest provenance / gap note */}
                <Reveal direction="from-right" delay={0.15}>
                  <div className="mt-6 flex gap-3.5 rounded-xl border border-brand-100 bg-brand-50 p-4">
                    <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <p className="text-[12.5px] leading-relaxed text-brand-900">
                      {hasTables
                        ? 'Specifications are published by KONIN. Confirm the final selection against your line conditions with our engineering team.'
                        : 'KONIN does not publish fixed ratings for this item — each build is engineered to the application.'}
                    </p>
                  </div>
                </Reveal>

                <Reveal direction="from-right" delay={0.2}>
                  <Link
                    to="/quality"
                    className="link-slide mt-6 inline-flex min-h-6 items-center text-[13.5px] font-semibold text-brand-700"
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    Quality, testing &amp; certifications
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Related ---------------- */}
      {related.length > 0 && (
        <section className="tone-tint-deep section-y">
          <div className="container-k">
            <Reveal>
              <SectionHeading eyebrow="Related products" title={<>More from {cat.name}</>} />
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={0.08}>
              {related.map((p, i) => (
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
        </section>
      )}

      <CtaBand
        titleLines={['Need this valve', 'for your line?']}
        lead={`Send the line size, pressure class, media and temperature and our engineering team will confirm the ${
          product.shortName ?? product.name
        } selection and quote it.`}
      />
    </>
  )
}
