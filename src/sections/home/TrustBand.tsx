import { Clock, Cog, Headset, Layers, Tag } from 'lucide-react'
import { company } from '../../data/company'
import { Eyebrow, GridBackdrop, Img } from '../../components/ui'
import { TiltCard, Layer } from '../../components/ui/TiltCard'
import { Marquee } from '../../components/fx'
import { LineReveal, Reveal, rowDirection, Stagger, StaggerItem } from '../../lib/motion'

/**
 * Client logos carried over from the legacy koninvalve.com site.
 *
 * The marks themselves are the evidence, so each <img> is decorative and the
 * region carries the description instead — naming a company from a logo we
 * cannot read would be inventing a customer.
 */
const CLIENT_LOGOS = Array.from(
  { length: 31 },
  (_, i) => `/img/clients-tight/${String(i + 1).padStart(2, '0')}.webp`
)

/**
 * One icon per published reason, in the order `company.whyKonin` lists them.
 * Five identical ticks said nothing; an icon that matches the claim lets the
 * row be scanned rather than read.
 */
const WHY_ICONS = [Headset, Layers, Clock, Tag, Cog]

/**
 * One travelling row of client marks.
 *
 * The tile is a flex box, not `grid place-items-center`. It has a fixed height
 * but its grid row was `auto`, so the mark's `height: 100%` had no definite
 * height to resolve against: it fell back to the image's intrinsic height,
 * which then grew the row past the tile. A 128 px tile with 24 px of padding
 * should cap a logo at 80 px and was rendering it at 127, hanging 24 px out of
 * the bottom with nothing clipping it. A flex line takes its cross size from
 * the tile's own height, so `max-h-full` resolves against something real.
 */
function LogoRow({ logos, reverse, speed }: { logos: string[]; reverse?: boolean; speed: number }) {
  return (
    <Marquee speed={speed} reverse={reverse} className="py-2">
      {logos.map((src) => (
        <span
          key={src}
          className="mx-2 flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-steel-150 bg-white px-4 py-3 shadow-e1 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-e4 sm:mx-2.5 sm:h-28 sm:w-52 sm:px-5 sm:py-3.5"
        >
          {/* Full colour, at full strength. These marks are the evidence the
              band exists to show, and a wall of small grey logos reads as
              filler. Contained, never stretched: `object-contain` keeps each
              mark in proportion inside the tile.

              The marks come from /img/clients-tight, cropped to the logo
              itself, so a small tile is filled by the mark rather than by the
              white margin each 300 x 200 source file carried. */}
          <Img
            src={src}
            alt=""
            sizes="208px"
            className="size-full object-contain transition-transform duration-500 ease-out-expo hover:scale-105"
          />
        </span>
      ))}
    </Marquee>
  )
}

export default function TrustBand() {
  const half = Math.ceil(CLIENT_LOGOS.length / 2)

  return (
    <section aria-labelledby="trust-title" className="tone-tint-deep relative overflow-hidden">
      <GridBackdrop variant="fine" className="opacity-50" mask={false} />

      <div className="relative container-k section-y">
        {/* Centred: the five reasons run the full width beneath, so a
            left-aligned headline over a full-width row read as a column that
            had lost its neighbour. */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Why KONIN</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            id="trust-title"
            className="h-section mt-5 text-ink-900"
            lines={['A supplier that answers', 'engineering questions.']}
            accentClassName="text-gradient"
          />
        </div>

        {/* ---------------- The five reasons, as a row ----------------
            Five across at desktop rather than a stacked list: the claims are
            short and independent, so a column of full-width bars spent most of
            its area on empty space to the right of each line. */}
        <Stagger
          as="ul"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          step={0.08}
          amount={0.05}
        >
          {company.whyKonin.map((point, i) => {
            const Icon = WHY_ICONS[i] ?? Layers
            return (
              <StaggerItem
                as="li"
                key={point}
                direction={rowDirection(i, company.whyKonin.length)}
                className="h-full"
              >
                <TiltCard className="h-full" max={8} lift={7}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-150 bg-white p-6 shadow-e1 transition-shadow duration-500 ease-out-expo group-hover:border-brand-200 group-hover:shadow-e4">
                    {/* Brand edge across the head of the card on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-brand-600 to-aqua-400 transition-transform duration-600 ease-out-expo group-hover:scale-x-100"
                    />

                    <Layer z={20} className="flex h-full flex-col">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-100 bg-linear-to-b from-brand-50 to-white text-brand-700 shadow-e1 transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:from-brand-600 group-hover:to-brand-500 group-hover:text-white group-hover:shadow-brand">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="mt-5 text-[14px] leading-relaxed text-steel-600 transition-colors duration-400 group-hover:text-ink-900">
                        {point}
                      </p>
                    </Layer>
                  </div>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>

      {/* ---------------- Client wall ---------------- */}
      <div className="relative border-t border-steel-150 bg-white py-12 sm:py-16">
        <div className="container-k">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>Our clients</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              id="clients-title"
              className="h-section mt-5 text-ink-900"
              lines={['Trusted by the plants', 'that cannot stop.']}
              accentClassName="text-gradient"
            />
          </div>
        </div>

        {/* The marks are already travelling, so the wall only fades up. */}
        <Reveal
          direction="blur"
          amount={0.15}
          className="mt-8 space-y-0 sm:space-y-1"
          role="img"
          aria-label="Logos of companies supplied by KONIN Valves"
        >
          <LogoRow logos={CLIENT_LOGOS.slice(0, half)} speed={58} />
          <LogoRow logos={CLIENT_LOGOS.slice(half)} speed={66} reverse />
        </Reveal>
      </div>
    </section>
  )
}
