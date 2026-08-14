import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { EASE, EASE_IN_OUT } from '../lib/motion'

/* ==================================================================
   Environment probes
   ================================================================== */

/** True only on devices that have a real pointer and want motion. */
function usePointerMotion() {
  const reduce = useReducedMotion()
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine && !reduce
}

/* ==================================================================
   SmoothScroll — Lenis
   ==================================================================
   Lenis is loaded lazily inside an effect so it never enters the
   pre-render pass or the critical bundle, and it is skipped entirely
   for reduced-motion visitors, who keep native scrolling.
   ================================================================== */

type LenisLike = {
  raf: (time: number) => void
  destroy: () => void
  scrollTo: (
    target: number | string,
    options?: { immediate?: boolean; force?: boolean; offset?: number }
  ) => void
}

/**
 * The running Lenis instance, or null when it is not driving the page.
 *
 * Held at module scope purely so `scrollToTop` can reach it. Lenis takes over
 * the scroll and tracks its own position, so a bare `window.scrollTo` moves the
 * document out from under it and Lenis puts it straight back — which is why a
 * route change appeared to keep the previous page's scroll position.
 */
let lenisInstance: LenisLike | null = null

/**
 * Jump to the top of the page, through whichever scroller is actually in
 * charge. Use this rather than `window.scrollTo` anywhere in the app.
 */
export function scrollToTop() {
  if (typeof window === 'undefined') return
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true })
    return
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
}

/**
 * Scroll an element into view, through whichever scroller is in charge.
 *
 * The offset clears the fixed navbar, which would otherwise sit over the top of
 * whatever was scrolled to. Unlike `scrollToTop` this one glides rather than
 * jumping: it runs when the visitor has arrived somewhere deliberately — a
 * pre-filtered category, say — and the travel is what tells them the page moved
 * on their behalf rather than loading part-way down.
 */
export function scrollToElement(selector: string) {
  if (typeof window === 'undefined') return
  if (lenisInstance) {
    lenisInstance.scrollTo(selector, { force: true, offset: -100 })
    return
  }
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    // `useReducedMotion` can report null on the very first render, so the
    // preference is also read straight from the platform here — otherwise Lenis
    // would start and be torn down again for a visitor who asked for no motion.
    if (reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let cancelled = false

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      const lenis = new Lenis({
        duration: 1.05,
        // Long, decelerating curve — the scroll settles rather than stops.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      }) as unknown as LenisLike
      lenisInstance = lenis
      const raf = (time: number) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [reduce])

  return null
}

/* ==================================================================
   ScrollProgress — hairline read-out of page position
   ================================================================== */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.75 origin-left rounded-r-full bg-linear-to-r from-brand-700 via-brand-500 to-aqua-400"
    />
  )
}

/* ==================================================================
   Cursor — dot plus trailing ring
   ==================================================================
   Desktop pointers only. The ring lags the dot, and grows over any
   interactive target, so the cursor reports what is clickable.
   ================================================================== */

