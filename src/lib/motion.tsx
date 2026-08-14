import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'framer-motion'

/**
 * KONIN motion system.
 *
 * One easing curve, one duration scale, one viewport rule — so every section of
 * the site moves the same way. Everything degrades to a plain, instant render
 * when the visitor prefers reduced motion, and to plain visible content if the
 * JavaScript never arrives (see the failsafe note on `REVEAL_ATTR` below).
 *
 * The vocabulary is small on purpose:
 *
 *   <Reveal>                a single block, entering from a chosen direction
 *   <Stagger>/<StaggerItem> a group whose members arrive one after another
 *   <LineReveal>            a headline, rising line by line out of its own box
 *   <TextReveal>            a headline, rising word by word
 *   useRevealed()           the bare trigger, for components that cannot afford
 *                           an extra wrapper element
 *
 * Everything else on the site is built from those five.
 */

export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const
export const DUR = { fast: 0.45, base: 0.7, slow: 1.05 } as const

/* ==================================================================
   The trigger
   ================================================================== */

/**
 * How much of a block must be on screen before it animates.
 *
 * A reveal the visitor never sees is just a slower page, so this is a real
 * in-view test rather than a generous pre-roll: the block is a fifth of the way
 * onto the screen before it starts.
 */
const REVEAL_AMOUNT = 0.2

/**
 * A hair of extra delay so a short element — an eyebrow, a chip — starts once
 * it is properly on screen rather than while it is still grazing the bottom
 * edge. Kept small: it is a nicety, not a second gate.
 */
const REVEAL_MARGIN = '0px 0px -6% 0px'

/** Enough steps that the callback runs near whatever ratio is asked for. */
const THRESHOLDS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75, 1]

/**
 * Marks every element that is rendered hidden and revealed later.
 *
 * The pre-rendered HTML carries the hidden state as an inline `opacity: 0`, so
 * if the bundle never executes the content would be lost. Two things stop that:
 * the `<noscript>` rule in index.html, and a timer there that adds
 * `.reveal-failsafe` to <html> if the app has not started in time. Both key off
 * this attribute, so it has to be on anything that starts out invisible.
 */
const REVEAL_ATTR = { 'data-reveal': '' } as const

/**
 * Fires once, when the element has genuinely arrived on screen.
 *
 * Framer's own `whileInView` would do most of this, but not the clamp below,
 * and that clamp is what makes the ratio safe to raise. A block taller than the
 * screen can never reach a high ratio — a fifth of a page-height section is
 * more pixels than the viewport has — so a fixed 0.2 would leave the tallest
 * sections hidden for good. The requested share is therefore capped at the
 * largest share that element is physically able to show.
 */
export function useRevealed<T extends HTMLElement>(amount: number = REVEAL_AMOUNT) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // No observer (very old browser, odd test environment): show the content.
    // Never trade content for an animation.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const root = e.rootBounds?.height ?? window.innerHeight
          const own = e.boundingClientRect.height || 1
          const reachable = Math.min(1, root / own) * 0.9
          if (e.intersectionRatio >= Math.min(amount, reachable)) {
            setShown(true)
            io.disconnect()
            return
          }
        }
      },
      { threshold: THRESHOLDS, rootMargin: REVEAL_MARGIN }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [amount])

  return [ref, shown] as const
}

/* ==================================================================
   Viewport width
   ================================================================== */

const COMPACT_QUERY = '(max-width: 640px)'

/**
 * How far a reveal travels on a phone, as a share of the desktop distance.
 *
 * The same 44 px slide that reads as a considered entrance on a 1440 px screen
 * is a third of a phone's width, and a row of cards sliding that far reads as
 * jitter. Everything else — timing, easing, stagger, opacity — is unchanged, so
 * the small screen gets the same choreography at a smaller amplitude.
 */
const COMPACT_DISTANCE = 0.55

let compactMql: MediaQueryList | null = null
const compactQuery = () => (compactMql ??= window.matchMedia(COMPACT_QUERY))

/**
 * One media-query listener for the whole page, however many reveals are on it —
 * every subscriber shares the same MediaQueryList rather than opening its own.
 */
