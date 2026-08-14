import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, Menu, Phone, Plus, X } from 'lucide-react'
import { categories, productsByCategory } from '../data/categories'
import { company } from '../data/company'
import { Img } from '../components/ui'
import { EASE } from '../lib/motion'

const NAV = [
  { label: 'Products', to: '/products', mega: true },
  { label: 'Industries', to: '/industries' },
  { label: 'Quality', to: '/quality' },
  { label: 'About', to: '/about' },
  { label: 'Clientele', to: '/clientele' },
  { label: 'Contact', to: '/contact' },
]

/* ================================================================
/* ================================================================
   Products dropdown
   ================================================================
   Just the three categories. The previous mega panel carried seven
   product links per column plus a hover preview stage — a second
   catalogue bolted onto the header, when the catalogue itself is one
   click away.
   ================================================================ */

function ProductsMenu({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      key="products-menu"
      /* Centred under the trigger. The x offset rides along in the animation
         rather than as a `-translate-x-1/2` class, because framer-motion writes
         `transform` inline on every frame and would overwrite the class. */
      initial={reduce ? false : { opacity: 0, y: -8, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={reduce ? { opacity: 0, x: '-50%' } : { opacity: 0, y: -6, x: '-50%' }}
      transition={{ duration: 0.24, ease: EASE }}
      className="absolute top-full left-1/2 z-50 hidden pt-3 xl:block"
    >
      <div className="w-72 overflow-hidden rounded-2xl border border-steel-150 bg-white p-2 shadow-e4">
        {categories.map((cat) => (
          <Link
            key={cat.key}
            to={cat.path}
            onClick={onClose}
            className="group/item flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-brand-50"
          >
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-ink-900 transition-colors group-hover/item:text-brand-700">
                {cat.name}
              </span>
              <span className="mono-label mt-1.5 block truncate text-steel-400">
                {cat.tagline}
              </span>
            </span>
            <ArrowUpRight
              className="size-4 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 ease-out-expo group-hover/item:translate-x-0 group-hover/item:opacity-100"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

/* ================================================================
   Mobile drawer
   ================================================================ */

function MobileNav({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<string | null>(categories[0].key)

  return (
    <motion.div
      key="drawer"
      id="mobile-menu"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-60 xl:hidden"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/25 backdrop-blur-sm"
      />

      <motion.nav
        aria-label="Mobile"
        initial={reduce ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={reduce ? { opacity: 0 } : { x: '100%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-y-0 right-0 flex w-[min(26rem,92vw)] flex-col overflow-y-auto border-l border-steel-150 bg-white shadow-e5"
      >
        <div className="flex h-(--nav-h) shrink-0 items-center justify-between border-b border-steel-150 px-5">
          <Img src="/img/brand/logo.webp" alt="" className="h-8 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-xl border border-steel-200 text-ink-900 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 px-5 py-6">
          {/* Primary links */}
          <ul className="space-y-0">
            {NAV.filter((n) => !n.mega).map((item, i) => (
              <motion.li
                key={item.to}
                initial={reduce ? false : { opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-steel-150 py-3.5 font-display text-2xl font-bold transition-colors ${
                      isActive ? 'text-brand-700' : 'text-ink-900 hover:text-brand-700'
                    }`
                  }
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-steel-300" aria-hidden="true" />
                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Product accordions */}
          <p className="eyebrow mt-8">Products</p>
          <ul className="mt-5 space-y-2">
            {categories.map((cat) => {
              const isOpen = open === cat.key
              return (
                <li key={cat.key} className="overflow-hidden rounded-2xl border border-steel-150 bg-steel-50">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : cat.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="font-display text-lg font-bold text-ink-900">{cat.name}</span>
                    <Plus
                      className={`size-4 shrink-0 text-steel-400 transition-transform duration-400 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden bg-white px-4 pb-2"
                      >
                        {productsByCategory[cat.key].slice(0, 6).map((p) => (
                          <li key={p.slug}>
                            <Link
                              to={`/products/${cat.key}/${p.slug}`}
                              onClick={onClose}
                              className="block py-2 text-sm text-steel-600 transition-colors hover:text-brand-700"
                            >
                              {p.shortName ?? p.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to={cat.path}
                            onClick={onClose}
                            className="block py-2 text-sm font-semibold text-brand-700"
                          >
                            View all {productsByCategory[cat.key].length} →
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="shrink-0 border-t border-steel-150 bg-steel-50 p-5">
          <Link to="/contact" onClick={onClose} className="btn btn-primary w-full">
            Request a Quote
          </Link>
          <div className="mt-5 space-y-2.5 text-[13.5px] text-steel-600">
            <a
              href={`tel:${company.phones[0].replace(/\s/g, '')}`}
              className="flex min-h-6 items-center gap-2.5 transition-colors hover:text-brand-700"
            >
              <Phone className="size-3.5 text-brand-600" aria-hidden="true" />
              {company.phones[0]}
            </a>
            <a
              href={`mailto:${company.emails[0]}`}
              className="flex min-h-6 items-center gap-2.5 transition-colors hover:text-brand-700"
            >
              <Mail className="size-3.5 text-brand-600" aria-hidden="true" />
              {company.emails[0]}
            </a>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  )
}

/* ================================================================
   Navbar
   ================================================================ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  /**
   * The bar is pinned for the whole page — it never retracts. All this tracks
   * is whether the hero is behind it, which is what turns the glass background
   * and the hairline on.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMegaOpen(false)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }

  const onProducts = location.pathname.startsWith('/products')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-300 focus:rounded-xl focus:bg-brand-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        onMouseLeave={scheduleClose}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-expo ${
          scrolled || megaOpen
            ? 'border-b border-steel-150/90 bg-white/85 shadow-e1 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-k flex h-(--nav-h) items-center justify-between gap-6">
          <Link to="/" className="shrink-0" aria-label={`${company.name} — home`}>
            <Img
              src="/img/brand/logo.webp"
              alt={`${company.name} logo`}
              priority
              className="h-9 w-auto transition-transform duration-500 ease-out-expo hover:scale-[1.03] sm:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1 rounded-full border border-steel-150/80 bg-white/60 p-1 backdrop-blur-md">
              {NAV.map((item) => (
                <li
                  key={item.to}
                  onMouseEnter={item.mega ? openMega : scheduleClose}
                  className="relative"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onFocus={item.mega ? openMega : undefined}
                    aria-expanded={item.mega ? megaOpen : undefined}
                    className={({ isActive }) =>
                      `relative flex items-center rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.005em] transition-colors duration-300 ${
                        isActive || (item.mega && onProducts)
                          ? 'bg-brand-600 text-white shadow-[0_6px_16px_-8px_rgba(18,104,179,0.7)]'
                          : 'text-steel-600 hover:bg-brand-50 hover:text-brand-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {/* Anchored to the Products item, not to the header, so it
                      opens as a dropdown under its trigger rather than as a
                      full-width panel. */}
                  {item.mega && (
                    <AnimatePresence>
                      {megaOpen && <ProductsMenu onClose={() => setMegaOpen(false)} />}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phones[0].replace(/\s/g, '')}`}
              className="hidden items-center gap-2 rounded-full border border-steel-150 bg-white/70 px-3.5 py-2 font-mono text-[12.5px] tracking-tight text-steel-600 transition-colors hover:border-brand-200 hover:text-brand-700 lg:flex"
            >
              <Phone className="size-3.5 text-brand-600" aria-hidden="true" />
              {company.phones[0]}
            </a>
            <Link to="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Request a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-xl border border-steel-200 bg-white/80 text-ink-900 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 xl:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        
      </header>

      <AnimatePresence>{mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </>
  )
}
