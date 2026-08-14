import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { automationDivision } from '../../data/company'
import { automationProducts } from '../../data/automation'
import { Btn, Chip, Eyebrow, GridBackdrop, Glow, Img } from '../../components/ui'
import { EASE, LineReveal, Reveal, Stagger, StaggerItem } from '../../lib/motion'

/**
 * The four families the eleven KONIN panels fall into. Names and membership
 * follow `categories.ts`; every panel referenced below exists in
 * `automation.ts`, so the links can never point at a page that is not built.
 */
const CHAPTERS = [
  {
    id: 'power',
    n: '01',
    title: 'Power & distribution',
    body: 'Incoming supply, main protection and metering, then distribution onward to the boards that feed the plant.',
    image: '/img/automation/power-control-center.webp',
    alt: 'KONIN power control centre panel with metering and indication',
    panels: ['power-control-center', 'sub-distribution-panel', 'lighting-distribution-board'],
  },
  {
    id: 'motor',
    n: '02',
    title: 'Motor control',
    body: 'Starting, protection and isolation for every motor on site, compartmentalised so one feeder can be worked on without stopping the rest.',
    image: '/img/automation/motor-control-center.webp',
    alt: 'KONIN motor control centre with individual starter modules',
    panels: ['motor-control-center', 'fcma-soft-starter-panel', 'autotransformer-starter-panel'],
  },
  {
    id: 'drives',
    n: '03',
    title: 'Drives & control',
    body: 'Speed control, power factor correction and the programmable logic that sequences the process.',
    image: '/img/automation/programmable-logic-controller.webp',
    alt: 'KONIN programmable logic controller panel',
    panels: ['variable-frequency-drive-panel', 'plc-panel', 'automatic-power-factor-control'],
  },
  {
    id: 'service',
    n: '04',
    title: 'Engineering & service',
    body: automationDivision.panelBuilderNote,
    image: '/img/automation/panel-engineering-team.webp',
    alt: 'The KONIN panel engineering team at work on a control panel build',
    panels: ['plc-programming', 'panel-service-amc'],
  },
] as const

const byslug = Object.fromEntries(automationProducts.map((p) => [p.slug, p]))

/**
 * Automation, told as a sequence.
 *
 * The picture is pinned while the four chapters scroll past it, so the section
 * reads as one continuous explanation of how a plant is wired rather than as
 * eleven interchangeable product tiles. Below `lg` the pin is dropped and each
 * chapter simply carries its own picture, because a sticky pane inside a narrow
 * column has nothing to be sticky against.
 */
