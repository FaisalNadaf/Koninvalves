import type { ReactNode } from 'react'
import { Glow, GridBackdrop, Img } from './ui'

/**
 * Inner-page hero.
 *
 * One fixed height on every page, so moving between them never shifts the
 * fold. The photograph is the point of the band — the scrim lifts the left
 * into the site's light ground for the copy and then clears out entirely, so
 * the right half of the picture is shown rather than washed out.
 *
 * Everything here is above the fold, so the intro runs on CSS rather than
 * waiting for hydration — see the note in index.css.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: string
  imageAlt?: string
}) {
  return (
    /* `min-h` alongside the fixed height is a floor, not a second opinion: at
       40vh of a short laptop or a landscape phone the band would be under
       260 px and the headline would clip. */
    <section className="relative isolate flex h-[40vh] min-h-80 items-center overflow-hidden bg-canvas">
      {image && (
        <>
          <Img
            src={image}
            alt={imageAlt ?? ''}
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
          />
          {/* Opaque behind the copy, clear by about 70% across — the right of
              the band shows the photograph at full strength instead of through
              a white wash. The stops sit past the headline's usual end so the
              copy keeps its ground; only the longest title reaches the clear
              part, and its dark weight carries there on its own. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/88 to-transparent sm:from-white sm:from-30% sm:via-white/65 sm:via-52% sm:to-transparent sm:to-72%"
          />
          {/* Below `sm` the copy runs the full width, so it crosses the picture
              and needs a veil the wide layout does not. */}
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-white/55 sm:hidden" />
        </>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_8%_40%,rgba(30,134,214,0.12),transparent_62%)]"
      />
      {/* Over a photograph the grid stays on the copy side; across the picture
          it read as a screen-door over the image. */}
      {image ? (
        <GridBackdrop
          mask={false}
          className="-z-10 opacity-45 mask-[linear-gradient(to_right,#000_20%,transparent_50%)]"
        />
      ) : (
        <GridBackdrop className="-z-10 opacity-45" />
      )}
      <Glow className="-top-32 left-1/4 -z-10" size="32rem" intensity={0.12} drift />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-300 to-transparent"
      />

      <div className="relative container-k w-full pt-(--nav-h)">
        {/* The measure is set per element rather than on a shared wrapper. The
            headline needs the full container to stay on one line — the longest
            of them, "Send us the duty. We’ll send back a specification.", runs
            to about 1070 px at the desktop cap and was breaking against the old
            672 px column — while the lead still wants a readable one. */}
        <div>
          <p className="eyebrow anim-fade-up" style={{ animationDelay: '60ms' }}>
            {eyebrow}
          </p>

          <h1
            /* Held to one line from `lg` up, where the longest title clears the
               container with room to spare. Below that it wraps normally —
               forcing it at 768 would leave only ~30 px of margin, and the
               section clips rather than scrolls, so an overrun would be a
               silently truncated headline. */
            className="h-display anim-fade-up mt-4 text-[clamp(1.9rem,3.8vw,3.25rem)] text-ink-900 lg:text-nowrap"
            style={{ animationDelay: '130ms' }}
          >
            {title}
          </h1>

          {lead && (
            <p
              className="anim-fade-up mt-4 line-clamp-3 max-w-xl text-[14.5px] leading-relaxed text-steel-600 sm:text-[15.5px]"
              style={{ animationDelay: '210ms' }}
            >
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
