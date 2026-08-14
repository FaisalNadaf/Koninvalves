import { Seo, breadcrumbSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import { Eyebrow, Glow, GridBackdrop, Img } from '../components/ui'
import { TiltCard } from '../components/ui/TiltCard'
import { LineReveal, Reveal, Stagger, StaggerItem } from '../lib/motion'
import CtaBand from '../sections/CtaBand'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Clientele', path: '/clientele' },
]

/**
 * The client marks carried over from the legacy koninvalve.com site.
 *
 * They are the evidence this page exists to show, so they are presented at full
 * colour and full size. Each <img> is decorative and the grid carries the
 * description instead — naming a company from a logo we cannot read would be
 * inventing a customer, and this is a page where that would be a claim about a
 * commercial relationship.
 */
const CLIENT_LOGOS = Array.from(
  { length: 31 },
  (_, i) => `/img/clients/${String(i + 1).padStart(2, '0')}.webp`
)

export default function Clientele() {
  return (
    <>
      <Seo
        title="Clientele — Companies Supplied by KONIN Valves"
        description={`KONIN Valves supplies ${CLIENT_LOGOS.length} companies across water treatment, oil & gas, refineries, chemical, power, steel and process industries throughout India.`}
        path="/clientele"
        image="/img/company/plant-2.webp"
        schema={[breadcrumbSchema(TRAIL)]}
      />

      <PageHero
        eyebrow="Clientele"
        title="The plants that run on KONIN"
        lead={`${CLIENT_LOGOS.length} companies across water, energy, process and heavy industry specify KONIN valves and control systems.`}
        image="/img/company/plant-2.webp"
        imageAlt=""
      />

      {/* ---------------- The wall ----------------
          A grid rather than a marquee: on a page devoted to the client list the
          marks should be held still and read, not scrolled past.

          Every tile is the same size. Widening every seventh one only produced
          a small logo adrift in a large empty card — these marks are all
          roughly the same optical weight, so varying the frame varies nothing
          but the whitespace around them. */}
      <section aria-labelledby="clients-title" className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop variant="dots" className="opacity-40" mask={false} />
        <Glow className="-top-40 left-1/4" size="46rem" intensity={0.13} drift />
        <Glow className="right-0 bottom-0" color="aqua" size="36rem" intensity={0.11} />

        <div className="relative container-k">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <Reveal>
                <Eyebrow>Trusted by industry</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="clients-title"
                className="h-section mt-5 text-ink-900"
                lines={['Specified by the', 'plants that cannot stop.']}
                accentClassName="text-gradient"
              />
            </div>
            <Reveal direction="from-right" delay={0.1}>
              <p className="max-w-sm text-[14.5px] leading-relaxed text-steel-600">
                A selection of the companies KONIN supplies, carried over from the KONIN client
                list. Marks remain the property of their respective owners.
              </p>
            </Reveal>
          </div>

          <Stagger
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            step={0.03}
            amount={0.05}
          >
            {CLIENT_LOGOS.map((src) => (
              <StaggerItem key={src} direction="scale">
                <TiltCard max={9} lift={6}>
                  <span className="grid aspect-16/10 w-full place-items-center rounded-2xl border border-steel-150 bg-white p-5 shadow-e1 transition-shadow duration-500 group-hover:border-brand-200 group-hover:shadow-e3 sm:p-6">
                    {/* Fills the padded box rather than sitting inside a fixed
                        height cap. `object-contain` still respects each mark's
                        own proportions, so a wide logo grows to the width and a
                        tall one to the height — the cap was holding every one
                        of them to a fraction of the card. */}
                    <Img
                      src={src}
                      alt=""
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
                      className="size-full object-contain transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    />
                  </span>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <p className="sr-only">
            Logos of {CLIENT_LOGOS.length} companies supplied by KONIN Valves.
          </p>
        </div>
      </section>

      <CtaBand
        titleLines={['Join the plants', 'that run on KONIN.']}
        lead="Send the line size, pressure class, media and temperature — our engineering team will come back with a specification and a quotation."
      />
    </>
  )
}
