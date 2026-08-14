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

const MAP_QUERY = encodeURIComponent(company.address.full)

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

      <section className="tone-tint relative overflow-hidden section-y">
        <GridBackdrop variant="fine" className="opacity-50" mask={false} />
        <div className="relative container-k">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Form — the left column, so it arrives from the left; the detail
                cards on the right come the other way. */}
            <div className="lg:col-span-7">
              <Reveal direction="from-left" amount={0.1}>
                <EnquiryForm />
              </Reveal>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
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

                <StaggerItem
                  direction="left"
                  className="overflow-hidden rounded-2xl border border-steel-150 shadow-e2"
                >
                  <iframe
                    title={`Map showing ${company.name} at ${company.address.full}`}
                    src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-72 w-full border-0"
                  />
                </StaggerItem>
              </Stagger>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
