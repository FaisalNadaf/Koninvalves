import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  BellRing,
  ChartColumn,
  Check,
  Cpu,
  Eye,
  FlaskConical,
  Gem,
  MonitorDot,
  Network,
  PanelTop,
  RadioTower,
  Settings2,
  ShieldCheck,
  Snowflake,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Seo, breadcrumbSchema, organizationSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import {
  Btn,
  Chip,
  Img,
  SectionHeading,
  GridBackdrop,
  CornerTicks,
  Eyebrow,
  Glow,
} from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { PremiumProductCard } from '../components/products/PremiumProductCard'
import { Counter, ImageReveal, Marquee } from '../components/fx'
import { EASE, LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../lib/motion'
import { automationDivision, company } from '../data/company'
import { valves } from '../data/valves'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

/**
 * The three ball valve constructions named in the product features list, shown
 * with the photographs supplied alongside the About copy.
 */
const BALL_VALVES = [
  'single-piece-ball-valves',
  'cast-steel-two-piece-ball-valves',
  'forged-three-piece-ball-valves',
]
  .map((slug) => valves.find((v) => v.slug === slug))
  .filter((v) => v !== undefined)

/**
 * One icon per automation capability, in the order
 * `automationDivision.control.capabilities` lists them. A capability added
 * without an icon falls back to a check mark rather than rendering nothing.
 */
const CONTROL_ICONS: LucideIcon[] = [
  Cpu, // PLC-based process control
  MonitorDot, // SCADA monitoring and supervisory control
  PanelTop, // Electrical & PLC control panel manufacturing
  Settings2, // Valve automation and actuator control
  Workflow, // Sequencing and interlocking
  Activity, // Real-time process monitoring
  BellRing, // Alarm and event management
  ChartColumn, // Data acquisition and visualization
  RadioTower, // Remote monitoring and operational control
  Network, // Integration of valves, instruments, sensors and field devices
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
  const { control } = automationDivision

  return (
    <>
      <Seo
        title="About KONIN Valves | ISO 9001:2015 Valve Manufacturer"
        description="KONIN Valves manufactures industrial valves to API, BIS, BS, DIN, ISO and EN standards, with PLC and SCADA automation solutions, in Belagavi, Karnataka."
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
            description: company.positioning,
            about: { '@id': 'https://www.koninvalve.com/#organization' },
          },
        ]}
      />

      <PageHero
        eyebrow="About KONIN"
        title="Where perfection and precision need"
        lead="Industrial valves, electrical control panels and PLC-SCADA automation from one ISO 9001:2015 certified manufacturer."
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
                lines={['Industrial valves and', 'integrated automation.']}
                accentClassName="text-gradient"
              />
              <Reveal direction="from-left" delay={0.1}>
                <div className="mt-7 space-y-4 text-[15.5px] leading-relaxed text-steel-600">
                  {company.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              {/* The standards and bore designs the paragraphs above name,
                  lifted out so a buyer checking for one finds it at a glance. */}
              <Reveal direction="from-left" delay={0.14}>
                <dl className="mt-8 grid gap-6 rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-7 shadow-e1 sm:grid-cols-2">
                  <div>
                    <dt className="mono-label text-brand-700">Manufactured to</dt>
                    <dd className="mt-4">
                      <ul className="flex flex-wrap gap-2">
                        {company.standards.map((s) => (
                          <li key={s}>
                            <Chip>{s}</Chip>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="mono-label text-brand-700">Bore designs</dt>
                    <dd className="mt-4">
                      <ul className="flex flex-wrap gap-2">
                        {company.boreDesigns.map((s) => (
                          <li key={s}>
                            <Chip>{s}</Chip>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
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
                    alt="The KONIN Valves product range: butterfly, gate, ball, globe and check valves"
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="aspect-4/3 w-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                  />
                  <CornerTicks />
                  <span aria-hidden="true" className="sheen" />
                </ImageReveal>
              </TiltCard>

              {/* Two by two: stacked in one column the four tiles ran the
                  right-hand column well past the copy beside it. */}
              <Stagger as="dl" className="mt-4 grid gap-3 sm:grid-cols-2" step={0.08}>
                {company.highlights.map((h) => (
                  <StaggerItem key={h.label} direction="from-right" className="h-full">
                    <div className="group h-full rounded-2xl border border-steel-150 bg-steel-50 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2">
                      <dt className="sr-only">{h.label}</dt>
                      <dd>
                        <Counter
                          value={h.value}
                          className="block font-display text-2xl leading-none font-bold text-brand-700 tabular-nums"
                        />
                        <p className="mt-2.5 text-[13.5px] leading-snug font-semibold text-ink-900">
                          {h.label}
                        </p>
                        <p className="mt-2 text-[12.5px] leading-relaxed text-steel-500">
                          {h.detail}
                        </p>
                      </dd>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Product features & configurations ---------------- */}
      <section
        aria-labelledby="features-title"
        className="tone-tint relative overflow-hidden section-y"
      >
        <GridBackdrop />
        <Glow className="-top-40 right-0" size="40rem" intensity={0.12} drift />

        <div className="relative container-k">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal direction="from-left">
                <Eyebrow>Product features &amp; configurations</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="features-title"
                className="h-section mt-5 text-ink-900"
                lines={['Configured to', 'the application.']}
                accentClassName="text-gradient"
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal direction="from-right" delay={0.1}>
                <p className="lead text-steel-600">{company.productFeatures.intro}</p>
              </Reveal>
            </div>
          </div>

          <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {company.productFeatures.items.map((f, i) => (
              <StaggerItem
                as="li"
                key={f}
                direction={rowDirection(i % 4, 4)}
                className="h-full"
              >
                {/* A row on phones, where a stacked tile spent more height on
                    its index and rule than on its one line of copy. */}
                <div className="group flex h-full items-baseline gap-4 rounded-2xl border border-steel-150 bg-white p-5 shadow-e1 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-e3 sm:flex-col sm:items-stretch sm:gap-0">
                  <span
                    aria-hidden="true"
                    className="mono-label shrink-0 text-steel-400 transition-colors duration-400 group-hover:text-brand-600"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-3 hidden h-0.5 w-8 rounded-full bg-steel-200 transition-all duration-500 ease-out-expo group-hover:w-12 group-hover:bg-linear-to-r group-hover:from-brand-600 group-hover:to-aqua-400 sm:block"
                  />
                  <p className="text-[14.5px] leading-snug font-semibold text-ink-900 sm:mt-4">{f}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* The single, two and three piece constructions, as the products
              they are — each card leads to its full specification. */}
          <div className="mt-14 lg:mt-16">
            <Reveal direction="from-left" amount={0.5}>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-steel-200 pb-4">
                <h3 className="h-sub text-ink-900">Single, two and three piece ball valves</h3>
                <Link
                  to="/products/valves?group=Ball%20Valves"
                  className="link-slide min-h-7 text-[13.5px] font-semibold text-brand-700"
                >
                  All ball valves
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={0.08}>
              {BALL_VALVES.map((p, i) => (
                <StaggerItem
                  key={p.slug}
                  direction={rowDirection(i, BALL_VALVES.length)}
                  className="h-full"
                >
                  <PremiumProductCard product={p} categoryKey="valves" compact />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ---------------- Automation & control solutions ---------------- */}
      <section
        aria-labelledby="control-title"
        className="relative overflow-hidden bg-white section-y"
      >
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <Glow className="top-1/3 -left-52" color="signal" size="42rem" intensity={0.08} />

        <div className="relative container-k">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal direction="from-left">
                <Eyebrow>Automation &amp; control solutions</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="control-title"
                className="h-section mt-5 text-ink-900"
                lines={['From a single valve', 'to a complete system.']}
                accentClassName="text-gradient"
              />
              <Reveal direction="from-left" delay={0.1}>
                <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-steel-600">
                  {control.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <div className="mt-8">
                <TiltCard max={6} lift={6}>
                  <ImageReveal
                    direction="left"
                    className="relative rounded-3xl border border-steel-150 bg-white shadow-e3"
                  >
                    <Img
                      src="/img/automation/programmable-logic-controller.webp"
                      alt="Inside a KONIN PLC control panel: controller modules, terminals and protection devices"
                      sizes="(max-width: 1024px) 92vw, 36vw"
                      className="aspect-4/3 w-full object-cover transition-transform duration-1100 ease-out-expo group-hover:scale-105"
                    />
                    <CornerTicks />
                    <span aria-hidden="true" className="sheen" />
                  </ImageReveal>
                </TiltCard>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal direction="from-right">
                <p className="mono-label text-brand-700">{control.capabilitiesIntro}</p>
              </Reveal>
              <Stagger as="ul" className="mt-5 grid gap-3 sm:grid-cols-2" step={0.05}>
                {control.capabilities.map((c, i) => {
                  const Icon = CONTROL_ICONS[i] ?? Check
                  return (
                    <StaggerItem
                      as="li"
                      key={c}
                      direction={i % 2 === 0 ? 'from-left' : 'from-right'}
                      distance={0.5}
                      className="h-full"
                    >
                      <div className="group flex h-full items-center gap-4 rounded-xl border border-steel-150 bg-steel-50 p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-brand-100 bg-white text-brand-700 shadow-e1 transition-colors duration-400 group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white">
                          <Icon className="size-4.5" aria-hidden="true" />
                        </span>
                        <span className="text-[14px] leading-snug font-medium text-ink-800">{c}</span>
                      </div>
                    </StaggerItem>
                  )
                })}
              </Stagger>

              <Reveal direction="scale" delay={0.1}>
                <div className="mt-5 rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 via-white to-aqua-50 p-7 shadow-e1">
                  <p className="mono-label text-brand-700">Integrated solutions</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-800">
                    {control.integration}
                  </p>
                  <div className="mt-6">
                    <Btn to="/products/automation-solutions" variant="outline-ink">
                      Explore automation solutions
                    </Btn>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quality & testing ---------------- */}
      <section
        aria-labelledby="quality-title"
        className="tone-tint-deep relative overflow-hidden section-y"
      >
        <GridBackdrop />
        <Glow className="-top-32 -right-32" color="aqua" size="40rem" intensity={0.12} drift />

        <div className="relative container-k">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal direction="from-left">
                <Eyebrow>Quality &amp; testing</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="quality-title"
                className="h-section mt-5 text-ink-900"
                lines={['Quality is part of', 'the process.']}
                accentClassName="text-gradient"
              />
              <Reveal direction="from-left" delay={0.1}>
                <p className="mt-6 text-[15.5px] leading-relaxed text-steel-600">
                  {company.quality.intro}
                </p>
              </Reveal>

              <Reveal direction="from-left" delay={0.14}>
                <div className="mt-6 flex gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-e1">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand-600 to-aqua-500 text-white shadow-brand">
                    <Snowflake className="size-4.5" aria-hidden="true" />
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-800">
                    {company.quality.lowTemperature}
                  </p>
                </div>
              </Reveal>

              <Reveal direction="from-bottom" delay={0.18}>
                <div className="mt-8">
                  <Btn to="/quality" variant="outline-ink" size="lg">
                    Quality &amp; certifications
                  </Btn>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal direction="from-right">
                <p className="mono-label text-brand-700">{company.quality.capabilitiesIntro}</p>
              </Reveal>
              {/* One ruled sheet rather than fourteen cards: the grid gap is
                  the hairline, so the rules stay correct at one column and at
                  two without any per-item border logic. */}
              <Stagger
                as="ol"
                className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-steel-150 bg-steel-150 shadow-e2 sm:grid-cols-2"
                step={0.035}
              >
                {company.quality.capabilities.map((c, i) => (
                  <StaggerItem
                    as="li"
                    key={c}
                    direction="fade"
                    className="group flex items-baseline gap-4 bg-white px-5 py-4 transition-colors duration-300 hover:bg-brand-25"
                  >
                    <span
                      aria-hidden="true"
                      className="mono-label w-6 shrink-0 text-steel-400 tabular-nums transition-colors duration-300 group-hover:text-brand-600"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] leading-snug text-ink-800">{c}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          {/* ---- Third-party inspection & specialized testing ---- */}
          <Stagger className="mt-12 grid gap-5 lg:grid-cols-2" step={0.1}>
            <StaggerItem as="article" direction="from-left" className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-steel-150 bg-white p-7 shadow-e2">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-linear-to-b from-brand-50 to-white text-brand-700 shadow-e1">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="h-card text-ink-900">Third-party inspection</h3>
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-steel-600">
                  {company.thirdPartyApproval}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Inspection agencies">
                  {company.inspectionAgencies.map((a) => (
                    <li key={a}>
                      <Chip>{a}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>

            <StaggerItem as="article" direction="from-right" className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-steel-150 bg-white p-7 shadow-e2">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-signal-100 bg-linear-to-b from-signal-50 to-white text-signal-600 shadow-e1">
                    <FlaskConical className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="h-card text-ink-900">Specialized testing</h3>
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-steel-600">
                  {company.flowTesting}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Specialized tests">
                  {company.specializedTests.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </Stagger>
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

      {/* ---------------- Our commitment ---------------- */}
      <section
        aria-labelledby="commitment-title"
        className="relative overflow-hidden bg-white section-y"
      >
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />

        <div className="relative container-k">
          <Reveal>
            <SectionHeading
              id="commitment-title"
              eyebrow="Our commitment"
              align="center"
              title={
                <>
                  Dependable solutions for{' '}
                  <span className="text-gradient">demanding applications.</span>
                </>
              }
              lead={company.commitment[0]}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-[15.5px] leading-relaxed text-steel-600">
              {company.commitment[1]}
            </p>
          </Reveal>

          {/* The four scopes of supply the paragraph above names, as a ladder:
              each step fills one more segment of the gauge. */}
          <Stagger
            as="ol"
            className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
            step={0.09}
          >
            {company.supplyScopes.map((s, i) => (
              <StaggerItem
                as="li"
                key={s}
                direction={rowDirection(i, company.supplyScopes.length)}
                className="h-full"
              >
                <div className="group flex h-full flex-col rounded-2xl border border-steel-150 bg-steel-50 p-5 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2">
                  <span aria-hidden="true" className="flex gap-1">
                    {company.supplyScopes.map((_, j) => (
                      <span
                        key={j}
                        className={`h-1.5 flex-1 rounded-full ${
                          j <= i ? 'bg-linear-to-r from-brand-600 to-aqua-500' : 'bg-steel-200'
                        }`}
                      />
                    ))}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mono-label mt-5 text-steel-400 transition-colors duration-400 group-hover:text-brand-600"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2 font-display text-lg leading-tight font-bold text-ink-900">
                    {s}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
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
