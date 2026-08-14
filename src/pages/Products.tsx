import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Seo, breadcrumbSchema, itemListSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Btn, Glow, GridBackdrop, Img, cutoutFor } from '../components/ui'
import { TiltCard, Layer } from '../components/ui/TiltCard'
import { ImageReveal } from '../components/fx'
import { Reveal, rowDirection, Stagger, StaggerItem } from '../lib/motion'
import { categories, productsByCategory } from '../data/categories'
import type { Category } from '../data/types'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
]

/**
 * A sub-family, as a button into the filtered category.
 *
 * Where the sub-family is a real product group the card carries its count and
 * links to `?group=`, which the category page reads to open pre-filtered. Where
 * it is only an editorial grouping — automation lists four, but every panel
 * sits in one product group — there is no filter to apply, so the card leads to
 * the category itself and says "Explore" rather than promising a count it
 * cannot deliver.
 */
function GroupButton({
  cat,
  group,
  count,
  index,
}: {
  cat: Category
  group: { name: string; blurb: string }
  count: number
  index: number
}) {
  const filtered = count > 0
  const href = filtered
    ? `${cat.path}?group=${encodeURIComponent(group.name)}`
    : cat.path

  return (
    <StaggerItem direction={rowDirection(index % 4, 4)} className="h-full">
      <TiltCard className="h-full" max={7} lift={5} radius="rounded-xl">
        <Link
          to={href}
          aria-label={
            filtered
              ? `${group.name} — ${count} ${count === 1 ? 'product' : 'products'} in ${cat.name}`
              : `${group.name} — explore ${cat.name}`
          }
          className="relative flex h-full flex-col overflow-hidden rounded-xl border border-steel-150 bg-white p-3.5 shadow-e1 transition-all duration-500 group-hover:border-brand-200 group-hover:shadow-e3"
        >
          <Layer z={16} className="flex flex-1 flex-col">
            <span className="text-[13.5px] font-semibold text-ink-900 transition-colors duration-400 group-hover:text-brand-700">
              {group.name}
            </span>
            <span className="mt-1.5 text-[12.5px] leading-snug text-steel-500">
              {group.blurb}
            </span>

            <span className="mt-auto flex items-center justify-between gap-2 pt-3.5">
              <span className="mono-label text-steel-400 transition-colors duration-400 group-hover:text-brand-600">
                {filtered ? `${count} ${count === 1 ? 'product' : 'products'}` : 'Explore'}
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-all duration-400 ease-out-expo group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand">
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Layer>
          <span aria-hidden="true" className="sheen" />
        </Link>
      </TiltCard>
    </StaggerItem>
  )
}