function subscribeCompact(onChange: () => void) {
  const mql = compactQuery()
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

export function useCompactMotion() {
  return useSyncExternalStore(
    subscribeCompact,
    () => compactQuery().matches,
    // Pre-render has no viewport. Desktop offsets are the safe assumption: the
    // element is invisible either way, and hydration corrects it before it moves.
    () => false
  )
}

/* ==================================================================
   Directions
   ================================================================== */

/**
 * Where a block comes from.
 *
 * The `from-*` names are the ones to reach for — they say where the element
 * starts, which is how a layout decision is actually made ("this column is on
 * the left, so it comes in from the left"). The four bare names above them are
 * the site's original vocabulary, kept because a lot of the site is written in
 * it; they name the direction of *travel*, so `up` rises and `right` moves
 * rightward from the left. Each is listed next to its unambiguous twin.
 */
export type RevealDirection =
  | 'up' // travels up   — same as from-bottom
  | 'down' // travels down — same as from-top
  | 'left' // travels left — same as from-right
  | 'right' // travels right — same as from-left
  | 'fade'
  | 'scale'
  | 'from-bottom'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'from-top-left'
  | 'from-top-right'
  | 'from-bottom-left'
  | 'from-bottom-right'
  | 'blur'
  | 'blur-up'
  | 'zoom'

type Offset = { x?: number; y?: number; scale?: number; blur?: number }

/**
 * Distances are deliberately short. Anything past ~45 px stops reading as the
 * element settling into place and starts reading as it flying in, and the
 * diagonals are shorter again because they spend their distance on two axes.
 */
const OFFSET: Record<RevealDirection, Offset> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 44 },
  right: { x: -44 },
  fade: {},
  scale: { scale: 0.94 },

  'from-bottom': { y: 34 },
  'from-top': { y: -34 },
  'from-left': { x: -44 },
  'from-right': { x: 44 },
  'from-top-left': { x: -32, y: -24 },
  'from-top-right': { x: 32, y: -24 },
  'from-bottom-left': { x: -32, y: 24 },
  'from-bottom-right': { x: 32, y: 24 },

  blur: { blur: 7 },
  'blur-up': { y: 22, blur: 7 },
  zoom: { scale: 0.93, y: 16 },
}

/**
 * The direction for the nth of `count` items across a row.
 *
 * The outer items arrive from their own side and everything between them rises,
 * so a row assembles toward its own centre instead of every card repeating the
 * same move. It is index-based rather than measured, which means at a narrower
 * breakpoint — where the row has wrapped into a column — the first and last
 * items still lean in slightly. At 32 px that reads as variation, not as error.
 */
export function rowDirection(i: number, count: number): RevealDirection {
  if (count < 3) return 'from-bottom'
  if (i === 0) return 'from-bottom-left'
  if (i === count - 1) return 'from-bottom-right'
  return 'from-bottom'
}

export function revealVariants(direction: RevealDirection = 'up', distance = 1): Variants {
  const o = OFFSET[direction] ?? OFFSET.up
  const hidden: Record<string, unknown> = {
    opacity: 0,
    x: (o.x ?? 0) * distance,
    y: (o.y ?? 0) * distance,
    scale: o.scale ?? 1,
  }
  const visible: Record<string, unknown> = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE },
  }

  // Only paid for where it is asked for: `filter` is the one property here that
  // is not free on the compositor, so it never lands on an element by default.
  if (o.blur) {
    hidden.filter = `blur(${(o.blur * distance).toFixed(1)}px)`
    visible.filter = 'blur(0px)'
  }

  return { hidden, visible } as Variants
}

/* ==================================================================
   Reveal
   ================================================================== */

/**
 * Tags a reveal can render as.
 *
 * Deliberately a closed list: `motion[tag]` has to resolve to a real motion
 * component, and keeping it explicit means a typo is a type error rather than
 * an undefined component at runtime.
 */
type RevealTag =
  | 'div'
  | 'section'
  | 'li'
  | 'article'
  | 'header'
  | 'span'
  | 'figure'
  | 'p'
  | 'h2'
  | 'h3'
  | 'a'

