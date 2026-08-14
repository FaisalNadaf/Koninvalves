import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * 3D tilt surface.
 *
 * The whole interaction is written straight to the DOM from a pointer
 * listener — a transform on the body and two custom properties that the
 * spotlight and rim glow in index.css read. Nothing here causes a React
 * render while the pointer moves, so a grid of twenty of these costs the
 * same as one.
 *
 * It is a no-op on touch devices and for visitors who prefer reduced motion:
 * a tilt driven by a pointer that does not exist is only a liability, and on
 * a phone the extra compositor layers are the last thing the page needs.
 */
export function TiltCard({
  children,
  className = '',
  /** Maximum rotation in degrees on each axis. */
  max = 7,
  /** Scale applied while the pointer is over the card. */
  scale = 1.015,
  /** Lift in pixels while the pointer is over the card. */
  lift = 6,
  /** Set false to keep the pointer-tracking light but drop the rotation. */
  rotate = true,
  glare = true,
  /**
   * Corner rounding of the surface being tilted.
   *
   * The spotlight and rim overlays are `border-radius: inherit`, and they
   * inherit from this wrapper — not from the card nested inside it. Without a
   * radius here that resolves to 0 and the rim glow paints as a hard square
   * over the card's rounded corners. Match this to the child's rounding.
   */
  radius = 'rounded-2xl',
  style,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
  lift?: number
  rotate?: boolean
  glare?: boolean
  radius?: string
  style?: CSSProperties
  as?: 'div' | 'article' | 'li'
}) {
  // Narrowed to 'div' for JSX's benefit only: every tag this accepts takes the
  // same props and the same ref, but the union of their ref types has no
  // common assignable member.
  const Element = Tag as 'div'
  const root = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const frame = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setActive(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const enabled = active && !reduce

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return
      const el = root.current
      const inner = body.current
      if (!el || !inner) return
      // One rAF per frame at most: pointermove can fire far above 60 Hz and
      // every extra write is a wasted style recalculation.
      if (frame.current) return
      const { clientX, clientY } = e
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const r = el.getBoundingClientRect()
        const px = (clientX - r.left) / r.width
        const py = (clientY - r.top) / r.height
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
        el.style.setProperty('--glow', '1')
        const ry = rotate ? (px - 0.5) * 2 * max : 0
        const rx = rotate ? (0.5 - py) * 2 * max : 0
        inner.dataset.tilting = 'true'
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, ${-lift}px, 0) scale(${scale})`
      })
    },
    [enabled, max, rotate, lift, scale]
  )

  const onLeave = useCallback(() => {
    const el = root.current
    const inner = body.current
    if (frame.current) {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    if (el) el.style.setProperty('--glow', '0')
    if (inner) {
      // Drop back to the long settle transition before releasing the transform,
      // so the card eases home instead of snapping.
      delete inner.dataset.tilting
      inner.style.transform = ''
    }
  }, [])

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current)
  }, [])

  return (
    <Element
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-root group relative ${className}`}
      style={style}
    >
      <div ref={body} className={`tilt-body relative h-full ${radius}`}>
        {children}
        {glare && enabled && (
          <>
            <span aria-hidden="true" className="tilt-spotlight z-20" />
            <span aria-hidden="true" className="tilt-rim z-20" />
          </>
        )}
      </div>
    </Element>
  )
}

/**
 * Pushes a child forward on the card's Z axis.
 *
 * Only meaningful inside a TiltCard, where the parent establishes the
 * perspective — it is what separates a real 3D card from a picture of one.
 */
export function Layer({
  children,
  z = 30,
  className = '',
}: {
  children: ReactNode
  z?: number
  className?: string
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
