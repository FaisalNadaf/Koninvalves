import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { industries } from '../../data/industries'
import { Btn, Eyebrow, Glow, Img, SectionSeam } from '../../components/ui'
import { LineReveal, Reveal } from '../../lib/motion'

const N = industries.length

/** How long an industry holds the front of the fan before the next comes up. */
const HOLD_MS = 4600
/** One step of the fan. Every card moves for this long. */
const ADVANCE_MS = 720

/**
 * The fan, front to back — index is depth, and `x` and `y` are percentages of
 * a card's own size, so the whole arrangement scales with the cards.
 *
 * The fan runs right to left: the industries still to come queue up on the
 * right and step leftward into the front, which is the card nearest the eye
 * and nearest the read-out. Each sits 45% clear of the one in front of it,
 * which is what makes the section legible at a glance — you can see the two
 * coming up, not just the corner of a pile. The set is centred on zero so the
 * fan sits square in its column rather than running off to one side.
 */
const SLOTS = [
  { x: -45, y: 0, rot: 0, scale: 1 },
  { x: 0, y: 2.5, rot: 7, scale: 0.94 },
  { x: 45, y: 5, rot: 13, scale: 0.88 },
] as const

/** Where the cards further back wait — just behind the last slot, unpainted. */
const BACK = { x: 62, y: 7, rot: 17, scale: 0.84 } as const

/**
 * Where the card that has just left the front goes: on out to the left, past
 * the edge of the page. It is the one direction nothing else occupies, which
 * is why the fan sits in the left-hand column.
 *
 * It doubles as the slot a card comes *in* from when the visitor goes back, so
 * the two directions are the same movement read each way round.
 */
const GONE = { x: -140, y: -2, rot: -15, scale: 0.9 } as const

const wrap = (i: number) => ((i % N) + N) % N

/**
 * Position in the fan: 0 is the card at the front, 1 the industry coming up
 * next, and N-1 the one that has just left.
 */
const depthOf = (i: number, front: number) => wrap(i - front)

/**
 * A degree or two of scatter per card, so the fan reads as photographs laid
 * down by hand rather than as a stepper. Deterministic, because an angle that
 * changed under a card between renders would make it twitch.
 */
const jitterOf = (i: number) => ((i * 7) % 9) - 4

/**
 * Industries served, as a fan of photographs stepped one at a time.
 *
 * The industry at the front is the subject; the two behind it are the ones
 * coming up, each held 45% clear of the card in front so the section shows
 * where it is going. The whole thing reads right to left: cards queue on the
 * right, step leftward a slot at a time, and leave off the left-hand edge of
 * the page. Going back is the same movement read the other way — the card that
 * just left slides back in from the left and takes the front again.
 *
 * Position is entirely a function of a card's distance from the front, so the
 * fan needs no keyframes — every card simply transitions between slots, on
 * `translate`, `rotate`, `scale` and `opacity` alone, which keeps the whole
 * thing on the compositor. It steps on its own, pauses under the pointer or a
 * focused control, and answers the arrows, a swipe and the keyboard. Under
 * `prefers-reduced-motion` the auto-advance is dropped and the steps are
 * instant.
 */
