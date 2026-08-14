import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, Mail, MapPin, Phone } from 'lucide-react'

import { company } from '../data/company'
import { categories } from '../data/categories'
import { Img, GridBackdrop } from '../components/ui'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

/** LinkedIn mark — lucide v1 no longer ships brand icons. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/**
 * The site map, grouped the way a visitor actually looks for things rather
 * than as one undifferentiated list of every page. "Documents" are the real
 * PDFs already published under /docs — the catalogue and the certificates —
 * which were reachable from exactly one page before.
 */
const COMPANY_LINKS = [
  { label: 'About KONIN', to: '/about' },
  { label: 'Industries Served', to: '/industries' },
  { label: 'Quality & Certifications', to: '/quality' },
  { label: 'Clientele', to: '/clientele' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const DOCUMENTS = [
  { label: 'Product catalogue', file: '/docs/konin-valves-catalogue.pdf' },
  { label: 'ISO 9001:2015 certificate', file: '/docs/ISO.pdf' },
  { label: 'IEC certificate', file: '/docs/IEC-certificate.pdf' },
  { label: 'Udyam registration', file: '/docs/udyam-registration-certificate.pdf' },
]

/** Shared shell so every panel in the footer reads as the same object. */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-steel-150 bg-white p-6 shadow-e1 sm:p-7 ${className}`}
    >
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mono-label flex items-center gap-3 text-brand-700">
      <span aria-hidden="true" className="h-px w-6 bg-brand-200" />
      {children}
    </h2>
  )
}

export default function Footer() {
  return (
    <footer className="tone-tint-deep relative overflow-hidden">
      <GridBackdrop variant="fine" className="opacity-50" mask={false} />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-300 to-transparent"
      />


      <div className="relative container-k pt-12 pb-10 sm:pt-14">
        {/* The three panels converge on the centre — outer two from their own
            corner, the middle one straight up — so the footer assembles itself
            rather than appearing all at once. The stagger item is the grid
            child now, so it carries the column span and the card fills it. */}
        <Stagger className="grid gap-4 lg:grid-cols-12" step={0.12}>
          {/* ---------------- Brand & contact ---------------- */}
          <StaggerItem direction="from-bottom-left" className="lg:col-span-4">
            <Card className="h-full">
              <Link to="/" aria-label={`${company.name} — home`} className="inline-block">
                <Img src="/img/brand/logo.webp" alt={`${company.name} logo`} className="h-11 w-auto" />
              </Link>
              <p className="mt-5 text-[14px] leading-relaxed text-steel-600">{company.positioning}</p>

              <address className="mt-6 space-y-3 border-t border-steel-150 pt-5 text-[14px] not-italic">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="text-steel-600">{company.address.full}</span>
                </p>
                <p className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="flex flex-col">
                    {company.phones.map((t) => (
                      <a
                        key={t}
                        href={`tel:${t.replace(/\s/g, '')}`}
                        // min-height keeps the tap target at the WCAG 2.2 minimum
                        className="flex min-h-7 items-center text-steel-600 transition-colors hover:text-brand-700"
                      >
                        {t}
                      </a>
                    ))}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-signal-600" aria-hidden="true" />
                  <span className="flex flex-col">
                    {company.emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="flex min-h-7 items-center break-all text-steel-600 transition-colors hover:text-brand-700"
                      >
                        {e}
                      </a>
                    ))}
                  </span>
                </p>
              </address>

              <a
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex size-11 items-center justify-center rounded-xl border border-steel-200 bg-steel-50 text-steel-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-600 hover:text-white hover:shadow-brand"
                aria-label={`${company.name} on LinkedIn`}
              >
                <LinkedInIcon className="size-4" />
              </a>
            </Card>
          </StaggerItem>

          {/* ---------------- Products ----------------
              Three categories, not twenty-one product links. The footer's job
              is to get someone to the right catalogue, and the catalogue page
              is better at listing products than a column of small type. */}
          <StaggerItem direction="from-bottom" className="lg:col-span-4">
            <Card className="h-full">
              <CardTitle>Products &amp; Solutions</CardTitle>
              <ul className="mt-5 space-y-2">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <Link
                      to={cat.path}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-steel-150 bg-steel-50 px-4 py-3 transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-e2"
                    >
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                          {cat.name}
                        </span>
                        <span className="mono-label mt-1.5 block truncate text-steel-400">
                          {cat.tagline}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/products"
                className="link-slide mt-5 inline-flex min-h-7 items-center text-[13.5px] font-semibold text-brand-700"
              >
                Browse everything
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Card>
          </StaggerItem>

          {/* ---------------- Site map & documents ---------------- */}
          <StaggerItem direction="from-bottom-right" className="lg:col-span-4">
            <Card className="h-full">
              <div className="grid gap-7 sm:grid-cols-2">
                <nav aria-label="Company">
                  <CardTitle>Company</CardTitle>
                  <ul className="mt-5 space-y-1">
                    {COMPANY_LINKS.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="link-slide inline-flex min-h-7 items-center text-[13.5px] text-steel-600 transition-colors hover:text-brand-700"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div>
                  <CardTitle>Documents</CardTitle>
                  <ul className="mt-5 space-y-1">
                    {DOCUMENTS.map((d) => (
                      <li key={d.file}>
                        <a
                          href={d.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex min-h-7 items-start gap-2 text-[13.5px] text-steel-600 transition-colors hover:text-brand-700"
                        >
                          <FileText
                            className="mt-0.5 size-3.5 shrink-0 text-steel-300 transition-colors group-hover:text-brand-600"
                            aria-hidden="true"
                          />
                          {d.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-brand-100 bg-linear-to-br from-brand-50 to-white p-5">
                <p className="text-[14px] leading-relaxed text-steel-600">
                  Send the duty and our engineering team will come back with a specification.
                </p>
                <Link to="/contact" className="btn btn-primary btn-sm mt-4 w-full">
                  Request a quote
                </Link>
              </div>
            </Card>
          </StaggerItem>
        </Stagger>
      </div>

      {/* ---------------- Oversized wordmark ----------------
          The brand set at the scale of a sign on the works. Centred and sized
          to reach the container: left-aligned at the old cap it stopped ~230 px
          short of the right edge on a wide screen, which read as a layout fault
          rather than as a deliberate piece of type. */}
      {/* Sized against the container rather than the type, so the reveal is a
          slow, low rise — the mark settles onto the page instead of sliding. */}
      <Reveal
        direction="from-bottom"
        amount={0.1}
        duration={0.9}
        className="relative container-k"
        aria-hidden="true"
      >
        <p className="overflow-hidden pb-2 text-center font-display text-[clamp(3.5rem,17vw,15rem)] leading-[0.82] font-bold tracking-[-0.03em] text-brand-800/8 select-none">
          KONIN VALVES
        </p>
      </Reveal>

      <div className="relative border-t border-steel-200 bg-white/70">
        {/* Three even columns rather than `justify-between`: with flex the
            middle item only lands on the centre of the bar when the two outer
            ones happen to be the same width, and they are not. */}
        {/* The last row on the site: a plain fade, nothing that moves. */}
        <Stagger
          className="container-k grid gap-3 py-5 text-center text-[12.5px] text-steel-500 sm:grid-cols-3 sm:items-center sm:gap-6"
          step={0.1}
        >
          <StaggerItem
            direction="fade"
            as="div"
            className="flex items-center justify-center gap-2.5 sm:justify-self-start"
          >
            <span
              className="relative inline-flex size-1.5 shrink-0 rounded-full bg-signal-500"
              aria-hidden="true"
            >
              <span className="anim-pulse-ring absolute inset-0 rounded-full bg-signal-500" />
            </span>
            ISO 9001:2015 Certified · Belagavi, Karnataka
          </StaggerItem>

          <StaggerItem direction="fade" as="div" className="sm:justify-self-center">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </StaggerItem>

          <StaggerItem direction="fade" as="div" className="sm:justify-self-end">
            Designed and Developed by{' '}
            <a
              href="https://cubiccode.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-slide font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Cubiccode
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </footer>
  )
}
