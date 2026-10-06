import { useEffect, useRef, type MouseEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { Img } from './ui'

export type LightboxItem = {
  src: string
  alt: string
  /** Heading of the caption — the product the photograph shows. */
  name: string
  group: string
  /** The product page, when the photograph belongs to one. */
  href?: string
}

/**
 * Full-size view of one photograph from a set, with previous / next.
 *
 * Built on a native modal <dialog>, which brings focus trapping, Escape to
 * close, an inert page behind it and focus returned to the tile that opened it,
 * none of which has to be re-implemented here.
 *
 * `data-lenis-prevent` keeps Lenis from smooth-scrolling the page under the
 * dialog on a wheel event; the overflow lock below stops native scrolling.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: LightboxItem[]
  /** The photograph on show, or null when the lightbox is closed. */
  index: number | null
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const swipeFrom = useRef<number | null>(null)
  const n = items.length
  const open = index !== null && n > 0
  const pos = open ? Math.min(index, n - 1) : 0
  const item = open ? items[pos] : null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  // The lock goes on <html>, not <body>. The stylesheet clips html's overflow-x,
  // which stops body's overflow from propagating to the viewport, so a lock on
  // body alone leaves the page free to scroll. The gutter is held open so the
  // page does not shift sideways as its scrollbar is removed.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement.style
    root.overflow = 'hidden'
    root.scrollbarGutter = 'stable'
    return () => {
      root.overflow = ''
      root.scrollbarGutter = ''
    }
  }, [open])

  const step = (dir: 1 | -1) => {
    if (open) onIndex((pos + dir + n) % n)
  }

  // A click that lands on the dialog's own layout, rather than on the picture
  // or a control, is a click on the backdrop.
  const closeOnEmpty = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') swipeFrom.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    const from = swipeFrom.current
    swipeFrom.current = null
    if (from === null) return
    const dx = e.clientX - from
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
  }

  const control =
    'grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-white hover:text-ink-900'

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby={item ? 'lightbox-title' : undefined}
      aria-describedby={item ? 'lightbox-desc' : undefined}
      onClose={onClose}
      onClick={closeOnEmpty}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        else if (e.key === 'ArrowLeft') step(-1)
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-ink-950/88 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div
          onClick={closeOnEmpty}
          className="mx-auto flex h-full max-w-6xl flex-col px-4 pt-4 pb-5 sm:px-8 sm:pt-6 sm:pb-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="mono-label text-white/65 tabular-nums">
              {pos + 1} / {n}
            </p>
            <button type="button" onClick={onClose} aria-label="Close" className={control}>
              <X className="size-4.5" aria-hidden="true" />
            </button>
          </div>

          {/* ---------- Picture ---------- */}
          <div
            onClick={closeOnEmpty}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative flex min-h-0 flex-1 items-center justify-center gap-4 py-4"
          >
            {n > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className={`${control} hidden sm:grid`}
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
            )}
            <div
              onClick={closeOnEmpty}
              className="flex h-full min-w-0 flex-1 items-center justify-center"
            >
              <Img
                key={item.src}
                src={item.src}
                alt={item.alt}
                priority
                sizes="(max-width: 1200px) 92vw, 1100px"
                className="anim-fade max-h-full w-auto max-w-full rounded-2xl bg-white object-contain shadow-e5"
              />
            </div>
            {n > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className={`${control} hidden sm:grid`}
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* ---------- Caption ---------- */}
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div className="min-w-0 max-w-2xl">
              <p className="mono-label text-aqua-300">{item.group}</p>
              <h2 id="lightbox-title" className="h-card mt-2.5 text-white">
                {item.name}
              </h2>
              <p id="lightbox-desc" className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                {item.alt}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photograph"
                    className={`${control} sm:hidden`}
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photograph"
                    className={`${control} sm:hidden`}
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </>
              )}
              {item.href && (
                <Link to={item.href} className="btn btn-light btn-sm group">
                  View product
                  <ArrowUpRight
                    className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