export function Cursor() {
  const active = usePointerMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    const root = document.documentElement
    root.classList.add('cursor-none-all')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let hovering = false
    let frame = 0

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const el = e.target as Element | null
      hovering = Boolean(
        el?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="grow"]')
      )
    }

    const tick = () => {
      // Ring eases toward the pointer; the dot tracks it exactly.
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
          hovering ? 1.9 : 1
        })`
        ring.current.style.opacity = hovering ? '0.9' : '0.45'
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      root.classList.remove('cursor-none-all')
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [active])

  if (!active) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-200">
      <div
        ref={ring}
        className="absolute top-0 left-0 size-8 rounded-full border border-brand-500/60 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-brand-600"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

/* ==================================================================
   PageTransition — a panel wipes across on navigation
   ==================================================================
   Skipped on the first render so the landing page is never hidden
   behind an overlay while it paints.
   ================================================================== */

export function PageTransition() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const first = useRef(true)
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setKey(pathname)
    const t = setTimeout(() => setKey(null), 900)
    return () => clearTimeout(t)
  }, [pathname])

  if (reduce) return null

  return (
    <AnimatePresence>
      {key && (
        <motion.div
          key={key}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-150 origin-bottom bg-linear-to-br from-brand-800 via-brand-700 to-aqua-700"
            initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.75, ease: EASE_IN_OUT }}
        >
          <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ==================================================================
   Marquee — seamless infinite ticker
   ==================================================================
   The children are rendered twice inside a track that translates by
   exactly -50%, so the seam always lands on an identical frame. No
   measurement, no JavaScript loop.
   ================================================================== */

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
  pauseOnHover = true,
  fade = true,
}: {
  children: ReactNode
  /** Seconds for one full cycle. Longer is slower. */
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
  fade?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden ${pauseOnHover ? 'marquee-host' : ''} ${
        fade ? 'mask-fade-x' : ''
      } ${className}`}
    >
      <div
        className={`marquee ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': `${speed}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ==================================================================
   Counter — counts up once, when scrolled into view
   ==================================================================
   Takes the finished string and animates only its leading number, so
   values like "−101°C", "1800 mm" and "12+" keep their units and their
   exact published form.
   ================================================================== */

export function Counter({
  value,
  className,
  duration = 1600,
}: {
  value: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState<string | null>(null)

  // Split "−101°C" into "−", "101", "°C" so only the digits animate.
  const match = /^([^\d]*)(\d+)(.*)$/.exec(value)
  const prefix = match?.[1] ?? ''
  const digits = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''

  // Depend on `digits`, not on `match`: exec() returns a fresh array on every
  // render, so depending on it would tear the animation down and restart it
  // each time a new number was painted — the counter would creep and stall
  // short of its target instead of landing on it.
  useEffect(() => {
    if (!inView || reduce || !digits) return
    const target = Number(digits)
    if (!Number.isFinite(target)) return

    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out quint: fast first, long settle.
      const eased = 1 - Math.pow(1 - t, 5)
      // String(), not toLocaleString(): the published figures carry no
      // thousands separators and the animation must not invent one.
      setShown(String(Math.round(target * eased)))
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, digits, duration])

  if (!digits || reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {shown ?? '0'}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

/* ==================================================================
   Magnetic — the element leans toward the pointer
   ==================================================================
   Restrained on purpose: a few pixels of lean, released with a long
   ease. Mouse pointers only.
   ================================================================== */

export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const active = usePointerMotion()

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!active) return
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * strength
      const dy = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      el.style.transition = 'transform 120ms linear'
    },
    [active, strength]
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate3d(0,0,0)'
    el.style.transition = 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)'
  }, [])

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </span>
  )
}

/* ==================================================================
   ImageReveal — a mask lifts off the picture as it enters
   ==================================================================
   The frame's clip opens while the picture itself settles back from a
   slight scale, so the image looks uncovered rather than faded in.
   ================================================================== */

export function ImageReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const reduce = useReducedMotion()
  // The clip must NOT sit on the observed element. A target clipped to
  // `inset(100%)` has zero intersection area, so IntersectionObserver reports
  // it as never visible and the reveal can never fire — the element would stay
  // invisible forever. The outer wrapper is therefore observed and left
  // unclipped; the clip lives on a child.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>

  const closed =
    direction === 'left'
      ? 'inset(0% 100% 0% 0%)'
      : direction === 'right'
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(100% 0% 0% 0%)'

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        data-reveal=""
        className="size-full"
        initial={{ clipPath: closed }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        <motion.div
          className="size-full"
          initial={{ scale: 1.16 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ==================================================================
   ScrollCue — a travelling line, at the foot of the hero
   ================================================================== */

export function ScrollCue({
  label = 'Scroll',
  orientation = 'horizontal',
}: {
  label?: string
  orientation?: 'horizontal' | 'vertical'
}) {
  const rail = (
    <span className="relative block h-12 w-px overflow-hidden rounded-full bg-steel-200">
      <span className="anim-scroll-cue absolute inset-x-0 top-0 block h-1/2 rounded-full bg-linear-to-b from-brand-500 to-aqua-500" />
    </span>
  )

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="mono-label [writing-mode:vertical-rl] text-steel-500">{label}</span>
        {rail}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="mono-label text-steel-500">{label}</span>
      {rail}
    </div>
  )
}
