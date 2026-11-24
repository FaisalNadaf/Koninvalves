import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { Cursor, PageTransition, ScrollProgress, SmoothScroll, scrollToTop } from '../components/fx'

/**
 * Opens every route at the top (React Router does not do this by default).
 *
 * Goes through `scrollToTop` rather than `window.scrollTo`: while Lenis is
 * running it owns the scroll position, and moving the document underneath it
 * is simply undone on the next frame.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop()
  }, [pathname])
  return null
}

/**
 * Calls off the content-visibility failsafe armed in index.html — the app is
 * running, so the reveals will run too.
 *
 * If the timer has already fired, the class it added is deliberately left in
 * place: on a connection slow enough to trip it the visitor is already reading
 * the page, and pulling the content back out to animate it in would be worse
 * than simply going without the animation.
 */
function RevealFailsafe() {
  useEffect(() => {
    const w = window as typeof window & { __koninRevealFailsafe?: number }
    if (w.__koninRevealFailsafe) {
      clearTimeout(w.__koninRevealFailsafe)
      w.__koninRevealFailsafe = undefined
    }
  }, [])
  return null
}

export default function RootLayout() {
  return (
    /* Site-wide backstop for the OS reduced-motion setting. Most components
       already check it themselves; with "user", any motion element that does
       not still drops its transform and layout animation (opacity is kept). The
       library's own default is "never". */
    <MotionConfig reducedMotion="user">
      <RevealFailsafe />
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <Cursor />
      <PageTransition />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </MotionConfig>
  )
}
