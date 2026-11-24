import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories, productsByCategory } from '../../data/categories'
import type { CategoryKey } from '../../data/types'
import { Img, Eyebrow, Glow, cutoutFor } from '../../components/ui'
import { TiltCard, Layer } from '../../components/ui/TiltCard'
import { LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../../lib/motion'

/**
 * The picture a panel leads with, where the category's own card image is not
 * the right one for a full-bleed well.
 *
 * Every KONIN control-panel photograph is a studio shot cut out on black, which
 * drops a black slab between two light cards. The engineering team at work is
 * the one automation image that is a lit scene, and it is the better picture
 * anyway — it shows the division rather than its output.
 *
 * Water carries no override. Everything under /img/water is a supplier
 * schematic, a network diagram or a photo collage — legible at full page width
 * and unreadable in a 288 px well, where it reads as visual noise rather than
 * as a picture of anything. The category's own card image, an aerial of a
 * treatment works, is the honest photograph and the only one here that survives
 * the crop.
 */
const VISUALS: Partial<Record<CategoryKey, { src: string; alt: string }>> = {
  'automation-solutions': {
    src: '/img/automation/panel-engineering-team.webp',
    alt: 'The KONIN engineering team building an electrical control panel',
  },
}

/**
 * The three capabilities, as 3D panels.
 *
 * Each panel is a tilt surface: the picture sits on its own plane, the copy is
 * pushed forward on the card's Z axis, and the whole thing leans toward the
 * pointer. All three picture wells are the same height and the cards stretch to
 * match, so the row reads as one set rather than as a stepped skyline.
 */
export default function CapabilityPanels() {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="tone-tint relative overflow-hidden section-y"
    >
      <Glow className="-top-52 left-1/4" size="52rem" intensity={0.14} drift />
      <Glow className="-right-40 bottom-0" color="aqua" size="40rem" intensity={0.12} />

      <div className="relative container-k">
        {/* Centred: with the supporting paragraph gone, a left-aligned headline
            left the whole right half of the row empty. */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            id="capabilities-title"
            className="h-section mt-5 text-ink-900"
            lines={['Three capabilities.', 'One engineering partner.']}
            accentClassName="text-gradient"
          />
        </div>

        {/* ---------------- Panels ---------------- */}
        <Stagger
          className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3"
          step={0.12}
          amount={0.05}
        >
          {categories.map((cat, i) => {
            const count = productsByCategory[cat.key].length
            const cut = cutoutFor(cat.cardImage.src)
            const visual = VISUALS[cat.key]

            return (
              <StaggerItem
                key={cat.key}
                direction={rowDirection(i, categories.length)}
                className={`h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <TiltCard className="h-full" max={5} lift={8} radius="rounded-3xl">
                  <Link
                    to={cat.path}
                    aria-label={`${cat.name}: ${count} products`}
                    className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e5"
                  >
                    {/* Brand edge that draws across the head of the card */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-linear-to-r from-brand-600 to-aqua-400 transition-transform duration-600 ease-out-expo group-hover:scale-x-100"
                    />

                    {/* ---- Visual ----
                        One fixed height for all three wells: the source images
                        have different aspect ratios, so anything driven by the
                        picture itself would step the row. */}
                    <div className="relative h-64 shrink-0 overflow-hidden lg:h-72">
                      {cut ? (
                        <span className="product-stage absolute inset-0 flex items-center justify-center p-8">
                          <Img
                            src={cut}
                            alt={cat.cardImage.alt}
                            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
                            className="max-h-full w-auto object-contain drop-shadow-[0_20px_28px_rgba(10,23,37,0.22)] transition-transform duration-1100 ease-out-expo group-hover:scale-[1.07]"
                          />
                        </span>
                      ) : (
                        <Img
                          src={visual?.src ?? cat.cardImage.src}
                          alt={visual?.alt ?? cat.cardImage.alt}
                          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
                          className="absolute inset-0 size-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-[1.06]"
                        />
                      )}
                    </div>

                    {/* ---- Copy ---- */}
                    <Layer z={28} className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="h-sub text-ink-900 transition-colors duration-400 group-hover:text-brand-700">
                        {cat.name}
                      </h3>
                      <p className="mono-label mt-3 text-brand-600">{cat.tagline}</p>
                      <p className="mt-4 text-[14px] leading-relaxed text-steel-600">
                        {cat.summary}
                      </p>

                      {/* The action sits on its own rule, so it reads as the
                          foot of the card rather than as another paragraph. */}
                      <span className="mt-auto flex items-center justify-between gap-3 border-t border-steel-150 pt-5">
                        <span className="text-[13.5px] font-semibold text-brand-700">
                          Explore {cat.shortName}
                        </span>
                        <span className="grid size-9 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-all duration-400 ease-out-expo group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand">
                          <ArrowUpRight
                            className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Layer>
                  </Link>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