export default function Products() {
  const total = categories.reduce((n, c) => n + productsByCategory[c.key].length, 0)

  return (
    <>
      <Seo
        title="Products & Solutions — Valves, Automation, Water Treatment | KONIN"
        description={`Explore KONIN's ${total} products and solutions across three categories: industrial valves, electrical automation solutions and water treatment solutions.`}
        path="/products"
        schema={[
          breadcrumbSchema(TRAIL),
          itemListSchema(
            categories.map((c) => ({ name: c.name, path: c.path })),
            'KONIN product and solution categories'
          ),
        ]}
      />

      <PageHero
        eyebrow="Products & Solutions"
        title="Three categories, one engineering partner"
        lead={`${total} products and solutions — from a 6 mm instrument needle valve to a 1800 mm double flanged butterfly valve.`}
        image="/img/company/plant-3.webp"
        imageAlt=""
      />

      {/* ---------------- Category chapters ----------------
          Each chapter is a picture and its copy side by side, alternating so the
          eye is handed across the page, and then the sub-families run the full
          width beneath.

          The sub-families used to sit inside the copy column. Valves has nine of
          them, which stacked into five rows of a half-width grid and left the
          copy column far taller than the picture beside it — a column of white
          the height of the picture, every chapter. Full width, they are four
          across, the two columns finish together, and each card has the room to
          carry a count and read as the button it now is. */}
      <section className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <Glow className="top-1/4 -left-40" size="42rem" intensity={0.13} drift />
        <Glow className="right-0 bottom-0" color="aqua" size="36rem" intensity={0.12} />

        <div className="relative container-k space-y-14 lg:space-y-16">
          {categories.map((cat, i) => {
            const flip = i % 2 === 1
            const cut = cutoutFor(cat.cardImage.src)
            const products = productsByCategory[cat.key]

            // How many products actually sit under each sub-family name. A name
            // with no products behind it is an editorial grouping, not a filter.
            const counts = new Map<string, number>()
            for (const p of products) counts.set(p.group, (counts.get(p.group) ?? 0) + 1)

            return (
              /* One chapter, one screenful.
                 `min-h`, not `h`: the tallest chapter is sized below to fit
                 inside 80vh on a normal laptop, but a short viewport — a
                 landscape phone, a 720 px window — would otherwise have to clip
                 nine sub-families to obey a fixed height. As a floor the
                 chapter simply grows on those screens instead, and everywhere
                 else it centres inside its screenful. */
              <article
                key={cat.key}
                className="lg:flex lg:min-h-[80vh] lg:flex-col lg:justify-center"
              >
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                  {/* ---- Visual ---- */}
                  <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
                    <TiltCard max={6} lift={8} radius="rounded-3xl">
                      <ImageReveal
                        direction={flip ? 'right' : 'left'}
                        className="relative rounded-3xl border border-steel-150 bg-white shadow-e4"
                      >
                        {/* 3:2 rather than 4:3. At 4:3 the picture alone was
                            close to 400 px in a 5-column well, which put the
                            chapter over its screenful before the sub-families
                            were counted. */}
                        {cut ? (
                          <span className="product-stage flex aspect-3/2 items-center justify-center p-10">
                            <Img
                              src={cut}
                              alt={cat.cardImage.alt}
                              sizes="(max-width: 1024px) 92vw, 40vw"
                              className="max-h-full w-auto object-contain drop-shadow-[0_22px_30px_rgba(10,23,37,0.24)] transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                            />
                          </span>
                        ) : (
                          <Img
                            src={cat.cardImage.src}
                            alt={cat.cardImage.alt}
                            sizes="(max-width: 1024px) 92vw, 40vw"
                            className="aspect-3/2 w-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                          />
                        )}
                        <span aria-hidden="true" className="sheen" />
                      </ImageReveal>
                    </TiltCard>
                  </div>

                  {/* ---- Copy ---- */}
                  <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
                    <Reveal direction={flip ? 'right' : 'left'}>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                        <p className="eyebrow">{cat.tagline}</p>
                        <span className="mono-label text-steel-400">
                          {cat.index} / {String(categories.length).padStart(2, '0')}
                        </span>
                      </div>
                      <h2 className="h-section mt-4 text-ink-900">{cat.name}</h2>
                      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-steel-600">
                        {cat.description.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </Reveal>

                    {/* The two figures that say how big the chapter is, on the
                        rule that separates the copy from its action. */}
                    <Reveal direction={flip ? 'right' : 'left'} delay={0.12}>
                      <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-steel-200 pt-5">
                        <div>
                          <span className="block font-display text-3xl leading-none font-bold text-gradient">
                            {products.length}
                          </span>
                          <span className="mono-label mt-2.5 block text-steel-500">
                            Products
                          </span>
                        </div>
                        <div>
                          <span className="block font-display text-3xl leading-none font-bold text-gradient">
                            {cat.groups.length}
                          </span>
                          <span className="mono-label mt-2.5 block text-steel-500">
                            Sub-families
                          </span>
                        </div>
                        <div className="ml-auto">
                          <Btn to={cat.path} variant="primary">
                            Explore {cat.shortName}
                          </Btn>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* ---- Sub-families, full width ---- */}
                {/* The grid widens with the count rather than being fixed at
                    four. Valves has nine sub-families, which at four across is
                    three rows and puts the chapter over its screenful; at five
                    it is two rows and fits. The four-family categories keep the
                    wider cards, which their longer blurbs need. */}
                <Stagger
                  className={`mt-6 grid gap-3 sm:grid-cols-2 lg:mt-7 ${
                    cat.groups.length > 8
                      ? 'lg:grid-cols-4 xl:grid-cols-5'
                      : 'lg:grid-cols-3 xl:grid-cols-4'
                  }`}
                  step={0.05}
                >
                  {cat.groups.map((g, gi) => (
                    <GroupButton
                      key={g.name}
                      cat={cat}
                      group={g}
                      count={counts.get(g.name) ?? 0}
                      index={gi}
                    />
                  ))}
                </Stagger>
              </article>
            )
          })}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
