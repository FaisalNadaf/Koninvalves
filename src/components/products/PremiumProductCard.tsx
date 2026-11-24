import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Img, cutoutFor } from '../ui'
import { TiltCard, Layer } from '../ui/TiltCard'
import type { CategoryKey, Product } from '../../data/types'

/**
 * The product image is laid out at POP× its resting size and scaled *down* at
 * rest, so the compositor rasterises the layer once at the largest size it will
 * ever reach. Every transform is therefore <= 1 — always a downscale — and the
 * photograph stays sharp through the whole pop-out instead of being stretched
 * from an already-rasterised bitmap.
 */
const POP = 1.42

const imageVariants: Variants = {
  rest: {
    scale: 1 / POP,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    scale: 1,
    // Grown from a top origin, so all the growth is downward; this pulls the
    // pop-out back up so it sits where it always did.
    y: -34,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const shadowVariants: Variants = {
  rest: { opacity: 0.5, scaleX: 0.85, scaleY: 1 },
  hover: {
    opacity: 0.9,
    scaleX: 1.25,
    scaleY: 1.2,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const ringVariants: Variants = {
  rest: { opacity: 0, scale: 0.72 },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const orbVariants: Variants = {
  rest: { opacity: 0, scale: 0.6 },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * How the head of a card is filled when the product has no cut-out, which comes
 * down entirely to how the category was photographed.
 *
 * `black` — for cut-out product shots on a black studio ground: the card's
 * ground is black too, so the two meet invisibly. It has to be pure black, not
 * `ink-950`, or the seam shows.
 *
 * `cover` — the water solutions and the automation panels are scene
 * photographs and system schematics, already trimmed to their own edges.
 * Contained they left a card that was mostly margin, so they fill it instead. The crop is taken from the top: the one
 * portrait image in the set is a pump-house photograph stacked above a schematic,
 * and the photograph is the half worth showing at thumbnail size.
 *
 * `blur` — everything else sits over a blurred, oversized copy of itself, so a
 * wide plant scene extends as a soft continuation of the scene rather than as a
 * background colour someone had to pick.
 */
const STAGE: Record<CategoryKey, 'black' | 'cover' | 'blur'> = {
  valves: 'blur',
  'automation-solutions': 'cover',
  'water-treatment-solutions': 'cover',
}

/**
 * Product card.
 *
 * The card is a stage, not a box. The product is lit from behind, throws a
 * contact shadow, and lifts clear of the card's own edge as the surface tilts
 * toward the pointer — so the photograph, which is the only thing a buyer
 * actually recognises, stays the subject at every moment.
 */
export function PremiumProductCard({
  product,
  categoryKey,
  priority,
  /** Compact drops the quick-facts block — for dense three-up rails. */
  compact = false,
}: {
  product: Product
  categoryKey: CategoryKey
  priority?: boolean
  compact?: boolean
}) {
  const reduce = useReducedMotion()
  const href = `/products/${categoryKey}/${product.slug}`
  /**
   * The pop-out is only honest for a product that has been cut out of its
   * background. Control panels and water systems are photographed as scenes on
   * black or white, and floating one of those above the card lifts a hard
   * rectangle off the surface rather than a product. Those fill the head of the
   * card instead, like any other photograph on the site.
   */
  const cutout = cutoutFor(product.image.src)
  const floats = Boolean(cutout)
  const src = cutout ?? product.image.src
  const facts = product.quickFacts?.slice(0, compact ? 2 : 4) ?? []
  const stage = STAGE[categoryKey]

  return (
    <TiltCard as="article" className="h-full" max={6} lift={8} scale={1.012}>
      <motion.div
        initial="rest"
        whileHover={reduce || !floats ? undefined : 'hover'}
        animate="rest"
        className={`relative h-full ${floats ? 'pt-10' : ''}`}
      >
        <Link
          to={href}
          aria-label={`${product.name}: view specification`}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel-150 bg-white shadow-e2 transition-shadow duration-500 ease-out-expo group-hover:border-brand-200 group-hover:shadow-e4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ---------- Stage ---------- */}
          {floats ? (
            <div className="product-stage relative h-52 shrink-0 sm:h-56">
              <span
                aria-hidden="true"
                className="bg-grid-fine absolute inset-0 opacity-70 mask-fade-radial"
              />

              {/* Backlight and ring, revealed as the card is pointed at */}
              <motion.span
                aria-hidden="true"
                variants={orbVariants}
                className="pointer-events-none absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/25 blur-3xl"
              />
              <motion.span
                aria-hidden="true"
                variants={ringVariants}
                className="pointer-events-none absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aqua-400/45"
                style={{ boxShadow: '0 0 34px rgb(23 171 223 / 0.16) inset' }}
              />

              {/* Contact shadow beneath the product */}
              <motion.span
                aria-hidden="true"
                variants={shadowVariants}
                className="pointer-events-none absolute bottom-4 left-1/2 h-6 w-3/5 -translate-x-1/2 rounded-[50%] bg-ink-900/35 blur-xl"
              />

              {/* Floor — hides the seam where the stage meets the body */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent via-white/70 to-white"
              />
            </div>
          ) : (
            /* No cut-out: the photograph heads the card, and how it is fitted
               and what sits behind it is the category's business — see STAGE.
               A tall cabinet has to be contained or a landscape crop throws most
               of it away; a water schematic is better off filling the frame. */
            <div
              className={`relative h-56 shrink-0 overflow-hidden border-b sm:h-64 ${
                stage === 'black' ? 'border-black bg-black' : 'border-steel-150 bg-steel-100'
              }`}
            >
              {stage === 'blur' && (
                <Img
                  src={src}
                  alt=""
                  priority={priority}
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 27vw"
                  className="absolute inset-0 size-full scale-125 object-cover blur-2xl"
                />
              )}
              <Img
                src={src}
                alt={product.image.alt}
                priority={priority}
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 27vw"
                className={`absolute inset-0 size-full transition-transform duration-1100 ease-out-expo group-hover:scale-105 ${
                  stage === 'cover' ? 'object-cover object-top' : 'object-contain p-3'
                }`}
              />
            </div>
          )}

          {/* ---------- Body ---------- */}
          <Layer z={26} className="flex flex-1 flex-col p-6">
            <h3 className="h-card text-ink-900 transition-colors duration-400 group-hover:text-brand-700">
              {product.name}
            </h3>
            <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-relaxed text-steel-600">
              {product.summary}
            </p>

            {facts.length > 0 && (
              <dl className="mt-5 grid grid-cols-2 gap-2">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-lg border border-steel-150 bg-linear-to-b from-white to-steel-50 px-2.5 py-2 transition-colors duration-400 group-hover:border-brand-100"
                  >
                    <dt className="text-[9px] font-semibold tracking-[0.16em] text-steel-400 uppercase">
                      {f.label}
                    </dt>
                    <dd className="mt-1 font-medium text-[11.5px] leading-snug text-ink-800">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <span className="mt-auto flex items-center justify-between gap-3 pt-6">
              <span className="text-[13px] font-semibold text-brand-700">View specification</span>
              <span className="grid size-9 place-items-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-all duration-400 ease-out-expo group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand">
                <ArrowUpRight
                  className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Layer>

          <span aria-hidden="true" className="sheen z-10" />
        </Link>

        {/* ---------- Product photograph ----------
            Cut-outs only. Rendered outside the clipped card body so the product
            can rise clear of the top edge on hover; pointer events stay with
            the link beneath it. */}
        {floats && (
          <Layer
            z={60}
            className="pointer-events-none absolute inset-x-0 top-10 z-20 flex h-52 items-center justify-center sm:h-56"
          >
            <motion.div
              variants={imageVariants}
              className="flex h-[142%] w-[142%] items-center justify-center will-change-transform"
              style={{ transformOrigin: 'center top' }}
            >
              <Img
                src={src}
                alt={product.image.alt}
                priority={priority}
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 27vw"
                className="max-h-full w-auto object-contain drop-shadow-[0_18px_26px_rgba(10,23,37,0.28)]"
              />
            </motion.div>
          </Layer>
        )}
      </motion.div>
    </TiltCard>
  )
}
