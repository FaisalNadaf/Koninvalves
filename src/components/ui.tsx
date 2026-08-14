import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { imageSizes, sizeOf } from '../data/imageSizes'
import { Magnetic } from './fx'

/**
 * Returns the transparent-background version of a product photo when one has
 * been generated (see scripts/make-cutouts.mjs), otherwise null. Used wherever
 * a product needs to float over a stage rather than sit in a white box.
 */
export function cutoutFor(src: string): string | null {
  // The cut-out tree mirrors the source tree — an image under products/ maps to
  // the same name under cutout/products/ — because products/ and gallery/ hold
  // different images that share a filename.
  const candidate = src.replace(/^\/img\//, '/img/cutout/')
  return candidate in imageSizes ? candidate : null
}

/* ------------------------------------------------------------------ */
/* Img — explicit dimensions, lazy by default, async decoding          */
/* ------------------------------------------------------------------ */

type ImgProps = {
  src: string
  alt: string
  className?: string
  /** Set on the LCP image only. */
  priority?: boolean
  sizes?: string
  style?: CSSProperties
}

export function Img({ src, alt, className, priority, sizes, style }: ImgProps) {
  const { width, height } = sizeOf(src)
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={style}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Section scaffolding                                                 */
/* ------------------------------------------------------------------ */

/** Where the component sits: on the light ground, or on the brand gradient. */
export type Tone = 'ink' | 'onBrand'

export function Eyebrow({
  children,
  className = '',
  tone = 'ink',
}: {
  children: ReactNode
  className?: string
  tone?: Tone
}) {
  return (
    <p className={`eyebrow ${tone === 'onBrand' ? 'eyebrow-on-brand' : ''} ${className}`}>
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'ink',
  size = 'section',
  className = '',
  id,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: Tone
  size?: 'section' | 'display'
  className?: string
  id?: string
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`${size === 'display' ? 'h-display' : 'h-section'} mt-5 ${
          tone === 'onBrand' ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`lead mt-5 ${tone === 'onBrand' ? 'text-white/80' : 'text-steel-600'} ${
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type BtnVariant = 'primary' | 'signal' | 'outline-ink' | 'soft' | 'light' | 'outline-light'

type BtnProps = {
  to?: string
  href?: string
  children: ReactNode
  variant?: BtnVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  magnetic?: boolean
  target?: string
  rel?: string
  disabled?: boolean
  /**
   * Turns an `href` into a download. The value is the filename the browser
   * saves as, which is worth setting whenever the file on disk is named for
   * a human rather than for a URL.
   */
  download?: string
}

export function Btn({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  type = 'button',
  onClick,
  magnetic = true,
  target,
  rel,
  disabled,
  download,
}: BtnProps) {
  const sizeCls = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : ''
  const cls = `btn btn-${variant} ${sizeCls} group ${className}`
  const inner = (
    <>
      {children}
      {icon ?? (
        <ArrowRight
          className="size-4 transition-transform duration-400 ease-out-expo group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )

  const el = to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : href ? (
    <a href={href} className={cls} target={target} rel={rel} download={download}>
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  )

  return magnetic ? <Magnetic strength={0.18}>{el}</Magnetic> : el
}

/* ------------------------------------------------------------------ */
/* Decorative depth layers                                             */
/* ------------------------------------------------------------------ */

/** Blueprint grid used behind sections to establish a base depth plane. */
export function GridBackdrop({
  className = '',
  variant = 'grid',
  mask = true,
}: {
  className?: string
  variant?: 'grid' | 'fine' | 'dots' | 'light'
  mask?: boolean
}) {
  const cls =
    variant === 'fine'
      ? 'bg-grid-fine'
      : variant === 'dots'
        ? 'bg-dots'
        : variant === 'light'
          ? 'bg-grid-light'
          : 'bg-grid'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${cls} ${mask ? 'mask-fade-radial' : ''} ${className}`}
    />
  )
}

/**
 * A soft coloured light source. On a light ground these read as the faint
 * colour wash behind a section rather than as a glow, so they are used to
 * shape the page without ever dropping its brightness.
 */
export function Glow({
  className = '',
  color = 'brand',
  size = '40rem',
  intensity = 0.22,
  drift = false,
}: {
  className?: string
  color?: 'brand' | 'aqua' | 'signal'
  size?: string
  intensity?: number
  drift?: boolean
}) {
  const rgb =
    color === 'signal' ? '245,137,31' : color === 'aqua' ? '23,171,223' : '30,134,214'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${drift ? 'anim-drift' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${rgb},${intensity}), transparent 68%)`,
      }}
    />
  )
}

/** Small technical corner ticks — reads as a drawing frame. */
export function CornerTicks({
  className = '',
  tone = 'ink',
}: {
  className?: string
  tone?: Tone
}) {
  const c = tone === 'onBrand' ? 'bg-white/45' : 'bg-brand-500/40'
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`absolute top-0 left-0 h-4 w-px ${c}`} />
      <span className={`absolute top-0 left-0 h-px w-4 ${c}`} />
      <span className={`absolute top-0 right-0 h-4 w-px ${c}`} />
      <span className={`absolute top-0 right-0 h-px w-4 ${c}`} />
      <span className={`absolute bottom-0 left-0 h-4 w-px ${c}`} />
      <span className={`absolute bottom-0 left-0 h-px w-4 ${c}`} />
      <span className={`absolute right-0 bottom-0 h-4 w-px ${c}`} />
      <span className={`absolute right-0 bottom-0 h-px w-4 ${c}`} />
    </span>
  )
}

/** Technical chip — the site's unit of small metadata. */
export function Chip({
  children,
  tone = 'ink',
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300 ${
        tone === 'onBrand'
          ? 'border-white/25 bg-white/10 text-white/85 hover:bg-white/18'
          : 'border-steel-200 bg-white text-steel-600 hover:border-brand-200 hover:text-brand-700'
      } ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * The seam between two sections.
 *
 * A soft, brand-tinted gradient plus a hairline, so one ground gives way to
 * the next instead of the page reading as a stack of separate bands.
 */
export function SectionSeam({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-24 ${
        flip
          ? 'bottom-0 bg-linear-to-t from-canvas to-transparent'
          : 'top-0 bg-linear-to-b from-canvas to-transparent'
      }`}
    />
  )
}
