import { motion, type Variants } from 'framer-motion'
import { Eye, Target, Gem } from 'lucide-react'
import { Seo, breadcrumbSchema, organizationSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Img, SectionHeading, GridBackdrop, CornerTicks, Eyebrow, Glow } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { Counter, ImageReveal, Marquee } from '../components/fx'
import { EASE, LineReveal, Reveal, Stagger, StaggerItem } from '../lib/motion'
import { company } from '../data/company'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

/* ------------------------------------------------------------------ */
/* Vision / mission / values — the three angled panels                 */
/* ------------------------------------------------------------------ */

const PANEL_VIEWPORT = { once: true, margin: '0px 0px -80px 0px' } as const

/** Each line inside a panel rises after the panel itself has landed. */
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/**
 * A panel slides in from its own side — the outer two from the edges of the
 * page, the middle one down from above — then releases its own lines. The
 * offsets are large on purpose: at a card's usual 40 px the interlock reads as
 * three boxes settling, rather than as one sheet closing up.
 */
function panelVariants(x: number, y: number): Variants {
  return {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: EASE,
        when: 'beforeChildren',
        delayChildren: 0.25,
        staggerChildren: 0.1,
      },
    },
  }
}

export default function About() {
  return (
    <>
      <Seo
        title="About KONIN Valves — ISO 9001:2015 Valve Manufacturer"
        description="KONIN Valves is an ISO 9001:2015 certified manufacturer and supplier of industrial valves in Belagavi, Karnataka, providing complete flow control solutions."
        path="/about"
        image="/img/company/about.webp"
        schema={[
          breadcrumbSchema(TRAIL),
          organizationSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About KONIN Valves',
            url: 'https://www.koninvalve.com/about',
            about: { '@id': 'https://www.koninvalve.com/#organization' },
          },
        ]}
      />

      <PageHero
        eyebrow="About KONIN"
        title="Where perfection and precision need"
        lead="An ISO 9001:2015 certified manufacturer and supplier of industrial valves, delivering complete flow control under one roof."
        image="/img/company/plant-1.webp"
        imageAlt=""
      />

      {/* ---------------- The company ---------------- */}
      <section className="relative overflow-hidden bg-white section-y">
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <div className="relative container-k">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal direction="from-left">
                <Eyebrow>The company</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                className="h-section mt-5 text-ink-900"
                lines={['A complete flow control', 'solution, under one roof.']}
                accentClassName="text-gradient"
              />
              <Reveal direction="from-left" delay={0.1}>
                <div className="mt-7 space-y-4 text-[15.5px] leading-relaxed text-steel-600">
                  {company.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="from-left" delay={0.14}>
                <div className="mt-8 rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-7 shadow-e1">
                  <p className="eyebrow">Salient features of our products</p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-steel-600">
                    {company.salientFeatures}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <TiltCard max={6} lift={6}>
                <ImageReveal
                  direction="left"
                  className="relative rounded-3xl border border-steel-150 bg-white shadow-e4"
                >
                  <Img
                    src="/img/company/about.webp"
                    alt="The KONIN Valves product range — butterfly, gate, ball, globe and check valves"
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="aspect-4/3 w-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                  />
                  <CornerTicks />
                  <span aria-hidden="true" className="sheen" />
                </ImageReveal>
              </TiltCard>

              <Stagger as="dl" className="mt-4 grid gap-3" step={0.08}>
                {company.highlights.map((h) => (
                  <StaggerItem key={h.label} direction="from-right">
                    <div className="group rounded-2xl border border-steel-150 bg-steel-50 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2">
                      <div className="flex items-baseline gap-4">
                        <dt className="sr-only">{h.label}</dt>
                        <dd className="contents">
                          <Counter
                            value={h.value}
                            className="font-display text-2xl leading-none font-bold text-brand-700 tabular-nums"
                          />
                          <p className="text-[13.5px] font-semibold text-ink-900">{h.label}</p>
                        </dd>
                      </div>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-steel-500">
                        {h.detail}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Vision / Mission / Values ---------------- */}
      <section className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop />
        <Glow className="-top-40 left-1/3" size="44rem" intensity={0.14} drift />

        <div className="relative container-k">
          <Reveal>
            <SectionHeading eyebrow="What drives us" align="center" title="Vision, mission and values" />
          </Reveal>
        </div>

        {/* ---------------- Three angled panels ----------------
            The outer two have their inner-top corners clipped so they flare
            outward at the foot; the middle one narrows toward its foot. The
            three then interlock, which is what makes the row read as one cut
            sheet rather than as three cards in a grid.

            Below `md` every clip is dropped and the panels stack as plain
            cards — an angled edge on a single-column layout is just a wonky
            box.

            The row sits in `container-k`, the same container as the heading
            above it. In its own `max-w-360` wrapper it was wider than the page
            container, so at 1440 it ran to both edges of the viewport and the
            outer two panels were cut off by the screen rather than framed by
            the page. */}
        <div className="relative container-k mt-12">
          <div className="grid items-stretch gap-4 md:grid-cols-[1.15fr_1fr_1.15fr] md:gap-0">
            {/* ---- Vision — deep brand, top-right corner clipped ---- */}
            <motion.article
              variants={panelVariants(-180, 0)}
              initial="hidden"
              whileInView="show"
              viewport={PANEL_VIEWPORT}
              className="tone-brand relative flex flex-col justify-start overflow-hidden rounded-2xl px-8 py-10 shadow-e4 md:rounded-none md:py-16 md:pr-20 md:pl-11 md:[clip-path:polygon(0_0,calc(100%_-_64px)_0,100%_100%,0_100%)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -bottom-12 size-44 rounded-full bg-aqua-400/25 blur-2xl"
              />
              <motion.span variants={lineVariants} className="relative">
                <span className="grid size-14 place-items-center rounded-2xl border border-white/25 bg-white/12 text-white backdrop-blur-sm">
                  <Eye className="size-6" aria-hidden="true" />
                </span>
              </motion.span>
              <motion.h3 variants={lineVariants} className="relative mt-7 h-sub text-white">
                Our Vision
              </motion.h3>
              <motion.p
                variants={lineVariants}
                className="relative mt-5 text-[16px] leading-relaxed text-white/85"
              >
                {company.vision}
              </motion.p>
            </motion.article>

            {/* ---- Mission — white, narrows toward its foot ----
                The outline is painted with stacked drop-shadows rather than a
                border: `clip-path` cuts a real border clean off the angled
                sides. Below `md`, where nothing is clipped, a normal border
                does the job.

                Left-aligned like its neighbours. Centred, it was the only one
                of the three whose icon, heading and copy sat on a different
                axis, which read as a mistake rather than as emphasis. */}
            <motion.article
              variants={panelVariants(0, -150)}
              initial="hidden"
              whileInView="show"
              viewport={PANEL_VIEWPORT}
              className="relative z-10 flex flex-col justify-start overflow-hidden rounded-2xl border-2 border-brand-200 bg-white px-8 py-10 shadow-e4 md:-mx-[38px] md:rounded-none md:border-0 md:px-16 md:pt-16 md:pb-16 md:shadow-none md:[clip-path:polygon(0_0,100%_0,calc(100%_-_64px)_100%,64px_100%)] md:[filter:drop-shadow(2px_0_0_rgba(30,134,214,0.85))_drop-shadow(-2px_0_0_rgba(30,134,214,0.85))_drop-shadow(0_2px_0_rgba(30,134,214,0.85))_drop-shadow(0_-2px_0_rgba(30,134,214,0.85))_drop-shadow(0_18px_34px_rgba(11,34,61,0.26))]"
            >
              <motion.span variants={lineVariants}>
                <span className="grid size-14 place-items-center rounded-2xl border border-brand-100 bg-linear-to-b from-brand-50 to-white text-brand-700 shadow-e1">
                  <Target className="size-6" aria-hidden="true" />
                </span>
              </motion.span>
              <motion.h3 variants={lineVariants} className="mt-7 h-sub text-ink-900">
                Our Mission
              </motion.h3>
              <motion.p
                variants={lineVariants}
                className="mt-5 text-[16px] leading-relaxed text-steel-600"
              >
                {company.mission}
              </motion.p>
            </motion.article>

            {/* ---- Values — tinted, top-left corner clipped (mirror of Vision) ---- */}
            <motion.article
              variants={panelVariants(180, 0)}
              initial="hidden"
              whileInView="show"
              viewport={PANEL_VIEWPORT}
              className="relative flex flex-col justify-start overflow-hidden rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 via-white to-aqua-50 px-8 py-10 shadow-e3 md:rounded-none md:border-0 md:py-16 md:pr-11 md:pl-20 md:[clip-path:polygon(64px_0,100%_0,100%_100%,0_100%)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 -left-12 size-44 rounded-full bg-signal-400/15 blur-2xl"
              />
              <motion.span variants={lineVariants} className="relative">
                <span className="grid size-14 place-items-center rounded-2xl border border-signal-100 bg-linear-to-b from-signal-50 to-white text-signal-600 shadow-e1">
                  <Gem className="size-6" aria-hidden="true" />
                </span>
              </motion.span>
              <motion.h3 variants={lineVariants} className="relative mt-7 h-sub text-ink-900">
                Our Values
              </motion.h3>
              {/* One size for all three panels. The list used to run at 15.5 px
                  against 17 px in its neighbours, so the same rank of copy
                  changed size across the row. */}
              <motion.ul variants={lineVariants} className="relative mt-5 space-y-2.5">
                {company.values.map((v) => (
                  <li key={v} className="flex gap-3 text-[16px] leading-relaxed text-steel-600">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rotate-45 rounded-[1px] bg-signal-500"
                    />
                    {v}
                  </li>
                ))}
              </motion.ul>
            </motion.article>
          </div>
        </div>
      </section>
                      

      {/* ---------------- Markets ---------------- */}
      <section className="tone-tint-deep border-t border-steel-150 section-y-sm">
        <div className="container-k">
          <Reveal>
            <SectionHeading
              eyebrow="Where we supply"
              title="Supplying across India"
              lead={company.marketsNote}
            />
          </Reveal>
        </div>

        {/* The states are already travelling; the band only needs to arrive. */}
        <Reveal direction="blur" amount={0.3} aria-hidden="true" className="mt-10">
          <Marquee speed={62}>
            {company.primaryStates.map((s) => (
              <span key={s} className="flex items-center gap-8 pr-8">
                <span className="font-display text-3xl leading-none font-bold whitespace-nowrap text-brand-800/20 transition-colors hover:text-brand-700 sm:text-4xl">
                  {s}
                </span>
                <span className="size-1.5 rotate-45 bg-signal-500/60" />
              </span>
            ))}
          </Marquee>
        </Reveal>
        <ul className="sr-only">
          {company.primaryStates.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  )
}