type RevealProps = {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  duration?: number
  /**
   * Share of the element that must be on screen before it animates. Lower it
   * for a block that wraps a whole region — the clamp in `useRevealed` will
   * catch a genuinely oversized one, but starting a tall section only once a
   * fifth of it has passed is late.
   */
  amount?: number
  /**
   * Multiplier on the direction's travel. Turn it down for something that
   * animates inside another moving block, or for a short element that a full
   * 34 px slide would cover most of the height of.
   */
  distance?: number
  /**
   * The element to render. Text tags are here so a heading or a paragraph can
   * animate as itself — wrapping one in a <div> would put a block between it
   * and its siblings and change what its own margins collapse against.
   */
  as?: RevealTag
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants' | 'initial' | 'whileInView'>

/** Scroll-triggered reveal. The workhorse of the site. */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration,
  amount = REVEAL_AMOUNT,
  distance = 1,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const compact = useCompactMotion()
  const [ref, shown] = useRevealed<HTMLDivElement>(amount)
  const Tag = motion[as] as typeof motion.div

  if (reduce) {
    const Plain = as as 'div'
    return (
      <Plain className={className} {...(rest as object)}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      ref={ref}
      {...REVEAL_ATTR}
      className={className}
      initial="hidden"
      animate={shown ? 'visible' : 'hidden'}
      variants={revealVariants(direction, distance * (compact ? COMPACT_DISTANCE : 1))}
      transition={{ duration: duration ?? DUR.base, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ==================================================================
   Stagger
   ================================================================== */

type StaggerProps = {
  children: ReactNode
  /** Delay between each child, in seconds. 0.08–0.15 is the useful band. */
  step?: number
  delay?: number
  amount?: number
  as?: 'div' | 'ul' | 'ol' | 'section' | 'dl'
  className?: string
}

/**
 * Parent that releases its <StaggerItem> children one after another.
 *
 * The threshold is low by default because the container is usually the full
 * width of a grid and taller than any one card in it: waiting for a fifth of
 * the whole grid would hold the first row back until the second was already on
 * screen.
 */
export function Stagger({
  children,
  step = 0.09,
  delay = 0,
  amount = 0.08,
  as = 'div',
  className,
}: StaggerProps) {
  const reduce = useReducedMotion()
  const [ref, shown] = useRevealed<HTMLDivElement>(amount)
  const Tag = motion[as] as typeof motion.div

  if (reduce) {
    const Plain = as as 'div'
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  )
}

type StaggerItemProps = {
  /** Optional: an item is sometimes a decorative rule with nothing inside it. */
  children?: ReactNode
  direction?: RevealDirection
  /** As on <Reveal> — a multiplier on how far the item travels. */
  distance?: number
  as?: RevealTag
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'children' | 'variants'>

export function StaggerItem({
  children,
  direction = 'up',
  distance = 1,
  as = 'div',
  className,
  ...rest
}: StaggerItemProps) {
  const reduce = useReducedMotion()
  const compact = useCompactMotion()
  const Tag = motion[as] as typeof motion.div

  if (reduce) {
    const Plain = as as 'div'
    return (
      <Plain className={className} {...(rest as object)}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      {...REVEAL_ATTR}
      className={className}
      variants={revealVariants(direction, distance * (compact ? COMPACT_DISTANCE : 1))}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ==================================================================
   Headlines
   ================================================================== */

/**
 * Headline reveal, line by line.
 *
 * Each line rises out of its own clipped box, which reads as typesetting rather
 * than as a generic fade. Lines are authored explicitly rather than measured,
 * so the break points are a design decision and never shift with the viewport
 * in a way the animation cannot follow.
 *
 * The visible copy is aria-hidden and a flat copy is exposed to assistive
 * technology, so a screen reader announces one sentence, not one span per line.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  accentClassName,
  delay = 0,
  step = 0.09,
  as: Tag = 'h2',
  amount = 0.25,
  id,
}: {
  lines: string[]
  className?: string
  /** Applied to every line. */
  lineClassName?: string
  /**
   * Applied to the final line only — the usual way a headline carries its
   * accent colour. A `last:` variant cannot do this job: each line sits in its
   * own wrapper, so every line is also the last child of its wrapper.
   */
  accentClassName?: string
  delay?: number
  step?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  amount?: number
  id?: string
}) {
  const reduce = useReducedMotion()
  const [ref, shown] = useRevealed<HTMLSpanElement>(amount)
  const flat = lines.join(' ')
  const cls = (i: number) =>
    `block ${lineClassName ?? ''} ${i === lines.length - 1 ? (accentClassName ?? '') : ''}`

  if (reduce) {
    return (
      <Tag className={className} id={id}>
        {lines.map((line, i) => (
          <span key={i} className={cls(i)}>
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag className={className} id={id}>
      <motion.span
        ref={ref}
        className="block"
        initial="hidden"
        animate={shown ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: step, delayChildren: delay } },
        }}
        aria-hidden="true"
      >
        {/*
          The clip box is padded well below the baseline and the padding is
          pulled straight back out again, so the box is taller than the line
          without changing the layout. The display faces are set at a
          line-height of 1, which puts descenders — the g, q and p in
          "engineering questions." — outside the line box, and `overflow-hidden`
          was slicing them off.

          The hidden offset has to clear the padded box, not just the line, or
          the tail of the next line shows through before it animates.
        */}
        {lines.map((line, i) => (
          <span key={i} className="block mb-[-0.22em] overflow-hidden pb-[0.22em]">
            <motion.span
              {...REVEAL_ATTR}
              className={cls(i)}
              variants={{
                hidden: { y: '132%' },
                visible: { y: 0, transition: { duration: DUR.slow, ease: EASE } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{flat}</span>
    </Tag>
  )
}

/**
 * Word-by-word reveal, for headlines whose line breaks are left to the browser.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  step = 0.04,
  amount = 0.3,
  as: Tag = 'h2',
}: {
  text: string
  className?: string
  delay?: number
  step?: number
  amount?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const reduce = useReducedMotion()
  const [ref, shown] = useRevealed<HTMLSpanElement>(amount)
  const words = text.split(' ')

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        className="inline"
        initial="hidden"
        animate={shown ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: step, delayChildren: delay } },
        }}
        aria-hidden="true"
      >
        {/* Same descender clearance as LineReveal above. */}
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block mb-[-0.22em] overflow-hidden pb-[0.22em] align-bottom"
          >
            <motion.span
              {...REVEAL_ATTR}
              className="inline-block"
              variants={{
                hidden: { y: '132%' },
                visible: { y: 0, transition: { duration: DUR.slow, ease: EASE } },
              }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
