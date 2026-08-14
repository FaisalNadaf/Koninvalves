import { Marquee } from '../../components/fx'
import { Reveal } from '../../lib/motion'

/**
 * Standards ticker.
 *
 * The design and testing standards KONIN builds to, run as a continuous band
 * directly beneath the hero. It does the work a logo wall usually does — it
 * establishes credibility in one glance — using facts rather than decoration,
 * and it costs a single slim strip of vertical space rather than a section.
 *
 * Source: the standards cited across the KONIN catalogue and product pages.
 */
const STANDARDS = [
  'API 600',
  'API 602',
  'API 594',
  'API 598',
  'API 609',
  'API 6D',
  'API 607',
  'ASME B16.34',
  'ASME B16.10',
  'BS 1868',
  'BS 1873',
  'BS 5155',
  'BS 5352',
  'EN 593',
  'EN 12266-1',
  'ISO 17292',
  'ISO 9001:2015',
  'MSS SP-81',
  'AWWA C504',
  'IS 13095',
]

export default function TickerBand() {
  return (
    <section
      aria-label="Standards KONIN valves are built and tested to"
      className="relative border-y border-steel-150 bg-white"
    >
      {/* A plain fade, and nothing more. The strip is barely taller than its
          own type, so anything that travels would cover most of the band's
          height on the way in — and the marquee inside it is already moving. */}
      <Reveal direction="fade" amount={0.4} className="flex items-center">
        {/* The label anchors the strip so the marquee reads as data, not decor. */}
        <p className="mono-label hidden shrink-0 border-r border-steel-150 py-4 pr-6 pl-[max(1.25rem,calc((100vw-1480px)/2+3.75rem))] text-steel-400 md:block">
          Built &amp; tested to
        </p>
        <Marquee speed={64} className="min-w-0 flex-1 py-4">
          {STANDARDS.map((s) => (
            <span key={s} className="flex items-center gap-7 pr-7">
              <span className="mono-label whitespace-nowrap text-steel-500 transition-colors hover:text-brand-700">
                {s}
              </span>
              <span aria-hidden="true" className="size-1 rotate-45 bg-signal-500/70" />
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
