import { company } from '../../data/company'
import { Eyebrow, Img } from '../../components/ui'
import { Marquee } from '../../components/fx'
import { Reveal } from '../../lib/motion'

/**
 * Each flag is a pre-rendered 3:2 rectangle (scripts/gen-flags.mjs): the
 * official flag, shaded as cloth. Baked at build time so the marquee carries
 * plain images instead of live SVG filters. A country added to
 * `company.supplyCountries` needs `node scripts/gen-flags.mjs` run once.
 */
const countries = company.supplyCountries

/**
 * Global supply band — used on the homepage and the About page.
 *
 * A centred heading over a full-width marquee of large flags, each with its
 * country named beneath it. On the brand ground, so it never shares a
 * background with the light sections either side of it.
 */
export default function GlobalReach() {
  return (
    <section aria-labelledby="global-title" className="tone-brand relative overflow-hidden">
      {/* A faint grid of latitude lines — a map without drawing one. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_56px),repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_56px)] mask-[radial-gradient(ellipse_70%_80%_at_50%_50%,#000,transparent)] opacity-[0.07]"
      />

      <div className="relative container-k pt-12 text-center sm:pt-16">
        <Reveal>
          <Eyebrow tone="onBrand">Global supply</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          {/* One line from `lg` up; below that the two halves break at the
              comma rather than mid-phrase. */}
          <h2 id="global-title" className="h-section mx-auto mt-5 lg:text-nowrap">
            Built in India,{' '}
            <span className="whitespace-nowrap text-aqua-300">installed worldwide.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
            KONIN valves, control panels and water solutions are supplied across India and to
            plants in the Gulf, North America and Africa.
          </p>
        </Reveal>
      </div>

      {/* The flags are already travelling, so the row only fades up. */}
      <Reveal
        direction="blur"
        amount={0.15}
        className="relative mt-6 pb-8 sm:mt-8 sm:pb-12"
      >
        {/* The track clips its overflow, so it carries its own vertical room
            for the hover lift; without it a raised card lost its top edge. */}
        <Marquee speed={48} className="py-4">
          {countries.map((c) => (
            <span
              key={c.code}
              className="group/flag mx-2.5 flex w-56 shrink-0 flex-col rounded-[11px] border border-white/15 bg-linear-to-b from-white/12 to-white/5 p-2 backdrop-blur-sm transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-white/35 hover:from-white/18 sm:mx-3 sm:w-64"
            >
              {/* A true 3:2 rectangle, edge to edge in the card. The card's
                  radius is the flag's plus the padding, so the corners run
                  parallel and the frame fits the flag. */}
              <span className="block overflow-hidden rounded-[3px] shadow-[0_14px_26px_-10px_rgba(0,0,0,0.55)] ring-1 ring-white/25">
                <Img
                  src={`/img/flags/${c.code}.webp`}
                  alt=""
                  sizes="(max-width: 640px) 200px, 232px"
                  className="block aspect-3/2 h-auto w-full transition-transform duration-700 ease-out-expo group-hover/flag:scale-105"
                />
              </span>
              <span className="mt-2.5 truncate px-1 text-center text-[14.5px] leading-tight font-semibold text-white sm:text-[15.5px]">
                {c.name}
              </span>
              <span className="mono-label mt-1 mb-0.5 truncate px-1 text-center text-white/55">{c.region}</span>
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