export default function AutomationStory() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // The chapter closest to the middle of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const i = els.indexOf(visible.target as HTMLDivElement)
        if (i >= 0) setActive(i)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = CHAPTERS[active]

  return (
    <section
      aria-labelledby="automation-title"
      /*
        `overflow-x-clip`, NOT `overflow-hidden`. `overflow:hidden` on any
        ancestor makes that ancestor the sticky element's scroll container —
        and since it never scrolls, the pinned stage below silently stops
        pinning and simply sits at the top of its column. `clip` establishes no
        scroll container, so it holds the decorative glows in without breaking
        the section's whole mechanic.
      */
      className="relative overflow-x-clip bg-white section-y"
    >
      <GridBackdrop variant="fine" className="opacity-50" mask={false} />
      <Glow className="top-1/3 -left-52" color="signal" size="42rem" intensity={0.1} />

      <div className="relative container-k">
        {/* ---------------- Header ---------------- */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>02 · Automation Solutions</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="automation-title"
              className="h-section mt-5 text-ink-900"
              lines={['Panels built,', 'programmed', 'and supported.']}
              accentClassName="text-gradient"
            />
          </div>
          <div className="lg:col-span-6 lg:pt-3">
            <Reveal delay={0.1}>
              <p className="text-[15.5px] leading-relaxed text-steel-600">
                {automationDivision.intro}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {automationDivision.plcBrands.map((b) => (
                  <li key={b}>
                    <Chip>{b}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Story ---------------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Chapters */}
          <div className="lg:col-span-6">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                /* The chapter needs enough height to give the pinned stage
                   something to travel against, but the copy is centred inside
                   it rather than pinned to the top — otherwise every chapter
                   ends on a void the height of the difference. */
                className="flex flex-col justify-center border-t border-steel-150 py-9 first:border-t-0 first:pt-0 lg:min-h-120 lg:py-12"
              >
                {/* Inactive chapters recede on wide screens, where several are
                    on screen at once; on narrow screens every chapter is read
                    in turn and dimming would only make it harder to read. */}
                {/* The reveals sit on the individual pieces, NOT on this
                    wrapper: the wrapper owns the dimming that recedes an
                    inactive chapter, and an inline opacity from a reveal would
                    override that class and leave every chapter at full strength
                    for good. Nested opacities simply multiply, so a piece can
                    fade itself in underneath a dimmed parent quite happily. */}
                <div
                  className={`transition-opacity duration-700 ${
                    reduce || active === i ? 'opacity-100' : 'opacity-100 lg:opacity-45'
                  }`}
                >
                  <Stagger step={0.08} amount={0.2}>
                    <StaggerItem
                      as="span"
                      direction="from-left"
                      distance={0.5}
                      aria-hidden="true"
                      className={`block h-1 w-12 rounded-full transition-colors duration-700 ${
                        active === i ? 'bg-linear-to-r from-brand-600 to-aqua-500' : 'bg-steel-200'
                      }`}
                    />

                    <StaggerItem as="h3" direction="from-left" className="h-sub mt-6 text-ink-900">
                      {c.title}
                    </StaggerItem>
                    <StaggerItem
                      as="p"
                      direction="from-left"
                      className="mt-3.5 max-w-lg text-[15px] leading-relaxed text-steel-600"
                    >
                      {c.body}
                    </StaggerItem>

                    {/* The picture travels with the chapter on narrow screens. */}
                    <StaggerItem
                      direction="scale"
                      className="mt-7 overflow-hidden rounded-2xl border border-steel-150 shadow-e2 lg:hidden"
                    >
                      <Img
                        src={c.image}
                        alt={c.alt}
                        sizes="92vw"
                        className="aspect-4/3 w-full object-cover"
                      />
                    </StaggerItem>
                  </Stagger>

                  <Stagger
                    as="ul"
                    className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                    step={0.07}
                    amount={0.2}
                  >
                    {c.panels.map((slug) => {
                      const p = byslug[slug]
                      if (!p) return null
                      return (
                        <StaggerItem as="li" key={slug} direction="from-bottom" distance={0.5}>
                          <Link
                            to={`/products/automation-solutions/${slug}`}
                            className="group flex items-center justify-between gap-3 rounded-xl border border-steel-150 bg-steel-50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2"
                          >
                            <span className="text-[13.5px] leading-snug text-steel-600 transition-colors group-hover:text-ink-900">
                              {p.shortName ?? p.name}
                            </span>
                            <ArrowUpRight
                              className="size-3.5 shrink-0 text-steel-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600"
                              aria-hidden="true"
                            />
                          </Link>
                        </StaggerItem>
                      )
                    })}
                  </Stagger>
                </div>
              </div>
            ))}

            <Reveal direction="from-bottom" amount={0.5} className="pt-4">
              <Btn to="/products/automation-solutions" variant="outline-ink" size="lg">
                All automation solutions
              </Btn>
            </Reveal>
          </div>

          {/* Pinned stage — revealed once, on its own, because it then stays put
              for the whole section and only its contents change afterwards. */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2.5rem)]">
              {/* The reveal goes INSIDE the sticky element, never around it.
                  Sticky is measured against its containing block, and wrapping
                  it in a transformed element moves that block — the same class
                  of breakage the overflow note at the top of this file is about.
                  Height is capped against the viewport, not the column width:
                  a pane taller than the screen cannot stay pinned. */}
              <Reveal
                direction="from-right"
                amount={0.15}
                className="relative h-[min(70vh,38rem)] overflow-hidden rounded-3xl border border-steel-150 bg-steel-100 shadow-e4"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Img
                      src={current.image}
                      alt={current.alt}
                      sizes="46vw"
                      className="size-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink-900/85 via-ink-900/15 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-2xl leading-tight font-bold text-white">
                    {current.title}
                  </p>
                  <div className="mt-5 flex gap-1.5">
                    {CHAPTERS.map((c, i) => (
                      <span
                        key={c.id}
                        className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                          i === active ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