export default function IndustriesReveal() {
  const reduce = useReducedMotion()
  const [front, setFront] = useState(0)
  const [paused, setPaused] = useState(false)

  /** The live front index, so `go` never reads a stale one. */
  const frontRef = useRef(0)
  /** True while the fan is mid-step — a second step would cross the first. */
  const busy = useRef(false)
  const lock = useRef<number | null>(null)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  /** Set for the click that ends a swipe, so that click is swallowed. */
  const swallowClick = useRef(false)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return
      busy.current = true

      const next = wrap(frontRef.current + dir)
      frontRef.current = next
      setFront(next)

      lock.current = window.setTimeout(
        () => {
          busy.current = false
        },
        reduce ? 0 : ADVANCE_MS
      )
    },
    [reduce]
  )

  useEffect(
    () => () => {
      if (lock.current) clearTimeout(lock.current)
    },
    []
  )

  // Depending on `front` restarts the hold on every change, so a manual step
  // always gets a full hold before the fan takes over again.
  useEffect(() => {
    if (reduce || paused) return
    const id = setTimeout(() => go(1), HOLD_MS)
    return () => clearTimeout(id)
  }, [reduce, paused, front, go])

  /* ---------------- Swipe ----------------
     A flick, not a drag: the fan has no meaningful in-between state, so the
     gesture only has to decide a direction. */
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY }
    swallowClick.current = false
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    // A mostly-vertical gesture is the page being scrolled, not the fan being
    // flicked — hand it back rather than fighting the scroll.
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(e.clientY - s.y)) return
    swallowClick.current = true
    go(dx < 0 ? 1 : -1)
  }

  return (
    <section
      aria-labelledby="industries-title"
      className="relative overflow-hidden bg-white section-y"
    >
      <SectionSeam />
      <Glow className="-top-56 left-1/4" size="50rem" intensity={0.12} drift />
      <Glow className="-left-44 bottom-0" color="aqua" size="38rem" intensity={0.11} />

      <div className="relative container-k">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Industries served</Eyebrow>
          </Reveal>
          <LineReveal
            as="h2"
            id="industries-title"
            className="h-section mt-5 text-ink-900"
            lines={['Where KONIN valves work.']}
            accentClassName="text-gradient"
          />
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Industries served by KONIN"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
            e.preventDefault()
            go(e.key === 'ArrowLeft' ? -1 : 1)
          }}
          className="mx-auto mt-14 grid max-w-[80rem] items-center gap-x-14 gap-y-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-x-20"
        >
          {/* ---------------- The fan ----------------
              The cards are sized off the column rather than in rem, so the fan
              keeps its proportions at every width; `--cw` is the one number
              that decides how big a photograph is. The two outermost cards run
              a few per cent past the column into the gap and the gutter, which
              is what stops the fan reading as a boxed-in widget.

              It leads on every width: the fan belongs on the left, where a
              card leaving has somewhere to go, and on a phone the photograph
              should open the section rather than follow a wall of text. */}
          <Reveal direction="zoom" amount={0.05} className="lg:order-1">
            <div
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
              onDragStart={(e) => e.preventDefault()}
              /* `--cw` is how big a photograph is, as a share of the column;
                 `--fan` slides the whole arrangement sideways. The fan is
                 centred once there is room for it, and pushed right on a phone
                 so the front card stays whole and the ones queued behind it
                 run off the edge of the screen instead. */
              className="relative mx-auto grid aspect-16/11 w-full touch-pan-y place-items-center select-none [--cw:72%] [--fan:40%] sm:[--cw:66%] sm:[--fan:24%] lg:aspect-video lg:[--cw:62%] lg:[--fan:0%]"
            >
              {industries.map((ind, i) => {
                const depth = depthOf(i, front)
                const isFront = depth === 0
                const painted = depth < SLOTS.length
                // Everything past the fan waits at the back, except the card
                // that has just left the front, which is on its way out to the
                // left — and is the one that comes back in on a step backward.
                const slot = painted ? SLOTS[depth] : depth === N - 1 ? GONE : BACK

                return (
                  <Link
                    key={ind.slug}
                    to="/industries"
                    aria-label={`${ind.name}, an industry KONIN serves`}
                    aria-hidden={!isFront}
                    tabIndex={isFront ? 0 : -1}
                    draggable={false}
                    onClick={(e) => {
                      // The card that ends a swipe must not be followed.
                      if (swallowClick.current) {
                        e.preventDefault()
                        swallowClick.current = false
                        return
                      }
                      // A card behind the front is a control first and a link
                      // second: it steps the fan toward itself, and only once
                      // it is at the front does it lead anywhere.
                      if (!isFront) {
                        e.preventDefault()
                        go(1)
                      }
                    }}
                    className="group col-start-1 row-start-1 aspect-4/3 w-[var(--cw)] rounded-2xl"
                    style={
                      {
                        translate: `calc(${slot.x}% + var(--fan)) ${slot.y}%`,
                        rotate: `${slot.rot + (isFront ? 0 : jitterOf(i))}deg`,
                        scale: slot.scale,
                        opacity: painted ? 1 : 0,
                        // The card leaving the front stays above the fan on its
                        // way out, and so does the one sliding back in.
                        zIndex: depth === N - 1 ? N + 1 : N - depth,
                        transition: reduce
                          ? 'none'
                          : `translate ${ADVANCE_MS}ms var(--ease-out-expo),` +
                            ` rotate ${ADVANCE_MS}ms var(--ease-out-expo),` +
                            ` scale ${ADVANCE_MS}ms var(--ease-out-expo),` +
                            ` opacity ${Math.round(ADVANCE_MS * 0.7)}ms ease`,
                        // Only the face at the front is a link; the cards behind
                        // it are a preview, and clicking one steps to it.
                        pointerEvents: painted ? 'auto' : 'none',
                      } as CSSProperties
                    }
                  >
                    {/* A white border and a drop shadow: on a light ground that
                        is what separates one photograph in the fan from the
                        next, and it reads as a print rather than as a tile. */}
                    <figure
                      className={`relative h-full overflow-hidden rounded-2xl border-4 border-white bg-steel-100 transition-shadow duration-500 ${
                        isFront ? 'shadow-e5' : 'shadow-e3'
                      }`}
                    >
                      <Img
                        src={ind.image}
                        alt=""
                        sizes="(max-width: 1024px) 70vw, 28rem"
                        className="pointer-events-none size-full object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-ink-950/45 via-transparent to-transparent"
                      />
                      {/* The cards behind are held back a little, so the front
                          one is unambiguously the subject. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-white transition-opacity duration-500"
                        style={{ opacity: isFront ? 0 : 0.18 }}
                      />
                      {/* Only meaningful on the face at the front, and it waits
                          for the card that is still moving. */}
                      <span
                        aria-hidden="true"
                        className="absolute right-4 bottom-4 grid size-10 place-items-center rounded-full bg-white/90 text-brand-700 shadow-e1 transition-all duration-400 group-hover:bg-brand-600 group-hover:text-white"
                        style={{
                          opacity: isFront ? 1 : 0,
                          transitionDelay: isFront && !reduce ? `${ADVANCE_MS * 0.55}ms` : '0ms',
                        }}
                      >
                        <ArrowUpRight className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </figure>
                  </Link>
                )
              })}
            </div>
          </Reveal>

          {/* ---------------- Read-out & controls ---------------- */}
          <Reveal direction="from-right" amount={0.05} className="lg:order-2">
            <div className="text-center lg:text-left">
              <p className="mono-label text-steel-400">
                <span className="text-ink-900">{String(front + 1).padStart(2, '0')}</span> /{' '}
                {String(N).padStart(2, '0')}
              </p>

              {/* Every industry is laid in the same grid cell, so the block is
                  as tall as the longest of them and nothing below it moves as
                  the fan turns. The outgoing name leaves at once; the incoming
                  one waits for the card it belongs to. */}
              <div className="mt-6 grid">
                {industries.map((ind, i) => {
                  const isFront = i === front
                  return (
                    <div
                      key={ind.slug}
                      aria-hidden={!isFront}
                      className="col-start-1 row-start-1"
                      style={{
                        opacity: isFront ? 1 : 0,
                        translate: isFront ? '0 0' : '0 0.75rem',
                        transition: 'opacity 400ms ease, translate 400ms cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay: isFront && !reduce ? `${ADVANCE_MS * 0.5}ms` : '0ms',
                      }}
                    >
                      <h3 className="h-sub text-ink-900">{ind.name}</h3>
                      <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-steel-600 lg:mx-0">
                        {ind.blurb}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous industry"
                  className="grid size-13 place-items-center rounded-full border border-steel-200 bg-white text-ink-900 shadow-e1 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-600 hover:text-white hover:shadow-brand"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next industry"
                  className="grid size-13 place-items-center rounded-full border border-steel-200 bg-white text-ink-900 shadow-e1 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-600 hover:text-white hover:shadow-brand"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>

                <span
                  aria-hidden="true"
                  className="ml-2 h-px w-24 overflow-hidden bg-steel-200 sm:w-36"
                >
                  <span
                    className="block h-full bg-linear-to-r from-brand-600 to-aqua-500 transition-[width] duration-500 ease-out-expo"
                    style={{ width: `${((front + 1) / N) * 100}%` }}
                  />
                </span>
              </div>

              <div className="mt-9">
                <Btn to="/industries" variant="outline-ink" size="lg">
                  All industries
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
