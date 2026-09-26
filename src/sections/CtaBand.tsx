import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../data/company'
import { Eyebrow, Img } from '../components/ui'
import { LineReveal, Reveal } from '../lib/motion'

/**
 * Closing conversion band. Reused at the foot of every major page.
 *
 * The one rich passage in an otherwise light system: a brand gradient card
 * inset into the page rather than a full-width dark section, so the site stays
 * light while the ask still carries the most visual weight on the page.
 *
 * `titleLines` are authored as explicit lines so the headline breaks where the
 * design wants it to and the line-by-line reveal has something to animate.
 */
export default function CtaBand({
  titleLines = ['Tell us the duty.', 'We will specify', 'the valve.'],
  lead = 'Send the line size, pressure class, media and temperature, and our engineering team will come back with a specification and a quotation.',
}: {
  titleLines?: string[]
  lead?: string
}) {
  return (
    <section aria-labelledby="cta-title" className="tone-canvas relative section-y">
      <div className="container-k">
        {/* The last thing on almost every page, so it gets the strongest single
            entrance on the site: the whole plate scales up as one object, and
            the copy inside it then arrives against that. */}
        <Reveal
          direction="scale"
          amount={0.12}
          duration={0.85}
          className="tone-brand relative isolate overflow-hidden rounded-3xl shadow-e5 sm:rounded-4xl"
        >
          {/* The works, ghosted into the gradient rather than sitting under it */}
          <Img
            src="/img/company/plant-1.webp"
            alt=""
            sizes="100vw"
            className="absolute inset-0 -z-10 size-full object-cover object-[70%_center] opacity-20 mix-blend-luminosity"
          />
          <span aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10 opacity-60" />
          <span
            aria-hidden="true"
            className="absolute -top-32 -right-24 -z-10 size-136 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-40 -left-32 -z-10 size-128 rounded-full bg-[radial-gradient(circle,rgba(23,171,223,0.35),transparent_65%)]"
          />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-end lg:gap-14 lg:p-16">
            <div className="lg:col-span-7">
              <Reveal direction="from-left" delay={0.1}>
                <Eyebrow tone="onBrand">Request a quotation</Eyebrow>
              </Reveal>
              <LineReveal
                as="h2"
                id="cta-title"
                className="h-display mt-6 text-white"
                lines={titleLines}
                /* A tint, not an outline. An outlined last line looks sharp on
                   a flat ground but drops well under the contrast floor over a
                   photograph-backed gradient, and this is the one headline on
                   the site that has to be read. */
                accentClassName="text-aqua-300"
              />
              <Reveal direction="from-left" delay={0.25}>
                <p className="lead mt-6 max-w-xl text-white/80">{lead}</p>
                <p className="mono-label mt-7 flex items-center gap-2.5 text-white/60">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {company.address.city} · {company.address.region} · {company.address.country}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="from-right" delay={0.3}>
                <div className="glass-dark rounded-2xl p-6 sm:p-7">
                  <Link to="/contact" className="btn btn-light btn-lg group w-full">
                    Send an enquiry
                    <ArrowRight
                      className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>

                  <div className="mt-6 space-y-2">
                    {company.phones.map((t) => (
                      <a
                        key={t}
                        href={`tel:${t.replace(/\s/g, '')}`}
                        className="group flex items-center gap-3.5 rounded-xl bg-white/10 px-4 py-3 transition-colors duration-300 hover:bg-white/20"
                      >
                        <Phone className="size-4 shrink-0 text-white/70" aria-hidden="true" />
                        <span className="font-medium text-[13.5px] tracking-tight text-white/85 transition-colors group-hover:text-white">
                          {t}
                        </span>
                      </a>
                    ))}
                    <a
                      href={`mailto:${company.emails[0]}`}
                      className="group flex items-center gap-3.5 rounded-xl bg-white/10 px-4 py-3 transition-colors duration-300 hover:bg-white/20"
                    >
                      <Mail className="size-4 shrink-0 text-signal-300" aria-hidden="true" />
                      <span className="truncate font-medium text-[13.5px] tracking-tight text-white/85 transition-colors group-hover:text-white">
                        {company.emails[0]}
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
