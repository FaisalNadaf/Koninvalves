import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Normalised pointer position (-0.5 … 0.5 on each axis) for depth parallax.
 *
 * Returns a static centre for reduced-motion users and for touch devices, so
 * layers simply sit at rest instead of jittering.
 */
export function useMouseParallax(enabled = true) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!enabled || reduce) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setPos({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        })
        frame = 0
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled, reduce])

  return pos
}
