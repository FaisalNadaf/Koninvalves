import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { company } from '../../data/company'
import { categories } from '../../data/categories'
import type { CategoryKey } from '../../data/types'
import { Btn, Eyebrow, Glow, GridBackdrop, Img } from '../../components/ui'
import { Counter } from '../../components/fx'
import { LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../../lib/motion'

/**
 * Who KONIN is — told across all three divisions, not just the valves.
 *
 * "Under one roof" is a claim about breadth, so the three divisions are shown
 * together rather than cycled: a stack of slanted bands, each one a division,
 * sliding in from the right in sequence. The skew is what stops three stacked
 * photographs reading as a plain list, and it is carried on the whole stack so
 * the gaps between the bands slant with them.
 */

/**
 * One scene per division.
 *
 * These are cropped to a narrow upright panel, so they have to be photographs
 * that hold up at roughly a third of their width: real scenes with colour and
 * depth. The catalogue's studio shots are the wrong choice here — they are
 * lit on white or on black, and at this size they collapse into a flat block.
 */
const VISUALS: Record<CategoryKey, { src: string; alt: string; position: string }> = {
  valves: {
    src: '/img/industries/oilgas.webp',
    alt: 'Process pipework of the kind KONIN valves are specified for',
    position: 'center',
  },
  'automation-solutions': {
    // The engineering-team shot leads the automation panel further up the page;
    // a plant is the honest alternative here and keeps the two from repeating.
    src: '/img/industries/thermalpower.webp',
    alt: 'A power plant of the kind KONIN control panels run',
    position: 'center',
  },
  'water-treatment-solutions': {
    // Same reasoning as automation above: the treatment works now leads the
    // water panel further up the page, so this one takes the other half of the
    // division's scope. Dam automation and canal management are KONIN water
    // solutions in their own right, so a spillway is not a stand-in here.
    src: '/img/industries/hydropower.webp',
    alt: 'A spillway dam of the kind KONIN automates',
    position: 'center',
  },
}

/** The slant, in degrees. Carried on the stack and undone on the copy. */
const SKEW = 3

export default function OneRoof() {
  return (
    /* Held to 80vh and vertically centred, so the section is one screenful
       rather than a tall band with air above and below the content. */
    <section
      aria-labelledby="oneroof-title"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-white py-14 sm:py-16"
    >
      <GridBackdrop variant="fine" className="opacity-60" mask={false} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-canvas to-transparent"
      />
      <Glow className="-top-40 -right-32" size="44rem" intensity={0.12} drift />
      <Glow className="bottom-0 -left-40" color="aqua" size="34rem" intensity={0.1} />

      <div className="relative container-k w-full">
        {/* `gap` on a twelve-column grid is the *column* gutter, so it is paid
            eleven times over: at gap-14 that was 616 px of the row spent on
            gutters, and skipping a column on top of it opened a ~300 px channel
            of empty page down the middle. Six and six, with the gutter set
            separately from the row gap, closes it. */}
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          {/* ---------------- Opening statement ----------------
              Six columns against the stack's five leaves a single column of
              gutter between them; at five and five the two blocks sat either
              side of a channel of empty page. */}
          <div className="lg:col-span-6">
            <Reveal direction="from-left">
              <Eyebrow>About KONIN</Eyebrow>
            </Reveal>
            {/* Two lines, not three. Three short ones left most of the column
                empty to the right of the headline and made the block far taller
                than it needed to be. The size is stepped down from the global
                `h-display` scale so the longer first line still clears the
                column at 1024–1440, where it was closest to overflowing. */}
            <LineReveal
              as="h2"
              className="h-display mt-5 text-[clamp(2.2rem,4.4vw,3.75rem)] text-ink-900"
              lines={['Complete flow control', 'under one roof.']}
              accentClassName="text-gradient"
            />

            <Reveal direction="from-left" delay={0.15}>
              {/* A short brand rule closes the headline and starts the body —
                  the block had nothing between the two but a margin. */}
              <span
                aria-hidden="true"
                className="mt-6 block h-1 w-16 rounded-full bg-linear-to-r from-brand-600 to-aqua-400"
              />
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-steel-600">
                {company.positioning}
              </p>
            </Reveal>

            {/* Published figures, as surfaces rather than loose numerals: bare
                figures on white read as a caption under the paragraph, which is
                why this column looked unfinished next to the card stack. */}
            {/* Full column width, so the tiles — not a capped paragraph — set
                the right edge of this half of the row. */}
            <Stagger as="dl" className="mt-8 grid grid-cols-3 gap-3" step={0.09}>
              {company.highlights.slice(0, 3).map((h, i) => (
                <StaggerItem
                  key={h.label}
                  direction={rowDirection(i, 3)}
                  className="group rounded-xl border border-steel-150 bg-steel-50 p-4 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2"
                >
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <Counter
                      value={h.value}
                      className="block font-display text-[1.625rem] leading-none font-bold text-brand-800 tabular-nums"
                    />
                    <span className="mt-2 block text-[11px] leading-tight text-steel-500">
                      {h.label}
                    </span>
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal direction="from-bottom" delay={0.2}>
              <div className="mt-8">
                <Btn to="/about" variant="primary" size="lg">
                  About KONIN
                </Btn>
              </div>
            </Reveal>
          </div>

          {/* ---------------- The three divisions, as a slanted stack ----------------
              The skew sits on the wrapper rather than on each band, so the gaps
              between them slant too and the stack reads as one cut sheet. The
              vertical padding is the room the slanted corners need; without it
              they clip against the section edges. */}
          <div className="lg:col-span-6" style={{ transform: `skewY(-${SKEW}deg)` }}>
            <Stagger className="space-y-3.5 py-5" step={0.14} amount={0.1}>
              {categories.map((cat) => {
                const visual = VISUALS[cat.key]
                return (
                  <StaggerItem key={cat.key} direction="left">
                    <Link
                      to={cat.path}
                      aria-label={`${cat.name}: ${cat.tagline}`}
                      className="group relative flex h-28 overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-e4 sm:h-32 lg:h-38"
                    >
                      {/* Brand edge that draws down the leading side on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 z-10 w-1 origin-top scale-y-0 bg-linear-to-b from-brand-600 to-aqua-400 transition-transform duration-600 ease-out-expo group-hover:scale-y-100"
                      />

                      {/* Copy is counter-skewed so it reads level inside a
                          slanted band. */}
                      {/* The tagline carries the description now: at this size a
                          summary paragraph forced the card to twice the height
                          for copy that the category page states properly. */}
                      <div
                        className="flex min-w-0 flex-1 flex-col justify-center px-5 sm:px-6"
                        style={{ transform: `skewY(${SKEW}deg)` }}
                      >
                        <h3 className="flex items-center gap-2 font-display text-lg leading-tight font-bold text-ink-900 transition-colors duration-400 group-hover:text-brand-700 sm:text-xl">
                          {cat.name}
                          <ArrowUpRight
                            className="size-4 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-400 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </h3>
                        <p className="mono-label mt-2 text-brand-600">{cat.tagline}</p>
                      </div>

                      {/* The photograph keeps the band's slant — that cut edge
                          is the whole point of the stack. It meets the copy on a
                          clean cut rather than under a fade. */}
                      {/* Sized as a share of the card, not a fixed strip: at a
                          fixed 10rem a 650 px card left a band of empty white
                          between the tagline and the photograph. */}
                      <div className="relative w-2/5 max-w-64 shrink-0 overflow-hidden">
                        <Img
                          src={visual.src}
                          alt={visual.alt}
                          sizes="(max-width: 1024px) 34vw, 16rem"
                          className="absolute inset-0 size-full scale-110 object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-[1.18]"
                          style={{ objectPosition: visual.position }}
                        />
                      </div>
                    </Link>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </div>

        <h2 id="oneroof-title" className="sr-only">
          About KONIN Valves
        </h2>
      </div>
    </section>
  )
}
