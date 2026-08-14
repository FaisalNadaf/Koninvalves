import { Mail, MapPin, Phone } from 'lucide-react'
import { Seo, breadcrumbSchema, organizationSchema } from '../components/Seo'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import { GridBackdrop } from '../components/ui'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'
import { company } from '../data/company'

const TRAIL = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
]

/**
 * The map query, and the target of every map link on the page.
 *
 * Name first, then the address. The address alone dropped a pin somewhere in
 * the industrial estate; the name resolves to KONIN's own Google listing —
 * which is the place the shared link points at — so the pin carries the
 * business card rather than a bare coordinate.
 */
const MAP_QUERY = encodeURIComponent(`${company.name}, ${company.address.full}`)

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact KONIN Valves — Belagavi, Karnataka, India"
        description={`Contact KONIN Valves, ${company.address.city}, ${company.address.region}. Call ${company.phones[0]} or email ${company.emails[0]} for valve, automation and water enquiries.`}
        path="/contact"
        schema={[
          breadcrumbSchema(TRAIL),
          organizationSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact KONIN Valves',
            url: 'https://www.koninvalve.com/contact',
            mainEntity: { '@id': 'https://www.koninvalve.com/#organization' },
          },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Send us the duty. We’ll send back a specification."
        lead="Our engineering team answers technical enquiries directly — no call-centre in between."
        image="/img/company/plant-3.webp"
        imageAlt=""
      />

      {/* `overflow-x-clip`, not `overflow-hidden`. Hidden makes the section a
          scroll container, and a sticky child sticks to its nearest scrolling
          ancestor — so the pinned details column below simply scrolled away
          with the page. Clip does the same horizontal job without creating
          that container. */}
      <section className="tone-tint relative overflow-x-clip section-y">
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <div className="relative container-k">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Form — the left column, so it arrives from the left; the detail
                cards on the right come the other way. */}
            <div className="lg:col-span-7">
              <Reveal direction="from-left" amount={0.1}>
                <EnquiryForm />
              </Reveal>
            </div>

            {/* Details.
                Pinned on wide screens. The stack is a good deal shorter than
                the form beside it, so left in flow it ended half a column above
                the submit button and left a hole; pinned, it stays alongside
                whichever field is being filled and the space below it is the
                reason it works rather than a gap. */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <Stagger className="grid gap-4" step={0.09}>
                <StaggerItem
                  direction="left"
                  className="rounded-2xl border border-steel-150 bg-white p-6 shadow-e1"
                >
                  <p className="mono-label flex items-center gap-2.5 text-brand-700">
                    <MapPin className="size-4" aria-hidden="true" />
                    Office &amp; works
                  </p>
                  <address className="mt-4 text-[15px] leading-relaxed text-steel-600 not-italic">
                    {company.address.line1},<br />
                    {company.address.line2},<br />
                    {company.address.city}, {company.address.region} {company.address.postalCode},
                    <br />
                    {company.address.country}
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-slide mt-5 inline-flex min-h-6 items-center text-[13.5px] font-semibold text-brand-700"
                  >
                    Open in Google Maps
                  </a>
                </StaggerItem>

                <StaggerItem
                  direction="left"
                  className="rounded-2xl border border-steel-150 bg-white p-6 shadow-e1"
                >
                  <p className="mono-label flex items-center gap-2.5 text-brand-700">
                    <Phone className="size-4" aria-hidden="true" />
                    Telephone
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {company.phones.map((t) => (
                      <li key={t}>
                        <a
                          href={`tel:${t.replace(/\s/g, '')}`}
                          className="flex min-h-8 items-center rounded-lg font-mono text-[15px] text-ink-900 transition-colors hover:text-brand-700"
                        >
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>

                <StaggerItem
                  direction="left"
                  className="rounded-2xl border border-steel-150 bg-white p-6 shadow-e1"
                >
                  <p className="mono-label flex items-center gap-2.5 text-signal-600">
                    <Mail className="size-4" aria-hidden="true" />
                    Email
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {company.emails.map((e) => (
                      <li key={e}>
                        <a
                          href={`mailto:${e}`}
                          className="flex min-h-8 items-center text-[15px] break-all text-ink-900 transition-colors hover:text-brand-700"
                        >
                          {e}
                        </a>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              </Stagger>
            </div>
          </div>

          {/* The map runs the full width beneath the two columns rather than as
              the last card in the right-hand stack. In a 5-column well it was a
              288 px square of a city — too small to place anything by. Across
              the page it is a wide strip, which is the shape a map of a single
              address actually wants. */}
          <Reveal direction="from-bottom" amount={0.15}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-steel-150 shadow-e3 lg:mt-10">
              <iframe
                title={`Map showing ${company.name} at ${company.address.full}`}
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full border-0 sm:h-80 lg:h-96"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
